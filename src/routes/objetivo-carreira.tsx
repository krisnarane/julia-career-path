import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { CareerTimeline } from "@/components/sections/CareerTimeline";

export const Route = createFileRoute("/objetivo-carreira")({
  head: () => ({
    meta: [
      { title: "Objetivo de Carreira — PDI Julia" },
      { name: "description", content: "Etapas planejadas da carreira em desenvolvimento backend e cloud." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-10">
      <SectionTitle eyebrow="Trajetória" title="Objetivo de Carreira"
        description="Onde estou agora e onde quero chegar — minha evolução técnica e profissional planejada por etapas." />
      <CareerTimeline />
    </section>
  );
}
