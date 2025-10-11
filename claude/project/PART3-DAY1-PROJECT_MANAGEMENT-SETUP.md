# PART 3 - DAY 1: PROJECT MANAGEMENT SETUP

**Phase:** Phase 0 - Pre-Start  
**Duration:** 4 hours (Morning + Afternoon)  
**Goal:** Setup Jira project + GitHub repo + Husky hooks  
**Prerequisites:** 
- ✅ PART 2 (Jira Setup Guide) completed
- ✅ GitHub account
- ✅ Node.js 18+ installed

---

## 📋 MORNING SESSION (2 hours)

### ✅ Task 1.1: Jira Setup Verification (30 min)

**Action:** Verify Jira from PART 2 is complete

**Checklist:**
- [ ] Workspace: `thanhhaunv.atlassian.net` accessible
- [ ] Project "ChatAI Platform" (CAP) exists
- [ ] 5 Epics visible (CAP-1 to CAP-5)
- [ ] 14 Stories visible (CAP-6 to CAP-20)
- [ ] 6 team members added
- [ ] Sprint 1 created with M1 & M2

**If incomplete:** Go back to PART 2 and complete missing steps

---

### ✅ Task 1.2: Create GitHub Repository (30 min)

**Step 1: Create Repo**
1. Go to https://github.com/new
2. Repository name: `ChatAI-Platform`
3. Description: `Multi-tenant AI chat platform with voice, file upload, agent management`
4. Visibility: **Private** (hoặc Public nếu muốn)
5. ✅ Initialize with README
6. Add `.gitignore`: Node
7. License: MIT (optional)
8. Click **Create repository**

**Step 2: Clone Locally**
```bash
git clone https://github.com/thanhhaunv/ChatAI-Platform.git
cd ChatAI-Platform
```

**Step 3: Create Branch Structure**
```bash
# Create develop branch
git checkout -b develop
git push -u origin develop

# Set develop as default branch on GitHub
# (GitHub → Settings → Branches → Default branch → develop)
```

---

### ✅ Task 1.3: Create GitHub Projects Board (1 hour)

**Step 1: Create Project**
1. Go to repo → **Projects** tab
2. Click **New project**
3. Choose template: **Board**
4. Name: `ChatAI Platform - Sprint Board`
5. Click **Create**

**Step 2: Configure Columns**
- **Backlog** (for future sprints)
- **Sprint Backlog** (current sprint)
- **In Progress**
- **Review** (PR review)
- **Testing**
- **Done**

**Step 3: Link to Jira**
- Add 14 issues from Jira (M1-M14)
- For each issue:
  - Title: `[CAP-X] Milestone name`
  - Labels: `milestone-X`, `phase-X`
  - Assign to team member

**Step 4: Create Sprint 1**
- Move CAP-6 (M1) and CAP-7 (M2) to **Sprint Backlog**

---

## 📋 AFTERNOON SESSION (2 hours)

### ✅ Task 1.4: Create PR Template (15 min)

**Create file:** `.github/pull_request_template.md`

```markdown
## Description
<!-- Describe what this PR does -->

## Jira Ticket
<!-- Link to Jira issue: CAP-XXX -->
Closes CAP-

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
<!-- How was this tested? -->
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines (ESLint + Prettier)
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
- [ ] Husky hooks pass

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->
```

**Commit:**
```bash
git add .github/pull_request_template.md
git commit -m "chore: add PR template"
git push origin develop
```

---

### ✅ Task 1.5: Setup Branch Protection (15 min)

**On GitHub:**
1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass (CI)
   - ✅ Require conversation resolution
5. Click **Create**

**Repeat for `develop` branch**

---

### ✅ Task 1.6: Install Husky + Setup Hooks (1.5 hours)

**Step 1: Initialize Node Project**
```bash
# In repo root
npm init -y
```

**Step 2: Install Dependencies**
```bash
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional eslint prettier
```

**Step 3: Initialize Husky**
```bash
npx husky-init
npm install
```

**Step 4: Create `.husky/pre-commit` Hook**

Delete default file, create new:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run lint-staged
npx lint-staged

# Check if there are any errors
if [ $? -ne 0 ]; then
  echo "❌ Pre-commit checks failed. Please fix errors before committing."
  exit 1
fi

