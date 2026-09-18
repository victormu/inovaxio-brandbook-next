import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";

/* ============================================================
 * Ícones de exemplo (base: Material Symbols, estilo Rounded)
 * viewBox recortado por ícone p/ encaixar 24×24 centralizado.
 * ========================================================== */

type IconSpec = { name: string; viewBox: string; d: string };

const ICONS: IconSpec[] = [
  {
    name: "Pessoas",
    viewBox: "0 -3 24 24",
    d: "M12.5 8.95C12.9833 8.41667 13.3542 7.80833 13.6125 7.125C13.8708 6.44167 14 5.73333 14 5C14 4.26667 13.8708 3.55833 13.6125 2.875C13.3542 2.19167 12.9833 1.58333 12.5 1.05C13.5 1.18333 14.3333 1.625 15 2.375C15.6667 3.125 16 4 16 5C16 6 15.6667 6.875 15 7.625C14.3333 8.375 13.5 8.81667 12.5 8.95ZM18 17V14C18 13.4 17.8667 12.8292 17.6 12.2875C17.3333 11.7458 16.9833 11.2667 16.55 10.85C17.4 11.15 18.1875 11.5375 18.9125 12.0125C19.6375 12.4875 20 13.15 20 14V17H18ZM20 10V8H18V6H20V4H22V6H24V8H22V10H20ZM8 9C6.9 9 5.95833 8.60833 5.175 7.825C4.39167 7.04167 4 6.1 4 5C4 3.9 4.39167 2.95833 5.175 2.175C5.95833 1.39167 6.9 1 8 1C9.1 1 10.0417 1.39167 10.825 2.175C11.6083 2.95833 12 3.9 12 5C12 6.1 11.6083 7.04167 10.825 7.825C10.0417 8.60833 9.1 9 8 9ZM0 17V14.2C0 13.6333 0.145833 13.1125 0.4375 12.6375C0.729167 12.1625 1.11667 11.8 1.6 11.55C2.63333 11.0333 3.68333 10.6458 4.75 10.3875C5.81667 10.1292 6.9 10 8 10C9.1 10 10.1833 10.1292 11.25 10.3875C12.3167 10.6458 13.3667 11.0333 14.4 11.55C14.8833 11.8 15.2708 12.1625 15.5625 12.6375C15.8542 13.1125 16 13.6333 16 14.2V17H0ZM8 7C8.55 7 9.02083 6.80417 9.4125 6.4125C9.80417 6.02083 10 5.55 10 5C10 4.45 9.80417 3.97917 9.4125 3.5875C9.02083 3.19583 8.55 3 8 3C7.45 3 6.97917 3.19583 6.5875 3.5875C6.19583 3.97917 6 4.45 6 5C6 5.55 6.19583 6.02083 6.5875 6.4125C6.97917 6.80417 7.45 7 8 7ZM2 15H14V14.2C14 14.0167 13.9542 13.85 13.8625 13.7C13.7708 13.55 13.65 13.4333 13.5 13.35C12.6 12.9 11.6917 12.5625 10.775 12.3375C9.85833 12.1125 8.93333 12 8 12C7.06667 12 6.14167 12.1125 5.225 12.3375C4.30833 12.5625 3.4 12.9 2.5 13.35C2.35 13.4333 2.22917 13.55 2.1375 13.7C2.04583 13.85 2 14.0167 2 14.2V15Z",
  },
  {
    name: "Código",
    viewBox: "49 -3 24 24",
    d: "M58.6 12.6L60 11.175L57.825 9L60 6.825L58.6 5.4L55 9L58.6 12.6ZM63.4 12.6L67 9L63.4 5.4L62 6.825L64.175 9L62 11.175L63.4 12.6ZM54 18C53.45 18 52.9792 17.8042 52.5875 17.4125C52.1958 17.0208 52 16.55 52 16V2C52 1.45 52.1958 0.979167 52.5875 0.5875C52.9792 0.195833 53.45 0 54 0H68C68.55 0 69.0208 0.195833 69.4125 0.5875C69.8042 0.979167 70 1.45 70 2V16C70 16.55 69.8042 17.0208 69.4125 17.4125C69.0208 17.8042 68.55 18 68 18H54ZM54 16H68V2H54V16ZM54 2V16V2Z",
  },
  {
    name: "Visão",
    viewBox: "97 -3.5 24 24",
    d: "M109 13C110.25 13 111.312 12.5625 112.188 11.6875C113.062 10.8125 113.5 9.75 113.5 8.5C113.5 7.25 113.062 6.1875 112.188 5.3125C111.312 4.4375 110.25 4 109 4C107.75 4 106.688 4.4375 105.812 5.3125C104.938 6.1875 104.5 7.25 104.5 8.5C104.5 9.75 104.938 10.8125 105.812 11.6875C106.688 12.5625 107.75 13 109 13ZM109 11.2C108.25 11.2 107.612 10.9375 107.087 10.4125C106.562 9.8875 106.3 9.25 106.3 8.5C106.3 7.75 106.562 7.1125 107.087 6.5875C107.612 6.0625 108.25 5.8 109 5.8C109.75 5.8 110.388 6.0625 110.913 6.5875C111.438 7.1125 111.7 7.75 111.7 8.5C111.7 9.25 111.438 9.8875 110.913 10.4125C110.388 10.9375 109.75 11.2 109 11.2ZM109 16C106.567 16 104.35 15.3208 102.35 13.9625C100.35 12.6042 98.9 10.7833 98 8.5C98.9 6.21667 100.35 4.39583 102.35 3.0375C104.35 1.67917 106.567 1 109 1C111.433 1 113.65 1.67917 115.65 3.0375C117.65 4.39583 119.1 6.21667 120 8.5C119.1 10.7833 117.65 12.6042 115.65 13.9625C113.65 15.3208 111.433 16 109 16ZM109 14C110.883 14 112.613 13.5042 114.188 12.5125C115.763 11.5208 116.967 10.1833 117.8 8.5C116.967 6.81667 115.763 5.47917 114.188 4.4875C112.613 3.49583 110.883 3 109 3C107.117 3 105.387 3.49583 103.812 4.4875C102.238 5.47917 101.033 6.81667 100.2 8.5C101.033 10.1833 102.238 11.5208 103.812 12.5125C105.387 13.5042 107.117 14 109 14Z",
  },
];

