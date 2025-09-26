
# 12) Roadmap / Sprint đề xuất (PM)

* **Phase 0 (2 wks):** Kickoff, BRD finalization, basic auth & infra PoC (K8s basics), minimal UI mockups
* **Phase 1 (4 wks):** Core backend APIs, basic chat flow with external agent (one provider), user auth + project CRUD, DB schema, implement conversation threading
* **Phase 2 (4 wks):** File upload & indexing, voice support PoC (STT/TTS), agent management CRUD, billing logging
* **Phase 3 (4 wks):** Self-hosted agent deploy flow (Docker), monitoring + metrics, scaling tests, ML training PoC
* **Phase 4 (2 wks):** Hardening, security review, beta release, documentation & handover

### Roadmap/Timeline Tổng Quát Cho Dự Án

Dựa trên Roadmap đề xuất trong phần 12 của tài liệu (Phase 0-4, tổng 16 weeks), tôi sẽ xây dựng một timeline chi tiết hơn, tích hợp các Milestone bạn đã đồng ý (từ phản hồi trước). Timeline này giả sử team nhỏ (2-5 người: 1 PM như bạn, 1-2 dev backend, 1 dev frontend, 1 DevOps/ML). Thời gian linh hoạt, dựa trên full-time (40h/week), và bao gồm buffer 10-20% cho debug/unexpected issues.

- **Giả Định**: 
  - Dự án bắt đầu ngày 1/10/2025 (dựa trên current date 26/9/2025).
  - Mỗi Milestone là đơn vị nhỏ (1-4 days), nhóm thành Sprint (2-4 weeks, theo Scrum).
  - Công cụ: Jira cho track tasks (tạo Epic cho Phase, Story cho Milestone, Sub-tasks cho công việc cụ thể).
  - Dependencies: Milestone sau build trên trước (e.g., DB trước Auth).
  - Milestones: 1 (DB/Infra) → 2 (Auth) → 3 (User/Project) → 4 (API Gateway) → 5 (Chat Basic) → 6 (Billing) → 7 (Frontend Basic) → 8+ (Features nâng cao như Voice, File, Agent Mgmt, Mobile – để Phase 2+).

#### Timeline Chi Tiết (Gantt-Style Text-Based)
- **Phase 0: Kickoff & PoC (2 weeks, 1/10 - 14/10/2025)**  
  - Tuần 1: Setup repo GitHub, Jira, basic infra PoC (Docker Compose).  
  - Tuần 2: Milestone 1 (DB setup).  
  - Deliverable: DB testable local.

- **Phase 1: Core Backend & Chat (4 weeks, 15/10 - 11/11/2025)**  
  - Tuần 1: Milestone 2 (Auth).  
  - Tuần 2: Milestone 3 (User/Project/Threading).  
  - Tuần 3: Milestone 4 (API Gateway) + Milestone 5 (Chat Basic).  
  - Tuần 4: Milestone 6 (Billing) + Integration tests cơ bản.  
  - Deliverable: API chat text basic testable qua Postman.

- **Phase 2: Advanced Features (4 weeks, 12/11 - 9/12/2025)**  
  - Tuần 1: Milestone 7 (Frontend Web Basic).  
  - Tuần 2: Add Voice (US-003) + File Upload (US-004).  
  - Tuần 3: Agent Mgmt Basic (US-006).  
  - Tuần 4: Billing Report Full + Tests.  
  - Deliverable: Web app với chat full (text/voice/file), testable manual.

- **Phase 3: Deployment & ML (4 weeks, 10/12/2025 - 6/1/2026)**  
  - Tuần 1: Self-Hosted Deploy (US-008, Docker/K8s).  
  - Tuần 2: ML Training PoC (US-010, Python service).  
  - Tuần 3: Monitoring (Prometheus) + Scaling tests.  
  - Tuần 4: Mobile App Basic (Frontend Mobile).  
  - Deliverable: System deploy on cloud, với self-agent testable.

- **Phase 4: Hardening & Release (2 weeks, 7/1 - 20/1/2026)**  
  - Tuần 1: Security review, full E2E tests.  
  - Tuần 2: Beta release, documentation, handover.  
  - Deliverable: MVP ready for users.

**Tổng Thời Gian**: ~16 weeks (4 months), với review sprint cuối mỗi phase. Nếu delay, prioritize core (Phase 1) để có prototype sớm.

Bây giờ, chi tiết tasks cho **Milestone 1: Setup Database Và Infra Basic** (1-2 days, trong Phase 0/1). Tôi format theo Jira-style: Tasks chính là Stories, sub-tasks là công việc cụ thể. Mỗi task có: Mô tả, Assignee gợi ý (dựa RACI: DevOps cho infra, Dev Lead cho code), Estimate (story points hoặc hours), và Test Criteria.

Nếu format này ổn (rõ ràng, actionable), bạn confirm để tôi làm tiếp Milestone 2+.

### Tasks Chi Tiết Cho Milestone 1

**Story 1-1: Setup Local Infrastructure Với Docker (Estimate: 4 hours, Assignee: DevOps/Architect)**  
- Sub-task 1: Cài đặt Docker và Docker Compose trên local machine (nếu chưa).  
- Sub-task 2: Tạo file docker-compose.yml ở root repo, bao gồm service Postgres (image: postgres:latest, env: user/pass/db).  
- Sub-task 3: Run `docker-compose up` để start DB local.  
- Test Criteria: DB chạy (check docker ps), connect được qua pgAdmin/psql (e.g., \l để list DB).

**Story 1-2: Implement DB Schema Dựa ERD (Estimate: 6 hours, Assignee: Dev Lead/DBA)**  
- Sub-task 1: Trong /services/user-service (hoặc folder chung /migrations), install TypeORM/Prisma (npm i @nestjs/typeorm typeorm pg).  
- Sub-task 2: Tạo entities từ ERD (e.g., user.entity.ts với fields: id, name, email,...; conversation.entity.ts với id, project_id, title,...).  
- Sub-task 3: Tạo migration script (typeorm migration:generate) để create tables (USERS, PROJECTS, PROJECT_MEMBERS, CONVERSATIONS, AGENTS, MESSAGES, BILLING_LOG).  
- Sub-task 4: Run migration để apply schema vào DB.  
- Test Criteria: Unit test (Jest): Assert tables exist (query INFORMATION_SCHEMA). Integration: Insert sample data (e.g., create user), query để verify.

**Story 1-3: Config DB Connection Cho Services (Estimate: 2 hours, Assignee: Dev Lead)**  
- Sub-task 1: Trong app.module.ts của /services/user-service, config TypeORM module với env (host: localhost, port: 5432, etc.).  
- Sub-task 2: Thêm .env file (gitignore) với DB credentials.  
- Test Criteria: Run service local (npm run start:dev), log connection success; test simple query (e.g., findAll users).

**Story 1-4: CI/CD Basic Cho Milestone (Estimate: 2 hours, Assignee: DevOps)**  
- Sub-task 1: Tạo workflow YAML ở /infrastructure/ci-cd/test-db.yaml (GitHub Actions: on push, run tests và migration).  
- Sub-task 2: Add script test (npm test) để run Jest.  
- Test Criteria: Push code → Check Actions tab trên GitHub, assert build pass.

**Dependencies**: Không có (là milestone đầu).  
**Deliverable Cuối Milestone**: DB schema ready, testable local với sample data. Total Estimate: 14 hours (~1.5 days).  
**Jira Integration**: Tạo Epic "Phase 1", add Stories này làm issues, attach link GitHub branch (feature/milestone-1).
