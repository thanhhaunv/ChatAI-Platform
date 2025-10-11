**Hoàn hảo! Tôi sẽ giúp bạn làm PART4 theo từng ngày một.** 🎯

---

## **📋 KẾ HOẠCH LÀM PART4**

### **Cấu trúc:**
```
PART4-PHASE1/
├── M1-Database_Setup_and_Infrastructure.md ✅ (Đã có)
├── M2-Auth_Service/
│   ├── M2-0-Overview.md ✅ (Đã có)
│   ├── M2-1-DAY1_Project_Setup.md ⬅️ BẮT ĐẦU TỪ ĐÂY
│   ├── M2-2-DAY2_Email_Phone_Auth.md
│   ├── M2-3-DAY3_OAuth_Integration.md
│   ├── M2-4-DAY4_JWT_and_Guards.md
│   └── M2-5-DAY5_Testing_and_Docs.md
├── M3-User_Project_Service/
│   ├── M3-0-Overview.md
│   ├── M3-1-DAY1_...
│   └── ...
└── ... (M4-M7)
```

---

## **🎯 HÔM NAY: M2-1-DAY1_Project_Setup.md**

### **Nội dung sẽ bao gồm:**

**✅ Step 1: Create Auth Service Directory (10 min)**
- Create folder structure
- Initialize NestJS project

**✅ Step 2: Configure package.json (15 min)**
- Full dependencies list
- Scripts (start, build, test, lint)
- Dev dependencies

**✅ Step 3: Configure TypeScript (10 min)**
- tsconfig.json
- nest-cli.json
- Path aliases

**✅ Step 4: Configure ESLint & Prettier (10 min)**
- .eslintrc.json
- .prettierrc
- Integration with Husky

**✅ Step 5: Install Dependencies (5 min)**
- pnpm install
- Verify installation

**✅ Step 6: Create Basic Module Structure (20 min)**
- src/auth/auth.module.ts
- src/auth/auth.controller.ts
- src/auth/auth.service.ts
- src/app.module.ts
- src/main.ts

**✅ Step 7: Test Basic Setup (10 min)**
- Start service: pnpm start:dev
- Test health endpoint
- Verify no errors

**✅ Step 8: Commit Day 1 (10 min)**
- Git add
- Git commit with conventional format
- Update Jira

**📊 Tổng thời gian ước tính: ~2 hours**

---

## **📝 FORMAT FILE**

Tôi sẽ tạo file với format như M1:
- ✅ Copy-paste ready code
- ✅ Expected outputs
- ✅ Verification checklist
- ✅ Troubleshooting section
- ✅ Summary & next steps

---
# M2 - AUTH SERVICE - DAY 1: PROJECT SETUP

