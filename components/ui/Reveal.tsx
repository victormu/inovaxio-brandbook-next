"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** Elemento renderizado (default: div). Ex.: "section", "header". */
  as?: ElementType;
  /** Atraso em ms para escalonar (stagger) itens de uma lista. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Props extras (id, data-*, aria-*) repassadas ao elemento. */
  [key: string]: unknown;
}

/**
 * Revela o conteúdo ao entrar na viewport: fade + subida suave, uma vez só.
 * Usa IntersectionObserver (sem lib). Respeita prefers-reduced-motion e,
 * na ausência de suporte/JS, o conteúdo aparece imediatamente.
 */
export function Reveal({
  children,
  as,
  delay = 0,
  className,
  style,
  ...rest
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visto, setVisto] = useState(false);
  const reduzido = usePrefersReducedMotion();

  // Com movimento reduzido nada precisa aparecer aos poucos: já nasce visível.
  // Derivar em vez de escrever no efeito é o que tira o set-state-in-effect.
  const revealed = reduzido || visto;

  useEffect(() => {
    if (!node || reduzido) return;

    if (typeof IntersectionObserver === "undefined") {
      // Ambiente sem a API: mostrar é melhor que esconder para sempre.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisto(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisto(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, reduzido]);

  return (
    <Tag
      ref={setNode}
      className={className ? `reveal ${className}` : "reveal"}
      data-revealed={revealed ? "" : undefined}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
