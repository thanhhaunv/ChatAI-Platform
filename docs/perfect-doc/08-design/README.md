# 🎨 08-design - Tài liệu UI/UX Design

> **Mục đích:** Định nghĩa giao diện người dùng & trải nghiệm người dùng  
> **Người phụ trách:** UI/UX Designer / Product Designer  
> **Timeline:** Phase 0-1 (Week 1-4), update liên tục

---

## 📝 DANH SÁCH FILES (4 files)

| # | File | Owner | Time | Priority | Update Frequency |
|---|------|-------|------|----------|------------------|
| 1 | 01-UI-Wireframes.md | UI/UX Designer | 3-4 days | 🔴 Critical | Phase 0-1 |
| 2 | 02-Design-System.md | UI/UX Designer | 4-5 days | 🔴 Critical | Phase 1, update as needed |
| 3 | 03-Component-Library.md | Frontend + Designer | 3-4 days | 🟠 High | Phase 1-2 |
| 4 | 04-User-Flows.md | UX Designer | 2-3 days | 🟠 High | Phase 0 |

**Total:** 12-16 days (phân tán Phase 0-2)

---

## 📋 CHI TIẾT FILES

### **File 1: 01-UI-Wireframes.md** ⏳ TO DO
**Nội dung:** Wireframes cho tất cả screens (Web + Mobile)

**Sections bắt buộc:**
1. Introduction
   - Purpose: Visual blueprint cho developers
   - Tools: Figma (primary), Mermaid diagrams (text-based backup)
   - Platforms: Web (responsive), Mobile (iOS + Android)
2. Design Principles
   - **Mobile-first:** Design for smallest screen first
   - **Responsive:** 3 breakpoints (mobile <768px, tablet 768-1024px, desktop >1024px)
   - **Accessibility:** WCAG 2.1 AA compliance
   - **Consistency:** Follow Material Design 3 / iOS Human Interface Guidelines
3. Screen Inventory (20+ screens)
   
   **3.1 Authentication Screens (3 screens)**
   - Login Screen
   - Signup Screen
   - OAuth Callback Screen
   
   **3.2 Main Screens (5 screens)**
   - Dashboard / Home
   - Projects List
   - Project Detail
   - Chat Interface
   - User Profile
   
   **3.3 Chat Screens (4 screens)**
   - Conversation List
   - Chat Thread
   - Agent Selector Modal
   - Voice Recording Modal
   
   **3.4 Admin Screens (3 screens)**
   - Agent Management
   - User Management
   - Billing Dashboard
   
   **3.5 Settings Screens (3 screens)**
   - Account Settings
   - Project Settings
   - Notification Preferences
   
   **3.6 Mobile-Specific (2 screens)**
   - Bottom Navigation
   - Mobile Chat (optimized)

4. Wireframe Details (Mỗi screen phải có)
   
   **Template cho mỗi wireframe:**
   ```markdown
   ### Screen: [Name]
   
   **Route:** /[path]
   **Platform:** Web / Mobile / Both
   **User Role:** All / Admin / Owner / Member
   
   **Layout Structure:**
   - Header: Logo, navigation, user menu
   - Main Content: [Description]
   - Sidebar: [If applicable]
   - Footer: Links, copyright
   
   **Components Used:**
   - Button (primary, secondary)
   - Input (text, select, textarea)
   - Card
   - Modal
   - [Other components from Design System]
   
   **Interactions:**
   - On load: Fetch data, show loading spinner
   - On click [Button]: Navigate to [Route] / Open [Modal]
   - On input: Validate, show errors
   
   **States:**
   - Loading: Skeleton loaders
   - Empty: Empty state illustration + CTA
   - Error: Error message + retry button
   
   **Responsive Behavior:**
   - Mobile: Stack vertically, hide sidebar
   - Tablet: 2-column layout
   - Desktop: Full 3-column layout
   
   **Mermaid Diagram:**
   ```mermaid
   graph TD
     A[Header] --> B[Main Content]
     B --> C[Sidebar]
     B --> D[Footer]
   ```
   
   **Figma Link:** [Link to Figma frame]
   **Screenshot:** ![wireframe](./assets/wireframe-[name].png)
   ```

