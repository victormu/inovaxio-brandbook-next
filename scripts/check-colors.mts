import fs from "node:fs";
import path from "node:path";
import { encontrarCorCrua } from "../lib/colorGuard.ts";

/**
 * ColorSection documenta a paleta: ali o hex é DADO, não estilo. Uma amostra
 * de #2E2EFE precisa ser literalmente #2E2EFE, senão o manual mente.
 */
const ISENTOS = new Set(["components/sections/visual/ColorSection.tsx"]);

function tsx(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith("._") || e.name === "node_modules" || e.name === ".next") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...tsx(p));
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const arquivos = [...tsx("app"), ...tsx("components")];
let total = 0;

for (const arq of arquivos) {
  if (ISENTOS.has(arq)) continue;
  const achados = encontrarCorCrua(fs.readFileSync(arq, "utf8"));
  for (const a of achados) {
    console.error(`${arq}:${a.linha}  ${a.motivo.padEnd(9)} ${a.trecho}`);
    total++;
  }
}

if (total > 0) {
  console.error(`\n${total} cor(es) escrita(s) à mão. Use var(--color-*) ou color-mix sobre ele.`);
  process.exit(1);
}
console.log(`Cor: ok. ${arquivos.length} arquivos, ${ISENTOS.size} isento.`);
