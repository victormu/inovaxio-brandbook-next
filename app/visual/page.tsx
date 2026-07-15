import { PageBanner } from "@/components/sections/PageBanner";
import { LogoSection } from "@/components/sections/visual/LogoSection";
import { ColorSection } from "@/components/sections/visual/ColorSection";
import { TypographySection } from "@/components/sections/visual/TypographySection";
import { PhotographySection } from "@/components/sections/visual/PhotographySection";
import { GridSection } from "@/components/sections/visual/GridSection";
import { IconsSection } from "@/components/sections/visual/IconsSection";

export default function VisualPage() {
  return (
    <>
      <PageBanner
        kicker="03 Sistema Visual"
        title="Sistema Visual"
        description="Logo, cor, tipografia, fotografia e grid. Os elementos que dão consistência visual à marca em qualquer aplicação."
        mediaBase="/assets/banners/visual"
      />
      <LogoSection />
      <ColorSection />
      <TypographySection />
      <PhotographySection />
      <GridSection />
      <IconsSection />
    </>
  );
}
