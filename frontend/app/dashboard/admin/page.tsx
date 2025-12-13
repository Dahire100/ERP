"use client"

import { useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { StatCard } from "@/components/super-admin/stat-card"
import { MiniChart } from "@/components/super-admin/mini-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
<<<<<<< HEAD
  Users,
  BookOpen,
  IndianRupee,
=======
  Users, 
  BookOpen, 
  IndianRupee, 
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
  GraduationCap,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  ClipboardList,
  FileText,
  Bell,
  Bus,
  Home,
  Library,
  Award,
  MessageSquare,
  CheckCircle,
  Clock,
<<<<<<< HEAD
  PieChart,
  Shield
=======
  PieChart
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["school_admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
  const [timePeriod, setTimePeriod] = useState("month")

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      trend: { value: 12, isPositive: true },
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      title: "Total Teachers",
      value: "45",
      icon: GraduationCap,
      trend: { value: 3, isPositive: true },
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      title: "Total Classes",
      value: "32",
      icon: BookOpen,
      trend: { value: 0, isPositive: true },
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"
    },
  ]

  const managementCards = [
    {
      title: "Student Management",
      description: "Manage student records and information",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stats: [
        { label: "Active", value: "1,200", color: "text-green-600" },
        { label: "Inactive", value: "34", color: "text-gray-600" },
        { label: "New This Month", value: "45", color: "text-blue-600" }
      ],
      link: "/dashboard/admin/student-info",
      actions: [
        { label: "Add Student", link: "/dashboard/admin/student-info" },
        { label: "View All", link: "/dashboard/admin/student-info" }
      ]
    },
    {
      title: "Human Resource",
      description: "Manage staff and teacher records",
      icon: GraduationCap,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      stats: [
        { label: "Active", value: "43", color: "text-green-600" },
        { label: "On Leave", value: "2", color: "text-orange-600" },
        { label: "Departments", value: "8", color: "text-blue-600" }
      ],
      link: "/dashboard/admin/human-resource",
      actions: [
        { label: "Add Staff", link: "/dashboard/admin/human-resource" },
        { label: "View All", link: "/dashboard/admin/human-resource" }
      ]
    },
    {
      title: "Academics",
      description: "Manage classes, sections and subjects",
      icon: BookOpen,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      stats: [
        { label: "Classes", value: "32", color: "text-purple-600" },
        { label: "Sections", value: "48", color: "text-blue-600" },
        { label: "Subjects", value: "24", color: "text-gray-600" }
      ],
      link: "/dashboard/admin/academics",
      actions: [
        { label: "Add Class", link: "/dashboard/admin/academics" },
        { label: "View All", link: "/dashboard/admin/academics" }
      ]
    },
    {
      title: "Fee Management",
      description: "Track fees and payment collection",
      icon: IndianRupee,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      stats: [
        { label: "Collected", value: "₹39,63,000", color: "text-green-600" },
        { label: "Pending", value: "₹5,60,000", color: "text-orange-600" },
        { label: "Overdue", value: "₹1,20,000", color: "text-red-600" }
      ],
      link: "/dashboard/admin/front-office",
      actions: [
        { label: "Collect Fee", link: "/dashboard/admin/front-office" },
        { label: "View All", link: "/dashboard/admin/front-office" }
      ]
    },
    {
      title: "Examinations",
      description: "Schedule exams and manage results",
      icon: ClipboardList,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      stats: [
        { label: "Upcoming", value: "3", color: "text-blue-600" },
        { label: "Ongoing", value: "1", color: "text-orange-600" },
        { label: "Completed", value: "12", color: "text-green-600" }
      ],
      link: "/dashboard/admin/examinations",
      actions: [
        { label: "Schedule Exam", link: "/dashboard/admin/examinations" },
        { label: "View All", link: "/dashboard/admin/examinations" }
      ]
    },
    {
      title: "Library",
      description: "Manage books and library resources",
      icon: Library,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      stats: [
        { label: "Total Books", value: "2,450", color: "text-indigo-600" },
        { label: "Issued", value: "380", color: "text-orange-600" },
        { label: "Available", value: "2,070", color: "text-green-600" }
      ],
      link: "/dashboard/admin/library",
      actions: [
        { label: "Add Book", link: "/dashboard/admin/library" },
        { label: "View All", link: "/dashboard/admin/library" }
      ]
    },
    {
      title: "Disciplinary",
      description: "Manage student behavior and discipline",
      icon: Shield,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      stats: [
        { label: "Complaints", value: "12", color: "text-red-600" },
        { label: "Resolved", value: "8", color: "text-green-600" },
        { label: "Pending", value: "4", color: "text-orange-600" }
      ],
      link: "/dashboard/admin/disciplinary",
      actions: [
        { label: "Complaints", link: "/dashboard/admin/disciplinary/student-complaints" },
        { label: "Reports", link: "/dashboard/admin/disciplinary/disciplinary-report" }
      ]
    },
  ]

  const recentActivity = [
    { action: "New student admission", user: "John Doe", time: "5 minutes ago", icon: Users, color: "text-blue-600" },
    { action: "Fee payment received", user: "Jane Smith", time: "15 minutes ago", icon: IndianRupee, color: "text-green-600" },
    { action: "Exam scheduled", user: "Admin", time: "1 hour ago", icon: ClipboardList, color: "text-orange-600" },
    { action: "Notice published", user: "Principal", time: "2 hours ago", icon: Bell, color: "text-purple-600" },
  ]

  const analytics = [
    { title: "Attendance Analytics", value: "94%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", sub: "Overall attendance" },
    { title: "Fee Summary", value: "₹39.6L", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-100", sub: "Collected this month" },
    { title: "Pending Fees", value: "₹5.6L", icon: Clock, color: "text-orange-600", bg: "bg-orange-100", sub: "Pending / overdue" },
    { title: "Exam Summary", value: "4 Active", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-100", sub: "Ongoing / upcoming" },
    { title: "Homework Pending", value: "38", icon: FileText, color: "text-pink-600", bg: "bg-pink-100", sub: "Submissions pending" },
    { title: "Notices & Events", value: "12", icon: Bell, color: "text-purple-600", bg: "bg-purple-100", sub: "Live notices/events" },
    { title: "Quick Links", value: "Go", icon: PieChart, color: "text-blue-600", bg: "bg-blue-100", sub: "Jump to key pages", href: "/dashboard/admin/settings" },
  ]

  const quickActions = [
    { label: "Add Student", icon: Users, link: "/dashboard/admin/student-info" },
    { label: "Collect Fee", icon: IndianRupee, link: "/dashboard/admin/front-office" },
    { label: "Schedule Exam", icon: Calendar, link: "/dashboard/admin/examinations" },
    { label: "Post Notice", icon: Bell, link: "/dashboard/admin/digital-notice-board" },
  ]

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Header with Time Period Selector */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
            <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.map((item) => (
            <Card key={item.title} className="border">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-800">{item.title}</CardTitle>
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                {item.href && (
                  <Link href={item.href} className="text-xs text-blue-700 hover:underline mt-2 inline-flex items-center gap-1">
                    Open <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid with Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.link}>
                  <Button variant="outline" className="w-full h-auto flex flex-col items-center gap-2 py-4">
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Management Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {managementCards.map((card) => (
            <Card key={card.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${card.iconBg} p-3 rounded-lg`}>
                      <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {card.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  {card.actions.map((action) => (
                    <Link key={action.label} href={action.link} className="flex-1">
                      <Button variant={action.label.includes("Add") ? "default" : "outline"} className="w-full">
                        {action.label}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className={`p-2 bg-muted rounded-lg ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
