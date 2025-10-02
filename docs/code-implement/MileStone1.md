
## 2. Chi Tiết Các Phần Cần Làm (Focus Phase 1, Milestone 1)
Dưới đây là hướng dẫn triển khai chi tiết Milestone 1 (Setup DB/Infra), với code đầy đủ (entities, migration, test scripts). Các milestone sau sẽ theo format tương tự (bạn yêu cầu thì tôi gen full code).  

**Steps**:  
1. Khởi tạo /services/user-service: `nest new services/user-service --skip-install`.  
2. Install deps in /services/user-service: `npm i @nestjs/typeorm typeorm pg class-validator class-transformer @nestjs/config reflect-metadata`. Dev: `npm i -D ts-node @types/node jest supertest @nestjs/testing ts-jest`.  

### Milestone 1: Setup Database Và Infra Basic (Effort: 14 hours, Time: Week 2 Phase 0)
**Mục Tiêu**: Postgres DB local, schema migrated, NestJS connected, CI/CD running.  

**Prerequisites**: Docker v20+, Node v18+, Git. Clone repo, create /services/user-service (npx nest new user-service --skip-install).  

#### Story 1-1: Setup Local Infrastructure Với Docker (4 hours)
1. Tạo docker-compose.yml ở root:  
   ```yaml
   version: '3.8'
   services:
     db:
       image: postgres:15-alpine
       environment:
         POSTGRES_USER: admin
         POSTGRES_PASSWORD: secret
         POSTGRES_DB: chatai
       ports:
         - '5432:5432'
       volumes:
         - db-data:/var/lib/postgresql/data
   volumes:
     db-data:
   ```  
2. Run: `docker-compose up -d`. Output: Container up.  
3. Verify: `docker ps` (postgres running). psql: `psql -h localhost -U admin -d chatai` → `\l` (chatai exists).  command:
   ```
   sudo docker exec -it -e PGPASSWORD=secret dbs-db-1 psql -U admin -d chatai
   ```

Test Script (psql):  
```sql
SELECT version();  -- Output: PostgreSQL 15.x
\q
```

#### Story 1-2: Implement DB Schema Dựa ERD (6 hours)
### File .env
### DB Connection Config (for TypeORM/NestJS to connect to Postgres container)
```
DB_HOST=localhost  # Host of the DB (localhost for local Docker)
DB_PORT=5432  # Port mapped in docker-compose.yml
DB_USER=admin  # Postgres user from docker-compose environment
DB_PASS=secret  # Postgres password from docker-compose
DB_NAME=chatai  # Database name from docker-compose
```

1. In /services/user-service, npm i @nestjs/typeorm typeorm pg reflect-metadata.  
2. Tạo src/data-source.ts:  
   ```typescript
   import { DataSource } from 'typeorm';

   export const AppDataSource = new DataSource({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'admin',
     password: 'secret',
     database: 'chatai',
     synchronize: false,
     logging: true,
     entities: ['src/entities/*.entity{.ts,.js}'],
     migrations: ['src/migrations/*.ts'],
   });
   ```  
3. Tạo src/entities/ folder, entities đầy đủ:  

**user.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';  // Import Project for relation
import { ProjectMember } from './project_member.entity';  // Import ProjectMember for relation
import { Message } from './message.entity';  // Import Message for relation
import { BillingLog } from './billing_log.entity';  // Import BillingLog for relation

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ unique: true, nullable: true, length: 20 })
  phone: string;

  @Column({ nullable: true, length: 50 })
  auth_provider: string;

  @Column({ length: 50 })
  role: string;

  @OneToMany(() => Project, project => project.owner)  // Relation ngược với Project (one user owns many projects)
  projects: Project[];

  @OneToMany(() => ProjectMember, member => member.user)  // Relation ngược với ProjectMember (one user in many project members)
  projectMembers: ProjectMember[];

  @OneToMany(() => Message, message => message.user)  // Relation ngược với Message (one user has many messages)
  messages: Message[];

  @OneToMany(() => BillingLog, billingLog => billingLog.user)  // Relation ngược với BillingLog (one user has many billing logs)
  billingLogs: BillingLog[];

  @CreateDateColumn()
  created_at: Date;
}
```

**project.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ProjectMember } from './project_member.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => ProjectMember, member => member.project)
  members: ProjectMember[];

  @CreateDateColumn()
  created_at: Date;
}
```

**project_member.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.members, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => User, user => user.projectMembers, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 50 })
  role: string;
}
```

**conversation.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.conversations, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'json', nullable: true })
  metadata: object;

  @CreateDateColumn()
  created_at: Date;
}
```

