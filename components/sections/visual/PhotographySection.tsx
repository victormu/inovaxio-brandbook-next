import { SectionHeader } from "@/components/sections/SectionHeader";
import { PhotoCard } from "@/components/ui/PhotoCard";

const PHOTOS = [
  {
    src: "/assets/fotos/atributo-pratico.jpg",
    alt: "IMG -- Equipe técnica em reunião de trabalho",
    attribution: "Atributo: Prático",
  },
  {
    src: "/assets/fotos/atributo-tecnico.jpg",
    alt: "IMG -- Desenvolvedor concentrado no trabalho",
    attribution: "Atributo: Técnico",
  },
  {
    src: "/assets/fotos/atributo-proximo.jpg",
    alt: "IMG -- Conversa próxima entre consultor e cliente",
    attribution: "Atributo: Próximo",
  },
];

export function PhotographySection() {
  return (
    <section
      id="fotografia"
      aria-label="Fotografia"
      style={{ marginBottom: "var(--space-16)" }}
    >
      <SectionHeader
        level={2}
        eyebrow="Imagem"
        title="Fotografia"
        description="Fotografia real, não stock. Pessoas reais em contexto de trabalho técnico."
      />
      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-normal)",
          maxWidth: "60ch",
          marginBottom: "var(--space-8)",
        }}
      >
        Sem sorrisos posados, sem banco de imagens genérico. Cada foto deve
        reforçar os atributos da marca: prático, próximo, técnico. Priorize luz
        natural, ambiente de trabalho real e pessoas identificáveis com o setor
        de tecnologia.
      </p>
      <div
        className="stack-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-4)",
        }}
      >
        {PHOTOS.map((photo) => (
          <PhotoCard
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            attribution={photo.attribution}
            aspectRatio="landscape"
          />
        ))}
      </div>
    </section>
  );
}