**Date:** Day 1 of Week 2  
**Duration:** 2 hours  
**Goal:** Setup auth-service project structure and basic configuration  
**Assignee:** Backend Dev 1  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create Service Directory](#step-1-create-service-directory)
4. [Step 2: Configure package.json](#step-2-configure-packagejson)
5. [Step 3: Configure TypeScript](#step-3-configure-typescript)
6. [Step 4: Configure Linting](#step-4-configure-linting)
7. [Step 5: Install Dependencies](#step-5-install-dependencies)
8. [Step 6: Create Basic Structure](#step-6-create-basic-structure)
9. [Step 7: Test Setup](#step-7-test-setup)
10. [Step 8: Commit Changes](#step-8-commit-changes)
11. [Verification Checklist](#verification-checklist)

---

## Overview

**Today's Goals:**
- ✅ Create auth-service directory structure
- ✅ Configure package.json with all dependencies
- ✅ Setup TypeScript configuration
- ✅ Configure ESLint and Prettier
- ✅ Create basic NestJS module structure
- ✅ Test service can start without errors
- ✅ Commit and push to Git

**What We're Building:**
```
services/auth-service/
├── src/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   └── auth.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── package.json
├── tsconfig.json
├── nest-cli.json
├── .eslintrc.json
└── .prettierrc
```

---

## Prerequisites

**Before starting:**
- ✅ M1 completed (Database setup working)
- ✅ Docker services running
- ✅ Phase 0 completed (Git hooks working)

**Verify Prerequisites:**
```bash
# 1. Check Docker services
docker-compose ps
# Expected: postgres, redis, minio, rabbitmq all "Up (healthy)"

# 2. Check user-service working
cd services/user-service
pnpm start:dev
# Should start without errors, then Ctrl+C to stop

# 3. Verify Git hooks
git status
# Should show clean working tree
```

---

## Step 1: Create Service Directory

**Duration:** 10 minutes

### 1.1 Create Directory Structure

```bash
# From project root
cd services
mkdir -p auth-service

# Create subdirectories
cd auth-service
mkdir -p src/auth
mkdir -p src/config
mkdir -p test
```

### 1.2 Initialize pnpm

```bash
# Initialize package.json
pnpm init

# This creates a basic package.json
# We'll replace it in Step 2
```

**Expected Output:**
```
✓ Created package.json
```

---

## Step 2: Configure package.json

**Duration:** 15 minutes

### 2.1 Replace package.json

Create `services/auth-service/package.json`:

```json
{
  "name": "@chatai/auth-service",
  "version": "1.0.0",
  "description": "Authentication service with OAuth support",
  "author": "ChatAI Team",
  "private": true,
  "license": "MIT",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
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
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
    "jest": "^29.7.0",
    "prettier": "^3.1.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^@chatai/shared$": "<rootDir>/../../packages/shared/src"
    }
  }
}
```

**Key Dependencies Explained:**
- `@nestjs/jwt` - JWT token generation and validation
- `@nestjs/passport` - Passport authentication integration
- `bcrypt` - Password hashing
- `passport-google-oauth20` - Google OAuth strategy
- `passport-facebook` - Facebook OAuth strategy
- `passport-local` - Email/password strategy
- `express-session` - Session management for OAuth

---

## Step 3: Configure TypeScript

**Duration:** 10 minutes

### 3.1 Create nest-cli.json

Create `services/auth-service/nest-cli.json`:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": false,
    "tsConfigPath": "tsconfig.json"
  }
}
```

### 3.2 Create tsconfig.json

Create `services/auth-service/tsconfig.json`:

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

### 3.3 Create tsconfig.build.json

Create `services/auth-service/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
```

---

## Step 4: Configure Linting

**Duration:** 10 minutes

### 4.1 Create .eslintrc.json

Create `services/auth-service/.eslintrc.json`:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": ".",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "root": true,
  "env": {
    "node": true,
    "jest": true
  },
  "ignorePatterns": [".eslintrc.js", "dist", "node_modules"],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### 4.2 Create .prettierrc

Create `services/auth-service/.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### 4.3 Create .prettierignore

Create `services/auth-service/.prettierignore`:

```
dist
node_modules
coverage
*.md
```

---

## Step 5: Install Dependencies

**Duration:** 5 minutes

### 5.1 Install All Dependencies

```bash
# Make sure you're in auth-service directory
cd services/auth-service

# Install dependencies
pnpm install
```

**Expected Output:**
```
Packages: +XXX
Progress: resolved XXX, reused XXX, downloaded XX
```

### 5.2 Verify Installation

```bash
# Check node_modules exists
ls -la node_modules/ | head

# Verify key packages installed
ls node_modules/@nestjs/
ls node_modules/passport/
ls node_modules/bcrypt/
```

**Expected Output:**
```
node_modules/@nestjs/
- common
- config
- core
- jwt
- passport
- platform-express
- typeorm
```

---

## Step 6: Create Basic Structure

**Duration:** 20 minutes

### 6.1 Create Main Bootstrap

Create `services/auth-service/src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Session for OAuth
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'chatai-session-secret-change-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
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

### 6.2 Create App Module

Create `services/auth-service/src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    AuthModule,
  ],
})
export class AppModule {}
```

### 6.3 Create Auth Module

Create `services/auth-service/src/auth/auth.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

### 6.4 Create Auth Controller (Basic)

Create `services/auth-service/src/auth/auth.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
```

### 6.5 Create Auth Service (Basic)

Create `services/auth-service/src/auth/auth.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Implement in Day 2
    return null;
  }

  async login(user: any) {
    // TODO: Implement in Day 2
    return {
      message: 'Login endpoint - to be implemented',
    };
  }

  async register(email: string, password: string) {
    // TODO: Implement in Day 2
    return {
      message: 'Register endpoint - to be implemented',
    };
  }
}
```

---

## Step 7: Test Setup

**Duration:** 10 minutes

### 7.1 Update .env File

Add to root `.env` file:

```bash
# AUTH SERVICE
AUTH_SERVICE_PORT=4002
SESSION_SECRET=chatai-session-secret-change-in-production-use-strong-random-string

# JWT (already exists, verify)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d
```

### 7.2 Start Service

```bash
# From auth-service directory
pnpm start:dev
```

**Expected Output:**
```
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [InstanceLoader] ConfigModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [InstanceLoader] AuthModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [RoutesResolver] AuthController {/auth}: +3ms
[Nest] 12345  - 01/15/2024, 10:00:00 AM     LOG [RouterExplorer] Mapped {/auth/health, GET} route +2ms
🔐 Auth Service running on http://localhost:4002
```

### 7.3 Test Health Endpoint

Open new terminal:

```bash
# Test health endpoint
curl http://localhost:4002/auth/health

# Expected response:
# {
#   "status": "ok",
#   "service": "auth-service",
#   "timestamp": "2024-01-15T10:00:00.000Z"
# }
```

### 7.4 Verify No Errors

Check the terminal running the service - should show no errors.

**Stop the service:** Press `Ctrl+C`

---

## Step 8: Commit Changes

**Duration:** 10 minutes

### 8.1 Review Changes

```bash
# From project root
cd ../..
git status

# Should show:
# services/auth-service/ (new directory)
# .env (modified)
```

### 8.2 Add and Commit

```bash
# Add all changes
git add services/auth-service
git add .env

# Commit with conventional format
git commit -m "feat(auth): setup auth-service project structure (M2 Day 1)

- Created auth-service directory with NestJS
- Configured TypeScript, ESLint, Prettier
- Added all dependencies (JWT, Passport, OAuth, bcrypt)
- Created basic module structure
- Added health check endpoint
- Service starts successfully on port 4002

Progress: M2-S1 (Day 1 of 5)
Next: Day 2 - Email/Phone authentication

Relates to CAP-7"
```

### 8.3 Push to Branch

```bash
# Create feature branch if not exists
git checkout -b feature/M2-auth-service

# Push
git push origin feature/M2-auth-service
```

### 8.4 Update Jira

1. Go to Jira: https://thanhhaunv.atlassian.net
2. Find story: CAP-7 (M2 - Auth Service)
3. Add comment:
   ```
   ✅ Day 1 Complete - Project Setup
   
   Completed:
   - Auth service directory structure
   - TypeScript configuration
   - ESLint & Prettier setup
   - Basic NestJS modules
   - Health check endpoint (/auth/health)
   - Service starts on port 4002
   
   Next: Day 2 - Email/Phone authentication
   ```
4. Move subtask "M2-S1: Project Setup" to "Done"

---

## Verification Checklist

### ✅ Day 1 Completion Checklist

Run through this checklist to confirm Day 1 is complete:

```bash
# 1. ✅ Directory structure exists
ls -la services/auth-service/
# Expected: src/, test/, package.json, tsconfig.json, nest-cli.json

# 2. ✅ Dependencies installed
ls services/auth-service/node_modules/@nestjs/
# Expected: common, config, core, jwt, passport, etc.

# 3. ✅ Service can start
cd services/auth-service
pnpm start:dev
# Expected: "🔐 Auth Service running on http://localhost:4002"

# 4. ✅ Health endpoint works
curl http://localhost:4002/auth/health
# Expected: {"status":"ok","service":"auth-service",...}

# 5. ✅ Linting works
pnpm lint
# Expected: No errors or auto-fixed

# 6. ✅ Format works
pnpm format
# Expected: Files formatted

# 7. ✅ Build works
pnpm build
# Expected: dist/ folder created

# 8. ✅ Tests run (should have 0 tests for now)
pnpm test
# Expected: "No tests found"

# 9. ✅ Changes committed
git log -1 --oneline
# Expected: "feat(auth): setup auth-service project structure..."

# 10. ✅ Jira updated
# Check: CAP-7 has comment about Day 1 completion
```

**All items checked? 🎉 Day 1 is COMPLETE!**

---

## Troubleshooting

### Common Issues

#### Issue 1: Port 4002 already in use

**Solution:**
```bash
# Find process using port
lsof -i :4002

# Kill the process
kill -9 <PID>

# Or change port in .env
AUTH_SERVICE_PORT=4003
```

#### Issue 2: Cannot find module '@chatai/shared'

**Solution:**
```bash
# Build shared package first
cd packages/shared
pnpm build

# Verify dist folder exists
ls -la dist/

# Restart auth service
cd ../../services/auth-service
pnpm start:dev
```

#### Issue 3: pnpm install fails

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Try again
pnpm install

# If still fails, delete node_modules and try again
rm -rf node_modules
pnpm install
```

#### Issue 4: ESLint errors

**Solution:**
```bash
# Auto-fix linting errors
pnpm lint

# If errors persist, check .eslintrc.json configuration
cat .eslintrc.json
```

#### Issue 5: TypeScript errors

**Solution:**
```bash
# Check tsconfig.json paths
cat tsconfig.json

# Verify shared package is built
ls ../../packages/shared/dist/

# Clean and rebuild
pnpm build
```

---

## Summary

### 📊 Day 1 Metrics

**Time Spent:** ~2 hours  
**Files Created:** 10+  
**Lines of Code:** ~300  
**Dependencies Installed:** 50+  

**Key Achievements:**
- ✅ Auth service project structure complete
- ✅ All configurations in place
- ✅ Service can start successfully
- ✅ Health check endpoint working
- ✅ Ready for Day 2 implementation

### 📁 Files Created

```
services/auth-service/
├── src/
│   ├── auth/
│   │   ├── auth.module.ts (17 lines)
│   │   ├── auth.controller.ts (18 lines)
│   │   └── auth.service.ts (22 lines)
│   ├── app.module.ts (14 lines)
│   └── main.ts (42 lines)
├── test/ (empty for now)
├── package.json (130 lines)
├── tsconfig.json (30 lines)
├── tsconfig.build.json (5 lines)
├── nest-cli.json (9 lines)
├── .eslintrc.json (30 lines)
├── .prettierrc (7 lines)
└── .prettierignore (4 lines)
```

### 🎯 Next Steps

**Tomorrow (Day 2):**
- Email/phone signup implementation
- Email/phone login implementation
- Password hashing with bcrypt
- User validation logic
- DTOs for signup/login
- Integration with User entity from shared package
- Unit tests for auth service

**Estimated Time:** 3-4 hours

---

## Resources

### Documentation

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

### Useful Commands

```bash
# Start service in development mode
pnpm start:dev

# Start service in debug mode
pnpm start:debug

# Build for production
pnpm build

# Run production build
pnpm start:prod

# Run tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Lint code
pnpm lint

# Format code
pnpm format

# View logs
docker-compose logs -f
```

---

## 🎉 Day 1 Complete!

**Congratulations!** You've successfully completed Day 1 of M2 - Auth Service.

### Key Takeaways:

1. ✅ **Solid Foundation** - Project structure ready
2. ✅ **Proper Configuration** - TypeScript, ESLint, Prettier all set
3. ✅ **Dependencies Ready** - All auth packages installed
4. ✅ **Service Running** - Basic health check working

### Ready for Day 2?

**Tomorrow we'll implement:**
- 📧 Email/phone authentication
- 🔐 Password hashing
- 🎫 JWT token generation
- ✅ User validation

**Get some rest! Tomorrow will be coding-heavy! 🚀**

---

**Questions or blockers?**
- Review troubleshooting section
- Check NestJS authentication docs
- Ask in Slack #dev-backend

**See you tomorrow for Day 2! 💪**

