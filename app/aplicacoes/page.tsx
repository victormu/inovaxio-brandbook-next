import type { ReactNode } from "react";
import { PageBanner } from "@/components/sections/PageBanner";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CopyBlock } from "@/components/ui/CopyBlock";

const CHANNEL_ROWS = [
  {
    canal: "LinkedIn",
    tom: "Profissional-consultivo",
    formato: "Textos médios",
    evitar: "Hashtag excessiva",
  },
  {
    canal: "Instagram",
    tom: "Visual, impacto e contexto",
    formato: "Copy de apoio curta",
    evitar: "Textos longos",
  },
  {
    canal: "Email",
    tom: "Direto, consultivo",
    formato: "Estrutura clara, sem saudação genérica",
    evitar: '"Prezado(a)"',
  },
  {
    canal: "Proposta",
    tom: "Formal mas humano",
    formato: "Contexto, solução, investimento, próximos passos",
    evitar: "Gerundismo",
  },
  {
    canal: "WhatsApp",
    tom: "Conversacional, objetivo",
    formato: "Mensagem curta e objetiva",
    evitar: "Formalismo excessivo",
  },
];

const TABLE_HEADERS = ["Canal", "Tom", "Formato", "Evitar"] as const;

function SecIntro({
  id,
  eyebrow,
  label,
  lead,
}: {
  id: string;
  eyebrow: string;
  label: string;
  lead: string;
}) {
  return (
    <SectionHeader
      level={2}
      eyebrow={eyebrow}
      titleId={id}
      title={label}
      description={lead}
    />
  );
}

function TagLine({ tag, value }: { tag: string; value: string }) {
  return (
    <li
      style={{
        display: "flex",
        gap: "var(--space-4)",
        padding: "var(--space-3) var(--space-4)",
        background: "var(--color-surface)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
      }}
    >
      <span
        style={{
          color: "var(--color-primary)",
          fontWeight: 600,
          fontSize: "var(--text-sm)",
          minWidth: "5rem",
          flexShrink: 0,
        }}
      >
        {tag}
      </span>
      <span
        style={{
          color: "var(--color-text-muted)",
          fontSize: "var(--text-sm)",
          lineHeight: 1.6,
        }}
      >
        {value}
      </span>
    </li>
  );
}

function TagList({ children }: { children: ReactNode }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "var(--space-8) 0 0",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      {children}
    </ul>
  );
}

function AnunciosSection() {
  return (
    <section aria-labelledby="anuncios">
      <SecIntro
        id="anuncios"
        eyebrow="Anúncios"
        label="Anúncios digitais"
        lead="O formato para anúncios digitais segue a trinca de reconhecimento: headline que nomeia o gap, body com a credencial principal, CTA direto sem urgência forçada."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <CopyBlock
          label="Anúncio de lançamento"
          text="Tem a ideia. Tem o capital. Falta só o software. A Inovaxio é a parceira técnica que constrói o software que você quer lançar no mercado, com o time já montado desde o primeiro dia."
          variant="highlight"
        />
      </div>
      <TagList>
        <TagLine
          tag="Headline"
          value="Duas afirmações + gap (o que falta). Padrão: Tem X. Tem Y. Falta Z."
        />
        <TagLine
          tag="Body"
          value="Nomeia o serviço e a credencial principal. Ex: construímos e sustentamos sistemas críticos em produção."
        />
        <TagLine
          tag="CTA"
          value='Direto, sem urgência forçada. "Fale com a gente" ou "Conheça como trabalhamos".'
        />
      </TagList>
    </section>
  );
}

