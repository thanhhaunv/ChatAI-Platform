
## 🚀 DAY 1: PROJECT STRUCTURE & ENTITIES

### ✅ Task 1.1: Initialize NestJS Monorepo (1 hour)

**Step 1: Create services folder structure**

```bash
# From repo root
cd ChatAI-Platform

# Create services directory
mkdir -p services

# Initialize user-service (will contain DB entities shared across services)
cd services
npx @nestjs/cli new user-service --skip-git --skip-install
```

**When prompted:**
- Package manager: **pnpm** (or npm if you prefer)
- Skip git: Yes (already in monorepo)

---

**Step 2: Install dependencies**

```bash
cd user-service

# Install NestJS dependencies
pnpm install

# Install TypeORM & PostgreSQL
pnpm install @nestjs/typeorm typeorm pg

# Install config
pnpm install @nestjs/config

# Install validation
pnpm install class-validator class-transformer

# Install dev dependencies
pnpm install -D @types/node
```

---

**Step 3: Update package.json**

Edit `services/user-service/package.json`:

```json
{
  "name": "user-service",
  "version": "0.1.0",
  "description": "User, Project, and Database service for ChatAI Platform",
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
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "typeorm-ts-node-commonjs migration:generate",
    "migration:run": "typeorm-ts-node-commonjs migration:run",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert"
  }
}
```

---

**Step 4: Create folder structure**

```bash
# From services/user-service
mkdir -p src/database/entities
mkdir -p src/database/migrations
mkdir -p src/database/seeds
mkdir -p src/config
```

**Final structure should look like:**
```
services/user-service/
├── src/
│   ├── config/
│   │   └── database.config.ts
│   ├── database/
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   │   ├── project.entity.ts
│   │   │   ├── project-member.entity.ts
│   │   │   ├── conversation.entity.ts
│   │   │   ├── message.entity.ts
│   │   │   ├── agent.entity.ts
│   │   │   ├── billing-log.entity.ts
│   │   │   └── notification.entity.ts
│   │   ├── migrations/
│   │   └── seeds/
│   ├── app.module.ts
│   └── main.ts
└── package.json
```

---

### ✅ Task 1.2: Create Database Configuration (30 min)

**Create:** `services/user-service/src/config/database.config.ts`

```typescript
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

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
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: false, // Never use in production
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  })
);

// For TypeORM CLI
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'chatai',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
```

---

**Create:** `services/user-service/ormconfig.ts` (for TypeORM CLI)

```typescript
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/config/database.config';

export default new DataSource(dataSourceOptions);
```

---

### ✅ Task 1.3: Create TypeORM Entities (4 hours)

**📝 Entity 1: User**

Create: `services/user-service/src/database/entities/user.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { Message } from './message.entity';
import { BillingLog } from './billing-log.entity';
import { Notification } from './notification.entity';

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
  oauth_id: string; // ID from OAuth provider

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

  // Relations
  @OneToMany(() => ProjectMember, (member) => member.user)
  project_memberships: ProjectMember[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => BillingLog, (log) => log.user)
  billing_logs: BillingLog[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
```

---

**📝 Entity 2: Project**

Create: `services/user-service/src/database/entities/project.entity.ts`

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
import { BillingLog } from './billing-log.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'owner_id' })
  owner_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => ProjectMember, (member) => member.project)
  members: ProjectMember[];

  @OneToMany(() => Conversation, (conversation) => conversation.project)
  conversations: Conversation[];

  @OneToMany(() => BillingLog, (log) => log.project)
  billing_logs: BillingLog[];
}
```

---

**📝 Entity 3: ProjectMember**

Create: `services/user-service/src/database/entities/project-member.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id' })
  project_id: number;

  @ManyToOne(() => Project, (project) => project.members)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.project_memberships)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['owner', 'editor', 'viewer'],
    default: 'viewer',
  })
  role: string;

  @CreateDateColumn()
  joined_at: Date;
}
```

---

**📝 Entity 4: Conversation**

Create: `services/user-service/src/database/entities/conversation.entity.ts`

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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id' })
  project_id: number;

  @ManyToOne(() => Project, (project) => project.conversations)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'uuid', unique: true })
  thread_id: string; // UUID for external reference

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // Flexible metadata storage

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
```

---

**📝 Entity 5: Agent**

Create: `services/user-service/src/database/entities/agent.entity.ts`

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
import { BillingLog } from './billing-log.entity';

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['external', 'self-hosted'],
    default: 'external',
  })
  type: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  api_endpoint: string; // For external agents

  @Column({ type: 'text', nullable: true })
  config_json: string; // Encrypted API keys, configs

  @Column({ type: 'varchar', length: 500, nullable: true })
  model_source: string; // Hugging Face model URL

  @Column({ type: 'jsonb', nullable: true })
  training_config: Record<string, any>; // Training parameters

  @Column({ type: 'varchar', length: 50, nullable: true })
  version: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Message, (message) => message.agent)
  messages: Message[];

  @OneToMany(() => BillingLog, (log) => log.agent)
  billing_logs: BillingLog[];
}
```

---

**📝 Entity 6: Message**

Create: `services/user-service/src/database/entities/message.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';
import { Agent } from './agent.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'conversation_id' })
  conversation_id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'agent_id', nullable: true })
  agent_id: number;

  @ManyToOne(() => Agent, (agent) => agent.messages)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @Column({ type: 'text', nullable: true })
  user_message: string;

  @Column({ type: 'text', nullable: true })
  agent_response: string;

  @Column({ type: 'jsonb', nullable: true })
  attachments: string[]; // Array of file URLs

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tokens_used: number;

  @CreateDateColumn()
  created_at: Date;
}
```

---

**📝 Entity 7: BillingLog**

Create: `services/user-service/src/database/entities/billing-log.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Conversation } from './conversation.entity';
import { Agent } from './agent.entity';

@Entity('billing_log')
export class BillingLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.billing_logs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'project_id', nullable: true })
  project_id: number;

  @ManyToOne(() => Project, (project) => project.billing_logs)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'conversation_id', nullable: true })
  conversation_id: number;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ name: 'agent_id', nullable: true })
  agent_id: number;

  @ManyToOne(() => Agent, (agent) => agent.billing_logs)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tokens: number;

  @CreateDateColumn()
  timestamp: Date;
}
```

---

**📝 Entity 8: Notification**

Create: `services/user-service/src/database/entities/notification.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['message', 'invite', 'training_complete', 'system'],
    default: 'system',
  })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // Additional data (link, action, etc.)

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;
}
```

---

**Create index file** for easy imports:

`services/user-service/src/database/entities/index.ts`

```typescript
export { User } from './user.entity';
export { Project } from './project.entity';
export { ProjectMember } from './project-member.entity';
export { Conversation } from './conversation.entity';
export { Agent } from './agent.entity';
export { Message } from './message.entity';
export { BillingLog } from './billing-log.entity';
export { Notification } from './notification.entity';
```

---

**Commit Day 1:**

```bash
cd ChatAI-Platform
git add services/user-service
git commit -m "feat(db): add 8 TypeORM entities with relations"
git push origin develop
```

**✅ Day 1 Complete! 8 entities created with full relations.**

---

## 📅 TOMORROW: Day 2 - Migrations & Seed Data

We'll continue with:
- Generate migration from entities
- Test migration locally
- Create seed data scripts

**Estimated time for Day 2:** 4 hours

---

**Status:** Day 1 complete (6 hours)  
**Next:** `PART4-M1-Day2-Migrations.md` (will create tomorrow)

**Bạn có muốn tôi tiếp tục Day 2 luôn không?** 🚀
