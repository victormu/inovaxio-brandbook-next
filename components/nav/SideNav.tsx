"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_SECTIONS, type NavSection } from "@/lib/nav";

export function SideNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fecha o drawer ao trocar de rota
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Escape para fechar e trava do scroll enquanto o drawer está aberto
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Top bar (somente mobile) */}
      <header className="mobile-topbar ctx-dark">
        <Link
          href="/"
          aria-label="Inovaxio Brandbook, início"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            textDecoration: "none",
          }}
        >
          <BrandMark size={26} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              letterSpacing: "0.1em",
              color: "var(--color-text)",
            }}
          >
            INOVAXIO
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir navegação"
          aria-expanded={drawerOpen}
          aria-controls="site-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text)",
            cursor: "pointer",
          }}
        >
          <HamburgerIcon />
        </button>
      </header>

      {/* Backdrop do drawer */}
      {drawerOpen ? (
        <div
          className="sidenav-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Navegação lateral (sidebar no desktop, drawer no mobile) */}
      <nav
        id="site-nav"
        className="sidenav ctx-dark"
        data-open={drawerOpen}
        aria-label="Navegação principal"
      >
        <button
          type="button"
          className="drawer-close"
          onClick={() => setDrawerOpen(false)}
          aria-label="Fechar navegação"
        >
          <CloseIcon />
        </button>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "0 var(--space-6) var(--space-6)",
            borderBottom: "1px solid var(--color-border)",
            marginBottom: "var(--space-4)",
            textDecoration: "none",
          }}
        >
          <BrandMark size={30} />
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                letterSpacing: "0.1em",
                color: "var(--color-text)",
              }}
            >
              INOVAXIO
            </span>
            <span
              className="label"
              style={{ display: "block", marginTop: "2px" }}
            >
              Brandbook 2026
            </span>
          </div>
        </Link>

        {NAV_SECTIONS.map((section) => (
          <NavGroup
            key={section.id}
            section={section}
            isActive={pathname.startsWith(section.href)}
          />
        ))}
      </nav>
    </>
  );
}

interface NavGroupProps {
  section: NavSection;
  isActive: boolean;
}

function NavGroup({ section, isActive }: NavGroupProps) {
  const [open, setOpen] = useState(isActive);
  const pathname = usePathname();
  const subMenuId = `nav-sub-${section.id}`;

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={subMenuId}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-2) var(--space-6)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "var(--text-xs)",
          color: isActive ? "var(--color-primary-text)" : "var(--color-text-muted)",
          transition: "color var(--duration-fast) var(--ease-out)",
          textAlign: "left",
        }}
      >
        {section.label}
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul
          id={subMenuId}
          style={{
            listStyle: "none",
            paddingLeft: "var(--space-6)",
            marginBottom: "var(--space-2)",
          }}
        >
          {section.subitems.map((item) => {
            const isCurrentPage = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrentPage ? "page" : undefined}
                  className="nav-subitem"
                  style={{
                    display: "block",
                    padding: "6px 14px",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xs)",
                    color: isCurrentPage
                      ? "var(--color-primary-text)"
                      : "var(--color-text-faint)",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition:
                      "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function BrandMark({ size = 30 }: { size?: number }) {
  // Tile azul com o símbolo real (branco) da marca.
  return (
    <span
      aria-hidden="true"
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: size * 0.23,
        background: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo/simbolo-branco.svg"
        alt=""
        style={{ width: "64%", height: "auto", display: "block" }}
      />
    </span>
  );
}

function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path
        d="M1 1h16M1 7h16M1 13h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform var(--duration-fast) var(--ease-out)",
        flexShrink: 0,
      }}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
