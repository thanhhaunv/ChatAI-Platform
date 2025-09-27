
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

### Nội Dung Đầy Đủ Của Milestone 1 Đến 4 (Cập Nhật Hoàn Chỉnh)

Dưới đây là nội dung đầy đủ của Milestone 1 đến 4, đã được tổng hợp và cập nhật từ các phản hồi trước. Mỗi milestone bao gồm tất cả các bổ sung: Acceptance Criteria (Given-When-Then), Risk Mitigation, Sample Artifacts (Postman JSON, seed-data.json, SQL query, v.v.), và Feedback Loop. Tôi đã giữ độ chi tiết "Expert mode" nhất quán, và thêm Sample Artifacts phù hợp cho từng Story (không lạm dụng để tránh dài dòng). Bạn có thể copy-paste trực tiếp vào tài liệu của mình.

Sau Milestone 4, tôi tiếp tục với Milestone 5, 6, 7 theo format tương tự.

---

### Milestone 1: Setup Database Và Infra Basic

**Prerequisites/Assumptions**:  
- Yêu cầu: Docker installed v20+, Node.js v18+, npm/yarn, quyền admin local để run Docker. Postgres client như pgAdmin hoặc psql để test manual.  
- Assumptions: Dev quen với basics của Docker, TypeORM, và Postgres (nếu không, đọc docs trước). Môi trường dev là Linux/Mac (nếu Windows, dùng WSL để tránh issues với volumes). Buffer thời gian cho setup nếu máy mới.  
- Communication: Nếu gặp issue (e.g., port conflict), update Jira comment hoặc Slack #dev-db. Kickoff meeting ngắn (15 mins) trước start để align.  

**Story 1-1: Setup Local Infrastructure Với Docker (Estimate: 4 hours, Assignee: DevOps/Architect)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ non-functional requirements (scalability, observable) từ SRS. Mục đích: Tạo môi trường dev local ổn định để test DB sớm, tránh dependency cloud.  
- **Acceptance Criteria**:  
  - Given a clean dev machine, When run `docker-compose up -d`, Then Postgres container starts and is accessible via pgAdmin/psql.  
  - Given container running, When stop/start Docker, Then data persists in volume.  
- **Risk Mitigation**: Risk: Port 5432 conflict → Mitigate: Check `netstat -tuln` trước, đổi port nếu cần. Risk: Volume permission error → Mitigate: Chạy `chmod 777` trên volume folder.  
- Sub-task 1: Cài đặt Docker và Docker Compose trên local machine (nếu chưa). Tham khảo: https://docs.docker.com/engine/install/.  
- Sub-task 2: Tạo file docker-compose.yml ở root repo, bao gồm service Postgres (image: postgres:15-alpine để lightweight, env: POSTGRES_USER=admin, POSTGRES_PASSWORD=secret, POSTGRES_DB=chatai, volumes cho data persistence). Sample artifact:  
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
- **Sample Artifacts**: SQL query sample để test DB connection (chạy trong psql sau khi start container):  
  ```sql
  -- Test connection and list databases
  \l;
  -- Switch to chatai DB and test
  \c chatai;
  SELECT version();  -- Should return Postgres version
  ```  
  (Assert 'chatai' listed and version matches 15+).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, blockers (e.g., Docker version mismatch), suggestions cho setup sau.

**Story 1-2: Implement DB Schema Dựa ERD (Estimate: 6 hours, Assignee: Dev Lead/DBA)**  
- **Reference/Mục Đích:** Liên quan US-005 (Tạo/quản lý Project) và US-009 (Quản lý conversation threads). Mục đích: Xây dựng schema để lưu trữ projects/threads/messages, đảm bảo AI trace context cuộc hội thoại.  
- **Acceptance Criteria**:  
  - Given a Postgres DB, When run migration, Then tables (USERS, PROJECTS, CONVERSATIONS, etc.) created per ERD.  
  - Given sample data inserted, When query, Then data matches input.  
- **Risk Mitigation**: Risk: Migration fail do FK errors → Mitigate: Test dry-run với `typeorm migration:run --dry-run`. Risk: Schema không khớp ERD → Mitigate: Peer review entity code trước run.  
- Sub-task 1: Trong /services/user-service (hoặc folder chung /migrations), install TypeORM/Prisma (npm i @nestjs/typeorm typeorm pg). Tham khảo: https://nestjs.com/docs/techniques/database#typeorm.  
- Sub-task 2: Tạo entities từ ERD (dùng decorators TypeORM). Sample artifact:  
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
- Test Criteria: Unit test (Jest): `expect(await connection.query('SELECT * FROM information_schema.tables WHERE table_name = "users"')).toHaveLength(1);`. Integration: Insert sample data (e.g., `connection.getRepository(User).save({ name: 'test', email: 'test@example.com' })`), query để verify (assert row exists). Edge case: Test unique constraint (e.g., duplicate email throws error).  
- **Sample Artifacts**: Seed data JSON cho sample users (dùng để populate DB sau migration, chạy qua TypeORM seed script). Copy vào seed-data.json:  
  ```json
  [
    {
      "name": "Admin User",
      "email": "admin@example.com",
      "phone": "123456789",
      "auth_provider": "email",
      "role": "admin"
    },
    {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "987654321",
      "auth_provider": "google",
      "role": "member"
    }
  ]
  ```  
  (Chạy: `await getRepository(User).save(seedData);` in seed script).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, any schema tweaks, migration errors.

