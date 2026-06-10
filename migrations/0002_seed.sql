-- Seed inicial convertido dos antigos mocks de src/data/
INSERT INTO goals (id, categoria, titulo, descricao, data_prazo, prioridade, status, icon, progresso) VALUES
  ('1', 'Backend', 'Dominar PySpark avançado', 'Aprofundar conhecimentos em processamento de dados distribuído com PySpark', '2026-08-30', 'Alta', 'Em progresso', 'Database', 35),
  ('2', 'Data Engineering', 'Implementar primeiro pipeline ETL com AWS Glue', 'Criar um pipeline ETL completo usando AWS Glue em um projeto real', '2026-09-15', 'Alta', 'Planejado', 'Zap', 0),
  ('3', 'Cloud', 'Configurar ECS com Java', 'Deploy de aplicação Java em containers no AWS ECS com auto-scaling', '2026-10-15', 'Média', 'Planejado', 'Container', 0),
  ('4', 'DevOps', 'Dominar Datadog para observabilidade', 'Implementar dashboards, alertas e traces em aplicações com Datadog', '2026-09-30', 'Alta', 'Planejado', 'Eye', 0),
  ('5', 'Backend', 'Completar certificação DVA-C02 da AWS', 'Estudar e passar na certificação AWS Developer Associate', '2026-08-15', 'Média', 'Em progresso', 'Award', 45),
  ('6', 'Estudos', 'Estudar arquitetura de microsserviços', 'Ler livros e completar cursos sobre padrões de microsserviços', '2026-10-01', 'Média', 'Planejado', 'BookOpen', 0),
  ('7', 'Backend', 'Criar projeto portfolio com Python', 'Desenvolver projeto real usando Python, PySpark e AWS para portfólio', '2026-11-30', 'Baixa', 'Planejado', 'Code', 0);

INSERT INTO contributions (id, icon, title, category, description, technologies, impacts, status, sort_order) VALUES
  ('az-204', 'GraduationCap', 'Estudos para certificação AZ-204', 'Estudos', 'Trilha de estudos para certificação Microsoft Azure Developer Associate.', '["Azure","C#","Functions","Storage Account"]', '["Evolução em cloud","Base para desenvolvimento em nuvem","Fortalecimento técnico"]', 'Em andamento', 0),
  ('DVA-C02', 'GraduationCap', 'Estudos para certificação AWS Developer Associated', 'Estudos', 'Trilha de estudos para certificação AWS Developer Associate.', '["AWS","S3","DynamoDB","EC2"]', '["Evolução em cloud","Base para desenvolvimento em nuvem","Fortalecimento técnico"]', 'Em andamento', 1),
  ('comunidades', 'Users', 'Participação em Comunidades Tech', 'Comunidade', 'Engajamento em eventos, posts e troca com a comunidade de desenvolvimento.', '["LinkedIn","Eventos","Networking","Learning in public"]', '["Construção de marca pessoal","Networking","Compartilhamento de aprendizados"]', 'Em andamento', 2);

INSERT INTO roadmap_areas (id, area, icon, techs, sort_order) VALUES
  ('backend', 'Backend', 'Server', '[{"name":"Java","status":"domino"},{"name":"Spring Boot","status":"domino"},{"name":"APIs REST","status":"domino"},{"name":"Microsserviços","status":"preciso-estudar"},{"name":"Testes unitários","status":"domino"},{"name":"Mensageria","status":"preciso-estudar"}]', 0),
  ('data-engineering', 'Data Engineering', 'Database', '[{"name":"Python PySpark","status":"estudando"},{"name":"AWS Glue","status":"estudando"}]', 1),
  ('cloud', 'Cloud', 'Cloud', '[{"name":"AWS Cloud Practitioner","status":"domino"},{"name":"AWS S3","status":"domino"},{"name":"AWS Lambda","status":"domino"},{"name":"Azure AZ-900","status":"domino"},{"name":"Azure Functions","status":"estudando"}]', 2),
  ('observabilidade', 'Observabilidade', 'Eye', '[{"name":"DataDog","status":"estudando"},{"name":"Logs e métricas","status":"estudando"}]', 3),
  ('banco-de-dados', 'Banco de Dados', 'Database', '[{"name":"SQL","status":"domino"},{"name":"PostgreSQL","status":"domino"},{"name":"MySQL","status":"domino"},{"name":"DynamoDB","status":"preciso-estudar"}]', 4),
  ('devops-iac', 'DevOps / IaC', 'Wrench', '[{"name":"Git/GitHub","status":"domino"},{"name":"Docker","status":"domino"},{"name":"Terraform","status":"estudando"},{"name":"CI/CD","status":"domino"}]', 5),
  ('frontend-basico', 'Frontend básico', 'Layout', '[{"name":"HTML","status":"domino"},{"name":"CSS","status":"domino"},{"name":"JavaScript","status":"domino"}]', 6),
  ('certificacoes', 'Certificações', 'Award', '[{"name":"AWS Cloud Practitioner","status":"domino"},{"name":"AZ-900","status":"domino"},{"name":"AZ-204","status":"estudando"},{"name":"DVA-C02","status":"estudando"}]', 7);

INSERT INTO soft_skills (id, icon, title, description, status, sort_order) VALUES
  ('comunicacao', 'MessageCircle', 'Comunicação', 'Expresso ideias com clareza em times e reuniões.', 'Já pratico', 0),
  ('organizacao', 'ListChecks', 'Organização', 'Mantenho rotina e tarefas sob controle com método.', 'Já pratico', 1),
  ('aprendizado-continuo', 'BookOpen', 'Aprendizado contínuo', 'Estudo todos os dias e busco evoluir tecnicamente.', 'Já pratico', 2),
  ('trabalho-em-equipe', 'Users', 'Trabalho em equipe', 'Colaboro ativamente e ajudo o time a entregar valor.', 'Já pratico', 3),
  ('proatividade', 'Zap', 'Proatividade', 'Antecipo necessidades e busco oportunidades de contribuir.', 'Já pratico', 4),
  ('documentacao', 'FileText', 'Documentação', 'Documento processos e decisões para o time.', 'Já pratico', 5),
  ('seguranca-apresentar', 'Sparkles', 'Segurança para apresentar ideias', 'Trabalhando para falar com mais confiança em público.', 'Em desenvolvimento', 6),
  ('pensamento-sistemico', 'Network', 'Pensamento sistêmico', 'Aprendendo a enxergar o todo antes da parte.', 'Em desenvolvimento', 7),
  ('visao-arquitetura', 'Compass', 'Visão de arquitetura', 'Estudando padrões e decisões arquiteturais.', 'Em desenvolvimento', 8),
  ('autonomia-tecnica', 'Rocket', 'Autonomia técnica', 'Evoluindo na resolução independente de problemas.', 'Em desenvolvimento', 9),
  ('priorizacao', 'Target', 'Priorização', 'Aprimorando a escolha do que entregar primeiro.', 'Em desenvolvimento', 10),
  ('clareza-rituais-ageis', 'Activity', 'Clareza em rituais ágeis', 'Praticando objetividade em dailies e plannings.', 'Em desenvolvimento', 11);
