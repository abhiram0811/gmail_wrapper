## 🚀 Quick Start Guide - Phase 1

### You've successfully created the foundation! Here's what to do next:

---

## ✅ Step 1: Create `.env` file

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials (see below for how to get them).

---

## 🔑 Step 2: Get Google OAuth2 Credentials

### Quick Steps:
1. Go to https://console.cloud.google.com/
2. Create a new project: "Gmail Vector Assistant"
3. Enable Gmail API:
   - APIs & Services → Library → Search "Gmail API" → Enable
4. Create OAuth credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Configure consent screen first if needed (add yourself as test user!)
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:3000/oauth2callback`
5. Copy the Client ID and Client Secret
6. Paste them into your `.env` file

---

## 🎯 Step 3: Authenticate

Run the OAuth server:
```bash
node src/oauth-server.js
```

- Browser opens automatically
- Click "Connect Gmail Account"
- Sign in and approve
- You'll see "Successfully Connected!"

---

## ✅ Step 4: Test It!

```bash
npm run test-auth
```

You should see your recent emails printed to the console!

---

## 🎉 Success Criteria

You know Phase 1 is complete when:
- ✅ You see your recent emails in the terminal
- ✅ You understand how OAuth2 works
- ✅ You understand async/await patterns
- ✅ No authentication errors

---

## 🆘 Need Help?

Common issues:
- **"redirect_uri_mismatch"**: Check your redirect URI in Google Cloud Console
- **"invalid_client"**: Check your Client ID/Secret in .env file
- **"Access blocked"**: Add yourself as a test user in OAuth consent screen

---

## 📚 What You Learned in Phase 1

### 1. **OAuth2 Authentication**
   - How users grant access to their data securely
   - Authorization codes, access tokens, refresh tokens
   - The full OAuth2 flow from start to finish

### 2. **Async JavaScript**
   - `async` functions return Promises
   - `await` pauses execution until Promise resolves
   - Much cleaner than callbacks or `.then()` chains

### 3. **Promise.all()**
   - Run multiple async operations in parallel
   - Faster than sequential await calls
   - All promises must succeed (or all fail together)

### 4. **Gmail API Basics**
   - How to list messages
   - How to fetch message details
   - How to parse email headers

### 5. **Environment Variables**
   - Keep secrets out of code
   - Use `.env` for local development
   - Never commit `.env` to Git

---

## 🎯 Ready for Phase 2?

Phase 2 will cover:
- Fetching ALL emails (pagination)
- Extracting email content (text and HTML)
- Rate limiting and error handling
- Processing large email volumes efficiently

Let me know when you're ready to continue! 🚀
