# Comprehensive School ERP Software Documentation

## 1. System Overview

### Purpose and Objective
The **School ERP (Enterprise Resource Planning) System** is a robust, multi-tenant educational management platform designed to digitize and automate the complex operations of educational institutions. It serves as a unified ecosystem connecting **Admins, Teachers, Students, and Parents**, facilitating seamless communication, data management, and academic tracking.

### Problem it Solves & Target Users
**Problems Solved:**
*   Fragmented data storage (spreadsheets, paper files).
*   Communication gaps between school and parents.
*   Inefficient fee collection and financial tracking.
*   Lack of real-time insights into student performance.

**Target Users (Roles):**
1.  **Super Admin:** Manages the SaaS platform, schools, and subscription plans.
2.  **School Admin:** Manages a specific school's daily operations.
3.  **Teacher:** Manages academics, attendance, and student progress.
4.  **Student:** Accesses learning materials, exams, and reports.
5.  **Parent:** Monitors child's progress and manages payments.

---

## 2. Technical Architecture & Tech Stack

### Core Technology
The system is built on a modern **MERN-like stack**, utilizing the latest web standards for performance and scalability.

*   **Frontend Framework:** **Next.js 14** (App Router)
    *   *Why?* Server-Side Rendering (SSR) for speed and SEO, highly modular routing.
*   **UI Library:** **React 19**
    *   *Why?* Component-based architecture for reusable, maintainable code.
*   **Styling Engine:** **Tailwind CSS**
    *   *Why?* Utility-first CSS for rapid, responsive, and consistent design.
*   **Component System:** **Shadcn/UI** (+ Radix UI)
    *   *Why?* Accessible, unstyled primitives providing a premium, customizable aesthetic (Glassmorphism, Dark Mode).
*   **Icons:** **Lucide React** (lightweight, consistent SVG icons).
*   **State Management:** React Context API & Server Components.
*   **Form Handling:** **React Hook Form** + **Zod** (for robust schema validation).
*   **Animations:** **Framer Motion** (for smooth transitions/micro-interactions).

### Backend & Database
*   **Runtime Environment:** **Node.js**
*   **Framework:** **Express.js** (RESTful API architecture).
*   **Database:** **MongoDB** with **Mongoose** ODM.
    *   *Why?* Flexible schema design suitable for diverse data types (student records, JSON logs, etc.).
*   **Authentication:** **JWT (JSON Web Tokens)** + OTP-based standard login flow.

### Infrastructure
*   **Environment:** Windows/Linux compatible.
*   **Package Manager:** npm/pnpm.

---

## 3. Module-Wise Features & Functionalities

### Module 1: 🛡️ Super Admin Portal
*Control center for the SaaS owner managing multiple schools.*

*   **Institute Management:** Register, approve, and manage distinct school entities.
*   **SaaS Plan Management:** Create subscription packages (Bronze, Silver, Gold) with feature limits.
*   **Billing & Invoicing:** Generate invoices for schools and track payments.
*   **Support Tickets:** Centralized helpdesk to resolve issues raised by school admins.
*   **Platform Settings:** Global configurations (SMTP settings, SMS gateways, White-labeling).

### Module 2: 👨‍💼 School Admin Portal
*Operational hub for a single school.*

*   **Front Office:**
    *   **Visitor Log:** Digital entry/exit tracking.
    *   **Enquiry Management:** CRM for potential admissions.
    *   **Postal Exchange:** Manage dispatch and receiving.
*   **Student Information:**
    *   **360° Profile:** Comprehensive student data (Academic, Personal, Sibling links).
    *   **Admission System:** Digitized enrollment flow with ID generation.
*   **Fees Collection:**
    *   **Fee Master:** Configurable fee heads, groups, and types.
    *   **Invoicing:** Auto-generation of demand notices and receipts.
    *   **Reports:** Due fee lists, daily collection reports.
*   **Academics:**
    *   **Class/Section Management:** Define hierarchy.
    *   **Timetable:** Drag-and-drop class scheduling.
    *   **Subject Assignment:** Link teachers to subjects and classes.
*   **Human Resource:**
    *   **Staff Directory:** Manage teaching/non-teaching contracts.
    *   **Payroll:** Salary generation based on attendance.
    *   **Leave Management:** Approval workflows.
