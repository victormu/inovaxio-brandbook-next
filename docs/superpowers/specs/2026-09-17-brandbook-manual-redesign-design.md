# Redesign do Brandbook: linguagem de manual de marca

**Data:** 2026-09-17
**Status:** aprovado, aguardando plano de implementação
**Escopo desta rodada:** shell global + seção `/visual` (piloto)

---

## Problema

O brandbook funciona mas não parece um manual de marca. Três causas:

1. **Sem contraste de escala.** Toda a tipografia vive entre 13px e 17px. O
   `--text-6xl` é um alias de `--text-5xl`, então o topo da escala nem existe.
2. **Sem respiro.** Seções separadas por 64px, o mesmo valor usado dentro de
   uma seção. Nada indica onde um assunto termina e outro começa.
3. **Sem wayfinding durante a leitura.** A sidebar de 260px marca em que página
   você está, mas some do radar assim que você rola. Não há noção de progresso
   dentro do capítulo.

Some-se a isso uma contradição documental: `DESIGN.md` especifica *"pure black
canvas, dark-only, light mode is not designed"* enquanto `styles/tokens.css`
implementa claro-primeiro com escuro só dentro de `.ctx-dark`. O código está
certo, o documento está velho.

## Decisões tomadas

| Questão | Decisão |
|---|---|
| Canvas | **Claro.** Off-white/lavanda, texto quase-preto, azul só em acento. `DESIGN.md` será reescrito para refletir isso. |
| Mecânica sticky | **Trilho de seção à esquerda.** A sidebar fixa vira overlay; o número + nome + subitens da seção grudam enquanto o conteúdo corre. |
| Escopo | **Piloto em `/visual`.** Shell novo aplicado globalmente; linguagem interna só na seção mais rica. As outras 4 seguem na próxima rodada. |
| Motion | **CSS-only.** `position: sticky` nativo. Framer Motion só no overlay da nav. |

## Abordagem técnica

`position: sticky` em CSS Grid, mais um `IntersectionObserver` para acender o
subitem ativo no trilho.

Descartadas:
- **GSAP / ScrollTrigger:** nova dependência pesada para o que `sticky` faz nativo.
- **Framer Motion scroll-linked** (`useScroll` / `useTransform`): roda JS a cada
  frame de scroll, estoura o orçamento de INP e contraria o `DESIGN.md`, que já
  declara motion CSS-only.

### Efeito colateral deliberado

O scroll-spy que o trilho exige resolve, por construção, dois bugs abertos:

- subitem da nav nunca marcava posição atual, porque comparava `pathname` com
  um href que contém hash (`SideNav.tsx:189`)
- grupo da nav não reabria ao trocar de rota, porque `useState(isActive)` só lê
  o valor inicial (`SideNav.tsx:139`)

O primeiro deixa de existir porque a posição passa a vir do observer, não de
comparar strings de rota. O segundo deixa de existir porque o overlay desmonta
seu conteúdo ao fechar, então `useState(isActive)` reinicializa a cada abertura
com a rota corrente. Nenhum dos dois é escopo extra: é o mesmo código.

---

## Arquitetura

### Shell

```
┌──────────────────────────────────────────────┐
│ ☰  INOVAXIO Brandbook          03 / 05  ─────│  56px, sticky, hairline
├──────────────────────────────────────────────┤
│                                              │
│   [trilho 200px]     [conteúdo, resto]       │
│    sticky top:112     scroll normal          │
│                                              │
└──────────────────────────────────────────────┘
```

**Topbar** — 56px, `position: sticky; top: 0`, fundo com `backdrop-filter`,
hairline inferior. Esquerda: botão hambúrguer + marca. Direita: indicador de
capítulo (`03 / 05`).

**Nav overlay** — o `SideNav` perde a bifurcação desktop/mobile e passa a ser
sempre drawer. Entra da esquerda, backdrop, `Esc` fecha, foco preso enquanto
aberto. A lógica de drawer já existe no componente; o trabalho é remover o modo
fixo, não escrever um novo.

**Trilho** — 200px, `position: sticky; top: 112px`. Conteúdo: número do capítulo
em `--text-6xl`, nome da seção, hairline, lista de subitens com marcador no
ativo. Abaixo de 1024px o trilho sai do fluxo lateral e vira um cabeçalho
não-sticky no topo da seção.

**Conteúdo** — `--content-max` sobe de 980px para 1200px, ocupando a largura que
a sidebar liberou.

### Componentes novos

| Arquivo | Responsabilidade | Depende de |
|---|---|---|
| `components/manual/ManualShell.tsx` | Compõe topbar + trilho + slot de conteúdo | `SectionRail`, `SideNav` |
| `components/manual/SectionRail.tsx` | Trilho sticky, marca o subitem ativo | `useActiveSection`, `lib/nav` |
| `components/manual/ManualEntry.tsx` | A unidade que se repete (abaixo) | — |
| `hooks/useActiveSection.ts` | `IntersectionObserver` sobre ids; devolve o id visível | — |

Cada um tem uma responsabilidade e uma interface pequena. `ManualEntry` não sabe
nada sobre navegação; `SectionRail` não sabe nada sobre conteúdo.

