# Business Requirements Document (BRD)

**Document Version:** 2.0  
**Last Updated:** October 15, 2025  
**Document Owner:** BA/PO Team  
**Project Name:** ChatAI Platform  
**Project Code:** CAP  
**Status:** ✅ Approved

---

## 📋 DOCUMENT CONTROL

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 01/10/2025 | BA Team | Draft đầu tiên |
| 0.2 | 08/10/2025 | BA Team | Thêm stakeholders, NFRs |
| 1.0 | 15/10/2025 | BA Team | Finalized, approved version |
| 2.0 | 15/10/2025 | BA Team + PM | Added Business Case, Cost/Revenue Analysis, Formal Approval |

---

## 📋 Mục lục

1. [Tóm tắt điều hành](#1-tóm-tắt-điều-hành)
2. [Mục tiêu dự án](#2-mục-tiêu-dự-án)
3. [Stakeholders](#3-stakeholders)
4. [Yêu cầu high-level](#4-yêu-cầu-high-level)
5. [Phạm vi dự án](#5-phạm-vi-dự-án)
6. [Tiêu chí thành công](#6-tiêu-chí-thành-công)
7. [Giả định và ràng buộc](#7-giả-định-và-ràng-buộc)
8. [Business Case & Financial Analysis](#8-business-case--financial-analysis) ⭐ **MỚI**
9. [Phê duyệt](#9-phê-duyệt)
10. [Lịch sử tài liệu](#10-lịch-sử-tài-liệu)
11. [Phụ lục](#11-phụ-lục)

---

## 1. Tóm tắt điều hành

### 1.1 Mục tiêu tổng quan

Xây dựng nền tảng chat AI (Web + Mobile app) cho phép người dùng chat với nhiều AI agent (GPT, Grok, Gemini, và các agent tự build), hỗ trợ text/voice/upload file, quản lý agent, thống kê chi phí/token, và mở rộng bằng microservices. Hỗ trợ quản lý context cuộc hội thoại qua threads để AI trace và maintain lịch sử chat.

### 1.2 Giá trị kinh doanh

**Business Value:**
- **Tăng năng suất:** Cung cấp AI assistants thông minh cho công việc hàng ngày
- **Minh bạch chi phí:** Quản lý chi phí sử dụng AI rõ ràng theo user/project/agent
- **Tùy biến linh hoạt:** Training và deploy AI agents theo nhu cầu riêng của tổ chức
- **Đa nền tảng:** Hỗ trợ làm việc trên Web, iOS, Android
- **Khả năng mở rộng:** Kiến trúc microservices sẵn sàng scale khi cần

### 1.3 Bối cảnh dự án

Trong bối cảnh AI ngày càng phát triển, các tổ chức cần một platform thống nhất để:
- Tích hợp nhiều AI providers (không bị lock-in một vendor)
- Quản lý chi phí API AI một cách tập trung
- Tùy chỉnh và training AI models riêng cho domain cụ thể
- Duy trì lịch sử và context cuộc hội thoại để AI hiểu rõ hơn

---

## 2. Mục tiêu dự án

### 2.1 Mục tiêu chính (Primary Goals)

1. **Multi-Agent Support**
   - Tích hợp nhiều AI providers: OpenAI GPT-4, Google Gemini, Grok
   - Hỗ trợ custom agents tự build và deploy
   - Cho phép user chọn agent phù hợp với từng task

2. **Context Management**
   - Quản lý conversation threads để AI duy trì ngữ cảnh
   - AI có thể trace và reference lịch sử chat
   - Lưu trữ và tìm kiếm conversations hiệu quả

3. **Multi-Platform**
   - Web application (responsive, desktop + mobile web)
   - Mobile app native (iOS + Android qua React Native)
   - Đồng bộ data giữa các platform

4. **Scalability**
   - Kiến trúc microservices để scale độc lập
   - Handle 10k concurrent users
   - Horizontal scaling cho từng service

5. **Cost Tracking**
   - Thống kê chi phí và token usage chi tiết
   - Filter theo user/project/agent/conversation
   - Export reports (CSV/PDF)

### 2.2 Mục tiêu phụ (Secondary Goals)

- **Self-hosted agents deployment:** Deploy agents qua Docker containers
- **ML training pipeline:** Training custom agents với Hugging Face
- **Voice support:** Input qua STT, output qua TTS
- **File processing:** Upload và extract context từ PDF/DOCX/images
- **Real-time features:** WebSocket cho chat streaming và notifications

---

## 3. Stakeholders

### 3.1 Bảng stakeholders chi tiết

| Vai trò | Phòng ban | Trách nhiệm | Liên hệ | Mức độ tham gia |
|---------|-----------|-------------|---------|-----------------|
| **Client/Product Owner** | Business | Định nghĩa requirements, phê duyệt deliverables, quyết định scope | TBD | Cao - Daily |
| **Project Manager** | PMO | Quản lý timeline, budget, điều phối team | thanhhaunv | Cao - Daily |
| **Business Analyst** | BA Team | Thu thập requirements, viết documentation | TBD | Cao - Daily |
| **Development Team** | Engineering | Implementation code, technical decisions | TBD | Cao - Daily |
| **Tech Lead/Architect** | Engineering | Thiết kế kiến trúc, code review, technical guidance | TBD | Cao - Daily |
| **DevOps Team** | Operations | Infrastructure, deployment, monitoring | TBD | Trung bình - Weekly |
| **Data Science Team** | ML/AI | ML training, model optimization, agent tuning | TBD | Trung bình - Weekly |
| **QA/Tester** | Quality | Testing, bug reports, quality assurance | TBD | Cao - Daily |
| **Legal Team** | Compliance | Privacy (GDPR), data protection, compliance | TBD | Thấp - Monthly |
| **Finance Team** | Finance | Billing logic, cost management, budget approval | TBD | Thấp - Monthly |
| **End Users** | Customers | Use platform, provide feedback | TBD | Cao - Post-launch |

### 3.2 Stakeholder Communication Plan

| Stakeholder | Frequency | Method | Content |
|-------------|-----------|--------|---------|
| Client/PO | Daily | Email, Slack | Progress updates, blockers |
| PM/Tech Lead | Daily | Standup, Slack | Task status, technical decisions |
| Dev Team | Daily | Standup, Jira | Tasks, code reviews |
| Legal/Finance | Monthly | Meeting | Compliance, billing updates |
| End Users | Post-launch | Email, Support | Onboarding, feature updates |

---

## 4. Yêu cầu high-level

### 4.1 Yêu cầu chức năng (Functional Requirements)

#### 4.1.1 Authentication & Authorization

**FR-001: Multi-provider OAuth**
- Hỗ trợ đăng ký/đăng nhập qua:
  - Google OAuth 2.0
  - Facebook OAuth 2.0
  - TikTok OAuth 2.0
  - Email/Password (với email verification)
  - Phone Number (với SMS verification)
- Session management với JWT tokens
- Token expiry: 1 giờ (với refresh token 7 ngày)

**FR-002: Role-based Access Control (RBAC)**
- Roles: Admin, Owner, Member, Viewer
- Permissions matrix:
  - Admin: Full access toàn hệ thống
  - Owner: Quản lý project, invite members, billing
  - Member: Chat, view project, limited settings
  - Viewer: Read-only access

#### 4.1.2 Chat Interface

**FR-003: Multi-modal Chat**
- **Text chat:**
  - Input qua text box
  - Support markdown formatting
  - Code syntax highlighting
  - Real-time streaming responses
- **Voice chat:**
  - Voice input qua STT (Speech-to-Text)
  - Voice output qua TTS (Text-to-Speech)
  - Hỗ trợ nhiều ngôn ngữ (VN, EN)
- **File upload:**
  - Support: PDF, TXT, DOCX, images (PNG, JPG)
  - Max file size: 10MB
  - Extract context từ files cho AI

**FR-004: Agent Selection**
- Dropdown list các agents available
- Hiển thị thông tin agent:
  - Name, version, description
  - Cost per token (nếu có)
  - Capabilities (text/voice/file)
- Switch agent giữa conversations

#### 4.1.3 Project & Thread Management

**FR-005: Multi-tenant Projects**
- User có thể tạo nhiều projects
- Mỗi project có:
  - Name, description, icon
  - Members với roles khác nhau
  - Billing riêng biệt
  - Settings riêng (default agent, permissions)

**FR-006: Conversation Threading**
- Mỗi project có nhiều threads (conversations)
- Thread có:
  - Title (auto-generated hoặc user-defined)
  - thread_id (UUID để track context)
  - Created date, last updated
  - Message count, participants
- AI duy trì context trong thread:
  - Gửi thread_id khi call AI API
  - Retrieve last N messages làm context
  - Support context window optimization

**FR-007: Thread Operations**
- Create new thread
- Rename thread
- Archive/Delete thread (soft delete)
- Search threads (by title, content, date)
- Pin important threads

#### 4.1.4 Agent Management

**FR-008: Agent CRUD (Admin/Owner only)**
- **Create agent:**
  - Name, type (external/self-hosted)
  - API endpoint, credentials
  - Model source (OpenAI/Gemini/Custom)
  - Config (temperature, max_tokens, etc.)
- **Read agent:**
  - List all agents
  - View agent details, version
  - Test connection status
- **Update agent:**
  - Modify config, credentials
  - Update Docker image (self-hosted)
- **Delete agent:**
  - Soft delete, archive

**FR-009: Self-hosted Agent Deployment**
- Upload Docker image cho custom agent
- Configure container:
  - Environment variables
  - Port mapping
  - Resource limits (CPU, RAM)
- Start/Stop/Restart container
- Health check endpoint
- View logs

#### 4.1.5 Billing & Reporting

**FR-010: Token/Cost Tracking**
- Log mỗi API call:
  - user_id, project_id, agent_id
  - conversation_id, thread_id
  - tokens_used (input + output)
  - cost (tính theo pricing của agent)
  - timestamp

**FR-011: Billing Reports**
- View usage dashboard:
  - Cost by user/project/agent
  - Token usage charts (line, bar)
  - Time range filter (day/week/month/year)
- Export reports:
  - CSV format
  - PDF format (optional)
- Billing breakdown:
  - Per conversation/thread
  - Per user
  - Per project

#### 4.1.6 ML Training Pipeline

**FR-012: Model Training**
- Upload base model từ Hugging Face
- Config training params:
  - Dataset (upload hoặc URL)
  - Epochs, batch size, learning rate
  - Validation split
- AI-assisted config suggestions:
  - Integrate với AI khác để suggest optimal params
  - Based on dataset size, model type
- Monitor training progress:
  - Real-time loss/accuracy charts
  - Estimated time remaining
  - Stop training anytime

**FR-013: Model Deployment**
- Auto-generate Docker image sau training
- Deploy trained model as self-hosted agent
- Version control cho models

### 4.2 Yêu cầu phi chức năng (Non-Functional Requirements)

#### 4.2.1 Performance (NFR-001)

**Scalability:**
- Handle 10,000 concurrent users
- Horizontal scaling cho từng microservice
- Auto-scaling dựa trên load (CPU > 70%)

**Response Time:**
- Median response time < 2s cho cached agents
- < 10s cho remote API calls (OpenAI, Gemini)
- Real-time streaming latency < 500ms
- Database query < 100ms (95th percentile)

**Throughput:**
- 1,000 requests/second cho API Gateway
- 100 messages/second cho Chat Orchestrator

**Availability:**
- 99.5% uptime SLA (monthly)
- Max downtime: 3.6 hours/month
- Scheduled maintenance window: Sundays 2-4 AM

#### 4.2.2 Security (NFR-002)

**Authentication:**
- OAuth2 + OpenID Connect
- JWT tokens với HMAC-SHA256
- Token expiry: 1 hour access token, 7 days refresh token
- Secure cookie storage (HttpOnly, Secure, SameSite)

**Authorization:**
- Role-based access control (RBAC)
- Permission checks trên mỗi API endpoint
- Audit logs cho sensitive operations

**Data Protection:**
- Encrypt API keys at rest (AES-256)
- TLS 1.3 for data in transit (HTTPS)
- Encrypt sensitive fields trong database (passwords, tokens)
- Hash passwords với bcrypt (cost factor 10)

**Compliance:**
- OWASP Top 10 compliance
- Regular security scans (OWASP ZAP, Snyk)
- Penetration testing before production
- GDPR-like compliance cho user data

#### 4.2.3 Observability (NFR-003)

**Metrics:**
- Prometheus metrics collection
- Grafana dashboards:
  - Request rate, error rate, latency (RED metrics)
  - CPU, memory, disk usage
  - Database connections, query performance
- Alerting rules:
  - Error rate > 5% → Slack alert
  - Response time > 5s → Email alert

**Logging:**
- Centralized logging (ELK Stack hoặc Loki)
- Log levels: DEBUG, INFO, WARN, ERROR
- Structured logging (JSON format)
- Log retention: 30 days

**Tracing:**
- Distributed tracing (optional: Jaeger)
- Trace request flow qua microservices
- Identify bottlenecks

#### 4.2.4 Data Privacy (NFR-004)

**User Data:**
- User consent cho data collection
- Right to access data
- Right to delete data (GDPR Article 17)
- Data retention policy: 1 year inactive → delete

**Voice/File Privacy:**
- Encrypt uploaded files at rest
- Auto-delete files after 30 days (optional)
- No third-party sharing without consent

#### 4.2.5 Usability (NFR-005)

**Accessibility:**
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- High contrast mode

**Internationalization:**
- Support multiple languages (Vietnamese, English)
- i18n framework (react-i18next)
- Date/time localization

**User Experience:**
- Responsive design (mobile-first)
- Loading states, error messages
- Smooth animations (<16ms)
- Offline mode (limited features)

#### 4.2.6 DevOps (NFR-006)

**CI/CD:**
- Automated pipeline (GitHub Actions)
- Build → Test → Lint → Deploy
- Automated testing (unit, integration, E2E)
- Code coverage > 70%

**Infrastructure as Code:**
- Terraform for cloud resources
- Kubernetes manifests for deployments
- Version control cho infrastructure

**Deployment:**
- Blue-green deployment
- Rollback capability
- Zero-downtime deployments

---

## 5. Phạm vi dự án

### 5.1 Trong phạm vi (In Scope)

✅ **Core Features:**
- Web application (Next.js, responsive)
- Mobile application (React Native/Expo, iOS + Android)
- Multi-agent chat system (OpenAI, Gemini, Grok, custom)
- Conversation threading với context management
- Voice input/output (STT/TTS)
- File upload & processing (PDF, DOCX, images)
- Agent management (external + self-hosted)
- Billing & reporting (token/cost tracking)
- ML training pipeline (Hugging Face integration)
- OAuth authentication (Google, Facebook, TikTok, Email, Phone)
- Real-time features (WebSocket streaming, notifications)
- Basic admin panel (user management, agent management)

✅ **Infrastructure:**
- Microservices architecture (8 services)
- Docker containerization
- Kubernetes orchestration
- PostgreSQL database
- Redis cache
- MinIO/S3 file storage
- CI/CD pipeline (GitHub Actions)
- Monitoring (Prometheus, Grafana)
- Logging (ELK Stack)

### 5.2 Ngoài phạm vi (Out of Scope)

❌ **Advanced Features:**
- Advanced analytics & BI dashboards
- Third-party integrations (Slack, Microsoft Teams, etc.)
- Video call support
- Multi-language code execution (sandbox)
- Advanced ML model marketplace
- White-label solutions
- Plugin system cho agents
- Blockchain/Web3 features

❌ **Business:**
- Marketing campaigns
- Sales operations
- Customer acquisition
- Payment gateway integration (Phase 2)

### 5.3 Future Enhancements (Post-MVP)

**Phase 2 (3-6 months post-launch):**
- Plugin system for extensibility
- Advanced analytics & insights
- Team collaboration features (mentions, shares)
- Marketplace for trained models
- API for third-party developers
- Payment integration (Stripe, PayPal)

**Phase 3 (6-12 months post-launch):**
- Enterprise features (SSO, audit logs)
- Advanced security (2FA, IP whitelist)
- White-label solution
- Multi-region deployment
- Advanced ML features (AutoML, model comparison)

---

## 6. Tiêu chí thành công

### 6.1 Thành công về chức năng

**Functional Success Criteria:**
- ✅ Hoàn thành 100% User Stories (US-001 đến US-010)
- ✅ 95%+ test coverage (unit + integration)
- ✅ Pass tất cả acceptance criteria
- ✅ Zero critical bugs trong production
- ✅ All features demo được end-to-end

### 6.2 Thành công về kỹ thuật

**Technical Success Criteria:**
- ✅ System handle 10,000 concurrent users (load test)
- ✅ Response time < 2s (95th percentile)
- ✅ 99.5% uptime achieved (monitored 30 days)
- ✅ Security audit passed (OWASP, Snyk clean)
- ✅ Code quality grade A (SonarQube)
- ✅ CI/CD pipeline fully automated
- ✅ Database optimized (indexes, query plans)

### 6.3 Thành công về kinh doanh

**Business Success Criteria:**
- ✅ 10-20 beta users onboarded successfully
- ✅ User satisfaction > 4.0/5.0 (survey)
- ✅ Cost per user < target (TBD)
- ✅ MVP launched trong 6 tháng
- ✅ Zero data breaches
- ✅ Positive stakeholder feedback
- ✅ **ROI > 90% trong năm đầu** ⭐ **MỚI**
- ✅ **Break-even đạt được trong 7 tháng** ⭐ **MỚI**

### 6.4 Thành công về người dùng

**User Success Criteria:**
- ✅ User có thể chat với AI trong < 2 phút sau signup
- ✅ User có thể tạo project và invite members
- ✅ User có thể upload file và nhận AI analysis
- ✅ User có thể train custom agent (advanced users)
- ✅ User hiểu billing và cost breakdown
- ✅ User có thể sử dụng trên cả web và mobile

---

## 7. Giả định và ràng buộc

### 7.1 Giả định (Assumptions)

**Team:**
- ✓ Team có 6 members full-time (PM, 2 Backend, 1 Frontend, 1 DevOps, 1 QA)
- ✓ Team có kinh nghiệm với tech stack (NestJS, Next.js, K8s)
- ✓ Team availability: 40 hours/week/person
- ✓ Team có access đến tools (Jira, GitHub, AWS/GCP)

**Infrastructure:**
- ✓ Budget đủ cho cloud infrastructure costs (AWS hoặc GCP)
- ✓ OpenAI, Google Gemini, Grok API keys available
- ✓ Docker Hub registry access
- ✓ Kubernetes cluster (EKS/GKE) provisioned

**Users:**
- ✓ Users có stable internet connection (>10 Mbps)
- ✓ Users dùng modern browsers (Chrome 90+, Safari 14+, Firefox 88+)
- ✓ Mobile users có iOS 14+ hoặc Android 10+
- ✓ Users có basic tech literacy (biết dùng chat apps)

**Third-party:**
- ✓ OpenAI, Google APIs có 99%+ uptime
- ✓ API pricing stable trong duration dự án
- ✓ Hugging Face models accessible và miễn phí

### 7.2 Ràng buộc (Constraints)

**Timeline:**
- ⏰ Fixed timeline: 22 weeks (~6 months)
- ⏰ Milestone deadlines không thể shift quá 1 tuần
- ⏰ Beta launch deadline: Week 22

**Budget:**
- 💰 Cloud infrastructure: ~$500-1000/month (estimate)
- 💰 API costs: ~$200-500/month (OpenAI, Gemini)
- 💰 Team costs: Fixed salary budget
- 💰 Tool licenses: GitHub, Jira, monitoring tools
- 💰 **Total project budget: $250,000 maximum** ⭐ **MỚI**

**Technology:**
- 🛠️ Must use TypeScript cho backend/frontend (client requirement)
- 🛠️ Must use PostgreSQL (không dùng NoSQL)
- 🛠️ Must use Kubernetes for production
- 🛠️ Cannot use proprietary/closed-source libraries (except AI APIs)

**Compliance:**
- 📜 Must comply with GDPR for EU users
- 📜 Data residency requirements (store trong Vietnam if VN users)
- 📜 Privacy policy và Terms of Service required before launch
- 📜 Legal review cho voice recording features

**Resources:**
- 👥 Limited to 6 team members (cannot hire more)
- 💻 Limited compute resources (K8s cluster size fixed)
- 📦 Limited storage budget (MinIO/S3)

### 7.3 Dependencies (Phụ thuộc)

**External:**
- 🔗 OpenAI API availability và stability
- 🔗 Google Cloud Platform account approval
- 🔗 GitHub repository access
- 🔗 Docker Hub registry access
- 🔗 Domain name registration (chatai.com)
- 🔗 SSL certificate (Let's Encrypt hoặc paid)

**Internal:**
- 🔗 Legal team approval cho privacy policy
- 🔗 Finance team approval cho billing logic
- 🔗 Stakeholder approval cho major technical decisions
- 🔗 DevOps team setup infrastructure

---

## 8. Business Case & Financial Analysis ⭐ **MỚI**

### 8.1 Chi phí dự án (Project Costs)

#### 8.1.1 Chi phí Development (6 tháng)

| Hạng mục | Chi tiết | Chi phí (USD) |
|----------|----------|---------------|
| **Personnel Costs** | | |
| Project Manager | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| Backend Developers | 2 người × 6 tháng × $5,000/tháng | $60,000 |
| Frontend Developer | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| DevOps Engineer | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| QA/Tester | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| **Subtotal Personnel** | | **$180,000** |
| | | |
| **Infrastructure Costs** | | |
| Cloud hosting (AWS/GCP) | $2,000/tháng × 6 tháng | $12,000 |
| Third-party API credits | OpenAI + Gemini testing | $6,000 |
| **Subtotal Infrastructure** | | **$18,000** |
| | | |
| **Tools & Software** | | |
| Jira licenses | 6 users × $7/user/tháng × 6 tháng | $252 |
| GitHub Team | $4/user/tháng × 6 users × 6 tháng | $144 |
| Monitoring tools | Grafana Cloud, Sentry | $1,200 |
| Domain & SSL | chatai.com + certificates | $200 |
| Misc tools | Design, testing tools | $1,204 |
| **Subtotal Tools** | | **$3,000** |
| | | |
| **Contingency (20%)** | Unexpected costs, overruns | $40,200 |
| | | |
| **TOTAL PROJECT COST** | | **$241,200** |

### 8.2 Dự báo doanh thu (Revenue Projections)

#### 8.2.2 Pricing Strategy

| Tier | Giá/Tháng | Features | Target Segment |
|------|-----------|----------|----------------|
| **Free** | $0 | 3 projects, 100 messages/day, external agents only | Individual users, testing |
| **Pro** | $49 | Unlimited projects, unlimited messages, voice/file, basic ML | Power users, small teams |
| **Enterprise** | $299 | All Pro + self-hosted agents, ML training, priority support, SLA | Organizations, businesses |

#### 8.2.3 Revenue Forecast (Năm đầu)

**Assumptions:**
- Launch Month 7 (sau 6 tháng development)
- User acquisition: 100 new users/tháng (conservative)
- Conversion rate: Free → Pro 10%, Free → Enterprise 1%

| Tháng | Free Users | Pro Users | Enterprise | Revenue/Tháng | Cumulative Revenue |
|-------|------------|-----------|------------|---------------|-------------------|
| M7 (Launch) | 100 | 10 | 1 | $789 | $789 |
| M8 | 200 | 30 | 2 | $2,068 | $2,857 |
| M9 | 350 | 60 | 4 | $4,136 | $6,993 |
| M10 | 550 | 100 | 7 | $7,093 | $14,086 |
| M11 | 800 | 150 | 10 | $10,350 | $24,436 |
| M12 | 1,200 | 250 | 15 | $16,735 | $41,171 |
| M13-M18 | +500/mo | +100/mo | +10/mo | ~$30K/mo avg | **Total: $473,400** |

### 8.3 Phân tích ROI

#### 8.3.1 Break-even Analysis

**Total Investment:** $241,200  
**Monthly Fixed Costs (post-launch):** ~$15,000 (infrastructure + maintenance)  
**Break-even point:** Month 13 (7 tháng post-launch)

**Calculation:**
```
Cumulative Revenue (M13) = $41,171
Remaining months revenue = $432,229
Total Year 1 Revenue = $473,400
Net Profit Year 1 = $473,400 - $241,200 - ($15,000 × 12) = $52,200
ROI Year 1 = ($52,200 / $241,200) × 100% = 21.6%
```

#### 8.3.2 NPV & Payback Period

**Net Present Value (Year 1):** $52,200  
**Payback Period:** 13 months from project start (7 months post-launch)  
**IRR (Internal Rate of Return):** ~18% (Year 1)

### 8.4 Rủi ro tài chính (Financial Risks)

| Rủi ro | Xác suất | Impact | Mitigation |
|--------|----------|--------|------------|
| User acquisition chậm hơn dự kiến | Medium | High | Aggressive marketing, referral program |
| Infrastructure costs vượt budget | Medium | Medium | Cost monitoring, optimize resources |
| Development delay (>6 months) | Low | High | Buffer time built in, agile methodology |
| Churn rate cao (>20%) | Low | Medium | Focus on user satisfaction, support |
| Competition tăng | High | Medium | Differentiate with self-hosted, ML features |

### 8.5 Kết luận Business Case

**Khuyến nghị:** ✅ **PHÁT TRIỂN DỰ ÁN**

**Lý do:**
1. ✅ ROI tích cực (~22% Year 1, tiềm năng 50%+ Year 2-3)
2. ✅ Break-even đạt được trong 13 tháng (acceptable)
3. ✅ Total investment $241K trong khả năng chi trả
4. ✅ Revenue model proven (SaaS B2B/B2C)
5. ✅ Market opportunity lớn (AI tools đang hot)
6. ✅ Competitive moat với self-hosted + ML features

# Business Requirements Document (BRD)

**Rủi ro được quản lý:** Contingency 20%, phased launch, monitoring metrics

## 9. Phê duyệt

### 9.1 Bảng phê duyệt chính thức

| Vai trò | Tên | Chức danh | Chữ ký | Ngày phê duyệt |
|---------|-----|-----------|--------|----------------|
| **Product Owner** | TBD | Head of Product | _________ | ______ |
| **Project Manager** | thanhhaunv | Project Manager | _________ | 15/10/2025 |
| **Technical Lead** | TBD | Engineering Manager | _________ | ______ |
| **Finance Director** | TBD | CFO | _________ | ______ |
| **Legal Representative** | TBD | Legal Counsel | _________ | ______ |
| **Business Stakeholder** | TBD | VP/Director | _________ | ______ |

### 9.2 Quy trình Change Request

**Khi cần thay đổi BRD sau khi approved:**

1. **Submit Change Request (CR):**
   - Tạo ticket Jira với label "BRD-Change-Request"
   - Template: CR-[Number]-[Short-Description]

2. **CR Review Process:**
   - PM đánh giá impact (timeline, cost, scope, risk)
   - Tech Lead đánh giá technical feasibility
   - Finance đánh giá budget impact

3. **Stakeholder Meeting:**
   - Present CR với full impact analysis
   - Discussion & Q&A
   - Vote: Approve / Reject / Defer

4. **If Approved:**
   - Update BRD document (increment version)
   - Notify all stakeholders via email
   - Update Jira roadmap & sprint backlog
   - Archive old version

5. **If Rejected:**
   - Document rejection reason
   - Close CR ticket
   - Inform requester

**Change Request Template:**
```
CR ID: CR-[XXX]
Requested by: [Name]
Date: [DD/MM/YYYY]
Priority: [Critical/High/Medium/Low]

Change Description:
[Detailed description of requested change]

Business Justification:
[Why this change is needed]

Impact Analysis:
- Timeline: [+/- X weeks]
- Cost: [+/- $X]
- Scope: [In scope / Out of scope affected]
- Resources: [Team members affected]
- Risk: [New risks introduced]

Alternatives Considered:
[Other options evaluated]

Recommendation:
[Approve / Reject / Defer with reasoning]

Approval Status:
[ ] PM Review
[ ] Tech Lead Review
[ ] Finance Review
[ ] Stakeholder Vote
[ ] Final Decision: _______
```

### 9.3 Document Maintenance

**Responsibility:** Business Analyst / Product Owner  
**Review Frequency:** Monthly (or upon major change)  
**Version Control:** Git repository + Jira wiki  
**Distribution:** All team members via Slack + email

---

## 10. Lịch sử tài liệu

| Phiên bản | Ngày | Tác giả | Thay đổi chính | Status |
|-----------|------|---------|----------------|---------|
| 0.1 | 01/10/2025 | BA Team | Draft đầu tiên | Draft |
| 0.2 | 08/10/2025 | BA Team | Thêm stakeholders, NFRs | Draft |
| 1.0 | 15/10/2025 | BA Team | Finalized, approved version | Approved |
| 2.0 | 15/10/2025 | BA Team + PM | **Added:** Business Case ($241K cost, $473K revenue, 22% ROI), Financial Analysis, Formal Approval Table, Change Request Process | ✅ Approved |

**Change Log v2.0:**
- ➕ **Section 8:** Business Case & Financial Analysis
  - Cost breakdown by category
  - Revenue projections (3 pricing tiers)
  - ROI calculation (22% Year 1)
  - Break-even analysis (Month 13)
  - Financial risks & mitigation
- ➕ **Section 9.1:** Formal approval table with signatures
- ➕ **Section 9.2:** Change Request process & template
- 📝 **Section 6.3:** Added business success criteria (ROI, break-even)
- 📝 **Section 7.2:** Added total project budget constraint ($250K)
- 📝 Document Control: Enhanced version tracking

---

## 11. Phụ lục

### 11.1 Glossary (Thuật ngữ)

| Thuật ngữ | Định nghĩa | Tiếng Anh |
|-----------|-----------|-----------|
| **Agent** | AI model hoặc service có thể chat với user (VD: GPT-4, Gemini) | AI Agent |
| **Thread** | Một chuỗi conversation có context liên tục | Conversation Thread |
| **Token** | Đơn vị đo lường input/output của AI API (1 token ≈ 4 ký tự) | Token |
| **Microservice** | Independent service trong architecture, có thể scale riêng | Microservice |
| **RBAC** | Role-Based Access Control - phân quyền dựa trên role | RBAC |
| **STT** | Speech-to-Text - chuyển voice thành text | STT |
| **TTS** | Text-to-Speech - chuyển text thành voice | TTS |
| **JWT** | JSON Web Token - format token cho authentication | JWT |
| **K8s** | Kubernetes - container orchestration platform | Kubernetes |
| **ROI** | Return on Investment - tỷ suất hoàn vốn | ROI |
| **NPV** | Net Present Value - giá trị hiện tại ròng | NPV |
| **SLA** | Service Level Agreement - cam kết mức độ dịch vụ | SLA |
| **GDPR** | General Data Protection Regulation - quy định bảo vệ dữ liệu EU | GDPR |

### 11.2 Acronyms (Từ viết tắt)

| Acronym | Full Form | Ý nghĩa |
|---------|-----------|---------|
| BRD | Business Requirements Document | Tài liệu yêu cầu nghiệp vụ |
| SRS | Software Requirements Specification | Đặc tả yêu cầu phần mềm |
| MVP | Minimum Viable Product | Sản phẩm khả thi tối thiểu |
| API | Application Programming Interface | Giao diện lập trình ứng dụng |
| UI/UX | User Interface / User Experience | Giao diện / Trải nghiệm người dùng |
| CI/CD | Continuous Integration / Continuous Deployment | Tích hợp liên tục / Triển khai liên tục |
| E2E | End-to-End | Đầu cuối đến đầu cuối |
| QA | Quality Assurance | Đảm bảo chất lượng |
| PM | Project Manager | Quản lý dự án |
| PO | Product Owner | Chủ sở hữu sản phẩm |
| BA | Business Analyst | Phân tích nghiệp vụ |

### 11.3 References (Tài liệu tham khảo)

**External Documentation:**
- [OpenAI API Documentation](https://platform.openai.com/docs) - GPT models integration
- [Google Gemini API](https://ai.google.dev/docs) - Gemini models integration
- [Hugging Face Transformers](https://huggingface.co/docs/transformers) - ML training
- [GDPR Compliance Guide](https://gdpr.eu/) - Data protection regulations
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security best practices
- [Kubernetes Documentation](https://kubernetes.io/docs/) - Container orchestration
- [NestJS Documentation](https://docs.nestjs.com/) - Backend framework
- [Next.js Documentation](https://nextjs.org/docs) - Frontend framework
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Mobile development

**Internal Documents:**
- [02-SRS.md](./02-SRS.md) - Software Requirements Specification (chi tiết technical)
- [03-User-Stories.md](./03-User-Stories.md) - Chi tiết User Stories (US-001 đến US-010)
- [System Architecture](../02-architecture/01-System-Architecture.md) - Kiến trúc hệ thống
- [Database Design ERD](../02-architecture/02-Database-Design-ERD.md) - Thiết kế database
- [Tech Stack](../02-architecture/04-Tech-Stack.md) - Công nghệ sử dụng
- [Project Roadmap](../03-project-management/01-Roadmap.md) - Timeline 22 tuần chi tiết
- [RACI Matrix](../03-project-management/02-RACI-Matrix.md) - Ma trận trách nhiệm
- [Sprint Backlog](../03-project-management/03-Sprint-Backlog.md) - Tasks M1-M14

### 11.4 Templates & Forms

**Available Templates:**
- Change Request Form (Section 9.2)
- Risk Assessment Template (Section 7)
- Stakeholder Communication Template (Section 3.2)
- Success Criteria Checklist (Section 6)

**Request Templates:** Contact PM (thanhhaunv@example.com)

### 11.5 Contact Information

**Project Team:**
- **Project Manager:** thanhhaunv@example.com
- **Product Owner:** [TBD]
- **Tech Lead:** [TBD]
- **Jira Project:** [ChatAI Platform (CAP)](https://thanhhaunv.atlassian.net)
- **Slack Channel:** #chatai-platform
- **GitHub Repository:** [github.com/thanhhaunv/ChatAI-Platform](https://github.com/thanhhaunv/ChatAI-Platform)

**Support & Questions:**
- Business Questions → Product Owner
- Technical Questions → Tech Lead
- Process Questions → Project Manager
- Budget Questions → Finance Team

---

## 12. Appendix: Financial Calculations Detail

### 12.1 Revenue Model Assumptions

**User Acquisition Model:**
```
Month 7:  100 users (launch month)
Month 8:  100 new + 100 existing = 200 total
Month 9:  150 new + 200 existing = 350 total
Growth rate: ~50% MoM first 6 months (conservative)
```

**Conversion Funnel:**
```
100 Free users
  ↓ 10% convert to Pro ($49/mo)
→ 10 Pro users = $490/mo
  ↓ 1% convert to Enterprise ($299/mo)
→ 1 Enterprise = $299/mo
─────────────────────────
Total from 100 free = $789/mo
```

**Churn Rate Assumption:** 5% monthly (industry standard for SaaS)

### 12.2 Cost Structure Breakdown

**Fixed Costs (Monthly, Post-Launch):**
- Infrastructure: $2,000
- Maintenance team (2 devs part-time): $10,000
- Tools & licenses: $500
- API credits: $2,000
- Misc: $500
- **Total Fixed:** ~$15,000/month

**Variable Costs:**
- API costs scale with usage (~$0.02/user/month)
- Storage costs scale with data (~$0.01/user/month)
- Negligible at < 10K users scale

### 12.3 Sensitivity Analysis

**Optimistic Scenario (+30% user growth):**
- Year 1 Revenue: $615,000
- ROI: 55%
- Break-even: Month 11

**Pessimistic Scenario (-30% user growth):**
- Year 1 Revenue: $331,000
- ROI: -8% (loss)
- Break-even: Month 16

**Recommendation:** Monitor user acquisition closely, adjust marketing if below targets by Month 10.

---

**KẾT THÚC TÀI LIỆU**

---

**📅 Ngày tạo:** 15 tháng 10, 2025  
**📝 Phiên bản hiện tại:** 2.0.0 ✅ Approved  
**🔄 Lần cập nhật cuối:** 15/10/2025  
**👨‍💻 Người duy trì:** BA/PO Team + Project Manager  
**📧 Liên hệ:** thanhhaunv@example.com  
**🔗 Repository:** [github.com/thanhhaunv/ChatAI-Platform/docs](https://github.com/thanhhaunv/ChatAI-Platform)

---

**Đọc tiếp:**
- ➡️ [Software Requirements Specification (SRS)](./02-SRS.md)
- ➡️ [User Stories Detail](./03-User-Stories.md)
- ➡️ [System Architecture](../02-architecture/01-System-Architecture.md)
- ➡️ [Project Roadmap - 22 Weeks](../03-project-management/01-Roadmap.md)

**Document Version:** 2.0  
**Last Updated:** October 15, 2025  
**Document Owner:** BA/PO Team  
**Project Name:** ChatAI Platform  
**Project Code:** CAP  
**Status:** ✅ Approved

---

## 📋 DOCUMENT CONTROL

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 01/10/2025 | BA Team | Draft đầu tiên |
| 0.2 | 08/10/2025 | BA Team | Thêm stakeholders, NFRs |
| 1.0 | 15/10/2025 | BA Team | Finalized, approved version |
| 2.0 | 15/10/2025 | BA Team + PM | Added Business Case, Cost/Revenue Analysis, Formal Approval |

---

## 📋 Mục lục

1. [Tóm tắt điều hành](#1-tóm-tắt-điều-hành)
2. [Mục tiêu dự án](#2-mục-tiêu-dự-án)
3. [Stakeholders](#3-stakeholders)
4. [Yêu cầu high-level](#4-yêu-cầu-high-level)
5. [Phạm vi dự án](#5-phạm-vi-dự-án)
6. [Tiêu chí thành công](#6-tiêu-chí-thành-công)
7. [Giả định và ràng buộc](#7-giả-định-và-ràng-buộc)
8. [Business Case & Financial Analysis](#8-business-case--financial-analysis) ⭐ **MỚI**
9. [Phê duyệt](#9-phê-duyệt)
10. [Lịch sử tài liệu](#10-lịch-sử-tài-liệu)
11. [Phụ lục](#11-phụ-lục)

---

## 1. Tóm tắt điều hành

### 1.1 Mục tiêu tổng quan

Xây dựng nền tảng chat AI (Web + Mobile app) cho phép người dùng chat với nhiều AI agent (GPT, Grok, Gemini, và các agent tự build), hỗ trợ text/voice/upload file, quản lý agent, thống kê chi phí/token, và mở rộng bằng microservices. Hỗ trợ quản lý context cuộc hội thoại qua threads để AI trace và maintain lịch sử chat.

### 1.2 Giá trị kinh doanh

**Business Value:**
- **Tăng năng suất:** Cung cấp AI assistants thông minh cho công việc hàng ngày
- **Minh bạch chi phí:** Quản lý chi phí sử dụng AI rõ ràng theo user/project/agent
- **Tùy biến linh hoạt:** Training và deploy AI agents theo nhu cầu riêng của tổ chức
- **Đa nền tảng:** Hỗ trợ làm việc trên Web, iOS, Android
- **Khả năng mở rộng:** Kiến trúc microservices sẵn sàng scale khi cần

### 1.3 Bối cảnh dự án

Trong bối cảnh AI ngày càng phát triển, các tổ chức cần một platform thống nhất để:
- Tích hợp nhiều AI providers (không bị lock-in một vendor)
- Quản lý chi phí API AI một cách tập trung
- Tùy chỉnh và training AI models riêng cho domain cụ thể
- Duy trì lịch sử và context cuộc hội thoại để AI hiểu rõ hơn

---

## 2. Mục tiêu dự án

### 2.1 Mục tiêu chính (Primary Goals)

1. **Multi-Agent Support**
   - Tích hợp nhiều AI providers: OpenAI GPT-4, Google Gemini, Grok
   - Hỗ trợ custom agents tự build và deploy
   - Cho phép user chọn agent phù hợp với từng task

2. **Context Management**
   - Quản lý conversation threads để AI duy trì ngữ cảnh
   - AI có thể trace và reference lịch sử chat
   - Lưu trữ và tìm kiếm conversations hiệu quả

3. **Multi-Platform**
   - Web application (responsive, desktop + mobile web)
   - Mobile app native (iOS + Android qua React Native)
   - Đồng bộ data giữa các platform

4. **Scalability**
   - Kiến trúc microservices để scale độc lập
   - Handle 10k concurrent users
   - Horizontal scaling cho từng service

5. **Cost Tracking**
   - Thống kê chi phí và token usage chi tiết
   - Filter theo user/project/agent/conversation
   - Export reports (CSV/PDF)

### 2.2 Mục tiêu phụ (Secondary Goals)

- **Self-hosted agents deployment:** Deploy agents qua Docker containers
- **ML training pipeline:** Training custom agents với Hugging Face
- **Voice support:** Input qua STT, output qua TTS
- **File processing:** Upload và extract context từ PDF/DOCX/images
- **Real-time features:** WebSocket cho chat streaming và notifications

---

## 3. Stakeholders

### 3.1 Bảng stakeholders chi tiết

| Vai trò | Phòng ban | Trách nhiệm | Liên hệ | Mức độ tham gia |
|---------|-----------|-------------|---------|-----------------|
| **Client/Product Owner** | Business | Định nghĩa requirements, phê duyệt deliverables, quyết định scope | TBD | Cao - Daily |
| **Project Manager** | PMO | Quản lý timeline, budget, điều phối team | thanhhaunv | Cao - Daily |
| **Business Analyst** | BA Team | Thu thập requirements, viết documentation | TBD | Cao - Daily |
| **Development Team** | Engineering | Implementation code, technical decisions | TBD | Cao - Daily |
| **Tech Lead/Architect** | Engineering | Thiết kế kiến trúc, code review, technical guidance | TBD | Cao - Daily |
| **DevOps Team** | Operations | Infrastructure, deployment, monitoring | TBD | Trung bình - Weekly |
| **Data Science Team** | ML/AI | ML training, model optimization, agent tuning | TBD | Trung bình - Weekly |
| **QA/Tester** | Quality | Testing, bug reports, quality assurance | TBD | Cao - Daily |
| **Legal Team** | Compliance | Privacy (GDPR), data protection, compliance | TBD | Thấp - Monthly |
| **Finance Team** | Finance | Billing logic, cost management, budget approval | TBD | Thấp - Monthly |
| **End Users** | Customers | Use platform, provide feedback | TBD | Cao - Post-launch |

### 3.2 Stakeholder Communication Plan

| Stakeholder | Frequency | Method | Content |
|-------------|-----------|--------|---------|
| Client/PO | Daily | Email, Slack | Progress updates, blockers |
| PM/Tech Lead | Daily | Standup, Slack | Task status, technical decisions |
| Dev Team | Daily | Standup, Jira | Tasks, code reviews |
| Legal/Finance | Monthly | Meeting | Compliance, billing updates |
| End Users | Post-launch | Email, Support | Onboarding, feature updates |

---

## 4. Yêu cầu high-level

### 4.1 Yêu cầu chức năng (Functional Requirements)

#### 4.1.1 Authentication & Authorization

**FR-001: Multi-provider OAuth**
- Hỗ trợ đăng ký/đăng nhập qua:
  - Google OAuth 2.0
  - Facebook OAuth 2.0
  - TikTok OAuth 2.0
  - Email/Password (với email verification)
  - Phone Number (với SMS verification)
- Session management với JWT tokens
- Token expiry: 1 giờ (với refresh token 7 ngày)

**FR-002: Role-based Access Control (RBAC)**
- Roles: Admin, Owner, Member, Viewer
- Permissions matrix:
  - Admin: Full access toàn hệ thống
  - Owner: Quản lý project, invite members, billing
  - Member: Chat, view project, limited settings
  - Viewer: Read-only access

#### 4.1.2 Chat Interface

**FR-003: Multi-modal Chat**
- **Text chat:**
  - Input qua text box
  - Support markdown formatting
  - Code syntax highlighting
  - Real-time streaming responses
- **Voice chat:**
  - Voice input qua STT (Speech-to-Text)
  - Voice output qua TTS (Text-to-Speech)
  - Hỗ trợ nhiều ngôn ngữ (VN, EN)
- **File upload:**
  - Support: PDF, TXT, DOCX, images (PNG, JPG)
  - Max file size: 10MB
  - Extract context từ files cho AI

**FR-004: Agent Selection**
- Dropdown list các agents available
- Hiển thị thông tin agent:
  - Name, version, description
  - Cost per token (nếu có)
  - Capabilities (text/voice/file)
- Switch agent giữa conversations

#### 4.1.3 Project & Thread Management

**FR-005: Multi-tenant Projects**
- User có thể tạo nhiều projects
- Mỗi project có:
  - Name, description, icon
  - Members với roles khác nhau
  - Billing riêng biệt
  - Settings riêng (default agent, permissions)

**FR-006: Conversation Threading**
- Mỗi project có nhiều threads (conversations)
- Thread có:
  - Title (auto-generated hoặc user-defined)
  - thread_id (UUID để track context)
  - Created date, last updated
  - Message count, participants
- AI duy trì context trong thread:
  - Gửi thread_id khi call AI API
  - Retrieve last N messages làm context
  - Support context window optimization

**FR-007: Thread Operations**
- Create new thread
- Rename thread
- Archive/Delete thread (soft delete)
- Search threads (by title, content, date)
- Pin important threads

#### 4.1.4 Agent Management

**FR-008: Agent CRUD (Admin/Owner only)**
- **Create agent:**
  - Name, type (external/self-hosted)
  - API endpoint, credentials
  - Model source (OpenAI/Gemini/Custom)
  - Config (temperature, max_tokens, etc.)
- **Read agent:**
  - List all agents
  - View agent details, version
  - Test connection status
- **Update agent:**
  - Modify config, credentials
  - Update Docker image (self-hosted)
- **Delete agent:**
  - Soft delete, archive

**FR-009: Self-hosted Agent Deployment**
- Upload Docker image cho custom agent
- Configure container:
  - Environment variables
  - Port mapping
  - Resource limits (CPU, RAM)
- Start/Stop/Restart container
- Health check endpoint
- View logs

#### 4.1.5 Billing & Reporting

**FR-010: Token/Cost Tracking**
- Log mỗi API call:
  - user_id, project_id, agent_id
  - conversation_id, thread_id
  - tokens_used (input + output)
  - cost (tính theo pricing của agent)
  - timestamp

**FR-011: Billing Reports**
- View usage dashboard:
  - Cost by user/project/agent
  - Token usage charts (line, bar)
  - Time range filter (day/week/month/year)
- Export reports:
  - CSV format
  - PDF format (optional)
- Billing breakdown:
  - Per conversation/thread
  - Per user
  - Per project

#### 4.1.6 ML Training Pipeline

**FR-012: Model Training**
- Upload base model từ Hugging Face
- Config training params:
  - Dataset (upload hoặc URL)
  - Epochs, batch size, learning rate
  - Validation split
- AI-assisted config suggestions:
  - Integrate với AI khác để suggest optimal params
  - Based on dataset size, model type
- Monitor training progress:
  - Real-time loss/accuracy charts
  - Estimated time remaining
  - Stop training anytime

**FR-013: Model Deployment**
- Auto-generate Docker image sau training
- Deploy trained model as self-hosted agent
- Version control cho models

### 4.2 Yêu cầu phi chức năng (Non-Functional Requirements)

#### 4.2.1 Performance (NFR-001)

**Scalability:**
- Handle 10,000 concurrent users
- Horizontal scaling cho từng microservice
- Auto-scaling dựa trên load (CPU > 70%)

**Response Time:**
- Median response time < 2s cho cached agents
- < 10s cho remote API calls (OpenAI, Gemini)
- Real-time streaming latency < 500ms
- Database query < 100ms (95th percentile)

**Throughput:**
- 1,000 requests/second cho API Gateway
- 100 messages/second cho Chat Orchestrator

**Availability:**
- 99.5% uptime SLA (monthly)
- Max downtime: 3.6 hours/month
- Scheduled maintenance window: Sundays 2-4 AM

#### 4.2.2 Security (NFR-002)

**Authentication:**
- OAuth2 + OpenID Connect
- JWT tokens với HMAC-SHA256
- Token expiry: 1 hour access token, 7 days refresh token
- Secure cookie storage (HttpOnly, Secure, SameSite)

**Authorization:**
- Role-based access control (RBAC)
- Permission checks trên mỗi API endpoint
- Audit logs cho sensitive operations

**Data Protection:**
- Encrypt API keys at rest (AES-256)
- TLS 1.3 for data in transit (HTTPS)
- Encrypt sensitive fields trong database (passwords, tokens)
- Hash passwords với bcrypt (cost factor 10)

**Compliance:**
- OWASP Top 10 compliance
- Regular security scans (OWASP ZAP, Snyk)
- Penetration testing before production
- GDPR-like compliance cho user data

#### 4.2.3 Observability (NFR-003)

**Metrics:**
- Prometheus metrics collection
- Grafana dashboards:
  - Request rate, error rate, latency (RED metrics)
  - CPU, memory, disk usage
  - Database connections, query performance
- Alerting rules:
  - Error rate > 5% → Slack alert
  - Response time > 5s → Email alert

**Logging:**
- Centralized logging (ELK Stack hoặc Loki)
- Log levels: DEBUG, INFO, WARN, ERROR
- Structured logging (JSON format)
- Log retention: 30 days

**Tracing:**
- Distributed tracing (optional: Jaeger)
- Trace request flow qua microservices
- Identify bottlenecks

#### 4.2.4 Data Privacy (NFR-004)

**User Data:**
- User consent cho data collection
- Right to access data
- Right to delete data (GDPR Article 17)
- Data retention policy: 1 year inactive → delete

**Voice/File Privacy:**
- Encrypt uploaded files at rest
- Auto-delete files after 30 days (optional)
- No third-party sharing without consent

#### 4.2.5 Usability (NFR-005)

**Accessibility:**
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- High contrast mode

**Internationalization:**
- Support multiple languages (Vietnamese, English)
- i18n framework (react-i18next)
- Date/time localization

**User Experience:**
- Responsive design (mobile-first)
- Loading states, error messages
- Smooth animations (<16ms)
- Offline mode (limited features)

#### 4.2.6 DevOps (NFR-006)

**CI/CD:**
- Automated pipeline (GitHub Actions)
- Build → Test → Lint → Deploy
- Automated testing (unit, integration, E2E)
- Code coverage > 70%

**Infrastructure as Code:**
- Terraform for cloud resources
- Kubernetes manifests for deployments
- Version control cho infrastructure

**Deployment:**
- Blue-green deployment
- Rollback capability
- Zero-downtime deployments

---

## 5. Phạm vi dự án

### 5.1 Trong phạm vi (In Scope)

✅ **Core Features:**
- Web application (Next.js, responsive)
- Mobile application (React Native/Expo, iOS + Android)
- Multi-agent chat system (OpenAI, Gemini, Grok, custom)
- Conversation threading với context management
- Voice input/output (STT/TTS)
- File upload & processing (PDF, DOCX, images)
- Agent management (external + self-hosted)
- Billing & reporting (token/cost tracking)
- ML training pipeline (Hugging Face integration)
- OAuth authentication (Google, Facebook, TikTok, Email, Phone)
- Real-time features (WebSocket streaming, notifications)
- Basic admin panel (user management, agent management)

✅ **Infrastructure:**
- Microservices architecture (8 services)
- Docker containerization
- Kubernetes orchestration
- PostgreSQL database
- Redis cache
- MinIO/S3 file storage
- CI/CD pipeline (GitHub Actions)
- Monitoring (Prometheus, Grafana)
- Logging (ELK Stack)

### 5.2 Ngoài phạm vi (Out of Scope)

❌ **Advanced Features:**
- Advanced analytics & BI dashboards
- Third-party integrations (Slack, Microsoft Teams, etc.)
- Video call support
- Multi-language code execution (sandbox)
- Advanced ML model marketplace
- White-label solutions
- Plugin system cho agents
- Blockchain/Web3 features

❌ **Business:**
- Marketing campaigns
- Sales operations
- Customer acquisition
- Payment gateway integration (Phase 2)

### 5.3 Future Enhancements (Post-MVP)

**Phase 2 (3-6 months post-launch):**
- Plugin system for extensibility
- Advanced analytics & insights
- Team collaboration features (mentions, shares)
- Marketplace for trained models
- API for third-party developers
- Payment integration (Stripe, PayPal)

**Phase 3 (6-12 months post-launch):**
- Enterprise features (SSO, audit logs)
- Advanced security (2FA, IP whitelist)
- White-label solution
- Multi-region deployment
- Advanced ML features (AutoML, model comparison)

---

## 6. Tiêu chí thành công

### 6.1 Thành công về chức năng

**Functional Success Criteria:**
- ✅ Hoàn thành 100% User Stories (US-001 đến US-010)
- ✅ 95%+ test coverage (unit + integration)
- ✅ Pass tất cả acceptance criteria
- ✅ Zero critical bugs trong production
- ✅ All features demo được end-to-end

### 6.2 Thành công về kỹ thuật

**Technical Success Criteria:**
- ✅ System handle 10,000 concurrent users (load test)
- ✅ Response time < 2s (95th percentile)
- ✅ 99.5% uptime achieved (monitored 30 days)
- ✅ Security audit passed (OWASP, Snyk clean)
- ✅ Code quality grade A (SonarQube)
- ✅ CI/CD pipeline fully automated
- ✅ Database optimized (indexes, query plans)

### 6.3 Thành công về kinh doanh

**Business Success Criteria:**
- ✅ 10-20 beta users onboarded successfully
- ✅ User satisfaction > 4.0/5.0 (survey)
- ✅ Cost per user < target (TBD)
- ✅ MVP launched trong 6 tháng
- ✅ Zero data breaches
- ✅ Positive stakeholder feedback
- ✅ **ROI > 90% trong năm đầu** ⭐ **MỚI**
- ✅ **Break-even đạt được trong 7 tháng** ⭐ **MỚI**

### 6.4 Thành công về người dùng

**User Success Criteria:**
- ✅ User có thể chat với AI trong < 2 phút sau signup
- ✅ User có thể tạo project và invite members
- ✅ User có thể upload file và nhận AI analysis
- ✅ User có thể train custom agent (advanced users)
- ✅ User hiểu billing và cost breakdown
- ✅ User có thể sử dụng trên cả web và mobile

---

## 7. Giả định và ràng buộc

### 7.1 Giả định (Assumptions)

**Team:**
- ✓ Team có 6 members full-time (PM, 2 Backend, 1 Frontend, 1 DevOps, 1 QA)
- ✓ Team có kinh nghiệm với tech stack (NestJS, Next.js, K8s)
- ✓ Team availability: 40 hours/week/person
- ✓ Team có access đến tools (Jira, GitHub, AWS/GCP)

**Infrastructure:**
- ✓ Budget đủ cho cloud infrastructure costs (AWS hoặc GCP)
- ✓ OpenAI, Google Gemini, Grok API keys available
- ✓ Docker Hub registry access
- ✓ Kubernetes cluster (EKS/GKE) provisioned

**Users:**
- ✓ Users có stable internet connection (>10 Mbps)
- ✓ Users dùng modern browsers (Chrome 90+, Safari 14+, Firefox 88+)
- ✓ Mobile users có iOS 14+ hoặc Android 10+
- ✓ Users có basic tech literacy (biết dùng chat apps)

**Third-party:**
- ✓ OpenAI, Google APIs có 99%+ uptime
- ✓ API pricing stable trong duration dự án
- ✓ Hugging Face models accessible và miễn phí

### 7.2 Ràng buộc (Constraints)

**Timeline:**
- ⏰ Fixed timeline: 22 weeks (~6 months)
- ⏰ Milestone deadlines không thể shift quá 1 tuần
- ⏰ Beta launch deadline: Week 22

**Budget:**
- 💰 Cloud infrastructure: ~$500-1000/month (estimate)
- 💰 API costs: ~$200-500/month (OpenAI, Gemini)
- 💰 Team costs: Fixed salary budget
- 💰 Tool licenses: GitHub, Jira, monitoring tools
- 💰 **Total project budget: $250,000 maximum** ⭐ **MỚI**

**Technology:**
- 🛠️ Must use TypeScript cho backend/frontend (client requirement)
- 🛠️ Must use PostgreSQL (không dùng NoSQL)
- 🛠️ Must use Kubernetes for production
- 🛠️ Cannot use proprietary/closed-source libraries (except AI APIs)

**Compliance:**
- 📜 Must comply with GDPR for EU users
- 📜 Data residency requirements (store trong Vietnam if VN users)
- 📜 Privacy policy và Terms of Service required before launch
- 📜 Legal review cho voice recording features

**Resources:**
- 👥 Limited to 6 team members (cannot hire more)
- 💻 Limited compute resources (K8s cluster size fixed)
- 📦 Limited storage budget (MinIO/S3)

### 7.3 Dependencies (Phụ thuộc)

**External:**
- 🔗 OpenAI API availability và stability
- 🔗 Google Cloud Platform account approval
- 🔗 GitHub repository access
- 🔗 Docker Hub registry access
- 🔗 Domain name registration (chatai.com)
- 🔗 SSL certificate (Let's Encrypt hoặc paid)

**Internal:**
- 🔗 Legal team approval cho privacy policy
- 🔗 Finance team approval cho billing logic
- 🔗 Stakeholder approval cho major technical decisions
- 🔗 DevOps team setup infrastructure

---

## 8. Business Case & Financial Analysis ⭐ **MỚI**

### 8.1 Chi phí dự án (Project Costs)

#### 8.1.1 Chi phí Development (6 tháng)

| Hạng mục | Chi tiết | Chi phí (USD) |
|----------|----------|---------------|
| **Personnel Costs** | | |
| Project Manager | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| Backend Developers | 2 người × 6 tháng × $5,000/tháng | $60,000 |
| Frontend Developer | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| DevOps Engineer | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| QA/Tester | 1 người × 6 tháng × $5,000/tháng | $30,000 |
| **Subtotal Personnel** | | **$180,000** |
| | | |
| **Infrastructure Costs** | | |
| Cloud hosting (AWS/GCP) | $2,000/tháng × 6 tháng | $12,000 |
| Third-party API credits | OpenAI + Gemini testing | $6,000 |
| **Subtotal Infrastructure** | | **$18,000** |
| | | |
| **Tools & Software** | | |
| Jira licenses | 6 users × $7/user/tháng × 6 tháng | $252 |
| GitHub Team | $4/user/tháng × 6 users × 6 tháng | $144 |
| Monitoring tools | Grafana Cloud, Sentry | $1,200 |
| Domain & SSL | chatai.com + certificates | $200 |
| Misc tools | Design, testing tools | $1,204 |
| **Subtotal Tools** | | **$3,000** |
| | | |
| **Contingency (20%)** | Unexpected costs, overruns | $40,200 |
| | | |
| **TOTAL PROJECT COST** | | **$241,200** |

### 8.2 Dự báo doanh thu (Revenue Projections)

#### 8.2.2 Pricing Strategy

| Tier | Giá/Tháng | Features | Target Segment |
|------|-----------|----------|----------------|
| **Free** | $0 | 3 projects, 100 messages/day, external agents only | Individual users, testing |
| **Pro** | $49 | Unlimited projects, unlimited messages, voice/file, basic ML | Power users, small teams |
| **Enterprise** | $299 | All Pro + self-hosted agents, ML training, priority support, SLA | Organizations, businesses |

#### 8.2.3 Revenue Forecast (Năm đầu)

**Assumptions:**
- Launch Month 7 (sau 6 tháng development)
- User acquisition: 100 new users/tháng (conservative)
- Conversion rate: Free → Pro 10%, Free → Enterprise 1%

| Tháng | Free Users | Pro Users | Enterprise | Revenue/Tháng | Cumulative Revenue |
|-------|------------|-----------|------------|---------------|-------------------|
| M7 (Launch) | 100 | 10 | 1 | $789 | $789 |
| M8 | 200 | 30 | 2 | $2,068 | $2,857 |
| M9 | 350 | 60 | 4 | $4,136 | $6,993 |
| M10 | 550 | 100 | 7 | $7,093 | $14,086 |
| M11 | 800 | 150 | 10 | $10,350 | $24,436 |
| M12 | 1,200 | 250 | 15 | $16,735 | $41,171 |
| M13-M18 | +500/mo | +100/mo | +10/mo | ~$30K/mo avg | **Total: $473,400** |

### 8.3 Phân tích ROI

#### 8.3.1 Break-even Analysis

**Total Investment:** $241,200  
**Monthly Fixed Costs (post-launch):** ~$15,000 (infrastructure + maintenance)  
**Break-even point:** Month 13 (7 tháng post-launch)

**Calculation:**
```
Cumulative Revenue (M13) = $41,171
Remaining months revenue = $432,229
Total Year 1 Revenue = $473,400
Net Profit Year 1 = $473,400 - $241,200 - ($15,000 × 12) = $52,200
ROI Year 1 = ($52,200 / $241,200) × 100% = 21.6%
```

#### 8.3.2 NPV & Payback Period

**Net Present Value (Year 1):** $52,200  
**Payback Period:** 13 months from project start (7 months post-launch)  
**IRR (Internal Rate of Return):** ~18% (Year 1)

### 8.4 Rủi ro tài chính (Financial Risks)

| Rủi ro | Xác suất | Impact | Mitigation |
|--------|----------|--------|------------|
| User acquisition chậm hơn dự kiến | Medium | High | Aggressive marketing, referral program |
| Infrastructure costs vượt budget | Medium | Medium | Cost monitoring, optimize resources |
| Development delay (>6 months) | Low | High | Buffer time built in, agile methodology |
| Churn rate cao (>20%) | Low | Medium | Focus on user satisfaction, support |
| Competition tăng | High | Medium | Differentiate with self-hosted, ML features |

### 8.5 Kết luận Business Case

**Khuyến nghị:** ✅ **PHÁT TRIỂN DỰ ÁN**

**Lý do:**
1. ✅ ROI tích cực (~22% Year 1, tiềm năng 50%+ Year 2-3)
2. ✅ Break-even đạt được trong 13 tháng (acceptable)
3. ✅ Total investment $241K trong khả năng chi trả
4. ✅ Revenue model proven (SaaS B2B/B2C)
5. ✅ Market opportunity lớn (AI tools đang hot)
6. ✅ Competitive moat với self-hosted + ML features

**
