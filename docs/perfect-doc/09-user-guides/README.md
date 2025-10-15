# 📖 09-user-guides - Hướng dẫn Sử dụng

> **Mục đích:** Tài liệu hướng dẫn end-users sử dụng hệ thống  
> **Người phụ trách:** Technical Writer / Product Manager  
> **Timeline:** Phase 4 (Week 21), update liên tục post-launch

---

## 📝 DANH SÁCH FILES (3 files)

| # | File | Owner | Time | Priority | Audience |
|---|------|-------|------|----------|----------|
| 1 | 01-User-Manual.md | Tech Writer | 5-7 days | 🔴 Critical | End Users (All roles) |
| 2 | 02-Admin-Guide.md | Tech Writer + PM | 3-4 days | 🟠 High | Admins only |
| 3 | 03-FAQ.md | Tech Writer | 2-3 days | 🟠 High | All Users |

**Total:** 10-14 days (Week 21 + ongoing updates)

---

## 📋 CHI TIẾT FILES

### **File 1: 01-User-Manual.md** ⏳ TO DO
**Nội dung:** Complete guide cho end users

**Sections bắt buộc:**
1. Introduction
   - Welcome message
   - What is ChatAI Platform?
   - Who should use this guide?
   - How to use this manual (navigation, search)
   - Getting help (support channels)
2. Getting Started (Quick Start Guide)
   
   **2.1 Account Setup (5 minutes)**
   - Step 1: Go to https://chatai.com
   - Step 2: Click "Get Started" or "Sign Up"
   - Step 3: Choose signup method:
     - Option A: Sign up with Google (recommended)
     - Option B: Sign up with Facebook
     - Option C: Sign up with TikTok
     - Option D: Sign up with Email/Phone
   - Step 4: Complete profile (name, optional photo)
   - Step 5: You're ready! → Dashboard
   
   **Screenshots:** Each step with annotated screenshot
   
   **2.2 Your First Chat (2 minutes)**
   - Step 1: Click "New Conversation" button
   - Step 2: Select an AI agent (e.g., GPT-4)
   - Step 3: Type your message: "Hello, introduce yourself"
   - Step 4: Press Enter or click Send
   - Step 5: Watch the AI respond in real-time
   - Congrats! You've sent your first message 🎉
   
   **2.3 Create Your First Project (3 minutes)**
   - Step 1: Click "New Project" from dashboard
   - Step 2: Enter project name (e.g., "Work Stuff")
   - Step 3: Click "Create"
   - Step 4: (Optional) Invite teammates by email
   - Step 5: Start chatting in your project

