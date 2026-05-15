import type { CareerStep, Goal } from "@/types";

export const careerSteps: CareerStep[] = [
  { id: 1, title: "Estagiária", focus: "Java, Spring Boot, SQL, AWS e fundamentos de backend", current: true },
  { id: 2, title: "Desenvolvedora Júnior", focus: "APIs REST, testes, microsserviços e boas práticas" },
  { id: 3, title: "Desenvolvedora Pleno", focus: "Arquitetura, cloud, mensageria e sistemas distribuídos" },
  { id: 4, title: "Desenvolvedora Sênior", focus: "Decisões técnicas, liderança técnica e escalabilidade" },
  { id: 5, title: "Tech Lead ou Especialista", focus: "Arquitetura de soluções, mentoria e impacto estratégico" },
];

export const goals: Goal[] = [
  { title: "Evoluir em Java e Spring Boot" },
  { title: "Aprender AWS aplicada a projetos reais" },
  { title: "Estudar Terraform e Infrastructure as Code" },
  { title: "Construir projetos de backend para portfólio" },
  { title: "Preparar certificação Azure/AWS" },
];
