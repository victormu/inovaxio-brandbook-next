import type { CSSProperties } from "react";
import { ChapterCover } from "@/components/manual/ChapterCover";
import { ChapterNext } from "@/components/manual/ChapterNext";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { DownloadCard } from "@/components/ui/DownloadCard";

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
  gap: "var(--space-4)",
};

const sectionWrapStyle: CSSProperties = {
  marginBottom: "var(--space-12)",
};

const anchorStyle: CSSProperties = {
  display: "block",
  position: "relative",
  top: "calc(-1 * var(--space-20, 5rem))",
  visibility: "hidden",
};

const cardsWrapStyle: CSSProperties = {
  marginTop: "var(--space-6)",
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

function SectionAnchor({ id }: { id: string }) {
  return <span id={id} style={anchorStyle} aria-hidden="true" />;
}

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

      <div style={{ marginTop: "var(--space-12)" }}>

        <div style={sectionWrapStyle}>
          <SectionAnchor id="logo" />
          <SectionHeader
            level={2}
            eyebrow="Logo"
            title="Arquivos de Logo"
            description="Versões oficiais da marca em formatos vetorial e raster."
          />
          <div style={{ ...gridStyle, ...cardsWrapStyle }}>
            <DownloadCard
              name="Logo Principal"
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
              name="Logo Negativo"
              description="Versão branca, para fundos escuros"
              format="SVG"
              href="/assets/logo/inovaxio-horizontal-branco.svg"
            />
          </div>
        </div>

        <div style={sectionWrapStyle}>
          <SectionAnchor id="paleta" />
          <SectionHeader
            level={2}
            eyebrow="Cores"
            title="Cores e Variáveis"
            description="Swatches e tokens prontos para uso em ferramentas de design e código."
          />
          <div style={{ ...gridStyle, ...cardsWrapStyle }}>
            <DownloadCard
              name="Paleta de Cores"
              description="Swatches e tokens em formato ASE (Adobe Swatch Exchange)"
              format="ASE"              href="/assets/paleta-inovaxio.ase"
            />
            <DownloadCard
              name="Tokens CSS"
              description="Arquivo tokens.css completo com todas as variáveis"
              format="CSS"              href="/assets/tokens.css"
            />
          </div>
        </div>

        <div style={sectionWrapStyle}>
          <SectionAnchor id="templates" />
          <SectionHeader
            level={2}
            eyebrow="Templates"
            title="Modelos de Comunicação"
            description="Arquivos editáveis para propostas, apresentações e comunicações digitais."
          />
          <div style={{ ...gridStyle, ...cardsWrapStyle }}>
            <DownloadCard
              name="Template de Proposta"
              description="Modelo de proposta comercial com identidade visual"
              format="PPTX"              href="/assets/template-proposta.pptx"
            />
            <DownloadCard
              name="Template de Apresentação"
              description="Deck base com slides em branco e cores da marca"
              format="PPTX"              href="/assets/template-apresentacao.pptx"
            />
            <DownloadCard
              name="Template de Email"
              description="Assinatura de email HTML"
              format="HTML"              href="/assets/assinatura-email.html"
            />
          </div>
        </div>

        <div style={sectionWrapStyle}>
          <SectionAnchor id="fotos" />
          <SectionHeader
            level={2}
            eyebrow="Fotografia"
            title="Fotografia da Marca"
          />
          <div style={fotosPlaceholderStyle}>
            <span style={fotosLabelStyle}>Aguardando aprovação</span>
            <p style={fotosTextStyle}>
              O banco de fotos da marca será disponibilizado aqui. Adicione as
              imagens aprovadas em{" "}
              <code style={fotosCodeStyle}>/public/assets/fotos/</code>. Use
              apenas fotografias aprovadas pela marca: não utilize stock photos
              genéricas.
            </p>
          </div>
        </div>

        <div style={sectionWrapStyle}>
          <SectionAnchor id="apresentacoes" />
          <SectionHeader
            level={2}
            eyebrow="Decks"
            title="Decks Oficiais"
            description="Materiais institucionais prontos para uso com clientes e parceiros."
          />
          <div style={{ ...gridStyle, ...cardsWrapStyle }}>
            <DownloadCard
              name="Deck Institucional"
              description="Apresentação oficial da Inovaxio para clientes"
              format="PPTX"              href="/assets/deck-institucional.pptx"
            />
            <DownloadCard
              name="One-Pager"
              description="Resumo de uma página da proposta de valor"
              format="PDF"              href="/assets/one-pager.pdf"
            />
          </div>
        </div>

      </div>
      <ChapterNext current="recursos" />
    </>
  );
}
