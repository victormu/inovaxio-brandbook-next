"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SideNav } from "@/components/nav/SideNav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_SECTIONS } from "@/lib/nav";

/** "/visual#logo" -> "logo"; "/visual/aplicacoes" -> null. */
function anchorId(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

export function ManualShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const index = NAV_SECTIONS.findIndex((s) => pathname.startsWith(s.href));
  const section = index === -1 ? null : NAV_SECTIONS[index];

  const topics = useMemo(
    () =>
      (section?.subitems ?? [])
        .map((i) => ({ label: i.label, anchor: anchorId(i.href) }))
        .filter((i): i is { label: string; anchor: string } => i.anchor !== null),
    [section],
  );

  const ids = useMemo(() => topics.map((t) => t.anchor), [topics]);
  const activeId = useActiveSection(ids);
  const activeLabel = topics.find((t) => t.anchor === activeId)?.label ?? null;

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
        <span className="topbar__index">
          {section ? (
            <>
              {String(index + 1).padStart(2, "0")} / {String(NAV_SECTIONS.length).padStart(2, "0")}
              {activeLabel ? (
                <span className="topbar__topic"> · {activeLabel}</span>
              ) : null}
            </>
          ) : (
            "2026 · v1.0"
          )}
        </span>
      </header>

      <SideNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        activeAnchor={activeId}
      />

      <div className="manual">
        <main id="main-content" className="manual__content">
          {children}
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
