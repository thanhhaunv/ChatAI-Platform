# 💻 04-development - Hướng dẫn Phát triển

> **Mục đích:** Standards & guidelines cho developers khi code  
> **Người phụ trách:** Tech Lead / Dev Lead  
> **Timeline:** Setup trong Phase 0, enforce suốt dự án

---

## 📝 DANH SÁCH FILES (5 files)

| # | File | Owner | Time | Priority | Enforce Tool |
|---|------|-------|------|----------|--------------|
| 1 | 01-Coding-Conventions.md | Tech Lead | 2-3 days | 🔴 Critical | ESLint, Prettier, Husky |
| 2 | 02-Architecture-Guidelines.md | Tech Lead | 2-3 days | 🔴 Critical | Code Review |
| 3 | 03-Environment-Setup.md | DevOps + Dev Lead | 1-2 days | 🔴 Critical | Docker, Scripts |
| 4 | 04-Git-Workflow.md | Tech Lead | 1 day | 🟠 High | Git hooks, Branch rules |
| 5 | 05-CI-CD-Pipeline.md | DevOps | 2-3 days | 🔴 Critical | GitHub Actions |

**Total:** 8-12 days initial setup

---

## 📋 CHI TIẾT FILES

### **File 1: 01-Coding-Conventions.md**
**Nội dung:** Code style standards cho TypeScript/JavaScript/Python

**Sections bắt buộc:**
1. Introduction (purpose, enforcement tools)
2. Naming Conventions
   - Variables: camelCase (userId, projectName)
   - Functions: camelCase (getUserById, sendMessage)
   - Classes: PascalCase (UserService, ChatController)
   - Interfaces: I prefix (IAuthService, IRepository)
   - Constants: UPPER_SNAKE_CASE (MAX_RETRY, API_URL)
   - Files: kebab-case (user-service.ts, auth.controller.ts)
3. Code Structure
   - File organization (imports → types → class → exports)
   - Function length: <50 lines recommended
   - Class length: <300 lines recommended
   - Nesting depth: <4 levels
4. TypeScript Specific
   - Strict mode enabled
   - No `any` type (use `unknown` or proper types)
   - Explicit return types for functions
   - Use interfaces for objects, types for unions/intersections
5. Comments & Documentation
   - JSDoc for all public methods
   - TODO comments format: `// TODO(username): description`
   - Complex logic: inline comments explaining WHY not WHAT
6. Error Handling
   - Always use try-catch for async
   - Never swallow errors silently
   - Use custom error classes (extends Error)
7. Testing Standards
   - Coverage: >70% required
   - Test files: *.spec.ts (unit), *.test.ts (integration)
   - AAA pattern: Arrange, Act, Assert
8. Code Review Checklist
   - [ ] No console.log in production code
   - [ ] No hardcoded values (use env vars)
   - [ ] All functions have tests
   - [ ] No TypeScript errors
   - [ ] ESLint/Prettier passing

**Tools:**
- ESLint config: `.eslintrc.json`
- Prettier config: `.prettierrc`
- Husky pre-commit hooks

**Checklist:**
- [ ] ESLint rules defined & documented
- [ ] Prettier rules consistent across team
- [ ] Husky hooks installed (lint + test on commit)
- [ ] EditorConfig file created
- [ ] Examples for each convention
- [ ] Enforced in CI/CD (fail build if lint fails)

---

### **File 2: 02-Architecture-Guidelines.md** ⭐
**Nội dung:** Design patterns & architectural principles

**Sections bắt buộc:**
1. Introduction
2. **Interface-First Development** (CORE PRINCIPLE)
   - Philosophy: Define contracts before implementation
   - Workflow: Design → Test → Implement → Integrate
   - Rules: Must have interface in 07-Interface-Contracts/
3. Dependency Injection
   - Use @Inject with interface tokens
   - Constructor injection only (no property injection)
   - Avoid circular dependencies
4. Design Patterns (4 bắt buộc)
   - Repository Pattern (database access)
   - Strategy Pattern (agent implementations)
   - Facade Pattern (API Gateway)
   - Observer Pattern (notifications)
5. Service Communication
   - REST for sync, Message Queue for async
   - Service boundaries respect
   - No direct DB access across services
6. Error Handling Architecture
   - Custom error hierarchy (IServiceError)
   - Standardized error response format
   - Error codes registry
7. Async Patterns
   - Promise-based (no callbacks)
   - AsyncGenerator for streaming
   - Timeout & retry strategies

**Checklist:**
- [ ] Interface-First workflow documented với examples
- [ ] 4 design patterns với code examples
- [ ] Service boundaries diagram
- [ ] Error hierarchy defined
- [ ] Async patterns với use cases
- [ ] Anti-patterns listed (what NOT to do)

---

### **File 3: 03-Environment-Setup.md**
**Nội dung:** Cài đặt môi trường development từ zero

