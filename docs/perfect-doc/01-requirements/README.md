# 📋 01-requirements - Tài liệu Yêu cầu Nghiệp vụ

> **Mục đích:** Định nghĩa WHAT cần xây dựng (không phải HOW)  
> **Người phụ trách:** Business Analyst (BA) / Product Owner (PO)  
> **Độ ưu tiên:** 🔴 Critical - Phải hoàn thành trước khi code

---

## 📊 TỔNG QUAN FOLDER

Folder này chứa các tài liệu định nghĩa yêu cầu từ góc nhìn nghiệp vụ và người dùng. Đây là "nguồn sự thật" (source of truth) cho toàn bộ dự án.

**Input:** Stakeholder meetings, user research, market analysis  
**Output:** 3 documents chuẩn hóa  
**Timeline:** 2-3 tuần trong Phase 0

---

## 📝 DANH SÁCH FILES (3/3)

| # | File | Status | Owner | Estimated Time | Priority |
|---|------|--------|-------|----------------|----------|
| 1 | **01-BRD.md** | ✅ Completed | BA/PO | 3-5 days | 🔴 Critical |
| 2 | **02-SRS.md** | ⏳ To Do | BA/Tech Lead | 4-6 days | 🔴 Critical |
| 3 | **03-User-Stories.md** | ⏳ To Do | PO/BA | 2-3 days | 🟠 High |

**Total estimated:** 9-14 days (với 1 BA full-time)

---

## 🎯 CHI TIẾT TỪNG FILE

### **File 1: 01-BRD.md** ✅ COMPLETED

**Business Requirements Document - Tài liệu Yêu cầu Nghiệp vụ**

#### **Mục đích:**
Trả lời câu hỏi "WHY" - Tại sao cần dự án này? Giá trị kinh doanh là gì?

#### **Sections bắt buộc (12 sections):**

```markdown
1. Tóm tắt điều hành
   - Mục tiêu tổng quan (2-3 paragraphs)
   - Giá trị kinh doanh (business value bullets)
   - Bối cảnh dự án (problem statement)

2. Mục tiêu dự án
   - Primary goals (5 goals chính)
   - Secondary goals (optional features)

3. Stakeholders
   - Bảng stakeholders chi tiết (11+ roles)
   - Communication plan (frequency, method, content)

4. Yêu cầu high-level
   4.1 Functional Requirements (FR-001 đến FR-013)
       - Mỗi FR phải có: ID, Priority, Description, Business Rules, Business Value
   4.2 Non-Functional Requirements (NFR-001 đến NFR-006)
       - Performance, Security, Observability, Privacy, Usability, DevOps

5. Phạm vi dự án
   - In Scope (✅)
   - Out of Scope (❌)
   - Future Enhancements (Phase 2, Phase 3)

6. Tiêu chí thành công
   - Functional success criteria
   - Technical success criteria
   - Business success criteria (ROI, break-even)
   - User success criteria

7. Giả định và ràng buộc
   - Assumptions (team, infrastructure, users, third-party)
   - Constraints (timeline, budget, technology, compliance, resources)
   - Dependencies (external, internal)

8. Business Case & Financial Analysis ⭐ CRITICAL
   - Cost breakdown (personnel, infrastructure, tools, contingency)
   - Revenue projections (pricing tiers, user forecast)
   - ROI analysis (break-even, NPV, payback period)
   - Financial risks & mitigation
   - Conclusion with recommendation

9. Phê duyệt
   - Approval table (6+ signatories với roles)
   - Change Request process (template included)
   - Document maintenance rules

10. Lịch sử tài liệu
    - Version table (version, date, author, changes, status)

11. Phụ lục
    - Glossary (thuật ngữ Việt + English + definition)
    - Acronyms
    - References (external docs, internal links)
    - Templates & Forms
    - Contact information

12. Appendix (if needed)
    - Financial calculations detail
    - Sensitivity analysis
```

#### **Checklist hoàn thành BRD:**
- [ ] Executive summary dưới 1 trang
- [ ] Business Case có đủ: Cost, Revenue, ROI, Break-even
- [ ] 13 FR + 6 NFR được list đầy đủ với IDs
- [ ] Stakeholder table có đủ 11+ roles với contact
- [ ] Success criteria có 4 loại (Functional/Technical/Business/User)
- [ ] Scope rõ ràng (In/Out/Future)
- [ ] Approval table có 6 chữ ký
- [ ] Glossary có ít nhất 10 terms
- [ ] References link đến 02-SRS.md và 03-User-Stories.md
- [ ] Version history updated
- [ ] Reviewed by PM + Stakeholders
- [ ] **Approved và signed off**

