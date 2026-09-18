import type { ReactNode } from "react";
import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
import { ChapterCover } from "@/components/manual/ChapterCover";
import { ChapterNext } from "@/components/manual/ChapterNext";
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
          color: "var(--color-primary-text)",
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
    <Panel
      id="anuncios"
      index="01 / 05"
      title="Anúncios digitais"
      band="light"
      lead="O anúncio segue a trinca de reconhecimento: headline que nomeia o gap, body com a credencial principal, CTA direto sem urgência forçada."
    >
      <Topic
        wide
        title="Exemplo pronto"
        lead="Copie e adapte. A estrutura importa mais que as palavras exatas."
      >
        <CopyBlock
          label="Anúncio de lançamento"
          text="Tem a ideia. Tem o capital. Falta só o software. A Inovaxio é a parceira técnica que constrói o software que você quer lançar no mercado, com o time já montado desde o primeiro dia."
          variant="highlight"
        />
      </Topic>

      <Topic
        title="Anatomia"
        lead="As três partes de qualquer anúncio da marca, na ordem."
      >
        <TagList>
          <TagLine
            tag="Headline"
            value="Duas afirmações mais o gap (o que falta). Padrão: Tem X. Tem Y. Falta Z."
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
      </Topic>
    </Panel>
  );
}

function LegendasSection() {
  return (
    <Panel
      id="legendas"
      index="02 / 05"
      title="Legendas para redes"
      band="dim"
      lead="Tom profissional e direto, sem hashtag em excesso. Abre sempre com gancho de reconhecimento ou dado concreto, nunca com saudação."
    >
      <Topic
        wide
        title="Exemplos por dimensão"
        lead="Um para quem está lançando, outro para quem já opera um sistema crítico."
      >
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <CopyBlock
            label="LinkedIn: lançamento"
            text="Quem vai construir o software da sua próxima ideia? A Inovaxio monta o time técnico e começa a construir. Capital aplicado em produto, não em estruturação de equipe. #software #tecnologia #inovaxio"
          />
          <CopyBlock
            label="LinkedIn: crítico"
            text="Sistemas financeiros não podem cair. A Inovaxio sustenta operações críticas com monitoramento contínuo e processo. Não como um fornecedor, como parceira técnica de longo prazo. #fintech #sistemas #inovaxio"
          />
        </div>
      </Topic>

      <Topic
        title="Regras do formato"
        lead="O que decide se a legenda soa como a marca ou como qualquer agência."
      >
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
      </Topic>
    </Panel>
  );
}

function SiteSection() {
  return (
    <Panel
      id="site"
      index="03 / 05"
      title="Copy para o site"
      band="light"
      lead="Big Idea como headline do hero, trinca de reconhecimento como subtítulo. O CTA principal é sempre Fale com a gente."
    >
      <Topic
        title="Estrutura da página"
        lead="Cada bloco tem um papel. Trocar a ordem quebra o argumento."
      >
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
      </Topic>
    </Panel>
  );
}

function CanaisSection() {
  return (
    <Panel
      id="canais"
      index="04 / 05"
      title="Voz por canal"
      band="dark"
      lead="Cada canal tem um tom e um formato adequado. A consistência é na essência, não na repetição literal do mesmo texto."
    >
      <Topic
        wide
        title="A tabela de canais"
        lead="O que muda de um canal para o outro, e o que nunca muda."
      >
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
      </Topic>
    </Panel>
  );
}

function LicitacaoSection() {
  return (
    <Panel
      id="licitacao"
      index="05 / 05"
      title="Setor público e licitação"
      band="light"
      lead="Em documento de licitação vale a terminologia exigida pelo edital. A proibição de termos como engenharia e produto digital é regra de copy de marca, não de documento técnico-jurídico."
    >
      <div
        style={{
          background: "color-mix(in srgb, var(--color-primary) 6%, transparent)",
          border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
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
    </Panel>
  );
}

export default function AplicacoesPage() {
  return (
    <>
      <ChapterCover
        num="04"
        title="Aplicações"
        lead="Como a marca se comporta em anúncio, legenda, site e licitação."
        topics={[
          "Anúncios",
          "Legendas",
          "Site",
          "Voz por canal",
          "Setor público",
        ]}
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
      <ChapterNext current="aplicacoes" />
    </>
  );
}
