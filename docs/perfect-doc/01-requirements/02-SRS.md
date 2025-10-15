# Software Requirements Specification (SRS) - Part 1
# Đặc Tả Yêu Cầu Phần Mềm - Phần 1

## Overview & Product Description
## Tổng Quan & Mô Tả Sản Phẩm

**Document Information / Thông Tin Tài Liệu**
- **Version / Phiên bản:** 1.0.0
- **Last Updated / Cập nhật cuối:** October 15, 2025
- **Document Owner / Chủ sở hữu:** Business Analyst / Product Owner
- **Status / Trạng thái:** ✅ Approved / Đã phê duyệt

**Related Files / Các File Liên Quan:**
- **Part 1 (this file):** Introduction & Overall Description / Giới thiệu & Tổng quan
- **Part 2:** Functional Requirements Features 1-5 / Yêu cầu chức năng 1-5
- **Part 3:** Functional Requirements Features 6-9 / Yêu cầu chức năng 6-9
- **Part 4:** Non-Functional Requirements / Yêu cầu phi chức năng
- **Part 5:** User Stories (separate file: [03-User-Stories.md](03-User-Stories.md))

---

## 1. Introduction / Giới Thiệu

### 1.1 Purpose / Mục Đích

**English:**  
This Software Requirements Specification (SRS) provides comprehensive functional and non-functional requirements for the **ChatAI Platform**. 

**Target Audience:**
- Development team (Backend, Frontend, DevOps, ML Engineers)
- QA/Testing team
- Project managers
- Business stakeholders
- Legal/Compliance team

**Tiếng Việt:**  
Tài liệu Đặc Tả Yêu Cầu Phần Mềm (SRS) này mô tả toàn diện các yêu cầu chức năng và phi chức năng cho **Nền Tảng ChatAI**.

**Đối tượng sử dụng:**
- Đội phát triển (Backend, Frontend, DevOps, ML Engineers)
- Đội QA/Testing
- Quản lý dự án
- Các bên liên quan kinh doanh
- Đội pháp lý/tuân thủ

---

### 1.2 Scope / Phạm Vi

**Product Name / Tên Sản Phẩm:**  
**ChatAI Platform** - Multi-Agent AI Chat System / Hệ Thống Chat AI Đa Agent

**Product Features / Tính Năng Chính:**

| Feature / Tính năng | Description / Mô tả |
|---------------------|---------------------|
| ✅ Multi-tenant Projects | Project management with threading / Quản lý dự án với luồng hội thoại |
| ✅ Multiple AI Providers | OpenAI, Gemini, Grok, custom / Tích hợp nhiều nhà cung cấp AI |
| ✅ Multi-Modal Input | Text, Voice (STT/TTS), File upload / Văn bản, giọng nói, upload file |
| ✅ Self-Hosted Agents | Docker deployment / Triển khai qua Docker |
| ✅ ML Training Pipeline | Train & deploy custom models / Huấn luyện & triển khai mô hình |
| ✅ Billing & Analytics | Usage tracking, cost reports / Theo dõi sử dụng, báo cáo chi phí |
| ✅ Real-time Notifications | WebSocket-based alerts / Thông báo thời gian thực |
| ✅ Cross-Platform | Web (Next.js) + Mobile (React Native) |
| ✅ API Architecture | RESTful + WebSocket APIs |
| ✅ Microservices | 8 independent services / 8 dịch vụ độc lập |

**Benefits / Lợi Ích:**
- **Users / Người dùng:** Single interface for multiple AI / Giao diện thống nhất cho nhiều AI
- **Business / Doanh nghiệp:** Cost transparency / Minh bạch chi phí
- **Developers / Lập trình viên:** Context management / Quản lý ngữ cảnh hội thoại
- **Enterprise / Doanh nghiệp lớn:** Data privacy via self-hosted / Bảo mật dữ liệu
- **All / Tất cả:** Extensibility / Khả năng mở rộng

---

### 1.3 Definitions / Định Nghĩa

| Term / Thuật ngữ | English Definition | Định nghĩa Tiếng Việt |
|------------------|-------------------|----------------------|
| **Agent** | AI model/service responding to queries | Mô hình AI phản hồi câu hỏi |
| **Thread** | Conversation context container | Vùng chứa ngữ cảnh hội thoại |
| **Project** | Multi-tenant workspace | Không gian làm việc đa người |
| **RBAC** | Role-Based Access Control | Kiểm soát truy cập theo vai trò |
| **STT** | Speech-to-Text | Chuyển giọng nói sang văn bản |
| **TTS** | Text-to-Speech | Chuyển văn bản sang giọng nói |
| **JWT** | JSON Web Token (auth) | Token xác thực |
| **OAuth** | Third-party login protocol | Đăng nhập bên thứ ba |
| **WebSocket** | Real-time communication | Giao tiếp thời gian thực |
| **Microservice** | Independent service | Dịch vụ độc lập |

---

### 1.4 References / Tài Liệu Tham Khảo

**Related Project Documents / Tài liệu dự án:**
- [Business Requirements (BRD)](01-BRD.md)
- [System Architecture](../02-architecture/01-System-Architecture.md)
- [Database Design (ERD)](../02-architecture/02-Database-Design-ERD.md)
- [API Specification](../02-architecture/05-API-Specification.yaml)
- [Project Roadmap](../03-project-management/01-Roadmap.md)
- [Test Plan](../05-testing/01-Test-Plan.md)

**External Standards / Chuẩn bên ngoài:**
- IEEE 830-1998 (SRS Standard)
- WCAG 2.1 AA (Accessibility)
- GDPR (Data Protection)
- OAuth 2.0 (RFC 6749)
- JWT (RFC 7519)

---

## 2. Overall Description / Tổng Quan

### 2.1 Product Perspective / Góc Nhìn Sản Phẩm

**English:**  
ChatAI Platform is a **new, standalone system** aggregating multiple AI chat providers into one unified interface. It is not an enhancement but a ground-up build.

**Tiếng Việt:**  
Nền tảng ChatAI là một **hệ thống mới, độc lập** tổng hợp nhiều nhà cung cấp AI vào một giao diện thống nhất. Đây không phải mở rộng hệ thống cũ mà là xây dựng từ đầu.

**System Context / Bối cảnh hệ thống:**

```
┌─────────────────────────────────────────┐
│   ChatAI Platform / Nền tảng ChatAI    │
│  ┌────────────┐      ┌──────────────┐  │
│  │  Web App   │◄────►│  API Gateway │  │
│  │  Ứng dụng  │      │   Cổng API   │  │
│  └────────────┘      └──────┬───────┘  │
│  ┌────────────┐             │          │
│  │ Mobile App │◄────────────┘          │
│  │  Di động   │                        │
│  └────────────┘                        │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │   Backend Microservices (8)     │  │
│  │   Các dịch vụ backend           │  │
│  │  Auth, User, Chat, Agent,       │  │
│  │  Billing, Notification, ML      │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
           │              │
           ▼              ▼
  ┌─────────────┐  ┌──────────────┐
  │ External AI │  │ Cloud Storage│
  │   APIs      │  │  Lưu trữ đám │
  │ (OpenAI,    │  │    mây (S3)  │
  │  Gemini,    │  └──────────────┘
  │  Grok)      │
  └─────────────┘
```

**External Interfaces / Giao diện bên ngoài:**
- AI Providers: OpenAI, Gemini, Grok (RESTful APIs)
- OAuth: Google, Facebook, TikTok
- Storage: MinIO/AWS S3
- ML: Hugging Face Hub
- Orchestration: Kubernetes (AWS EKS/GCP GKE)

---

### 2.2 Product Functions / Chức Năng Sản Phẩm

**High-Level Functions / Chức năng cấp cao:**

| # | Function / Chức năng | Description / Mô tả |
|---|---------------------|---------------------|
| 1️⃣ | **User Authentication** / **Xác thực người dùng** | OAuth (Google, FB, TikTok), Email/Phone / OAuth và Email/SĐT |
| 2️⃣ | **Project Management** / **Quản lý dự án** | Create projects, invite members, RBAC / Tạo dự án, mời thành viên, phân quyền |
| 3️⃣ | **Conversation Threading** / **Luồng hội thoại** | Context management via threads / Quản lý ngữ cảnh qua thread |
| 4️⃣ | **Multi-Modal Chat** / **Chat đa phương thức** | Text, Voice (STT/TTS), File upload / Văn bản, giọng nói, file |
| 5️⃣ | **Agent Management** / **Quản lý Agent** | CRUD, API keys, health monitoring / CRUD, API key, giám sát |
| 6️⃣ | **Self-Hosted Agents** / **Agent tự quản** | Docker deployment, lifecycle / Triển khai Docker, quản lý vòng đời |
| 7️⃣ | **ML Training** / **Huấn luyện ML** | Train models (Hugging Face), deploy / Huấn luyện mô hình, triển khai |
| 8️⃣ | **Billing** / **Thanh toán** | Token logging, cost reports, CSV export / Log token, báo cáo chi phí |
| 9️⃣ | **Notifications** / **Thông báo** | Real-time WebSocket, Email / Thời gian thực, Email |
| 🔟 | **Cross-Platform** / **Đa nền tảng** | Web + Mobile synchronized / Web + Mobile đồng bộ |

---

### 2.3 User Classes / Phân Loại Người Dùng

| User Class / Loại | Description / Mô tả | Technical Level / Kỹ thuật | Frequency / Tần suất |
|-------------------|---------------------|---------------------------|---------------------|
| **End User** / **Người dùng** | Regular chat user / Chat thông thường | Low / Thấp | Daily / Hàng ngày |
| **Project Owner** / **Chủ dự án** | Manages team & projects / Quản lý team | Medium / Trung bình | Daily / Hàng ngày |
| **Admin** / **Quản trị** | System-wide management / Quản lý hệ thống | High / Cao | Weekly / Hàng tuần |
| **Developer** / **Lập trình viên** | Deploys custom agents / Triển khai agent | High / Cao | Weekly / Hàng tuần |
| **ML Engineer** | Trains models / Huấn luyện mô hình | High / Cao | Monthly / Hàng tháng |

**User Personas / Đối tượng người dùng:**
- **Sarah (End User):** Marketing manager, needs voice input / Quản lý marketing, cần nhập giọng nói
- **John (Owner):** Team lead, 5 projects, billing visibility / Trưởng nhóm, 5 dự án, cần xem chi phí
- **Alex (Admin):** CTO, 10 agents, cost optimization / CTO, 10 agent, tối ưu chi phí
- **Emily (Dev):** Data scientist, deploys proprietary model / Nhà khoa học dữ liệu, triển khai mô hình riêng
- **David (ML):** Researcher, fine-tunes BERT / Nhà nghiên cứu, tinh chỉnh BERT

---

### 2.4 Operating Environment / Môi Trường Hoạt Động

#### 2.4.1 Client-Side / Phía Client

**Web Application / Ứng dụng Web:**
- **Browsers / Trình duyệt:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen Resolutions / Độ phân giải:**
  - Desktop: 1920×1080
  - Tablet: 768×1024
  - Mobile: 375×667
- **Internet / Mạng:** Min 3G (1 Mbps), khuyến nghị 4G/WiFi
- **JavaScript:** ES6+ support required / Yêu cầu hỗ trợ ES6+

**Mobile Application / Ứng dụng Di động:**
- **iOS:** 14.0+ (iPhone 6s+)
- **Android:** 10+ (API 29+)
- **Storage / Bộ nhớ:** 50MB app + 500MB cache
- **Permissions / Quyền:** Microphone (voice / giọng nói), Camera (avatar), Storage (files)

#### 2.4.2 Server-Side / Phía Server

**Backend Services / Dịch vụ Backend:**
- **Runtime:** Node.js 18+ (NestJS), Python 3.12+ (ML)
- **Database / Cơ sở dữ liệu:** PostgreSQL 15+ (primary), Redis 7+ (cache)
- **Storage / Lưu trữ:** MinIO or AWS S3
- **Container:** Docker 24+, Kubernetes 1.28+
- **Cloud:** AWS (EKS, RDS, S3) hoặc GCP (GKE, Cloud SQL, GCS)

**Infrastructure / Hạ tầng:**
- **Load Balancer / Cân bằng tải:** Nginx or AWS ALB
- **Monitoring / Giám sát:** Prometheus + Grafana
- **Logging / Nhật ký:** ELK Stack or CloudWatch
- **CI/CD:** GitHub Actions or GitLab CI

---

### 2.5 Design Constraints / Ràng Buộc Thiết Kế

#### 2.5.1 Technology Constraints / Ràng buộc công nghệ

**Must Use / Bắt buộc:**
- Backend: NestJS (TypeScript)
- Frontend Web: Next.js 14
- Frontend Mobile: React Native/Expo
- Database: PostgreSQL, Redis
- Container: Docker + Kubernetes

**Prohibited / Cấm:**
- Monolithic architecture / Kiến trúc nguyên khối
- Client-side API keys / Lưu API key ở client
- Synchronous blocking calls / Gọi đồng bộ chặn luồng

