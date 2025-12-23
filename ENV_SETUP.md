# Environment Variables Configuration Guide

## Required Environment Variables

Add these to your Render.com environment variables:

### 1. MONGODB_URL
**Required:** Yes
**Description:** MongoDB connection string
**Value:** `mongodb+srv://asgharkhattak789:asgharkhattak789@glp.uprhz8h.mongodb.net/glp`

### 2. JWT_SECRET
**Required:** Yes
**Description:** Secret key for JWT token generation
**Production Value:** Generate a secure random string using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
**Development Value:** `your-super-secret-jwt-key-change-this-in-production`

### 3. NODE_ENV
**Required:** Yes (for production)
**Description:** Application environment
**Value:** `production`

## Summary
Your `.env` file is now complete with all required variables. 

## Render Deployment Checklist

✅ Set all three environment variables in Render dashboard
✅ Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
✅ Redeploy your application after setting environment variables

## Current Environment Variables Used:
- ✅ `MONGODB_URL` - Database connection
- ✅ `JWT_SECRET` - Authentication tokens
- ✅ `NODE_ENV` - Environment detection (development/production)

**Note:** No other environment variables are currently being used in your codebase.
