# PART 2: JIRA SETUP GUIDE

**Duration:** 2-3 hours  
**Prerequisites:** Jira account created  
**Goal:** Complete Jira workspace configuration for ChatAI Platform project

---

## 📋 TABLE OF CONTENTS

1. [Jira Account Setup](#1-jira-account-setup)
2. [Project Configuration](#2-project-configuration)
3. [Epic Creation](#3-epic-creation)
4. [Story Creation](#4-story-creation)
5. [Subtasks Breakdown](#5-subtasks-breakdown)
6. [Workflow Configuration](#6-workflow-configuration)
7. [Sprint Planning](#7-sprint-planning)
8. [Integration Setup](#8-integration-setup)
9. [Board Configuration](#9-board-configuration)
10. [Reports Setup](#10-reports-setup)

---

## 1. JIRA ACCOUNT SETUP

### Step 1.1: Create Jira Workspace
1. Go to https://www.atlassian.com/software/jira
2. Click "Get it free"
3. Enter email: `thanhhaunv@gmail.com` (hoặc email của bạn)
4. Choose "Jira Software"
5. Site name: `thanhhaunv` → URL: `thanhhaunv.atlassian.net`

### Step 1.2: Add Team Members
1. Go to **Settings** (⚙️) → **People**
2. Click **Invite people**
3. Add 5 team members:
   - Backend Dev 1: `backend1@example.com`
   - Backend Dev 2: `backend2@example.com`
   - Frontend Dev: `frontend@example.com`
   - DevOps: `devops@example.com`
   - QA/Tester: `qa@example.com`
4. Assign roles:
   - You (PM): **Administrator**
   - All others: **Member**

### Step 1.3: Configure Permissions
1. Go to **Project settings** → **Permissions**
2. Set default scheme: **Software Project Simplified**
3. Verify permissions:
   - Administrators: Full access
   - Members: Create/edit issues, comment, transition

---

## 2. PROJECT CONFIGURATION

### Step 2.1: Create Project
1. Click **Projects** → **Create project**
2. Choose template: **Scrum**
3. Project details:
   - Name: `ChatAI Platform`
   - Key: `CAP` (sẽ dùng cho issue IDs: CAP-1, CAP-2, ...)
   - Project type: **Team-managed**
4. Click **Create**

### Step 2.2: Configure Issue Types
1. Go to **Project settings** → **Issue types**
2. Default issue types (keep all):
   - ✅ **Epic** - Large body of work (Phases)
   - ✅ **Story** - User story (Milestones)
   - ✅ **Task** - Generic task
   - ✅ **Subtask** - Child of Story/Task
   - ✅ **Bug** - Defects
3. Add custom field for **Milestone**:
   - Type: **Select List (single choice)**
   - Options: M1, M2, M3, ..., M14
4. Add custom field for **Phase**:
   - Type: **Select List (single choice)**
   - Options: Phase 0, Phase 1, Phase 2, Phase 3, Phase 4

---

## 3. EPIC CREATION

### Create 5 Epics:

#### Epic 1: Phase 0 - Pre-Start
- **Summary:** Phase 0: Pre-Start Setup
- **Key:** CAP-1
- **Description:**
  ```
  Setup all tools, accounts, and environment before coding.
  
  Duration: 3-4 days
  
  Goals:
  - Jira & GitHub setup
  - Slack workspace configured
  - Docker environment ready
  - API keys obtained
  - Git hooks (Husky) configured
  ```
- **Labels:** phase-0, setup
- **Start date:** 2025-10-20 (điều chỉnh theo ngày bạn bắt đầu)
- **Due date:** 2025-10-23

#### Epic 2: Phase 1 - Backend Core
- **Summary:** Phase 1: Backend Core Services
- **Key:** CAP-2
- **Description:**
  ```
  Build core backend services: DB, Auth, User/Project, API Gateway, 
  Chat Orchestrator, WebSocket, Notifications, Billing.
  
  Duration: 8 weeks
  
  Milestones: M1-M7
  
  Goals:
  - All backend APIs functional
  - WebSocket realtime chat working
  - Notification service integrated
  - Billing tracking operational
  ```
- **Labels:** phase-1, backend
- **Start date:** 2025-10-24
- **Due date:** 2025-12-18

#### Epic 3: Phase 2 - Advanced Features
- **Summary:** Phase 2: Advanced Features (Frontend, Voice, Files, Mobile)
- **Key:** CAP-3
- **Description:**
  ```
  Build frontend web app, voice/file upload features, agent management,
  advanced billing, and mobile PoC.
  
  Duration: 6 weeks
  
  Milestones: M8-M11
  
  Goals:
  - Web app fully functional
  - Voice input/output working
  - File upload & processing
  - Agent management UI
  - Mobile app PoC
  ```
- **Labels:** phase-2, frontend, advanced
- **Start date:** 2025-12-19
- **Due date:** 2026-01-29

#### Epic 4: Phase 3 - Deployment & ML
- **Summary:** Phase 3: Deployment & ML Training
- **Key:** CAP-4
- **Description:**
  ```
  Deploy to production with Kubernetes, Terraform.
  Implement ML training service for custom agents.
  
  Duration: 4 weeks
  
  Milestones: M12-M13
  
  Goals:
  - K8s deployment working
  - Terraform infrastructure automated
  - ML training service functional
  - Self-hosted agent deployment
  ```
- **Labels:** phase-3, deployment, ml
- **Start date:** 2026-01-30
- **Due date:** 2026-02-26

#### Epic 5: Phase 4 - Hardening & Beta
- **Summary:** Phase 4: Hardening & Beta Release
- **Key:** CAP-5
- **Description:**
  ```
  Security hardening, performance optimization, full testing,
  documentation, and beta launch.
  
  Duration: 4 weeks
  
  Milestone: M14
  
  Goals:
  - Security audit passed
  - Performance optimized
  - All tests passing
  - Documentation complete
  - Beta users onboarded
  ```
- **Labels:** phase-4, hardening, beta
- **Start date:** 2026-02-27
- **Due date:** 2026-03-26

---

## 4. STORY CREATION

### Create 14 Stories (M1-M14):

#### Story 1: M1 - Database Setup & Infrastructure
- **Summary:** M1: Database Setup & Infrastructure
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-6
- **Story Points:** 13
- **Priority:** Highest
- **Labels:** milestone-1, database, infrastructure
- **Description:**
  ```
  Setup PostgreSQL database with TypeORM, implement 8 tables from ERD,
  Docker Compose for local dev, CI/CD pipeline.
  
  Acceptance Criteria:
  - Docker Compose running (PostgreSQL, Redis, MinIO)
  - 8 TypeORM entities created (USERS, PROJECTS, PROJECT_MEMBERS, 
    CONVERSATIONS, AGENTS, MESSAGES, BILLING_LOG, NOTIFICATIONS)
  - Migration scripts working
  - Seed data scripts ready
  - CI/CD pipeline green (GitHub Actions)
  - Husky hooks enforcing code quality
  
  Deliverable: Database ready, testable locally
  ```
- **Assignee:** PM/Dev Lead + DevOps
- **Sprint:** Sprint 1 (Week 1)

#### Story 2: M2 - Auth Service
- **Summary:** M2: Auth Service (Email/Phone/OAuth)
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-7
- **Story Points:** 13
- **Priority:** Highest
- **Labels:** milestone-2, auth, oauth
- **Description:**
  ```
  Implement authentication service with email/phone signup/login,
  OAuth (Google, Facebook, TikTok), JWT tokens.
  
  Acceptance Criteria:
  - Email/phone signup with bcrypt hashing
  - Login returns JWT (expires 1h) + refresh token
  - OAuth flows working (Google, Facebook, TikTok)
  - Link social accounts to existing users
  - JWT middleware validates tokens
  - Unit tests >80% coverage
  
  Deliverable: Auth service ready, OAuth working
  ```
- **Assignee:** Backend Dev 1
- **Sprint:** Sprint 1 (Week 2)

#### Story 3: M3 - User/Project Service
- **Summary:** M3: User/Project Service with Threading
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-8
- **Story Points:** 13
- **Priority:** Highest
- **Labels:** milestone-3, user, project, threading
- **Description:**
  ```
  Implement User CRUD, Project management with RBAC (Owner, Editor, Viewer),
  Conversation threading for chat context.
  
  Acceptance Criteria:
  - GET/POST/PUT/DELETE /users (Admin only)
  - GET/POST/PUT/DELETE /projects
  - Invite members with roles (Owner, Editor, Viewer)
  - POST/GET /conversations (with thread_id generation)
  - Pagination support
  - RBAC middleware enforces permissions
  - Unit + integration tests
  
  Deliverable: User/Project/Threading APIs ready
  ```
- **Assignee:** Backend Dev 1
- **Sprint:** Sprint 2 (Week 3)

#### Story 4: M4 - API Gateway
- **Summary:** M4: API Gateway with Proxy & Security
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-9
- **Story Points:** 8
- **Priority:** High
- **Labels:** milestone-4, api-gateway, security
- **Description:**
  ```
  Setup API Gateway to proxy requests to microservices,
  JWT authentication middleware, rate limiting, Swagger docs.
  
  Acceptance Criteria:
  - Route /auth/* → Auth Service
  - Route /users/* → User Service
  - Route /projects/* → User Service
  - Route /conversations/* → User Service
  - JWT middleware validates all protected routes
  - Rate limiting: 100 req/15min per IP
  - Swagger/OpenAPI documentation live
  - Health check endpoint /health
  
  Deliverable: API Gateway ready, Swagger docs live
  ```
- **Assignee:** PM/Dev Lead + DevOps
- **Sprint:** Sprint 2 (Week 4)

#### Story 5: M5 - Chat Orchestrator
- **Summary:** M5: Chat Orchestrator (Text Chat with AI)
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-10
- **Story Points:** 13
- **Priority:** Highest
- **Labels:** milestone-5, chat, ai-integration
- **Description:**
  ```
  Implement chat orchestrator to handle messages, retrieve thread context,
  call external AI APIs (OpenAI, Gemini), save responses.
  
  Acceptance Criteria:
  - POST /messages endpoint working
  - Retrieve last 10 messages from thread_id
  - Format context for AI API
  - Integrate OpenAI GPT-4
  - Integrate Google Gemini
  - Save user message + AI response to DB
  - Error handling & retry logic
  - Unit + integration tests
  
  Deliverable: Chat working, AI responses saved
  ```
- **Assignee:** Backend Dev 2
- **Sprint:** Sprint 3 (Week 5)

#### Story 6: M6 - WebSocket Gateway
- **Summary:** M6: WebSocket Gateway for Realtime Chat
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-11
- **Story Points:** 13
- **Priority:** High
- **Labels:** milestone-6, websocket, realtime
- **Description:**
  ```
  Implement WebSocket gateway with Socket.io for realtime chat,
  streaming AI responses, typing indicators.
  
  Acceptance Criteria:
  - Socket.io setup with JWT authentication
  - Room management per conversation
  - Stream AI responses token-by-token
  - Emit events: message.start, message.chunk, message.end
  - Typing indicators (user is typing...)
  - Handle disconnections gracefully
  - WebSocket tests
  
  Deliverable: WebSocket working, realtime streaming functional
  ```
- **Assignee:** Backend Dev 2
- **Sprint:** Sprint 3 (Week 6)

#### Story 7: M6.5 - Notification Service
- **Summary:** M6.5: Notification Service (NEW)
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-12
- **Story Points:** 8
- **Priority:** Medium
- **Labels:** milestone-6.5, notifications
- **Description:**
  ```
  Implement notification service for realtime/email/push notifications.
  
  Acceptance Criteria:
  - NOTIFICATIONS table created
  - WebSocket notifications (realtime)
  - Email notifications (nodemailer)
  - Event: New message in conversation
  - Event: Invited to project
  - Event: Agent training complete
  - RabbitMQ integration for async events
  - GET /notifications endpoint
  - Mark as read functionality
  
  Deliverable: Notification service ready
  ```
- **Assignee:** Backend Dev 1
- **Sprint:** Sprint 4 (Week 7)

#### Story 8: M7 - Billing Service
- **Summary:** M7: Billing Service (Usage Tracking & Reports)
- **Epic Link:** CAP-2 (Phase 1)
- **Key:** CAP-13
- **Story Points:** 8
- **Priority:** Medium
- **Labels:** milestone-7, billing
- **Description:**
  ```
  Implement billing service to log token usage and generate reports.
  
  Acceptance Criteria:
  - POST /billing/log (internal endpoint)
  - Save to BILLING_LOG: user_id, project_id, conversation_id, 
    agent_id, tokens, cost
  - GET /billing/report with filters (date, user, project, agent)
  - Aggregate: total tokens, total cost
  - Export CSV
  - GET /billing/stats (summary stats)
  - Unit + integration tests
  
  Deliverable: Billing service ready
  ```
- **Assignee:** Backend Dev 2
- **Sprint:** Sprint 4 (Week 8)

#### Story 9: M8 - Frontend Web
- **Summary:** M8: Frontend Web App (Next.js)
- **Epic Link:** CAP-3 (Phase 2)
- **Key:** CAP-14
- **Story Points:** 21
- **Priority:** Highest
- **Labels:** milestone-8, frontend, web
- **Description:**
  ```
  Build Next.js 14 web app with auth pages, projects dashboard,
  chat interface, WebSocket integration, notifications UI.
  
  Acceptance Criteria:
  - /auth/login, /auth/signup pages working
  - OAuth callback handling
  - /projects dashboard with sidebar
  - Create project/thread modals
  - /chat/:projectId/:threadId page
  - Message list + chat input
  - WebSocket integration for realtime updates
  - Notification bell + dropdown
  - Responsive design (mobile-friendly)
  - E2E tests (Cypress)
  
  Deliverable: Web app functional, chat working
  ```
- **Assignee:** Frontend Dev
- **Sprint:** Sprint 5-6 (Week 9-10)

#### Story 10: M9 - Voice & File Upload
- **Summary:** M9: Voice Input/Output & File Upload
- **Epic Link:** CAP-3 (Phase 2)
- **Key:** CAP-15
- **Story Points:** 13
- **Priority:** High
- **Labels:** milestone-9, voice, files
- **Description:**
  ```
  Implement voice input (Web Speech API), TTS output,
  file upload (PDF, DOCX, images), and file processing.
  
  Acceptance Criteria:
  - VoiceRecorder component (record → transcribe)
  - TTS playback on AI messages
  - FileUploader component (drag & drop)
  - Upload to MinIO (S3)
  - Backend: Extract text from PDF (PyPDF2)
  - Backend: Extract text from DOCX (python-docx)
  - Attach extracted text to message context
  - Display attached files in messages
  - E2E tests for voice & file
  
  Deliverable: Voice & file upload working
  ```
- **Assignee:** Frontend Dev + Backend Dev 2
- **Sprint:** Sprint 6-7 (Week 11-12)

#### Story 11: M10 - Agent Management
- **Summary:** M10: Agent Management (CRUD & Test Connection)
- **Epic Link:** CAP-3 (Phase 2)
- **Key:** CAP-16
- **Story Points:** 8
- **Priority:** Medium
- **Labels:** milestone-10, agents
- **Description:**
  ```
  Implement agent management: CRUD operations, API key encryption,
  test connection feature.
  
  Acceptance Criteria:
  - POST/GET/PUT/DELETE /agents
  - Encrypt API keys (AES-256)
  - Agent types: external (OpenAI, Gemini), self-hosted
  - POST /agents/:id/test-connection
  - Admin UI: Agents management page
  - Create/edit agent modal
  - Unit + integration tests
  
  Deliverable: Agent management ready
  ```
- **Assignee:** Backend Dev 2 + Frontend Dev
- **Sprint:** Sprint 7 (Week 13)

#### Story 12: M11 - Advanced Billing & Mobile PoC
- **Summary:** M11: Advanced Billing Dashboard & Mobile App PoC
- **Epic Link:** CAP-3 (Phase 2)
- **Key:** CAP-17
- **Story Points:** 13
- **Priority:** Medium
- **Labels:** milestone-11, billing, mobile
- **Description:**
  ```
  Build advanced billing dashboard with charts/reports,
  CSV/PDF export, and React Native mobile app PoC.
  
  Acceptance Criteria:
  - Billing dashboard UI with filters
  - Charts: usage over time, cost per agent
  - Export CSV/PDF
  - React Native (Expo) app initialized
  - Mobile screens: Login, Projects, Chat
  - Mobile API integration (same endpoints as web)
  - Test on iOS/Android simulators
  
  Deliverable: Advanced billing + Mobile PoC working
  ```
- **Assignee:** Frontend Dev
- **Sprint:** Sprint 8 (Week 14)

#### Story 13: M12 - Deployment
- **Summary:** M12: Production Deployment (Docker, K8s, Terraform)
- **Epic Link:** CAP-4 (Phase 3)
- **Key:** CAP-18
- **Story Points:** 21
- **Priority:** Highest
- **Labels:** milestone-12, deployment, kubernetes
- **Description:**
  ```
  Dockerize all services, create Kubernetes manifests,
  Terraform infrastructure, deploy to cloud.
  
  Acceptance Criteria:
  - Dockerfiles for all 8 services
  - docker-compose.yml complete
  - K8s deployment YAMLs for all services
  - StatefulSet for PostgreSQL
  - ConfigMaps & Secrets
  - Ingress for routing
  - Terraform scripts (AWS EKS or GCP GKE)
  - RDS/ElastiCache setup
  - Monitoring (Prometheus + Grafana)
  - Production deployment successful
  
  Deliverable: Production deployment ready
  ```
- **Assignee:** DevOps + PM/Dev Lead
- **Sprint:** Sprint 8-9 (Week 15-16)

#### Story 14: M13 - ML Training
- **Summary:** M13: ML Training Service & Self-Hosted Deployment
- **Epic Link:** CAP-4 (Phase 3)
- **Key:** CAP-19
- **Story Points:** 21
- **Priority:** High
- **Labels:** milestone-13, ml, training
- **Description:**
  ```
  Implement ML training service (Python FastAPI) for fine-tuning models,
  deploy trained models as self-hosted agents.
  
  Acceptance Criteria:
  - POST /train endpoint (Hugging Face Transformers)
  - Input: model_name, dataset_url, epochs, batch_size
  - Training progress tracking (WebSocket)
  - Save trained model to storage
  - Build Docker image with trained model
  - POST /agents/:id/deploy (K8s deployment)
  - Admin UI: Training dashboard
  - Test: Train → Deploy → Chat with custom agent
  
  Deliverable: ML training + self-hosted deploy working
  ```
- **Assignee:** Backend Dev 2 + DevOps
- **Sprint:** Sprint 9-10 (Week 17-18)

#### Story 15: M14 - Security & Performance
- **Summary:** M14: Security Hardening & Performance Optimization
- **Epic Link:** CAP-5 (Phase 4)
- **Key:** CAP-20
- **Story Points:** 13
- **Priority:** Highest
- **Labels:** milestone-14, security, performance
- **Description:**
  ```
  Security audit, vulnerability fixes, performance optimization,
  load testing, documentation, beta launch.
  
  Acceptance Criteria:
  - OWASP ZAP scan passed
  - Snyk dependency scan clean
  - SQL injection prevention verified
  - XSS/CSRF protection implemented
  - Database query optimization (indexes)
  - Redis caching implemented
  - CDN setup for static assets
  - Load test: 10k concurrent users
  - E2E tests: 100% passing
  - Documentation complete
  - Beta users onboarded
  
  Deliverable: MVP launched, beta users onboarded
  ```
- **Assignee:** All team
- **Sprint:** Sprint 10-13 (Week 19-22)

---

## 5. SUBTASKS BREAKDOWN

### Example: Story CAP-6 (M1) Subtasks

Create these subtasks under **CAP-6**:

1. **CAP-21:** Setup Docker Compose
   - **Estimate:** 4h
   - **Description:** Create docker-compose.yml with PostgreSQL, Redis, MinIO
   - **Assignee:** DevOps

2. **CAP-22:** Implement Database Schema
   - **Estimate:** 6h
   - **Description:** Create 8 TypeORM entities, generate migration
   - **Assignee:** PM/Dev Lead

3. **CAP-23:** Config DB Connection
   - **Estimate:** 2h
   - **Description:** TypeORM module setup, seed data scripts
   - **Assignee:** PM/Dev Lead

4. **CAP-24:** CI/CD Basic
   - **Estimate:** 3h
   - **Description:** GitHub Actions workflow, Husky hooks
   - **Assignee:** DevOps

**Repeat for all 14 stories** (each story has 3-6 subtasks)

---

## 6. WORKFLOW CONFIGURATION

### Step 6.1: Configure Workflow
1. Go to **Project settings** → **Workflows**
2. Edit default workflow:
   - **To Do** (Initial state)
   - **In Progress** (Work started)
   - **Review** (Code review/PR)
   - **Testing** (QA testing)
   - **Done** (Completed)

### Step 6.2: Add Transitions
- To Do → In Progress (Start work)
- In Progress → Review (Submit PR)
- Review → In Progress (Changes requested)
- Review → Testing (PR approved)
- Testing → In Progress (Bugs found)
- Testing → Done (Tests passed)

### Step 6.3: Automation Rules
1. **Auto-assign on status change:**
   - When issue moves to "Review" → Assign to Dev Lead
   - When issue moves to "Testing" → Assign to QA
2. **Auto-comment from GitHub:**
   - When PR created → Comment in Jira issue
   - When PR merged → Move to "Testing"

---

## 7. SPRINT PLANNING

### Sprint 1 (Week 1-2): M1 & M2
- **Start:** 2025-10-24
- **End:** 2025-11-06
- **Goal:** Database + Auth service ready
- **Stories:** CAP-6, CAP-7
- **Story Points:** 26

### Sprint 2 (Week 3-4): M3 & M4
- **Start:** 2025-11-07
- **End:** 2025-11-20
- **Goal:** User/Project APIs + API Gateway
- **Stories:** CAP-8, CAP-9
- **Story Points:** 21

### Sprint 3 (Week 5-6): M5 & M6
- **Start:** 2025-11-21
- **End:** 2025-12-04
- **Goal:** Chat + WebSocket realtime
- **Stories:** CAP-10, CAP-11
- **Story Points:** 26

### Sprint 4 (Week 7-8): M6.5 & M7
- **Start:** 2025-12-05
- **End:** 2025-12-18
- **Goal:** Notifications + Billing
- **Stories:** CAP-12, CAP-13
- **Story Points:** 16

**Continue for all 13 sprints...**

---

## 8. INTEGRATION SETUP

### Step 8.1: Link Jira to GitHub
1. Go to **Settings** → **Apps** → **Find new apps**
2. Search "GitHub for Jira"
3. Install app
4. Connect GitHub account
5. Link repo: `thanhhaunv/ChatAI-Platform`
6. Enable:
   - Auto-link issues in commits/PRs
   - Show PR status in Jira
   - Auto-transition on PR merge

### Step 8.2: Link Jira to Slack
1. In Slack: `/jira connect`
2. Authorize Jira workspace
3. Configure notifications:
   - Channel #dev-backend: Stories tagged "backend"
   - Channel #dev-frontend: Stories tagged "frontend"
   - Channel #pm: All story transitions

### Step 8.3: Automation Rules
1. **GitHub → Jira:**
   - When commit mentions `CAP-X` → Link to issue
   - When PR merged → Move issue to "Testing"
2. **Jira → Slack:**
   - When story moves to "Review" → Notify #dev-backend
   - When sprint starts → Notify #pm
   - When issue blocked → Notify #pm

---

## 9. BOARD CONFIGURATION

### Step 9.1: Setup Scrum Board
1. Go to **Board** → **Board settings**
2. Configure columns:
   - **Backlog** (To Do)
   - **In Progress**
   - **Review**
   - **Testing**
   - **Done**
3. Enable **Swimlanes**:
   - Group by: **Assignee**
4. Set **Quick filters**:
   - Backend: `labels = backend`
   - Frontend: `labels = frontend`
   - High Priority: `priority = Highest`

### Step 9.2: Configure Backlog
1. Enable **Backlog**
2. Organize by **Epics**
3. Drag stories to sprints

---

## 10. REPORTS SETUP

### Step 10.1: Enable Reports
1. Go to **Reports**
2. Enable:
   - **Burndown Chart** (track sprint progress)
   - **Velocity Chart** (team performance)
   - **Sprint Report** (completed vs. planned)

### Step 10.2: Custom Dashboards
1. Create dashboard: "ChatAI Platform Overview"
2. Add gadgets:
   - Sprint Health Gadget
   - Issue Statistics
   - Created vs. Resolved Chart
   - Average Age Chart

---

## ✅ CHECKLIST

After completing this guide, verify:

- [ ] Jira workspace created: `thanhhaunv.atlassian.net`
- [ ] Project "ChatAI Platform" (CAP) created
- [ ] 6 team members added with correct roles
- [ ] 5 Epics created (CAP-1 to CAP-5)
- [ ] 14 Stories created (CAP-6 to CAP-20)
- [ ] Custom fields added (Milestone, Phase)
- [ ] Workflow configured (5 states)
- [ ] 13 Sprints planned
- [ ] GitHub integration working
- [ ] Slack integration working
- [ ] Scrum board configured
- [ ] Reports enabled

---

## 📎 NEXT STEPS

After Jira setup complete:
→ Proceed to **PART 3: PHASE 0 IMPLEMENTATION**

**File:** `PART3-DAY1-Project-Management-Setup.md`

---

**Estimated Time:** 2-3 hours  
**Status:** ✅ Ready to execute  
**Prerequisites:** Jira account + team email addresses