**Sections bắt buộc:**
1. Prerequisites
   - Node.js v18+ (LTS)
   - Docker v20+
   - Git v2.30+
   - VSCode (recommended) + extensions
2. Repository Setup
   ```bash
   git clone https://github.com/thanhhaunv/ChatAI-Platform
   cd ChatAI-Platform
   npm install
   ```
3. Environment Variables
   - Copy `.env.example` to `.env`
   - Fill required values (DB, API keys, JWT secret)
   - Never commit `.env` to git
4. Docker Setup
   ```bash
   docker-compose up -d  # Start PostgreSQL, Redis, MinIO
   docker ps             # Verify containers running
   ```
5. Database Migration
   ```bash
   cd services/user-service
   npm run typeorm migration:run
   ```
6. Running Services
   - Backend: `npm run start:dev` in each service folder
   - Frontend: `npm run dev` in frontend/web
   - Mobile: `npx expo start` in frontend/mobile
7. Verify Setup
   - Backend: http://localhost:3000/health
   - Frontend: http://localhost:3001
   - API docs: http://localhost:3000/api-docs
8. Common Issues & Troubleshooting
   - Port conflicts
   - Docker permission errors
   - Migration failures
   - Module not found errors

**Deliverables:**
- [ ] Step-by-step setup script (setup.sh)
- [ ] .env.example file với all required vars
- [ ] Docker compose file tested
- [ ] Seed data scripts
- [ ] Troubleshooting guide

**Checklist:**
- [ ] Fresh install tested (zero to running < 30 mins)
- [ ] All dependencies version-pinned
- [ ] Scripts cross-platform (Mac/Linux/Windows WSL)
- [ ] Screenshots cho key steps
- [ ] Video walkthrough (optional, 5 mins)

---

### **File 4: 04-Git-Workflow.md**
**Nội dung:** Git branching strategy & commit conventions

**Sections bắt buộc:**
1. Branch Strategy (Git Flow)
   - `main` - Production (protected)
   - `develop` - Integration branch (protected)
   - `feature/*` - Feature branches (feature/M1-db-setup)
   - `bugfix/*` - Bug fixes
   - `hotfix/*` - Production hotfixes
   - `release/*` - Release preparation
2. Branch Protection Rules
   - `main`: Require PR + 2 approvals + CI passing
   - `develop`: Require PR + 1 approval + CI passing
   - No direct commits to main/develop
   - Delete branch after merge
3. Commit Message Convention (Conventional Commits)
   ```
   <type>(<scope>): <subject>
   
   <body>
   
   <footer>
   ```
   - Types: feat, fix, docs, style, refactor, test, chore
   - Examples:
     - `feat(auth): add Google OAuth login`
     - `fix(chat): resolve message streaming bug`
     - `docs(readme): update setup instructions`
4. PR (Pull Request) Guidelines
   - Title: Same as commit convention
   - Description: WHAT changed, WHY, HOW to test
   - Link to Jira ticket (Closes CAP-123)
   - Screenshots for UI changes
   - Reviewers: Min 2 (Tech Lead + 1 peer)
5. Code Review Process
   - Max 24h turnaround
   - Use GitHub review comments
   - Approve only if: Lint passes, tests pass, logic correct
   - Request changes if needed
6. Husky Git Hooks
   - `pre-commit`: Run ESLint + Prettier
   - `pre-push`: Run tests (fast unit tests only)
   - `commit-msg`: Validate commit message format
7. Merge Strategy
   - Squash merge for feature branches
   - No merge commits in main/develop
   - Keep linear history

**Config files:**
- `.husky/pre-commit`
- `.husky/pre-push`
- `.husky/commit-msg`
- `.github/PULL_REQUEST_TEMPLATE.md`

**Checklist:**
- [ ] Branch protection enabled on GitHub
- [ ] Husky hooks installed & tested
- [ ] PR template created
- [ ] Commit lint config (commitlint)
- [ ] Team trained on workflow
- [ ] Documented with examples

---

### **File 5: 05-CI-CD-Pipeline.md**
**Nội dung:** GitHub Actions workflows for automation

**Sections bắt buộc:**
1. Introduction (CI/CD benefits, tools: GitHub Actions)
2. Pipeline Overview
   ```
   Push/PR → Lint → Test → Build → Security Scan → Deploy
   ```
3. Workflows (5 workflows)
   
   **3.1 Lint & Format Check**
   - Trigger: Every push, every PR
   - Steps: Checkout → Setup Node → Run ESLint → Run Prettier
   - Fail if: Lint errors or format issues
   
   **3.2 Unit Tests**
   - Trigger: Every push, every PR
   - Steps: Checkout → Setup Node → Install deps → Run Jest
   - Fail if: Tests fail or coverage <70%
   
   **3.3 Integration Tests**
   - Trigger: PR to develop/main
   - Steps: Setup Docker services → Run migrations → Run tests
   - Fail if: Tests fail
   
   **3.4 Security Scan**
   - Trigger: PR to main
   - Steps: Snyk vulnerability scan → OWASP dependency check
   - Fail if: High/Critical vulnerabilities found
   
   **3.5 Deploy to Staging**
   - Trigger: Merge to develop
   - Steps: Build Docker images → Push to registry → Deploy to K8s staging
   - Manual approval for production
   
