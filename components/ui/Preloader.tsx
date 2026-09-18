"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Tela de carregamento da marca: overlay escuro com o símbolo i/o e uma barra
 * de progresso no gradiente. Ao terminar, desliza pra cima revelando o site.
 * Aparece uma vez por sessão e respeita prefers-reduced-motion.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);
  // O @media do CSS só neutraliza transition e animation, e o Framer escreve
  // transform inline por rAF. Sem ler a preferência aqui, a tela desliza
  // ~900px mesmo com movimento reduzido ligado.
  const reduzido = usePrefersReducedMotion();

  useEffect(() => {
    // Já rodou nesta sessão: não mostra de novo. sessionStorage não existe
    // no servidor, então só dá para ler depois da montagem, e useSyncExternal
    // Store não ajuda: este valor não muda durante a vida da página.
    if (sessionStorage.getItem("inovaxio-preloaded")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    // Trava o scroll e tira o conteúdo de trás do alcance do teclado:
    // sem inert, Tab move o foco para elementos invisíveis durante 1,6s.
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main-content");
    main?.setAttribute("inert", "");

    const timer = setTimeout(
      () => {
        sessionStorage.setItem("inovaxio-preloaded", "1");
        setLoading(false);
      },
      reduzido ? 300 : 1600,
    );

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
    };
  }, [reduzido]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={reduzido ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduzido ? 0.15 : 0.7, ease: EASE }}
          onAnimationComplete={() => {
            document.body.style.overflow = "";
            document.getElementById("main-content")?.removeAttribute("inert");
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
            transition={{ duration: reduzido ? 0 : 0.6, ease: EASE }}
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
              transition={{ duration: reduzido ? 0 : 1.3, ease: "easeInOut" }}
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
    </MotionConfig>
  );
}
