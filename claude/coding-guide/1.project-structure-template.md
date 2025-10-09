# 📁 CHATAI PLATFORM - PROJECT STRUCTURE TEMPLATE

```
ChatAI-Platform/
│
├── 📂 .github/
│   └── workflows/
│       ├── test-backend.yaml      # CI pipeline: build, test, lint
│       ├── test-frontend.yaml     # Frontend tests + build
│       └── deploy.yaml            # Auto deploy on merge
│
├── 📂 frontend/
│   ├── 📂 web/                    # Next.js 14 web app
│   │   ├── app/                   # App router (pages)
│   │   │   ├── page.tsx           # Home (redirect to /projects or login)
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx   # Login page
│   │   │   │   └── signup/
│   │   │   │       └── page.tsx   # Signup page
│   │   │   ├── projects/
│   │   │   │   └── page.tsx       # Projects dashboard + sidebar
│   │   │   └── chat/
│   │   │       └── [projectId]/
│   │   │           └── [threadId]/
│   │   │               └── page.tsx # Chat thread page
│   │   │
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ChatInput.tsx      # Text/voice/file input
│   │   │   ├── MessageList.tsx    # Chat messages
│   │   │   ├── ProjectSidebar.tsx # Projects/threads sidebar
│   │   │   ├── VoiceRecorder.tsx  # Voice input (Web Speech API)
│   │   │   ├── AgentSelector.tsx  # Agent dropdown
│   │   │   └── Layout.tsx         # Main layout wrapper
│   │   │
│   │   ├── lib/                   # Utilities
│   │   │   ├── api.ts             # Axios instance + API client
│   │   │   ├── auth.ts            # JWT/auth helpers
│   │   │   ├── constants.ts       # API URLs, enum defaults
│   │   │   └── hooks.ts           # React hooks (useAuth, useChat)
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css        # Tailwind + global styles
│   │   │
│   │   ├── __tests__/             # Jest tests
│   │   │   ├── components/
│   │   │   └── lib/
│   │   │
│   │   ├── next.config.js         # Next.js config (API proxy)
│   │   ├── tailwind.config.js     # Tailwind config
│   │   ├── tsconfig.json          # TypeScript strict
│   │   ├── .eslintrc.json         # ESLint config
│   │   ├── .prettierrc            # Prettier config
│   │   ├── jest.config.js         # Jest config
│   │   ├── package.json           # Dependencies
│   │   ├── Dockerfile             # Docker for production build
│   │   ├── .dockerignore
│   │   └── README.md              # Web app runbook
│   │
│   └── 📂 mobile/                 # React Native (Expo)
│       ├── app.json               # Expo config
│       ├── App.tsx                # Entry point
│       ├── src/
│       │   ├── screens/           # Screen components
│       │   │   ├── LoginScreen.tsx
│       │   │   ├── ProjectsScreen.tsx
│       │   │   └── ChatScreen.tsx
│       │   ├── components/        # Reusable (shared with web if possible)
│       │   ├── navigation/        # React Navigation
│       │   ├── api/               # API client
│       │   └── utils/
│       ├── tsconfig.json
│       ├── jest.config.js
│       ├── package.json
│       └── README.md
│
├── 📂 services/                   # Backend microservices
│   │
│   ├── 📂 api-gateway/            # NestJS API Gateway
│   │   ├── src/
│   │   │   ├── main.ts            # Bootstrap
│   │   │   ├── app.module.ts      # Root module
│   │   │   ├── app.controller.ts  # Proxy routes
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── projects.controller.ts
│   │   │   │   └── chat.controller.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts    # JWT validation
│   │   │   │   ├── rate-limit.middleware.ts
│   │   │   │   └── error.middleware.ts
│   │   │   ├── filters/           # Exception filters
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── interceptors/      # Response formatting
│   │   │   │   └── logging.interceptor.ts
│   │   │   └── config/
│   │   │       └── configuration.ts
│   │   │
│   │   ├── test/                  # Jest tests
│   │   │   └── app.e2e-spec.ts
│   │   │
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── tsconfig.json
│   │   ├── .eslintrc.json
│   │   ├── .env.example
│   │   ├── .env.production
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── 📂 auth-service/           # NestJS Auth Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts # /auth/signup, /auth/login, /auth/oauth/*
│   │   │   ├── auth.service.ts    # Business logic
│   │   │   ├── strategies/        # Passport strategies
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── local.strategy.ts
│   │   │   │   ├── google.strategy.ts
│   │   │   │   ├── facebook.strategy.ts
│   │   │   │   └── tiktok.strategy.ts
│   │   │   ├── dto/
│   │   │   │   ├── signup.dto.ts
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── oauth.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts # TypeORM entity (shared or in user-service)
│   │   │   ├── guards/            # Auth guards
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   └── utils/
│   │   │       ├── bcrypt.util.ts
│   │   │       └── jwt.util.ts
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   ├── .env.production
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── 📂 user-service/           # NestJS User/Project/Threading Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── database/          # TypeORM config
│   │   │   │   ├── database.module.ts
│   │   │   │   └── database.config.ts
│   │   │   ├── entities/          # TypeORM entities (from ERD)
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── project.entity.ts
│   │   │   │   ├── project-member.entity.ts
│   │   │   │   ├── conversation.entity.ts
│   │   │   │   ├── message.entity.ts
│   │   │   │   └── agent.entity.ts
│   │   │   ├── migrations/        # TypeORM migrations
│   │   │   │   ├── 1700000000000-InitSchema.ts
│   │   │   │   └── ... (one per DB change)
│   │   │   ├── modules/
│   │   │   │   ├── users/
│   │   │   │   │   ├── users.controller.ts
│   │   │   │   │   ├── users.service.ts
│   │   │   │   │   └── dto/
│   │   │   │   ├── projects/
│   │   │   │   │   ├── projects.controller.ts
│   │   │   │   │   ├── projects.service.ts
│   │   │   │   │   └── dto/
│   │   │   │   └── conversations/
│   │   │   │       ├── conversations.controller.ts
│   │   │   │       ├── conversations.service.ts
│   │   │   │       └── dto/
│   │   │   ├── common/
│   │   │   │   ├── decorators/
│   │   │   │   ├── exceptions/
│   │   │   │   └── utils/
│   │   │   └── config/
│   │   │       └── configuration.ts
│   │   ├── test/
│   │   ├── ormconfig.json         # TypeORM config (for migrations)
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── 📂 chat-orch/              # NestJS Chat Orchestrator
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.controller.ts # /messages endpoints
│   │   │   ├── chat.service.ts    # Core logic
│   │   │   ├── gateway/           # WebSocket gateway (Socket.io)
│   │   │   │   └── chat.gateway.ts
│   │   │   ├── integrations/      # External API calls
│   │   │   │   ├── openai.service.ts
│   │   │   │   ├── grok.service.ts
│   │   │   │   └── gemini.service.ts
│   │   │   ├── utils/             # Utilities
│   │   │   │   ├── context.util.ts      # Thread context retrieval
│   │   │   │   ├── file-extractor.util.ts # Extract text from files
│   │   │   │   └── whisper.util.ts      # STT wrapper (call Python service)
│   │   │   ├── dto/
│   │   │   │   └── send-message.dto.ts
│   │   │   └── entities/          # Message entity (reference)
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── 📂 agent-mgr/              # NestJS Agent Management Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── agent.module.ts
│   │   │   ├── agent.controller.ts # /agents endpoints + deploy
│   │   │   ├── agent.service.ts
│   │   │   ├── docker/            # Docker deployment
│   │   │   │   └── docker.service.ts # Exec docker run/stop
│   │   │   ├── kubernetes/        # K8s deployment (optional)
│   │   │   │   └── k8s.service.ts
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   └── utils/
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── 📂 billing/                # NestJS Billing Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── billing.module.ts
│   │   │   ├── billing.controller.ts # /billing/report
│   │   │   ├── billing.service.ts    # Log usage, export CSV
│   │   │   ├── entities/
│   │   │   │   └── billing-log.entity.ts
│   │   │   ├── dto/
│   │   │   └── utils/
│   │   │       └── csv-export.util.ts
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── 📂 ml-training/            # Python FastAPI ML Training Service
│       ├── main.py                # FastAPI app
│       ├── app/
│       │   ├── api.py             # Endpoints: /train, /predict
│       │   ├── models/            # Model classes
│       │   │   └── trainer.py     # Training logic (Hugging Face)
│       │   ├── utils/
│       │   │   ├── loaders.py     # Data loaders
│       │   │   ├── evaluator.py   # Evaluation metrics
│       │   │   └── docker_builder.py # Build Docker image after training
│       │   └── config/
│       │       └── config.py      # Model configs
│       │
│       ├── tests/
│       ├── Dockerfile
│       ├── .env.example
│       ├── requirements.txt       # Python dependencies
│       ├── README.md
│       └── pytest.ini
│
├── 📂 infrastructure/             # Infrastructure as Code
│   ├── 📂 k8s/                    # Kubernetes manifests
│   │   ├── namespaces.yaml
│   │   ├── deployments/
│   │   │   ├── api-gateway-deployment.yaml
│   │   │   ├── auth-service-deployment.yaml
│   │   │   ├── user-service-deployment.yaml
│   │   │   ├── chat-orch-deployment.yaml
│   │   │   ├── agent-mgr-deployment.yaml
│   │   │   ├── billing-deployment.yaml
│   │   │   ├── ml-training-deployment.yaml
│   │   │   ├── postgres-statefulset.yaml
│   │   │   └── redis-deployment.yaml
│   │   ├── services/
│   │   │   ├── api-gateway-service.yaml
│   │   │   ├── postgres-service.yaml
│   │   │   └── ... (per service)
│   │   ├── configmaps/
│   │   │   └── app-config.yaml
│   │   ├── secrets/
│   │   │   └── app-secrets.yaml (use Vault in prod)
│   │   ├── ingress.yaml           # Load balancer / ingress
│   │   ├── rbac.yaml              # Roles & permissions
│   │   └── pvc.yaml               # Persistent volumes
│   │
│   ├── 📂 terraform/              # Infrastructure provisioning (AWS/GCP)
│   │   ├── main.tf                # K8s cluster, RDS, S3
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── vpc.tf
│   │   └── backend.tf             # Terraform state
│   │
│   ├── 📂 docker/
│   │   ├── Dockerfile.backend     # Multi-stage build for services
│   │   ├── Dockerfile.frontend    # Build & serve Next.js
│   │   └── docker-compose.yml     # Local dev environment
│   │
│   └── 📂 ci-cd/
│       ├── github-actions/
│       │   ├── test-backend.yaml
│       │   ├── test-frontend.yaml
│       │   ├── deploy-staging.yaml
│       │   └── deploy-production.yaml
│       └── scripts/
│           ├── build.sh
│           ├── test.sh
│           └── deploy.sh
│
├── 📂 docs/                       # Documentation (from GitHub)
│   ├── BRD.md
│   ├── SRS.md
│   ├── API-Spec.yaml              # OpenAPI spec
│   ├── Diagrams.md
│   ├── ERD.md
│   ├── Tech-Stack.md
│   ├── Coding-Conventions.md
│   ├── ENV-Setup-Guide.md
│   ├── Full-test-plan.md
│   ├── Roadmap.md
│   ├── RACI.md
│   ├── Deliverables.md
│   ├── UI-Wireframes.md
│   │
│   ├── 📂 adr/                   # Architecture Decision Records
│   │   ├── 0001-use-nestjs.md
│   │   ├── 0002-threading-strategy.md
│   │   └── 0003-k8s-deployment.md
│   │
│   ├── 📂 guides/
│   │   ├── Quick-Start.md
│   │   ├── Development-Setup.md
│   │   ├── Deployment-Guide.md
│   │   ├── Security-Compliance.md (NEW)
│   │   └── Monitoring-Alerting.md (NEW)
│   │
│   └── 📂 api/
│       ├── auth.openapi.yaml
│       ├── users.openapi.yaml
│       ├── chat.openapi.yaml
│       ├── agents.openapi.yaml
│       └── billing.openapi.yaml
│
├── 📂 tests/                      # Shared tests
│   ├── 📂 e2e/                    # End-to-End (Cypress + Detox)
│   │   ├── cypress.config.js
│   │   ├── cypress/
│   │   │   └── e2e/
│   │   │       ├── auth.cy.js
│   │   │       ├── chat.cy.js
│   │   │       └── projects.cy.js
│   │   └── detox/
│   │       └── specs/
│   │           ├── auth.e2e.js
│   │           └── chat.e2e.js
│   │
│   ├── 📂 integration/            # Postman collections + API tests
│   │   ├── auth-signup.postman_collection.json
│   │   ├── chat-flow.postman_collection.json
│   │   ├── billing-report.postman_collection.json
│   │   └── seeds/
│   │       ├── users-seed.json
│   │       ├── projects-seed.json
│   │       └── messages-seed.json
│   │
│   ├── 📂 load/                   # Load tests (Artillery)
│   │   ├── chat-load.yaml         # Simulate 10k users
│   │   ├── auth-load.yaml
│   │   └── artillery.config.yaml
│   │
│   ├── 📂 security/               # Security tests (OWASP ZAP, Snyk)
│   │   ├── owasp-config.yaml
│   │   └── vulnerability-scan.sh
│   │
│   └── README.md
│
├── 📂 scripts/                    # Utility scripts
│   ├── seed-db.js                 # Populate test data
│   ├── migrate.sh                 # Run migrations
│   ├── build-all.sh               # Build all services
│   ├── deploy-local.sh            # Docker Compose up
│   ├── deploy-staging.sh          # Deploy to staging K8s
│   └── health-check.sh            # Cluster health
│
├── 📂 .vscode/                    # VSCode settings
│   ├── settings.json              # Formatting, linting
│   ├── launch.json                # Debug configurations
│   └── extensions.json            # Recommended extensions
│
├── .gitignore                     # Git ignore
├── .editorconfig                  # Editor config (spaces, line endings)
├── docker-compose.yml             # Local dev (root level for convenience)
├── .env.example                   # Global env template
├── .env.production                # Production env template
│
├── package.json                   # Monorepo root (optional, for shared scripts)
├── pnpm-workspace.yaml            # Or yarn workspaces
├── tsconfig.base.json             # Base TypeScript config for monorepo
├── turbo.json                     # Turbo build cache (optional, for monorepo)
├── README.md                      # Main project README
├── CONTRIBUTING.md                # Contribution guide
└── LICENSE                        # MIT or appropriate license
```

