# 🗺️ PRE-START ROADMAP
**ChatAI Platform - M1 & M2 Implementation Roadmap**

---

## 📊 TỔNG QUAN KẾ HOẠCH

```
PHASE 0: PRE-START (3-4 ngày)
├── 📋 Setup Jira (Day 1)
├── 📋 Setup GitHub Projects (Day 1)
├── 📋 Setup Slack & Integrations (Day 2)
├── 📋 Setup Local Environment (Day 2-3)
└── 📋 Setup API Keys (Day 3)

PHASE 1: IMPLEMENTATION (Weeks 1-2)
├── ✅ M1: Database Setup (1 day)
└── ✅ M2: Auth Service (1 day)

TOTAL: 2 weeks (14 days)
```

---

## 🎯 PHASE 0: PRE-START SETUP (3-4 NGÀY)

### **PART 1: JIRA SETUP (Day 1 - 2-3 hours)**

**Mục tiêu:** Setup Jira để quản lý 6 người team, 12 milestones, 4 phases

#### **Step 1.1: Create Jira Project**
```
URL: https://thanhhaunv.atlassian.net/
1. Click "Create project" → Scrum
2. Project name: ChatAI Platform
3. Project key: CAP
4. Type: Scrum (2-week sprints)
5. Lead: Bạn (thanhhaunv)
```

**Output:** Jira project CAP

#### **Step 1.2: Create 4 Epics (cho 4 Phases)**
```
Epic 1: Phase 0 - Setup
Epic 2: Phase 1 - Backend Core (M1-M6)
Epic 3: Phase 2 - Advanced Features (M7-M10)
Epic 4: Phase 3 - Deployment & ML (M11-M12)
```

**Action items:**
- Create Epic in Jira
- Set timeline per epic
- Link to Roadmap.md

#### **Step 1.3: Create 12 Stories (M1-M12)**
```
Story format:
- Epic: Phase X
- Title: M1: Database Setup & Infrastructure
- Story Points: 8 (M1)
- Assignee: [Dev Lead]
- Sprint: Sprint 1
- Description: (from SRS.md)
```

**M1-M2 Stories to create:**
- M1-1: Setup Local Infrastructure with Docker (4 points)
- M1-2: Implement Database Schema from ERD (6 points)
- M1-3: Config Database Connection (2 points)
- M1-4: CI/CD Basic for Database (2 points)
- M2-1: Email/Phone Signup & Login (3 points)
- M2-2: OAuth Flows (Google, FB, TikTok) (2 points)
- M2-3: JWT Integration & Token Management (1 point)
- M2-4: CI/CD & Tests for Auth (1 point)

#### **Step 1.4: Configure Jira Workflow**
```
Status: To Do → In Progress → In Review → Testing → Done
Custom fields:
- GitHub PR link
- Deployment link
- Test coverage %
```

#### **Step 1.5: Setup Team & Permissions**
```
Team members (6 people):
1. You (thanhhaunv) - PM/Dev Lead
2. Dev 1 - Backend
3. Dev 2 - Backend
4. Dev 3 - Frontend
5. QA - Testing
6. DevOps - Infrastructure

Permissions:
- PM: Full access
- Dev Lead: Full access
- Devs: Create/edit issues
- QA: Create issues, add comments
- DevOps: Full access
```

**Output:** Team members added to Jira project

---

### **PART 2: GITHUB PROJECTS SETUP (Day 1 - 1-2 hours)**

**Mục tiêu:** Setup GitHub Projects để track code changes

#### **Step 2.1: Create GitHub Project**
```
GitHub Repo: https://github.com/thanhhaunv/ChatAI-Platform
1. Go to "Projects" tab
2. Create new project: "ChatAI Platform"
3. Template: "Table" (easier to manage)
4. Add fields: Status, Priority, Milestone, Assignee
```

#### **Step 2.2: Create GitHub Issues for M1-M2**
```
Issue format:
- Title: [M1-S1] Setup Local Infrastructure
- Labels: milestone/m1, backend, infrastructure
- Milestone: M1
- Assignee: Dev Lead
- Link to Jira issue
```

**Differences: Jira vs GitHub Projects**
```
JIRA: Sprint planning, team management, reporting
GITHUB PROJECTS: Code integration, PR links, git workflow

→ Use BOTH:
  - Jira for PM & team communication
  - GitHub Projects for developers & code tracking
```

#### **Step 2.3: Create Branch Protection Rules**
```
Main branch rules:
- Require PR reviews (2 people)
- Require status checks (CI/CD pass)
- Require up-to-date branches
- Dismiss stale reviews
- Include administrators
```

**Output:** GitHub project & issue tracking set up

---

### **PART 3: SLACK SETUP (Day 2 - 1-2 hours)**

**Mục tiêu:** Setup Slack cho team communication + integrations

