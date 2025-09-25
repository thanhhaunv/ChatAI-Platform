
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
