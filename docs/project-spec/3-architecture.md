# `project-spec/3-architecture.md`

# 3. Architecture

## 3.1 Mục đích
Tài liệu này mô tả kiến trúc tổng thể của hệ thống **ChatAI-Platform**.  
Nó cung cấp góc nhìn từ cao xuống thấp: Context, Components, Deployment, Technology Stack.  
Mục tiêu là giúp tất cả stakeholders (PM, Dev, QA, DevOps) hiểu cách các phần của hệ thống kết nối và tương tác.

---

## 3.2 System Context Diagram

Sơ đồ context mô tả hệ thống ChatAI-Platform tương tác với các actor bên ngoài (Users, Admins, External AI Services, Payment Gateway…).

```mermaid
graph LR
    subgraph External Actors
        U[User (Web/App)]
        A[Admin Portal]
        E[External AI APIs\n(OpenAI, Grok...)]
        P[Payment/Billing Gateway]
    end

    subgraph ChatAI Platform
        FE[Frontend Web/App]
        BE[Backend API Gateway]
        S1[User Service]
        S2[Project Service]
        S3[Conversation Service]
        S4[Agent Manager]
        DB[(PostgreSQL DB)]
        MQ[(Message Queue / Kafka)]
        LOGS[(Monitoring & Logging)]
    end

    U --> FE
    A --> FE
    FE --> BE
    BE --> S1
    BE --> S2
    BE --> S3
    S3 --> S4
    S4 --> E
    BE --> DB
    BE --> MQ
    MQ --> S3
    BE --> P
    BE --> LOGS

---

## 3.3 High-Level Architecture (Component View)

Chi tiết các thành phần chính trong ChatAI-Platform:

* **Frontend (React/Next.js)**: UI cho Users & Admins.
* **Backend API Gateway (NestJS)**: Entry point; AuthN/AuthZ; Routing đến microservices.
* **User Service**: Quản lý users, profiles, billing accounts.
* **Project Service**: Quản lý projects, memberships.
* **Conversation Service**: Quản lý conversations, messages, attachments.
* **Agent Manager**: Kết nối external AI APIs hoặc self-hosted models, handle token usage.
* **Database (PostgreSQL)**: Lưu trữ tất cả dữ liệu transactional.
* **Message Queue (Kafka/RabbitMQ)**: Xử lý message async (nếu cần scale).
* **Monitoring & Logging (Prometheus/Grafana/ELK)**: Theo dõi health, logs.
* **CI/CD Pipeline (GitHub Actions)**: Tự động hóa build/test/deploy.

---

## 3.4 Deployment View

Sơ đồ triển khai (có thể dùng cho staging/production):

```mermaid
graph TB
    subgraph Cloud/On-prem Cluster
        LB[Load Balancer/Ingress]
        FE[Frontend Container]
        API[API Gateway Container]
        US[User Service Container]
        PS[Project Service Container]
        CS[Conversation Service Container]
        AM[Agent Manager Container]
        DB[(PostgreSQL Cluster)]
        MQ[(Kafka/RabbitMQ)]
        MON[(Prometheus/Grafana)]
    end

    LB --> FE
    FE --> API
    API --> US
    API --> PS
    API --> CS
    CS --> AM
    API --> DB
    API --> MQ
    MQ --> CS
    API --> MON
```

**Ghi chú:**

* Production dùng Kubernetes (K8s) hoặc Docker Compose multi-service.
* Database có replication; message queue có cluster mode.
* Monitoring có alert rules.

---

## 3.5 Technology Stack Reference

| Layer          | Technology (Current)                     | Notes                           |
| -------------- | ---------------------------------------- | ------------------------------- |
| Frontend       | React / Next.js / Tailwind CSS           | Responsive UI.                  |
| Backend        | NestJS (Node.js v18), TypeORM/Prisma     | REST/GraphQL API.               |
| Database       | PostgreSQL 15-alpine                     | Transactional data store.       |
| Message Queue  | Kafka / RabbitMQ (optional scaling)      | Async processing.               |
| AI Integration | OpenAI API, Grok API, Self-hosted models | Configurable agent connectors.  |
| CI/CD          | GitHub Actions                           | Pipeline test/migration/deploy. |
| Monitoring     | Prometheus + Grafana, ELK                | Logs & Metrics.                 |
| Infrastructure | Docker / K8s                             | Local dev & Production deploy.  |

---

## 3.6 Non-Functional Requirements Alignment

* **Scalability**: Microservice-ready; can scale horizontally.
* **Security**: JWT-based Auth, HTTPS, Secrets in env variables.
* **Observability**: Logs + Metrics + Alerts.
* **Extensibility**: Agent Manager plugin architecture.

---

## 3.7 Deliverables

* Mermaid diagrams: System Context, High-Level, Deployment.
* Updated README với link sang các diagram.
* Template này có thể reuse cho project khác: chỉ cần sửa tên services + tech stack.

```

---

📌 Bản này đủ “enterprise” và **AI agent nào nhìn vào cũng biết phải làm gì** 😎.  
Bạn muốn mình tiếp tục file **`4-data-model/ERD.md`** (phần ERD mermaid chi tiết bạn từng gửi) không?
```
