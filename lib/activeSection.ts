export interface SectionPosition {
  id: string;
  /** distância do topo da seção ao topo da viewport, em px (pode ser negativa) */
  top: number;
  isIntersecting: boolean;
}

/**
 * Decide qual seção o trilho deve marcar como ativa.
 *
 * Regra: entre as seções visíveis, ganha a mais próxima do topo da viewport.
 * Se nenhuma estiver visível (rolagem rápida entre duas seções, ou um bloco
 * mais alto que a janela), mantém a última já ultrapassada, para o trilho não
 * piscar de volta para vazio. Antes da primeira seção entrar, devolve null.
 */
export function pickActiveId(positions: SectionPosition[]): string | null {
  const visible = positions.filter((p) => p.isIntersecting);
  if (visible.length > 0) {
    return visible.reduce((best, p) =>
      Math.abs(p.top) < Math.abs(best.top) ? p : best,
    ).id;
  }

  const passed = positions.filter((p) => p.top < 0);
  if (passed.length > 0) {
    return passed.reduce((best, p) => (p.top > best.top ? p : best)).id;
  }

  return null;
}
