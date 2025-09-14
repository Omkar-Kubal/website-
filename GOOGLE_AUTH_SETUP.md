# Google Authentication Setup Guide

## Overview

This guide will help you set up Google Authentication for the website. The error "Google Signup Failed" occurs when the Firebase configuration is missing the required Google OAuth client ID and secret.

## Steps to Configure Google Authentication

### 1. Create OAuth Credentials in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application** as the application type
6. Add a name for your OAuth client (e.g., "Website Authentication")
7. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Your actual domain
8. Add authorized redirect URIs:
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://your-domain.com/auth/callback`
9. Click **Create**

### 2. Configure Firebase Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Google** as a sign-in provider
5. Enter the OAuth client ID and client secret you obtained from the Google Cloud Console
6. Save the changes

### 3. Update Environment Variables

Update your `.env.local` file with the actual values:

```
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

### 4. Restart Your Development Server

After updating the environment variables, restart your development server for the changes to take effect:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Troubleshooting

If you still encounter issues with Google authentication:

1. Check the browser console for detailed error messages
2. Verify that your OAuth client ID and secret are correct
3. Ensure that the authorized JavaScript origins and redirect URIs match your application's URLs
4. Confirm that Google sign-in is enabled in Firebase Authentication
5. Make sure your Firebase project is properly configured with the correct API key and project ID

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Google Auth Setup Guide](https://firebase.google.com/docs/auth/web/google-signin)