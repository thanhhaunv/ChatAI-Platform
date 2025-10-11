# PART 3 - DAY 2: COMMUNICATION & ENVIRONMENT

**Phase:** Phase 0 - Pre-Start  
**Duration:** 4 hours (Morning + Afternoon)  
**Goal:** Setup Slack workspace + Docker local environment  
**Prerequisites:** 
- ✅ Day 1 completed (GitHub repo + Husky)
- ✅ Docker Desktop installed
- ✅ Node.js 18+, pnpm installed

---

## 📋 MORNING SESSION (2 hours)

### ✅ Task 2.1: Create Slack Workspace (30 min)

**Step 1: Create Workspace**
1. Go to https://slack.com/create
2. Enter email: `thanhhaunv@gmail.com`
3. Verify email (check inbox for code)
4. Workspace name: `ChatAI Platform`
5. Workspace URL: `chatai-platform` → `chatai-platform.slack.com`
6. Skip team invite (add later)

**Step 2: Customize Workspace**
1. **Workspace Settings** (click workspace name → Settings & administration)
2. Upload logo (optional)
3. Set workspace description: `Internal communication for ChatAI Platform development`

---

### ✅ Task 2.2: Create Slack Channels (30 min)

**Create 11 channels:**

1. **#general** (default) - General team discussion
2. **#dev-backend** - Backend development discussion
3. **#dev-frontend** - Frontend development discussion  
4. **#dev-devops** - DevOps & infrastructure
5. **#testing** - QA and testing discussion
6. **#deploy** - Deployment notifications
7. **#pm** - Project management & planning
8. **#standup** - Daily standup reports
9. **#incidents** - Production incidents & alerts
10. **#deployments** - Deployment logs (automated)
11. **#random** - Off-topic, fun stuff

**For each channel:**
- Click **+** next to Channels
- Name: `dev-backend`
- Description: `Backend development: NestJS, TypeORM, APIs`
- Make public (so all members can join)
- Click **Create**

**Channel Descriptions:**
```
#dev-backend: Backend development discussion (NestJS, APIs, DB)
#dev-frontend: Frontend development (Next.js, React Native, UI/UX)
#dev-devops: Infrastructure, Docker, K8s, CI/CD
#testing: QA, testing, bug reports
#deploy: Deployment notifications and status
#pm: Sprint planning, roadmap, decisions
#standup: Daily standup updates (async)
#incidents: Production issues, urgent bugs
#deployments: Automated deployment logs
#random: Coffee breaks, memes, non-work chat
```

---

### ✅ Task 2.3: Invite Team Members (15 min)

**Step 1: Invite via Email**
1. Click workspace name → **Invite people to [workspace]**
2. Add 5 emails:
   - `backend1@example.com` (Backend Dev 1)
   - `backend2@example.com` (Backend Dev 2)
   - `frontend@example.com` (Frontend Dev)
   - `devops@example.com` (DevOps)
   - `qa@example.com` (QA/Tester)
3. Click **Send Invitations**

**Step 2: Assign Default Channels**
- When members join, auto-add to: `#general`, `#standup`, `#random`
- Manually add to role-specific channels:
  - Backend devs → `#dev-backend`
  - Frontend dev → `#dev-frontend`
  - DevOps → `#dev-devops`
  - QA → `#testing`

---

### ✅ Task 2.4: Install Slack Apps (45 min)

**App 1: GitHub Integration**
1. In Slack: Click **Apps** (sidebar)
2. Search: `GitHub`
3. Click **Add to Slack**
4. Authorize: Connect to `thanhhaunv/ChatAI-Platform`
5. Configure notifications:
   - **#dev-backend**: Subscribe to `thanhhaunv/ChatAI-Platform` (issues, PRs)
   - **#deployments**: Subscribe to releases

**Commands:**
```
/github subscribe thanhhaunv/ChatAI-Platform issues,pulls,commits,releases
/github subscribe thanhhaunv/ChatAI-Platform deployments
```

---

**App 2: Jira Cloud Integration**
1. In Slack: Search `Jira Cloud`
2. Click **Add to Slack**
3. Authorize: Connect to `thanhhaunv.atlassian.net`
4. Configure notifications:
   - **#pm**: All story transitions
   - **#dev-backend**: Stories tagged `backend`
   - **#dev-frontend**: Stories tagged `frontend`

**Commands:**
```
/jira connect
/jira create
/jira subscribe filter "project = CAP AND status = 'In Progress'"
```

---

**App 3: Google Calendar (Optional)**
1. Search `Google Calendar`
2. Connect team calendar
3. Post sprint planning/review meetings to `#pm`

---

**App 4: Polly (for retrospectives - Optional)**
1. Search `Polly`
2. Add to workspace
3. Use for sprint retrospectives: `/polly "What went well this sprint?"`

