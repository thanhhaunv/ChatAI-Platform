# 📊 03-project-management - Tài liệu Quản lý Dự án

> **Mục đích:** Lập kế hoạch, theo dõi tiến độ, phân công trách nhiệm  
> **Người phụ trách:** Project Manager (PM)  
> **Timeline:** Liên tục cập nhật trong suốt dự án (22 tuần)

---

## 📝 DANH SÁCH FILES (4 files)

| # | File | Owner | Time | Priority | Update Frequency |
|---|------|-------|------|----------|------------------|
| 1 | 01-Roadmap.md | PM | 3-4 days | 🔴 Critical | Weekly |
| 2 | 02-RACI-Matrix.md | PM | 1-2 days | 🟠 High | When team changes |
| 3 | 03-Sprint-Backlog.md | PM + Dev Lead | 5-7 days | 🔴 Critical | Daily/Sprint |
| 4 | 04-Deliverables.md | PM | 2-3 days | 🟠 High | End of each phase |

**Total:** 11-16 days initial setup + ongoing maintenance

---

## 📋 CHI TIẾT FILES

### **File 1: 01-Roadmap.md** ✅ ĐÃ CÓ
**Nội dung:** Timeline 22 tuần với 14 milestones

**Sections bắt buộc:**
1. Executive Summary (duration, team, milestones, phases)
2. Phase 0: Pre-Start (3-4 days setup)
3. Phase 1: Backend Core (8 weeks, M1-M7)
4. Phase 2: Advanced Features (6 weeks, M8-M11)
5. Phase 3: Deployment & ML (4 weeks, M12-M13)
6. Phase 4: Hardening & Beta (4 weeks, M14 + buffer)
7. Weekly Breakdown Calendar
8. Team Allocation (6 người)
9. Metrics & KPIs
10. Final Deliverables
11. Success Criteria
12. Risk Management
13. Sprint Ceremonies

**Checklist:**
- [ ] 22 tuần timeline rõ ràng
- [ ] 14 milestones với deliverables cụ thể
- [ ] Team allocation 6 người phân công hợp lý
- [ ] Dependencies giữa milestones documented
- [ ] Buffer time 4 tuần included
- [ ] Risk mitigation strategies
- [ ] Updated weekly (progress tracking)

**Status:** ✅ Đã hoàn thành (file PART1-ROADMAP.md)

---

### **File 2: 02-RACI-Matrix.md** ✅ ĐÃ CÓ TEMPLATE
**Nội dung:** Ma trận trách nhiệm (Responsible, Accountable, Consulted, Informed)

**Sections bắt buộc:**
1. Introduction (purpose, roles definition)
2. Team Roles (PM, PO/BA, Tech Lead, Backend Dev, Frontend Dev, DevOps, ML Engineer, QA, Stakeholders)
3. RACI Matrix Table
   - Rows: Activities/Milestones (Phase 0-4, M1-M14)
   - Columns: Roles (9 columns)
   - Cells: R/A/C/I
4. Escalation Path
5. Communication Protocol

**Template matrix:**
| Activity | PM | PO/BA | Dev Lead | Backend | Frontend | DevOps | ML | QA | Stakeholders |
|----------|----|----|---------|---------|----------|--------|----|----|--------------|
| M1: DB Setup | A | I | C | I | I | R | I | I | I |
| M2: Auth | A | C | R | R | I | C | I | I | C |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

**Checklist:**
- [ ] All 14 milestones có RACI
- [ ] All 9 roles defined
- [ ] No activity có >1 Accountable
- [ ] Every activity có ít nhất 1 Responsible
- [ ] Escalation path documented
- [ ] Updated when team changes

**Status:** ⏳ Cần expand từ template hiện tại

---

### **File 3: 03-Sprint-Backlog.md** ✅ ĐÃ CÓ (M1-M4)
**Nội dung:** Chi tiết tasks/subtasks cho 14 milestones

**Cấu trúc mỗi Milestone:**
```markdown
### Milestone X: [Title]

**Prerequisites/Assumptions:**
- [What needs to be ready]

**Story X-1: [Title]**
- Reference/Mục đích: [Link to US/FR]
- Acceptance Criteria: [Given-When-Then]
- Risk Mitigation: [Risks → Mitigations]
- Sub-tasks:
  1. [Task 1] (Xh estimate)
  2. [Task 2] (Xh estimate)
- Test Criteria: [How to verify]
- Sample Artifacts: [Code/Config examples]
- Feedback Loop: [How to report progress]

**Story X-2: [Title]**
[Same structure...]

**Dependencies:** [What milestones must complete first]
**Deliverable:** [What is produced]
**Total Estimate:** Xh (~X days)
**Jira Integration:** [Link to Epic/Stories]
```

**Checklist mỗi Milestone:**
- [ ] Prerequisites clearly stated
- [ ] 3-5 Stories per milestone
- [ ] Each story có Given-When-Then acceptance criteria
- [ ] Each story có risk mitigation
- [ ] Each story có sample artifacts (Postman, SQL, code snippets)
- [ ] Test criteria specific & testable
- [ ] Time estimates realistic (hours or story points)
- [ ] Dependencies documented
- [ ] Deliverable clear
- [ ] Jira tickets created & linked

