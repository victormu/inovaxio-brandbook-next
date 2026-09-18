"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/** No servidor não há preferência a ler: assume movimento normal. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Lê prefers-reduced-motion como store externo, que é o que ele é.
 * Substitui o padrão de ler no efeito e chamar setState, e de quebra passa
 * a reagir se a pessoa mudar a preferência com a página aberta.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
