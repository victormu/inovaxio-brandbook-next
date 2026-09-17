# Redesign do Brandbook para linguagem de manual — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o brandbook num manual de marca navegável: trilho de seção sticky à esquerda, navegação em overlay, contraste real de escala tipográfica e ritmo de espaço de manual impresso, com a seção `/visual` como piloto.

**Architecture:** `position: sticky` nativo em CSS Grid para o trilho; um `IntersectionObserver` alimenta uma função pura que escolhe a seção ativa. A sidebar fixa de 260px sai e vira drawer overlay em todas as larguras, liberando a largura da página para imagens grandes. Framer Motion permanece só onde já paga (Preloader, overlay).

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, CSS custom properties (sem Tailwind utilitário nos componentes), `node --test` com type stripping nativo do Node para os checks unitários.

**Spec:** `docs/superpowers/specs/2026-09-17-brandbook-manual-redesign-design.md`

## Global Constraints

- **Canvas claro.** `--color-bg: #ffffff`, superfícies `#f4f4f7`/`#ecedf4`. Escuro só dentro de `.ctx-dark`.
- **Ciano nunca é acento de UI.** Existe só em `--gradient-brand-h` e nas amostras da seção Cor.
- **Zero travessões** em qualquer texto visível. Use ponto, vírgula, parênteses ou dois-pontos.
- **Proibido no copy do site:** "produto digital", "engenharia", "fábrica de software".
- **Motion CSS-only.** Nada de scroll-linked JS. `transform` e `opacity` apenas.
- **Componentes são named exports.** Sem `export default` fora de `app/**/page.tsx` e `layout.tsx`.
- **Arquivos abaixo de 800 linhas.**
- **Texto descritivo não passa de `--text-base` (15px) e `62ch`.**
- **Sem dependências novas.** Nenhum `npm install` neste plano.
- **Node local:** v25.2.1 (type stripping nativo). Vercel builda em Node 24.x. Os testes rodam só localmente.

---

### Task 1: Tokens de tipografia e espaço

Abre o topo e o piso da escala. `--text-6xl` hoje é um alias inútil de `--text-5xl` e não é usado em lugar nenhum (verificado por grep), então redefinir é seguro.

**Files:**
- Modify: `styles/tokens.css:66-84` (bloco de tipografia) e `:86-98` (bloco de espaçamento)

**Interfaces:**
- Consumes: nada
- Produces: `--text-caption`, `--text-6xl`, `--space-40`, `--space-56`, usados por todas as tasks seguintes

- [ ] **Step 1: Confirmar que `--text-6xl` não tem consumidor**

```bash
grep -rn "text-6xl" app components --include="*.tsx" | grep -v '\._'
```

Esperado: nenhuma saída. Se houver, pare e reporte antes de redefinir.

- [ ] **Step 2: Adicionar `--text-caption` e redefinir `--text-6xl`**

Em `styles/tokens.css`, dentro de `:root`, no bloco de tipografia. Substitua a linha `--text-6xl:  var(--text-5xl);` e adicione `--text-caption` logo antes de `--text-xs`:

```css
  /* Piso da escala: legenda de imagem e ficha técnica. Não use para leitura. */
  --text-caption: 0.75rem;   /* 12 */
  --text-xs:   0.8125rem;  /* 13 */
  --text-sm:   0.875rem;   /* 14 */
  --text-base: 0.9375rem;  /* 15 */
  --text-lg:   1.0625rem;  /* 17 */
  --text-xl:   1.25rem;    /* 20 */
  --text-2xl:  1.625rem;   /* 26 */
  --text-3xl:  clamp(1.5rem, 1.2rem + 1.1vw, 2rem);      /* 24-32 título */
  --text-4xl:  clamp(1.9rem, 1.3rem + 2vw, 2.75rem);     /* 30-44 display */
  --text-5xl:  clamp(2.5rem, 1.5rem + 3.2vw, 4.25rem);   /* 40-68 hero */
  /* Topo da escala: número do capítulo no trilho. Só isso. */
  --text-6xl:  clamp(4rem, 2rem + 6vw, 8rem);            /* 64-128 capítulo */
```

- [ ] **Step 3: Adicionar os dois espaços grandes**

No bloco `── Espaçamento (escala 4pt) ──`, depois de `--space-32`:

```css
  --space-40: 160px;   /* entre seções */
  --space-56: 224px;   /* entre capítulos, antes do rodapé */
```

- [ ] **Step 4: Verificar que o build ainda passa**

```bash
npm run build
```

Esperado: `✓ Compiled successfully`, 10 rotas estáticas.

- [ ] **Step 5: Commit**

```bash
git add styles/tokens.css
git commit -m "feat(tokens): abre o topo e o piso da escala tipografica

--text-6xl deixa de ser alias de --text-5xl e vira o numero do capitulo
(64-128px). Entra --text-caption (12px) para legenda e ficha tecnica.
Entram --space-40 (160px) e --space-56 (224px) para o ritmo de manual."
```

---

### Task 2: Escolha da seção ativa (função pura + hook)

