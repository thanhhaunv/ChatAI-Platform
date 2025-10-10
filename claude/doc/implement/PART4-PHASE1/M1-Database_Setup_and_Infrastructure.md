# M1 - DATABASE SETUP & INFRASTRUCTURE

**Duration:** Week 1 (5 days)  
**Goal:** Setup database schema with TypeORM and migrations  
**Team:** DevOps + Backend Dev 1  
**Jira:** CAP-6  

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Day 1-2: Create TypeORM Entities](#day-1-2-create-typeorm-entities)
4. [Day 3: Configure Database Connection](#day-3-configure-database-connection)
5. [Day 4: Generate & Run Migrations](#day-4-generate--run-migrations)
6. [Day 5: Testing & Documentation](#day-5-testing--documentation)
7. [Deliverables](#deliverables)

---

## 📦 Nội dung đầy đủ:

### **Day 1-2: Create TypeORM Entities**
- ✅ Setup shared package với tsconfig
- ✅ 8 entities hoàn chỉnh với code đầy đủ:
  - User, Project, ProjectMember, Conversation
  - Agent, Message, BillingLog, Notification
- ✅ Relations, indexes, enums

### **Day 3: Configure Database**
- ✅ User service project structure
- ✅ Database configuration
- ✅ TypeORM module setup
- ✅ Health check endpoints

### **Day 4: Migrations**
- ✅ Data source configuration
- ✅ Migration generation
- ✅ **FULL migration code** (up & down)
- ✅ Seed script hoàn chỉnh (3 users, 4 agents)

### **Day 5: Testing & Documentation**
- ✅ Health check endpoints
- ✅ Service README
- ✅ Migration guide
- ✅ Testing checklist
- ✅ Troubleshooting guide

### **Bonus:**
- ✅ Verification checklist
- ✅ Git commit guide
- ✅ Jira update instructions
- ✅ Next steps (M2 preview)

## Overview

**What we're building:**
- 8 TypeORM entities in shared package
- Database configuration module
- Initial migration script
- Seed data for testing
- Health check endpoint

**Database Tables:**
1. `users` - User accounts
2. `projects` - Projects container
3. `project_members` - Project memberships
4. `conversations` - Chat threads
5. `agents` - AI agents
6. `messages` - Chat messages
7. `billing_logs` - Usage tracking
8. `notifications` - User notifications

---

## Prerequisites

✅ Phase 0 completed (Docker running)  
✅ PostgreSQL running on localhost:5432  
✅ Git hooks configured  

Verify:
```bash
# Check Docker services
docker-compose ps

# Should show:
# chatai-postgres    Up (healthy)
# chatai-redis       Up (healthy)
# chatai-minio       Up (healthy)
# chatai-rabbitmq    Up (healthy)
```

---

## Day 1-2: Create TypeORM Entities

### **Step 1: Setup Shared Package (30 min)**

#### 1.1 Create Package Structure

```bash
cd packages/shared
pnpm init
```

#### 1.2 Create `packages/shared/package.json`

```json
{
  "name": "@chatai/shared",
  "version": "1.0.0",
  "description": "Shared entities and types for ChatAI Platform",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "typeorm": "^0.3.17",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.4",
    "typescript": "^5.3.3"
  }
}
```

#### 1.3 Create `packages/shared/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 1.4 Install Dependencies

```bash
cd packages/shared
pnpm install
```

---

### **Step 2: Create TypeORM Entities (4 hours)**

#### 2.1 Create User Entity

Create `packages/shared/src/entities/user.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from './project.entity';
import { ProjectMember } from './project-member.entity';
import { Message } from './message.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.EMAIL,
  })
  auth_provider: AuthProvider;

  @Column({ type: 'varchar', length: 255, nullable: true })
  oauth_id: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar_url: string | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Project, (project) => project.owner)
  owned_projects: Project[];

  @OneToMany(() => ProjectMember, (member) => member.user)
  project_memberships: ProjectMember[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
```

---

#### 2.2 Create Project Entity

Create `packages/shared/src/entities/project.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProjectMember } from './project-member.entity';
import { Conversation } from './conversation.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'uuid' })
  owner_id: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.owned_projects)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => ProjectMember, (member) => member.project)
  members: ProjectMember[];

  @OneToMany(() => Conversation, (conversation) => conversation.project)
  conversations: Conversation[];
}
```

---

#### 2.3 Create ProjectMember Entity

Create `packages/shared/src/entities/project-member.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum ProjectRole {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Entity('project_members')
@Index(['project_id', 'user_id'], { unique: true })
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({
    type: 'enum',
    enum: ProjectRole,
    default: ProjectRole.VIEWER,
  })
  role: ProjectRole;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Project, (project) => project.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.project_memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
```

---

#### 2.4 Create Conversation Entity

Create `packages/shared/src/entities/conversation.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  thread_id: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Project, (project) => project.conversations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
```

---

#### 2.5 Create Agent Entity

Create `packages/shared/src/entities/agent.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entity';

export enum AgentType {
  EXTERNAL = 'external',
  SELF_HOSTED = 'self-hosted',
}

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: AgentType,
    default: AgentType.EXTERNAL,
  })
  type: AgentType;

  @Column({ type: 'varchar', length: 500, nullable: true })
  api_endpoint: string | null;

  @Column({ type: 'text', nullable: true })
  api_key_encrypted: string | null;

  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, any> | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  model_source: string | null;

  @Column({ type: 'jsonb', nullable: true })
  training_config: Record<string, any> | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  version: string | null;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Message, (message) => message.agent)
  messages: Message[];
}
```

---

#### 2.6 Create Message Entity

Create `packages/shared/src/entities/message.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';
import { Agent } from './agent.entity';

@Entity('messages')
@Index(['conversation_id', 'created_at'])
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  conversation_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  agent_id: string | null;

  @Column({ type: 'text' })
  user_message: string;

  @Column({ type: 'text', nullable: true })
  agent_response: string | null;

  @Column({ type: 'jsonb', nullable: true })
  attachments: Record<string, any>[] | null;

  @Column({ type: 'float', nullable: true })
  tokens_used: number | null;

  @Column({ type: 'float', nullable: true })
  cost: number | null;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Agent, (agent) => agent.messages, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent | null;
}
```

---

#### 2.7 Create BillingLog Entity

Create `packages/shared/src/entities/billing-log.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('billing_logs')
@Index(['user_id', 'timestamp'])
@Index(['project_id', 'timestamp'])
export class BillingLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  project_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  conversation_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  agent_id: string | null;

  @Column({ type: 'float' })
  tokens: number;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @CreateDateColumn()
  timestamp: Date;
}
```

---

#### 2.8 Create Notification Entity

Create `packages/shared/src/entities/notification.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum NotificationType {
  NEW_MESSAGE = 'new_message',
  PROJECT_INVITE = 'project_invite',
  TRAINING_COMPLETE = 'training_complete',
  AGENT_DEPLOYED = 'agent_deployed',
  SYSTEM = 'system',
}

@Entity('notifications')
@Index(['user_id', 'read', 'created_at'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any> | null;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;
}
```

---

#### 2.9 Create Index Export

Create `packages/shared/src/entities/index.ts`:

```typescript
export * from './user.entity';
export * from './project.entity';
export * from './project-member.entity';
export * from './conversation.entity';
export * from './agent.entity';
export * from './message.entity';
export * from './billing-log.entity';
export * from './notification.entity';
```

---

#### 2.10 Create Main Index

Create `packages/shared/src/index.ts`:

```typescript
export * from './entities';
```

---

#### 2.11 Build Shared Package

```bash
cd packages/shared
pnpm build

# Verify output
ls -la dist/

# Should see:
# dist/
#   entities/
#   index.js
#   index.d.ts
```

---

## Day 3: Configure Database Connection

### **Step 3: Create User Service (2 hours)**

#### 3.1 Create Service Directory

```bash
cd services
mkdir -p user-service
cd user-service
pnpm init
```

#### 3.2 Create `package.json`

```json
{
  "name": "@chatai/user-service",
  "version": "1.0.0",
  "description": "User and project management service",
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
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "typeorm-ts-node-commonjs migration:generate",
    "migration:run": "typeorm-ts-node-commonjs migration:run",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert"
  },
  "dependencies": {
    "@chatai/shared": "workspace:*",
    "@nestjs/common": "^10.2.10",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.2.10",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/typeorm": "^10.0.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### 3.3 Create `nest-cli.json`

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

#### 3.4 Create `tsconfig.json`

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

#### 3.5 Install Dependencies

```bash
pnpm install
```

---

### **Step 4: Configure TypeORM (1 hour)**

#### 4.1 Create Database Config

Create `services/user-service/src/config/database.config.ts`:

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  User,
  Project,
  ProjectMember,
  Conversation,
  Agent,
  Message,
  BillingLog,
  Notification,
} from '@chatai/shared';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'chatai_platform'),
  entities: [
    User,
    Project,
    ProjectMember,
    Conversation,
    Agent,
    Message,
    BillingLog,
    Notification,
  ],
  synchronize: false, // NEVER true in production
  logging: configService.get('NODE_ENV') === 'development',
  migrations: ['dist/migrations/**/*.js'],
  migrationsRun: false,
});
```

#### 4.2 Create Database Module

Create `services/user-service/src/database/database.module.ts`:

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

#### 4.3 Create App Module

Create `services/user-service/src/app.module.ts`:

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

#### 4.4 Create Bootstrap

Create `services/user-service/src/main.ts`:

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

  const port = process.env.USER_SERVICE_PORT || 4001;
  await app.listen(port);
  console.log(`👥 User Service running on http://localhost:${port}`);
}
bootstrap();
```

#### 4.5 Test Connection

```bash
# Start service
pnpm start:dev

# You should see:
# 👥 User Service running on http://localhost:4001
# And no database errors

# Stop with Ctrl+C
```

---

## Day 4: Generate & Run Migrations

### **Step 5: Create Data Source for Migrations (1 hour)**

#### 5.1 Create Data Source

Create `services/user-service/src/data-source.ts`:

```typescript
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import {
  User,
  Project,
  ProjectMember,
  Conversation,
  Agent,
  Message,
  BillingLog,
  Notification,
} from '@chatai/shared';

// Load .env from root
config({ path: resolve(__dirname, '../../../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'chatai_platform',
  entities: [
    User,
    Project,
    ProjectMember,
    Conversation,
    Agent,
    Message,
    BillingLog,
    Notification,
  ],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
});
```

---

### **Step 6: Generate Migration (1 hour)**

```bash
cd services/user-service

# Generate migration
npx typeorm migration:generate src/migrations/InitialSchema -d src/data-source.ts

# This creates: src/migrations/[timestamp]-InitialSchema.ts
```

The generated migration will look like this (TypeORM auto-generates):

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1234567890123 implements MigrationInterface {
  name = 'InitialSchema1234567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create enums
    await queryRunner.query(`
      CREATE TYPE "public"."users_auth_provider_enum" AS ENUM('email', 'google', 'facebook', 'tiktok')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."project_members_role_enum" AS ENUM('owner', 'editor', 'viewer')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."agents_type_enum" AS ENUM('external', 'self-hosted')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."notifications_type_enum" AS ENUM('new_message', 'project_invite', 'training_complete', 'agent_deployed', 'system')
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "phone" character varying(20),
        "password" character varying(255),
        "auth_provider" "public"."users_auth_provider_enum" NOT NULL DEFAULT 'email',
        "oauth_id" character varying(255),
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
        "avatar_url" character varying(500),
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_phone" UNIQUE ("phone"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    // Create projects table
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "description" text,
        "owner_id" uuid NOT NULL,
        "is_deleted" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects_id" PRIMARY KEY ("id")
      )
    `);

    // Create project_members table
    await queryRunner.query(`
      CREATE TABLE "project_members" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "project_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "role" "public"."project_members_role_enum" NOT NULL DEFAULT 'viewer',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_project_members_id" PRIMARY KEY ("id")
      )
    `);

    // Create conversations table
    await queryRunner.query(`
      CREATE TABLE "conversations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "project_id" uuid NOT NULL,
        "title" character varying(255) NOT NULL,
        "thread_id" character varying(100) NOT NULL,
        "metadata" jsonb,
        "is_deleted" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_conversations_thread_id" UNIQUE ("thread_id"),
        CONSTRAINT "PK_conversations_id" PRIMARY KEY ("id")
      )
    `);

    // Create agents table
    await queryRunner.query(`
      CREATE TABLE "agents" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "description" text,
        "type" "public"."agents_type_enum" NOT NULL DEFAULT 'external',
        "api_endpoint" character varying(500),
        "api_key_encrypted" text,
        "config" jsonb,
        "model_source" character varying(255),
        "training_config" jsonb,
        "version" character varying(50),
        "active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_agents_id" PRIMARY KEY ("id")
      )
    `);

    // Create messages table
    await queryRunner.query(`
      CREATE TABLE "messages" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "conversation_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "agent_id" uuid,
        "user_message" text NOT NULL,
        "agent_response" text,
        "attachments" jsonb,
        "tokens_used" double precision,
        "cost" double precision,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_messages_id" PRIMARY KEY ("id")
      )
    `);

    // Create billing_logs table
    await queryRunner.query(`
      CREATE TABLE "billing_logs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "project_id" uuid,
        "conversation_id" uuid,
        "agent_id" uuid,
        "tokens" double precision NOT NULL,
        "cost" double precision NOT NULL,
        "currency" character varying(10) NOT NULL DEFAULT 'USD',
        "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_billing_logs_id" PRIMARY KEY ("id")
      )
    `);

    // Create notifications table
    await queryRunner.query(`
      CREATE TABLE "notifications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "type" "public"."notifications_type_enum" NOT NULL,
        "title" character varying(255) NOT NULL,
        "message" text NOT NULL,
        "data" jsonb,
        "read" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_notifications_id" PRIMARY KEY ("id")
      )
    `);

    // Create indexes
    await queryRunner.query(`CREATE INDEX "IDX_project_members_project_user" ON "project_members" ("project_id", "user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_messages_conversation_created" ON "messages" ("conversation_id", "created_at")`);
    await queryRunner.query(`CREATE INDEX "IDX_billing_logs_user_timestamp" ON "billing_logs" ("user_id", "timestamp")`);
    await queryRunner.query(`CREATE INDEX "IDX_billing_logs_project_timestamp" ON "billing_logs" ("project_id", "timestamp")`);
    await queryRunner.query(`CREATE INDEX "IDX_notifications_user_read_created" ON "notifications" ("user_id", "read", "created_at")`);

    // Add foreign keys
    await queryRunner.query(`
      ALTER TABLE "projects" 
      ADD CONSTRAINT "FK_projects_owner" 
      FOREIGN KEY ("owner_id") 
      REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "project_members" 
      ADD CONSTRAINT "FK_project_members_project" 
      FOREIGN KEY ("project_id") 
      REFERENCES "projects"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "project_members" 
      ADD CONSTRAINT "FK_project_members_user" 
      FOREIGN KEY ("user_id") 
      REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "conversations" 
      ADD CONSTRAINT "FK_conversations_project" 
      FOREIGN KEY ("project_id") 
      REFERENCES "projects"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "messages" 
      ADD CONSTRAINT "FK_messages_conversation" 
      FOREIGN KEY ("conversation_id") 
      REFERENCES "conversations"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "messages" 
      ADD CONSTRAINT "FK_messages_user" 
      FOREIGN KEY ("user_id") 
      REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "messages" 
      ADD CONSTRAINT "FK_messages_agent" 
      FOREIGN KEY ("agent_id") 
      REFERENCES "agents"("id") 
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_agent"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_user"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_conversation"`);
    await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_conversations_project"`);
    await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_project_members_user"`);
    await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_project_members_project"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_projects_owner"`);

    // Drop indexes
    await queryRunner.query(`DROP INDEX "public"."IDX_notifications_user_read_created"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_billing_logs_project_timestamp"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_billing_logs_user_timestamp"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_messages_conversation_created"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_project_members_project_user"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TABLE "billing_logs"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "agents"`);
    await queryRunner.query(`DROP TABLE "conversations"`);
    await queryRunner.query(`DROP TABLE "project_members"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "users"`);

    // Drop enums
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."agents_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."project_members_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_auth_provider_enum"`);
  }
}
```

---

### **Step 7: Run Migration (30 min)**

#### 7.1 Build Project First

```bash
cd services/user-service

