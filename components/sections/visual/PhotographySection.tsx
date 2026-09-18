import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { DoDontCard } from "@/components/ui/DoDontCard";

const PHOTOS = [
  {
    src: "/assets/fotos/atributo-pratico.jpg",
    alt: "IMG -- Equipe técnica em reunião de trabalho",
    attribution: "Prático",
    body: "Trabalho acontecendo, não pose. Mesa com material real, tela ligada, conversa em andamento.",
  },
  {
    src: "/assets/fotos/atributo-tecnico.jpg",
    alt: "IMG -- Desenvolvedor concentrado no trabalho",
    attribution: "Técnico",
    body: "Concentração e domínio. Código, terminal ou diagrama visíveis, sem encenação de genialidade.",
  },
  {
    src: "/assets/fotos/atributo-proximo.jpg",
    alt: "IMG -- Conversa próxima entre consultor e cliente",
    attribution: "Próximo",
    body: "Duas pessoas resolvendo junto. Distância curta, postura de parceria, não de atendimento.",
  },
];

const DIRECAO = [
  { label: "Luz", value: "Natural, de janela. Sem flash direto, sem luz de estúdio dura." },
  { label: "Enquadramento", value: "Médio e aberto. O ambiente de trabalho conta metade da história." },
  { label: "Cor", value: "Temperatura neutra. Nada de filtro azulado para parecer tecnológico." },
  { label: "Pessoas", value: "Identificáveis com o setor. Roupa de trabalho real, não figurino." },
  { label: "Pós", value: "Correção de exposição e contraste. Nada de pele suavizada ou céu trocado." },
];

export function PhotographySection() {
  return (
    <Panel
      id="fotografia"
      index="04 / 06"
      title="Fotografia"
      band="dark"
      lead="Fotografia real, não stock. Cada imagem reforça um atributo da marca: prático, próximo, técnico."
    >
      <Topic
        wide
        title="Os três atributos"
        lead="Toda foto da marca precisa carregar pelo menos um deles. Se não carregar nenhum, ela não é uma foto da Inovaxio."
      >
        <div
          className="stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-6)",
          }}
        >
          {PHOTOS.map((photo) => (
            <div key={photo.attribution}>
              <PhotoCard
                src={photo.src}
                alt={photo.alt}
                attribution={photo.attribution}
                aspectRatio="portrait"
              />
              <p
                style={{
                  fontSize: "var(--text-caption)",
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-text-faint)",
                  marginTop: "var(--space-2)",
                }}
              >
                {photo.body}
              </p>
            </div>
          ))}
        </div>
      </Topic>

      <Topic
        title="Direção de arte"
        lead="Os parâmetros que tornam uma foto reconhecível como da marca, antes de qualquer edição."
      >
        <dl style={{ display: "grid", gap: "var(--space-4)" }}>
          {DIRECAO.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 140px) minmax(0, 1fr)",
                gap: "var(--space-4)",
                paddingBottom: "var(--space-4)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text)",
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--color-text-muted)",
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Topic>

      <Topic
        wide
        title="Faça e não faça"
        lead="A diferença entre uma foto da marca e uma foto de banco de imagens costuma estar no rosto das pessoas."
      >
        <div
          className="stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-6)",
          }}
        >
          <DoDontCard
            variant="do"
            caption="Pessoas trabalhando de verdade, olhando para o trabalho e não para a câmera."
            imageLabel="IMG -- Equipe em trabalho real, luz de janela"
          />
          <DoDontCard
            variant="dont"
            caption="Sorriso posado para a câmera, aperto de mão encenado, sala de reunião vazia e genérica."
            imageLabel="IMG -- Stock corporativo genérico"
          />
        </div>
      </Topic>
    </Panel>
  );
}