Esta é a única lógica não-trivial do plano, então é a única que ganha teste. A escolha fica numa função pura, testável sem DOM; o hook só liga o `IntersectionObserver` nela.

**Files:**
- Create: `lib/activeSection.ts`
- Create: `lib/activeSection.test.ts`
- Create: `hooks/useActiveSection.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `interface SectionPosition { id: string; top: number; isIntersecting: boolean }`
  - `pickActiveId(positions: SectionPosition[]): string | null`
  - `useActiveSection(ids: string[]): string | null`

- [ ] **Step 1: Escrever o teste que falha**

Crie `lib/activeSection.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { pickActiveId } from "./activeSection.ts";

test("sem secoes, devolve null", () => {
  assert.equal(pickActiveId([]), null);
});

test("escolhe a secao visivel mais proxima do topo da viewport", () => {
  assert.equal(
    pickActiveId([
      { id: "logo", top: -40, isIntersecting: true },
      { id: "cor", top: 320, isIntersecting: true },
    ]),
    "logo",
  );
});

test("com nada visivel, mantem a ultima secao ja ultrapassada", () => {
  assert.equal(
    pickActiveId([
      { id: "logo", top: -900, isIntersecting: false },
      { id: "cor", top: -200, isIntersecting: false },
      { id: "tipografia", top: 1400, isIntersecting: false },
    ]),
    "cor",
  );
});

