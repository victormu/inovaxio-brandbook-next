import { Reveal } from "@/components/ui/Reveal";

interface TopicProps {
  /** Título do subtópico. Vira h3: é ele que organiza a leitura do painel. */
  title: string;
  /** Texto de apoio, ao lado do título na coluna que gruda. */
  lead?: string;
  /**
   * Conteúdo que precisa da largura toda: tabela, rampa de cor, grade de
   * três. Nesse modo o título vira cabeçalho em cima, não coluna ao lado.
   */
  wide?: boolean;
  children: React.ReactNode;
}

/**
 * Subtópico de um painel. O título gruda enquanto o conteúdo dele passa,
 * que é o nível onde o sticky faz sentido: acompanha algumas centenas de
 * pixels, não a página inteira.
 *
 * Substitui as duas cópias do helper Block que viviam soltas em
 * ColorSection e IconsSection, ambas montadas com estilo inline.
 */
export function Topic({ title, lead, wide = false, children }: TopicProps) {
  return (
    <Reveal as="section" className={wide ? "topic topic--wide" : "topic"}>
      <div className="topic__head">
        <h3 className="topic__title">{title}</h3>
        {lead ? <p className="topic__lead">{lead}</p> : null}
      </div>
      <div className="topic__body">{children}</div>
    </Reveal>
  );
}
