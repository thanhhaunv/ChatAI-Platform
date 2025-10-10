import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TikTokAuthGuard extends AuthGuard('tiktok') {}
```

#### 9.3 Roles Guard

Create `src/auth/guards/roles.guard.ts`:

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@chatai/shared';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

---

### **Step 10: Create Decorators (15 min)**

#### 10.1 Current User Decorator

Create `src/auth/decorators/current-user.decorator.ts`:

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

#### 10.2 Roles Decorator

Create `src/auth/decorators/roles.decorator.ts`:

```typescript
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@chatai/shared';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

---

## Day 4: JWT & Guards

### **Step 11: Complete Auth Module (1 hour)**

#### 11.1 Update Auth Controller with OAuth

Update `src/auth/auth.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { TikTokAuthGuard } from './guards/tiktok-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { User, UserRole } from '@chatai/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Register new user with email/phone and password
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Login with email/phone and password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * Get new access token using refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  /**
   * GET /auth/me
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
      created_at: user.created_at,
    };
  }

  // ========================================
  // GOOGLE OAUTH
  // ========================================

  /**
   * GET /auth/google
   * Initiate Google OAuth flow
   */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  /**
   * GET /auth/google/callback
   * Google OAuth callback
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.generateTokens(req.user);

    // Redirect to frontend with tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(
      `${frontendUrl}/auth/callback?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
    );
  }

  // ========================================
  // FACEBOOK OAUTH
  // ========================================

  /**
   * GET /auth/facebook
   * Initiate Facebook OAuth flow
   */
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookAuth() {
    // Guard redirects to Facebook
  }

  /**
   * GET /auth/facebook/callback
   * Facebook OAuth callback
   */
  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookAuthCallback(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.generateTokens(req.user);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(
      `${frontendUrl}/auth/callback?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
    );
  }

  // ========================================
  // TIKTOK OAUTH
  // ========================================

  /**
   * GET /auth/tiktok
   * Initiate TikTok OAuth flow
   */
  @Get('tiktok')
  @UseGuards(TikTokAuthGuard)
  async tiktokAuth() {
    // Guard redirects to TikTok
  }

  /**
   * GET /auth/tiktok/callback
   * TikTok OAuth callback
   */
  @Get('tiktok/callback')
  @UseGuards(TikTokAuthGuard)
  async tiktokAuthCallback(@Req() req, @Res() res: Response) {
    const tokens = await this.authService.generateTokens(req.user);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(
      `${frontendUrl}/auth/callback?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
    );
  }

  // ========================================
  // ADMIN ROUTES (Example)
  // ========================================

  /**
   * GET /auth/admin/test
   * Test admin-only route
   */
  @Get('admin/test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async adminTest() {
    return {
      message: 'Admin access granted',
      timestamp: new Date().toISOString(),
    };
  }
}
```

#### 11.2 Create Auth Module

Create `src/auth/auth.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@chatai/shared';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TikTokStrategy } from './strategies/tiktok.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN', '7d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    TikTokStrategy,
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
```

#### 11.3 Update App Module

Update `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
```

#### 11.4 Update Main with Session

Update `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Session middleware for OAuth
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'chatai-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.AUTH_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`🔐 Auth Service running on http://localhost:${port}`);
}
bootstrap();
```

---

### **Step 12: Manual Testing (1 hour)**

#### 12.1 Test Email/Phone Auth

```bash
# Start service
cd services/auth-service
pnpm start:dev

# In another terminal:

# 1. Test signup
curl -X POST http://localhost:4002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123"
  }'
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2024-01-15T10:00:00.000Z"
  },
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 604800
}
```

### Login

```bash
curl -X POST http://localhost:4002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password@123"
  }'
```

### Protected Route

```bash
curl http://localhost:4002/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### OAuth Login

Open in browser:
- Google: http://localhost:4002/auth/google
- Facebook: http://localhost:4002/auth/facebook
- TikTok: http://localhost:4002/auth/tiktok

## Environment Variables

```bash
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=chatai_platform

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Session
SESSION_SECRET=your-session-secret

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4002/auth/google/callback

# OAuth - Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:4002/auth/facebook/callback

# OAuth - TikTok
TIKTOK_CLIENT_KEY=your-tiktok-client-key
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
TIKTOK_CALLBACK_URL=http://localhost:4002/auth/tiktok/callback

# App
AUTH_SERVICE_PORT=4002
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

## Security

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### JWT Tokens

- Access token: 7 days expiration
- Refresh token: 30 days expiration
- Tokens are signed with HS256 algorithm

### OAuth Security

- State parameter for CSRF protection
- Session-based OAuth flow
- Secure cookie settings in production

## License

MIT
```

---

### **Step 16: Final Testing & Commit (1 hour)**

#### 16.1 Create Testing Checklist

Create `TESTING.md`:

```markdown
# M2 Testing Checklist

## ✅ Email/Phone Authentication

- [ ] Signup with email works
- [ ] Signup with phone works
- [ ] Login with email works
- [ ] Login with phone works
- [ ] Password validation works
- [ ] Duplicate email/phone rejected
- [ ] Invalid credentials rejected

## ✅ JWT Authentication

- [ ] Access token generated on signup
- [ ] Access token generated on login
- [ ] Refresh token works
- [ ] Invalid token rejected
- [ ] Expired token rejected
- [ ] Protected routes require token

## ✅ OAuth Integration

- [ ] Google OAuth flow works
- [ ] Facebook OAuth flow works
- [ ] TikTok OAuth flow works
- [ ] OAuth creates new user
- [ ] OAuth links existing email
- [ ] Tokens generated after OAuth

## ✅ Authorization

- [ ] JWT guard works
- [ ] Roles guard works
- [ ] Admin routes protected
- [ ] User roles enforced

## ✅ Testing

- [ ] Unit tests pass (>80% coverage)
- [ ] E2E tests pass
- [ ] All endpoints tested

## Test Commands

```bash
# 1. Unit tests
cd services/auth-service
pnpm test

# 2. E2E tests
pnpm test:e2e

# 3. Coverage
pnpm test:cov

# 4. Manual testing
# Signup
curl -X POST http://localhost:4002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test@123"}'

# Login
curl -X POST http://localhost:4002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123"}'

# Get profile
curl http://localhost:4002/auth/me \
  -H "Authorization: Bearer TOKEN"

# OAuth (open in browser)
http://localhost:4002/auth/google
http://localhost:4002/auth/facebook
http://localhost:4002/auth/tiktok
```
```

#### 16.2 Run All Tests

```bash
cd services/auth-service

# 1. Lint check
pnpm lint

# 2. Build check
pnpm build

# 3. Unit tests
pnpm test

# 4. E2E tests (ensure DB is running)
pnpm test:e2e

# 5. Coverage report
pnpm test:cov

# All passing? ✅ Ready to commit!
```

