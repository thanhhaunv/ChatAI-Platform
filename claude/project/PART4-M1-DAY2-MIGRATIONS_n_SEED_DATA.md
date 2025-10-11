# PART 4 - M1 DAY 2: MIGRATIONS & SEED DATA

**Milestone:** M1 - Database Setup  
**Day:** 2 of 5 (Tuesday)  
**Duration:** 4 hours  
**Prerequisites:** Day 1 complete (8 entities created)

**Goal:** Generate migrations, test database, create seed data

---

## 📋 TODAY'S TASKS

1. Update app.module.ts with TypeORM
2. Generate initial migration
3. Run migration locally
4. Verify database schema
5. Create seed data scripts
6. Test full database setup

---

## ✅ Task 2.1: Configure App Module (30 min)

**Update:** `services/user-service/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

**Update:** `services/user-service/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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

  // Enable CORS for development
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.USER_SERVICE_PORT || 3002;
  await app.listen(port);
  
  console.log(`🚀 User Service running on port ${port}`);
  console.log(`📊 Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
}

bootstrap();
```

---

**Create .env for user-service:**

`services/user-service/.env` (symlink to root .env)

```bash
# From services/user-service
ln -s ../../.env .env

# Or copy if symlink doesn't work on Windows
cp ../../.env .env
```

---

**Test app starts (without DB yet):**

```bash
cd services/user-service
pnpm run start:dev
```

**Expected output:**
```
[Nest] INFO  Starting Nest application...
[Nest] INFO  AppModule dependencies initialized
[Nest] ERROR Unable to connect to the database
```

*It's OK to fail here - we haven't run migrations yet!*

Stop the server: `Ctrl+C`

---

## ✅ Task 2.2: Generate Initial Migration (1 hour)

**Step 1: Ensure Docker PostgreSQL is running**

```bash
# From repo root
docker-compose ps | grep postgres
```

**Should see:**
```
chatai-postgres   Up (healthy)   0.0.0.0:5432->5432/tcp
```

**If not running:**
```bash
docker-compose up -d postgres
```

---

**Step 2: Load environment variables**

```bash
# From services/user-service
export $(cat ../../.env | grep -v '^#' | xargs)

# Verify
echo $DB_HOST
echo $DB_NAME
```

---

**Step 3: Generate migration from entities**

```bash
cd services/user-service

# Generate migration (TypeORM will compare entities vs empty DB)
pnpm run typeorm migration:generate src/database/migrations/InitialSchema -d ormconfig.ts
```

**Expected output:**
```
Migration /path/to/services/user-service/src/database/migrations/1234567890123-InitialSchema.ts has been generated successfully.
```

---

**Step 4: Review generated migration**

Open: `services/user-service/src/database/migrations/1234567890123-InitialSchema.ts`

**It should contain:**

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1234567890123 implements MigrationInterface {
  name = 'InitialSchema1234567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "phone" VARCHAR(20) UNIQUE,
        "password" VARCHAR(255),
        "auth_provider" VARCHAR(50) DEFAULT 'email',
        "oauth_id" VARCHAR(255),
        "role" VARCHAR(50) DEFAULT 'member',
        "is_active" BOOLEAN DEFAULT true,
        "email_verified" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create projects table
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "owner_id" INTEGER NOT NULL,
        "is_active" BOOLEAN DEFAULT true,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY ("owner_id") REFERENCES "users"("id")
      )
    `);

    // ... (other tables - project_members, conversations, agents, messages, billing_log, notifications)

    // Create indexes
    await queryRunner.query(`CREATE INDEX "idx_users_email" ON "users"("email")`);
    await queryRunner.query(`CREATE INDEX "idx_projects_owner" ON "projects"("owner_id")`);
    await queryRunner.query(`CREATE INDEX "idx_conversations_thread" ON "conversations"("thread_id")`);
    // ... (other indexes)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order (respect foreign keys)
    await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "billing_log"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "agents"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "conversations"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "project_members"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "projects"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
```

**✅ Migration looks good!**

---

## ✅ Task 2.3: Run Migration (30 min)

**Step 1: Run migration**

```bash
cd services/user-service

# Run migration
pnpm run typeorm migration:run -d ormconfig.ts
```

**Expected output:**
```
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'migrations'
query: CREATE TABLE "migrations" ("id" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_migrations" PRIMARY KEY ("id"))
query: SELECT * FROM "migrations" "migrations" ORDER BY "id" DESC
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: CREATE TABLE "users" ...
query: CREATE TABLE "projects" ...
... (all tables)
query: INSERT INTO "migrations"("timestamp", "name") VALUES ($1, $2)
Migration InitialSchema1234567890123 has been executed successfully.
query: COMMIT
```

**✅ Migration successful!**

---

**Step 2: Verify tables in database**

**Option A: Using psql**

```bash
docker exec -it chatai-postgres psql -U admin -d chatai
```

```sql
-- List all tables
\dt

-- Should see:
--  public | agents          | table | admin
--  public | billing_log     | table | admin
--  public | conversations   | table | admin
--  public | messages        | table | admin
--  public | migrations      | table | admin
--  public | notifications   | table | admin
--  public | project_members | table | admin
--  public | projects        | table | admin
--  public | users           | table | admin

-- Describe users table
\d users

-- Exit
\q
```

---

**Option B: Using pgAdmin**

1. Open: http://localhost:5050
2. Login: `admin@chatai.com` / `admin`
3. Connect to: `ChatAI Local` server
4. Navigate: `Servers → ChatAI Local → Databases → chatai → Schemas → public → Tables`
5. **Verify:** 9 tables exist (8 entities + migrations)

---

**Step 3: Test app connects to database**

```bash
cd services/user-service
pnpm run start:dev
```

**Expected output:**
```
[Nest] INFO  Starting Nest application...
[Nest] INFO  TypeOrmModule dependencies initialized
[Nest] INFO  Mapped {/, GET} route
🚀 User Service running on port 3002
📊 Database: chatai@localhost:5432
```

**✅ App connects successfully!**

**Test health endpoint:**

```bash
curl http://localhost:3002
```

**Should return:** `Hello World!` (from app.controller.ts)

**Stop server:** `Ctrl+C`

---

## ✅ Task 2.4: Create Seed Data Scripts (1.5 hours)

**Create:** `services/user-service/src/database/seeds/seed.ts`

```typescript
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../config/database.config';
import {
  User,
  Project,
  ProjectMember,
  Conversation,
  Agent,
  Message,
  BillingLog,
  Notification,
} from '../entities';
import * as bcrypt from 'bcrypt';

async function seed() {
  console.log('🌱 Starting database seed...');

  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  // Clear existing data (in reverse order to respect foreign keys)
  console.log('🗑️  Clearing existing data...');
  await dataSource.getRepository(Notification).delete({});
  await dataSource.getRepository(BillingLog).delete({});
  await dataSource.getRepository(Message).delete({});
  await dataSource.getRepository(Conversation).delete({});
  await dataSource.getRepository(Agent).delete({});
  await dataSource.getRepository(ProjectMember).delete({});
  await dataSource.getRepository(Project).delete({});
  await dataSource.getRepository(User).delete({});

  // 1. Create Users
  console.log('👤 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await dataSource.getRepository(User).save({
    name: 'Admin User',
    email: 'admin@chatai.com',
    password: hashedPassword,
    auth_provider: 'email',
    role: 'admin',
    email_verified: true,
  });

  const user1 = await dataSource.getRepository(User).save({
    name: 'John Doe',
    email: 'john@example.com',
    password: hashedPassword,
    auth_provider: 'email',
    role: 'member',
    email_verified: true,
  });

  const user2 = await dataSource.getRepository(User).save({
    name: 'Jane Smith',
    email: 'jane@example.com',
    auth_provider: 'google',
    oauth_id: 'google-123456',
    role: 'member',
    email_verified: true,
  });

  console.log(`✅ Created ${3} users`);

  // 2. Create Agents
  console.log('🤖 Creating agents...');
  const openaiAgent = await dataSource.getRepository(Agent).save({
    name: 'OpenAI GPT-4',
    description: 'OpenAI GPT-4 model via API',
    type: 'external',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    config_json: JSON.stringify({ model: 'gpt-4' }),
    version: '4.0',
    active: true,
  });

  const geminiAgent = await dataSource.getRepository(Agent).save({
    name: 'Google Gemini Pro',
    description: 'Google Gemini Pro model',
    type: 'external',
    api_endpoint: 'https://generativelanguage.googleapis.com',
    config_json: JSON.stringify({ model: 'gemini-pro' }),
    version: '1.0',
    active: true,
  });

  console.log(`✅ Created ${2} agents`);

  // 3. Create Projects
  console.log('📁 Creating projects...');
  const project1 = await dataSource.getRepository(Project).save({
    name: 'Personal AI Assistant',
    description: 'My personal AI chat project',
    owner_id: user1.id,
  });

  const project2 = await dataSource.getRepository(Project).save({
    name: 'Team Collaboration',
    description: 'Shared project for team discussions',
    owner_id: admin.id,
  });

  console.log(`✅ Created ${2} projects`);

  // 4. Create Project Members
  console.log('👥 Adding project members...');
  await dataSource.getRepository(ProjectMember).save([
    {
      project_id: project1.id,
      user_id: user1.id,
      role: 'owner',
    },
    {
      project_id: project2.id,
      user_id: admin.id,
      role: 'owner',
    },
    {
      project_id: project2.id,
      user_id: user1.id,
      role: 'editor',
    },
    {
      project_id: project2.id,
      user_id: user2.id,
      role: 'viewer',
    },
  ]);

  console.log(`✅ Added ${4} project members`);

  // 5. Create Conversations
  console.log('💬 Creating conversations...');
  const conv1 = await dataSource.getRepository(Conversation).save({
    project_id: project1.id,
    thread_id: 'thread-' + Date.now() + '-1',
    title: 'General Discussion',
  });

  const conv2 = await dataSource.getRepository(Conversation).save({
    project_id: project2.id,
    thread_id: 'thread-' + Date.now() + '-2',
    title: 'Team Planning',
  });

  console.log(`✅ Created ${2} conversations`);

  // 6. Create Messages
  console.log('📝 Creating messages...');
  const msg1 = await dataSource.getRepository(Message).save({
    conversation_id: conv1.id,
    user_id: user1.id,
    agent_id: openaiAgent.id,
    user_message: 'Hello, can you help me with my project?',
    agent_response: 'Of course! I\'d be happy to help. What would you like to know?',
    tokens_used: 25,
  });

  const msg2 = await dataSource.getRepository(Message).save({
    conversation_id: conv1.id,
    user_id: user1.id,
    agent_id: openaiAgent.id,
    user_message: 'What are the best practices for database design?',
    agent_response: 'Great question! Here are some key database design best practices:\n1. Normalize your data\n2. Use appropriate data types\n3. Create indexes on frequently queried columns\n4. Use foreign keys for referential integrity',
    tokens_used: 85,
  });

  const msg3 = await dataSource.getRepository(Message).save({
    conversation_id: conv2.id,
    user_id: admin.id,
    agent_id: geminiAgent.id,
    user_message: 'Can you help us plan our sprint?',
    agent_response: 'I can help with sprint planning! What are your team\'s goals for this sprint?',
    tokens_used: 30,
  });

  console.log(`✅ Created ${3} messages`);

  // 7. Create Billing Logs
  console.log('💰 Creating billing logs...');
  await dataSource.getRepository(BillingLog).save([
    {
      user_id: user1.id,
      project_id: project1.id,
      conversation_id: conv1.id,
      agent_id: openaiAgent.id,
      tokens: 25,
      cost: 0.05,
    },
    {
      user_id: user1.id,
      project_id: project1.id,
      conversation_id: conv1.id,
      agent_id: openaiAgent.id,
      tokens: 85,
      cost: 0.17,
    },
    {
      user_id: admin.id,
      project_id: project2.id,
      conversation_id: conv2.id,
      agent_id: geminiAgent.id,
      tokens: 30,
      cost: 0.03,
    },
  ]);

  console.log(`✅ Created ${3} billing logs`);

  // 8. Create Notifications
  console.log('🔔 Creating notifications...');
  await dataSource.getRepository(Notification).save([
    {
      user_id: user1.id,
      type: 'message',
      title: 'New message from AI',
      message: 'OpenAI GPT-4 responded to your question',
      read: false,
    },
    {
      user_id: user2.id,
      type: 'invite',
      title: 'Project invitation',
      message: 'You have been invited to "Team Collaboration"',
      read: false,
    },
    {
      user_id: admin.id,
      type: 'system',
      title: 'Welcome to ChatAI Platform',
      message: 'Your account has been created successfully',
      read: true,
    },
  ]);

  console.log(`✅ Created ${3} notifications`);

  await dataSource.destroy();
  console.log('🎉 Database seed completed!');
}

// Run seed
seed()
  .then(() => {
    console.log('✅ Seed successful');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
```

---

**Install bcrypt for password hashing:**

```bash
cd services/user-service
pnpm install bcrypt
pnpm install -D @types/bcrypt
```

---

**Update package.json scripts:**

```json
{
  "scripts": {
    "seed": "ts-node src/database/seeds/seed.ts",
    "seed:run": "ts-node -r tsconfig-paths/register src/database/seeds/seed.ts"
  }
}
```

---

**Install ts-node if not already:**

```bash
pnpm install -D ts-node tsconfig-paths
```

---

## ✅ Task 2.5: Run Seed Data (30 min)

**Step 1: Run seed script**

```bash
cd services/user-service
pnpm run seed
```

**Expected output:**
```
🌱 Starting database seed...
🗑️  Clearing existing data...
👤 Creating users...
✅ Created 3 users
🤖 Creating agents...
✅ Created 2 agents
📁 Creating projects...
✅ Created 2 projects
👥 Adding project members...
✅ Added 4 project members
💬 Creating conversations...
✅ Created 2 conversations
📝 Creating messages...
✅ Created 3 messages
💰 Creating billing logs...
✅ Created 3 billing logs
🔔 Creating notifications...
✅ Created 3 notifications
🎉 Database seed completed!
✅ Seed successful
```

---

**Step 2: Verify seed data in database**

```bash
docker exec -it chatai-postgres psql -U admin -d chatai
```

```sql
-- Count records in each table
SELECT 'users' as table_name, COUNT(*) FROM users
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'project_members', COUNT(*) FROM project_members
UNION ALL
SELECT 'conversations', COUNT(*) FROM conversations
UNION ALL
SELECT 'agents', COUNT(*) FROM agents
UNION ALL
SELECT 'messages', COUNT(*) FROM messages
UNION ALL
SELECT 'billing_log', COUNT(*) FROM billing_log
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;

-- Expected output:
--   table_name      | count
-- ------------------+-------
--  users            |     3
--  projects         |     2
--  project_members  |     4
--  conversations    |     2
--  agents           |     2
--  messages         |     3
--  billing_log      |     3
--  notifications    |     3

-- Test a query with joins
SELECT 
  u.name as user_name,
  p.name as project_name,
  pm.role,
  c.title as conversation_title
FROM users u
JOIN project_members pm ON u.id = pm.user_id
JOIN projects p ON pm.project_id = p.id
LEFT JOIN conversations c ON p.id = c.project_id
ORDER BY u.name, p.name;

-- Should see all relationships working!

\q
```

---

**Step 3: Test queries via app**

**Create a simple test controller:**

`services/user-service/src/app.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './database/entities';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return 'User Service is running!';
  }

  @Get('health')
  async getHealth() {
    const userCount = await this.userRepository.count();
    return {
      status: 'ok',
      database: 'connected',
      users: userCount,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('users')
  async getUsers() {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'role', 'auth_provider'],
    });
  }
}
```

---

**Update app.module.ts to import User entity:**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { User } from './database/entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    TypeOrmModule.forFeature([User]), // Add this
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

**Start app and test:**

```bash
cd services/user-service
pnpm run start:dev
```

**Test endpoints:**

```bash
# Health check
curl http://localhost:3002/health

# Expected:
# {
#   "status": "ok",
#   "database": "connected",
#   "users": 3,
#   "timestamp": "2025-10-25T10:30:00.000Z"
# }

# Get users
curl http://localhost:3002/users

# Expected:
# [
#   {
#     "id": 1,
#     "name": "Admin User",
#     "email": "admin@chatai.com",
#     "role": "admin",
#     "auth_provider": "email"
#   },
#   ...
# ]
```

**✅ All endpoints working!**

---

**Commit Day 2:**

```bash
cd ChatAI-Platform

git add services/user-service
git commit -m "feat(db): add migrations and seed data scripts

- Generated initial migration from entities
- Created seed script with sample data
- Added health check and test endpoints
- Verified database connections and queries"

git push origin develop
```

---

## ✅ END OF DAY 2 CHECKLIST

**Verify everything complete:**

- [ ] app.module.ts configured with TypeORM
- [ ] Initial migration generated
- [ ] Migration run successfully (9 tables created)
- [ ] Verified tables in pgAdmin/psql
- [ ] Seed data script created
- [ ] Seed data populated (all 8 tables have data)
- [ ] Test endpoints working (/health, /users)
- [ ] App connects to database successfully
- [ ] All committed to Git

---

## 📊 DATABASE STATUS

**Tables created:** 9 (8 entities + migrations)
**Sample data:**
- 3 users (admin + 2 members)
- 2 agents (OpenAI, Gemini)
- 2 projects
- 4 project members
- 2 conversations
- 3 messages
- 3 billing logs
- 3 notifications

**Total records:** 22 rows across all tables

---

## 🚀 TOMORROW: Day 3 - CI/CD Pipeline

**Tasks for Day 3:**
- Setup GitHub Actions workflow
- Add PostgreSQL service to CI
- Run migrations in CI
- Add test database
- Automated testing

**Estimated time:** 4 hours

---

**Status:** Day 2 complete (4 hours)  
**Progress:** M1 40% complete (2/5 days)  
**Next:** Day 3 - CI/CD Pipeline

**Bạn muốn tiếp Day 3 luôn không?** 🚀
