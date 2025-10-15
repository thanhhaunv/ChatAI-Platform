# 🧪 05-testing - Tài liệu Testing & QA

> **Mục đích:** Đảm bảo chất lượng phần mềm qua testing toàn diện  
> **Người phụ trách:** QA Lead / QA Tester  
> **Timeline:** Liên tục trong suốt dự án (test mỗi milestone)

---

## 📝 DANH SÁCH FILES (3 files)

| # | File | Owner | Time | Priority | Update Frequency |
|---|------|-------|------|----------|------------------|
| 1 | 01-Test-Plan.md | QA Lead | 3-4 days | 🔴 Critical | Phase start |
| 2 | 02-Test-Cases.md | QA Team | 5-7 days | 🔴 Critical | Per milestone |
| 3 | 03-QA-Checklist.md | QA Lead | 1-2 days | 🟠 High | Weekly |

**Total:** 9-13 days initial + ongoing updates

---

## 📋 CHI TIẾT FILES

### **File 1: 01-Test-Plan.md** ✅ ĐÃ CÓ TEMPLATE
**Nội dung:** Chiến lược testing tổng thể cho toàn dự án

**Sections bắt buộc:**
1. Introduction
   - Purpose: Ensure quality for US-001 to US-010
   - Scope: Unit, Integration, E2E, Load, Security
   - Coverage target: >70%
2. Test Strategy
   - Approach: Risk-based, pyramid (60% unit, 20% integration, 20% E2E)
   - Test types: Unit, Integration, E2E, Load, Security, Accessibility
   - Environments: Dev, Staging, Production-like
3. Test Types Detail
   - **Unit:** Functions/classes (Jest/Pytest)
   - **Integration:** API flows (Postman/Supertest)
   - **E2E:** User flows (Cypress for web, Detox for mobile)
   - **Load:** 10K concurrent users (Artillery)
   - **Security:** OWASP ZAP, Snyk
   - **Accessibility:** WCAG 2.1 AA (Lighthouse)
4. Tools & Setup
   - Jest, Cypress, Detox, Artillery, OWASP ZAP, Snyk
   - CI integration (GitHub Actions)
   - Reporting: Allure, Slack notifications
5. Test Schedule (Per Phase)
   - Phase 1: Unit tests per milestone
   - Phase 2: Integration + E2E tests
   - Phase 3: Load + Security tests
   - Phase 4: Full regression + UAT
6. Entry/Exit Criteria
   - Entry: Milestone code complete + reviewed
   - Exit: 95% tests pass, no critical bugs, coverage >70%
7. Defect Management
   - Jira bug tracking (Critical/High/Medium/Low)
   - MTTR <24h for critical bugs
8. Test Metrics
   - Test coverage %
   - Pass/Fail rate
   - Bug density
   - Test execution time

**Checklist:**
- [ ] All test types defined với tools
- [ ] Test pyramid strategy clear (60-20-20)
- [ ] Schedule mapped to milestones
- [ ] Entry/exit criteria measurable
- [ ] Defect workflow documented
- [ ] Metrics dashboard setup

**Status:** ✅ Template có, cần customize cho project

---

### **File 2: 02-Test-Cases.md** ⏳ TO DO
**Nội dung:** Chi tiết test cases cho tất cả features

**Cấu trúc mỗi Test Suite:**
```markdown
### Test Suite: [Feature Name] (US-XXX)

**Priority:** 🔴 Critical / 🟠 High / 🟢 Low
**Type:** Unit / Integration / E2E
**Owner:** [QA name]

#### TC-XXX: [Test Case Title]
**Description:** What this test validates
**Preconditions:** 
- User logged in
- Database has test data
**Steps:**
1. Navigate to [page]
2. Click [button]
3. Enter [data]
4. Submit form
**Expected Result:** [What should happen]
**Actual Result:** [Fill during execution]
**Status:** ✅ Pass / ❌ Fail / ⏸️ Blocked
**Priority:** P0 (Critical) / P1 (High) / P2 (Medium) / P3 (Low)
**Automated:** Yes / No
**Related:** FR-XXX, US-XXX
```