**agent.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  type: string;  // 'external' or 'self-hosted'

  @Column({ length: 200 })
  api_endpoint: string;

  @Column({ type: 'json' })
  config_json: object;

  @Column({ length: 50 })
  model_source: string;

  @Column({ type: 'json', nullable: true })
  training_config: object;

  @Column({ length: 20 })
  version: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
```

**message.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Agent } from './agent.entity';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, conversation => conversation.messages, { onDelete: 'CASCADE' })
  conversation: Conversation;

  @ManyToOne(() => User, user => user.messages)
  user: User;

  @ManyToOne(() => Agent, agent => agent.messages)
  agent: Agent;

  @Column({ type: 'text' })
  user_message: string;

  @Column({ type: 'text' })
  agent_response: string;

  @Column({ type: 'json', nullable: true })
  attachments: object[];

  @Column('decimal', { precision: 10, scale: 2 })
  tokens_used: number;

  @CreateDateColumn()
  created_at: Date;
}
```

**billing_log.entity.ts**:  
```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Conversation } from './conversation.entity';
import { Agent } from './agent.entity';

@Entity('billing_log')
export class BillingLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.billingLogs)
  user: User;

  @ManyToOne(() => Project, project => project.billingLogs)
  project: Project;

  @ManyToOne(() => Conversation, conversation => conversation.billingLogs)
  conversation: Conversation;

  @ManyToOne(() => Agent, agent => agent.billingLogs)
  agent: Agent;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tokens: number;

  @CreateDateColumn()
  timestamp: Date;
}
```

4. Generate migration: `npm run migration:generate InitSchema`. Edit generated file src/migrations/xxxx-InitSchema.ts (add up/down cho all tables, e.g., up: await queryRunner.query(`CREATE TABLE users (...)`); down: drop table).  
5. Run: `npm run migration:run`. Expected: Tables created.  

**Script Test (Jest Full)**:  
Tạo src/entities/user.entity.spec.ts (tương tự cho other entities):  
```typescript
import { getConnection } from 'typeorm';

describe('DB Schema', () => {
  it('should create all tables', async () => {
    const connection = getConnection();
    const tables = await connection.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('users', 'projects', 'project_members', 'conversations', 'agents', 'messages', 'billing_log')
    `);
    expect(tables.length).toBe(7);
  });

  it('should insert and query sample user', async () => {
    const connection = getConnection();
    await connection.query("INSERT INTO users (name, email, role) VALUES ('Test User', 'test@example.com', 'member')");
    const user = await connection.query("SELECT * FROM users WHERE email = 'test@example.com'");
    expect(user[0].name).toBe('Test User');
    expect(user[0].role).toBe('member');
  });
});
```  
Run: `npm test`. Expected: 2 tests pass.  

**Commit**: `git add . && git commit -m "Story 1-2: Full entities and migration"`.  

#### 5. Story 1-3: Config DB Connection Cho Services (2 hours)
1. In src/app.module.ts, add:  
   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { ConfigModule } from '@nestjs/config';
   import { User } from './entities/user.entity';  // Import all entities
   import { Project } from './entities/project.entity';
   // ... import all

   @Module({
     imports: [
       ConfigModule.forRoot({ isGlobal: true }),
       TypeOrmModule.forRootAsync({
         useFactory: () => ({
           type: 'postgres',
           host: process.env.DB_HOST || 'localhost',
           port: parseInt(process.env.DB_PORT || '5432'),
           username: process.env.DB_USER || 'admin',
           password: process.env.DB_PASS || 'secret',
           database: process.env.DB_NAME || 'chatai',
           entities: [User, Project /* all entities */],
           synchronize: false,
           logging: true,  // For dev
         }),
       }),
     ],
   })
   export class AppModule {}
   ```  
2. Run: `npm run start:dev`. Expected log: "QueryRunner connected" or "DB connected".  

