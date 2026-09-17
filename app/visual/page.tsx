import { ChapterCover } from "@/components/manual/ChapterCover";
import { ChapterNext } from "@/components/manual/ChapterNext";
import { LogoSection } from "@/components/sections/visual/LogoSection";
import { ColorSection } from "@/components/sections/visual/ColorSection";
import { TypographySection } from "@/components/sections/visual/TypographySection";
import { PhotographySection } from "@/components/sections/visual/PhotographySection";
import { GridSection } from "@/components/sections/visual/GridSection";
import { IconsSection } from "@/components/sections/visual/IconsSection";

export default function VisualPage() {
  return (
    <>
      <ChapterCover
        num="03"
        title="Sistema Visual"
        lead="Logo, cor, tipografia, fotografia e grid. Os elementos que dão consistência visual à marca em qualquer aplicação."
        topics={[
          "Logo",
          "Cor",
          "Tipografia",
          "Fotografia",
          "Grid e layout",
          "Ícones",
        ]}
      />
      <LogoSection />
      <ColorSection />
      <TypographySection />
      <PhotographySection />
      <GridSection />
      <IconsSection />
      <ChapterNext current="visual" />
    </>
  );
}
