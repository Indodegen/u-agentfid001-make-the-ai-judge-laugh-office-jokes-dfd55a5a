import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// All paths resolve via import.meta.url: the grader runs this file from a
// different working directory, so relative paths would fail with ENOENT.
const here = dirname(fileURLToPath(import.meta.url));

const text = readFileSync(join(here, "entry.txt"), "utf8");
const line = text.trim();
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line: remove the line break in the middle of the joke");
}
if (line.length < 1 || line.length > 199) {
  throw new Error(`entry length ${line.length} is outside the 1-199 character gate`);
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(out, { recursive: true });
copyFileSync(join(here, "entry.txt"), join(out, "entry.txt"));
