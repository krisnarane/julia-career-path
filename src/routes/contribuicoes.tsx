import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { ContributionsSection } from "@/components/sections/ContributionsSection";

export const Route = createFileRoute("/contribuicoes")({
  head: () => ({
    meta: [
      { title: "Contribuições — PDI Julia" },
      { name: "description", content: "Projetos, estudos e contribuições profissionais." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-10">
      <SectionTitle eyebrow="Projetos & estudos" title="Contribuições"
        description="Coleção de projetos, estudos e participações que constroem minha jornada." />
      <ContributionsSection />
    </section>
  );
}
