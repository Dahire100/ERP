# Login Issue - MongoDB Not Connected

## Problem
The backend server is running but MongoDB database is not connected. This is why login is failing.

## Solution Options:

### Option 1: Start MongoDB (Recommended)
```bash
# If MongoDB is installed, start it:
mongod --dbpath "C:\data\db"

# Or if using MongoDB as a service:
net start MongoDB
```

### Option 2: Use Docker (if available)
```bash
cd backend
docker-compose up -d
```

### Option 3: Install MongoDB
Download and install from: https://www.mongodb.com/try/download/community

## After MongoDB is Running:

### Create Test Users
The backend will automatically create a super admin when it connects to MongoDB.

**Super Admin Credentials:**
- Email: `superadmin@frontierlms.com`
- Password: `FrontierLMS@2025!SuperAdmin`

### To Create Student/Teacher Test Users:
You need to first:
1. Start MongoDB
2. Restart the backend server (it will seed the database)
3. Login as super admin
4. Create schools, students, and teachers through the admin panel

## Quick Fix for Testing:
If you just want to test role validation without MongoDB, you can temporarily modify the backend to use an in-memory database or SQLite.
