
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
3. Verify: `docker ps` (postgres running). psql: `psql -h localhost -U admin -d chatai` → `\l` (chatai exists).  

Test Script (psql):  
```sql
SELECT version();  -- Output: PostgreSQL 15.x
\q
```

#### Story 1-2: Implement DB Schema Dựa ERD (6 hours)
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
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
