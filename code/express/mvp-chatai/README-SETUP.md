# 🎯 PHẦN 1: SETUP CƠ BẢN

**Mục tiêu:** Setup Docker + Database + Environment trong 5 phút

**Thời gian:** 10-15 phút

---

## 📁 CẤU TRÚC PHẦN 1

```
mvp-chatai/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README-SETUP.md
```

---

## 📄 FILE 1: `docker-compose.yml`

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: chatai-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: chatai
      POSTGRES_PASSWORD: chatai123
      POSTGRES_DB: chatai_mvp
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U chatai']
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis (for caching & sessions)
  redis:
    image: redis:7-alpine
    container_name: chatai-redis
    restart: unless-stopped
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # pgAdmin (optional - for database management)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: chatai-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@chatai.local
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - '5050:80'
    depends_on:
      - postgres

volumes:
  postgres_data:
  redis_data:
```

---

## 📄 FILE 2: `.env.example`

```bash
# Database
DATABASE_URL="postgresql://chatai:chatai123@localhost:5432/chatai_mvp?schema=public"

# JWT Secret (change in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# OpenAI API
OPENAI_API_KEY="sk-your-openai-api-key-here"
OPENAI_MODEL="gpt-4"

# Google Gemini API (optional)
GEMINI_API_KEY="your-gemini-api-key-here"

# Redis
REDIS_URL="redis://localhost:6379"

# App Config
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# File Upload (MinIO/S3 - optional for now)
# S3_ENDPOINT="http://localhost:9000"
# S3_ACCESS_KEY="minioadmin"
# S3_SECRET_KEY="minioadmin"
```

---

## 📄 FILE 3: `.gitignore`

```bash
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment
.env
.env.local
.env.*.local

# Build
dist/
build/
.next/
out/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Database
*.db
*.sqlite

# Prisma
prisma/migrations/dev.db

# Docker
docker-compose.override.yml
```

---

## 📄 FILE 4: `README-SETUP.md`

```markdown
# 🚀 MVP ChatAI - Setup Guide (5 phút)

## Bước 1: Clone/Tạo folder

```bash
mkdir mvp-chatai
cd mvp-chatai
```

## Bước 2: Copy files

Copy 3 files sau vào folder:
- `docker-compose.yml`
- `.env.example`
- `.gitignore`

## Bước 3: Tạo .env

```bash
cp .env.example .env
```

**⚠️ QUAN TRỌNG:** Thêm OpenAI API key vào `.env`:
```bash
OPENAI_API_KEY="sk-your-real-api-key-here"
```

Lấy key tại: https://platform.openai.com/api-keys

## Bước 4: Start Docker

```bash
docker-compose up -d
```

**Verify:**
```bash
docker ps
```

Bạn sẽ thấy 3 containers:
- ✅ chatai-postgres (port 5432)
- ✅ chatai-redis (port 6379)
- ✅ chatai-pgadmin (port 5050)

## Bước 5: Test Database

### Option A: Dùng psql (nếu có)
```bash
psql postgresql://chatai:chatai123@localhost:5432/chatai_mvp
```

### Option B: Dùng pgAdmin
1. Mở: http://localhost:5050
2. Login: `admin@chatai.local` / `admin123`
3. Add server:
   - Name: ChatAI Local
   - Host: postgres (hoặc host.docker.internal)
   - Port: 5432
   - Database: chatai_mvp
   - Username: chatai
   - Password: chatai123

## ✅ Setup Complete!

**Services Running:**
- 🗄️ PostgreSQL: `localhost:5432`
- 🔴 Redis: `localhost:6379`
- 🖥️ pgAdmin: http://localhost:5050

**Next Step:**
→ Phần 2: Backend Init + Database Schema

## 🛑 Troubleshooting

### Port đã sử dụng?
```bash
# Kiểm tra port
lsof -i :5432
lsof -i :6379

# Đổi port trong docker-compose.yml
# Ví dụ: 5433:5432 thay vì 5432:5432
```

### Docker không start?
```bash
# Restart Docker Desktop
# Hoặc
docker-compose down
docker-compose up -d --force-recreate
```

### Xóa và reset lại?
```bash
docker-compose down -v
docker-compose up -d
```
```

---

## ✅ CHECKLIST PHẦN 1

Copy 4 files vào folder `mvp-chatai/`:
- [ ] `docker-compose.yml`
- [ ] `.env.example`
- [ ] `.gitignore`
- [ ] `README-SETUP.md`

Chạy lệnh:
- [ ] `cp .env.example .env`
- [ ] Thêm OpenAI API key vào `.env`
- [ ] `docker-compose up -d`
- [ ] `docker ps` (verify 3 containers running)

---

## 🧪 TEST PHẦN 1

```bash
# Test PostgreSQL
docker exec -it chatai-postgres psql -U chatai -d chatai_mvp -c "SELECT version();"

# Expected output:
# PostgreSQL 15.x on x86_64-pc-linux-musl...

# Test Redis
docker exec -it chatai-redis redis-cli ping

# Expected output:
# PONG
```

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 2"** → Tôi gửi Backend Init + Prisma Schema
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Muốn điều chỉnh [X]"** → Tôi update

---

## 💡 LƯU Ý

**Folder structure bây giờ:**
```
mvp-chatai/
├── docker-compose.yml      ✅ Done
├── .env                     ✅ Done (đừng commit!)
├── .env.example             ✅ Done
├── .gitignore               ✅ Done
└── README-SETUP.md          ✅ Done

Next: backend/ và frontend/ folders
```

**Thời gian:** Setup xong trong ~5 phút

**Chờ confirm! 🚀**
# 🎯 PHẦN 2: BACKEND INIT + DATABASE SCHEMA

**Mục tiêu:** Setup NestJS + Prisma + 6 tables với Threading

**Thời gian:** 20-25 phút

---

## 📁 CẤU TRÚC PHẦN 2

```
mvp-chatai/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .prettierrc
│   ├── .eslintrc.js
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       └── prisma/
│           ├── prisma.module.ts
│           └── prisma.service.ts
```

---

## 📄 FILE 1: `backend/package.json`

```json
{
  "name": "chatai-backend",
  "version": "1.0.0",
  "description": "ChatAI MVP Backend",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/platform-socket.io": "^10.3.0",
    "@nestjs/websockets": "^10.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@prisma/client": "^5.8.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "axios": "^1.6.5",
    "socket.io": "^4.6.1",
    "dotenv": "^16.3.1",
    "reflect-metadata": "^0.1.14",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/schematics": "^10.1.0",
    "@types/node": "^20.11.0",
    "@types/express": "^4.17.21",
    "@types/bcrypt": "^5.0.2",
    "@types/passport-jwt": "^4.0.1",
    "@types/passport-local": "^1.0.38",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "prisma": "^5.8.0",
    "rimraf": "^5.0.5",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

---

## 📄 FILE 2: `backend/tsconfig.json`

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
    "esModuleInterop": true
  }
}
```

---

## 📄 FILE 3: `backend/nest-cli.json`

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

---

## 📄 FILE 4: `backend/.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

