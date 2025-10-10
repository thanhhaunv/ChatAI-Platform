# PART 2: JIRA SETUP GUIDE

**Project:** ChatAI Platform  
**Duration:** ~2-3 hours  
**Prerequisites:** Jira account, team member emails  

---

## 📋 TABLE OF CONTENTS

1. [Jira Account Setup](#1-jira-account-setup)
2. [Project Configuration](#2-project-configuration)
3. [Epic Creation (5 Epics)](#3-epic-creation-5-epics)
4. [Story Creation (14 Stories)](#4-story-creation-14-stories)
5. [Subtasks Breakdown](#5-subtasks-breakdown)
6. [Workflow Configuration](#6-workflow-configuration)
7. [Sprint Planning](#7-sprint-planning)
8. [Integration Setup](#8-integration-setup)
9. [Board Configuration](#9-board-configuration)
10. [Reports Setup](#10-reports-setup)

---

## 1. JIRA ACCOUNT SETUP

### **Step 1.1: Create Jira Account (5 min)**

1. Go to: https://www.atlassian.com/software/jira/free
2. Click **"Get it free"**
3. Enter email: `thanhhaunv@gmail.com` (hoặc email của bạn)
4. Choose plan: **Free** (up to 10 users)
5. Site name: `thanhhaunv` → URL: `https://thanhhaunv.atlassian.net`
6. Verify email

**Result:** ✅ Jira workspace created

---

### **Step 1.2: Add Team Members (5 min)**

1. Click **Settings** (⚙️) → **People**
2. Click **"Invite people"**
3. Add team emails:
   ```
   backend-dev1@example.com
   backend-dev2@example.com
   frontend-dev@example.com
   devops@example.com
   qa-tester@example.com
   ```
4. Select role: **Member** (can create/edit issues)
5. Click **"Invite"**

**Result:** ✅ 6 team members added

---

### **Step 1.3: Configure Permissions (3 min)**

1. Go to **Project Settings** → **Permissions**
2. Default scheme: **Software Development**
3. Verify permissions:
   - Administrators: You (PM/Lead)
   - Members: Can create, edit, comment, transition issues
   - Reporters: Can create issues only

**Result:** ✅ Permissions configured

---

## 2. PROJECT CONFIGURATION

### **Step 2.1: Create Project (10 min)**

1. Click **"Create project"**
2. Select template: **Scrum**
3. Project details:
   - **Project name:** ChatAI Platform
   - **Project key:** CAP (will be prefix for issues: CAP-1, CAP-2...)
   - **Project type:** Team-managed
4. Click **"Create"**

**Result:** ✅ Project "ChatAI Platform" created

---

### **Step 2.2: Configure Issue Types (5 min)**

1. Go to **Project Settings** → **Issue types**
2. Enable issue types:
   - ✅ **Epic** (for phases)
   - ✅ **Story** (for milestones)
   - ✅ **Task** (for subtasks)
   - ✅ **Bug** (for bugs)
   - ❌ **Subtask** (rename to Task for clarity)
3. Click **"Save"**

**Result:** ✅ Issue types configured

---

### **Step 2.3: Add Custom Fields (10 min)**

1. Go to **Project Settings** → **Fields**
2. Click **"Create field"**
3. Add custom fields:

**Field 1: Phase**
- Type: **Single select**
- Options:
  - Phase 0: Pre-Start
  - Phase 1: Backend Core
  - Phase 2: Advanced Features
  - Phase 3: Deployment & ML
  - Phase 4: Hardening & Beta

**Field 2: Milestone**
- Type: **Short text**
- Description: Milestone number (M1, M2, ..., M14)

**Field 3: Estimated Hours**
- Type: **Number**
- Description: Time estimate in hours

**Field 4: Sprint Week**
- Type: **Short text**
- Description: Week number (W1, W2, ..., W22)

4. Click **"Create"** for each field

**Result:** ✅ Custom fields added

---

## 3. EPIC CREATION (5 EPICS)

### **Epic 1: Phase 0 - Pre-Start**

1. Click **"Create"** → Select **Epic**
2. Fill in:
   - **Epic Name:** Phase 0 - Pre-Start Setup
   - **Summary:** Setup all tools, accounts, and environment before coding
   - **Description:**
     ```
     Setup Jira, GitHub, Slack, Docker, OAuth, and AI API keys.
     Duration: 3-4 days
     Team: All members
     ```
   - **Phase:** Phase 0: Pre-Start
   - **Priority:** Highest
   - **Assignee:** You (PM/Lead)
3. Click **"Create"**

**Epic Key:** CAP-1

---

### **Epic 2: Phase 1 - Backend Core**

1. Click **"Create"** → Select **Epic**
2. Fill in:
   - **Epic Name:** Phase 1 - Backend Core
   - **Summary:** Build core backend services (DB, Auth, Chat, Notifications, Billing)
   - **Description:**
     ```
     Duration: 8 weeks (M1-M7)
     Milestones: M1, M2, M3, M4, M5, M6, M6.5, M7
     Services: api-gateway, auth-service, user-service, chat-orch, notification-service, billing
     Deliverable: All backend APIs working, Phase 1 Demo
     ```
   - **Phase:** Phase 1: Backend Core
   - **Priority:** Highest
   - **Assignee:** Backend Dev 1
3. Click **"Create"**

**Epic Key:** CAP-2

---

### **Epic 3: Phase 2 - Advanced Features**

1. Click **"Create"** → Select **Epic**
2. Fill in:
   - **Epic Name:** Phase 2 - Advanced Features
   - **Summary:** Build frontend, voice, file upload, agent management, mobile
   - **Description:**
     ```
     Duration: 6 weeks (M8-M11)
     Milestones: M8, M9, M10, M11
     Features: Web app, Voice I/O, File upload, Agent management, Mobile PoC
     Deliverable: Full-featured web & mobile app, Phase 2 Demo
     ```
   - **Phase:** Phase 2: Advanced Features
   - **Priority:** High
   - **Assignee:** Frontend Dev
3. Click **"Create"**

**Epic Key:** CAP-3

---

### **Epic 4: Phase 3 - Deployment & ML**

1. Click **"Create"** → Select **Epic**
2. Fill in:
   - **Epic Name:** Phase 3 - Deployment & ML Training
   - **Summary:** Deploy to production, ML training, self-hosted agent deployment
   - **Description:**
     ```
     Duration: 4 weeks (M12-M13)
     Milestones: M12, M13
     Tasks: K8s deployment, Terraform, ML training service, Self-hosted agents
     Deliverable: Production deployment, ML training working, Phase 3 Demo
     ```
   - **Phase:** Phase 3: Deployment & ML
   - **Priority:** High
   - **Assignee:** DevOps
3. Click **"Create"**

**Epic Key:** CAP-4

---

### **Epic 5: Phase 4 - Hardening & Beta Release**

1. Click **"Create"** → Select **Epic**
2. Fill in:
   - **Epic Name:** Phase 4 - Hardening & Beta Release
   - **Summary:** Security, performance, testing, documentation, beta launch
   - **Description:**
     ```
     Duration: 4 weeks (M14 + Buffer)
     Tasks: Security audit, Performance optimization, Full testing, Documentation, Beta launch
     Deliverable: MVP launched, 10-20 beta users onboarded
     ```
   - **Phase:** Phase 4: Hardening & Beta
   - **Priority:** High
   - **Assignee:** QA/Tester
3. Click **"Create"**

**Epic Key:** CAP-5

**Result:** ✅ 5 Epics created (CAP-1 to CAP-5)

---

## 4. STORY CREATION (14 STORIES)

### **Story Template Structure:**
```
Summary: M# - [Name]
Description: [Goal & deliverables]
Epic Link: [Epic #]
Phase: [Phase name]
Milestone: M#
Sprint Week: W#
Estimated Hours: [hours]
Priority: [High/Medium]
Assignee: [Team member]
Story Points: [1-13]
```

---

### **M1: Database Setup & Infrastructure**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M1 - Database Setup & Infrastructure
   - **Description:**
     ```
     Goal: Setup Docker Compose, implement database schema, configure CI/CD
     
     Deliverables:
     - Docker Compose running (PostgreSQL, Redis, MinIO)
     - 8 TypeORM entities created
     - Database migration successful
     - CI/CD pipeline green
     - Git hooks (Husky) working
     
     Acceptance Criteria:
     - All 8 tables created in PostgreSQL
     - Docker health checks passing
     - GitHub Actions workflow running
     - Husky hooks enforcing lint + tests
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M1
   - **Sprint Week:** W1
   - **Estimated Hours:** 20
   - **Priority:** Highest
   - **Assignee:** DevOps
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-6

---

### **M2: Auth Service**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M2 - Auth Service
   - **Description:**
     ```
     Goal: Build authentication service with OAuth support
     
     Deliverables:
     - Email/phone signup & login
     - Google, Facebook, TikTok OAuth flows
     - JWT token generation & refresh
     - Auth guards & middleware
     - Unit tests (>80% coverage)
     
     Acceptance Criteria:
     - Users can signup/login with email + password
     - OAuth login works for Google, Facebook, TikTok
     - JWT tokens expire and refresh correctly
     - All tests passing
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M2
   - **Sprint Week:** W2
   - **Estimated Hours:** 24
   - **Priority:** Highest
   - **Assignee:** Backend Dev 1
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-7

---

### **M3: User/Project Service**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M3 - User/Project Service
   - **Description:**
     ```
     Goal: Build user management, project management, and conversation threading
     
     Deliverables:
     - User CRUD endpoints with RBAC
     - Project management (create, invite members)
     - Conversation threading APIs
     - Unit + integration tests
     
     Acceptance Criteria:
     - Users can create/edit profiles
     - Users can create projects and invite members with roles
     - Conversations have thread_id and pagination
     - Frontend can start integration
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M3
   - **Sprint Week:** W3
   - **Estimated Hours:** 22
   - **Priority:** Highest
   - **Assignee:** Backend Dev 1
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-8

---

### **M4: API Gateway**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M4 - API Gateway
   - **Description:**
     ```
     Goal: Build API Gateway to proxy all requests to microservices
     
     Deliverables:
     - Proxy routes to all services
     - JWT middleware for authentication
     - Rate limiting (100 req/15min)
     - Swagger API documentation
     
     Acceptance Criteria:
     - All routes proxy correctly
     - JWT validation working
     - Rate limiting enforced
     - Swagger docs live at /api/docs
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M4
   - **Sprint Week:** W4
   - **Estimated Hours:** 18
   - **Priority:** High
   - **Assignee:** You (PM/Lead)
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-9

---

### **M5: Chat Orchestrator**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M5 - Chat Orchestrator
   - **Description:**
     ```
     Goal: Build chat service with AI integration
     
     Deliverables:
     - Chat endpoint (POST /messages)
     - Thread context management (last 10 messages)
     - OpenAI & Gemini API integration
     - Error handling & retry logic
     
     Acceptance Criteria:
     - Users can send messages and receive AI responses
     - Context window includes previous messages
     - Multiple AI providers supported
     - Messages saved to database
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M5
   - **Sprint Week:** W5
   - **Estimated Hours:** 24
   - **Priority:** Highest
   - **Assignee:** Backend Dev 2
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-10

---

### **M6: WebSocket Gateway & Realtime Chat**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M6 - WebSocket Gateway & Realtime Chat
   - **Description:**
     ```
     Goal: Add realtime streaming for chat responses
     
     Deliverables:
     - Socket.io WebSocket setup
     - Realtime AI response streaming (token-by-token)
     - Typing indicators
     - Room management per conversation
     
     Acceptance Criteria:
     - WebSocket authentication with JWT
     - AI responses stream in realtime
     - Typing indicators broadcast to room
     - Frontend receives realtime updates
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M6
   - **Sprint Week:** W6
   - **Estimated Hours:** 20
   - **Priority:** High
   - **Assignee:** Backend Dev 2
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-11

---

### **M6.5: Notification Service**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M6.5 - Notification Service
   - **Description:**
     ```
     Goal: Build notification service with multiple channels
     
     Deliverables:
     - Notification service (NestJS)
     - WebSocket notifications (realtime)
     - Email notifications (nodemailer)
     - RabbitMQ integration for async events
     
     Acceptance Criteria:
     - Users receive realtime notifications
     - Email notifications sent for important events
     - Events: new message, project invite, training complete
     - Integration with Chat/User services
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M6.5
   - **Sprint Week:** W7
   - **Estimated Hours:** 18
   - **Priority:** High
   - **Assignee:** Backend Dev 1
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-12

---

### **M7: Billing Service**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M7 - Billing Service
   - **Description:**
     ```
     Goal: Build billing service for usage tracking and reports
     
     Deliverables:
     - Token usage logging endpoint
     - Billing reports API with filters
     - CSV export functionality
     - Billing dashboard API
     
     Acceptance Criteria:
     - Usage logged after each AI response
     - Reports filter by user/project/agent/date
     - CSV export working
     - Phase 1 Demo successful
     ```
   - **Epic Link:** CAP-2 (Phase 1)
   - **Phase:** Phase 1: Backend Core
   - **Milestone:** M7
   - **Sprint Week:** W8
   - **Estimated Hours:** 20
   - **Priority:** High
   - **Assignee:** Backend Dev 2
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-13

---

### **M8: Frontend Web**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M8 - Frontend Web Application
   - **Description:**
     ```
     Goal: Build complete web application with Next.js 14
     
     Deliverables:
     - Auth pages (login, signup, OAuth callback)
     - Projects dashboard with sidebar
     - Chat interface with realtime streaming
     - Notifications UI
     - E2E tests (Cypress)
     
     Acceptance Criteria:
     - Users can login and access projects
     - Chat interface shows messages and streams AI responses
     - Notifications display in realtime
     - All E2E tests passing
     ```
   - **Epic Link:** CAP-3 (Phase 2)
   - **Phase:** Phase 2: Advanced Features
   - **Milestone:** M8
   - **Sprint Week:** W9-W10
   - **Estimated Hours:** 40
   - **Priority:** Highest
   - **Assignee:** Frontend Dev
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-14

---

### **M9: Voice & File Upload**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M9 - Voice Input/Output & File Upload
   - **Description:**
     ```
     Goal: Add voice and file upload capabilities
     
     Deliverables:
     - Voice input (Web Speech API)
     - TTS output (Web Audio API)
     - File upload UI (drag & drop)
     - File processing backend (PDF, DOCX, images)
     - MinIO integration
     
     Acceptance Criteria:
     - Users can record voice and send as message
     - AI responses can be played as audio
     - Users can upload files (PDF, DOCX, images)
     - Text extracted from files and added to context
     ```
   - **Epic Link:** CAP-3 (Phase 2)
   - **Phase:** Phase 2: Advanced Features
   - **Milestone:** M9
   - **Sprint Week:** W11-W12
   - **Estimated Hours:** 32
   - **Priority:** High
   - **Assignee:** Frontend Dev + Backend Dev 2
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-15

---

### **M10: Agent Management**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M10 - Agent Management
   - **Description:**
     ```
     Goal: Build agent management system
     
     Deliverables:
     - Agent CRUD endpoints
     - Agent UI (create, edit, list, delete)
     - API key encryption (AES-256)
     - Test connection feature
     
     Acceptance Criteria:
     - Admins can create/edit agents
     - API keys stored encrypted
     - Test connection verifies agent availability
     - Both external and self-hosted agents supported
     ```
   - **Epic Link:** CAP-3 (Phase 2)
   - **Phase:** Phase 2: Advanced Features
   - **Milestone:** M10
   - **Sprint Week:** W13
   - **Estimated Hours:** 20
   - **Priority:** High
   - **Assignee:** Backend Dev 2 + Frontend Dev
   - **Story Points:** 8
3. Click **"Create"**

**Story Key:** CAP-16

---

### **M11: Advanced Billing & Mobile PoC**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M11 - Advanced Billing Dashboard & Mobile PoC
   - **Description:**
     ```
     Goal: Build advanced billing features and mobile app PoC
     
     Deliverables:
     - Billing dashboard UI with charts
     - CSV/PDF export
     - React Native (Expo) mobile app
     - Mobile screens: Login, Projects, Chat
     
     Acceptance Criteria:
     - Billing dashboard shows usage graphs and filters
     - Export to CSV/PDF working
     - Mobile app can login and access basic chat
     - Phase 2 Demo successful
     ```
   - **Epic Link:** CAP-3 (Phase 2)
   - **Phase:** Phase 2: Advanced Features
   - **Milestone:** M11
   - **Sprint Week:** W14
   - **Estimated Hours:** 28
   - **Priority:** High
   - **Assignee:** Frontend Dev + Backend Dev 2
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-17

---

### **M12: Deployment**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M12 - Kubernetes & Cloud Deployment
   - **Description:**
     ```
     Goal: Deploy all services to production
     
     Deliverables:
     - Dockerfiles for all services
     - Kubernetes manifests (Deployments, Services, Ingress)
     - Terraform scripts (AWS EKS or GCP GKE)
     - Monitoring setup (Prometheus + Grafana)
     
     Acceptance Criteria:
     - All services containerized
     - K8s cluster provisioned via Terraform
     - All services deployed and healthy
     - Monitoring dashboards live
     ```
   - **Epic Link:** CAP-4 (Phase 3)
   - **Phase:** Phase 3: Deployment & ML
   - **Milestone:** M12
   - **Sprint Week:** W15-W16
   - **Estimated Hours:** 36
   - **Priority:** Highest
   - **Assignee:** DevOps
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-18

---

### **M13: ML Training & Self-Hosted Agents**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M13 - ML Training Service & Self-Hosted Agent Deployment
   - **Description:**
     ```
     Goal: Build ML training service and self-hosted deployment
     
     Deliverables:
     - FastAPI ML training service
     - Training endpoint with Hugging Face Transformers
     - Training progress API (WebSocket)
     - Model deployment automation
     - Self-hosted agent deployment (K8s)
     - Admin UI for training
     
     Acceptance Criteria:
     - Users can train custom models
     - Training progress visible in realtime
     - Trained models auto-deploy as agents
     - Can chat with custom trained agent
     - Phase 3 Demo successful
     ```
   - **Epic Link:** CAP-4 (Phase 3)
   - **Phase:** Phase 3: Deployment & ML
   - **Milestone:** M13
   - **Sprint Week:** W17-W18
   - **Estimated Hours:** 40
   - **Priority:** High
   - **Assignee:** Backend Dev 2 + Frontend Dev
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-19

---

### **M14: Security & Performance**

1. Click **"Create"** → Select **Story**
2. Fill in:
   - **Summary:** M14 - Security Hardening & Performance Optimization
   - **Description:**
     ```
     Goal: Harden security and optimize performance
     
     Deliverables:
     - OWASP ZAP security scan + fixes
     - Snyk dependency scan + fixes
     - Database optimization (indexes, caching)
     - CDN setup for static assets
     - Load testing (10k concurrent users)
     
     Acceptance Criteria:
     - No critical/high vulnerabilities
     - Response time <2s (95th percentile)
     - Load test passes with 10k users
     - Performance report complete
     ```
   - **Epic Link:** CAP-5 (Phase 4)
   - **Phase:** Phase 4: Hardening & Beta
   - **Milestone:** M14
   - **Sprint Week:** W19
   - **Estimated Hours:** 24
   - **Priority:** Highest
   - **Assignee:** All team
   - **Story Points:** 13
3. Click **"Create"**

**Story Key:** CAP-20

**Result:** ✅ 14 Stories created (CAP-6 to CAP-20)

---

## 5. SUBTASKS BREAKDOWN

### **How to Create Subtasks:**

1. Open a Story (e.g., CAP-6: M1)
2. Click **"Create subtask"** (or press **"C"** keyboard shortcut)
3. Fill in:
   - **Summary:** [Subtask name]
   - **Description:** [Details]
   - **Assignee:** [Team member]
   - **Estimated Hours:** [hours]
4. Click **"Create"**

---

### **Example: M1 Subtasks**

**Story:** CAP-6 - M1: Database Setup & Infrastructure

**Subtask 1: M1-S1 - Setup Docker Compose**
- Summary: M1-S1 - Setup Docker Compose
- Description: 
  ```
  - Create docker-compose.yml
  - Add PostgreSQL, Redis, MinIO services
  - Configure health checks
  - Test: docker-compose up -d
  ```
- Estimated Hours: 4
- Assignee: DevOps

**Subtask 2: M1-S2 - Implement Database Schema**
- Summary: M1-S2 - Implement Database Schema
- Description:
  ```
  - Create 8 TypeORM entities (USERS, PROJECTS, PROJECT_MEMBERS, CONVERSATIONS, AGENTS, MESSAGES, BILLING_LOG, NOTIFICATIONS)
  - Generate migration from ERD
  - Run migration
  - Verify all tables created
  ```
- Estimated Hours: 6
- Assignee: Backend Dev 1

**Subtask 3: M1-S3 - Config DB Connection**
- Summary: M1-S3 - Config DB Connection
- Description:
  ```
  - TypeORM module setup
  - Test connections
  - Create seed data scripts
  ```
- Estimated Hours: 2
- Assignee: Backend Dev 1

**Subtask 4: M1-S4 - CI/CD Basic**
- Summary: M1-S4 - CI/CD Basic + Husky
- Description:
  ```
  - GitHub Actions workflow (test, lint)
  - Husky pre-commit hook (ESLint + Prettier)
  - Husky commit-msg hook (conventional commits)
  - Husky pre-push hook (run tests)
  - Test all hooks working
  ```
- Estimated Hours: 3
- Assignee: DevOps

**Subtask 5: Testing & Bug Fixes**
- Summary: M1 - Testing & Bug Fixes
- Description:
  ```
  - Test all M1 features
  - Fix bugs
  - Code review
  ```
- Estimated Hours: 5
- Assignee: QA/Tester

**Total:** 5 subtasks, 20 hours

---

### **Subtasks for All Stories (Summary)**

**M1 (CAP-6):** 5 subtasks
- M1-S1: Setup Docker Compose (4h)
- M1-S2: Implement Database Schema (6h)
- M1-S3: Config DB Connection (2h)
- M1-S4: CI/CD Basic + Husky (3h)
- M1-Testing: Testing & Bug Fixes (5h)

**M2 (CAP-7):** 5 subtasks
- M2-S1: Email/Phone Signup & Login (4h)
- M2-S2: OAuth Flows (3h)
- M2-S3: JWT Integration (2h)
- M2-S4: Tests & CI/CD (2h)
- M2-Testing: Testing & Bug Fixes (3h)

**M3 (CAP-8):** 5 subtasks
- M3-S1: User CRUD Endpoints (4h)
- M3-S2: Project Management (4h)
- M3-S3: Conversation Threading (2h)
- M3-S4: Tests (3h)
- M3-Testing: Testing & Bug Fixes (3h)

**M4 (CAP-9):** 5 subtasks
- M4-S1: Proxy Routes (3h)
- M4-S2: JWT Middleware (2h)
- M4-S3: Rate Limiting (2h)
- M4-S4: API Documentation (2h)
- M4-Testing: Testing & Load Testing (4h)

**M5 (CAP-10):** 4 subtasks
- M5-S1: Chat Endpoint (4h)
- M5-S2: Thread Context Management (4h)
- M5-S3: External AI Integration (4h)
- M5-Testing: Testing & Bug Fixes (4h)

**M6 (CAP-11):** 4 subtasks
- M6-S1: WebSocket Setup (4h)
- M6-S2: Realtime Streaming (4h)
- M6-S3: Typing Indicators (2h)
- M6-Testing: Testing WebSocket (4h)

**M6.5 (CAP-12):** 5 subtasks
- M6.5-S1: Notification Service Setup (3h)
- M6.5-S2: Notification Channels (3h)
- M6.5-S3: Notification Events (4h)
- M6.5-S4: Tests & Integration (2h)
- M6.5-Testing: Testing (3h)

**M7 (CAP-13):** 4 subtasks
- M7-S1: Token Usage Logging (3h)
- M7-S2: Billing Reports (4h)
- M7-S3: Billing Dashboard API (2h)
- M7-Testing: Testing + Phase 1 Demo (4h)

**M8 (CAP-14):** 6 subtasks
- M8-S1: Auth Pages (4h)
- M8-S2: Projects & Threads UI (5h)
- M8-S3: Chat Interface (6h)
- M8-S4: WebSocket Integration (3h)
- M8-S5: Notifications UI (3h)
- M8-Testing: E2E Tests (4h)

**M9 (CAP-15):** 7 subtasks
- M9-S1: Voice Input (4h)
- M9-S2: TTS Output (3h)
- M9-S3: Voice Settings (2h)
- M9-S4: File Upload UI (4h)
- M9-S5: File Processing Backend (4h)
- M9-S6: File Display (2h)
- M9-Testing: Testing Voice & Files (4h)

**M10 (CAP-16):** 4 subtasks
- M10-S1: Agent CRUD Backend (4h)
- M10-S2: Agent UI (4h)
- M10-S3: Test Connection (2h)
- M10-Testing: Testing (3h)

**M11 (CAP-17):** 4 subtasks
- M11-S1: Advanced Billing UI (4h)
- M11-S2: Mobile App PoC (5h)
- M11-S3: Mobile Integration (2h)
- M11-Testing: Testing + Phase 2 Demo (4h)

**M12 (CAP-18):** 5 subtasks
- M12-S1: Dockerize All Services (4h)
- M12-S2: Kubernetes Manifests (5h)
- M12-S3: Terraform Setup (5h)
- M12-S4: Deploy to Cloud (4h)
- M12-Testing: Testing Production Deployment (3h)

**M13 (CAP-19):** 6 subtasks
- M13-S1: ML Training Service (6h)
- M13-S2: Training Progress API (3h)
- M13-S3: Model Deployment (5h)
- M13-S4: Self-Hosted Agent Deploy (4h)
- M13-S5: ML Integration UI (3h)
- M13-Testing: E2E Testing + Phase 3 Demo (4h)

**M14 (CAP-20):** 3 subtasks
- M14-S1: Security Hardening (5h)
- M14-S2: Performance Optimization (5h)
- M14-Testing: Load Testing (5h)

**Total Subtasks:** 67 subtasks across 14 stories

**Note:** Create all subtasks following the template above. Each subtask should have clear acceptance criteria and time estimates.

---

## 6. WORKFLOW CONFIGURATION

### **Step 6.1: Configure Workflow (10 min)**

1. Go to **Project Settings** → **Workflows**
2. Current workflow: **Basic workflow**
3. Click **"Edit workflow"**
4. Configure statuses:

**Status 1: To Do**
- Description: Story/task not started
- Color: Gray

**Status 2: In Progress**
- Description: Story/task being worked on
- Color: Blue

**Status 3: Review**
- Description: Code review in progress
- Color: Yellow

**Status 4: Testing**
- Description: QA testing in progress
- Color: Orange

**Status 5: Done**
- Description: Story/task completed
- Color: Green

5. Configure transitions:
   - To Do → In Progress (Click "Start")
   - In Progress → Review (Click "Submit for Review")
   - Review → In Progress (Click "Request Changes")
   - Review → Testing (Click "Approve")
   - Testing → In Progress (Click "Failed Testing")
   - Testing → Done (Click "Pass Testing")

6. Click **"Save"**

**Result:** ✅ Workflow configured with 5 statuses

---

### **Step 6.2: Add Workflow Rules (5 min)**

1. Go to **Project Settings** → **Automation**
2. Click **"Create rule"**

**Rule 1: Auto-assign to creator**
- Trigger: Issue created
- Condition: Assignee is empty
- Action: Assign to creator

**Rule 2: Notify on status change**
- Trigger: Issue transitioned
- Condition: Status changed to "Review"
- Action: Send Slack notification to #dev-backend or #dev-frontend

**Rule 3: Auto-move subtasks when story done**
- Trigger: Issue transitioned
- Condition: Status changed to "Done" AND issue type = Story
- Action: Transition all subtasks to "Done"

3. Click **"Save"** for each rule

**Result:** ✅ Automation rules configured

---

## 7. SPRINT PLANNING

### **Step 7.1: Configure Sprints (10 min)**

1. Go to **Backlog**
2. Click **"Create sprint"**
3. Configure:
   - **Sprint name:** Sprint 1 - W1-W2 (M1 & M2)
   - **Duration:** 2 weeks
   - **Start date:** [Your start date]
   - **End date:** [Start date + 14 days]
4. Click **"Create"**

Repeat for all sprints:
- **Sprint 1:** W1-W2 (M1 & M2)
- **Sprint 2:** W3-W4 (M3 & M4)
- **Sprint 3:** W5-W6 (M5 & M6)
- **Sprint 4:** W7-W8 (M6.5 & M7)
- **Sprint 5:** W9-W10 (M8)
- **Sprint 6:** W11-W12 (M9)
- **Sprint 7:** W13-W14 (M10 & M11)
- **Sprint 8:** W15-W16 (M12)
- **Sprint 9:** W17-W18 (M13)
- **Sprint 10:** W19 (M14)
- **Sprint 11:** W20 (Testing)
- **Sprint 12:** W21 (Documentation)
- **Sprint 13:** W22 (Beta Release)

**Result:** ✅ 13 sprints created

---

### **Step 7.2: Add Stories to Sprints (10 min)**

1. Go to **Backlog**
2. Drag stories to sprints:

**Sprint 1 (W1-W2):**
- CAP-6 (M1)
- CAP-7 (M2)

**Sprint 2 (W3-W4):**
- CAP-8 (M3)
- CAP-9 (M4)

**Sprint 3 (W5-W6):**
- CAP-10 (M5)
- CAP-11 (M6)

**Sprint 4 (W7-W8):**
- CAP-12 (M6.5)
- CAP-13 (M7)

**Sprint 5 (W9-W10):**
- CAP-14 (M8)

**Sprint 6 (W11-W12):**
- CAP-15 (M9)

**Sprint 7 (W13-W14):**
- CAP-16 (M10)
- CAP-17 (M11)

**Sprint 8 (W15-W16):**
- CAP-18 (M12)

**Sprint 9 (W17-W18):**
- CAP-19 (M13)

**Sprint 10 (W19):**
- CAP-20 (M14)

**Sprint 11 (W20):**
- Create stories for Testing & QA

**Sprint 12 (W21):**
- Create stories for Documentation & Staging

**Sprint 13 (W22):**
- Create stories for Beta Release

3. Click **"Start sprint"** for Sprint 1

**Result:** ✅ All stories assigned to sprints, Sprint 1 started

---

## 8. INTEGRATION SETUP

### **Step 8.1: GitHub Integration (10 min)**

1. Go to **Project Settings** → **Apps**
2. Search for **"GitHub"**
3. Click **"Get it now"**
4. Click **"Authorize"** and login to GitHub
5. Select repository: `thanhhaunv/ChatAI-Platform`
6. Configure:
   - Link commits: Enable (use "CAP-#" in commit messages)
   - Link branches: Enable (use "CAP-#" in branch names)
   - Link PRs: Enable
7. Click **"Save"**

**Test:**
- Create branch: `feature/CAP-6-database-setup`
- Commit: `git commit -m "feat(db): setup docker compose CAP-6"`
- Push: `git push`
- Verify: Commit appears in Jira issue CAP-6

**Result:** ✅ GitHub integrated

---

### **Step 8.2: Slack Integration (10 min)**

1. Go to **Project Settings** → **Apps**
2. Search for **"Slack"**
3. Click **"Get it now"**
4. Click **"Add to Slack"**
5. Select workspace: `chatai-platform`
6. Configure notifications:
   - Channel: `#deploy`
   - Events: Issue created, Issue status changed, Sprint started, Sprint completed
7. Configure channels:
   - `#dev-backend`: Notifications for Backend stories
   - `#dev-frontend`: Notifications for Frontend stories
   - `#dev-devops`: Notifications for DevOps stories
8. Click **"Save"**

**Test:**
- Change issue status: CAP-6 from "To Do" → "In Progress"
- Verify: Notification appears in Slack #dev-backend

**Result:** ✅ Slack integrated

---

### **Step 8.3: Automation Rules (10 min)**

1. Go to **Project Settings** → **Automation**
2. Click **"Create rule"**

**Rule 1: Notify Slack on PR merged**
- Name: PR Merged Notification
- Trigger: GitHub PR merged
- Condition: Linked issue exists
- Action: Send Slack notification to #deployments
- Message: "🚀 PR merged for {{issue.key}}: {{issue.summary}}"

**Rule 2: Auto-transition on commit**
- Name: Auto In Progress on Commit
- Trigger: Commit created
- Condition: Issue status = "To Do"
- Action: Transition issue to "In Progress"

**Rule 3: Daily standup reminder**
- Name: Daily Standup Reminder
- Trigger: Scheduled (9:00 AM daily)
- Action: Send Slack notification to #standup
- Message: "🌅 Good morning team! Time for daily standup. Please share: 1) What you did yesterday 2) What you'll do today 3) Any blockers"

**Rule 4: Sprint ending reminder**
- Name: Sprint Ending Reminder
- Trigger: Scheduled (2 days before sprint end)
- Action: Send Slack notification to #pm
- Message: "⚠️ Sprint {{sprint.name}} ends in 2 days. Please complete all tasks."

3. Click **"Save"** for each rule

**Result:** ✅ Automation rules configured

---

## 9. BOARD CONFIGURATION

### **Step 9.1: Configure Scrum Board (10 min)**

1. Go to **Board** → **Board settings**
2. Configure columns:
   - Column 1: **To Do** (maps to "To Do")
   - Column 2: **In Progress** (maps to "In Progress")
   - Column 3: **Review** (maps to "Review")
   - Column 4: **Testing** (maps to "Testing")
   - Column 5: **Done** (maps to "Done")
3. Configure swimlanes:
   - Swimlane by: **Assignee**
   - Sort by: **Priority**
4. Configure quick filters:
   - Filter 1: **My Issues** (assignee = currentUser())
   - Filter 2: **Backend** (labels = "backend")
   - Filter 3: **Frontend** (labels = "frontend")
   - Filter 4: **DevOps** (labels = "devops")
   - Filter 5: **Blocked** (labels = "blocked")
5. Click **"Save"**

**Result:** ✅ Board configured

---

### **Step 9.2: Configure Backlog (5 min)**

1. Go to **Backlog**
2. Configure:
   - Group by: **Epic**
   - Sort by: **Priority** then **Sprint Week**
3. Enable:
   - ✅ Show subtasks
   - ✅ Show epic progress
   - ✅ Show story points
4. Click **"Save"**

**Result:** ✅ Backlog configured

---

## 10. REPORTS SETUP

### **Step 10.1: Configure Reports (10 min)**

1. Go to **Reports**
2. Enable reports:

**Report 1: Burndown Chart**
- Shows: Sprint progress
- X-axis: Days in sprint
- Y-axis: Story points remaining
- Use: Track if team is on track to complete sprint

**Report 2: Velocity Chart**
- Shows: Story points completed per sprint
- Use: Predict future sprint capacity

**Report 3: Sprint Report**
- Shows: Completed vs incomplete issues
- Use: Sprint retrospective

**Report 4: Cumulative Flow Diagram**
- Shows: Issues in each status over time
- Use: Identify bottlenecks

**Report 5: Control Chart**
- Shows: Cycle time per issue
- Use: Identify slow-moving issues

3. Pin important reports to dashboard

**Result:** ✅ Reports configured

---

### **Step 10.2: Create Dashboard (10 min)**

1. Go to **Dashboards** → **Create dashboard**
2. Name: **ChatAI Platform - Overview**
3. Add gadgets:
   - Sprint Health Gadget
   - Sprint Burndown Chart
   - Assigned to Me
   - Activity Stream
   - Recently Created Issues
   - Days Remaining
4. Arrange gadgets in 2-column layout
5. Click **"Save"**
6. Set as default dashboard

**Result:** ✅ Dashboard created

---

## 11. FINAL CHECKLIST

### **✅ Jira Setup Checklist**

- [x] Jira account created
- [x] 6 team members added
- [x] Project "ChatAI Platform" (CAP) created
- [x] 5 Epics created (CAP-1 to CAP-5)
- [x] 14 Stories created (CAP-6 to CAP-20)
- [x] 67 Subtasks created
- [x] Custom fields added (Phase, Milestone, Estimated Hours, Sprint Week)
- [x] Workflow configured (5 statuses)
- [x] 13 Sprints created and stories assigned
- [x] GitHub integrated
- [x] Slack integrated
- [x] Automation rules configured
- [x] Board configured
- [x] Reports configured
- [x] Dashboard created

**Status:** ✅ Jira setup complete! Ready to start Sprint 1.

---

## 12. NEXT STEPS

### **After Jira Setup:**

1. **Team Onboarding (30 min)**
   - Show team Jira project
   - Explain workflow
   - Demo how to update issues
   - Q&A

2. **Sprint 1 Planning Meeting (1 hour)**
   - Review Sprint 1 goals (M1 & M2)
   - Assign subtasks to team members
   - Clarify acceptance criteria
   - Set daily standup time

3. **Start Sprint 1** 🚀
   - Click "Start sprint" in Jira
   - Begin M1-S1: Setup Docker Compose
   - Daily standups at 9:00 AM

---

## 13. TIPS & BEST PRACTICES

### **Jira Best Practices:**

1. **Update issues daily**
   - Move cards on board as you work
   - Log hours worked
   - Add comments for blockers

2. **Use commit messages with issue keys**
   - Example: `git commit -m "feat(auth): add Google OAuth CAP-7"`
   - Auto-links commits to issues

3. **Use branch names with issue keys**
   - Example: `feature/CAP-7-google-oauth`
   - Auto-links branches to issues

4. **Close issues only when fully tested**
   - Don't move to "Done" until QA passes
   - Add test evidence (screenshots, logs)

5. **Keep backlog groomed**
   - Review backlog weekly
   - Update priorities
   - Add new issues as needed

6. **Use labels effectively**
   - backend, frontend, devops, urgent, blocked

7. **Track time accurately**
   - Log time worked on each subtask
   - Helps improve estimates

8. **Write clear acceptance criteria**
   - What does "done" mean?
   - How to verify?

---

## 14. TROUBLESHOOTING

### **Common Issues:**

**Issue 1: Can't see all stories**
- Solution: Check filters - clear all filters to see all issues

**Issue 2: Sprint not showing**
- Solution: Go to Backlog → Click "Create sprint"

**Issue 3: GitHub commits not linking**
- Solution: Use correct format: "CAP-#" in commit message

**Issue 4: Slack notifications not working**
- Solution: Re-authorize Slack app in Project Settings

**Issue 5: Subtasks not appearing**
- Solution: Go to Board settings → Enable "Show subtasks"

---

## 15. RESOURCES

### **Jira Documentation:**
- Jira User Guide: https://support.atlassian.com/jira-software-cloud/
- Jira Agile Guide: https://www.atlassian.com/agile/tutorials/how-to-do-scrum-with-jira-software

### **Integration Docs:**
- GitHub Integration: https://support.atlassian.com/jira-cloud-administration/docs/integrate-with-github/
- Slack Integration: https://slack.com/apps/A2RPP3NFR-jira-cloud

### **Automation:**
- Jira Automation: https://www.atlassian.com/software/jira/guides/automation

---

## 🎉 CONGRATULATIONS!

**Your Jira project is now fully configured and ready for development!**

**Next:** Move to **PART 3: PHASE 0 - PRE-START IMPLEMENTATION** to begin setting up your development environment.

---

**Questions?** Review this guide or contact team lead (thanhhaunv).

**Ready to code?** 🚀 Start Sprint 1 → M1-S1: Setup Docker Compose!
