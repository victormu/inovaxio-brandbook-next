# Fechar a auditoria: guarda de tokens e limpeza — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar a causa sistêmica dos defeitos de contraste desta sessão (cor escrita à mão por fora do sistema de bandas), impedir que ela volte com uma checagem automática, e limpar o que a auditoria deixou aberto.

**Architecture:** Nenhuma refatoração em massa. A auditoria mostrou que dos 285 objetos `style={{}}`, só **80 contêm cor literal**, e **63 desses estão no `ColorSection`, onde hex é dado e não estilo** (uma amostra de `#2E2EFE` precisa ser literalmente `#2E2EFE`). Sobram 17 ocorrências reais, das quais 8 são uso de token primitivo em vez do semântico. O trabalho é corrigir essas, criar uma checagem que falha se novas aparecerem, e remover código morto.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, CSS custom properties, `node --test` com type stripping nativo.

**Spec:** `docs/auditoria-2026-09-18-resolucoes.md`

## Global Constraints

- **Sem dependência nova.** Nenhum `npm install` neste plano.
- **Cor nunca é escrita à mão em componente.** Vem de `var(--color-*)` ou de `color-mix()` sobre ele. Exceção única: `ColorSection.tsx`, que documenta a paleta.
- **Token primitivo (`--c-*`) não é usado em componente.** Ele não troca por banda; quem troca é o semântico (`--color-*`).
- **Zero travessão** em texto visível. Use ponto, vírgula, parênteses ou dois-pontos.
- **Proibido no copy:** "produto digital", "engenharia", "fábrica de software".
- **Componentes são named exports.** Arquivos abaixo de 800 linhas.
- **Motion CSS-only.** `transform` e `opacity` apenas.
- Verificação de cada task: `npx tsc --noEmit`, `npm run build`, `npm test`, `npx eslint .`.

---

### Task 1: Checagem que impede cor escrita à mão

A peça mais valiosa do plano: sem ela, as próximas tasks são limpeza de uma vez só, e o problema volta no próximo componente. Vem primeiro porque define o alvo das tasks seguintes.

**Files:**
- Create: `lib/colorGuard.ts`
- Create: `lib/colorGuard.test.ts`
- Create: `scripts/check-colors.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `interface Ocorrencia { linha: number; trecho: string; motivo: "literal" | "primitivo" }`
  - `function encontrarCorCrua(fonte: string): Ocorrencia[]`

- [ ] **Step 1: Escrever o teste que falha**

Crie `lib/colorGuard.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { encontrarCorCrua } from "./colorGuard.ts";

test("token semantico passa", () => {
  assert.deepEqual(encontrarCorCrua('color: "var(--color-primary)"'), []);
});

test("color-mix sobre token semantico passa", () => {
  const src = 'background: "color-mix(in srgb, var(--color-error) 8%, transparent)"';
  assert.deepEqual(encontrarCorCrua(src), []);
});

test("hex literal e apontado", () => {
  const r = encontrarCorCrua('color: "#ffffff"');
  assert.equal(r.length, 1);
  assert.equal(r[0].motivo, "literal");
});

test("hsl e rgb literais sao apontados", () => {
  assert.equal(encontrarCorCrua('color: "hsl(140 50% 60%)"')[0].motivo, "literal");
  assert.equal(encontrarCorCrua('background: "rgb(46 46 254 / 0.2)"')[0].motivo, "literal");
});

test("token primitivo e apontado, porque nao troca por banda", () => {
  const r = encontrarCorCrua('background: "hsl(var(--c-primary) / 0.1)"');
  assert.equal(r.length, 1);
  assert.equal(r[0].motivo, "primitivo");
});

test("reporta a linha certa", () => {
  const src = 'linha um\nlinha dois\ncolor: "#000"';
  assert.equal(encontrarCorCrua(src)[0].linha, 3);
});

test("ignora cor em comentario", () => {
  assert.deepEqual(encontrarCorCrua('// medido: "#6B6D78" da 4,40:1'), []);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node --test lib/colorGuard.test.ts`
Expected: FAIL, `Cannot find module './colorGuard.ts'`.

- [ ] **Step 3: Escrever a função pura**

Crie `lib/colorGuard.ts`:

```ts
export interface Ocorrencia {
  linha: number;
  trecho: string;
  /** "literal": hex/hsl/rgb escrito à mão. "primitivo": --c-* em componente. */
  motivo: "literal" | "primitivo";
}

/** Hex, hsl() e rgb() entre aspas, que é como cor aparece em style inline. */
const LITERAL = /"(#[0-9a-fA-F]{3,8}|(?:hsl|rgb)a?\([^"]*\))"/;
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
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `node --test lib/colorGuard.test.ts`
Expected: `pass 7`, `fail 0`.

