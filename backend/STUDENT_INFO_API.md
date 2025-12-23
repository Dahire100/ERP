# Student Info Module - Backend API Documentation

## Overview
This document lists all backend APIs available for the Student Info module in the Admin Portal.

## Available APIs

### 1. Student Management
**Base URL:** `/api/students`

#### Endpoints:
- `GET /api/students` - Get all students (supports filtering)
  - Query params: `class`, `section`, `keyword`
  - Returns: Array of student objects
  
- `GET /api/students/:id` - Get student by ID
  - Returns: Single student object
  
- `POST /api/students` - Add new student
  - Body: `{ firstName, lastName, class, section, rollNumber, dateOfBirth, gender, address, phone, email, parentName, parentPhone, parentEmail, bloodGroup, transportRoute }`
  - Returns: Created student + credentials
  
- `POST /api/students/import` - Bulk import students via CSV
  - Body: `{ students: [...] }`
  - Returns: Import results with credentials
  
- `PUT /api/students/:id` - Update student
  - Body: Student fields to update
  - Returns: Success message
  
- `DELETE /api/students/:id` - Delete student
  - Returns: Success message

**Features:**
- ✅ Automatic user account creation for students
- ✅ Automatic parent account creation (if parentEmail provided)
- ✅ Password generation and email delivery
- ✅ Duplicate email prevention
- ✅ Keyword search (name, ID, phone)
- ✅ CSV bulk import with credential export

---

### 2. Student Categories
**Base URL:** `/api/student-categories`

#### Endpoints:
- `GET /api/student-categories` - Get all categories
  - Returns: `{ data: [...] }`
  
- `POST /api/student-categories` - Add new category
  - Body: `{ name, description }`
  - Returns: Created category
  
- `PUT /api/student-categories/:id` - Update category
  - Body: `{ name, description }`
  - Returns: Updated category
  
- `DELETE /api/student-categories/:id` - Delete category (soft delete)
  - Returns: Success message

**Features:**
- ✅ Unique category names per school
- ✅ Soft delete (sets isActive=false)
- ✅ School-specific isolation

---

### 3. Classes & Sections
**Base URL:** `/api/classes` and `/api/sections`

#### Endpoints:
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Add new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

- `GET /api/sections` - Get all sections
- `POST /api/sections` - Add new section
- `PUT /api/sections/:id` - Update section
- `DELETE /api/sections/:id` - Delete section

**Features:**
- ✅ Used for dropdowns in student admission
- ✅ School-specific data

---

## Frontend Pages Status

### ✅ Connected to Backend:
1. **Student Details** (`/student-details`)
   - Fetches students from `/api/students`
   - Supports class, section, keyword filtering
   - Displays real-time data

2. **Student Admission** (`/student-admission`)
   - CSV Import: `/api/students/import` ✅
   - Manual Form: Ready to connect to `/api/students` POST
   - Downloads credentials after import

### 🔧 Backend Ready (Frontend Static):
3. **Student Category** (`/student-category`)
   - Backend API: `/api/student-categories` ✅
   - Frontend: Static mockup (needs connection)

### 📋 Needs Backend Implementation:
4. **House** - Student house/group management
5. **Inactive Students** - Archive/deactivated students
6. **Link Siblings** - Sibling relationship management
7. **Online Admission** - Public admission portal
8. **Student Referral** - Referral tracking
9. **Student Reports** - Various student reports
10. **Student Update** - Bulk update operations

---

## Database Models

### Student Schema
```javascript
{
  studentId: String (unique, auto-generated),
  firstName: String (required),
  lastName: String,
  class: String (required),
  section: String (required),
  rollNumber: String,
  admissionDate: Date,
  dateOfBirth: Date,
  gender: String,
  address: String,
  phone: String,
  email: String (unique),
  parentName: String,
  parentPhone: String,
  parentEmail: String, // Links to parent portal
  bloodGroup: String,
  transportRoute: String,
  schoolId: ObjectId (required)
}
```

### StudentCategory Schema
```javascript
{
  name: String (required, unique per school),
  description: String,
  schoolId: ObjectId (required),
  isActive: Boolean (default: true)
}
```

---

## Authentication & Authorization
All endpoints require:
- ✅ JWT Token in `Authorization: Bearer <token>` header
- ✅ School Admin role for POST/PUT/DELETE operations
- ✅ School-specific data isolation via `schoolId`

---

## Next Steps for Full Integration
1. Connect Student Category frontend to `/api/student-categories`
2. Implement House Management backend + frontend
3. Implement Inactive Students (filter by isActive)
4. Implement Sibling Linking (add siblingIds array to Student model)
5. Create Online Admission public form
6. Add Student Reports endpoints (various aggregations)

---

**Last Updated:** 2025-12-23
**Backend Status:** Fully operational for core student management
**Frontend Status:** 2/10 pages fully integrated
