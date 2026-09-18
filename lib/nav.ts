export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavSection {
  id: string;
  label: string;
  href: string;
  subitems: NavSubItem[];
  /**
   * Fora do ar: some da navegação, do sumário da home e da corrente de
   * capítulos. A rota continua existindo e funcionando por URL direta.
   * Para religar, apague esta linha da seção.
   */
  oculta?: boolean;
}

/**
 * A lista completa, incluindo o que está oculto. Não exporte: quem consome
 * quer só o que está no ar, e centralizar o filtro aqui significa que
 * religar um capítulo é apagar uma linha, sem tocar em componente.
 */
const TODAS: NavSection[] = [
  {
    id: "fundamentos",
    label: "01 Fundamentos",
    href: "/fundamentos",
    subitems: [
      { label: "Essência da marca", href: "/fundamentos#essencia" },
      { label: "Big Idea", href: "/fundamentos#big-idea" },
      { label: "As duas dimensões", href: "/fundamentos#dimensoes" },
      { label: "Posicionamento", href: "/fundamentos#posicionamento" },
      { label: "Analogia oficial", href: "/fundamentos#analogia" },
    ],
  },
  {
    id: "verbal",
    label: "02 Sistema Verbal",
    href: "/verbal",
    subitems: [
      { label: "Tom de voz", href: "/verbal#tom" },
      { label: "7 princípios", href: "/verbal#principios" },
      { label: "Linguagem", href: "/verbal#linguagem" },
      { label: "Voz AI-first", href: "/verbal#ai-first" },
      { label: "Frases-chave", href: "/verbal#frases" },
      { label: "Segmentação", href: "/verbal#segmentacao" },
      { label: "Checklist", href: "/verbal#checklist" },
    ],
  },
  {
    id: "visual",
    label: "03 Sistema Visual",
    href: "/visual",
    subitems: [
      { label: "Logo", href: "/visual#logo" },
      { label: "Cor", href: "/visual#cor" },
      { label: "Tipografia", href: "/visual#tipografia" },
      { label: "Fotografia", href: "/visual#fotografia" },
      { label: "Grid e layout", href: "/visual#grid" },
      { label: "Ícones", href: "/visual#icones" },
      { label: "Aplicações da marca", href: "/visual/aplicacoes" },
    ],
  },
  {
    id: "aplicacoes",
    label: "04 Aplicações",
    href: "/aplicacoes",
    subitems: [
      { label: "Anúncios", href: "/aplicacoes#anuncios" },
      { label: "Legendas", href: "/aplicacoes#legendas" },
      { label: "Site", href: "/aplicacoes#site" },
      { label: "Voz por canal", href: "/aplicacoes#canais" },
      { label: "Setor público", href: "/aplicacoes#licitacao" },
    ],
  },
  {
    id: "recursos",
    label: "05 Recursos",
    href: "/recursos",
    // Oculto a pedido do Victor: os downloads dependem de arquivos que
    // ainda não existem, e 7 dos 10 cards mostram "Em breve".
    oculta: true,
    subitems: [
      { label: "Logo", href: "/recursos#logo" },
      { label: "Paleta", href: "/recursos#paleta" },
      { label: "Templates", href: "/recursos#templates" },
      { label: "Banco de fotos", href: "/recursos#fotos" },
      { label: "Apresentações", href: "/recursos#apresentacoes" },
    ],
  },
];

/** Os capítulos que estão no ar. É isto que a navegação, o sumário e a
    corrente de capítulos enxergam. */
export const NAV_SECTIONS: NavSection[] = TODAS.filter((s) => !s.oculta);
