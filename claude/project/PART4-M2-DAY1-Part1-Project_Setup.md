# M2 - DAY 1 - PART 1: PROJECT SETUP

**Milestone:** M2 - Auth Service  
**Day:** 1 of 5 (Monday)  
**Part:** 1 of 2  
**Duration:** 2 hours  
**Goal:** Initialize auth-service project with all dependencies

---

## 📋 WHAT WE'RE BUILDING TODAY

**Day 1 Overview:**
- Part 1 (2h): Project setup + dependencies ← YOU ARE HERE
- Part 2 (2h): Implement signup endpoint

**Part 1 Tasks:**
1. Create auth-service NestJS project
2. Install all dependencies
3. Setup database connection (reuse M1 config)
4. Create auth module structure
5. Configure environment variables
6. Verify project runs

---

## ✅ TASK 1.1: Create Auth Service Project (30 min)

**Step 1: Navigate to services folder**

```bash
cd ChatAI-Platform/services
```

---

**Step 2: Create new NestJS project**

```bash
npx @nestjs/cli new auth-service --skip-git --skip-install
```

**When prompted:**
- Package manager: **pnpm**

**Output:**
```
CREATE auth-service/.eslintrc.js (663 bytes)
CREATE auth-service/.prettierrc (51 bytes)
CREATE auth-service/nest-cli.json (171 bytes)
CREATE auth-service/package.json (1960 bytes)
CREATE auth-service/README.md (3339 bytes)
CREATE auth-service/tsconfig.build.json (97 bytes)
CREATE auth-service/tsconfig.json (546 bytes)
CREATE auth-service/src/app.controller.spec.ts (617 bytes)
CREATE auth-service/src/app.controller.ts (274 bytes)
CREATE auth-service/src/app.module.ts (249 bytes)
CREATE auth-service/src/app.service.ts (142 bytes)
CREATE auth-service/src/main.ts (208 bytes)
CREATE auth-service/test/app.e2e-spec.ts (630 bytes)
CREATE auth-service/test/jest-e2e.json (183 bytes)

✔ Installation in progress... ☕

🚀  Successfully created project auth-service
```

---

**Step 3: Navigate into project**

```bash
cd auth-service
```

---

## ✅ TASK 1.2: Install Dependencies (15 min)

**Install core NestJS dependencies:**

```bash
pnpm install @nestjs/config @nestjs/typeorm typeorm pg
```

**Install authentication dependencies:**

```bash
pnpm install @nestjs/passport @nestjs/jwt passport passport-local passport-jwt bcrypt
```

**Install OAuth dependencies:**

```bash
pnpm install passport-google-oauth20 passport-facebook
```

**Install validation dependencies:**

```bash
pnpm install class-validator class-transformer
```

**Install dev dependencies:**

```bash
pnpm install -D @types/passport-local @types/passport-jwt @types/bcrypt @types/passport-google-oauth20 @types/passport-facebook
```

---

**Verify package.json dependencies:**

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
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
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/passport-facebook": "^3.0.3",
    "@types/passport-google-oauth20": "^2.0.14",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/supertest": "^2.0.12",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
```

---

## ✅ TASK 1.3: Setup Environment Variables (15 min)

**Step 1: Create .env symlink**

```bash
# From services/auth-service
ln -s ../../.env .env

# Or copy if symlink doesn't work on Windows
cp ../../.env .env
```

---

**Step 2: Add auth-specific variables to root .env**

Open `ChatAI-Platform/.env` and add:

```bash
# ==============================================
# AUTH SERVICE
# ==============================================
AUTH_SERVICE_PORT=3001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

# Password Hashing
BCRYPT_ROUNDS=10
```

**⚠️ IMPORTANT:** In production, use strong random secrets:
```bash
# Generate secure secrets (run in terminal):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

**Step 3: Update .env.example**

Also add to `ChatAI-Platform/.env.example`:

```bash
# AUTH SERVICE
AUTH_SERVICE_PORT=3001
JWT_SECRET=
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
```

---

## ✅ TASK 1.4: Create Project Structure (20 min)

**Create folder structure:**

```bash
# From services/auth-service
mkdir -p src/auth/dto
mkdir -p src/auth/strategies
mkdir -p src/auth/guards
mkdir -p src/auth/interfaces
mkdir -p src/config
mkdir -p src/common/decorators
```

**Verify structure:**

```bash
tree src -L 3
```

**Expected output:**
```
src/
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── interfaces/
│   └── strategies/
├── common/
│   └── decorators/
├── config/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## ✅ TASK 1.5: Configure Database Connection (20 min)

**Create:** `src/config/database.config.ts`

```typescript
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'chatai',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Never true in production
    logging: process.env.NODE_ENV === 'development',
  })
);
```

---

**Create:** `src/config/jwt.config.ts`

```typescript
import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
  })
);
```

---

**Create:** `src/config/index.ts` (barrel export)

```typescript
export * from './database.config';
export * from './jwt.config';
```

---

## ✅ TASK 1.6: Create Auth Module Structure (20 min)

**Create:** `src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from '../config';

// We'll import User entity from user-service
// For now, we'll create a reference
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
    // TypeORM entities will be added later
    // TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

---