#### **Output example:**
- Xem: `01-BRD.md` (file đã hoàn thành)
- Length: ~25 pages / 8,500 words
- Format: 100% tiếng Việt, professional enterprise-grade

---

### **File 2: 02-SRS.md** ⏳ TO DO

**Software Requirements Specification - Đặc tả Yêu cầu Phần mềm**

#### **Mục đích:**
Trả lời câu hỏi "WHAT" - Hệ thống phải làm gì? (chi tiết technical hơn BRD)

#### **Sections bắt buộc (10 sections):**

```markdown
1. Introduction
   - Purpose of SRS
   - Scope (tham chiếu BRD)
   - Definitions & Acronyms (từ BRD)
   - References (BRD, User Stories, Architecture)
   - Overview of document

2. Overall Description
   - Product perspective (context diagram)
   - Product functions (high-level features từ BRD)
   - User classes & characteristics
     - Admin: Full access
     - Owner: Manage projects
     - Member: Use features
     - Viewer: Read-only
   - Operating environment
     - Client: Web (Chrome 90+, Safari 14+), Mobile (iOS 14+, Android 10+)
     - Server: Kubernetes, Docker
     - Database: PostgreSQL 15, Redis
   - Design & implementation constraints (từ BRD Section 7.2)
   - Assumptions & dependencies (từ BRD Section 7.1, 7.3)

3. System Features (Detail từ BRD FR-001 đến FR-013)
   Mỗi feature phải có:
   - Feature ID (SF-001 map với FR-001)
   - Description
   - Functional requirements (chi tiết technical)
   - Input/Output specifications
   - Processing rules
   - Error handling

   3.1 Authentication & Authorization (SF-001, SF-002)
   3.2 Chat Interface (SF-003, SF-004)
   3.3 Project & Thread Management (SF-005, SF-006, SF-007)
   3.4 Agent Management (SF-008, SF-009)
   3.5 Billing & Reporting (SF-010, SF-011)
   3.6 ML Training Pipeline (SF-012, SF-013)

4. External Interface Requirements
   4.1 User Interfaces
       - Screen layouts (reference wireframes)
       - UI standards (responsive, accessibility)
   4.2 Hardware Interfaces
       - Microphone (voice input)
       - Camera (future - video)
   4.3 Software Interfaces
       - OpenAI API (GPT models)
       - Google Gemini API
       - Grok API
       - Hugging Face Hub
       - OAuth providers (Google, Facebook, TikTok)
   4.4 Communications Interfaces
       - HTTPS/TLS 1.3
       - WebSocket (streaming)
       - REST APIs (JSON)

5. Non-Functional Requirements (Detail từ BRD NFR-001 đến NFR-006)
   5.1 Performance Requirements
       - Response time: <2s median, <10s 95th percentile
       - Throughput: 1000 req/s
       - Capacity: 10K concurrent users
   5.2 Security Requirements
       - Authentication: OAuth2 + JWT
       - Authorization: RBAC
       - Encryption: AES-256 at rest, TLS 1.3 in transit
       - OWASP Top 10 compliance
   5.3 Reliability Requirements
       - Availability: 99.5% uptime
       - MTBF, MTTR targets
       - Backup & recovery (RPO, RTO)
   5.4 Scalability Requirements
       - Horizontal scaling
       - Auto-scaling triggers
   5.5 Maintainability Requirements
       - Code coverage >70%
       - Documentation standards
   5.6 Portability Requirements
       - Cross-platform (Web, iOS, Android)
       - Browser compatibility

6. Data Requirements
   - Database schema (reference ERD)
   - Data retention policies (1 year, GDPR)
   - Data migration requirements
   - Backup requirements (daily, 30 days retention)

7. Quality Attributes
   - Usability: WCAG 2.1 AA, <2 min onboarding
   - Testability: >70% coverage, automated tests
   - Interoperability: REST APIs, standard protocols
   - Compliance: GDPR, OWASP

8. Other Requirements
   - Legal requirements (Privacy Policy, ToS)
   - Localization: Vietnamese, English
   - Installation requirements (K8s deployment)
   - Documentation requirements (user manual, admin guide)

9. Appendix A: User Stories Summary
   - Link to 03-User-Stories.md
   - Brief summary of US-001 đến US-010

10. Appendix B: Analysis Models
    - Use Case Diagram (high-level)
    - Context Diagram
    - ER Diagram (reference)
```

