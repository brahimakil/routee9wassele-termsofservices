# Routee Website Backend Setup

## Installation

1. Install dependencies:
```bash
npm install
```

2. Get Firebase Admin SDK credentials:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file

3. Fill in the `.env` file with your Firebase Admin SDK credentials from the downloaded JSON

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /api/latest-apk` - Returns the latest APK version and download URL

## Production Deployment

Update the API URL in `apk-loader.js` from `http://localhost:3000` to your production domain.