- [ ] **Step 5: Escrever o script que varre o projeto**

Crie `scripts/check-colors.ts`:

```ts
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
```

- [ ] **Step 6: Rodar e ver o inventário do que precisa mudar**

Run: `node scripts/check-colors.ts`
Expected: FALHA, listando as ocorrências. Anote a lista: é o alvo das Tasks 2 e 3.

- [ ] **Step 7: Ligar no npm test**

Em `package.json`, o script `test` passa a rodar as duas coisas:

```json
"test": "node --test \"**/*.test.ts\" && node scripts/check-colors.ts"
```

- [ ] **Step 8: Commit**

```bash
git add lib/colorGuard.ts lib/colorGuard.test.ts scripts/check-colors.ts package.json
git commit -m "test: checagem que impede cor escrita a mao em componente

Cor literal e token primitivo nao acompanham a troca de banda, e foi
dessa classe que sairam os defeitos de contraste da auditoria. A decisao
fica numa funcao pura com 7 casos, e um script varre app/ e components/.
ColorSection e isento: ali o hex e dado, nao estilo."
```

---

### Task 2: Token primitivo passa a semântico

As 8 ocorrências de `hsl(var(--c-*) / N)`. O primitivo é o valor bruto e não é redefinido dentro de `.ctx-dark`, então esses fundos ficam com a cor da banda clara quando o componente cai numa banda escura.

**Files:**
- Modify: `components/ui/ChecklistItem.tsx:22,24`
- Modify: `components/ui/CopyBlock.tsx:27,29`
- Modify: `components/sections/visual/GridSection.tsx:46`
- Modify: `app/fundamentos/page.tsx:30`

**Interfaces:**
- Consumes: `encontrarCorCrua` da Task 1 (via `node scripts/check-colors.ts`)
- Produces: nada

- [ ] **Step 1: Ver o alvo exato**

Run: `node scripts/check-colors.ts 2>&1 | grep primitivo`
Expected: as 8 linhas listadas acima.

- [ ] **Step 2: Trocar em ChecklistItem**

Em `components/ui/ChecklistItem.tsx`, o fundo e a borda do estado marcado:

```tsx
        background: checked
          ? "color-mix(in srgb, var(--color-success) 6%, transparent)"
          : "transparent",
        border: `1px solid ${checked ? "color-mix(in srgb, var(--color-success) 25%, transparent)" : "var(--color-border)"}`,
```

- [ ] **Step 3: Trocar em CopyBlock**

Em `components/ui/CopyBlock.tsx`, o destaque:

```tsx
        background: isHighlight
          ? "color-mix(in srgb, var(--color-primary) 8%, transparent)"
          : "transparent",
        border: `1px solid ${isHighlight ? "color-mix(in srgb, var(--color-primary) 20%, transparent)" : "var(--color-border)"}`,
```

- [ ] **Step 4: Trocar em GridSection e fundamentos**

`components/sections/visual/GridSection.tsx:46`:

```tsx
              background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
```

`app/fundamentos/page.tsx:30`:

```tsx
          background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
```

- [ ] **Step 5: Confirmar que a guarda parou de reclamar de primitivo**

Run: `node scripts/check-colors.ts 2>&1 | grep -c primitivo || echo "zero primitivos"`
Expected: `zero primitivos`.

- [ ] **Step 6: Verificar build e tipos**

Run: `npx tsc --noEmit && npm run build`
Expected: ambos sem erro.

- [ ] **Step 7: Commit**

```bash
git add components/ui/ChecklistItem.tsx components/ui/CopyBlock.tsx components/sections/visual/GridSection.tsx app/fundamentos/page.tsx
git commit -m "fix: token primitivo vira semantico nos fundos tingidos

var(--c-primary) e var(--c-success) sao o valor bruto e nao sao
redefinidos dentro de .ctx-dark, entao esses fundos ficavam com a cor da
banda clara quando o componente caia numa banda escura. Passam a
color-mix sobre o token semantico, que troca."
```

---

### Task 3: `--color-on-primary` para texto sobre o azul

As duas ocorrências de `color: "#fff"` em cima de `--color-primary`. O branco está correto (medido 5,77:1), mas escrito à mão: se o azul da marca mudar, ninguém revisita esses dois pontos.