#### 2.5.2 Business Constraints / Ràng buộc kinh doanh

- **Budget / Ngân sách:** $100,000 USD
- **Timeline / Thời gian:** 22 weeks (6 months)
- **Team / Đội ngũ:** 6 people (PM, 2 Backend, 1 Frontend, 1 DevOps, 1 QA)
- **Revenue Model / Mô hình doanh thu:** Usage-based (future / tương lai)

#### 2.5.3 Regulatory Constraints / Ràng buộc quy định

- **GDPR:** User data rights / Quyền dữ liệu người dùng
- **CCPA:** California privacy / Quyền riêng tư California
- **WCAG 2.1 AA:** Accessibility / Khả năng tiếp cận

#### 2.5.4 Performance Constraints / Ràng buộc hiệu năng

- Response time: <2s (cached), <10s (external API)
- Scalability: 10,000 concurrent users / 10,000 người dùng đồng thời
- Availability: 99.9% uptime SLA

---

### 2.6 Assumptions & Dependencies / Giả Định & Phụ Thuộc

#### 2.6.1 Assumptions / Giả định

**English:**
1. Third-party APIs (OpenAI, Gemini, Grok) remain stable
2. Users have modern browsers/OS with auto-updates
3. Minimum 3G internet connection
4. Team has NestJS, Docker, Kubernetes experience
5. AWS/GCP infrastructure available
6. OAuth credentials obtainable

**Tiếng Việt:**
1. API bên thứ ba (OpenAI, Gemini, Grok) ổn định
2. Người dùng có trình duyệt/hệ điều hành hiện đại
3. Kết nối mạng tối thiểu 3G
4. Đội ngũ có kinh nghiệm NestJS, Docker, Kubernetes
5. Hạ tầng AWS/GCP sẵn có
6. Có thể lấy OAuth credentials

#### 2.6.2 Critical Dependencies / Phụ thuộc quan trọng

**Cannot proceed without / Không thể tiến hành nếu thiếu:**
1. OpenAI API key with GPT-4 access / API key OpenAI có quyền GPT-4
2. Google Cloud account for Gemini / Tài khoản Google Cloud cho Gemini
3. Cloud hosting (AWS/GCP) with credits / Hosting đám mây có credits
4. OAuth credentials from Google, Facebook, TikTok / Credentials OAuth từ các nền tảng

**Important but workarounds possible / Quan trọng nhưng có thể thay thế:**
1. Hugging Face account / Tài khoản Hugging Face (có thể dùng thay thế)
2. SendGrid/AWS SES for email / SendGrid/SES cho email (có thể dùng SMTP)
3. Payment gateway (Stripe) / Cổng thanh toán (không cần cho MVP)

#### 2.6.3 External Service SLAs / SLA Dịch Vụ Bên Ngoài

| Service / Dịch vụ | SLA | Mitigation / Giải pháp dự phòng |
|---------|-----|------------|
| OpenAI API | 99.9% | Fallback to Gemini / Chuyển sang Gemini |
| Google Gemini | 99.9% | Fallback to Grok / Chuyển sang Grok |
| AWS/GCP | 99.99% | Multi-region (Phase 2) / Đa vùng |
| OAuth Providers / Nhà cung cấp OAuth | 99.9% | Email/phone login / Đăng nhập email/SĐT |

---

## Next Steps / Bước Tiếp Theo

**Continue to / Tiếp tục với:**
- **[Part 2: Functional Requirements (Features 1-5)](02-SRS-Part2-Functional-1to5.md)**
  - Part 2: Yêu cầu chức năng (Tính năng 1-5)
- **[Part 3: Functional Requirements (Features 6-9)](02-SRS-Part3-Functional-6to9.md)**
  - Part 3: Yêu cầu chức năng (Tính năng 6-9)
- **[Part 4: Non-Functional Requirements](02-SRS-Part4-Non-Functional.md)**
  - Part 4: Yêu cầu phi chức năng
- **[Part 5: User Stories Details](03-User-Stories.md)**
  - Part 5: Chi tiết User Stories

---

## Revision History / Lịch Sử Sửa Đổi

| Version / Phiên bản | Date / Ngày | Author / Tác giả | Changes / Thay đổi |
|---------|------|--------|---------|
| 0.1 | Sep 26, 2025 | BA Team | Initial draft / Bản nháp đầu |
| 1.0 | Oct 15, 2025 | Product Owner | Approved, split into 5 parts, bilingual / Phê duyệt, chia 5 phần, song ngữ |

---

**Document Approval / Phê Duyệt Tài Liệu**

| Role / Vai trò | Name / Tên | Signature / Chữ ký | Date / Ngày |
|------|------|-----------|------|
| Product Owner | TBD | ___________ | ______ |
| Project Manager / Quản lý dự án | thanhhaunv | ___________ | ______ |
| Technical Lead / Trưởng nhóm kỹ thuật | TBD | ___________ | ______ |

---

*End of SRS Part 1 - Overview / Kết thúc SRS Phần 1 - Tổng Quan*

# Software Requirements Specification (SRS) - Part 2
# Đặc Tả Yêu Cầu Phần Mềm - Phần 2

## Functional Requirements: Features 1-5
## Yêu Cầu Chức Năng: Tính Năng 1-5

**Document Information / Thông Tin Tài Liệu**
- **Version / Phiên bản:** 1.0.0
- **Last Updated / Cập nhật:** October 15, 2025
- **Status / Trạng thái:** ✅ Approved / Đã phê duyệt
- **Previous / Trước:** [Part 1 - Overview](02-SRS-Part1-Overview-Bilingual.md)
- **Next / Tiếp:** [Part 3 - Features 6-9](02-SRS-Part3-Functional-6to9.md)

---

## Table of Contents / Mục Lục

