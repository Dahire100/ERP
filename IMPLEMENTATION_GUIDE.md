# FrontierLMS - School ERP System Implementation Guide

## 🎯 Overview
FrontierLMS is a comprehensive School Management System with OTP-based authentication, multi-school support, and payment gateway integration.

## 🔐 Authentication System

### Super Admin Access
**Hardcoded Credentials (Cannot be changed through UI):**
- **Email:** `superadmin@frontierlms.com`
- **Password:** `FrontierLMS@2025!SuperAdmin`
- **Login Method:** OTP-based (OTP sent to email)

**Location:** `backend/src/config/seed.js` (SUPER_ADMIN_CREDENTIALS)

### OTP System
- **OTP Length:** 6 digits
- **Validity:** 10 minutes
- **Max Attempts:** 3 attempts per OTP
- **Delivery:** Email (with fallback to console in dev mode)
- **Purpose:** Login, Registration, Password Reset

## 📋 School Registration Flow

### Step 1: School Registration
1. School visits the registration page
2. Fills out multi-step form:
   - **Step 1:** School Information (Name, Type, Board, Year)
   - **Step 2:** Contact Details (Address, Email, Phone)
   - **Step 3:** Principal Details & Description
3. Submits registration

### Step 2: Super Admin Notification
- Super admin receives email notification about new registration
- Email contains all school details
- Status: "Pending Approval"

### Step 3: Payment Process
- Super admin contacts school for payment
- Payment methods:
  - Online Payment Gateway (to be integrated)
  - Bank Transfer
  - Cash Payment
- School makes payment

### Step 4: Super Admin Approval
- Super admin logs into dashboard
- Reviews school registration
- Verifies payment receipt
- Approves school registration

### Step 5: Account Activation
- School receives activation email with:
  - Login URL
  - Admin email (for login)
  - Instructions for OTP-based login
- School admin can now login using OTP

## 🚀 API Endpoints

### Authentication & OTP
```
POST /api/otp/send-otp
Body: { "email": "user@example.com" }
Response: { "success": true, "message": "OTP sent successfully" }

POST /api/otp/verify-otp
Body: { "email": "user@example.com", "otp": "123456" }
Response: { "success": true, "token": "jwt_token", "user": {...} }

POST /api/otp/resend-otp
Body: { "email": "user@example.com" }
Response: { "success": true, "message": "OTP resent successfully" }
```

### School Registration
```
POST /api/schools/register
Body: {
  "schoolName": "Example School",
  "email": "school@example.com",
  "contactNumber": "+91XXXXXXXXXX",
  "address": "123 Street",
  "city": "City",
  "state": "State",
  "country": "India",
  "pinCode": "123456",
  "principalName": "Principal Name",
  "principalEmail": "principal@example.com",
  "principalPhone": "+91XXXXXXXXXX",
  "schoolType": "private",
  "boardType": "cbse",
  "establishmentYear": "2000",
  "description": "School description",
  "totalStudents": "500",
  "totalTeachers": "50"
}
Response: { "success": true, "message": "Registration submitted successfully" }
```

## 🎨 Frontend Pages

### Login Page (`/`)
- Modern glassmorphism design
- Email input
- OTP-based authentication
- "Register Your School" button
- Responsive design

### Registration Page (`/register`)
- Multi-step form (3 steps)
- Progress indicator
- Form validation
- Success screen with next steps
- Responsive design

## 🗄️ Database Models

### User Model
```javascript
{
  email: String (unique),
  passwordHash: String,
  role: String (super_admin | school_admin | teacher | parent | student),
  firstName: String,
  lastName: String,
  phone: String,
  schoolId: ObjectId (ref: School),
  isActive: Boolean,
  canChangePassword: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### School Model
```javascript
{
  schoolName: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pinCode: String,
  contactNumber: String,
  email: String (unique),
  principalName: String,
  principalEmail: String,
  principalPhone: String,
  schoolType: String,
  boardType: String,
  establishmentYear: String,
  description: String,
  totalStudents: String,
  totalTeachers: String,
  status: String (pending | approved | rejected | active),
  adminEmail: String,
  paymentStatus: String,
  paymentDate: Date,
  activationDate: Date,
  subscriptionEndDate: Date,
  timestamps: true
}
```

### OTP Model
```javascript
{
  email: String,
  otp: String,
  purpose: String (login | registration | password_reset),
  expiresAt: Date,
  verified: Boolean,
  attempts: Number,
  timestamps: true
}
```

## 📧 Email Templates

### 1. OTP Email
- Subject: "🔐 Your Login OTP - FrontierLMS"
- Contains: 6-digit OTP code
- Validity: 10 minutes
- Security warnings

### 2. Registration Confirmation
- Subject: "📋 School Registration Received"
- Contains: Next steps information
- Timeline expectations

### 3. Super Admin Notification
- Subject: "🚨 New School Registration Requires Approval"
- Contains: Complete school details
- Action required notice

### 4. Payment Details Email
- Subject: "✅ School Registration Approved - Payment Required"
- Contains: Payment methods and amounts
- Bank details / Payment gateway link

### 5. Account Activation Email
- Subject: "🎉 Account Activated - Welcome to FrontierLMS"
- Contains: Login credentials
- Dashboard access link
- Getting started guide

## 🔧 Environment Variables

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/frontier_erp

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="FrontierLMS <noreply@frontierlms.com>"
```

## 🚦 Getting Started

### 1. Start Backend
```bash
cd backend
npm install
node server.js
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 🔒 Security Features

1. **OTP-Based Authentication**
   - No password storage for regular logins
   - Time-limited OTPs (10 minutes)
   - Attempt limiting (3 attempts)

2. **Super Admin Protection**
   - Hardcoded credentials in code
   - Cannot be changed through UI
   - Password change disabled

3. **Email Verification**
   - All logins require email verification
   - OTP sent to registered email

4. **JWT Tokens**
   - Secure token-based sessions
   - 24-hour expiration
   - Role-based access control

## 📱 User Roles

1. **Super Admin**
   - Approve/reject school registrations
   - Manage all schools
   - View all data
   - System configuration

2. **School Admin**
   - Manage own school data
   - Add/edit students, teachers
   - Manage fees, attendance, exams
   - View reports

3. **Teacher**
   - Mark attendance
   - Enter exam results
   - View assigned classes

4. **Student**
   - View own attendance
   - View exam results
   - View fees

5. **Parent**
   - View child's data
   - View fees and payments

## 🎯 Next Steps (To Be Implemented)

1. **Payment Gateway Integration**
   - Razorpay / Stripe integration
   - Payment tracking
   - Invoice generation

2. **Super Admin Dashboard**
   - School management interface
   - Approval workflow
   - Payment verification

3. **Email Configuration**
   - Setup SMTP credentials
   - Test email delivery
   - Configure email templates

4. **Frontend Login Flow**
   - Update login page to use OTP
   - Add OTP input screen
   - Handle OTP verification

5. **School Admin Dashboard**
   - Post-activation features
   - Student/teacher management
   - Reports and analytics

## 📞 Support

For any issues or questions:
- Email: support@frontierlms.com
- Documentation: Check this file
- Code Location: `backend/src/config/seed.js` for super admin credentials

---

**Last Updated:** 2025-11-21
**Version:** 1.0.0
**Status:** OTP System & Registration Flow Implemented ✅
