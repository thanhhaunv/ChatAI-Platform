Bạn nói đúng! Để tôi tạo **M2 theo TỪNG NGÀY**, mỗi ngày đầy đủ code, xong ngày nào bạn confirm rồi tôi mới gen ngày tiếp theo.

Bắt đầu với **DAY 1** nhé:✅ **Hoàn thành M2 - DAY 1: PROJECT SETUP!**

File này bao gồm **HOÀN CHỈNH DAY 1**:

## ✅ Nội dung Day 1:

1. ✅ **STEP 1-2:** Create project + package.json đầy đủ
2. ✅ **STEP 3:** NestJS config files (nest-cli.json, tsconfig.json)
3. ✅ **STEP 4:** Install dependencies
4. ✅ **STEP 5-6:** Database config + Database module
5. ✅ **STEP 7:** App module
6. ✅ **STEP 8:** Main bootstrap
7. ✅ **STEP 9:** Health check (controller + module)
8. ✅ **STEP 10:** Test service (với curl commands)
9. ✅ **STEP 11:** Project structure documentation
10. ✅ **STEP 12:** README
11. ✅ **Verification checklist**
12. ✅ **Troubleshooting guide**
13. ✅ **Git commit guide**
14. ✅ **Day 1 summary**

---
# M2 - AUTH SERVICE - DAY 1: PROJECT SETUP

**Duration:** Day 1 (4 hours)  
**Goal:** Setup auth service project structure  
**Team:** Backend Dev 1  

---

## 📋 OVERVIEW

**Today we will:**
- Create auth-service project
- Setup package.json with all dependencies
- Configure TypeScript & NestJS
- Setup database connection
- Create basic app structure
- Test connection

---

## STEP 1: CREATE PROJECT (30 min)

### 1.1 Create Directory

```bash
cd services
mkdir -p auth-service
cd auth-service
```

### 1.2 Initialize Project

```bash
pnpm init
```

---

## STEP 2: CREATE PACKAGE.JSON (15 min)

Create `package.json`:

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

---

## STEP 3: CREATE NESTJS CONFIG FILES (15 min)

### 3.1 Create nest-cli.json

Create `nest-cli.json`:

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

### 3.2 Create tsconfig.json

Create `tsconfig.json`:

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

---

## STEP 4: INSTALL DEPENDENCIES (10 min)

```bash
pnpm install
```

Expected output:
```
✓ Packages installed
```

---

## STEP 5: CREATE DATABASE CONFIG (30 min)

### 5.1 Create Config Directory

```bash
mkdir -p src/config
```

### 5.2 Create Database Config

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

---

## STEP 6: CREATE DATABASE MODULE (20 min)

### 6.1 Create Database Directory

```bash
mkdir -p src/database
```

### 6.2 Create Database Module

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

## STEP 7: CREATE APP MODULE (15 min)

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

---

## STEP 8: CREATE MAIN BOOTSTRAP (20 min)

Create `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

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

## STEP 9: CREATE HEALTH CHECK (30 min)

### 9.1 Create Health Directory

```bash
mkdir -p src/health
```

### 9.2 Create Health Controller

Create `src/health/health.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private connection: Connection) {}

  @Get()
  async check() {
    const dbHealthy = this.connection.isInitialized;

    return {
      status: dbHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      service: 'auth-service',
      version: '1.0.0',
      database: {
        status: dbHealthy ? 'connected' : 'disconnected',
        type: 'PostgreSQL',
      },
    };
  }

  @Get('db')
  async checkDatabase() {
    try {
      const result = await this.connection.query('SELECT 1 as result');
      return {
        status: 'ok',
        database: 'connected',
        result: result[0].result,
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
        error: error.message,
      };
    }
  }
}
```

### 9.3 Create Health Module

Create `src/health/health.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
```

### 9.4 Update App Module

Update `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
```

---

## STEP 10: TEST SERVICE (30 min)

### 10.1 Start Service

```bash
pnpm start:dev
```

Expected output:
```
🔐 Auth Service running on http://localhost:4002
```

### 10.2 Test Health Endpoints

In another terminal:

```bash
# Test main health endpoint
curl http://localhost:4002/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2024-01-15T10:00:00.000Z",
#   "service": "auth-service",
#   "version": "1.0.0",
#   "database": {
#     "status": "connected",
#     "type": "PostgreSQL"
#   }
# }

# Test database health
curl http://localhost:4002/health/db

# Expected response:
# {
#   "status": "ok",
#   "database": "connected",
#   "result": 1
# }
```

---

## STEP 11: CREATE PROJECT STRUCTURE DOCUMENTATION (15 min)

Create `PROJECT-STRUCTURE.md`:

```markdown
# Auth Service - Project Structure