---

## 📄 FILE 5: `backend/.eslintrc.js`

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

---

## 📄 FILE 6: `backend/prisma/schema.prisma`

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// USER MODEL
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  ownedProjects  Project[]        @relation("ProjectOwner")
  projectMembers ProjectMember[]
  messages       Message[]

  @@map("users")
}

// PROJECT MODEL
model Project {
  id        Int      @id @default(autoincrement())
  name      String
  ownerId   Int      @map("owner_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  owner         User            @relation("ProjectOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  members       ProjectMember[]
  conversations Conversation[]

  @@map("projects")
}

// PROJECT MEMBER MODEL (for RBAC)
model ProjectMember {
  id        Int      @id @default(autoincrement())
  projectId Int      @map("project_id")
  userId    Int      @map("user_id")
  role      String   @default("member") // owner, editor, viewer
  createdAt DateTime @default(now()) @map("created_at")

  // Relations
  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([projectId, userId])
  @@map("project_members")
}

// CONVERSATION MODEL (Threading!)
model Conversation {
  id        Int      @id @default(autoincrement())
  projectId Int      @map("project_id")
  threadId  String   @unique @map("thread_id") @default(uuid()) // UUID for threading
  title     String   @default("New Conversation")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  project  Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  messages Message[]

  @@index([projectId])
  @@index([threadId])
  @@map("conversations")
}

// MESSAGE MODEL
model Message {
  id             Int      @id @default(autoincrement())
  conversationId Int      @map("conversation_id")
  userId         Int?     @map("user_id")
  agentId        Int?     @map("agent_id")
  content        String   @db.Text
  role           String   // user, assistant, system
  tokens         Int      @default(0)
  createdAt      DateTime @default(now()) @map("created_at")

  // Relations
  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  user         User?        @relation(fields: [userId], references: [id], onDelete: SetNull)
  agent        Agent?       @relation(fields: [agentId], references: [id], onDelete: SetNull)

  @@index([conversationId])
  @@map("messages")
}

// AGENT MODEL
model Agent {
  id        Int      @id @default(autoincrement())
  name      String
  type      String   // openai, gemini, custom
  apiKey    String?  @map("api_key") @db.Text // Encrypted in production
  model     String   @default("gpt-4")
  active    Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  messages Message[]

  @@map("agents")
}
```

---

## 📄 FILE 7: `backend/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Backend running on: http://localhost:${port}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL?.split('@')[1]}`);
}

bootstrap();
```

---

## 📄 FILE 8: `backend/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
```

---

## 📄 FILE 9: `backend/src/prisma/prisma.module.ts`

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## 📄 FILE 10: `backend/src/prisma/prisma.service.ts`

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }
}
```

---

## ✅ SETUP PHẦN 2

**Bước 1: Tạo folder backend**
```bash
cd mvp-chatai
mkdir backend
cd backend
```

**Bước 2: Copy 10 files trên vào đúng vị trí**

**Bước 3: Install dependencies**
```bash
npm install
```

**Bước 4: Generate Prisma Client**
```bash
npx prisma generate
```

**Bước 5: Push schema to database**
```bash
npx prisma db push
```

**Expected output:**
```
✅ Your database is now in sync with your Prisma schema
✔ Generated Prisma Client
```

**Bước 6: Start backend**
```bash
npm run start:dev
```

**Expected output:**
```
🚀 Backend running on: http://localhost:3001
📊 Database: localhost:5432/chatai_mvp
✅ Database connected
```

---

## 🧪 TEST PHẦN 2

**Test 1: Check database tables**
```bash
npx prisma studio
```

Mở: http://localhost:5555

Bạn sẽ thấy 6 tables:
- ✅ User
- ✅ Project
- ✅ ProjectMember
- ✅ Conversation (có threadId!)
- ✅ Message
- ✅ Agent

**Test 2: Check API**
```bash
curl http://localhost:3001
```

**Test 3: Seed sample agent (Optional)**

Tạo file `backend/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default agents
  const openai = await prisma.agent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'GPT-4',
      type: 'openai',
      model: 'gpt-4',
      apiKey: process.env.OPENAI_API_KEY,
    },
  });

  const gemini = await prisma.agent.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Gemini Pro',
      type: 'gemini',
      model: 'gemini-pro',
      apiKey: process.env.GEMINI_API_KEY || '',
      active: false, // Disable if no API key
    },
  });

  console.log('✅ Seeded agents:', { openai, gemini });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Chạy seed:
```bash
npm run prisma:seed
```

---

## 📊 DATABASE SCHEMA OVERVIEW

```
users (auth)
  ↓
projects (multi-tenant)
  ↓
conversations (threading with thread_id!)
  ↓
messages (user + assistant + tokens)
  ↑
agents (GPT-4, Gemini)
```

**Key Features:**
- ✅ Threading: `Conversation.threadId` (UUID)
- ✅ RBAC: `ProjectMember.role` (owner/editor/viewer)
- ✅ Multi-agent: `Message.agentId` → `Agent`
- ✅ Token tracking: `Message.tokens`

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 3"** → Tôi gửi Auth Module (Login/Signup + JWT)
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Cần thêm [X]"** → Tôi bổ sung

---

## 💡 CURRENT STATUS

```
✅ Phần 1: Docker + Database
✅ Phần 2: Backend Init + 6 Tables

Next: Phần 3 - Auth Module
```

**Thời gian setup: ~20 phút**

**Chờ confirm! 🚀**
# 🎯 PHẦN 3: AUTH MODULE (LOGIN/SIGNUP + JWT)

**Mục tiêu:** Xây dựng hệ thống Auth với JWT

**Thời gian:** 15-20 phút

---

## 📁 CẤU TRÚC PHẦN 3

```
backend/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   ├── signup.dto.ts
│   │   └── login.dto.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   └── guards/
│       ├── jwt-auth.guard.ts
│       └── local-auth.guard.ts
└── app.module.ts (update)
```

---

## 📄 FILE 1: `backend/src/auth/dto/signup.dto.ts`

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}
```

---

## 📄 FILE 2: `backend/src/auth/dto/login.dto.ts`

