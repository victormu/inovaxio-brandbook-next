import { Panel } from "@/components/manual/Panel";
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
    <Panel
      id="fotografia"
      index="04 / 06"
      title="Fotografia"
      band="dark"
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
    </Panel>
  );
}
