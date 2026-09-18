"use client";

import { useLayoutEffect, useState } from "react";
import { bandFromClasses, type BandName } from "@/lib/band";

/** Seções que pintam fundo e portanto passam sob a topbar. */
const SELETOR = ".panel, .cover, .chapter-cover, .chapter-next, .index-panel";

/**
 * Descobre qual banda está imediatamente sob a topbar, para ela poder ser
 * transparente e ainda assim ter texto legível.
 *
 * A detecção é uma faixa de 1px logo abaixo da barra, montada em pixels.
 * Usar `-100%` na margem de baixo produziria um root de altura NEGATIVA
 * (altura - 56 - altura), que não é definido em spec: alguns motores
 * toleram, outros nunca reportam interseção e a barra congela numa cor.
 *
 * Nenhum handler de scroll: o browser só avisa quando a seção sob a faixa
 * muda. O observer é remontado no resize, porque a margem depende da altura.
 */
export function useBandAtTop(
  inicial: BandName,
  topbarHeight = 56,
): BandName {
  // O valor inicial vem de fora porque ele é renderizado no SERVIDOR, onde
  // não existe DOM para medir. Sem isso a barra nasce clara e o JS corrige
  // depois: a primeira pintura fica com texto escuro sobre a capa escura.
  const [band, setBand] = useState<BandName>(inicial);

  useLayoutEffect(() => {
    const ler = () => {
      const sob = document
        .elementsFromPoint(window.innerWidth / 2, topbarHeight + 1)
        .find((el) => el.matches(SELETOR));
      if (sob) setBand(bandFromClasses([...sob.classList]));
    };

    // Leitura síncrona antes da pintura, senão a barra nasce com a cor
    // errada sobre a capa e pisca.
    ler();

    if (typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;

    const montar = () => {
      observer?.disconnect();
      const secoes = [...document.querySelectorAll<HTMLElement>(SELETOR)];
      if (secoes.length === 0) return;

      // Faixa de exatamente 1px, começando na base da barra.
      const base = Math.max(window.innerHeight - topbarHeight - 1, 0);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setBand(bandFromClasses([...entry.target.classList]));
            }
          }
        },
        { rootMargin: `-${topbarHeight}px 0px -${base}px 0px`, threshold: 0 },
      );

      for (const s of secoes) observer.observe(s);
    };

    montar();

    // A margem é calculada da altura da janela, então precisa refazer.
    const onResize = () => {
      montar();
      ler();
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [topbarHeight, inicial]);

  return band;
}