5. Key Wireframes Detail (10 screens chính)
   
   **5.1 Login Screen** (US-001)
   - **Web:** Centered card (400px max-width), social buttons, email/password form
   - **Mobile:** Full-screen, social buttons prominent, autofocus email
   - **Components:** Logo, Input (email/password), Button (Login, Google, Facebook, TikTok), Link (Forgot password, Signup)
   - **Flow:** Enter credentials → Validate → API call → Redirect to /dashboard OR show error
   
   **5.2 Dashboard / Home** (US-005, US-009)
   - **Web:** Sidebar (projects list), Main (recent conversations, stats), Top bar (search, create project)
   - **Mobile:** Bottom nav (Home, Projects, Chat, Profile), Main (recent conversations, floating + button)
   - **Components:** ProjectCard, ConversationCard, Button (Create Project), SearchBar
   - **States:** Loading (skeleton), Empty (illustration "No projects yet" + CTA)
   
   **5.3 Chat Interface** (US-002, US-003, US-004)
   - **Web:** 3-column layout: [Sidebar: Projects/Threads | Chat: Messages + Input | Right: Agent Info]
   - **Mobile:** Full-screen chat, swipe left for threads, swipe right for agent info
   - **Components:** MessageBubble (user/AI), ChatInput (text/voice/file), AgentSelector, VoiceRecorder, FileUploader, StreamingIndicator
   - **Interactions:**
     - Type message → Send → Streaming response
     - Click voice icon → Record → Stop → Transcribe → Send
     - Click attach → Select file → Upload → Send with context
     - Click agent name → Modal → Select different agent → Confirm
   - **States:** Typing indicator (AI is responding...), Voice recording (waveform animation), File uploading (progress bar)
   
   **5.4 Agent Management** (US-006)
   - **Admin only:** Table with agents (name, type, status, actions), Create Agent button
   - **Components:** DataTable, Badge (Active/Inactive), Button (Create, Edit, Delete, Test Connection)
   - **Modal:** Create Agent form (name, type dropdown, API endpoint, credentials)
   - **Flow:** Create → Fill form → Test connection → Save → Success toast
   
   **5.5 Billing Dashboard** (US-007)
   - **Charts:** Usage over time (line chart), Cost by agent (pie chart), Top projects (bar chart)
   - **Filters:** Date range picker, Agent selector, Project selector
   - **Export:** Button to export CSV
   - **Components:** LineChart (Recharts), PieChart, BarChart, DateRangePicker, Button (Export)
   
   **5.6 Project Detail** (US-005)
   - **Header:** Project name (editable), Members avatars, Invite button
   - **Tabs:** Conversations, Members, Settings
   - **Conversations Tab:** List of threads with preview, Create Thread button
   - **Members Tab:** DataTable (name, email, role, actions), Role dropdown (Owner/Editor/Viewer)
   
   **5.7 Voice Recording Modal** (US-003)
   - **Web:** Overlay modal, centered, waveform animation, timer, Stop button
   - **Mobile:** Bottom sheet, swipe down to dismiss, larger Stop button
   - **States:** Ready (Press to record), Recording (00:15, waveform), Processing (Transcribing...)
   
   **5.8 File Upload Modal** (US-004)
   - **Drag & drop area:** "Drop files here or click to browse"
   - **File preview:** Thumbnail (image) / icon (PDF/TXT), filename, size, Remove button
   - **Upload button:** Disabled until file selected
   - **Progress:** Linear progress bar, "Uploading... 45%"
   
   **5.9 User Profile**
   - **Avatar:** Upload/change photo
   - **Form:** Name, Email (read-only), Phone, Password change
   - **Danger zone:** Delete account (confirmation modal)
   - **Components:** Avatar, Input, Button (Save, Cancel, Delete Account)
   
   **5.10 Mobile Bottom Navigation**
   - **4 tabs:** Home (icon: house), Projects (icon: folder), Chat (icon: message), Profile (icon: user)
   - **Active state:** Icon filled, label colored (primary)
   - **Notification badge:** On Chat tab if unread messages

6. Responsive Breakpoints
   ```css
   /* Mobile */
   @media (max-width: 767px) {
     - Single column layout
     - Bottom navigation
     - Hamburger menu for sidebar
     - Full-width components
     - Touch-friendly (min 44px tap targets)
   }
   
   /* Tablet */
   @media (min-width: 768px) and (max-width: 1023px) {
     - 2-column layout (sidebar + main)
     - Top navigation
     - Collapsible sidebar
   }
   
   /* Desktop */
   @media (min-width: 1024px) {
     - 3-column layout (full experience)
     - Always-visible sidebar
     - Top navigation with breadcrumbs
   }
   ```

7. Accessibility Considerations
   - **Keyboard navigation:** Tab order logical, focus indicators visible
   - **Screen readers:** Proper ARIA labels, semantic HTML
   - **Color contrast:** WCAG AA (4.5:1 for text, 3:1 for UI)
   - **Touch targets:** Minimum 44x44px (mobile)
   - **Captions:** For voice messages (optional feature)

8. Design Assets
   - **Figma file:** [Link to full project]
   - **Style guide:** Colors, typography, spacing (see 02-Design-System.md)
   - **Icons:** Lucide React (open source)
   - **Illustrations:** unDraw / custom illustrations
   - **Images:** Unsplash (placeholder), user-uploaded (production)

**Deliverables:**
- [ ] Figma file với 20+ screens (Web + Mobile)
- [ ] Mermaid diagrams cho text-based backup
- [ ] Screenshots exported (PNG, 1x and 2x)
- [ ] Interactive prototype (Figma prototype mode)
- [ ] Developer handoff notes (Figma → Code)

**Checklist:**
- [ ] 20+ screens wireframed
- [ ] 10 key screens detailed (Login, Dashboard, Chat, Agent, Billing, Project, Voice, File, Profile, Mobile Nav)
- [ ] Responsive behavior documented (mobile/tablet/desktop)
- [ ] Accessibility guidelines followed
- [ ] Figma file shared with team (view access)
- [ ] Reviewed by PO + Tech Lead
- [ ] Approved for development

**Status:** ⏳ To Do (Phase 0-1, Week 1-4)

---

### **File 2: 02-Design-System.md** ⏳ TO DO
**Nội dung:** Design tokens & visual style guide

**Sections bắt buộc:**
1. Introduction
   - Purpose: Single source of truth cho visual design
   - Philosophy: Consistent, scalable, accessible
   - Tools: Tailwind CSS v3 (utility-first), CSS variables
