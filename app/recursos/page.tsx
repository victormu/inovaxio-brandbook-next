import type { CSSProperties } from "react";
import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
import { ChapterCover } from "@/components/manual/ChapterCover";
import { ChapterNext } from "@/components/manual/ChapterNext";
import { DownloadCard } from "@/components/ui/DownloadCard";

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
  gap: "var(--space-4)",
};




const fotosPlaceholderStyle: CSSProperties = {
  marginTop: "var(--space-6)",
  border: "1px dashed var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "var(--space-8)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
};

const fotosLabelStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-primary-text)",
};

const fotosTextStyle: CSSProperties = {
  fontSize: "var(--text-base)",
  color: "var(--color-text-muted)",
  lineHeight: 1.6,
  maxWidth: "48ch",
};

const fotosCodeStyle: CSSProperties = {
  fontFamily: "monospace",
  fontSize: "var(--text-sm)",
  color: "var(--color-text)",
  background: "var(--color-surface-2)",
  padding: "0.15em 0.5em",
  borderRadius: "var(--radius-md)",
};


export default function RecursosPage() {
  return (
    <>
      <ChapterCover
        num="05"
        title="Recursos"
        lead="Logo, paleta, templates, fotos e apresentações para baixar."
        topics={[
          "Logo",
          "Paleta",
          "Templates",
          "Banco de fotos",
          "Apresentações",
        ]}
      />

      <Panel
        id="logo"
        index="01 / 05"
        title="Arquivos de logo"
        band="light"
        lead="Versões oficiais da marca em vetor e raster. Baixe sempre daqui: cópia de cópia perde qualidade e acaba recolorida."
      >
        <Topic wide title="Download" lead="SVG para tela e impressão. PNG só quando a ferramenta não aceitar vetor.">
          <div style={gridStyle}>
            <DownloadCard
              name="Logo principal"
              description="Símbolo azul e wordmark preto, para fundos claros"
              format="SVG"
              href="/assets/logo/inovaxio-horizontal-cor.svg"
            />
            <DownloadCard
              name="Logo em PNG"
              description="Para apresentações e documentos, fundo transparente"
              format="PNG"
              href="/assets/logo/inovaxio-horizontal-cor.png"
            />
            <DownloadCard
              name="Logo negativo"
              description="Versão branca, para fundos escuros"
              format="SVG"
              href="/assets/logo/inovaxio-horizontal-branco.svg"
            />
          </div>
        </Topic>
      </Panel>

      <Panel
        id="paleta"
        index="02 / 05"
        title="Cores e variáveis"
        band="dim"
        lead="Os tokens CSS são gerados a partir do arquivo real do site, então o que você baixa é sempre o que está no ar."
      >
        <Topic wide title="Download" lead="O ASE serve para Illustrator e Photoshop; o CSS, para qualquer front-end.">
          <div style={gridStyle}>
            <DownloadCard
              name="Paleta de cores"
              description="Swatches em formato ASE (Adobe Swatch Exchange)"
              format="ASE"
              href="/assets/paleta-inovaxio.ase"
            />
            <DownloadCard
              name="Tokens CSS"
              description="tokens.css completo, gerado do arquivo real do site"
              format="CSS"
              href="/assets/tokens.css"
            />
          </div>
        </Topic>
      </Panel>

      <Panel
        id="templates"
        index="03 / 05"
        title="Modelos de comunicação"
        band="light"
        lead="Arquivos editáveis para proposta, apresentação e assinatura. Partir do template evita reinventar a marca a cada peça."
      >
        <Topic wide title="Download" lead="Abra, salve como cópia e edite. Não altere o master.">
          <div style={gridStyle}>
            <DownloadCard
              name="Template de proposta"
              description="Modelo de proposta comercial com identidade visual"
              format="PPTX"
              href="/assets/template-proposta.pptx"
            />
            <DownloadCard
              name="Template de apresentação"
              description="Deck base com slides em branco e cores da marca"
              format="PPTX"
              href="/assets/template-apresentacao.pptx"
            />
            <DownloadCard
              name="Assinatura de email"
              description="Bloco HTML pronto para colar no cliente de email"
              format="HTML"
              href="/assets/assinatura-email.html"
            />
          </div>
        </Topic>
      </Panel>

      <Panel
        id="fotos"
        index="04 / 05"
        title="Banco de fotos"
        band="dark"
        lead="Fotografia aprovada da marca. Prático, próximo e técnico: se a imagem não carrega nenhum dos três, ela não entra aqui."
      >
        <Topic title="Status" lead="O banco será publicado neste espaço assim que as fotos forem aprovadas.">
          <div style={fotosPlaceholderStyle}>
            <span style={fotosLabelStyle}>Aguardando aprovação</span>
            <p style={fotosTextStyle}>
              Insira as imagens aprovadas em{" "}
              <code style={fotosCodeStyle}>/public/assets/fotos/</code> e elas
              aparecem aqui. Use apenas fotografia aprovada pela marca, nunca
              stock genérico.
            </p>
          </div>
        </Topic>
      </Panel>

      <Panel
        id="apresentacoes"
        index="05 / 05"
        title="Decks oficiais"
        band="light"
        lead="Materiais institucionais prontos para cliente e parceiro, já no tom e no visual da marca."
      >
        <Topic wide title="Download" lead="Use como estão. Se precisar adaptar, mantenha capa, tipografia e proporção de cor.">
          <div style={gridStyle}>
            <DownloadCard
              name="Deck institucional"
              description="Apresentação oficial da Inovaxio para clientes"
              format="PPTX"
              href="/assets/deck-institucional.pptx"
            />
            <DownloadCard
              name="One-pager"
              description="Resumo de uma página da proposta de valor"
              format="PDF"
              href="/assets/one-pager.pdf"
            />
          </div>
        </Topic>
      </Panel>

      <ChapterNext current="recursos" />
    </>
  );
}
