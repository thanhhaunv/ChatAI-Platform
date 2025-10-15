# 🏗️ 02-architecture - Tài liệu Kiến trúc Hệ thống

> **Mục đích:** Định nghĩa HOW hệ thống được xây dựng  
> **Người phụ trách:** Tech Lead / System Architect  
> **Timeline:** 2-3 tuần trong Phase 0-1

---

## 📝 DANH SÁCH FILES (10 files)

| # | File | Owner | Time | Priority |
|---|------|-------|------|----------|
| 1 | 01-System-Architecture.md | Tech Lead | 3-4 days | 🔴 Critical |
| 2 | 02-Database-Design-ERD.md | Tech Lead/DBA | 2-3 days | 🔴 Critical |
| 3 | 03-System-Diagrams.md | Tech Lead | 3-4 days | 🔴 Critical |
| 4 | 04-Tech-Stack.md | Tech Lead | 1-2 days | 🟠 High |
| 5 | 05-API-Specification.yaml | Backend Lead | 4-5 days | 🔴 Critical |
| 6 | 06-Architecture-Guidelines.md | Tech Lead | 2-3 days | 🔴 Critical |
| 7 | 07-Interface-Contracts/README.md | Tech Lead | 1 day | 🔴 Critical |
| 8 | 07-Interface-Contracts/backend-interfaces.ts | Backend Lead | 1 day | 🔴 Critical |
| 9 | 07-Interface-Contracts/frontend-interfaces.ts | Frontend Lead | 1 day | 🔴 Critical |
| 10 | 07-Interface-Contracts/shared-types.ts | Tech Lead | 1 day | 🔴 Critical |

---

## 📋 CHI TIẾT FILES

### **File 1: 01-System-Architecture.md**
**Nội dung:** Tổng quan kiến trúc hệ thống (C4 Model)

**Sections bắt buộc:**
1. Introduction (purpose, scope, audience)
2. Architecture Goals & Constraints
3. High-Level Architecture (Context Diagram - C4 Level 1)
4. Container Architecture (8 microservices - C4 Level 2)
5. Component Architecture (C4 Level 3)
6. Data Architecture (DB, cache, file storage)
7. Deployment Architecture (K8s)
8. Security Architecture (auth, encryption)
9. Integration Architecture (APIs, message queue)
10. Technology Stack Summary

**Diagrams cần:**
- Context Diagram (users + external systems + platform)
- Container Diagram (8 services + DBs + frontends)
- Component Diagram (ít nhất 2 services chính)
- Data Flow Diagram
- Deployment Diagram (K8s)

**Checklist:**
- [ ] 10 sections đầy đủ
- [ ] Minimum 5 diagrams (Mermaid/PlantUML)
- [ ] Technology choices có justification
- [ ] Cross-ref với 04-Tech-Stack.md
- [ ] Reviewed & approved

---

### **File 2: 02-Database-Design-ERD.md**
**Nội dung:** Entity Relationship Diagram chi tiết

**Sections bắt buộc:**
1. Introduction (DB type: PostgreSQL 15)
2. ERD Overview (Mermaid diagram - 8 tables)
3. Table Definitions (8 tables: USERS, PROJECTS, PROJECT_MEMBERS, CONVERSATIONS, MESSAGES, AGENTS, BILLING_LOG, NOTIFICATIONS)
4. Relationships & Foreign Keys
5. Indexes Strategy
6. Data Types & Constraints
7. Migrations Strategy (TypeORM)
8. Performance Considerations

**Deliverables:**
- [ ] ERD diagram visual
- [ ] SQL CREATE TABLE scripts (8 tables)
- [ ] TypeORM entities reference link
- [ ] Migration files initial schema
- [ ] Seed data scripts

**Checklist:**
- [ ] 8 tables fully defined
- [ ] All FKs with cascade rules
- [ ] Indexes justified
- [ ] Migration strategy documented
- [ ] Reviewed by Backend Devs

---

### **File 3: 03-System-Diagrams.md**
**Nội dung:** Tất cả diagrams chi tiết

**7 loại diagrams bắt buộc:**
1. Use Case Diagram (10 use cases từ US-001 to US-010)
2. Context Diagram (system context)
3. Sequence Diagrams (4 flows: Login OAuth, Chat, File Upload, Deploy Agent)
4. Activity Diagrams (2 processes: Project Creation, Billing Report)
5. Component Diagrams (3 main services internals)
6. Data Flow Diagram
7. Deployment Diagram (K8s architecture)

**Minimum:** 12 diagrams total

**Checklist:**
- [ ] Use Mermaid/PlantUML
- [ ] All diagrams có legend
- [ ] Sequence diagrams cover happy + error paths
- [ ] Exported to PNG/SVG
- [ ] Reviewed by Dev Team

---

### **File 4: 04-Tech-Stack.md**
**Nội dung:** Technology choices với justification

**Sections bắt buộc:**
1. Introduction (decision criteria)
2. Backend Stack (NestJS, Python/FastAPI - with pros/cons/alternatives)
3. Frontend Stack (Next.js, React Native)
4. Database Stack (PostgreSQL, Redis)
5. Infrastructure Stack (Docker, K8s, Terraform, GitHub Actions)
6. Monitoring & Logging (Prometheus, Grafana, ELK)
7. External Services (OpenAI, Gemini, OAuth, S3, Hugging Face)
8. Development Tools (Git, Jira, Slack, ESLint, Jest)

**Checklist:**
- [ ] Each tech có: rationale, alternatives, pros/cons, version
- [ ] Team expertise mentioned
- [ ] Cost implications noted
- [ ] Reviewed by Tech Lead

---

### **File 5: 05-API-Specification.yaml**
**Nội dung:** OpenAPI 3.0 spec cho tất cả REST APIs

