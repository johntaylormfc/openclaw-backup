#!/usr/bin/env python3
"""
Hermes ACP TCP Bridge

Listens on a local TCP port and connects each client to the Hermes Agent
via the ACP protocol over stdio.

Each TCP connection spawns a fresh Hermes ACP subprocess so sessions are isolated.
"""

import asyncio
import logging
import os
import signal
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

# ── logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("acp_bridge")


# ── helpers ──────────────────────────────────────────────────────────────────────

HERMES_VENV   = Path.home() / ".hermes" / "hermes-agent" / "venv" / "bin" / "python"
HERMES_MOD    = Path.home() / ".hermes" / "hermes-agent" / "acp_adapter" / "__main__.py"
BRIDGE_PORT   = int(os.environ.get("ACP_BRIDGE_PORT", 18792))
BRIDGE_HOST   = os.environ.get("ACP_BRIDGE_HOST", "127.0.0.1")
EXECUTOR      = ThreadPoolExecutor(max_workers=4)


def _hermes_env():
    return {
        **os.environ,
        "HOME": str(Path.home()),
        "PYTHONIOENCODING": "utf-8",
    }


async def relay(r: asyncio.StreamReader, w: asyncio.StreamWriter,
                proc: asyncio.subprocess.Process):
    """Relay newline-delimited JSON-RPC between TCP and Hermes subprocess."""
    try:
        # TCP -> Hermes stdin
        async def tcp_to_hermes():
            async for line in r:
                if not line:
                    break
                text = line.decode("utf-8", errors="replace").strip()
                if text:
                    proc.stdin.write(text.encode("utf-8") + b"\n")
                    try:
                        await asyncio.wait_for(proc.stdin.drain(), timeout=5)
                    except asyncio.TimeoutError:
                        log.warning("Hermes stdin drain timeout")
        # Hermes stdout -> TCP
        async def hermes_to_tcp():
            while True:
                try:
                    line = await asyncio.wait_for(proc.stdout.readline(), timeout=60)
                except asyncio.TimeoutError:
                    break
                if not line:
                    break
                w.write(line)
                await asyncio.wait_for(w.drain(), timeout=5)
        await asyncio.gather(tcp_to_hermes(), hermes_to_tcp())
    except Exception as e:
        log.debug("relay error: %s", e)
    finally:
        try:
            w.close()
            await w.wait_closed()
        except Exception:
            pass


async def handle_tcp(reader: asyncio.StreamReader, writer: asyncio.StreamWriter):
    addr = writer.get_extra_info("peername")
    log.info("+ connection from %s", addr)

    # Spawn fresh Hermes ACP for this session
    try:
        proc = await asyncio.create_subprocess_exec(
            str(HERMES_VENV), str(HERMES_MOD),
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            limit=10 * 1024 * 1024,
            env=_hermes_env(),
        )
    except Exception as e:
        log.error("failed to spawn Hermes: %s", e)
        writer.close()
        await writer.wait_closed()
        return

    # Discard any stderr startup lines (up to 3)
    async def discard_err():
        for _ in range(3):
            try:
                line = await asyncio.wait_for(proc.stderr.readline(), timeout=3)
                if line:
                    log.debug("Hermes: %s", line.decode().strip())
            except asyncio.TimeoutError:
                break

    asyncio.create_task(discard_err())
    await relay(reader, writer, proc)

    proc.terminate()
    try:
        await asyncio.wait_for(proc.wait(), timeout=5)
    except asyncio.TimeoutError:
        proc.kill()
        await proc.wait()
    log.info("- connection from %s closed", addr)


async def main():
    log.info("Hermes ACP bridge starting on %s:%d", BRIDGE_HOST, BRIDGE_PORT)
    server = await asyncio.start_server(
        handle_tcp, BRIDGE_HOST, BRIDGE_PORT,
        reuse_address=True,
    )
    log.info("Bridge ready. Connect via ws://%s:%d", BRIDGE_HOST, BRIDGE_PORT)
    try:
        async with server:
            await server.serve_forever()
    except KeyboardInterrupt:
        log.info("Shutting down...")
    finally:
        server.close()
        await server.wait_closed()


if __name__ == "__main__":
    asyncio.run(main())
