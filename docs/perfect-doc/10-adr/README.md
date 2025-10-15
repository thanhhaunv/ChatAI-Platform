# 📝 10-adr - Architecture Decision Records

> **Mục đích:** Document key architectural decisions với context & rationale  
> **Người phụ trách:** Tech Lead / System Architect  
> **Timeline:** Ongoing (document decisions as they happen)

---

## 📖 GIỚI THIỆU ADR

### **ADR là gì?**
Architecture Decision Record (ADR) là tài liệu ngắn ghi lại:
- **Decision:** Quyết định kỹ thuật quan trọng (e.g., "Use NestJS for backend")
- **Context:** Tại sao cần quyết định này?
- **Consequences:** Hệ quả (ưu/nhược điểm) của quyết định
- **Alternatives:** Các lựa chọn khác đã xem xét (và tại sao không chọn)

### **Tại sao cần ADR?**
- **Knowledge preservation:** Tránh "why did we do this?" sau 6 tháng
- **Onboarding:** New members hiểu rationale nhanh hơn
- **Debate resolution:** Document consensus, tránh tranh cãi lặp lại
- **Historical record:** Audit trail cho architectural evolution

### **Khi nào viết ADR?**
- Chọn framework/library chính (NestJS, Next.js, Kubernetes)
- Quyết định về architecture pattern (microservices, monolith)
- Database choice (PostgreSQL, MongoDB)
- Major trade-offs (performance vs simplicity)
- **Không cần ADR cho:** Coding style, minor library choices, trivial decisions

---

## 📝 DANH SÁCH ADR (Minimum 10 ADRs)

