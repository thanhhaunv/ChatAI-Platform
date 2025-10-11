# M2 ROADMAP: AUTH SERVICE (WEEK 2)

**Phase:** Phase 1 - Backend Core  
**Sprint:** Sprint 1 (Week 2 of 2)  
**Duration:** 5 days (Mon-Fri)  
**Story Points:** 13  
**Jira:** CAP-7  
**Team:** Backend Dev 1 (Lead)

---

## 📋 OVERVIEW

**Goal:** Build complete authentication service with email/phone signup, OAuth (Google/Facebook/TikTok), and JWT tokens.

**What we're building:**
- Email/phone signup with validation
- Login with password verification (bcrypt)
- OAuth flows (Google, Facebook, TikTok)
- JWT token generation (access + refresh)
- Password reset functionality
- Email verification (basic)

**Technologies:**
- NestJS
- Passport.js (strategies)
- bcrypt (password hashing)
- @nestjs/jwt (token generation)
- class-validator (DTO validation)

**Build on M1:**
- Use User entity from database
- Store auth data in PostgreSQL
- Integrate with existing CI/CD

---

## 📊 COMPLEXITY ANALYSIS

### Tasks Breakdown

| Task | Complexity | Time | Dependencies |
|------|-----------|------|--------------|
| Email/Phone Signup | Medium | 4h | M1 User entity |
| Login with bcrypt | Medium | 3h | Signup |
| JWT Strategy | Medium | 3h | Login |
| OAuth Google | High | 4h | JWT setup |
| OAuth Facebook | Medium | 3h | OAuth Google |
| OAuth TikTok | Low | 1h | Mock/Skip |
| Password Reset | Medium | 3h | Email service |
| Email Verification | Low | 2h | Email service |
| Tests (unit + e2e) | High | 6h | All features |
| Documentation | Low | 2h | - |
| CI/CD Update | Low | 1h | - |

**Total:** ~32 hours estimated
**Team capacity:** 5 days × 4 hours = 20 hours
**Risk:** Overcommit by 12 hours

---

## 🎯 PROPOSED APPROACH

### Option 1: Full Implementation (Aggressive - NOT RECOMMENDED)
**All features in 5 days**
- ✅ Pros: Complete auth system
- ❌ Cons: High risk, low test coverage, burnout
- ⚠️ Risk: 60% chance of missing deadline

### Option 2: MVP Focused (RECOMMENDED) ⭐
**Core features + defer complex ones**

**Week 2 (This sprint):**
- ✅ Email/Phone Signup
- ✅ Login with bcrypt
- ✅ JWT tokens (access + refresh)
- ✅ OAuth Google (most common)
- ✅ OAuth Facebook
- ✅ Basic tests (>70% coverage)
- ✅ Documentation

**Defer to M2.5 or M3:**
- ⏳ OAuth TikTok (needs approval anyway)
- ⏳ Password Reset (can use email later)
- ⏳ Email Verification (nice to have)

**Time:** ~23 hours → Fits in 5 days with 3h buffer ✅

### Option 3: Split Milestone
**M2 Part 1:** Email/Phone + JWT (3 days)
**M2 Part 2:** OAuth integration (2 days)

---

## 📅 DAY-BY-DAY PLAN (OPTION 2 - RECOMMENDED)

### **Day 1 (Monday): Project Setup + Signup**
**Time:** 4 hours

**Tasks:**
- Initialize auth-service (NestJS)
- Install dependencies (passport, jwt, bcrypt)
- Create auth module structure
- Implement email/phone signup endpoint
- DTO validation with class-validator
- Password hashing with bcrypt
- Save to User table (from M1)

**Deliverable:** 
- `POST /auth/signup` working
- User created in database with hashed password

**Files created:**
- `services/auth-service/src/auth/*`
- `auth.module.ts`, `auth.controller.ts`, `auth.service.ts`
- `dto/signup.dto.ts`

---

### **Day 2 (Tuesday): Login + JWT Tokens**
**Time:** 4 hours

**Tasks:**
- Implement login endpoint
- Validate email/password
- Compare bcrypt hash
- Generate JWT access token (expires 1h)
- Generate refresh token (expires 7d)
- Return tokens in response
- Add JWT strategy with Passport
- Create auth guard

**Deliverable:**
- `POST /auth/login` working
- JWT tokens returned
- Protected routes testable

**Files created:**
- `dto/login.dto.ts`
- `strategies/jwt.strategy.ts`
- `guards/jwt-auth.guard.ts`

---