- [3.1 Feature 1: User Authentication](#31-feature-1-user-authentication--xác-thực-người-dùng)
- [3.2 Feature 2: Project Management](#32-feature-2-project-management--quản-lý-dự-án)
- [3.3 Feature 3: Conversation Threading](#33-feature-3-conversation-threading--luồng-hội-thoại)
- [3.4 Feature 4: Multi-Modal Chat (Text)](#34-feature-4-multi-modal-chat-text--chat-văn-bản)
- [3.5 Feature 5: Voice & File Upload](#35-feature-5-voice--file-upload--giọng-nói--upload-file)

---

## 3.1 Feature 1: User Authentication / Xác Thực Người Dùng

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-001  
**Related Milestone / Milestone liên quan:** M2

### 3.1.1 Description / Mô Tả

**English:**  
Users must be able to create accounts and authenticate via multiple methods: email, phone, or social OAuth providers (Google, Facebook, TikTok). Profile management includes updating name, avatar, and preferences.

**Tiếng Việt:**  
Người dùng phải có khả năng tạo tài khoản và xác thực qua nhiều phương thức: email, điện thoại, hoặc OAuth từ các nền tảng xã hội (Google, Facebook, TikTok). Quản lý hồ sơ bao gồm cập nhật tên, ảnh đại diện và tùy chọn.

---

### 3.1.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.1.1: Sign Up via Email / Đăng Ký Qua Email

**English:**
- System shall allow users to sign up with email and password
- Email must be unique across the system
- Password requirements: 8+ characters, 1 uppercase, 1 number, 1 special character
- System shall send verification email with link
- Account activates upon email verification within 24 hours
- Unverified accounts deleted after 7 days

**Tiếng Việt:**
- Hệ thống cho phép đăng ký bằng email và mật khẩu
- Email phải duy nhất trong hệ thống
- Yêu cầu mật khẩu: 8+ ký tự, 1 chữ hoa, 1 số, 1 ký tự đặc biệt
- Hệ thống gửi email xác thực với link
- Tài khoản được kích hoạt khi xác thực email trong 24 giờ
- Tài khoản chưa xác thực bị xóa sau 7 ngày

#### FR-3.1.2: Sign Up via Phone / Đăng Ký Qua Điện Thoại

**English:**
- System shall accept phone numbers in E.164 format (+country code)
- Phone must be unique across system
- System sends 6-digit OTP via SMS
- OTP expires after 10 minutes
- User can request new OTP after 60 seconds
- Maximum 3 OTP requests per hour per phone

**Tiếng Việt:**
- Hệ thống chấp nhận số điện thoại định dạng E.164 (+mã quốc gia)
- Số điện thoại phải duy nhất
- Hệ thống gửi OTP 6 chữ số qua SMS
- OTP hết hạn sau 10 phút
- Người dùng có thể yêu cầu OTP mới sau 60 giây
- Tối đa 3 lần gửi OTP mỗi giờ cho mỗi số

#### FR-3.1.3: OAuth Sign Up/Login / Đăng Nhập OAuth

**English:**
- System supports OAuth 2.0 for Google, Facebook, TikTok
- Upon successful OAuth, system creates user account or logs in existing user
- System links OAuth provider to user account
- If email from OAuth already exists, system prompts account merge
- User can link multiple OAuth providers to one account
- OAuth tokens refresh automatically before expiry

**Tiếng Việt:**
- Hệ thống hỗ trợ OAuth 2.0 cho Google, Facebook, TikTok
- Sau OAuth thành công, hệ thống tạo tài khoản hoặc đăng nhập
- Hệ thống liên kết OAuth với tài khoản
- Nếu email từ OAuth đã tồn tại, hệ thống nhắc gộp tài khoản
- Người dùng có thể liên kết nhiều OAuth với một tài khoản
- Token OAuth tự động làm mới trước khi hết hạn

#### FR-3.1.4: Login / Đăng Nhập

**English:**
- Users login via email/phone + password OR OAuth
- System generates JWT access token (1 hour expiry)
- System generates refresh token (7 days expiry)
- Failed login attempts >5 within 15 minutes locks account for 30 minutes
- System logs all login attempts (success/failure) with IP and device info
- "Remember me" option extends refresh token to 30 days

**Tiếng Việt:**
- Người dùng đăng nhập qua email/SĐT + mật khẩu HOẶC OAuth
- Hệ thống tạo JWT access token (hết hạn sau 1 giờ)
- Hệ thống tạo refresh token (hết hạn sau 7 ngày)
- Đăng nhập sai >5 lần trong 15 phút khóa tài khoản 30 phút
- Hệ thống ghi nhật ký mọi lần đăng nhập với IP và thông tin thiết bị
- Tùy chọn "Ghi nhớ" kéo dài refresh token lên 30 ngày

#### FR-3.1.5: Password Reset / Đặt Lại Mật Khẩu

**English:**
- Users request reset via email
- System sends reset link valid for 1 hour
- Link contains unique token (UUID v4)
- New password must meet complexity requirements
- Old password invalidated immediately
- All active sessions terminated upon password change
- User receives email notification of password change

**Tiếng Việt:**
- Người dùng yêu cầu đặt lại qua email
- Hệ thống gửi link đặt lại có hiệu lực 1 giờ
- Link chứa token duy nhất (UUID v4)
- Mật khẩu mới phải đáp ứng yêu cầu độ phức tạp
- Mật khẩu cũ vô hiệu hóa ngay lập tức
- Tất cả phiên đăng nhập bị đóng khi đổi mật khẩu
- Người dùng nhận email thông báo đổi mật khẩu

#### FR-3.1.6: Profile Management / Quản Lý Hồ Sơ

**English:**
- Users update: name (max 100 chars), avatar (image, max 5MB), email (with re-verification), phone
- Avatar formats: JPG, PNG, WebP (auto-converted to WebP)
- Users view: account creation date, last login, OAuth providers linked
- Users can unlink OAuth providers (must have email/phone alternative)
- Account deletion: soft delete, data retained 30 days for recovery
- Export data (GDPR): JSON file with all user data

**Tiếng Việt:**
- Người dùng cập nhật: tên (tối đa 100 ký tự), ảnh đại diện (max 5MB), email (xác thực lại), SĐT
- Định dạng ảnh: JPG, PNG, WebP (tự động chuyển sang WebP)
- Người dùng xem: ngày tạo tài khoản, đăng nhập cuối, OAuth đã liên kết
- Người dùng có thể hủy liên kết OAuth (phải có email/SĐT thay thế)
- Xóa tài khoản: xóa mềm, dữ liệu giữ 30 ngày để khôi phục
- Xuất dữ liệu (GDPR): File JSON chứa toàn bộ dữ liệu

---

### 3.1.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** new user, **When** sign up with valid email, **Then** account created and verification email sent
- **Given** user with email account, **When** login with correct password, **Then** JWT tokens returned
- **Given** user clicks Google OAuth, **When** authorized, **Then** logged in or account created
- **Given** user forgets password, **When** request reset, **Then** email with reset link sent
- **Given** authenticated user, **When** update avatar, **Then** new avatar displayed immediately

**Tiếng Việt:**
- **Cho** người dùng mới, **Khi** đăng ký với email hợp lệ, **Thì** tài khoản được tạo và email xác thực được gửi
- **Cho** người dùng có tài khoản, **Khi** đăng nhập đúng mật khẩu, **Thì** nhận JWT tokens
- **Cho** người dùng click Google OAuth, **Khi** được ủy quyền, **Thì** đăng nhập hoặc tạo tài khoản
- **Cho** người dùng quên mật khẩu, **Khi** yêu cầu đặt lại, **Thì** email có link được gửi
- **Cho** người dùng đã xác thực, **Khi** cập nhật ảnh, **Thì** ảnh mới hiển thị ngay

---

## 3.2 Feature 2: Project Management / Quản Lý Dự Án

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-005  
**Related Milestone:** M3

### 3.2.1 Description / Mô Tả

**English:**  
Users organize conversations into Projects, which are multi-tenant workspaces. Project owners invite members and assign roles (Owner, Editor, Viewer) with corresponding permissions.

**Tiếng Việt:**  
Người dùng tổ chức hội thoại thành Dự án - không gian làm việc đa người dùng. Chủ dự án mời thành viên và phân quyền (Chủ sở hữu, Biên tập viên, Người xem).

---

### 3.2.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.2.1: Create Project / Tạo Dự Án

**English:**
- Authenticated users create unlimited projects
- Project name required (3-100 chars)
- Creator automatically becomes Owner
- System auto-creates default thread "General"
- Project assigned unique project_id (UUID)
- Optional: project description (max 500 chars), icon upload

**Tiếng Việt:**
- Người dùng đã xác thực tạo không giới hạn dự án
- Tên dự án bắt buộc (3-100 ký tự)
- Người tạo tự động trở thành Chủ sở hữu
- Hệ thống tự tạo thread mặc định "General"
- Dự án được gán project_id duy nhất (UUID)
- Tùy chọn: mô tả dự án (max 500 ký tự), upload icon

#### FR-3.2.2: Invite Members / Mời Thành Viên

**English:**
- Owners/Editors invite members via email
- System sends invitation email with accept link
- Invitee must have account (or create one) to accept
- Inviter specifies role: Owner, Editor, or Viewer
- Invitation expires after 7 days
- Maximum 50 members per project (MVP limit)
- Pending invitations displayed in project settings

**Tiếng Việt:**
- Chủ sở hữu/Biên tập viên mời thành viên qua email
- Hệ thống gửi email mời với link chấp nhận
- Người được mời phải có tài khoản (hoặc tạo) để chấp nhận
- Người mời chỉ định vai trò: Owner, Editor, hoặc Viewer
- Lời mời hết hạn sau 7 ngày
- Tối đa 50 thành viên mỗi dự án (giới hạn MVP)
- Lời mời chờ xử lý hiển thị trong cài đặt dự án

#### FR-3.2.3: Role-Based Access Control (RBAC) / Phân Quyền

**Roles / Vai trò:**

| Role / Vai trò | Permissions / Quyền hạn (English) | Quyền hạn (Tiếng Việt) |
|----------------|----------------------------------|----------------------|
| **Owner** | Full permissions: edit project, invite/remove members, delete project, change roles | Toàn quyền: sửa dự án, mời/xóa thành viên, xóa dự án, đổi vai trò |
| **Editor** | Create/edit/delete threads, send messages, view billing, invite members (as Editor/Viewer only) | Tạo/sửa/xóa thread, gửi tin nhắn, xem thanh toán, mời thành viên (chỉ Editor/Viewer) |
| **Viewer** | Read-only: view threads and messages, cannot create/edit | Chỉ xem: xem thread và tin nhắn, không tạo/sửa |

**English:**
- RBAC enforced at API level (every request checked)
- Users cannot escalate their own permissions
- Project must have at least 1 Owner
- Owners can transfer ownership to another member
- Last Owner cannot leave project without transferring ownership or deleting project

**Tiếng Việt:**
- RBAC được thực thi ở tầng API (kiểm tra mọi request)
- Người dùng không thể tự nâng quyền
- Dự án phải có ít nhất 1 Chủ sở hữu
- Chủ sở hữu có thể chuyển quyền cho thành viên khác
- Chủ sở hữu cuối không thể rời dự án nếu không chuyển quyền hoặc xóa dự án

#### FR-3.2.4: Project Settings / Cài Đặt Dự Án

**English:**
- Owners rename project
- Owners set project icon (image upload, max 2MB)
- Owners configure default agent for new threads
- Owners enable/disable features: voice input, file upload
- Project activity log (member joins, leaves, role changes)

**Tiếng Việt:**
- Chủ sở hữu đổi tên dự án
- Chủ sở hữu đặt icon dự án (upload ảnh, max 2MB)
- Chủ sở hữu cấu hình agent mặc định cho thread mới
- Chủ sở hữu bật/tắt tính năng: nhập giọng nói, upload file
- Nhật ký hoạt động dự án (thành viên tham gia, rời, đổi vai trò)

#### FR-3.2.5: Project Deletion / Xóa Dự Án

**English:**
- Only Owners delete projects
- Deletion requires confirmation (type project name)
- Soft delete: data retained 30 days for recovery
- All threads, messages, billing logs retained with project
- Members notified via email of project deletion
- After 30 days, hard delete (permanent)

**Tiếng Việt:**
- Chỉ Chủ sở hữu xóa dự án
- Xóa yêu cầu xác nhận (gõ tên dự án)
- Xóa mềm: dữ liệu giữ 30 ngày để khôi phục
- Tất cả thread, tin nhắn, nhật ký thanh toán được giữ
- Thành viên nhận email thông báo xóa dự án
- Sau 30 ngày, xóa cứng (vĩnh viễn)

---

### 3.2.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** authenticated user, **When** create project, **Then** project created with user as Owner and "General" thread exists
- **Given** Owner, **When** invite member as Editor, **Then** invitation email sent and member added upon acceptance
- **Given** Editor, **When** try to delete project, **Then** action denied with 403 Forbidden
- **Given** Viewer, **When** view thread, **Then** can read but cannot send messages
- **Given** Owner, **When** delete project, **Then** project soft-deleted and members notified

**Tiếng Việt:**
- **Cho** người dùng đã xác thực, **Khi** tạo dự án, **Thì** dự án được tạo với người dùng là Owner và thread "General" tồn tại
- **Cho** Owner, **Khi** mời thành viên với vai trò Editor, **Thì** email mời được gửi và thành viên được thêm khi chấp nhận
- **Cho** Editor, **Khi** cố xóa dự án, **Thì** hành động bị từ chối với lỗi 403 Forbidden
- **Cho** Viewer, **Khi** xem thread, **Thì** có thể đọc nhưng không gửi tin nhắn
- **Cho** Owner, **Khi** xóa dự án, **Thì** dự án bị xóa mềm và thành viên nhận thông báo

---

## 3.3 Feature 3: Conversation Threading / Luồng Hội Thoại

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-009  
**Related Milestone:** M3

### 3.3.1 Description / Mô Tả

**English:**  
Each project contains multiple conversation threads. Threads group related messages and maintain context (thread_id) passed to AI agents, enabling continuity across exchanges.

**Tiếng Việt:**  
Mỗi dự án chứa nhiều luồng hội thoại (thread). Thread nhóm các tin nhắn liên quan và duy trì ngữ cảnh (thread_id) truyền cho AI agent, đảm bảo tính liên tục.

---

### 3.3.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.3.1: Create Thread / Tạo Thread

**English:**
- Users with Editor+ role create new threads in projects
- Thread name required (3-100 chars)
- Each thread assigned unique thread_id (UUID)
- Thread inherits project's default agent (can be changed per thread)
- Optional: thread description, agent selection
- Maximum 100 threads per project (MVP limit)

**Tiếng Việt:**
- Người dùng có vai trò Editor+ tạo thread mới trong dự án
- Tên thread bắt buộc (3-100 ký tự)
- Mỗi thread có thread_id duy nhất (UUID)
- Thread kế thừa agent mặc định của dự án (có thể đổi theo thread)
- Tùy chọn: mô tả thread, chọn agent
- Tối đa 100 thread mỗi dự án (giới hạn MVP)

#### FR-3.3.2: Thread Management / Quản Lý Thread

**English:**
- Editors+ rename threads
- Editors+ archive threads (hidden from main list but searchable)
- Editors+ delete threads (soft delete, retained 30 days)
- Archived threads accessible via "Archived" filter
- Restore archived threads to active
- Thread owner (creator) displayed

**Tiếng Việt:**
- Editor+ đổi tên thread
- Editor+ lưu trữ thread (ẩn khỏi danh sách chính nhưng vẫn tìm được)
- Editor+ xóa thread (xóa mềm, giữ 30 ngày)
- Thread đã lưu trữ truy cập qua bộ lọc "Đã lưu trữ"
- Khôi phục thread đã lưu trữ về trạng thái hoạt động
- Hiển thị chủ thread (người tạo)

#### FR-3.3.3: Context Management / Quản Lý Ngữ Cảnh

**English:**
- System passes thread_id with each message to AI agent
- AI agent retrieves previous messages in thread for context
- System stores message order (timestamp + sequence number)
- Context window: last 10 messages (configurable per agent)
- Long threads: system summarizes older messages (using AI) to maintain context within token limits
- Users can manually select messages to include in context

**Tiếng Việt:**
- Hệ thống truyền thread_id với mỗi tin nhắn cho AI agent
- AI agent lấy các tin nhắn trước trong thread để hiểu ngữ cảnh
- Hệ thống lưu thứ tự tin nhắn (timestamp + số thứ tự)
- Cửa sổ ngữ cảnh: 10 tin nhắn cuối (có thể cấu hình theo agent)
- Thread dài: hệ thống tóm tắt tin nhắn cũ (dùng AI) để giữ ngữ cảnh trong giới hạn token
- Người dùng có thể chọn thủ công tin nhắn để đưa vào ngữ cảnh

#### FR-3.3.4: Thread Search / Tìm Kiếm Thread

**English:**
- Full-text search across thread names and message content
- Search filters: date range, agent, member
- Search results show: thread name, message preview (50 chars), timestamp, relevance score
- Highlight search terms in results
- Search history saved (last 10 searches)

**Tiếng Việt:**
- Tìm kiếm toàn văn bản trên tên thread và nội dung tin nhắn
- Bộ lọc tìm kiếm: khoảng thời gian, agent, thành viên
- Kết quả hiển thị: tên thread, xem trước tin nhắn (50 ký tự), thời gian, điểm liên quan
- Đánh dấu từ khóa trong kết quả
- Lịch sử tìm kiếm được lưu (10 lần tìm cuối)

#### FR-3.3.5: Thread Listing / Danh Sách Thread

**English:**
- Threads displayed in sidebar
- Order by: last activity (default), creation date, alphabetical
- Each thread shows: name, last message preview, unread count, timestamp, agent icon
- Unread count badge on thread
- Active thread highlighted
- Filter by: active, archived, agent type

**Tiếng Việt:**
- Thread hiển thị trong thanh bên
- Sắp xếp theo: hoạt động cuối (mặc định), ngày tạo, abc
- Mỗi thread hiển thị: tên, xem trước tin nhắn cuối, số tin chưa đọc, thời gian, icon agent
- Huy hiệu số tin chưa đọc trên thread
- Thread đang hoạt động được đánh dấu
- Lọc theo: đang hoạt động, đã lưu trữ, loại agent

---

### 3.3.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** Editor in project, **When** create thread, **Then** thread created with unique ID and appears in sidebar
- **Given** thread with 5 messages, **When** send new message, **Then** AI receives thread_id and last 10 messages as context
- **Given** user searches "budget", **When** execute search, **Then** results show threads/messages containing "budget"
- **Given** thread archived, **When** view thread list, **Then** thread not shown unless "Archived" filter selected
- **Given** thread with new message, **When** user hasn't read, **Then** unread count badge displayed

**Tiếng Việt:**
- **Cho** Editor trong dự án, **Khi** tạo thread, **Thì** thread được tạo với ID duy nhất và xuất hiện trong thanh bên
- **Cho** thread có 5 tin nhắn, **Khi** gửi tin mới, **Thì** AI nhận thread_id và 10 tin nhắn cuối làm ngữ cảnh
- **Cho** người dùng tìm "ngân sách", **Khi** thực hiện tìm kiếm, **Thì** kết quả hiển thị thread/tin nhắn chứa "ngân sách"
- **Cho** thread đã lưu trữ, **Khi** xem danh sách thread, **Thì** thread không hiển thị trừ khi chọn bộ lọc "Đã lưu trữ"
- **Cho** thread có tin nhắn mới, **Khi** người dùng chưa đọc, **Thì** hiển thị huy hiệu số tin chưa đọc

---

## 3.4 Feature 4: Multi-Modal Chat (Text) / Chat Văn Bản

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-002  
**Related Milestone:** M5

### 3.4.1 Description / Mô Tả

**English:**  
Users send text messages to AI agents. System routes messages to selected agent, passes thread context, and streams responses in real-time via WebSocket.

**Tiếng Việt:**  
Người dùng gửi tin nhắn văn bản cho AI agent. Hệ thống định tuyến tin nhắn đến agent được chọn, truyền ngữ cảnh thread, và stream phản hồi thời gian thực qua WebSocket.

---

### 3.4.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.4.1: Text Input / Nhập Văn Bản

**English:**
- Rich text editor with Markdown support (bold, italic, code, links, lists)
- Multi-line input: Shift+Enter for new line, Enter to send
- Max message length: 10,000 characters
- Character counter displays remaining chars
- Draft auto-save (local storage, 5-minute intervals)
- Emoji picker available
- @mention members (autocomplete)

**Tiếng Việt:**
- Trình soạn thảo hỗ trợ Markdown (đậm, nghiêng, code, link, list)
- Nhập nhiều dòng: Shift+Enter xuống dòng, Enter gửi
- Độ dài tin nhắn tối đa: 10,000 ký tự
- Bộ đếm ký tự hiển thị số ký tự còn lại
- Tự động lưu bản nháp (local storage, mỗi 5 phút)
- Bảng chọn emoji
- @mention thành viên (tự động hoàn thành)

#### FR-3.4.2: Agent Selection / Chọn Agent

**English:**
- Dropdown list shows all available agents
- Agents display: name, icon, status (online/offline), description
- System defaults to thread's configured agent
- Users can change agent per message (dropdown in input bar)
- Unavailable agents grayed out
- Recently used agents appear at top

**Tiếng Việt:**
- Danh sách thả xuống hiển thị tất cả agent
- Agent hiển thị: tên, icon, trạng thái (online/offline), mô tả
- Hệ thống mặc định dùng agent của thread
- Người dùng có thể đổi agent mỗi tin nhắn (dropdown ở thanh nhập)
- Agent không khả dụng bị mờ
- Agent dùng gần đây xuất hiện trên cùng

#### FR-3.4.3: Send Message / Gửi Tin Nhắn

**English:**
- On send, system stores message in database with: user_id, agent_id, thread_id, conversation_id, timestamp, content
- System routes message to selected agent's API endpoint
- System passes: message content, thread_id, last 10 messages (context), user preferences
- Loading indicator displayed while waiting for response
- Message marked as "sending" then "sent" upon confirmation
- Failed messages show retry button

**Tiếng Việt:**
- Khi gửi, hệ thống lưu tin nhắn vào database với: user_id, agent_id, thread_id, conversation_id, thời gian, nội dung
- Hệ thống định tuyến tin nhắn đến endpoint API của agent được chọn
- Hệ thống truyền: nội dung tin nhắn, thread_id, 10 tin nhắn cuối (ngữ cảnh), tùy chọn người dùng
- Hiển thị chỉ báo đang tải khi chờ phản hồi
- Tin nhắn được đánh dấu "đang gửi" sau đó "đã gửi" khi xác nhận
- Tin nhắn gửi thất bại hiển thị nút thử lại

#### FR-3.4.4: Streaming Responses / Phản Hồi Stream

**English:**
- System receives AI response via WebSocket streaming
- UI displays response incrementally (typewriter effect, ~50 chars/second)
- Response complete when agent sends END_STREAM signal
- User can stop streaming mid-response (cancel button)
- Partial responses saved if stream interrupted
- Error handling: timeout (30s), network failure (retry), rate limit (queue)

**Tiếng Việt:**
- Hệ thống nhận phản hồi AI qua WebSocket streaming
- UI hiển thị phản hồi từng đoạn (hiệu ứng máy đánh chữ, ~50 ký tự/giây)
- Phản hồi hoàn thành khi agent gửi tín hiệu END_STREAM
- Người dùng có thể dừng stream giữa chừng (nút hủy)
- Phản hồi một phần được lưu nếu stream bị ngắt
- Xử lý lỗi: timeout (30s), lỗi mạng (thử lại), giới hạn tốc độ (xếp hàng)

#### FR-3.4.5: Message Display / Hiển Thị Tin Nhắn

**English:**
- Chat bubble format: user messages right-aligned (blue), AI left-aligned (gray)
- Each message shows: sender name/icon, timestamp, content (with Markdown rendering)
- Code blocks with syntax highlighting (language auto-detected)
- Long messages collapsible ("Show more" link)
- Messages grouped by time (e.g., "Today", "Yesterday", date headers)
- Smooth auto-scroll to latest message

**Tiếng Việt:**
- Định dạng bong bóng chat: tin người dùng canh phải (xanh), AI canh trái (xám)
- Mỗi tin nhắn hiển thị: tên/icon người gửi, thời gian, nội dung (render Markdown)
- Khối code với syntax highlighting (tự động nhận diện ngôn ngữ)
- Tin nhắn dài có thể thu gọn (link "Xem thêm")
- Tin nhắn nhóm theo thời gian (vd: "Hôm nay", "Hôm qua", tiêu đề ngày)
- Tự động cuộn mượt đến tin nhắn mới nhất

---

### 3.4.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** user in thread, **When** type message and press Enter, **Then** message sent to agent and response streams back
- **Given** AI responding, **When** response streaming, **Then** UI displays text incrementally with typewriter effect
- **Given** message contains code block, **When** displayed, **Then** syntax highlighted based on language
- **Given** user sends message, **When** agent unavailable, **Then** error message shown with retry option
- **Given** long conversation, **When** scroll up, **Then** older messages load (infinite scroll)

**Tiếng Việt:**
- **Cho** người dùng trong thread, **Khi** gõ tin nhắn và nhấn Enter, **Thì** tin nhắn gửi đến agent và phản hồi stream về
- **Cho** AI đang phản hồi, **Khi** phản hồi đang stream, **Thì** UI hiển thị văn bản từng đoạn với hiệu ứng máy đánh chữ
- **Cho** tin nhắn chứa khối code, **Khi** hiển thị, **Thì** syntax được đánh dấu theo ngôn ngữ
- **Cho** người dùng gửi tin nhắn, **Khi** agent không khả dụng, **Thì** hiển thị thông báo lỗi với tùy chọn thử lại
- **Cho** hội thoại dài, **Khi** cuộn lên, **Thì** tin nhắn cũ được tải (infinite scroll)

---

## 3.5 Feature 5: Voice & File Upload / Giọng Nói & Upload File

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-003, US-004  
**Related Milestone:** M9

### 3.5.1 Description / Mô Tả

**English:**  
Users can send messages via voice recording (speech-to-text) or attach files (PDF, DOCX, images). AI responses can be converted to speech (text-to-speech). Uploaded files are processed to extract text for context.

**Tiếng Việt:**  
Người dùng có thể gửi tin nhắn qua ghi âm giọng nói (chuyển thành văn bản) hoặc đính kèm file (PDF, DOCX, hình ảnh). Phản hồi AI có thể chuyển thành giọng nói. File được xử lý để trích xuất văn bản làm ngữ cảnh.

---

### 3.5.2 Functional Requirements - Voice / Yêu Cầu Giọng Nói

#### FR-3.5.1: Voice Recording / Ghi Âm Giọng Nói

**English:**
- Microphone icon in input bar triggers recording
- System requests browser microphone permission (once)
- Recording UI shows: waveform animation, timer, pause/resume, cancel, stop buttons
- Max recording duration: 5 minutes
- Audio format: WebM/Opus (browser default) or WAV
- User can review recording before sending
- Recording saved locally until transcription complete

**Tiếng Việt:**
- Icon microphone trong thanh nhập kích hoạt ghi âm
- Hệ thống yêu cầu quyền microphone từ trình duyệt (một lần)
- UI ghi âm hiển thị: animation sóng, đồng hồ, nút tạm dừng/tiếp tục, hủy, dừng
- Thời lượng ghi tối đa: 5 phút
- Định dạng âm thanh: WebM/Opus (mặc định trình duyệt) hoặc WAV
- Người dùng có thể xem lại bản ghi trước khi gửi
- Bản ghi lưu cục bộ cho đến khi phiên âm hoàn thành

#### FR-3.5.2: Speech-to-Text (STT) / Chuyển Giọng Nói Sang Văn Bản

**English:**
- System uses Web Speech API (browser-native) OR Whisper API (backend)
- Transcription accuracy target: >90%
- Supported languages: English, Vietnamese (MVP), expandable
- Transcribed text populates input field for user to edit before sending
- If transcription fails, system shows error and allows:
  - Retry transcription
  - Re-record
  - Type message manually
- Transcription typically completes in 2-5 seconds

**Tiếng Việt:**
- Hệ thống dùng Web Speech API (trình duyệt) HOẶC Whisper API (backend)
- Độ chính xác mục tiêu: >90%
- Ngôn ngữ hỗ trợ: Tiếng Anh, Tiếng Việt (MVP), có thể mở rộng
- Văn bản phiên âm điền vào ô nhập để người dùng chỉnh sửa trước khi gửi
- Nếu phiên âm thất bại, hệ thống hiển thị lỗi và cho phép:
  - Thử lại phiên âm
  - Ghi lại
  - Gõ tin nhắn thủ công
- Phiên âm thường hoàn thành trong 2-5 giây

#### FR-3.5.3: Text-to-Speech (TTS) / Chuyển Văn Bản Sang Giọng Nói

**English:**
- AI responses have "play audio" button (speaker icon)
- System converts response text to speech using Web Speech API or external TTS (Google TTS)
- User controls: play, pause, stop, speed (0.5x to 2x), voice selection (male/female)
- Audio plays in background (user can continue browsing)
- Audio generation cached for 1 hour (reduce API calls)
- Progress bar shows playback position
- Auto-play option in settings (disabled by default)

**Tiếng Việt:**
- Phản hồi AI có nút "phát âm thanh" (icon loa)
- Hệ thống chuyển văn bản thành giọng nói dùng Web Speech API hoặc TTS bên ngoài (Google TTS)
- Điều khiển: phát, tạm dừng, dừng, tốc độ (0.5x đến 2x), chọn giọng (nam/nữ)
- Âm thanh phát nền (người dùng có thể tiếp tục duyệt)
- Âm thanh được cache 1 giờ (giảm gọi API)
- Thanh tiến trình hiển thị vị trí phát
- Tùy chọn tự động phát trong cài đặt (mặc định tắt)

---

### 3.5.3 Functional Requirements - File Upload / Yêu Cầu Upload File

#### FR-3.5.4: File Upload / Upload File

**English:**
- Users attach files via button or drag-and-drop into input area
- Supported formats: PDF, TXT, DOCX, MD, JPG, PNG, WebP
- Max file size: 10MB per file
- Max files per message: 5
- System uploads to MinIO/S3 with unique file_id (UUID)
- Upload progress bar displayed
- File metadata stored in message table: filename, size, type, URL, upload_timestamp

**Tiếng Việt:**
- Người dùng đính kèm file qua nút hoặc kéo-thả vào khu vực nhập
- Định dạng hỗ trợ: PDF, TXT, DOCX, MD, JPG, PNG, WebP
- Kích thước file tối đa: 10MB mỗi file
- Số file tối đa mỗi tin nhắn: 5
- Hệ thống upload lên MinIO/S3 với file_id duy nhất (UUID)
- Hiển thị thanh tiến trình upload
- Metadata file lưu trong bảng message: tên file, kích thước, loại, URL, thời gian upload

#### FR-3.5.5: File Processing / Xử Lý File

**English:**
- System extracts text content from files:
  - **PDF:** PyPDF2 library (Python backend)
  - **DOCX:** python-docx library
  - **TXT/MD:** Direct read
  - **Images (JPG/PNG):** OCR using Tesseract (optional, configurable)
- Extracted text included in message context sent to agent
- Max extracted text: 5,000 chars per file (truncated if longer, with "..." indicator)
- Processing typically completes in 3-10 seconds
- If processing fails, file still attached but text extraction skipped

**Tiếng Việt:**
- Hệ thống trích xuất văn bản từ file:
  - **PDF:** Thư viện PyPDF2 (backend Python)
  - **DOCX:** Thư viện python-docx
  - **TXT/MD:** Đọc trực tiếp
  - **Hình ảnh (JPG/PNG):** OCR dùng Tesseract (tùy chọn, có thể cấu hình)
- Văn bản trích xuất được đưa vào ngữ cảnh tin nhắn gửi cho agent
- Văn bản tối đa: 5,000 ký tự mỗi file (cắt ngắn nếu dài hơn, có dấu "...")
- Xử lý thường hoàn thành trong 3-10 giây
- Nếu xử lý thất bại, file vẫn đính kèm nhưng bỏ qua trích xuất văn bản

#### FR-3.5.6: File Display / Hiển Thị File

**English:**
- Uploaded files show as attachment in message bubble
- Display: icon (based on file type), filename, size, download button
- Images display inline thumbnail (max 300×300px)
- Click thumbnail to open full-size image in lightbox
- Click filename/download to download file
- Files accessible to all project members (based on RBAC)

**Tiếng Việt:**
- File đã upload hiển thị dưới dạng đính kèm trong bong bóng tin nhắn
- Hiển thị: icon (theo loại file), tên file, kích thước, nút tải xuống
- Hình ảnh hiển thị thumbnail inline (tối đa 300×300px)
- Click thumbnail để mở ảnh kích thước đầy đủ trong lightbox
- Click tên file/download để tải file
- File có thể truy cập bởi tất cả thành viên dự án (theo RBAC)

---

### 3.5.4 Acceptance Criteria / Tiêu Chí Chấp Nhận

**Voice / Giọng nói:**

**English:**
- **Given** user clicks microphone, **When** browser grants permission, **Then** recording starts with waveform animation
- **Given** user records 30s, **When** stops recording, **Then** audio transcribed to text in input field within 5s
- **Given** transcription fails, **When** error occurs, **Then** user can retry or re-record
- **Given** AI response received, **When** user clicks play audio, **Then** TTS converts text to speech and plays
- **Given** TTS playing, **When** user changes speed to 1.5x, **Then** audio playback speed adjusts immediately

**Tiếng Việt:**
- **Cho** người dùng click microphone, **Khi** trình duyệt cấp quyền, **Thì** bắt đầu ghi với animation sóng
- **Cho** người dùng ghi 30s, **Khi** dừng ghi, **Thì** âm thanh được phiên âm thành văn bản trong ô nhập trong 5s
- **Cho** phiên âm thất bại, **Khi** có lỗi, **Thì** người dùng có thể thử lại hoặc ghi lại
- **Cho** nhận phản hồi AI, **Khi** người dùng click phát âm thanh, **Thì** TTS chuyển văn bản thành giọng nói và phát
- **Cho** TTS đang phát, **Khi** người dùng đổi tốc độ sang 1.5x, **Thì** tốc độ phát âm thanh điều chỉnh ngay

**File Upload:**

**English:**
- **Given** user drags PDF file, **When** drops into input, **Then** file uploads to S3 and progress bar shows
- **Given** PDF uploaded, **When** processing completes, **Then** extracted text included in message context
- **Given** user uploads image, **When** message sent, **Then** thumbnail displays in message bubble
- **Given** project member, **When** views message with file, **Then** can download file via button
- **Given** upload fails, **When** error occurs, **Then** error message shows with retry option

**Tiếng Việt:**
- **Cho** người dùng kéo file PDF, **Khi** thả vào ô nhập, **Thì** file upload lên S3 và thanh tiến trình hiển thị
- **Cho** PDF đã upload, **Khi** xử lý hoàn thành, **Thì** văn bản trích xuất được đưa vào ngữ cảnh tin nhắn
- **Cho** người dùng upload hình ảnh, **Khi** tin nhắn được gửi, **Thì** thumbnail hiển thị trong bong bóng tin nhắn
- **Cho** thành viên dự án, **Khi** xem tin nhắn có file, **Thì** có thể tải file qua nút
- **Cho** upload thất bại, **Khi** có lỗi, **Thì** thông báo lỗi hiển thị với tùy chọn thử lại

---

## Summary / Tóm Tắt

**This document covered / Tài liệu này đã trình bày:**

| Feature / Tính năng | Priority / Ưu tiên | User Stories | Status / Trạng thái |
|---------------------|-------------------|--------------|---------------------|
| 1. User Authentication / Xác thực | High / Cao | US-001 | ✅ Detailed / Chi tiết |
| 2. Project Management / Quản lý dự án | High / Cao | US-005 | ✅ Detailed / Chi tiết |
| 3. Conversation Threading / Thread | High / Cao | US-009 | ✅ Detailed / Chi tiết |
| 4. Multi-Modal Chat (Text) / Chat văn bản | High / Cao | US-002 | ✅ Detailed / Chi tiết |
| 5. Voice & File Upload / Giọng nói & File | High / Cao | US-003, US-004 | ✅ Detailed / Chi tiết |

---

## Next Document / Tài Liệu Tiếp Theo

**Continue to / Tiếp tục với:**
- **[Part 3: Functional Requirements (Features 6-9)](02-SRS-Part3-Functional-6to9.md)**
  - Agent Management / Quản lý Agent
  - Self-Hosted Agents / Agent tự quản
  - ML Training / Huấn luyện ML
  - Billing & Notifications / Thanh toán & Thông báo

---

*End of SRS Part 2 / Kết thúc SRS Phần 2*
# Software Requirements Specification (SRS) - Part 3
# Đặc Tả Yêu Cầu Phần Mềm - Phần 3

## Functional Requirements: Features 6-9
## Yêu Cầu Chức Năng: Tính Năng 6-9

**Document Information / Thông Tin Tài Liệu**
- **Version / Phiên bản:** 1.0.0
- **Last Updated / Cập nhật:** October 15, 2025
- **Status / Trạng thái:** ✅ Approved / Đã phê duyệt
- **Previous / Trước:** [Part 2 - Features 1-5](02-SRS-Part2-Functional-1to5.md)
- **Next / Tiếp:** [Part 4 - Non-Functional Requirements](02-SRS-Part4-Non-Functional.md)

---

## Table of Contents / Mục Lục

- [3.6 Feature 6: Agent Management](#36-feature-6-agent-management--quản-lý-agent)
- [3.7 Feature 7: Self-Hosted Agent Deployment](#37-feature-7-self-hosted-agent-deployment--triển-khai-agent-tự-quản)
- [3.8 Feature 8: ML Model Training](#38-feature-8-ml-model-training--huấn-luyện-mô-hình-ml)
- [3.9 Feature 9: Billing & Notifications](#39-feature-9-billing--notifications--thanh-toán--thông-báo)

---

## 3.6 Feature 6: Agent Management / Quản Lý Agent

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-006  
**Related Milestone / Milestone liên quan:** M9

### 3.6.1 Description / Mô Tả

**English:**  
Admin users manage AI agents through CRUD operations. Agents can be external (API-based like OpenAI, Gemini) or self-hosted (Docker containers). Configuration includes API keys, endpoints, version tracking, and health monitoring.

**Tiếng Việt:**  
Người dùng quản trị quản lý AI agent qua các thao tác CRUD. Agent có thể là bên ngoài (dựa trên API như OpenAI, Gemini) hoặc tự quản (Docker container). Cấu hình bao gồm API key, endpoint, theo dõi phiên bản và giám sát sức khỏe.

---

### 3.6.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.6.1: Add Agent (External) / Thêm Agent Bên Ngoài

**English:**
- Admin can add new external agent with required fields:
  - Name (3-50 chars, unique)
  - Icon (image upload, max 1MB, auto-resize to 128×128px)
  - Description (max 500 chars)
  - Type: "external"
  - API endpoint URL (must be HTTPS)
  - API key (encrypted at rest with AES-256)
  - Model name/version (e.g., "gpt-4", "gemini-pro")
  - Cost per 1K tokens (decimal, for billing)
- System validates endpoint with test request (timeout 10s)
- Validation checks: endpoint reachable, returns valid JSON, API key works
- Agent status initially set to "pending" until validation passes

**Tiếng Việt:**
- Admin có thể thêm agent bên ngoài mới với các trường bắt buộc:
  - Tên (3-50 ký tự, duy nhất)
  - Icon (upload ảnh, max 1MB, tự động resize 128×128px)
  - Mô tả (max 500 ký tự)
  - Loại: "external" (bên ngoài)
  - URL endpoint API (phải HTTPS)
  - API key (mã hóa AES-256 khi lưu)
  - Tên/phiên bản model (vd: "gpt-4", "gemini-pro")
  - Chi phí mỗi 1K tokens (số thập phân, cho thanh toán)
- Hệ thống kiểm tra endpoint với request thử (timeout 10s)
- Kiểm tra: endpoint có thể truy cập, trả về JSON hợp lệ, API key hoạt động
- Trạng thái agent ban đầu là "pending" cho đến khi kiểm tra thành công

#### FR-3.6.2: Add Agent (Self-Hosted) / Thêm Agent Tự Quản

**English:**
- Admin adds self-hosted agent with:
  - Name, icon, description (same as external)
  - Type: "self-hosted"
  - Docker image URL OR upload Dockerfile (max 10MB)
  - Resource allocation: CPU limit (0.5-4 cores), memory limit (512MB-8GB)
  - Health check endpoint (default: /health)
  - Port (default: 8080)
- System validates Docker image:
  - Has required labels: name, version, entrypoint
  - Size <2GB (compressed)
  - Scanned for vulnerabilities (Trivy/Snyk)
- Agent deployed to Kubernetes namespace "agents"
- Initial replica count: 1 (auto-scales based on load)

**Tiếng Việt:**
- Admin thêm agent tự quản với:
  - Tên, icon, mô tả (giống agent bên ngoài)
  - Loại: "self-hosted" (tự quản)
  - URL Docker image HOẶC upload Dockerfile (max 10MB)
  - Phân bổ tài nguyên: giới hạn CPU (0.5-4 cores), RAM (512MB-8GB)
  - Endpoint kiểm tra sức khỏe (mặc định: /health)
  - Cổng (mặc định: 8080)
- Hệ thống kiểm tra Docker image:
  - Có nhãn bắt buộc: name, version, entrypoint
  - Kích thước <2GB (nén)
  - Quét lỗ hổng bảo mật (Trivy/Snyk)
- Agent triển khai lên Kubernetes namespace "agents"
- Số replica ban đầu: 1 (tự động scale theo tải)

#### FR-3.6.3: Edit Agent / Chỉnh Sửa Agent

**English:**
- Admin can update: name, icon, description, API endpoint, API key (external only), cost per 1K tokens
- Updating API key requires re-encryption
- Endpoint changes trigger revalidation
- Version changes logged in agent_version_history table with timestamp
- Cannot change agent type (external ↔ self-hosted) - must delete and recreate
- Edit operations logged for audit trail

**Tiếng Việt:**
- Admin có thể cập nhật: tên, icon, mô tả, endpoint API, API key (chỉ bên ngoài), chi phí/1K tokens
- Cập nhật API key yêu cầu mã hóa lại
- Thay đổi endpoint kích hoạt kiểm tra lại
- Thay đổi phiên bản được ghi log trong bảng agent_version_history với timestamp
- Không thể đổi loại agent (external ↔ self-hosted) - phải xóa và tạo lại
- Thao tác chỉnh sửa được ghi log để kiểm toán

#### FR-3.6.4: Delete Agent / Xóa Agent

**English:**
- Admin can soft-delete agents (active=false)
- Deleted agents hidden from user selection dropdown
- Existing conversations/messages retain agent metadata (agent_id, name, version)
- Soft-deleted agents recoverable within 30 days
- After 30 days: hard delete (permanent)
- For self-hosted: Kubernetes deployment scaled to 0 (not deleted) for 30 days
- Deletion requires confirmation: "Type agent name to confirm"

**Tiếng Việt:**
- Admin có thể xóa mềm agent (active=false)
- Agent đã xóa ẩn khỏi dropdown chọn agent của người dùng
- Hội thoại/tin nhắn hiện có giữ metadata agent (agent_id, tên, phiên bản)
- Agent xóa mềm có thể khôi phục trong 30 ngày
- Sau 30 ngày: xóa cứng (vĩnh viễn)
- Với self-hosted: Kubernetes deployment scale về 0 (không xóa) trong 30 ngày
- Xóa yêu cầu xác nhận: "Gõ tên agent để xác nhận"

#### FR-3.6.5: Test Connection / Kiểm Tra Kết Nối

**English:**
- Admin can test agent connectivity via "Test" button
- System sends test message: "Hello, this is a test. Please respond with 'OK'."
- Response displayed in modal:
  - Success: "✓ Connection successful. Latency: 245ms. Response: [agent response]"
  - Error: "✗ Connection failed. Error: [error message]"
- Test includes: endpoint reachability, API key validation, response format check
- Test results logged (success/failure, timestamp, latency)
- Timeout: 10 seconds

**Tiếng Việt:**
- Admin có thể kiểm tra kết nối agent qua nút "Test"
- Hệ thống gửi tin nhắn thử: "Hello, this is a test. Please respond with 'OK'."
- Phản hồi hiển thị trong modal:
  - Thành công: "✓ Kết nối thành công. Độ trễ: 245ms. Phản hồi: [phản hồi agent]"
  - Lỗi: "✗ Kết nối thất bại. Lỗi: [thông báo lỗi]"
- Kiểm tra bao gồm: endpoint có thể truy cập, API key hợp lệ, định dạng phản hồi đúng
- Kết quả kiểm tra được ghi log (thành công/thất bại, timestamp, độ trễ)
- Timeout: 10 giây

#### FR-3.6.6: Agent Status Monitoring / Giám Sát Trạng Thái Agent

**English:**
- System checks agent health every 5 minutes (cron job)
- Health check methods:
  - External: HTTP GET to endpoint with timeout 5s
  - Self-hosted: Kubernetes readiness probe (HTTP GET /health)
- Agent status values:
  - **Online** (green): Last health check successful
  - **Offline** (red): Last 3 consecutive health checks failed
  - **Degraded** (yellow): Intermittent failures (1-2 of last 3 failed)
  - **Pending** (gray): New agent, not yet validated
- Status displayed in:
  - Admin panel (agent list with status badges)
  - User agent selection dropdown (with status indicator)
- Offline agents trigger alert to admin (email + in-app notification)

**Tiếng Việt:**
- Hệ thống kiểm tra sức khỏe agent mỗi 5 phút (cron job)
- Phương thức kiểm tra:
  - Bên ngoài: HTTP GET đến endpoint với timeout 5s
  - Tự quản: Kubernetes readiness probe (HTTP GET /health)
- Giá trị trạng thái agent:
  - **Online** (xanh): Kiểm tra cuối thành công
  - **Offline** (đỏ): 3 lần kiểm tra liên tiếp thất bại
  - **Degraded** (vàng): Thất bại không ổn định (1-2 trong 3 lần cuối thất bại)
  - **Pending** (xám): Agent mới, chưa được kiểm tra
- Trạng thái hiển thị ở:
  - Bảng quản trị (danh sách agent với huy hiệu trạng thái)
  - Dropdown chọn agent của người dùng (với chỉ báo trạng thái)
- Agent offline kích hoạt cảnh báo cho admin (email + thông báo trong app)

---

### 3.6.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** admin adds external agent with valid API key, **When** validation runs, **Then** agent status set to "online"
- **Given** admin adds external agent with invalid endpoint, **When** validation runs, **Then** error message displayed and agent not saved
- **Given** admin clicks "Test" on agent, **When** test completes, **Then** result modal shows success/failure with latency
- **Given** agent health check fails 3 times, **When** status updated, **Then** agent marked "offline" and admin notified
- **Given** admin soft-deletes agent, **When** user views agent dropdown, **Then** deleted agent not shown

**Tiếng Việt:**
- **Cho** admin thêm agent bên ngoài với API key hợp lệ, **Khi** kiểm tra chạy, **Thì** trạng thái agent đặt "online"
- **Cho** admin thêm agent bên ngoài với endpoint không hợp lệ, **Khi** kiểm tra chạy, **Thì** thông báo lỗi hiển thị và agent không lưu
- **Cho** admin click "Test" trên agent, **Khi** test hoàn thành, **Thì** modal kết quả hiển thị thành công/thất bại với độ trễ
- **Cho** kiểm tra sức khỏe agent thất bại 3 lần, **Khi** cập nhật trạng thái, **Thì** agent đánh dấu "offline" và admin nhận thông báo
- **Cho** admin xóa mềm agent, **Khi** người dùng xem dropdown agent, **Thì** agent đã xóa không hiển thị

---

## 3.7 Feature 7: Self-Hosted Agent Deployment / Triển Khai Agent Tự Quản

**Priority / Ưu tiên:** Medium / Trung bình  
**User Stories:** US-008  
**Related Milestone:** M12

### 3.7.1 Description / Mô Tả

**English:**  
Developers deploy custom AI agents as Docker containers. System manages container lifecycle (start, stop, restart) and monitors health. Deployed agents exposed via internal service URL accessible to chat orchestrator.

**Tiếng Việt:**  
Lập trình viên triển khai agent AI tùy chỉnh dưới dạng Docker container. Hệ thống quản lý vòng đời container (khởi động, dừng, khởi động lại) và giám sát sức khỏe. Agent đã triển khai được expose qua URL service nội bộ có thể truy cập từ chat orchestrator.

---

### 3.7.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.7.1: Upload Docker Image / Upload Docker Image

**English:**
- Developers upload Docker image file OR provide Docker registry URL
- Upload methods:
  - Direct file upload (max 2GB)
  - Pull from Docker Hub / private registry (requires credentials)
- Image validation:
  - Has required Docker labels: `name`, `version`, `entrypoint`
  - Exposes port (default 8080)
  - Has health check endpoint
  - Size <2GB (compressed)
- Security scan: Trivy/Snyk checks for vulnerabilities (critical/high must be resolved)
- Image tagged with format: `chatai-agents/{agent-name}:{version}`

**Tiếng Việt:**
- Lập trình viên upload file Docker image HOẶC cung cấp URL Docker registry
- Phương thức upload:
  - Upload file trực tiếp (max 2GB)
  - Pull từ Docker Hub / registry riêng (yêu cầu credentials)
- Kiểm tra image:
  - Có nhãn Docker bắt buộc: `name`, `version`, `entrypoint`
  - Expose cổng (mặc định 8080)
  - Có endpoint kiểm tra sức khỏe
  - Kích thước <2GB (nén)
- Quét bảo mật: Trivy/Snyk kiểm tra lỗ hổng (critical/high phải giải quyết)
- Image được tag theo định dạng: `chatai-agents/{tên-agent}:{phiên-bản}`

#### FR-3.7.2: Deploy Container / Triển Khai Container

**English:**
- System deploys image to Kubernetes cluster as Deployment
- Deployment configuration:
  - Namespace: `agents`
  - Replica count: 1 (initial), auto-scales 1-5 based on CPU usage (>70%)
  - Resource limits: CPU (configurable, default 1 core), Memory (configurable, default 2GB)
  - Liveness probe: HTTP GET /health every 30s
  - Readiness probe: HTTP GET /health (initial delay 10s)
  - Environment variables: injected from ConfigMap (API keys, config)
- Service created: ClusterIP type, exposes port 8080
- Service URL format: `http://{agent-name}.agents.svc.cluster.local:8080`
- System registers agent metadata in database: endpoint URL, health check path, deployment status

**Tiếng Việt:**
- Hệ thống triển khai image lên Kubernetes cluster dưới dạng Deployment
- Cấu hình Deployment:
  - Namespace: `agents`
  - Số replica: 1 (ban đầu), tự động scale 1-5 dựa trên CPU (>70%)
  - Giới hạn tài nguyên: CPU (cấu hình được, mặc định 1 core), RAM (cấu hình được, mặc định 2GB)
  - Liveness probe: HTTP GET /health mỗi 30s
  - Readiness probe: HTTP GET /health (delay ban đầu 10s)
  - Biến môi trường: inject từ ConfigMap (API keys, cấu hình)
- Service được tạo: loại ClusterIP, expose cổng 8080
- Định dạng URL service: `http://{tên-agent}.agents.svc.cluster.local:8080`
- Hệ thống đăng ký metadata agent vào database: URL endpoint, đường dẫn health check, trạng thái triển khai

#### FR-3.7.3: Container Management / Quản Lý Container

**English:**
- Admin can start, stop, restart containers via UI (buttons in agent details page)
- Operations:
  - **Start**: Scale replicas from 0 to 1
  - **Stop**: Scale replicas to 0 (preserves deployment)
  - **Restart**: Delete pods, let Kubernetes recreate
  - **Update**: Deploy new image version (rolling update, zero downtime)
- Operations logged: timestamp, admin user, action, result
- Operation status shown: "In Progress" → "Success" / "Failed"
- Kubernetes API calls use service account with RBAC permissions

**Tiếng Việt:**
- Admin có thể khởi động, dừng, khởi động lại container qua UI (nút trong trang chi tiết agent)
- Thao tác:
  - **Khởi động**: Scale replica từ 0 lên 1
  - **Dừng**: Scale replica về 0 (giữ deployment)
  - **Khởi động lại**: Xóa pod, để Kubernetes tạo lại
  - **Cập nhật**: Triển khai phiên bản image mới (rolling update, không downtime)
- Thao tác được ghi log: timestamp, admin user, hành động, kết quả
- Trạng thái thao tác hiển thị: "Đang xử lý" → "Thành công" / "Thất bại"
- Gọi Kubernetes API dùng service account với quyền RBAC

#### FR-3.7.4: Health Check / Kiểm Tra Sức Khỏe

**English:**
- System polls container health endpoint every 30 seconds
- Health check endpoint: HTTP GET /{agent}/health (configurable)
- Expected response: HTTP 200 with JSON `{"status": "healthy"}`
- If 3 consecutive failures:
  - Container marked Offline
  - Alert sent to admin
  - Auto-restart triggered (Kubernetes restarts unhealthy pods automatically)
- Health check logs stored (last 100 checks per agent)
- Health metrics: uptime percentage (last 24h, 7d, 30d)

**Tiếng Việt:**
- Hệ thống poll endpoint sức khỏe container mỗi 30 giây
- Endpoint kiểm tra: HTTP GET /{agent}/health (cấu hình được)
- Phản hồi mong đợi: HTTP 200 với JSON `{"status": "healthy"}`
- Nếu thất bại 3 lần liên tiếp:
  - Container đánh dấu Offline
  - Gửi cảnh báo cho admin
  - Kích hoạt khởi động lại tự động (Kubernetes tự động restart pod không khỏe)
- Log kiểm tra sức khỏe được lưu (100 lần kiểm tra cuối mỗi agent)
- Chỉ số sức khỏe: phần trăm uptime (24h, 7 ngày, 30 ngày qua)

#### FR-3.7.5: Resource Allocation / Phân Bổ Tài Nguyên

**English:**
- Admin specifies CPU/memory limits per agent container
- Limits enforced via Kubernetes resource quotas
- Default limits: 1 CPU core, 2GB RAM
- Range: CPU 0.5-4 cores, RAM 512MB-8GB
- Exceeded limits cause pod eviction (OOMKilled for memory)
- Resource usage displayed in admin panel:
  - Current: CPU %, RAM MB
  - Average (24h): CPU %, RAM MB
  - Chart: usage over time (last 7 days)

**Tiếng Việt:**
- Admin chỉ định giới hạn CPU/RAM mỗi agent container
- Giới hạn thực thi qua Kubernetes resource quotas
- Giới hạn mặc định: 1 CPU core, 2GB RAM
- Phạm vi: CPU 0.5-4 core, RAM 512MB-8GB
- Vượt giới hạn gây pod bị evict (OOMKilled cho RAM)
- Sử dụng tài nguyên hiển thị trong bảng admin:
  - Hiện tại: CPU %, RAM MB
  - Trung bình (24h): CPU %, RAM MB
  - Biểu đồ: sử dụng theo thời gian (7 ngày qua)

---

### 3.7.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** developer uploads Docker image <2GB, **When** validation passes, **Then** image stored in registry and ready for deployment
- **Given** admin clicks "Deploy", **When** deployment completes, **Then** container running and health check returns 200
- **Given** container running, **When** health check fails 3 times, **Then** Kubernetes restarts pod automatically
- **Given** admin clicks "Stop", **When** operation completes, **Then** replicas scaled to 0 and agent status "offline"
- **Given** container exceeds memory limit, **When** OOM occurs, **Then** pod restarted and alert sent to admin

**Tiếng Việt:**
- **Cho** lập trình viên upload Docker image <2GB, **Khi** kiểm tra pass, **Thì** image lưu vào registry và sẵn sàng triển khai
- **Cho** admin click "Triển khai", **Khi** triển khai hoàn thành, **Thì** container chạy và health check trả về 200
- **Cho** container đang chạy, **Khi** health check thất bại 3 lần, **Thì** Kubernetes tự động restart pod
- **Cho** admin click "Dừng", **Khi** thao tác hoàn thành, **Thì** replica scale về 0 và trạng thái agent "offline"
- **Cho** container vượt giới hạn RAM, **Khi** OOM xảy ra, **Thì** pod restart và gửi cảnh báo cho admin

---

## 3.8 Feature 8: ML Model Training / Huấn Luyện Mô Hình ML

**Priority / Ưu tiên:** Low / Thấp  
**User Stories:** US-010  
**Related Milestone:** M13

### 3.8.1 Description / Mô Tả

**English:**  
ML Engineers train custom models using Hugging Face Transformers, then deploy trained models as self-hosted agents. System provides UI for dataset upload, training configuration, progress monitoring, and automated deployment.

**Tiếng Việt:**  
ML Engineer huấn luyện mô hình tùy chỉnh dùng Hugging Face Transformers, sau đó triển khai mô hình đã huấn luyện dưới dạng agent tự quản. Hệ thống cung cấp UI để upload dataset, cấu hình huấn luyện, giám sát tiến trình và triển khai tự động.

---

### 3.8.2 Functional Requirements / Yêu Cầu Chức Năng

#### FR-3.8.1: Upload Training Dataset / Upload Dataset Huấn Luyện

**English:**
- Engineers upload dataset files: CSV, JSON, TXT, JSONL
- Max file size: 500MB per file
- System validates format and previews first 10 rows/entries
- Required format: text pairs for fine-tuning (input, output) or single column for pre-training
- Example CSV format:
  ```
  input,output
  "What is AI?","Artificial Intelligence is..."
  ```
- System stores dataset in S3 with unique dataset_id
- Dataset metadata: filename, size, row count, upload timestamp, uploader user_id

**Tiếng Việt:**
- ML Engineer upload file dataset: CSV, JSON, TXT, JSONL
- Kích thước file tối đa: 500MB mỗi file
- Hệ thống kiểm tra định dạng và xem trước 10 dòng/mục đầu
- Định dạng yêu cầu: cặp văn bản để fine-tuning (input, output) hoặc cột đơn cho pre-training
- Ví dụ định dạng CSV:
  ```
  input,output
  "AI là gì?","Trí tuệ nhân tạo là..."
  ```
- Hệ thống lưu dataset vào S3 với dataset_id duy nhất
- Metadata dataset: tên file, kích thước, số dòng, thời gian upload, user_id người upload

#### FR-3.8.2: Select Base Model / Chọn Mô Hình Gốc

**English:**
- Engineers select pre-trained model from Hugging Face Hub
- Popular models pre-loaded in dropdown:
  - distilbert-base-uncased (English, lightweight)
  - gpt2 (English, generative)
  - bert-base-multilingual-cased (Multilingual)
  - Custom: enter Hugging Face model ID (e.g., "facebook/opt-1.3b")
- System downloads model to training environment
- Model info displayed: size, parameters, language, license
- Download progress shown (models can be large, 500MB-5GB)

**Tiếng Việt:**
- ML Engineer chọn mô hình pre-trained từ Hugging Face Hub
- Mô hình phổ biến được load sẵn trong dropdown:
  - distilbert-base-uncased (Tiếng Anh, nhẹ)
  - gpt2 (Tiếng Anh, generative)
  - bert-base-multilingual-cased (Đa ngôn ngữ)
  - Tùy chỉnh: nhập Hugging Face model ID (vd: "facebook/opt-1.3b")
- Hệ thống tải model về môi trường huấn luyện
- Thông tin model hiển thị: kích thước, tham số, ngôn ngữ, license
- Hiển thị tiến trình tải (model có thể lớn, 500MB-5GB)

#### FR-3.8.3: Configure Training Parameters / Cấu Hình Tham Số Huấn Luyện

**English:**
- Engineers specify training hyperparameters:
  - **Epochs**: 1-100 (default: 3) - number of full passes through dataset
  - **Batch size**: 4-64 (default: 16) - samples per training step
  - **Learning rate**: 1e-6 to 1e-3 (default: 5e-5) - step size for optimization
  - **Optimizer**: Adam, AdamW, SGD (default: AdamW)
  - **Max sequence length**: 128-512 tokens (default: 256)
- System validates parameters (e.g., batch size must fit in GPU memory)
- Optional advanced settings (collapsible):
  - Warmup steps, gradient accumulation, weight decay
- Estimated training time displayed: "~2 hours with GPU, ~12 hours CPU-only"

**Tiếng Việt:**
- ML Engineer chỉ định hyperparameter huấn luyện:
  - **Epochs**: 1-100 (mặc định: 3) - số lần đi qua toàn bộ dataset
  - **Batch size**: 4-64 (mặc định: 16) - số mẫu mỗi bước huấn luyện
  - **Learning rate**: 1e-6 đến 1e-3 (mặc định: 5e-5) - kích thước bước tối ưu
  - **Optimizer**: Adam, AdamW, SGD (mặc định: AdamW)
  - **Max sequence length**: 128-512 token (mặc định: 256)
- Hệ thống kiểm tra tham số (vd: batch size phải vừa GPU memory)
- Cài đặt nâng cao tùy chọn (có thể thu gọn):
  - Warmup steps, gradient accumulation, weight decay
- Thời gian huấn luyện ước tính hiển thị: "~2 giờ với GPU, ~12 giờ chỉ CPU"

#### FR-3.8.4: Start Training / Bắt Đầu Huấn Luyện

**English:**
- System submits training job to ML service (Python/FastAPI backend)
- Training environment: Docker container with PyTorch, Transformers, CUDA (if GPU)
- GPU preference: auto-detects GPU availability, falls back to CPU
- Training runs asynchronously (non-blocking)
- Real-time progress updates via WebSocket:
  - Current epoch (e.g., "Epoch 2/3")
  - Training loss (decreasing over time)
  - Validation loss (if validation set provided)
  - Estimated time remaining
  - Progress bar (0-100%)
- Training logs displayed in scrollable terminal-style window
- User can pause/resume/cancel training
- Upon completion: model saved to S3 with unique model_id

**Tiếng Việt:**
- Hệ thống gửi job huấn luyện đến dịch vụ ML (backend Python/FastAPI)
- Môi trường huấn luyện: Docker container với PyTorch, Transformers, CUDA (nếu có GPU)
- Ưu tiên GPU: tự động phát hiện GPU, fallback về CPU
- Huấn luyện chạy bất đồng bộ (không chặn)
- Cập nhật tiến trình thời gian thực qua WebSocket:
  - Epoch hiện tại (vd: "Epoch 2/3")
  - Training loss (giảm dần theo thời gian)
  - Validation loss (nếu có validation set)
  - Thời gian còn lại ước tính
  - Thanh tiến trình (0-100%)
- Log huấn luyện hiển thị trong cửa sổ kiểu terminal có thể cuộn
- Người dùng có thể tạm dừng/tiếp tục/hủy huấn luyện
- Khi hoàn thành: mô hình lưu vào S3 với model_id duy nhất

#### FR-3.8.5: Deploy Trained Model / Triển Khai Mô Hình Đã Huấn Luyện

**English:**
- Upon training completion, "Deploy" button enabled
- System builds Docker image with trained model:
  - Base image: `python:3.12-slim`
  - Installs: `transformers`, `torch`, `fastapi`
  - Copies model files from S3
  - Entrypoint: FastAPI server serving model inference endpoint
- Image tagged: `chatai-agents/trained-{model-name}:{timestamp}`
- Deployed to Kubernetes as self-hosted agent (see FR-3.7.2)
- Agent registered automatically with metadata:
  - Name: "Trained-{base-model}-{date}"
  - Type: "self-hosted"
  - Endpoint: auto-generated service URL
- User can test deployed model immediately

**Tiếng Việt:**
- Khi huấn luyện hoàn thành, nút "Triển khai" được bật
- Hệ thống build Docker image với mô hình đã huấn luyện:
  - Base image: `python:3.12-slim`
  - Cài đặt: `transformers`, `torch`, `fastapi`
  - Copy file mô hình từ S3
  - Entrypoint: FastAPI server phục vụ endpoint inference mô hình
- Image được tag: `chatai-agents/trained-{tên-model}:{timestamp}`
- Triển khai lên Kubernetes dưới dạng agent tự quản (xem FR-3.7.2)
- Agent tự động đăng ký với metadata:
  - Tên: "Trained-{mô-hình-gốc}-{ngày}"
  - Loại: "self-hosted"
  - Endpoint: URL service tự động tạo
- Người dùng có thể test mô hình đã triển khai ngay

#### FR-3.8.6: AI-Assisted Configuration (Optional) / Cấu Hình Hỗ Trợ AI

**English:**
- System can suggest optimal training parameters based on dataset
- "Suggest Parameters" button analyzes:
  - Dataset size (row count)
  - Average text length
  - Language (detected from samples)
- Uses GPT-4 to recommend:
  - Appropriate base model
  - Optimal epochs, batch size, learning rate
  - Training time estimate
- Recommendations displayed with explanations:
  - "Recommended: 5 epochs - Your dataset is small (1000 samples), more epochs help convergence"
- User can accept suggestions (auto-fill form) or customize

**Tiếng Việt:**
- Hệ thống có thể gợi ý tham số huấn luyện tối ưu dựa trên dataset
- Nút "Gợi ý tham số" phân tích:
  - Kích thước dataset (số dòng)
  - Độ dài văn bản trung bình
  - Ngôn ngữ (phát hiện từ mẫu)
- Dùng GPT-4 để khuyến nghị:
  - Mô hình gốc phù hợp
  - Epochs, batch size, learning rate tối ưu
  - Ước tính thời gian huấn luyện
- Khuyến nghị hiển thị với giải thích:
  - "Khuyến nghị: 5 epochs - Dataset của bạn nhỏ (1000 mẫu), nhiều epoch hơn giúp hội tụ"
- Người dùng có thể chấp nhận gợi ý (tự động điền form) hoặc tùy chỉnh

---

### 3.8.3 Acceptance Criteria / Tiêu Chí Chấp Nhận

**English:**
- **Given** engineer uploads valid CSV dataset, **When** validation completes, **Then** preview shows first 10 rows
- **Given** engineer selects base model "distilbert", **When** model downloads, **Then** progress bar updates and model info displayed
- **Given** engineer starts training, **When** training in progress, **Then** WebSocket sends real-time loss updates every 10 seconds
- **Given** training completes successfully, **When** user clicks "Deploy", **Then** Docker image built and agent deployed to Kubernetes
- **Given** trained model deployed, **When** user tests agent, **Then** agent responds with model inference

**Tiếng Việt:**
- **Cho** engineer upload CSV dataset hợp lệ, **Khi** kiểm tra hoàn thành, **Thì** xem trước hiển thị 10 dòng đầu
- **Cho** engineer chọn mô hình gốc "distilbert", **Khi** mô hình tải xuống, **Thì** thanh tiến trình cập nhật và thông tin model hiển thị
- **Cho** engineer bắt đầu huấn luyện, **Khi** đang huấn luyện, **Thì** WebSocket gửi cập nhật loss thời gian thực mỗi 10 giây
- **Cho** huấn luyện hoàn thành thành công, **Khi** người dùng click "Triển khai", **Thì** Docker image được build và agent triển khai lên Kubernetes
- **Cho** mô hình đã huấn luyện được triển khai, **Khi** người dùng test agent, **Thì** agent phản hồi với inference của mô hình

---

## 3.9 Feature 9: Billing & Notifications / Thanh Toán & Thông Báo

**Priority / Ưu tiên:** High / Cao  
**User Stories:** US-007 (Billing), FR-3.9 (Notifications)  
**Related Milestone:** M7 (Billing), M6.5 (Notifications)

### 3.9.1 Description / Mô Tả

**English:**  
System logs token usage for every AI message and calculates cost. Admins generate usage reports with filters. Users receive real-time notifications for messages, invites, and system events via WebSocket and email.

**Tiếng Việt:**  
Hệ thống ghi log sử dụng token cho mọi tin nhắn AI và tính chi phí. Admin tạo báo cáo sử dụng với bộ lọc. Người dùng nhận thông báo thời gian thực cho tin nhắn, lời mời và sự kiện hệ thống qua WebSocket và email.

---

### 3.9.2 Functional Requirements - Billing / Yêu Cầu Thanh Toán

#### FR-3.9.1: Token Usage Logging / Ghi Log Sử Dụng Token

**English:**
- After each AI response, system logs to `billing_log` table:
  - `user_id`: User who sent message
  - `project_id`: Project containing thread
  - `conversation_id`: Conversation (same as project for now)
  - `agent_id`: Agent that responded
  - `thread_id`: Thread containing message
  - `tokens_used`: From agent API response (input + output tokens)
  - `cost`: Calculated as (tokens_used / 1000) × agent.cost_per_1k_tokens
  - `timestamp`: Message timestamp
  - `message_id`: Reference to message
- Logging is asynchronous (does not block chat response)
- Retry logic: 3 attempts with exponential backoff if logging fails
- Failed logs queued for batch insert (every 5 minutes)

**Tiếng Việt:**
- Sau mỗi phản hồi AI, hệ thống ghi log vào bảng `billing_log`:
  - `user_id`: Người dùng gửi tin nhắn
  - `project_id`: Dự án chứa thread
  - `conversation_id`: Hội thoại (giống project hiện tại)
  - `agent_id`: Agent đã phản hồi
  - `thread_id`: Thread chứa tin nhắn
  - `tokens_used`: Từ phản hồi API agent (token đầu vào + đầu ra)
  - `cost`: Tính theo (tokens_used / 1000) × agent.cost_per_1k_tokens
  - `timestamp`: Thời gian tin nhắn
  - `message_id`: Tham chiếu đến tin nhắn
- Ghi log bất đồng bộ (không chặn phản hồi chat)
- Logic thử lại: 3 lần với exponential backoff nếu log thất bại
- Log thất bại xếp hàng để insert hàng loạt (mỗi 5 phút)

#### FR-3.9.2: Cost Calculation / Tính Toán Chi Phí

**English:**
- Each agent has `cost_per_1k_tokens` field (USD, configurable by admin)
- Formula: `cost = (tokens_used / 1000) × cost_per_1k_tokens`
- Example: 1,500 tokens with $0.002/1K = $0.003
- Precision: 6 decimal places
- Costs aggregated by: user, project, agent, conversation, date
- Exchange rates: USD only (MVP), multi-currency in future

**Tiếng Việt:**
- Mỗi agent có trường `cost_per_1k_tokens` (USD, admin cấu hình)
- Công thức: `cost = (tokens_used / 1000) × cost_per_1k_tokens`
- Ví dụ: 1,500 token với $0.002/1K = $0.003
- Độ chính xác: 6 chữ số thập phân
- Chi phí tổng hợp theo: người dùng, dự án, agent, hội thoại, ngày
- Tỷ giá: chỉ USD (MVP), đa tiền tệ trong tương lai

#### FR-3.9.3: Usage Report Generation / Tạo Báo Cáo Sử Dụng

**English:**
- Admin/Project Owner can generate reports via UI
- Filters:
  - **Date range**: date_from, date_to (max 1 year range)
  - **Project**: specific project_id or "All"
  - **User**: specific user_id or "All"
  - **Agent**: specific agent_id or "All"
  - **Conversation/Thread**: specific thread_id or "All"
- Report includes:
  - **Summary**: Total tokens, total cost, message count, date range
  - **Breakdown by user**: user name, tokens, cost, % of total
  - **Breakdown by project**: project name, tokens, cost
  - **Breakdown by agent**: agent name, tokens, cost
  - **Breakdown by conversation**: thread name, tokens, cost
  - **Top 10 users** by usage
  - **Chart**: Usage over time (daily/weekly/monthly granularity)
- Report generated in <5 seconds for typical datasets (<100K rows)
- Large reports (>100K rows) generated asynchronously with email notification

**Tiếng Việt:**
- Admin/Chủ dự án tạo báo cáo qua UI
- Bộ lọc:
  - **Khoảng thời gian**: date_from, date_to (tối đa 1 năm)
  - **Dự án**: project_id cụ thể hoặc "Tất cả"
  - **Người dùng**: user_id cụ thể hoặc "Tất cả"
  - **Agent**: agent_id cụ thể hoặc "Tất cả"
  - **Hội thoại/Thread**: thread_id cụ thể hoặc "Tất cả"
- Báo cáo bao gồm:
  - **Tóm tắt**: Tổng token, tổng chi phí, số tin nhắn, khoảng thời gian
  - **Phân tích theo người dùng**: tên, token, chi phí, % tổng
  - **Phân tích theo dự án**: tên dự án, token, chi phí
  - **Phân tích theo agent**: tên agent, token, chi phí
  - **Phân tích theo hội thoại**: tên thread, token, chi phí
  - **Top 10 người dùng** theo mức sử dụng
  - **Biểu đồ**: Sử dụng theo thời gian (chi tiết theo ngày/tuần/tháng)
- Báo cáo tạo trong <5 giây cho dataset thông thường (<100K dòng)
- Báo cáo lớn (>100K dòng) tạo bất đồng bộ với thông báo email

#### FR-3.9.4: Export CSV / Xuất CSV

**English:**
- Reports exportable as CSV file
- CSV columns: `timestamp, user_name, user_email, project_name, thread_name, agent_name, tokens_used, cost_usd, message_id`
- Filename format: `billing-report-{project_name}-{date_from}-{date_to}.csv`
- Max rows per CSV: 100,000 (larger datasets split into multiple files)
- Download button triggers browser download
- CSV uses UTF-8 encoding with BOM (for Excel compatibility)

**Tiếng Việt:**
- Báo cáo có thể xuất file CSV
- Cột CSV: `timestamp, user_name, user_email, project_name, thread_name, agent_name, tokens_used, cost_usd, message_id`
- Định dạng tên file: `billing-report-{tên-dự-án}-{ngày-từ}-{ngày-đến}.csv`
- Số dòng tối đa mỗi CSV: 100,000 (dataset lớn hơn chia nhiều file)
- Nút tải xuống kích hoạt download trình duyệt
- CSV dùng encoding UTF-8 với BOM (tương thích Excel)

#### FR-3.9.5: Real-Time Cost Display / Hiển Thị Chi Phí Thời Gian Thực

**English:**
- UI displays running cost per conversation/project
- Cost counter updates after each AI message
- Display formats:
  - Conversation view: "Cost this thread: $0.045"
  - Project sidebar: "Project cost (30d): $12.34"
  - User profile: "Your usage (30d): $8.90"
- Color coding:
  - Green: <$1
  - Yellow: $1-$10
  - Red: >$10
- Refresh: real-time via WebSocket (on new message)

**Tiếng Việt:**
- UI hiển thị chi phí đang chạy theo hội thoại/dự án
- Bộ đếm chi phí cập nhật sau mỗi tin nhắn AI
- Định dạng hiển thị:
  - View hội thoại: "Chi phí thread này: $0.045"
  - Thanh bên dự án: "Chi phí dự án (30 ngày): $12.34"
  - Hồ sơ người dùng: "Sử dụng của bạn (30 ngày): $8.90"
- Mã màu:
  - Xanh: <$1
  - Vàng: $1-$10
  - Đỏ: >$10
- Làm mới: thời gian thực qua WebSocket (khi có tin nhắn mới)

---

### 3.9.3 Functional Requirements - Notifications / Yêu Cầu Thông Báo

#### FR-3.9.6: WebSocket Connection / Kết Nối WebSocket

**English:**
- Upon login, client establishes WebSocket connection to notification service
- Connection URL: `wss://api.chatai.com/ws/notifications`
- Authentication: JWT token in connection query param `?token={jwt}`
- System assigns user to notification channel (user_id)
- Connection maintained with heartbeat: ping every 30s, pong expected within 5s
- Reconnection logic: exponential backoff (1s, 2s, 4s, 8s, max 30s)

**Tiếng Việt:**
- Khi đăng nhập, client thiết lập kết nối WebSocket đến dịch vụ thông báo
- URL kết nối: `wss://api.chatai.com/ws/notifications`
- Xác thực: JWT token trong query param kết nối `?token={jwt}`
- Hệ thống gán người dùng vào kênh thông báo (user_id)
- Kết nối duy trì với heartbeat: ping mỗi 30s, mong đợi pong trong 5s
- Logic kết nối lại: exponential backoff (1s, 2s, 4s, 8s, tối đa 30s)

#### FR-3.9.7: Notification Types / Loại Thông Báo

**Notification Types / Các loại thông báo:**

| Type / Loại | Trigger / Kích hoạt | Example / Ví dụ |
|-------------|---------------------|-----------------|
| **New Message** / **Tin nhắn mới** | Message sent to thread user is member of / Tin nhắn gửi đến thread người dùng là thành viên | "John replied in 'Project Alpha'" |
| **Project Invite** / **Mời dự án** | User invited to project / Người dùng được mời vào dự án | "You've been invited to 'Marketing Team'" |
| **Mention** / **Nhắc đến** | User @mentioned in message / Người dùng được @mention trong tin nhắn | "@you in 'Budget Discussion'" |
| **Agent Status** / **Trạng thái agent** | Agent goes Offline/Online (if user has active thread) / Agent offline/online (nếu người dùng có thread đang hoạt động) | "GPT-4 is now online" |
| **System Alert** / **Cảnh báo hệ thống** | Maintenance, outages, feature announcements / Bảo trì, sự cố, thông báo tính năng | "Scheduled maintenance at 2am UTC" |

#### FR-3.9.8: Notification Display / Hiển Thị Thông Báo

**English:**
- Notifications appear as toast/banner in UI (top-right corner)
- Display duration: 5 seconds auto-dismiss (or until user clicks)
- Toast includes: icon, title, message, timestamp, action button (e.g., "View")
- Unread notification count displayed in bell icon (header)
- Notification history accessible in dropdown (click bell icon)
- History shows last 50 notifications, grouped by date
- Mark as read: individual or "Mark all as read" button

**Tiếng Việt:**
- Thông báo xuất hiện dưới dạng toast/banner trong UI (góc trên-phải)
- Thời gian hiển thị: tự động đóng sau 5 giây (hoặc đến khi người dùng click)
- Toast bao gồm: icon, tiêu đề, tin nhắn, thời gian, nút hành động (vd: "Xem")
- Số thông báo chưa đọc hiển thị trong icon chuông (header)
- Lịch sử thông báo truy cập trong dropdown (click icon chuông)
- Lịch sử hiển thị 50 thông báo cuối, nhóm theo ngày
- Đánh dấu đã đọc: từng cái hoặc nút "Đánh dấu tất cả đã đọc"

#### FR-3.9.9: Email Notifications / Thông Báo Email

**English:**
- Users can enable/disable email notifications in settings
- Email sent for: project invites, @mentions (configurable per notification type)
- Email includes: notification content, direct link to thread/project, unsubscribe link
- Email template: HTML with company branding
- Send frequency: immediate (no batching for MVP)
- Email provider: SendGrid or AWS SES
- Delivery tracking: open rate, click rate (logged but not shown to user)

**Tiếng Việt:**
- Người dùng bật/tắt thông báo email trong cài đặt
- Email gửi cho: lời mời dự án, @mention (cấu hình theo loại thông báo)
- Email bao gồm: nội dung thông báo, link trực tiếp đến thread/dự án, link hủy đăng ký
- Template email: HTML với thương hiệu công ty
- Tần suất gửi: ngay lập tức (không gộp cho MVP)
- Nhà cung cấp email: SendGrid hoặc AWS SES
- Theo dõi gửi: tỷ lệ mở, tỷ lệ click (ghi log nhưng không hiển thị cho người dùng)

---

### 3.9.4 Acceptance Criteria / Tiêu Chí Chấp Nhận

**Billing / Thanh toán:**

**English:**
- **Given** user sends message to agent, **When** AI responds, **Then** token usage logged to billing_log within 1 second
- **Given** admin generates report for October, **When** report completes, **Then** displays total cost and breakdown by user/agent
- **Given** report generated, **When** admin clicks "Export CSV", **Then** CSV file downloads with correct columns and data
- **Given** user in thread, **When** new message sent, **Then** thread cost counter updates immediately
- **Given** large report (>100K rows), **When** generation starts, **Then** email sent when complete

**Tiếng Việt:**
- **Cho** người dùng gửi tin nhắn cho agent, **Khi** AI phản hồi, **Thì** sử dụng token ghi log vào billing_log trong 1 giây
- **Cho** admin tạo báo cáo tháng 10, **Khi** báo cáo hoàn thành, **Thì** hiển thị tổng chi phí và phân tích theo người dùng/agent
- **Cho** báo cáo đã tạo, **Khi** admin click "Xuất CSV", **Thì** file CSV tải xuống với cột và dữ liệu đúng
- **Cho** người dùng trong thread, **Khi** tin nhắn mới gửi, **Thì** bộ đếm chi phí thread cập nhật ngay
- **Cho** báo cáo lớn (>100K dòng), **Khi** bắt đầu tạo, **Thì** email gửi khi hoàn thành

**Notifications / Thông báo:**

**English:**
- **Given** user A sends message in thread, **When** user B is member, **Then** user B receives real-time WebSocket notification within 1 second
- **Given** user invited to project, **When** invite sent, **Then** user receives notification toast and email
- **Given** notification received, **When** user clicks "View", **Then** navigates to relevant thread/project
- **Given** 3 unread notifications, **When** user views bell icon, **Then** badge shows "3"
- **Given** user clicks "Mark all as read", **When** action completes, **Then** unread count becomes 0

**Tiếng Việt:**
- **Cho** người dùng A gửi tin nhắn trong thread, **Khi** người dùng B là thành viên, **Thì** người dùng B nhận thông báo WebSocket thời gian thực trong 1 giây
- **Cho** người dùng được mời vào dự án, **Khi** lời mời gửi, **Thì** người dùng nhận toast thông báo và email
- **Cho** thông báo nhận được, **Khi** người dùng click "Xem", **Thì** điều hướng đến thread/dự án liên quan
- **Cho** 3 thông báo chưa đọc, **Khi** người dùng xem icon chuông, **Thì** huy hiệu hiển thị "3"
- **Cho** người dùng click "Đánh dấu tất cả đã đọc", **Khi** hành động hoàn thành, **Thì** số chưa đọc thành 0

---

## Summary / Tóm Tắt

**This document covered / Tài liệu này đã trình bày:**

| Feature / Tính năng | Priority / Ưu tiên | User Stories | Status / Trạng thái |
|---------------------|-------------------|--------------|---------------------|
| 6. Agent Management / Quản lý Agent | High / Cao | US-006 | ✅ Detailed / Chi tiết |
| 7. Self-Hosted Deployment / Triển khai tự quản | Medium / Trung bình | US-008 | ✅ Detailed / Chi tiết |
| 8. ML Training / Huấn luyện ML | Low / Thấp | US-010 | ✅ Detailed / Chi tiết |
| 9. Billing & Notifications / Thanh toán & Thông báo | High / Cao | US-007 | ✅ Detailed / Chi tiết |

---

## Next Document / Tài Liệu Tiếp Theo

**Continue to / Tiếp tục với:**
- **[Part 4: Non-Functional Requirements](02-SRS-Part4-Non-Functional.md)**
  - Performance / Hiệu năng
  - Security / Bảo mật
  - Reliability / Độ tin cậy
  - Scalability / Khả năng mở rộng

---

*End of SRS Part 3 / Kết thúc SRS Phần 3*
