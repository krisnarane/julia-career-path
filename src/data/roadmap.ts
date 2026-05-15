import type { RoadmapArea } from "@/types";

export const roadmap: RoadmapArea[] = [
  {
    area: "Backend", icon: "Server",
    techs: [
      { name: "Java", status: "domino" },
      { name: "Spring Boot", status: "domino" },
      { name: "APIs REST", status: "domino" },
      { name: "Microsserviços", status: "preciso-estudar" },
      { name: "Testes unitários", status: "domino" },
      { name: "Mensageria", status: "preciso-estudar" },
    ],
  },
  {
    area: "Cloud", icon: "Cloud",
    techs: [
      { name: "AWS Cloud Practitioner", status: "domino" },
      { name: "AWS S3", status: "domino" },
      { name: "AWS Lambda", status: "domino" },
      { name: "Azure AZ-900", status: "domino" },
      { name: "Azure Functions", status: "estudando" },
    ],
  },
  {
    area: "Banco de Dados", icon: "Database",
    techs: [
      { name: "SQL", status: "domino" },
      { name: "PostgreSQL", status: "domino" },
      { name: "MySQL", status: "domino" },
      { name: "DynamoDB", status: "preciso-estudar" },
    ],
  },
  {
    area: "DevOps / IaC", icon: "Wrench",
    techs: [
      { name: "Git/GitHub", status: "domino" },
      { name: "Docker", status: "domino" },
      { name: "Terraform", status: "estudando" },
      { name: "CI/CD", status: "domino" },
    ],
  },
  {
    area: "Frontend básico", icon: "Layout",
    techs: [
      { name: "HTML", status: "domino" },
      { name: "CSS", status: "domino" },
      { name: "JavaScript", status: "domino" },
    ],
  },
  {
    area: "Certificações", icon: "Award",
    techs: [
      { name: "AWS Cloud Practitioner", status: "domino" },
      { name: "AZ-900", status: "domino" },
      { name: "AZ-204", status: "estudando" },
      { name: "DVA-C02", status: "estudando"},
    ],
  },
];
