
# 12) Roadmap / Sprint đề xuất (PM)

* **Phase 0 (2 wks):** Kickoff, BRD finalization, basic auth & infra PoC (K8s basics), minimal UI mockups
* **Phase 1 (4 wks):** Core backend APIs, basic chat flow with external agent (one provider), user auth + project CRUD, DB schema, implement conversation threading
* **Phase 2 (4 wks):** File upload & indexing, voice support PoC (STT/TTS), agent management CRUD, billing logging
* **Phase 3 (4 wks):** Self-hosted agent deploy flow (Docker), monitoring + metrics, scaling tests, ML training PoC
* **Phase 4 (2 wks):** Hardening, security review, beta release, documentation & handover

### Roadmap/Timeline Tổng Quát Cho Dự Án

Dựa trên Roadmap đề xuất trong phần 12 của tài liệu (Phase 0-4, tổng 16 weeks), tôi sẽ xây dựng một timeline chi tiết hơn, tích hợp các Milestone bạn đã đồng ý (từ phản hồi trước). Timeline này giả sử team nhỏ (2-5 người: 1 PM như bạn, 1-2 dev backend, 1 dev frontend, 1 DevOps/ML). Thời gian linh hoạt, dựa trên full-time (40h/week), và bao gồm buffer 10-20% cho debug/unexpected issues.

- **Giả Định**: 
  - Dự án bắt đầu ngày 1/10/2025 (dựa trên current date 26/9/2025).
  - Mỗi Milestone là đơn vị nhỏ (1-4 days), nhóm thành Sprint (2-4 weeks, theo Scrum).
  - Công cụ: Jira cho track tasks (tạo Epic cho Phase, Story cho Milestone, Sub-tasks cho công việc cụ thể).
  - Dependencies: Milestone sau build trên trước (e.g., DB trước Auth).
  - Milestones: 1 (DB/Infra) → 2 (Auth) → 3 (User/Project) → 4 (API Gateway) → 5 (Chat Basic) → 6 (Billing) → 7 (Frontend Basic) → 8+ (Features nâng cao như Voice, File, Agent Mgmt, Mobile – để Phase 2+).

#### Timeline Chi Tiết (Gantt-Style Text-Based)
- **Phase 0: Kickoff & PoC (2 weeks, 1/10 - 14/10/2025)**  
  - Tuần 1: Setup repo GitHub, Jira, basic infra PoC (Docker Compose).  
  - Tuần 2: Milestone 1 (DB setup).  
  - Deliverable: DB testable local.

- **Phase 1: Core Backend & Chat (4 weeks, 15/10 - 11/11/2025)**  
  - Tuần 1: Milestone 2 (Auth).  
  - Tuần 2: Milestone 3 (User/Project/Threading).  
  - Tuần 3: Milestone 4 (API Gateway) + Milestone 5 (Chat Basic).  
  - Tuần 4: Milestone 6 (Billing) + Integration tests cơ bản.  
  - Deliverable: API chat text basic testable qua Postman.

- **Phase 2: Advanced Features (4 weeks, 12/11 - 9/12/2025)**  
  - Tuần 1: Milestone 7 (Frontend Web Basic).  
  - Tuần 2: Add Voice (US-003) + File Upload (US-004).  
  - Tuần 3: Agent Mgmt Basic (US-006).  
  - Tuần 4: Billing Report Full + Tests.  
  - Deliverable: Web app với chat full (text/voice/file), testable manual.

- **Phase 3: Deployment & ML (4 weeks, 10/12/2025 - 6/1/2026)**  
  - Tuần 1: Self-Hosted Deploy (US-008, Docker/K8s).  
  - Tuần 2: ML Training PoC (US-010, Python service).  
  - Tuần 3: Monitoring (Prometheus) + Scaling tests.  
  - Tuần 4: Mobile App Basic (Frontend Mobile).  
  - Deliverable: System deploy on cloud, với self-agent testable.

- **Phase 4: Hardening & Release (2 weeks, 7/1 - 20/1/2026)**  
  - Tuần 1: Security review, full E2E tests.  
  - Tuần 2: Beta release, documentation, handover.  
  - Deliverable: MVP ready for users.

**Tổng Thời Gian**: ~16 weeks (4 months), với review sprint cuối mỗi phase. Nếu delay, prioritize core (Phase 1) để có prototype sớm.

