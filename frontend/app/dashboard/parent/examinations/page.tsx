"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Award, Clock, TrendingUp } from "lucide-react"

export default function ParentExaminations() {
  const upcomingExams = [
    { id: 1, subject: "Mathematics", date: "2025-01-20", time: "09:00 AM", duration: "3 hours", syllabus: "Chapters 1-5", daysLeft: 5 },
    { id: 2, subject: "Science", date: "2025-01-22", time: "09:00 AM", duration: "3 hours", syllabus: "Chapters 1-6", daysLeft: 7 },
    { id: 3, subject: "English", date: "2025-01-24", time: "09:00 AM", duration: "3 hours", syllabus: "Full syllabus", daysLeft: 9 },
    { id: 4, subject: "History", date: "2025-01-26", time: "09:00 AM", duration: "2 hours", syllabus: "Chapters 1-4", daysLeft: 11 },
  ]

  const recentResults = [
    { subject: "Mathematics", marks: 95, total: 100, grade: "A+", percentage: 95 },
    { subject: "Science", marks: 88, total: 100, grade: "A", percentage: 88 },
    { subject: "English", marks: 92, total: 100, grade: "A+", percentage: 92 },
    { subject: "History", marks: 85, total: 100, grade: "A", percentage: 85 },
  ]

  const averagePercentage = recentResults.reduce((sum, r) => sum + r.percentage, 0) / recentResults.length

  return (
    <DashboardLayout title="Examinations">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Examinations
          </h2>
          <p className="text-muted-foreground mt-1">
            Track exam schedules and view results
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Upcoming Exams"
            value={upcomingExams.length.toString()}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Average Score"
            value={`${Math.round(averagePercentage)}%`}
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Subjects"
            value={recentResults.length.toString()}
            icon={BookOpen}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Next Exam In"
            value={`${upcomingExams[0]?.daysLeft} days`}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Exams
              </CardTitle>
              <CardDescription>Scheduled examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{exam.subject}</p>
                        <p className="text-xs text-muted-foreground">{exam.syllabus}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {exam.daysLeft} days left
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                      <span>🕐 {exam.time}</span>
                      <span className="col-span-2">⏱️ Duration: {exam.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Results
              </CardTitle>
              <CardDescription>Latest exam performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{result.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">{result.grade}</span>
                        <span className="text-sm text-muted-foreground">{result.marks}/{result.total}</span>
                      </div>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Average</span>
                    <span className="text-2xl font-bold text-green-600">{Math.round(averagePercentage)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
              <Button variant="outline" className="flex-1">
                <Award className="h-4 w-4 mr-2" />
                Download Report Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