#### **Step 3.1: Create Slack Workspace**
```
1. Go to slack.com
2. Click "Create a new workspace"
3. Name: ChatAI Platform
4. Email: thanhhaunv@...
5. Workspace URL: chatai-platform.slack.com
```

#### **Step 3.2: Create Slack Channels**
```
Channels:
1. #general - Team announcements
2. #dev-backend - Backend developers
3. #dev-frontend - Frontend developers
4. #dev-devops - DevOps & infrastructure
5. #testing - QA & testing
6. #deploy - Deployment & releases
7. #pm - PM decisions & roadmap
8. #random - Off-topic
9. #incidents - Production alerts
10. #standup - Daily standups
11. #deployments - Auto-deploy notifications
```

#### **Step 3.3: GitHub + Slack Integration**
```
Setup GitHub App in Slack:
1. Search for "GitHub" app in Slack App Store
2. Install GitHub app
3. Authorize GitHub account (thanhhaunv)
4. Connect repo: thanhhaunv/ChatAI-Platform
5. Set notifications for:
   - PR created → #deploy
   - PR merged → #deployments
   - Issue created → #dev-backend or #dev-frontend
   - CI/CD failed → #incidents
```

**Output:** GitHub PR & CI/CD notifications in Slack

#### **Step 3.4: Jira + Slack Integration**
```
Setup Jira app in Slack:
1. Search for "Jira Cloud" in Slack App Store
2. Install Jira app
3. Authorize Jira account
4. Connect project: CAP (ChatAI Platform)
5. Set notifications for:
   - Story moved to "In Progress" → #standup
   - Story moved to "Done" → #general
   - @assigned issues → Direct message
```

**Output:** Jira issues notified in Slack

#### **Step 3.5: Slack Bot for Daily Standup**
```
Daily standup bot (optional but recommended):
- 9:00 AM: Ask "What did you do yesterday?"
- Post in #standup
- Generates report for PM
```

**For now:** Manual standup in #standup

#### **Step 3.6: Add Team Members to Slack**
```
Invite 6 team members via email
Assign channels:
- All: #general, #random
- Devs: #dev-backend, #dev-frontend, #dev-devops
- QA: #testing
- PM: #pm
- Everyone: #standup, #deploy, #incidents
```

**Output:** 6 team members added, channels configured

---

### **PART 4: LOCAL ENVIRONMENT SETUP (Day 2-3 - 2-3 hours)**

**Mục tiêu:** Setup Docker, DB, Redis locally

#### **Step 4.1: Verify Prerequisites**
```
Check installed:
- Docker Desktop: https://www.docker.com/products/docker-desktop
  Command: docker --version (should be 20.10+)
- Node.js 18+: node --version
- pnpm: pnpm --version (or install: npm install -g pnpm)
- Git: git --version
- PostgreSQL client (optional): psql --version
```

#### **Step 4.2: Clone Repository**
```
git clone https://github.com/thanhhaunv/ChatAI-Platform.git
cd ChatAI-Platform
git checkout -b feature/m1-setup
```

#### **Step 4.3: Create .env.example → .env**
```
Copy from artifact:
cp .env.example .env

Edit .env (keep defaults for local dev):
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=secret
DB_NAME=chatai
...
```

#### **Step 4.4: Start Docker Services**
```
docker-compose up -d

Verify:
docker ps
# Should show: postgres, redis, minio (all "healthy")
```

#### **Step 4.5: Test Connections**
```
Test PostgreSQL:
psql -h localhost -U admin -d chatai -c "SELECT version();"

Test Redis:
redis-cli -h localhost ping
# Output: PONG

Test MinIO (web UI):
Open: http://localhost:9001
Login: minioadmin / minioadmin
```

**Output:** Local environment ready

---

### **PART 5: API KEYS SETUP (Day 3 - 2-3 hours)**

**Mục tiêu:** Get API keys từ external services (for M2 OAuth & M5 AI)

#### **Step 5.1: Google OAuth**
```
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create new project: "ChatAI Platform"
3. Enable APIs:
   - Google+ API
   - Google OAuth 2.0
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs:
     - http://localhost:3001/auth/oauth/google/callback
     - http://localhost:3000/auth/oauth/google/callback (frontend)
5. Copy Client ID & Secret → .env
   AUTH_GOOGLE_ID=...
   AUTH_GOOGLE_SECRET=...
```

**Output:** Google OAuth credentials in .env

#### **Step 5.2: Facebook OAuth**
```
1. Go to Facebook Developers: https://developers.facebook.com/
2. Create new app: "ChatAI Platform"
3. Add Facebook Login product
4. Configure OAuth Redirect URIs:
   - http://localhost:3001/auth/oauth/facebook/callback
5. Copy App ID & Secret → .env
   AUTH_FACEBOOK_ID=...
   AUTH_FACEBOOK_SECRET=...
```

**Output:** Facebook OAuth credentials in .env

