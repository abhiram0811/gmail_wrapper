/**
 * OAuth2 Server - Handles Gmail Authentication Flow
 * 
 * LEARNING: This is a simple Express web server that:
 * 1. Shows a "Connect to Gmail" link
 * 2. Receives the OAuth callback from Google
 * 3. Exchanges the code for tokens
 * 
 * EXPRESS BASICS:
 * - app.get() = Handle GET requests to a URL
 * - req = Request (data coming in)
 * - res = Response (data going out)
 */

import express from 'express';
import open from 'open';
import dotenv from 'dotenv';
import {
  createOAuth2Client,
  getAuthUrl,
  getTokenFromCode,
  isAuthenticated
} from './auth.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Store the OAuth client globally (simple approach for learning)
let oauth2Client = null;

/**
 * Route 1: Home page - Shows authentication status
 * 
 * LEARNING: This is a route handler
 * When someone visits http://localhost:3000/, this runs
 */
app.get('/', async (req, res) => {
  const authenticated = await isAuthenticated();
  
  if (authenticated) {
    res.send(`
      <html>
        <head><title>Gmail Assistant - Connected</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>✅ Connected to Gmail!</h1>
          <p>You're all set. You can close this window.</p>
          <p>Run <code>npm run test-auth</code> to test fetching emails.</p>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <head><title>Gmail Assistant - Connect</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>📧 Gmail Vector Assistant</h1>
          <p>Connect your Gmail account to get started</p>
          <a href="/auth" style="
            display: inline-block;
            padding: 15px 30px;
            background: #4285f4;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
          ">Connect Gmail Account</a>
          
          <div style="margin-top: 40px; padding: 20px; background: #f0f0f0; border-radius: 5px;">
            <h3>⚠️ Setup Required First:</h3>
            <ol style="text-align: left; max-width: 600px; margin: 0 auto;">
              <li>Copy <code>.env.example</code> to <code>.env</code></li>
              <li>Get Google OAuth credentials (see README.md)</li>
              <li>Add your credentials to <code>.env</code></li>
              <li>Run <code>npm install</code></li>
            </ol>
          </div>
        </body>
      </html>
    `);
  }
});

/**
 * Route 2: Initiate OAuth flow
 * 
 * LEARNING: When user clicks "Connect Gmail", they come here
 * We redirect them to Google's login page
 */
app.get('/auth', (req, res) => {
  oauth2Client = createOAuth2Client();
  const authUrl = getAuthUrl(oauth2Client);
  
  console.log('🔗 Redirecting to Google for authentication...');
  
  // Redirect user to Google
  res.redirect(authUrl);
});

/**
 * Route 3: OAuth callback - Google redirects here after user approves
 * 
 * LEARNING: This is where the magic happens!
 * Google sends us a 'code' in the URL query parameter
 * We exchange this code for access tokens
 * 
 * ASYNC: This is async because getting tokens involves a network request
 */
app.get('/oauth2callback', async (req, res) => {
  // Get the code from URL query parameters
  const { code } = req.query;
  
  if (!code) {
    return res.send('❌ Error: No code received from Google');
  }
  
  try {
    console.log('🔄 Exchanging code for tokens...');
    
    // ASYNC: Wait for token exchange to complete
    await getTokenFromCode(oauth2Client, code);
    
    console.log('✅ Authentication successful!');
    
    res.send(`
      <html>
        <head><title>Success!</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>✅ Successfully Connected!</h1>
          <p>You can now close this window and return to your terminal.</p>
          <p>Next step: Run <code>npm run test-auth</code> to test fetching emails.</p>
        </body>
      </html>
    `);
    
  } catch (error) {
    console.error('❌ Authentication error:', error);
    res.send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>❌ Authentication Failed</h1>
          <p>Error: ${error.message}</p>
          <p><a href="/">Try again</a></p>
        </body>
      </html>
    `);
  }
});

/**
 * Start the server
 * 
 * LEARNING: This starts the web server and opens a browser
 */
export function startAuthServer() {
  return new Promise((resolve) => {
    const server = app.listen(PORT, async () => {
      console.log(`\n🚀 Server started on http://localhost:${PORT}`);
      console.log(`📖 Opening browser for authentication...\n`);
      
      // Automatically open browser
      await open(`http://localhost:${PORT}`);
      
      resolve(server);
    });
  });
}

// If running this file directly, start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  startAuthServer();
}