#### 16.3 Commit M2

```bash
# From root directory
cd ../..

git add .

git commit -m "feat(auth): complete M2 - authentication service with OAuth

Features:
- Email/phone signup and login with bcrypt password hashing
- JWT authentication with access and refresh tokens
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Role-based access control (RBAC)
- Auth guards (JWT, Roles)
- Custom decorators (CurrentUser, Roles)
- Session management for OAuth flows

Testing:
- Unit tests with >80% coverage
- E2E tests for all endpoints
- Manual testing documented

Security:
- Password strength validation
- JWT token expiration
- Secure session cookies
- OAuth state parameter

Closes CAP-7"

git push origin develop
```

#### 16.4 Update Jira

1. Go to: https://thanhhaunv.atlassian.net
2. Find: CAP-7 (M2 - Auth Service)
3. Move to "Done"
4. Add comment:
```
✅ M2 Complete!

Deliverables:
✅ Email/phone authentication
✅ JWT tokens (access + refresh)
✅ 3 OAuth providers (Google, Facebook, TikTok)
✅ Auth guards & decorators
✅ Unit tests (>80% coverage)
✅ E2E tests
✅ Complete documentation

All acceptance criteria met ✅
```

---

## Deliverables

### ✅ Completed Items

**Code:**
- ✅ Auth service with NestJS
- ✅ Email/phone signup & login
- ✅ Password hashing with bcrypt
- ✅ JWT authentication (access + refresh tokens)
- ✅ Google OAuth integration
- ✅ Facebook OAuth integration
- ✅ TikTok OAuth integration
- ✅ JWT strategy for Passport
- ✅ OAuth strategies (Google, Facebook, TikTok)
- ✅ Auth guards (JWT, Roles)
- ✅ Custom decorators (CurrentUser, Roles)
- ✅ Session management

**DTOs:**
- ✅ SignupDto with validation
- ✅ LoginDto with validation
- ✅ RefreshTokenDto
- ✅ AuthResponseDto

**Testing:**
- ✅ Unit tests (>80% coverage)
- ✅ E2E tests
- ✅ Manual testing guide

**Documentation:**
- ✅ Service README
- ✅ API documentation
- ✅ Testing checklist
- ✅ Environment variables guide

---

## Verification Checklist

### Final M2 Verification

```bash
# 1. ✅ Service starts without errors
cd services/auth-service
pnpm start:dev
# Expected: "🔐 Auth Service running on http://localhost:4002"

# 2. ✅ Signup works
curl -X POST http://localhost:4002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"verify@test.com","password":"Test@123"}'
# Expected: 201 with tokens

# 3. ✅ Login works
curl -X POST http://localhost:4002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"verify@test.com","password":"Test@123"}'
# Expected: 200 with tokens

# 4. ✅ Protected route works
curl http://localhost:4002/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
# Expected: 200 with user profile

# 5. ✅ Unit tests pass
pnpm test
# Expected: All tests passing

# 6. ✅ E2E tests pass
pnpm test:e2e
# Expected: All tests passing

# 7. ✅ Coverage >80%
pnpm test:cov
# Expected: Coverage >80%

# 8. ✅ OAuth URLs accessible
# Open in browser:
# - http://localhost:4002/auth/google
# - http://localhost:4002/auth/facebook
# - http://localhost:4002/auth/tiktok
# Expected: Redirects to OAuth provider

# 9. ✅ Code committed
git log -1 --oneline
# Expected: "feat(auth): complete M2..."

# 10. ✅ Jira updated
# Check: CAP-7 status = "Done"
```

**All items checked? 🎉 M2 is COMPLETE!**

---

## Next Steps

### **Ready for M3?**

**M3 - User/Project Service (Week 3)**

**What we'll build:**
- User CRUD operations
- Project management APIs
- Project member management
- Conversation threading APIs
- RBAC integration
- Unit & E2E tests

**Estimated time:** 1 week (5 days)

---

## Troubleshooting

### Common Issues

#### Issue 1: "Cannot find module '@chatai/shared'"

**Solution:**
```bash
cd ../../packages/shared
pnpm build
```

#### Issue 2: OAuth callback fails

**Solution:**
Check `.env` has correct callback URLs:
```bash
GOOGLE_CALLBACK_URL=http://localhost:4002/auth/google/callback
FACEBOOK_CALLBACK_URL=http://localhost:4002/auth/facebook/callback
TIKTOK_CALLBACK_URL=http://localhost:4002/auth/tiktok/callback
```

#### Issue 3: JWT verification fails

**Solution:**
Ensure JWT_SECRET is set in `.env`:
```bash
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

#### Issue 4: Tests fail with database error

**Solution:**
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart if needed
docker-compose restart postgres

# Verify connection
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "SELECT 1"
```

#### Issue 5: Session middleware error

**Solution:**
Install session types:
```bash
pnpm add -D @types/express-session
```

---

## Resources

### Documentation

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

### OAuth Setup Guides