#### **Step 5.3: TikTok OAuth**
```
1. Go to TikTok Developers: https://developers.tiktok.com/
2. Create new app: "ChatAI Platform"
3. Configure OAuth settings
4. Add Redirect URI:
   - http://localhost:3001/auth/oauth/tiktok/callback
5. Copy Client ID & Secret → .env
   AUTH_TIKTOK_ID=...
   AUTH_TIKTOK_SECRET=...
```

**Output:** TikTok OAuth credentials in .env

#### **Step 5.4: OpenAI API Key**
```
1. Go to OpenAI Platform: https://platform.openai.com/
2. Create API key in: https://platform.openai.com/account/api-keys
3. Copy key → .env
   OPENAI_API_KEY=sk-...
```

**Output:** OpenAI key in .env

#### **Step 5.5: Other AI APIs (for M5 later)**
```
Gemini API:
- https://makersuite.google.com/app/apikey
- GEMINI_API_KEY=...

Grok API:
- (Will get when needed in M5)

Claude API (Anthropic):
- https://console.anthropic.com/account/keys
- (Optional for M5 comparison)
```

**Output:** All API keys in .env (ready for M2 & M5)

---

### **PART 6: GIT WORKFLOW SETUP (Day 3 - 1 hour)**

**Mục tiêu:** Setup git branches & PR workflow

#### **Step 6.1: Create Main Branches**
```
git branch develop
git push origin develop

Protected branches (in GitHub):
- main: Require PR + CI passing
- develop: Require PR + 2 reviews
```

#### **Step 6.2: Branch Naming Convention**
```
For M1:
- feature/m1-db-setup
- feature/m1-migration
- feature/m1-ci-cd

For M2:
- feature/m2-auth-service
- feature/m2-oauth
- feature/m2-jwt

Pattern: feature/m{n}-{short-description}
```

#### **Step 6.3: Create PR Template**
```
.github/pull_request_template.md

Content:
## Description
Brief description of changes

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests passing
```

**Output:** Git workflow configured

---

## 📅 PHASE 1: M1 & M2 IMPLEMENTATION

### **SPRINT 1: M1 - Database Setup (1 Week)**

**Week 1:**
- Day 1: Setup PR created, review code from artifacts
- Day 2-3: Code M1 (4 stories)
- Day 4: Testing & bug fixes
- Day 5: Code review, merge to develop
- Day 5 PM: Deploy to staging (K8s later, Docker for now)

**Jira Updates:**
- Start sprint: "Sprint 1"
- Update status as work progresses
- Slack notification: "M1 started in #dev-backend"

**GitHub Updates:**
- Create M1 PR
- Status: "In Review"
- Merge when all tests pass

**Slack Updates:**
- #dev-backend: Daily standup
- #deployments: "M1 deployed to staging"

---

### **SPRINT 2: M2 - Auth Service (1 Week)**

**Week 2:**
- Day 1: Setup, review M2 artifacts
- Day 2-3: Code M2 (4 stories)
- Day 4: Testing OAuth flows
- Day 5: Code review, merge to develop
- Day 5 PM: Deploy to staging

**Same workflow as M1**

---

## ✅ DELIVERABLES BY END OF PRE-START

### **Jira:**
- ✅ Project created (CAP)
- ✅ 4 Epics created (Phases 0-3)
- ✅ 12 Stories created (M1-M12)
- ✅ Sprint 1 created (M1)
- ✅ Sprint 2 created (M2)
- ✅ 6 team members assigned
- ✅ Workflow configured

### **GitHub:**
- ✅ Repository set up
- ✅ Protected branches configured
- ✅ PR template created
- ✅ GitHub Projects board created
- ✅ Issues for M1-M2 created

### **Slack:**
- ✅ Workspace created
- ✅ 11 channels created
- ✅ GitHub + Jira integrations
- ✅ 6 team members added
- ✅ Notifications configured

### **Local Environment:**
- ✅ Docker services running
- ✅ PostgreSQL, Redis, MinIO up
- ✅ All connections tested
- ✅ .env file created

### **API Keys:**
- ✅ Google OAuth
- ✅ Facebook OAuth
- ✅ TikTok OAuth
- ✅ OpenAI API key
- ✅ All keys in .env

### **Git Workflow:**
- ✅ Main branches created
- ✅ Branch naming convention defined
- ✅ PR template created

---

## 🎯 QUESTIONS BEFORE WE START?

**Bạn hiểu roadmap này chưa? Có cần thêm gì không?**

1. Có phần nào bạn muốn chi tiết hơn không?
2. Bạn accept kế hoạch này chưa?
3. Bạn sẵn sàng bắt đầu từ PART 1: JIRA SETUP chưa?

---

**NẾU OK, TÔI SẼ TẠO ARTIFACTS CHI TIẾT CHO TỪNG PART:**
- Part 1: Jira Setup (step-by-step screenshots/instructions)
- Part 2: GitHub Projects
- Part 3: Slack Setup
- ... và cứ thế

**Confirm nhé! 🚀**
