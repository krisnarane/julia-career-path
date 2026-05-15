import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { RoadmapSection } from "@/components/sections/RoadmapSection";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap Técnico — PDI Julia" },
      { name: "description", content: "Stack técnica, certificações e tecnologias em estudo." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-10">
      <SectionTitle eyebrow="Stack" title="Roadmap Técnico"
        description="Tecnologias que pratico, estudo e tenho como próximos passos." />
      <RoadmapSection />
    </section>
  );
}
