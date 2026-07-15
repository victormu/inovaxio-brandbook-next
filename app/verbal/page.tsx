import { PageBanner } from "@/components/sections/PageBanner";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CopyBlock } from "@/components/ui/CopyBlock";
import { ChecklistItem } from "@/components/ui/ChecklistItem";

const principios = [
  {
    n: "01",
    title: "Objetividade",
    body: "Nada de linguagem técnica desnecessária. Cada frase deve ser compreendida por qualquer executivo, não apenas por quem escreve código.",
  },
  {
    n: "02",
    title: "Foco na visão do cliente",
    body: "A tecnologia entra como meio, nunca como protagonista. O que importa é o que o software permite que o cliente faça.",
  },
  {
    n: "03",
    title: "Personalização",
    body: "Cada software é construído para a realidade específica do cliente. Não existe solução genérica com etiqueta personalizada.",
  },
  {
    n: "04",
    title: "Segurança na decisão",
    body: "Transmitir previsibilidade, transparência e controle em cada etapa. O cliente precisa saber o que está contratando.",
  },
  {
    n: "05",
    title: "Parceria",
    body: "Trabalhar lado a lado. Ser parceira técnica de longo prazo, não apenas executora de um escopo e sumidora.",
  },
  {
    n: "06",
    title: "Posicionamento positivo",
    body: "Afirmar o que somos, não atacar o que outros são. Confiança se constrói com consistência, não com comparação.",
  },
  {
    n: "07",
    title: "Escopo explícito",
    body: "Deixar explícito o que entra e o que não entra. Clareza antes de começar evita frustração no meio do caminho.",
  },
];

const linguagemEvitar = [
  "microsserviços",
  "observabilidade",
  "SLA",
  "escalabilidade horizontal",
  "engenharia",
  "produto digital",
  "esteira de vendas",
  "funil mágico",
];

const linguagemUsar = [
  "sistemas preparados para crescer",
  "monitoramento contínuo",
  "operação que continua de pé",
  "time técnico",
  "parceria técnica",
  "tecnologia",
];

const tomEvitar = [
  "exageros",
  "promessas irreais",
  "linguagem técnica excessiva",
  "jargão de marketing digital",
  "tom de agência",
  "frases com travessão",
];

const frasesChave = [
  {
    text: "Construímos o software que você quer lançar no mercado.",
    label: "Frase principal",
    variant: "highlight" as const,
  },
  {
    text: "Tem a ideia. Tem o capital. Falta só o software.",
    label: "Frase de ativação",
    variant: "highlight" as const,
  },
  {
    text: "Parceira técnica para construir e sustentar o software que o cliente quer lançar e operar no mercado.",
    label: "Proposta de valor completa",
    variant: "default" as const,
  },
  {
    text: "A construção começa com o time já montado.",
    label: "Diferencial operacional",
    variant: "default" as const,
  },
];

const checklistItems = [
  {
    id: "checklist-1",
    label: "A copy fala da ideia do cliente, não da nossa tecnologia?",
  },
  {
    id: "checklist-2",
    label: "Evitei travessão: usei ponto, vírgula ou dois-pontos?",
  },
  {
    id: "checklist-3",
    label: "Não prometo prazo específico de entrega?",
  },
  {
    id: "checklist-4",
    label: 'Não uso a palavra "engenharia" sem necessidade?',
  },
  {
    id: "checklist-5",
    label: 'Não menciono "produto digital" ou "esteira de vendas"?',
  },
  {
    id: "checklist-6",
    label: "Linguagem técnica foi traduzida para efeito no negócio?",
  },
  {
    id: "checklist-7",
    label: "A frase de abertura ativa reconhecimento no leitor?",
  },
];

function PrincipioCard({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <article
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xs)",
          color: "var(--color-primary)",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          fontWeight: 700,
        }}
      >
        {n}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-lg)",
          color: "var(--color-text)",
          fontWeight: 600,
          lineHeight: "var(--leading-tight)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-relaxed)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </article>
  );
}