function LegendasSection() {
  return (
    <section aria-labelledby="legendas">
      <SecIntro
        id="legendas"
        eyebrow="Redes"
        label="Legendas para redes sociais"
        lead="Tom profissional e direto, sem hashtag excessiva. Máximo três hashtags por post. Abrir sempre com gancho de reconhecimento ou dado concreto."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <CopyBlock
          label="LinkedIn: lançamento"
          text="Quem vai construir o software da sua próxima ideia? A Inovaxio monta o time técnico e começa a construir. Capital aplicado em produto, não em estruturação de equipe. #software #tecnologia #inovaxio"
        />
        <CopyBlock
          label="LinkedIn: crítico"
          text="Sistemas financeiros não podem cair. A Inovaxio sustenta operações críticas com monitoramento contínuo e processo. Não como um fornecedor, como parceira técnica de longo prazo. #fintech #sistemas #inovaxio"
        />
      </div>
      <TagList>
        <TagLine
          tag="Abertura"
          value="Gancho de reconhecimento ou dado concreto. Nunca saudação genérica."
        />
        <TagLine
          tag="Hashtags"
          value="Máximo três por post. Relevantes e específicas."
        />
        <TagLine
          tag="Evitar"
          value='"Somos apaixonados por tecnologia", "Transformamos o futuro", "Nós entregamos resultados".'
        />
      </TagList>
    </section>
  );
}

function SiteSection() {
  return (
    <section aria-labelledby="site">
      <SecIntro
        id="site"
        eyebrow="Site"
        label="Copy para o site"
        lead='Hierarquia no hero: Big Idea como headline, trinca de reconhecimento como subtítulo ou abertura. CTA principal é sempre "Fale com a gente".'
      />
      <TagList>
        <TagLine
          tag="Hero"
          value="Big Idea como headline. Trinca de reconhecimento como subtítulo ou abertura da primeira seção."
        />
        <TagLine
          tag="Seções"
          value="Hero, o que fazemos, como trabalhamos, cases ou experiência, contato."
        />
        <TagLine
          tag="CTA"
          value='"Fale com a gente". Nunca "Compre agora" ou "Assine".'
        />
        <TagLine
          tag="Tom"
          value="Consultivo e direto. Frases curtas. Zero jargão de agência."
        />
      </TagList>
    </section>
  );
}

function CanaisSection() {
  return (
    <section aria-labelledby="canais">
      <SecIntro
        id="canais"
        eyebrow="Canais"
        label="Voz por canal"
        lead="Cada canal tem um tom e um formato adequado. A consistência é na essência, não na repetição literal do mesmo texto."
      />
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--text-sm)",
          }}
        >
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "var(--space-3) var(--space-4)",
                    background: "var(--color-surface-2)",
                    color: "var(--color-text)",
                    fontWeight: 600,
                    borderBottom: "2px solid var(--color-border)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHANNEL_ROWS.map((row, index) => (
              <tr
                key={row.canal}
                style={{
                  background:
                    index % 2 === 0
                      ? "var(--color-surface)"
                      : "transparent",
                }}
              >
                <td
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    color: "var(--color-text)",
                    fontWeight: 600,
                    borderBottom: "1px solid var(--color-border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.canal}
                </td>
                <td
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    color: "var(--color-text-muted)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {row.tom}
                </td>
                <td
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    color: "var(--color-text-muted)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {row.formato}
                </td>
                <td
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    color: "var(--color-text-muted)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {row.evitar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LicitacaoSection() {
  return (
    <section aria-labelledby="licitacao">
      <SecIntro
        id="licitacao"
        eyebrow="Licitação"
        label="Setor público e licitação"
        lead='Em documentos de licitação, use a terminologia exigida pelo edital. A proibição de termos como "engenharia" e "produto digital" é regra de copy de marca, não de documento técnico-jurídico. No edital, a linguagem segue o padrão legal.'
      />
      <div
        style={{
          background: "hsl(var(--c-primary) / 0.06)",
          border: "1px solid hsl(var(--c-primary) / 0.2)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-6)",
        }}
      >
        <p
          style={{
            color: "var(--color-primary-text)",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-widest)",
            marginBottom: "var(--space-3)",
          }}
        >
          Regra-chave
        </p>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Linguagem de marca na vitrine. Linguagem técnico-jurídica no documento.
        </p>
      </div>
    </section>
  );
}

export default function AplicacoesPage() {
  return (
    <>
      <PageBanner
        kicker="04 Aplicações"
        title="Copy em contexto"
        description="Como aplicar a linguagem da Inovaxio em cada canal, formato e documento."
        mediaBase="/assets/banners/aplicacoes"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-16)",
        }}
      >
        <AnunciosSection />
        <LegendasSection />
        <SiteSection />
        <CanaisSection />
        <LicitacaoSection />
      </div>
    </>
  );
}
