
### Environment Setup Guide

Nội dung cho `environment-setup-guide.md`, bao gồm .env.example, docker-compose full, seed scripts (JS/Python).

---

# Environment Setup Guide

## 1. Prerequisites
- Node.js v18+, Python 3.12+, Docker v20+, Git.  
- Clone repo: `git clone https://github.com/your-repo/ChatAI-Platform`.  

## 2. .env.example
Copy to .env:  
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=secret
DB_NAME=chatai
JWT_SECRET=strongkey
OPENAI_API_KEY=sk-yourkey
AUTH_GOOGLE_ID=yourid
AUTH_GOOGLE_SECRET=yoursecret
# Add FB/TikTok similarly
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Handle production: Use Vault for secrets.

## 3. Docker Compose Full
docker-compose.yml (run `docker-compose up -d`):  
```
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
  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
  minio:
    image: minio/minio
    ports:
      - '9000:9000'
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
volumes:
  db-data:
```

## 4. Seed Data Scripts
- JS (TypeORM seed for backend): seed.js  
  ```javascript
  import { createConnection } from 'typeorm';
  import { User } from './entities/user.entity';  // Adjust path

  async function seed() {
    const connection = await createConnection();
    await connection.getRepository(User).save([
      { name: 'Admin', email: 'admin@example.com', role: 'admin' },
    ]);
    console.log('Seeded');
  }
  seed();
  ```  
  Run: `node seed.js`.  

- Python (for ML): seed.py  
  ```python
  # Run uvicorn main:app first, then post to /seed if endpoint
  # Or manual insert for PoC
  print("Seeded ML mock data")
  ```  

Run seed sau migration.

## 5. Setup Steps
1. `npm ci` in /frontend/web and /services/*.  
2. `docker-compose up -d`.  
3. Run migration: `npm run typeorm migration:run` in /services/user-service.  
4. Start backend: `npm run start:dev` for each service.  
5. Start frontend: `npm run dev` in /frontend/web.  
6. Test: Import Postman collections from milestones.

---

### Dependency List (Package.json Mẫu)

Nội dung cho `dependency-list.md`, với package.json mẫu cho backend service (NestJS), frontend web (Next.js), mobile (React Native), và ML (Python requirements.txt).

---

# Dependency List Cho Dự Án

## Backend Service (NestJS, e.g., /services/auth-service/package.json)
```
{
  "name": "auth-service",
  "version": "0.1.0",
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "bcrypt": "^5.1.0",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0",
    "pg": "^8.11.0",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/testing": "^10.0.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  },
  "scripts": {
    "start:dev": "nest start --watch",
    "test": "jest --coverage"
  }
}
```
Install: `npm i`.  

## Frontend Web (Next.js, /frontend/web/package.json)
```
{
  "name": "web",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^1.6.0",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "socket.io-client": "^4.7.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "cypress": "^13.5.0",
    "jest": "^29.7.0"
  },
  "scripts": {
    "dev": "next dev",
    "test": "jest",
    "cypress": "cypress run"
  }
}
```
Install: `npm i`.  

## Frontend Mobile (React Native, /frontend/mobile/package.json)
```
{
  "name": "mobile",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^1.6.0",
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.0",
    "react-native-voice": "^0.3.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0"
  },
  "devDependencies": {
    "detox": "^20.0.0",
    "jest": "^29.7.0"
  },
  "scripts": {
    "start": "expo start",
    "test": "jest",
    "detox": "detox test"
  }
}
```
Install: `npx expo install`.  

## ML Training (Python, /services/ml-training/requirements.txt)
```
fastapi==0.104.0
uvicorn==0.23.2
torch==2.1.0
transformers==4.35.0
pytest==7.4.3
```
Install: `pip install -r requirements.txt`.  

All dependencies opensource, update versions if vulnerabilities (Snyk scan in Phase 4).