2. Color Palette
   
   **2.1 Brand Colors**
   ```css
   --color-primary: #3B82F6;        /* Blue 500 */
   --color-primary-dark: #2563EB;   /* Blue 600 */
   --color-primary-light: #60A5FA;  /* Blue 400 */
   
   --color-secondary: #8B5CF6;      /* Purple 500 */
   --color-secondary-dark: #7C3AED; /* Purple 600 */
   --color-secondary-light: #A78BFA;/* Purple 400 */
   
   --color-accent: #10B981;         /* Green 500 - success */
   ```
   
   **2.2 Neutral Colors**
   ```css
   --color-gray-50: #F9FAFB;
   --color-gray-100: #F3F4F6;
   --color-gray-200: #E5E7EB;
   --color-gray-300: #D1D5DB;
   --color-gray-400: #9CA3AF;
   --color-gray-500: #6B7280;
   --color-gray-600: #4B5563;
   --color-gray-700: #374151;
   --color-gray-800: #1F2937;
   --color-gray-900: #111827;
   ```
   
   **2.3 Semantic Colors**
   ```css
   --color-success: #10B981;  /* Green 500 */
   --color-warning: #F59E0B;  /* Amber 500 */
   --color-error: #EF4444;    /* Red 500 */
   --color-info: #3B82F6;     /* Blue 500 */
   ```
   
   **2.4 Background & Surface**
   ```css
   --color-background: #FFFFFF;     /* Light mode */
   --color-surface: #F9FAFB;        /* Cards, modals */
   
   /* Dark mode (optional) */
   --color-background-dark: #111827;
   --color-surface-dark: #1F2937;
   ```
   
   **2.5 Text Colors**
   ```css
   --color-text-primary: #111827;   /* Gray 900 - body text */
   --color-text-secondary: #6B7280; /* Gray 500 - labels */
   --color-text-disabled: #9CA3AF;  /* Gray 400 */
   --color-text-inverse: #FFFFFF;   /* On dark backgrounds */
   ```

3. Typography
   
   **3.1 Font Family**
   ```css
   --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   --font-mono: 'Fira Code', 'Courier New', monospace;
   ```
   
   **3.2 Font Sizes**
   ```css
   --text-xs: 0.75rem;    /* 12px */
   --text-sm: 0.875rem;   /* 14px */
   --text-base: 1rem;     /* 16px */
   --text-lg: 1.125rem;   /* 18px */
   --text-xl: 1.25rem;    /* 20px */
   --text-2xl: 1.5rem;    /* 24px */
   --text-3xl: 1.875rem;  /* 30px */
   --text-4xl: 2.25rem;   /* 36px */
   ```
   
   **3.3 Font Weights**
   ```css
   --font-normal: 400;
   --font-medium: 500;
   --font-semibold: 600;
   --font-bold: 700;
   ```
   
   **3.4 Line Heights**
   ```css
   --leading-tight: 1.25;
   --leading-normal: 1.5;
   --leading-relaxed: 1.75;
   ```
   
   **3.5 Typography Scale (Usage)**
   - **H1:** text-4xl, font-bold, leading-tight (Page titles)
   - **H2:** text-3xl, font-semibold, leading-tight (Section headers)
   - **H3:** text-2xl, font-semibold, leading-normal (Subsection headers)
   - **H4:** text-xl, font-semibold, leading-normal (Card titles)
   - **Body:** text-base, font-normal, leading-normal (Paragraphs)
   - **Small:** text-sm, font-normal, leading-normal (Labels, captions)
   - **Code:** font-mono, text-sm (Code blocks)

4. Spacing System (8px grid)
   ```css
   --spacing-0: 0;
   --spacing-1: 0.25rem;  /* 4px */
   --spacing-2: 0.5rem;   /* 8px */
   --spacing-3: 0.75rem;  /* 12px */
   --spacing-4: 1rem;     /* 16px */
   --spacing-5: 1.25rem;  /* 20px */
   --spacing-6: 1.5rem;   /* 24px */
   --spacing-8: 2rem;     /* 32px */
   --spacing-10: 2.5rem;  /* 40px */
   --spacing-12: 3rem;    /* 48px */
   --spacing-16: 4rem;    /* 64px */
   --spacing-20: 5rem;    /* 80px */
   ```
   
   **Usage:**
   - Margin/Padding: Use spacing-4 (16px) as default
   - Between sections: spacing-8 or spacing-12
   - Tight spacing: spacing-2 or spacing-3
   - Loose spacing: spacing-6 or spacing-8

5. Border Radius
   ```css
   --radius-none: 0;
   --radius-sm: 0.125rem;   /* 2px */
   --radius-base: 0.25rem;  /* 4px */
   --radius-md: 0.375rem;   /* 6px */
   --radius-lg: 0.5rem;     /* 8px */
   --radius-xl: 0.75rem;    /* 12px */
   --radius-2xl: 1rem;      /* 16px */
   --radius-full: 9999px;   /* Circle */
   ```
   
   **Usage:**
   - Buttons: radius-md (6px)
   - Cards: radius-lg (8px)
   - Modals: radius-xl (12px)
   - Avatars: radius-full (circle)

6. Shadows (Elevation)
   ```css
   --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
   --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
   --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
   ```
   
   **Usage:**
   - Cards: shadow-base
   - Dropdown/Popover: shadow-lg
   - Modals: shadow-xl
   - Buttons (hover): shadow-md

7. Animations & Transitions
   ```css
   --transition-fast: 150ms ease-in-out;
   --transition-base: 200ms ease-in-out;
   --transition-slow: 300ms ease-in-out;
   ```
   
   **Usage:**
   - Hover states: transition-fast
   - Modal open/close: transition-base
   - Page transitions: transition-slow
   
   **Easing functions:**
   - ease-in-out: Default (smooth start & end)
   - ease-in: Accelerating (modal enter)
   - ease-out: Decelerating (modal exit)

8. Z-Index Layers
   ```css
   --z-dropdown: 1000;
   --z-sticky: 1100;
   --z-fixed: 1200;
   --z-modal-backdrop: 1300;
   --z-modal: 1400;
   --z-popover: 1500;
   --z-tooltip: 1600;
   ```

9. Breakpoints (Tailwind defaults)
   ```css
   --breakpoint-sm: 640px;   /* Mobile landscape */
   --breakpoint-md: 768px;   /* Tablet */
   --breakpoint-lg: 1024px;  /* Desktop */
   --breakpoint-xl: 1280px;  /* Large desktop */
   --breakpoint-2xl: 1536px; /* Extra large */
   ```

