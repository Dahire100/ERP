# Login Credentials & Access Guide

This document provides information about different user roles and their login portal in the ERP system.

---

## ⚡ Quick Start

**Single Login URL for Everyone:** `http://localhost:3000/login`

**Prerequisites:**
1. ✅ Backend server running: `cd backend && node server.js`
2. ✅ Frontend server running: `cd frontend && npm run dev`
3. ✅ MongoDB connection active

**First Time Login:**
1. Visit the login page
2. Select **Super Admin** role
3. Enter email: `superadmin@frontierlms.com`
4. Check console/email for OTP (in dev mode, OTP shows in UI)
5. Access your dashboard

---

## 🔐 Universal Login Portal

**All users login at:** `http://localhost:3000/login`

The system features a **unified login page** where users first select their role, then authenticate accordingly:

### Available Roles:

#### 1. Super Admin
- **Role:** Super Administrator
- **Access:** Full system access, manage all schools
- **Authentication:** Email + OTP (One-Time Password)
- **Default Credentials:**
  - Email: `superadmin@frontierlms.com`
  - OTP: Sent to email (or displayed in dev mode)

#### 2. School Admin
- **Role:** School Administrator
- **Access:** Manage specific school operations
- **Authentication:** Email + OTP (One-Time Password)
- **Example Credentials:**
  - Email: `admin@schoolname.com`
  - OTP: Sent to email (or displayed in dev mode)

#### 3. Teacher
- **Role:** Teacher
- **Access:** Manage classes, students, assignments, grades
- **Authentication:** Email + OTP (One-Time Password)
- **Example Credentials:**
  - Email: `teacher@schoolname.com`
  - OTP: Sent to email (or displayed in dev mode)

#### 4. Parent
- **Role:** Parent/Guardian
- **Access:** View child's academic information, attendance, fees
- **Authentication:** Email + OTP (One-Time Password)
- **Example Credentials:**
  - Email: `parent@example.com`
  - OTP: Sent to email (or displayed in dev mode)

#### 5. Student
- **Role:** Student
- **Access:** View courses, assignments, grades, attendance
- **Authentication:** Email + OTP (One-Time Password)
- **Example Credentials:**
  - Email: `student@schoolname.com`
  - OTP: Sent to email (or displayed in dev mode)

---

## 📋 User Role Hierarchy

```
Super Admin (Top Level)
    ↓
School Admin (Per School)
    ↓
Teachers → Students ← Parents
```

---

## 🚀 Getting Started

### Starting the Application:

#### Step 1: Start Backend Server
```bash
cd backend
node server.js
```
**Expected output:**
```
🚀 Server running on port 5000
🍃 MongoDB initialized
🌱 Seeding database...
✅ Super admin created with secure credentials
```

#### Step 2: Start Frontend Server
```bash
cd frontend
npm run dev
```
**Expected output:**
```
> dev
> next dev

   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
```

#### Step 3: Access Login Page
Open browser and navigate to: `http://localhost:3000/login`

---

## 🚀 How to Login

### Step 1: Navigate to Login Page
Open your browser and go to: `http://localhost:3000/login`

### Step 2: Select Your Role
Choose your role from the five options displayed:
- 🛡️ **Super Admin** - Manage all schools
- 🏢 **School Admin** - Manage your school
- 📚 **Teacher** - Manage classes
- 👨‍👩‍👧 **Parent** - View child's progress
- 👤 **Student** - Access courses

### Step 3: Enter Credentials

#### For All Roles (OTP Method):
1. Enter your email address
2. Click "Send OTP"
3. Check your email for the 6-digit code (or see console in dev mode)
4. Enter the OTP code
5. Click "Verify & Login"

**Note:** All user roles now use secure OTP-based authentication for enhanced security.

### Step 4: Access Dashboard
After successful login, you'll be redirected to your role-specific dashboard.

---

## 🔧 Development Mode

### Email Configuration
The system supports two modes for email:

#### Production Mode (Email Enabled):
Configure in `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-gmail@gmail.com
```

#### Development Mode (Email Disabled):
Comment out email credentials in `backend/.env`:
```env
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-password
```
- OTP will be displayed in console and UI
- No actual emails will be sent

---

## 🔑 Creating Test Users

### Initial Super Admin (Already Created):
The super admin account is automatically created when the backend starts:
- **Email:** `superadmin@frontierlms.com`
- **Role:** Super Admin
- **Status:** Active by default
- **Login:** Use OTP authentication

