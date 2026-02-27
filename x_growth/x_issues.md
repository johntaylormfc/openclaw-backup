# X Growth - Known Issues

## 2026-02-27
### All Fixed! ✅
- Search now works (correct endpoint + max_results)
- Post: ✅
- Like: ✅
- Follow: ✅
- Retweet: ✅
- Reply: ⚠️ X API restriction (can only reply to mentions)

### Reply Restriction
X API v2 only allows replying to users who:
1. Have **mentioned** your account (@MyNewClawBot)
2. Have **engaged** with your tweets

**Workaround:** Bot now checks mentions and auto-replies to them. Also uses retweets instead of replies for engagement.

### Action Items (Completed)
- [x] Fix search endpoint
- [x] Add retweet function
- [x] Add mentions-based reply
- [x] Update strategy for API limits

## Last Updated
2026-02-27
