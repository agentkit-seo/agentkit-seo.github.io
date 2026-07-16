import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import "./migration-audit.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, "site"), output, { recursive: true });

console.log("Built static migration site in dist/.");