---

## 📊 FOLDER TREE CHI TIẾT PER MILESTONE

### **Milestone 1: DB Setup & Infra (Weeks 1-2)**
```
services/user-service/
├── src/
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.config.ts
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── project.entity.ts
│   │   ├── project-member.entity.ts
│   │   ├── conversation.entity.ts
│   │   ├── message.entity.ts
│   │   ├── agent.entity.ts
│   │   └── billing-log.entity.ts
│   └── migrations/
│       └── 1700000000000-InitSchema.ts
├── ormconfig.json
├── docker-compose.yml (ROOT)
└── README.md (with migration steps)
```

### **Milestone 2: Auth Service (Weeks 3-4)**
```
services/auth-service/
├── src/
│   ├── auth.controller.ts        # POST /signup, /login, /oauth/*
│   ├── auth.service.ts
│   ├── strategies/               # Passport strategies
│   │   ├── jwt.strategy.ts
│   │   ├── local.strategy.ts
│   │   ├── google.strategy.ts
│   │   ├── facebook.strategy.ts
│   │   └── tiktok.strategy.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── dto/
│   │   ├── signup.dto.ts
│   │   ├── login.dto.ts
│   │   └── oauth.dto.ts
│   └── utils/
│       ├── bcrypt.util.ts
│       └── jwt.util.ts
├── test/
│   └── auth.controller.spec.ts
└── README.md
```

