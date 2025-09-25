# ChatAI-Platform
Nền tảng chat AI đa agent với web/app, hỗ trợ text/voice/file.

# Cấu trúc dự án
/docs                # Nơi lưu tất cả tài liệu dự án
/frontend
  /web (nextjs)      # Code frontend web sau này
  /mobile (rn)       # Code app mobile sau này
/services            # Code backend microservices
  /api-gateway
  /auth-service
  /user-service
  /chat-orch
  /agent-mgr
  /ml-training
  /billing
/infrastructure      # Config infra
  /k8s
  /terraform
/tests               # Test cases
