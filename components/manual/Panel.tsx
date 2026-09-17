export type Band = "dark" | "light" | "light-dim" | "navy";

const BAND_CLASS: Record<Band, string> = {
  dark: "",
  light: "ctx-light",
  "light-dim": "ctx-light ctx-light-dim",
  navy: "ctx-navy",
};

interface PanelProps {
  /** Âncora do trilho. Bate com o hash do subitem em lib/nav.ts. */
  id: string;
  /** Numeração do tópico dentro do capítulo. Ex.: "01 / 05". */
  index?: string;
  title: string;
  /** Texto de abertura, na coluna que gruda. Curto: cabe em 46ch. */
  lead?: string;
  /** Banda de fundo. Alterne ao longo do capítulo, como o site faz. */
  band?: Band;
  /** Conteúdo do tópico. Opcional: um tópico pode ser só a afirmação. */
  children?: React.ReactNode;
}

/**
 * Um tópico do manual ocupando a tela inteira, sangrando de ponta a ponta.
 * O número, o título e o lead ficam pinados à esquerda enquanto o conteúdo
 * corre à direita; quando o tópico acaba, o título solta e entra o próximo.
 * Só `position: sticky`, sem lib e sem handler de scroll.
 */
export function Panel({
  id,
  index,
  title,
  lead,
  band = "dark",
  children,
}: PanelProps) {
  const cls = BAND_CLASS[band];
  return (
    <section
      id={id}
      className={cls ? `panel ${cls}` : "panel"}
      aria-labelledby={`${id}-title`}
    >
      <div className="panel__inner">
        <header className="panel__head">
          {index ? <span className="panel__num">{index}</span> : null}
          <h2 id={`${id}-title`} className="panel__title">
            {title}
          </h2>
          {lead ? <p className="panel__lead">{lead}</p> : null}
        </header>
        {children ? <div className="panel__flow">{children}</div> : null}
      </div>
    </section>
  );
}
