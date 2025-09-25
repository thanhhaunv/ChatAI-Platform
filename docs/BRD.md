# 1) BRD (Tóm tắt Business Requirement) — (BA / PO)

**Mục tiêu:** Xây dựng nền tảng chat AI (Web + Mobile app) cho phép người dùng chat với nhiều AI agent (GPT, Grok, Gemini, và các agent tự build), hỗ trợ text/voice/upload file, quản lý agent, thống kê chi phí/token, và mở rộng bằng microservices. Hỗ trợ quản lý context cuộc hội thoại qua threads để AI trace và maintain lịch sử chat.

**Stakeholders chính:** Client / Product Owner / Developers / DevOps / Data Science / Legal (privacy) / Finance (billing)

**High-level requirements:**

* Hỗ trợ đăng ký/đăng nhập (Google, Facebook, TikTok, Email/Phone).
* Giao diện chat (web + app) chọn agent, text + voice input, upload file (pdf/txt/images) để tham chiếu, hỗ trợ threads để lưu và trace cuộc hội thoại.
* Quản trị: CRUD AI Agents; hiển thị phiên bản; cấu hình credential (API keys), cấu hình Docker image cho self-hosted agents; hỗ trợ tự train models opensource.
* Billing & Reporting: thống kê token/chi phí theo thời gian, filter theo project/user/agent/conversation.
* Multi-tenant projects: user có thể tạo Project, lưu lịch sử chat theo threads, share permission.
* Hệ thống mở: deploy self-hosted agents bằng Docker; orchestration cơ bản; ML pipeline cho training agents (sử dụng Hugging Face hoặc tương tự).
* Non-functional: scalable (microservices), secure (auth + encryption), observable (logs/metrics), CI/CD pipeline; data privacy (GDPR-like cho voice/files); performance cho voice (transcription accuracy >90%).

---
