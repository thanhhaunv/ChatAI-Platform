# PART 3: PHASE 0 - PRE-START IMPLEMENTATION

**Duration:** 3-4 days  
**Goal:** Setup all tools, accounts, and environment before coding  
**Team:** All members  

---

## 📋 TABLE OF CONTENTS

1. [Day 1: GitHub Setup & Husky Configuration](#day-1-github-setup--husky-configuration)
2. [Day 2: Docker Compose & Local Environment](#day-2-docker-compose--local-environment)
3. [Day 3: OAuth & API Keys Setup](#day-3-oauth--api-keys-setup)
4. [Day 4: Git Workflow & Team Kickoff](#day-4-git-workflow--team-kickoff)

---

## DAY 1: GITHUB SETUP & HUSKY CONFIGURATION

**Duration:** 4 hours  
**Goal:** Setup GitHub repository and Git hooks  

---

### **STEP 1.1: Create GitHub Repository (10 min)**

#### **1. Create Repository**

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `ChatAI-Platform`
   - **Description:** `Multi-provider AI chat platform with ML training capabilities`
   - **Visibility:** Private (or Public if open source)
   - **Initialize:** ✅ Add README, ✅ Add .gitignore (Node), ❌ License (add later)
3. Click **"Create repository"**

**Result:** Repository created at `https://github.com/thanhhaunv/ChatAI-Platform`

---

#### **2. Clone Repository**

```bash
# Clone the repository
git clone https://github.com/thanhhaunv/ChatAI-Platform.git
cd ChatAI-Platform

# Verify
git remote -v
# Output: origin  https://github.com/thanhhaunv/ChatAI-Platform.git (fetch)
#         origin  https://github.com/thanhhaunv/ChatAI-Platform.git (push)
```

---

### **STEP 1.2: Create Project Structure (15 min)**

#### **1. Create Directory Structure**

```bash
# Create main directories
mkdir -p .github/workflows
mkdir -p .husky
mkdir -p frontend/web
mkdir -p frontend/mobile
mkdir -p services/api-gateway
mkdir -p services/auth-service
mkdir -p services/user-service
mkdir -p services/chat-orch
mkdir -p services/notification-service
mkdir -p services/agent-mgr
mkdir -p services/billing
mkdir -p services/ml-training
mkdir -p packages/shared
mkdir -p infrastructure/k8s
mkdir -p infrastructure/terraform
mkdir -p infrastructure/docker
mkdir -p docs
mkdir -p tests/e2e
mkdir -p tests/integration
mkdir -p tests/load
mkdir -p scripts

# Verify structure
tree -L 2 -d
```

---

#### **2. Create Root Package.json**

Create `package.json`:

```json
{
  "name": "chatai-platform",
  "version": "1.0.0",
  "description": "Multi-provider AI chat platform with ML training capabilities",
  "private": true,
  "workspaces": [
    "frontend/*",
    "services/*",
    "packages/*"
  ],
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "test": "echo 'Run tests in services'",
    "build": "echo 'Build all services'",
    "clean": "rm -rf node_modules **/node_modules **/dist"
  },
  "devDependencies": {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "prettier": "^3.1.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

---

#### **3. Install Dependencies**

```bash
# Install pnpm if not installed
npm install -g pnpm

# Install root dependencies
pnpm install
```

---

### **STEP 1.3: Configure Husky Git Hooks (20 min)**

#### **1. Initialize Husky**

```bash
# Initialize Husky
npx husky-init && pnpm install

# Verify .husky directory created
ls -la .husky
```

---

#### **2. Create Pre-Commit Hook**

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run lint-staged
pnpm lint-staged

# Check if there are any errors
if [ $? -ne 0 ]; then
  echo "❌ Pre-commit checks failed. Please fix the errors above."
  exit 1
fi

echo "✅ Pre-commit checks passed!"
```

Make executable:

```bash
chmod +x .husky/pre-commit
```

---

#### **3. Create Commit-Msg Hook**

Create `.husky/commit-msg`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Checking commit message format..."

# Run commitlint
npx --no -- commitlint --edit "$1"

# Check if there are any errors
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Commit message does not follow conventional commits format."
  echo ""
  echo "Examples of valid commit messages:"
  echo "  feat(auth): add Google OAuth support"
  echo "  fix(chat): resolve WebSocket connection issue"
  echo "  docs(readme): update installation instructions"
  echo "  chore(deps): update dependencies"
  echo ""
  echo "Format: <type>(<scope>): <subject>"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi

echo "✅ Commit message format is valid!"
```

Make executable:

```bash
chmod +x .husky/commit-msg
```

---

#### **4. Create Pre-Push Hook**

Create `.husky/pre-push`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-push checks..."

# Run tests
echo "Running tests..."
pnpm test

# Check if tests passed
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please fix the failing tests before pushing."
  exit 1
fi

echo "✅ Pre-push checks passed!"
```

Make executable:

```bash
chmod +x .husky/pre-push
```

---

#### **5. Configure Lint-Staged**

Create `.lintstagedrc.json`:

```json
{
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

---

#### **6. Configure Commitlint**

Create `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting, missing semi colons, etc
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding tests
        'chore',    // Maintain
        'revert',   // Revert to a commit
        'build',    // Build system changes
        'ci'        // CI/CD changes
      ]
    ],
    'subject-case': [0], // Allow any case for subject
    'scope-empty': [0],  // Allow empty scope
    'subject-full-stop': [0] // Allow full stop at end
  }
};
```

---

#### **7. Configure ESLint**

Create `.eslintrc.json`:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  "env": {
    "node": true,
    "es2022": true
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    "coverage/"
  ]
}
```

---

#### **8. Configure Prettier**

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Create `.prettierignore`:

```
node_modules
dist
build
.next
coverage
*.md
pnpm-lock.yaml
package-lock.json
```

---

### **STEP 1.4: Create GitHub Templates (15 min)**

#### **1. Pull Request Template**

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## 📝 Description
<!-- Describe your changes in detail -->

## 🎯 Related Issues
<!-- Link related Jira issues -->
- Closes CAP-#

## 🔄 Type of Change
<!-- Mark the relevant option -->
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Style update (formatting, renaming)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change

## 🧪 Testing
<!-- Describe the tests you ran -->
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📸 Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