---

## 📋 AFTERNOON SESSION (2 hours)

### ✅ Task 2.5: Create `.env.example` Template (15 min)

**Create file:** `.env.example` in repo root

```bash
# ==============================================
# CHATAI PLATFORM - ENVIRONMENT VARIABLES
# ==============================================
# Copy this file to .env and fill in your values

# -----------------
# DATABASE
# -----------------
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=secret
DB_NAME=chatai

# -----------------
# REDIS
# -----------------
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# -----------------
# MINIO (S3-compatible storage)
# -----------------
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=chatai-files

# -----------------
# JWT
# -----------------
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this
JWT_REFRESH_EXPIRES_IN=7d

# -----------------
# OAUTH (to be filled in Day 3)
# -----------------
# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# TikTok OAuth
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_CALLBACK_URL=http://localhost:3000/auth/tiktok/callback

# -----------------
# AI APIs (to be filled in Day 3)
# -----------------
OPENAI_API_KEY=
GEMINI_API_KEY=
# ANTHROPIC_API_KEY=
# GROK_API_KEY=

# -----------------
# EMAIL (for notifications)
# -----------------
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=noreply@chatai.com

# -----------------
# FRONTEND
# -----------------
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# -----------------
# PORTS
# -----------------
API_GATEWAY_PORT=3000
AUTH_SERVICE_PORT=3001
USER_SERVICE_PORT=3002
CHAT_ORCH_PORT=3003
AGENT_MGR_PORT=3004
BILLING_PORT=3005
NOTIFICATION_PORT=3006
ML_TRAINING_PORT=8000

# -----------------
# NODE ENV
# -----------------
NODE_ENV=development
```

**Commit:**
```bash
git add .env.example
git commit -m "chore: add environment variables template"
git push origin develop
```

---

### ✅ Task 2.6: Create Docker Compose (45 min)

**Create file:** `docker-compose.yml` in repo root

```yaml
version: '3.8'

services:
  # ==============================================
  # DATABASE - PostgreSQL
  # ==============================================
  postgres:
    image: postgres:15-alpine
    container_name: chatai-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-admin}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secret}
      POSTGRES_DB: ${DB_NAME:-chatai}
    ports:
      - "${DB_PORT:-5432}:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - chatai-network

  # ==============================================
  # CACHE - Redis
  # ==============================================
  redis:
    image: redis:7-alpine
    container_name: chatai-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - chatai-network

  # ==============================================
  # FILE STORAGE - MinIO (S3-compatible)
  # ==============================================
  minio:
    image: minio/minio:latest
    container_name: chatai-minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ACCESS_KEY:-minioadmin}
      MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY:-minioadmin}
    ports:
      - "${MINIO_PORT:-9000}:9000"  # API
      - "9001:9001"                 # Console
    volumes:
      - minio-data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    networks:
      - chatai-network

  # ==============================================
  # MESSAGE QUEUE - RabbitMQ (for notifications)
  # ==============================================
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: chatai-rabbitmq
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secret
    ports:
      - "5672:5672"   # AMQP
      - "15672:15672" # Management UI
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - chatai-network

  # ==============================================
  # DATABASE ADMIN - pgAdmin (optional, for dev)
  # ==============================================
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: chatai-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@chatai.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    depends_on:
      - postgres
    networks:
      - chatai-network

volumes:
  postgres-data:
  redis-data:
  minio-data:
  rabbitmq-data:
  pgadmin-data:

networks:
  chatai-network:
    driver: bridge
```

**Commit:**
```bash
git add docker-compose.yml
git commit -m "chore: add docker compose for local development"
git push origin develop
```

---

### ✅ Task 2.7: Setup Local Environment (45 min)

**Step 1: Create `.env` from template**
```bash
cp .env.example .env
```

**Step 2: Start Docker services**
```bash
docker-compose up -d
```

**Verify services are running:**
```bash
docker-compose ps
```

**Expected output:**
```
NAME                 STATUS              PORTS
chatai-postgres      Up (healthy)        0.0.0.0:5432->5432/tcp
chatai-redis         Up (healthy)        0.0.0.0:6379->6379/tcp
chatai-minio         Up (healthy)        0.0.0.0:9000-9001->9000-9001/tcp
chatai-rabbitmq      Up (healthy)        0.0.0.0:5672->5672/tcp, 0.0.0.0:15672->15672/tcp
chatai-pgadmin       Up                  0.0.0.0:5050->80/tcp
```

---

**Step 3: Verify PostgreSQL**
```bash
# Option 1: Using psql
docker exec -it chatai-postgres psql -U admin -d chatai

# Should see:
# chatai=#

# Test query:
SELECT version();

# Exit:
\q
```