| # | ADR | Status | Date | Author | Impact |
|---|-----|--------|------|--------|--------|
| 0001 | [Use NestJS for Backend](#adr-0001-use-nestjs-for-backend) | ✅ Accepted | 2025-10-01 | Tech Lead | 🔴 High |
| 0002 | [Conversation Threading Strategy](#adr-0002-conversation-threading-strategy) | ✅ Accepted | 2025-10-05 | Tech Lead | 🔴 High |
| 0003 | [Kubernetes for Deployment](#adr-0003-kubernetes-for-deployment) | ✅ Accepted | 2025-10-08 | DevOps | 🟠 Medium |
| 0004 | [PostgreSQL as Primary Database](#adr-0004-postgresql-as-primary-database) | ✅ Accepted | 2025-10-02 | Tech Lead | 🔴 High |
| 0005 | [Microservices Architecture](#adr-0005-microservices-architecture) | ✅ Accepted | 2025-10-03 | Architect | 🔴 High |
| 0006 | [JWT for Authentication](#adr-0006-jwt-for-authentication) | ✅ Accepted | 2025-10-04 | Security Lead | 🟠 Medium |
| 0007 | [Tailwind CSS for Styling](#adr-0007-tailwind-css-for-styling) | ✅ Accepted | 2025-10-06 | Frontend Lead | 🟢 Low |
| 0008 | [Redis for Caching](#adr-0008-redis-for-caching) | ✅ Accepted | 2025-10-07 | Tech Lead | 🟠 Medium |
| 0009 | [WebSocket for Real-time Chat](#adr-0009-websocket-for-real-time-chat) | ✅ Accepted | 2025-10-09 | Backend Lead | 🔴 High |
| 0010 | [Docker for Self-Hosted Agents](#adr-0010-docker-for-self-hosted-agents) | ✅ Accepted | 2025-10-10 | DevOps | 🔴 High |

**Status Legend:**
- ✅ Accepted: Decision final, implemented
- 🔄 Proposed: Under review
- ❌ Rejected: Not chosen
- ⚠️ Deprecated: Replaced by newer ADR
- 🔀 Superseded: See ADR-XXXX

---

## 📋 ADR TEMPLATE

**Mỗi ADR file phải theo format này:**

```markdown
# ADR-XXXX: [Title]

**Status:** Accepted / Proposed / Rejected / Deprecated / Superseded  
**Date:** YYYY-MM-DD  
**Author:** [Name/Role]  
**Deciders:** [List of people who approved]  
**Impact:** High / Medium / Low

---

## Context

[Describe the issue/problem that needs a decision]
- What is the current situation?
- What constraints exist?
- What are the requirements?

## Decision

[State the decision clearly in 1-2 sentences]

We will [decision].

## Rationale

[Explain WHY this decision was made]
- Reason 1: [Detail]
- Reason 2: [Detail]
- Reason 3: [Detail]

## Alternatives Considered

### Alternative 1: [Option]
**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

**Why not chosen:** [Reason]

### Alternative 2: [Option]
[Same structure...]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Trade-off 1]
- [Trade-off 2]

### Neutral
- [Note 1]

## Implementation

[How will this be implemented? Timeline?]
- Step 1: [Action]
- Step 2: [Action]
- Timeline: [X weeks/months]

## References

- [Link to discussion (Slack thread, meeting notes)]
- [Documentation: NestJS docs, etc.]
- [Related ADRs: ADR-XXXX]

---

**Last Updated:** YYYY-MM-DD  
**Reviewers:** [Names]
```

---

## 📄 ADR CHI TIẾT (10 ADRs)

### **ADR-0001: Use NestJS for Backend**

**Status:** ✅ Accepted  
**Date:** 2025-10-01  
**Author:** Tech Lead  
**Deciders:** Tech Lead, CTO, Senior Backend Devs  
**Impact:** 🔴 High

---

#### Context
Need to choose a Node.js framework for building 8 microservices (auth, user, chat, billing, agent mgmt, ML training, notification, API gateway). Requirements:
- TypeScript support (type safety)
- Microservices-friendly (modularity, scalability)
- Mature ecosystem (libraries, community)
- Good documentation & learning curve
- Dependency injection (testability)

#### Decision
We will use **NestJS** as the backend framework.

#### Rationale
1. **TypeScript-first:** Built for TypeScript (not bolted on)
2. **Architecture:** Modular structure perfect for microservices
3. **Dependency Injection:** Built-in IoC container (easy testing, loose coupling)
4. **Mature:** 50K+ stars on GitHub, used by Adidas, Roche, etc.
5. **Documentation:** Excellent docs, large community
6. **Ecosystem:** Supports Express/Fastify, TypeORM, GraphQL, WebSocket out-of-box

#### Alternatives Considered

**Alternative 1: Express.js**
- Pros: Minimal, flexible, huge ecosystem
- Cons: No structure (team must define conventions), no built-in DI, no TypeScript first-class
- Why not: Too low-level for team (junior devs need structure)

**Alternative 2: Fastify**
- Pros: Faster than Express, modern, schema validation
- Cons: Smaller ecosystem, less DI support
- Why not: Speed not critical bottleneck, NestJS can use Fastify under the hood if needed

**Alternative 3: Koa.js**
- Pros: Lightweight, async/await native
- Cons: Minimal features, small community
- Why not: Same as Express (too bare-bones)

#### Consequences

**Positive:**
- Team learns industry-standard framework (good for hiring)
- Consistent code structure across all 8 services
- Easy testing (DI makes mocking simple)
- Microservices support (multiple transport layers: HTTP, gRPC, RabbitMQ)

**Negative:**
- Complexity (8 services to manage vs 1)
- Distributed debugging harder (need centralized logging)
- Network overhead (inter-service calls)
- Eventual consistency challenges (handle with patterns)

**Neutral:**
- Need API Gateway (reverse proxy, routing)
- Need service mesh (optional, use Istio if needed)

#### Implementation
- Phase 1: Build services incrementally (M1-M7)
- M4: Setup API Gateway (centralized entry point)
- Phase 3: Deploy to K8s (each service = deployment)
- Monitoring: Distributed tracing (Jaeger optional)

#### References
- Architecture: docs/02-architecture/01-System-Architecture.md
- Martin Fowler: [Microservices Guide](https://martinfowler.com/microservices/)
- Related: ADR-0001 (NestJS), ADR-0003 (K8s)

---

### **ADR-0006: JWT for Authentication**

**Status:** ✅ Accepted  
**Date:** 2025-10-04  
**Author:** Security Lead  
**Deciders:** Security Lead, Tech Lead, Backend Devs  
**Impact:** 🟠 Medium

---

#### Context
Need to authenticate users across 8 microservices. Requirements:
- Stateless (no session storage)
- Secure (encrypted, tamper-proof)
- Standard (industry-accepted)
- Support OAuth providers (Google, Facebook, TikTok)

#### Decision
We will use **JSON Web Tokens (JWT)** with HMAC-SHA256 signing, 1-hour expiry, and refresh tokens (7 days).

#### Rationale
1. **Stateless:** API Gateway verifies JWT, no DB lookup (fast)
2. **Standard:** RFC 7519, supported by all languages/frameworks
3. **OAuth-friendly:** OAuth returns access tokens, we convert to JWT
4. **Scalable:** No shared session store (Redis not needed for auth)

#### Alternatives Considered

**Alternative 1: Session-based (cookies + Redis)**
- Pros: Easier to revoke (delete from Redis)
- Cons: Stateful (Redis dependency), not great for mobile apps
- Why not: Prefer stateless for microservices

**Alternative 2: OAuth tokens directly (no JWT)**
- Pros: One less conversion step
- Cons: Each service validates with OAuth provider (slow, rate limits)
- Why not: JWT caches user info (email, role) in token

**Alternative 3: Opaque tokens + DB lookup**
- Pros: Easy to revoke
- Cons: DB hit on every request (latency)
- Why not: Prioritize speed over instant revocation (use token blacklist if needed)

#### Consequences

**Positive:**
- Fast (no DB/Redis lookup)
- Scalable (stateless)
- Mobile-friendly (tokens in headers)

**Negative:**
- Hard to revoke (until expiry) - mitigate with short expiry + refresh tokens
- Token size (~500 bytes, larger than session ID)

**Neutral:**
- Must implement token refresh flow (complexity)

#### Implementation
- M2: Auth service generates JWT on login
- M4: API Gateway verifies JWT (middleware)
- Refresh token: Stored in DB (user_id, token, expiry)

#### References
- [JWT.io](https://jwt.io/)
- Security: docs/07-security/01-Security-Guidelines.md
- Code: services/auth-service/src/strategies/jwt.strategy.ts

---

### **ADR-0007: Tailwind CSS for Styling**

**Status:** ✅ Accepted  
**Date:** 2025-10-06  
**Author:** Frontend Lead  
**Deciders:** Frontend Lead, Designer, Tech Lead  
**Impact:** 🟢 Low

---

#### Context
Need CSS framework for Next.js web app + React Native. Requirements:
- Rapid development (quick styling)
- Consistent design system (colors, spacing)
- Small bundle size (performance)
- Responsive (mobile-first)

#### Decision
We will use **Tailwind CSS v3** (utility-first framework).

#### Rationale
1. **Utility-first:** Compose styles with classes (fast prototyping)
2. **Design system:** Configure theme (colors, spacing) once, use everywhere
3. **Tree-shaking:** Unused styles removed (small bundle)
4. **No context switching:** Write styles inline (no separate CSS files)
5. **Popular:** 70K+ stars, used by GitHub, Shopify, etc.

#### Alternatives Considered

**Alternative 1: CSS Modules**
- Pros: Scoped styles, standard CSS
- Cons: Verbose (separate file per component), no design system
- Why not: Slower development

**Alternative 2: Styled Components (CSS-in-JS)**
- Pros: Dynamic styles, scoped
- Cons: Runtime overhead, larger bundle
- Why not: Performance penalty

**Alternative 3: Material-UI**
- Pros: Pre-built components
- Cons: Opinionated design, hard to customize
- Why not: Want full design control

#### Consequences

**Positive:**
- Fast development (no writing custom CSS)
- Consistent (design tokens enforced)
- Responsive utilities (sm:, md:, lg:)

**Negative:**
- HTML cluttered with classes (trade-off for speed)
- Learning curve (utility classes naming)

**Neutral:**
- Need PurgeCSS config (remove unused styles)

#### Implementation
- Phase 1: Install Tailwind, configure theme
- Design System: Map colors/spacing to Tailwind config
- Storybook: Components use Tailwind classes

#### References
- [Tailwind Docs](https://tailwindcss.com/)
- Design System: docs/08-design/02-Design-System.md
- tailwind.config.js in repo

---

### **ADR-0008: Redis for Caching**

**Status:** ✅ Accepted  
**Date:** 2025-10-07  
**Author:** Tech Lead  
**Deciders:** Tech Lead, Backend Devs  
**Impact:** 🟠 Medium

---

#### Context
API calls to external agents (OpenAI, Gemini) are slow (2-5s) and expensive ($0.01-0.05 per request). Need caching layer.
Requirements:
- Fast (< 10ms read)
- TTL support (expire cache)
- Pub/Sub (for notifications)

#### Decision
We will use **Redis** for caching agent responses and pub/sub notifications.

#### Rationale
1. **Speed:** In-memory, <10ms latency
2. **TTL:** Auto-expire cached responses (e.g., 1 hour)
3. **Pub/Sub:** Use for real-time notifications (WebSocket backend)
4. **Simple:** Key-value store, easy to use
5. **Proven:** Used by Twitter, GitHub, Stack Overflow

#### Alternatives Considered

**Alternative 1: Memcached**
- Pros: Faster than Redis (slightly)
- Cons: No persistence, no pub/sub
- Why not: Need pub/sub for notifications

**Alternative 2: In-memory cache (Node.js Map)**
- Pros: No external dependency
- Cons: Lost on restart, not shared across pods
- Why not: Need shared cache (K8s multi-pod)

**Alternative 3: Database cache (Postgres)**
- Pros: No extra infrastructure
- Cons: Slow (50-100ms vs 10ms)
- Why not: Defeats purpose of cache

#### Consequences

**Positive:**
- Reduce API costs (cache common queries)
- Improve latency (10ms vs 2s)
- Real-time notifications via pub/sub

**Negative:**
- Extra infrastructure (Redis pod in K8s)
- Cache invalidation complexity (classic hard problem)

**Neutral:**
- Need cache strategy (what to cache, TTL)

#### Implementation
- M1: Setup Redis (Docker local, ElastiCache prod)
- M5: Cache agent responses (key: hash of prompt)
- M6.5: Pub/sub for notifications

#### References
- [Redis Docs](https://redis.io/docs/)
- Cache strategy: services/chat-service/src/cache.service.ts

---

### **ADR-0009: WebSocket for Real-time Chat**

**Status:** ✅ Accepted  
**Date:** 2025-10-09  
**Author:** Backend Lead  
**Deciders:** Backend Lead, Tech Lead  
**Impact:** 🔴 High

---

#### Context
Users expect real-time chat (like ChatGPT). AI streams responses token-by-token. Requirements:
- Bidirectional (client ↔ server)
- Low latency (<100ms)
- Streaming (send partial responses)

#### Decision
We will use **WebSocket** (Socket.io library) for real-time chat.

#### Rationale
1. **Real-time:** Full-duplex connection (server pushes data)
2. **Streaming:** Send AI response incrementally (better UX)
3. **Socket.io:** Built-in reconnection, fallback to polling
4. **NestJS support:** @nestjs/websockets module

#### Alternatives Considered

**Alternative 1: HTTP Polling (short polling)**
- Pros: Simple, uses standard HTTP
- Cons: Wasteful (poll every second even if no updates)
- Why not: Inefficient, high latency

**Alternative 2: Server-Sent Events (SSE)**
- Pros: Simpler than WebSocket, server → client only
- Cons: Unidirectional (need separate HTTP for client → server)
- Why not: Want bidirectional (user can cancel mid-stream)

**Alternative 3: gRPC streaming**
- Pros: Efficient, typed
- Cons: Not browser-native (need Envoy proxy), complex
- Why not: WebSocket simpler for web apps

#### Consequences

**Positive:**
- Great UX (streaming like ChatGPT)
- Low latency (no polling overhead)
- Battery-friendly (mobile apps)

**Negative:**
- Connection management (reconnect on network loss)
- Load balancer config (sticky sessions needed)

**Neutral:**
- Need WebSocket Gateway service

#### Implementation
- M6: Setup WebSocket Gateway (NestJS)
- Streaming: OpenAI API stream → WebSocket emit
- Reconnection: Socket.io handles automatically

#### References
- [Socket.io Docs](https://socket.io/docs/)
- Code: services/chat-service/src/chat.gateway.ts
- Related: ADR-0008 (Redis for pub/sub)

---

### **ADR-0010: Docker for Self-Hosted Agents**

**Status:** ✅ Accepted  
**Date:** 2025-10-10  
**Author:** DevOps Lead  
**Deciders:** DevOps, Tech Lead, ML Engineer  
**Impact:** 🔴 High

---

#### Context
Users want to deploy custom AI agents (fine-tuned models, proprietary). Requirements:
- Isolated environment (security)
- Portable (run anywhere)
- Easy deploy (one command)
- Support GPU (for ML models)

#### Decision
We will use **Docker containers** for self-hosted agent deployment.

#### Rationale
1. **Isolation:** Each agent in separate container (security, resource limits)
2. **Portable:** Docker image runs on any host (dev, staging, prod)
3. **Kubernetes-native:** K8s manages Docker containers
4. **GPU support:** NVIDIA Docker runtime for ML models
5. **Standard:** Docker is industry default

#### Alternatives Considered

**Alternative 1: VM per agent**
- Pros: Full isolation
- Cons: Heavy (GB RAM per VM), slow startup (minutes)
- Why not: Too resource-intensive

**Alternative 2: Serverless (AWS Lambda)**
- Pros: Zero management
- Cons: 15-min timeout (ML training takes hours), no persistent state
- Why not: Not suitable for long-running ML tasks

**Alternative 3: Bare metal (no containerization)**
- Pros: Maximum performance
- Cons: No isolation, hard to manage dependencies
- Why not: Security risk (agents could interfere)

#### Consequences

**Positive:**
- Easy for users (provide Docker image URL)
- Scalable (K8s schedules containers)
- GPU support (ML models run on GPU nodes)

**Negative:**
- Docker learning curve for users (provide docs)
- Image registry needed (Docker Hub or private)

**Neutral:**
- Health checks required (liveness probes)

#### Implementation
- M11: Agent management UI (deploy button)
- Backend: Deploy to K8s (kubectl apply)
- Health check: HTTP endpoint /health
- GPU: Label GPU nodes, schedule there

#### References
- [Docker Docs](https://docs.docker.com/)
- Deployment: docs/06-deployment/01-Deployment-Guide.md
- US-008: Self-hosted agent deploy

---

## ✅ WORKFLOW

```
When making a decision:
  Step 1: Identify need for ADR (major architectural choice)
  Step 2: Research alternatives (pros/cons)
  Step 3: Discuss with team (Slack #tech-decisions or meeting)
  Step 4: Write ADR draft (use template)
  Step 5: Review (Tech Lead + relevant stakeholders)
  Step 6: Approve & commit ADR to repo
          ↓
Ongoing:
  Update ADRs if decisions change (mark old ADR as Superseded)
  Reference ADRs in PR reviews ("Why NestJS? See ADR-0001")
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Identify need for ADR | Any team member | Tech Lead | - | Team |
| Research alternatives | Decision proposer | Tech Lead | Team | - |
| Write ADR draft | Decision proposer | Tech Lead | - | - |
| Review ADR | Tech Lead + Stakeholders | Tech Lead | Team | - |
| Approve ADR | Tech Lead | CTO | Architect | All Team |
| Update ADRs | Original author | Tech Lead | - | Team |

---

## 📊 ADR STATISTICS

**Current Status:**
- ✅ Accepted: 10 ADRs
- 🔄 Proposed: 0 ADRs
- ❌ Rejected: 0 ADRs
- ⚠️ Deprecated: 0 ADRs

**By Impact:**
- 🔴 High: 6 ADRs (NestJS, Threading, Postgres, Microservices, WebSocket, Docker)
- 🟠 Medium: 3 ADRs (K8s, JWT, Redis)
- 🟢 Low: 1 ADR (Tailwind)

**By Date:**
- October 2025: 10 ADRs (initial decisions during Phase 0)

---

## 💡 TIPS FOR WRITING ADRs

### **Good ADR:**
- **Clear decision:** "We will use X" (not "We might use X")
- **Context rich:** Explain WHY decision needed
- **Alternatives documented:** Show what was considered (3+ options)
- **Consequences honest:** Admit trade-offs (no perfect solution)
- **Reviewable:** Team can understand & challenge

### **Bad ADR:**
- **Vague:** "We should probably use microservices"
- **No context:** "Use Redis" (why? what problem solving?)
- **No alternatives:** Only one option (not real decision)
- **Cherry-picking:** Only positive consequences (unrealistic)
- **Too long:** 10 pages (should be 1-3 pages max)

### **When to write:**
- ✅ Choosing framework (NestJS vs Express)
- ✅ Architecture pattern (monolith vs microservices)
- ✅ Database choice (SQL vs NoSQL)
- ✅ Major trade-offs (consistency vs availability)
- ❌ Library version (React 18 vs 19) - too minor
- ❌ Coding style (tabs vs spaces) - use linter
- ❌ Naming conventions - use style guide

---

## 🔗 THAM CHIẾU

**Internal:**
- [System Architecture](../02-architecture/01-System-Architecture.md) - Implementation of ADRs
- [Tech Stack](../02-architecture/04-Tech-Stack.md) - Technologies chosen via ADRs
- [Roadmap](../03-project-management/01-Roadmap.md) - Timeline for ADR implementation

**External - ADR Resources:**
- [ADR GitHub Organization](https://adr.github.io/) - Templates & tools
- [Michael Nygard: ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) - Original article
- [ADR Tools](https://github.com/npryce/adr-tools) - CLI for managing ADRs
- [ThoughtWorks ADR Guide](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)

**Examples from Open Source:**
- [Kubernetes ADRs](https://github.com/kubernetes/enhancements)
- [Spotify ADRs](https://github.com/spotify/backstage/tree/master/docs/architecture-decisions)
- [Zalando ADRs](https://github.com/zalando/zalenium/tree/master/docs/adr)

---

## 📋 CHECKLIST FOR NEW ADR

Before committing ADR:
- [ ] Uses ADR template (Status, Date, Author, etc.)
- [ ] Decision clearly stated (1-2 sentences)
- [ ] Context explains WHY decision needed
- [ ] 3+ alternatives considered (with pros/cons)
- [ ] Consequences documented (positive + negative)
- [ ] Implementation plan included
- [ ] References added (docs, discussions)
- [ ] Reviewed by Tech Lead + 2 team members
- [ ] Approved & signed off
- [ ] Committed to Git (docs/10-adr/XXXX-title.md)
- [ ] Announced in Slack (#tech-decisions)

---

## 🎯 ADR MAINTENANCE

**Monthly:**
- Review ADR list: Any outdated?
- Update status if decisions changed (Superseded)

**Per Major Feature:**
- Document new architectural decisions
- Cross-reference existing ADRs

**Annually:**
- Full audit: Are ADRs still valid?
- Deprecate obsolete ADRs
- Extract patterns (common decision themes)

---

## 🚀 NEXT ADRs (Proposed)

Future decisions that may need ADRs:

| # | Topic | Status | Priority |
|---|-------|--------|----------|
| 0011 | Monitoring Stack (Prometheus vs Datadog) | 🔄 Proposed | Phase 3 |
| 0012 | CI/CD Platform (GitHub Actions vs GitLab CI) | 🔄 Proposed | Phase 0 |
| 0013 | Error Tracking (Sentry vs Rollbar) | 🔄 Proposed | Phase 2 |
| 0014 | Message Queue (RabbitMQ vs Kafka) | 🔄 Proposed | Phase 2 |
| 0015 | API Versioning Strategy (/v1/ vs headers) | 🔄 Proposed | Phase 1 |

---

**Last Updated:** October 15, 2025  
**Maintained by:** Tech Lead  
**Questions?** Discuss in Slack #tech-decisions
- Learning curve (1-2 weeks for junior devs)
- Opinionated (less flexibility than Express)
- Slightly heavier than Express (acceptable trade-off)

**Neutral:**
- Locked into NestJS patterns (but migration possible via interfaces)

#### Implementation
- Week 1: Setup boilerplate for all 8 services
- Week 2-22: Develop services incrementally
- Training: Share NestJS best practices doc, code review sessions

#### References
- [NestJS Docs](https://docs.nestjs.com/)
- [Discussion: Slack #tech-decisions thread (Oct 1, 2025)](link)
- Related: ADR-0005 (Microservices Architecture)

---

### **ADR-0002: Conversation Threading Strategy**

**Status:** ✅ Accepted  
**Date:** 2025-10-05  
**Author:** Tech Lead  
**Deciders:** Tech Lead, Backend Lead, Product Owner  
**Impact:** 🔴 High

---

#### Context
Users chat with AI agents. Need to maintain context across messages. Problem: How to structure conversations?
- Flat (all messages in one table, no grouping) → Context lost
- Threads (group messages by thread_id) → Context preserved
Requirements:
- AI must remember previous messages (context window)
- Users organize chats (rename, archive, search threads)
- Support multiple threads per project

#### Decision
We will use **threaded conversations** with `CONVERSATIONS` table storing metadata and `MESSAGES` table storing individual messages linked by `conversation_id`.

#### Rationale
1. **Context preservation:** Each thread has history, AI queries last N messages
2. **Organization:** Users can name threads ("Budget Discussion"), easier to find
3. **Scalability:** Separate threads = smaller context windows (cheaper API calls)
4. **Database normalization:** Clean schema (1 conversation → many messages)

#### Alternatives Considered

**Alternative 1: Flat message list (no threads)**
- Pros: Simpler schema (1 table)
- Cons: No context grouping, can't name chats, hard to search
- Why not: Poor UX (user lost in sea of messages)

**Alternative 2: Session-based (expire after timeout)**
- Pros: Auto-cleanup old chats
- Cons: Context lost if user returns next day
- Why not: Users want persistent history

#### Consequences

**Positive:**
- Better UX (organized chats, searchable)
- Efficient API calls (only send relevant thread context to AI)
- Aligns with US-009 (thread management feature)

**Negative:**
- Slightly more complex schema (2 tables vs 1)
- Must handle thread lifecycle (create, archive, delete)

**Neutral:**
- Database queries join 2 tables (CONVERSATIONS + MESSAGES) - acceptable performance

#### Implementation
- M1: Create tables (CONVERSATIONS, MESSAGES with FK)
- M3: Implement thread CRUD (create, list, rename, delete)
- M5: Chat service sends thread context to AI (last 10 messages)

#### References
- ERD: docs/02-architecture/02-Database-Design-ERD.md
- US-009: docs/01-requirements/03-User-Stories.md
- Discussion: Team meeting notes (Oct 5, 2025)

---

### **ADR-0003: Kubernetes for Deployment**

**Status:** ✅ Accepted  
**Date:** 2025-10-08  
**Author:** DevOps Lead  
**Deciders:** DevOps, Tech Lead, CTO  
**Impact:** 🟠 Medium

---

#### Context
Need to deploy 8 microservices + 3 databases (PostgreSQL, Redis, MinIO) to production. Requirements:
- Scalability (10K concurrent users)
- High availability (99.5% uptime)
- Easy rollback (blue-green deployment)
- Container orchestration

#### Decision
We will deploy using **Kubernetes** (K8s) on AWS EKS or GCP GKE.

#### Rationale
1. **Industry standard:** K8s is default for microservices (not vendor lock-in)
2. **Auto-scaling:** Horizontal Pod Autoscaler based on CPU/memory
3. **Self-healing:** Restart failed pods automatically
4. **Rolling updates:** Zero-downtime deployments
5. **Cloud-agnostic:** Can migrate between AWS/GCP/Azure easily

#### Alternatives Considered

**Alternative 1: Docker Compose**
- Pros: Simple, good for dev/staging
- Cons: Not for production (no auto-scaling, single-host)
- Why not: Can't scale to 10K users

**Alternative 2: AWS ECS (Elastic Container Service)**
- Pros: Simpler than K8s, AWS-native
- Cons: Vendor lock-in, less features than K8s
- Why not: Team prefers K8s skills (transferable)

**Alternative 3: Serverless (AWS Lambda, Cloud Functions)**
- Pros: No server management, pay-per-use
- Cons: Cold starts, not ideal for stateful services (chat)
- Why not: WebSocket not well-supported, complex for microservices

#### Consequences

**Positive:**
- Scales automatically (handle traffic spikes)
- High availability (multi-zone deployment)
- Team learns K8s (valuable skill)

**Negative:**
- Complex setup (1-2 weeks learning curve)
- Higher cost than simple VMs (acceptable for scale)
- Monitoring overhead (need Prometheus, Grafana)

**Neutral:**
- Requires DevOps expertise (hire or train)

#### Implementation
- Week 15-16: Setup K8s cluster (Terraform)
- Week 17: Deploy to staging
- Week 18: Deploy to production
- Monitoring: Prometheus + Grafana (Phase 3)

#### References
- [Kubernetes Docs](https://kubernetes.io/docs/)
- Terraform: docs/06-deployment/02-Infrastructure-Setup.md
- Discussion: DevOps meeting (Oct 8, 2025)
- Related: ADR-0010 (Docker for agents)

---

### **ADR-0004: PostgreSQL as Primary Database**

**Status:** ✅ Accepted  
**Date:** 2025-10-02  
**Author:** Tech Lead  
**Deciders:** Tech Lead, DBA, Backend Devs  
**Impact:** 🔴 High

---

#### Context
Need to choose database for storing users, projects, conversations, messages, billing logs. Requirements:
- ACID compliance (data integrity)
- Relational (many-to-many: users-projects, conversations-messages)
- JSONB support (flexible metadata, agent configs)
- Mature, reliable, good performance

#### Decision
We will use **PostgreSQL 15** as the primary database.

#### Rationale
1. **ACID:** Full transactional support (critical for billing)
2. **Relational:** Perfect for our schema (8 tables, multiple FKs)
3. **JSONB:** Store flexible data (agent configs, metadata) without schema changes
4. **Performance:** Handles 10K+ concurrent connections with proper indexing
5. **Open source:** No licensing costs, huge community

#### Alternatives Considered

**Alternative 1: MongoDB**
- Pros: Schema-less, horizontal scaling
- Cons: No ACID (until v4), eventual consistency issues
- Why not: Need strong consistency for billing (money matters!)

**Alternative 2: MySQL**
- Pros: Popular, fast reads
- Cons: Weaker JSON support, less features than Postgres
- Why not: Postgres superior for our use case (JSONB, full-text search)

**Alternative 3: Amazon Aurora (Postgres-compatible)**
- Pros: Auto-scaling, managed
- Cons: Vendor lock-in, higher cost
- Why not: Start with vanilla Postgres, migrate later if needed

#### Consequences

**Positive:**
- Reliable (used by Instagram, Reddit, etc.)
- Full-text search (search messages without Elasticsearch)
- TypeORM integration excellent

**Negative:**
- Write-heavy workloads need tuning (connection pooling, indexes)
- Vertical scaling limits (mitigate with read replicas)

**Neutral:**
- Must learn Postgres-specific features (JSONB, array types)

#### Implementation
- M1: Setup Postgres (Docker for dev, RDS for prod)
- M1: Create schema (8 tables, migrations)
- Ongoing: Monitor query performance, add indexes as needed

#### References
- ERD: docs/02-architecture/02-Database-Design-ERD.md
- [Postgres Docs](https://www.postgresql.org/docs/15/)
- Benchmark: [PostgreSQL vs MySQL](https://www.postgresql.org/about/featurematrix/)

---

### **ADR-0005: Microservices Architecture**

**Status:** ✅ Accepted  
**Date:** 2025-10-03  
**Author:** System Architect  
**Deciders:** Architect, Tech Lead, CTO  
**Impact:** 🔴 High

---

#### Context
Building platform with multiple features: auth, chat, billing, agents, ML. Question: Monolith vs Microservices?
Requirements:
- Scalability (different services have different loads)
- Team autonomy (6 people, want parallel work)
- Fault isolation (chat bug doesn't break billing)

#### Decision
We will use **microservices architecture** with 8 services: auth, user, chat, agent-mgr, billing, notification, ML-training, API gateway.

#### Rationale
1. **Independent scaling:** Chat service (high load) scales separately from billing (low load)
2. **Parallel development:** Teams work on different services without conflicts
3. **Technology flexibility:** Use Python for ML, Node.js for APIs
4. **Fault isolation:** One service down doesn't crash entire system

#### Alternatives Considered

**Alternative 1: Monolith**
- Pros: Simpler deployment, easier debugging
- Cons: Scale all-or-nothing, merge conflicts, tight coupling
- Why not: Doesn't scale for our use case (team size, load patterns)

**Alternative 2: Modular Monolith**
- Pros: Middle ground (modules within monolith)
- Cons: Still single deployment, harder to extract later
- Why not: Want full microservices benefits (independent deploy/scale)

#### Consequences

**Positive:**
- Team velocity (parallel work)
- Scalability (per-service autoscaling)
- Resilience (circuit breakers, retries)

**Negative:**