**Test Suites cần có (10 suites từ US-001 to US-010):**

1. **Authentication (US-001)** - 15-20 test cases
   - TC-001: Signup with email
   - TC-002: Signup with phone
   - TC-003: Login with email/password
   - TC-004: Login with Google OAuth
   - TC-005: Login with Facebook OAuth
   - TC-006: Invalid credentials
   - TC-007: Token expiry & refresh
   - ...

2. **Chat - Text (US-002)** - 20-25 test cases
   - TC-021: Send message to GPT
   - TC-022: Send message to Gemini
   - TC-023: Receive streaming response
   - TC-024: Message saved to DB
   - TC-025: Context maintained in thread
   - TC-026: Rate limiting
   - TC-027: Agent timeout handling
   - ...

3. **Voice Chat (US-003)** - 10-15 test cases
   - TC-041: Record voice input
   - TC-042: STT transcription accuracy
   - TC-043: TTS playback
   - TC-044: Voice + context
   - ...

4. **File Upload (US-004)** - 10-15 test cases
   - TC-061: Upload PDF
   - TC-062: Upload image
   - TC-063: Extract text from PDF
   - TC-064: File size limit (10MB)
   - ...

5. **Project Management (US-005)** - 15-20 test cases
   - TC-081: Create project
   - TC-082: Invite member
   - TC-083: RBAC - Owner permissions
   - TC-084: RBAC - Viewer permissions
   - ...

6. **Agent Management (US-006)** - 15-20 test cases
   - TC-101: Create external agent
   - TC-102: Test agent connection
   - TC-103: Deploy self-hosted agent
   - TC-104: Delete agent (admin only)
   - ...

7. **Billing (US-007)** - 10-15 test cases
   - TC-121: Log token usage
   - TC-122: Generate report
   - TC-123: Export CSV
   - TC-124: Filter by date range
   - ...

8. **Self-hosted Deploy (US-008)** - 10-15 test cases
   - TC-141: Deploy Docker container
   - TC-142: Health check
   - TC-143: Start/Stop agent
   - ...

9. **Thread Management (US-009)** - 15-20 test cases
   - TC-161: Create thread
   - TC-162: Rename thread
   - TC-163: Archive thread
   - TC-164: Search threads
   - ...

10. **ML Training (US-010)** - 10-15 test cases
    - TC-181: Upload model from Hugging Face
    - TC-182: Start training
    - TC-183: Monitor progress
    - TC-184: Deploy trained model
    - ...

**Total Test Cases:** ~150-200 cases

**Test Case Template (Copy-paste):**
```markdown
#### TC-XXX: [Title]
**Description:** 
**Preconditions:** 
**Steps:**
1. 
**Expected:** 
**Status:** ⏳ Not Run
**Priority:** P0
**Automated:** No
**Related:** US-XXX
```

**Checklist:**
- [ ] 10 test suites created (1 per user story)
- [ ] 150+ test cases documented
- [ ] Each case có: Steps, Expected, Priority
- [ ] P0/P1 cases automated (>80%)
- [ ] Traceability: TC → US → FR
- [ ] Reviewed by Dev Team + QA Lead

**Status:** ⏳ To Do (create as milestones progress)

---

### **File 3: 03-QA-Checklist.md** ⏳ TO DO
**Nội dung:** Checklist nhanh cho QA sign-off mỗi milestone

**Sections bắt buộc:**
1. Introduction
   - Purpose: Quick QA verification before milestone sign-off
   - Usage: QA Lead checks all items, signs off if all ✅

2. General Checklist (Apply to all milestones)
   ```markdown
   - [ ] All P0/P1 test cases executed & passed
   - [ ] No critical bugs (P0) open
   - [ ] No high bugs (P1) open >3 days
   - [ ] Code coverage >70% (check CI report)
   - [ ] Security scan clean (Snyk no critical/high)
   - [ ] Performance acceptable (response time <2s)
   - [ ] Documentation updated (API docs, user guide)
   - [ ] Demo successful (PO approved)
   ```

