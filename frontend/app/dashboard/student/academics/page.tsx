"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Award, Calendar, TrendingUp, User, Clock } from "lucide-react"

export default function StudentAcademics() {
  const courses = [
    { 
      id: 1, 
      subject: "Mathematics", 
      percentage: 85, 
      grade: "A", 
      teacher: "Mr. Smith",
      attendance: 92,
      assignments: { completed: 8, total: 10 },
      syllabus: 75,
      nextClass: "Tomorrow, 9:00 AM"
    },
    { 
      id: 2, 
      subject: "English", 
      percentage: 78, 
      grade: "B+", 
      teacher: "Ms. Johnson",
      attendance: 88,
      assignments: { completed: 7, total: 10 },
      syllabus: 70,
      nextClass: "Today, 2:00 PM"
    },
    { 
      id: 3, 
      subject: "Science", 
      percentage: 92, 
      grade: "A+", 
      teacher: "Dr. Williams",
      attendance: 95,
      assignments: { completed: 9, total: 10 },
      syllabus: 80,
      nextClass: "Tomorrow, 11:00 AM"
    },
    { 
      id: 4, 
      subject: "History", 
      percentage: 75, 
      grade: "B", 
      teacher: "Mr. Brown",
      attendance: 90,
      assignments: { completed: 6, total: 10 },
      syllabus: 65,
      nextClass: "Friday, 10:00 AM"
    },
  ]

  const avgPercentage = courses.reduce((sum, c) => sum + c.percentage, 0) / courses.length
  const avgAttendance = courses.reduce((sum, c) => sum + c.attendance, 0) / courses.length
  const totalAssignments = courses.reduce((sum, c) => sum + c.assignments.total, 0)
  const completedAssignments = courses.reduce((sum, c) => sum + c.assignments.completed, 0)

  return (
    <DashboardLayout title="Academics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            My Academics
          </h2>
          <p className="text-muted-foreground mt-1">
            Track your courses, grades, and academic progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Average Grade"
            value={`${Math.round(avgPercentage)}%`}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Total Courses"
            value={courses.length.toString()}
            icon={BookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Assignments"
            value={`${completedAssignments}/${totalAssignments}`}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Avg Attendance"
            value={`${Math.round(avgAttendance)}%`}
            icon={Calendar}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                        {course.subject.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{course.subject}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {course.teacher}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-green-600">{course.grade}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Performance */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Score</span>
                    <span className="font-semibold">{course.percentage}%</span>
                  </div>
                  <Progress value={course.percentage} className="h-2" />
                </div>

                {/* Syllabus Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Syllabus Covered</span>
                    <span className="font-semibold">{course.syllabus}%</span>
                  </div>
                  <Progress value={course.syllabus} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className="text-lg font-bold">{course.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assignments</p>
                    <p className="text-lg font-bold">{course.assignments.completed}/{course.assignments.total}</p>
                  </div>
                </div>

                {/* Next Class */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                  <Clock className="h-4 w-4" />
                  <span>Next class: {course.nextClass}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
