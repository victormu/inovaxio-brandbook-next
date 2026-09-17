"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavSection } from "@/lib/nav";

interface SectionRailProps {
  section: NavSection;
}

/** "/visual#logo" -> "logo"; "/visual/aplicacoes" -> null (não é âncora). */
function anchorId(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

/**
 * Trilho de capítulo: número grande, nome, e os subitens com marcador no que
 * está sendo lido. Gruda abaixo da topbar no desktop; abaixo de 1024px vira um
 * cabeçalho normal no topo da seção.
 */
export function SectionRail({ section }: SectionRailProps) {
  const anchors = useMemo(
    () =>
      section.subitems
        .map((item) => ({ ...item, anchor: anchorId(item.href) }))
        .filter((item): item is typeof item & { anchor: string } =>
          item.anchor !== null,
        ),
    [section],
  );

  const ids = useMemo(() => anchors.map((a) => a.anchor), [anchors]);
  const activeId = useActiveSection(ids);

  const [num, ...rest] = section.label.split(" ");
  const name = rest.join(" ");

  return (
    <aside className="rail" aria-label={`Sumário de ${name}`}>
      <span className="rail__num" aria-hidden="true">
        {num}
      </span>
      <h2 className="rail__name">{name}</h2>
      <ul className="rail__list">
        {anchors.map((item) => {
          const isActive = item.anchor === activeId;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rail__item"
                data-active={isActive ? "" : undefined}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
