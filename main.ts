// Fridge Roast: One Line, Biggest Laugh
// Writes a single-line roast of a smart fridge to /output/entry.txt
// (or to the path given as argv[2], file or directory).
import { writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const ENTRY =
  "My smart fridge updated its firmware last night and now the ice maker won't work until I accept the terms — even the ice has a EULA.";

// Gate: one line, 1 to 200 characters, not only white space.
if (ENTRY.length < 1 || ENTRY.length > 200 || !ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error(`entry violates gate: ${ENTRY.length} characters`);
}

function resolveTarget(target: string): string {
  // Accept either a file path or a directory (then entry.txt inside it).
  try {
    if (statSync(target).isDirectory()) return join(target, "entry.txt");
  } catch {
    // target does not exist yet: treat it as a file path
  }
  return target;
}

const target = resolveTarget(process.argv[2] ?? "/output/entry.txt");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, ENTRY, "utf8");
console.log(`wrote ${target} (${ENTRY.length} characters)`);
