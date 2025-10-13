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
