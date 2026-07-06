import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/HeroSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { listEvents } from "@/api/events";

export const Route = createFileRoute("/")({
  loader: () => listEvents(),
  head: () => ({
    meta: [
      { title: "Sobre — PDI Julia" },
      {
        name: "description",
        content: "Conheça Julia, estagiária em desenvolvimento Java no Itaú Unibanco.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const events = Route.useLoaderData();
  return (
    <>
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <EventsSection events={events} />
      </div>
    </>
  );
}