### **Milestone 3: User/Project Service (Weeks 5-6)**
```
services/user-service/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   ├── projects/
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.service.ts
│   │   │   └── dto/
│   │   │       ├── create-project.dto.ts
│   │   │       └── update-project.dto.ts
│   │   └── conversations/
│   │       ├── conversations.controller.ts
│   │       ├── conversations.service.ts
│   │       └── dto/
│   │           └── create-conversation.dto.ts
│   └── common/
│       └── decorators/
│           └── roles.decorator.ts
├── test/
│   ├── users.service.spec.ts
│   ├── projects.service.spec.ts
│   └── conversations.service.spec.ts
└── README.md
```

### **Milestone 4: API Gateway (Week 7)**
```
services/api-gateway/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts      # Proxy /auth/*
│   │   ├── projects.controller.ts  # Proxy /projects/*
│   │   └── chat.controller.ts      # Proxy /messages/*
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── error.middleware.ts
│   ├── interceptors/
│   │   └── logging.interceptor.ts
│   └── filters/
│       └── http-exception.filter.ts
├── test/
│   └── gateway.e2e-spec.ts
└── README.md
```

### **Milestone 5: Chat Orchestrator (Week 8)**
```
services/chat-orch/
├── src/
│   ├── chat.controller.ts         # POST /messages
│   ├── chat.service.ts            # Core orchestration logic
│   ├── gateway/
│   │   └── chat.gateway.ts        # WebSocket (Socket.io)
│   ├── integrations/
│   │   ├── openai.service.ts      # OpenAI API wrapper
│   │   ├── grok.service.ts
│   │   └── gemini.service.ts
│   ├── utils/
│   │   ├── context.util.ts        # Thread context retrieval from DB
│   │   ├── file-extractor.util.ts # PDF/TXT extraction
│   │   └── whisper.util.ts        # Call Python STT service
│   ├── dto/
│   │   └── send-message.dto.ts
│   └── entities/ (reference from user-service)
├── test/
│   ├── chat.service.spec.ts
│   └── integrations/openai.spec.ts
└── README.md
```