```typescript
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

---

## 📄 FILE 3: `backend/src/auth/auth.service.ts`

```typescript
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Signup
  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user,
      access_token: token,
    };
  }

  // Login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      access_token: token,
    };
  }

  // Validate user (for Passport LocalStrategy)
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  // Get user by ID (for JWT strategy)
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  // Generate JWT token
  private generateToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
```

---

## 📄 FILE 4: `backend/src/auth/strategies/local.strategy.ts`

```typescript
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Use email instead of username
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
```

---

## 📄 FILE 5: `backend/src/auth/strategies/jwt.strategy.ts`

```typescript
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // This will be attached to request.user
  }
}
```

---

## 📄 FILE 6: `backend/src/auth/guards/local-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

---

## 📄 FILE 7: `backend/src/auth/guards/jwt-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

---

## 📄 FILE 8: `backend/src/auth/auth.controller.ts`

```typescript
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
}
```

---

## 📄 FILE 9: `backend/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

---

## 📄 FILE 10: `backend/src/app.module.ts` (UPDATE)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule, // ← ADD THIS
  ],
})
export class AppModule {}
```

---

## ✅ SETUP PHẦN 3

**Backend đang chạy? Stop lại:**
```bash
# Ctrl+C để stop
```

**Restart với code mới:**
```bash
npm run start:dev
```

**Expected output:**
```
🚀 Backend running on: http://localhost:3001
✅ Database connected
```

---

## 🧪 TEST PHẦN 3

### **Test 1: Signup**

```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Expected response:**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "createdAt": "2025-01-15T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Test 2: Login**

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected response:**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "createdAt": "2025-01-15T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Test 3: Get Profile (Protected route)**

```bash
# Replace YOUR_TOKEN with the access_token from login response
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected response:**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
}
```

### **Test 4: Invalid credentials**

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }'
```

**Expected response:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

## 📊 AUTH FLOW OVERVIEW

```
1. Signup/Login
   ↓
2. Hash password (bcrypt)
   ↓
3. Save to database
   ↓
4. Generate JWT token
   ↓
5. Return token to client

Protected Routes:
1. Client sends: Authorization: Bearer {token}
   ↓
2. JwtStrategy validates token
   ↓
3. Attach user to request
   ↓
4. Access granted
```

---

## 💡 SỬ DỤNG AUTH TRONG CÁC MODULE KHÁC

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  
  @UseGuards(JwtAuthGuard) // ← Protect route
  @Get()
  async getProjects(@Request() req) {
    // req.user is now available
    const userId = req.user.id;
    return this.projectsService.getUserProjects(userId);
  }
}
```

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 4"** → Tôi gửi Projects + Threading Module
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Test thành công!"** → Great! Sang Phần 4

---

## 💡 CURRENT STATUS

```
✅ Phần 1: Docker + Database
✅ Phần 2: Backend Init + 6 Tables  
✅ Phần 3: Auth Module (JWT)

Next: Phần 4 - Projects + Threading
```

**Auth working! JWT validated! 🔐**

**Chờ confirm! 🚀**

# 🎯 PHẦN 4: PROJECTS + THREADING MODULE

**Mục tiêu:** Tạo Projects với RBAC + Conversations Threading

**Thời gian:** 20-25 phút

---

## 📁 CẤU TRÚC PHẦN 4

```
backend/src/
├── projects/
│   ├── projects.module.ts
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   └── dto/
│       ├── create-project.dto.ts
│       └── invite-member.dto.ts
├── conversations/
│   ├── conversations.module.ts
│   ├── conversations.controller.ts
│   ├── conversations.service.ts
│   └── dto/
│       └── create-conversation.dto.ts
└── app.module.ts (update)
```

---

## 📄 FILE 1: `backend/src/projects/dto/create-project.dto.ts`

```typescript
import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  name: string;
}
```

---

## 📄 FILE 2: `backend/src/projects/dto/invite-member.dto.ts`

```typescript
import { IsEmail, IsIn } from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  email: string;

  @IsIn(['owner', 'editor', 'viewer'])
  role: string;
}
```

---

## 📄 FILE 3: `backend/src/projects/projects.service.ts`

```typescript
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Create project
  async create(userId: number, createProjectDto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        ownerId: userId,
        members: {
          create: {
            userId: userId,
            role: 'owner',
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return project;
  }

  // Get user's projects
  async getUserProjects(userId: number) {
    const projects = await this.prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            conversations: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return projects;
  }

  // Get project by ID
  async getProjectById(projectId: number, userId: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        conversations: {
          orderBy: {
            updatedAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or access denied');
    }

    return project;
  }

  // Invite member to project
  async inviteMember(projectId: number, userId: number, inviteMemberDto: InviteMemberDto) {
    // Check if user is owner or editor
    const membership = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
        role: {
          in: ['owner', 'editor'],
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('Only owners and editors can invite members');
    }

    // Find user by email
    const invitedUser = await this.prisma.user.findUnique({
      where: { email: inviteMemberDto.email },
    });

    if (!invitedUser) {
      throw new NotFoundException('User not found');
    }

    // Check if already a member
    const existingMember = await this.prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: invitedUser.id,
        },
      },
    });

    if (existingMember) {
      throw new ForbiddenException('User is already a member');
    }

    // Add member
    const member = await this.prisma.projectMember.create({
      data: {
        projectId: projectId,
        userId: invitedUser.id,
        role: inviteMemberDto.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return member;
  }

  // Remove member
  async removeMember(projectId: number, userId: number, memberId: number) {
    // Check if user is owner
    const membership = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
        role: 'owner',
      },
    });

    if (!membership) {
      throw new ForbiddenException('Only owners can remove members');
    }

    // Cannot remove owner
    const memberToRemove = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: memberId,
      },
    });

    if (!memberToRemove) {
      throw new NotFoundException('Member not found');
    }

    if (memberToRemove.role === 'owner') {
      throw new ForbiddenException('Cannot remove project owner');
    }

    // Remove member
    await this.prisma.projectMember.delete({
      where: {
        id: memberToRemove.id,
      },
    });

    return { message: 'Member removed successfully' };
  }

  // Check user access to project
  async checkAccess(projectId: number, userId: number): Promise<boolean> {
    const member = await this.prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
      },
    });

    return !!member;
  }
}
```

---