3. Core Features Guide
   
   **3.1 Authentication & Login**
   - How to log in (email/password, OAuth)
   - How to reset password
   - How to enable two-factor authentication (if available)
   - How to log out
   - Troubleshooting: Can't log in? (forgot password, account locked)
   
   **3.2 Dashboard Overview**
   - What you see on the dashboard:
     - Recent conversations (quick access)
     - Projects list (your projects + shared projects)
     - Quick actions (New Project, New Chat)
     - Search bar (find conversations, projects)
   - Navigation: Sidebar (Projects, Billing, Settings, Help)
   - Notifications: Bell icon (new messages, invites)
   
   **3.3 Projects Management**
   - **Creating a project:**
     1. Click "+ New Project"
     2. Enter name (e.g., "Marketing Team")
     3. (Optional) Add description
     4. Click "Create"
   - **Inviting members:**
     1. Open project
     2. Go to "Members" tab
     3. Click "Invite"
     4. Enter email address
     5. Select role: Owner / Editor / Viewer
     6. Click "Send Invite"
   - **Roles explained:**
     - Owner: Full control (delete project, manage members)
     - Editor: Can chat, create threads, invite members
     - Viewer: Read-only (view conversations, can't send messages)
   - **Managing members:**
     - Change role: Click dropdown next to member name
     - Remove member: Click "Remove" button
   - **Leaving a project:**
     - Go to Project Settings → "Leave Project" (you'll lose access)
   
   **3.4 Chat Interface**
   - **Starting a conversation:**
     - From project: Click "New Conversation"
     - Enter title (optional, auto-generated if empty)
     - Select AI agent (dropdown)
   - **Sending messages:**
     - Text: Type in input box, press Enter or click Send
     - Multiline: Press Shift+Enter for new line
     - Formatting: Markdown supported (bold, italic, code blocks)
   - **Understanding responses:**
     - Streaming: AI types in real-time (like ChatGPT)
     - Token usage: Shown below message (e.g., "150 tokens")
     - Copy response: Hover, click copy icon
   - **Context & Threads:**
     - Each conversation is a "thread"
     - AI remembers previous messages in the thread
     - Thread context maintained across sessions
   - **Switching agents mid-conversation:**
     - Click agent name at top
     - Select different agent (warning: context may be lost)
   
   **3.5 Voice Input (Speech-to-Text)**
   - **Prerequisites:** Allow microphone access (browser will prompt)
   - **How to use:**
     1. Click microphone icon in chat input
     2. Modal opens, click "Start Recording"
     3. Speak your message clearly
     4. Click "Stop" when done
     5. Wait for transcription (2-5 seconds)
     6. Review text (edit if needed)
     7. Click "Send"
   - **Tips for better accuracy:**
     - Speak clearly, not too fast
     - Minimize background noise
     - Use short sentences (easier to transcribe)
   - **Language support:** English (default), Vietnamese (if enabled)
   - **Troubleshooting:**
     - "Mic not working": Check browser permissions (chrome://settings/content/microphone)
     - "Transcription failed": Try again, or type manually
   
   **3.6 Voice Output (Text-to-Speech)**
   - **How to use:**
     1. AI sends response (text)
     2. Click speaker icon below message
     3. Audio plays (synthetic voice)
     4. Click pause to stop
   - **Use cases:** Accessibility (visually impaired), multitasking (listen while working)
   
   **3.7 File Upload**
   - **Supported file types:**
     - Documents: PDF (.pdf), Text (.txt), Word (.docx)
     - Images: JPEG (.jpg), PNG (.png), GIF (.gif)
   - **File size limit:** 10MB per file
   - **How to upload:**
     1. Click paperclip icon in chat input
     2. Select file from computer (or drag & drop)
     3. File preview appears
     4. (Optional) Remove if wrong file
     5. Click "Upload"
     6. Wait for processing (text extraction for PDFs)
     7. Type your message: "Summarize this document"
     8. AI responds using file content as context
   - **What happens to uploaded files?**
     - Stored securely (encrypted)
     - Attached to conversation (visible in thread)
     - Text extracted (for PDFs/docs) to help AI understand
     - Accessible to all project members
   - **Troubleshooting:**
     - "File too large": Compress or split file
     - "Unsupported format": Convert to PDF or TXT
     - "Upload failed": Check internet connection, retry
   
   **3.8 Conversation Threads Management**
   - **Viewing threads:**
     - Sidebar: List of all threads in project
     - Click thread to open
     - Preview: Last message snippet
   - **Creating threads:**
     - Click "+ New Conversation"
     - Auto-saved as you chat
   - **Renaming threads:**
     - Click thread name (inline edit)
     - Type new name, press Enter
   - **Archiving threads:**
     - Right-click thread → "Archive"
     - Archived threads hidden (access via "Show Archived")
   - **Deleting threads:**
     - Right-click thread → "Delete" (Owner/Editor only)
     - Confirmation required (permanent action)
   - **Searching threads:**
     - Search bar at top of sidebar
     - Type keyword (searches titles & messages)
     - Results filter in real-time

4. Advanced Features
   
   **4.1 Agent Selection**
   - **Available agents:**
     - GPT-4 (OpenAI): Best for general tasks, coding
     - Gemini (Google): Best for research, long context
     - Grok (xAI): Fast, conversational
     - Custom agents: Deployed by your admin (company-specific)
   - **How to choose?**
     - GPT-4: Default, most versatile
     - Gemini: Need to process long documents (100K+ tokens)
     - Custom: Ask admin for recommendations
   - **Switching agents:**
     - During conversation: Click agent name, select new one
     - Warning: Context may not transfer (agent-specific)
   
   **4.2 Billing & Usage Tracking**
   - **Viewing your usage:**
     1. Click "Billing" in sidebar
     2. Dashboard shows:
        - Total tokens used (this month)
        - Cost breakdown by agent
        - Usage over time (chart)
     3. Filter by date range (last 7 days, 30 days, custom)
   - **Understanding costs:**
     - Each message costs tokens (input + output)
     - Different agents have different rates (e.g., GPT-4 more expensive than Gemini)
     - Your admin sets billing policy (free tier, paid tier)
   - **Exporting reports:**
     - Click "Export CSV"
     - File downloads with detailed usage (date, agent, tokens, cost)
   - **Questions?** Contact your admin or finance team
   
   **4.3 Notifications**
   - **Types of notifications:**
     - New message in shared conversation
     - Invited to project
     - Mentioned in message (@username)
     - System updates
   - **How to view:**
     - Bell icon at top (red dot if unread)
     - Click to see list
   - **Settings:**
     - Go to Settings → Notifications
     - Toggle: Email notifications, Push notifications (mobile)
     - Choose frequency: Instant, Daily digest, Off

5. Mobile App Guide
   - **Download:**
     - iOS: App Store (search "ChatAI Platform")
     - Android: Google Play Store
   - **Login:** Same credentials as web
   - **Navigation:** Bottom tabs (Home, Projects, Chat, Profile)
   - **Features:** All web features available (chat, voice, file upload)
   - **Offline mode:** Conversations cached (read-only when offline)
   - **Push notifications:** Enable in Settings for instant alerts

6. Settings & Preferences
   - **Account Settings:**
     - Profile: Edit name, email, phone, photo
     - Password: Change password (if using email/phone signup)
     - Connected accounts: Link/unlink Google, Facebook, TikTok
   - **Notification Preferences:**
     - Email: Toggle on/off for different events
     - Push: Enable for mobile app
   - **Privacy:**
     - Data export: Download all your data (JSON file)
     - Delete account: Permanent deletion (30-day grace period)
   - **Language:**
     - Choose: English, Tiếng Việt (if available)

7. Tips & Best Practices
   - **For better AI responses:**
     - Be specific: "Write a Python script to sort a list" (not "help me code")
     - Provide context: Paste code snippets, describe your goal
     - Iterate: Refine your prompt if first response isn't perfect
   - **For team collaboration:**
     - Use descriptive project names
     - Invite relevant teammates only (keep it focused)
     - Rename threads for easy searching later
   - **For cost optimization:**
     - Choose cheaper agents for simple tasks (Gemini vs GPT-4)
     - Avoid very long prompts (token usage adds up)
     - Archive old threads (reduce clutter, not cost)

8. Troubleshooting Common Issues
   
   | Issue | Solution |
   |-------|----------|
   | Can't log in | Reset password, check email for verification link |
   | AI response slow | Check internet connection, agent may be busy (retry) |
   | Mic not working | Browser permissions, allow microphone access |
   | File upload fails | Check file size (<10MB), format (PDF/TXT/image) |
   | Thread not loading | Refresh page, clear browser cache |
   | Mobile app crashes | Update to latest version, reinstall if needed |
   | Billing shows wrong data | Wait 24h for data sync, contact support if persists |

9. Keyboard Shortcuts (Web)
   
   | Shortcut | Action |
   |----------|--------|
   | Ctrl+K (Cmd+K on Mac) | Quick search (projects, threads) |
   | Ctrl+N (Cmd+N) | New conversation |
   | Ctrl+Enter (Cmd+Enter) | Send message |
   | Shift+Enter | New line in message |
   | Esc | Close modal |
   | / | Focus search bar |

10. Getting Help
    - **In-app help:** Click "?" icon → Help Center
    - **Email support:** support@chatai.com (response within 24h)
    - **Community forum:** https://community.chatai.com
    - **Live chat:** Bottom-right widget (business hours only)
    - **Video tutorials:** https://chatai.com/tutorials

11. Glossary
    - **Agent:** AI model that responds to your messages (e.g., GPT-4, Gemini)
    - **Thread:** A conversation with context (all messages remembered)
    - **Project:** Collection of threads, shareable with teammates
    - **Token:** Unit of text processed by AI (roughly 4 chars = 1 token)
    - **STT:** Speech-to-Text (voice → text)
    - **TTS:** Text-to-Speech (text → voice)
    - **Context:** Previous messages in a thread (helps AI understand)

**Deliverables:**
- [ ] User Manual (50-70 pages)
- [ ] 100+ screenshots (annotated with arrows, numbers)
- [ ] Video tutorials (5-10 videos, 2-5 mins each)
- [ ] Searchable help center (web version)
- [ ] PDF export (offline reading)

**Checklist:**
- [ ] 11 sections complete (Intro → Glossary)
- [ ] Quick Start Guide (<10 mins to value)
- [ ] All features documented (auth, chat, voice, file, billing, etc.)
- [ ] Screenshots for every step
- [ ] Troubleshooting section with common issues
- [ ] Keyboard shortcuts listed
- [ ] Glossary with 20+ terms
- [ ] Reviewed by PO + beta users
- [ ] Published to Help Center (public URL)
- [ ] PDF version available for download

**Status:** ⏳ To Do (Week 21, Phase 4)

---

### **File 2: 02-Admin-Guide.md** ⏳ TO DO
**Nội dung:** Guide for admins (advanced features)

**Sections bắt buộc:**
1. Introduction
   - Who is an admin?
   - Admin responsibilities
   - Permissions: What admins can do (vs regular users)
2. Admin Dashboard Overview
   - Access: Click "Admin Panel" in sidebar (admins only)
   - Sections: Users, Agents, Billing, Settings, Logs
3. User Management
   
   **3.1 Viewing Users**
   - Table: Name, Email, Role, Status, Last Login, Actions
   - Search: Filter by name/email
   - Sort: By name, last login, role
   
   **3.2 Creating Users**
   - Click "Add User" button
   - Fill form: Name, Email, Role (Admin/User)
   - Send invite email (user sets password)
   
   **3.3 Editing Users**
   - Click "Edit" on user row
   - Change: Name, Role
   - Cannot change: Email (unique identifier)
   
   **3.4 Deactivating/Deleting Users**
   - Deactivate: User can't log in (data retained)
   - Delete: Permanent (30-day grace period, then hard delete)
   - Warning: Deleting removes all user data (conversations, projects)
   
   **3.5 Roles & Permissions**
   - Admin: Full access (user management, agent management, billing)
   - User: Standard access (chat, projects, can't manage users/agents)

4. Agent Management
   
   **4.1 Viewing Agents**
   - Table: Name, Type (External/Self-hosted), Status, Version, Actions
   - Status: Active (green), Inactive (gray), Error (red)
   
   **4.2 Adding External Agent**
   - Click "Add Agent" → "External"
   - Fill form:
     - Name: (e.g., "GPT-4")
     - Provider: OpenAI / Google Gemini / xAI Grok / Custom
     - API Endpoint: (e.g., https://api.openai.com/v1/chat/completions)
     - API Key: (encrypted before storage)
     - Model: (e.g., gpt-4-turbo)
   - Click "Test Connection" (verify agent responds)
   - If success, click "Save"
   - Agent now available to all users
   
   **4.3 Deploying Self-Hosted Agent**
   - Click "Add Agent" → "Self-Hosted"
   - Fill form:
     - Name: (e.g., "Company Custom Model")
     - Docker Image URL: (e.g., myregistry/custom-agent:v1.0)
     - Environment Variables: (API keys, model config)
     - Resources: CPU (2 cores), Memory (4GB), GPU (optional)
   - Click "Deploy"
   - System deploys to Kubernetes
   - Health check: Container running, endpoint responding
   - Agent marked Active
   
   **4.4 Monitoring Agents**
   - Health Status: Green (OK), Yellow (slow), Red (down)
   - Metrics: Requests/min, Avg response time, Error rate
   - Logs: View agent logs (last 1000 lines)
   - Alerts: Email/Slack if agent down >5 mins
   
   **4.5 Updating Agents**
   - External: Update API key (rotate quarterly for security)
   - Self-hosted: Deploy new version (blue-green deployment)
   
   **4.6 Deactivating/Deleting Agents**
   - Deactivate: Agent hidden from users (data retained)
   - Delete: Permanent (removes config, but keeps message history)

5. Billing Management
   
   **5.1 Viewing Billing Dashboard**
   - Total cost (this month)
   - Cost breakdown: By agent, by user, by project
   - Usage trends: Chart (last 30 days)
   
   **5.2 Setting Billing Policies**
   - Free tier: X tokens/month per user (e.g., 10K tokens)
   - Paid tier: $Y per additional 1K tokens
   - Quotas: Max tokens per user/project (prevent runaway costs)
   
   **5.3 Exporting Billing Reports**
   - Click "Export"
   - Format: CSV, PDF
   - Data: Date, User, Agent, Tokens, Cost
   - Send to finance team
   
   **5.4 Cost Optimization Tips**
   - Monitor high-usage users (top 10)
   - Use cheaper agents for non-critical tasks
   - Set quotas to prevent overspending

6. Settings & Configuration
   
   **6.1 System Settings**
   - Platform name: "ChatAI Platform" (customizable)
   - Logo: Upload company logo (appears in navbar)
   - Support email: support@yourcompany.com
   
   **6.2 Security Settings**
   - Password policy: Min 8 chars, complexity, expiry (90 days)
   - Session timeout: 1 hour inactivity
   - Two-factor authentication: Enforce for admins (optional for users)
   - IP whitelist: Restrict access to company network (optional)
   
   **6.3 Notification Settings**
   - Email templates: Customize invite email, welcome email
   - SMTP config: For sending emails (Gmail, SendGrid, etc.)
   - Slack integration: Webhook for admin alerts
   
   **6.4 Data Retention**
   - Conversations: 1 year (auto-archive after)
   - Logs: 30 days (then deleted)
   - Backups: Daily (retained 30 days)

7. Monitoring & Logs
   
   **7.1 System Health**
   - Dashboard: All services status (green/yellow/red)
   - Services: API Gateway, Auth, Chat, Billing, etc.
   - Infrastructure: Database, Redis, Kubernetes cluster
   
   **7.2 Audit Logs**
   - Who did what, when
   - Events: User login, agent created, project deleted, etc.
   - Filter: By user, action, date range
   - Export: CSV for compliance
   
   **7.3 Error Logs**
   - Recent errors (last 24 hours)
   - Severity: Critical, High, Medium, Low
   - Details: Stack trace, timestamp, user affected
   - Action: Investigate, fix, or escalate to dev team

8. Troubleshooting (Admin)
   
   | Issue | Solution |
   |-------|----------|
   | User can't log in | Check if account active, reset password |
   | Agent not responding | Check health status, view logs, restart container |
   | High costs | Review top users, set quotas, switch to cheaper agents |
   | System slow | Check infrastructure metrics, scale up if needed |
   | Data loss | Restore from backup (contact DevOps) |

9. Security Best Practices
   - **API Keys:** Rotate quarterly, never commit to Git
   - **Access Control:** Principle of least privilege (users get minimum permissions)
   - **Audit:** Review logs monthly for suspicious activity
   - **Updates:** Keep agents & infrastructure updated (security patches)
   - **Backups:** Verify backups weekly (test restore process)

10. Training New Admins
    - **Onboarding checklist:**
      - [ ] Grant admin role in system
      - [ ] Walk through Admin Dashboard
      - [ ] Practice: Add user, create agent, view billing
      - [ ] Share this guide
      - [ ] Shadow experienced admin (1 week)
    - **Resources:**
      - Admin Slack channel: #chatai-admins
      - Weekly admin sync meeting (Fridays 2pm)
      - Escalation: Contact DevOps (devops@chatai.com) for infrastructure issues

**Deliverables:**
- [ ] Admin Guide (30-40 pages)
- [ ] Screenshots of Admin Dashboard
- [ ] Video tutorial: "Admin 101" (10 mins)
- [ ] Security checklist (PDF)

**Checklist:**
- [ ] 10 sections complete
- [ ] User management documented
- [ ] Agent management (external + self-hosted) documented
- [ ] Billing management documented
- [ ] Security best practices included
- [ ] Troubleshooting guide for admins
- [ ] Training checklist for new admins
- [ ] Reviewed by current admins + DevOps
- [ ] Published to Admin-only section of Help Center

**Status:** ⏳ To Do (Week 21, Phase 4)

---

### **File 3: 03-FAQ.md** ⏳ TO DO
**Nội dung:** Frequently Asked Questions

**Sections bắt buộc:**
1. Introduction
   - Purpose: Quick answers to common questions
   - How to use: Search (Ctrl+F) or browse by category
   - Not finding your answer? Contact support
2. General Questions
   
   **Q1: What is ChatAI Platform?**  
   A: ChatAI Platform is a multi-agent AI chat application that lets you chat with different AI models (GPT-4, Gemini, Grok, custom models) in one place. Features include text/voice input, file upload, team collaboration, and usage tracking.
   
   **Q2: How much does it cost?**  
   A: Pricing varies by organization. Contact your admin or check Settings → Billing for your plan details. Typically: Free tier (10K tokens/month), then pay-as-you-go.
   
   **Q3: Is my data secure?**  
   A: Yes. All data encrypted (at rest & in transit). We comply with GDPR. See Privacy Policy for details.
   
   **Q4: Can I use this on mobile?**  
   A: Yes! Download from App Store (iOS) or Google Play (Android). Same features as web.
   
   **Q5: What AI models are available?**  
   A: GPT-4 (OpenAI), Gemini (Google), Grok (xAI), plus custom models deployed by your admin.

3. Account & Login
   
   **Q6: I forgot my password. How do I reset it?**  
   A: Click "Forgot Password" on login page → Enter email → Check inbox for reset link → Set new password.
   
   **Q7: Can I use multiple login methods?**  
   A: Yes. Link Google, Facebook, TikTok accounts in Settings → Connected Accounts. Use any to log in.
   
   **Q8: How do I change my email?**  
   A: Contact your admin. Email is unique identifier, admin must update it.
   
   **Q9: Can I delete my account?**  
   A: Yes. Go to Settings → Privacy → Delete Account. Warning: Permanent after 30-day grace period.
   
   **Q10: Why can't I log in?**  
   A: Check: Correct email/password? Account active? Internet connection? Try "Forgot Password" or contact support.

4. Chat & Conversations
   
   **Q11: How do I start a chat?**  
   A: Click "New Conversation" → Select agent → Type message → Send. That's it!
   
   **Q12: Can the AI remember previous messages?**  
   A: Yes! Each conversation is a "thread" with context. AI remembers everything in the current thread.
   
   **Q13: How do I switch agents mid-conversation?**  
   A: Click agent name at top → Select new agent. Note: Context may not transfer between agents.
   
   **Q14: What's the maximum message length?**  
   A: 4,000 characters per message (roughly 800 words). If longer, split into multiple messages.
   
   **Q15: Can I edit/delete my messages?**  
   A: Edit: Not yet (coming soon). Delete: Yes, click "..." on message → Delete (admin/owner only).

5. Voice & Files
   
   **Q16: Why isn't voice recording working?**  
   A: Check browser mic permissions. Chrome: chrome://settings/content/microphone → Allow for chatai.com.
   
   **Q17: How accurate is voice transcription?**  
   A: ~90% accuracy for clear speech, English. Accuracy lower with accents, background noise, or other languages.
   
   **Q18: What file types can I upload?**  
   A: PDF, TXT, DOCX (documents), JPG, PNG, GIF (images). Max 10MB per file.
   
   **Q19: What happens to my uploaded files?**  
   A: Stored securely (encrypted). Text extracted (PDFs/docs) to help AI understand. Visible to all project members.
   
   **Q20: Can I delete uploaded files?**  
   A: Yes, click file thumbnail → Delete (owner/editor only).

6. Projects & Collaboration
   
   **Q21: What's a project?**  
   A: A workspace for organizing conversations. Invite teammates, share access, collaborate on chats.
   
   **Q22: How many projects can I create?**  
   A: Unlimited (or limited by your plan - check with admin).
   
   **Q23: What are project roles?**  
   A:  
   - Owner: Full control (delete, manage members)  
   - Editor: Create chats, invite members  
   - Viewer: Read-only (can't send messages)
   
   **Q24: Can I transfer project ownership?**  
   A: Yes. Owner can change another member's role to Owner, then downgrade themselves.
   
   **Q25: How do I leave a project?**  
   A: Project Settings → Leave Project. You'll lose access (owner must delete project, can't leave).

7. Billing & Usage
   
   **Q26: How are costs calculated?**  
   A: Based on tokens used (input + output). Each agent has different rates. View Billing → Dashboard for breakdown.
   
   **Q27: What's a token?**  
   A: Unit of text processed by AI. Roughly: 1 token = 4 characters or 0.75 words. Example: "Hello world" = 3 tokens.
   
   **Q28: Can I set a spending limit?**  
   A: Ask your admin to set quotas (max tokens per month).
   
   **Q29: Why is my bill higher than expected?**  
   A: Check Billing → Export CSV for details. Possible reasons: Long prompts, expensive agents (GPT-4), high usage.
   
   **Q30: How do I export billing reports?**  
   A: Billing → Export CSV. Data includes: Date, Agent, Tokens, Cost.

8. Mobile App
   
   **Q31: Is the mobile app free?**  
   A: Yes, same as web. Costs based on usage (tokens), not app download.
   
   **Q32: Does mobile have all features?**  
   A: Yes! Text, voice, file upload, all features available.
   
   **Q33: Can I use offline?**  
   A: Read-only. Cached conversations viewable offline, but can't send messages (requires internet).
   
   **Q34: Push notifications not working?**  
   A: Check: Settings → Notifications → Push enabled? Phone notification settings allow ChatAI?
   
   **Q35: Mobile app crashes on startup?**  
   A: Update to latest version (App Store/Google Play). If still crashes, reinstall or contact support.

9. Technical Issues
   
   **Q36: Page not loading?**  
   A: Refresh page (Ctrl+R / Cmd+R). Clear browser cache (Ctrl+Shift+Del). Try incognito mode. Check internet.
   
   **Q37: Chat response very slow?**  
   A: Agent may be busy. Wait 30s, then retry. If persists, report to admin (agent may be down).
   
   **Q38: "Error sending message" - what does this mean?**  
   A: Network issue or agent timeout. Retry message. If fails again, contact support with error details.
   
   **Q39: How do I report a bug?**  
   A: Click Help → Report Bug. Describe: What you did, what happened, what you expected. Include screenshot.
   
   **Q40: Where are system status updates?**  
   A: Check https://status.chatai.com for real-time service status. Subscribe for email/SMS alerts.

10. Privacy & Security
    
    **Q41: Who can see my conversations?**  
    A:  
    - Private: Only you  
    - Project: All project members (based on role)  
    - Admin: Can view for audit/support purposes
    
    **Q42: Can I export my data?**  
    A: Yes. Settings → Privacy → Export Data → Download JSON file with all conversations.
    
    **Q43: Is end-to-end encryption supported?**  
    A: No (E2E encryption not compatible with AI processing). We use TLS 1.3 in transit, AES-256 at rest.
    
    **Q44: How long is my data stored?**  
    A: Active conversations: Indefinitely. Inactive (>1 year no access): Archived, then deleted after notification. See Privacy Policy.
    
    **Q45: Can I request data deletion?**  
    A: Yes. Settings → Privacy → Delete Account (30-day grace, then permanent). Or contact support for partial deletion.

11. Advanced Features
    
    **Q46: Can I train my own AI model?**  
    A: Admins only. Requires ML knowledge. See Admin Guide → ML Training section.
    
    **Q47: What's a self-hosted agent?**  
    A: AI model deployed on your own infrastructure (Docker container). Gives full control, data stays private.
    
    **Q48: Can I integrate with other tools (Slack, Teams)?**  
    A: Not yet (roadmap feature). Contact support to request integrations.
    
    **Q49: API access available?**  
    A: For enterprise plans. Contact sales@chatai.com for API documentation.
    
    **Q50: Can I customize the UI (branding, colors)?**  
    A: Enterprise feature. Contact your admin or sales team.

12. Contact & Support
    
    **Q51: How do I contact support?**  
    A:  
    - Email: support@chatai.com (24h response)  
    - Live chat: Click chat icon (bottom-right, business hours)  
    - Community: https://community.chatai.com
    
    **Q52: What are support hours?**  
    A: Email: 24/7. Live chat: Mon-Fri 9am-6pm (your timezone). Emergency: Contact admin.
    
    **Q53: Do you offer training/onboarding?**  
    A: Yes (enterprise plans). Contact your admin or customer success manager.
    
    **Q54: Where can I find video tutorials?**  
    A: https://chatai.com/tutorials (5-10 videos, 2-5 mins each). Topics: Quick Start, Voice, Files, Projects.
    
    **Q55: How do I suggest new features?**  
    A: Help → Feature Request → Describe feature → Submit. We review all suggestions!

**Deliverables:**
- [ ] FAQ with 55+ questions
- [ ] Searchable (web version with Ctrl+F)
- [ ] Categorized (12 categories)
- [ ] Link to relevant guides (User Manual, Admin Guide)
- [ ] Updated monthly (add new questions)

**Checklist:**
- [ ] 12 categories complete (General, Account, Chat, Voice/Files, Projects, Billing, Mobile, Technical, Privacy, Advanced, Contact)
- [ ] 55+ Q&A pairs
- [ ] Each answer concise (<100 words)
- [ ] Cross-links to detailed guides
- [ ] Contact info updated
- [ ] Reviewed by support team (ensure accuracy)
- [ ] Published to Help Center (public)
- [ ] Indexed for search (web)

**Status:** ⏳ To Do (Week 21-22, Phase 4)

---

## ✅ WORKFLOW

```
Phase 4 - Week 21:
  Step 1: Tech Writer drafts User Manual (File 1)
          ↓
  Step 2: PO reviews, provides feedback
          ↓
  Step 3: Tech Writer revises, adds screenshots
          ↓
  Step 4: Tech Writer drafts Admin Guide (File 2)
          ↓
  Step 5: Admins + DevOps review
          ↓
  Step 6: Tech Writer drafts FAQ (File 3)
          ↓
  Step 7: Support team reviews (ensures common questions covered)
          ↓
Week 22:
  Step 8: All guides published to Help Center
  Step 9: Video tutorials recorded (5-10 videos)
  Step 10: PDF exports generated
          ↓
Post-Launch:
  Update guides based on user feedback
  Add new FAQs as questions come in
  Quarterly review & refresh
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| User Manual | Tech Writer | PM | PO, Beta Users | All Team |
| Admin Guide | Tech Writer | PM | Admins, DevOps | All Team |
| FAQ | Tech Writer | PM | Support Team | All |
| Screenshots | Tech Writer | Tech Writer | Designer | - |
| Video Tutorials | Tech Writer + Video Editor | PM | PO | All |
| Help Center Setup | Tech Writer + DevOps | PM | - | All |
| Updates (Post-Launch) | Tech Writer | Support Lead | Support Team | - |

---

## 📊 PROGRESS

**Overall:** 🔴 0% Complete (0/3 files)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-User-Manual.md | ⏳ To Do | 0% | Phase 4 not started |
| 02-Admin-Guide.md | ⏳ To Do | 0% | Phase 4 not started |
| 03-FAQ.md | ⏳ To Do | 0% | Phase 4 not started |

**Next Action:** Start Week 21 (after M14 security/testing complete)

---

## 🔄 DOCUMENTATION UPDATES

**Weekly (Post-Launch):**
- Review support tickets: Identify common issues
- Add new FAQs (top 5 questions this week)
- Update screenshots if UI changes

**Per Feature Release:**
- Update User Manual with new features
- Update Admin Guide if admin features added
- Record new video tutorial

**Quarterly:**
- Full audit: Remove outdated content
- Refresh screenshots (ensure current UI)
- User feedback survey: "Is documentation helpful?"
- Metrics: Most viewed pages, search queries

---

## 📈 SUCCESS METRICS

**Track in Google Analytics / Help Center analytics:**
- **Page views:** Which sections most viewed?
- **Search queries:** What users looking for? (add to FAQ if missing)
- **Bounce rate:** Users finding answers? (<50% good)
- **Time on page:** Spending enough time to read? (>2 mins)
- **Support tickets:** Did documentation reduce tickets? (Goal: -30%)

**User satisfaction:**
- Feedback widget: "Was this helpful?" (Yes/No)
- NPS score: "How likely to recommend?" (Goal: >50)
- Comments: Users can suggest improvements

---

## 💡 TIPS CHO TECH WRITERS

### **Writing User Manuals:**
- **Use active voice:** "Click the button" (not "The button should be clicked")
- **Be concise:** One idea per sentence, short paragraphs
- **Use examples:** Real scenarios, not abstract concepts
- **Add visuals:** Screenshot > 1000 words
- **Test it:** Follow your own guide (does it work?)

### **Taking Screenshots:**
- **Annotate:** Add arrows, numbers, highlights
- **Crop:** Focus on relevant area, remove clutter
- **Consistent style:** Same resolution, same annotations style
- **Update regularly:** Screenshots go stale fast
- **Alt text:** For accessibility (describe image)

### **Writing FAQ:**
- **User language:** What users ask, not technical jargon
- **Short answers:** <100 words, link to detailed guide if more info
- **Group by topic:** Easier to browse than alphabetical
- **Update constantly:** FAQ never "done"
- **Search-friendly:** Use keywords users might search

### **Video Tutorials:**
- **Plan script:** Don't wing it, write outline
- **Keep short:** 2-5 mins max (attention span)
- **Show, don't tell:** Screen recording > talking head
- **Add captions:** Accessibility, watching without sound
- **Professional tools:** Loom, Camtasia, or OBS Studio

### **Collaboration:**
- **Early drafts:** Share with team (get feedback before polishing)
- **Subject matter experts:** Interview devs, admins for accuracy
- **Beta users:** Test guides (do they understand?)
- **Iterate:** Documentation never perfect, keep improving

---

## 🔗 THAM CHIẾU

**Internal:**
- [User Stories](../01-requirements/03-User-Stories.md) - Features to document
- [UI Wireframes](../08-design/01-UI-Wireframes.md) - Screenshots source
- [Architecture](../02-architecture/01-System-Architecture.md) - Technical background

**External - Documentation Best Practices:**
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/)
- [Write the Docs](https://www.writethedocs.org/) - Community & resources
- [Grammarly](https://www.grammarly.com/) - Grammar & style checker

**External - Tools:**
- **Screenshots:** Snagit, Greenshot, macOS Screenshot (Cmd+Shift+4)
- **Screen recording:** Loom, Camtasia, OBS Studio
- **Help Center:** Zendesk, Intercom, GitBook, ReadTheDocs
- **Video hosting:** YouTube (unlisted), Vimeo
- **PDF generation:** Markdown → Pandoc → PDF

**Inspiration:**
- [Notion Help Center](https://www.notion.so/help) - Clean, searchable
- [Slack Help](https://slack.com/help) - Concise, well-organized
- [Stripe Docs](https://stripe.com/docs) - Technical but readable
- [Mailchimp Guides](https://mailchimp.com/help/) - User-friendly

---

## 🎯 CONTENT PRINCIPLES

### **For All Documentation:**
1. **User-centric:** Write for the reader, not the writer
2. **Actionable:** Tell users WHAT to do, not just concepts
3. **Accessible:** Simple language, avoid jargon (or explain it)
4. **Scannable:** Headers, bullets, bold keywords
5. **Up-to-date:** Review quarterly, update with changes
6. **Searchable:** Use keywords users might search
7. **Visual:** Screenshots, diagrams, videos
8. **Tested:** Follow your own instructions (does it work?)

### **Tone & Voice:**
- **Friendly:** Not robotic, but professional
- **Helpful:** "Here's how..." not "You should know..."
- **Encouraging:** "Great job!" after completing task
- **Honest:** If something's complex, acknowledge it
- **Respectful:** Don't assume user knowledge level

---

## 📦 DELIVERABLES SUMMARY

**By End of Week 21:**
- [ ] User Manual (50-70 pages, 100+ screenshots)
- [ ] Admin Guide (30-40 pages, screenshots)
- [ ] FAQ (55+ questions, 12 categories)
- [ ] 5-10 video tutorials (2-5 mins each)
- [ ] Help Center published (searchable web version)
- [ ] PDF exports available (for offline reading)

**Post-Launch (Ongoing):**
- [ ] Weekly FAQ updates
- [ ] Monthly content audit
- [ ] Quarterly full review
- [ ] New tutorials for new features

---

## 🚨 CRITICAL REMINDERS

**Before Publishing:**
- [ ] All links work (no 404s)
- [ ] Screenshots current (match latest UI)
- [ ] Legal review (Privacy Policy, ToS references accurate)
- [ ] Accessibility: Alt text on images, proper heading structure
- [ ] Mobile-friendly (Help Center responsive)
- [ ] Search tested (keywords users might use)
- [ ] Feedback widget enabled ("Was this helpful?")

**Avoid These Mistakes:**
- ❌ Outdated screenshots (users get confused)
- ❌ Too technical (users not all developers)
- ❌ Too long (break into sections, use ToC)
- ❌ No visuals (text-only boring)
- ❌ Dead links (check quarterly)
- ❌ No search (users can't find answers)
- ❌ Ignoring feedback (users tell you what's unclear)

---

## 🎓 TRAINING MATERIALS

**For Support Team:**
- [ ] Read all 3 guides (User Manual, Admin Guide, FAQ)
- [ ] Practice using platform (hands-on)
- [ ] Shadowing: Watch experienced support handle tickets
- [ ] Quiz: Test knowledge of common issues
- [ ] Reference: Keep guides open while answering tickets

**For New Users (Onboarding):**
- [ ] Welcome email with Quick Start Guide link
- [ ] In-app tutorial (first-time user flow)
- [ ] Video: "Your First Chat" (2 mins)
- [ ] Checklist: ☐ Create project ☐ Invite teammate ☐ Send message
- [ ] Offer live demo (optional, for enterprise)

---

**Last Updated:** October 15, 2025  
**Maintained by:** Technical Writing Team  
**Questions?** Contact docs@chatai.com