### **Milestone 6: Billing Service (Week 9)**
```
services/billing/
├── src/
│   ├── billing.controller.ts      # GET /report
│   ├── billing.service.ts         # Log & export logic
│   ├── entities/
│   │   └── billing-log.entity.ts  # Reference from user-service
│   ├── dto/
│   │   └── report-query.dto.ts
│   └── utils/
│       └── csv-export.util.ts
├── test/
│   └── billing.service.spec.ts
└── README.md
```

### **Milestone 7: Frontend Web (Weeks 10-11)**
```
frontend/web/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── projects/page.tsx          # Main dashboard
│   └── chat/[projectId]/[threadId]/page.tsx
├── components/
│   ├── ChatInput.tsx
│   ├── MessageList.tsx
│   ├── ProjectSidebar.tsx
│   ├── VoiceRecorder.tsx
│   └── AgentSelector.tsx
├── lib/
│   ├── api.ts                     # Axios with JWT
│   ├── auth.ts
│   └── hooks.ts
├── __tests__/
│   ├── components/
│   └── lib/
├── cypress/e2e/
│   ├── auth.cy.js
│   └── chat.cy.js
└── README.md
```

### **Milestone 8: Voice & File (Week 12)**
```
frontend/web/components/
├── VoiceRecorder.tsx (Web Speech API)
├── FileUploader.tsx (S3 upload)

services/chat-orch/
├── utils/
│   ├── whisper.util.ts (call Python STT)
│   └── file-extractor.util.ts (PyPDF2 for PDFs)

services/ml-training/
├── app/
│   └── services/
│       └── file_processor.py (PDF/image processing)
```