## 📄 FILE 4: `backend/src/projects/projects.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  async getUserProjects(@Request() req) {
    return this.projectsService.getUserProjects(req.user.id);
  }

  @Get(':id')
  async getProjectById(@Request() req, @Param('id', ParseIntPipe) projectId: number) {
    return this.projectsService.getProjectById(projectId, req.user.id);
  }

  @Post(':id/members')
  async inviteMember(
    @Request() req,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() inviteMemberDto: InviteMemberDto,
  ) {
    return this.projectsService.inviteMember(projectId, req.user.id, inviteMemberDto);
  }

  @Delete(':id/members/:memberId')
  async removeMember(
    @Request() req,
    @Param('id', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.projectsService.removeMember(projectId, req.user.id, memberId);
  }
}
```

---

## 📄 FILE 5: `backend/src/projects/projects.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
```

---

## 📄 FILE 6: `backend/src/conversations/dto/create-conversation.dto.ts`

```typescript
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  title?: string;
}
```

---

## 📄 FILE 7: `backend/src/conversations/conversations.service.ts`

```typescript
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    private prisma: PrismaService,
    private projectsService: ProjectsService,
  ) {}

  // Create conversation (thread)
  async create(projectId: number, userId: number, dto: CreateConversationDto) {
    // Check access
    const hasAccess = await this.projectsService.checkAccess(projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this project');
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        projectId: projectId,
        title: dto.title || 'New Conversation',
        // threadId is auto-generated via @default(uuid()) in schema
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return conversation;
  }

  // Get all conversations in a project
  async getProjectConversations(projectId: number, userId: number) {
    // Check access
    const hasAccess = await this.projectsService.checkAccess(projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this project');
    }

    const conversations = await this.prisma.conversation.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return conversations;
  }

  // Get conversation by threadId (IMPORTANT for threading!)
  async getByThreadId(threadId: string, userId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        threadId: threadId,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            agent: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check access
    const hasAccess = await this.projectsService.checkAccess(conversation.projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied to this conversation');
    }

    return conversation;
  }

  // Update conversation title
  async updateTitle(threadId: string, userId: number, title: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { threadId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check access
    const hasAccess = await this.projectsService.checkAccess(conversation.projectId, userId);
    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.conversation.update({
      where: { threadId },
      data: { title },
    });
  }

  // Delete conversation
  async delete(threadId: string, userId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { threadId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check if user is owner or editor
    const member = await this.prisma.projectMember.findFirst({
      where: {
        projectId: conversation.projectId,
        userId: userId,
        role: {
          in: ['owner', 'editor'],
        },
      },
    });

    if (!member) {
      throw new ForbiddenException('Only owners and editors can delete conversations');
    }

    await this.prisma.conversation.delete({
      where: { threadId },
    });

    return { message: 'Conversation deleted successfully' };
  }
}
```

---

## 📄 FILE 8: `backend/src/conversations/conversations.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects/:projectId/conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async create(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationsService.create(projectId, req.user.id, createConversationDto);
  }

  @Get()
  async getProjectConversations(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.conversationsService.getProjectConversations(projectId, req.user.id);
  }

  @Get('thread/:threadId')
  async getByThreadId(@Request() req, @Param('threadId') threadId: string) {
    return this.conversationsService.getByThreadId(threadId, req.user.id);
  }

  @Patch('thread/:threadId')
  async updateTitle(
    @Request() req,
    @Param('threadId') threadId: string,
    @Body('title') title: string,
  ) {
    return this.conversationsService.updateTitle(threadId, req.user.id, title);
  }

  @Delete('thread/:threadId')
  async delete(@Request() req, @Param('threadId') threadId: string) {
    return this.conversationsService.delete(threadId, req.user.id);
  }
}
```

---

## 📄 FILE 9: `backend/src/conversations/conversations.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
```

---

## 📄 FILE 10: `backend/src/app.module.ts` (UPDATE)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule, // ← ADD
    ConversationsModule, // ← ADD
  ],
})
export class AppModule {}
```

---

## ✅ SETUP & TEST PHẦN 4

**Restart backend:**
```bash
npm run start:dev
```

---

## 🧪 TEST PHẦN 4

### **Setup: Get your JWT token**
```bash
# Login first
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Copy the access_token from response
export TOKEN="your_access_token_here"
```

### **Test 1: Create Project**
```bash
curl -X POST http://localhost:3001/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My First Project"}'
```

**Expected:**
```json
{
  "id": 1,
  "name": "My First Project",
  "ownerId": 1,
  "owner": {...},
  "members": [...]
}
```

### **Test 2: Get Projects**
```bash
curl -X GET http://localhost:3001/projects \
  -H "Authorization: Bearer $TOKEN"
```

### **Test 3: Create Conversation (Thread!)**
```bash
curl -X POST http://localhost:3001/projects/1/conversations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Customer Support Bot"}'
```

**Expected:**
```json
{
  "id": 1,
  "projectId": 1,
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Customer Support Bot",
  "createdAt": "..."
}
```

**⚠️ IMPORTANT:** Copy the `threadId` - you'll use this for chat!

### **Test 4: Get Conversations**
```bash
curl -X GET http://localhost:3001/projects/1/conversations \
  -H "Authorization: Bearer $TOKEN"
```

### **Test 5: Get Conversation by ThreadId**
```bash
curl -X GET http://localhost:3001/projects/1/conversations/thread/YOUR_THREAD_ID \
  -H "Authorization: Bearer $TOKEN"
```

### **Test 6: Invite Member (signup another user first)**
```bash
# Signup user 2
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user2@example.com",
    "password":"password123",
    "name":"User Two"
  }'

# Invite to project
curl -X POST http://localhost:3001/projects/1/members \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user2@example.com",
    "role":"editor"
  }'
```

---

## 📊 THREADING ARCHITECTURE

```
Project 1
  ↓
Conversation 1 (threadId: abc-123)
  ↓
  ├── Message 1 (user)
  ├── Message 2 (assistant)
  ├── Message 3 (user)
  └── Message 4 (assistant)

Conversation 2 (threadId: def-456)
  ↓
  ├── Message 1 (user)
  └── Message 2 (assistant)
```

**Key Points:**
- ✅ Each conversation has unique `threadId` (UUID)
- ✅ Messages belong to conversation
- ✅ AI maintains context via threadId
- ✅ Multiple threads in one project

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 5"** → Tôi gửi CHAT + AI Module (Core!)
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Threading works!"** → Perfect! Sang phần Chat + OpenAI

---

## 💡 CURRENT STATUS

```
✅ Phần 1: Docker + Database
✅ Phần 2: Backend Init + 6 Tables
✅ Phần 3: Auth Module (JWT)
✅ Phần 4: Projects + Threading ← YOU ARE HERE

Next: Phần 5 - Chat + AI (OpenAI/Gemini)
```

**Threading system ready! 🧵**

**Chờ confirm! 🚀**
# 🎯 PHẦN 5: CHAT + AI MODULE (CORE!)

**Mục tiêu:** Chat với OpenAI/Gemini, context threading, token tracking

**Thời gian:** 25-30 phút

---

## 📁 CẤU TRÚC PHẦN 5

```
backend/src/
├── chat/
│   ├── chat.module.ts
│   ├── chat.controller.ts
│   ├── chat.service.ts
│   ├── agents/
│   │   ├── openai.service.ts
│   │   └── gemini.service.ts
│   └── dto/
│       └── send-message.dto.ts
└── app.module.ts (update)
```

---

## 📄 FILE 1: `backend/src/chat/dto/send-message.dto.ts`

```typescript
import { IsString, IsInt, IsOptional, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsInt()
  agentId: number;

  @IsOptional()
  @IsString()
  threadId?: string; // Optional: if not provided, creates new thread
}
```

---

## 📄 FILE 2: `backend/src/chat/agents/openai.service.ts`

```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
    }
  }

  async chat(messages: Message[], model: string = 'gpt-4'): Promise<{
    content: string;
    tokens: number;
  }> {
    if (!this.apiKey) {
      throw new BadRequestException('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.choices[0].message.content;
      const tokens = response.data.usage.total_tokens;

      return {
        content,
        tokens,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new BadRequestException(
        error.response?.data?.error?.message || 'Failed to call OpenAI API',
      );
    }
  }

  // Stream chat (for WebSocket - Phase 6)
  async streamChat(messages: Message[], model: string = 'gpt-4') {
    if (!this.apiKey) {
      throw new BadRequestException('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: true,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        },
      );

      return response.data;
    } catch (error) {
      console.error('OpenAI Stream Error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to stream OpenAI response');
    }
  }
}
```

---

## 📄 FILE 3: `backend/src/chat/agents/gemini.service.ts`

```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️  GEMINI_API_KEY not found (optional)');
    }
  }

  async chat(messages: Message[]): Promise<{
    content: string;
    tokens: number;
  }> {
    if (!this.apiKey) {
      throw new BadRequestException('Gemini API key not configured');
    }

    try {
      // Convert to Gemini format
      const contents = this.convertToGeminiFormat(messages);

      const response = await axios.post(
        `${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.candidates[0].content.parts[0].text;
      const tokens = response.data.usageMetadata?.totalTokenCount || 0;

      return {
        content,
        tokens,
      };
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new BadRequestException(
        error.response?.data?.error?.message || 'Failed to call Gemini API',
      );
    }
  }

  private convertToGeminiFormat(messages: Message[]) {
    return messages
      .filter((msg) => msg.role !== 'system') // Gemini doesn't support system messages
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));
  }
}
```

---

## 📄 FILE 4: `backend/src/chat/chat.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationsService } from '../conversations/conversations.service';
import { OpenAIService } from './agents/openai.service';
import { GeminiService } from './agents/gemini.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private conversationsService: ConversationsService,
    private openaiService: OpenAIService,
    private geminiService: GeminiService,
  ) {}

  async sendMessage(userId: number, projectId: number, dto: SendMessageDto) {
    // 1. Get or create conversation
    let conversation;
    if (dto.threadId) {
      conversation = await this.conversationsService.getByThreadId(dto.threadId, userId);
    } else {
      // Create new conversation if no threadId provided
      conversation = await this.conversationsService.create(projectId, userId, {
        title: 'New Chat',
      });
    }

    // 2. Get agent
    const agent = await this.prisma.agent.findUnique({
      where: { id: dto.agentId },
    });

    if (!agent || !agent.active) {
      throw new NotFoundException('Agent not found or inactive');
    }

    // 3. Get conversation context (last 10 messages)
    const context = await this.getConversationContext(conversation.id);

    // 4. Save user message
    const userMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        userId: userId,
        agentId: agent.id,
        content: dto.content,
        role: 'user',
        tokens: 0,
      },
    });

    // 5. Prepare messages for AI
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful AI assistant.',
      },
      ...context,
      {
        role: 'user' as const,
        content: dto.content,
      },
    ];

    // 6. Call AI agent
    let aiResponse: { content: string; tokens: number };

    try {
      if (agent.type === 'openai') {
        aiResponse = await this.openaiService.chat(messages, agent.model);
      } else if (agent.type === 'gemini') {
        aiResponse = await this.geminiService.chat(messages);
      } else {
        throw new BadRequestException('Unsupported agent type');
      }
    } catch (error) {
      // Save error message
      await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          agentId: agent.id,
          content: `Error: ${error.message}`,
          role: 'assistant',
          tokens: 0,
        },
      });
      throw error;
    }

    // 7. Save AI response
    const assistantMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        agentId: agent.id,
        content: aiResponse.content,
        role: 'assistant',
        tokens: aiResponse.tokens,
      },
    });

    // 8. Update user message tokens (estimate)
    await this.prisma.message.update({
      where: { id: userMessage.id },
      data: { tokens: Math.ceil(dto.content.length / 4) }, // Rough estimate
    });

    // 9. Update conversation timestamp
    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    // 10. Return response
    return {
      threadId: conversation.threadId,
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        role: userMessage.role,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        id: assistantMessage.id,
        content: assistantMessage.content,
        role: assistantMessage.role,
        tokens: assistantMessage.tokens,
        createdAt: assistantMessage.createdAt,
      },
      agent: {
        id: agent.id,
        name: agent.name,
        type: agent.type,
      },
    };
  }

  // Get conversation context (last 10 messages)
  private async getConversationContext(conversationId: number) {
    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        role: true,
        content: true,
      },
    });

    // Reverse to chronological order
    return messages.reverse().map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));
  }

  // Get message history
  async getMessageHistory(threadId: string, userId: number) {
    const conversation = await this.conversationsService.getByThreadId(threadId, userId);

    const messages = await this.prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        agent: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return {
      conversation: {
        id: conversation.id,
        threadId: conversation.threadId,
        title: conversation.title,
      },
      messages,
    };
  }

  // Get token usage for a conversation
  async getTokenUsage(threadId: string, userId: number) {
    const conversation = await this.conversationsService.getByThreadId(threadId, userId);

    const totalTokens = await this.prisma.message.aggregate({
      where: { conversationId: conversation.id },
      _sum: { tokens: true },
    });

    const messageCount = await this.prisma.message.count({
      where: { conversationId: conversation.id },
    });

    return {
      threadId: conversation.threadId,
      totalTokens: totalTokens._sum.tokens || 0,
      messageCount,
      estimatedCost: ((totalTokens._sum.tokens || 0) / 1000) * 0.002, // $0.002 per 1K tokens (GPT-4 estimate)
    };
  }
}
```

---

## 📄 FILE 5: `backend/src/chat/chat.controller.ts`

```typescript
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects/:projectId/chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  async sendMessage(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.id, projectId, sendMessageDto);
  }

  @Get('thread/:threadId/history')
  async getMessageHistory(@Request() req, @Param('threadId') threadId: string) {
    return this.chatService.getMessageHistory(threadId, req.user.id);
  }

  @Get('thread/:threadId/usage')
  async getTokenUsage(@Request() req, @Param('threadId') threadId: string) {
    return this.chatService.getTokenUsage(threadId, req.user.id);
  }
}
```

---

## 📄 FILE 6: `backend/src/chat/chat.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { OpenAIService } from './agents/openai.service';
import { GeminiService } from './agents/gemini.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConversationsModule } from '../conversations/conversations.module';

