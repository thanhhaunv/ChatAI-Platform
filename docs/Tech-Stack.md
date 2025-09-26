
# 13) Tech stack & folder structure (Architect)

**Frontend:** Next.js (React), Tailwind CSS, i18n support
**Mobile:** React Native (share components if possible)
**Backend:** Node.js (TypeScript) for API Gateway & microservices; Python for AI orchestration và ML training (Hugging Face Transformers, PyTorch)
**DB:** Postgres (primary), Redis (cache, queues), MinIO/S3 for file storage
**Message queue:** RabbitMQ / Kafka (if high throughput)
**Container / Orchestration:** Docker + Kubernetes
**CI/CD:** GitHub Actions / GitLab CI — pipeline: build/test/lint -> container push -> k8s deploy -> smoke tests
**Monitoring:** Prometheus + Grafana; Logs => ELK or Loki
**Auth:** OAuth2 / OpenID Connect + JWT, encryption for secrets (Vault/SealedSecrets)
**ML infra:** Docker images for agents, model store (if training), GPU nodes optional; Voice: Web Speech API / Whisper cho STT/TTS

**Suggested repo layout:**

```
/frontend
  /web (nextjs)
  /mobile (rn)
/services
  /api-gateway
  /auth-service
  /user-service
  /chat-orch
  /agent-mgr
  /ml-training
  /billing
/infrastructure
  /k8s
  /terraform
/docs
  openapi.yaml
  architecture.md
/tests
```
### Cấu Trúc Triển Khai Code Cho Dự Án

Dựa trên yêu cầu đã chốt (ứng dụng chat AI đa agent với web/app, hỗ trợ text/voice/upload file, quản lý users/projects/agents/threads, thống kê billing, self-hosted và train agents bằng Docker/Python), và tài liệu chúng ta đã xây dựng (BRD, SRS, User Stories, Diagrams, ERD, API Spec, Tech Stack, Roadmap), giờ chúng ta triển khai code mà không thay đổi gì (bất kỳ chỉnh sửa nào để phase sau). Tôi sẽ phân chia dự án thành các phần chính theo repo layout trong phần 13 của tài liệu, và dựng cấu trúc folder/file chi tiết cho từng phần.

Tổng quan triển khai:
- **Phương Pháp**: Theo Agile từ Roadmap (Phase 0-4). Bắt đầu từ Phase 1 (core backend APIs, chat flow, auth, DB, threading).
- **Công Cụ**: GitHub repo chính ("ChatAI-Platform"), Jira cho tasks. Sử dụng Node.js/TypeScript cho hầu hết backend/frontend, Python cho ML. Mỗi service là repo con hoặc folder riêng để dễ microservices.
- **Các Phần Chính**: 
  1. Frontend (Web + Mobile)
  2. Backend Services (Microservices)
  3. Infrastructure
  4. Docs & Tests (Hỗ trợ)

Dưới đây là cấu trúc chi tiết cho từng phần. Tôi dùng ví dụ file/folder mẫu, với code snippet ngắn gọn (giả sử) để minh họa. Bạn có thể copy-paste để khởi tạo repo.

---

### 1. Frontend
Phần này xử lý UI: Giao diện chat, chọn agent, upload file, voice input, history threads/projects. Dùng Next.js cho web (server-side rendering tốt cho SEO/performance), React Native cho mobile (chia sẻ code components).

#### a. /frontend/web (Next.js)
Cấu trúc: Theo chuẩn Next.js (pages/api cho routing, components cho reusable UI).
```
frontend/web/
├── app/                  # Routing mới (Next.js 13+)
│   ├── page.tsx          # Trang chính (dashboard)
│   ├── chat/             # Route cho chat
│   │   ├── [projectId]/  # Dynamic route cho project
│   │   │   └── [threadId]/page.tsx  # Chat thread cụ thể
│   │   └── page.tsx      # Danh sách threads
│   ├── auth/             # Auth pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── projects/         # Quản lý projects
│       └── page.tsx
├── components/           # Reusable UI components
│   ├── ChatInput.tsx     # Input text/voice/upload
│   ├── MessageList.tsx   # Hiển thị history messages
│   ├── AgentSelector.tsx # Chọn agent
│   ├── ProjectSidebar.tsx# Sidebar projects/threads
│   └── VoiceRecorder.tsx # Voice input (dùng Web Speech API)
├── lib/                  # Utilities
│   ├── api.ts            # API client (Axios/Fetch để call backend)
│   └── auth.ts           # Auth helpers (JWT)
├── public/               # Static assets (images, icons)
├── styles/               # Tailwind config
│   └── globals.css
├── next.config.js        # Config Next.js
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies: next, react, tailwindcss, socket.io-client, @types/web-speech-api
└── README.md             # Hướng dẫn run: npm install && npm run dev
```

