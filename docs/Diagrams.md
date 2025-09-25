
# 3) Use Case Diagram (Mermaid) — (BA / PO)

```mermaid
%%{init: {"themeVariables": {"actorTextColor":"#111"}}}%%
sequenceDiagram
note over Client, PM: (Use Case visual is shown in sequenceDiagram for compactness, with added threading)
participant Client as "End User"
participant Auth as "Auth Service"
participant WebApp as "Web/App UI"
participant ChatSvc as "Chat Service"
participant AgentMgr as "Agent Management"
participant Billing as "Billing/Reporting"
participant Admin as "Admin Console"

Client->>WebApp: Sign up / Login (OAuth / Email)
WebApp->>Auth: Authenticate
Client->>WebApp: Create Project / Invite Members
WebApp->>ChatSvc: Create Thread in Project
ChatSvc->>ChatSvc: Generate thread_id
Client->>WebApp: Start Chat (select Agent, send message with thread_id)
ChatSvc->>AgentMgr: Resolve Agent (local or external, with context from thread)
AgentMgr->>ChatSvc: Return agent endpoint
ChatSvc->>AgentMgr: If self-hosted -> manage container
ChatSvc->>Billing: Log token usage
Admin->>AgentMgr: Add/Edit/Delete Agent
Admin->>AgentMgr: Train Self-Build Agent
Billing->>Admin: Reports & CSV export
```

> lưu ý: trên thực tế Use Case thường là diagram UML; ở đây mình biểu diễn tương tác chính. Nếu bạn muốn file PlantUML/UseCase cụ thể mình xuất tiếp.

---

# 4) Context Diagram / System Boundary (Mermaid flowchart) — (System Analyst)

```mermaid
flowchart LR
    subgraph External
        U[User (Web/App)]
        OAuth[OAuth Providers (G, FB, TikTok)]
        ExtAI[External AI APIs (OpenAI, Grok, Gemini)]
        StorageSVC[File Storage (S3)]
        MLRepo[ML Repos (Hugging Face)]
    end

    subgraph System["ChatAI Platform"]
        Web[Web / Mobile Frontend]
        Auth[Auth Service]
        API[API Gateway / Backend]
        Chat[Chat Service / Orchestrator]
        AgentMgr[Agent Management Service]
        MLTrain[ML Training Service]
        DB[(Primary DB)]
        Billing[Billing & Reporting]
        DevOps[Deployment Manager (Docker)]
    end

    U --> Web
    Web --> API
    API --> Auth
    API --> Chat
    Chat --> AgentMgr
    AgentMgr --> DevOps
    AgentMgr --> ExtAI
    AgentMgr --> MLTrain
    MLTrain --> MLRepo
    API --> DB
    Chat --> StorageSVC
    Billing --> DB
    OAuth --> Auth
```

---

# 5) Activity / Workflow Diagram: “User Chat Flow” (Mermaid) — (BA/System Analyst)

```mermaid
flowchart TD
    A[User chọn Project] --> B[Chọn Agent]
    B --> C{Agent là self-hosted?}
    C -->|Yes| D[Test connection -> Deploy container nếu cần]
    C -->|No| E[Call external AI API]
    D --> F[Retrieve context from thread_id]
    E --> F
    F --> G[Send user message + context (files + thread history)]
    G --> H[Agent trả kết quả]
    H --> I[Save conversation to DB & index for search (with thread_id)]
    I --> J[Update billing & token usage]
    J --> K[Show response & options to user]
```

---

# 6) Sequence Diagram: “Send Message -> Agent -> Response” (Mermaid) — (System Analyst)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API_GW as "API Gateway"
    participant ChatOrch as "Chat Orchestrator"
    participant Agent as "Agent (Local/Remote)"
    participant DB
    participant Billing

    User->>Frontend: Send message + files (with thread_id)
    Frontend->>API_GW: POST /projects/{id}/conversations/{thread_id}/messages
    API_GW->>ChatOrch: enqueue request / sync
    ChatOrch->>DB: Retrieve context from thread_id
    ChatOrch->>Agent: resolve & send (context + message)
    Agent-->>ChatOrch: response
    ChatOrch->>DB: save message + response (associate with thread_id)
    ChatOrch->>Billing: record token/usage
    ChatOrch-->>API_GW: return response
    API_GW-->>Frontend: response
    Frontend-->>User: show response
