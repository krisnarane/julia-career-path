import type { Event } from "@/types";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export function EventCard({ item }: { item: Event }) {
  return (
    <article className="group glass rounded-3xl border border-border overflow-hidden hover-scale hover:border-primary hover:shadow-soft animate-fade-in transition-all">
      {/* Imagem do evento */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br gradient-primary opacity-50">
            <span className="text-white/50 text-4xl">📸</span>
          </div>
        )}
        {/* Badge de tipo */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex px-3 py-1.5 rounded-full bg-primary/90 text-white text-xs font-semibold shadow-soft backdrop-blur-sm">
            {item.type}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 md:p-6">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Data e Local */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {item.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-deep transition-colors group/link"
          >
            Saiba mais
            <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </article>
  );
}