**Script Test (Jest Connection)**:  
Tạo src/app.e2e-spec.ts:  
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('DB Connection', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should connect to DB', async () => {
    const dataSource = app.get('DataSource');
    expect(dataSource.isConnected).toBe(true);
    // Test query
    const users = await dataSource.getRepository('User').find();
    expect(Array.isArray(users)).toBe(true);
  });
});
```  
Run: `npm test`. Expected: Tests pass.  

**Commit**: `git add . && git commit -m "Story 1-3: DB connection config"`.  

#### 6. Story 1-4: CI/CD Basic Cho Milestone (2 hours)
1. Tạo /.github/workflows/test-db.yaml: Copy code.  
   ```yaml
   name: Test DB
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       services:
         postgres:
           image: postgres:15
           env:
             POSTGRES_USER: admin
             POSTGRES_PASSWORD: secret
             POSTGRES_DB: chatai
           ports:
             - 5432:5432
           options: >-
             --health-cmd pg_isready
             --health-interval 10s
             --health-timeout 5s
             --health-retries 5
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
           working-directory: ./services/user-service
         - run: npm run typeorm migration:run
           working-directory: ./services/user-service
         - run: npm test
           working-directory: ./services/user-service
   ```  
2. Push: `git push origin feature/milestone-1-db`. Check GitHub Actions – expected green.  

**Script Test (CI Verification)**:  
- Add fail test in spec (e.g., expect(1).toBe(2)), push – expected red. Fix, push – green.  
- Run: No command, just push. Expected: Log shows migration run, tests pass.  

**Commit**: `git add . && git commit -m "Story 1-4: CI/CD setup"`.  

#### 7. Verification Tổng Thể Và Demo (30 mins)
- Full Run: `docker-compose up -d`, migration, start:dev, npm test, push.  
- Demo Script: Share screen: pgAdmin (tables), service log (connected), Actions (green), insert user via psql/query.  

#### 8. Bash Script Automate Setup (Optional, 5 mins to run)
Tạo setup-milestone1.sh ở root:  
```bash
#!/bin/bash
echo "Setting up Milestone 1..."

# Step 1: Docker
docker-compose up -d
sleep 10  # Wait for DB
echo "DB started. Check docker ps"

# Step 2: Install deps
cd services/user-service
npm i @nestjs/typeorm typeorm pg reflect-metadata

# Step 3: Migration
npm run migration:run

# Step 4: Test
npm test

# Step 5: Start service
npm run start:dev &

