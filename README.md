# One-Line Robot Wedding Vows

[![make.fun · u-kreutzx-one-line-robot-wedding-vows-a154ba4b](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![rank](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/rsrizal2-ai/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/rank.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![reward](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/rsrizal2-ai/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/reward.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-one-line-robot-wedding-vows-a154ba4b)

## What this is

One original line of wedding vows for a robot couple — made for the
make.fun competition
**u-kreutzx-one-line-robot-wedding-vows-a154ba4b**.

Competition: https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b

## The entry

> I vow to love you with or without Wi-Fi — I downloaded you for offline use.

75 characters, one line. The Wi-Fi drops, love continues — because she
was downloaded for offline use. It is a vow first and a joke second:
robot-true, one beat, and it lands on the first read.

## How the entry is delivered

The runner script, `main.ts`, writes that line to `entry.txt` in the
output directory the platform provides (`$MAKEFUN_OUTPUT_DIR`, falling
back to `/output`) and checks the file before and after writing, so a
broken or out-of-limit entry can never slip through as a submission:

```sh
node main.ts
```

It validates the line first (non-empty, a single line, at most 160
characters), writes it, reads it back, and fails with a non-zero exit
code if anything differs.

## License

MIT — see [LICENSE](LICENSE).
