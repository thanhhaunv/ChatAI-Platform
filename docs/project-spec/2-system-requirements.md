Ok, đây là file **`2-system-requirements.md`** mình đã tổng hợp và bổ sung dựa trên SRS.md, có phân tách rõ ràng Functional/Non-Functional, thêm context diagram, integration, scalability… để bạn dùng luôn:

---

# 2. System Requirements

## 2.1 System Context

```mermaid
flowchart TB
    U[End User] -->|Web/App| GW[API Gateway]
    GW --> APP[ChatAI Platform Backend]
    APP --> DB[(Database)]
    APP --> AGENTS[AI Agents (internal/external)]
    APP --> LOG[Monitoring & Billing Service]
    APP --> AUTH[Auth Provider]

    subgraph Ext[External Systems]
        AUTH
        AGENTS
    end
```

**Mô tả:**

* Người dùng truy cập qua Web/App → API Gateway → Backend.
* Backend kết nối Database, quản lý AI Agents, log/billing, và tích hợp với dịch vụ Auth ngoài.

---

## 2.2 Functional Requirements

| ID  | Requirement                                                               |
| --- | ------------------------------------------------------------------------- |
| FR1 | Người dùng có thể đăng ký/đăng nhập qua email, OAuth (Google/GitHub/SSO). |
| FR2 | Tạo, quản lý dự án (project), thêm thành viên, phân quyền.                |
| FR3 | Tạo và quản lý hội thoại (conversations).                                 |
| FR4 | Tích hợp nhiều AI Agent (self-hosted, external API).                      |
| FR5 | Gửi/nhận tin nhắn giữa user và agent.                                     |
| FR6 | Lưu trữ log hội thoại, token usage, cost để billing.                      |
| FR7 | Dashboard hiển thị project, hội thoại, billing.                           |
| FR8 | Hệ thống cảnh báo lỗi, retry khi agent fail.                              |
| FR9 | Quản trị viên có thể bật/tắt, cấu hình agent.                             |

---

## 2.3 Non-Functional Requirements

| Category        | Requirement                                                     |
| --------------- | --------------------------------------------------------------- |
| Performance     | Hệ thống xử lý ≥ 100k requests/min, latency < 200ms trung bình. |
| Scalability     | Hỗ trợ scale ngang qua container (Docker/K8s).                  |
| Availability    | Đảm bảo uptime ≥ 99.9% (HA, auto-restart, multi-node).          |
| Security        | SSO, JWT, OAuth2, TLS 1.3, bảo mật dữ liệu PII.                 |
| Logging/Obs     | Pino/ELK + Prometheus/Grafana để quan sát.                      |
| Billing         | Tính toán token usage theo agent, project, user.                |
| Extensibility   | Module-based, dễ thêm agent mới.                                |
| Maintainability | Code theo convention, CI/CD pipeline kiểm tra lint/test.        |

---

## 2.4 Integration Requirements

* **Auth Provider**: Google, GitHub, SSO.
* **External AI APIs**: OpenAI, Grok, Claude, DeepSeek.
* **Database**: MySQL/Postgres (transaction), ClickHouse (analytics), Redis (cache).
* **Monitoring**: Prometheus, Grafana.
* **Billing**: Tích hợp Stripe (hoặc custom).

---

## 2.5 Constraints

* Yêu cầu hạ tầng hỗ trợ container (Docker/Kubernetes).
* Chi phí tính toán agent phụ thuộc usage, cần quota & cost management.
* Agent external có rate limit riêng (OpenAI, Claude).

---

## 2.6 Risks

* Vendor lock-in nếu phụ thuộc vào 1 provider duy nhất.
* Overload khi usage tăng đột biến.
* Data privacy khi dùng external AI API.

---
