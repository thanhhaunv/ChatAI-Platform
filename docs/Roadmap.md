
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

## Sprint Backlog(Detailed Task Breakdown)
- [BRD](docs/Detailed-Task-Breakdown.md)




