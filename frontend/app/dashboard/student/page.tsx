"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, FileText, Award, Calendar, Clock, Bell, TrendingUp, CheckCircle } from "lucide-react"

export default function StudentDashboard() {
  const studentInfo = {
    name: "John Student",
    rollNo: "2024001",
    class: "10-A",
    gpa: 3.8,
    attendance: 92
  }

  const courses = [
    { name: "Mathematics", grade: "A", progress: 85, teacher: "Mr. Smith", nextClass: "Tomorrow, 9:00 AM" },
    { name: "English", grade: "B+", progress: 78, teacher: "Ms. Johnson", nextClass: "Today, 2:00 PM" },
    { name: "Science", grade: "A-", progress: 82, teacher: "Dr. Williams", nextClass: "Tomorrow, 11:00 AM" },
    { name: "History", grade: "B", progress: 75, teacher: "Mr. Brown", nextClass: "Friday, 10:00 AM" },
  ]

  const assignments = [
    { id: 1, title: "Math Assignment 5", subject: "Mathematics", dueDate: "2024-11-15", status: "Pending", priority: "High" },
    { id: 2, title: "English Essay", subject: "English", dueDate: "2024-11-18", status: "Submitted", priority: "Medium" },
    { id: 3, title: "Science Project", subject: "Science", dueDate: "2024-11-20", status: "Pending", priority: "High" },
  ]

  const upcomingEvents = [
    { title: "Mid-term Exams", date: "2024-11-25", type: "Exam" },
    { title: "Sports Day", date: "2024-11-30", type: "Event" },
    { title: "Parent-Teacher Meeting", date: "2024-12-05", type: "Meeting" },
  ]

  const pendingAssignments = assignments.filter(a => a.status === "Pending").length

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back, {studentInfo.name}!
            </h2>
            <p className="text-muted-foreground mt-1">
              Class {studentInfo.class} • Roll No: {studentInfo.rollNo}
            </p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xl font-bold">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="GPA"
            value={studentInfo.gpa.toString()}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Courses"
            value={courses.length.toString()}
            icon={BookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending Tasks"
            value={pendingAssignments.toString()}
            icon={FileText}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Attendance"
            value={`${studentInfo.attendance}%`}
            icon={Calendar}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  My Courses
                </CardTitle>
                <CardDescription>Your enrolled courses and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.name} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{course.name}</p>
                          <p className="text-xs text-muted-foreground">{course.teacher}</p>
                        </div>
                        <span className="text-2xl font-bold text-green-600">{course.grade}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Next class: {course.nextClass}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">{event.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          event.type === "Exam" ? "bg-red-100 text-red-700" :
                          event.type === "Event" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Your pending and submitted assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      assignment.status === "Submitted" ? "bg-green-100" : "bg-orange-100"
                    }`}>
                      {assignment.status === "Submitted" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">{assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      assignment.priority === "High" ? "bg-red-100 text-red-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {assignment.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              View All Assignments
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