# Build TypeScript
pnpm build

# Verify dist folder
ls -la dist/
```

#### 7.2 Run Migration

```bash
# Run migration
npx typeorm migration:run -d dist/data-source.js

# Expected output:
# query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public'
# query: CREATE TABLE "migrations" ...
# Migration InitialSchema1234567890123 has been executed successfully.
# ✅ 8 tables created
```

#### 7.3 Verify Tables

```bash
# Connect to database
docker exec -it chatai-postgres psql -U postgres -d chatai_platform

# List all tables
\dt

# Expected output:
#              List of relations
#  Schema |       Name        | Type  |  Owner
# --------+-------------------+-------+----------
#  public | agents            | table | postgres
#  public | billing_logs      | table | postgres
#  public | conversations     | table | postgres
#  public | messages          | table | postgres
#  public | migrations        | table | postgres
#  public | notifications     | table | postgres
#  public | project_members   | table | postgres
#  public | projects          | table | postgres
#  public | users             | table | postgres

# Describe users table
\d users

# Exit
\q
```

---

### **Step 8: Create Seed Data (2 hours)**

#### 8.1 Install bcrypt

```bash
cd services/user-service
pnpm add bcrypt
pnpm add -D @types/bcrypt
```

#### 8.2 Create Seed Script

Create `services/user-service/src/seeds/seed.ts`:

```typescript
import { AppDataSource } from '../data-source';
import { User, Agent, UserRole, AuthProvider, AgentType } from '@chatai/shared';
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('🌱 Starting seed...');

    const userRepository = AppDataSource.getRepository(User);
    const agentRepository = AppDataSource.getRepository(Agent);

    // ========================================
    // SEED USERS
    // ========================================
    console.log('\n👤 Seeding users...');

    // 1. Admin user
    const adminExists = await userRepository.findOne({
      where: { email: 'admin@chatai.com' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const admin = userRepository.create({
        name: 'Admin User',
        email: 'admin@chatai.com',
        password: hashedPassword,
        auth_provider: AuthProvider.EMAIL,
        role: UserRole.ADMIN,
        is_active: true,
      });
      await userRepository.save(admin);
      console.log('✅ Admin user created: admin@chatai.com / Admin@123');
    } else {
      console.log('⏭️  Admin user already exists');
    }

    // 2. Test user
    const testUserExists = await userRepository.findOne({
      where: { email: 'test@chatai.com' },
    });

    if (!testUserExists) {
      const hashedPassword = await bcrypt.hash('Test@123', 10);
      const testUser = userRepository.create({
        name: 'Test User',
        email: 'test@chatai.com',
        password: hashedPassword,
        auth_provider: AuthProvider.EMAIL,
        role: UserRole.USER,
        is_active: true,
      });
      await userRepository.save(testUser);
      console.log('✅ Test user created: test@chatai.com / Test@123');
    } else {
      console.log('⏭️  Test user already exists');
    }

    // 3. Demo user
    const demoUserExists = await userRepository.findOne({
      where: { email: 'demo@chatai.com' },
    });

    if (!demoUserExists) {
      const hashedPassword = await bcrypt.hash('Demo@123', 10);
      const demoUser = userRepository.create({
        name: 'Demo User',
        email: 'demo@chatai.com',
        password: hashedPassword,
        auth_provider: AuthProvider.EMAIL,
        role: UserRole.USER,
        is_active: true,
      });
      await userRepository.save(demoUser);
      console.log('✅ Demo user created: demo@chatai.com / Demo@123');
    } else {
      console.log('⏭️  Demo user already exists');
    }

    // ========================================
    // SEED AGENTS
    // ========================================
    console.log('\n🤖 Seeding agents...');

    const agents = [
      {
        name: 'GPT-4',
        description: 'OpenAI GPT-4 - Most capable AI model for complex tasks',
        type: AgentType.EXTERNAL,
        api_endpoint: 'https://api.openai.com/v1/chat/completions',
        model_source: 'openai/gpt-4',
        config: {
          temperature: 0.7,
          max_tokens: 4096,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        active: true,
      },
      {
        name: 'GPT-3.5 Turbo',
        description: 'OpenAI GPT-3.5 Turbo - Fast and efficient for most tasks',
        type: AgentType.EXTERNAL,
        api_endpoint: 'https://api.openai.com/v1/chat/completions',
        model_source: 'openai/gpt-3.5-turbo',
        config: {
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        active: true,
      },
      {
        name: 'Gemini Pro',
        description: 'Google Gemini Pro - Multimodal AI with strong reasoning',
        type: AgentType.EXTERNAL,
        api_endpoint: 'https://generativelanguage.googleapis.com/v1/models',
        model_source: 'google/gemini-pro',
        config: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topK: 40,
          topP: 0.95,
        },
        active: true,
      },
      {
        name: 'Claude 3 Opus',
        description: 'Anthropic Claude 3 Opus - Advanced reasoning and analysis',
        type: AgentType.EXTERNAL,
        api_endpoint: 'https://api.anthropic.com/v1/messages',
        model_source: 'anthropic/claude-3-opus',
        config: {
          max_tokens: 4096,
          temperature: 0.7,
        },
        active: false, // Disabled by default until API key is added
      },
    ];

    for (const agentData of agents) {
      const exists = await agentRepository.findOne({
        where: { name: agentData.name },
      });

      if (!exists) {
        const agent = agentRepository.create(agentData);
        await agentRepository.save(agent);
        console.log(`✅ Agent created: ${agentData.name}`);
      } else {
        console.log(`⏭️  Agent already exists: ${agentData.name}`);
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Summary:');
    console.log('   - 3 users created (admin, test, demo)');
    console.log('   - 4 agents created (GPT-4, GPT-3.5, Gemini, Claude)');
    console.log('\n🔐 Login credentials:');
    console.log('   Admin: admin@chatai.com / Admin@123');
    console.log('   Test:  test@chatai.com / Test@123');
    console.log('   Demo:  demo@chatai.com / Demo@123');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Run seed
seed();
```

#### 8.3 Add Seed Script to package.json

Update `services/user-service/package.json`:

```json
{
  "scripts": {
    "seed": "ts-node src/seeds/seed.ts"
  }
}
```

#### 8.4 Run Seed

```bash
cd services/user-service
pnpm seed

# Expected output:
# 🌱 Starting seed...
# 
# 👤 Seeding users...
# ✅ Admin user created: admin@chatai.com / Admin@123
# ✅ Test user created: test@chatai.com / Test@123
# ✅ Demo user created: demo@chatai.com / Demo@123
# 
# 🤖 Seeding agents...
# ✅ Agent created: GPT-4
# ✅ Agent created: GPT-3.5 Turbo
# ✅ Agent created: Gemini Pro
# ✅ Agent created: Claude 3 Opus
# 
# 🎉 Seed completed successfully!
```

#### 8.5 Verify Seed Data

```bash
# Connect to database
docker exec -it chatai-postgres psql -U postgres -d chatai_platform

# Check users
SELECT id, name, email, role FROM users;

# Check agents
SELECT id, name, type, active FROM agents;

# Exit
\q
```

---

## Day 5: Testing & Documentation

### **Step 9: Create Health Check (1 hour)**

#### 9.1 Create Health Module

Create `services/user-service/src/health/health.controller.ts`:

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
      service: 'user-service',
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

Create `services/user-service/src/health/health.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
```

#### 9.2 Update App Module

Update `services/user-service/src/app.module.ts`:

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

#### 9.3 Test Health Endpoints

```bash
# Start service
cd services/user-service
pnpm start:dev

# In another terminal, test health endpoints
curl http://localhost:4001/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2024-01-15T10:00:00.000Z",
#   "service": "user-service",
#   "version": "1.0.0",
#   "database": {
#     "status": "connected",
#     "type": "PostgreSQL"
#   }
# }

# Test database health
curl http://localhost:4001/health/db

# Expected response:
# {
#   "status": "ok",
#   "database": "connected",
#   "result": 1
# }
```

---

### **Step 10: Create Documentation (2 hours)**

#### 10.1 Create Service README

Create `services/user-service/README.md`:

```markdown
# User Service

User, project, and conversation management service for ChatAI Platform.

## Features

- User CRUD operations
- Project management
- Conversation threading
- Database migrations
- Health check endpoints

## Tech Stack

- NestJS 10
- TypeORM 0.3
- PostgreSQL 15
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL running (via Docker)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp ../../.env.example ../../.env
# Edit .env with your configuration
```

### Database Setup

```bash
# Generate migration
npm run migration:generate src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Seed database
pnpm seed
```

### Running

```bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod

# Debug mode
pnpm start:debug
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## API Endpoints

### Health Check

- `GET /health` - Service health status
- `GET /health/db` - Database connection status

### Users (Coming in M3)

- `GET /users` - List users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Projects (Coming in M3)

- `GET /projects` - List projects
- `GET /projects/:id` - Get project
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Conversations (Coming in M3)

- `GET /conversations` - List conversations
- `GET /conversations/:id` - Get conversation
- `POST /conversations` - Create conversation
- `PUT /conversations/:id` - Update conversation
- `DELETE /conversations/:id` - Delete conversation

## Environment Variables

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=chatai_platform
USER_SERVICE_PORT=4001
```

## Database Schema

### Tables

- `users` - User accounts
- `projects` - Project containers
- `project_members` - Project memberships
- `conversations` - Chat threads
- `agents` - AI agents
- `messages` - Chat messages
- `billing_logs` - Usage tracking
- `notifications` - User notifications

### Seed Data

Default users:
- Admin: `admin@chatai.com` / `Admin@123`
- Test: `test@chatai.com` / `Test@123`
- Demo: `demo@chatai.com` / `Demo@123`

Default agents:
- GPT-4
- GPT-3.5 Turbo
- Gemini Pro
- Claude 3 Opus

## Project Structure

```
src/
├── config/           # Configuration files
├── database/         # Database module
├── health/           # Health check endpoints
├── migrations/       # TypeORM migrations
├── seeds/            # Seed data scripts
├── app.module.ts     # Root module
├── main.ts           # Bootstrap
└── data-source.ts    # TypeORM data source
```

## Contributing

See main project [CONTRIBUTING.md](../../CONTRIBUTING.md)

## License

MIT
```

---

### **Step 11: Create Migration Guide (1 hour)**

Create `services/user-service/docs/MIGRATIONS.md`:

```markdown
# Database Migrations Guide

## Overview

We use TypeORM migrations to manage database schema changes.

## Commands

```bash
# Generate new migration (auto-detect changes)
npm run migration:generate src/migrations/MigrationName

# Create empty migration
npm run migration:create src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

## Creating Migrations

### Auto-Generate (Recommended)

1. Update entity files in `packages/shared/src/entities/`
2. Build shared package: `cd packages/shared && pnpm build`
3. Generate migration:
   ```bash
   npm run migration:generate src/migrations/DescriptiveName
   ```

### Manual Creation

```bash
npm run migration:create src/migrations/AddColumnToUsers
```

Then edit the generated file:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToUsers1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "new_column" varchar(255)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN "new_column"
    `);
  }
}
```

## Best Practices

1. **Always test migrations** in development before production
2. **Write reversible migrations** - implement both `up()` and `down()`
3. **One logical change per migration** - easier to review and revert
4. **Use descriptive names** - `AddEmailVerificationToUsers` not `Migration1`
5. **Never edit existing migrations** - create new ones instead
6. **Backup production database** before running migrations

## Running in Production

```bash
# 1. Backup database
pg_dump -U postgres chatai_platform > backup.sql

# 2. Run migrations
npm run migration:run

# 3. If issues, revert
npm run migration:revert

# 4. Restore backup if needed
psql -U postgres chatai_platform < backup.sql
```

## Troubleshooting

### Migration already exists

```bash
# Check migration status
npm run migration:show

# If stuck, manually update migrations table
psql -U postgres chatai_platform
DELETE FROM migrations WHERE name = 'MigrationName1234567890123';
```

### TypeORM can't find entities

Make sure shared package is built:
```bash
cd ../../packages/shared
pnpm build
```

### Connection issues

Check `.env` file has correct database credentials.
```

---

### **Step 12: Final Testing (2 hours)**

#### 12.1 Create Test Checklist

Create `services/user-service/TESTING.md`:

```markdown
# M1 Testing Checklist

## ✅ Database Connection

- [ ] Service starts without errors
- [ ] GET /health returns status "ok"
- [ ] GET /health/db returns connected

## ✅ Database Schema

- [ ] All 8 tables created
- [ ] All foreign keys created
- [ ] All indexes created
- [ ] Enum types created

## ✅ Migrations

- [ ] Migration file generated
- [ ] Migration runs successfully
- [ ] Migration can be reverted
- [ ] migrations table exists

## ✅ Seed Data

- [ ] 3 users created
- [ ] 4 agents created
- [ ] Can login with seeded users

## ✅ TypeORM Entities

- [ ] All entities exported from shared package
- [ ] Relations work correctly
- [ ] Decorators applied correctly

## Test Commands

```bash
# 1. Check service health
curl http://localhost:4001/health

# 2. Check database
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\dt"

# 3. Verify users
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "SELECT email, role FROM users;"

# 4. Verify agents
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "SELECT name, active FROM agents;"
```
```

#### 12.2 Run Full Test Suite

```bash
# From root directory
cd ChatAI-Platform

# 1. Check Docker services
docker-compose ps
# All should be "Up (healthy)"

# 2. Build shared package
cd packages/shared
pnpm build
ls -la dist/

# 3. Test user service
cd ../../services/user-service
pnpm start:dev
# Should start without errors

# 4. Test health endpoints (in another terminal)
curl http://localhost:4001/health
curl http://localhost:4001/health/db

# 5. Verify database
docker exec -it chatai-postgres psql -U postgres -d chatai_platform

\dt                                  # List tables (should see 9 tables)
SELECT COUNT(*) FROM users;          # Should return 3
SELECT COUNT(*) FROM agents;         # Should return 4
\q

# All tests passing? ✅ M1 Complete!
```

---

### **Step 13: Commit M1 (30 min)**

#### 13.1 Review Changes

```bash
# From root directory
git status

# Should see:
# - packages/shared/ (new)
# - services/user-service/ (new)
# - Updates to pnpm-workspace.yaml (if exists)
```

#### 13.2 Commit

```bash
# Add all changes
git add .

# Commit with conventional format
git commit -m "feat(db): complete M1 - database setup and infrastructure

- Created 8 TypeORM entities in shared package
- Configured database connection with TypeORM
- Generated and ran initial migration
- Created seed data (3 users, 4 agents)
- Added health check endpoints
- Comprehensive documentation

Database tables:
- users, projects, project_members
- conversations, agents, messages
- billing_logs, notifications

Seed credentials:
- Admin: admin@chatai.com / Admin@123
- Test: test@chatai.com / Test@123
- Demo: demo@chatai.com / Demo@123

Closes CAP-6"

# Push to develop branch
git push origin develop
```

#### 13.3 Update Jira

1. Go to Jira: https://thanhhaunv.atlassian.net
2. Find story: CAP-6 (M1 - Database Setup)
3. Move to "Done"
4. Add comment:
   ```
   ✅ M1 Complete!
   
   Deliverables:
   - 8 TypeORM entities
   - Database migration
   - Seed data
   - Health check endpoints
   - Documentation
   
   All tests passing ✅
   ```

---

## Deliverables

### ✅ Completed Items

**Code:**
- ✅ `packages/shared/` - Shared TypeORM entities
  - 8 entities: User, Project, ProjectMember, Conversation, Agent, Message, BillingLog, Notification
  - Full TypeScript types
  - Relations configured
  
- ✅ `services/user-service/` - User service with database
  - NestJS project structure
  - Database configuration
  - TypeORM integration
  - Health check endpoints
  
- ✅ Database migration
  - Initial schema migration
  - 8 tables created
  - Foreign keys and indexes
  - Reversible migration
  
- ✅ Seed data script
  - 3 users (admin, test, demo)
  - 4 AI agents (GPT-4, GPT-3.5, Gemini, Claude)
  
**Documentation:**
- ✅ Service README
- ✅ Migration guide
- ✅ Testing checklist

**Testing:**
- ✅ Health check endpoints working
- ✅ Database connection verified
- ✅ All tables created
- ✅ Seed data loaded

---

## Verification Checklist

### Final M1 Verification

Run through this checklist to confirm M1 is complete:

```bash
# 1. ✅ Docker services running
docker-compose ps
# Expected: All services "Up (healthy)"

# 2. ✅ Shared package built
ls packages/shared/dist/
# Expected: index.js, index.d.ts, entities/

# 3. ✅ User service starts
cd services/user-service
pnpm start:dev
# Expected: "👥 User Service running on http://localhost:4001"

# 4. ✅ Health endpoints respond
curl http://localhost:4001/health
# Expected: {"status":"ok",...}

# 5. ✅ Database has 9 tables
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\dt"
# Expected: 9 tables (8 + migrations)

# 6. ✅ Seed data exists
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "SELECT COUNT(*) FROM users;"
# Expected: 3

docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "SELECT COUNT(*) FROM agents;"
# Expected: 4

# 7. ✅ Code committed to Git
git log -1 --oneline
# Expected: "feat(db): complete M1 - database setup..."

# 8. ✅ Jira story updated
# Check: CAP-6 status = "Done"
```

**All items checked? 🎉 M1 is COMPLETE!**

---

## Next Steps

**Ready for M2?**

Once M1 is confirmed complete, proceed to:

### **M2 - Auth Service (Week 1-2)**

**What we'll build:**
- Email/phone signup & login
- JWT authentication
- Google OAuth integration
- Facebook OAuth integration
- TikTok OAuth integration
- Auth guards and decorators
- Unit and E2E tests

**Estimated time:** 1 week (5 days)

---

## Troubleshooting

### Common Issues

#### Issue 1: "Cannot find module '@chatai/shared'"

**Solution:**
```bash
# Build shared package
cd packages/shared
pnpm build

# Verify dist folder exists
ls -la dist/
```

#### Issue 2: "Connection refused" to PostgreSQL

**Solution:**
```bash
# Check Docker is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

#### Issue 3: Migration fails with "relation already exists"

**Solution:**
```bash
# Check migration status
npx typeorm migration:show -d dist/data-source.js

# If needed, revert and re-run
npx typeorm migration:revert -d dist/data-source.js
npx typeorm migration:run -d dist/data-source.js
```

#### Issue 4: Seed script fails

**Solution:**
```bash
# Check if tables exist
docker exec -it chatai-postgres psql -U postgres -d chatai_platform -c "\dt"

# Drop and recreate if needed
npx typeorm migration:revert -d dist/data-source.js
npx typeorm migration:run -d dist/data-source.js

# Run seed again
pnpm seed
```

#### Issue 5: TypeScript errors in entities

**Solution:**
```bash
# Rebuild shared package
cd packages/shared
pnpm clean
pnpm build

# Reinstall in user-service
cd ../../services/user-service
pnpm install
```

---

## Resources

### Documentation Links

- [TypeORM Documentation](https://typeorm.io/)
- [NestJS TypeORM Integration](https://docs.nestjs.com/techniques/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Migrations Guide](https://typeorm.io/migrations)

### Database Tools

- **pgAdmin:** http://localhost:5050 (admin@chatai.com / admin)
- **TablePlus:** https://tableplus.com/ (recommended GUI)
- **DBeaver:** https://dbeaver.io/ (free alternative)

### Useful Commands

```bash
# Start all services
./scripts/dev-start.sh

# Stop all services
./scripts/dev-stop.sh

# Reset everything
./scripts/dev-reset.sh

# View logs
docker-compose logs -f postgres

# Database backup
docker exec chatai-postgres pg_dump -U postgres chatai_platform > backup.sql

# Database restore
docker exec -i chatai-postgres psql -U postgres chatai_platform < backup.sql
```

---

## Summary

### What We Accomplished

**Week 1 - M1 Complete:**
- ✅ Created 8 TypeORM entities
- ✅ Setup database configuration
- ✅ Generated and ran initial migration
- ✅ Created seed data (3 users, 4 agents)
- ✅ Built health check endpoints
- ✅ Comprehensive documentation
- ✅ All tests passing

### Metrics

- **Code:** ~1,500 lines
- **Files created:** 25+
- **Database tables:** 8
- **Migration files:** 1
- **Time spent:** ~20 hours (5 days)
- **Test coverage:** Health checks working

### Team Performance

- ✅ On schedule
- ✅ All acceptance criteria met
- ✅ Documentation complete
- ✅ No blockers

---

## 🎉 M1 COMPLETE!

**Congratulations!** You've successfully completed M1 - Database Setup & Infrastructure.

### Key Achievements:

1. ✅ **Solid Foundation** - 8 well-structured TypeORM entities
2. ✅ **Production-Ready** - Migrations, seeds, health checks
3. ✅ **Well-Documented** - README, guides, troubleshooting
4. ✅ **Tested** - All verification steps passing

### Ready for Next Milestone

**M2 - Auth Service** is ready to start!

---

**Questions or issues?** 
- Check troubleshooting section above
- Review documentation in `services/user-service/`
- Ask in Slack #dev-backend channel

**Let's keep the momentum going! 🚀**