10. Accessibility Compliance
    - **Color contrast:** All text meets WCAG AA (4.5:1)
    - **Focus indicators:** 2px solid ring on focus
    - **Touch targets:** Minimum 44x44px (mobile)
    - **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables animations

**Deliverables:**
- [ ] CSS variables file (design-tokens.css)
- [ ] Tailwind config file (tailwind.config.js with custom theme)
- [ ] Figma Styles library (synced with code)
- [ ] Style guide page (living documentation in Storybook)

**Checklist:**
- [ ] Color palette defined (brand, neutral, semantic)
- [ ] Typography scale established (fonts, sizes, weights)
- [ ] Spacing system (8px grid) documented
- [ ] Border radius, shadows, animations defined
- [ ] Z-index layers organized
- [ ] Accessibility guidelines followed
- [ ] Tokens exported to code (CSS vars + Tailwind config)
- [ ] Living style guide published (Storybook)
- [ ] Reviewed by Tech Lead + Frontend

**Status:** ⏳ To Do (Phase 1, Week 3-4)

---

### **File 3: 03-Component-Library.md** ⏳ TO DO
**Nội dung:** Reusable UI components catalog

**Sections bắt buộc:**
1. Introduction
   - Purpose: Catalog of all reusable components
   - Library: shadcn/ui (headless components) + custom components
   - Documentation: Storybook for interactive demos
2. Component Categories
   
   **2.1 Form Components (8 components)**
   - Button (primary, secondary, ghost, danger)
   - Input (text, email, password, search)
   - Textarea
   - Select / Dropdown
   - Checkbox
   - Radio
   - Switch / Toggle
   - DatePicker
   
   **2.2 Layout Components (5 components)**
   - Container (max-width wrapper)
   - Grid (responsive grid system)
   - Card (surface with shadow)
   - Divider (horizontal/vertical line)
   - Spacer (vertical spacing)
   
   **2.3 Navigation Components (4 components)**
   - Navbar (top navigation)
   - Sidebar (left navigation)
   - Breadcrumbs
   - Tabs
   
   **2.4 Feedback Components (6 components)**
   - Alert (info, success, warning, error)
   - Toast / Notification
   - Modal / Dialog
   - Popover
   - Tooltip
   - Spinner / Loading
   
   **2.5 Data Display (6 components)**
   - Avatar
   - Badge
   - DataTable (with sorting, filtering, pagination)
   - Chart (Line, Bar, Pie - Recharts)
   - EmptyState
   - Skeleton (loading placeholder)
   
   **2.6 Custom Components (5 components)**
   - MessageBubble (chat UI)
   - VoiceRecorder (audio recording)
   - FileUploader (drag & drop)
   - AgentSelector (modal)
   - StreamingIndicator (AI typing animation)

3. Component Documentation Template
   
   **Mỗi component phải có:**
   ```markdown
   ### Component: [Name]
   
   **Category:** Form / Layout / Navigation / Feedback / Data / Custom
   **Design System Ref:** [Link to 02-Design-System.md section]
   **Figma:** [Link to Figma component]
   
   **Description:**
   Brief description of what this component does and when to use it.
   
   **Props / API:**
   | Prop | Type | Default | Required | Description |
   |------|------|---------|----------|-------------|
   | variant | 'primary' \| 'secondary' | 'primary' | No | Button style variant |
   | size | 'sm' \| 'md' \| 'lg' | 'md' | No | Button size |
   | disabled | boolean | false | No | Disabled state |
   | onClick | () => void | - | No | Click handler |
   | children | ReactNode | - | Yes | Button text/content |
   
   **Variants:**
   - Primary: Blue background, white text (CTA)
   - Secondary: Gray background, gray text (secondary actions)
   - Ghost: Transparent, gray text (tertiary actions)
   - Danger: Red background, white text (destructive actions)
   
   **States:**
   - Default: Normal state
   - Hover: Slightly darker background, shadow
   - Active: Even darker, shadow removed
   - Disabled: Gray, cursor not-allowed, no interaction
   - Loading: Spinner inside button, disabled
   
   **Accessibility:**
   - Keyboard: Enter/Space to activate
   - Screen reader: Proper aria-label if icon-only
   - Focus: Visible focus ring
   
   **Usage Example:**
   ```tsx
   import { Button } from '@/components/ui/button';
   
   <Button variant="primary" size="md" onClick={() => handleSubmit()}>
     Submit
   </Button>
   ```
   
   **Storybook:**
   View in Storybook → [Link]
   ```

