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
        <span className="topbar__index">
          {section
            ? `${String(index + 1).padStart(2, "0")} / ${String(NAV_SECTIONS.length).padStart(2, "0")}`
            : "2026"}
        </span>
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
