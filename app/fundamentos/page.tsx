import { ChapterCover } from "@/components/manual/ChapterCover";
import { Panel } from "@/components/manual/Panel";
import { ChapterNext } from "@/components/manual/ChapterNext";
import { CopyBlock } from "@/components/ui/CopyBlock";

interface PillarItemProps {
  number: string;
  text: string;
}

function PillarItem({ number, text }: PillarItemProps) {
  return (
    <article
      style={{
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-start",
        padding: "var(--space-4) var(--space-6)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: "var(--radius-md)",
          background: "hsl(var(--c-primary) / 0.1)",
          border: "1px solid hsl(var(--c-primary) / 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--text-sm)",
          color: "var(--color-primary)",
        }}
      >
        {number}
      </div>
      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-normal)",
        }}
      >
        {text}
      </p>
    </article>
  );
}

interface DimensionCardProps {
  tag: string;
  title: string;
  description: string;
}

function DimensionCard({ tag, title, description }: DimensionCardProps) {
  return (
    <article
      style={{
        padding: "var(--space-8)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <div
        className="label"
        style={{
          color: "var(--color-primary)",
          letterSpacing: "var(--tracking-widest)",
          textTransform: "uppercase",
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--text-2xl)",
          color: "var(--color-text)",
          lineHeight: "var(--leading-tight)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-normal)",
        }}
      >
        {description}
      </p>
    </article>
  );
}

interface VariationItemProps {
  text: string;
}

function VariationItem({ text }: VariationItemProps) {
  return (
    <li
      style={{
        padding: "var(--space-3) var(--space-4)",
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-sm)",
        color: "var(--color-text-muted)",
        lineHeight: "var(--leading-snug)",
        listStyle: "none",
      }}
    >
      {text}
    </li>
  );
}

const PILLARS = [
  "O software é construído para o negócio do cliente.",
  "O cliente visualiza a solução antes de investir.",
  "A construção começa com o time já montado.",
];

const VARIATIONS = [
  "Tem o time. Tem o investimento. Falta o produto pronto.",
  "Tem a tração. Tem o capital. Falta a plataforma que sustenta.",
  "Tem o sistema rodando. Tem o cliente. Falta quem mantenha isso de pé sem improviso.",
];

const AUDIENCES = [
  "Investidores",
  "Founders",
  "Empresas estabelecidas",
  "Venture builders",
];

export default function FundamentosPage() {
  return (
    <>
      <ChapterCover
        num="01"
        title="Fundamentos"
        lead="Essência, posicionamento, Big Idea e a analogia que explica o modelo de trabalho."
        topics={[
          "Essência da marca",
          "Big Idea",
          "As duas dimensões",
          "Posicionamento",
          "Analogia oficial",
        ]}
      />

      <Panel
        id="essencia"
        index="01 / 05"
        title="Essência da marca"
        band="light"
        lead="A Inovaxio não vende código. A Inovaxio é o time técnico que constrói e sustenta o software de quem está lançando um negócio novo ou operando um sistema que não pode falhar."
      >
      </Panel>

      <Panel
        id="big-idea"
        index="02 / 05"
        title="Big Idea"
        band="dark"
        lead="A ideia central que organiza toda a comunicação de marca. É o racional explicador, não uma linha de copy."
      >

        <div style={{ marginBottom: "var(--space-8)" }}>
          <CopyBlock
            text="Construímos o software que você quer lançar no mercado."
            label="Big Idea"
            variant="highlight"
          />
        </div>

        <div style={{ marginBottom: "var(--space-8)" }}>
          <p
            className="label"
            style={{
              color: "var(--color-text-faint)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
            }}
          >
            Trinca de reconhecimento
          </p>
          <div style={{ marginBottom: "var(--space-4)" }}>
            <CopyBlock
              text="Tem a ideia. Tem o capital. Falta só o software."
              variant="highlight"
            />
          </div>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
              margin: 0,
              padding: 0,
            }}
          >
            {VARIATIONS.map((v) => (
              <VariationItem key={v} text={v} />
            ))}
          </ul>
        </div>

        <div>
          <p
            className="label"
            style={{
              color: "var(--color-text-faint)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              marginBottom: "var(--space-3)",
            }}
          >
            Os três pilares
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {PILLARS.map((text, i) => (
              <PillarItem key={text} number={String(i + 1)} text={text} />
            ))}
          </div>
        </div>
      </Panel>

      <Panel
        id="dimensoes"
        index="03 / 05"
        title="As duas dimensões"
        band="light"
        lead="Lançar e sustentar. Todo cliente entra por uma das duas portas."
      >
        <div
          className="stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--space-4)",
          }}
        >
          <DimensionCard
            tag="Dimensão 01"
            title="Lançar"
            description="Transformar ideia, capital e visão de negócio em software lançado no mercado."
          />
          <DimensionCard
            tag="Dimensão 02"
            title="Sustentar o crítico"
            description="Construir e manter de pé sistemas que exigem estabilidade, integração e escala."
          />
        </div>
      </Panel>

      <Panel
        id="posicionamento"
        index="04 / 05"
        title="Posicionamento estratégico"
        band="dim"
        lead="Onde a Inovaxio se coloca no mercado, e contra o que ela não compete."
      >
        <div style={{ marginBottom: "var(--space-6)" }}>
          <CopyBlock
            text="Parceira técnica para construir e sustentar o software que o cliente quer lançar e operar no mercado."
            label="Declaração de posicionamento"
          />
        </div>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-faint)",
            lineHeight: "var(--leading-normal)",
            marginBottom: "var(--space-4)",
          }}
        >
          Atua como braço técnico de:
        </p>
        <ul
          className="stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--space-2)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {AUDIENCES.map((audience) => (
            <li
              key={audience}
              style={{
                padding: "var(--space-3) var(--space-4)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-display)",
                fontWeight: 500,
              }}
            >
              {audience}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        id="analogia"
        index="05 / 05"
        title="Analogia oficial"
        band="light"
        lead="A imagem que explica o modelo de trabalho sem jargão."
      >
        <blockquote
          style={{
            margin: 0,
            padding: "var(--space-8)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-5xl)",
              fontWeight: 700,
              lineHeight: 0.5,
              color: "var(--color-primary-text)",
              opacity: 0.5,
              marginBottom: "var(--space-4)",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text)",
              lineHeight: "var(--leading-normal)",
              fontStyle: "normal",
              fontFamily: "var(--font-body)",
              maxWidth: "60ch",
            }}
          >
            Comprar um sistema pronto é como comprar uma roupa em loja de
            departamento. Ela pode até servir, mas nunca foi feita para você.
            Agora imagine um alfaiate. Ele analisa suas medidas, seu estilo e sua
            necessidade, e cria algo feito exatamente para você. É assim que a
            Inovaxio constrói software.
          </p>
        </blockquote>
      </Panel>
      <ChapterNext current="fundamentos" />
    </>
  );
}
