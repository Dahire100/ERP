"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, BookOpen, FileText, Clock, Calendar, Bell, CheckCircle } from "lucide-react"

export default function TeacherDashboard() {
  const teacherInfo = {
    name: "Mr. John Teacher",
    employeeId: "TCH-2024-001",
    department: "Mathematics",
    email: "john.teacher@school.com"
  }

  const classes = [
    { id: 1, name: "Class 10-A", students: 38, subject: "Mathematics", nextClass: "Today, 9:00 AM", attendance: 95 },
    { id: 2, name: "Class 10-B", students: 35, subject: "Mathematics", nextClass: "Today, 11:00 AM", attendance: 92 },
    { id: 3, name: "Class 9-A", students: 40, subject: "Mathematics", nextClass: "Tomorrow, 10:00 AM", attendance: 94 },
  ]

  const upcomingTasks = [
    { id: 1, task: "Grade Math Quiz - Class 10-A", dueDate: "Today", priority: "High" },
    { id: 2, task: "Prepare Lesson Plan", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, task: "Parent-Teacher Meeting", dueDate: "Nov 10", priority: "High" },
  ]

  const recentActivity = [
    { id: 1, activity: "Marked attendance for Class 10-A", time: "2 hours ago" },
    { id: 2, activity: "Created new assignment", time: "5 hours ago" },
    { id: 3, activity: "Graded 15 submissions", time: "Yesterday" },
  ]

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0)

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back, {teacherInfo.name}!
            </h2>
            <p className="text-muted-foreground mt-1">
              {teacherInfo.department} Department • ID: {teacherInfo.employeeId}
            </p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold">
              {teacherInfo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={totalStudents.toString()}
            icon={Users}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="My Classes"
            value={classes.length.toString()}
            icon={BookOpen}
            iconColor="text-pink-600"
            iconBgColor="bg-pink-100"
          />
          <StatCard
            title="Assignments"
            value="12"
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending Tasks"
            value={upcomingTasks.length.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Classes */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  My Classes
                </CardTitle>
                <CardDescription>Classes you are teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classes.map((cls) => (
                    <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{cls.name}</p>
                          <p className="text-xs text-muted-foreground">{cls.subject}</p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          View Class
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Students</p>
                          <p className="font-semibold">{cls.students}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                          <p className="font-semibold">{cls.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Next Class</p>
                          <p className="font-semibold text-xs">{cls.nextClass}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold">{task.task}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.priority === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <FileText className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button variant="outline" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Class
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.activity}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
