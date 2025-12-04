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
    { label: "Academics", href: "/dashboard/admin/academics" },
    { label: "Student Info", href: "/dashboard/admin/student-info" },
    { label: "Examinations", href: "/dashboard/admin/examinations" },
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
    { label: "Inventory", href: "/dashboard/admin/inventory" },
    { label: "Library", href: "/dashboard/admin/library" },
    { label: "Transport", href: "/dashboard/admin/transport" },
    { label: "Hostel", href: "/dashboard/admin/hostel" },
    { label: "Certificate", href: "/dashboard/admin/certificate" },
    { label: "Consent Letter", href: "/dashboard/admin/consent-letter" },
    { label: "Digital Notice Board", href: "/dashboard/admin/notice-board" },
    { label: "Communicate", href: "/dashboard/admin/communicate" },
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
