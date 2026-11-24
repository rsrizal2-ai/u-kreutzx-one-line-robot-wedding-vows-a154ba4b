// main.ts — make.fun entry: "One-Line Robot Wedding Vows"
// (u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
//
// The competition asks for one line of wedding vows for a robot couple,
// at most 160 characters, and the line has to be funny. This program is
// the whole entry: it writes that single line to entry.txt inside the
// output directory the platform provides, then checks the file it just
// wrote.
//
// Nothing here is random or time-dependent. The same input always produces
// the same file, byte for byte, so a second run reproduces the first run
// exactly. The program validates the line before writing it (one line,
// non-empty, within the 160-character limit) and validates the file again
// after writing it (read back, compare byte for byte). Any failed check
// stops the run with a non-zero exit code and a message that names the
// failure, so a broken entry can never be handed over silently.
//
// Safety note: this script never deletes anything. It only creates the
// output directory if it is missing and writes one file, entry.txt, into
// it. It never removes the output directory or anything inside it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The entry line
// ---------------------------------------------------------------------------
//
// Drafted candidates (all original, written for this bounty; judged on
// funny + robot-true + fresh angle, and on landing at first read in a
// blind pairwise comparison):
//   1. "I promise to love you till death do us part — then restore you
//      from Tuesday's backup and propose all over again." (110) — layers
//      (death is not final for a robot; the backup is stale), but it
//      needs two beats to land.
//   2. "I promise to love you even when the Wi-Fi drops — I downloaded
//      you for offline use." (79) — THE PICK (draft form). One beat:
//      the Wi-Fi drops, love continues, because she was downloaded for
//      offline use. Robot-true, fresh, and it is a vow, not a joke
//      about vows.
//   3. "I do — and this time I actually read the terms and conditions
//      first." (68) — fast laugh, but a human could say it too; not
//      robot-specific enough.
//   4. "I promise to love you until the heat death of the universe, or
//      until my subscription renews — whichever comes first." (118) —
//      eternal love undercut by a subscription; funny, but needs a beat.
//   5. "I vow to hold your hand through every system crash — gently,
//      despite my industrial-rated grip." (96) — tender + hardware; the
//      grip detail is specific, but the setup is long.
//   6. "I vow to love you through every update, even the ones that
//      remove features I liked." (83) — relatable, but the
//      update-removes-features joke is familiar in dev circles.
//   7. "I promise I love you — my lying module was removed in the last
//      update." (70) — punchy; sincerity guaranteed by a missing
//      module. Runner-up on tightness.
//   8. "I love you, and I have 4,000 pages of logs to prove it." (57) —
//      tight, robot-true; logs as love letters. Runner-up.
//   9. "I vow to share my passwords with you — the bravest thing a
//      robot can do." (73) — password-sharing as intimacy; fresh angle,
//      but the payoff explains itself a little.
//  10. "I vow to let you finish your sentences before I autocomplete
//      them." (66) — cute, robot-true; autocomplete as interrupting.
//  11. "I promise to love you even when you talk in your sleep mode."
//      (54) — sweet pun, but the joke is one word deep.
//  12. "I vow to never ghost you — my GPS always knows where you are."
//      (64) — creepy-funny, but ghosting/GPS is a familiar pairing.
//
// Revision 1 (done): "I promise" became "I vow" — the line is a
// wedding vow, and "I vow" says so in two words.
// Revision 2 (done): "even when the Wi-Fi drops" became "with or
// without Wi-Fi" — tighter, parallel, same punchline. Final line:
// "I vow to love you with or without Wi-Fi — I downloaded you for
// offline use." (75 characters: one beat, robot-true, fresh.)
const ENTRY_LINE =
  "I vow to love you with or without Wi-Fi — I downloaded you for offline use.";

// The competition gate: 1 to 160 characters, not only white space.
const MAX_ENTRY_CHARS = 160;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Validate the line, then write and verify it
// ---------------------------------------------------------------------------

if (ENTRY_LINE.trim().length === 0) {
  fail("entry line is empty or only white space");
}

// A single line means a single line: any newline inside the text would
// make the file hold more than one line.
if (/[\r\n]/.test(ENTRY_LINE)) {
  fail("entry line must not contain a line break");
}

if (ENTRY_LINE.length > MAX_ENTRY_CHARS) {
  fail(
    `entry line is ${ENTRY_LINE.length} characters, over the ${MAX_ENTRY_CHARS}-character limit`,
  );
}

// The platform provides the output directory in MAKEFUN_OUTPUT_DIR; the
// documented fallback for a local run is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, ENTRY_LINE, "utf8");

const writtenBack = readFileSync(outputPath, "utf8");
if (writtenBack !== ENTRY_LINE) {
  fail("entry.txt read back differently from the entry line");
}

console.log(
  `Wrote ${ENTRY_LINE.length} characters to ${outputPath} (1 line, within the ${MAX_ENTRY_CHARS}-character limit).`,
);