test("antes da primeira secao entrar, devolve null", () => {
  assert.equal(
    pickActiveId([{ id: "logo", top: 800, isIntersecting: false }]),
    null,
  );
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

```bash
node --test lib/activeSection.test.ts
```

Esperado: FAIL, `Cannot find module './activeSection.ts'`.

- [ ] **Step 3: Escrever a função pura**

Crie `lib/activeSection.ts`:

```ts
export interface SectionPosition {
  id: string;
  /** distância do topo da seção ao topo da viewport, em px (pode ser negativa) */
  top: number;
  isIntersecting: boolean;
}

/**
 * Decide qual seção o trilho deve marcar como ativa.
 *
 * Regra: entre as seções visíveis, ganha a mais próxima do topo da viewport.
 * Se nenhuma estiver visível (rolagem rápida entre duas seções, ou um bloco
 * mais alto que a janela), mantém a última já ultrapassada, para o trilho não
 * piscar de volta para vazio. Antes da primeira seção entrar, devolve null.
 */
export function pickActiveId(positions: SectionPosition[]): string | null {
  const visible = positions.filter((p) => p.isIntersecting);
  if (visible.length > 0) {
    return visible.reduce((best, p) =>
      Math.abs(p.top) < Math.abs(best.top) ? p : best,
    ).id;
  }

  const passed = positions.filter((p) => p.top < 0);
  if (passed.length > 0) {
    return passed.reduce((best, p) => (p.top > best.top ? p : best)).id;
  }

  return null;
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

```bash
node --test lib/activeSection.test.ts
```

Esperado: `pass 4`, `fail 0`.

- [ ] **Step 5: Escrever o hook**

Crie `hooks/useActiveSection.ts`:

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import { pickActiveId, type SectionPosition } from "@/lib/activeSection";

/** Altura da topbar (56px) mais folga, para a seção ativar ao passar por ela. */
const TOP_OFFSET = 112;

/**
 * Observa os elementos cujos ids foram passados e devolve o id da seção ativa.
 * Não roda handler de scroll: toda a decisão acontece dentro do callback do
 * IntersectionObserver, que o browser dispara só quando o cruzamento muda.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const positions = useRef<Map<string, SectionPosition>>(new Map());

  // ids é um array novo a cada render, então ele não serve como dependência.
  // A chave estável é o conteúdo dele, e o efeito relê os ids a partir dela:
  // assim não há array na lista de deps e não há closure velha.
  const key = ids.join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = key
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          positions.current.set(entry.target.id, {
            id: entry.target.id,
            top: entry.boundingClientRect.top - TOP_OFFSET,
            isIntersecting: entry.isIntersecting,
          });
        }
        setActiveId(pickActiveId([...positions.current.values()]));
      },
      { rootMargin: `-${TOP_OFFSET}px 0px -55% 0px`, threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    const seen = positions.current;
    return () => {
      observer.disconnect();
      seen.clear();
    };
  }, [key]);

  return activeId;
}
```

- [ ] **Step 6: Verificar tipos e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos sem erro.

- [ ] **Step 7: Commit**

```bash
git add lib/activeSection.ts lib/activeSection.test.ts hooks/useActiveSection.ts
git commit -m "feat(nav): escolha da secao ativa por IntersectionObserver

A decisao fica numa funcao pura (pickActiveId) com 4 casos cobertos por
node --test, sem dependencia nova. O hook so liga o observer nela: nenhum
handler de scroll, nenhum trabalho por frame."
```

---

### Task 3: SectionRail

O trilho sticky. Deriva os subitens de `lib/nav.ts` (não duplica dados) extraindo o hash de cada href.

**Files:**
- Create: `components/manual/SectionRail.tsx`
- Modify: `app/globals.css` (acrescenta o bloco `.rail` no fim, antes de `── Movimento reduzido ──`)

**Interfaces:**
- Consumes: `useActiveSection` da Task 2; `NAV_SECTIONS`, `NavSection` de `lib/nav.ts`
- Produces: `<SectionRail section={NavSection} />`

- [ ] **Step 1: Criar o componente**

Crie `components/manual/SectionRail.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavSection } from "@/lib/nav";

interface SectionRailProps {
  section: NavSection;
}

/** "/visual#logo" -> "logo"; "/visual/aplicacoes" -> null (não é âncora). */
function anchorId(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

/**
 * Trilho de capítulo: número grande, nome, e os subitens com marcador no que
 * está sendo lido. Gruda abaixo da topbar no desktop; abaixo de 1024px vira um
 * cabeçalho normal no topo da seção.
 */
export function SectionRail({ section }: SectionRailProps) {
  const anchors = useMemo(
    () =>
      section.subitems
        .map((item) => ({ ...item, anchor: anchorId(item.href) }))
        .filter((item): item is typeof item & { anchor: string } =>
          item.anchor !== null,
        ),
    [section],
  );

  const ids = useMemo(() => anchors.map((a) => a.anchor), [anchors]);
  const activeId = useActiveSection(ids);

  const [num, ...rest] = section.label.split(" ");

  return (
    <aside className="rail" aria-label={`Sumário de ${rest.join(" ")}`}>
      <span className="rail__num" aria-hidden="true">
        {num}
      </span>
      <h2 className="rail__name">{rest.join(" ")}</h2>
      <ul className="rail__list">
        {anchors.map((item) => {
          const isActive = item.anchor === activeId;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rail__item"
                data-active={isActive ? "" : undefined}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
```

- [ ] **Step 2: Acrescentar o CSS do trilho**

No fim de `app/globals.css`, antes do bloco `/* ── Movimento reduzido ── */`:

```css
/* ── Trilho de capítulo (sticky no desktop) ── */
.rail {
  position: sticky;
  top: calc(56px + var(--space-8));
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.rail__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-6xl);
  line-height: 0.85;
  letter-spacing: var(--tracking-tight);
  color: var(--color-border-strong);
}

.rail__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xl);
  line-height: var(--leading-tight);
  color: var(--color-text);
  margin: 0 0 var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.rail__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.rail__item {
  display: block;
  padding: var(--space-1) 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.rail__item:hover {
  color: var(--color-text-muted);
}

.rail__item[data-active] {
  color: var(--color-primary-text);
}

/* marcador do item ativo, sem deslocar o texto */
.rail__item[data-active]::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: var(--space-2);
  margin-left: -14px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  vertical-align: middle;
}

@media (max-width: 1023px) {
  .rail {
    position: static;
    margin-bottom: var(--space-12);
  }
  .rail__list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
  }
  .rail__item[data-active]::before {
    margin-left: 0;
  }
}
```

- [ ] **Step 3: Verificar tipos e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos sem erro. O componente ainda não é renderizado por ninguém; isso é esperado nesta task.

- [ ] **Step 4: Commit**

```bash
git add components/manual/SectionRail.tsx app/globals.css
git commit -m "feat(manual): trilho de capitulo sticky

Numero grande em --text-6xl, nome, e subitens derivados de lib/nav com o
marcador no que esta sendo lido. Abaixo de 1024px sai do sticky e vira
cabecalho horizontal."
```

---

### Task 4: SideNav vira overlay em todas as larguras

O drawer já existe e funciona; o trabalho é remover a bifurcação desktop/mobile. Aqui morrem o bug do subitem que nunca acende e o `react-hooks/set-state-in-effect` de `SideNav:14`.

**Files:**
- Modify: `components/nav/SideNav.tsx:1-135` (assinatura, efeitos, topbar) e `:136-215` (NavGroup)
- Modify: `app/globals.css:243-256` (bloco `.sidenav` desktop) e `:267-345` (media query de 768px)

**Interfaces:**
- Consumes: `NAV_SECTIONS` de `lib/nav.ts`
- Produces: `<SideNav open={boolean} onClose={() => void} />` — deixa de gerenciar o próprio estado; quem manda é o `ManualShell` (Task 5)

- [ ] **Step 1: Inverter o controle do estado do drawer**

Em `components/nav/SideNav.tsx`, substitua a assinatura e os dois efeitos do topo do componente:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, type NavSection } from "@/lib/nav";

interface SideNavProps {
  open: boolean;
  onClose: () => void;
}

export function SideNav({ open, onClose }: SideNavProps) {
  // Escape fecha e o scroll trava enquanto o overlay está aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="sidenav-backdrop" onClick={onClose} aria-hidden="true" />
      <nav id="site-nav" className="sidenav ctx-dark" aria-label="Navegação principal">
        <button
          type="button"
          className="drawer-close"
          onClick={onClose}
          aria-label="Fechar navegação"
        >
          <CloseIcon />
        </button>
        {/* o Link da marca e o map de NAV_SECTIONS continuam como estão hoje,
            mas cada Link recebe onClick={onClose} — ver Step 2 */}
      </nav>
    </>
  );
}
```

O `if (!open) return null` é o que resolve o bug do grupo que não reabre: o conteúdo desmonta ao fechar, então o `useState(isActive)` do `NavGroup` reinicializa com a rota corrente a cada abertura.

Remova por inteiro:
- o `useState` de `drawerOpen`
- o efeito `useEffect(() => { setDrawerOpen(false) }, [pathname])` (linha 14) — fechar ao navegar passa a ser `onClick` no `Link`
- todo o bloco `<header className="mobile-topbar">` — a topbar agora vive no `ManualShell`
- o `HamburgerIcon`, que vai junto com a topbar

- [ ] **Step 2: Fechar o overlay ao clicar num link**

Todo `<Link>` dentro do `<nav>` (o da marca e os de subitem) recebe `onClick={onClose}`. No `NavGroup`, isso exige repassar a prop:

```tsx
interface NavGroupProps {
  section: NavSection;
  isActive: boolean;
  onNavigate: () => void;
}