## ✅ Checklist
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## 👥 Reviewers
<!-- Tag team members for review -->
@thanhhaunv
```

---

#### **2. Issue Templates**

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

## 🐛 Bug Description
<!-- A clear and concise description of what the bug is -->

## 📋 Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## ✅ Expected Behavior
<!-- What you expected to happen -->

## ❌ Actual Behavior
<!-- What actually happened -->

## 📸 Screenshots
<!-- If applicable, add screenshots -->

## 🌍 Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 1.0.0]

## 📝 Additional Context
<!-- Add any other context about the problem -->
```

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## 🚀 Feature Description
<!-- A clear and concise description of what you want to happen -->

## 🎯 Problem Statement
<!-- What problem does this feature solve? -->

## 💡 Proposed Solution
<!-- Describe how you'd like to solve the problem -->

## 🔄 Alternatives Considered
<!-- Describe alternative solutions you've considered -->

## 📝 Additional Context
<!-- Add any other context or screenshots about the feature request -->
```

---

#### **3. GitHub Actions Workflow (Basic)**

Create `.github/workflows/lint.yaml`:

```yaml
name: Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Run Linters
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Run Prettier
        run: pnpm format:check
```

---

### **STEP 1.5: Test Git Hooks (10 min)**

#### **1. Test Pre-Commit Hook**

```bash
# Create a test file with bad formatting
echo "const x=1" > test.js

# Try to commit (should fail)
git add test.js
git commit -m "test: add test file"

# Expected: Prettier will auto-fix and re-stage
# Commit should succeed

# Clean up
rm test.js
```

---

#### **2. Test Commit-Msg Hook**

```bash
# Try bad commit message (should fail)
git commit --allow-empty -m "bad message"
# Expected: ❌ Error - invalid format

# Try good commit message (should pass)
git commit --allow-empty -m "test: testing commit message hook"
# Expected: ✅ Success

# Remove test commit
git reset HEAD~1
```

---

#### **3. Test Pre-Push Hook**

```bash
# This will run when you push
# For now, it will pass since we have no tests yet
git push origin main
```

---

### **STEP 1.6: Create .gitignore (5 min)**

Update `.gitignore`:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Build
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.*.local
.env.production

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS
.DS_Store
Thumbs.db

# IDEs
.idea/
.vscode/
*.swp
*.swo
*~

# Misc
.cache/
.temp/
.tmp/

# Docker
.docker/

# Database
*.db
*.sqlite
*.sqlite3
```

---

### **STEP 1.7: Commit and Push (5 min)**

```bash
# Add all files
git add .

# Commit with conventional format
git commit -m "chore: initial project setup with husky git hooks"

# Push to main
git push origin main
```

**Result:** ✅ Day 1 complete - GitHub repo setup with Git hooks working!

---

## DAY 2: DOCKER COMPOSE & LOCAL ENVIRONMENT

**Duration:** 4 hours  
**Goal:** Setup local development environment with Docker  

---

### **STEP 2.1: Create Docker Compose File (30 min)**

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: chatai-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: chatai_platform
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - chatai-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: chatai-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - chatai-network

  # MinIO Object Storage (S3 compatible)
  minio:
    image: minio/minio:latest
    container_name: chatai-minio
    restart: unless-stopped
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    networks:
      - chatai-network

  # RabbitMQ Message Broker
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: chatai-rabbitmq
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: rabbitmq
      RABBITMQ_DEFAULT_PASS: rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - chatai-network

  # pgAdmin (Database Management UI)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: chatai-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@chatai.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - chatai-network

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  minio_data:
    driver: local
  rabbitmq_data:
    driver: local

networks:
  chatai-network:
    driver: bridge
```

---

### **STEP 2.2: Create Environment Template (15 min)**

Create `.env.example`:

```bash
# ==============================================
# CHATAI PLATFORM - ENVIRONMENT VARIABLES
# ==============================================

# -----------------
# DATABASE
# -----------------
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=chatai_platform
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chatai_platform

# -----------------
# REDIS
# -----------------
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_URL=redis://localhost:6379

# -----------------
# MINIO (S3)
# -----------------
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_USE_SSL=false
MINIO_BUCKET=chatai-files

# -----------------
# RABBITMQ
# -----------------
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=rabbitmq
RABBITMQ_PASSWORD=rabbitmq
RABBITMQ_URL=amqp://rabbitmq:rabbitmq@localhost:5672

# -----------------
# JWT
# -----------------
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# -----------------
# OAUTH - GOOGLE
# -----------------
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# -----------------
# OAUTH - FACEBOOK
# -----------------
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# -----------------
# OAUTH - TIKTOK
# -----------------
TIKTOK_CLIENT_KEY=your-tiktok-client-key
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
TIKTOK_CALLBACK_URL=http://localhost:3000/auth/tiktok/callback

# -----------------
# AI APIs - OPENAI
# -----------------
OPENAI_API_KEY=your-openai-api-key
OPENAI_ORG_ID=

# -----------------
# AI APIs - GOOGLE GEMINI
# -----------------
GEMINI_API_KEY=your-gemini-api-key

# -----------------
# AI APIs - ANTHROPIC CLAUDE
# -----------------
CLAUDE_API_KEY=your-claude-api-key

# -----------------
# AI APIs - GROK (X.AI)
# -----------------
GROK_API_KEY=your-grok-api-key

# -----------------
# EMAIL (NODEMAILER)
# -----------------
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=ChatAI Platform <noreply@chatai.com>

# -----------------
# APP CONFIG
# -----------------
NODE_ENV=development
PORT=3000
API_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000

# -----------------
# CORS
# -----------------
CORS_ORIGIN=http://localhost:3000

# -----------------
# RATE LIMITING
# -----------------
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# -----------------
# FILE UPLOAD
# -----------------
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=.pdf,.txt,.docx,.png,.jpg,.jpeg,.gif

# -----------------
# LOGGING
# -----------------
LOG_LEVEL=debug
```

---

### **STEP 2.3: Create Local .env File (5 min)**

```bash
# Copy template to .env
cp .env.example .env

# Edit .env and keep database/redis/minio settings as-is
# OAuth and AI API keys will be added on Day 3
```

---

### **STEP 2.4: Start Docker Services (10 min)**

```bash
# Start all services
docker-compose up -d

# Verify all services are running
docker-compose ps

# Expected output:
# NAME                  STATUS         PORTS
# chatai-postgres       Up (healthy)   5432
# chatai-redis          Up (healthy)   6379
# chatai-minio          Up (healthy)   9000, 9001
# chatai-rabbitmq       Up (healthy)   5672, 15672
# chatai-pgadmin        Up             5050

# Check logs
docker-compose logs -f

