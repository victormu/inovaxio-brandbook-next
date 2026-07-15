"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

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
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

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