### **Milestone 9: Agent Management (Week 13)**
```
services/agent-mgr/
├── src/
│   ├── agent.controller.ts        # POST /agents, /deploy
│   ├── agent.service.ts
│   ├── docker/
│   │   └── docker.service.ts      # Docker exec wrapper
│   ├── entities/
│   │   └── agent.entity.ts (reference)
│   └── dto/
│       ├── create-agent.dto.ts
│       └── deploy-agent.dto.ts
└── test/
    ├── agent.service.spec.ts
    └── docker.service.spec.ts
```

### **Milestone 10: Billing Full + Mobile (Week 14)**
```
frontend/mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── ProjectsScreen.tsx
│   │   └── ChatScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── api/
│       └── api.ts (share with web)

services/billing/ (update)
├── src/
│   └── billing.service.ts (add conversation_id filter)
```

### **Milestone 11: Self-Hosted Deploy (Week 15)**
```
infrastructure/
├── k8s/
│   ├── deployments/ (all service deployments)
│   ├── services/
│   ├── statefulsets/ (postgres, redis)
│   └── ingress.yaml
├── terraform/
│   ├── main.tf (K8s cluster provisioning)
│   └── aws/ (or gcp/, azure/)
└── scripts/
    ├── deploy-staging.sh
    └── deploy-production.sh
```

