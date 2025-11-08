# 📧 Gmail Vector Assistant

A learning project that teaches you how to:
- Work with Gmail API and OAuth2 authentication
- Store emails in a vector database (Pinecone)
- Query emails semantically using LLMs
- Write async JavaScript code

---

## 🎯 Phase 1: Setup & Authentication (Current Phase)

We're starting with the foundation - getting authenticated access to Gmail.

### **What You've Built So Far:**
- ✅ Project structure with proper configuration
- ✅ OAuth2 authentication module
- ✅ Web server for OAuth callback handling
- ✅ Test script to verify Gmail access

---

## 🚀 Getting Started - Step by Step

### **Step 1: Install Dependencies**

```bash
npm install
```

**What this installs:**
- `googleapis` - Official Google API client for Node.js
- `dotenv` - Loads environment variables from .env file
- `express` - Web server for OAuth callback
- `open` - Opens browser automatically

---

### **Step 2: Get Google OAuth2 Credentials**

This is the most important step! You need to create credentials in Google Cloud Console.

#### **Detailed Instructions:**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project**
   - Click "Select a Project" → "New Project"
   - Name it: "Gmail Vector Assistant"
   - Click "Create"

3. **Enable Gmail API**
   - In the left sidebar, go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click on it and press "Enable"

4. **Create OAuth2 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure the OAuth consent screen:
     - Choose "External" (unless you have a Google Workspace)
     - App name: "Gmail Vector Assistant"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue"
     - Skip scopes (click "Save and Continue")
     - Add test users: Your Gmail address
     - Click "Save and Continue"
   
5. **Configure OAuth Client**
   - Application type: "Web application"
   - Name: "Gmail Vector Assistant"
   - Authorized redirect URIs: `http://localhost:3000/oauth2callback`
   - Click "Create"

6. **Copy Your Credentials**
   - You'll see a popup with your Client ID and Client Secret
   - **IMPORTANT:** Keep these safe! You'll need them in the next step

---

### **Step 3: Configure Environment Variables**

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file and add your credentials:**
   ```
   GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
   ```

3. **Leave the other variables for now** (we'll set them up in later phases)

---

### **Step 4: Authenticate with Gmail**

Now the fun part! Let's connect to your Gmail account.

```bash
node src/oauth-server.js
```

**What happens:**
1. A browser window opens automatically
2. You'll see "Connect Gmail Account" button
3. Click it to go to Google login
4. Select your Google account
5. Approve the permissions
6. You'll be redirected back with "Successfully Connected!"

**Behind the scenes:**
- Your browser is redirected to Google with your Client ID
- You approve access to read your emails
- Google sends back a temporary code
- The server exchanges that code for access tokens
- Tokens are saved to `token.json` file

---

### **Step 5: Test the Connection**

Verify everything works by fetching some emails:

```bash
npm run test-auth
```

**What you'll see:**
- List of your 5 most recent emails
- Sender, subject, and date for each
- Demonstration of async programming patterns

**If it works:** 🎉 Congratulations! Phase 1 is complete!

**If it doesn't work:** Check common issues below

---

## 🐛 Troubleshooting

### **Error: "Not authenticated yet"**
- Run `node src/oauth-server.js` first to authenticate

### **Error: "redirect_uri_mismatch"**
- Make sure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/oauth2callback`
- Check for trailing slashes or http vs https

### **Error: "invalid_client"**
- Double-check your Client ID and Client Secret in `.env`
- Make sure there are no extra spaces

### **Error: "Access blocked: This app's request is invalid"**
- Make sure you added yourself as a test user in the OAuth consent screen

### **Error: 401 Unauthorized**
- Your token expired (they last 1 hour by default)
- Run `node src/oauth-server.js` again to re-authenticate

---

## 📚 Key Concepts You've Learned

### **1. OAuth2 Flow**
```
User → Your App → Google Login → User Approves → 
Google → Authorization Code → Your App → Exchange Code → 
Access Token → Your App can access Gmail
```

### **2. Async/Await**
```javascript
// Instead of callbacks:
fetchData(function(result) {
  processData(result, function(processed) {
    console.log(processed);
  });
});

// We use async/await:
const result = await fetchData();
const processed = await processData(result);
console.log(processed);
```

### **3. Promise.all() for Parallel Operations**
```javascript
// Sequential (slow):
const email1 = await fetchEmail(id1);
const email2 = await fetchEmail(id2);
const email3 = await fetchEmail(id3);

// Parallel (fast):
const [email1, email2, email3] = await Promise.all([
  fetchEmail(id1),
  fetchEmail(id2),
  fetchEmail(id3)
]);
```

### **4. Environment Variables**
- Never commit API keys to Git
- Use `.env` for local development
- Use `.env.example` to show what's needed

---

## 📁 Project Structure

```
gmail-vector-assistant/
├── src/
│   ├── auth.js           # OAuth2 authentication logic
│   ├── oauth-server.js   # Web server for OAuth callback
│   └── test-auth.js      # Test script to verify Gmail access
├── .env                  # Your secret credentials (not committed)
├── .env.example          # Template for required environment variables
├── .gitignore            # Prevents committing secrets
├── package.json          # Project dependencies and scripts
└── README.md             # This file!
```

---

## ✅ Phase 1 Complete Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Created Google Cloud project
- [ ] Enabled Gmail API
- [ ] Created OAuth2 credentials
- [ ] Configured `.env` file with credentials
- [ ] Successfully authenticated via browser
- [ ] Ran test script and saw your emails
- [ ] Understand OAuth2 flow
- [ ] Understand async/await basics

---

## 🎓 What's Next: Phase 2

In the next phase, we'll:
1. Fetch ALL your emails (with pagination)
2. Extract and parse email content
3. Handle different email formats (plain text, HTML)
4. Process email attachments (metadata only)
5. Learn about rate limiting and error handling

**Ready to continue?** Let me know and I'll guide you through Phase 2!

---

## 💡 Learning Tips

1. **Read the comments** in the code - they explain every concept
2. **Experiment** - try changing the code and see what happens
3. **Break things** - errors teach you more than success
4. **Ask questions** - if anything is unclear, ask!

---

## 🔒 Security Notes

- Never commit `.env` file to Git (it's in `.gitignore`)
- Never share your Client Secret publicly
- The `token.json` file contains sensitive data - don't share it
- For production apps, use more secure token storage (databases, vaults)

---

## 📖 Resources

- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [OAuth2 Explained](https://developers.google.com/identity/protocols/oauth2)
- [Async/Await Guide](https://javascript.info/async-await)
- [Google Cloud Console](https://console.cloud.google.com/)
