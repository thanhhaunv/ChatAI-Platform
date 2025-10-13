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
