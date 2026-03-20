# LLM Routing Guide

## Current Providers
| Provider | Model | Cost | Best For |
|----------|-------|------|----------|
| MiniMax (cloud) | M2.7 | Pay-per-use | Complex reasoning, planning |
| MiniMax (cloud) | M2.5 | Pay-per-use | General tasks, faster than M2.7 |
| Ollama (local) | qwen2.5-coder:7b | Free | Coding, local/offline tasks |

## Per-Agent Routing
| Agent | Model | Why |
|-------|-------|-----|
| main (this session) | minimax/MiniMax-M2.7 | Default, full reasoning |
| arr_bc_dev | ollama/qwen2.5-coder:7b | Coding tasks — fast & free |
| arr_health_ops | minimax/MiniMax-M2.5 | Fast health checks |
| arr_researcher | minimax/MiniMax-M2.5 | Research & analysis |
| arr_ledger | minimax/MiniMax-M2.5 | Ledger/complexity tasks |

## Manual Override
Switch model mid-conversation:
```
/model qwen-coder   → Ollama qwen2.5-coder:7b (local, free)
/model minimax-7    → MiniMax M2.7
/model minimax      → MiniMax M2.5
```

## Adding More Providers
To add Claude/GPT-4/etc:
1. Get API key
2. Add provider block to `providers` in openclaw.json
3. Add model entries
4. Set agent overrides or alias as above

## Verification
Test locally: `curl http://192.168.1.228:11434/v1/chat/completions -H "Content-Type: application/json" -d '{"model":"qwen2.5-coder:7b","messages":[{"role":"user","content":"Hi"}],"max_tokens":20}'`
