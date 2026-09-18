"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { NAV_SECTIONS } from "@/lib/nav";

export default function Home() {
  const [query, setQuery] = useState("");
  const handleSearch = useCallback((q: string) => setQuery(q), []);

  const q = query.toLowerCase();
  const filtered = query
    ? NAV_SECTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.subitems.some((i) => i.label.toLowerCase().includes(q))
      )
    : NAV_SECTIONS;

  return (
    <>
      {/* Capa: preto puro, tipografia ocupando a tela */}
      <section className="cover ctx-dark" aria-labelledby="cover-title">
        <div className="cover__meta">
          <span>Inovaxio</span>
          <span className="cover__meta-right">
            <span>Manual de Marca</span>
            <span>2026 · v1.0</span>
          </span>
        </div>

        <div>
          <div className="cover__lockup">
            <h1 id="cover-title" className="cover__title">
              Brandbook
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cover__mark"
              src="/assets/logo/simbolo-cor.svg"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="cover__rule" />
          <div className="cover__foot">
            <span>Tudo o que a marca diz, mostra e recusa</span>
            <span>{String(NAV_SECTIONS.length).padStart(2, "0")} capítulos</span>
          </div>
        </div>
      </section>

      {/* Sumário: um capítulo por linha, ocupando a tela */}
      <section className="index-panel" aria-labelledby="index-title">
        <div className="index-panel__inner">
          <div className="index-panel__head">
            <h2 id="index-title" className="panel__title">
              Sumário
            </h2>
            <p className="panel__lead">
              Comece por onde a dúvida está.
            </p>
            <div style={{ marginTop: "var(--space-8)", maxWidth: 420 }}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          <ol className="index-list">
            {filtered.map((section) => {
              const [num, ...rest] = section.label.split(" ");
              return (
                <li key={section.id}>
                  <Link href={section.href} className="index-row">
                    <span className="index-row__num">{num}</span>
                    <span className="index-row__body">
                      <span className="index-row__title">
                        {rest.join(" ")}
                      </span>
                      <span className="index-row__subs">
                        {section.subitems.map((i) => i.label).join(" · ")}
                      </span>
                    </span>
                    <span className="index-row__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {filtered.length === 0 ? (
            <p className="index-empty">
              Nenhum capítulo encontrado. Tente outro termo.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
