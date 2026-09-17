import { Panel } from "@/components/manual/Panel";

const FORMATS = [
  { name: "Documento A4", size: "210 x 297 mm", margin: "20 mm", cols: "12 colunas" },
  { name: "Post quadrado", size: "1080 x 1080 px", margin: "64 px", cols: "6 colunas" },
  { name: "Story vertical", size: "1080 x 1920 px", margin: "80 px", cols: "4 colunas" },
  { name: "Slide 16:9", size: "1920 x 1080 px", margin: "80 px", cols: "12 colunas" },
];

const GRID_RULES = [
  { ok: true, text: "Alinhe títulos, texto e imagens às colunas." },
  { ok: true, text: "Margem generosa. A peça respira nas bordas." },
  { ok: false, text: "Não encoste texto ou logo na borda da peça." },
  { ok: false, text: "Não centralize tudo por reflexo. Use o grid." },
];

const cell = {
  padding: "var(--space-3) var(--space-4)",
  borderBottom: "1px solid var(--color-border)",
} as const;

function ColumnDiagram() {
  return (
    <div
      aria-hidden="true"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        background: "var(--color-surface)",
        padding: "var(--space-6)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "var(--space-2)",
          height: 120,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "hsl(var(--c-primary) / 0.12)",
              border: "1px solid hsl(var(--c-primary) / 0.25)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "var(--space-3)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-faint)",
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>Margem</span>
        <span>12 colunas, medianiz constante</span>
        <span>Margem</span>
      </div>
    </div>
  );
}

export function GridSection() {
  return (
    <Panel
      id="grid"
      index="05 / 06"
      title="Grid e layout"
      band="navy"
      lead="Um grid organiza qualquer peça da marca: documento, post, apresentação. Margem generosa, alinhamento às colunas e ritmo constante no espaçamento."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Grid de colunas
          </p>
          <ColumnDiagram />
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              marginTop: "var(--space-3)",
              maxWidth: "62ch",
            }}
          >
            A base é um grid de 12 colunas com medianiz constante. Peças menores
            agrupam colunas (6, 4 ou 3) mantendo o mesmo alinhamento. Todo texto,
            imagem e logo se apoia nas colunas, nunca solto no espaço.
          </p>
        </div>

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Formatos e margens
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
                  {["Formato", "Dimensão", "Margem", "Colunas"].map((h) => (
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
                {FORMATS.map((f) => (
                  <tr key={f.name}>
                    <td
                      style={{
                        ...cell,
                        color: "var(--color-text)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.name}
                    </td>
                    <td
                      style={{
                        ...cell,
                        color: "var(--color-text-muted)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.size}
                    </td>
                    <td
                      style={{
                        ...cell,
                        color: "var(--color-text-muted)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.margin}
                    </td>
                    <td style={{ ...cell, color: "var(--color-text-muted)" }}>
                      {f.cols}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Ritmo de espaçamento
          </p>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "62ch",
            }}
          >
            Todo espaçamento é múltiplo de 8: 8, 16, 24, 32, 48, 64. Isso mantém
            o ritmo vertical consistente entre um documento, um slide e um post.
          </p>
        </div>

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Regras
          </p>
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
            {GRID_RULES.map((rule) => (
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
                    color: rule.ok ? "hsl(140 50% 60%)" : "hsl(0 60% 66%)",
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
      </div>
    </Panel>
  );
}