# Stop following logs: Ctrl+C
```

---

### **STEP 2.5: Verify Services (15 min)**

#### **1. Test PostgreSQL**

```bash
# Connect using psql
docker exec -it chatai-postgres psql -U postgres -d chatai_platform

# Run test query
SELECT version();

# Exit
\q
```

**Or use pgAdmin:**
- Open: http://localhost:5050
- Login: admin@chatai.com / admin
- Add server:
  - Name: ChatAI Platform
  - Host: postgres (use container name)
  - Port: 5432
  - Username: postgres
  - Password: postgres

---

#### **2. Test Redis**

```bash
# Connect using redis-cli
docker exec -it chatai-redis redis-cli

# Test commands
PING
# Expected: PONG

SET test "Hello Redis"
GET test
# Expected: "Hello Redis"

# Exit
exit
```

---

#### **3. Test MinIO**

- Open: http://localhost:9001
- Login: minioadmin / minioadmin
- Create bucket:
  - Click "Create Bucket"
  - Name: `chatai-files`
  - Click "Create"

---

#### **4. Test RabbitMQ**

- Open: http://localhost:15672
- Login: rabbitmq / rabbitmq
- Verify: Overview tab shows server running

---

### **STEP 2.6: Create Database Initialization Script (20 min)**

Create `scripts/init-db.sh`:

```bash
#!/bin/bash

echo "🚀 Initializing ChatAI Platform Database..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL..."
until docker exec chatai-postgres pg_isready -U postgres; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# Create database if not exists
docker exec chatai-postgres psql -U postgres -c "CREATE DATABASE chatai_platform;" 2>/dev/null || echo "Database already exists"

# Create extensions
docker exec chatai-postgres psql -U postgres -d chatai_platform -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

echo "✅ Database initialized successfully!"
```

Make executable:

```bash
chmod +x scripts/init-db.sh
```

Run:

```bash
./scripts/init-db.sh
```

---

### **STEP 2.7: Create Helper Scripts (15 min)**

#### **1. Start Script**

Create `scripts/dev-start.sh`:

```bash
#!/bin/bash

echo "🚀 Starting ChatAI Platform (Development)"

# Start Docker services
echo "📦 Starting Docker services..."
docker-compose up -d

# Wait for services
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check health
docker-compose ps

echo "✅ All services started!"
echo ""
echo "📊 Service URLs:"
echo "  - PostgreSQL:  localhost:5432"
echo "  - Redis:       localhost:6379"
echo "  - MinIO:       http://localhost:9001"
echo "  - RabbitMQ:    http://localhost:15672"
echo "  - pgAdmin:     http://localhost:5050"
echo ""
echo "🎯 Next: Run 'pnpm install' in service directories"
```

Make executable:

```bash
chmod +x scripts/dev-start.sh
```

---

#### **2. Stop Script**

Create `scripts/dev-stop.sh`:

```bash
#!/bin/bash

echo "🛑 Stopping ChatAI Platform (Development)"

# Stop Docker services
docker-compose down

echo "✅ All services stopped!"
```

Make executable:

```bash
chmod +x scripts/dev-stop.sh
```

---

#### **3. Reset Script**

Create `scripts/dev-reset.sh`:

```bash
#!/bin/bash

echo "🔄 Resetting ChatAI Platform (Development)"
echo "⚠️  WARNING: This will delete all data!"
read -p "Are you sure? (y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Stop services
  docker-compose down

  # Remove volumes
  docker-compose down -v

  # Start services
  docker-compose up -d

  echo "✅ Platform reset complete!"
else
  echo "❌ Reset cancelled"
fi
```

Make executable:

```bash
chmod +x scripts/dev-reset.sh
```

---

### **STEP 2.8: Test Environment (10 min)**

```bash
# Stop services
./scripts/dev-stop.sh

# Start services
./scripts/dev-start.sh

# Verify all services are running
docker-compose ps

# All should show "Up (healthy)"
```

---

### **STEP 2.9: Create Documentation (15 min)**

Create `docs/ENV-Setup-Guide.md`:

```markdown
# Environment Setup Guide

## Prerequisites

- Docker Desktop installed
- Node.js 18+ installed
- pnpm installed

## Quick Start

1. Clone repository:
   ```bash
   git clone https://github.com/thanhhaunv/ChatAI-Platform.git
   cd ChatAI-Platform
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Start services:
   ```bash
   ./scripts/dev-start.sh
   ```

## Services

| Service | URL | Credentials |
|---------|-----|-------------|
| PostgreSQL | localhost:5432 | postgres / postgres |
| Redis | localhost:6379 | - |
| MinIO | http://localhost:9001 | minioadmin / minioadmin |
| RabbitMQ | http://localhost:15672 | rabbitmq / rabbitmq |
| pgAdmin | http://localhost:5050 | admin@chatai.com / admin |

## Troubleshooting

### Port already in use

```bash
# Find process using port 5432
lsof -i :5432
# Kill the process
kill -9 <PID>
```

### Service not healthy

```bash
# Check logs
docker-compose logs <service-name>

# Restart service
docker-compose restart <service-name>
```

### Reset everything

```bash
./scripts/dev-reset.sh
```
```

---

### **STEP 2.10: Commit Changes (5 min)**

```bash
# Add all files
git add .

# Commit
git commit -m "chore: setup docker compose and local environment"

# Push
git push origin main
```

**Result:** ✅ Day 2 complete - Docker environment ready!

---

## DAY 3: OAUTH & API KEYS SETUP

**Duration:** 3-4 hours  
**Goal:** Configure OAuth providers and AI API keys  

---

### **STEP 3.1: Google OAuth Setup (30 min)**

#### **1. Create Google Cloud Project**

1. Go to: https://console.cloud.google.com/
2. Click **"Select a project"** → **"New Project"**
3. Fill in:
   - **Project name:** ChatAI Platform
   - **Organization:** (leave default)
4. Click **"Create"**

---

#### **2. Enable Google+ API**

1. Go to: https://console.cloud.google.com/apis/library
2. Search: **"Google+ API"**
3. Click on **"Google+ API"**
4. Click **"Enable"**

---

#### **3. Create OAuth 2.0 Credentials**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Configure consent screen (first time):
   - User Type: **External**
   - App name: **ChatAI Platform**
   - User support email: Your email
   - Developer contact: Your email
   - Click **"Save and Continue"**
   - Scopes: Skip for now
   - Test users: Add your email
   - Click **"Save and Continue"**
4. Create OAuth client ID:
   - Application type: **Web application**
   - Name: **ChatAI Platform Web**
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:4000`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `http://localhost:4000/auth/google/callback`
   - Click **"Create"**