function LinguagemPill({
  label,
  type,
}: {
  label: string;
  type: "evitar" | "usar";
}) {
  const isEvitar = type === "evitar";
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: isEvitar ? "hsl(0 60% 65%)" : "hsl(140 50% 60%)",
        backgroundColor: isEvitar
          ? "hsl(0 60% 65% / 0.08)"
          : "hsl(140 50% 60% / 0.08)",
        border: `1px solid ${isEvitar ? "hsl(0 60% 65% / 0.2)" : "hsl(140 50% 60% / 0.2)"}`,
        borderRadius: "var(--radius-md)",
        padding: "var(--space-3) var(--space-4)",
        lineHeight: "var(--leading-snug)",
      }}
    >
      {label}
    </span>
  );
}

export default function VerbalPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-16)",
      }}
    >
      <PageBanner
        kicker="02 Sistema Verbal"
        title="Como a Inovaxio se comunica"
        description="Tom de voz, princípios, linguagem aprovada e frases que ativam reconhecimento no leitor."
        mediaBase="/assets/banners/verbal"
      />

      <section aria-labelledby="tom">
        <SectionHeader
          level={2}
          eyebrow="Voz"
          titleId="tom"
          title="Tom de voz"
          description="O tom da Inovaxio é humano, consultivo, direto, profissional, estratégico e maduro. A comunicação parece uma conversa entre parceiros de negócio, não entre fornecedor e contratante."
        />
        <div
          style={{
            backgroundColor: "hsl(0 60% 55% / 0.05)",
            border: "1px solid hsl(0 60% 55% / 0.18)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-8)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              color: "hsl(0 60% 68%)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 2l8 8M10 2L2 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Evitar no tom
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
            {tomEvitar.map((t) => (
              <LinguagemPill key={t} label={t} type="evitar" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="principios">
        <SectionHeader
          level={2}
          eyebrow="Princípios"
          titleId="principios"
          title="7 Princípios de comunicação"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {principios.map((p) => (
            <PrincipioCard key={p.n} n={p.n} title={p.title} body={p.body} />
          ))}
        </div>
      </section>

      <section aria-labelledby="linguagem">
        <SectionHeader
          level={2}
          eyebrow="Léxico"
          titleId="linguagem"
          title="Linguagem"
          description="Termos técnicos crus perdem o cliente no meio do caminho. Use a linguagem do negócio: o que o sistema faz, não como ele foi construído."
        />
        <div
          className="stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-6)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                color: "hsl(0 60% 65%)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Evitar
            </p>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}
            >
              {linguagemEvitar.map((t) => (
                <LinguagemPill key={t} label={t} type="evitar" />
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                color: "hsl(140 50% 60%)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Usar
            </p>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}
            >
              {linguagemUsar.map((t) => (
                <LinguagemPill key={t} label={t} type="usar" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ai-first">
        <SectionHeader
          level={2}
          eyebrow="IA"
          titleId="ai-first"
          title="Voz AI-first"
        />
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-8)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              margin: 0,
              maxWidth: "64ch",
            }}
          >
            A comunicação da Inovaxio reconhece que o mercado de tecnologia agora
            opera com IA como camada de aceleração. Comunicar IA como feature é
            irrelevante.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              color: "var(--color-text)",
              lineHeight: "var(--leading-snug)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            O que o cliente quer saber: o software funciona, escala e não para.
            IA ou não.
          </p>
        </div>
      </section>

      <section aria-labelledby="frases">
        <SectionHeader
          level={2}
          eyebrow="Copy"
          titleId="frases"
          title="Frases-chave"
          description="Clique para copiar qualquer frase e usar em apresentações, propostas ou conteúdo."
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
        >
          {frasesChave.map((f) => (
            <CopyBlock
              key={f.text}
              text={f.text}
              label={f.label}
              variant={f.variant}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="segmentacao">
        <SectionHeader
          level={2}
          eyebrow="Segmentos"
          titleId="segmentacao"
          title="Segmentação: duas dimensões"
          description="A comunicação da Inovaxio varia conforme o perfil do interlocutor e o setor de atuação. Os detalhes de posicionamento por segmento estão na seção Fundamentos."
        />
        <a
          href="/fundamentos#posicionamento"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-primary)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Ver posicionamento por segmento
          <span aria-hidden="true">&#8594;</span>
        </a>
      </section>

      <section aria-labelledby="checklist">
        <SectionHeader
          level={2}
          eyebrow="Revisão"
          titleId="checklist"
          title="Checklist: antes de publicar"
          description="Passe por este checklist antes de aprovar qualquer copy para a Inovaxio."
        />
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          {checklistItems.map((item) => (
            <ChecklistItem key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </section>
    </div>
  );
}