4. Key Components Detail (10 components)
   
   **4.1 Button**
   - Variants: primary, secondary, ghost, danger, link
   - Sizes: sm (32px), md (40px), lg (48px)
   - With icon: icon-left, icon-right, icon-only
   - States: default, hover, active, disabled, loading
   - Accessibility: ARIA button role, keyboard support
   
   **4.2 Input**
   - Types: text, email, password, search, number, tel, url
   - With icon: prefix-icon, suffix-icon
   - States: default, focus, error, disabled
   - Validation: Show error message below input
   - Accessibility: Label, placeholder, error announcement
   
   **4.3 Card**
   - Variants: default, bordered, hoverable
   - Sections: header, body, footer
   - Example: ProjectCard (image, title, description, actions)
   
   **4.4 Modal**
   - Sizes: sm (400px), md (600px), lg (800px), full (90vw)
   - Sections: header (title, close button), body, footer (actions)
   - Backdrop: Semi-transparent overlay, click to close (optional)
   - Animation: Fade in/out, slide up (mobile)
   - Accessibility: Focus trap, Esc to close, ARIA dialog
   
   **4.5 DataTable**
   - Features: Sorting, filtering, pagination, row selection
   - Props: columns (config), data (array), onSort, onFilter, onPageChange
   - Example: Agent table (name, type, status, actions)
   
   **4.6 MessageBubble (Custom)**
   - Variants: user (right-aligned, blue), AI (left-aligned, gray)
   - Content: Text, code block, image, file attachment
   - Actions: Copy, regenerate (AI only), edit (user only)
   - Timestamp: Below message, small text
   - Streaming: Animated dots while AI typing
   - Accessibility: ARIA labels, keyboard navigation
   
   **4.7 VoiceRecorder (Custom)**
   - States: idle, recording, processing, error
   - UI: Waveform animation, timer, stop button
   - Props: onRecordingComplete (callback with audio blob)
   - Integration: Web Speech API / Whisper API
   - Accessibility: Visual feedback for deaf users
   
   **4.8 FileUploader (Custom)**
   - Drag & drop area
   - File preview: Thumbnail (image) / icon (PDF/TXT)
   - Validation: File type, size limit (10MB)
   - Progress: Upload progress bar
   - Multiple files: Support batch upload
   - Accessibility: Keyboard accessible, screen reader support
   
   **4.9 Toast / Notification**
   - Types: success, error, warning, info
   - Position: top-right (default), top-center, bottom-right
   - Duration: Auto-dismiss (3s default), manual close
   - Action: Optional action button (Undo, View)
   - Accessibility: ARIA live region, focus management
   
   **4.10 Skeleton**
   - Variants: text (lines), circle (avatar), rectangle (card)
   - Animation: Shimmer effect (pulse)
   - Usage: Show during data loading
   - Accessibility: aria-busy, aria-label "Loading..."

5. Component States Matrix
   
   | Component | Default | Hover | Active | Focus | Disabled | Loading | Error |
   |-----------|---------|-------|--------|-------|----------|---------|-------|
   | Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
   | Input | ✅ | - | - | ✅ | ✅ | - | ✅ |
   | Card | ✅ | ✅ | - | - | - | ✅ | - |
   | Modal | ✅ | - | - | - | - | ✅ | - |
   | DataTable | ✅ | - | - | - | - | ✅ | ✅ |

6. Responsive Behavior
   - **Mobile (<768px):** Stack vertically, full width, larger touch targets
   - **Tablet (768-1024px):** 2-column grids, medium sizes
   - **Desktop (>1024px):** Multi-column layouts, compact sizes

7. Storybook Documentation
   - **Setup:** npm run storybook
   - **URL:** http://localhost:6006
   - **Stories:** Each component has 5+ stories (default, variants, states, playground)
   - **Interactive:** Controls panel to modify props live
   - **Accessibility:** Built-in a11y addon for testing

8. Component Development Workflow
   ```
   1. Design in Figma (Designer)
   2. Create component in code (Frontend)
   3. Write Storybook story (Frontend)
   4. Write tests (unit + accessibility)
   5. Document in this file
   6. Review & approve (Designer + Tech Lead)
   7. Merge & publish to Storybook
   ```

**Deliverables:**
- [ ] 30+ components built (shadcn/ui + custom)
- [ ] Storybook with all components documented
- [ ] Component props documented (TypeScript interfaces)
- [ ] Unit tests for each component (>80% coverage)
- [ ] Accessibility tests passing
- [ ] Design-dev sync (Figma → Code match)

**Checklist:**
- [ ] All 6 categories have components (Form, Layout, Nav, Feedback, Data, Custom)
- [ ] 10 key components detailed (Button, Input, Card, Modal, Table, MessageBubble, VoiceRecorder, FileUploader, Toast, Skeleton)
- [ ] Each component has: Description, Props, Variants, States, Accessibility, Usage example
- [ ] Storybook running with 100+ stories
- [ ] Component tests written
- [ ] Responsive behavior documented
- [ ] Reviewed by Designer + Frontend Lead
- [ ] Published to npm (internal registry) / shared via Git

**Status:** ⏳ To Do (Phase 1-2, Week 5-8)

---

### **File 4: 04-User-Flows.md** ⏳ TO DO
**Nội dung:** User journey maps & task flows

**Sections bắt buộc:**
1. Introduction
   - Purpose: Visualize user journeys through the app
   - Tools: Mermaid flowcharts, Figma flows
   - Users: Admin, Owner, Member, Viewer (4 roles)
