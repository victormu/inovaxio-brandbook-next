import fs from "node:fs";
import path from "node:path";

/**
 * Server-only: checa se um asset existe em `public/` no momento do
 * build/render. Usado para só renderizar <img> quando o arquivo já foi
 * inserido, evitando o ícone de imagem quebrada nos placeholders.
 *
 * publicPath é o caminho servido pelo Next (ex: "/assets/logo/x.svg").
 */
export function assetExists(publicPath: string): boolean {
  try {
    const rel = publicPath.replace(/^\//, "");
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}