echo "✅ Pre-commit checks passed!"
```

**Make executable:**
```bash
chmod +x .husky/pre-commit
```

---

**Step 5: Create `.husky/commit-msg` Hook**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Validating commit message..."

# Run commitlint
npx --no -- commitlint --edit $1

if [ $? -ne 0 ]; then
  echo "❌ Commit message does not follow Conventional Commits format."
  echo "Examples:"
  echo "  feat: add user authentication"
  echo "  fix: resolve login bug"
  echo "  docs: update README"
  echo "  chore: update dependencies"
  exit 1
fi

echo "✅ Commit message valid!"
```

**Make executable:**
```bash
chmod +x .husky/commit-msg
```

---

**Step 6: Create `.husky/pre-push` Hook**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-push checks..."

# Run tests (when tests exist)
# npm test

# For now, just lint
npm run lint

if [ $? -ne 0 ]; then
  echo "❌ Pre-push checks failed. Please fix errors before pushing."
  exit 1
fi

echo "✅ Pre-push checks passed!"
```

**Make executable:**
```bash
chmod +x .husky/pre-push
```

---

**Step 7: Create Config Files**

**`.lintstagedrc.json`**
```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yaml,yml}": [
    "prettier --write"
  ]
}
```

**`commitlint.config.js`**
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style (formatting)
        'refactor', // Refactoring
        'test',     // Tests
        'chore',    // Maintenance
        'perf',     // Performance
        'ci',       // CI/CD
        'build',    // Build system
        'revert'    // Revert commit
      ]
    ],
    'subject-case': [0]
  }
};
```

**`.eslintrc.json`**
```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}
```

**`.prettierrc`**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

**Step 8: Update `package.json`**

Add scripts:
```json
{
  "name": "chatai-platform",
  "version": "0.1.0",
  "description": "Multi-tenant AI chat platform",
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,yaml,yml}\"",
    "prepare": "husky install"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/thanhhaunv/ChatAI-Platform.git"
  },
  "author": "thanhhaunv",
  "license": "MIT",
  "devDependencies": {
    "@commitlint/cli": "^18.0.0",
    "@commitlint/config-conventional": "^18.0.0",
    "eslint": "^8.54.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.1.0",
    "prettier": "^3.1.0"
  }
}
```

---

**Step 9: Test Husky Hooks**

**Test 1: Pre-commit (formatting)**
```bash
# Create a test file with bad formatting
echo "const x=1;console.log(x)" > test.js

# Try to commit (should fail and auto-fix)
git add test.js
git commit -m "test: bad formatting"

# Should auto-format and succeed
```

**Test 2: Commit-msg (conventional commits)**
```bash
# Try bad commit message
git commit -m "bad message"
# ❌ Should fail

# Try good commit message
git commit -m "test: add test file"
# ✅ Should pass
```

**Test 3: Pre-push (linting)**
```bash
# Push to remote
git push origin develop
# ✅ Should pass if no lint errors
```

---

**Step 10: Commit Husky Setup**
```bash
git add .
git commit -m "chore: setup husky git hooks for code quality"
git push origin develop
```

---

## ✅ END OF DAY 1 CHECKLIST

**Verify everything is complete:**

- [ ] Jira workspace fully configured (from PART 2)
- [ ] GitHub repo created: `ChatAI-Platform`
- [ ] Branches: `main` and `develop` exist
- [ ] GitHub Projects board created with 6 columns
- [ ] M1 & M2 moved to Sprint Backlog
- [ ] PR template created
- [ ] Branch protection enabled
- [ ] Husky installed and configured
- [ ] 3 Git hooks working:
  - [ ] `pre-commit` (lint-staged)
  - [ ] `commit-msg` (conventional commits)
  - [ ] `pre-push` (linting)
- [ ] Test commit with proper format passes
- [ ] Test commit with bad format fails

---

## 📸 SCREENSHOTS TO SAVE

Take screenshots for documentation:
1. GitHub repo homepage
2. GitHub Projects board
3. Jira Sprint 1 with M1 & M2
4. Terminal showing successful Husky hook execution

---

## 🎯 DELIVERABLES

**By end of Day 1, you should have:**
- ✅ GitHub repo with branch protection
- ✅ Husky enforcing code quality (lint, format, commit messages)
- ✅ PR template for consistent reviews
- ✅ GitHub Projects board linked to Jira
- ✅ Foundation for clean Git workflow

---

## 🚀 NEXT STEP

**Tomorrow:** Day 2 - Communication & Environment Setup
- Slack workspace configuration
- Docker Compose setup
- Local development environment

**File:** `PART3-DAY2-Communication-Environment.md`

---

**Estimated Time:** 4 hours  
**Status:** ✅ Ready to execute  
**Dependencies:** PART 2 completed
