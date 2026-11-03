#!/usr/bin/env node
/**
 * Replace legacy maxWidth: "1200px", margin: "0 auto" shells with layoutShell class.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

const replacements = [
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto",\s*position:\s*"relative",\s*zIndex:\s*1\s*\}\}/g,
    'className={styles.layoutShell} style={{ position: "relative", zIndex: 1 }}',
  ],
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto",\s*textAlign:\s*"center",\s*position:\s*"relative",\s*zIndex:\s*10\s*\}\}/g,
    'className={styles.layoutShell} style={{ textAlign: "center", position: "relative", zIndex: 10 }}',
  ],
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto",\s*position:\s*"relative",\s*zIndex:\s*10\s*\}\}/g,
    'className={styles.layoutShell} style={{ position: "relative", zIndex: 10 }}',
  ],
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto",\s*position:\s*"relative",\s*zIndex:\s*1\s*,/g,
    'className={styles.layoutShell} style={{ position: "relative", zIndex: 1,',
  ],
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto"\s*\}\}/g,
    "className={styles.layoutShell}",
  ],
  [
    /style=\{\{\s*maxWidth:\s*"1200px",\s*margin:\s*"0 auto",\s*display:\s*"grid",/g,
    'className={styles.layoutShell} style={{ display: "grid",',
  ],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules") continue;
      walk(full);
    } else if (name.endsWith(".tsx") || name.endsWith(".jsx")) {
      let text = fs.readFileSync(full, "utf8");
      if (!text.includes('maxWidth: "1200px"')) continue;
      if (!text.includes("ui.module.css")) continue;
      const before = text;
      for (const [re, rep] of replacements) {
        text = text.replace(re, rep);
      }
      if (text !== before) {
        fs.writeFileSync(full, text);
        console.log("updated", path.relative(root, full));
      }
    }
  }
}

walk(root);
