### Full Test Plan (9-test-plan.md)

Dưới đây là nội dung đầy đủ cho file `9-test-plan.md`, mở rộng từ Test Plan Phase 4 (tập trung vào toàn dự án, bao quát unit, integration, E2E, load, security). Bạn có thể copy vào Markdown file. Plan này bao quát 100% milestones, với strategy, tools, timeline, và metrics.

---

# Test Plan Cho Dự Án ChatAI Platform

## 1. Giới Thiệu
Test Plan này mô tả chiến lược testing để đảm bảo hệ thống đáp ứng US-001 đến US-010 (từ SRS) và non-functional requirements (scalability, security, latency từ SRS). Nó bao quát test types, tools, responsibilities, và criteria để release MVP. Test coverage aim 70%+ (như Coding Conventions phần 14). Scope: All milestones 1-12, focus incremental testing (test sau mỗi milestone).

## 2. Scope
- **In-Scope**: Core features (auth, chat, projects/threads, agents, billing, ML), non-functional (security, scale 10k users, latency <5s, observability). Test on dev/staging/prod-like envs.  
- **Out-of-Scope**: Third-party API uptime (e.g., OpenAI), full production monitoring (post-beta).  
- **Entry Criteria**: Milestone complete, code reviewed.  
- **Exit Criteria**: 95% tests pass, no critical bugs, security clean.

## 3. Test Strategy
- **Approach**: Risk-based (high-risk: chat/security trước), hybrid manual/automated (80% auto). Pyramid: 60% unit, 20% integration, 20% E2E/load.  
- **Test Types**:  
  - **Unit**: Functions/classes (e.g., token log in billing.service.ts). Tools: Jest/Pytest. Coverage >70%.  
  - **Integration**: API flows (e.g., auth → chat → billing). Tools: Postman/Supertest. Mock external (nock for OpenAI).  
  - **E2E**: Full user flows (login → voice chat). Tools: Cypress (web), Detox (mobile).  
  - **Load/Performance**: Concurrent users (10k sim). Tools: Artillery. Assert latency <10s.  
  - **Security**: Vuln scan (JWT, injection). Tools: OWASP ZAP, Snyk.  
  - **Accessibility**: WCAG compliance. Tools: Lighthouse. Score >90.  
- **Environments**: Dev (local Docker), Staging (K8s), Beta (cloud with real APIs).  
- **Defect Management**: Jira bugs (priority Critical/High/Medium/Low), MTTR <24h for critical.  

## 4. Tools Và Setup
- **Unit/Integration**: Jest (JS), Pytest (Python), Supertest. Coverage: nyc/jest --coverage.  
- **E2E**: Cypress (web), Detox (mobile). Run: `npx cypress run`.  
- **Load**: Artillery (YAML scripts). Sample script for chat load:  
  ```yaml
  config:
    target: 'http://staging.chatai.com'
    phases:
      - duration: 60
        arrivalRate: 100
  scenarios:
    - flow:
        - post:
            url: /auth/login
        - post:
            url: /projects/1/conversations/1/messages
            json: { content: 'Test' }
  ```  
- **Security**: OWASP ZAP, Snyk.  
- **Reporting**: Allure (HTML reports), Slack notifications. CI: GitHub Actions (run on PR/merge).  

## 5. Timeline & Tasks
Theo Phase 4 (2 weeks), nhưng tests incremental từ Phase 1 (e.g., unit sau mỗi milestone).  

- **Phase 1-3**: Incremental tests (unit/integration sau milestone, E2E sau Phase 2).  
- **Phase 4 Sprint 1 (Week 1)**: Hardening (unit/integration full, security/load). Tasks: Run suite (8h), security scan (6h), load test (4h).  
- **Phase 4 Sprint 2 (Week 2)**: E2E/accessibility (8h), beta testing (6h), handover (4h).  

Total effort: 36h testing + 4h buffer.

## 6. Responsibilities
| Test Type | Responsible | Accountable | Consulted | Informed |
| ---------- | ----------- | ----------- | --------- | -------- |
| Unit | Dev Lead/Dev | Dev Lead | PM | Team |
| Integration | Backend/Frontend Dev | Dev Lead | DevOps | PM |
| E2E/Load | QA | PM | Dev Lead | Stakeholders |
| Security | DevOps | PM | Legal | Finance |
| Beta Testing | PM | PO | Team | Client |

## 7. Risks Và Mitigation
- Risk: High-priority bug in chat (Impact: High) → Mitigate: Prioritize E2E for US-002.  
- Risk: Load fail scale (Medium) → Mitigate: Early Artillery in Phase 3.  
- Risk: Test flakiness (High) → Mitigate: Retries in Cypress.

## 8. Metrics
- KPIs: Coverage >70%, bug density <1/1000 lines, pass rate 95%, MTTR <24h.  
- Tools: SonarQube (coverage), Jira dashboards (bugs).  

Update plan sau Phase 3 nếu feedback.

---
