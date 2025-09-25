
# 2) SRS ngắn & User Stories (BA / PO)

## A. User Stories (priority-high)

1. **US-001:** Đăng ký/Đăng nhập bằng Google/Facebook/TikTok/Email/Phone

   * Acceptance: user có thể tạo account; email/phone verify; OAuth flow hoạt động.

2. **US-002:** Chat với AI (text) — chọn Agent

   * Acceptance: user chọn agent; gửi message; nhận response < 5s (sử dụng cached/async nếu cần); hỗ trợ context từ threads.

3. **US-003:** Voice input & TTS output

   * Acceptance: user record voice -> transcription chính xác cơ bản (sử dụng Web Speech API hoặc Whisper); AI trả text và TTS phát lại; tích hợp với threads.

4. **US-004:** Upload file (pdf/txt/image) để context cho chat

   * Acceptance: file được lưu; agent có thể truy vấn nội dung file; attach vào threads.

5. **US-005:** Tạo / quản lý Project (multi-user)

   * Acceptance: tạo project, invite user, phân quyền (owner/member/viewer).

6. **US-006:** Quản lý AI Agents (Admin/Owner) — Add/Edit/Delete, set API keys, add Docker image for self-hosted

   * Acceptance: admin thêm agent; agent hiển thị phiên bản; test connection pass/fail.

7. **US-007:** Thống kê token/cost theo user/project/agent trong khoảng thời gian

   * Acceptance: export CSV, filter by date range, bao gồm per conversation/thread.

8. **US-008:** Self-hosted agent deploy (developer flow) via Docker image - start/stop basic

   * Acceptance: deploy container, register agent metadata, healthcheck.

9. **US-009:** Quản lý conversation threads trong project

   * Acceptance: User có thể tạo/mở thread mới trong project; messages được nhóm theo thread_id; AI duy trì context qua thread (e.g., gửi thread_id khi call API external); lịch sử chat hiển thị theo thread; hỗ trợ search/index threads.

10. **US-010:** Tạo và train AI agent tự build

    * Acceptance: Admin upload model opensource (e.g., từ Hugging Face); config training params (e.g., dataset, epochs); sử dụng Docker để deploy model đã train; AI suggest config (e.g., integrate với một AI khác để gợi ý params dựa trên yêu cầu).

## B. Non-functional (examples)

* Auth: OAuth2 + JWT; tokens expire 1 hour; refresh token support.
* Scale: handle 10k concurrent users, horizontal scale for microservices.
* Latency: median response < 2s for cached agents, < 10s for remote API calls.
* Security: encrypt API keys at rest; TLS in transit; RBAC.
* Observability: metrics + logs + traces; dashboard Grafana.
* Accessibility: hỗ trợ voice cho người khuyết tật; i18n (đa ngôn ngữ).