3. Milestone-Specific Checklists

   **M1: Database Setup**
   - [ ] 8 tables created successfully
   - [ ] Migrations reversible (up + down)
   - [ ] Seed data script works
   - [ ] Indexes created as per ERD
   - [ ] Foreign keys enforced
   - [ ] Connection pooling configured

   **M2: Auth Service**
   - [ ] Email/Phone signup works
   - [ ] Login with email/password works
   - [ ] Google OAuth flow works
   - [ ] Facebook OAuth flow works
   - [ ] TikTok OAuth flow works
   - [ ] JWT tokens generated correctly
   - [ ] Token refresh works
   - [ ] Logout clears session

   **M3: User/Project Service**
   - [ ] User CRUD endpoints work
   - [ ] Project CRUD endpoints work
   - [ ] Invite member works
   - [ ] RBAC enforced (owner/member/viewer)
   - [ ] Thread operations work
   - [ ] Soft delete works

   **M4: API Gateway**
   - [ ] Rate limiting works (100 req/min)
   - [ ] JWT validation works
   - [ ] Proxy to services works
   - [ ] CORS configured correctly
   - [ ] Swagger docs accessible

   **M5: Chat Service**
   - [ ] Send message to external agent works
   - [ ] Streaming response works
   - [ ] Context maintained in threads
   - [ ] Token usage logged
   - [ ] Timeout handling works

   **M6: WebSocket + Billing**
   - [ ] Real-time chat works
   - [ ] Notifications delivered
   - [ ] Billing log accurate
   - [ ] Report generation works
   - [ ] CSV export works

   **M7: Frontend Web**
   - [ ] Login page responsive
   - [ ] Chat interface works
   - [ ] File upload works
   - [ ] Voice recording works
   - [ ] Cross-browser tested (Chrome, Safari, Firefox)

   **M8: Voice & File**
   - [ ] STT accuracy >90%
   - [ ] TTS playback works
   - [ ] PDF extraction works
   - [ ] Image upload works

   **M9: Agent Management**
   - [ ] Create agent works
   - [ ] Test connection works
   - [ ] Deploy self-hosted works
   - [ ] Docker container starts

   **M10: Billing Report + Mobile**
   - [ ] Full billing report accurate
   - [ ] Mobile app builds (iOS + Android)
   - [ ] Mobile login works
   - [ ] Mobile chat works

   **M11: Self-hosted Deploy**
   - [ ] Deploy agent to K8s works
   - [ ] Health checks work
   - [ ] Start/Stop works
   - [ ] Logs accessible

   **M12: ML Training**
   - [ ] Model training completes
   - [ ] Training progress tracked
   - [ ] Trained model deployed
   - [ ] Model responds correctly

   **M13: Deployment**
   - [ ] K8s cluster stable
   - [ ] All services healthy
   - [ ] Monitoring dashboards work
   - [ ] Alerts configured

   **M14: Hardening**
   - [ ] Security audit passed (OWASP clean)
   - [ ] Load test passed (10K users)
   - [ ] E2E tests all pass
   - [ ] Documentation complete

4. Pre-Release Checklist (Week 22 - Beta Launch)
   ```markdown
   - [ ] All 14 milestones QA signed off
   - [ ] 95%+ tests passing
   - [ ] Zero P0/P1 bugs open
   - [ ] Performance benchmarks met (<2s, 99.5% uptime)
   - [ ] Security audit clean
   - [ ] User acceptance testing (UAT) passed
   - [ ] Documentation reviewed by stakeholders
   - [ ] Training materials ready
   - [ ] Rollback plan tested
   - [ ] Monitoring & alerts configured
   - [ ] Beta users onboarded (10-20 users)
   - [ ] Support channels ready (Slack, email)
   ```

**Checklist:**
- [ ] General checklist applicable to all milestones
- [ ] 14 milestone-specific checklists
- [ ] Pre-release checklist comprehensive
- [ ] Sign-off format: [ ] → [x] + Date + QA name
- [ ] Integrated with Jira (custom field or comment)

**Status:** ⏳ To Do (create during Phase 1)

---

## ✅ WORKFLOW