**Create:** `src/auth/auth.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

**Create:** `src/auth/auth.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<any> {
    // Will implement in Part 2
    return null;
  }

  async login(user: any) {
    // Will implement in Part 2
    return null;
  }

  async signup(signupDto: any) {
    // Will implement in Part 2
    return null;
  }
}
```

---

## ✅ TASK 1.7: Update App Module (15 min)

**Update:** `src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig, jwtConfig } from './config';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),

    // Auth module
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

**Update:** `src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('ChatAI Platform - Auth Service')
    .setDescription('Authentication and Authorization API')
    .setVersion('0.1.0')
    .addTag('auth', 'Authentication endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.AUTH_SERVICE_PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Auth Service running on port ${port}`);
  console.log(`📊 Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
```

---

**Install Swagger dependency:**

```bash
pnpm install @nestjs/swagger swagger-ui-express
```

---

## ✅ TASK 1.8: Test Project Runs (10 min)

**Step 1: Start the service**

```bash
cd services/auth-service
pnpm run start:dev
```

**Expected output:**

```
[Nest] INFO  Starting Nest application...
[Nest] INFO  ConfigModule dependencies initialized
[Nest] INFO  TypeOrmModule dependencies initialized
[Nest] INFO  PassportModule dependencies initialized
[Nest] INFO  JwtModule dependencies initialized
[Nest] INFO  AuthModule dependencies initialized
[Nest] INFO  Mapped {/auth/health, GET} route
🚀 Auth Service running on port 3001
📊 Database: chatai@localhost:5432
📚 Swagger docs: http://localhost:3001/api/docs
```

---

**Step 2: Test health check**

Open new terminal:

```bash
curl http://localhost:3001/auth/health
```

**Expected response:**

```json
{
  "status": "ok",
  "service": "auth-service",
  "timestamp": "2025-10-28T10:30:00.000Z"
}
```

---

**Step 3: Test Swagger UI**

Open browser: http://localhost:3001/api/docs

**Verify:**
- ✅ Swagger UI loads
- ✅ "auth" tag visible
- ✅ GET /auth/health endpoint visible
- ✅ Can execute test request

---

**Step 4: Stop the service**

```bash
# In the terminal running the service
Ctrl+C
```

---

## ✅ TASK 1.9: Create User Entity Reference (10 min)

**Since we need User entity from M1, we'll create a shared approach:**

**Create:** `src/auth/entities/user.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string; // Hashed with bcrypt

  @Column({
    type: 'enum',
    enum: ['email', 'google', 'facebook', 'tiktok'],
    default: 'email',
  })
  auth_provider: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  oauth_id: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'member'],
    default: 'member',
  })
  role: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

**Note:** This is the same User entity from M1. In production, consider:
- Shared entities package
- Or import from user-service
- For now, we duplicate to keep services independent

---

**Update:** `src/auth/auth.module.ts` (add User entity)

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
    TypeOrmModule.forFeature([User]), // Add User entity
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

---

## ✅ TASK 1.10: Commit Progress (5 min)

**Check status:**

```bash
cd ChatAI-Platform
git status
```

**Add and commit:**

```bash
git add services/auth-service
git add .env .env.example

git commit -m "feat(auth): initialize auth-service project

- Created NestJS auth-service
- Installed all dependencies (passport, jwt, bcrypt, oauth)
- Setup database connection with TypeORM
- Created auth module structure
- Added JWT configuration
- Setup Swagger documentation
- Added User entity reference
- Verified service runs on port 3001"

git push origin develop
```

---

## ✅ END OF PART 1 CHECKLIST

**Verify everything is complete:**

- [ ] Auth-service project created
- [ ] All dependencies installed (~20 packages)
- [ ] Environment variables configured
- [ ] Project structure created (dto, strategies, guards folders)
- [ ] Database configuration added
- [ ] JWT configuration added
- [ ] Auth module created
- [ ] User entity reference added
- [ ] Service runs successfully on port 3001
- [ ] Health check endpoint working
- [ ] Swagger UI accessible
- [ ] Committed to Git

---

## 📊 PART 1 SUMMARY

**What we built:**
- ✅ Complete NestJS auth-service project
- ✅ All authentication dependencies installed
- ✅ Database connection configured
- ✅ JWT module setup
- ✅ Swagger documentation ready
- ✅ User entity available
- ✅ Health check endpoint working

**Files created:**
- `src/config/database.config.ts`
- `src/config/jwt.config.ts`
- `src/config/index.ts`
- `src/auth/auth.module.ts`
- `src/auth/auth.controller.ts`
- `src/auth/auth.service.ts`
- `src/auth/entities/user.entity.ts`
- Updated `src/app.module.ts`
- Updated `src/main.ts`

**Dependencies installed:**
- Passport (local, jwt, google, facebook)
- JWT
- bcrypt
- TypeORM
- class-validator
- Swagger

**Project ready for:** Signup implementation ✅

---

## 🚀 NEXT: PART 2

**File:** `M2-Day1-Part2-Signup-Implementation.md`

**What we'll build:**
- DTOs (SignupDto, LoginDto)
- Password hashing with bcrypt
- POST /auth/signup endpoint
- Input validation
- Error handling
- Tests

**Estimated time:** 2 hours

---

**Status:** Part 1 complete (2 hours)  
**Progress:** M2 Day 1 - 50% (1/2 parts)

**Bạn muốn tiếp Part 2 luôn không?** 🚀
