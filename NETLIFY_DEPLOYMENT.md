# Netlify Deployment Guide

## Overview
Your branding website now uses a Netlify Function to securely fetch the latest APK download URL from Firebase without exposing credentials.

## Files Structure
```
routee9wassele-termsofservices/
├── index.html              # Main website
├── apk-loader.js          # Calls Netlify Function
├── netlify.toml           # Netlify configuration
├── netlify/
│   └── functions/
│       └── latest-apk.js  # Serverless function (backend)
├── package.json           # Dependencies for function
└── .env                   # Local only - DO NOT COMMIT!
```

## Deployment Steps

### 1. Push to GitHub
```bash
cd c:\laragon\www\routee\routee9wassele-termsofservices
git add .
git commit -m "Add Netlify Function for secure APK fetching"
git push
```

### 2. Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will auto-detect the `netlify.toml` configuration

### 3. Set Environment Variables in Netlify
⚠️ **CRITICAL**: Add these environment variables in Netlify Dashboard

1. Go to your site in Netlify Dashboard
2. Navigate to: **Site settings** → **Environment variables**
3. Click **Add a variable** and add each of these:

```
FIREBASE_PROJECT_ID=wasselle-62921
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@wasselle-62921.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://wasselle-62921.firebaseio.com
FIREBASE_PRIVATE_KEY=(copy from .env file - include all line breaks!)
```

**For FIREBASE_PRIVATE_KEY:**
- Copy the entire value from your `.env` file
- Include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines
- The `\n` characters will be handled by the function code

### 4. Deploy
1. Click **Deploy site** in Netlify
2. Wait for build to complete
3. Your function will be available at: `https://your-site.netlify.app/.netlify/functions/latest-apk`

## How It Works

1. **User visits your website** → `index.html` loads
2. **Browser runs** `apk-loader.js` → Calls `/.netlify/functions/latest-apk`
3. **Netlify Function** (`latest-apk.js`) → Uses Firebase Admin SDK to query Firestore
4. **Returns APK URL** → Button href updated with download link
5. **Firebase credentials** → Stay on Netlify server, never exposed to browser

## Testing After Deployment

1. Visit your Netlify site
2. Open browser DevTools (F12) → Console tab
3. You should see: `APK download URL updated to: https://...`
4. Click download button to verify it downloads the correct APK

## Troubleshooting

### Function returns 404
- Check environment variables are set correctly in Netlify Dashboard
- Verify `netlify.toml` is in the root directory
- Check build logs for errors

### CORS errors
- Function already includes CORS headers
- If still having issues, check Netlify function logs

### Private key errors
- Make sure `FIREBASE_PRIVATE_KEY` includes all line breaks
- Don't remove the `\n` characters - the code handles them

## Local Testing (Optional)

Install Netlify CLI to test locally:
```bash
npm install -g netlify-cli
cd c:\laragon\www\routee\routee9wassele-termsofservices
netlify dev
```

This will run your site with functions at `http://localhost:8888`

## Security Notes

✅ **Good:**
- Firebase Admin credentials only on Netlify servers
- `.env` file in `.gitignore` (not committed to Git)
- Function validates request methods and handles errors

⚠️ **Important:**
- Never commit `.env` file to Git
- Only set environment variables through Netlify Dashboard
- Keep your Firebase Admin SDK JSON file secure

## Maintenance

### Updating the Function
1. Edit `netlify/functions/latest-apk.js`
2. Commit and push to GitHub
3. Netlify auto-deploys the changes

### Checking Function Logs
1. Netlify Dashboard → Your site
2. **Functions** tab → Click on `latest-apk`
3. View real-time logs and errors
