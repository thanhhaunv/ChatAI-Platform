# PART 3 - DAY 3: API KEYS & ACCOUNTS

**Phase:** Phase 0 - Pre-Start  
**Duration:** 3-4 hours  
**Goal:** Get all OAuth credentials + AI API keys  
**Prerequisites:** 
- ✅ Day 2 completed (Slack + Docker running)
- ✅ `.env` file exists in repo root
- ✅ Google/Facebook/TikTok personal accounts

---

## 📋 MORNING SESSION (2 hours)

### ✅ Task 3.1: Google OAuth Setup (45 min)

**Step 1: Create Google Cloud Project**

1. **Go to:** https://console.cloud.google.com/
2. **Click:** "Select a project" (top left) → **New Project**
3. **Fill in:**
   - Project name: `ChatAI Platform`
   - Organization: (leave blank if personal)
   - Location: (leave default)
4. **Click:** "Create"
5. **Wait:** ~30 seconds for project to be created
6. **Select:** Your new project from dropdown (top left)

---

**Step 2: Enable Google+ API**

1. **Go to:** https://console.cloud.google.com/apis/library
2. **Search:** `Google+ API`
3. **Click:** "Google+ API"
4. **Click:** "Enable"
5. **Wait:** ~10 seconds

---

**Step 3: Configure OAuth Consent Screen**

1. **Go to:** https://console.cloud.google.com/apis/credentials/consent
2. **Select:** "External" (for testing)
3. **Click:** "Create"

**Page 1: OAuth consent screen**
- App name: `ChatAI Platform`
- User support email: `thanhhaunv@gmail.com`
- App logo: (skip for now)
- Application home page: `http://localhost:3000`
- Application privacy policy: `http://localhost:3000/privacy`
- Application terms of service: `http://localhost:3000/terms`
- Authorized domains: (leave empty for localhost testing)
- Developer contact: `thanhhaunv@gmail.com`
- **Click:** "Save and Continue"

**Page 2: Scopes**
- **Click:** "Add or Remove Scopes"
- **Select:**
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
  - `openid`
- **Click:** "Update"
- **Click:** "Save and Continue"

**Page 3: Test users**
- **Click:** "Add Users"
- **Enter:** `thanhhaunv@gmail.com` (your email)
- **Click:** "Add"
- **Click:** "Save and Continue"

**Page 4: Summary**
- **Review** all information
- **Click:** "Back to Dashboard"

---

**Step 4: Create OAuth Credentials**

1. **Go to:** https://console.cloud.google.com/apis/credentials
2. **Click:** "Create Credentials" → "OAuth client ID"
3. **Application type:** "Web application"
4. **Name:** `ChatAI Platform - Web`

**Authorized JavaScript origins:**
- **Click:** "Add URI"
- **Enter:** `http://localhost:3000`
- **Click:** "Add URI" again
- **Enter:** `http://localhost:3001` (for auth service)

**Authorized redirect URIs:**
- **Click:** "Add URI"
- **Enter:** `http://localhost:3000/auth/google/callback`
- **Click:** "Add URI" again
- **Enter:** `http://localhost:3001/auth/google/callback`

5. **Click:** "Create"

---

**Step 5: Copy Credentials to .env**

**A popup will show your credentials. DO NOT CLOSE IT YET!**

1. **Copy Client ID:** (looks like `1234567890-abcdef.apps.googleusercontent.com`)
2. **Open:** `.env` file in VS Code
3. **Find:** `GOOGLE_CLIENT_ID=`
4. **Paste:** Your Client ID after `=`
   ```bash
   GOOGLE_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com
   ```

5. **Copy Client Secret:** (looks like `GOCSPX-abcdef123456`)
6. **Find:** `GOOGLE_CLIENT_SECRET=`
7. **Paste:** Your Client Secret
   ```bash
   GOOGLE_CLIENT_SECRET=GOCSPX-abcdef123456
   ```

8. **Save:** `.env` file (Ctrl+S / Cmd+S)

**Click "OK" on the popup** (you can always retrieve credentials later)

---

**✅ Test Google OAuth (Quick Check)**