2. Key User Flows (10 flows từ US-001 to US-010)
   
   **2.1 User Flow: Signup & Login (US-001)**
   ```mermaid
   graph TD
     A[Landing Page] --> B{New User?}
     B -->|Yes| C[Click Signup]
     B -->|No| D[Click Login]
     C --> E{Choose Method}
     E -->|Email| F[Enter Email/Password]
     E -->|Google| G[OAuth: Google]
     E -->|Facebook| H[OAuth: Facebook]
     E -->|TikTok| I[OAuth: TikTok]
     F --> J[Verify Email]
     G --> K[Auth Success]
     H --> K
     I --> K
     J --> K
     K --> L[Redirect to Dashboard]
     D --> M[Enter Credentials]
     M --> N{Valid?}
     N -->|Yes| K
     N -->|No| O[Show Error]
     O --> M
   ```
   
   **Steps:**
   1. User lands on homepage
   2. Click "Get Started" or "Login"
   3. If signup: Choose provider (Google/Facebook/TikTok/Email)
   4. If email: Fill form, verify email
   5. If OAuth: Redirect, authorize, callback
   6. Success: Redirect to dashboard
   7. Error: Show error message, retry
   
   **Happy Path:** 3 clicks (Landing → Login → Google → Dashboard)
   **Pain Points:** Email verification delay (send again option)
   
   **2.2 User Flow: Create Project & Invite Members (US-005)**
   ```mermaid
   graph TD
     A[Dashboard] --> B[Click 'New Project']
     B --> C[Enter Project Name]
     C --> D[Click 'Create']
     D --> E[Project Created]
     E --> F[Project Detail Page]
     F --> G[Click 'Invite Member']
     G --> H[Enter Email]
     H --> I[Select Role: Owner/Editor/Viewer]
     I --> J[Click 'Send Invite']
     J --> K[Invite Sent]
     K --> L{Member Accepts?}
     L -->|Yes| M[Member Added]
     L -->|No| N[Invite Pending]
   ```
   
   **Steps:**
   1. From dashboard, click "New Project"
   2. Enter project name, click Create
   3. Project created, redirect to detail page
   4. Click "Invite Member" button
   5. Enter email, select role (Owner/Editor/Viewer)
   6. Send invite (email sent)
   7. Member receives email, clicks link
   8. Member added to project
   
   **Happy Path:** 5 clicks
   **Alternate Path:** Invite via shareable link (copy link → share)
   
   **2.3 User Flow: Chat with AI (US-002)**
   ```mermaid
   graph TD
     A[Project Dashboard] --> B[Click 'New Conversation']
     B --> C[Select Agent: GPT/Gemini/Custom]
     C --> D[Chat Interface Loads]
     D --> E[Type Message]
     E --> F[Click Send OR Press Enter]
     F --> G[API Call to Agent]
     G --> H{Success?}
     H -->|Yes| I[Streaming Response]
     H -->|No| J[Error: Retry]
     I --> K[Message Saved to Thread]
     K --> L{Continue Chat?}
     L -->|Yes| E
     L -->|No| M[Close Thread]
   ```
   
   **Steps:**
   1. Open project
   2. Click "New Conversation" or select existing thread
   3. Select AI agent (GPT-4, Gemini, etc.)
   4. Type message in input box
   5. Send (Enter or Click Send button)
   6. Watch streaming response (animated)
   7. Message saved to thread (context maintained)
   8. Continue chatting or close
   
   **Happy Path:** 3 clicks + typing
   **Context Maintained:** Thread ID sent with each message
   
   **2.4 User Flow: Voice Chat (US-003)**
   ```mermaid
   graph TD
     A[Chat Interface] --> B[Click Voice Button]
     B --> C[Request Mic Permission]
     C --> D{Permission Granted?}
     D -->|Yes| E[Recording UI Appears]
     D -->|No| F[Show Error]
     E --> G[User Speaks]
     G --> H[Click Stop]
     H --> I[Transcribing... STT API]
     I --> J{Transcription Success?}
     J -->|Yes| K[Text Appears in Input]
     J -->|No| L[Error: Try Again]
     K --> M[Click Send]
     M --> N[AI Response: Text]
     N --> O[Click TTS Play]
     O --> P[Audio Playback]
   ```
   
   **Steps:**
   1. In chat, click microphone icon
   2. Grant mic permission (browser prompt)
   3. Recording modal opens
   4. Speak message (waveform animation)
   5. Click Stop button
   6. Transcribing... (STT: Speech-to-Text)
   7. Transcribed text appears in input
   8. Review, edit if needed, send
   9. AI responds with text
   10. (Optional) Click speaker icon to hear TTS (Text-to-Speech)
   
   **Happy Path:** 4 clicks + speaking
   **Pain Points:** STT accuracy (edit option provided)
   
   **2.5 User Flow: File Upload (US-004)**
   ```mermaid
   graph TD
     A[Chat Interface] --> B[Click Attach Button]
     B --> C[File Picker Opens]
     C --> D[Select File: PDF/TXT/Image]
     D --> E[File Preview Shows]
     E --> F{Correct File?}
     F -->|Yes| G[Click Upload]
     F -->|No| H[Remove, Select Again]
     G --> I[Uploading... Progress Bar]
     I --> J[Extract Text: Server]
     J --> K[File Attached to Message]
     K --> L[Type Message with Context]
     L --> M[Send to AI]
     M --> N[AI Responds Using File Context]
   ```
   
   **Steps:**
   1. Click paperclip/attach icon
   2. Select file (PDF/TXT/Image)
   3. File preview appears
   4. Confirm or remove
   5. Upload (progress bar)
   6. Server extracts text (OCR for images)
   7. File attached to conversation
   8. Type message: "Summarize this document"
   9. AI uses file context to respond
   
   **Happy Path:** 3 clicks + upload
   **File Size Limit:** 10MB (show error if exceeded)
   
   **2.6 User Flow: Manage Agents (Admin) (US-006)**
   ```mermaid
   graph TD
     A[Admin Dashboard] --> B[Click 'Agent Management']
     B --> C[Agent Table Loads]
     C --> D[Click 'Add Agent']
     D --> E[Modal: Create Agent Form]
     E --> F[Fill Name, Type, Endpoint, Credentials]
     F --> G[Click 'Test Connection']
     G --> H{Connection OK?}
     H -->|Yes| I[Click 'Save']
     H -->|No| J[Show Error, Fix]
     I --> K[Agent Created]
     K --> L[Appears in Table]
     L --> M{Need Edit?}
     M -->|Yes| N[Click Edit]
     M -->|No| O[Done]
     N --> E
   ```
   
   **Steps (Admin only):**
   1. Navigate to Agent Management page
   2. View table of existing agents
   3. Click "Add Agent" button
   4. Fill form: Name, Type (External/Self-hosted), API endpoint, Credentials
   5. Click "Test Connection" (verify agent responds)
   6. If success, click "Save"
   7. Agent added to system
   8. Users can now select this agent in chat
   
   **Happy Path:** 4 clicks + form fill
   **Security:** Credentials encrypted before storage
   
   **2.7 User Flow: View Billing Report (US-007)**
   ```mermaid
   graph TD
     A[Dashboard] --> B[Click 'Billing']
     B --> C[Billing Dashboard Loads]
     C --> D[Default: Last 30 Days]
     D --> E{Want Custom Range?}
     E -->|Yes| F[Select Date Range]
     E -->|No| G[View Charts]
     F --> G
     G --> H[Apply Filters: Agent/Project]
     H --> I[Charts Update]
     I --> J{Need Export?}
     J -->|Yes| K[Click 'Export CSV']
     J -->|No| L[Done]
     K --> M[CSV Downloaded]
   ```
   
   **Steps:**
   1. Click "Billing" in navigation
   2. Dashboard loads with default view (last 30 days)
   3. View charts: Usage over time, Cost by agent, Top projects
   4. (Optional) Change date range with picker
   5. (Optional) Filter by agent or project
   6. Charts update dynamically
   7. (Optional) Export to CSV for offline analysis
   
   **Happy Path:** 2 clicks (view report)
   **Extended Path:** 5 clicks (custom filters + export)
   
   **2.8 User Flow: Deploy Self-Hosted Agent (US-008)**
   ```mermaid
   graph TD
     A[Agent Management] --> B[Click 'Deploy Self-Hosted']
     B --> C[Modal: Docker Image URL]
     C --> D[Enter Image URL]
     D --> E[Enter Environment Vars]
     E --> F[Click 'Deploy']
     F --> G[Deploying... Spinner]
     G --> H{Deployment Success?}
     H -->|Yes| I[Health Check: Container Running]
     H -->|No| J[Show Error Logs]
     I --> K[Agent Active]
     K --> L[Available in Agent Selector]
   ```
   
   **Steps (Advanced users):**
   1. In Agent Management, click "Deploy Self-Hosted"
   2. Enter Docker image URL (e.g., from Docker Hub)
   3. Configure environment variables (API keys, model config)
   4. Click "Deploy"
   5. System deploys container to K8s
   6. Health check verifies container running
   7. Agent marked as Active
   8. Users can now use this custom agent
   
   **Happy Path:** 3 clicks + config
   **Technical:** Requires Docker knowledge
   
   **2.9 User Flow: Manage Threads (US-009)**
   ```mermaid
   graph TD
     A[Project Detail] --> B[View Conversations Tab]
     B --> C[List of Threads]
     C --> D{Action?}
     D -->|New| E[Create New Thread]
     D -->|Open| F[Open Existing Thread]
     D -->|Rename| G[Edit Title Inline]
     D -->|Archive| H[Archive Thread]
     E --> I[Enter Thread Title]
     I --> J[Thread Created]
     J --> K[Chat Interface]
     F --> K
     G --> L[Thread Renamed]
     H --> M[Thread Archived: Hidden]
   ```
   
   **Steps:**
   1. Open project
   2. Go to "Conversations" tab
   3. View list of threads with previews
   4. Actions available:
      - Create new thread (click + button)
      - Open thread (click on thread)
      - Rename thread (click edit icon, inline edit)
      - Archive thread (click archive icon)
   5. Thread context maintained across sessions
   
   **Happy Path:** 2 clicks (open existing thread)
   **Organization:** Search threads, filter by agent
   
   **2.10 User Flow: Train Custom Agent (US-010)**
   ```mermaid
   graph TD
     A[Agent Management] --> B[Click 'Train Custom Agent']
     B --> C[Modal: Select Base Model]
     C --> D[Choose: Hugging Face Model]
     D --> E[Upload Training Dataset]
     E --> F[Configure: Epochs, Batch Size]
     F --> G[Click 'Start Training']
     G --> H[Training Job Queued]
     H --> I[Progress Bar: Updating]
     I --> J{Training Complete?}
     J -->|Yes| K[Model Trained]
     J -->|No| L[Wait... Check Logs]
     K --> M[Click 'Deploy']
     M --> N[Model Deployed]
     N --> O[Available as Agent]
   ```
   
   **Steps (ML engineers):**
   1. In Agent Management, click "Train Custom Agent"
   2. Select base model (e.g., from Hugging Face)
   3. Upload training dataset (CSV/JSON)
   4. Configure training params: Epochs, learning rate, batch size
   5. (Optional) AI suggests optimal params
   6. Click "Start Training"
   7. Training job runs (may take hours)
   8. Monitor progress via dashboard
   9. When complete, click "Deploy"
   10. Model deployed as new agent
   11. Users can chat with custom-trained agent
   
   **Happy Path:** 5 clicks + wait time
   **Technical:** Requires ML knowledge