#### **Checklist hoàn thành SRS:**
- [ ] Mỗi BRD FR có tương ứng SF (System Feature) chi tiết
- [ ] External interfaces đầy đủ (UI, Hardware, Software, Comms)
- [ ] NFRs có metrics cụ thể (numbers, not vague)
- [ ] Data requirements reference ERD
- [ ] Quality attributes có acceptance criteria
- [ ] Appendix link đến User Stories và diagrams
- [ ] Reviewed by Tech Lead + Dev Team
- [ ] Traceability matrix: BRD FR ↔ SRS SF ↔ User Stories
- [ ] Cross-referenced với Architecture docs
- [ ] Version controlled (Git)

#### **Input cần:**
- ✅ 01-BRD.md (completed)
- Database ERD (từ 02-architecture/02-Database-Design-ERD.md)
- System diagrams (từ 02-architecture/03-System-Diagrams.md)

#### **Output:**
- Length: ~30-40 pages
- Format: Technical, tiếng Việt + English terms
- Audience: Developers, Tech Leads, QA

---

### **File 3: 03-User-Stories.md** ⏳ TO DO

**User Stories - Chi tiết các câu chuyện người dùng**

#### **Mục đích:**
Trả lời câu hỏi "WHO + WHAT + WHY" - Ai cần gì và tại sao?

#### **Sections bắt buộc (4 sections):**

```markdown
1. Introduction
   - Purpose: Translate BRD/SRS thành user-centric stories
   - Format: As a [role], I want [feature], so that [benefit]
   - Scope: 10 User Stories (US-001 đến US-010)
   - Priority: Must Have / Should Have / Nice to Have

2. User Stories Detail (10 stories)

   Mỗi story phải có cấu trúc:
   
   ### US-XXX: [Title]
   
   **Priority:** 🔴 Must Have / 🟠 Should Have / 🟢 Nice to Have
   **Epic:** [Epic name từ Jira]
   **Story Points:** [Estimate: 1, 2, 3, 5, 8, 13]
   
   **As a** [user role],  
   **I want** [feature/capability],  
   **So that** [business value/benefit].
   
   **Acceptance Criteria (Given-When-Then):**
   1. **Given** [precondition],  
      **When** [action],  
      **Then** [expected result].
   2. [More criteria...]
   
   **Technical Notes:**
   - API endpoints: [list]
   - Database tables: [list]
   - External dependencies: [list]
   
   **Definition of Done (DoD):**
   - [ ] Code implemented and reviewed
   - [ ] Unit tests written (>70% coverage)
   - [ ] Integration tests passing
   - [ ] Documentation updated
   - [ ] Demo to PO approved
   
   **Related:**
   - BRD: FR-XXX
   - SRS: SF-XXX
   - Jira: CAP-XXX

3. User Stories List (Summary Table)

   | ID | Title | Role | Priority | Points | Status | Sprint |
   |----|-------|------|----------|--------|--------|--------|
   | US-001 | Multi-provider Login | User | 🔴 Must | 8 | ✅ Done | Sprint 2 |
   | US-002 | Chat with AI (text) | User | 🔴 Must | 13 | 🔄 In Progress | Sprint 3 |
   | ... | ... | ... | ... | ... | ... | ... |

4. Traceability Matrix

   | User Story | BRD FR | SRS SF | Milestones | Test Cases |
   |------------|--------|--------|------------|------------|
   | US-001 | FR-001, FR-002 | SF-001, SF-002 | M2 | TC-001 to TC-015 |
   | US-002 | FR-003, FR-004 | SF-003, SF-004 | M5 | TC-016 to TC-030 |
   | ... | ... | ... | ... | ... |
```

#### **10 User Stories (từ BRD):**

