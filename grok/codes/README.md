# ChatAI-Platform

A multi-agent AI chat platform supporting web/mobile, voice/file inputs, self-hosted ML training.

## Quick Start
1. Clone repo: `git clone https://github.com/[your-username]/ChatAI-Platform.git`
2. Install deps: `pnpm install`
3. Setup env: Copy `.env.example` to `.env` and fill values
4. Run local: `docker-compose up -d` then `pnpm dev`

See /docs for full documentation.

Chào bạn! Là một lập trình viên tài ba và quản trị dự án (PM) tài năng, tôi hiểu ý bạn muốn tôi cung cấp đầy đủ tất cả các file cho `services/api-gateway` theo đúng cấu trúc bạn đưa ra, kèm hướng dẫn test chi tiết để tiết kiệm thời gian kiểm tra. Tôi sẽ viết lại toàn bộ các file, đảm bảo khớp với template, tuân thủ Coding-Conventions.md (TypeScript strict, linting), và tích hợp sẵn các middleware, filters, interceptors như yêu cầu. Sau đó, tôi sẽ cung cấp hướng dẫn test rõ ràng (local, Docker, và Jest) để bạn verify ngay. Nếu không bug, bạn confirm để tôi tiếp tục với auth-service.

### Toàn bộ files cho services/api-gateway


### Hướng dẫn test api-gateway
1. **Setup**:
   - Vào folder `services/api-gateway`: `cd services/api-gateway`.
   - Cài dependencies: `pnpm install`.
   - Copy `.env.example` thành `.env`: `cp .env.example .env`, điền `JWT_SECRET` (e.g., `mysecret`).

2. **Run local**:
   - Chạy: `pnpm dev` – expect console log "API Gateway running on port 3000".
   - Test endpoint:
     - `curl http://localhost:3000/` – expect `{"message":"API Gateway is running!"}`.
     - `curl -X POST http://localhost:3000/auth/login` – expect `{"message":"Failed to proxy to auth-service"}` (vì auth-service chưa có).
     - Tương tự cho `/projects`, `/chat/:projectId/:threadId`.

3. **Run tests**:
   - Chạy: `pnpm test` – expect Jest pass cho `app.e2e-spec.ts` (kiểm tra `/` endpoint).
   - Check linting: `pnpm lint` – fix warning nếu có với `pnpm lint --fix`.

4. **Run Docker**:
   - Build: `docker build -t api-gateway .`.
   - Run: `docker run -p 3000:3000 --env-file .env api-gateway`.
   - Test lại curl như trên.

5. **Verify middleware/filters**:
   - Rate-limit: Spam >100 requests trong 15 phút đến `/` (dùng tool như `ab -n 200 -c 10 http://localhost:3000/`), expect 429 "Too many requests".
   - Logging: Check console có log thời gian request (e.g., "Request to / took Xms").
   - Auth middleware: Gửi request với invalid JWT (`Authorization: Bearer invalidtoken`), expect 401 "Invalid token".

6. **Commit**:
   - `git add .`
   - `git commit -m "Phase 1: Complete api-gateway with full structure and tests"`

### Lý do làm thế này
- **Đúng cấu trúc**: Khớp 100% template bạn đưa ra, bao gồm controllers, middleware, filters, interceptors.
- **Test sớm**: E2E test cơ bản và curl giúp phát hiện lỗi ngay (e.g., env thiếu, port conflict).
- **Modular**: Proxy logic (httpService) chuẩn bị cho tích hợp auth-service, user-service sau này, tuân thủ API-Spec.yaml (dù placeholder).

Nếu không bug, confirm để tôi implement `auth-service`. Nếu có lỗi, mô tả chi tiết để tôi fix ngay!
