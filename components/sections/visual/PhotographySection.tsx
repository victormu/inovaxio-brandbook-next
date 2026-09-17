import { ManualEntry } from "@/components/manual/ManualEntry";
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
    <ManualEntry
      id="fotografia"
      eyebrow="Fotografia"
      description="Fotografia real, não stock. Sem sorriso posado, sem banco de imagens genérico. Cada foto reforça um atributo da marca: prático, próximo, técnico. Priorize luz natural e ambiente de trabalho real."
      specs={["3 atributos", "luz natural", "pessoas identificáveis"]}
    >
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
    </ManualEntry>
  );
}