3. Edge Cases & Error Handling
   
   | Flow | Error Scenario | User Action | System Response |
   |------|----------------|-------------|-----------------|
   | Login | Invalid credentials | Retry | "Invalid email or password" |
   | Chat | Agent timeout | Retry button | "Agent not responding. Try again?" |
   | Voice | Mic permission denied | Manual text input | "Microphone access denied. Type instead?" |
   | File Upload | File too large (>10MB) | Compress or split | "File exceeds 10MB limit" |
   | Agent Deploy | Container crash | View logs | Error logs + retry option |

4. User Personas
   
   **Persona 1: Alice (Admin)**
   - Goal: Manage agents, view billing
   - Frequency: Daily
   - Tech Savvy: High
   
   **Persona 2: Bob (Project Owner)**
   - Goal: Create projects, invite team, chat with AI
   - Frequency: Daily
   - Tech Savvy: Medium
   
   **Persona 3: Carol (Team Member)**
   - Goal: Chat with AI, upload files, view threads
   - Frequency: Multiple times daily
   - Tech Savvy: Medium
   
   **Persona 4: Dave (Viewer)**
   - Goal: Read conversations, view reports
   - Frequency: Weekly
   - Tech Savvy: Low

5. Journey Map: New User Onboarding
   ```
   1. Discover (Landing page) → 2. Signup (30s) → 3. First login (Dashboard) →
   4. Create first project (1 min) → 5. First chat (2 min) → 6. Invite teammate (2 min)
   
   Total: ~6 minutes to value
   ```

