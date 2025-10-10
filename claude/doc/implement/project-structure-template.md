ChatAI-Platform/
│
├── 📂 .github/
│   └── workflows/
│       ├── test-backend.yaml      # CI pipeline: build, test, lint
│       ├── test-frontend.yaml     # Frontend tests + build
│       └── deploy.yaml            # Auto deploy on merge
│
├── 📂 .husky/
│   ├── pre-commit                 # Run lint-staged + tests
│   ├── commit-msg                 # Validate commit message format
│   └── pre-push                   # Run tests before push
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
│   │   ├── jest.config.js         # Jest config (with coverage >80%)
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
│       │   ├── components/        # Reusable
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
│   │   │   │   └── user.entity.ts # TypeORM entity
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
│   │   │   ├── entities/          # TypeORM entities
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── project.entity.ts
│   │   │   │   ├── project-member.entity.ts
│   │   │   │   ├── conversation.entity.ts
│   │   │   │   ├── message.entity.ts
│   │   │   │   └── agent.entity.ts
│   │   │   ├── migrations/        # TypeORM migrations
│   │   │   │   ├── 1700000000000-InitSchema.ts
│   │   │   │   └── ...
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
│   │   ├── ormconfig.json         # TypeORM config
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
│   │   │   ├── gateway/           # WebSocket gateway
│   │   │   │   └── chat.gateway.ts
│   │   │   ├── integrations/      # External API calls
│   │   │   │   ├── openai.service.ts
│   │   │   │   ├── grok.service.ts
│   │   │   │   └── gemini.service.ts
│   │   │   ├── utils/
│   │   │   │   ├── context.util.ts      # Thread context retrieval
│   │   │   │   ├── file-extractor.util.ts
│   │   │   │   └── whisper.util.ts
│   │   │   ├── dto/
│   │   │   │   └── send-message.dto.ts
│   │   │   └── entities/
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
│   │   │   ├── docker/
│   │   │   │   └── docker.service.ts
│   │   │   ├── kubernetes/
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
│   ├── 📂 notification-service/   # NestJS Notification Service (NEW)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── notification.module.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── gateway/           # WebSocket for realtime notifications
│   │   │   │   └── notification.gateway.ts
│   │   │   ├── providers/         # Multiple notification channels
│   │   │   │   ├── email.provider.ts
│   │   │   │   ├── push.provider.ts
│   │   │   │   └── websocket.provider.ts
│   │   │   ├── dto/
│   │   │   │   └── send-notification.dto.ts
│   │   │   └── entities/
│   │   │       └── notification.entity.ts
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
│   │   │   ├── billing.controller.ts
│   │   │   ├── billing.service.ts
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
│       ├── main.py
│       ├── app/
│       │   ├── routers/
│       │   │   ├── train.py
│       │   │   └── predict.py
│       │   ├── models/
│       │   │   └── trainer.py
│       │   ├── utils/
│       │   │   ├── loaders.py
│       │   │   ├── evaluator.py
│       │   │   └── docker_builder.py
│       │   └── config/
│       │       └── config.py
│       ├── tests/
│       ├── Dockerfile
│       ├── .env.example
│       ├── requirements.txt
│       ├── README.md
│       └── pytest.ini
│
├── 📂 packages/                   # Shared libraries
│   └── 📂 shared/
│       ├── src/
│       │   ├── entities/
│       │   ├── dto/
│       │   └── utils/
│       ├── tsconfig.json
│       ├── package.json
│       └── README.md
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
│   │   │   ├── notification-service-deployment.yaml
│   │   │   ├── billing-deployment.yaml
│   │   │   ├── ml-training-deployment.yaml
│   │   │   ├── postgres-statefulset.yaml
│   │   │   └── redis-deployment.yaml
│   │   ├── services/
│   │   │   ├── api-gateway-service.yaml
│   │   │   ├── postgres-service.yaml
│   │   │   └── ...
│   │   ├── configmaps/
│   │   │   └── app-config.yaml
│   │   ├── secrets/
│   │   │   └── app-secrets.yaml
│   │   ├── ingress.yaml
│   │   ├── rbac.yaml
│   │   ├── pvc.yaml
│   │   └── 📂 helm/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   │
│   ├── 📂 terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── vpc.tf
│   │   ├── backend.tf
│   │   └── 📂 modules/
│   │       ├── aws/
│   │       │   └── main.tf
│   │       └── gcp/
│   │           └── main.tf
│   │
│   ├── 📂 docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── docker-compose.yml
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
├── 📂 docs/
│   ├── BRD.md
│   ├── SRS.md
│   ├── API-Spec.yaml
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
│   ├── 📂 adr/
│   │   ├── 0001-use-nestjs.md
│   │   ├── 0002-threading-strategy.md
│   │   └── 0003-k8s-deployment.md
│   │
│   ├── 📂 guides/
│   │   ├── Quick-Start.md
│   │   ├── Development-Setup.md
│   │   └── Deployment-Guide.md
│   │
│   └── 📂 api/
│       ├── auth.openapi.yaml
│       ├── users.openapi.yaml
│       ├── chat.openapi.yaml
│       ├── agents.openapi.yaml
│       └── billing.openapi.yaml
│
├── 📂 tests/
│   ├── 📂 e2e/
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
│   ├── 📂 integration/
│   │   ├── auth-signup.postman_collection.json
│   │   ├── chat-flow.postman_collection.json
│   │   ├── billing-report.postman_collection.json
│   │   └── seeds/
│   │       ├── users-seed.json
│   │       ├── projects-seed.json
│   │       └── messages-seed.json
│   │
│   ├── 📂 load/
│   │   ├── chat-load.yaml
│   │   ├── auth-load.yaml
│   │   └── artillery.config.yaml
│   │
│   ├── 📂 security/
│   │   ├── owasp-config.yaml
│   │   └── vulnerability-scan.sh
│   │
│   └── README.md
│
├── 📂 scripts/
│   ├── seed-db.js
│   ├── migrate.sh
│   ├── build-all.sh
│   ├── deploy-local.sh
│   ├── deploy-staging.sh
│   └── health-check.sh
│
├── 📂 .vscode/
│   ├── settings.json
│   ├── launch.json
│   └── extensions.json
│
├── .gitignore
├── .editorconfig
├── docker-compose.yml
├── .env.example
├── .env.production
│
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── turbo.json
├── README.md
├── CONTRIBUTING.md
└── LICENSE