Ví dụ code snippet (components/ChatInput.tsx):
```tsx
import { useState } from 'react';

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [message, setMessage] = useState('');
  // Voice logic: use Web Speech API for recognition
  const handleVoice = () => { /* Implement STT */ };
  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => onSend(message)}>Send</button>
      <button onClick={handleVoice}>Voice</button>
    </div>
  );
}
```

#### b. /frontend/mobile (React Native)
Cấu trúc: Chia sẻ components với web nếu có thể (qua monorepo), dùng Expo cho easy build.
```
frontend/mobile/
├── App.tsx               # Entry point
├── src/
│   ├── screens/          # Screens (tương tự pages)
│   │   ├── ChatScreen.tsx# Chat thread
│   │   ├── LoginScreen.tsx
│   │   └── ProjectsScreen.tsx
│   ├── components/       # Reusable (chia sẻ với web nếu dùng React Native Web)
│   │   ├── ChatInput.tsx # Tương tự web, nhưng dùng react-native-voice cho voice
│   │   └── MessageList.tsx
│   ├── api/              # API client
│   │   └── api.ts
│   └── navigation/       # React Navigation
│       └── AppNavigator.tsx
├── assets/               # Images/icons
├── app.json              # Expo config
├── tsconfig.json
├── package.json          # Dependencies: react-native, expo, @react-navigation/native, react-native-voice
└── README.md             # Run: expo start
```

Ví dụ: src/components/ChatInput.tsx (tương tự web, nhưng adapt cho mobile).

---

### 2. Backend Services (Microservices)
Mỗi service là folder riêng, dùng Node.js/NestJS cho hầu hết (cấu trúc tốt cho microservices), Python cho ML. Mỗi service có Dockerfile để containerize. Giao tiếp qua API Gateway (gRPC/REST), dùng RabbitMQ cho async.

#### a. /services/api-gateway (Node.js/NestJS)
Routing tất cả requests, auth middleware.
```
services/api-gateway/
├── src/
│   ├── main.ts           # Bootstrap app
│   ├── app.module.ts     # Modules
│   ├── controllers/      # API endpoints (proxy đến services)
│   │   └── gateway.controller.ts  # E.g., /projects, /messages
│   └── middlewares/      # Auth, rate limit
│       └── auth.middleware.ts
├── test/                 # Tests
├── Dockerfile            # Build image
├── package.json          # Dependencies: @nestjs/core, @nestjs/microservices, express
└── README.md
```

#### b. /services/auth-service (Node.js/NestJS)
Xử lý auth (OAuth, JWT).
```
services/auth-service/
├── src/
│   ├── auth.module.ts
│   ├── auth.controller.ts  # Endpoints: /login, /signup
│   ├── auth.service.ts     # Logic: Passport.js, verify email/phone
│   └── providers/          # OAuth (Google, FB, TikTok)
├── test/
├── Dockerfile
├── package.json          # + passport, passport-google-oauth20
└── README.md
```

#### c. /services/user-service (Node.js/NestJS)
CRUD users/projects/members/threads.
```
services/user-service/
├── src/
│   ├── user.module.ts
│   ├── user.controller.ts  # /users, /projects, /conversations
│   ├── user.service.ts     # Business logic
│   └── entities/           # TypeORM entities (User, Project, Conversation)
├── test/
├── Dockerfile
├── package.json          # + @nestjs/typeorm, pg (Postgres)
└── README.md
```

