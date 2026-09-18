import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";

interface TypeLevel {
  role: string;
  sample: string;
  fontFamily: string;
  fontWeight: number;
  previewSize: string;
  previewTracking: string;
  previewLeading: number;
  uppercase?: boolean;
  spec: string;
}

const TYPE_HIERARCHY: TypeLevel[] = [
  {
    role: "Display",
    sample: "Construímos",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    previewSize: "var(--text-5xl)",
    previewTracking: "-0.02em",
    previewLeading: 1,
    spec: "Quicksand Bold, 48 a 72 pt, tracking -2%, entrelinha 100%",
  },
  {
    role: "Título",
    sample: "Sistema visual",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    previewSize: "var(--text-3xl)",
    previewTracking: "-0.01em",
    previewLeading: 1.1,
    spec: "Quicksand SemiBold, 24 a 36 pt, tracking -1%, entrelinha 110%",
  },
  {
    role: "Subtítulo",
    sample: "Aplicações da marca",
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    previewSize: "var(--text-xl)",
    previewTracking: "0",
    previewLeading: 1.2,
    spec: "Quicksand Medium, 18 a 24 pt, tracking 0, entrelinha 120%",
  },
  {
    role: "Corpo",
    sample:
      "A marca aparece em cada ponto de contato, on e off. Cada peça respeita o mesmo respiro e a mesma hierarquia.",
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    previewSize: "var(--text-base)",
    previewTracking: "0",
    previewLeading: 1.5,
    spec: "Inter Regular, 10 a 12 pt, tracking 0, entrelinha 150%",
  },
  {
    role: "Legenda",
    sample: "ATRIBUTO: PRÁTICO",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    previewSize: "var(--text-xs)",
    previewTracking: "0.08em",
    previewLeading: 1.3,
    uppercase: true,
    spec: "Inter Medium caixa alta, 8 a 9 pt, tracking +8%, entrelinha 130%",
  },
];

// Escada de pesos com texto de exemplo por linha (o "specimen" de peso).
interface WeightStep {
  name: string;
  weight: number;
}
const QUICKSAND_WEIGHTS: WeightStep[] = [
  { name: "Light", weight: 300 },
  { name: "Regular", weight: 400 },
  { name: "Medium", weight: 500 },
  { name: "SemiBold", weight: 600 },
  { name: "Bold", weight: 700 },
];
const INTER_WEIGHTS: WeightStep[] = [
  { name: "Regular", weight: 400 },
  { name: "Medium", weight: 500 },
  { name: "SemiBold", weight: 600 },
  { name: "Bold", weight: 700 },
];

const TYPE_FALLBACKS = [
  {
    brand: "Quicksand",
    fallback: "Verdana, sans-serif",
    use: "Títulos em Office, e-mail e sistema",
  },
  {
    brand: "Inter",
    fallback: "Arial, Helvetica, sans-serif",
    use: "Corpo e UI em Office, e-mail e sistema",
  },
];

const TYPE_RULES = [
  { ok: true, text: "Use só Quicksand e Inter. Nada de terceira fonte." },
  { ok: true, text: "Entrelinha generosa no corpo (150%). Texto respira." },
  { ok: false, text: "Não condense, expanda ou incline as fontes." },
  { ok: false, text: "Não use Quicksand em blocos longos de texto corrido." },
];

const fallbackCell = {
  padding: "var(--space-3) var(--space-4)",
  borderBottom: "1px solid var(--color-border)",
} as const;

const labelStyle = {
  fontFamily: "var(--font-body)",
  marginBottom: "var(--space-4)",
} as const;

/* ── Specimen "Aa": o cartão-âncora de cada família ── */
function SpecimenCard({
  family,
  fontFamily,
  descriptor,
  glyphWeight,
}: {
  family: string;
  fontFamily: string;
  descriptor: string;
  glyphWeight: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 320,
        padding: "var(--space-6)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--text-lg)",
            color: "var(--color-text)",
          }}
        >
          {family}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-faint)",
          }}
        >
          {descriptor}
        </span>
      </div>

      <span
        aria-hidden="true"
        style={{
          fontFamily,
          fontWeight: glyphWeight,
          fontSize: "clamp(7rem, 4rem + 14vw, 13rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: "var(--color-text)",
          margin: "var(--space-4) 0",
        }}
      >
        Aa
      </span>

      <span
        style={{
          fontFamily,
          fontSize: "var(--text-base)",
          letterSpacing: "0.02em",
          color: "var(--color-text-muted)",
          zIndex: 1,
        }}
      >
        ABCDEFGHIJKLM abcdefghijklm 0123456789
      </span>
    </div>
  );
}