@Module({
  imports: [PrismaModule, ConversationsModule],
  controllers: [ChatController],
  providers: [ChatService, OpenAIService, GeminiService],
  exports: [ChatService],
})
export class ChatModule {}
```

---

## 📄 FILE 7: `backend/src/app.module.ts` (UPDATE)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    ConversationsModule,
    ChatModule, // ← ADD
  ],
})
export class AppModule {}
```

---

## ✅ SETUP & TEST PHẦN 5

**⚠️ IMPORTANT: Seed default agents first!**

Chạy seed từ Phần 2:
```bash
npm run prisma:seed
```

**Restart backend:**
```bash
npm run start:dev
```

---

## 🧪 TEST PHẦN 5

### **Setup: Get JWT + Create Project + Thread**
```bash
# 1. Login
export TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

# 2. Create project
curl -X POST http://localhost:3001/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"AI Chat Project"}'

# 3. Create conversation
export THREAD_ID=$(curl -s -X POST http://localhost:3001/projects/1/conversations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Chat"}' \
  | grep -o '"threadId":"[^"]*' | cut -d'"' -f4)

echo "Thread ID: $THREAD_ID"
```

### **Test 1: Send first message (NEW thread)**
```bash
curl -X POST http://localhost:3001/projects/1/chat/message \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello! What is the capital of France?",
    "agentId": 1
  }'
```

