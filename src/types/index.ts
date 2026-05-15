export type Status = "domino" | "estudando" | "preciso-estudar";

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  company: string;
  area: string;
  startDate: string; // ISO
  endDate: string; // ISO
  github: string;
  linkedin: string;
  lastUpdate: string;
  bio: string;
  profileImage?: string;  // URL da foto de perfil

}

export interface CareerStep {
  id: number;
  title: string;
  focus: string;
  current?: boolean;
}

export interface Goal { title: string; }

export type ContributionCategory =
  | "Backend" | "Cloud" | "Infra" | "Estudos" | "Projetos" | "Comunidade";

export interface Contribution {
  id: string;
  icon: string; // lucide icon name
  title: string;
  category: ContributionCategory;
  description: string;
  technologies: string[];
  impacts: string[];
  status: "Em andamento" | "Concluído" | "Planejado";
}

export interface Tech { name: string; status: Status; }
export interface RoadmapArea { area: string; icon: string; techs: Tech[]; }

export interface SoftSkill {
  icon: string;
  title: string;
  description: string;
  status: "Já pratico" | "Em desenvolvimento";
}