function NavGroup({ section, isActive, onNavigate }: NavGroupProps) {
  const [open, setOpen] = useState(isActive);
  const pathname = usePathname();
  const subMenuId = `nav-sub-${section.id}`;
  // ...o botão de toggle continua igual...
  // e cada subitem:
  //   <Link href={item.href} onClick={onNavigate} ...>
}
```

E no map do `SideNav`:

```tsx
{NAV_SECTIONS.map((section) => (
  <NavGroup
    key={section.id}
    section={section}
    isActive={pathname.startsWith(section.href)}
    onNavigate={onClose}
  />
))}
```

- [ ] **Step 3: Marcar o subitem ativo por rota e âncora**

Dentro do `NavGroup`, troque a comparação quebrada. Hoje é:

```tsx
const isCurrentPage = pathname === item.href;  // nunca true: item.href tem hash
```

Passa a ser:

```tsx
// item.href pode ser "/visual#logo" ou "/visual/aplicacoes". Compara só a
// parte de rota; a âncora exata é trabalho do trilho, não do overlay.
const isCurrentPage = pathname === item.href.split("#")[0];
```

- [ ] **Step 4: Trocar o CSS de sidebar fixa por overlay em todas as larguras**

Em `app/globals.css`, substitua o bloco `/* ── Navegação lateral (desktop) ── */` (`.sidenav`) por:

```css
/* ── Navegação em overlay (todas as larguras) ── */
.sidenav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: min(86vw, 340px);
  overflow-y: auto;
  background: #050507;
  border-right: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  z-index: 60;
  box-shadow: var(--shadow-lg);
  animation: slide-in var(--duration-normal) var(--ease-out);
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to   { transform: none; }
}

.sidenav-backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.6);
  z-index: 55;
  animation: fade-in var(--duration-fast) var(--ease-out);
}

.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 36px;
  height: 36px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  cursor: pointer;
}
```

Remova, da media query `@media (max-width: 768px)`: as regras de `.sidenav`, `.sidenav[data-open="true"]`, `.drawer-close`, `.sidenav-backdrop` e `.mobile-topbar` (todas agora valem em qualquer largura ou deixaram de existir). Remova também as três linhas `display: none` de `.mobile-topbar`, `.drawer-close` e `.sidenav-backdrop`.

- [ ] **Step 5: Verificar que o lint melhorou**

```bash
npx eslint . 2>&1 | tail -5
```

Esperado: `SideNav.tsx:14 react-hooks/set-state-in-effect` desapareceu. O build ainda quebra aqui, porque `layout.tsx` chama `<SideNav />` sem as props novas. Isso é resolvido na Task 5.

- [ ] **Step 6: Commit**

```bash
git add components/nav/SideNav.tsx app/globals.css
git commit -m "refactor(nav): overlay em todas as larguras, estado controlado

O SideNav deixa de ser sidebar fixa e vira drawer em qualquer largura, com
open/onClose vindos de fora. Desmontar ao fechar resolve o grupo que nao
reabria ao trocar de rota; comparar so a parte de rota do href resolve o
subitem que nunca acendia. Sai o efeito que dava set-state-in-effect."
```

---

### Task 5: ManualShell

Topbar + trilho + conteúdo. Substitui o grid `site-shell` de duas colunas.

**Files:**
- Create: `components/manual/ManualShell.tsx`
- Modify: `app/layout.tsx:36-48`
- Modify: `app/globals.css:36-48` (`.site-shell` e `.site-content`) e `:186-206` (`.page-hero`)

**Interfaces:**
- Consumes: `<SideNav open onClose>` da Task 4; `<SectionRail section>` da Task 3; `NAV_SECTIONS` de `lib/nav.ts`
- Produces: `<ManualShell>{children}</ManualShell>`

- [ ] **Step 1: Criar o shell**

Crie `components/manual/ManualShell.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SideNav } from "@/components/nav/SideNav";
import { SectionRail } from "@/components/manual/SectionRail";
import { NAV_SECTIONS } from "@/lib/nav";

