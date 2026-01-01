# Deployment Guide for Frontier LMS

This guide outlines the steps to deploy the Frontier LMS project to production.

## 1. Pre-requisites
*   **MongoDB Atlas**: Create a cluster and get your connection string (URI).
*   **Email Service**: Gmail App Password or SendGrid API Key for sending OTPs and notifications.
*   **Frontend Host**: Vercel, Netlify, or similar.
*   **Backend Host**: Render, Railway, Heroku, or AWS.

## 2. Backend Deployment

### Build & Start
*   **Directory**: `backend/`
*   **Start Command**: `npm start` (Runs `node server.js`)
*   **Install Command**: `npm install`

### Environment Variables (Required)
Set these in your hosting provider's dashboard:
*   `PORT`: `5000` (or allow host to assign one)
*   `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/frontier_erp`
*   `JWT_SECRET`: A long random string (e.g., generated via `openssl rand -hex 32`)
*   `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://frontier-lms.vercel.app`). **Critical for email links.**
*   `EMAIL_USER`: Your support email address.
*   `EMAIL_PASS`: Your email app password (not your login password).
*   `NODE_ENV`: `production`

## 3. Frontend Deployment

### Build & Start
*   **Directory**: `frontend/`
*   **Framework Preset**: Next.js
*   **Build Command**: `npm run build` or `next build`
*   **Output Directory**: `.next` (Next.js default)

### Environment Variables (Required)
*   `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://frontier-erp-api.onrender.com`). **Must verify this matches your backend URL exactly.**

## 4. Verification Checklist

1.  [ ] **Backend Health Check**: Visit `https://<YOUR-BACKEND>/api/health` and verify it returns a 200 OK.
2.  [ ] **Frontend Connection**: Visit your frontend URL. If the "Partner Schools" or "Contact Form" fails, check the browser console. If you see CORS errors, ensure your Backend `cors` config allows your Frontend domain (currently defaults to `*` which is permissible but verify `server.js`).
3.  [ ] **Email Links**: Request a password reset or invite a user. Verify the link in the email starts with your `FRONTEND_URL` (e.g., `https://frontier-lms.vercel.app/login`), NOT `localhost`.

## 5. Troubleshooting
*   **500 Errors on Form Submit**: Check Backend logs. Ensure `EMAIL_PASS` is correct.
*   **Connection Refused**: Ensure `NEXT_PUBLIC_API_URL` does not have a trailing slash if your code adds `/api/...`. (e.g., use `https://api.com` not `https://api.com/`).
