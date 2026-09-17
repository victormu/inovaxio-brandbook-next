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