/* ── Escada de pesos com texto de exemplo por linha ── */
function WeightLadder({
  family,
  fontFamily,
  steps,
  phrase,
}: {
  family: string;
  fontFamily: string;
  steps: WeightStep[];
  phrase: string;
}) {
  return (
    <div>
      <p className="label" style={labelStyle}>
        Pesos {family}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.name}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "var(--space-4)",
              padding: "var(--space-4) var(--space-6)",
              borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontFamily,
                fontWeight: step.weight,
                fontSize: "clamp(1.25rem, 0.9rem + 1.6vw, 1.875rem)",
                letterSpacing: "-0.01em",
                color: "var(--color-text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {phrase}
            </span>
            <span
              style={{
                flexShrink: 0,
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-faint)",
              }}
            >
              {step.name} · {step.weight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HierarchyRow({ level, isFirst }: { level: TypeLevel; isFirst: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        paddingTop: isFirst ? 0 : "var(--space-8)",
        borderTop: isFirst ? "none" : "1px solid var(--color-border)",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-faint)",
        }}
      >
        {level.role}
      </span>
      <p
        style={{
          fontFamily: level.fontFamily,
          fontWeight: level.fontWeight,
          fontSize: level.previewSize,
          letterSpacing: level.previewTracking,
          lineHeight: level.previewLeading,
          textTransform: level.uppercase ? "uppercase" : "none",
          color: "var(--color-text)",
          margin: 0,
          maxWidth: "40ch",
        }}
      >
        {level.sample}
      </p>
      <span
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {level.spec}
      </span>
    </div>
  );
}

export function TypographySection() {
  return (
    <Panel
      id="tipografia"
      index="03 / 06"
      title="Tipografia"
      band="dim"
      lead="Duas famílias. Quicksand carrega os títulos e o display. Inter carrega o texto e a legenda. Os tamanhos em pt são referência e escalam com a peça: um pôster parte da base maior, um cartão da menor."
    >
      <Topic wide
        title="As duas famílias"
        lead="Quicksand carrega título e display. Inter carrega leitura e legenda. A fronteira entre as duas não se move."
      >
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "var(--space-4)",
            }}
          >
            <SpecimenCard
              family="Quicksand"
              fontFamily="var(--font-display)"
              descriptor="Display geométrica"
              glyphWeight={600}
            />
            <SpecimenCard
              family="Inter"
              fontFamily="var(--font-body)"
              descriptor="Grotesca de leitura"
              glyphWeight={400}
            />
          </div>
        </div>
      </Topic>

      <Topic wide
        title="Pesos"
        lead="Cinco pesos em Quicksand, quatro em Inter. Use 600 e 700 no display, 400 e 500 no corpo."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "var(--space-6)",
          }}
        >
          <WeightLadder
            family="Quicksand"
            fontFamily="var(--font-display)"
            steps={QUICKSAND_WEIGHTS}
            phrase="Construímos"
          />
          <WeightLadder
            family="Inter"
            fontFamily="var(--font-body)"
            steps={INTER_WEIGHTS}
            phrase="Tem a ideia"
          />
        </div>
      </Topic>

      <Topic wide
        title="Hierarquia"
        lead="Cada degrau tem um papel. Pular um degrau achata a leitura; usar dois seguidos com o mesmo peso confunde."
      >
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            {TYPE_HIERARCHY.map((level, i) => (
              <HierarchyRow key={level.role} level={level} isFirst={i === 0} />
            ))}
          </div>
        </div>
      </Topic>

      <Topic
        title="Pareamento"
        lead="As combinações que funcionam, e o tamanho relativo entre título e corpo em cada uma."
      >
        <div>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "62ch",
            }}
          >
            O contraste é de função, não de estilo: uma display geométrica
            (Quicksand) contra uma grotesca neutra (Inter). Título em Quicksand,
            corpo em Inter. Nunca o contrário, nunca as duas no mesmo papel.
          </p>
        </div>
      </Topic>

      <Topic
        title="Regras"
        lead="O que decide legibilidade antes de qualquer escolha estética."
      >
        <div>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {TYPE_RULES.map((rule) => (
              <li
                key={rule.text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-3)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-muted)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    color: rule.ok ? "var(--color-success)" : "var(--color-error)",
                    fontWeight: 700,
                  }}
                >
                  {rule.ok ? "✓" : "✕"}
                </span>
                {rule.text}
              </li>
            ))}
          </ul>
        </div>
      </Topic>

      <Topic wide
        title="Fontes de fallback"
        lead="Quando Quicksand ou Inter não carregam, a peça precisa continuar de pé."
      >
        <div>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              marginBottom: "var(--space-4)",
              maxWidth: "60ch",
            }}
          >
            Quando Quicksand e Inter não estão disponíveis (Office, e-mail,
            assinatura ou sistema), use os substitutos abaixo.
          </p>
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
                  {["Fonte da marca", "Substituto", "Onde usar"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3) var(--space-4)",
                        background: "var(--color-surface-2)",
                        color: "var(--color-text)",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--color-border)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYPE_FALLBACKS.map((f) => (
                  <tr key={f.brand}>
                    <td
                      style={{
                        ...fallbackCell,
                        color: "var(--color-text)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.brand}
                    </td>
                    <td
                      style={{
                        ...fallbackCell,
                        color: "var(--color-text-muted)",
                        fontFamily: "monospace",
                      }}
                    >
                      {f.fallback}
                    </td>
                    <td style={{ ...fallbackCell, color: "var(--color-text-muted)" }}>
                      {f.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Topic>
    </Panel>
  );
}