We'll test this properly in M2, but verify credentials are saved:
```bash
cat .env | grep GOOGLE
```

**Expected output:**
```
GOOGLE_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdef123456
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

✅ **Google OAuth setup complete!**

---

### ✅ Task 3.2: Facebook OAuth Setup (45 min)

**Step 1: Create Facebook App**

1. **Go to:** https://developers.facebook.com/
2. **Click:** "My Apps" (top right) → "Create App"
3. **Select:** "Authenticate and request data from users with Facebook Login"
4. **Click:** "Next"

**App Details:**
- App name: `ChatAI Platform`
- App contact email: `thanhhaunv@gmail.com`
- Business account: (skip for now)

5. **Click:** "Create app"
6. **Complete security check** (if asked)

---

**Step 2: Setup Facebook Login**

1. **On App Dashboard**, find "Facebook Login" card
2. **Click:** "Set Up"
3. **Select:** "Web"
4. **Site URL:** `http://localhost:3000`
5. **Click:** "Save"
6. **Click:** "Continue" (ignore the quickstart, we'll implement later)

---

**Step 3: Configure Facebook Login Settings**

1. **Left sidebar:** Click "Facebook Login" → "Settings"
2. **Valid OAuth Redirect URIs:**
   ```
   http://localhost:3000/auth/facebook/callback
   http://localhost:3001/auth/facebook/callback
   ```
   *(One per line)*
3. **Click:** "Save Changes"

---

**Step 4: Get App ID & Secret**

1. **Left sidebar:** Click "Settings" → "Basic"
2. **App ID:** (visible, looks like `1234567890123456`)
3. **App Secret:** Click "Show" → Enter Facebook password

---

**Step 5: Copy Credentials to .env**

1. **Copy App ID**
2. **Open:** `.env` file
3. **Find:** `FACEBOOK_APP_ID=`
4. **Paste:**
   ```bash
   FACEBOOK_APP_ID=1234567890123456
   ```

5. **Copy App Secret**
6. **Find:** `FACEBOOK_APP_SECRET=`
7. **Paste:**
   ```bash
   FACEBOOK_APP_SECRET=abcdef1234567890abcdef1234567890
   ```

8. **Save:** `.env` file

---

**Step 6: Add Test Users** *(Important for testing)*

1. **Left sidebar:** Click "Roles" → "Test Users"
2. **Click:** "Add"
3. **Enter:** 1 (number of test users)
4. **Click:** "Create"
5. **Copy test user credentials** for later testing

---

**Step 7: Switch to Development Mode**

1. **Top right:** Toggle switch to "In development"
2. **Confirm** (app is now in development mode)

**⚠️ Important:** Facebook Login only works with Test Users in development mode!

---

**✅ Test Facebook OAuth (Quick Check)**

```bash
cat .env | grep FACEBOOK
```

**Expected output:**
```
FACEBOOK_APP_ID=1234567890123456
FACEBOOK_APP_SECRET=abcdef1234567890abcdef1234567890
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

✅ **Facebook OAuth setup complete!**

---

### ✅ Task 3.3: TikTok OAuth Setup (30 min)

**⚠️ Note:** TikTok OAuth is more complex and requires app approval. For MVP, we can skip or use mock.

**Step 1: Create TikTok Developer Account**

1. **Go to:** https://developers.tiktok.com/
2. **Click:** "Register" (top right)
3. **Login:** With TikTok account
4. **Complete:** Profile information
5. **Verify:** Email

---

**Step 2: Create App**

1. **Go to:** https://developers.tiktok.com/apps
2. **Click:** "Create an app"
3. **Fill in:**
   - App name: `ChatAI Platform`
   - Company name: `Personal` (or your company)
   - Country/Region: `Vietnam` (hoặc nơi bạn ở)
4. **Click:** "Create"

---

**Step 3: Configure Login Kit**

1. **In App Dashboard**, click "Add Products"
2. **Select:** "Login Kit"
3. **Configure:**
   - Redirect URI: `http://localhost:3000/auth/tiktok/callback`

---

**Step 4: Get Client Key & Secret**

1. **Click:** "Manage apps" → Your app
2. **Find:** "Client Key" and "Client Secret"

---

**Step 5: Copy to .env**

```bash
TIKTOK_CLIENT_KEY=your-client-key
TIKTOK_CLIENT_SECRET=your-client-secret
```

---

**⚠️ Alternative: Skip TikTok for now**

TikTok requires app review which can take days. For Phase 0, we can:

**Option 1:** Leave empty in `.env` (we'll add later)
```bash
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
```

**Option 2:** Use mock values for development (won't work but won't break app)
```bash
TIKTOK_CLIENT_KEY=mock-tiktok-key
TIKTOK_CLIENT_SECRET=mock-tiktok-secret
```

**We'll implement proper TikTok OAuth in Phase 2 after approval.**

✅ **TikTok OAuth marked as TODO!**

---

## 📋 AFTERNOON SESSION (1-2 hours)

### ✅ Task 3.4: OpenAI API Key (30 min)

**Step 1: Create OpenAI Account**

1. **Go to:** https://platform.openai.com/signup
2. **Sign up** with Google account (easiest)
3. **Verify** email if needed
4. **Complete** phone verification

---

**Step 2: Add Payment Method** *(Required for API access)*

1. **Go to:** https://platform.openai.com/account/billing/overview
2. **Click:** "Add payment method"
3. **Enter:** Credit card details
4. **Set spending limit:** $10/month (để test, tránh bị charge nhiều)
5. **Click:** "Save"

**⚠️ Note:** OpenAI charges based on usage. For testing, $5-10 is enough.

---

**Step 3: Get API Key**

1. **Go to:** https://platform.openai.com/api-keys
2. **Click:** "Create new secret key"
3. **Name:** `ChatAI Platform - Development`
4. **Click:** "Create secret key"

**⚠️ IMPORTANT:** Copy the key NOW! You won't see it again!

---

**Step 4: Copy to .env**

1. **Copy API key** (looks like `sk-proj-abcdef1234567890...`)
2. **Open:** `.env` file
3. **Find:** `OPENAI_API_KEY=`
4. **Paste:**
   ```bash
   OPENAI_API_KEY=sk-proj-abcdef1234567890abcdef1234567890abcdef1234567890
   ```
5. **Save:** `.env` file

---

**✅ Test OpenAI API (Quick Check)**

Create a test script: `scripts/test-openai.js`

```javascript
const https = require('https');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.log('❌ OPENAI_API_KEY not found in .env');
  process.exit(1);
}

const data = JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Say "Hello from ChatAI!"' }],
  max_tokens: 20
});

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Length': data.length
  }
};

console.log('🔍 Testing OpenAI API...');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(body);
      console.log('✅ OpenAI API working!');
      console.log('Response:', response.choices[0].message.content);
    } else {
      console.log('❌ OpenAI API error:', res.statusCode);
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => {
  console.log('❌ Request error:', e.message);
});

req.write(data);
req.end();
```

**Run test:**
```bash
node scripts/test-openai.js
```

**Expected output:**
```
🔍 Testing OpenAI API...
✅ OpenAI API working!
Response: Hello from ChatAI!
```

✅ **OpenAI API key working!**

---

### ✅ Task 3.5: Google Gemini API Key (30 min)

**Step 1: Get Gemini API Key**

1. **Go to:** https://makersuite.google.com/app/apikey
2. **Click:** "Create API key"
3. **Select:** Your Google Cloud project (`ChatAI Platform`)
   - If not listed, select "Create API key in new project"
4. **Click:** "Create API key in existing project"

**⚠️ Copy the key immediately!**

---

**Step 2: Copy to .env**

1. **Copy API key** (looks like `AIzaSy...`)
2. **Open:** `.env` file
3. **Find:** `GEMINI_API_KEY=`
4. **Paste:**
   ```bash
   GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
   ```
5. **Save:** `.env` file

---

**✅ Test Gemini API (Quick Check)**

Create test script: `scripts/test-gemini.js`

```javascript
const https = require('https');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.log('❌ GEMINI_API_KEY not found in .env');
  process.exit(1);
}

const data = JSON.stringify({
  contents: [{
    parts: [{ text: 'Say "Hello from ChatAI!"' }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔍 Testing Gemini API...');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(body);
      console.log('✅ Gemini API working!');
      console.log('Response:', response.candidates[0].content.parts[0].text);
    } else {
      console.log('❌ Gemini API error:', res.statusCode);
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => {
  console.log('❌ Request error:', e.message);
});

req.write(data);
req.end();
```

**Run test:**
```bash
node scripts/test-gemini.js
```

**Expected output:**
```
🔍 Testing Gemini API...
✅ Gemini API working!
Response: Hello from ChatAI!
```

✅ **Gemini API key working!**

---

### ✅ Task 3.6: Update .env and Verify (30 min)

**Step 1: Final .env Check**

Open `.env` file and verify all keys are filled:

```bash
# OAuth - should be filled
GOOGLE_CLIENT_ID=1234567890-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdef123456
FACEBOOK_APP_ID=1234567890123456
FACEBOOK_APP_SECRET=abcdef1234567890abcdef1234567890
TIKTOK_CLIENT_KEY=mock-tiktok-key  # or empty for now
TIKTOK_CLIENT_SECRET=mock-tiktok-secret

# AI APIs - should be filled
OPENAI_API_KEY=sk-proj-abcdef1234567890...
GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

---

**Step 2: Create Master Test Script**

Create: `scripts/test-all-keys.sh`

```bash
#!/bin/bash

echo "🔍 Testing all API keys and credentials..."
echo "=========================================="
echo ""

# Check .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found!"
  exit 1
fi

echo "✅ .env file found"
echo ""

# Load .env
export $(cat .env | grep -v '^#' | xargs)

# Test Google OAuth
echo "1️⃣  Testing Google OAuth..."
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
  echo "   ❌ Google OAuth credentials missing"
else
  echo "   ✅ Google OAuth credentials present"
fi
echo ""

# Test Facebook OAuth
echo "2️⃣  Testing Facebook OAuth..."
if [ -z "$FACEBOOK_APP_ID" ] || [ -z "$FACEBOOK_APP_SECRET" ]; then
  echo "   ❌ Facebook OAuth credentials missing"
else
  echo "   ✅ Facebook OAuth credentials present"
fi
echo ""

# Test TikTok OAuth
echo "3️⃣  Testing TikTok OAuth..."
if [ -z "$TIKTOK_CLIENT_KEY" ] || [ -z "$TIKTOK_CLIENT_SECRET" ]; then
  echo "   ⚠️  TikTok OAuth credentials missing (OK for now)"
else
  echo "   ✅ TikTok OAuth credentials present"
fi
echo ""

# Test OpenAI API
echo "4️⃣  Testing OpenAI API..."
if [ -z "$OPENAI_API_KEY" ]; then
  echo "   ❌ OpenAI API key missing"
else
  echo "   🔍 Running API test..."
  node scripts/test-openai.js
fi
echo ""

# Test Gemini API
echo "5️⃣  Testing Gemini API..."
if [ -z "$GEMINI_API_KEY" ]; then
  echo "   ❌ Gemini API key missing"
else
  echo "   🔍 Running API test..."
  node scripts/test-gemini.js
fi
echo ""

echo "=========================================="
echo "✅ Credential check complete!"
echo ""
echo "📝 Summary:"
echo "   - Google OAuth: $([ -n "$GOOGLE_CLIENT_ID" ] && echo '✅' || echo '❌')"
echo "   - Facebook OAuth: $([ -n "$FACEBOOK_APP_ID" ] && echo '✅' || echo '❌')"
echo "   - TikTok OAuth: $([ -n "$TIKTOK_CLIENT_KEY" ] && echo '✅' || echo '⚠️ ')"
echo "   - OpenAI API: $([ -n "$OPENAI_API_KEY" ] && echo '✅' || echo '❌')"
echo "   - Gemini API: $([ -n "$GEMINI_API_KEY" ] && echo '✅' || echo '❌')"
```

**Make executable:**
```bash
chmod +x scripts/test-all-keys.sh
```

**Run:**
```bash
./scripts/test-all-keys.sh
```

**Expected output:**
```
🔍 Testing all API keys and credentials...
==========================================

✅ .env file found

1️⃣  Testing Google OAuth...
   ✅ Google OAuth credentials present

2️⃣  Testing Facebook OAuth...
   ✅ Facebook OAuth credentials present

3️⃣  Testing TikTok OAuth...
   ⚠️  TikTok OAuth credentials missing (OK for now)

4️⃣  Testing OpenAI API...
   🔍 Running API test...
   ✅ OpenAI API working!
   Response: Hello from ChatAI!

5️⃣  Testing Gemini API...
   🔍 Running API test...
   ✅ Gemini API working!
   Response: Hello from ChatAI!

==========================================
✅ Credential check complete!

📝 Summary:
   - Google OAuth: ✅
   - Facebook OAuth: ✅
   - TikTok OAuth: ⚠️ 
   - OpenAI API: ✅
   - Gemini API: ✅
```

---

**Step 3: Commit (but NOT .env!)**

**⚠️ IMPORTANT:** Never commit `.env` to Git!

```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore

# Commit test scripts only
git add scripts/test-*.js scripts/test-all-keys.sh .gitignore
git commit -m "chore: add API credential test scripts"
git push origin develop
```

---

**Step 4: Document Credentials Securely**

Create: `docs/CREDENTIALS.md` (for your local reference, NOT committed)

```markdown
# API Credentials Reference

**⚠️ DO NOT COMMIT THIS FILE!**

## Google OAuth
- Console: https://console.cloud.google.com/apis/credentials
- Client ID: [paste here]
- Client Secret: [paste here]
- Project: ChatAI Platform

## Facebook OAuth
- Console: https://developers.facebook.com/apps/
- App ID: [paste here]
- App Secret: [paste here]

## TikTok OAuth
- Console: https://developers.tiktok.com/apps
- Status: Pending approval / TODO

## OpenAI
- Console: https://platform.openai.com/api-keys
- API Key: [paste here]
- Billing: $10/month limit

## Gemini
- Console: https://makersuite.google.com/app/apikey
- API Key: [paste here]
```

**Add to .gitignore:**
```bash
echo "docs/CREDENTIALS.md" >> .gitignore
git add .gitignore
git commit -m "chore: exclude credentials from git"
git push origin develop
```

---

## ✅ END OF DAY 3 CHECKLIST

**Verify everything is complete:**

- [ ] Google OAuth credentials obtained and in `.env`
- [ ] Facebook OAuth credentials obtained and in `.env`
- [ ] TikTok OAuth noted as TODO (optional for MVP)
- [ ] OpenAI API key obtained and working
- [ ] Gemini API key obtained and working
- [ ] All test scripts created and passing
- [ ] Master test script `test-all-keys.sh` passing
- [ ] `.env` NOT committed to Git
- [ ] `.gitignore` updated to exclude `.env`
- [ ] Local credentials doc created (optional)

---

## 🔐 SECURITY CHECKLIST

**Before proceeding, verify:**

- [ ] `.env` is in `.gitignore`
- [ ] No API keys in any committed files
- [ ] No screenshots containing keys posted anywhere
- [ ] Test users created for Facebook OAuth
- [ ] Spending limits set on OpenAI ($10/month)

---

## 🎯 DELIVERABLES

**By end of Day 3, you should have:**
- ✅ All OAuth providers configured (Google, Facebook, TikTok*)
- ✅ All AI API keys obtained and tested
- ✅ `.env` file complete with all credentials
- ✅ Test scripts verifying all keys work
- ✅ Secure credential management (no keys in Git)

---

## 🚀 NEXT STEP

**Tomorrow:** Day 4 - Git Workflow & Final Setup
- Git branch strategy
- Team kickoff meeting prep
- Final verification
- Ready to start M1!

**File:** `PART3-DAY4-Git-Workflow-Final.md`

---

**Estimated Time:** 3-4 hours  
**Status:** ✅ Ready to execute  
**Dependencies:** Day 2 completed  
**Note:** Can take longer if waiting for OAuth app approvals
