"use client";

import { useLayoutEffect, useState } from "react";
import { bandFromClasses, type BandName } from "@/lib/band";

/** Seções que pintam fundo e portanto ficam sob a topbar. */
const SELETOR = ".panel, .cover, .chapter-cover, .chapter-next, .index-panel";

/**
 * Descobre qual banda está imediatamente sob a topbar, para ela poder ser
 * transparente e ainda assim ter texto legível.
 *
 * Usa uma faixa de detecção de 1px logo abaixo da barra (via rootMargin),
 * então o browser só avisa quando a seção sob ela muda. Nenhum handler de
 * scroll, nenhum trabalho por frame.
 */
export function useBandAtTop(topbarHeight = 56): BandName {
  const [band, setBand] = useState<BandName>("light");

  // Layout effect, não effect: o observer só dispara depois da primeira
  // pintura, e até lá a barra ficaria com texto escuro sobre a capa preta.
  useLayoutEffect(() => {
    const secoes = [...document.querySelectorAll<HTMLElement>(SELETOR)];
    if (secoes.length === 0) return;

    // Leitura síncrona do que está sob a barra, para não haver flash.
    const sob = document
      .elementsFromPoint(window.innerWidth / 2, topbarHeight + 1)
      .find((el) => el.matches(SELETOR));
    // Medir o DOM e ajustar o estado antes da pintura é o propósito do
    // layout effect. Sem isto a barra pisca com texto escuro sobre a capa.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sob) setBand(bandFromClasses([...sob.classList]));

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setBand(bandFromClasses([...entry.target.classList]));
          }
        }
      },
      { rootMargin: `-${topbarHeight}px 0px -100% 0px`, threshold: 0 },
    );

    for (const s of secoes) observer.observe(s);
    return () => observer.disconnect();
  }, [topbarHeight]);

  return band;
}
