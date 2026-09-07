import { profile } from "@/data/profile";
import { GradientCard } from "@/components/ui-custom/GradientCard";
import { InternshipTimer } from "@/components/ui-custom/InternshipTimer";
import { Github, Linkedin, Building2, Briefcase, Calendar } from "lucide-react";
import { formatMonthYear } from "@/lib/date";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-10">
      <div className="absolute inset-0 -z-10 gradient-soft opacity-60 rounded-3xl blur-3xl" />
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-3 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary-deep mb-4 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
            ✨ Plano de Desenvolvimento Individual
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Olá, eu sou{" "}
            <span className="bg-clip-text text-transparent gradient-primary">{profile.name}</span>
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-foreground">{profile.title}</p>
          <p className="mt-2 text-muted-foreground dark:text-white">{profile.subtitle}</p>
          <p className="mt-6 max-w-xl text-foreground/80">{profile.bio}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-white font-medium shadow-soft hover-scale"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border font-medium hover:border-primary hover-scale"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 animate-fade-in">
          <GradientCard glow>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="h-12 w-12 rounded-2xl object-cover shadow-soft"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-bold text-lg">
                    {profile.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">{profile.title}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary-deep" /> {profile.company}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary-deep" /> {profile.area}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-deep" />{" "}
                  {formatMonthYear(profile.startDate)} — {formatMonthYear(profile.endDate)}
                </p>
              </div>
              <InternshipTimer start={profile.startDate} end={profile.endDate} />
              <p className="text-xs text-muted-foreground pt-1">
                Última atualização: {profile.lastUpdate}
              </p>
            </div>
          </GradientCard>
        </div>
      </div>
    </section>
  );
}