const SPECS: [string, string][] = [
  ["Construção", "Somente contorno (stroke), sem preenchimento sólido em nenhum elemento."],
  ["Grid base", "24×24px, com padding interno de 2px (área útil 20×20px)."],
  ["Espessura do traço", "1.5px uniforme em todo o ícone, sem variação de peso."],
  ["Line cap", "Round (terminações de linha arredondadas)."],
  ["Line join", "Round (junções de linha arredondadas)."],
  ["Cantos externos", "Raio de 1.5 a 2px. Arredondamento sutil, nunca vivos nem totalmente circulares."],
  ["Cor", "Azul elétrico da paleta Inovaxio, aplicado como stroke (não fill)."],
  ["Contra-formas internas", "Mantêm o mesmo raio de arredondamento do contorno externo."],
];

const RULES: string[] = [
  "Formas primárias com geometria simples: círculo, retângulo arredondado, chevron, curva contínua.",
  "Elementos secundários (como o + no ícone de pessoa) no canto superior direito, sempre menores que o principal.",
  "Espaço em branco generoso dentro do ícone, sem acúmulo de detalhes.",
  "Sem sombras, gradientes, degradês ou efeitos de profundidade.",
  "Sem detalhes decorativos (pontinhos, linhas de apoio, texturas).",
];

const CHECKLIST: string[] = [
  "Está inteiramente vazado, sem áreas preenchidas?",
  "Todos os traços têm a mesma espessura?",
  "As pontas das linhas estão arredondadas?",
  "Os cantos externos têm arredondamento sutil (não retos nem circulares)?",
  "Encaixa em grid 24×24 com respiro nas bordas?",
  "Consegue ser lido em 16px sem perder legibilidade?",
];

function Icon({ icon, size = 40 }: { icon: IconSpec; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="currentColor"
      role="img"
      aria-label={`Ícone ${icon.name}`}
      style={{ display: "block" }}
    >
      <path d={icon.d} />
    </svg>
  );
}


export function IconsSection() {
  return (
    <Panel
      id="icones"
      index="06 / 06"
      title="Ícones"
      band="dim"
      lead="Estilo: outline geométrico com terminais suavizados. Base Material Symbols (Rounded), ajustada ao padrão Inovaxio: traço uniforme, cantos sutis e o azul da marca."
    >

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
        {/* Amostra */}
        <Topic wide title="Amostra" lead="Ícones em 24×24, traço no azul da marca, com respiro nas bordas.">
          <div
            className="stack-mobile"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}
          >
            {ICONS.map((icon) => (
              <div
                key={icon.name}
                className="hover-card"
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <div
                  style={{
                    minHeight: 132,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-primary-text)",
                  }}
                >
                  <Icon icon={icon} size={48} />
                </div>
                <div
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    borderTop: "1px solid var(--color-border)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text)",
                    fontWeight: 600,
                  }}
                >
                  {icon.name}
                </div>
              </div>
            ))}
          </div>

          {/* Teste de legibilidade em 16px */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              marginTop: "var(--space-4)",
              padding: "var(--space-4) var(--space-5)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              flexWrap: "wrap",
            }}
          >
            <span className="label" style={{ fontFamily: "var(--font-body)" }}>
              Em 16px
            </span>
            <div style={{ display: "flex", gap: "var(--space-4)", color: "var(--color-primary-text)" }}>
              {ICONS.map((icon) => (
                <Icon key={icon.name} icon={icon} size={16} />
              ))}
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
              Precisa se manter legível neste tamanho.
            </span>
          </div>
        </Topic>

        {/* Especificações técnicas */}
        <Topic wide title="Especificações técnicas">
          <dl style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-3)", margin: 0 }}>
            {SPECS.map(([term, value]) => (
              <div
                key={term}
                className="stack-mobile"
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "var(--space-4)",
                  paddingBottom: "var(--space-3)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <dt style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "var(--text-sm)" }}>
                  {term}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    color: "var(--color-text-muted)",
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Topic>

        {/* Regras de construção */}
        <Topic title="Regras de construção">
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)", margin: 0, padding: 0 }}>
            {RULES.map((rule) => (
              <li
                key={rule}
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-muted)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-primary)",
                    marginTop: 9,
                  }}
                />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Topic>

        {/* Checklist */}
        <Topic title="Checklist para validar um novo ícone" lead="Todo ícone novo precisa passar nesses seis pontos antes de entrar no sistema.">
          <div
            className="stack-mobile"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}
          >
            {CHECKLIST.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  alignItems: "flex-start",
                  padding: "var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", lineHeight: "var(--leading-snug)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Topic>
      </div>
    </Panel>
  );
}
