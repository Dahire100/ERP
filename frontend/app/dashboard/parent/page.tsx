"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  IndianRupee, 
  Calendar, 
  Bell, 
  MessageSquare, 
  BookOpen, 
  TrendingUp,
  Award,
  Clock
} from "lucide-react"

export default function ParentDashboard() {
  const children = [
    { 
      id: 1,
      name: "Alice Student", 
      class: "10-A", 
      gpa: 3.8, 
      attendance: 92,
      rollNo: "2024001",
      upcomingExams: 3,
      pendingAssignments: 2
    },
    { 
      id: 2,
      name: "Bob Student", 
      class: "9-B", 
      gpa: 3.5, 
      attendance: 88,
      rollNo: "2024002",
      upcomingExams: 2,
      pendingAssignments: 1
    },
  ]

  const fees = [
    { month: "November 2024", amount: 500, status: "Paid", dueDate: "2024-11-01" },
    { month: "December 2024", amount: 500, status: "Pending", dueDate: "2024-12-01" },
  ]

  const recentNotices = [
    { id: 1, title: "Parent-Teacher Meeting", date: "2024-11-15", priority: "High" },
    { id: 2, title: "Sports Day Event", date: "2024-11-20", priority: "Medium" },
    { id: 3, title: "Holiday Notice", date: "2024-11-25", priority: "Low" },
  ]

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0)
  const paidFees = fees.filter(f => f.status === "Paid").reduce((sum, fee) => sum + fee.amount, 0)
  const pendingFees = totalFees - paidFees

  return (
    <DashboardLayout title="Parent Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back, Parent!
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor your children's academic progress and school activities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Children"
            value={children.length.toString()}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending Fees"
            value={`₹${pendingFees}`}
            icon={IndianRupee}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Upcoming Events"
            value="5"
            icon={Calendar}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="New Notices"
            value={recentNotices.length.toString()}
            icon={Bell}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Children Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Children
            </CardTitle>
            <CardDescription>Monitor your children's academic progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="p-5 border rounded-xl hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{child.name}</p>
                        <p className="text-sm text-muted-foreground">Class {child.class} • Roll No: {child.rollNo}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50">
                      View Profile
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        GPA
                      </p>
                      <p className="text-2xl font-bold text-green-600">{child.gpa}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Attendance
                      </p>
                      <div>
                        <p className="text-2xl font-bold">{child.attendance}%</p>
                        <Progress value={child.attendance} className="h-1 mt-1" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Exams
                      </p>
                      <p className="text-2xl font-bold text-blue-600">{child.upcomingExams}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Assignments
                      </p>
                      <p className="text-2xl font-bold text-orange-600">{child.pendingAssignments}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fee Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Fee Status
              </CardTitle>
              <CardDescription>View and manage fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fees.map((fee) => (
                  <div key={fee.month} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div>
                      <p className="font-semibold">{fee.month}</p>
                      <p className="text-xs text-muted-foreground">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{fee.amount}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          fee.status === "Paid" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {fee.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Pay Pending Fees
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notices
              </CardTitle>
              <CardDescription>Important announcements from school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotices.map((notice) => (
                  <div key={notice.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">{notice.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notice.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          notice.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : notice.priority === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {notice.priority}
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Notices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Connect with teachers and access resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button className="w-full justify-start h-auto py-4" variant="outline">
                <div className="flex flex-col items-start gap-1">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span className="font-semibold">Message Teachers</span>
                  <span className="text-xs text-muted-foreground">Send messages</span>
                </div>
              </Button>
              <Button className="w-full justify-start h-auto py-4" variant="outline">
                <div className="flex flex-col items-start gap-1">
                  <BookOpen className="h-5 w-5 mb-1" />
                  <span className="font-semibold">View Homework</span>
                  <span className="text-xs text-muted-foreground">Check assignments</span>
                </div>
              </Button>
              <Button className="w-full justify-start h-auto py-4" variant="outline">
                <div className="flex flex-col items-start gap-1">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="font-semibold">School Calendar</span>
                  <span className="text-xs text-muted-foreground">View events</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
