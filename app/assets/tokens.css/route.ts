import fs from "node:fs";
import path from "node:path";

// Gerado no build a partir do arquivo real: o download nunca diverge da
// fonte de verdade, e não existe cópia em public/ para esquecer de atualizar.
export const dynamic = "force-static";

export function GET() {
  const css = fs.readFileSync(
    path.join(process.cwd(), "styles", "tokens.css"),
    "utf8",
  );
  return new Response(css, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Content-Disposition": 'attachment; filename="inovaxio-tokens.css"',
    },
  });
}
