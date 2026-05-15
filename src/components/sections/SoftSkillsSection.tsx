import { softSkills } from "@/data/softSkills";
import { SkillCard } from "@/components/ui-custom/SkillCard";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";

export function SoftSkillsSection() {
  const practiced = softSkills.filter((s) => s.status === "Já pratico");
  const developing = softSkills.filter((s) => s.status === "Em desenvolvimento");
  return (
    <div className="space-y-12">
      <div>
        <SectionTitle eyebrow="Habilidades" title="Já pratico" description="Soft skills que aplico no meu dia a dia profissional." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiced.map((s) => <SkillCard key={s.title} item={s} />)}
        </div>
      </div>
      <div>
        <SectionTitle eyebrow="Em evolução" title="Em desenvolvimento" description="Habilidades em construção contínua." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {developing.map((s) => <SkillCard key={s.title} item={s} />)}
        </div>
      </div>
    </div>
  );
}
