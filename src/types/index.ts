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
  profileImage?: string; // URL da foto de perfil
}

export interface CareerStep {
  id: string;
  title: string;
  focus: string;
  current?: boolean;
}

export interface Goal {
  id: string;
  title: string;
}

export type GoalPriority = "Alta" | "Média" | "Baixa";
export type GoalStatus = "Planejado" | "Em progresso" | "Concluído";
export type GoalCategory = "Backend" | "Cloud" | "Data Engineering" | "DevOps" | "Estudos";

export interface Deadline {
  id: string;
  categoria: GoalCategory;
  titulo: string;
  descricao: string;
  dataPrazo: string; // ISO format (YYYY-MM-DD)
  prioridade: GoalPriority;
  status: GoalStatus;
  icon?: string; // lucide icon name
  progresso?: number; // Manual progress (0-100), se não informado usa cálculo automático
  createdAt?: string; // data de criação (usada na ordenação "Mais recentes")
}

export type ContributionCategory =
  | "Backend"
  | "Cloud"
  | "Infra"
  | "Estudos"
  | "Projetos"
  | "Comunidade";

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

export interface Tech {
  name: string;
  status: Status;
}
export interface RoadmapArea {
  id: string;
  area: string;
  icon: string;
  techs: Tech[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO ou "mês ano"
  location: string;
  type: "Conferência" | "Workshop" | "Hackathon" | "Meetup" | "Curso" | "Palestra" | "Summit";
  image: string; // URL ou caminho da imagem
  highlights?: string[];
  link?: string;
}

export interface SoftSkill {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: "Já pratico" | "Em desenvolvimento";
}