Bây giờ, chi tiết tasks cho **Milestone 1: Setup Database Và Infra Basic** (1-2 days, trong Phase 0/1). Tôi format theo Jira-style: Tasks chính là Stories, sub-tasks là công việc cụ thể. Mỗi task có: Mô tả, Assignee gợi ý (dựa RACI: DevOps cho infra, Dev Lead cho code), Estimate (story points hoặc hours), và Test Criteria.

Nếu format này ổn (rõ ràng, actionable), bạn confirm để tôi làm tiếp Milestone 2+.

### Tasks Chi Tiết Cho Milestone 1

### Tasks Chi Tiết Cho Milestone 1 (Cập Nhật Đầy Đủ)

**Prerequisites/Assumptions**:  
- Yêu cầu: Docker installed v20+, Node.js v18+, npm/yarn, quyền admin local để run Docker. Postgres client như pgAdmin hoặc psql để test manual.  
- Assumptions: Dev quen với basics của Docker, TypeORM, và Postgres (nếu không, tham khảo docs trước). Môi trường dev là Linux/Mac (nếu Windows, dùng WSL để tránh issues với volumes). Buffer thời gian cho setup nếu máy mới.  
- Communication: Nếu gặp issue (e.g., port conflict), update Jira comment hoặc Slack #dev-db. Kickoff meeting ngắn (15 mins) trước start để align.  

**Story 1-1: Setup Local Infrastructure Với Docker (Estimate: 4 hours, Assignee: DevOps/Architect)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ non-functional requirements (scalability, observable) từ SRS. Mục đích: Tạo môi trường dev local ổn định để test DB sớm, tránh dependency cloud.  
- Sub-task 1: Cài đặt Docker và Docker Compose trên local machine (nếu chưa). Tham khảo: https://docs.docker.com/engine/install/.  
- Sub-task 2: Tạo file docker-compose.yml ở root repo, bao gồm service Postgres (image: postgres:15-alpine để lightweight, env: POSTGRES_USER=admin, POSTGRES_PASSWORD=secret, POSTGRES_DB=chatai, volumes cho data persistence). Ví dụ YAML snippet:  
  ```yaml
  version: '3.8'
  services:
    db:
      image: postgres:15-alpine
      environment:
        POSTGRES_USER: admin
        POSTGRES_PASSWORD: secret
        POSTGRES_DB: chatai
      ports:
        - '5432:5432'
      volumes:
        - db-data:/var/lib/postgresql/data
  volumes:
    db-data:
  ```  
- Sub-task 3: Run `docker-compose up -d` để start DB local (chạy background), handle errors như port 5432 conflict (kill process hoặc change port).  
- Test Criteria: DB chạy (check `docker ps` thấy container up), connect được qua pgAdmin (host: localhost, port: 5432, user/pass như env) hoặc psql (`psql -h localhost -U admin -d chatai`), run `\l` để list DB và assert 'chatai' exists. Edge case: Stop/start lại để check persistence.

**Story 1-2: Implement DB Schema Dựa ERD (Estimate: 6 hours, Assignee: Dev Lead/DBA)**  
- **Reference/Mục Đích:** Liên quan US-005 (Tạo/quản lý Project) và US-009 (Quản lý conversation threads). Mục đích: Xây dựng schema để lưu trữ projects/threads/messages, đảm bảo AI trace context cuộc hội thoại.  
- Sub-task 1: Trong /services/user-service (hoặc folder chung /migrations), install TypeORM/Prisma (npm i @nestjs/typeorm typeorm pg). Tham khảo: https://nestjs.com/docs/techniques/database#typeorm.  
- Sub-task 2: Tạo entities từ ERD (dùng decorators TypeORM). Ví dụ cho user.entity.ts:  
  ```typescript
  import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    // Add other fields from ERD...
  }
  ```  
  Tương tự cho conversation.entity.ts (với FK project_id). Tham khảo full ERD Mermaid từ docs/ERD.md.  
- Sub-task 3: Tạo migration script (`npm run typeorm migration:generate src/migrations/InitSchema`), handle relations (e.g., ManyToOne cho FK). Nếu error, dùng `migration:create` để manual edit.  
- Sub-task 4: Run migration (`npm run typeorm migration:run`) để apply schema vào DB, với option --fake nếu test dry-run.  
- Test Criteria: Unit test (Jest): Viết test như `expect(await connection.query('SELECT * FROM information_schema.tables WHERE table_name = "users"')).toHaveLength(1);`. Integration: Insert sample data (e.g., `connection.getRepository(User).save({ name: 'test', email: 'test@example.com' })`), query để verify (assert row exists). Edge case: Test unique constraint (e.g., duplicate email throws error).