**Expected response:**
```json
{
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "userMessage": {
    "id": 1,
    "content": "Hello! What is the capital of France?",
    "role": "user",
    "createdAt": "..."
  },
  "assistantMessage": {
    "id": 2,
    "content": "The capital of France is Paris...",
    "role": "assistant",
    "tokens": 156,
    "createdAt": "..."
  },
  "agent": {
    "id": 1,
    "name": "GPT-4",
    "type": "openai"
  }
}
```

### **Test 2: Continue conversation (SAME thread)**
```bash
curl -X POST http://localhost:3001/projects/1/chat/message \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "What is the population of that city?",
    "agentId": 1,
    "threadId": "'"$THREAD_ID"'"
  }'
```

**Expected:** AI remembers "that city" = Paris (context maintained!)

### **Test 3: Get message history**
```bash
curl -X GET "http://localhost:3001/projects/1/chat/thread/$THREAD_ID/history" \
  -H "Authorization: Bearer $TOKEN"
```

### **Test 4: Get token usage**
```bash
curl -X GET "http://localhost:3001/projects/1/chat/thread/$THREAD_ID/usage" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:**
```json
{
  "threadId": "550e8400-...",
  "totalTokens": 312,
  "messageCount": 4,
  "estimatedCost": 0.000624
}
```

### **Test 5: Try Gemini (if you have API key)**
```bash
curl -X POST http://localhost:3001/projects/1/chat/message \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Tell me a joke",
    "agentId": 2,
    "threadId": "'"$THREAD_ID"'"
  }'
```

---

## 📊 THREADING CONTEXT FLOW

```
User: "What is the capital of France?"
  ↓ Save to DB (threadId: abc-123)
  ↓ Get last 10 messages (empty for first message)
  ↓ Send to OpenAI: [system, user]
  ↓ AI: "The capital is Paris..."
  ↓ Save response to DB

User: "What is the population?" (SAME threadId!)
  ↓ Get last 10 messages:
      [user: "capital?", assistant: "Paris...", user: "population?"]
  ↓ Send to OpenAI with context
  ↓ AI understands "that city" = Paris!
  ↓ AI: "Paris has about 2.2 million people..."
```

**Key Points:**
- ✅ Context maintained via `threadId`
- ✅ Last 10 messages sent to AI
- ✅ Token usage tracked per message
- ✅ Multiple threads can exist in parallel

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 6"** → Tôi gửi WebSocket (Real-time streaming)
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Chat works! AI responds!"** → Awesome! Ready for WebSocket?

---

## 💡 CURRENT STATUS

```
✅ Phần 1: Docker + Database
✅ Phần 2: Backend Init + 6 Tables
✅ Phần 3: Auth Module (JWT)
✅ Phần 4: Projects + Threading
✅ Phần 5: Chat + AI (OpenAI/Gemini) ← YOU ARE HERE

Next: Phần 6 - WebSocket (Real-time)
```

**🎉 CORE FEATURES WORKING!**
- ✅ Authentication
- ✅ Projects with RBAC
- ✅ Threading conversations
- ✅ Chat with AI (context maintained!)
- ✅ Token tracking

**Chờ confirm! 🚀**
# 🎯 PHẦN 6: WEBSOCKET (REAL-TIME STREAMING)

**Mục tiêu:** Real-time chat streaming + typing indicators

**Thời gian:** 20-25 phút

---

## 📁 CẤU TRÚC PHẦN 6

```
backend/src/
├── websocket/
│   ├── chat.gateway.ts
│   └── websocket.module.ts
└── app.module.ts (update)
```

---

## 📄 FILE 1: `backend/src/websocket/chat.gateway.ts`

```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from '../chat/chat.service';
import { OpenAIService } from '../chat/agents/openai.service';

interface AuthenticatedSocket extends Socket {
  userId?: number;
  userEmail?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<number, string> = new Map(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private chatService: ChatService,
    private openaiService: OpenAIService,
  ) {}