#### d. /services/chat-orch (Node.js/NestJS)
Core chat: Orchestrate requests, handle threads, voice/file.
```
services/chat-orch/
├── src/
│   ├── chat.module.ts
│   ├── chat.controller.ts  # /messages (POST with thread_id)
│   ├── chat.service.ts     # Resolve agent, get context from Redis/DB, call agent
│   ├── utils/              # Voice (integrate Whisper via Python call if cần), file extract
│   └── websocket.gateway.ts# Real-time responses
├── test/
├── Dockerfile
├── package.json          # + socket.io, redis, axios (call external AI)
└── README.md
```

#### e. /services/agent-mgr (Node.js/NestJS)
CRUD agents, deploy Docker.
```
services/agent-mgr/
├── src/
│   ├── agent.module.ts
│   ├── agent.controller.ts # /agents, /deploy
│   ├── agent.service.ts    # Config API keys, trigger K8s deploy
│   └── integrations/       # External APIs (OpenAI, Grok)
├── test/
├── Dockerfile
├── package.json          # + kubernetes-client
└── README.md
```

#### f. /services/ml-training (Python/FastAPI)
Train agents opensource.
```
services/ml-training/
├── main.py               # FastAPI app
├── requirements.txt      # Dependencies: fastapi, uvicorn, torch, transformers
├── app/
│   ├── api.py            # Endpoints: /train (params: model_source, dataset)
│   ├── models/           # Training logic (Hugging Face)
│   └── utils.py          # Docker build post-training
├── tests/
├── Dockerfile
└── README.md             # Run: uvicorn main:app
```

Ví dụ main.py snippet:
```python
from fastapi import FastAPI
app = FastAPI()

@app.post("/train")
def train_agent(body: dict):
    # Use Hugging Face to fine-tune model
    from transformers import Trainer
    # Logic train here...
    return {"status": "trained"}
```

#### g. /services/billing (Node.js/NestJS)
Log và report token/cost.
```
services/billing/
├── src/
│   ├── billing.module.ts
│   ├── billing.controller.ts # /report
│   ├── billing.service.ts   # Aggregate from DB, export CSV
│   └── entities/            # BillingLog entity
├── test/
├── Dockerfile
├── package.json          # + csv-writer
└── README.md
```

---

### 3. Infrastructure
Config deployment, CI/CD.
```
infrastructure/
├── k8s/                  # Kubernetes manifests
│   ├── deployments/      # YAML cho mỗi service (e.g., api-gateway-deployment.yaml)
│   ├── services/         # Service YAML
│   ├── ingress.yaml      # Load balancer
│   └── secrets.yaml      # API keys (use Vault)
├── terraform/            # IaC cho cloud (AWS/GCP)
│   ├── main.tf           # Provision K8s cluster, S3, Postgres
│   └── variables.tf
├── ci-cd/                # GitHub Actions workflows
│   └── deploy.yaml       # Build/push/deploy on push
└── README.md
```

---

### 4. Docs & Tests
- **/docs**: Như hướng dẫn GitHub trước (BRD.md, SRS.md, OpenAPI.yaml, v.v.).
- **/tests**: Folder chung cho e2e tests (e.g., Cypress cho frontend, Jest cho backend).
```
tests/
├── e2e/                  # Cypress tests cho full flow (chat, auth)
├── integration/          # Postman collections cho API
└── README.md
```

### Hướng Dẫn Triển Khai Ban Đầu
- **Khởi Tạo**: Tạo repo GitHub, add folders/files như trên. Sử dụng monorepo (tất cả trong một repo) cho dễ manage.
- **Dependencies Chung**: Yarn/Pnpm cho package management.
- **Run Local**: Docker Compose cho dev environment (file docker-compose.yml ở root).
- **Tasks Jira**: Assign tasks như "Implement /frontend/web" ở Phase 1.
- **Best Practice**: Commit nhỏ, tests trước code, review PR trên GitHub.

Nếu cần code mẫu chi tiết hơn cho phần nào (e.g., full ERD migration với TypeORM), hoặc script khởi tạo, cứ bảo nhé!