*   **Examination:**
    *   **Exam Scheduler:** Define term/final exam dates.
    *   **Marks Register:** Centralized grading system.
    *   **Admit Cards:** Auto-generated hall tickets.

### Module 3: 👨‍🏫 Teacher Portal
*Focused interface for academic delivery.*

*   **Lesson Planner:**
    *   Create detailed lesson plans and topic breakdowns.
    *   Track syllabus completion status.
*   **Academics & Attendance:**
    *   **Mark Attendance:** Daily student attendance (Present/Absent/Late).
    *   **Homework:** Assign homework and upload attachments.
    *   **Evaluation:** Grade homework and provide remarks.
*   **Examinations:**
    *   Input marks for assigned subjects.
    *   View exam schedules.
*   **Human Resource:**
    *   View own payroll and attendance.
    *   Apply for leave.

### Module 4: 🎓 Student Portal
*Learning dashboard for students.*

*   **Dashboard:** Quick view of timetable, upcoming exams, and notices.
*   **My Documents:** Repository for certificates and ID cards.
*   **Online Exams:** Attempt MCQs and view auto-graded results.
*   **Homework:** View assignments, download attachments, and check submission status.
*   **Class Timetable:** View daily class schedules.
*   **Library:** Browse book catalog and check issued books.

### Module 5: 👨‍👩‍👧 Parent Portal
*Monitoring tool for guardians.*

*   **Child Progress:** Toggle between multiple children (siblings).
*   **Fees Payment:** View outstanding dues and payment history.
*   **Attendance Tracking:** Calendar view of child's attendance.
*   **Reports:** Download report cards and exam results.
*   **Communication:** Apply for child's leave or message teachers.

---

## 4. How the Software Works (Workflow)

### 1. Authentication Flow
The system uses a **Unified Login Page** (`/login`) with dynamic role detection.
1.  **User Selection:** User selects role (e.g., "Teacher").
2.  **Credentials:** Inputs registered Email.
3.  **Verification:**
    *   **Step 1:** System verifies user existence in MongoDB.
    *   **Step 2:** User inputs Password associated with account.
    *   **Step 3:** (Optional/Configurable) OTP verification.
4.  **Routing:** Next.js Middleware redirects to the specific directory:
    *   `admin` -> `/dashboard/admin`
    *   `teacher` -> `/dashboard/teacher`
    *   etc.

### 2. Data Flow (Example: Homework)
1.  **Teacher** creates homework entry → Saved to `Homework` Collection.
2.  **Notification** triggers for all Students in that Class/Section.
3.  **Student** logs in → Fetches homework from API → Views details.
4.  **Student** submits offline/online.
5.  **Teacher** marks "Completed/Incomplete" → Updates database.
6.  **Parent** views status on their dashboard.

---

## 5. Inputs & Requirements

### User Inputs
Depending on the module, inputs vary:
*   **Forms:** Extensive use of text inputs, date pickers (shadcn), selects, and file uploads.
*   **Validation:** All inputs are strictly validated (e.g., Email format, Mobile number length, Required fields) using **Zod** schemas before reaching the backend.

### System Requirements
*   **Server:** Node.js v18+, MongoDB v6+.
*   **Client:** Modern Web Browser (Chrome/Edge/Firefox).
*   **Display:** Responsive layout supports Desktops (1080p recommended), Tablets, and Mobiles.

### Dependencies & Third-Party Integrations
*   **Chart.js / Recharts:** For visual analytics (Fee stats, attendance graphs).
*   **React-Day-Picker:** For calendar interfaces.
*   **Lucide-React:** For iconography.
*   **Axios/Fetch:** For API communication.

---

## 6. Edge Cases & Limitations

### Known Constraints
*   **Internet Dependency:** As a cloud-based web app, active internet is required.
*   **Real-time sync:** While highly reactive, socket-based real-time chat is currently in the "Future Scope".

### Error Handling
*   **Frontend:** Global Error Boundaries catch React rendering errors.
*   **API:** All API responses follow a standard structure `{ success: boolean, message: string, data: any }`.
*   **UI Feedback:** Toast notifications (Success/Error/Warning) provide immediate user feedback without page reloads.

---

## 7. Future Scope
*   **Mobile Application:** Native React Native app for offline access.
*   **AI Analytics:** Predictive modeling for student dropout rates.
*   **Payment Gateway:** Integrated Stripe/Razorpay for direct fee payments.
*   **Bus Tracking:** GPS integration for the Transport module.
