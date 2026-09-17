import { Panel } from "@/components/manual/Panel";
import { ChapterCover } from "@/components/manual/ChapterCover";
import { ChapterNext } from "@/components/manual/ChapterNext";
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
      <ChapterCover
        num="02"
        title="Sistema Verbal"
        lead="Tom de voz, princípios, linguagem e as frases que a marca usa."
        topics={[
          "Tom de voz",
          "7 princípios",
          "Linguagem",
          "Voz AI-first",
          "Frases-chave",
          "Segmentação",
          "Checklist",
        ]}
      />

      <Panel
        id="tom"
        index="01 / 07"
        title="Tom de voz"
        band="light"
        lead="O tom da Inovaxio é humano, consultivo, direto, profissional, estratégico e maduro. A comunicação parece uma conversa entre parceiros de negócio, não entre fornecedor e contratante."
      >
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
      </Panel>

      <Panel
        id="principios"
        index="02 / 07"
        title="7 Princípios de comunicação"
        band="dim"
        lead="Os sete critérios que todo texto da marca precisa passar antes de ser publicado."
      >
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
      </Panel>

      <Panel
        id="linguagem"
        index="03 / 07"
        title="Linguagem"
        band="light"
        lead="O que a marca fala, e o vocabulário que ela recusa."
      >
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
      </Panel>

      <Panel
        id="ai-first"
        index="04 / 07"
        title="Voz AI-first"
        band="light"
        lead="Como a marca fala de inteligência artificial sem virar promessa vazia."
      >
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
      </Panel>

      <Panel
        id="frases"
        index="05 / 07"
        title="Frases-chave"
        band="dark"
        lead="As linhas prontas, aprovadas, para usar direto."
      >
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
      </Panel>

      <Panel
        id="segmentacao"
        index="06 / 07"
        title="Segmentação: duas dimensões"
        band="light"
        lead="A mesma marca, dois compradores. O que muda no discurso."
      >
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
      </Panel>

      <Panel
        id="checklist"
        index="07 / 07"
        title="Checklist: antes de publicar"
        band="dim"
        lead="Passe por aqui antes de qualquer texto sair."
      >
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
      </Panel>
      <ChapterNext current="verbal" />
    </div>
  );
}
