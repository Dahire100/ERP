import type { UserRole } from "./auth-context"

export interface NavItem {
  label: string
  href: string
  icon?: string
  subItems?: NavItem[]
}

export const navigationByRole: Record<UserRole, NavItem[]> = {
  school_admin: [
    { label: "Dashboard", href: "/dashboard/admin" },
    { label: "My Profile", href: "/dashboard/admin/profile" },
    { label: "System Setting", href: "/dashboard/admin/system-setting" },
    { label: "Human Resource", href: "/dashboard/admin/human-resource" },
    {
      label: "Disciplinary",
      href: "/dashboard/admin/disciplinary",
      subItems: [
        { label: "Parameter", href: "/dashboard/admin/disciplinary/parameter" },
        { label: "Assessment", href: "/dashboard/admin/disciplinary/assessment" },
        { label: "Disciplinary Report", href: "/dashboard/admin/disciplinary/disciplinary-report" },
      ],
    },
    {
      label: "Academics",
      href: "/dashboard/admin/academics",
      subItems: [
        { label: "Class Time Table", href: "/dashboard/admin/academics/class-time-table" },
        { label: "Teacher Timetable", href: "/dashboard/admin/academics/teacher-timetable" },
        { label: "Daily Time Table", href: "/dashboard/admin/academics/daily-time-table" },
        { label: "Co-Curricular Subject", href: "/dashboard/admin/academics/co-curricular-subject" },
        { label: "Subject", href: "/dashboard/admin/academics/subject" },
        { label: "Assign Subjects", href: "/dashboard/admin/academics/assign-subjects" },
        { label: "Student Subjects", href: "/dashboard/admin/academics/student-subjects" },
        { label: "Assign Class Teacher", href: "/dashboard/admin/academics/assign-class-teacher" },
        { label: "Class", href: "/dashboard/admin/academics/class" },
        { label: "Section", href: "/dashboard/admin/academics/section" },
        { label: "Promote Students", href: "/dashboard/admin/academics/promote-students" },
      ],
    },
    {
      label: "Lesson Planner",
      href: "/dashboard/admin/lesson-planner/lesson",
      subItems: [
        { label: "Lesson", href: "/dashboard/admin/lesson-planner/lesson" },
        { label: "Topic", href: "/dashboard/admin/lesson-planner/topic" },
        { label: "Manage Lesson Planner", href: "/dashboard/admin/lesson-planner/manage" },
        { label: "Lesson Planner Report", href: "/dashboard/admin/lesson-planner/report" },
        { label: "Topic Report", href: "/dashboard/admin/lesson-planner/topic-report" },
      ],
    },
    {
      label: "Attendance",
      href: "/dashboard/admin/attendance",
      subItems: [
        { label: "Student Attendance", href: "/dashboard/admin/attendance/student-attendance" },
        { label: "Student Leave", href: "/dashboard/admin/attendance/student-leave" },
        { label: "Attendance Report", href: "/dashboard/admin/attendance/attendance-report" },
      ],
    },
    {
      label: "Student Info",
      href: "/dashboard/admin/student-info",
      subItems: [
        { label: "Student Admission", href: "/dashboard/admin/student-info/student-admission" },
        { label: "Online Admission", href: "/dashboard/admin/student-info/online-admission" },
        { label: "Student Details", href: "/dashboard/admin/student-info/student-details" },
        { label: "Student Category", href: "/dashboard/admin/student-info/student-category" },
        { label: "House", href: "/dashboard/admin/student-info/house" },
        { label: "Student Referral", href: "/dashboard/admin/student-info/student-referral" },
        { label: "Inactive Students", href: "/dashboard/admin/student-info/inactive-students" },
        { label: "Link Siblings", href: "/dashboard/admin/student-info/link-siblings" },
        { label: "Student Update", href: "/dashboard/admin/student-info/student-update" },
        { label: "Student Reports", href: "/dashboard/admin/student-info/student-reports" },
      ]
    },
    {
      label: "Examinations",
      href: "/dashboard/admin/examinations",
      subItems: [
        { label: "Term List", href: "/dashboard/admin/examinations/term-list" },
        { label: "Exam List", href: "/dashboard/admin/examinations/exam-list" },
        { label: "Exam Schedule", href: "/dashboard/admin/examinations/exam-schedule" },
        { label: "Admit card", href: "/dashboard/admin/examinations/admit-card" },
        { label: "Marks Register", href: "/dashboard/admin/examinations/marks-register" },
        { label: "Co-Curricular Grade", href: "/dashboard/admin/examinations/co-curricular-grade" },
        { label: "Teacher Comment", href: "/dashboard/admin/examinations/teacher-remark" },
        { label: "Grade List", href: "/dashboard/admin/examinations/grade-list" },
        { label: "Division", href: "/dashboard/admin/examinations/division" },
        { label: "Attendance", href: "/dashboard/admin/examinations/attendance" },
        { label: "Report Card", href: "/dashboard/admin/examinations/report-card" },
        { label: "Examination Report", href: "/dashboard/admin/examinations/examination-report" },
      ],
    },
    {
      label: "Online Exam",
      href: "/dashboard/admin/online-exam",
      subItems: [
        { label: "Online Exam", href: "/dashboard/admin/online-exam" },
        { label: "Question Bank", href: "/dashboard/admin/online-exam/question-bank" },
        { label: "Exam Report", href: "/dashboard/admin/online-exam/exam-reports" },
        { label: "Students Exam Report", href: "/dashboard/admin/online-exam/student-result" },
      ],
    },
    {
      label: "Online Class",
      href: "/dashboard/admin/online-class",
      subItems: [
        { label: "Online Class", href: "/dashboard/admin/online-class" },
        { label: "Online Class Teacher Timetable", href: "/dashboard/admin/online-class/teacher-timetable" },
        { label: "Online Class Attendees Report", href: "/dashboard/admin/online-class/attendees-report" },
      ],
    },
    {
      label: "Primary Evaluation",
      href: "/dashboard/admin/primary-evaluation/activity",
      subItems: [
        { label: "Activity", href: "/dashboard/admin/primary-evaluation/activity" },
        { label: "Assessment", href: "/dashboard/admin/primary-evaluation/assessment" },
        { label: "Evaluation Remark", href: "/dashboard/admin/primary-evaluation/evaluation-remark" },
        { label: "Primary Class Report", href: "/dashboard/admin/primary-evaluation/primary-class-report" },
      ],
    },
    {
      label: "Question Paper",
      href: "/dashboard/admin/question-paper/type",
      subItems: [
        { label: "Type", href: "/dashboard/admin/question-paper/type" },
        { label: "Question", href: "/dashboard/admin/question-paper/question" },
        { label: "Generate", href: "/dashboard/admin/question-paper/generate" },
      ],
    },
    {
      label: "Download Center",
      href: "/dashboard/admin/download-center/upload-content",
      subItems: [
        { label: "Upload Content", href: "/dashboard/admin/download-center/upload-content" },
        { label: "Assignments", href: "/dashboard/admin/download-center/assignments" },
        { label: "Study Material", href: "/dashboard/admin/download-center/study-material" },
        { label: "Syllabus", href: "/dashboard/admin/download-center/syllabus" },
        { label: "Other Downloads", href: "/dashboard/admin/download-center/other-downloads" },
        { label: "Videos", href: "/dashboard/admin/download-center/videos" },
      ]
    },
    { label: "Report", href: "/dashboard/admin/report" },
    {
      label: "Front Office",
      href: "/dashboard/admin/front-office",
      subItems: [
        { label: "Admission Enquiry", href: "/dashboard/admin/front-office/admission-enquiry" },
        { label: "Visitors Book", href: "/dashboard/admin/front-office/visitors-book" },
        { label: "Postal Exchange", href: "/dashboard/admin/front-office/postal-exchange" },
        { label: "Complain", href: "/dashboard/admin/front-office/complain" },
        { label: "Setup Front Office", href: "/dashboard/admin/front-office/setup" },
        { label: "Gate Pass", href: "/dashboard/admin/front-office/gate-pass" },
        { label: "Entrance Examination Form", href: "/dashboard/admin/front-office/entrance-exam" },
      ]
    },
    {
      label: "Fees Collection",
      href: "/dashboard/admin/fees-collection",
      subItems: [
        { label: "Collect Fee", href: "/dashboard/admin/fees-collection/collect-fee" },
        { label: "Payment Receipt", href: "/dashboard/admin/fees-collection/payment-receipt" },
        { label: "Online Admission Fee", href: "/dashboard/admin/fees-collection/online-admission-fee" },
        { label: "Demand Notice", href: "/dashboard/admin/fees-collection/demand-notice" },
        { label: "Fees Carry Forward", href: "/dashboard/admin/fees-collection/fees-carry-forward" },
        { label: "Fee Discount", href: "/dashboard/admin/fees-collection/fee-discount" },
        { label: "Fee Master", href: "/dashboard/admin/fees-collection/fee-master" },
        { label: "Fees Group", href: "/dashboard/admin/fees-collection/fees-group" },
        { label: "Fees Types", href: "/dashboard/admin/fees-collection/fees-types" },
        { label: "Fee Follow Up", href: "/dashboard/admin/fees-collection/fee-follow-up" },
        { label: "Cheques", href: "/dashboard/admin/fees-collection/cheques" },
        { label: "Fees Reports", href: "/dashboard/admin/fees-collection/fees-reports" },
      ]
    },
    {
      label: "Income",
      href: "/dashboard/admin/income",
      subItems: [
        { label: "Add Income", href: "/dashboard/admin/income/add-income" },
        { label: "Search Income", href: "/dashboard/admin/income/search-income" },
        { label: "Income Head", href: "/dashboard/admin/income/income-head" },
      ]
    },
    {
      label: "Expense",
      href: "/dashboard/admin/expense",
      subItems: [
        { label: "Add Expense", href: "/dashboard/admin/expense/add-expense" },
        { label: "Expense Search", href: "/dashboard/admin/expense/search-expense" },
        { label: "Expense Head", href: "/dashboard/admin/expense/expense-head" },
      ]
    },
    { label: "Inventory", href: "/dashboard/admin/inventory" },
    { label: "Library", href: "/dashboard/admin/library" },
    { label: "Transport", href: "/dashboard/admin/transport" },
    { label: "Hostel", href: "/dashboard/admin/hostel" },
    { label: "Certificate", href: "/dashboard/admin/certificate" },
    { label: "Consent Letter", href: "/dashboard/admin/consent-letter" },
    {
      label: "H.W. / C.W.",
      href: "/dashboard/admin/hw-cw/add-homework",
      subItems: [
        { label: "Add Homework", href: "/dashboard/admin/hw-cw/add-homework" },
        { label: "Add Classwork", href: "/dashboard/admin/hw-cw/add-classwork" },
        { label: "Evaluation Report C.W", href: "/dashboard/admin/hw-cw/evaluation-report-cw" },
        { label: "Evaluation Report H.W.", href: "/dashboard/admin/hw-cw/evaluation-report-hw" },
        { label: "Unassigned Report", href: "/dashboard/admin/hw-cw/unassigned-report" },
      ],
    },
    { label: "Digital Notice Board", href: "/dashboard/admin/notice-board" },
    {
      label: "Communicate",
      href: "/dashboard/admin/communicate/notice-board",
      subItems: [
        { label: "Notice Board", href: "/dashboard/admin/communicate/notice-board" },
        { label: "School Diary", href: "/dashboard/admin/communicate/school-diary" },
        { label: "Send Email / SMS", href: "/dashboard/admin/communicate/send-email-sms" },
        { label: "Email / SMS Log", href: "/dashboard/admin/communicate/email-sms-log" },
      ],
    },
    { label: "Front CMS", href: "/dashboard/admin/front-cms" },
    { label: "Subscription", href: "/dashboard/admin/subscription" },
  ],
  teacher: [
    { label: "Dashboard", href: "/dashboard/teacher" },
    { label: "My Profile", href: "/dashboard/teacher/profile" },
    { label: "Student Info", href: "/dashboard/teacher/student-info" },
    { label: "Attendance", href: "/dashboard/teacher/attendance" },
    { label: "Academics", href: "/dashboard/teacher/academics" },
    { label: "Lesson Planner", href: "/dashboard/teacher/lesson-planner" },
    { label: "H.W. / C.W.", href: "/dashboard/teacher/homework" },
    { label: "Examinations", href: "/dashboard/teacher/examinations" },
    { label: "Online Exam", href: "/dashboard/teacher/online-exam" },
    { label: "Download Center", href: "/dashboard/teacher/download-center" },
    { label: "Communicate", href: "/dashboard/teacher/communicate" },
    { label: "Digital Notice Board", href: "/dashboard/teacher/notice-board" },
  ],
  student: [
    { label: "Dashboard", href: "/dashboard/student" },
    { label: "My Profile", href: "/dashboard/student/profile" },
    { label: "Academics", href: "/dashboard/student/academics" },
    { label: "H.W. / C.W.", href: "/dashboard/student/homework" },
    { label: "Download Center", href: "/dashboard/student/download-center" },
    { label: "Online Exam", href: "/dashboard/student/online-exam" },
    { label: "Online Class", href: "/dashboard/student/online-class" },
    { label: "Examinations", href: "/dashboard/student/examinations" },
    { label: "Report", href: "/dashboard/student/report" },
    { label: "Library", href: "/dashboard/student/library" },
    { label: "Transport", href: "/dashboard/student/transport" },
    { label: "Hostel", href: "/dashboard/student/hostel" },
    { label: "Student Wallet", href: "/dashboard/student/wallet" },
    { label: "Communicate", href: "/dashboard/student/communicate" },
  ],
  parent: [
    { label: "Dashboard", href: "/dashboard/parent" },
    { label: "My Profile", href: "/dashboard/parent/profile" },
    { label: "My Child's Profile", href: "/dashboard/parent/child-profile" },
    { label: "Fees Collection", href: "/dashboard/parent/fees" },
    { label: "Attendance", href: "/dashboard/parent/attendance" },
    { label: "H.W. / C.W.", href: "/dashboard/parent/homework" },
    { label: "Report", href: "/dashboard/parent/report" },
    { label: "Examinations", href: "/dashboard/parent/examinations" },
    { label: "Transport", href: "/dashboard/parent/transport" },
    { label: "Communicate", href: "/dashboard/parent/communicate" },
    { label: "Consent Letter", href: "/dashboard/parent/consent-letter" },
    { label: "Digital Notice Board", href: "/dashboard/parent/notice-board" },
  ],
  "super_admin": [
    { label: "Dashboard", href: "/dashboard/super-admin" },
    { label: "Institute Management", href: "/dashboard/super-admin/institute-management" },
    { label: "SaaS Plan Management", href: "/dashboard/super-admin/saas-plans" },
    { label: "Billing & Invoicing", href: "/dashboard/super-admin/billing" },
    { label: "Support Tickets", href: "/dashboard/super-admin/support-tickets" },
    { label: "Platform Settings", href: "/dashboard/super-admin/platform-settings" },
  ],
}