5. Copy **Client ID** and **Client Secret**

---

#### **4. Update .env File**

```bash
# Add to .env
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

### **STEP 3.2: Facebook OAuth Setup (30 min)**

#### **1. Create Facebook App**

1. Go to: https://developers.facebook.com/apps/
2. Click **"Create App"**
3. Select use case: **Consumer**
4. Fill in:
   - **App name:** ChatAI Platform
   - **App contact email:** Your email
5. Click **"Create App"**

---

#### **2. Add Facebook Login**

1. In dashboard, click **"Add Product"**
2. Find **"Facebook Login"** → Click **"Set Up"**
3. Choose platform: **Web**
4. Site URL: `http://localhost:3000`
5. Click **"Save"** → **"Continue"**

---

#### **3. Configure OAuth Settings**

1. Go to **Facebook Login** → **Settings**
2. Valid OAuth Redirect URIs:
   ```
   http://localhost:3000/auth/facebook/callback
   http://localhost:4000/auth/facebook/callback
   ```
3. Click **"Save Changes"**

---

#### **4. Get App Credentials**

1. Go to **Settings** → **Basic**
2. Copy **App ID** and **App Secret**
3. Add to .env:

```bash
FACEBOOK_APP_ID=your-facebook-app-id-here
FACEBOOK_APP_SECRET=your-facebook-app-secret-here
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

---

### **STEP 3.3: TikTok OAuth Setup (30 min)**

#### **1. Create TikTok Developer Account**

1. Go to: https://developers.tiktok.com/
2. Click **"Sign up"** or **"Login"**
3. Complete verification

---

#### **2. Create TikTok App**

1. Go to: https://developers.tiktok.com/apps/
2. Click **"Create an app"**
3. Fill in:
   - **App name:** ChatAI Platform
   - **App description:** AI chat platform
   - **Category:** Productivity
4. Click **"Submit"**

---

#### **3. Configure Login Kit**

1. In app dashboard, go to **"Login Kit"**
2. Enable **"Login Kit"**
3. Add redirect URIs:
   ```
   http://localhost:3000/auth/tiktok/callback
   http://localhost:4000/auth/tiktok/callback
   ```
4. Requested scopes:
   - `user.info.basic`
5. Click **"Save"**

---

#### **4. Get Credentials**

1. Go to **"Credentials"** tab
2. Copy **Client Key** and **Client Secret**
3. Add to .env:

```bash
TIKTOK_CLIENT_KEY=your-tiktok-client-key-here
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret-here
TIKTOK_CALLBACK_URL=http://localhost:3000/auth/tiktok/callback
```

---

### **STEP 3.4: OpenAI API Setup (15 min)**

#### **1. Create OpenAI Account**

1. Go to: https://platform.openai.com/signup
2. Sign up with email or Google
3. Verify email

---

#### **2. Get API Key**

1. Go to: https://platform.openai.com/account/api-keys
2. Click **"Create new secret key"**
3. Name: **ChatAI Platform - Development**
4. Click **"Create secret key"**
5. Copy the key (won't be shown again!)

---

#### **3. Add Credits (if needed)**

1. Go to: https://platform.openai.com/account/billing
2. Add payment method
3. Add credits ($10+ recommended for testing)

---

#### **4. Update .env**

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_ORG_ID=
```

---

### **STEP 3.5: Google Gemini API Setup (15 min)**

#### **1. Get Gemini API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Create API key"**
3. Select project: **ChatAI Platform** (or create new)
4. Click **"Create API key in existing project"**
5. Copy the API key

---

#### **2. Update .env**

```bash
GEMINI_API_KEY=your-gemini-api-key-here
```

---

### **STEP 3.6: Anthropic Claude API Setup (Optional, 15 min)**

#### **1. Join Anthropic Waitlist**

1. Go to: https://www.anthropic.com/
2. Request API access
3. Wait for approval email

---

#### **2. Get API Key (after approval)**

1. Go to: https://console.anthropic.com/
2. Create API key
3. Copy the key

---

#### **3. Update .env**

```bash
CLAUDE_API_KEY=your-claude-api-key-here
```

---

### **STEP 3.7: Grok API Setup (Optional, Future)**

**Note:** Grok API is not publicly available yet. When available:

1. Go to: https://x.ai/
2. Request API access
3. Get API key
4. Update .env:

```bash
GROK_API_KEY=your-grok-api-key-here
```

---

### **STEP 3.8: Email Configuration (Gmail) (15 min)**

#### **1. Enable 2-Step Verification**

1. Go to: https://myaccount.google.com/security
2. Click **"2-Step Verification"**
3. Follow steps to enable

---

#### **2. Generate App Password**

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Name: **ChatAI Platform**
5. Click **"Generate"**
6. Copy the 16-character password

---

#### **3. Update .env**

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=ChatAI Platform <noreply@chatai.com>
```

---

### **STEP 3.9: Test API Keys (20 min)**

Create `scripts/test-apis.sh`:

```bash
#!/bin/bash

echo "🔍 Testing API Keys..."

# Test OpenAI
echo ""
echo "1️⃣ Testing OpenAI API..."
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -s | grep -q "gpt-4" && echo "✅ OpenAI API key is valid" || echo "❌ OpenAI API key is invalid"

# Test Gemini
echo ""
echo "2️⃣ Testing Gemini API..."
curl "https://generativelanguage.googleapis.com/v1/models?key=$GEMINI_API_KEY" \
  -s | grep -q "models/gemini" && echo "✅ Gemini API key is valid" || echo "❌ Gemini API key is invalid"

# Test Claude (if available)
if [ ! -z "$CLAUDE_API_KEY" ]; then
  echo ""
  echo "3️⃣ Testing Claude API..."
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $CLAUDE_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{"model": "claude-3-opus-20240229", "max_tokens": 1, "messages": [{"role": "user", "content": "Hi"}]}' \
    -s | grep -q "content" && echo "✅ Claude API key is valid" || echo "❌ Claude API key is invalid or not available"
fi

echo ""
echo "🎉 API testing complete!"
```

Make executable and run:

```bash
chmod +x scripts/test-apis.sh
source .env && ./scripts/test-apis.sh
```

---

### **STEP 3.10: Document API Keys (10 min)**

Create `docs/API-Keys-Setup.md`:

```markdown
# API Keys Setup Guide

## OAuth Providers

### Google OAuth
- Console: https://console.cloud.google.com/
- Credentials: Settings → Basic → OAuth 2.0 Client IDs
- Scopes: email, profile
- Redirect URI: `http://localhost:3000/auth/google/callback`

