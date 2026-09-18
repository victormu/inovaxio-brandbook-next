import { Panel } from "@/components/manual/Panel";
import { TokenChip } from "@/components/ui/TokenChip";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================
 * Dados
 * ========================================================== */

const PRIMARY_COLORS = [
  { name: "primary", hex: "#2E2EFE", cssVar: "--color-primary", label: "Primário" },
  { name: "accent", hex: "#3245FD", cssVar: "--color-accent", label: "Acento" },
  { name: "primary-bright", hex: "#9DA8FF", cssVar: "--color-primary-bright", label: "Azul claro" },
  { name: "navy", hex: "#080830", cssVar: "--color-navy", label: "Navy" },
  { name: "bg", hex: "#000000", cssVar: "--color-bg", label: "Fundo escuro" },
  { name: "cyan", hex: "#00C9D5", cssVar: "--c-cyan", label: "Ciano (só gradiente)" },
];

const STATUS_COLORS = [
  { name: "success", hex: "#26CC66", cssVar: "--color-success", label: "Sucesso" },
  { name: "warning", hex: "#E5B21A", cssVar: "--color-warning", label: "Atenção" },
  { name: "error", hex: "#E53333", cssVar: "--color-error", label: "Erro" },
];

// Índigo #6366FF e Roxo #CC66E5 saíram daqui: não existem em tokens.css
// nem em nenhuma folha de estilo do site. Eram cores que só existiam
// porque o manual as tinha desenhado, e a marca não tem segunda cor.
const FAMILIES: { label: string; base: string }[] = [
  { label: "Azul · primário", base: "#2E2EFE" },
  { label: "Acento", base: "#3245FD" },
  { label: "Ciano · só gradiente", base: "#00C9D5" },
  { label: "Sucesso", base: "#198044" },
  { label: "Atenção", base: "#916308" },
  { label: "Erro", base: "#AF1D1D" },
];

const USAGE_PROPORTION = [
  { label: "Branco (fundo)", value: 68, bg: "#FFFFFF" },
  { label: "Superfície", value: 20, bg: "#F4F4F7" },
  { label: "Escuro (pontuação)", value: 8, bg: "#000000" },
  { label: "Acento", value: 4, gradient: true },
];