```
Phase 0:
  Step 1: QA Lead writes Test Plan
          ↓
Phase 1-3 (Per Milestone):
  Step 2: QA writes Test Cases for milestone
  Step 3: Dev completes milestone
  Step 4: QA executes tests
  Step 5: QA checks milestone checklist
  Step 6: QA signs off OR reports bugs
          ↓
Phase 4:
  Step 7: Full regression testing
  Step 8: Pre-release checklist
  Step 9: Beta user testing
  Step 10: Final QA sign-off
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Test Plan | QA Lead | PM | Tech Lead, Dev Lead | QA Team |
| Test Cases | QA Team | QA Lead | Developers | PM |
| QA Checklist | QA Lead | QA Lead | PM | All Team |
| Test Execution | QA Team | QA Lead | - | Dev Team |
| Bug Reporting | QA Team | QA Lead | Dev Lead | PM |
| Sign-off | QA Lead | PM | PO | Stakeholders |

---

## 📊 PROGRESS

**Overall:** 🟡 30% Complete (1/3 files partial)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-Test-Plan.md | 🟡 Partial | 50% | Need customize for project |
| 02-Test-Cases.md | ⏳ To Do | 0% | Waiting for milestones |
| 03-QA-Checklist.md | ⏳ To Do | 0% | Waiting for Test Plan |

**Next Action:** Customize Test Plan, then create Test Cases for M1-M2

---

## 🔄 TESTING SCHEDULE

**Weekly:**
- Execute new test cases for current milestone
- Regression test previous milestones (smoke tests)
- Update test case status in 02-Test-Cases.md

**Per Milestone:**
- Write test cases for upcoming milestone
- Execute all test cases for completed milestone
- Fill QA Checklist for milestone
- Sign-off or report bugs

**End of Phase:**
- Full regression testing
- Update Test Plan with lessons learned
- Update test automation coverage

**Pre-Release (Week 20-22):**
- Full E2E regression (all 150+ cases)
- Load testing (10K users)
- Security testing (OWASP + penetration test)
- UAT with beta users
- Pre-release checklist sign-off

---

## 📈 TEST METRICS

**Track in weekly reports:**
- **Test Coverage:** Current % (Goal: >70%)
- **Test Execution:** Pass/Fail/Blocked count
- **Defect Metrics:**
  - Total bugs: Open vs Closed
  - By severity: P0/P1/P2/P3
  - By module: Auth, Chat, Billing, etc.
  - MTTR: Mean Time To Resolve (Goal: <24h for P0)
- **Automation:** % of tests automated (Goal: >80% for P0/P1)
- **Test Velocity:** Tests executed per week

**Dashboard:** Grafana/Jira dashboard với charts

---

## 💡 TIPS CHO QA

### **Writing Test Cases:**
- Be specific: "Click Save button" not "Save the form"
- Include expected results: "User redirected to dashboard"
- Priority: P0 (blocker) > P1 (critical) > P2 (major) > P3 (minor)
- Automate P0/P1 first

### **Executing Tests:**
- Follow test cases exactly (reproducibility)
- Take screenshots for bugs
- Log actual results even if pass
- Retest after bug fix

### **Bug Reporting:**
- Title: Clear & concise (e.g., "Login fails with valid Google OAuth")
- Steps to reproduce: Detailed (dev must reproduce)
- Environment: Browser/OS/Version
- Severity: P0 (prod down) → P3 (cosmetic)
- Attach: Screenshots, logs, videos

### **Automation:**
- Start with smoke tests (happy paths)
- Use Page Object Model (Cypress/Detox)
- Run in CI (fail build if tests fail)
- Maintain: Update tests when features change

---

## 🔗 THAM CHIẾU

**Internal:**
- [User Stories](../01-requirements/03-User-Stories.md) - Test against US-001 to US-010
- [API Specification](../02-architecture/05-API-Specification.yaml) - API test cases
- [Sprint Backlog](../03-project-management/03-Sprint-Backlog.md) - Acceptance criteria

**External:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

**Tools:**
- Jira: https://thanhhaunv.atlassian.net
- Test Reports: Allure/HTML reports in CI artifacts

---

**Last Updated:** October 15, 2025  
**Maintained by:** QA Lead  
**Questions?** Contact qa-lead@chatai.com