**Files:**
- Modify: `styles/tokens.css` (bloco de semânticos do `:root`)
- Modify: `components/ui/DownloadCard.tsx:137`
- Modify: `components/sections/visual/IconsSection.tsx:247`
- Modify: `components/sections/PageBanner.tsx:53` — ver Task 4, o arquivo é removido lá; se a Task 4 já rodou, pule esta linha

**Interfaces:**
- Consumes: nada
- Produces: `--color-on-primary`, usado por qualquer coisa que pinte sobre o azul

- [ ] **Step 1: Criar o token**

Em `styles/tokens.css`, no bloco de semânticos do `:root`, logo depois de `--color-primary-text`:

```css
  /* Texto e ícone sobre o azul da marca. Medido 5,77:1 no #2E2EFE. Existe
     como token para que trocar o azul não deixe nenhum ponto para trás. */
  --color-on-primary: #ffffff;
```

Não redefina em `.ctx-dark` nem em `.ctx-navy`: o azul é o mesmo nas quatro bandas, então o que fica em cima dele também é.

- [ ] **Step 2: Usar no DownloadCard**

`components/ui/DownloadCard.tsx:137`, no botão Baixar:

```tsx
            color: "var(--color-on-primary)",
```

- [ ] **Step 3: Usar no IconsSection**

`components/sections/visual/IconsSection.tsx:247`:

```tsx
                    color: "var(--color-on-primary)",
```

- [ ] **Step 4: Medir que o contraste não mudou**

Com `npm run dev` rodando, no console do browser em `http://localhost:3000/recursos`:

```js
const b = document.querySelector('.download-btn');
const cs = getComputedStyle(b);
console.log(cs.color, cs.backgroundColor);
```

Expected: `rgb(255, 255, 255)` sobre `rgb(47, 47, 254)`, o mesmo de antes.

- [ ] **Step 5: Commit**

```bash
git add styles/tokens.css components/ui/DownloadCard.tsx components/sections/visual/IconsSection.tsx
git commit -m "feat(tokens): --color-on-primary para o que pinta sobre o azul

O branco estava escrito a mao nos dois botoes azuis. Esta correto (5,77:1)
mas invisivel para quem trocar o azul da marca depois. Vira token."
```

---

### Task 4: Remover o código morto e converter a última rota

`PageBanner` não é importado por ninguém (verificado: só aparece no próprio arquivo). `SectionHeader` sobrevive apenas em `/visual/aplicacoes`, a única rota que nunca recebeu a linguagem de painéis.

**Files:**
- Modify: `app/visual/aplicacoes/page.tsx`
- Delete: `components/sections/PageBanner.tsx`
- Delete: `components/sections/SectionHeader.tsx`

**Interfaces:**
- Consumes: `Panel` de `components/manual/Panel.tsx`, `Topic` de `components/manual/Topic.tsx`
- Produces: nada

- [ ] **Step 1: Confirmar que PageBanner está morto**

```bash
grep -rn "PageBanner" app components --include="*.tsx" | grep -v '\._' | grep -v "components/sections/PageBanner.tsx"
```

Expected: nenhuma saída. Se houver, pare e reporte: alguém voltou a usar.

- [ ] **Step 2: Ver a estrutura de `/visual/aplicacoes`**

```bash
grep -n "<section\|SectionHeader\|title=\|eyebrow=" app/visual/aplicacoes/page.tsx
```

Anote quantos blocos existem e o título de cada um: são eles que viram `Panel`.

- [ ] **Step 3: Converter cada bloco**

Para cada `<section>` com `SectionHeader`, aplique o mesmo molde já usado nas outras cinco rotas: o `<section aria-labelledby="X">` mais o `<SectionHeader eyebrow title description />` viram um `<Panel>`, e cada subtítulo interno vira `<Topic>`:

```tsx
      <Panel
        id="<id-da-ancora>"
        index="<n> / <total>"
        title="<o title do SectionHeader>"
        band="light"
        lead="<a description do SectionHeader>"
      >
        <Topic wide title="<subtitulo>" lead="<apoio>">
          {/* o conteúdo que já existia */}
        </Topic>
      </Panel>
```

Alterne a banda ao longo da página: `light`, `dim`, `light`, com no máximo um `dark` como respiro. Troque o import de `SectionHeader` por:

```tsx
import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
```

- [ ] **Step 4: Apagar os dois componentes mortos**

