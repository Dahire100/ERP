# School ERP - School Admin Module Documentation

## 1. Software Overview

### Purpose and Objective
The **School Admin Portal** is the central command center of the School ERP generic system. Its primary objective is to digitize and streamline the day-to-day administrative, academic, and financial operations of an educational institution. It serves as the single source of truth for student data, staff records, fee collection, and academic planning.

### Problem it Solves & Target Users
**Problems Solved:**
*   Eliminates manual paper-based record keeping (e.g., visitor logs, attendance registers).
*   Reduces errors in fee calculation and collection.
*   Centralizes communication between administration, teachers, and parents.
*   Provides real-time visibility into school performance and resource utilization.

**Target Users:**
*   **Principal / School Administrator:** For overall monitoring and decision making.
*   **Administrative Staff:** Front office desk, fee clerks, and HR personnel.
*   **Academic Coordinators:** For managing timetables, lesson plans, and examinations.

## 2. How the Software Works

### Overall Workflow
The module operates on a role-based access control (RBAC) system.
1.  **Authentication:** The Admin logs in via the centralized login portal using secure credentials (Email + OTP).
2.  **Dashboard Initialization:** Upon login, the system loads the `School Admin Dashboard`, fetching real-time stats (Total Students, Fee Collection, Attendance).
3.  **Navigation:** The user navigates through the sidebar menu which is categorized by functional department (e.g., Human Resource, Academics, Finance).
4.  **CRUD Operations:** The user performs Create, Read, Update, and Delete operations on various entities (e.g., admitting a student, adding a fee structure, scheduling a class).
5.  **Reporting:** Data entered is instantly processed to generate downloadable reports (PDF/Excel) for analysis.

### User Journey (Example: Admitting a Student)
1.  **Entry:** Admin clicks on **Student Info** > **Student Admission**.
2.  **Input:** Fills in personal details, academic history, and parent information.
3.  **Validation:** System checks for duplicate enrollments or missing mandatory fields.
4.  **Processing:** Student is assigned a unique Admission Number and linked to a Class/Section.
5.  **Output:** An ID card is generated, and login credentials are automatically created and emailed to the student/parent.

## 3. Features & Functionalities

### Detailed List of Features (By Sub-Module)

#### **A. Front Office Management**
*   **Admission Enquiry:** Track prospective students from inquiry to enrollment.
*   **Visitor Log:** Digital entry/exit tracking for parents, vendors, and guests.
*   **Postal Exchange:** Manage incoming and outgoing dispatch/mail.
*   **Complaint Register:** Track and resolve grievances.

#### **B. Student Information System (SIS)**
*   **Student Admission:** Comprehensive form for capturing student demographics.
*   **Student Details:** 360-degree view of student profile (fees, attendance, grades).
*   **Promote Students:** Bulk promotion logic for end-of-year academic transitions.
*   **Disable/Inactive Students:** Manage withdrawals and alumni records.

#### **C. Fees Collection & Finance**
*   **Collect Fees:** One-click fee collection with receipt generation.
*   **Fee Master:** Define fee groups, types (Tuition, Transport, Hostel), and due dates.
*   **Due Fee Report:** Auto-calculate pending dues by class or student.
*   **Expense & Income:** Track school operational costs and miscellaneous revenue.

#### **D. Academics & Lesson Planning**
*   **Class Timetable:** Drag-and-drop scheduler for classes and teachers.
*   **Lesson Planner:**
    *   **Lesson:** Define syllabus chapters and learning objectives.
    *   **Topic:** Break down lessons into teachable topics.
    *   **Status Tracking:** Monitor syllabus completion percentage per subject.
*   **Assign Class Teacher:** Link teachers to specific classes for accountability.

#### **E. Human Resource (HR)**
*   **Staff Directory:** Manage teaching and non-teaching staff profiles.
*   **Staff Attendance:** Biometric or manual attendance tracking.
*   **Payroll:** Auto-generate salary slips based on attendance and leave data.
*   **Leave Management:** Approve/Reject leave requests from teachers.

#### **F. Examinations**
*   **Exam Schedule:** Define dates and timings for Term/Final exams.
*   **Admit Card Generation:** Auto-create printable hall tickets.
*   **Web-based Marks Register:** Teachers enter marks directly into the system.
*   **Report Card:** Generate comprehensive grade cards with defined grading scales (A, B, C, etc.).

## 4. Inputs & Requirements

### User Inputs (Key Data Points)
*   **Student Data:** First Name, Last Name, DOB, Gender, Religion, Caste, Mobile Number, Email, Admission Date, Blood Group, Father's Name, Mother's Name.
*   **Academic Configuration:** Class Names (1-12), Sections (A, B, C), Subject Names (Math, Science).
*   **Fee Structure:** Fee Category (e.g., "Term 1"), Amount, Due Date, Fine Settings.
*   **Lesson Plans:** Lesson Name, Topic Name, Completion Date, Teaching Method.

### System Requirements
*   **Client Hardware:** Desktop/Laptop with 4GB RAM minimum (8GB recommended).
*   **Software:** Modern Web Browser (Chrome, Edge, Firefox - latest versions).
*   **Internet:** Stable broadband connection (min 10 Mbps) for real-time data syncing.

### Dependencies & Third-Party Tools
*   **Backend:** Node.js/Express API.
*   **Database:** MongoDB (NoSQL) for flexible schema storage.
*   **Authentication:** JWT (JSON Web Tokens) for secure session management.
*   **UI Framework:** ShadCn/UI & Tailwind CSS for responsive design.
*   **Icons:** Lucide React.
*   **Email Service:** (Configured SMTP) for sending notifications.

## 5. Expected Output

### Output Formats
*   **On-Screen:** Interactive dashboards, searchable data tables, success/error toast notifications.
*   **Documents:**
    *   Student ID Cards (PDF)
    *   Fee Receipts (PDF/Thermal Print)
    *   Report Cards (PDF)
    *   Transfer Certificates (TC)
*   **Exports:** Excel/CSV exports for all reporting grids (Attendance, Fees, Complaints).

### Success Criteria
*   **Speed:** Dashboard loads in < 1.5 seconds.
*   **Accuracy:** Fee calculations must be 100% accurate with zero discrepancy.
*   **Uptime:** System availability of 99.9% during school hours.

## 6. Edge Cases & Limitations

### Known Constraints
*   **Offline Mode:** The system currently requires an active internet connection; no offline support is available yet.
*   **Bulk Uploads:** Excel bulk upload is limited to 500 records per batch to prevent timeout.
*   **Browser Compatibility:** Not fully optimized for Internet Explorer (deprecated).

### Error Handling Approach
*   **Form Validation:** Client-side Zod validation prevents invalid data submission (e.g., future dates for birth, negative fee amounts).
*   **API Errors:** Graceful error messages (e.g., "Server Timeout", "Network Error") displayed via Toast notifications instead of crashing the UI.
*   **Audit Logs:** Critical actions (Delete Student, Refund Fee) are logged in the backend for accountability.

## 7. Future Scope
*   **AI Integration:** AI-powered insights for student performance prediction.
*   **Mobile App:** Native iOS/Android app for Admin and Parents.
*   **Biometric Integration:** Direct hardware integration with fingerprint scanners for attendance.
*   **Payment Gateway:** Integration with Razorpay/Stripe for online fee collection.