### Facebook OAuth
- Console: https://developers.facebook.com/apps/
- Product: Facebook Login
- Redirect URI: `http://localhost:3000/auth/facebook/callback`

### TikTok OAuth
- Console: https://developers.tiktok.com/apps/
- Product: Login Kit
- Redirect URI: `http://localhost:3000/auth/tiktok/callback`

## AI Providers

### OpenAI
- Console: https://platform.openai.com/
- API Keys: https://platform.openai.com/account/api-keys
- Billing: https://platform.openai.com/account/billing
- Models: GPT-4, GPT-3.5

### Google Gemini
- Console: https://makersuite.google.com/
- API Keys: https://makersuite.google.com/app/apikey
- Models: Gemini Pro, Gemini Pro Vision

### Anthropic Claude (Optional)
- Console: https://console.anthropic.com/
- Models: Claude 3 Opus, Claude 3 Sonnet

### Grok / X.AI (Future)
- Website: https://x.ai/
- Status: API not yet public

## Email (Gmail)

1. Enable 2-Step Verification
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in .env

## Security Notes

- ⚠️ Never commit .env to Git
- ⚠️ Rotate keys regularly (every 90 days)
- ⚠️ Use different keys for dev/staging/prod
- ⚠️ Set spending limits on AI APIs
- ⚠️ Monitor API usage regularly
```

---

### **STEP 3.11: Commit Changes (5 min)**

```bash
# Add docs only (not .env!)
git add docs/API-Keys-Setup.md
git add scripts/test-apis.sh
git add .env.example

# Commit
git commit -m "docs: add API keys setup guide and test script"

# Push
git push origin main
```

**Result:** ✅ Day 3 complete - All API keys configured!

---

## DAY 4: GIT WORKFLOW & TEAM KICKOFF

**Duration:** 2 hours  
**Goal:** Finalize git workflow and onboard team  

---

### **STEP 4.1: Configure Branch Protection (15 min)**

#### **1. Protect Main Branch**

1. Go to: https://github.com/thanhhaunv/ChatAI-Platform/settings/branches
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
   - ✅ Do not allow bypassing the above settings
5. Click **"Create"**

---

#### **2. Protect Develop Branch**

1. Click **"Add rule"**
2. Branch name pattern: `develop`
3. Same settings as main
4. Click **"Create"**

---

### **STEP 4.2: Create Branch Naming Convention (10 min)**

Create `docs/Git-Workflow.md`:

```markdown
# Git Workflow Guide

## Branch Naming Convention

### Format
```
<type>/<jira-key>-<short-description>
```

### Types
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation only
- `test/` - Test only changes
- `chore/` - Maintenance tasks

### Examples
- `feature/CAP-6-database-setup`
- `bugfix/CAP-15-file-upload-error`
- `hotfix/CAP-20-security-patch`
- `refactor/CAP-10-agent-service`
- `docs/CAP-1-update-readme`

## Commit Message Convention

### Format (Conventional Commits)
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Maintenance

### Examples
```bash
feat(auth): add Google OAuth support CAP-7

Implemented Google OAuth 2.0 flow with Passport.js
- Added Google strategy
- Created callback route
- Linked to user account

Closes CAP-7
```

```bash
fix(chat): resolve WebSocket connection issue CAP-11

Fixed race condition in WebSocket authentication
that caused connection drops

Fixes CAP-11
```

## Workflow

### 1. Start New Work

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/CAP-6-database-setup
```

### 2. Make Changes

```bash
# Make changes to files
# ...

# Stage changes
git add .

# Commit (will trigger Husky hooks)
git commit -m "feat(db): setup PostgreSQL with TypeORM CAP-6"
```

### 3. Push and Create PR

```bash
# Push branch
git push origin feature/CAP-6-database-setup

# Go to GitHub and create Pull Request
# - Title: feat(db): setup PostgreSQL with TypeORM
# - Link Jira issue: CAP-6
# - Request reviewers
```

### 4. Code Review

- Wait for 1+ approval
- Address review comments
- All checks must pass (lint, tests)

### 5. Merge

- Squash and merge (preferred)
- Delete branch after merge

### 6. Update Local

```bash
git checkout main
git pull origin main
git branch -d feature/CAP-6-database-setup
```

## PR Template Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] Tests pass locally
- [ ] Linked to Jira issue

## Tips

1. **Commit often** - Small, focused commits
2. **Write clear messages** - Explain WHY, not just WHAT
3. **Keep PRs small** - Easier to review
4. **Update branches** - Rebase or merge main regularly
5. **Test before pushing** - Husky will catch issues
6. **Link Jira issues** - Use CAP-# in commits and PRs
7. **Request reviews early** - Don't wait until finished
```

---

### **STEP 4.3: Create Development Guide (15 min)**

Create `docs/Development-Guide.md`:

```markdown
# Development Guide

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/thanhhaunv/ChatAI-Platform.git
cd ChatAI-Platform
```

### 2. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env and add your API keys
nano .env
```

### 3. Install Dependencies

```bash
# Install root dependencies
pnpm install
```

### 4. Start Infrastructure

```bash
# Start Docker services
./scripts/dev-start.sh

# Verify all services are running
docker-compose ps
```

### 5. Initialize Database

```bash
# Run initialization script
./scripts/init-db.sh
```

## Daily Workflow

### Morning Standup (9:00 AM)
- Share in #standup channel:
  1. What you did yesterday
  2. What you'll do today
  3. Any blockers

### Starting Work
```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/CAP-X-description

# Update Jira: Move task to "In Progress"
```

### During Development
- Commit often with clear messages
- Follow coding conventions
- Write tests as you code
- Update documentation
- Use Husky hooks (will auto-run)

### Before Pushing
```bash
# Run tests locally
pnpm test

# Check formatting
pnpm format:check

# Push
git push origin feature/CAP-X-description
```

### Create Pull Request
1. Go to GitHub
2. Click "New Pull Request"
3. Fill in PR template
4. Link Jira issue (CAP-X)
5. Request reviewers (2+ team members)
6. Update Jira: Move task to "Review"

### After PR Merged
```bash
# Update local main
git checkout main
git pull origin main

# Delete feature branch
git branch -d feature/CAP-X-description

# Update Jira: Move task to "Done"
```

## Code Review Guidelines

### As Author
- Keep PRs small (<500 lines)
- Write clear description
- Add screenshots/videos if UI changes
- Respond to comments promptly
- Don't merge your own PR

### As Reviewer
- Review within 24 hours
- Be constructive and respectful
- Ask questions, don't demand
- Approve only if you'd merge it yourself
- Check: code quality, tests, documentation

## Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests for specific service
cd services/auth-service
pnpm test

# Run tests in watch mode
pnpm test:watch

# Check coverage
pnpm test:coverage
```

