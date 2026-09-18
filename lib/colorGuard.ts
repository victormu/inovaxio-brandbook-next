export interface Ocorrencia {
  linha: number;
  trecho: string;
  /** "literal": hex/hsl/rgb escrito à mão. "primitivo": --c-* em componente. */
  motivo: "literal" | "primitivo";
}

/**
 * Hex, hsl() e rgb() entre aspas, que é como cor aparece em style inline.
 * O `(?!.*var\()` exclui `"hsl(var(--c-primary) / 0.1)"`: aquilo não é cor
 * escrita à mão, é token primitivo usado no lugar do semântico, e o motivo
 * certo para reportar é o outro.
 */
const LITERAL = /"(#[0-9a-fA-F]{3,8}|(?:hsl|rgb)a?\((?!.*var\()[^"]*\))"/;
/** O primitivo não é redefinido por banda: quem troca é o semântico. */
const PRIMITIVO = /var\(\s*--c-[a-z-]+/;

/**
 * Acha cor escrita à mão no fonte de um componente.
 *
 * Duas coisas são erro. Cor literal (`"#fff"`, `"hsl(...)"`) não acompanha a
 * troca de banda. E token primitivo (`var(--c-primary)`) também não: ele é o
 * valor bruto, e só o semântico (`var(--color-primary)`) é redefinido dentro
 * de `.ctx-dark` e `.ctx-navy`.
 *
 * Linha de comentário é ignorada: a auditoria registra hex medido em prosa.
 */
export function encontrarCorCrua(fonte: string): Ocorrencia[] {
  const out: Ocorrencia[] = [];
  const linhas = fonte.split("\n");

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const semEspaco = linha.trimStart();
    if (semEspaco.startsWith("//") || semEspaco.startsWith("*")) continue;

    const literal = linha.match(LITERAL);
    if (literal) {
      out.push({ linha: i + 1, trecho: literal[0], motivo: "literal" });
      continue;
    }
    const primitivo = linha.match(PRIMITIVO);
    if (primitivo) {
      out.push({ linha: i + 1, trecho: linha.trim().slice(0, 60), motivo: "primitivo" });
    }
  }
  return out;
}