```
US-001: Đăng ký/Đăng nhập multi-provider (FR-001, FR-002)
US-002: Chat với AI - text (FR-003, FR-004)
US-003: Voice input & TTS output (FR-003)
US-004: Upload file để context (FR-003)
US-005: Tạo/Quản lý Project (FR-005)
US-006: Quản lý AI Agents (Admin) (FR-008, FR-009)
US-007: Thống kê token/cost (FR-010, FR-011)
US-008: Self-hosted agent deploy (FR-009)
US-009: Quản lý conversation threads (FR-006, FR-007)
US-010: Tạo và train AI agent tự build (FR-012, FR-013)
```

#### **Checklist hoàn thành User Stories:**
- [ ] 10 stories với format chuẩn (As a... I want... So that...)
- [ ] Mỗi story có 3-5 acceptance criteria (Given-When-Then)
- [ ] Mỗi story có story points estimate
- [ ] Mỗi story có DoD checklist
- [ ] Mỗi story map với BRD FR và SRS SF
- [ ] Summary table đầy đủ
- [ ] Traceability matrix complete
- [ ] Reviewed by PO + Dev Team
- [ ] Imported vào Jira với correct Epic links

#### **Input cần:**
- ✅ 01-BRD.md (Section 4.1 - FRs)
- ⏳ 02-SRS.md (SFs)
- Sprint Backlog (từ 03-project-management/03-Sprint-Backlog.md)

#### **Output:**
- Length: ~15-20 pages
- Format: User-friendly, story format
- Audience: PO, Dev Team, QA

---

## ✅ WORKFLOW HOÀN THÀNH FOLDER

```
Step 1: BA/PO viết 01-BRD.md (3-5 days)
          ↓ [Approved by Stakeholders]
Step 2: BA + Tech Lead viết 02-SRS.md (4-6 days)
          ↓ [Reviewed by Dev Team]
Step 3: PO viết 03-User-Stories.md (2-3 days)
          ↓ [Imported to Jira]
Step 4: ✅ Folder Complete → Start 02-architecture/
```

---

## 👥 ROLES & RESPONSIBILITIES (RACI)

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| **Write BRD** | BA/PO | PM | Stakeholders, Legal, Finance | Dev Team |
| **Write SRS** | BA + Tech Lead | PM | Senior Devs | All Devs, QA |
| **Write User Stories** | PO | PM | BA, Dev Lead | Dev Team, QA |
| **Review & Approve** | Stakeholders | PM | Legal, Finance | All |

---

## 🔗 THAM CHIẾU

**Đọc trước khi viết:**
- [Project README](../README.md) - Overview toàn dự án
- [Roadmap](../03-project-management/01-Roadmap.md) - Timeline 22 tuần

**Đọc sau khi viết:**
- [System Architecture](../02-architecture/01-System-Architecture.md) - Technical design
- [Sprint Backlog](../03-project-management/03-Sprint-Backlog.md) - Implementation tasks

**External references:**
- [IEEE 830-1998](https://standards.ieee.org/standard/830-1998.html) - SRS Standard
- [User Story Template](https://www.atlassian.com/agile/project-management/user-stories)

---

## 📊 PROGRESS TRACKING

**Overall Folder Status:** 🟡 33% Complete (1/3 files done)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-BRD.md | ✅ Done | 100% | None |
| 02-SRS.md | ⏳ To Do | 0% | Waiting for BRD approval |
| 03-User-Stories.md | ⏳ To Do | 0% | Waiting for SRS |

**Next Action:** Start 02-SRS.md after BRD stakeholder approval

---

## 💡 TIPS CHO NGƯỜI VIẾT

### **Khi viết BRD:**
- Focus vào "WHY" (business value), không đi sâu "HOW" (technical)
- Business Case phải có numbers cụ thể (cost, revenue, ROI)
- Stakeholder table phải đầy đủ contact info
- Success criteria phải measurable (không vague)

### **Khi viết SRS:**
- Focus vào "WHAT" (functional specs), không "HOW" (implementation)
- Mỗi requirement phải testable
- Use cases phải cover normal + exception flows
- Cross-reference với BRD FRs

### **Khi viết User Stories:**
- Focus vào "WHO + WHAT + WHY" (user perspective)
- Acceptance criteria phải clear (Given-When-Then)
- Story points: dùng Fibonacci (1, 2, 3, 5, 8, 13)
- DoD phải realistic (đạt được trong 1 sprint)

---

**Last Updated:** October 15, 2025  
**Maintained by:** BA/PO Team  
**Questions?** Contact PM (thanhhaunv@example.com)