- [Google OAuth Setup](https://console.cloud.google.com/)
- [Facebook OAuth Setup](https://developers.facebook.com/)
- [TikTok OAuth Setup](https://developers.tiktok.com/)

### Testing

- [Jest Documentation](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)

---

## Summary

### What We Accomplished

**Week 2 - M2 Complete:**
- ✅ Email/phone authentication
- ✅ JWT tokens (access + refresh)
- ✅ 3 OAuth providers
- ✅ Auth guards & decorators
- ✅ Comprehensive testing
- ✅ Production-ready security

### Metrics

- **Code:** ~2,000 lines
- **Files created:** 30+
- **Tests:** 50+ tests
- **Coverage:** >80%
- **Time spent:** ~24 hours (5 days)

### Team Performance

- ✅ On schedule
- ✅ All acceptance criteria met
- ✅ Documentation complete
- ✅ No blockers

---

## 🎉 M2 COMPLETE!

**Congratulations!** Auth service is production-ready!

### Key Achievements:

1. ✅ **Secure Authentication** - bcrypt + JWT
2. ✅ **OAuth Integration** - 3 providers working
3. ✅ **RBAC** - Role-based access control
4. ✅ **Well-Tested** - >80% coverage
5. ✅ **Production-Ready** - Security best practices

### Progress Update

**Phase 1 Progress:** 2/7 milestones complete (28%)
- ✅ M1: Database Setup
- ✅ M2: Auth Service
- ⏳ M3: User/Project Service (next)

---

**Questions or issues?**
- Check troubleshooting section
- Review documentation
- Ask in Slack #dev-backend

**Ready for M3! 🚀**
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123"
  }'

# Expected: 201 with user object and tokens

# 2. Test login
curl -X POST http://localhost:4002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password@123"
  }'

# Expected: 200 with user object and tokens

# 3. Test protected route
ACCESS_TOKEN="<paste_access_token_here>"

curl http://localhost:4002/auth/me \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Expected: 200 with user profile

# 4. Test refresh token
REFRESH_TOKEN="<paste_refresh_token_here>"

curl -X POST http://localhost:4002/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}"

# Expected: 200 with new tokens

# 5. Test admin route (should fail for regular user)
curl http://localhost:4002/auth/admin/test \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Expected: 403 Forbidden
```

#### 12.2 Test OAuth Flows

```bash
# Open in browser:

# Google OAuth
http://localhost:4002/auth/google

# Facebook OAuth
http://localhost:4002/auth/facebook

# TikTok OAuth
http://localhost:4002/auth/tiktok

# Each will redirect to OAuth provider
# After authorization, redirects to frontend with tokens
```

---

## Day 5: Testing & Documentation

### **Step 13: Create Unit Tests (3 hours)**

#### 13.1 Configure Jest

Create `jest.config.js`:

```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts# M2 - AUTH SERVICE

**Duration:** Week 2 (5 days)  
**Goal:** Build authentication service with OAuth support  
**Team:** Backend Dev 1  
**Jira:** CAP-7  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Day 1-2: Email/Phone Authentication](#day-1-2-emailphone-authentication)
4. [Day 3: OAuth Integration](#day-3-oauth-integration)
5. [Day 4: JWT & Guards](#day-4-jwt--guards)
6. [Day 5: Testing & Documentation](#day-5-testing--documentation)
7. [Deliverables](#deliverables)

---

## Overview

**What we're building:**
- Email/phone signup & login
- Password hashing with bcrypt
- JWT token generation & refresh
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Auth guards (JWT, Roles)
- Protected route decorators
- Unit tests (>80% coverage)
- E2E tests

---

## Prerequisites

✅ M1 completed (database ready)  
✅ User entity exists in shared package  
✅ PostgreSQL running with users table  

Verify:
```bash
# Check M1 completion
curl http://localhost:4001/health

# Check users table exists
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\d users"
```

---

## Day 1-2: Email/Phone Authentication

### **Step 1: Create Auth Service Project (30 min)**

#### 1.1 Create Directory

```bash
cd services
mkdir -p auth-service
cd auth-service
pnpm init
```

#### 1.2 Create `package.json`

```json
{
  "name": "@chatai/auth-service",
  "version": "1.0.0",
  "description": "Authentication service with OAuth support",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@chatai/shared": "workspace:*",
    "@nestjs/common": "^10.2.10",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.2.10",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/typeorm": "^10.0.1",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "express-session": "^1.17.3",
    "passport": "^0.7.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "passport-oauth2": "^1.8.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@types/passport-facebook": "^3.0.3",
    "@types/passport-google-oauth20": "^2.0.14",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/passport-oauth2": "^1.4.15",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### 1.3 Create `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

#### 1.4 Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@chatai/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

#### 1.5 Install Dependencies

```bash
pnpm install
```

---

### **Step 2: Create DTOs (30 min)**

#### 2.1 Create Signup DTO

Create `src/auth/dto/signup.dto.ts`:

```typescript
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { AuthProvider } from '@chatai/shared';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(255, { message: 'Name must not exceed 255 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be in valid international format',
  })
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  auth_provider?: AuthProvider;
}
```

#### 2.2 Create Login DTO

Create `src/auth/dto/login.dto.ts`:

```typescript
import { IsEmail, IsString, IsOptional, ValidateIf } from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.phone)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  phone?: string;

  @IsString()
  password: string;
}
```

#### 2.3 Create Refresh Token DTO

Create `src/auth/dto/refresh-token.dto.ts`:

```typescript
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}
```

#### 2.4 Create Auth Response DTO

Create `src/auth/dto/auth-response.dto.ts`:

```typescript
export class AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    avatar_url?: string;
    created_at: Date;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
```

---

### **Step 3: Create Auth Service (3 hours)**

#### 3.1 Create Auth Service

Create `src/auth/auth.service.ts`:

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole, AuthProvider } from '@chatai/shared';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register new user with email/phone and password
   */
  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: signupDto.email },
        ...(signupDto.phone ? [{ phone: signupDto.phone }] : []),
      ],
    });

    if (existingUser) {
      if (existingUser.email === signupDto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existingUser.phone === signupDto.phone) {
        throw new ConflictException('Phone number already registered');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      phone: signupDto.phone,
      password: hashedPassword,
      auth_provider: signupDto.auth_provider || AuthProvider.EMAIL,
      role: UserRole.USER,
      is_active: true,
    });

    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Login with email/phone and password
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Validate input
    if (!loginDto.email && !loginDto.phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: loginDto.email
        ? { email: loginDto.email }
        : { phone: loginDto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user used OAuth (no password)
    if (!user.password && user.auth_provider !== AuthProvider.EMAIL) {
      throw new UnauthorizedException(
        `Please login with ${user.auth_provider}`,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Get user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  /**
   * Find or create user from OAuth profile
   */
  async findOrCreateOAuthUser(
    provider: AuthProvider,
    profile: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    },
  ): Promise<User> {
    // Try to find existing user
    let user = await this.userRepository.findOne({
      where: [
        { oauth_id: profile.id, auth_provider: provider },
        { email: profile.email },
      ],
    });

    if (!user) {
      // Create new user from OAuth
      user = this.userRepository.create({
        name: profile.name,
        email: profile.email,
        oauth_id: profile.id,
        auth_provider: provider,
        avatar_url: profile.avatar,
        role: UserRole.USER,
        is_active: true,
        password: null, // No password for OAuth users
      });
      await this.userRepository.save(user);
    } else if (!user.oauth_id) {
      // Link existing email account to OAuth
      user.oauth_id = profile.id;
      user.auth_provider = provider;
      if (profile.avatar) {
        user.avatar_url = profile.avatar;
      }
      await this.userRepository.save(user);
    }

    return user;
  }

  /**
   * Generate JWT access and refresh tokens
   */
  async generateTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User): AuthResponseDto['user'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 4: Create Auth Controller (1 hour)**

Create `src/auth/auth.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@chatai/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Register new user with email/phone and password
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Login with email/phone and password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * Get new access token using refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  /**
   * GET /auth/me
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 5: Create Database Module (15 min)**

#### 5.1 Create Database Config

Create `src/config/database.config.ts`:

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@chatai/shared';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'chatai_platform'),
  entities: [User],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
});
```

#### 5.2 Create Database Module

Create `src/database/database.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
  ],
})
export class DatabaseModule {}
```

---

### **Step 6: Test Basic Auth (30 min)**

#### 6.1 Create App Module & Main (Temporary)

Create `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
```

Create `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.AUTH_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`🔐 Auth Service running on http://localhost:${port}`);
}
bootstrap();
```

#### 6.2 Test Connection

```bash
cd services/auth-service
pnpm start:dev

# Should see: 🔐 Auth Service running on http://localhost:4002
# Stop with Ctrl+C for now
```

---

## Day 3: OAuth Integration

### **Step 7: Create JWT Strategy (30 min)**

Create `src/auth/strategies/jwt.strategy.ts`:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

---

### **Step 8: Create OAuth Strategies (2 hours)**

#### 8.1 Google OAuth Strategy

Create `src/auth/strategies/google.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        {
          id,
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.2 Facebook OAuth Strategy

Create `src/auth/strategies/facebook.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      scope: ['email'],
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    try {
      const { id, displayName, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.FACEBOOK,
        {
          id,
          email: emails[0].value,
          name: displayName,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.3 TikTok OAuth Strategy

Create `src/auth/strategies/tiktok.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';
import axios from 'axios';

@Injectable()
export class TikTokStrategy extends PassportStrategy(Strategy, 'tiktok') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
      tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
      clientID: configService.get('TIKTOK_CLIENT_KEY'),
      clientSecret: configService.get('TIKTOK_CLIENT_SECRET'),
      callbackURL: configService.get('TIKTOK_CALLBACK_URL'),
      scope: ['user.info.basic'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      // Fetch user info from TikTok API
      const response = await axios.get(
        'https://open.tiktokapis.com/v2/user/info/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            fields: 'open_id,union_id,avatar_url,display_name',
          },
        },
      );

      const { open_id, display_name, avatar_url } = response.data.data.user;

      // TikTok doesn't always provide email, generate temp one
      const email = `tiktok_${open_id}@chatai.temp`;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.TIKTOK,
        {
          id: open_id,
          email: email,
          name: display_name || 'TikTok User',
          avatar: avatar_url,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

---

### **Step 9: Create Auth Guards (30 min)**

#### 9.1 JWT Auth Guard

Create `src/auth/guards/jwt-auth.guard.ts`:

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

#### 9.2 OAuth Guards

Create `src/auth/guards/google-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
```

Create `src/auth/guards/facebook-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
```

Create `src/auth/guards/tiktok-auth.guard.ts`:

```typescript
import { Injectable,
  transform: {
    '^.+\\.(t|j)s# M2 - AUTH SERVICE

**Duration:** Week 2 (5 days)  
**Goal:** Build authentication service with OAuth support  
**Team:** Backend Dev 1  
**Jira:** CAP-7  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Day 1-2: Email/Phone Authentication](#day-1-2-emailphone-authentication)
4. [Day 3: OAuth Integration](#day-3-oauth-integration)
5. [Day 4: JWT & Guards](#day-4-jwt--guards)
6. [Day 5: Testing & Documentation](#day-5-testing--documentation)
7. [Deliverables](#deliverables)

---

## Overview

**What we're building:**
- Email/phone signup & login
- Password hashing with bcrypt
- JWT token generation & refresh
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Auth guards (JWT, Roles)
- Protected route decorators
- Unit tests (>80% coverage)
- E2E tests

---

## Prerequisites

✅ M1 completed (database ready)  
✅ User entity exists in shared package  
✅ PostgreSQL running with users table  

Verify:
```bash
# Check M1 completion
curl http://localhost:4001/health

# Check users table exists
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\d users"
```

---

## Day 1-2: Email/Phone Authentication

### **Step 1: Create Auth Service Project (30 min)**

#### 1.1 Create Directory

```bash
cd services
mkdir -p auth-service
cd auth-service
pnpm init
```

#### 1.2 Create `package.json`

```json
{
  "name": "@chatai/auth-service",
  "version": "1.0.0",
  "description": "Authentication service with OAuth support",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@chatai/shared": "workspace:*",
    "@nestjs/common": "^10.2.10",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.2.10",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/typeorm": "^10.0.1",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "express-session": "^1.17.3",
    "passport": "^0.7.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "passport-oauth2": "^1.8.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@types/passport-facebook": "^3.0.3",
    "@types/passport-google-oauth20": "^2.0.14",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/passport-oauth2": "^1.4.15",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### 1.3 Create `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

#### 1.4 Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@chatai/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

#### 1.5 Install Dependencies

```bash
pnpm install
```

---

### **Step 2: Create DTOs (30 min)**

#### 2.1 Create Signup DTO

Create `src/auth/dto/signup.dto.ts`:

```typescript
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { AuthProvider } from '@chatai/shared';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(255, { message: 'Name must not exceed 255 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be in valid international format',
  })
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  auth_provider?: AuthProvider;
}
```

#### 2.2 Create Login DTO

Create `src/auth/dto/login.dto.ts`:

```typescript
import { IsEmail, IsString, IsOptional, ValidateIf } from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.phone)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  phone?: string;

  @IsString()
  password: string;
}
```

#### 2.3 Create Refresh Token DTO

Create `src/auth/dto/refresh-token.dto.ts`:

```typescript
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}
```

#### 2.4 Create Auth Response DTO

Create `src/auth/dto/auth-response.dto.ts`:

```typescript
export class AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    avatar_url?: string;
    created_at: Date;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
```

---

### **Step 3: Create Auth Service (3 hours)**

#### 3.1 Create Auth Service

Create `src/auth/auth.service.ts`:

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole, AuthProvider } from '@chatai/shared';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register new user with email/phone and password
   */
  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: signupDto.email },
        ...(signupDto.phone ? [{ phone: signupDto.phone }] : []),
      ],
    });

    if (existingUser) {
      if (existingUser.email === signupDto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existingUser.phone === signupDto.phone) {
        throw new ConflictException('Phone number already registered');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      phone: signupDto.phone,
      password: hashedPassword,
      auth_provider: signupDto.auth_provider || AuthProvider.EMAIL,
      role: UserRole.USER,
      is_active: true,
    });

    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Login with email/phone and password
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Validate input
    if (!loginDto.email && !loginDto.phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: loginDto.email
        ? { email: loginDto.email }
        : { phone: loginDto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user used OAuth (no password)
    if (!user.password && user.auth_provider !== AuthProvider.EMAIL) {
      throw new UnauthorizedException(
        `Please login with ${user.auth_provider}`,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Get user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  /**
   * Find or create user from OAuth profile
   */
  async findOrCreateOAuthUser(
    provider: AuthProvider,
    profile: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    },
  ): Promise<User> {
    // Try to find existing user
    let user = await this.userRepository.findOne({
      where: [
        { oauth_id: profile.id, auth_provider: provider },
        { email: profile.email },
      ],
    });

    if (!user) {
      // Create new user from OAuth
      user = this.userRepository.create({
        name: profile.name,
        email: profile.email,
        oauth_id: profile.id,
        auth_provider: provider,
        avatar_url: profile.avatar,
        role: UserRole.USER,
        is_active: true,
        password: null, // No password for OAuth users
      });
      await this.userRepository.save(user);
    } else if (!user.oauth_id) {
      // Link existing email account to OAuth
      user.oauth_id = profile.id;
      user.auth_provider = provider;
      if (profile.avatar) {
        user.avatar_url = profile.avatar;
      }
      await this.userRepository.save(user);
    }

    return user;
  }

  /**
   * Generate JWT access and refresh tokens
   */
  async generateTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User): AuthResponseDto['user'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 4: Create Auth Controller (1 hour)**

Create `src/auth/auth.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@chatai/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Register new user with email/phone and password
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Login with email/phone and password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * Get new access token using refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  /**
   * GET /auth/me
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 5: Create Database Module (15 min)**

#### 5.1 Create Database Config

Create `src/config/database.config.ts`:

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@chatai/shared';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'chatai_platform'),
  entities: [User],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
});
```

#### 5.2 Create Database Module

Create `src/database/database.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
  ],
})
export class DatabaseModule {}
```

---

### **Step 6: Test Basic Auth (30 min)**

#### 6.1 Create App Module & Main (Temporary)

Create `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
```

Create `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.AUTH_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`🔐 Auth Service running on http://localhost:${port}`);
}
bootstrap();
```

#### 6.2 Test Connection

```bash
cd services/auth-service
pnpm start:dev

# Should see: 🔐 Auth Service running on http://localhost:4002
# Stop with Ctrl+C for now
```

---

## Day 3: OAuth Integration

### **Step 7: Create JWT Strategy (30 min)**

Create `src/auth/strategies/jwt.strategy.ts`:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

---

### **Step 8: Create OAuth Strategies (2 hours)**

#### 8.1 Google OAuth Strategy

Create `src/auth/strategies/google.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        {
          id,
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.2 Facebook OAuth Strategy

Create `src/auth/strategies/facebook.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      scope: ['email'],
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    try {
      const { id, displayName, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.FACEBOOK,
        {
          id,
          email: emails[0].value,
          name: displayName,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.3 TikTok OAuth Strategy

Create `src/auth/strategies/tiktok.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';
import axios from 'axios';

@Injectable()
export class TikTokStrategy extends PassportStrategy(Strategy, 'tiktok') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
      tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
      clientID: configService.get('TIKTOK_CLIENT_KEY'),
      clientSecret: configService.get('TIKTOK_CLIENT_SECRET'),
      callbackURL: configService.get('TIKTOK_CALLBACK_URL'),
      scope: ['user.info.basic'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      // Fetch user info from TikTok API
      const response = await axios.get(
        'https://open.tiktokapis.com/v2/user/info/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            fields: 'open_id,union_id,avatar_url,display_name',
          },
        },
      );

      const { open_id, display_name, avatar_url } = response.data.data.user;

      // TikTok doesn't always provide email, generate temp one
      const email = `tiktok_${open_id}@chatai.temp`;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.TIKTOK,
        {
          id: open_id,
          email: email,
          name: display_name || 'TikTok User',
          avatar: avatar_url,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

---

### **Step 9: Create Auth Guards (30 min)**

#### 9.1 JWT Auth Guard

Create `src/auth/guards/jwt-auth.guard.ts`:

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

#### 9.2 OAuth Guards

Create `src/auth/guards/google-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
```

Create `src/auth/guards/facebook-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
```

Create `src/auth/guards/tiktok-auth.guard.ts`:

```typescript
import { Injectable: 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.e2e-spec.ts',
    '!**/main.ts',
    '!**/index.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@chatai/shared# M2 - AUTH SERVICE

**Duration:** Week 2 (5 days)  
**Goal:** Build authentication service with OAuth support  
**Team:** Backend Dev 1  
**Jira:** CAP-7  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Day 1-2: Email/Phone Authentication](#day-1-2-emailphone-authentication)
4. [Day 3: OAuth Integration](#day-3-oauth-integration)
5. [Day 4: JWT & Guards](#day-4-jwt--guards)
6. [Day 5: Testing & Documentation](#day-5-testing--documentation)
7. [Deliverables](#deliverables)

---

## Overview

**What we're building:**
- Email/phone signup & login
- Password hashing with bcrypt
- JWT token generation & refresh
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Auth guards (JWT, Roles)
- Protected route decorators
- Unit tests (>80% coverage)
- E2E tests

---

## Prerequisites

✅ M1 completed (database ready)  
✅ User entity exists in shared package  
✅ PostgreSQL running with users table  

Verify:
```bash
# Check M1 completion
curl http://localhost:4001/health

# Check users table exists
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\d users"
```

---

## Day 1-2: Email/Phone Authentication

### **Step 1: Create Auth Service Project (30 min)**

#### 1.1 Create Directory

```bash
cd services
mkdir -p auth-service
cd auth-service
pnpm init
```

#### 1.2 Create `package.json`

```json
{
  "name": "@chatai/auth-service",
  "version": "1.0.0",
  "description": "Authentication service with OAuth support",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@chatai/shared": "workspace:*",
    "@nestjs/common": "^10.2.10",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.2.10",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/typeorm": "^10.0.1",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "express-session": "^1.17.3",
    "passport": "^0.7.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "passport-oauth2": "^1.8.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@types/passport-facebook": "^3.0.3",
    "@types/passport-google-oauth20": "^2.0.14",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/passport-oauth2": "^1.4.15",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### 1.3 Create `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

#### 1.4 Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@chatai/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

#### 1.5 Install Dependencies

```bash
pnpm install
```

---

### **Step 2: Create DTOs (30 min)**

#### 2.1 Create Signup DTO

Create `src/auth/dto/signup.dto.ts`:

```typescript
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { AuthProvider } from '@chatai/shared';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(255, { message: 'Name must not exceed 255 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be in valid international format',
  })
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  auth_provider?: AuthProvider;
}
```

#### 2.2 Create Login DTO

Create `src/auth/dto/login.dto.ts`:

```typescript
import { IsEmail, IsString, IsOptional, ValidateIf } from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.phone)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  phone?: string;

  @IsString()
  password: string;
}
```

#### 2.3 Create Refresh Token DTO

Create `src/auth/dto/refresh-token.dto.ts`:

```typescript
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}
```

#### 2.4 Create Auth Response DTO

Create `src/auth/dto/auth-response.dto.ts`:

```typescript
export class AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    avatar_url?: string;
    created_at: Date;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
```

---

### **Step 3: Create Auth Service (3 hours)**

#### 3.1 Create Auth Service

Create `src/auth/auth.service.ts`:

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole, AuthProvider } from '@chatai/shared';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register new user with email/phone and password
   */
  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: signupDto.email },
        ...(signupDto.phone ? [{ phone: signupDto.phone }] : []),
      ],
    });

    if (existingUser) {
      if (existingUser.email === signupDto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existingUser.phone === signupDto.phone) {
        throw new ConflictException('Phone number already registered');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      phone: signupDto.phone,
      password: hashedPassword,
      auth_provider: signupDto.auth_provider || AuthProvider.EMAIL,
      role: UserRole.USER,
      is_active: true,
    });

    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Login with email/phone and password
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Validate input
    if (!loginDto.email && !loginDto.phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: loginDto.email
        ? { email: loginDto.email }
        : { phone: loginDto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user used OAuth (no password)
    if (!user.password && user.auth_provider !== AuthProvider.EMAIL) {
      throw new UnauthorizedException(
        `Please login with ${user.auth_provider}`,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Get user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  /**
   * Find or create user from OAuth profile
   */
  async findOrCreateOAuthUser(
    provider: AuthProvider,
    profile: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    },
  ): Promise<User> {
    // Try to find existing user
    let user = await this.userRepository.findOne({
      where: [
        { oauth_id: profile.id, auth_provider: provider },
        { email: profile.email },
      ],
    });

    if (!user) {
      // Create new user from OAuth
      user = this.userRepository.create({
        name: profile.name,
        email: profile.email,
        oauth_id: profile.id,
        auth_provider: provider,
        avatar_url: profile.avatar,
        role: UserRole.USER,
        is_active: true,
        password: null, // No password for OAuth users
      });
      await this.userRepository.save(user);
    } else if (!user.oauth_id) {
      // Link existing email account to OAuth
      user.oauth_id = profile.id;
      user.auth_provider = provider;
      if (profile.avatar) {
        user.avatar_url = profile.avatar;
      }
      await this.userRepository.save(user);
    }

    return user;
  }

  /**
   * Generate JWT access and refresh tokens
   */
  async generateTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User): AuthResponseDto['user'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 4: Create Auth Controller (1 hour)**

Create `src/auth/auth.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@chatai/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Register new user with email/phone and password
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Login with email/phone and password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * Get new access token using refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  /**
   * GET /auth/me
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 5: Create Database Module (15 min)**

#### 5.1 Create Database Config

Create `src/config/database.config.ts`:

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@chatai/shared';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'chatai_platform'),
  entities: [User],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
});
```

#### 5.2 Create Database Module

Create `src/database/database.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
  ],
})
export class DatabaseModule {}
```

---

### **Step 6: Test Basic Auth (30 min)**

#### 6.1 Create App Module & Main (Temporary)

Create `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
```

Create `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.AUTH_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`🔐 Auth Service running on http://localhost:${port}`);
}
bootstrap();
```

#### 6.2 Test Connection

```bash
cd services/auth-service
pnpm start:dev

# Should see: 🔐 Auth Service running on http://localhost:4002
# Stop with Ctrl+C for now
```

---

## Day 3: OAuth Integration

### **Step 7: Create JWT Strategy (30 min)**

Create `src/auth/strategies/jwt.strategy.ts`:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

---

### **Step 8: Create OAuth Strategies (2 hours)**

#### 8.1 Google OAuth Strategy

Create `src/auth/strategies/google.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        {
          id,
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.2 Facebook OAuth Strategy

Create `src/auth/strategies/facebook.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      scope: ['email'],
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    try {
      const { id, displayName, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.FACEBOOK,
        {
          id,
          email: emails[0].value,
          name: displayName,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.3 TikTok OAuth Strategy

Create `src/auth/strategies/tiktok.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';
import axios from 'axios';

@Injectable()
export class TikTokStrategy extends PassportStrategy(Strategy, 'tiktok') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
      tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
      clientID: configService.get('TIKTOK_CLIENT_KEY'),
      clientSecret: configService.get('TIKTOK_CLIENT_SECRET'),
      callbackURL: configService.get('TIKTOK_CALLBACK_URL'),
      scope: ['user.info.basic'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      // Fetch user info from TikTok API
      const response = await axios.get(
        'https://open.tiktokapis.com/v2/user/info/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            fields: 'open_id,union_id,avatar_url,display_name',
          },
        },
      );

      const { open_id, display_name, avatar_url } = response.data.data.user;

      // TikTok doesn't always provide email, generate temp one
      const email = `tiktok_${open_id}@chatai.temp`;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.TIKTOK,
        {
          id: open_id,
          email: email,
          name: display_name || 'TikTok User',
          avatar: avatar_url,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

---

### **Step 9: Create Auth Guards (30 min)**

#### 9.1 JWT Auth Guard

Create `src/auth/guards/jwt-auth.guard.ts`:

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

#### 9.2 OAuth Guards

Create `src/auth/guards/google-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
```

Create `src/auth/guards/facebook-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
```

Create `src/auth/guards/tiktok-auth.guard.ts`:

```typescript
import { Injectable: '<rootDir>/../../packages/shared/src',
  },
};
```

#### 13.2 Create Auth Service Tests

Create `src/auth/auth.service.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User, AuthProvider, UserRole } from '@chatai/shared';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: any) => {
      const config = {
        JWT_SECRET: 'test-secret',
        JWT_EXPIRES_IN: '7d',
        JWT_REFRESH_SECRET: 'test-refresh-secret',
        JWT_REFRESH_EXPIRES_IN: '30d',
      };
      return config[key] || defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const signupDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password@123',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({
        id: 'uuid',
        ...signupDto,
        auth_provider: AuthProvider.EMAIL,
        role: UserRole.USER,
        created_at: new Date(),
      });
      mockUserRepository.save.mockResolvedValue({
        id: 'uuid',
        ...signupDto,
      });
      mockJwtService.signAsync.mockResolvedValue('mock-token');

      const result = await service.signup(signupDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.user.email).toBe(signupDto.email);
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      const signupDto = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'Password@123',
      };

      mockUserRepository.findOne.mockResolvedValue({
        id: 'existing-uuid',
        email: signupDto.email,
      });

      await expect(service.signup(signupDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'Password@123',
      };

      const hashedPassword = await bcrypt.hash(loginDto.password, 10);
      const mockUser = {
        id: 'uuid',
        email: loginDto.email,
        password: hashedPassword,
        is_active: true,
        auth_provider: AuthProvider.EMAIL,
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue('mock-token');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('access_token');
      expect(result.user.email).toBe(loginDto.email);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'WrongPassword',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for OAuth user trying password login', async () => {
      const loginDto = {
        email: 'oauth@example.com',
        password: 'Password@123',
      };

      mockUserRepository.findOne.mockResolvedValue({
        id: 'uuid',
        email: loginDto.email,
        password: null,
        auth_provider: AuthProvider.GOOGLE,
        is_active: true,
      });

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const refreshToken = 'valid-refresh-token';
      const mockUser = {
        id: 'uuid',
        email: 'test@example.com',
        is_active: true,
      };

      mockJwtService.verify.mockReturnValue({ sub: 'uuid' });
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue('new-token');

      const result = await service.refreshToken(refreshToken);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const refreshToken = 'invalid-token';

      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshToken(refreshToken)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user if valid', async () => {
      const mockUser = {
        id: 'uuid',
        email: 'test@example.com',
        is_active: true,
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser('uuid');

      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.validateUser('uuid')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findOrCreateOAuthUser', () => {
    it('should create new OAuth user', async () => {
      const profile = {
        id: 'google-id',
        email: 'oauth@example.com',
        name: 'OAuth User',
        avatar: 'https://avatar.url',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(profile);
      mockUserRepository.save.mockResolvedValue(profile);

      const result = await service.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        profile,
      );

      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(result).toEqual(profile);
    });

    it('should return existing OAuth user', async () => {
      const profile = {
        id: 'google-id',
        email: 'existing@example.com',
        name: 'Existing User',
      };

      const existingUser = {
        id: 'uuid',
        oauth_id: profile.id,
        auth_provider: AuthProvider.GOOGLE,
      };

      mockUserRepository.findOne.mockResolvedValue(existingUser);

      const result = await service.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        profile,
      );

      expect(result).toEqual(existingUser);
    });
  });
});
```

#### 13.3 Run Unit Tests

```bash
cd services/auth-service

# Run tests
pnpm test

# Run with coverage
pnpm test:cov

# Expected: All tests passing, >80% coverage
```

---

### **Step 14: Create E2E Tests (2 hours)**

#### 14.1 Configure E2E Tests

Create `test/jest-e2e.json`:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^@chatai/shared$": "<rootDir>/../../../packages/shared/src"
  }
}
```

#### 14.2 Create E2E Tests

Create `test/auth.e2e-spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;

  const testUser = {
    name: 'E2E Test User',
    email: `e2e-${Date.now()}@example.com`,
    password: 'Password@123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('user');
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body.user.email).toBe(testUser.email);
          
          accessToken = res.body.access_token;
          refreshToken = res.body.refresh_token;
        });
    });

    it('should return 409 for duplicate email', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(409);
    });

    it('should return 400 for invalid data', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'A',
          email: 'invalid-email',
          password: '123',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body.user.email).toBe(testUser.email);
        });
    });

    it('should return 401 for wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword',
        })
        .expect(401);
    });

    it('should return 401 for non-existent user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password@123',
        })
        .expect(401);
    });
  });

  describe('/auth/me (GET)', () => {
    it('should return current user profile', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(testUser.email);
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });

    it('should return 401 with invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('/auth/refresh (POST)', () => {
    it('should refresh tokens successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refresh_token: refreshToken })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });

    it('should return 401 for invalid refresh token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refresh_token: 'invalid-token' })
        .expect(401);
    });
  });

  describe('/auth/admin/test (GET)', () => {
    it('should return 403 for non-admin user', () => {
      return request(app.getHttpServer())
        .get('/auth/admin/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });
});
```

#### 14.3 Run E2E Tests

```bash
# Make sure database is running
docker-compose ps

# Run E2E tests
pnpm test:e2e

# Expected: All tests passing
```

---

### **Step 15: Create Documentation (1 hour)**

#### 15.1 Create Service README

Create `README.md`:

```markdown
# Auth Service

Authentication service with email/phone signup and OAuth support (Google, Facebook, TikTok).

## Features

- ✅ Email/phone signup & login
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Refresh tokens
- ✅ Google OAuth
- ✅ Facebook OAuth
- ✅ TikTok OAuth
- ✅ Role-based access control (RBAC)
- ✅ Protected routes
- ✅ Unit tests (>80% coverage)
- ✅ E2E tests

## API Endpoints

### Authentication

```
POST   /auth/signup           - Register new user
POST   /auth/login            - Login with credentials
POST   /auth/refresh          - Refresh access token
GET    /auth/me               - Get current user (protected)
```

### OAuth

```
GET    /auth/google           - Initiate Google OAuth
GET    /auth/google/callback  - Google OAuth callback
GET    /auth/facebook         - Initiate Facebook OAuth
GET    /auth/facebook/callback - Facebook OAuth callback
GET    /auth/tiktok           - Initiate TikTok OAuth
GET    /auth/tiktok/callback  - TikTok OAuth callback
```

### Admin Routes

```
GET    /auth/admin/test       - Test admin-only route
```

## Usage

### Signup

```bash
curl -X POST http://localhost:4002/auth/signup \# M2 - AUTH SERVICE

**Duration:** Week 2 (5 days)  
**Goal:** Build authentication service with OAuth support  
**Team:** Backend Dev 1  
**Jira:** CAP-7  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Day 1-2: Email/Phone Authentication](#day-1-2-emailphone-authentication)
4. [Day 3: OAuth Integration](#day-3-oauth-integration)
5. [Day 4: JWT & Guards](#day-4-jwt--guards)
6. [Day 5: Testing & Documentation](#day-5-testing--documentation)
7. [Deliverables](#deliverables)

---

## Overview

**What we're building:**
- Email/phone signup & login
- Password hashing with bcrypt
- JWT token generation & refresh
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Auth guards (JWT, Roles)
- Protected route decorators
- Unit tests (>80% coverage)
- E2E tests

---

## Prerequisites

✅ M1 completed (database ready)  
✅ User entity exists in shared package  
✅ PostgreSQL running with users table  

Verify:
```bash
# Check M1 completion
curl http://localhost:4001/health

# Check users table exists
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\d users"
```

---

## Day 1-2: Email/Phone Authentication

### **Step 1: Create Auth Service Project (30 min)**

#### 1.1 Create Directory

```bash
cd services
mkdir -p auth-service
cd auth-service
pnpm init
```

#### 1.2 Create `package.json`

```json
{
  "name": "@chatai/auth-service",
  "version": "1.0.0",
  "description": "Authentication service with OAuth support",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@chatai/shared": "workspace:*",
    "@nestjs/common": "^10.2.10",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.2.10",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/typeorm": "^10.0.1",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "express-session": "^1.17.3",
    "passport": "^0.7.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "passport-oauth2": "^1.8.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@types/passport-facebook": "^3.0.3",
    "@types/passport-google-oauth20": "^2.0.14",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/passport-oauth2": "^1.4.15",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### 1.3 Create `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

#### 1.4 Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@chatai/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

#### 1.5 Install Dependencies

```bash
pnpm install
```

---

### **Step 2: Create DTOs (30 min)**

#### 2.1 Create Signup DTO

Create `src/auth/dto/signup.dto.ts`:

```typescript
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { AuthProvider } from '@chatai/shared';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(255, { message: 'Name must not exceed 255 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be in valid international format',
  })
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  auth_provider?: AuthProvider;
}
```

#### 2.2 Create Login DTO

Create `src/auth/dto/login.dto.ts`:

```typescript
import { IsEmail, IsString, IsOptional, ValidateIf } from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.phone)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  phone?: string;

  @IsString()
  password: string;
}
```

#### 2.3 Create Refresh Token DTO

Create `src/auth/dto/refresh-token.dto.ts`:

```typescript
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}
```

#### 2.4 Create Auth Response DTO

Create `src/auth/dto/auth-response.dto.ts`:

```typescript
export class AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    avatar_url?: string;
    created_at: Date;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
```

---

### **Step 3: Create Auth Service (3 hours)**

#### 3.1 Create Auth Service

Create `src/auth/auth.service.ts`:

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole, AuthProvider } from '@chatai/shared';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register new user with email/phone and password
   */
  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: signupDto.email },
        ...(signupDto.phone ? [{ phone: signupDto.phone }] : []),
      ],
    });

    if (existingUser) {
      if (existingUser.email === signupDto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existingUser.phone === signupDto.phone) {
        throw new ConflictException('Phone number already registered');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      phone: signupDto.phone,
      password: hashedPassword,
      auth_provider: signupDto.auth_provider || AuthProvider.EMAIL,
      role: UserRole.USER,
      is_active: true,
    });

    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Login with email/phone and password
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Validate input
    if (!loginDto.email && !loginDto.phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: loginDto.email
        ? { email: loginDto.email }
        : { phone: loginDto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user used OAuth (no password)
    if (!user.password && user.auth_provider !== AuthProvider.EMAIL) {
      throw new UnauthorizedException(
        `Please login with ${user.auth_provider}`,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Get user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  /**
   * Find or create user from OAuth profile
   */
  async findOrCreateOAuthUser(
    provider: AuthProvider,
    profile: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    },
  ): Promise<User> {
    // Try to find existing user
    let user = await this.userRepository.findOne({
      where: [
        { oauth_id: profile.id, auth_provider: provider },
        { email: profile.email },
      ],
    });

    if (!user) {
      // Create new user from OAuth
      user = this.userRepository.create({
        name: profile.name,
        email: profile.email,
        oauth_id: profile.id,
        auth_provider: provider,
        avatar_url: profile.avatar,
        role: UserRole.USER,
        is_active: true,
        password: null, // No password for OAuth users
      });
      await this.userRepository.save(user);
    } else if (!user.oauth_id) {
      // Link existing email account to OAuth
      user.oauth_id = profile.id;
      user.auth_provider = provider;
      if (profile.avatar) {
        user.avatar_url = profile.avatar;
      }
      await this.userRepository.save(user);
    }

    return user;
  }

  /**
   * Generate JWT access and refresh tokens
   */
  async generateTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User): AuthResponseDto['user'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 4: Create Auth Controller (1 hour)**

Create `src/auth/auth.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@chatai/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Register new user with email/phone and password
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Login with email/phone and password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * POST /auth/refresh
   * Get new access token using refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  /**
   * GET /auth/me
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
      created_at: user.created_at,
    };
  }
}
```

---

### **Step 5: Create Database Module (15 min)**

#### 5.1 Create Database Config

Create `src/config/database.config.ts`:

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@chatai/shared';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'chatai_platform'),
  entities: [User],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
});
```

#### 5.2 Create Database Module

Create `src/database/database.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
  ],
})
export class DatabaseModule {}
```

---

### **Step 6: Test Basic Auth (30 min)**

#### 6.1 Create App Module & Main (Temporary)

Create `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
```

Create `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.AUTH_SERVICE_PORT || 4002;
  await app.listen(port);
  console.log(`🔐 Auth Service running on http://localhost:${port}`);
}
bootstrap();
```

#### 6.2 Test Connection

```bash
cd services/auth-service
pnpm start:dev