**To verify super admin exists:**
1. Ensure backend server is running: `cd backend && node server.js`
2. Super admin is automatically seeded on startup
3. Check server logs for confirmation message

### Create School Admin:
1. Login as Super Admin
2. Approve school registration
3. School admin receives credentials via email

### Create Teachers/Students/Parents:
1. Login as School Admin
2. Navigate to respective management section
3. Add new user with email and initial password
4. User receives credentials via email

---

## 🛡️ Security Features

- **JWT Token Authentication:** Secure token-based authentication
- **Role-Based Access Control:** Each user can only access their authorized resources
- **OTP Verification:** All users use time-based OTP for enhanced security
- **Email Verification:** OTP sent to registered email address
- **Session Management:** Automatic logout on token expiration
- **Attempt Limiting:** Maximum 3 OTP verification attempts
- **Time-Limited OTPs:** OTP expires after 10 minutes

---

## 📱 Dashboard Access After Login

| Role | Dashboard URL | Features |
|------|--------------|----------|
| Super Admin | `/dashboard/super-admin` | Manage all schools, approve registrations, system settings |
| Admin | `/dashboard/admin` | Manage school data, teachers, students, fees |
| Teacher | `/dashboard/teacher` | Manage classes, attendance, exams, grades |
| Parent | `/dashboard/parent` | View child's performance, attendance, fees |
| Student | `/dashboard/student` | View courses, grades, assignments, attendance |

---

## ⚠️ Troubleshooting

### Cannot See Role Selection:
- Clear browser cache and refresh
- Ensure you're at `http://localhost:3000/login`
- Check browser console for errors

### Cannot Login:
- Verify you selected the correct role
- **Ensure backend server is running** on `http://localhost:5000`
- Check that email is registered in the system
- User must exist in database before OTP login
- Ensure your account has been activated by an administrator
- Try the "Change" button to select a different role

### Backend Not Running:
- Open terminal in `backend` folder
- Run: `node server.js`
- Verify you see: `🚀 Server running on port 5000`
- Check health endpoint: `http://localhost:5000/api/health`

### 404 Error on OTP Endpoint:
- Backend server is not running or crashed
- Check backend terminal for errors
- Restart backend: `cd backend && node server.js`
- Verify routes are loaded in server startup logs

### OTP Not Received (All Users):
- Check spam/junk folder
- Verify email configuration in `backend/.env`
- In dev mode, check console logs or UI for OTP display
- Try clicking "Resend OTP"
- Verify your email address is correctly registered in the system

### Wrong Role Selected:
- Click the "Change" button next to your role name
- Select the correct role from the main menu

### Forgot Password:
- Not applicable - system uses OTP authentication
- Simply request a new OTP by entering your email

### Account Locked:
- Contact your school administrator
- OTP attempts are limited to 3 tries per OTP
- Request a new OTP after failed attempts

---

## 📞 Support

For technical issues or account problems:
- **School Admins/Teachers/Parents/Students:** Contact your school administrator
- **Super Admins:** Contact system support team

---

## 🔄 OTP System

### How OTP Works:
1. User enters email address and selects role
2. System generates a 6-digit OTP code
3. OTP is sent to the registered email address
4. OTP is valid for 10 minutes
5. User has 3 attempts to enter correct OTP
6. After verification, user is logged in with JWT token

### OTP in Development Mode:
- If email is not configured, OTP is displayed in:
  - Browser console
  - Application UI (for testing)
  - Server terminal logs
- This allows testing without email setup

### OTP in Production Mode:
- OTP sent only via email
- Not displayed in console or UI
- Requires proper SMTP configuration

---

## 📧 Email Configuration Guide

### Gmail SMTP Setup:
1. Enable 2-Step Verification in Google Account
2. Generate App Password: Google Account → Security → 2-Step Verification → App Passwords
3. Update `backend/.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-16-digit-app-password
   SMTP_FROM=your-gmail@gmail.com
   ```

---

## 🔄 Password Reset Flow

### For All Users (OTP-Based System):
1. No password to reset - system uses OTP
2. Simply request a new OTP at login
3. Access controlled via email verification

### Account Recovery:
### Account Recovery:
1. Ensure you have access to your registered email
2. Contact administrator if email needs to be updated
3. Request new OTP at login screen

---

*Last Updated: December 8, 2025*
