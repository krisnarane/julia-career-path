import { events } from "@/data/events";
import { EventCard } from "@/components/ui-custom/EventCard";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";

export function EventsSection() {
  return (
    <section className="py-12">
      <SectionTitle
        title="Eventos e Participações"
        description="Conferências, workshops e meetups que participei para me manter atualizada e conectada com a comunidade tech"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {events.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>
    </section>
  );
}