### Integration Tests
```bash
# Run integration tests
pnpm test:integration
```

### E2E Tests
```bash
# Start all services first
./scripts/dev-start.sh

# Run E2E tests
cd tests/e2e
pnpm test:e2e
```

## Debugging

### Backend Services
```bash
# View logs
docker-compose logs -f <service-name>

# Debug in VS Code
# Use launch.json configurations
```

### Frontend
```bash
# Next.js dev mode has hot reload
cd frontend/web
pnpm dev

# Check browser console for errors
```

### Database
```bash
# Access PostgreSQL
docker exec -it chatai-postgres psql -U postgres -d chatai_platform

# Or use pgAdmin: http://localhost:5050
```

## Troubleshooting

### Port already in use
```bash
# Find and kill process
lsof -i :PORT
kill -9 <PID>
```

### Docker issues
```bash
# Restart services
docker-compose restart

# Full reset
./scripts/dev-reset.sh
```

### Husky hooks not running
```bash
# Reinstall Husky
rm -rf .husky
pnpm prepare
```

### Tests failing
```bash
# Clear cache
pnpm test --clearCache

# Update snapshots (if needed)
pnpm test -u
```

## Resources

- [API Documentation](./API-Spec.yaml)
- [Database Schema](./ERD.md)
- [Architecture](./Diagrams.md)
- [Coding Conventions](./Coding-Conventions.md)
```

---

### **STEP 4.4: Prepare Team Kickoff Presentation (20 min)**

Create `docs/Team-Kickoff-Agenda.md`:

```markdown
# Team Kickoff Meeting - Agenda

**Date:** [Your start date]  
**Time:** 30 minutes  
**Attendees:** All 6 team members  

---

## Agenda

### 1. Welcome & Introductions (5 min)
- PM introduces project
- Team members introduce themselves
- Roles and responsibilities

### 2. Project Overview (5 min)
- Product vision: Multi-provider AI chat platform
- Key features
- Target users
- Success criteria

### 3. Timeline & Milestones (5 min)
- 22 weeks total (5.5 months)
- 4 phases, 14 milestones
- Sprint structure (2-week sprints)
- Key demos: End of Phase 1, 2, 3

### 4. Tools & Workflow (10 min)
- **Jira:** Project tracking
  - Show board
  - Explain workflow (To Do → In Progress → Review → Testing → Done)
  - Sprint 1 stories
- **GitHub:** Code repository
  - Branch protection
  - PR process
  - Husky hooks
- **Slack:** Communication
  - Channels overview
  - Daily standups
  - Notifications

### 5. Development Environment (3 min)
- Docker Compose services
- .env setup (everyone has keys?)
- Helper scripts

### 6. Next Steps & Q&A (2 min)
- Tomorrow: Start Sprint 1
- First task: M1-S1 Setup Docker Compose
- Daily standup: 9:00 AM in #standup
- Questions?

---

## Action Items

- [ ] All team members: Clone repo
- [ ] All team members: Setup .env with API keys
- [ ] All team members: Run `./scripts/dev-start.sh`
- [ ] All team members: Verify Docker services running
- [ ] DevOps: Assign M1-S1 in Jira
- [ ] PM: Schedule daily standup (9:00 AM)

---

## Links

- GitHub: https://github.com/thanhhaunv/ChatAI-Platform
- Jira: https://thanhhaunv.atlassian.net
- Slack: chatai-platform.slack.com
- Docs: /docs folder in repo
```

---

### **STEP 4.5: Create README.md (20 min)**

Update root `README.md`:

```markdown
# 🤖 ChatAI Platform

Multi-provider AI chat platform with ML training capabilities.

## ✨ Features

- 🔐 Multi-auth (Email, Google, Facebook, TikTok)
- 💬 Multi-provider AI chat (OpenAI, Gemini, Claude, Grok)
- 🧵 Conversation threading with context
- ⚡ Realtime streaming (WebSocket)
- 🔔 Realtime notifications
- 🎤 Voice input/output (STT/TTS)
- 📁 File upload & processing (PDF, DOCX, images)
- 🤖 Agent management (external + self-hosted)
- 🧠 ML training & deployment
- 📊 Billing & usage tracking
- 📱 Mobile app (React Native)

## 🏗️ Architecture

### Services
- `api-gateway` - API Gateway (NestJS)
- `auth-service` - Authentication (NestJS)
- `user-service` - User/Project/Conversation (NestJS)
- `chat-orch` - Chat Orchestrator (NestJS)
- `notification-service` - Notifications (NestJS)
- `agent-mgr` - Agent Management (NestJS)
- `billing` - Billing & Reports (NestJS)
- `ml-training` - ML Training (Python/FastAPI)

### Frontend
- `frontend/web` - Web App (Next.js 14)
- `frontend/mobile` - Mobile App (React Native/Expo)

### Infrastructure
- PostgreSQL - Database
- Redis - Cache
- MinIO - Object Storage (S3-compatible)
- RabbitMQ - Message Broker

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Node.js 18+
- pnpm

### 1. Clone Repository
```bash
git clone https://github.com/thanhhaunv/ChatAI-Platform.git
cd ChatAI-Platform
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env and add your API keys
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Start Services
```bash
./scripts/dev-start.sh
```

### 5. Verify
```bash
docker-compose ps
# All services should show "Up (healthy)"
```

## 📚 Documentation

- [Development Guide](./docs/Development-Guide.md)
- [Git Workflow](./docs/Git-Workflow.md)
- [Environment Setup](./docs/ENV-Setup-Guide.md)
- [API Keys Setup](./docs/API-Keys-Setup.md)
- [API Specification](./docs/API-Spec.yaml)
- [Database Schema](./docs/ERD.md)
- [Architecture Diagrams](./docs/Diagrams.md)

## 🛠️ Tech Stack

**Backend:**
- NestJS (TypeScript)
- TypeORM
- PostgreSQL
- Redis
- RabbitMQ
- Socket.io

**Frontend:**
- Next.js 14
- React Native (Expo)
- Tailwind CSS
- Socket.io Client

**ML/AI:**
- Python FastAPI
- Hugging Face Transformers
- OpenAI API
- Google Gemini API

**DevOps:**
- Docker & Docker Compose
- Kubernetes
- Terraform
- GitHub Actions

## 👥 Team

- PM/Dev Lead: thanhhaunv
- Backend Dev 1: TBD
- Backend Dev 2: TBD
- Frontend Dev: TBD
- DevOps: TBD
- QA/Tester: TBD

## 📅 Timeline

- **Phase 0:** Pre-Start (4 days)
- **Phase 1:** Backend Core (8 weeks)
- **Phase 2:** Advanced Features (6 weeks)
- **Phase 3:** Deployment & ML (4 weeks)
- **Phase 4:** Hardening & Beta (4 weeks)

**Total:** 22 weeks (5.5 months)

## 📊 Project Management

- **Jira:** https://thanhhaunv.atlassian.net
- **GitHub:** https://github.com/thanhhaunv/ChatAI-Platform
- **Slack:** chatai-platform.slack.com

## 📝 License

[MIT License](./LICENSE)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**🎉 Ready to build? Start Sprint 1 → M1: Database Setup!**
```

