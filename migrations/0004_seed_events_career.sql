-- Seed convertido dos antigos mocks de src/data/events.ts e src/data/career.ts
INSERT INTO events (id, title, description, date, location, type, image, highlights, link, sort_order) VALUES
  ('microsoft-developer-camp', ' Microsoft - Copilot Developer Camp', 'Participei de um Ideathon com o desafio de criar um agente de IA funcional utilizando o Copilot Studio e Azure AI Foundry.', 'Fevereiro 2026', 'Microsoft, SP', 'Hackathon', '/images/event-microsoft.jpg', '["AI Agents","Copilot","Inovação","Networking"]', 'https://www.linkedin.com/posts/julia-krisnarane-moraes_microsoft365-copilotstudio-azureaifoundry-activity-7420835420189507585-75UC', 0),
  ('google-cloud-summit', 'Google Cloud Summit Developer Day 2025', 'Foco no poder da Inteligência Artificial Generativa na prática, impulsionando a inovação em empresas brasileiras.', 'Outubro 2025', 'SP', 'Summit', '/images/event-google-cloud.jpg', '["Google Cloud Services","IA Generativa"]', 'https://www.linkedin.com/posts/julia-krisnarane-moraes_googlecloud-devday2025-inteligenciaartificial-activity-7372326178369581056-V5-u', 1),
  ('amazon-meetup-2026', 'LINUXtips Meet Up na Amazon', 'Nesse dia, não pude ficar até o final do evento pois tive que ir fazer a minha prova AWS Cloud Practitioner: Fui Aprovada!', 'Janeiro 2026', 'Amazon, SP', 'Meetup', '/images/event-amazon.jpg', '["AWS Services","LLM","Linux"]', 'https://www.linkedin.com/posts/julia-krisnarane-moraes_linuxtips-meet-up-na-amazon-de-um-meetup-activity-7400991338969632768-MJXH', 2),
  ('spiw-2026', 'São Paulo Innovation Week (SPIW )', 'O maior festival global de tecnologia e inovação realizado no Brasil', 'Maio 2026', 'Mercado Livre Pacaembu, SP', 'Conferência', '/images/event-spiw.jpg', '["Inovação","Tecnologia"]', 'https://www.linkedin.com/posts/julia-krisnarane-moraes_spiw-tecnologia-activity-7460862401282760704-pMQ-', 3);

INSERT INTO career_steps (id, title, focus, is_current, sort_order) VALUES
  ('estagiaria', 'Estagiária', 'Java, Spring Boot, SQL, AWS e fundamentos de backend', 1, 0),
  ('dev-junior', 'Desenvolvedora Júnior', 'APIs REST, testes, microsserviços e boas práticas', 0, 1),
  ('dev-pleno', 'Desenvolvedora Pleno', 'Arquitetura, cloud, mensageria e sistemas distribuídos', 0, 2),
  ('dev-senior', 'Desenvolvedora Sênior', 'Decisões técnicas, liderança técnica e escalabilidade', 0, 3),
  ('tech-lead', 'Tech Lead ou Especialista', 'Arquitetura de soluções, mentoria e impacto estratégico', 0, 4);

INSERT INTO career_goals (id, title, sort_order) VALUES
  ('goal-1', 'Evoluir em Java e Spring Boot', 0),
  ('goal-2', 'Aprender AWS aplicada a projetos reais', 1),
  ('goal-3', 'Estudar Terraform e Infrastructure as Code', 2),
  ('goal-4', 'Dominar PySpark e processamento de dados em larga escala', 3),
  ('goal-5', 'Preparar certificação AWS Developer em Julho/Agosto', 4),
  ('goal-6', 'Implementar pipelines ETL com AWS Glue', 5),
  ('goal-7', 'Configurar e monitorar aplicações com Datadog', 6),
  ('goal-8', 'Trabalhar com AWS ECS para orquestração de containers', 7);