export function ManualShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const index = NAV_SECTIONS.findIndex((s) => pathname.startsWith(s.href));
  const section = index === -1 ? null : NAV_SECTIONS[index];

  return (
    <>
      <header className="topbar">
        <button
          type="button"
          className="topbar__menu"
          onClick={() => setNavOpen(true)}
          aria-label="Abrir navegação"
          aria-expanded={navOpen}
          aria-controls="site-nav"
        >
          <HamburgerIcon />
        </button>
        <Link href="/" className="topbar__brand">
          INOVAXIO <span className="topbar__brand-sub">Brandbook</span>
        </Link>
        {section ? (
          <span className="topbar__index">
            {String(index + 1).padStart(2, "0")} / {String(NAV_SECTIONS.length).padStart(2, "0")}
          </span>
        ) : (
          <span className="topbar__index">2026</span>
        )}
      </header>

      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="manual">
        {section ? <SectionRail section={section} /> : <div />}
        <main id="main-content" className="manual__content">
          {children}
          <footer className="brand-footer" aria-hidden="true">
            <span className="brand-footer__marca">Inovaxio</span>
          </footer>
        </main>
      </div>
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Ligar o shell no layout**

Em `app/layout.tsx`, o `<body>` passa a ser:

```tsx
      <body>
        <Preloader />
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <ManualShell>{children}</ManualShell>
      </body>
```

Troque o import de `SideNav` por `import { ManualShell } from "@/components/manual/ManualShell";`. O `<footer className="brand-footer">` sai do layout, porque agora mora dentro do `ManualShell`.

- [ ] **Step 3: Trocar o CSS do shell**

Em `app/globals.css`, substitua `.site-shell` e `.site-content` por:

```css
/* ── Topbar ── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  height: 56px;
  padding: 0 var(--space-6);
  background: rgb(255 255 255 / 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.topbar__menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.topbar__menu:hover {
  background: var(--color-surface);
}

.topbar__brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--color-text);
  text-decoration: none;
}

.topbar__brand-sub {
  font-weight: 500;
  color: var(--color-text-faint);
  letter-spacing: var(--tracking-normal);
}

.topbar__index {
  margin-left: auto;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-caption);
  letter-spacing: 0.08em;
  color: var(--color-text-faint);
}

/* ── Grid do manual: trilho + conteúdo ── */
.manual {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--space-16);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-16) var(--space-10) var(--space-56);
  overflow-x: clip;
}

.manual__content {
  min-width: 0;
}

@media (max-width: 1023px) {
  .manual {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: var(--space-10) var(--space-6) var(--space-32);
  }
}

@media (max-width: 640px) {
  .manual {
    padding: var(--space-8) var(--space-4) var(--space-24);
  }
  .topbar {
    padding: 0 var(--space-4);
  }
}
```

- [ ] **Step 4: Corrigir o full-bleed do `.page-hero`**

`.page-hero` hoje calcula a largura a partir de `--nav-width`, que não existe mais no layout. Substitua as três primeiras propriedades do bloco `.page-hero` e sua media query por:

```css
.page-hero {
  position: relative;
  width: calc(100% + 2 * var(--space-10));
  margin-left: calc(-1 * var(--space-10));
  margin-top: calc(-1 * var(--space-16));
  /* height, min-height, max-height, display, align-items, overflow e
     background continuam exatamente como estão */
}

@media (max-width: 1023px) {
  .page-hero {
    width: calc(100% + 2 * var(--space-6));
    margin-left: calc(-1 * var(--space-6));
    margin-top: calc(-1 * var(--space-10));
    height: 56vh;
    min-height: 340px;
  }
}

@media (max-width: 640px) {
  .page-hero {
    width: calc(100% + 2 * var(--space-4));
    margin-left: calc(-1 * var(--space-4));
    margin-top: calc(-1 * var(--space-8));
  }
}
```

- [ ] **Step 5: Verificar build e tipos**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos sem erro, 10 rotas estáticas.

- [ ] **Step 6: Conferir no browser**

```bash
npm run dev
```

Abra `http://localhost:3000/visual`. Confirme, nesta ordem:
1. a topbar gruda no topo ao rolar
2. o trilho mostra `03`, `Sistema Visual` e os 6 subitens, e gruda
3. o marcador azul anda pelos subitens conforme você rola
4. o hambúrguer abre o overlay, `Esc` fecha, clicar num link fecha
5. não há barra de rolagem horizontal

- [ ] **Step 7: Commit**

```bash
git add components/manual/ManualShell.tsx app/layout.tsx app/globals.css
git commit -m "feat(manual): shell com topbar sticky e trilho de capitulo

Sai o grid de duas colunas com sidebar fixa de 260px. Entra topbar de 56px
com indicador de capitulo, nav em overlay e grid trilho + conteudo com
max-width 1200px. O page-hero passa a calcular o full-bleed pelo padding
do manual, nao mais pela largura da nav."
```

---

### Task 6: ManualEntry

A unidade que se repete. É ela que dá o ritmo de manual: eyebrow pequeno, mídia grande, descritivo curto, ficha técnica em 12px.

**Files:**
- Create: `components/manual/ManualEntry.tsx`
- Modify: `app/globals.css` (bloco `.entry`, depois do bloco `.rail`)

**Interfaces:**
- Consumes: `Reveal` de `components/ui/Reveal`
- Produces: `<ManualEntry eyebrow description specs id>{mídia}</ManualEntry>`

- [ ] **Step 1: Criar o componente**

Crie `components/manual/ManualEntry.tsx`:

```tsx
import { Reveal } from "@/components/ui/Reveal";

interface ManualEntryProps {
  /** Rótulo curto acima da mídia. Ex.: "Assinatura horizontal". */
  eyebrow: string;
  /** A mídia: imagem, placeholder, grade de amostras, o que for. */
  children: React.ReactNode;
  /** Texto descritivo. Curto, no máximo 62ch. */
  description?: string;
  /** Ficha técnica. Ex.: ["SVG", "24 KB", "área de proteção 1x"]. */
  specs?: string[];
  /** Alvo do trilho. Use o mesmo id do subitem em lib/nav.ts. */
  id?: string;
}

/**
 * Unidade do manual: rótulo pequeno, mídia grande, descritivo curto, ficha
 * técnica menor ainda. É o contraste entre 12px e a mídia em largura total
 * que produz a leitura de manual impresso, não o tamanho absoluto de nada.
 */
export function ManualEntry({
  eyebrow,
  children,
  description,
  specs,
  id,
}: ManualEntryProps) {
  return (
    <Reveal as="section" className="entry" id={id}>
      <p className="entry__eyebrow">{eyebrow}</p>
      <div className="entry__media">{children}</div>
      {description ? <p className="entry__desc">{description}</p> : null}
      {specs && specs.length > 0 ? (
        <p className="entry__specs">{specs.join(" · ")}</p>
      ) : null}
    </Reveal>
  );
}
```

- [ ] **Step 2: Acrescentar o CSS**

Em `app/globals.css`, logo depois do bloco `.rail`:

```css
/* ── Unidade do manual ── */
.entry {
  margin-bottom: var(--space-40);
}

.entry:last-child {
  margin-bottom: 0;
}

.entry__eyebrow {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  margin-bottom: var(--space-6);
}

.entry__media {
  width: 100%;
}

/* legenda cola na mídia: 12px de distância é o que diz "isto pertence àquilo" */
.entry__desc {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-muted);
  max-width: 62ch;
  margin-top: var(--space-3);
}

.entry__specs {
  font-family: var(--font-display);
  font-size: var(--text-caption);
  letter-spacing: 0.04em;
  color: var(--color-text-faint);
  margin-top: var(--space-2);
}
```

- [ ] **Step 3: Verificar tipos e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos sem erro.

- [ ] **Step 4: Commit**

```bash
git add components/manual/ManualEntry.tsx app/globals.css
git commit -m "feat(manual): ManualEntry, a unidade que se repete

Eyebrow 13px, midia em largura total, descritivo 15px travado em 62ch e
ficha tecnica 12px. Espaco de 12px entre midia e legenda, 160px entre
entradas: e esse contraste que le como manual."
```

---

### Task 7: Aplicar a linguagem em `/visual`

O piloto. Cada uma das 6 seções passa a compor `ManualEntry` em vez de montar `div`s à mão.

**Files:**
- Modify: `app/visual/page.tsx:1-26`
- Modify: `components/sections/visual/LogoSection.tsx` (249 linhas)
- Modify: `components/sections/visual/ColorSection.tsx` (554 linhas)
- Modify: `components/sections/visual/TypographySection.tsx` (543 linhas)
- Modify: `components/sections/visual/PhotographySection.tsx` (69 linhas)
- Modify: `components/sections/visual/GridSection.tsx` (252 linhas)
- Modify: `components/sections/visual/IconsSection.tsx` (315 linhas)

**Interfaces:**
- Consumes: `<ManualEntry>` da Task 6
- Produces: nada que tasks seguintes consumam

- [ ] **Step 1: Começar pela menor seção, como referência das outras**

`PhotographySection.tsx` tem 69 linhas e é o molde. Reescreva por inteiro:

```tsx
import { ManualEntry } from "@/components/manual/ManualEntry";
import { PhotoCard } from "@/components/ui/PhotoCard";

const PHOTOS = [
  {
    src: "/assets/fotos/atributo-pratico.jpg",
    alt: "IMG -- Equipe técnica em reunião de trabalho",
    attribution: "Atributo: Prático",
  },
  {
    src: "/assets/fotos/atributo-tecnico.jpg",
    alt: "IMG -- Desenvolvedor concentrado no trabalho",
    attribution: "Atributo: Técnico",
  },
  {
    src: "/assets/fotos/atributo-proximo.jpg",
    alt: "IMG -- Conversa próxima entre consultor e cliente",
    attribution: "Atributo: Próximo",
  },
];

export function PhotographySection() {
  return (
    <ManualEntry
      id="fotografia"
      eyebrow="Fotografia"
      description="Fotografia real, não stock. Sem sorriso posado, sem banco de imagens genérico. Cada foto reforça um atributo da marca: prático, próximo, técnico. Priorize luz natural e ambiente de trabalho real."
      specs={["3 atributos", "luz natural", "pessoas identificáveis"]}
    >
      <div
        className="stack-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-4)",
        }}
      >
        {PHOTOS.map((photo) => (
          <PhotoCard
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            attribution={photo.attribution}
            aspectRatio="landscape"
          />
        ))}
      </div>
    </ManualEntry>
  );
}
```

O que mudou e vale repetir nas outras cinco: sai o `<section>` com `marginBottom` próprio (o `.entry` cuida disso), sai o `SectionHeader`, sai o parágrafo solto de 60ch (virou `description`), e o `id` migra para o `ManualEntry`.

- [ ] **Step 2: Verificar a menor antes de seguir**

```bash
npm run dev
```

Em `http://localhost:3000/visual`, role até Fotografia. Confirme que o marcador do trilho acende em "Fotografia" e que a distância para a seção seguinte é visivelmente maior que a distância entre a grade e sua legenda.

- [ ] **Step 3: Aplicar o mesmo molde nas outras cinco**

Uma por vez, na ordem: `LogoSection`, `ColorSection`, `TypographySection`, `GridSection`, `IconsSection`.

Para cada uma, em cada bloco de conteúdo:
1. Troque o `<section id="..." style={{ marginBottom: ... }}>` externo por `<ManualEntry id="..." eyebrow="..." description="..." specs={[...]}>`.
2. Remova o `SectionHeader` e passe `title` e `description` dele para as props do `ManualEntry`.
3. Remova qualquer `marginBottom` de espaçamento entre blocos: quem define ritmo agora é `.entry`.
4. Remova imports que ficaram órfãos (`SectionHeader`, e em `LogoSection` o `Reveal`, que já é aplicado por dentro do `ManualEntry`).

Os `id`s precisam bater exatamente com as âncoras de `lib/nav.ts`: `logo`, `cor`, `tipografia`, `fotografia`, `grid`, `icones`.

**Se uma seção tiver mais de um bloco de mídia** (é o caso de `LogoSection`, que tem versões, construção e proibições), cada bloco vira um `ManualEntry` próprio, mas só o primeiro leva o `id` da âncora.

- [ ] **Step 4: Simplificar a página**

`app/visual/page.tsx` perde o `PageBanner` de 64vh, que competia com o trilho. A página abre direto no conteúdo, que é o que a referência faz:

```tsx
import { LogoSection } from "@/components/sections/visual/LogoSection";
import { ColorSection } from "@/components/sections/visual/ColorSection";
import { TypographySection } from "@/components/sections/visual/TypographySection";
import { PhotographySection } from "@/components/sections/visual/PhotographySection";
import { GridSection } from "@/components/sections/visual/GridSection";
import { IconsSection } from "@/components/sections/visual/IconsSection";

export default function VisualPage() {
  return (
    <>
      <h1 className="manual__title">Sistema Visual</h1>
      <p className="manual__lead">
        Logo, cor, tipografia, fotografia e grid. Os elementos que dão
        consistência visual à marca em qualquer aplicação.
      </p>
      <LogoSection />
      <ColorSection />
      <TypographySection />
      <PhotographySection />
      <GridSection />
      <IconsSection />
    </>
  );
}
```

E o CSS correspondente, junto do bloco `.entry` em `app/globals.css`:

```css
.manual__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-5xl);
  line-height: 1.02;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

.manual__lead {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-muted);
  max-width: 62ch;
  margin-bottom: var(--space-40);
}
```

- [ ] **Step 5: Verificar tudo**

```bash
npx tsc --noEmit && npm run build && npx eslint . 2>&1 | tail -5
```

Esperado: build limpo; ESLint em no máximo 2 findings (`Preloader:22` e `Reveal:48`, ambos fora do escopo).

- [ ] **Step 6: Commit**

```bash
git add app/visual components/sections/visual app/globals.css
git commit -m "feat(visual): aplica a linguagem de manual na secao piloto

As 6 subsecoes passam a compor ManualEntry em vez de montar divs a mao.
Sai o PageBanner de 64vh, que competia com o trilho, e saem os
marginBottom locais: quem define ritmo agora e o .entry."
```

---

### Task 8: Alinhar o DESIGN.md e fechar a verificação

O `DESIGN.md` ainda afirma *"pure black canvas"* e *"light mode is not designed"*. Depois desta rodada isso está duplamente errado.

**Files:**
- Modify: `DESIGN.md` (frontmatter `description`, bloco de `colors`, e a seção `Known Gaps`)

**Interfaces:**
- Consumes: os tokens da Task 1
- Produces: nada

- [ ] **Step 1: Corrigir o frontmatter**

No topo de `DESIGN.md`, o campo `description` começa com *"A dark, photography-first brand reference on a pure black canvas."* Substitua por:

```
description: A light, photography-first brand reference on an off-white canvas. Quicksand display headlines over Inter body, Action Blue #2E2EFE as the only accent, and near-invisible chrome so content and product imagery lead. Cyan #00C9D5 exists only inside the documented brand gradient, never as UI accent. Dark is a contextual inversion (.ctx-dark) for covers and the nav overlay, not the default.
```

E no bloco `colors`, troque `canvas`, `surface` e `surface-2` pelos valores que `tokens.css` realmente implementa:

```yaml
  canvas: "#FFFFFF"
  surface: "#F4F4F7"
  surface-2: "#ECEDF4"
  ink: "#0A0A0C"
  body: "#0A0A0C"
  body-muted: "#51535C"
  body-faint: "#6B6D78"
```

- [ ] **Step 2: Corrigir os Known Gaps**

Substitua o bullet de light mode:

```markdown
- **Dark mode** is not a full theme. Dark exists as a contextual inversion
  (`.ctx-dark`) used by the nav overlay and by cover blocks; the manual itself
  ships light.
```

E acrescente, no fim da lista:

```markdown
- **Sections 01, 02, 04 and 05** still use the pre-redesign internal language.
  Only `/visual` was converted to the `ManualEntry` rhythm in the 2026-09-17
  round; the shell (topbar, nav overlay, section rail) is already global.
```

- [ ] **Step 3: Rodar a verificação completa**

```bash
npx tsc --noEmit
npm run build
npx eslint . 2>&1 | tail -5
node --test lib/activeSection.test.ts
```

Esperado: tipos limpos; build com 10 rotas estáticas; ESLint com no máximo 2 findings; 4 testes passando.

- [ ] **Step 4: Conferir os breakpoints**

Com `npm run dev` rodando, verifique em 390, 768, 1280 e 1600 de largura:

| Largura | Esperado |
|---|---|
| 390 | trilho horizontal no topo, sem sticky; nenhuma rolagem horizontal |
| 768 | idem; topbar com padding menor |
| 1280 | trilho sticky de 200px à esquerda; conteúdo até 1200px |
| 1600 | conteúdo centralizado, não esticado; margens iguais dos dois lados |

Em todas: o marcador do trilho acompanha a rolagem, `Esc` fecha o overlay, e o foco fica visível ao navegar por teclado.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md
git commit -m "docs: alinha o DESIGN.md ao canvas claro que o codigo implementa

O documento afirmava pure black canvas e light mode is not designed, o
oposto do que tokens.css implementa desde o realinhamento. Corrige o
frontmatter, os valores de cor e os Known Gaps, e registra que so a
secao /visual recebeu a linguagem nova nesta rodada."
```

---

## Self-Review

**Cobertura do spec:**

| Requisito do spec | Task |
|---|---|
| Canvas claro | Global Constraints + Task 8 |
| Topbar 56px sticky com indicador de capítulo | Task 5 |
| Nav vira overlay em todas as larguras | Task 4 |
| Trilho sticky 200px, colapsa abaixo de 1024 | Task 3 |
| `--content-max` 980 → 1200 | Task 5 (`.manual`, `max-width: 1200px`) |
| `--text-caption` 12px | Task 1 |
| `--text-6xl` real 64–128px | Task 1 |
| `--space-40` e `--space-56` | Task 1 |
| Ritmo 12px / 96px / 160px / 224px | Task 1 + Task 6 (`.entry`) |
| `ManualEntry` com eyebrow, mídia, descrição, specs | Task 6 |
| `useActiveSection` por IntersectionObserver | Task 2 |
| Bug do subitem que nunca acendia | Task 4 Step 3 |
| Bug do grupo que não reabria | Task 4 Step 1 (`if (!open) return null`) |
| Piloto só em `/visual` | Task 7 |
| `DESIGN.md` reescrito | Task 8 |
| Lint de 5 para 2 | Task 4 Step 5 + Task 7 Step 5 |
| Verificação em 4 breakpoints | Task 8 Step 4 |

Sem lacunas.

**Consistência de tipos:** `SectionPosition` e `pickActiveId` definidos na Task 2 e consumidos com a mesma assinatura pelo hook da Task 2 e pelo `SectionRail` da Task 3. `SideNavProps { open, onClose }` definido na Task 4 e consumido com esses nomes exatos pelo `ManualShell` da Task 5. `ManualEntryProps` definido na Task 6 e usado com as mesmas props na Task 7.

**Uma dependência de ordem que não pode ser invertida:** a Task 4 deixa o build quebrado de propósito (o `layout.tsx` ainda chama `<SideNav />` sem props), e a Task 5 conserta. Quem executar a Task 4 isolada vai ver `npm run build` falhar, e isso está documentado no Step 5 dela. Não execute a Task 4 sem executar a Task 5 na sequência.
