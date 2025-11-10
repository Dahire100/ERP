"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, CheckCircle, TrendingUp } from "lucide-react"

export default function TeacherExaminations() {
  const upcomingExams = [
    { id: 1, title: "Mid-term Exam", class: "10-A", subject: "Mathematics", date: "2024-11-20", time: "09:00 AM", duration: "3 hours" },
    { id: 2, title: "Unit Test", class: "10-B", subject: "Mathematics", date: "2024-11-22", time: "10:00 AM", duration: "2 hours" },
  ]

  const gradingQueue = [
    { id: 1, exam: "Mid-term Exam", class: "10-A", totalStudents: 38, graded: 25, pending: 13 },
    { id: 2, exam: "Quiz 3", class: "10-B", totalStudents: 35, graded: 35, pending: 0 },
    { id: 3, exam: "Unit Test", class: "9-A", totalStudents: 40, graded: 30, pending: 10 },
  ]

  const totalExams = upcomingExams.length
  const totalPending = gradingQueue.reduce((sum, q) => sum + q.pending, 0)
  const totalGraded = gradingQueue.reduce((sum, q) => sum + q.graded, 0)

  return (
    <DashboardLayout title="Examinations">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Examinations
          </h2>
          <p className="text-muted-foreground mt-1">Manage exams and grade papers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Upcoming Exams" value={totalExams.toString()} icon={Calendar} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Pending Grading" value={totalPending.toString()} icon={FileText} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
          <StatCard title="Graded" value={totalGraded.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Classes" value="3" icon={TrendingUp} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming Exams</CardTitle>
              <CardDescription>Scheduled examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{exam.title}</p>
                        <p className="text-xs text-muted-foreground">Class {exam.class} • {exam.subject}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {new Date(exam.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>🕐 {exam.time}</span>
                      <span>•</span>
                      <span>⏱️ {exam.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Grading Queue</CardTitle>
              <CardDescription>Papers to grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradingQueue.map((queue) => (
                  <div key={queue.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{queue.exam}</p>
                        <p className="text-xs text-muted-foreground">Class {queue.class}</p>
                      </div>
                      <Button size="sm" variant={queue.pending === 0 ? "outline" : "default"} className={queue.pending === 0 ? "" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"}>
                        {queue.pending === 0 ? "View" : "Grade Now"}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{queue.graded}/{queue.totalStudents}</span>
                      </div>
                      <Progress value={(queue.graded / queue.totalStudents) * 100} className="h-2" />
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