**Sections bắt buộc:**
- Info (title, version, description, contact)
- Servers (prod, staging, local)
- Tags (auth, users, projects, chat, agents, billing)
- Paths (all endpoints with request/response)
- Components (schemas, security, parameters, responses)

**Endpoints chính:**
- `/auth/*` - Signup, Login, OAuth
- `/users/*` - User CRUD
- `/projects/*` - Project CRUD
- `/conversations/*` - Chat & messaging
- `/agents/*` - Agent management
- `/billing/*` - Usage reports

**Checklist:**
- [ ] All major endpoints documented
- [ ] Request/Response schemas với examples
- [ ] Security schemes (JWT)
- [ ] Error responses standardized
- [ ] Validated với Swagger Editor
- [ ] Imported to Postman

---

### **File 6: 06-Architecture-Guidelines.md** ⭐
**Nội dung:** Interface-First Development + Design Patterns

**Sections bắt buộc:**
1. Introduction
2. **Interface-First Development** (philosophy, workflow, rules)
3. **Mandatory Design Patterns** (EXPANDED - 8+ patterns)
   
   **3.1 Creational Patterns**
   - **Factory Pattern:** Create agents dynamically (OpenAI, Gemini, Custom)
   - **Singleton Pattern:** Config service, Logger (one instance)
   
   **3.2 Structural Patterns**
   - **Repository Pattern:** Database access abstraction (IUserRepository)
   - **Facade Pattern:** API Gateway simplifies microservices access
   - **Adapter Pattern:** External API wrappers (OpenAI → IAgentStrategy)
   - **Decorator Pattern:** Add features to agents (logging, caching, retry)
   
   **3.3 Behavioral Patterns**
   - **Strategy Pattern:** AI agent implementations (OpenAI vs Gemini vs Custom)
   - **Observer Pattern:** Real-time notifications (WebSocket subscribers)
   - **Chain of Responsibility:** Middleware pipeline (auth → rate-limit → routing)
   - **Command Pattern:** Queue async tasks (billing logs, email notifications)
   
   **Each pattern must have:**
   - Problem it solves
   - UML diagram (Mermaid)
   - TypeScript code example (compilable)
   - When to use / when NOT to use
   - Real use case in project (which service uses it)

4. Service Communication Rules
5. Error Handling Standards
6. Async/Concurrency Patterns
7. **Anti-Patterns** (NEW - What NOT to do)
   - God Object (one class does everything)
   - Circular dependencies
   - Spaghetti code (no clear structure)
   - Hardcoding values
   - Not using interfaces

**Core principle:** Write interfaces BEFORE implementation

**Checklist:**
- [ ] Interface-First explained với examples
- [ ] **8+ design patterns documented** (was 4, now 8+) ⭐
- [ ] Each pattern có: problem, diagram, code example, use case
- [ ] Anti-patterns listed với examples
- [ ] Error hierarchy defined
- [ ] Async patterns với AsyncGenerator
- [ ] TypeScript examples compilable
- [ ] Reviewed by Tech Lead

---

### **Files 7-10: 07-Interface-Contracts/** ⭐⭐⭐
**Nội dung:** Actual TypeScript interfaces

#### **File 7: README.md**
- Purpose, rules, usage examples
- How to use in backend/frontend/testing

#### **File 8: backend-interfaces.ts**
**8 service interfaces:**
- `IAuthService` - signup, login, OAuth, verify, refresh
- `IChatService` - sendMessage, streamMessage, getHistory, optimizeContext
- `IUserService` - findById, update, delete
- `IProjectService` - create, inviteMember, list
- `IAgentService` - create, testConnection, deploy
- `IBillingService` - logUsage, getReport, exportCSV
- `INotificationService` - send, subscribe
- `IMLService` - train, deploy

**Checklist:**
- [ ] All methods có JSDoc
- [ ] Params/Returns clearly typed
- [ ] Throws documented
- [ ] Compiles without errors

#### **File 9: frontend-interfaces.ts**
- `IApiClient` - HTTP methods
- `IAuthStore` - user, login, logout
- `IChatStore` - messages, sendMessage, loadConversation
- `IProjectStore` - projects, create, invite

#### **File 10: shared-types.ts**
**Enums:** OAuthProvider, MemberRole, AgentType, MessageRole  
**Entities:** User, Project, Conversation, Message, Agent  
**DTOs:** SignupDto, LoginDto, SendMessageParams, etc.

**Checklist:**
- [ ] All enums defined
- [ ] All entity types match ERD
- [ ] All DTOs match API spec
- [ ] Exported via index.ts

---

## ✅ WORKFLOW

```
Step 1: Tech Lead thiết kế System Architecture (File 1-3)
Step 2: Tech Lead + Devs define Tech Stack (File 4)
Step 3: Backend Lead viết API Spec (File 5)
Step 4: Tech Lead viết Architecture Guidelines (File 6)
Step 5: Team cùng viết Interface Contracts (Files 7-10)
        ↓
✅ Folder Complete → Start coding Milestone 1
```

---

## 👥 RACI

| File | Responsible | Accountable | Consulted | Informed |
|------|-------------|-------------|-----------|----------|
| 01-04 | Tech Lead | PM | Senior Devs | All Devs |
| 05 | Backend Lead | Tech Lead | Frontend | All |
| 06 | Tech Lead | PM | Architects | All Devs |
| 07-10 | Tech Lead + Leads | PM | All Devs | All |

---

## 📊 PROGRESS

**Status:** 🔴 0% (0/10 files)

**Next:** Start File 1 after BRD/SRS approved

---

**Last Updated:** October 15, 2025  
**Maintained by:** Tech Lead  
**Questions?** Contact thanhhaunv@example.com