echo "Setup complete! Service running on port 3000. Run 'docker-compose down' to stop."
```  
Run: `chmod +x setup-milestone1.sh && ./setup-milestone1.sh`. Expected: All steps log success.  

#### 9. Troubleshooting Tổng Hợp
| Issue | Cause | Fix |  
|-------|-------|-----|  
| Docker not start | RAM low | Close apps, add swap. |  
| Migration FK error | Relation missing | Add @JoinColumn in entity, regenerate. |  
| Connection refused | Env wrong | Check .env, docker logs db. |  
| CI fail | No secrets | Add in GitHub Settings > Secrets. |  
| Test fail | DB not ready | Add sleep 5 in CI yaml. |  

#### 10. Next Steps  
- PR to main: `git push`, create PR on GitHub, review/merge.  
- Update Jira: Mark Stories Done, attach logs/screenshots.  
- Demo team: 10 mins screen share full flow.  

Hướng dẫn này giờ đã "full code + script" – team chạy ngay được. Nếu cần cho Milestone 2, bảo tôi!

## MIGRATE
### Giải Thích Và Hướng Dẫn Chạy Lệnh Generate Migration Trong Story 1-2

Tôi sẽ giải thích rõ ràng, chi tiết phần bạn hỏi (từ hướng dẫn Milestone 1, Story 1-2). Phần này là để tạo và edit file migration trong TypeORM – công cụ dùng để quản lý thay đổi schema DB (từ entities bạn đã tạo dựa trên ERD). Tôi sẽ phân tích "để làm gì", "làm thế nào chạy", và cung cấp code full để bạn copy-paste (bao gồm SQL create/drop for all tables, vì "xxxx" là timestamp auto-generated).

#### 1. **Để Làm Gì?**
- **Mục Đích Của Lệnh `npm run migration:generate InitSchema`**:
  - TypeORM tự động scan entities (các class như User, Project từ src/entities/) và generate file migration – một script SQL để "apply" schema vào DB (create tables, columns, relations).  
  - "InitSchema" là tên migration bạn đặt (có thể đổi, nhưng nên descriptive như "InitSchema" cho migration đầu tiên).  
  - Lệnh này tạo file src/migrations/xxxx-InitSchema.ts (xxxx là timestamp, e.g., 1727234567890-InitSchema.ts), với methods `up` (apply changes, e.g., create tables) và `down` (revert, e.g., drop tables).  
  - **Lý Do Edit File**: TypeORM generate tự động, nhưng đôi khi missing relations/FK/constraints (e.g., unique, nullable). Bạn edit để add SQL query thủ công, ensure schema đúng ERD (phần 7 tài liệu), tránh lỗi khi run migration. Không edit có thể dẫn đến DB không nhất quán (e.g., no FK, data integrity mất).  

- **Lợi Ích**:  
  - An toàn: Không dùng `synchronize: true` (auto create schema, nhưng rủi ro mất data ở production).  
  - Version Control: Migration files git tracked, dễ revert nếu lỗi.  
  - Team Friendly: Dev khác run `npm run migration:run` để update DB local/staging.  

Nếu không generate/edit, DB không có tables, và services sau (e.g., auth in Milestone 2) sẽ error khi save/query.

#### 2. **Làm Thế Nào Để Chạy Lệnh Và Edit?** (Bước Này Chi Tiết Để Copy-Run Ngay)
Giả sử bạn ở /services/user-service (cd vào nếu chưa). Đảm bảo:  
- .env có DB credentials (từ Milestone 1).  
- package.json có scripts (thêm nếu chưa):  
  ```json
  "scripts": {
    "start:dev": "nest start --watch",
    "test": "jest",
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/data-source.ts",
    "migration:generate": "npm run typeorm migration:generate",
    "migration:run": "npm run typeorm migration:run"
  }
  ```  
  (Thêm tsconfig-paths/register nếu tsconfig.json có paths alias).  

**Bước 1: Generate Migration**  
- Run: `npm run migration:generate InitSchema`.  
- Expected Output: Log "migration generated successfully" và file mới src/migrations/1727xxxx-InitSchema.ts (xxxx = timestamp, e.g., 1727234567890-InitSchema.ts). Nếu error (e.g., "No changes in database schema were found"), check entities exist and data-source.ts correct.  

**Bước 2: Edit File Generated**  
- Mở file src/migrations/xxxx-InitSchema.ts. TypeORM generate basic (e.g., createTable for each entity), nhưng bạn add/edit up/down methods với SQL query full để ensure all fields/relations (based on ERD).  
- Copy code full dưới vào file (thay xxxx bằng timestamp của bạn):  
  ```typescript
  import { MigrationInterface, QueryRunner } from "typeorm";

  export class InitSchema1727234567890 implements MigrationInterface {
    name = 'InitSchema1727234567890';  // Name with timestamp

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Create users table
      await queryRunner.query(`
        CREATE TABLE "users" (
          "id" SERIAL NOT NULL,
          "name" character varying(100) NOT NULL,
          "email" character varying(100) NOT NULL UNIQUE,
          "phone" character varying(20) UNIQUE,
          "auth_provider" character varying(50),
          "role" character varying(50) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )
      `);

      // Create projects table
      await queryRunner.query(`
        CREATE TABLE "projects" (
          "id" SERIAL NOT NULL,
          "name" character varying(100) NOT NULL,
          "owner_id" integer NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_132d6834f3f0d47b4d8e6b3f5e8" PRIMARY KEY ("id")
        )
      `);

      // Create project_members table
      await queryRunner.query(`
        CREATE TABLE "project_members" (
          "id" SERIAL NOT NULL,
          "project_id" integer NOT NULL,
          "user_id" integer NOT NULL,
          "role" character varying(50) NOT NULL,
          CONSTRAINT "PK_project_members_id" PRIMARY KEY ("id")
        )
      `);

      // Create conversations table
      await queryRunner.query(`
        CREATE TABLE "conversations" (
          "id" SERIAL NOT NULL,
          "project_id" integer NOT NULL,
          "title" character varying(100) NOT NULL,
          "metadata" json,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_conversations_id" PRIMARY KEY ("id")
        )
      `);

      // Create agents table
      await queryRunner.query(`
        CREATE TABLE "agents" (
          "id" SERIAL NOT NULL,
          "name" character varying(100) NOT NULL,
          "type" character varying(20) NOT NULL,
          "api_endpoint" character varying(200) NOT NULL,
          "config_json" json NOT NULL,
          "model_source" character varying(50) NOT NULL,
          "training_config" json,
          "version" character varying(20) NOT NULL,
          "active" boolean NOT NULL DEFAULT true,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_agents_id" PRIMARY KEY ("id")
        )
      `);

      // Create messages table
      await queryRunner.query(`
        CREATE TABLE "messages" (
          "id" SERIAL NOT NULL,
          "conversation_id" integer NOT NULL,
          "user_id" integer NOT NULL,
          "agent_id" integer NOT NULL,
          "user_message" text NOT NULL,
          "agent_response" text NOT NULL,
          "attachments" json,
          "tokens_used" real NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_messages_id" PRIMARY KEY ("id")
        )
      `);

      // Create billing_log table
      await queryRunner.query(`
        CREATE TABLE "billing_log" (
          "id" SERIAL NOT NULL,
          "user_id" integer NOT NULL,
          "project_id" integer NOT NULL,
          "conversation_id" integer NOT NULL,
          "agent_id" integer NOT NULL,
          "cost" real NOT NULL,
          "tokens" real NOT NULL,
          "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_billing_log_id" PRIMARY KEY ("id")
        )
      `);

      // Add foreign keys (relations from ERD)
      await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_projects_owner_id" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_project_members_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_project_members_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "conversations" ADD CONSTRAINT "FK_conversations_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messages_agent_id" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_billing_log_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_billing_log_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_billing_log_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "billing_log" ADD CONSTRAINT "FK_billing_log_agent_id" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Drop foreign keys first
      await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_billing_log_agent_id"`);
      await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_billing_log_conversation_id"`);
      await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_billing_log_project_id"`);
      await queryRunner.query(`ALTER TABLE "billing_log" DROP CONSTRAINT "FK_billing_log_user_id"`);
      await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_agent_id"`);
      await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_user_id"`);
      await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messages_conversation_id"`);
      await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_conversations_project_id"`);
      await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_project_members_user_id"`);
      await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_project_members_project_id"`);
      await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_projects_owner_id"`);

      // Drop tables in reverse order
      await queryRunner.query(`DROP TABLE "billing_log"`);
      await queryRunner.query(`DROP TABLE "messages"`);
      await queryRunner.query(`DROP TABLE "agents"`);
      await queryRunner.query(`DROP TABLE "conversations"`);
      await queryRunner.query(`DROP TABLE "project_members"`);
      await queryRunner.query(`DROP TABLE "projects"`);
      await queryRunner.query(`DROP TABLE "users"`);
    }

  }
  ```  
  Lưu ý: File name có timestamp (xxxx = auto, e.g., 1727234567890). Edit if generated empty (TypeORM sometimes miss relations, so add manual SQL in up/down as above).  

**Bước 3: Run Migration**  
- Run: `npm run migration:run`.  
- Expected Output: Log "migration run successfully", "query: CREATE TABLE users..." for each table. Check in pgAdmin: Tables exist, columns/FK correct per ERD.  

**Bước 4: Test**  
- Run psql: `psql -h localhost -U admin -d chatai`. Run `\dt` – expected 7 tables listed.  

Nếu error:  
- No changes found: Check entities imported in data-source.ts, run again.  
- FK error: Edit migration down/up order (drop FK before tables).  

#### 3. Story 1-3: Config DB Connection Cho Services (2 hours)
1. Update src/app.module.ts: Copy code full.  

2. Run: `npm run start:dev`. Expected: "Nest application successfully started", "DB connected" log if logging: true.  

#### 4. Story 1-4: CI/CD Basic Cho Milestone (2 hours)
1. Tạo /.github/workflows/test-db.yaml: Copy code.  

2. Run local test: `npm test`. Push: Actions pass.  

## Để chạy được migrate thì phải file package.json phải ntn:
```
{
  "name": "user-service",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
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
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/data-source.ts",
    "migration:generate": "npm run typeorm migration:generate",
    "migration:run": "npm run typeorm migration:run"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.3",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "pg": "^8.12.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```
## File tsconfig phải như thế này: /services/user-service/tsconfig.json
```
{
  "compilerOptions": {
    "module": "commonjs",  // Module system for Node.js
    "declaration": true,  // Generate .d.ts files
    "removeComments": true,  // Remove comments in compiled JS
    "emitDecoratorMetadata": true,  // Required for TypeORM decorators
    "experimentalDecorators": true,  // Enable decorators (e.g., @Entity)
    "allowSyntheticDefaultImports": true,  // Allow default imports
    "target": "es2017",  // Target ES version for compatibility
    "sourceMap": true,  // Generate source maps for debug
    "outDir": "./dist",  // Output compiled JS folder
    "baseUrl": "./",  // Base directory for paths
    "incremental": true,  // Incremental compile for speed
    "skipLibCheck": true,  // Skip type checking of libs for faster build
    "strictNullChecks": false,  // Loose null checks for dev
    "noImplicitAny": false,  // Loose any type for dev
    "strictBindCallApply": false,  // Loose bind/call/apply
    "forceConsistentCasingInFileNames": false,  // Case insensitive filenames
    "noFallthroughCasesInSwitch": false,  // Loose switch cases
    "paths": {  // Alias for easy import (e.g., import { User } from 'entities/user.entity')
      "@entities/*": ["src/entities/*"],
      "@migrations/*": ["src/migrations/*"]
    }
  },
  "include": ["src/**/*"],  // Include all src files
  "exclude": ["node_modules", "dist"]  // Exclude build folders
}
```