### A unidade que se repete

```
LOGO HORIZONTAL                    ← eyebrow, --text-xs, tracking wide
┌────────────────────────────────┐
│                                │  ← imagem grande, largura total da coluna
│                                │     aspect-ratio reservado (sem CLS)
└────────────────────────────────┘
Versão principal. Use em          ← descritivo, --text-base, max 62ch
assinaturas horizontais e em
qualquer aplicação com largura.

SVG · 24 KB · área de proteção 1x  ← ficha técnica, --text-caption, mono
```

Interface:

```ts
interface ManualEntryProps {
  eyebrow: string;
  children: React.ReactNode;   // a mídia
  description?: string;
  specs?: string[];            // vira a linha de ficha técnica
  id?: string;                 // alvo do scroll-spy
}
```

Isso substitui a colagem ad-hoc de `div`s hoje espalhada por `LogoSection`,
`ColorSection`, `TypographySection`, `PhotographySection`, `GridSection` e
`IconsSection`.

---

## Tokens

### Tipografia

| Token | Hoje | Proposto | Uso |
|---|---|---|---|
| `--text-caption` | não existe | `0.75rem` (12px) | legenda de imagem, ficha técnica |
| `--text-xs` | 13px | inalterado | eyebrow, label |
| `--text-base` | 15px | inalterado | texto descritivo |
| `--text-4xl` | 30–44px | inalterado | título de seção |
| `--text-6xl` | alias de `--text-5xl` | `clamp(4rem, 2rem + 6vw, 8rem)` (64–128px) | número do capítulo |

O texto descritivo fica travado em `--text-base` com `max-width: 62ch` e
`--leading-relaxed`. Não cresce em tela grande: a linha longa é o que mata a
leitura de manual.

### Espaço

Dois tokens novos:

```css
--space-40: 160px;   /* entre seções */
--space-56: 224px;   /* entre capítulos, antes do rodapé */
```

Ritmo aplicado:

| Relação | Distância |
|---|---|
| legenda colada na sua imagem | `--space-3` (12px) |
| entre blocos dentro de uma seção | `--space-24` (96px) |
| entre seções | `--space-40` (160px) |
| antes do rodapé | `--space-56` (224px) |

A regra: o que pertence junto fica a 12px, o que é outro assunto fica a 160px.
É o contraste entre os dois extremos que lê como manual, não o valor absoluto.

---

## Arquivos

**Novos**

- `components/manual/ManualShell.tsx`
- `components/manual/SectionRail.tsx`
- `components/manual/ManualEntry.tsx`
- `hooks/useActiveSection.ts`

**Alterados**

- `styles/tokens.css` — `--text-caption`, `--text-6xl` real, `--space-40`, `--space-56`
- `app/globals.css` — shell novo; remove o grid `site-shell` de duas colunas
- `app/layout.tsx` — troca `site-shell` por `ManualShell`
- `components/nav/SideNav.tsx` — vira só drawer; perde o modo fixo desktop
- `app/visual/page.tsx` — passa a usar a composição nova
- `components/sections/visual/*.tsx` (6 arquivos) — passam a usar `ManualEntry`
- `DESIGN.md` — reescreve a seção de canvas; remove a afirmação dark-only

**Intocado nesta rodada**

`/fundamentos`, `/verbal`, `/aplicacoes`, `/recursos` e a home. Continuam
funcionando dentro do shell novo, apenas sem a linguagem interna nova. Entram na
rodada seguinte.

---

## Fora de escopo (registrado de propósito)

- **Inline styles → classes CSS.** Os componentes existentes usam `style={{}}`
  em quase tudo. Converter é churn grande e ortogonal a este redesign.
- **`<img>` → `next/image`.** São 6 ocorrências. Entra numa rodada de
  performance própria.
- **Os 8 downloads quebrados** em `/recursos` (arquivo inexistente). Bug
  separado, seção separada.
- **Preloader de 1.6s.** Custo de LCP conhecido, decisão de produto, não de
  layout.

---

## Verificação

| Check | Critério |
|---|---|
| Tipos | `tsc --noEmit` sem erros |
| Build | `next build` sem erros, rotas seguem estáticas |
| Lint | não sobe dos 5 findings atuais; meta é **2**, pelos arquivos que este trabalho já toca: `SideNav:14` (fechar o drawer passa a ser `onClick` no link, não efeito), `LogoSection:2` e `PageBanner:45` (imports mortos, removidos ao reescrever). `Preloader:22` e `Reveal:48` ficam: são componentes fora do escopo desta rodada. |
| Responsivo | screenshot em 390, 768, 1280, 1600 — trilho colapsa abaixo de 1024, sem overflow horizontal |
| Sticky | trilho gruda e solta no limite da seção, sem sobrepor a topbar |
| Scroll-spy | subitem correto acende ao rolar; funciona também ao chegar por link com hash |
| Acessibilidade | `Esc` fecha o overlay, foco preso enquanto aberto, `aria-current` no subitem ativo |
| Motion | `prefers-reduced-motion` desliga a animação do overlay |