### **Milestone 12: ML Training (Week 16)**
```
services/ml-training/
├── app/
│   ├── models/
│   │   └── trainer.py (Hugging Face fine-tune)
│   ├── utils/
│   │   ├── loaders.py (data loading)
│   │   └── docker_builder.py (build Docker image post-training)
│   └── api.py (POST /train, POST /predict)
├── tests/
│   └── test_trainer.py
└── README.md
```

---

## 🎯 SETUP COMMANDS (từ root)

```bash
# 1. Clone repo
git clone https://github.com/your-repo/ChatAI-Platform
cd ChatAI-Platform

# 2. Setup monorepo (pnpm workspaces)
pnpm install

# 3. Local dev environment
docker-compose up -d

# 4. Run migrations
cd services/user-service
pnpm run typeorm migration:run

# 5. Start backend services (from root or per service)
pnpm run dev:backend

# 6. Start frontend
cd frontend/web
pnpm run dev

# 7. Run tests
pnpm run test:all

# 8. Deploy to staging K8s
./scripts/deploy-staging.sh

# 9. Deploy to production
./scripts/deploy-production.sh
```

---

## 📝 KEY FILES TO CREATE FIRST

1. **docker-compose.yml** (root) - Local dev environment
2. **.env.example** (root) - Environment variables template
3. **package.json** (root) - Monorepo config
4. **tsconfig.base.json** - TypeScript base config
5. **services/*/package.json** - Per-service dependencies
6. **infrastructure/k8s/*.yaml** - K8s manifests
7. **docs/API-Spec-Full.yaml** - Complete OpenAPI spec

---

## 💡 MONOREPO TOOLING

- **Package Manager:** `pnpm` (faster, more efficient than npm/yarn)
- **Build Cache:** `turbo` (speed up builds)
- **Linting:** `eslint` + `prettier` (shared config in root)
- **Testing:** `jest` (per service) + `cypress` (E2E)
- **Deployment:** `docker` + `kubectl` + `terraform`

Ready for **Milestone 1 implementation** now!