---

### **STEP 4.6: Test Complete Setup (15 min)**

```bash
# 1. Verify Git hooks
git commit --allow-empty -m "test: verify git hooks"
# Should pass with ✅

# 2. Verify Docker services
docker-compose ps
# All should be "Up (healthy)"

# 3. Verify API keys (if added)
source .env && ./scripts/test-apis.sh
# Should show ✅ for configured APIs

# 4. Verify project structure
tree -L 2 -d
# Should show all directories

# 5. Run lint
pnpm lint
# Should pass (or show no files yet)
```

---

### **STEP 4.7: Final Commit & Tag (10 min)**

```bash
# Add all documentation
git add .

# Commit
git commit -m "docs: add development guides and team onboarding materials"

# Push
git push origin main

# Create tag for Phase 0 completion
git tag -a v0.1.0-phase0 -m "Phase 0: Pre-Start Setup Complete"
git push origin v0.1.0-phase0
```

---

### **STEP 4.8: Team Kickoff Meeting (30 min)**

**Conduct the meeting using the agenda from Step 4.4:**

1. Welcome & introductions
2. Project overview
3. Timeline & milestones
4. Tools & workflow walkthrough
5. Development environment demo
6. Next steps & Q&A

**After meeting:**
- Share meeting notes in Slack #general
- Ensure all team members have access to:
  - GitHub repo
  - Jira project
  - Slack workspace
  - .env with API keys

---

### **STEP 4.9: Verify Team Setup (15 min)**

Create checklist for each team member:

```markdown
## Team Member Setup Checklist

- [ ] GitHub access granted
- [ ] Jira access granted
- [ ] Slack workspace joined
- [ ] Repository cloned
- [ ] .env file configured with API keys
- [ ] Docker services running
- [ ] Can push to feature branch
- [ ] Can create Jira issues
- [ ] Understands git workflow
- [ ] Knows daily standup time (9:00 AM)
```

Share in Slack and ask team to confirm.

---

## 🎉 PHASE 0 COMPLETE!

### ✅ Completed Checklist

- [x] Day 1: GitHub Setup & Husky Configuration
  - [x] GitHub repository created
  - [x] Project structure created
  - [x] Husky git hooks configured (pre-commit, commit-msg, pre-push)
  - [x] ESLint & Prettier configured
  - [x] PR template created
  - [x] Issue templates created
  - [x] GitHub Actions workflow (lint) created
  - [x] Git hooks tested

- [x] Day 2: Docker Compose & Local Environment
  - [x] docker-compose.yml created
  - [x] PostgreSQL configured
  - [x] Redis configured
  - [x] MinIO configured
  - [x] RabbitMQ configured
  - [x] pgAdmin configured
  - [x] .env.example created
  - [x] Helper scripts created (start, stop, reset)
  - [x] All services running and healthy
  - [x] Documentation created

- [x] Day 3: OAuth & API Keys Setup
  - [x] Google OAuth configured
  - [x] Facebook OAuth configured
  - [x] TikTok OAuth configured
  - [x] OpenAI API key obtained
  - [x] Google Gemini API key obtained
  - [x] Anthropic Claude API key obtained (optional)
  - [x] Email (Gmail) configured
  - [x] All API keys tested
  - [x] API keys documentation created

- [x] Day 4: Git Workflow & Team Kickoff
  - [x] Branch protection rules configured
  - [x] Git workflow documentation created
  - [x] Development guide created
  - [x] Team kickoff agenda prepared
  - [x] README.md updated
  - [x] Team kickoff meeting conducted
  - [x] Team setup verified
  - [x] Phase 0 tagged (v0.1.0-phase0)

---

### 📊 Phase 0 Summary

**Time Spent:** 3-4 days  
**Team Members:** 6 people onboarded  
**Services Running:** 5 Docker services (PostgreSQL, Redis, MinIO, RabbitMQ, pgAdmin)  
**API Keys Configured:** 6-7 providers (Google, Facebook, TikTok, OpenAI, Gemini, Claude, Email)  
**Git Hooks:** 3 hooks (pre-commit, commit-msg, pre-push)  
**Documentation:** 7 documents created  

---

### 🎯 Deliverables

1. **GitHub Repository**
   - ✅ Project structure
   - ✅ Git hooks with Husky
   - ✅ Branch protection
   - ✅ PR/Issue templates
   - ✅ GitHub Actions (lint)

2. **Development Environment**
   - ✅ Docker Compose setup
   - ✅ 5 services running
   - ✅ Health checks passing
   - ✅ Helper scripts

3. **Configuration**
   - ✅ .env template
   - ✅ OAuth providers configured
   - ✅ AI API keys configured
   - ✅ Email configured

4. **Documentation**
   - ✅ Development Guide
   - ✅ Git Workflow Guide
   - ✅ Environment Setup Guide
   - ✅ API Keys Setup Guide
   - ✅ Team Kickoff Agenda
   - ✅ README.md
   - ✅ Contributing guidelines

5. **Team Onboarding**
   - ✅ All members have access
   - ✅ Kickoff meeting completed
   - ✅ Team understands workflow
   - ✅ Ready to start Sprint 1

---

### 🚀 Next Steps

**PHASE 1 STARTS NOW!**

**Week 1 - Sprint 1: M1 - Database Setup & Infrastructure**

**Monday (Day 1):**
- [ ] Daily standup (9:00 AM)
- [ ] Start M1-S1: Setup Docker Compose (4h) - DevOps
- [ ] Start M1-S2: Implement Database Schema (6h) - Backend Dev 1