### **Day 3 (Wednesday): OAuth Google**
**Time:** 4 hours

**Tasks:**
- Install passport-google-oauth20
- Create Google OAuth strategy
- Implement redirect flow
- Handle callback with profile data
- Create user if not exists (by email)
- Link OAuth account to existing user
- Return JWT tokens
- Test with Google Developer Console

**Deliverable:**
- `GET /auth/google` (initiates OAuth)
- `GET /auth/google/callback` (handles return)
- Google login working end-to-end

**Files created:**
- `strategies/google.strategy.ts`
- `guards/google-auth.guard.ts`

---

### **Day 4 (Thursday): OAuth Facebook + Refresh Token**
**Time:** 4 hours

**Morning (2h): Facebook OAuth**
- Install passport-facebook
- Create Facebook strategy (similar to Google)
- Handle Facebook callback
- Test with Facebook Developer Console

**Afternoon (2h): Refresh Token Endpoint**
- Implement `POST /auth/refresh`
- Validate refresh token
- Generate new access token
- Rotate refresh token (optional)
- Add to JWT strategy

**Deliverable:**
- Facebook OAuth working
- Token refresh working
- Both tested

**Files created:**
- `strategies/facebook.strategy.ts`
- `dto/refresh-token.dto.ts`

---

### **Day 5 (Friday): Testing + Documentation + PR**
**Time:** 4 hours

**Morning (2h): Tests**
- Unit tests for auth.service (signup, login, hash)
- E2E tests for auth endpoints
- OAuth mock tests (without real providers)
- Aim for >70% coverage

**Afternoon (2h): Documentation + PR**
- Update README
- Add Swagger docs for all endpoints
- Update CI/CD (if needed)
- Create PR
- Self-review
- Demo prep

**Deliverable:**
- All tests passing
- Documentation complete
- PR ready for review
- M2 demo script

**Files created:**
- `auth.service.spec.ts`
- `test/auth.e2e-spec.ts`
- `README.md`
- `docs/AUTH-FLOW.md`

---

## 🎯 DEFERRED FEATURES (NOT IN WEEK 2)

### To be implemented later:

**TikTok OAuth** (M2.5 or M3)
- Reason: Requires app approval (takes 3-5 days)
- Alternative: Mock for now, implement when approved
- Impact: Low (least common OAuth provider)

**Password Reset** (M3 or M6.5)
- Reason: Needs email service (nodemailer) setup
- Requires: SMTP configuration, email templates
- Impact: Medium (users can still signup/login)
- Workaround: Admin can reset passwords manually

**Email Verification** (M3 or M6.5)
- Reason: Needs email service
- Requires: Verification token system
- Impact: Low (can mark email_verified=true by default for MVP)

---

## 📊 REALISTIC TIMELINE

```
Day 1: Setup + Signup           [████████░░] 80% confidence
Day 2: Login + JWT              [████████░░] 80% confidence  
Day 3: OAuth Google             [██████░░░░] 60% confidence (external dependency)
Day 4: OAuth Facebook + Refresh [██████░░░░] 60% confidence
Day 5: Tests + Docs + PR        [████████░░] 80% confidence

Overall M2 Success:             [███████░░░] 70% confidence
```
```
M2: Auth Service (Week 2)
├── M2-Overview.md (tổng quan - đã có rồi)
├── Day 1: Setup + Signup
│   ├── M2-Day1-Part1-Project-Setup.md (~500 lines)
│   └── M2-Day1-Part2-Signup-Implementation.md (~500 lines)
├── Day 2: Login + JWT
│   ├── M2-Day2-Part1-Login.md (~400 lines)
│   └── M2-Day2-Part2-JWT-Strategy.md (~500 lines)
├── Day 3: OAuth Google
│   ├── M2-Day3-Part1-OAuth-Setup.md (~400 lines)
│   └── M2-Day3-Part2-Google-Integration.md (~500 lines)
├── Day 4: OAuth Facebook + Refresh
│   ├── M2-Day4-Part1-Facebook-OAuth.md (~400 lines)
│   └── M2-Day4-Part2-Refresh-Token.md (~400 lines)
└── Day 5: Testing + PR
    ├── M2-Day5-Part1-Tests.md (~500 lines)
    └── M2-Day5-Part2-Documentation-PR.md (~400 lines)
```
Total: 10 files nhỏ

**Risk Factors:**
- OAuth providers may have API changes
- Google/Facebook developer console setup issues
- Callback URL configuration problems
- Test environment OAuth mocking complexity