```

---

# 7) ERD sơ bộ (Mermaid ER) — (DBA / Data Engineer)

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email
        string phone
        string auth_provider
        string role
        datetime created_at
    }
    PROJECTS {
        int id PK
        string name
        int owner_id FK
        datetime created_at
    }
    PROJECT_MEMBERS {
        int id PK
        int project_id FK
        int user_id FK
        string role
    }
    CONVERSATIONS {
        int id PK
        int project_id FK
        string title
        json metadata
        datetime created_at
    }
    AGENTS {
        int id PK
        string name
        string type  "external|self-hosted"
        string api_endpoint
        string config_json
        string model_source
        json training_config
        string version
        bool active
    }
    MESSAGES {
        int id PK
        int conversation_id FK
        int user_id FK
        int agent_id FK
        text user_message
        text agent_response
        json attachments
        float tokens_used
        datetime created_at
    }
    BILLING_LOG {
        int id PK
        int user_id FK
        int project_id FK
        int conversation_id FK
        int agent_id FK
        float cost
        float tokens
        datetime timestamp
    }

    USERS ||--o{ PROJECTS : owns
    PROJECTS ||--o{ PROJECT_MEMBERS : has
    USERS ||--o{ PROJECT_MEMBERS : member
    PROJECTS ||--o{ CONVERSATIONS : contains
    CONVERSATIONS ||--o{ MESSAGES : contains
    AGENTS ||--o{ MESSAGES : used_by
    USERS ||--o{ MESSAGES : author
    MESSAGES ||--o{ BILLING_LOG : generates
```

---

# 8) Component Diagram (Mermaid) — (Architect)

```mermaid
graph LR
    subgraph Frontend
        NextJS[Next.js Web/App]
        Mobile[Mobile App (React Native)]
    end

    subgraph Backend
        API[API Gateway]
        Auth[Auth Service]
        UserSvc[User & Project Service]
        ChatOrch[Chat Orchestrator]
        AgentMgr[Agent Management Service]
        MLTrain[ML Training Service (Python)]
        Billing[Reporting & Billing]
        FileSvc[File Service]
        DB[(Postgres)]
    end

    subgraph Infra
        Kubernetes[Kubernetes Cluster]
        Registry[Docker Registry]
        S3[S3 Compatible Storage]
        Redis[Redis Cache]
        Prometheus[Prometheus + Grafana]
    end

    NextJS --> API
    Mobile --> API
    API --> Auth
    API --> UserSvc
    API --> ChatOrch
    ChatOrch --> AgentMgr
    AgentMgr --> Registry
    AgentMgr --> Kubernetes
    AgentMgr --> MLTrain
    ChatOrch --> Redis
    ChatOrch --> FileSvc
    All[UserSvc,Billing,AgentMgr] --> DB
    Infra --> Prometheus
```

---

# 9) Deployment Diagram (Mermaid) — (DevOps)

```mermaid
flowchart LR
    subgraph Cloud
        AKS[K8s Cluster / EKS / GKE]
        LoadBalancer[LB / Ingress]
        ContainerRegistry[Docker Registry]
        ObjectStore[S3]
        GPUNodes[GPU Nodes for Training (Optional)]
    end

    User -->|HTTPS| LoadBalancer
    LoadBalancer --> API_GW_Pod[API Gateway Pod (K8s)]
    API_GW_Pod --> Auth_Pod
    API_GW_Pod --> Web_Pod
    API_GW_Pod --> ChatOrch_Pod
    ChatOrch_Pod --> AgentPod[Agent Containers (self-hosted) on Node]
    ChatOrch_Pod --> MLTrain_Pod[ML Training Pod]
    MLTrain_Pod --> GPUNodes
    AllPods --> Postgres_Pod
    FileUploads --> ObjectStore
    Metrics --> Prometheus
```