**Option 2: Using pgAdmin**
1. Open browser: http://localhost:5050
2. Login: `admin@chatai.com` / `admin`
3. Add Server:
   - Name: `ChatAI Local`
   - Host: `postgres` (Docker network name)
   - Port: `5432`
   - Username: `admin`
   - Password: `secret`
4. Connect → Should see `chatai` database

---

**Step 4: Verify Redis**
```bash
docker exec -it chatai-redis redis-cli

# Test:
PING
# Should return: PONG

SET test "hello"
GET test
# Should return: "hello"

exit
```

---

**Step 5: Verify MinIO**
1. Open browser: http://localhost:9001
2. Login: `minioadmin` / `minioadmin`
3. Create bucket:
   - Click **Buckets** → **Create Bucket**
   - Name: `chatai-files`
   - Access: Private
   - Click **Create**

---

**Step 6: Verify RabbitMQ**
1. Open browser: http://localhost:15672
2. Login: `admin` / `secret`
3. Should see Management UI with:
   - Connections: 0
   - Channels: 0
   - Queues: 0 (will create later)

---

### ✅ Task 2.8: Create Dev Scripts (15 min)

**Create file:** `scripts/dev-setup.sh`

```bash
#!/bin/bash

echo "🚀 ChatAI Platform - Development Setup"
echo "========================================"

# Check Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop."
  exit 1
fi

echo "✅ Docker is running"

# Check .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
  echo "⚠️  Please update .env with your API keys!"
fi

echo "✅ .env file exists"

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check health
docker-compose ps

echo ""
echo "✅ Development environment ready!"
echo ""
echo "📊 Access services:"
echo "  - PostgreSQL: localhost:5432 (admin/secret)"
echo "  - pgAdmin: http://localhost:5050 (admin@chatai.com/admin)"
echo "  - Redis: localhost:6379"
echo "  - MinIO: http://localhost:9001 (minioadmin/minioadmin)"
echo "  - RabbitMQ: http://localhost:15672 (admin/secret)"
echo ""
echo "🛑 To stop: docker-compose down"
echo "🔄 To restart: docker-compose restart"
echo "📝 Logs: docker-compose logs -f [service-name]"
```

**Make executable:**
```bash
chmod +x scripts/dev-setup.sh
```

---

**Create file:** `scripts/dev-stop.sh`

```bash
#!/bin/bash

echo "🛑 Stopping ChatAI Platform services..."
docker-compose down

echo "✅ All services stopped"
echo ""
echo "💡 To remove volumes: docker-compose down -v"
echo "💡 To start again: ./scripts/dev-setup.sh"
```

**Make executable:**
```bash
chmod +x scripts/dev-stop.sh
```

---

**Commit:**
```bash
git add scripts/
git commit -m "chore: add dev setup scripts"
git push origin develop
```

---

## ✅ END OF DAY 2 CHECKLIST

**Verify everything is complete:**

- [ ] Slack workspace created: `chatai-platform.slack.com`
- [ ] 11 channels created with descriptions
- [ ] 5 team members invited
- [ ] GitHub app installed in Slack
- [ ] Jira app installed in Slack
- [ ] `.env.example` created
- [ ] `docker-compose.yml` created
- [ ] Docker services running:
  - [ ] PostgreSQL (port 5432) - healthy
  - [ ] Redis (port 6379) - healthy
  - [ ] MinIO (port 9000/9001) - healthy
  - [ ] RabbitMQ (port 5672/15672) - healthy
  - [ ] pgAdmin (port 5050) - running
- [ ] Verified PostgreSQL connection
- [ ] Verified Redis connection
- [ ] Created MinIO bucket: `chatai-files`
- [ ] Verified RabbitMQ Management UI
- [ ] Dev scripts created and executable

---

## 📸 SCREENSHOTS TO SAVE

Take screenshots for documentation:
1. Slack workspace with all channels
2. Docker containers running (`docker ps`)
3. pgAdmin connected to database
4. MinIO console with bucket created
5. RabbitMQ Management UI

---

## 🎯 DELIVERABLES

**By end of Day 2, you should have:**
- ✅ Slack workspace configured with integrations
- ✅ Local dev environment running (Docker)
- ✅ All infrastructure services healthy
- ✅ Environment variables template
- ✅ Dev scripts for easy setup/teardown

---

## 🚀 NEXT STEP

**Tomorrow:** Day 3 - API Keys & Accounts
- Google OAuth setup
- Facebook OAuth setup
- TikTok OAuth setup
- OpenAI API key
- Gemini API key

**File:** `PART3-DAY3-API-Keys-Accounts.md`

---

**Estimated Time:** 4 hours  
**Status:** ✅ Ready to execute  
**Dependencies:** Day 1 completed