4. Workflow Files
   - `.github/workflows/lint.yaml`
   - `.github/workflows/test-unit.yaml`
   - `.github/workflows/test-integration.yaml`
   - `.github/workflows/security.yaml`
   - `.github/workflows/deploy-staging.yaml`

5. Secrets Management
   - GitHub Secrets for: AWS/GCP credentials, Docker registry, API keys
   - Never hardcode secrets in workflows
   - Rotate secrets quarterly

6. Notifications
   - Slack notifications on: Build failure, deployment success/failure
   - Email for: Security vulnerabilities

7. Badges
   - Add to README.md: Build status, test coverage, security

**Sample workflow (lint.yaml):**
```yaml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
```

**Checklist:**
- [ ] 5 workflows created & tested
- [ ] Secrets configured in GitHub
- [ ] Branch protection uses CI checks
- [ ] Slack webhook configured
- [ ] Badges added to README
- [ ] Deployment workflow tested on staging
- [ ] Rollback procedure documented

---

## ✅ WORKFLOW

```
Phase 0:
  Step 1: Tech Lead writes Coding Conventions + Architecture Guidelines
  Step 2: DevOps writes Environment Setup + CI/CD Pipeline
  Step 3: Tech Lead writes Git Workflow
  Step 4: Team review & approve all 5 docs
          ↓
Phase 1:
  Enforce standards in code reviews
  Monitor CI/CD metrics (build time, test pass rate)
  Iterate on guidelines based on feedback
```

---

## 👥 RACI

| File | Responsible | Accountable | Consulted | Informed |
|------|-------------|-------------|-----------|----------|
| 01 Coding Conventions | Tech Lead | Tech Lead | Senior Devs | All Devs |
| 02 Architecture Guidelines | Tech Lead | PM | Architects | All Devs |
| 03 Environment Setup | DevOps + Dev Lead | Tech Lead | Backend Devs | All |
| 04 Git Workflow | Tech Lead | PM | Dev Team | All |
| 05 CI/CD Pipeline | DevOps | Tech Lead | Dev Lead | All Devs |

---

## 📊 PROGRESS

**Overall:** 🟡 20% Complete (1/5 files done)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-Coding-Conventions.md | ✅ Done | 100% | None |
| 02-Architecture-Guidelines.md | ⏳ To Do | 0% | Waiting for interface contracts |
| 03-Environment-Setup.md | ⏳ To Do | 0% | Waiting for Docker setup |
| 04-Git-Workflow.md | ⏳ To Do | 0% | Need branch protection setup |
| 05-CI-CD-Pipeline.md | ⏳ To Do | 0% | Need GitHub Actions setup |

**Next Action:** Setup Docker environment, then write setup guide

---

## 🔄 ENFORCEMENT

**Automated (Tools):**
- ESLint: Catch code style violations
- Prettier: Auto-format code
- Husky: Block bad commits
- GitHub Actions: Block bad PRs
- Snyk: Block vulnerable dependencies

**Manual (Code Review):**
- Architecture adherence
- Design pattern usage
- Interface-First compliance
- Test quality
- Documentation completeness

**Metrics to Track:**
- Lint errors per week (goal: 0)
- Test coverage % (goal: >70%)
- Build success rate (goal: >95%)
- PR review time (goal: <24h)
- Hotfixes per month (goal: <5)

---

## 💡 TIPS CHO DEVELOPERS

### **First Day:**
1. Read all 5 docs trong folder này
2. Setup environment (File 3)
3. Make a test commit (File 4)
4. Run CI locally (File 5)

### **Daily:**
- Follow Coding Conventions (File 1)
- Check CI status before merge
- Review PRs within 24h

### **Before Coding:**
- Check Interface Contracts (../02-architecture/07-Interface-Contracts/)
- Read Architecture Guidelines (File 2)
- Follow design patterns

### **Before Commit:**
- Run lint: `npm run lint`
- Run tests: `npm test`
- Write good commit message

---

## 🔗 THAM CHIẾU

**Internal:**
- [Interface Contracts](../02-architecture/07-Interface-Contracts/) - Must read first
- [Architecture Guidelines](../02-architecture/06-Architecture-Guidelines.md)
- [API Specification](../02-architecture/05-API-Specification.yaml)

**External:**
- [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Last Updated:** October 15, 2025  
**Maintained by:** Tech Lead  
**Questions?** Contact tech-lead@chatai.com
