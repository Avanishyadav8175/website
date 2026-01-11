# 🔐 Google OAuth Setup Guide

## 🚨 Current Issue: redirect_uri_mismatch

The Google OAuth error occurs because the redirect URI in your application doesn't match what's configured in Google Cloud Console.

## 🔧 Fix Steps

### Step 1: Update Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Navigate to**: APIs & Services > Credentials
3. **Find your OAuth 2.0 Client**: `50174629732-3udo5qulltv1q93jv2avnthm1gf3iie3.apps.googleusercontent.com`
4. **Click Edit** on your OAuth client
5. **Update "Authorized redirect URIs"** to include:

   **For Development:**
   ```
   http://localhost:3000
   http://localhost:3001
   ```

   **For Production:**
   ```
   http://floriwish.com
   https://floriwish.com
   ```

6. **Save** the changes

### Step 2: Environment Variables (Already Fixed)

✅ Updated `.env` and `.env.local` to use correct ports:
- `NEXT_PUBLIC_GOOGLE_REDIRECT_DOMAIN = http://localhost:3001`

### Step 3: Test the Fix

1. **Restart your development server** (already done)
2. **Visit**: `http://localhost:3000` or `http://localhost:3001`
3. **Try Google login** - should work now!

## 📋 Current Configuration

### Environment Variables:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID = 50174629732-3udo5qulltv1q93jv2avnthm1gf3iie3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = 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
NEXT_PUBLIC_GOOGLE_REDIRECT_DOMAIN = http://localhost:3001
```

### Required Google Console Settings:
```
Authorized JavaScript origins:
- http://localhost:3000
- http://localhost:3001
- http://floriwish.com
- https://floriwish.com

Authorized redirect URIs:
- http://localhost:3000
- http://localhost:3001
- http://floriwish.com
- https://floriwish.com
```

## 🔍 How Google OAuth Works

1. **User clicks "Sign in with Google"**
2. **Redirects to Google** with your `client_id` and `redirect_uri`
3. **Google validates** that `redirect_uri` matches what's in Console
4. **User authorizes** your app
5. **Google redirects back** to your `redirect_uri` with authorization code
6. **Your server exchanges** code for access token
7. **Gets user info** and creates/logs in user

## 🚨 Common Issues & Solutions

### Issue: "redirect_uri_mismatch"
**Solution**: Ensure redirect URI in Google Console matches your environment variable

### Issue: "invalid_client"
**Solution**: Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

### Issue: "access_denied"
**Solution**: User denied permission - this is normal user behavior

### Issue: "invalid_grant"
**Solution**: Authorization code expired or already used - user needs to try again

## 🧪 Testing Checklist

After making changes:

- [ ] Google Console redirect URIs updated
- [ ] Environment variables match your server port
- [ ] Development server restarted
- [ ] Can access login page without errors
- [ ] Google OAuth popup opens correctly
- [ ] After authorization, redirects back successfully
- [ ] User is logged in and can access protected features

## 🌐 Production Deployment

For production (`floriwish.com`):

1. **Update Google Console** with production URLs
2. **Use production environment** variables
3. **Ensure HTTPS** is configured (recommended)
4. **Test thoroughly** before going live

## 📞 Support

If you still encounter issues:

1. **Check browser console** for JavaScript errors
2. **Check server logs** for backend errors
3. **Verify Google Console** settings match exactly
4. **Test with different browsers** to rule out cache issues

---

**Your Google OAuth should now work correctly! 🎉**