# Should see: 🔐 Auth Service running on http://localhost:4002
# Stop with Ctrl+C for now
```

---

## Day 3: OAuth Integration

### **Step 7: Create JWT Strategy (30 min)**

Create `src/auth/strategies/jwt.strategy.ts`:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

---

### **Step 8: Create OAuth Strategies (2 hours)**

#### 8.1 Google OAuth Strategy

Create `src/auth/strategies/google.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.GOOGLE,
        {
          id,
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.2 Facebook OAuth Strategy

Create `src/auth/strategies/facebook.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      scope: ['email'],
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    try {
      const { id, displayName, emails, photos } = profile;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.FACEBOOK,
        {
          id,
          email: emails[0].value,
          name: displayName,
          avatar: photos?.[0]?.value,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

#### 8.3 TikTok OAuth Strategy

Create `src/auth/strategies/tiktok.strategy.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '@chatai/shared';
import axios from 'axios';

@Injectable()
export class TikTokStrategy extends PassportStrategy(Strategy, 'tiktok') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
      tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
      clientID: configService.get('TIKTOK_CLIENT_KEY'),
      clientSecret: configService.get('TIKTOK_CLIENT_SECRET'),
      callbackURL: configService.get('TIKTOK_CALLBACK_URL'),
      scope: ['user.info.basic'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      // Fetch user info from TikTok API
      const response = await axios.get(
        'https://open.tiktokapis.com/v2/user/info/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            fields: 'open_id,union_id,avatar_url,display_name',
          },
        },
      );

      const { open_id, display_name, avatar_url } = response.data.data.user;

      // TikTok doesn't always provide email, generate temp one
      const email = `tiktok_${open_id}@chatai.temp`;

      const user = await this.authService.findOrCreateOAuthUser(
        AuthProvider.TIKTOK,
        {
          id: open_id,
          email: email,
          name: display_name || 'TikTok User',
          avatar: avatar_url,
        },
      );

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
```

---

### **Step 9: Create Auth Guards (30 min)**

#### 9.1 JWT Auth Guard

Create `src/auth/guards/jwt-auth.guard.ts`:

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

#### 9.2 OAuth Guards

Create `src/auth/guards/google-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
```

Create `src/auth/guards/facebook-auth.guard.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
```

Create `src/auth/guards/tiktok-auth.guard.ts`:

```typescript
import { Injectable
