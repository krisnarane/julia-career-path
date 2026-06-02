import type { Deadline } from "@/types";

export const deadlines: Deadline[] = [
  {
    id: "1",
    categoria: "Backend",
    titulo: "Dominar PySpark avançado",
    descricao: "Aprofundar conhecimentos em processamento de dados distribuído com PySpark",
    dataPrazo: "2026-08-30",
    prioridade: "Alta",
    status: "Em progresso",
    icon: "Database",
    progresso: 35
  },
  {
    id: "2",
    categoria: "Data Engineering",
    titulo: "Implementar primeiro pipeline ETL com AWS Glue",
    descricao: "Criar um pipeline ETL completo usando AWS Glue em um projeto real",
    dataPrazo: "2026-09-15",
    prioridade: "Alta",
    status: "Planejado",
    icon: "Zap",
    progresso: 0
  },
  {
    id: "3",
    categoria: "Cloud",
    titulo: "Configurar ECS com Java",
    descricao: "Deploy de aplicação Java em containers no AWS ECS com auto-scaling",
    dataPrazo: "2026-10-15",
    prioridade: "Média",
    status: "Planejado",
    icon: "Container",
    progresso: 0
  },
  {
    id: "4",
    categoria: "DevOps",
    titulo: "Dominar Datadog para observabilidade",
    descricao: "Implementar dashboards, alertas e traces em aplicações com Datadog",
    dataPrazo: "2026-09-30",
    prioridade: "Alta",
    status: "Planejado",
    icon: "Eye",
    progresso: 0
  },
  {
    id: "5",
    categoria: "Backend",
    titulo: "Completar certificação DVA-C02 da AWS",
    descricao: "Estudar e passar na certificação AWS Developer Associate",
    dataPrazo: "2026-08-15",
    prioridade: "Média",
    status: "Em progresso",
    icon: "Award",
    progresso: 45
  },
  {
    id: "6",
    categoria: "Estudos",
    titulo: "Estudar arquitetura de microsserviços",
    descricao: "Ler livros e completar cursos sobre padrões de microsserviços",
    dataPrazo: "2026-10-01",
    prioridade: "Média",
    status: "Planejado",
    icon: "BookOpen",
    progresso: 0
  },
  {
    id: "7",
    categoria: "Backend",
    titulo: "Criar projeto portfolio com Python",
    descricao: "Desenvolver projeto real usando Python, PySpark e AWS para portfólio",
    dataPrazo: "2026-11-30",
    prioridade: "Baixa",
    status: "Planejado",
    icon: "Code",
    progresso: 0
  }
];