**Story 1-3: Config DB Connection Cho Services (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Hỗ trợ tất cả US liên quan data (e.g., US-002 Chat, US-007 Thống kê). Mục đích: Kết nối services với DB để lưu/retrieve data an toàn, chuẩn bị cho threading và billing.  
- Sub-task 1: Trong app.module.ts của /services/user-service, config TypeORM module với env (sử dụng @nestjs/config). Ví dụ:  
  ```typescript
  import { TypeOrmModule } from '@nestjs/typeorm';

  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [User, Project /* all entities */],
        synchronize: false, // Production: false, dev: true for auto-schema
      }),
    ],
  })
  export class AppModule {}
  ```  
  Tham khảo: https://docs.nestjs.com/techniques/database.  
- Sub-task 2: Thêm .env file (gitignore) với DB credentials (e.g., DB_HOST=localhost, DB_USER=admin). Handle env validation với Joi nếu cần.  
- Test Criteria: Run service local (`npm run start:dev`), check console log "Connection successful". Test simple query trong service (e.g., findAll users trả empty array nếu DB mới). Edge case: Wrong credentials throws error.

**Story 1-4: CI/CD Basic Cho Milestone (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ non-functional (CI/CD pipeline từ BRD). Mục đích: Tự động hóa test/migration để phát hiện lỗi sớm, đảm bảo code stable từ đầu.  
- Sub-task 1: Tạo workflow YAML ở /.github/workflows/test-db.yaml (GitHub Actions: on push to main/feature branches, steps: setup-node, install deps, run migration, run tests). Ví dụ snippet:  
  ```yaml
  name: Test DB
  on: [push]
  jobs:
    test:
      runs-on: ubuntu-latest
      services:
        postgres:
          image: postgres:15
          env:
            POSTGRES_USER: admin
            POSTGRES_PASSWORD: secret
            POSTGRES_DB: chatai
          ports: ['5432:5432']
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with: { node-version: 18 }
        - run: npm ci
        - run: npm run typeorm migration:run
        - run: npm test
  ```  
  Tham khảo: https://docs.github.com/en/actions/using-containerized-services/creating-postgresql-service-containers.  
- Sub-task 2: Add script test trong package.json ("test": "jest"), config Jest để cover entities/migrations.  
- Test Criteria: Push code đến branch → Check Actions tab trên GitHub, assert build pass (xanh). Edge case: Intentional fail (e.g., wrong migration) để check error handling.

**Dependencies**: Không có (là milestone đầu). Branch: feature/milestone-1-db, tạo PR và review bởi PM/peer trước merge.  
**Deliverable Cuối Milestone**: DB schema ready, testable local với sample data; CI pipeline chạy auto. Total Estimate: 14 hours (~1.5 days).  
**Jira Integration**: Tạo Epic "Phase 1", add Stories này làm issues (với sub-tasks), attach link GitHub branch và ERD.md từ docs. Nếu complete, mark Done và demo quick (e.g., share screen query DB).

### Tasks Chi Tiết Cho Milestone 2: Auth Service

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 1 complete (DB schema và connection ready). NestJS project đã init ở /services/auth-service (npx nest new auth-service --skip-install để cấu trúc). Cần API keys cho OAuth providers (setup dev accounts trên Google/FB/TikTok console).  
- Assumptions: Dev quen với authentication flows (JWT/OAuth); nếu không, đọc docs trước. Sử dụng local strategy cho email/phone, OAuth cho social. Buffer thời gian cho config API keys và handle CORS nếu test với frontend sau. Môi trường: .env cho secrets (e.g., JWT_SECRET=strongkey).  
- Communication: Nếu issue với OAuth callback (e.g., redirect URI mismatch), update Jira hoặc discuss in standup. Use mock providers (e.g., passport-stub) nếu real keys chưa sẵn.  

**Story 2-1: Implement Email/Phone Signup Và Login (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-001 (Đăng ký/Đăng nhập bằng Email/Phone). Mục đích: Xử lý auth cơ bản với verify để secure user creation, hỗ trợ non-social login.  
- Sub-task 1: Install dependencies (npm i @nestjs/passport passport passport-local bcrypt class-validator class-transformer). Tham khảo: https://docs.nestjs.com/security/authentication#implementing-passport-local.  
- Sub-task 2: Tạo DTOs (signup.dto.ts với validation: email unique, password min 8 chars) và auth.service.ts (hash password với bcrypt, save to User entity từ DB). Ví dụ:  
  ```typescript
  import * as bcrypt from 'bcrypt';

  async signup(dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({ ...dto, password: hashed });
    return this.usersRepository.save(user);
  }
  ```  
- Sub-task 3: auth.controller.ts với POST /auth/signup và POST /auth/login (validate credentials, return JWT). Handle phone verify nếu cần (tích hợp Twilio sau phase này).  
- Test Criteria: Unit (Jest): Test hash/compare, e.g., `expect(await bcrypt.compare('testpass', hashed)).toBe(true)`. Integration (Supertest/Postman): Call /signup với body {email, password}, assert 201 và user in DB; /login trả JWT. Edge case: Invalid password trả 401, duplicate email 409.

**Story 2-2: Implement OAuth Flows Cho Social Providers (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-001 (Đăng ký bằng Google/Facebook/TikTok). Mục đích: Hỗ trợ quick login với OAuth để tăng user adoption, xử lý profile sync từ providers.  
- Sub-task 1: Install provider-specific (npm i passport-google-oauth20 passport-facebook passport-tiktok). Config strategies trong auth.module.ts với clientID/secret từ .env. Tham khảo: https://docs.nestjs.com/security/authentication#implementing-passport-google.  
- Sub-task 2: Thêm routes trong auth.controller.ts: GET /auth/oauth/{provider} (initiate) và GET /auth/oauth/{provider}/callback (handle redirect, create/login user nếu profile match). Ví dụ cho Google:  
  ```typescript
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user); // Generate JWT
  }
  ```  
- Sub-task 3: Handle user merge (nếu email từ OAuth exist, link accounts). Add email/phone verify post-OAuth nếu cần (nodemailer cho email confirm).  
- Test Criteria: Integration (Postman hoặc browser): Simulate flow với dev keys (e.g., redirect to Google login), assert JWT return và user in DB với auth_provider='google'. Edge case: New user creates entry, existing merges; invalid token 401. Use passport-stub cho mock nếu no real keys.

**Story 2-3: Integrate JWT Và Auth Guards (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Non-functional (Auth: OAuth2 + JWT; tokens expire 1 hour, refresh support từ SRS). Mục đích: Secure API với token-based auth, chuẩn bị cho RBAC ở milestones sau.  
- Sub-task 1: Install @nestjs/jwt jwt, config JwtModule trong auth.module.ts (secret từ .env, signOptions: { expiresIn: '1h' }).  
- Sub-task 2: Tạo JwtStrategy và AuthGuard (extend PassportStrategy) để validate token ở middleware. Add refresh token logic (POST /auth/refresh). Ví dụ:  
  ```typescript
  import { Strategy } from 'passport-jwt';

  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      });
    }
    async validate(payload: any) {
      return { userId: payload.sub, email: payload.email };
    }
  }
  ```  
- Test Criteria: Unit: Test token sign/validate. Integration: Login → Get token → Use in header cho protected route (e.g., mock /protected), assert access; expired token 401.

**Story 2-4: CI/CD Update Và Basic Tests Cho Auth (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ CI/CD pipeline từ BRD. Mục đích: Auto test auth flows để detect regression sớm.  
- Sub-task 1: Update /.github/workflows/test-db.yaml thành test-backend.yaml (add steps: run auth service, test endpoints với supertest). Handle env secrets in Actions. Tham khảo: https://docs.github.com/en/actions/security-guides/secret-scanning.  
- Sub-task 2: Add test script in package.json ("test:auth": "jest --coverage"), cover 70%+ (như conventions phần 14).  
- Test Criteria: Push code → Actions tab assert green (tests pass). Edge case: Fail build nếu coverage <70%.

**Dependencies**: Milestone 1 (DB connection). Branch: feature/milestone-2-auth, tạo PR và review bởi PM/peer trước merge (check security như no hardcode secrets).  
**Deliverable Cuối Milestone**: Auth service đầy đủ, testable qua Postman/browser (signup/login với JWT, OAuth flows). Total Estimate: 12 hours (~1.5 days).  
**Jira Integration**: Tạo issues trong Epic "Phase 1", link đến US-001 từ SRS.md và auth endpoints từ API Spec (phần 10). Attach logs/test coverage report khi complete; schedule quick demo (e.g., login flow).