**Story 1-3: Config DB Connection Cho Services (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Hỗ trợ tất cả US liên quan data (e.g., US-002 Chat, US-007 Thống kê). Mục đích: Kết nối services với DB để lưu/retrieve data an toàn, chuẩn bị cho threading và billing.  
- **Acceptance Criteria**:  
  - Given valid .env, When start service, Then DB connects without error.  
  - Given invalid credentials, When connect, Then throw error.  
- **Risk Mitigation**: Risk: Env leak → Mitigate: Add .env to .gitignore. Risk: Connection timeout → Mitigate: Test local connect trước deploy.  
- Sub-task 1: Trong app.module.ts của /services/user-service, config TypeORM module với env (sử dụng @nestjs/config). Sample artifact:  
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
- Test Criteria: Run service local (`npm run start:dev`), check console log "Connection successful". Test simple query (e.g., findAll users trả empty array nếu DB mới). Edge case: Wrong credentials throws error.  
- **Sample Artifacts**: SQL query sample để test connection và simple query (chạy trong psql sau config):  
  ```sql
  -- Test connection and insert sample user
  INSERT INTO users (name, email) VALUES ('Test User', 'test@example.com');
  SELECT * FROM users WHERE email = 'test@example.com';  -- Assert row inserted
  ```  
  (Assert 1 row returned).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, any connection issues (e.g., port blocked).

**Story 1-4: CI/CD Basic Cho Milestone (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ non-functional (CI/CD pipeline từ BRD). Mục đích: Tự động hóa test/migration để phát hiện lỗi sớm, đảm bảo code stable từ đầu.  
- **Acceptance Criteria**:  
  - Given code push, When CI runs, Then build pass with tests.  
  - Given invalid migration, When CI runs, Then fail with error log.  
- **Risk Mitigation**: Risk: CI timeout → Mitigate: Optimize steps (cache npm). Risk: Secret leak → Mitigate: Use GitHub Secrets.  
- Sub-task 1: Tạo workflow YAML ở /.github/workflows/test-db.yaml (GitHub Actions: on push to main/feature branches, steps: setup-node, install deps, run migration, run tests). Sample artifact:  
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
- Sub-task 2: Add script test (npm test) để run Jest.  
- Test Criteria: Push code → Check Actions tab trên GitHub, assert build pass (xanh). Edge case: Intentional fail (e.g., wrong migration) để check error handling.  
- **Sample Artifacts**: Seed data JSON cho sample users (tương tự Story 1-2, dùng để test CI). Copy vào seed-data.json (đã có ở Story 1-2, reuse cho CI).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI setup issues (e.g., service container fail).

**Dependencies**: Không có (là milestone đầu). Branch: feature/milestone-1-db, tạo PR và review bởi PM trước merge.  
**Deliverable Cuối Milestone**: DB schema ready, testable local với sample data; CI pipeline chạy auto. Total Estimate: 14 hours (~1.5 days).  
**Jira Integration**: Tạo Epic "Phase 1", add Stories này làm issues (với sub-tasks), attach link GitHub branch và ERD.md từ docs. Nếu complete, mark Done và demo quick (e.g., share screen query DB).

---

### Milestone 2: Auth Service

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 1 complete (DB schema và connection ready). NestJS project đã init ở /services/auth-service (npx nest new auth-service --skip-install). Passport.js cho OAuth.  
- Assumptions: Dev quen OAuth flows (nếu không, đọc docs trước). Test với mock providers (e.g., Google dev console). Buffer thời gian cho setup API keys và handle CORS nếu test với frontend sau. Môi trường: .env cho secrets (e.g., JWT_SECRET=strongkey).  
- Communication: Nếu issue với OAuth callback (e.g., redirect URI mismatch), update Jira hoặc discuss in standup. Use mock providers (e.g., passport-stub) nếu real keys chưa sẵn.  

**Story 2-1: Implement Email/Phone Signup Và Login (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-001 (Đăng ký/Đăng nhập bằng Email/Phone). Mục đích: Xử lý auth cơ bản với verify để secure user creation, hỗ trợ non-social login.  
- **Acceptance Criteria**:  
  - Given valid email/password, When POST /auth/signup, Then user created in DB with hashed password and return 201.  
  - Given invalid password, When POST /auth/login, Then return 401.  
- **Risk Mitigation**: Risk: Password hashing slow → Mitigate: Use bcrypt rounds=10, test performance. Risk: Email verification delay → Mitigate: Mock nodemailer cho dev.  
- Sub-task 1: Install dependencies (npm i @nestjs/passport passport passport-local passport-google-oauth20 passport-facebook passport-tiktok bcrypt). Tham khảo: https://docs.nestjs.com/security/authentication.  
- Sub-task 2: Tạo DTOs (signup.dto.ts với validation: email unique, password min 8 chars) và auth.service.ts (hash password với bcrypt, save to User entity từ DB). Sample artifact:  
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
- **Sample Artifacts**: Postman collection JSON cho Signup/Login (import vào Postman để test ngay). Copy vào auth-signup.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Auth Signup/Login",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Signup",
        "request": {
          "method": "POST",
          "body": {
            "mode": "raw",
            "raw": "{ \"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"password123\" }"
          },
          "url": {
            "raw": "{{base_url}}/auth/signup",
            "host": ["{{base_url}}"],
            "path": ["auth", "signup"]
          }
        }
      },
      {
        "name": "Login",
        "request": {
          "method": "POST",
          "body": {
            "mode": "raw",
            "raw": "{ \"email\": \"test@example.com\", \"password\": \"password123\" }"
          },
          "url": {
            "raw": "{{base_url}}/auth/login",
            "host": ["{{base_url}}"],
            "path": ["auth", "login"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3001" }
    ]
  }
  ```  
  (Assert login trả JWT).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, any hashing issues (e.g., bcrypt performance).

**Story 2-2: Implement OAuth Flows Cho Social Providers (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-001 (Đăng ký bằng Google/Facebook/TikTok). Mục đích: Hỗ trợ quick login với OAuth để tăng user adoption, xử lý profile sync từ providers.  
- **Acceptance Criteria**:  
  - Given Google login redirect, When callback, Then user created/logged in with auth_provider='google' and JWT returned.  
  - Given existing email from OAuth, When login, Then merge accounts.  
- **Risk Mitigation**: Risk: OAuth redirect URI mismatch → Mitigate: Test with dev console, log callback errors. Risk: Provider API downtime → Mitigate: Fallback to email login.  
- Sub-task 1: Install provider-specific (npm i passport-google-oauth20 passport-facebook passport-tiktok). Config Passport strategies trong auth.module.ts với clientID/secret từ .env. Tham khảo: https://docs.nestjs.com/security/authentication#implementing-passport-google.  
- Sub-task 2: Thêm routes trong auth.controller.ts: GET /auth/oauth/{provider} (initiate) và GET /auth/oauth/{provider}/callback (handle redirect, create/login user nếu profile match). Sample artifact:  
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
- **Sample Artifacts**: Seed data JSON cho OAuth test users (populate DB để test merge). Copy vào oauth-seed-data.json:  
  ```json
  [
    {
      "name": "Google User",
      "email": "googleuser@example.com",
      "auth_provider": "google",
      "role": "member"
    }
  ]
  ```  
  (Chạy seed script để test OAuth callback merge).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, OAuth callback errors.

**Story 2-3: Integrate JWT Và Auth Guards (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Non-functional (Auth: OAuth2 + JWT; tokens expire 1 hour, refresh support từ SRS). Mục đích: Secure API với token-based auth, chuẩn bị cho RBAC ở milestones sau.  
- **Acceptance Criteria**:  
  - Given login response, When extract JWT, Then token expires in 1 hour.  
  - Given expired token, When use in guard, Then return 401.  
- **Risk Mitigation**: Risk: JWT secret leak → Mitigate: Use Vault cho production, .env gitignore. Risk: Refresh loop → Mitigate: Limit refresh calls per hour.  
- Sub-task 1: Install @nestjs/jwt, config JwtModule trong module.  
- Sub-task 2: Tạo JwtStrategy và AuthGuard (extend PassportStrategy) để validate token ở middleware. Add refresh token logic (POST /auth/refresh). Sample artifact:  
  ```typescript
  import { Strategy } from 'passport-jwt';
  import { ExtractJwt } from 'passport-jwt';

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
- **Sample Artifacts**: SQL query sample để test JWT user (chạy trong psql để verify user from token):  
  ```sql
  -- Test user from JWT payload (assume userId = 1)
  SELECT id, email, role FROM users WHERE id = 1;  -- Assert matches payload
  ```  
  (Use after login to check DB sync).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, JWT expiry issues.

**Story 2-4: CI/CD Update Và Basic Tests Cho Auth (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ CI/CD pipeline từ BRD. Mục đích: Auto test auth để stable.  
- **Acceptance Criteria**:  
  - Given push to branch, When CI runs, Then pass with auth tests and coverage >70%.  
  - Given invalid OAuth mock, When test, Then fail with specific error.  
- **Risk Mitigation**: Risk: CI secret exposure → Mitigate: Use GitHub Secrets for API keys. Risk: Test flakiness → Mitigate: Run tests 3x in CI.  
- Sub-task 1: Update /.github/workflows/test-db.yaml thành test-backend.yaml (add steps: run auth service, test endpoints với supertest). Handle env secrets in Actions. Tham khảo: https://docs.github.com/en/actions/security-guides/secret-scanning.  
- Sub-task 2: Add test script in package.json ("test:auth": "jest --coverage"), cover 70%+.  
- Test Criteria: Push code → Actions tab assert green (tests pass). Edge case: Fail build nếu coverage <70%.  
- **Sample Artifacts**: Postman collection JSON cho OAuth test (import để simulate flow). Copy vào oauth-test.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "OAuth Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Google OAuth Init",
        "request": {
          "method": "GET",
          "url": {
            "raw": "{{base_url}}/auth/oauth/google",
            "host": ["{{base_url}}"],
            "path": ["auth", "oauth", "google"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3001" }
    ]
  }
  ```  
  (Follow redirect to callback in browser).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI auth test failures.

**Dependencies**: Milestone 1 (DB). Branch: feature/milestone-2-auth, PR review.  
**Deliverable Cuối Milestone**: Auth API testable (signup/login with JWT, OAuth flows). Total Estimate: 12 hours (~1.5 days).  
**Jira Integration**: Add to Epic "Phase 1", link to US-001 in SRS.md.

---

### Milestone 3: User & Project Service Với Threading

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 2 complete (Auth Service với JWT và OAuth sẵn sàng). /services/user-service đã init với NestJS (npx nest new user-service --skip-install). DB từ Milestone 1 có schema USERS, PROJECTS, PROJECT_MEMBERS, CONVERSATIONS. Cần cài TypeORM hoặc Prisma nếu chưa có (npm i @nestjs/typeorm typeorm pg).  
- Assumptions: Dev quen với CRUD operations và TypeORM relations (ManyToOne/OneToMany). Nếu không, đọc https://typeorm.io/relations trước. Buffer thời gian cho debug FK constraints hoặc RBAC logic. Môi trường: .env có DB credentials và JWT_SECRET từ Milestone 2.  
- Communication: Nếu issue với relations (e.g., cascade delete), update Jira hoặc Slack #dev-backend. Kickoff meeting (15 mins) để align về RBAC và threading model. PR review kỹ để tránh DB inconsistencies.  

**Story 3-1: Implement User CRUD Endpoints (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-005 (Tạo/quản lý Project, invite members). Mục đích: Quản lý user data để hỗ trợ multi-tenant projects và phân quyền RBAC trong hệ thống.  
- **Acceptance Criteria**:  
  - Given authenticated admin, When GET /users, Then return list of users.  
  - Given invalid user ID, When DELETE /users/:id, Then return 404.  
- **Risk Mitigation**: Risk: RBAC bypass → Mitigate: Test all roles (owner/admin). Risk: Soft delete không work → Mitigate: Query with isActive=true.  
- Sub-task 1: Install dependencies nếu cần (npm i @nestjs/config class-validator class-transformer). Tạo user.controller.ts với endpoints: GET /users (list, admin-only), GET /users/:id, PUT /users/:id (update profile), DELETE /users/:id (soft delete). Protect với JwtAuthGuard từ Milestone 2. Sample artifact:  
  ```typescript
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }
  ```  
- Sub-task 2: Tạo user.service.ts, dùng TypeORM repository để query User entity (findByEmail, findById). Implement soft delete (add isActive: boolean). Tham khảo: https://docs.nestjs.com/techniques/database#repository-pattern.  
- Sub-task 3: Add DTOs (create-user.dto.ts, update-user.dto.ts) với validation (e.g., email format, name length).  
- Test Criteria: Unit (Jest): Test service methods, e.g., `expect(await service.findByEmail('test@example.com')).toMatchObject({ email: 'test@example.com' })`. Integration (Supertest): Auth với JWT → Call GET /users, assert 200 và array users; DELETE /users/:id, check isActive=false. Edge case: Unauthorized (no JWT) trả 401, invalid ID trả 404.  
- **Sample Artifacts**: Postman collection JSON cho User CRUD (import vào Postman để test ngay). Copy-paste vào file user-crud.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "User CRUD Collection",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Create User",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"password123\" }"
          },
          "url": {
            "raw": "{{base_url}}/users",
            "host": ["{{base_url}}"],
            "path": ["users"]
          }
        }
      },
      {
        "name": "Get Users",
        "request": {
          "method": "GET",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "url": {
            "raw": "{{base_url}}/users",
            "host": ["{{base_url}}"],
            "path": ["users"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
  (Thay {{jwt_token}} bằng token từ /auth/login).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, RBAC test results.

**Story 3-2: Implement Project CRUD Với Members Management (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-005 (Tạo/quản lý Project, invite members). Mục đích: Tạo projects với phân quyền owner/member/viewer để hỗ trợ multi-tenant chat và threads.  
- **Acceptance Criteria**:  
  - Given authenticated user, When POST /projects, Then project created with owner_id from JWT.  
  - Given non-owner, When invite to project, Then return 403.  
- **Risk Mitigation**: Risk: FK violation khi invite → Mitigate: Validate user_id exists trước save. Risk: Role enum mismatch → Mitigate: Use enum in entity.  
- Sub-task 1: Tạo entities Project, ProjectMembers trong src/entities/. Sample artifact:  
  ```typescript
  @Entity('projects')
  export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User)
    owner: User;

    @OneToMany(() => ProjectMember, (member) => member.project)
    members: ProjectMember[];
  }
  ```  
- Sub-task 2: Tạo project.controller.ts với endpoints: POST /projects (create), GET /projects (list user’s projects), PUT /projects/:id (update), DELETE /projects/:id (soft delete). POST /projects/:id/members (invite with role: owner/member/viewer). Use RBAC guard (e.g., @Roles('admin') hoặc check owner_id).  
- Sub-task 3: project.service.ts để handle logic: Create project (set owner từ JWT user), invite members (check permissions). Tham khảo: https://nestjs.com/docs/techniques/authorization.  
- Test Criteria: Integration (Supertest): Auth → POST /projects {name: 'Test Project'}, assert 201 và owner_id match; POST /projects/:id/members, check DB table project_members. Edge case: Non-owner invite trả 403, duplicate member 409.  
- **Sample Artifacts**: Seed data JSON cho sample project/members (dùng để populate DB sau migration, chạy qua TypeORM seed). Copy vào seed-data.json:  
  ```json
  [
    {
      "project": {
        "name": "Test Project",
        "owner": { "id": 1 }  // Assume user ID 1 from DB
      },
      "member": {
        "user": { "id": 2 },
        "role": "member"
      }
    }
  ]
  ```  
  (Chạy: `await repository.save(seedData)` in seed script).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, RBAC logic tweaks.

**Story 3-3: Implement Conversation Threading (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-009 (Quản lý conversation threads trong project). Mục đích: Tạo threads để nhóm messages, hỗ trợ AI duy trì context qua thread_id.  
- **Acceptance Criteria**:  
  - Given valid project_id, When POST /conversations, Then thread created with unique thread_id and linked to project.  
  - Given invalid project_id, When create thread, Then return 404.  
- **Risk Mitigation**: Risk: Thread_id collision → Mitigate: Use UUID library. Risk: Pagination slow → Mitigate: Add index on project_id.  
- Sub-task 1: Tạo conversation.controller.ts với endpoints: POST /projects/:id/conversations (create thread, generate unique thread_id), GET /projects/:id/conversations (list with pagination). Sample artifact:  
  ```typescript
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Param('id') projectId: number, @Body() dto: CreateConversationDto) {
    return this.conversationService.create(projectId, dto);
  }
  ```  
- Sub-task 2: conversation.service.ts để generate thread_id (UUID hoặc auto-increment), link với project_id. Save metadata (e.g., json {title: 'Thread 1'}).  
- Sub-task 3: Config TypeORM relations (Conversation → Project, Conversation → Messages).  
- Test Criteria: Unit: Test thread creation. Integration: Auth → Create project → POST /conversations, assert thread_id in DB và linked project_id. Edge case: Invalid project_id trả 404.  
- **Sample Artifacts**: SQL query sample cho test pagination threads (chạy trong pgAdmin/psql):  
  ```sql
  -- List threads for project ID 1 with pagination (limit 10, offset 0)
  SELECT * FROM conversations 
  WHERE project_id = 1 
  ORDER BY created_at DESC 
  LIMIT 10 OFFSET 0;
  ```  
  (Assert returns sample threads).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, UUID generation issues.

**Story 3-4: CI/CD Update Và Tests Cho User/Project/Threading (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional (CI/CD pipeline từ BRD). Mục đích: Auto test CRUD và threading để đảm bảo stability trước khi tích hợp chat.  
- **Acceptance Criteria**:  
  - Given push to branch, When CI runs, Then pass with user/project/thread tests.  
  - Given relation error, When test, Then fail with specific log.  
- **Risk Mitigation**: Risk: CI DB conflict → Mitigate: Use separate DB service in Actions. Risk: Test flakiness → Mitigate: Run tests in parallel.  
- Sub-task 1: Update /.github/workflows/test-backend.yaml (add steps: run user-service, test endpoints /users, /projects, /conversations). Use DB service từ Milestone 1.  
- Sub-task 2: Add test script ("test:user": "jest src/users"), aim 70% coverage. Tham khảo: https://jestjs.io/docs/api.  
- Test Criteria: Push → GitHub Actions green. Edge case: Fail nếu relations sai (e.g., missing FK).  
- **Sample Artifacts**: Postman collection chung cho Milestone 3 (import để test all endpoints). Copy vào milestone3.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Milestone 3 - User/Project/Thread",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Create Project",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"name\": \"Test Project\" }"
          },
          "url": {
            "raw": "{{base_url}}/projects",
            "host": ["{{base_url}}"],
            "path": ["projects"]
          }
        }
      },
      {
        "name": "Create Thread",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"title\": \"Test Thread\" }"
          },
          "url": {
            "raw": "{{base_url}}/projects/{{project_id}}/conversations",
            "host": ["{{base_url}}"],
            "path": ["projects", "{{project_id}}", "conversations"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" },
      { "key": "project_id", "value": "1" }
    ]
  }
  ```  
  (Thay variables bằng real values).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI test coverage report.

**Dependencies**: Milestone 2 (Auth Service cho JWT validation). Branch: feature/milestone-3-user-project, PR review bởi PM/peer (check RBAC logic và DB consistency).  
**Deliverable Cuối Milestone**: APIs cho user/project/threading testable qua Postman (e.g., create project, invite member, add thread). Total Estimate: 12 hours (~1.5 days).  
**Jira Integration**: Tạo issues trong Epic "Phase 1", link đến US-005 và US-009 từ SRS.md, attach ERD.md và API Spec endpoints (/projects, /conversations). Demo: Show Postman flow (auth → create project → add thread).

---

### Milestone 4: API Gateway Basic

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 3 complete (Auth, User, Project APIs ready). /services/api-gateway đã init với NestJS (npx nest new api-gateway --skip-install). Cần cài @nestjs/microservices cho routing (HTTP hoặc gRPC). Docker Compose từ Milestone 1 có thể chạy auth-service và user-service local để test.  
- Assumptions: Dev quen với REST proxy và middleware (nếu không, đọc https://docs.nestjs.com/middleware trước). Ban đầu dùng HTTP sync (gRPC/async như RabbitMQ để Phase 2 nếu cần scale). Buffer thời gian cho debug CORS hoặc rate limiting. Môi trường: .env có JWT_SECRET và URLs của auth/user services (e.g., AUTH_SERVICE_URL=http://localhost:3001).  
- Communication: Nếu issue với service discovery (e.g., localhost vs Docker network), update Jira hoặc Slack #dev-backend. PR review kỹ để check security (e.g., no exposed endpoints). Kickoff meeting (15 mins) để align về routing và rate limiting logic.  

**Story 4-1: Setup API Gateway Structure Và Proxy Routes (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Không trực tiếp US, nhưng hỗ trợ tất cả US bằng cách cung cấp entry point cho APIs (từ SRS và API Spec, phần 10). Mục đích: Route requests từ frontend đến auth/user services một cách secure và centralized.  
- **Acceptance Criteria**:  
  - Given auth-service running, When call POST /auth/signup via gateway, Then response matches direct auth-service call.  
  - Given user-service running, When call GET /projects via gateway, Then response returns user’s projects.  
- **Risk Mitigation**: Risk: CORS misconfig → Mitigate: Test early với curl/Postman. Risk: Service down → Mitigate: Add retry logic in axios.  
- Sub-task 1: Install dependencies (npm i @nestjs/microservices @nestjs/axios express-rate-limit). Tham khảo: https://docs.nestjs.com/microservices/basics.  
- Sub-task 2: Tạo gateway.controller.ts để proxy requests. Sample artifact:  
  ```typescript
  import { Controller, Get, Post, Req } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';

  @Controller('auth')
  export class GatewayController {
    constructor(private readonly httpService: HttpService) {}

    @Post('signup')
    async proxySignup(@Req() req) {
      return this.httpService.post(`${process.env.AUTH_SERVICE_URL}/auth/signup`, req.body).toPromise();
    }
  }
  ```  
  Proxy /auth/* đến auth-service, /projects/* và /conversations/* đến user-service.  
- Sub-task 3: Config app.module.ts để enable CORS (cho frontend test sau). Thêm healthcheck endpoint (/health).  
- Test Criteria: Unit (Jest): Test proxy logic, e.g., `expect(httpService.post).toHaveBeenCalledWith(authUrl)`. Integration (Supertest): Run auth-service, user-service, và api-gateway local → Call POST /auth/signup qua gateway, assert response match auth-service direct call. Edge case: Invalid service URL trả 502.  
- **Sample Artifacts**: Postman collection JSON cho proxy test (import để test gateway routing). Copy vào gateway-proxy.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Gateway Proxy Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Proxy Signup",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"name\": \"Test\", \"email\": \"test2@example.com\", \"password\": \"pass123\" }"
          },
          "url": {
            "raw": "{{gateway_url}}/auth/signup",
            "host": ["{{gateway_url}}"],
            "path": ["auth", "signup"]
          }
        }
      }
    ],
    "variable": [
      { "key": "gateway_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
  (Assert response same as direct auth-service call).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, any proxy errors (e.g., timeout).

**Story 4-2: Add JWT Authentication Middleware (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Non-functional (Security: OAuth2 + JWT từ SRS). Mục đích: Validate JWT từ Milestone 2 trước khi route requests, đảm bảo chỉ authorized users access protected routes.  
- **Acceptance Criteria**:  
  - Given valid JWT, When call protected /projects, Then request routes to user-service.  
  - Given no/invalid JWT, When call protected, Then return 401.  
- **Risk Mitigation**: Risk: JWT decode fail → Mitigate: Log error details. Risk: Performance hit → Mitigate: Cache public key nếu dùng RS256.  
- Sub-task 1: Tạo auth.middleware.ts, dùng @nestjs/jwt để verify token từ Authorization header. Sample artifact:  
  ```typescript
  import { Injectable, NestMiddleware } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';

  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: () => void) {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) throw new UnauthorizedException();
      req.user = this.jwtService.verify(token);
      next();
    }
  }
  ```  
- Sub-task 2: Apply middleware cho protected routes (e.g., /projects/*). Tham khảo: https://docs.nestjs.com/middleware#applying-middleware.  
- Test Criteria: Integration: Login từ Milestone 2 → Get JWT → Call protected /projects qua gateway, assert 200. Edge case: No token hoặc invalid token trả 401.  
- **Sample Artifacts**: SQL query sample để test middleware (verify user from JWT payload in DB):  
  ```sql
  -- Test user validation from JWT (assume userId = 1 from token)
  SELECT id, email FROM users WHERE id = 1;  -- Assert matches req.user
  ```  
  (Run after middleware call to check DB sync).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, JWT test results.

**Story 4-3: Implement Rate Limiting (Estimate: 2 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** Non-functional (Scale: handle 10k concurrent users từ SRS). Mục đích: Ngăn abuse API, đảm bảo performance ổn định.  
- **Acceptance Criteria**:  
  - Given 100 requests in 15 mins, When send 101st, Then return 429.  
  - Given healthcheck call, When sent, Then not limited.  
- **Risk Mitigation**: Risk: Rate limit too strict → Mitigate: Config adjustable via .env. Risk: Memory leak → Mitigate: Test with high load.  
- Sub-task 1: Config express-rate-limit trong app.module.ts (e.g., max 100 requests/15 mins per IP). Sample artifact:  
  ```typescript
  import * as rateLimit from 'express-rate-limit';

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP
    }),
  );
  ```  
- Sub-task 2: Test với endpoints nhạy cảm (e.g., /auth/login).  
- Test Criteria: Integration: Call /auth/login 101 lần liên tiếp, assert lần 101 trả 429 (Too Many Requests). Edge case: Whitelist healthcheck (/health) không bị limit.  
- **Sample Artifacts**: Postman collection JSON cho rate limit test (import để simulate 100+ calls). Copy vào rate-limit-test.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Rate Limit Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Login (Repeat 101 times)",
        "event": [
          {
            "listen": "test",
            "script": {
              "exec": [
                "if (pm.response.code === 429) { pm.test('Rate limit hit', true); } else if (pm.response.code === 200) { pm.test('OK', true); }"
              ]
            }
          }
        ],
        "request": {
          "method": "POST",
          "body": {
            "mode": "raw",
            "raw": "{ \"email\": \"test@example.com\", \"password\": \"pass123\" }"
          },
          "url": {
            "raw": "{{base_url}}/auth/login",
            "host": ["{{base_url}}"],
            "path": ["auth", "login"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" }
    ]
  }
  ```  
  (Run multiple times to hit limit).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, rate limit tweaks.

**Story 4-4: CI/CD Update Và Tests Cho Gateway (Estimate: 1 hour, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional (CI/CD pipeline từ BRD). Mục đích: Auto test gateway để đảm bảo routing và security đúng trước khi tích hợp chat.  
- **Acceptance Criteria**:  
  - Given push to branch, When CI runs, Then pass with gateway tests.  
  - Given invalid proxy, When test, Then fail with error log.  
- **Risk Mitigation**: Risk: Mock service fail → Mitigate: Use nock for HTTP mocks. Risk: CI timeout → Mitigate: Shorten test suite.  
- Sub-task 1: Update /.github/workflows/test-backend.yaml, thêm steps để run api-gateway service, test proxy với mock auth/user services. Tham khảo: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions.  
- Sub-task 2: Add test script ("test:gateway": "jest src/gateway"), cover middleware và routing (aim 70%+ coverage).  
- Test Criteria: Push code → GitHub Actions green. Edge case: Fail build nếu middleware skip invalid tokens.  
- **Sample Artifacts**: Seed data JSON cho mock services in CI (reuse seed-data.json từ Milestone 1, để test proxy with sample users).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI gateway test failures.

**Dependencies**: Milestone 3 (Auth, User, Project APIs để proxy). Branch: feature/milestone-4-gateway, PR review bởi PM/peer (check security headers và rate limiting).  
**Deliverable Cuối Milestone**: API Gateway chạy local, proxy được requests đến auth-service và user-service, với JWT validation và rate limiting. Testable qua Postman (e.g., login → create project qua gateway). Total Estimate: 8 hours (~1 day).  
**Jira Integration**: Tạo issues trong Epic "Phase 1", link đến API Spec (phần 10, endpoints /auth, /projects, /conversations). Attach test logs khi complete; demo quick (e.g., Postman call qua gateway).  

---

### Milestone 5: Chat Orchestrator Basic (Text Chat Với External Agent)

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 4 complete (API Gateway proxy Auth/User APIs). /services/chat-orch đã init với NestJS (npx nest new chat-orch --skip-install). Cần API key cho external AI (e.g., OpenAI, lấy từ https://platform.openai.com). Redis cài local hoặc qua Docker (image: redis:7-alpine) để cache thread context nếu cần.  
- Assumptions: Dev quen REST APIs, HTTP client (axios), và basic async/await. Hardcode OpenAI API đầu tiên (thread_id support nếu dùng Assistants API). Buffer thời gian cho debug API rate limits hoặc response parsing. Môi trường: .env có OPENAI_API_KEY và DB/Gateway URLs.  
- Communication: Nếu issue với AI response format (e.g., OpenAI API đổi schema), update Jira hoặc Slack #dev-chat. PR review để check error handling và context management. Kickoff meeting (15 mins) align về flow từ sequence diagram (User → Frontend → API Gateway → ChatOrch → Agent → DB).  

**Story 5-1: Setup Chat Orchestrator Module Và Endpoint (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-002 (Chat với AI qua text). Mục đích: Tạo endpoint chính để gửi message đến AI và nhận response, bắt đầu với text chat để test flow sớm.  
- **Acceptance Criteria**:  
  - Given authenticated user and valid thread_id, When POST /messages with text, Then return 201 with message ID.  
  - Given invalid thread_id, When POST /messages, Then return 404.  
- **Risk Mitigation**: Risk: Endpoint overload → Mitigate: Add rate limit (reuse Story 4-3). Risk: DTO validation fail → Mitigate: Use class-validator strict.  
- Sub-task 1: Install dependencies (npm i @nestjs/axios redis). Tham khảo: https://docs.nestjs.com/techniques/http-module.  
- Sub-task 2: Tạo chat.controller.ts với endpoint POST /projects/:id/conversations/:thread_id/messages (protected bằng JwtAuthGuard). Sample artifact:  
  ```typescript
  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Param('id') projectId: number,
    @Param('thread_id') threadId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.processMessage(projectId, threadId, dto);
  }
  ```  
  DTO: { content: string, agent_id: string }.  
- Sub-task 3: Config Redis client nếu dùng cache (optional cho Phase 1, fallback to DB). Tham khảo: https://docs.nestjs.com/techniques/caching.  
- Test Criteria: Unit (Jest): Test DTO validation (e.g., content non-empty). Integration (Supertest): Mock auth → Call endpoint với sample body, assert 201 (hoặc 400 nếu invalid). Edge case: Missing thread_id trả 404.  
- **Sample Artifacts**: Postman collection JSON cho chat endpoint test (import để test routing qua gateway). Copy vào chat-endpoint.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Chat Endpoint Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Send Message",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"content\": \"Hello AI\", \"agent_id\": \"openai-gpt4\" }"
          },
          "url": {
            "raw": "{{gateway_url}}/projects/{{project_id}}/conversations/{{thread_id}}/messages",
            "host": ["{{gateway_url}}"],
            "path": ["projects", "{{project_id}}", "conversations", "{{thread_id}}", "messages"]
          }
        }
      }
    ],
    "variable": [
      { "key": "gateway_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" },
      { "key": "project_id", "value": "1" },
      { "key": "thread_id", "value": "thread-123" }
    ]
  }
  ```  
  (Assert 201 response).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, DTO issues (e.g., validation too strict).

**Story 5-2: Retrieve Và Manage Thread Context (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-009 (Quản lý conversation threads). Mục đích: Lấy context từ DB (hoặc Redis) để gửi cho AI, đảm bảo thread_id duy trì lịch sử hội thoại.  
- **Acceptance Criteria**:  
  - Given existing thread_id, When retrieve context, Then return last 5 messages in order.  
  - Given non-existent thread_id, When retrieve, Then return empty array.  
- **Risk Mitigation**: Risk: DB query slow → Mitigate: Add index trên thread_id. Risk: Context too large → Mitigate: Limit 5 messages.  
- Sub-task 1: Trong chat.service.ts, query CONVERSATIONS và MESSAGES table (TypeORM) với thread_id để lấy context (e.g., last 5 messages). Sample artifact:  
  ```typescript
  async getThreadContext(threadId: string) {
    return this.messagesRepository.find({
      where: { conversation: { thread_id: threadId } },
      order: { created_at: 'DESC' },
      take: 5,
    });
  }
  ```  
- Sub-task 2: Format context thành array messages (e.g., [{ role: 'user', content: 'hi' }, { role: 'assistant', content: 'hello' }]) để gửi cho AI.  
- Test Criteria: Unit: Test query return correct messages. Integration: Create thread (Milestone 3) → Save sample messages → Call getThreadContext, assert array đúng thứ tự. Edge case: Non-existent thread_id trả empty array.  
- **Sample Artifacts**: SQL query sample để test context retrieval (chạy trong pgAdmin/psql):  
  ```sql
  -- Retrieve last 5 messages for thread_id 'thread-123'
  SELECT id, content, role, created_at FROM messages 
  WHERE conversation_id = (SELECT id FROM conversations WHERE thread_id = 'thread-123')
  ORDER BY created_at DESC LIMIT 5;
  ```  
  (Assert 5 rows or empty).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, query performance issues.

**Story 5-3: Integrate External AI Agent (OpenAI) (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-002. Mục đích: Gửi message + context đến OpenAI API, nhận response để hiển thị cho user.  
- **Acceptance Criteria**:  
  - Given valid message + context, When call OpenAI, Then return AI response.  
  - Given API key invalid, When call, Then throw 401/429 with retry logic.  
- **Risk Mitigation**: Risk: API rate limit → Mitigate: Implement exponential backoff. Risk: Response format change → Mitigate: Log raw response for debug.  
- Sub-task 1: Tạo agent.service.ts để call OpenAI (axios POST https://api.openai.com/v1/chat/completions). Hardcode agent_id='openai-gpt4' cho đơn giản. Sample artifact:  
  ```typescript
  async callAgent(agentId: string, messages: any[]) {
    const response = await this.httpService.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-4', messages },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } },
    ).toPromise();
    return response.data.choices[0].message.content;
  }
  ```  
- Sub-task 2: Trong chat.service.ts, combine context + new message, gọi agent.service.ts, parse response. Save input/output vào MESSAGES table.  
- Test Criteria: Integration (Supertest): Auth → Create thread → Send message → Assert response từ OpenAI (mock nếu no key). Edge case: API rate limit trả 429, retry logic.  
- **Sample Artifacts**: Mock OpenAI response JSON (dùng để test integration mà không gọi real API). Copy vào mock-openai-response.json:  
  ```json
  {
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": "Hello! How can I help you today?"
        }
      }
    ]
  }
  ```  
  (Use in Jest mock: `jest.mock('axios').mockResolvedValue({ data: mockResponse });`).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, AI integration errors (e.g., rate limit).

**Story 5-4: Save Message/Response Và CI/CD Update (Estimate: 2 hours, Assignee: DevOps/Dev Lead)**  
- **Reference/Mục Đích:** US-002, US-009. Mục đích: Lưu conversation to DB & index for search (with thread_id).  
- **Acceptance Criteria**:  
  - Given message sent, When processed, Then user + AI messages saved in DB with thread_id.  
  - Given DB error, When save, Then rollback transaction.  
- **Risk Mitigation**: Risk: Transaction fail → Mitigate: Use TypeORM transaction. Risk: CI timeout → Mitigate: Mock AI response.  
- Sub-task 1: Trong chat.service.ts, save message + response (associate with thread_id). Sample artifact:  
  ```typescript
  @Injectable()
  export class ChatService {
    async processMessage(projectId: number, threadId: string, dto: SendMessageDto) {
      const context = await this.getThreadContext(threadId);
      const response = await this.agentService.callAgent(dto.agent_id, [...context, { role: 'user', content: dto.content }]);
      await this.messagesRepository.save([
        { content: dto.content, role: 'user', conversation: { thread_id: threadId } },
        { content: response, role: 'assistant', conversation: { thread_id: threadId } },
      ]);
      return response;
    }
  }
  ```  
- Sub-task 2: Update /.github/workflows/test-backend.yaml, thêm steps run chat-orch service, test endpoint /messages với mock OpenAI response.  
- Test Criteria: Integration: Full flow (auth → create thread → send message), check MESSAGES table có 2 rows (user + AI). CI: Actions green. Edge case: DB rollback on fail.  
- **Sample Artifacts**: SQL query sample để test message save (chạy trong psql sau flow):  
  ```sql
  -- Check saved messages for thread_id 'thread-123'
  SELECT * FROM messages 
  WHERE conversation_id = (SELECT id FROM conversations WHERE thread_id = 'thread-123')
  ORDER BY created_at DESC;
  ```  
  (Assert user and assistant messages).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, DB save issues.

**Dependencies**: Milestone 4 (API Gateway). Branch: feature/milestone-5-chat, PR review bởi PM/peer (check AI integration và DB consistency).  
**Deliverable Cuối Milestone**: Chat Orchestrator API chạy local, hỗ trợ text chat với external AI (OpenAI), lưu messages vào DB. Testable qua Postman (auth → create project → create thread → send message → get response). Total Estimate: 11 hours (~1.5 days).  
**Jira Integration**: Tạo issues trong Epic "Phase 1", link đến US-002 và US-009 từ SRS.md, attach API Spec (/messages endpoint, phần 10). Demo: Show Postman flow (send message, nhận AI response).

---

### Milestone 6: Billing Basic

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 5 complete (Chat Orchestrator với text chat và message storage). /services/billing init với NestJS (npx nest new billing --skip-install). TypeORM kết nối DB (BILLING_LOG table từ ERD). Cần npm i csv-writer để export reports.  
- Assumptions: Dev quen TypeORM queries và CSV generation. Billing hiện chỉ log token/usage cơ bản (full reports để Milestone 10). Buffer thời gian cho debug DB transactions hoặc CSV formatting. Môi trường: .env có DB_URL, GATEWAY_URL.  
- Communication: Update Jira/Slack #dev-billing nếu issue với token calculation (e.g., OpenAI token format). PR review check DB consistency và report accuracy. Kickoff meeting (15 mins) align về billing flow từ sequence diagram (ChatOrch → Billing → DB).  

**Story 6-1: Implement Token/Usage Logging (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-007 (Thống kê token/cost theo user/project/agent). Mục đích: Ghi lại token usage từ AI responses để hỗ trợ billing và tracking chi phí.  
- **Acceptance Criteria**:  
  - Given a chat message processed, When usage logged, Then BILLING_LOG table has entry with thread_id, user_id, tokens.  
  - Given invalid thread_id, When log attempted, Then throw 404.  
- **Risk Mitigation**: Risk: Token calculation sai (e.g., OpenAI format thay đổi) → Mitigate: Log raw response và test với mock data. Risk: DB transaction fail → Mitigate: Use TypeORM transaction.  
- Sub-task 1: Install dependencies (npm i @nestjs/typeorm typeorm pg). Tạo billing.service.ts để log usage. Sample artifact:  
  ```typescript
  @Injectable()
  export class BillingService {
    constructor(@InjectRepository(BillingLog) private billingLogRepository: Repository<BillingLog>) {}

    async logUsage(threadId: string, userId: number, tokens: number) {
      const log = this.billingLogRepository.create({ threadId, userId, tokens, created_at: new Date() });
      return this.billingLogRepository.save(log);
    }
  }
  ```  
- Sub-task 2: Integrate với ChatOrch (Milestone 5): Sau AI response, call billing.service.ts với tokens (hardcode 100 tokens/response cho đơn giản, hoặc parse từ OpenAI metadata nếu có).  
- Test Criteria: Unit (Jest): Test logUsage creates correct entity. Integration (Supertest): Auth → Send chat message → Check BILLING_LOG has entry (e.g., { thread_id, user_id, tokens: 100 }). Edge case: Invalid thread_id throws 404.  
- **Sample Artifacts**: SQL query sample để test logging (chạy trong psql sau chat flow):  
  ```sql
  -- Check billing log for thread_id 'thread-123'
  SELECT * FROM billing_log 
  WHERE thread_id = 'thread-123' 
  ORDER BY timestamp DESC LIMIT 1;
  ```  
  (Assert tokens > 0).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, any token parsing issues (e.g., OpenAI metadata format).

**Story 6-2: Basic Billing Report Endpoint (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-007. Mục đích: Cung cấp endpoint để export usage data cơ bản (CSV) cho admin/owner theo thời gian hoặc project.  
- **Acceptance Criteria**:  
  - Given authenticated admin, When call GET /billing/report, Then return CSV with usage data (user_id, thread_id, tokens, date).  
  - Given non-admin user, When call, Then return 403.  
- **Risk Mitigation**: Risk: CSV format lỗi (e.g., encoding) → Mitigate: Test with sample data và open in Excel. Risk: Large dataset chậm → Mitigate: Add pagination (limit 1000 rows).  
- Sub-task 1: Install npm i csv-writer. Tạo billing.controller.ts với GET /billing/report (protected bằng JwtAuthGuard và RoleGuard). Sample artifact:  
  ```typescript
  @Get('report')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getReport(@Query() query: ReportQueryDto) {
    const logs = await this.billingService.getUsage(query);
    const csvWriter = createObjectCsvWriter({ path: 'report.csv', header: [
      { id: 'user_id', title: 'User ID' },
      { id: 'thread_id', title: 'Thread ID' },
      { id: 'tokens', title: 'Tokens' },
      { id: 'created_at', title: 'Date' },
    ]});
    await csvWriter.writeObjects(logs);
    return { file: 'report.csv' };
  }
  ```  
- Sub-task 2: Tạo ReportQueryDto (filters: date_from, date_to, project_id). Query BILLING_LOG với TypeORM.  
- Test Criteria: Integration: Auth as admin → Call /billing/report?date_from=2025-10-01, assert CSV file generated with correct headers/data. Edge case: Non-admin call trả 403, empty data trả empty CSV.  
- **Sample Artifacts**: Postman collection JSON cho report test (import để test export). Copy vào billing-report.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Billing Report Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Get Report",
        "request": {
          "method": "GET",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "url": {
            "raw": "{{base_url}}/billing/report?date_from=2025-10-01",
            "host": ["{{base_url}}"],
            "path": ["billing", "report"],
            "query": [
              { "key": "date_from", "value": "2025-10-01" }
            ]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
  (Assert response has file link).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CSV issues (e.g., encoding).

**Story 6-3: CI/CD Update Và Tests Cho Billing (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional (CI/CD từ BRD). Mục đích: Auto test billing để đảm bảo logging và reporting đúng.  
- **Acceptance Criteria**:  
  - Given code push, When CI runs, Then pass with billing tests.  
  - Given invalid log data, When test, Then fail with error log.  
- **Risk Mitigation**: Risk: CI timeout do CSV generation → Mitigate: Mock DB data nhỏ. Risk: Test coverage thấp → Mitigate: Aim 70% coverage.  
- Sub-task 1: Update /.github/workflows/test-backend.yaml, thêm steps run billing service, test /billing/report. Sample artifact:  
  ```yaml
  jobs:
    test:
      runs-on: ubuntu-latest
      services:
        postgres: { image: postgres:15, env: { POSTGRES_USER: admin, POSTGRES_PASSWORD: secret, POSTGRES_DB: chatai }, ports: ['5432:5432'] }
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with: { node-version: 18 }
        - run: npm ci
        - run: npm run typeorm migration:run
        - run: npm test -- --selectProjects billing
  ```  
- Sub-task 2: Add "test:billing": "jest src/billing" in package.json.  
- Test Criteria: Push → GitHub Actions green. Edge case: Fail nếu log entry sai format.  
- **Sample Artifacts**: Seed data JSON cho billing test (populate BILLING_LOG). Copy vào billing-seed-data.json:  
  ```json
  [
    {
      "user_id": 1,
      "project_id": 1,
      "conversation_id": 1,
      "agent_id": 1,
      "tokens": 100,
      "cost": 0.02,
      "timestamp": "2025-10-01T10:00:00Z"
    }
  ]
  ```  
  (Chạy seed script để test report).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI billing test failures.

**Dependencies**: Milestone 5 (ChatOrch để trigger billing). Branch: feature/milestone-6-billing.  
**Deliverable**: Billing API log usage và export CSV report, testable via Postman (auth → chat → check BILLING_LOG → get report). Total: 8 hours (~1 day).  
**Jira**: Epic "Phase 1", link US-007, API Spec (/billing/report). Demo: Postman flow (chat → report CSV).

---

### Milestone 7: Frontend Basic (Web First)

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 6 complete (Billing integrated). Next.js project init ở /frontend/web (npx create-next-app@latest web --typescript --tailwind). Cần npm i axios socket.io-client cho API/WebSocket. DB/API từ backend local (localhost:3000).  
- Assumptions: Dev quen React/Next.js và Tailwind. Focus web trước, mobile sau. Buffer thời gian cho UI debugging hoặc API integration. Môi trường: .env.local có NEXT_PUBLIC_API_URL=http://localhost:3000.  
- Communication: Update Jira/Slack #dev-frontend nếu UI responsive issues. PR review check accessibility và API calls. Kickoff meeting (15 mins) align về UI components và flow (login → projects → chat).  

**Story 7-1: Implement Auth Pages (Estimate: 3 hours, Assignee: Frontend Dev)**  
- **Reference/Mục Đích:** US-001 (Đăng ký/Đăng nhập). Mục đích: UI cho signup/login, integrate với backend auth để get JWT.  
- **Acceptance Criteria**:  
  - Given user enters credentials, When submit login, Then redirect to dashboard with JWT stored in localStorage.  
  - Given invalid credentials, When submit, Then show error message.  
- **Risk Mitigation**: Risk: JWT storage insecure → Mitigate: Use httpOnly cookie thay localStorage cho production. Risk: CORS error → Mitigate: Config proxy in next.config.js.  
- Sub-task 1: Install dependencies (npm i axios @types/node). Tạo pages/auth/login/page.tsx với form (useState cho input, axios POST /auth/login). Sample artifact:  
  ```tsx
  'use client';
  import { useState } from 'react';
  import axios from 'axios';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        window.location.href = '/projects';
      } catch (err) {
        alert('Invalid credentials');
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    );
  }
  ```  
- Sub-task 2: Tạo signup/page.tsx tương tự. Thêm protected route logic (check localStorage token). Tham khảo: https://nextjs.org/docs/app/building-your-application/routing.  
- Test Criteria: Unit (React Testing Library): Test form submission, e.g., `fireEvent.submit(form); expect(localStorage.getItem('token')).toBeDefined()`. Integration: Run Next.js, browser login → Assert redirect to /projects. Edge case: Invalid login shows error.  
- **Sample Artifacts**: Postman collection JSON cho frontend API calls (test backend from UI, nhưng use in Postman to mock). Copy vào auth-ui.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Auth UI Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Login from UI",
        "request": {
          "method": "POST",
          "body": {
            "mode": "raw",
            "raw": "{ \"email\": \"test@example.com\", \"password\": \"pass123\" }"
          },
          "url": {
            "raw": "{{base_url}}/auth/login",
            "host": ["{{base_url}}"],
            "path": ["auth", "login"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" }
    ]
  }
  ```  
  (Use to simulate UI calls).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, UI form validation issues.

**Story 7-2: Implement Projects & Threads UI (Estimate: 4 hours, Assignee: Frontend Dev)**  
- **Reference/Mục Đích:** US-005, US-009. Mục đích: Sidebar cho projects/threads, integrate với backend để list/create.  
- **Acceptance Criteria**:  
  - Given authenticated user, When load /projects, Then sidebar shows user's projects and threads.  
  - Given click create project, When submit, Then new project added to list.  
- **Risk Mitigation**: Risk: API call fail → Mitigate: Add loading/error states. Risk: Responsive sidebar → Mitigate: Use Tailwind for mobile-first.  
- Sub-task 1: Tạo pages/projects/page.tsx với sidebar component (useState cho list, axios GET /projects). Sample artifact:  
  ```tsx
  'use client';
  import { useEffect, useState } from 'react';
  import axios from 'axios';

  export default function Projects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
      axios.get('/api/projects', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => setProjects(res.data));
    }, []);
    return (
      <div className="flex">
        <aside className="w-64 bg-gray-100 p-4">
          {projects.map(p => <div key={p.id}>{p.name}</div>)}
        </aside>
        <main>Main content</main>
      </div>
    );
  }
  ```  
- Sub-task 2: Add create form, POST /projects. Integrate threads list in sidebar. Tham khảo: https://tailwindcss.com/docs/responsive-design.  
- Test Criteria: Unit: Test component render, e.g., `render(<Projects />); expect(screen.getByText('Project Name')).toBeInTheDocument()`. Integration: Browser load /projects → Assert sidebar populated. Edge case: No token redirect to login.  
- **Sample Artifacts**: Seed data JSON cho projects test UI (populate DB để render list). Copy vào projects-seed-data.json:  
  ```json
  [
    {
      "name": "Test Project 1",
      "owner": { "id": 1 }
    },
    {
      "name": "Test Project 2",
      "owner": { "id": 1 }
    }
  ]
  ```  
  (Chạy seed script trước load UI).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, sidebar responsive issues.

**Story 7-3: Implement Chat Interface (Estimate: 4 hours, Assignee: Frontend Dev)**  
- **Reference/Mục Đích:** US-002. Mục đích: UI chat với input, message list, integrate với backend để send/receive.  
- **Acceptance Criteria**:  
  - Given in thread, When type message, Then send to backend and display AI response.  
  - Given no messages, When load, Then show empty state.  
- **Risk Mitigation**: Risk: Real-time lag → Mitigate: Use Socket.io cho streaming. Risk: UI overflow → Mitigate: CSS scroll for message list.  
- Sub-task 1: Tạo components/ChatInput.tsx và MessageList.tsx. Sample artifact:  
  ```tsx
  'use client';
  import { useState } from 'react';
  import axios from 'axios';

  export default function ChatInput({ threadId }: { threadId: string }) {
    const [message, setMessage] = useState('');
    const handleSend = async () => {
      const res = await axios.post(`/api/projects/1/conversations/${threadId}/messages`, { content: message });
      // Update message list with res.data
      setMessage('');
    };
    return (
      <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
    );
  }
  ```  
- Sub-task 2: Integrate in pages/chat/[threadId]/page.tsx, GET messages history. Tham khảo: https://socket.io/how-to/use-with-react.  
- Test Criteria: Unit: Test input onKeyPress. Integration: Browser chat → Send message → Assert message list updates with AI response. Edge case: Empty thread shows "No messages".  
- **Sample Artifacts**: Postman collection JSON cho chat UI test (simulate backend calls from UI). Copy vào chat-ui.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Chat UI Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Send Message",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"content\": \"Hello\" }"
          },
          "url": {
            "raw": "{{base_url}}/projects/1/conversations/thread-123/messages",
            "host": ["{{base_url}}"],
            "path": ["projects", "1", "conversations", "thread-123", "messages"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
  (Assert response adds to UI list).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, chat UI lag issues.

**Story 7-4: E2E Tests Và CI/CD Update (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional (Observability từ SRS). Mục đích: Test full flow (auth → projects → chat) để đảm bảo UI integration.  
- **Acceptance Criteria**:  
  - Given login, When run E2E test, Then chat flow completes without errors.  
  - Given CI push, When run, Then frontend tests pass.  
- **Risk Mitigation**: Risk: E2E flakiness → Mitigate: Use retries in Cypress. Risk: CI build slow → Mitigate: Cache Next.js build.  
- Sub-task 1: Install cypress (npm i cypress --save-dev). Tạo cypress/e2e/auth-to-chat.cy.js với flow test. Sample artifact:  
  ```javascript
  describe('Auth to Chat Flow', () => {
    it('logs in and sends message', () => {
      cy.visit('/auth/login');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('pass123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/projects');
      cy.visit('/chat/thread-123');
      cy.get('input').type('Hello');
      cy.get('input').type('{enter}');
      cy.contains('AI response').should('be.visible');
    });
  });
  ```  
- Sub-task 2: Update CI/CD (/.github/workflows/test-frontend.yaml) để run Cypress.  
- Test Criteria: Run `npx cypress run`, assert test pass. CI: Actions green. Edge case: Failed login halts flow.  
- **Sample Artifacts**: Cypress config sample (cypress.config.js cho E2E):  
  ```javascript
  const { defineConfig } = require('cypress');

  module.exports = defineConfig({
    e2e: {
      baseUrl: 'http://localhost:3000',
      setupNodeEvents(on, config) {
        // Implement plugins
      },
    },
  });
  ```  
  (Run `npx cypress open` to test).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, E2E test failures.

**Dependencies**: Milestone 6 (Billing, nhưng optional cho UI). Branch: feature/milestone-7-frontend.  
**Deliverable**: Web app chạy local với auth, projects, chat UI, E2E testable. Total: 13 hours (~2 days).  
**Jira**: Epic "Phase 1", link US-001,002,005,009. Demo: Browser flow (login → chat).

---

### Milestone 8: Voice & File Upload

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 7 complete (Web UI basic). Backend chat-orch hỗ trợ attachments. Cần Web Speech API cho voice, Whisper cho STT (Python in chat-orch nếu cần). S3 local (MinIO) cho file storage.  
- Assumptions: Dev quen browser APIs (Web Speech) và file upload (FormData). Buffer cho transcription accuracy test. Môi trường: .env.local có S3_ENDPOINT.  
- Communication: Update Jira/Slack #dev-voice nếu STT errors. PR review check privacy (voice data). Kickoff meeting (15 mins) align flow (record → transcribe → send as text).  

**Story 8-1: Voice Input & TTS Output (Estimate: 4 hours, Assignee: Frontend/Backend Dev)**  
- **Reference/Mục Đích:** US-003 (Voice input & TTS output). Mục đích: Record voice → transcribe to text → send to chat, TTS response.  
- **Acceptance Criteria**:  
  - Given user clicks record, When speak, Then transcribe text sent to chat.  
  - Given AI response, When TTS play, Then audio plays.  
- **Risk Mitigation**: Risk: Browser permission denied → Mitigate: Prompt user permission. Risk: Transcription accuracy low → Mitigate: Test with Whisper backend.  
- Sub-task 1: Tạo components/VoiceRecorder.tsx dùng Web Speech API. Sample artifact:  
  ```tsx
  'use client';
  import { useState } from 'react';

  export default function VoiceRecorder({ onTranscribe }: { onTranscribe: (text: string) => void }) {
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const startRecording = () => {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.onresult = (event) => onTranscribe(event.results[0][0].transcript);
      rec.start();
      setRecognition(rec);
    };
    return <button onClick={startRecording}>Record Voice</button>;
  }
  ```  
- Sub-task 2: Integrate in ChatInput, backend call Whisper nếu accuracy thấp. Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API.  
- Test Criteria: Unit: Test recognition event. Integration: Browser record → Assert text in input. Edge case: No permission shows error.  
- **Sample Artifacts**: Mock Whisper response JSON cho test (use in backend mock). Copy vào mock-whisper-response.json:  
  ```json
  {
    "text": "Hello, this is transcribed speech",
    "confidence": 0.95
  }
  ```  
  (Use in Jest: `mockResolvedValue(mockResponse)`).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, transcription accuracy issues.

**Story 8-2: Upload File Để Context Cho Chat (Estimate: 4 hours, Assignee: Backend Dev)**  
- **Reference/Mục Đích:** US-004 (Upload file để context cho chat). Mục đích: Upload pdf/txt/image, extract content, attach vào thread context.  
- **Acceptance Criteria**:  
  - Given file selected, When upload, Then file saved in S3 and content extracted to message.  
  - Given invalid file, When upload, Then return 400.  
- **Risk Mitigation**: Risk: File size limit → Mitigate: Config multer max 10MB. Risk: Extract fail (e.g., OCR) → Mitigate: Fallback to text-only.  
- Sub-task 1: Backend: Tạo file.service.ts với multer cho upload, extract (PyPDF2 cho PDF). Sample artifact:  
  ```typescript
  import { UseInterceptors, UploadedFile } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Save to S3, extract text
    return { content: 'Extracted text from file' };
  }
  ```  
- Sub-task 2: Frontend: Add file input in ChatInput, FormData POST. Tham khảo: https://nestjs.com/docs/techniques/file-upload.  
- Test Criteria: Integration: Browser upload file → Assert content in message. Edge case: Large file >10MB trả 413.  
- **Sample Artifacts**: Seed data JSON cho file attachments (populate MESSAGES attachments). Copy vào file-seed-data.json:  
  ```json
  [
    {
      "user_message": "Upload file",
      "attachments": ["s3://bucket/test.pdf"],
      "tokens_used": 50
    }
  ]
  ```  
  (Chạy seed để test context).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, file extract errors.

**Story 8-3: Tests Cho Voice/File (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional. Mục đích: Test voice/file integration.  
- **Acceptance Criteria**:  
  - Given voice input, When E2E test, Then text transcribed.  
  - Given file upload, When test, Then content extracted.  
- **Risk Mitigation**: Risk: E2E browser issues → Mitigate: Use headless Cypress. Risk: Mock STT fail → Mitigate: Use fake audio file.  
- Sub-task 1: Add Cypress tests for voice (mock SpeechRecognition).  
- Sub-task 2: Update CI/CD để run frontend tests với voice/file.  
- Test Criteria: Cypress run pass. CI green. Edge case: Permission denied halts test.  
- **Sample Artifacts**: Cypress test script sample cho voice (cypress/e2e/voice-test.cy.js):  
  ```javascript
  describe('Voice Test', () => {
    it('records and transcribes', () => {
      cy.visit('/chat/thread-123');
      cy.window().then((win) => {
        cy.stub(win, 'SpeechRecognition').as('recognition');
        cy.get('button[record]').click();
        cy.get('@recognition').should('be.called');
      });
    });
  });
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, test flakiness.

**Dependencies**: Milestone 7 (UI basic). Branch: feature/milestone-8-voice-file.  
**Deliverable**: Web UI hỗ trợ voice/file upload, testable (record → transcribe → send). Total: 10 hours (~1.5 days).  
**Jira**: Link US-003,004. Demo: Browser voice/file chat.

---

### Milestone 9: Agent Management Basic

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 8 complete. /services/agent-mgr init với NestJS. Docker registry local nếu test self-hosted.  
- Assumptions: Dev quen CRUD và Docker exec. Buffer cho API key validation. Môi trường: .env có DOCKER_REGISTRY.  
- Communication: Update Jira/Slack #dev-agent nếu Docker deploy fail. PR review check credential security. Kickoff meeting (15 mins) align CRUD flow.  

**Story 9-1: CRUD Agents (Estimate: 4 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-006 (Quản lý AI Agents: Add/Edit/Delete). Mục đích: Admin CRUD agents (external/self-hosted), config API keys.  
- **Acceptance Criteria**:  
  - Given admin, When POST /agents, Then agent saved with type 'external'.  
  - Given invalid agent_id, When DELETE, Then return 404.  
- **Risk Mitigation**: Risk: API key leak → Mitigate: Encrypt in DB. Risk: Type enum invalid → Mitigate: Validate DTO.  
- Sub-task 1: Tạo agent.controller.ts với POST/GET/PUT/DELETE /agents. Sample artifact:  
  ```typescript
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateAgentDto) {
    return this.agentService.create(dto);
  }
  ```  
- Sub-task 2: agent.service.ts, save to AGENTS table (type: 'external|self-hosted', config_json for keys). Tham khảo: https://docs.nestjs.com/techniques/database.  
- Test Criteria: Integration: Admin auth → POST agent, assert in DB. Edge case: Non-admin 403.  
- **Sample Artifacts**: Seed data JSON cho agents (populate DB). Copy vào agent-seed-data.json:  
  ```json
  [
    {
      "name": "OpenAI GPT-4",
      "type": "external",
      "api_endpoint": "https://api.openai.com",
      "config_json": { "api_key": "sk-mock-key" },
      "version": "4.0",
      "active": true
    }
  ]
  ```  
  (Chạy seed script).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CRUD validation issues.

**Story 9-2: Test Connection Và Deploy Self-Hosted (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-006, US-008 (Self-hosted deploy). Mục đích: Test agent connection và trigger Docker deploy.  
- **Acceptance Criteria**:  
  - Given external agent, When test connection, Then return 'pass' if API key valid.  
  - Given self-hosted, When deploy, Then Docker container starts.  
- **Risk Mitigation**: Risk: Docker permission → Mitigate: Run with sudo or Docker user. Risk: Connection timeout → Mitigate: Add 10s timeout.  
- Sub-task 1: POST /agents/:id/test-connection (axios call endpoint).  
- Sub-task 2: POST /agents/:id/deploy (exec docker run nếu self-hosted). Tham khảo: https://docs.docker.com/engine/reference/commandline/run/.  
- Test Criteria: Integration: POST test-connection, assert 'pass'. Edge case: Invalid key 'fail'.  
- **Sample Artifacts**: SQL query sample để test agent table (chạy psql):  
  ```sql
  -- Test agent connection status
  UPDATE agents SET active = true WHERE id = 1;
  SELECT name, active FROM agents WHERE id = 1;  -- Assert active = true
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, Docker deploy errors.

**Story 9-3: CI/CD Update (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional. Mục đích: Auto test agent CRUD.  
- **Acceptance Criteria**:  
  - Given push, When CI runs, Then pass with agent tests.  
- **Risk Mitigation**: Risk: Mock Docker in CI → Mitigate: Use testcontainers.  
- Sub-task 1: Update test-backend.yaml, add agent-mgr tests.  
- Sub-task 2: "test:agent": "jest src/agents".  
- Test Criteria: Actions green. Edge case: Fail nếu connection test mock fail.  
- **Sample Artifacts**: Postman collection JSON cho agent test (import). Copy vào agent-test.postman_collection.json:  
  ```json
  {
    "info": {
      "name": "Agent Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Create Agent",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "body": {
            "mode": "raw",
            "raw": "{ \"name\": \"Test Agent\", \"type\": \"external\", \"api_endpoint\": \"https://test.ai\" }"
          },
          "url": {
            "raw": "{{base_url}}/agents",
            "host": ["{{base_url}}"],
            "path": ["agents"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI agent test failures.

**Dependencies**: Milestone 8. Branch: feature/milestone-9-agent.  
**Deliverable**: Agent CRUD API, test connection/deploy testable. Total: 9 hours (~1.5 days).  
**Jira**: Link US-006,008. Demo: Postman create agent + test.

---

### Milestone 10: Billing Report Full + Mobile PoC

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 9 complete. React Native init /frontend/mobile (npx react-native@latest init Mobile). Expo cho easy build. Backend billing ready.  
- Assumptions: Dev quen React Native và Expo. Mobile PoC chỉ basic (share components with web). Buffer cho device testing. Môi ngữ: .env có API_URL.  
- Communication: Update Jira/Slack #dev-mobile nếu Expo build fail. PR review check cross-platform. Kickoff meeting (15 mins) align PoC scope.  

**Story 10-1: Full Billing Report (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-007. Mục đích: Advanced report với filter per conversation/agent.  
- **Acceptance Criteria**:  
  - Given admin, When GET /billing/report with filters, Then CSV includes conversation_id.  
  - Given no data, When filter, Then return empty CSV.  
- **Risk Mitigation**: Risk: Filter query slow → Mitigate: Add DB index on timestamp. Risk: CSV size large → Mitigate: Stream write.  
- Sub-task 1: Update billing.service.ts với query filters (conversation_id, agent_id). Sample artifact:  
  ```typescript
  async getUsage(query: ReportQueryDto) {
    return this.billingLogRepository.find({
      where: {
        timestamp: Between(query.date_from, query.date_to),
        conversation_id: query.conversation_id,
      },
    });
  }
  ```  
- Sub-task 2: Update controller để include filters.  
- Test Criteria: Integration: Call /report?conversation=1, assert CSV has filtered data. Edge case: Invalid filter 400.  
- **Sample Artifacts**: SQL query sample cho full report test:  
  ```sql
  -- Filtered billing report
  SELECT * FROM billing_log 
  WHERE timestamp BETWEEN '2025-10-01' AND '2025-10-31' AND conversation_id = 1;
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, filter query issues.

**Story 10-2: Mobile PoC (Basic Auth/Chat) (Estimate: 4 hours, Assignee: Frontend Dev)**  
- **Reference/Mục Đích:** BRD (App hỗ trợ như web). Mục đích: PoC mobile với auth/chat, share code with web.  
- **Acceptance Criteria**:  
  - Given Expo run, When login, Then redirect to chat screen.  
  - Given send message, When tap send, Then display AI response.  
- **Risk Mitigation**: Risk: Native modules fail → Mitigate: Use Expo managed workflow. Risk: Screen size issues → Mitigate: Test on iOS/Android simulator.  
- Sub-task 1: Tạo App.tsx với navigation (React Navigation). Sample artifact:  
  ```tsx
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import LoginScreen from './src/screens/LoginScreen';

  const Stack = createStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  ```  
- Sub-task 2: Port LoginScreen và ChatScreen từ web, axios calls. Tham khảo: https://reactnavigation.org/docs/getting-started.  
- Test Criteria: Expo start, simulator login → chat → Assert message sent. Edge case: Offline shows error.  
- **Sample Artifacts**: Expo config sample (app.json cho PoC):  
  ```json
  {
    "expo": {
      "name": "ChatAI Mobile PoC",
      "slug": "chatai-mobile",
      "version": "1.0.0",
      "platforms": ["ios", "android"],
      "extra": {
        "apiUrl": "http://localhost:3000"
      }
    }
  }
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, Expo build issues.

**Story 10-3: Tests Cho Report/Mobile (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional. Mục đích: Test full report và mobile PoC.  
- **Acceptance Criteria**:  
  - Given filter, When E2E test report, Then CSV generated.  
  - Given Expo test, When run, Then mobile flow pass.  
- **Risk Mitigation**: Risk: Mobile test device-dependent → Mitigate: Use Detox for E2E. Risk: CI Expo slow → Mitigate: Run on cloud.  
- Sub-task 1: Add Cypress/Detox tests for report/mobile.  
- Sub-task 2: Update CI/CD cho frontend/mobile.  
- Test Criteria: Tests pass. CI green. Edge case: Empty filter.  
- **Sample Artifacts**: Detox test script sample cho mobile (detox/test/specs/auth.e2e.js):  
  ```javascript
  describe('Auth Flow', () => {
    it('logs in', async () => {
      await device.reloadReactNative();
      await element(by.id('email')).typeText('test@example.com');
      await element(by.id('password')).typeText('pass123');
      await element(by.id('login')).tap();
      await expect(element(by.text('Dashboard'))).toBeVisible();
    });
  });
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, mobile test failures.

**Dependencies**: Milestone 9. Branch: feature/milestone-10-billing-mobile.  
**Deliverable**: Full billing report, mobile PoC testable. Total: 9 hours (~1.5 days).  
**Jira**: Link US-007. Demo: CSV export + Expo app chat.

---

### Milestone 11: Self-Hosted Deploy

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 10 complete. Kubernetes minikube local cho test deploy. Docker registry local.  
- Assumptions: Dev quen K8s basics. Buffer cho pod healthcheck. Môi trường: .env có KUBE_CONFIG.  
- Communication: Update Jira/Slack #dev-deploy nếu K8s cluster issues. PR review check container security. Kickoff meeting (15 mins) align deploy flow.  

**Story 11-1: Docker Deploy Flow (Estimate: 4 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** US-008 (Self-hosted agent deploy). Mục đích: Trigger Docker container for self-hosted agents.  
- **Acceptance Criteria**:  
  - Given self-hosted agent, When POST /deploy, Then container starts and healthcheck pass.  
  - Given invalid image, When deploy, Then return 500.  
- **Risk Mitigation**: Risk: Docker daemon access → Mitigate: Use child_process.exec. Risk: Port conflict → Mitigate: Random port.  
- Sub-task 1: Tạo deploy.service.ts với child_process.exec('docker run'). Sample artifact:  
  ```typescript
  import { exec } from 'child_process';

  async deployAgent(agentId: number) {
    const agent = await this.agentRepository.findOne(agentId);
    exec(`docker run -d -p 8080:80 ${agent.docker_image}`, (err, stdout) => {
      if (err) throw err;
      // Update DB with container_id
    });
  }
  ```  
- Sub-task 2: POST /agents/:id/deploy (admin only). Tham khảo: https://docs.docker.com/engine/reference/commandline/run/.  
- Test Criteria: Integration: POST deploy, check `docker ps` has container. Edge case: Image not found fail.  
- **Sample Artifacts**: Docker command sample cho test (run manual):  
  ```bash
  docker run -d -p 8080:80 hello-world  # Test image pull
  docker ps | grep hello-world  # Assert running
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, Docker exec errors.

**Story 11-2: Healthcheck Và Stop (Estimate: 3 hours, Assignee: Dev Lead)**  
- **Reference/Mục Đích:** US-008. Mục đích: Healthcheck container và stop if needed.  
- **Acceptance Criteria**:  
  - Given running container, When healthcheck, Then return 'healthy'.  
  - Given stop request, When call, Then container stops.  
- **Risk Mitigation**: Risk: Healthcheck timeout → Mitigate: 5s timeout. Risk: Stop orphan containers → Mitigate: Clean up on error.  
- Sub-task 1: GET /agents/:id/healthcheck (axios to port).  
- Sub-task 2: POST /agents/:id/stop (docker stop).  
- Test Criteria: Integration: Deploy → Healthcheck assert 200. Edge case: Unhealthy 500.  
- **Sample Artifacts**: SQL query sample để update agent status:  
  ```sql
  -- Update agent health after check
  UPDATE agents SET active = true WHERE id = 1;
  SELECT * FROM agents WHERE id = 1;  -- Assert active = true
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, healthcheck false positives.

**Story 11-3: CI/CD Update (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional. Mục đích: Auto test deploy in CI.  
- **Acceptance Criteria**:  
  - Given push, When CI runs, Then deploy test pass.  
- **Risk Mitigation**: Risk: CI Docker conflict → Mitigate: Use testcontainers.  
- Sub-task 1: Update test-backend.yaml, add deploy mock.  
- Sub-task 2: "test:deploy": "jest src/deploy".  
- Test Criteria: Actions green. Edge case: Fail if stop not clean.  
- **Sample Artifacts**: Postman collection JSON cho deploy test:  
  ```json
  {
    "info": {
      "name": "Deploy Test",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Deploy Agent",
        "request": {
          "method": "POST",
          "header": [
            { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
          ],
          "url": {
            "raw": "{{base_url}}/agents/1/deploy",
            "host": ["{{base_url}}"],
            "path": ["agents", "1", "deploy"]
          }
        }
      }
    ],
    "variable": [
      { "key": "base_url", "value": "http://localhost:3000" },
      { "key": "jwt_token", "value": "your_jwt_here" }
    ]
  }
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, CI deploy failures.

**Dependencies**: Milestone 10. Branch: feature/milestone-11-deploy.  
**Deliverable**: Self-hosted deploy API, testable with Docker local. Total: 9 hours (~1.5 days).  
**Jira**: Link US-008. Demo: Postman deploy + docker ps.

---

### Milestone 12: ML Training PoC

**Prerequisites/Assumptions**:  
- Yêu cầu: Milestone 11 complete. /services/ml-training init với Python/FastAPI (pip install fastapi uvicorn transformers torch). Hugging Face token nếu fine-tune. GPU optional (local NVIDIA).  
- Assumptions: Dev quen Python ML basics. PoC fine-tune simple model (e.g., DistilBERT). Buffer cho training time (5-10 mins). Môi trường: .env có HUGGINGFACE_TOKEN.  
- Communication: Update Jira/Slack #dev-ml nếu training fail (e.g., OOM). PR review check model security. Kickoff meeting (15 mins) align PoC params.  

**Story 12-1: Training Endpoint (Estimate: 4 hours, Assignee: ML Engineer/Dev Lead)**  
- **Reference/Mục Đích:** US-010 (Tạo và train AI agent tự build). Mục đích: Trigger training từ opensource model (Hugging Face), config params.  
- **Acceptance Criteria**:  
  - Given model URL and dataset, When POST /train, Then model fine-tuned and saved.  
  - Given invalid params, When train, Then return 400.  
- **Risk Mitigation**: Risk: Training OOM → Mitigate: Use small batch_size=4. Risk: Dataset download fail → Mitigate: Mock dataset for PoC.  
- Sub-task 1: Tạo main.py với FastAPI endpoint /train. Sample artifact:  
  ```python
  from fastapi import FastAPI
  from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments

  app = FastAPI()

  @app.post("/train")
  async def train_agent(body: dict):
      model_name = body["model_source"]  # e.g., "distilbert-base-uncased"
      tokenizer = AutoTokenizer.from_pretrained(model_name)
      model = AutoModelForSequenceClassification.from_pretrained(model_name)
      # Training logic with Trainer
      training_args = TrainingArguments(output_dir="./results", num_train_epochs=3)
      trainer = Trainer(model=model, args=training_args)
      trainer.train()
      model.save_pretrained("./trained-model")
      return {"status": "trained", "model_path": "./trained-model"}
  ```  
- Sub-task 2: Integrate dataset from body (e.g., Hugging Face dataset). Tham khảo: https://huggingface.co/docs/transformers/training.  
- Test Criteria: Unit (Pytest): Test trainer init. Integration: POST /train with mock dataset, assert model saved. Edge case: Invalid model 400.  
- **Sample Artifacts**: Mock dataset JSON cho training PoC (use in /train body). Copy vào mock-dataset.json:  
  ```json
  [
    { "text": "Sample input", "label": 0 },
    { "text": "Another sample", "label": 1 }
  ]
  ```  
  (Pass as body.dataset_url or inline).  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, training time/accuracy.

**Story 12-2: Docker Integration Và Deploy Trained Model (Estimate: 3 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** US-010. Mục đích: Deploy model đã train vào Docker cho self-hosted agent.  
- **Acceptance Criteria**:  
  - Given trained model, When deploy, Then container starts with model loaded.  
  - Given stop, When call, Then container stops.  
- **Risk Mitigation**: Risk: Model size large → Mitigate: Use slim Docker image. Risk: GPU not available → Mitigate: CPU fallback.  
- Sub-task 1: POST /models/deploy, exec docker build/run with model path. Sample artifact:  
  ```python
  import subprocess

  @app.post("/deploy")
  async def deploy_model(body: dict):
      model_path = body["model_path"]
      subprocess.run(["docker", "build", "-t", "trained-agent", ".", "--build-arg", f"MODEL_PATH={model_path}"])
      subprocess.run(["docker", "run", "-d", "trained-agent"])
      return {"status": "deployed"}
  ```  
- Sub-task 2: Healthcheck model endpoint. Tham khảo: https://huggingface.co/docs/transformers/model_doc/distilbert.  
- Test Criteria: Integration: Train → Deploy → Assert docker ps has container. Edge case: Build fail 500.  
- **Sample Artifacts**: Dockerfile sample cho model deploy:  
  ```dockerfile
  FROM python:3.12-slim
  ARG MODEL_PATH=./trained-model
  COPY $MODEL_PATH /app/model
  RUN pip install transformers torch fastapi
  CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, Docker build errors.

**Story 12-3: Tests Cho ML PoC (Estimate: 2 hours, Assignee: DevOps)**  
- **Reference/Mục Đích:** Non-functional. Mục đích: Test training/deploy.  
- **Acceptance Criteria**:  
  - Given PoC run, When test, Then model trains and deploys.  
- **Risk Mitigation**: Risk: Test training slow → Mitigate: Use tiny dataset. Risk: CI GPU → Mitigate: CPU-only test.  
- Sub-task 1: Add Pytest for /train, mock Hugging Face.  
- Sub-task 2: Update CI/CD cho Python service.  
- Test Criteria: Pytest pass. CI green. Edge case: Invalid params fail.  
- **Sample Artifacts**: Pytest script sample (tests/test_train.py):  
  ```python
  import pytest
  from fastapi.testclient import TestClient
  from main import app

  client = TestClient(app)

  def test_train():
      response = client.post("/train", json={"model_source": "distilbert-base-uncased", "dataset": []})
      assert response.status_code == 200
      assert "trained" in response.json()["status"]
  ```  
- **Feedback Loop**: Comment trên Jira ticket: Actual hours, ML test failures.

**Dependencies**: Milestone 11. Branch: feature/milestone-12-ml.  
**Deliverable**: ML PoC training/deploy, testable. Total: 9 hours (~1.5 days).  
**Jira**: Link US-010. Demo: POST /train → deploy → test model.

---





