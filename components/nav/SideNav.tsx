"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, type NavSection } from "@/lib/nav";

interface SideNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Navegação em overlay, em qualquer largura. O conteúdo desmonta ao fechar:
 * é isso que faz cada grupo reabrir já na seção corrente quando você volta.
 */
export function SideNav({ open, onClose }: SideNavProps) {
  const pathname = usePathname();

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

        <Link
          href="/"
          onClick={onClose}
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
            <span className="label" style={{ display: "block", marginTop: "2px" }}>
              Brandbook 2026
            </span>
          </div>
        </Link>

        {NAV_SECTIONS.map((section) => (
          <NavGroup
            key={section.id}
            section={section}
            isActive={pathname.startsWith(section.href)}
            onNavigate={onClose}
          />
        ))}
      </nav>
    </>
  );
}

interface NavGroupProps {
  section: NavSection;
  isActive: boolean;
  onNavigate: () => void;
}

function NavGroup({ section, isActive, onNavigate }: NavGroupProps) {
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
            // item.href pode ser "/visual#logo" ou "/visual/aplicacoes". Compara
            // só a parte de rota; a âncora exata é trabalho do trilho.
            const isCurrentPage = pathname === item.href.split("#")[0];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
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

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
