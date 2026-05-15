import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { SoftSkillsSection } from "@/components/sections/SoftSkillsSection";

export const Route = createFileRoute("/soft-skills")({
  head: () => ({
    meta: [
      { title: "Soft Skills — PDI Julia" },
      { name: "description", content: "Habilidades comportamentais que pratico e estou desenvolvendo." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-10">
      <SectionTitle eyebrow="Comportamental" title="Soft Skills"
        description="As habilidades humanas que sustentam minha evolução técnica." />
      <SoftSkillsSection />
    </section>
  );
}