**Mitigation:**
- Use API keys from Phase 0 (already setup)
- Mock OAuth in tests (don't hit real APIs)
- Detailed error logging
- Have fallback to email-only login

---

## 🎯 SUCCESS CRITERIA

### Must Have (Week 2):
- ✅ Email/Phone signup working
- ✅ Login with password working
- ✅ JWT tokens generated (access + refresh)
- ✅ OAuth Google working
- ✅ OAuth Facebook working
- ✅ Tests >70% coverage
- ✅ CI/CD passing
- ✅ Documentation complete

### Nice to Have (Can defer):
- ⏳ OAuth TikTok
- ⏳ Password reset
- ⏳ Email verification
- ⏳ 2FA (way future)

### Definition of Done:
- All endpoints return correct responses
- Passwords hashed with bcrypt
- JWT tokens expire correctly
- OAuth providers link accounts
- All tests passing in CI
- Swagger docs complete
- Merged to develop

---

## 🔗 DEPENDENCIES

### From M1:
- ✅ User entity (with auth fields)
- ✅ Database connection
- ✅ TypeORM setup
- ✅ CI/CD pipeline

### External:
- ⚠️ Google OAuth API (have keys from Phase 0)
- ⚠️ Facebook OAuth API (have keys from Phase 0)
- ⚠️ TikTok OAuth API (NOT ready - app needs approval)

### New Dependencies:
- `@nestjs/passport`
- `@nestjs/jwt`
- `passport`
- `passport-local`
- `passport-google-oauth20`
- `passport-facebook`
- `bcrypt`
- `class-validator`
- `class-transformer`

---

## 📁 FILE STRUCTURE PREVIEW

```
services/auth-service/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── signup.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   └── refresh-token.dto.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.ts
│   │   │   ├── google.strategy.ts
│   │   │   └── facebook.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── local-auth.guard.ts
│   │   │   ├── google-auth.guard.ts
│   │   │   └── facebook-auth.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── auth.e2e-spec.ts
│   └── jest-e2e.json
├── docs/
│   └── AUTH-FLOW.md
└── README.md
```

**Estimated files:** ~20 files
**Estimated LOC:** ~1,500 lines

---

## 🎨 API ENDPOINTS PREVIEW

```
POST   /auth/signup              # Email/phone signup
POST   /auth/login               # Email/phone login
POST   /auth/refresh             # Refresh access token
GET    /auth/google              # Initiate Google OAuth
GET    /auth/google/callback     # Google OAuth callback
GET    /auth/facebook            # Initiate Facebook OAuth
GET    /auth/facebook/callback   # Facebook OAuth callback

# Protected route example (for testing)
GET    /auth/profile             # Get current user (JWT required)
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (60% of tests):
- auth.service.ts methods
  - signup() - creates user with hashed password
  - login() - validates credentials
  - validateUser() - checks email/password
  - generateTokens() - creates JWT

### E2E Tests (30% of tests):
- POST /auth/signup → 201 with user data
- POST /auth/login → 200 with tokens
- POST /auth/refresh → 200 with new token
- GET /auth/profile (with JWT) → 200 with user
- GET /auth/profile (no JWT) → 401

### OAuth Tests (10% of tests):
- Mock Passport strategies
- Test profile data extraction
- Test account linking logic

**Coverage target:** >70% (same as M1)

---

## 💾 DATABASE CHANGES

**No new tables needed!** ✅

Using existing User entity from M1:
- `email` (unique)
- `phone` (unique)
- `password` (hashed)
- `auth_provider` (email, google, facebook)
- `oauth_id` (provider ID)
- `email_verified` (boolean)

**Possible minor updates:**
- Add index on `oauth_id` (if performance issue)
- Add `refresh_token` field (optional, can store in memory/Redis)

---

## 📝 DOCUMENTATION PLAN

### README.md
- Quick start guide
- Environment variables
- API endpoints list
- Testing instructions

### docs/AUTH-FLOW.md
- Sequence diagrams (Mermaid)
- OAuth flow explanation
- JWT token lifecycle
- Password hashing strategy

### Swagger/OpenAPI
- All endpoints documented
- Request/response examples
- Auth decorators (@ApiBearerAuth)

---

## 🚨 RISKS & MITIGATION

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| OAuth provider API changes | High | Low | Use stable API versions, have tests |
| Callback URL not working | High | Medium | Test thoroughly, use ngrok for local |
| bcrypt performance issues | Medium | Low | Use async methods, 10 rounds |
| JWT secret leak | Critical | Low | Use env vars, never commit |
| Time overrun | Medium | Medium | Defer TikTok/password reset |
| Test coverage <70% | Medium | Low | Write tests alongside code |

---

## 🎯 DECISION POINTS FOR YOU

### Question 1: Content Generation Strategy
**How should I generate M2 content?**

**Option A: Day-by-Day (like M1)** ⭐ RECOMMENDED
- 5 separate files (M2-Day1.md, M2-Day2.md, etc.)
- Detailed step-by-step for each day
- Full copy-paste code
- Pros: Easy to follow, manageable chunks
- Cons: 5 separate artifacts

**Option B: Feature-by-Feature**
- 1 file per feature (Signup.md, Login.md, OAuth.md)
- Complete implementation per feature
- Pros: Logical grouping
- Cons: Harder to track daily progress

**Option C: Single Large File**
- One M2-Complete.md with all 5 days
- Everything in sequence
- Pros: One artifact
- Cons: Very long, harder to navigate

**My recommendation:** Option A (Day-by-Day like M1)

---

### Question 2: OAuth Scope
**Which OAuth providers to implement?**

**Option A: All 3 (Google + Facebook + TikTok)**
- Pros: Complete as designed
- Cons: TikTok needs approval, might delay
- Time: 8 hours total

**Option B: Google + Facebook only** ⭐ RECOMMENDED
- Pros: Most common, have API keys ready
- Cons: Missing TikTok (can add in M2.5)
- Time: 7 hours total

**Option C: Google only**
- Pros: Fastest, most users
- Cons: Limited provider choice
- Time: 4 hours total

**My recommendation:** Option B (Google + Facebook)

---

### Question 3: Email Service
**Implement email verification now?**

**Option A: Full email service in M2**
- Setup nodemailer
- Verification tokens
- Email templates
- Pros: Complete signup flow
- Cons: Adds 4-5 hours, external SMTP dependency
- Time: +5 hours

**Option B: Defer to M6.5 (Notification Service)** ⭐ RECOMMENDED
- Skip email verification for now
- Mark all signups as verified (for MVP)
- Implement properly with notification service
- Pros: Focused on core auth, faster
- Cons: No real email verification in MVP
- Time: 0 hours

**My recommendation:** Option B (Defer)

---

### Question 4: Testing Depth
**How detailed should tests be?**

**Option A: Comprehensive (like M1)**
- Unit tests for all methods
- E2E for all endpoints
- OAuth mock tests
- Edge cases covered
- Target: >80% coverage
- Time: 6 hours

**Option B: Essential only** ⭐ RECOMMENDED
- Unit tests for core logic
- E2E for main flows
- Basic OAuth tests
- Target: >70% coverage
- Time: 4 hours

**Option C: Minimal**
- E2E only
- Target: >60% coverage
- Time: 2 hours (NOT RECOMMENDED)

**My recommendation:** Option B (Essential)

---

## 📊 FINAL RECOMMENDATION

**Proposed M2 Scope for Week 2:**

✅ **Include:**
1. Email/Phone Signup with validation
2. Login with bcrypt password check
3. JWT access + refresh tokens
4. OAuth Google (full flow)
5. OAuth Facebook (full flow)
6. Essential tests (>70% coverage)
7. Swagger documentation
8. Auth flow diagrams

⏳ **Defer to later:**
1. OAuth TikTok → M2.5 or M3 (after approval)
2. Password reset → M6.5 (with email service)
3. Email verification → M6.5 (with email service)
4. 2FA → Phase 2 or 3

**Estimated time:** 23 hours
**Available time:** 20 hours (5 days × 4h)
**Buffer:** -3 hours (slightly over, but manageable with focus)

**Success probability:** 75% ✅

---

## 🎯 YOUR DECISION

**Please tell me:**

1. **Content format:** Day-by-Day (A), Feature-by-Feature (B), or Single File (C)?
   - My vote: **A (Day-by-Day like M1)**

2. **OAuth scope:** All 3 (A), Google+Facebook (B), or Google only (C)?
   - My vote: **B (Google + Facebook)**

3. **Email service:** Implement now (A) or Defer (B)?
   - My vote: **B (Defer to M6.5)**

4. **Testing depth:** Comprehensive (A), Essential (B), or Minimal (C)?
   - My vote: **B (Essential >70%)**

**Hoặc bạn có thể nói:**
- "OK theo recommendation" → Tôi làm theo votes của tôi
- "Thay đổi X thành Y" → Tôi adjust

**Bạn quyết định như thế nào?** 🚀