  // Handle client connection
  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract token from handshake
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        console.log('❌ No token provided');
        client.disconnect();
        return;
      }

      // Verify JWT
      const payload = this.jwtService.verify(token);
      client.userId = payload.sub;
      client.userEmail = payload.email;

      // Store user socket
      this.userSockets.set(client.userId, client.id);

      console.log(`✅ Client connected: ${client.id} (User: ${client.userEmail})`);
      client.emit('connected', { message: 'Connected to WebSocket server' });
    } catch (error) {
      console.log('❌ Invalid token:', error.message);
      client.disconnect();
    }
  }

  // Handle client disconnect
  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.userSockets.delete(client.userId);
      console.log(`❌ Client disconnected: ${client.id} (User: ${client.userEmail})`);
    }
  }

  // Join a conversation room
  @SubscribeMessage('join_thread')
  async handleJoinThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string },
  ) {
    try {
      // Verify user has access to this thread
      const conversation = await this.prisma.conversation.findUnique({
        where: { threadId: data.threadId },
        include: { project: true },
      });

      if (!conversation) {
        client.emit('error', { message: 'Conversation not found' });
        return;
      }

      // Check user access
      const member = await this.prisma.projectMember.findFirst({
        where: {
          projectId: conversation.projectId,
          userId: client.userId,
        },
      });

      if (!member) {
        client.emit('error', { message: 'Access denied' });
        return;
      }

      // Join room
      client.join(data.threadId);
      console.log(`👤 User ${client.userEmail} joined thread: ${data.threadId}`);

      client.emit('joined_thread', {
        threadId: data.threadId,
        message: 'Successfully joined conversation',
      });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  // Leave a conversation room
  @SubscribeMessage('leave_thread')
  handleLeaveThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string },
  ) {
    client.leave(data.threadId);
    console.log(`👋 User ${client.userEmail} left thread: ${data.threadId}`);
  }

  // Typing indicator
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string; isTyping: boolean },
  ) {
    // Broadcast to others in the room (except sender)
    client.to(data.threadId).emit('user_typing', {
      userId: client.userId,
      userEmail: client.userEmail,
      isTyping: data.isTyping,
    });
  }

  // Send message with streaming
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: {
      threadId: string;
      content: string;
      agentId: number;
      projectId: number;
    },
  ) {
    try {
      // 1. Get conversation
      const conversation = await this.prisma.conversation.findUnique({
        where: { threadId: data.threadId },
      });

      if (!conversation) {
        client.emit('error', { message: 'Conversation not found' });
        return;
      }

      // 2. Get agent
      const agent = await this.prisma.agent.findUnique({
        where: { id: data.agentId },
      });

      if (!agent || !agent.active) {
        client.emit('error', { message: 'Agent not found or inactive' });
        return;
      }

      // 3. Save user message
      const userMessage = await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId: client.userId,
          agentId: agent.id,
          content: data.content,
          role: 'user',
          tokens: Math.ceil(data.content.length / 4),
        },
      });

      // Emit user message to room
      this.server.to(data.threadId).emit('new_message', {
        id: userMessage.id,
        content: userMessage.content,
        role: 'user',
        userId: client.userId,
        createdAt: userMessage.createdAt,
      });

      // 4. Get context
      const messages = await this.prisma.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { role: true, content: true },
      });

      const context = [
        { role: 'system' as const, content: 'You are a helpful AI assistant.' },
        ...messages.reverse().map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];

      // 5. Stream AI response
      if (agent.type === 'openai') {
        await this.streamOpenAIResponse(
          client,
          data.threadId,
          conversation.id,
          agent,
          context,
        );
      } else {
        // Non-streaming fallback
        const response = await this.chatService.sendMessage(client.userId, data.projectId, {
          content: data.content,
          agentId: data.agentId,
          threadId: data.threadId,
        });

        this.server.to(data.threadId).emit('new_message', response.assistantMessage);
      }

      // 6. Update conversation timestamp
      await this.prisma.conversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() },
      });
    } catch (error) {
      console.error('Send message error:', error);
      client.emit('error', { message: error.message });
    }
  }

  // Stream OpenAI response
  private async streamOpenAIResponse(
    client: AuthenticatedSocket,
    threadId: string,
    conversationId: number,
    agent: any,
    context: any[],
  ) {
    try {
      const stream = await this.openaiService.streamChat(context, agent.model);

      let fullContent = '';
      const messageId = Date.now(); // Temporary ID

      // Emit stream start
      this.server.to(threadId).emit('message_stream_start', {
        id: messageId,
        role: 'assistant',
        agentId: agent.id,
      });

      // Process stream
      stream.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          if (line.includes('[DONE]')) {
            continue;
          }

          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.substring(6));
              const content = json.choices[0]?.delta?.content;

              if (content) {
                fullContent += content;
                // Emit chunk to room
                this.server.to(threadId).emit('message_stream_chunk', {
                  id: messageId,
                  content: content,
                });
              }
            } catch (e) {
              // Skip parsing errors
            }
          }
        }
      });

      stream.on('end', async () => {
        // Save complete message to DB
        const assistantMessage = await this.prisma.message.create({
          data: {
            conversationId: conversationId,
            agentId: agent.id,
            content: fullContent,
            role: 'assistant',
            tokens: Math.ceil(fullContent.length / 4), // Estimate
          },
        });

        // Emit stream end
        this.server.to(threadId).emit('message_stream_end', {
          id: assistantMessage.id,
          content: fullContent,
          role: 'assistant',
          tokens: assistantMessage.tokens,
          createdAt: assistantMessage.createdAt,
        });
      });

      stream.on('error', (error: Error) => {
        console.error('Stream error:', error);
        client.emit('error', { message: 'Failed to stream response' });
      });
    } catch (error) {
      console.error('Stream setup error:', error);
      client.emit('error', { message: error.message });
    }
  }
}
```

---

## 📄 FILE 2: `backend/src/websocket/websocket.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    PrismaModule,
    ChatModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [ChatGateway],
})
export class WebsocketModule {}
```

---

## 📄 FILE 3: `backend/src/app.module.ts` (UPDATE)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    ConversationsModule,
    ChatModule,
    WebsocketModule, // ← ADD
  ],
})
export class AppModule {}
```

---

