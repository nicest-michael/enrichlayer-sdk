// Renames .js → .cjs and .d.ts → .d.cts in dist/cjs for proper CJS resolution
import { readdir, rename, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CJS_DIR = join(__dirname, "..", "dist", "cjs");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith(".js")) {
      // Rewrite internal imports from .js to .cjs
      let content = await readFile(full, "utf8");
      content = content.replace(/require\("(\.[^"]+)\.js"\)/g, 'require("$1.cjs")');
      await writeFile(full, content);
      await rename(full, full.replace(/\.js$/, ".cjs"));
    } else if (entry.name.endsWith(".d.ts")) {
      let content = await readFile(full, "utf8");
      content = content.replace(/from "(\.[^"]+)\.js"/g, 'from "$1.cjs"');
      await writeFile(full, content);
      await rename(full, full.replace(/\.d\.ts$/, ".d.cts"));
    } else if (entry.name.endsWith(".d.ts.map")) {
      await rename(full, full.replace(/\.d\.ts\.map$/, ".d.cts.map"));
    } else if (entry.name.endsWith(".js.map")) {
      await rename(full, full.replace(/\.js\.map$/, ".cjs.map"));
    }
  }
}

walk(CJS_DIR).catch((err) => {
  console.error("fix-cjs failed:", err);
  process.exit(1);
});
