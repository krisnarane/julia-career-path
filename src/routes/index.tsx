import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/HeroSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sobre — PDI Julia" },
      { name: "description", content: "Conheça Julia, estagiária em desenvolvimento Java no Itaú Unibanco." },
    ],
  }),
  component: Index,
});

function Index() {
  return <HeroSection />;
}