## 📄 FILE 4: `backend/test-websocket.html` (Test Client)

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Test Client</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    #messages { border: 1px solid #ccc; height: 400px; overflow-y: scroll; padding: 10px; margin-bottom: 10px; }
    .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
    .user { background: #e3f2fd; text-align: right; }
    .assistant { background: #f5f5f5; }
    .system { background: #fff3cd; font-size: 12px; font-style: italic; }
    input, button { padding: 10px; margin: 5px; }
    #messageInput { width: 70%; }
    button { background: #007bff; color: white; border: none; cursor: pointer; }
    button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <h1>🚀 WebSocket Test Client</h1>
  
  <div>
    <input id="tokenInput" placeholder="Paste JWT token here" style="width: 90%;" />
    <button onclick="connect()">Connect</button>
    <button onclick="disconnect()">Disconnect</button>
  </div>

  <div>
    <input id="threadInput" placeholder="Thread ID" style="width: 40%;" />
    <button onclick="joinThread()">Join Thread</button>
    <input id="agentInput" placeholder="Agent ID (1)" style="width: 10%;" value="1" />
    <input id="projectInput" placeholder="Project ID (1)" style="width: 10%;" value="1" />
  </div>

  <div id="messages"></div>

  <div>
    <input id="messageInput" placeholder="Type your message..." onkeypress="handleKeyPress(event)" />
    <button onclick="sendMessage()">Send</button>
  </div>

  <script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
  <script>
    let socket = null;
    let currentThreadId = null;

    function connect() {
      const token = document.getElementById('tokenInput').value;
      if (!token) {
        alert('Please enter JWT token');
        return;
      }

      socket = io('http://localhost:3001', {
        auth: { token: token }
      });

      socket.on('connect', () => {
        addSystemMessage('✅ Connected to server');
      });

      socket.on('connected', (data) => {
        addSystemMessage(data.message);
      });

      socket.on('disconnect', () => {
        addSystemMessage('❌ Disconnected from server');
      });

      socket.on('error', (data) => {
        addSystemMessage('❌ Error: ' + data.message);
      });

      socket.on('joined_thread', (data) => {
        addSystemMessage('✅ Joined thread: ' + data.threadId);
        currentThreadId = data.threadId;
      });

      socket.on('new_message', (data) => {
        addMessage(data.content, data.role);
      });

      socket.on('message_stream_start', (data) => {
        addSystemMessage('🤖 AI is typing...');
      });

      socket.on('message_stream_chunk', (data) => {
        updateStreamingMessage(data.content);
      });

      socket.on('message_stream_end', (data) => {
        finalizeStreamingMessage(data.content);
      });

      socket.on('user_typing', (data) => {
        addSystemMessage(`👤 ${data.userEmail} is typing...`);
      });
    }

    function disconnect() {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }

    function joinThread() {
      const threadId = document.getElementById('threadInput').value;
      if (!threadId || !socket) {
        alert('Enter thread ID and connect first');
        return;
      }

      socket.emit('join_thread', { threadId: threadId });
    }

    function sendMessage() {
      const message = document.getElementById('messageInput').value;
      const agentId = parseInt(document.getElementById('agentInput').value);
      const projectId = parseInt(document.getElementById('projectInput').value);

      if (!message || !currentThreadId || !socket) {
        alert('Join a thread first');
        return;
      }

      socket.emit('send_message', {
        threadId: currentThreadId,
        content: message,
        agentId: agentId,
        projectId: projectId
      });

      document.getElementById('messageInput').value = '';
    }

    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        sendMessage();
      } else {
        // Emit typing indicator
        if (socket && currentThreadId) {
          socket.emit('typing', { threadId: currentThreadId, isTyping: true });
        }
      }
    }

    function addMessage(content, role) {
      const messagesDiv = document.getElementById('messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message ' + role;
      messageDiv.textContent = content;
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function addSystemMessage(content) {
      const messagesDiv = document.getElementById('messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message system';
      messageDiv.textContent = content;
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    let streamingDiv = null;

    function updateStreamingMessage(content) {
      if (!streamingDiv) {
        const messagesDiv = document.getElementById('messages');
        streamingDiv = document.createElement('div');
        streamingDiv.className = 'message assistant';
        streamingDiv.id = 'streaming';
        messagesDiv.appendChild(streamingDiv);
      }
      streamingDiv.textContent += content;
      document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }

    function finalizeStreamingMessage(content) {
      if (streamingDiv) {
        streamingDiv.textContent = content;
        streamingDiv = null;
      }
    }
  </script>
</body>
</html>
```

---

## ✅ SETUP & TEST PHẦN 6

**Restart backend:**
```bash
npm run start:dev
```

**Expected output:**
```
🚀 Backend running on: http://localhost:3001
✅ Database connected
```

---

## 🧪 TEST PHẦN 6

### **Test 1: Open HTML test client**

1. Save `test-websocket.html` to `backend/test-websocket.html`
2. Open in browser: `file:///path/to/backend/test-websocket.html`
3. Get JWT token from login:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
4. Paste token in HTML client
5. Click "Connect"
6. Enter thread ID (from previous tests)
7. Click "Join Thread"
8. Type message and send!

### **Test 2: Test real-time streaming**

Type in HTML client:
```
"Tell me a long story about AI"
```

You should see:
- ✅ "AI is typing..." message
- ✅ Words appearing one by one (streaming!)
- ✅ Complete message saved to DB

### **Test 3: Test typing indicator**

Open 2 browser tabs with the client, both connected to same thread:
- Type in Tab 1 → Tab 2 shows "User is typing..."

### **Test 4: Test with curl (non-streaming check)**

```bash
# Still works via REST API
curl -X POST http://localhost:3001/projects/1/chat/message \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Quick test",
    "agentId": 1,
    "threadId": "your-thread-id"
  }'
```

---

## 📊 WEBSOCKET EVENTS OVERVIEW

### **Client → Server:**
```
join_thread        → Join conversation room
leave_thread       → Leave conversation room
typing             → Notify others you're typing
send_message       → Send message with streaming
```

### **Server → Client:**
```
connected          → Connection successful
joined_thread      → Successfully joined room
error              → Error occurred
new_message        → New complete message
message_stream_start    → AI started responding
message_stream_chunk    → AI response chunk (word by word)
message_stream_end      → AI finished responding
user_typing        → Another user is typing
```

---

## 🎨 FRONTEND INTEGRATION (Preview for Part 7)

```typescript
// Example React component
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function ChatComponent({ token, threadId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      auth: { token }
    });

    newSocket.on('connect', () => {
      newSocket.emit('join_thread', { threadId });
    });

    newSocket.on('message_stream_chunk', (data) => {
      // Update streaming message in real-time
      setMessages(prev => updateLastMessage(prev, data.content));
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [token, threadId]);

  // ... rest of component
}
```

---

## 📞 NEXT STEP

**Khi đã test xong, reply:**
- **"OK, tiếp Phần 7"** → Tôi gửi FRONTEND (Next.js UI)
- **"Có lỗi: [mô tả]"** → Tôi giúp debug
- **"Streaming works! Amazing!"** → Great! Ready for frontend?

---

## 💡 CURRENT STATUS

```
✅ Phần 1: Docker + Database
✅ Phần 2: Backend Init + 6 Tables
✅ Phần 3: Auth Module (JWT)
✅ Phần 4: Projects + Threading
✅ Phần 5: Chat + AI (OpenAI/Gemini)
✅ Phần 6: WebSocket (Real-time streaming) ← YOU ARE HERE

Next: Phần 7 - Frontend Web (Next.js)
```

**🎉 BACKEND COMPLETE!**
- ✅ Real-time chat streaming
- ✅ Typing indicators
- ✅ Multi-user support
- ✅ Context maintained

**Ready for frontend! 🚀**

**Chờ confirm!**