```bash
rm components/sections/PageBanner.tsx components/sections/SectionHeader.tsx
```

- [ ] **Step 5: Verificar que nada quebrou**

```bash
npx tsc --noEmit && npm run build && npx eslint .
```

Expected: tipos limpos, build com 10 rotas estáticas, ESLint sem erro novo.

- [ ] **Step 6: Conferir no browser**

Com `npm run dev`, abra `http://localhost:3000/visual/aplicacoes`. Confirme: os painéis ocupam a tela, a topbar inverte a cor sobre a banda escura, e não há rolagem horizontal em 390px.

- [ ] **Step 7: Commit**

```bash
git add app/visual/aplicacoes components/sections
git commit -m "refactor: converte a ultima rota e remove os componentes mortos

/visual/aplicacoes era a unica pagina ainda no layout antigo. Com ela
convertida, PageBanner e SectionHeader ficam sem nenhum consumidor e sao
removidos. PageBanner ja estava morto antes desta task."
```

---

### Task 5: Decidir o `--radius-2xl`

O `tokens.css` chama 28px de "assinatura do site" e o `DESIGN.md` documenta como tal, mas ele é usado uma vez só, em `.card-site`. Ou o documento mente, ou o código não entrega.

**Files:**
- Modify: `app/globals.css` (blocos `.chapter-cover__inner` e `.cover`)
- Modify: `DESIGN.md` (tabela de Shapes)

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Ver onde ele é usado hoje**

```bash
grep -rn "radius-2xl" app components styles --include="*.tsx" --include="*.css"
```

Expected: a definição em `styles/tokens.css` e um uso em `.card-site`.

- [ ] **Step 2: Adotar nas superfícies grandes**

O raio de 28px só faz sentido em superfície grande: num card pequeno vira bolha. Aplique nos dois blocos de abertura, em `app/globals.css`, dentro de `.chapter-cover__inner`:

```css
  /* --radius-2xl é a assinatura do site: vale em superfície grande, onde
     28px lê como intenção, e não em card pequeno, onde vira bolha. */
  border-radius: var(--radius-2xl);
  overflow: hidden;
```

- [ ] **Step 3: Corrigir a escala no DESIGN.md**

Na tabela de Shapes, a linha do `xxl` passa a descrever o uso real:

```markdown
| `{rounded.xxl}` | 28px | A assinatura do site. Superfícies grandes: abertura de capítulo e cartão de destaque. Nunca em card pequeno. |
```

- [ ] **Step 4: Conferir que não ficou estranho**

Com `npm run dev`, abra `http://localhost:3000/fundamentos` em 1440 e em 390. A abertura do capítulo deve ter canto arredondado visível sem parecer um botão gigante. Se ficar estranho em tela pequena, prefira remover o token a forçá-lo: nesse caso, apague `--radius-2xl` de `styles/tokens.css`, troque o uso em `.card-site` por `--radius-xl` e apague a linha `xxl` da tabela do `DESIGN.md`.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css DESIGN.md
git commit -m "style: --radius-2xl deixa de ser promessa nao cumprida

O tokens.css chamava 28px de assinatura do site e o DESIGN.md documentava
como tal, mas era usado uma vez so. Passa a valer nas aberturas de
capitulo, que sao superficie grande o bastante para o raio ler como
intencao."
```

---

### Task 6: Fechar os dois `set-state-in-effect`

`Preloader:23` e `Reveal:48` chamam `setState` dentro de efeito para ler uma media query. O jeito certo em React 19 é `useSyncExternalStore`, que é feito exatamente para assinar store externo.

**Files:**
- Create: `hooks/usePrefersReducedMotion.ts`
- Modify: `components/ui/Preloader.tsx:14-24`
- Modify: `components/ui/Reveal.tsx:36-52`

**Interfaces:**
- Consumes: nada
- Produces: `function usePrefersReducedMotion(): boolean`

- [ ] **Step 1: Criar o hook**

Crie `hooks/usePrefersReducedMotion.ts`:

```ts
"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/** No servidor não há preferência a ler: assume movimento normal. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Lê prefers-reduced-motion como store externo, que é o que ele é.
 * Substitui o padrão de ler no efeito e chamar setState, e de quebra passa
 * a reagir se a pessoa mudar a preferência com a página aberta.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

- [ ] **Step 2: Usar no Preloader**

Em `components/ui/Preloader.tsx`, remova o `useState` de `reduzido` e a leitura dentro do efeito. O topo do componente passa a ser:

```tsx
export function Preloader() {
  const [loading, setLoading] = useState(true);
  const reduzido = usePrefersReducedMotion();

  useEffect(() => {
    // Já rodou nesta sessão: não mostra de novo.
    if (sessionStorage.getItem("inovaxio-preloaded")) {
      setLoading(false);
      return;
    }
```

Acrescente o import:

```tsx
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
```

O resto do componente não muda: `reduzido` já é consumido nas três transições.

- [ ] **Step 3: Usar no Reveal**

Em `components/ui/Reveal.tsx`, o estado passa a ser derivado em vez de escrito no efeito:

```tsx
  const Tag = (as ?? "div") as ElementType;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visto, setVisto] = useState(false);
  const reduzido = usePrefersReducedMotion();

  // Com movimento reduzido nada precisa aparecer aos poucos: já nasce visível.
  const revealed = reduzido || visto;

  useEffect(() => {
    if (!node || reduzido) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisto(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisto(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, reduzido]);
```

Acrescente o import e troque o `setRevealed` que sobrou. O `data-revealed` no `Tag` continua lendo a variável `revealed`.

- [ ] **Step 4: Confirmar que o ESLint zerou**

Run: `npx eslint .`
Expected: nenhum erro. Se sobrar o `setVisto(true)` do caminho sem `IntersectionObserver`, ele é legítimo (ambiente sem a API precisa mostrar o conteúdo) e pode receber `// eslint-disable-next-line react-hooks/set-state-in-effect` na linha imediatamente anterior, com o motivo em comentário normal acima. Atenção: a diretiva só vale para a linha seguinte, então o comentário de razão não pode ficar entre ela e o código.

- [ ] **Step 5: Verificar que o movimento reduzido continua respeitado**

Com `npm run dev`, no browser com movimento reduzido ativado (DevTools, Rendering, Emulate CSS prefers-reduced-motion), recarregue `http://localhost:3000/verbal` e confirme no console:

```js
getComputedStyle(document.querySelector('[style*="z-index: 9999"]') ?? document.body).transform
```

Expected: `none` durante toda a saída do preloader.

- [ ] **Step 6: Verificar tudo**

```bash
npx tsc --noEmit && npm test && npm run build && npx eslint .
```

Expected: tipos limpos, testes passando, build com 10 rotas, ESLint **zerado**.

- [ ] **Step 7: Commit**

```bash
git add hooks/usePrefersReducedMotion.ts components/ui/Preloader.tsx components/ui/Reveal.tsx
git commit -m "refactor: prefers-reduced-motion vira useSyncExternalStore

Os dois ultimos erros de ESLint eram setState dentro de efeito para ler
uma media query. useSyncExternalStore e feito para assinar store externo,
que e o que uma media query e. De quebra, agora reage se a pessoa mudar a
preferencia com a pagina aberta. ESLint: 2 -> 0."
```

---

## Self-Review

**Cobertura do spec:**

| Item da auditoria | Task |
|---|---|
| Causa sistêmica: cor por fora dos tokens | Task 1 (guarda) + Tasks 2 e 3 (as 17 ocorrências) |
| Margem apertada do faint sobre surface-2 | Registrada na auditoria; a guarda da Task 1 não cobre isso, é decisão de valor e não de padrão |
| `--radius-2xl` prometido e não usado | Task 5 |
| 2 erros de ESLint | Task 6 |
| Contra-exemplo 2,94:1 | Fora de escopo por decisão: a auditoria recomenda manter |

**Consistência de tipos:** `Ocorrencia` e `encontrarCorCrua` definidos na Task 1 e consumidos com a mesma assinatura por `scripts/check-colors.ts` na mesma task. `usePrefersReducedMotion(): boolean` definido na Task 6 Step 1 e consumido nos Steps 2 e 3 com esse nome exato.

**Dependência de ordem:** a Task 1 vem primeiro porque o script dela é o que lista o alvo das Tasks 2 e 3. A Task 4 remove `PageBanner.tsx`, que a Task 3 Step 1 menciona: se a Task 4 rodar antes, a linha do `PageBanner` na Task 3 simplesmente não existe, e isso está anotado lá.

**Escopo deliberadamente fora:** não há task para converter os 285 `style={{}}` em classes CSS. A auditoria não mostrou defeito causado por inline style em si, só por cor escrita à mão, e essa fatia são 17 ocorrências. Converter os outros 268 seria churn grande sem defeito medido para justificar. Se o motivo for ritmo visual inconsistente, isso é outro spec.