6. Success Metrics per Flow
   - Login success rate: >95%
   - Chat message sent rate: >90% (no errors)
   - Voice transcription accuracy: >90%
   - File upload success: >98%
   - Agent deployment time: <5 minutes
   - Time to first chat: <2 minutes (new user)

**Deliverables:**
- [ ] 10 user flows documented (Mermaid + Figma)
- [ ] Edge cases & error scenarios mapped
- [ ] User personas defined (4 roles)
- [ ] Journey map for onboarding
- [ ] Success metrics defined

**Checklist:**
- [ ] All 10 US covered with flows (US-001 to US-010)
- [ ] Happy paths identified (minimum clicks)
- [ ] Pain points documented
- [ ] Error handling flows included
- [ ] Mermaid diagrams render correctly
- [ ] Figma flows synced with code
- [ ] Reviewed by UX Designer + PO
- [ ] Validated with user testing (optional)

**Status:** ⏳ To Do (Phase 0, Week 1-2)

---

## ✅ WORKFLOW

```
Phase 0 - Week 1-2:
  Step 1: UX Designer creates User Flows (File 4)
  Step 2: Validate with PO + stakeholders
          ↓
Phase 0 - Week 2-4:
  Step 3: UI Designer creates Wireframes (File 1)
  Step 4: Review with team, iterate
          ↓
Phase 1 - Week 3-4:
  Step 5: Designer establishes Design System (File 2)
  Step 6: Export tokens to code (CSS vars, Tailwind)
          ↓
Phase 1-2 - Week 5-8:
  Step 7: Frontend builds Component Library (File 3)
  Step 8: Storybook published
  Step 9: Design-dev sync (Figma ↔ Code)
          ↓
Ongoing:
  Design system evolves with feedback
  New components added as needed
```

---

## 👥 RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| User Flows | UX Designer | Product Designer | PO, PM | Dev Team |
| Wireframes | UI Designer | Product Designer | PO, Frontend | All Team |
| Design System | UI Designer | Product Designer | Tech Lead | Frontend |
| Component Library | Frontend Lead + Designer | Tech Lead | Designer | All Devs |
| Storybook | Frontend | Frontend Lead | Designer | All Team |

---

## 📊 PROGRESS

**Overall:** 🔴 0% Complete (0/4 files)

| File | Status | Progress | Blocker |
|------|--------|----------|---------|
| 01-UI-Wireframes.md | ⏳ To Do | 0% | Phase 0 not started |
| 02-Design-System.md | ⏳ To Do | 0% | Waiting for wireframes |
| 03-Component-Library.md | ⏳ To Do | 0% | Waiting for design system |
| 04-User-Flows.md | ⏳ To Do | 0% | Phase 0 not started |

**Next Action:** Start User Flows + Wireframes in Phase 0

---

## 🔄 DESIGN UPDATES

**Weekly:**
- Design review meetings (Designer + Frontend)
- Sync Figma → Code (check component match)
- Update Storybook with new components

**Per Milestone:**
- Design new screens for upcoming features
- User testing (optional, with beta users)
- Iterate based on feedback

**Quarterly:**
- Design system audit (unused styles, inconsistencies)
- Accessibility audit (WCAG compliance check)
- Update design tokens (colors, spacing, typography)

---

## 💡 TIPS CHO DESIGNERS

### **When Creating Wireframes:**
- Start with mobile (constraints force clarity)
- Focus on content hierarchy (what's most important?)
- Use real content, not Lorem Ipsum (reveals issues)
- Think responsive (design for all 3 breakpoints)
- Annotate interactions (what happens on click?)

### **When Building Design System:**
- Start small (colors, typography, spacing)
- Use variables (easy to change later)
- Document decisions (why this color? why 8px grid?)
- Test accessibility (color contrast, font sizes)
- Get dev feedback (is this implementable?)

### **When Developing Components:**
- Build atomic (small, reusable pieces)
- Think composition (Button + Icon = IconButton)
- Handle all states (not just happy path)
- Write stories (Storybook for every variant)
- Test accessibility (keyboard, screen reader)

### **Collaboration with Developers:**
- Use Figma → Code plugins (reduce manual work)
- Attend daily standups (stay in sync)
- Review PRs (check design implementation)
- Pair program (sit with dev, build together)
- Accept compromises (perfect is enemy of good)

---

## 🔗 THAM CHIẾU

**Internal:**
- [User Stories](../01-requirements/03-User-Stories.md) - Features to design for
- [Architecture Guidelines](../02-architecture/06-Architecture-Guidelines.md) - Technical constraints
- [Coding Conventions](../04-development/01-Coding-Conventions.md) - Code style for components

**External - Design Systems:**
- [Material Design 3](https://m3.material.io/) - Google's design system
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Headless component library

**External - Tools:**
- [Figma](https://www.figma.com/) - Design tool
- [Storybook](https://storybook.js.org/) - Component documentation
- [Lucide Icons](https://lucide.dev/) - Open source icon library
- [Mermaid](https://mermaid.js.org/) - Diagram as code

**Inspiration:**
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Mobbin](https://mobbin.com/) - Mobile app patterns
- [Land Book](https://land-book.com/) - Landing page inspiration

---

**Last Updated:** October 15, 2025  
**Maintained by:** Design Team  
**Questions?** Contact design@chatai.com