const COLOR_SPEC = [
  { name: "Primário", hex: "#2E2EFE", rgb: "46, 46, 254", cmyk: "82, 82, 0, 0", pantone: "2736 C" },
  { name: "Ciano", hex: "#00C9D5", rgb: "0, 201, 213", cmyk: "100, 6, 0, 16", pantone: "3115 C" },
  { name: "Acento", hex: "#3245FD", rgb: "50, 69, 253", cmyk: "80, 73, 0, 0", pantone: "2736 C" },
  { name: "Preto", hex: "#000000", rgb: "0, 0, 0", cmyk: "0, 0, 0, 100", pantone: "Black 6 C" },
  { name: "Branco", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0", pantone: "Papel" },
];

const GRADIENTS = [
  { label: "Marca (135°)", token: "--gradient-brand-h (variação)", css: "linear-gradient(135deg, #2E2EFE 0%, #00C9D5 100%)" },
  { label: "Horizontal (90°)", token: "--gradient-brand-h", css: "linear-gradient(90deg, #2E2EFE 0%, #00C9D5 100%)" },
];

/* ============================================================
 * Cor: utilidades puras (sem estado, server-safe)
 * ========================================================== */

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

/** Mistura hex com um alvo (branco/preto) por uma fração 0..1. */
function mix(hex: string, target: Rgb, amount: number): string {
  const c = hexToRgb(hex);
  return rgbToHex({
    r: c.r + (target.r - c.r) * amount,
    g: c.g + (target.g - c.g) * amount,
    b: c.b + (target.b - c.b) * amount,
  });
}

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const BLACK: Rgb = { r: 0, g: 0, b: 0 };

/** Rampa de 9 passos (10..90): 4 tints, base (50), 4 shades. */
function ramp(base: string): { weight: number; hex: string }[] {
  const tints = [0.8, 0.6, 0.4, 0.2].map((a, i) => ({ weight: (i + 1) * 10, hex: mix(base, WHITE, a) }));
  const mid = { weight: 50, hex: base.toUpperCase() };
  const shades = [0.15, 0.32, 0.5, 0.68].map((a, i) => ({ weight: 60 + i * 10, hex: mix(base, BLACK, a) }));
  return [...tints, mid, ...shades];
}

const NEUTRAL_RAMP = [
  { weight: "0", hex: "#FFFFFF" },
  { weight: "50", hex: "#F4F5F7" },
  { weight: "100", hex: "#E5E7EB" },
  { weight: "200", hex: "#C7CBD1" },
  { weight: "400", hex: "#7E828C" },
  { weight: "600", hex: "#4B4E56" },
  { weight: "800", hex: "#26282D" },
  // 900 e 950 são as superfícies reais da banda escura (--color-surface-2
  // e --color-surface). O #1C1819 que estava aqui era quente e vinha da
  // paleta antiga, destoando do resto da rampa.
  { weight: "900", hex: "#17171D" },
  { weight: "950", hex: "#101014" },
  { weight: "1000", hex: "#000000" },
];

function relLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** Tinta legível (#000/#fff) sobre um fundo. */
function ink(hex: string): string {
  return contrast("#FFFFFF", hex) >= contrast("#000000", hex) ? "#FFFFFF" : "#000000";
}

/* ============================================================
 * Blocos reutilizáveis
 * ========================================================== */

function Block({
  title,
  lead,
  children,
  first = false,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <Reveal
      as="section"
      style={{
        borderTop: first ? "none" : "1px solid var(--color-border)",
        paddingTop: first ? 0 : "var(--space-12)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "var(--text-2xl)",
          color: "var(--color-text)",
          letterSpacing: "var(--tracking-tight)",
          marginBottom: lead ? "var(--space-3)" : "var(--space-6)",
        }}
      >
        {title}
      </h3>
      {lead ? (
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "62ch",
            marginBottom: "var(--space-6)",
          }}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}

function RampRow({ label, swatches }: { label: string; swatches: { weight: number | string; hex: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "112px 1fr", gap: "var(--space-4)", alignItems: "center" }}>
      <span
        style={{
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text)",
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${swatches.length}, 1fr)`,
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
        }}
      >
        {swatches.map((s) => (
          <div
            key={String(s.weight)}
            title={s.hex}
            style={{
              background: s.hex,
              height: 44,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 4,
            }}
          >
            <span style={{ fontSize: 10, fontFamily: "monospace", color: ink(s.hex), opacity: 0.85 }}>
              {s.weight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContrastCard({ fg, bg, fgLabel, bgLabel }: { fg: string; bg: string; fgLabel: string; bgLabel: string }) {
  const ratio = contrast(fg, bg);
  const pass = ratio >= 4.5;
  const statusColor = pass ? "var(--color-success)" : "var(--color-error)";
  return (
    <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
      <div style={{ background: bg, padding: "var(--space-6)", minHeight: 108 }}>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: 22,
            height: 22,
            borderRadius: "var(--radius-full)",
            background: statusColor,
            color: bg,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: "var(--space-3)",
          }}
        >
          {pass ? "✓" : "✕"}
        </span>
        <p style={{ color: fg, fontSize: "var(--text-lg)", fontWeight: 600, lineHeight: "var(--leading-snug)" }}>
          Texto {pass ? "acessível" : "não acessível"}.
        </p>
      </div>
      <div
        style={{
          background: "var(--color-surface)",
          padding: "var(--space-3) var(--space-4)",
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          fontSize: "var(--text-xs)",
        }}
      >
        <span style={{ color: "var(--color-text-muted)" }}>
          {fgLabel} sobre {bgLabel}
        </span>
        <span style={{ color: statusColor, fontFamily: "monospace", fontWeight: 600 }}>
          {ratio.toFixed(2)}:1
        </span>
      </div>
    </div>
  );
}

function BadCombo({ a, b, caption }: { a: string; b: string; caption: string }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          position: "relative",
        }}
      >
        <div style={{ background: a, flex: 1, height: 96 }} />
        <div style={{ background: b, flex: 1, height: 96 }} />
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "var(--space-2)",
            left: "var(--space-2)",
            width: 22,
            height: 22,
            borderRadius: "var(--radius-full)",
            background: "var(--color-error)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ✕
        </span>
      </div>
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-2)" }}>
        {caption}
      </p>
    </div>
  );
}

function BackgroundSample({ bg, ink: inkColor, caption }: { bg: string; ink: string; caption: string }) {
  return (
    <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
      <div
        style={{
          background: bg,
          padding: "var(--space-8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", color: inkColor }}>
          Aa
        </span>
      </div>
      <p
        style={{
          padding: "var(--space-3) var(--space-4)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          background: "var(--color-surface)",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

const cellStyle = {
  padding: "var(--space-3) var(--space-4)",
  borderBottom: "1px solid var(--color-border)",
} as const;

const monoCell = {
  ...cellStyle,
  color: "var(--color-text-muted)",
  fontFamily: "monospace",
} as const;

/* ============================================================
 * Seção
 * ========================================================== */

export function ColorSection() {
  return (
    <Panel
      id="cor"
      index="02 / 06"
      title="Cor"
      band="light"
      lead="A paleta expressa energia e movimento. O azul é o acento, o branco é a base e o escuro é pontuação. O ciano existe só dentro do gradiente da marca. Clique nos tokens para copiar: os valores CSS são a fonte única de verdade."
    >

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
        {/* 1 · Azul no núcleo */}
        <Block
          first
          title="Azul no núcleo"
          lead="O azul primário carrega a marca: conduz ações e presença. O ciano não é cor principal, ele existe apenas dentro do gradiente da marca, nunca como acento sozinho."
        >
          <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            {[
              { hex: "#2E2EFE", name: "Azul primário", token: "--color-primary" },
              { hex: "#00C9D5", name: "Ciano (só gradiente)", token: "--c-cyan" },
            ].map((c) => (
              <div key={c.hex} className="hover-card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <div style={{ background: c.hex, height: 200, display: "flex", alignItems: "flex-end", padding: "var(--space-5)" }}>
                  <span style={{ color: ink(c.hex), fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)" }}>
                    {c.name}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)", background: "var(--color-surface)", fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--color-text-muted)", fontFamily: "monospace" }}>{c.hex}</span>
                  <span style={{ color: "var(--color-text-faint)", fontFamily: "monospace" }}>{c.token}</span>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* 2 · Tokens copiáveis */}
        <Block title="Tokens" lead="Os valores que você usa no dia a dia. Clique para copiar o token CSS.">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div>
              <h4 className="label" style={{ marginBottom: "var(--space-3)" }}>Base e marca</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                {PRIMARY_COLORS.map((c) => (
                  <TokenChip key={c.name} name={c.name} hex={c.hex} cssVar={c.cssVar} label={c.label} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="label" style={{ marginBottom: "var(--space-3)" }}>Status</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                {STATUS_COLORS.map((c) => (
                  <TokenChip key={c.name} name={c.name} hex={c.hex} cssVar={c.cssVar} label={c.label} />
                ))}
              </div>
            </div>
          </div>
        </Block>

        {/* 3 · Famílias de cor / paleta */}
        <Block
          title="A paleta"
          lead="Cada cor da marca se abre em uma rampa de tons claros a escuros (10 a 90). Use os tons médios em interface e os extremos para estados, fundos e realces."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {FAMILIES.map((f) => (
              <RampRow key={f.label} label={f.label} swatches={ramp(f.base)} />
            ))}
          </div>
        </Block>

        {/* 4 · Neutros */}
        <Block title="Neutros" lead="A escala de cinzas estrutura fundos, superfícies e texto. O preto puro é o piso; os cinzas dão profundidade sem competir com o azul.">
          <RampRow label="Neutro" swatches={NEUTRAL_RAMP} />
        </Block>

        {/* 5 · Proporção de uso */}
        <Block title="Proporção de uso" lead="O branco domina. O escuro entra como pontuação (capa, abertura de capítulo, um respiro por capítulo) e o acento azul aparece em pontos e detalhes, nunca como fundo de peça inteira.">
          <div style={{ display: "flex", height: 44, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            {USAGE_PROPORTION.map((seg) => (
              <div key={seg.label} style={{ width: `${seg.value}%`, background: seg.gradient ? "var(--gradient-brand-h)" : seg.bg }} />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-5)", marginTop: "var(--space-3)" }}>
            {USAGE_PROPORTION.map((seg) => (
              <span key={seg.label} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: seg.gradient ? "var(--gradient-brand-h)" : seg.bg, border: "1px solid var(--color-border)" }} />
                <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{seg.value}%</span> {seg.label}
              </span>
            ))}
          </div>
        </Block>

        {/* 6 · Especificações */}
        <Block title="Especificações" lead="Valores para tela (HEX, RGB) e impressão (CMYK, Pantone). O Pantone é referência: confirme em prova antes de uma tiragem grande.">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr>
                  {["Cor", "HEX", "RGB", "CMYK", "Pantone"].map((h) => (
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
                {COLOR_SPEC.map((c) => (
                  <tr key={c.name}>
                    <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-text)" }}>
                        <span style={{ width: 14, height: 14, borderRadius: 3, background: c.hex, border: "1px solid var(--color-border)" }} />
                        {c.name}
                      </span>
                    </td>
                    <td style={monoCell}>{c.hex}</td>
                    <td style={{ ...monoCell, whiteSpace: "nowrap" }}>{c.rgb}</td>
                    <td style={{ ...monoCell, whiteSpace: "nowrap" }}>{c.cmyk}</td>
                    <td style={{ ...cellStyle, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{c.pantone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", lineHeight: "var(--leading-relaxed)", marginTop: "var(--space-4)", maxWidth: "62ch" }}>
            Preto em texto: K100. Preto em grandes áreas impressas: rich black C70 M50 Y30 K100 (preto frio, coerente com a marca).
          </p>
        </Block>

        {/* 7 · Gradientes */}
        <Block title="Gradientes" lead="Do azul primário ao ciano. Use em faixas, realces e fundos de destaque, nunca atrás de blocos longos de texto.">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {GRADIENTS.map((g) => (
              <div key={g.token} className="hover-card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <div style={{ background: g.css, height: 80 }} />
                <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)", background: "var(--color-surface)", fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{g.label}</span>
                  <span style={{ color: "var(--color-text-faint)", fontFamily: "monospace" }}>{g.token}</span>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* 8 · Combinações a evitar */}
        <Block title="Combinações a evitar" lead="Azuis vizinhos e cores de status próximas brigam entre si. Separe com neutro ou preto no meio.">
          <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
            <BadCombo a="#2E2EFE" b="#3245FD" caption="Primário e acento: quase idênticos, sem hierarquia." />
            <BadCombo a="#2E2EFE" b="#3245FD" caption="Primário e acento lado a lado: quase iguais, vibram e cansam a vista." />
            <BadCombo a="#26CC66" b="#00C9D5" caption="Sucesso e ciano: confundem o significado." />
          </div>
        </Block>

        {/* 9 · Acessibilidade */}
        <Block
          title="Acessibilidade"
          lead="Todo texto precisa passar em contraste (mínimo 4.5:1 para corpo). Os cinco primeiros pares abaixo são os que o sistema realmente produz. O último é o contra-exemplo: o azul primário não serve como texto sobre escuro, e é por isso que as bandas escuras trocam para o azul claro. Nunca dependa só da cor para transmitir significado."
        >
          <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
            <ContrastCard fg="#0A0A0C" bg="#FFFFFF" fgLabel="Texto" bgLabel="Branco" />
            <ContrastCard fg="#51535C" bg="#F4F4F7" fgLabel="Texto suave" bgLabel="Superfície" />
            <ContrastCard fg="#2E2EFE" bg="#FFFFFF" fgLabel="Primário" bgLabel="Branco" />
            <ContrastCard fg="#FFFFFF" bg="#000000" fgLabel="Branco" bgLabel="Preto" />
            <ContrastCard fg="#9DA8FF" bg="#080830" fgLabel="Azul claro" bgLabel="Navy" />
            <ContrastCard fg="#2E2EFE" bg="#000000" fgLabel="Primário" bgLabel="Preto" />
          </div>
        </Block>

        {/* 10 · Cor em uso */}
        <Block title="Cor em uso" lead="Fundo claro é o padrão do manual. O fundo escuro é deliberado: capa, abertura de capítulo e um respiro por capítulo. Nunca por acaso.">
          <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <BackgroundSample bg="#ffffff" ink="#000000" caption="Padrão. Logo e texto em preto ou azul." />
            <BackgroundSample bg="#000000" ink="#ffffff" caption="Pontuação. Logo e texto em branco." />
          </div>
        </Block>
      </div>
    </Panel>
  );
}
