interface ChapterCoverProps {
  /** Número do capítulo, ex.: "01". */
  num: string;
  /** Nome do capítulo, ex.: "Fundamentos". */
  title: string;
  /** Uma linha de abertura. Curta. */
  lead?: string;
  /** Os tópicos do capítulo, listados como sumário. */
  topics?: string[];
}

/**
 * Abertura de capítulo em tela cheia, no padrão de manual impresso:
 * número grande, nome, e o sumário do que vem. Sempre sobre navy.
 */
export function ChapterCover({ num, title, lead, topics }: ChapterCoverProps) {
  return (
    <header className="chapter-cover ctx-navy">
      <div className="chapter-cover__inner">
        <span className="chapter-cover__num">{num}</span>
        <h1 className="chapter-cover__title">{title}</h1>
        {lead ? <p className="chapter-cover__lead">{lead}</p> : null}
        {topics && topics.length > 0 ? (
          <ol className="chapter-cover__toc">
            {topics.map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </header>
  );
}
