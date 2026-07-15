"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Tela de carregamento da marca: overlay escuro com o símbolo i/o e uma barra
 * de progresso no gradiente. Ao terminar, desliza pra cima revelando o site.
 * Aparece uma vez por sessão e respeita prefers-reduced-motion.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Já rodou nesta sessão: não mostra de novo.
    if (sessionStorage.getItem("inovaxio-preloaded")) {
      setLoading(false);
      return;
    }

    // Trava o scroll enquanto carrega.
    document.body.style.overflow = "hidden";

    const timer = setTimeout(
      () => {
        sessionStorage.setItem("inovaxio-preloaded", "1");
        setLoading(false);
      },
      reduce ? 300 : 1600,
    );

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
          onAnimationComplete={() => {
            document.body.style.overflow = "";
          }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "var(--color-bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-8)",
          }}
        >
          <motion.img
            src="/assets/logo/simbolo-cor.svg"
            alt=""
            width={132}
            height={67}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ width: 132, height: "auto", display: "block" }}
          />

          <div
            style={{
              width: 132,
              height: 3,
              background: "var(--color-surface-2)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              style={{
                height: "100%",
                background: "var(--gradient-brand-h)",
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
