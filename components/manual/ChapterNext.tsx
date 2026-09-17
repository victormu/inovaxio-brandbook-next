import Link from "next/link";
import { NAV_SECTIONS } from "@/lib/nav";
import type { Band } from "@/components/manual/Panel";

const BAND_CLASS: Record<Band, string> = {
  light: "",
  dim: "ctx-dim",
  dark: "ctx-dark",
  navy: "ctx-navy",
};

interface ChapterNextProps {
  /** id do capítulo ATUAL em lib/nav.ts. O próximo é derivado daqui. */
  current: string;
  band?: Band;
}

/**
 * Fecha o capítulo levando ao seguinte. No último capítulo não renderiza
 * nada, em vez de apontar para lugar nenhum.
 */
export function ChapterNext({ current, band = "navy" }: ChapterNextProps) {
  const i = NAV_SECTIONS.findIndex((s) => s.id === current);
  const next = i === -1 ? null : NAV_SECTIONS[i + 1];
  if (!next) return null;

  const [num, ...rest] = next.label.split(" ");
  const cls = BAND_CLASS[band];

  return (
    <Link
      href={next.href}
      className={cls ? `chapter-next ${cls}` : "chapter-next"}
    >
      <div className="chapter-next__inner">
        <span className="chapter-next__label">Próximo capítulo · {num}</span>
        <span className="chapter-next__title">
          {rest.join(" ")}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="chapter-next__arrow"
      width="48"
      height="20"
      viewBox="0 0 48 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 10h45M36 1l9 9-9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
