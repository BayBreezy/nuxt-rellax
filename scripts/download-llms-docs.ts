#!/usr/bin/env tsx
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface DocEntry {
  name: string;
  url: string;
  file?: string;
}

function normalizeName(name: string) {
  return name.trim().replace(/[^\w-]/g, "-");
}

async function loadManifest(manifestPath: string) {
  const content = await readFile(manifestPath, "utf8");
  const parsed = JSON.parse(content) as unknown;
  if (!Array.isArray(parsed)) {
    throw new TypeError("Manifest must be an array of { name, url, file? }");
  }
  return parsed as DocEntry[];
}

async function downloadDoc(entry: DocEntry, outDir: string) {
  if (!entry.name || !entry.url) {
    throw new Error("Each manifest entry requires 'name' and 'url'");
  }

  const safeName = normalizeName(entry.name);
  const targetDir = path.join(outDir, safeName);
  await mkdir(targetDir, { recursive: true });

  const response = await fetch(entry.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${entry.url}: ${response.status} ${response.statusText}`);
  }

  const content = await response.text();
  const fileName = entry.file ?? "llms.txt";
  const targetPath = path.join(targetDir, fileName);
  await writeFile(targetPath, content, "utf8");
  console.log(`✅ Saved ${entry.name} -> ${targetPath}`);
}

async function main() {
  const manifestPath = path.resolve(
    process.env.LLMS_DOCS_MANIFEST ?? path.join(process.cwd(), "scripts/llms-docs.json"),
  );
  const outDir = path.resolve(process.env.LLMS_DOCS_DIR ?? path.join(process.cwd(), "docs-llms"));

  const manifest = await loadManifest(manifestPath);
  for (const entry of manifest) {
    await downloadDoc(entry, outDir);
  }

  console.log(`\n📥 Download complete. Files are in: ${outDir}`);
}

main().catch((error) => {
  console.error("❌ Download failed:", error);
  process.exit(1);
});