**Tuesday (Day 2):**
- [ ] Daily standup (9:00 AM)
- [ ] Continue M1-S2: Database Schema
- [ ] Create TypeORM entities for all 8 tables

**Wednesday (Day 3):**
- [ ] Daily standup (9:00 AM)
- [ ] Start M1-S3: Config DB Connection (2h) - Backend Dev 1
- [ ] Start M1-S4: CI/CD Basic (3h) - DevOps

**Thursday (Day 4):**
- [ ] Daily standup (9:00 AM)
- [ ] Testing & bug fixes
- [ ] Code review

**Friday (Day 5):**
- [ ] Daily standup (9:00 AM)
- [ ] Final testing
- [ ] Merge M1 to develop
- [ ] Sprint retrospective
- [ ] Update Jira: M1 → Done

---

### 📞 Support & Resources

**If you have questions:**
- Post in Slack #dev-backend, #dev-frontend, or #dev-devops
- Tag PM (@thanhhaunv) for clarifications
- Check documentation in /docs folder
- Review Jira stories for acceptance criteria

**Useful Commands:**
```bash
# Start environment
./scripts/dev-start.sh

# Stop environment
./scripts/dev-stop.sh

# Reset environment
./scripts/dev-reset.sh

# Test API keys
source .env && ./scripts/test-apis.sh

# Run lint
pnpm lint

# Run tests
pnpm test
```

**Service URLs:**
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- MinIO: `http://localhost:9001` (minioadmin / minioadmin)
- RabbitMQ: `http://localhost:15672` (rabbitmq / rabbitmq)
- pgAdmin: `http://localhost:5050` (admin@chatai.com / admin)

---

### 🎓 Learning Resources

**NestJS:**
- Docs: https://docs.nestjs.com/
- Tutorial: https://docs.nestjs.com/first-steps

**Next.js:**
- Docs: https://nextjs.org/docs
- Learn: https://nextjs.org/learn

**TypeORM:**
- Docs: https://typeorm.io/
- Guide: https://typeorm.io/migrations

**Docker:**
- Docs: https://docs.docker.com/
- Compose: https://docs.docker.com/compose/

**Git:**
- Conventional Commits: https://www.conventionalcommits.org/
- Git Flow: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

---

### 💡 Tips for Success

1. **Commit Often** - Small, focused commits are easier to review
2. **Write Tests** - Aim for >80% coverage
3. **Document Code** - Comment complex logic
4. **Ask Questions** - No question is too small
5. **Code Reviews** - Review within 24 hours
6. **Daily Standups** - Be on time (9:00 AM)
7. **Update Jira** - Keep status current
8. **Follow Conventions** - Use ESLint, Prettier, commit format
9. **Test Locally** - Before pushing
10. **Have Fun** - We're building something awesome! 🚀

---

### 🏆 Phase 0 Achievements Unlocked

- 🔧 **Environment Master** - All services running smoothly
- 🔐 **API Key Collector** - All providers configured
- 📝 **Documentation Hero** - 7 comprehensive docs created
- 🤝 **Team Leader** - Successfully onboarded 6 team members
- 🎯 **Git Guru** - Husky hooks keeping code quality high
- 🚀 **Ready for Liftoff** - Phase 1 here we come!

---

### ✅ Final Pre-Sprint Checklist

Before starting Sprint 1, verify:

- [ ] All team members confirmed setup complete
- [ ] Docker services running: `docker-compose ps`
- [ ] Git hooks working: `git commit --allow-empty -m "test"`
- [ ] API keys valid: `./scripts/test-apis.sh`
- [ ] Jira Sprint 1 started
- [ ] Daily standup scheduled (9:00 AM)
- [ ] M1 stories assigned in Jira
- [ ] Team knows acceptance criteria for M1
- [ ] Code review process understood
- [ ] Communication channels active (Slack)

---

## 🎊 CONGRATULATIONS!

**Phase 0 is complete!** 

Your team is now:
- ✅ Equipped with a robust development environment
- ✅ Following industry-standard Git workflows
- ✅ Using automated quality checks (Husky)
- ✅ Ready to build production-quality code
- ✅ Aligned on process and timeline

**Time to build!** 🚀

---

## 📖 What's Next?

Move to **PART 4: PHASE 1 - BACKEND CORE IMPLEMENTATION** to start building:

**Week 1-2: Sprint 1**
- M1: Database Setup & Infrastructure
- M2: Auth Service

**Week 3-4: Sprint 2**
- M3: User/Project Service
- M4: API Gateway

**Week 5-6: Sprint 3**
- M5: Chat Orchestrator
- M6: WebSocket Gateway

**Week 7-8: Sprint 4**
- M6.5: Notification Service
- M7: Billing Service
- 🎬 Phase 1 Demo!

---

## 📝 Appendix: Troubleshooting

### Common Issues

**1. Docker services not starting**
```bash
# Check Docker Desktop is running
docker info

# Check port conflicts
lsof -i :5432
lsof -i :6379
lsof -i :9000

# Reset Docker
./scripts/dev-reset.sh
```

**2. Husky hooks not running**
```bash
# Reinstall Husky
rm -rf .husky
pnpm prepare
chmod +x .husky/*
```

**3. API key errors**
```bash
# Verify .env file exists
cat .env | grep API_KEY

# Test keys
source .env && ./scripts/test-apis.sh
```

**4. Git push rejected**
```bash
# Ensure commit message follows convention
# Format: type(scope): subject
# Example: feat(auth): add login endpoint

# Or use --no-verify to bypass (not recommended)
git push --no-verify
```

**5. Docker out of space**
```bash
# Clean up Docker
docker system prune -a --volumes

# Restart Docker Desktop
```

**6. Port already in use**
```bash
# Find process
lsof -i :PORT

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

**7. Permission denied**
```bash
# Fix script permissions
chmod +x scripts/*.sh

# Fix Husky permissions
chmod +x .husky/*
```

**8. pnpm not found**
```bash
# Install pnpm
npm install -g pnpm

# Verify
pnpm --version
```

---

## 📞 Getting Help

**Technical Issues:**
- Check documentation in `/docs`
- Search in Slack channels
- Ask in #dev-backend, #dev-frontend, or #dev-devops

**Process Questions:**
- Ask in #pm channel
- Tag PM (@thanhhaunv)
- Review Git-Workflow.md

**Blockers:**
- Report in daily standup
- Update Jira (add "blocked" label)
- Post in #incidents channel

**Urgent Issues:**
- Post in #incidents
- Tag team lead immediately

---

**🎉 You're all set! Let's build something amazing! 🚀**
