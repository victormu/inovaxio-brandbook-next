"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { NAV_SECTIONS } from "@/lib/nav";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const filtered = query
    ? NAV_SECTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.subitems.some((i) =>
            i.label.toLowerCase().includes(query.toLowerCase())
          )
      )
    : NAV_SECTIONS;

  return (
    <>
      {/* Hero full-bleed, no mesmo padrão dos banners de seção */}
      <section
        aria-labelledby="hero-heading"
        style={{ marginBottom: "var(--space-12)" }}
      >
        <div className="page-hero ctx-dark" style={{ overflow: "hidden" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              padding: "clamp(var(--space-8), 5vw, var(--space-16))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Topo: marca à esquerda, meta à direita */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "var(--space-6)",
              }}
            >
              <span className="label" style={{ color: "var(--color-primary-text)" }}>
                Inovaxio
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  textAlign: "right",
                }}
              >
                <span className="label" style={{ color: "var(--color-text-faint)" }}>
                  Manual de Marca
                </span>
                <span className="label" style={{ color: "var(--color-text-faint)" }}>
                  2026 · v1.0
                </span>
              </div>
            </div>

            {/* Base: título grande + símbolo em destaque */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "var(--space-8)",
                flexWrap: "wrap",
              }}
            >
              <h1
                id="hero-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-5xl)",
                  lineHeight: 1.02,
                  letterSpacing: "var(--tracking-tight)",
                  margin: 0,
                  color: "var(--color-text)",
                }}
              >
                Brandbook
              </h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/simbolo-cor.svg"
                alt=""
                aria-hidden="true"
                style={{ width: "min(34%, 320px)", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "56ch",
            marginTop: "var(--space-8)",
            marginBottom: "var(--space-8)",
          }}
        >
          Este é o manual oficial de identidade da Inovaxio. Tudo o que você
          precisa saber para comunicar a marca com clareza, consistência e
          intenção.
        </p>

        <div style={{ maxWidth: 480 }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Trinca de reconhecimento */}
      <section
        aria-label="Frase de posicionamento"
        className="block-blue"
        style={{
          marginBottom: "var(--space-16)",
          padding: "var(--space-12)",
          borderRadius: "var(--radius-2xl)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          {["Tem a ideia.", "Tem o capital.", "Falta só o software."].map(
            (line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: i === 2 ? 700 : 500,
                  fontSize: "var(--text-4xl)",
                  letterSpacing: "var(--tracking-tight)",
                  color:
                    i === 2
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                {line}
              </p>
            )
          )}
        </div>
      </section>

      {/* Seções */}
      <section aria-label="Seções do brandbook" style={{ position: "relative" }}>
        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clipPath: "inset(50%)",
            whiteSpace: "nowrap",
          }}
        >
          {query ? `${filtered.length} resultado(s) para ${query}` : ""}
        </span>
        <h2
          className="label"
          style={{
            color: "var(--color-text-faint)",
            marginBottom: "var(--space-6)",
          }}
        >
          {query
            ? `${filtered.length} resultado(s) para "${query}"`
            : "Seções"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {filtered.map((section, idx) => (
            <NavBlock key={section.id} section={section} query={query} index={idx + 1} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-faint)",
              marginTop: "var(--space-4)",
            }}
          >
            Nenhuma seção encontrada. Tente outro termo.
          </p>
        ) : null}
      </section>
    </>
  );
}

interface NavBlockSection {
  id: string;
  label: string;
  href: string;
  subitems: { label: string; href: string }[];
}

function NavBlock({
  section,
  query,
  index,
}: {
  section: NavBlockSection;
  query: string;
  index?: number;
}) {
  const visibleItems = query
    ? section.subitems.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    : section.subitems;

  const num = String(index ?? 0).padStart(2, "0");
  const title = section.label.replace(/^\d+\s+/, "");

  return (
    <article
      className="nav-block card-site"
      style={{
        padding: "var(--space-8)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          className="nav-block-num"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-sm)",
            lineHeight: 1,
            color: "var(--color-text-faint)",
            paddingTop: 2,
          }}
        >
          {num}
        </span>
        <span
          className="nav-block-arrow"
          aria-hidden="true"
          style={{ color: "var(--color-text-faint)", opacity: 0.4, marginTop: 4 }}
        >
          <ArrowIcon />
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-xl)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-text)",
            lineHeight: "var(--leading-tight)",
          }}
        >
          <Link
            href={section.href}
            className="nav-block-title"
            style={{
              textDecoration: "none",
              color: "inherit",
              transition: "color var(--duration-fast) var(--ease-out)",
            }}
          >
            {title}
          </Link>
        </h3>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          {visibleItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-block-link"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-faint)",
                  textDecoration: "none",
                  display: "block",
                  padding: "var(--space-1) 0",
                  transition: "color var(--duration-fast) var(--ease-out)",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