```
auth-service/
├── src/
│   ├── config/
│   │   └── database.config.ts    # Database configuration
│   ├── database/
│   │   └── database.module.ts    # Database module
│   ├── health/
│   │   ├── health.controller.ts  # Health check endpoints
│   │   └── health.module.ts      # Health module
│   ├── app.module.ts             # Root application module
│   └── main.ts                   # Bootstrap file
├── test/                         # Test files
├── nest-cli.json                 # NestJS CLI config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

## Files Created Today

1. **Configuration:**
   - package.json
   - nest-cli.json
   - tsconfig.json

2. **Source Code:**
   - src/config/database.config.ts
   - src/database/database.module.ts
   - src/health/health.controller.ts
   - src/health/health.module.ts
   - src/app.module.ts
   - src/main.ts

3. **Documentation:**
   - PROJECT-STRUCTURE.md
```

---

## STEP 12: CREATE README (15 min)

Create `README.md`:

```markdown
# Auth Service

Authentication service with OAuth support.

## Status

✅ Day 1 Complete - Project setup and health checks working

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start:dev

# Test health check
curl http://localhost:4002/health
```

## Environment Variables

```bash
AUTH_SERVICE_PORT=4002
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=chatai_platform
```

## Progress

- [x] Day 1: Project setup & health checks
- [ ] Day 2: Email/phone authentication
- [ ] Day 3: OAuth integration
- [ ] Day 4: Guards & decorators
- [ ] Day 5: Testing

## Health Endpoints

- `GET /health` - Service health status
- `GET /health/db` - Database connection status
```

---

## VERIFICATION CHECKLIST

### ✅ Day 1 Completion Checklist

```bash
# 1. Project created
ls -la
# Expected: package.json, src/, nest-cli.json, tsconfig.json

# 2. Dependencies installed
ls node_modules/@nestjs
# Expected: common, core, config, typeorm, etc.

# 3. Build works
pnpm build
# Expected: dist/ folder created

# 4. Service starts
pnpm start:dev
# Expected: "🔐 Auth Service running on http://localhost:4002"

# 5. Health endpoint works
curl http://localhost:4002/health
# Expected: JSON response with "status": "ok"

# 6. Database health works
curl http://localhost:4002/health/db
# Expected: JSON response with "database": "connected"

# 7. Files structure correct
tree -L 3 src/
# Expected: config/, database/, health/, app.module.ts, main.ts
```

---

## TROUBLESHOOTING

### Issue: Cannot find module '@chatai/shared'

**Solution:**
```bash
cd ../../packages/shared
pnpm build
cd ../../services/auth-service
pnpm install
```

### Issue: Database connection failed

**Solution:**
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart if needed
docker-compose restart postgres

# Check .env file has correct credentials
cat ../../.env | grep DATABASE
```

### Issue: Port 4002 already in use

**Solution:**
```bash
# Find process
lsof -i :4002

# Kill process
kill -9 <PID>

# Or use different port in .env
echo "AUTH_SERVICE_PORT=4003" >> ../../.env
```

---

## COMMIT DAY 1

```bash
# From root directory
cd ../..

git add services/auth-service

git commit -m "feat(auth): Day 1 - setup auth service project

- Created NestJS project structure
- Configured TypeScript and NestJS
- Setup database connection
- Added health check endpoints
- Project ready for authentication implementation

Files:
- package.json with all dependencies
- Database configuration
- Health check module
- Basic app structure

Tests: Health endpoints working ✅

Related: CAP-7"

git push origin develop
```

---

## DAY 1 SUMMARY

### ✅ Completed

1. **Project Structure**
   - Created auth-service directory
   - Setup package.json with dependencies
   - Configured NestJS & TypeScript

2. **Database**
   - Created database config
   - Created database module
   - Connected to PostgreSQL

3. **Health Checks**
   - Health controller with 2 endpoints
   - Service health check
   - Database health check

4. **Testing**
   - Service starts successfully
   - Health endpoints working
   - Database connection verified

### 📊 Metrics

- **Files created:** 10
- **Lines of code:** ~200
- **Time spent:** 4 hours
- **Dependencies:** 30+ packages

### 🎯 Tomorrow (Day 2)

**Email/Phone Authentication:**
- Create DTOs (Signup, Login, Refresh)
- Implement Auth Service
- Add bcrypt password hashing
- Create Auth Controller
- JWT token generation

---

## 🎉 DAY 1 COMPLETE!

**All setup working! Ready for Day 2!** 🚀

**Confirm Day 1 để tôi tạo Day 2?**
