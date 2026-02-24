# TOOLS.md - Local Notes

Environment-specific config. Keep skills separate.

## Chrome DevTools MCP
- **Use for:** Dashboard testing, debugging UI issues, clicking buttons
- **How:** 
  1. Start: `browser action=start profile=chrome` (or use relay)
  2. Take snapshot: `browser action=snapshot`
  3. Click: `browser action=act request='{"kind":"click","ref":"e20"}'`
- **Always use** when testing/fixing dashboard issues

## Ollama (Local LLM)

## TTS
- Preferred voice: "Nova"

## Dashboard
- URL: http://192.168.1.146:4000
- DB: /tmp/dashboard.db
