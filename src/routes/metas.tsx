import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { GoalsSection } from "@/components/sections/GoalsSection";

export const Route = createFileRoute("/metas")({
  head: () => ({
    meta: [
      { title: "Metas com Prazos — PDI Julia" },
      { name: "description", content: "Metas técnicas definidas com prazos, prioridades e acompanhamento de progresso." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-10">
      <SectionTitle 
        eyebrow="Planejamento" 
        title="Metas com Prazos"
        description="Objetivos técnicos definidos com datas específicas, prioridades e status de progresso para manter meu desenvolvimento focado e mensurável." 
      />
      <GoalsSection />
    </section>
  );
}