**Current Status:**
- ✅ M1-M4: Hoàn thành chi tiết
- ⏳ M5-M14: Cần bổ sung (format tương tự M1-M4)

**Total:** ~150-200 stories across 14 milestones

---

### **File 4: 04-Deliverables.md** ✅ ĐÃ CÓ OUTLINE
**Nội dung:** Sản phẩm bàn giao cuối dự án

**Sections bắt buộc:**
1. Introduction
2. Code Deliverables
   - Backend: 8 microservices (NestJS + Python)
   - Frontend: Web app (Next.js), Mobile app (React Native)
   - Infrastructure: Docker, K8s manifests, Terraform
   - Total LOC estimate: ~20,000 lines
3. Documentation Deliverables
   - BRD, SRS, User Stories
   - System Architecture, ERD, Diagrams
   - API Specification (OpenAPI YAML)
   - User Manual, Admin Guide
4. Testing Deliverables
   - Test Plan
   - Test Cases (unit, integration, E2E)
   - Test Reports (coverage >70%)
5. Infrastructure Deliverables
   - K8s cluster configured
   - CI/CD pipelines (GitHub Actions)
   - Monitoring setup (Prometheus, Grafana)
6. Training Deliverables
   - Developer onboarding guide
   - User training materials
   - Admin training videos (optional)
7. Acceptance Criteria
   - Functional: All US-001 to US-010 complete
   - Technical: Performance, security, uptime met
   - Business: ROI targets, beta users onboarded

**Checklist:**
- [ ] Code: All repos listed với URLs
- [ ] Docs: All 35 files complete
- [ ] Tests: >70% coverage achieved
- [ ] Infra: K8s cluster deployed & stable
- [ ] Training: Materials reviewed by stakeholders
- [ ] Acceptance: Signed off by Product Owner
- [ ] Handover: Knowledge transfer complete

**Timeline:** Week 21-22 (final documentation & handover)

---

## ✅ WORKFLOW

```
Week 0: PM creates Roadmap + RACI Matrix
        ↓
Week 1-22: PM + Dev Lead maintain Sprint Backlog daily
        ↓ (update after each sprint)
Week 19-22: PM prepares Deliverables doc
        ↓
Week 22: Final review → Stakeholder sign-off
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Roadmap | PM | PM | Tech Lead, PO | All Team |
| RACI Matrix | PM | PM | Tech Lead | All Team |
| Sprint Backlog | Dev Lead | PM | Team Leads | All Devs |
| Deliverables | PM | PM | Tech Lead, PO | Stakeholders |

---

## 📊 PROGRESS

**Overall:** 🟡 50% Complete (2/4 files done)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-Roadmap.md | ✅ Done | 100% | None |
| 02-RACI-Matrix.md | 🟡 Partial | 30% | Need M5-M14 activities |
| 03-Sprint-Backlog.md | 🟡 Partial | 30% | Need M5-M14 stories |
| 04-Deliverables.md | 🟡 Partial | 40% | Need final metrics |

**Next Action:** Expand Sprint Backlog M5-M14 as milestones approach

---

## 🔄 UPDATE SCHEDULE

**Daily:**
- Sprint Backlog: Update task status (To Do → In Progress → Done)
- Burndown tracking in Jira

**Weekly:**
- Roadmap: Update progress % for each milestone
- Risk register: Review & update mitigation status

**End of Sprint (Bi-weekly):**
- Sprint retrospective: Lessons learned
- Sprint planning: Next 2-week tasks
- Update velocity metrics

**End of Phase:**
- Phase review & demo
- Update Deliverables status
- Stakeholder communication

---

## 💡 TIPS CHO PM

### **Roadmap:**
- Buffer time critical (4 weeks included)
- Dependencies máu chó - track carefully
- Weekly updates prevent surprises

### **RACI:**
- Only 1 Accountable per activity
- Consult before, Inform after
- Update when team members change

### **Sprint Backlog:**
- Break stories nhỏ (<8 story points)
- Sample artifacts = lifesaver cho devs
- Test criteria phải testable, không vague

### **Deliverables:**
- Start tracking từ Week 1, không đợi cuối
- Screenshots/videos cho demos
- Sign-off formal (không email, phải document)

---

## 🔗 THAM CHIẾU

**Input Documents:**
- [BRD](../01-requirements/01-BRD.md) - Business requirements
- [SRS](../01-requirements/02-SRS.md) - Technical requirements
- [User Stories](../01-requirements/03-User-Stories.md) - US-001 to US-010

**Output Documents:**
- Sprint Backlog → Jira tickets
- Roadmap → Gantt chart (export)
- Deliverables → Handover package

**Tools:**
- Jira: https://thanhhaunv.atlassian.net
- GitHub: https://github.com/thanhhaunv/ChatAI-Platform
- Slack: #chatai-platform

---

**Last Updated:** October 15, 2025  
**Maintained by:** PM (thanhhaunv)  
**Questions?** Contact thanhhaunv@example.com
