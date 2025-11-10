"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock, Plus } from "lucide-react"

export default function TeacherOnlineExam() {
  const quizzes = [
    { id: 1, title: "Algebra Quiz", class: "10-A", questions: 10, duration: "30 min", status: "Active", attempts: 35, avgScore: 85 },
    { id: 2, title: "Geometry Test", class: "10-B", questions: 15, duration: "45 min", status: "Active", attempts: 30, avgScore: 82 },
    { id: 3, title: "Trigonometry Quiz", class: "9-A", questions: 12, duration: "30 min", status: "Completed", attempts: 40, avgScore: 88 },
  ]

  const totalQuizzes = quizzes.length
  const activeQuizzes = quizzes.filter(q => q.status === "Active").length
  const totalAttempts = quizzes.reduce((sum, q) => sum + q.attempts, 0)

  return (
    <DashboardLayout title="Online Exam">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Online Examinations
          </h2>
          <p className="text-muted-foreground mt-1">Create and manage online quizzes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Quizzes" value={totalQuizzes.toString()} icon={FileText} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Active" value={activeQuizzes.toString()} icon={Clock} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Total Attempts" value={totalAttempts.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Avg Score" value="85%" icon={CheckCircle} iconColor="text-pink-600" iconBgColor="bg-pink-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />My Quizzes</CardTitle>
                <CardDescription>Manage online tests and quizzes</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-1" />Create Quiz
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{quiz.title}</p>
                      <p className="text-xs text-muted-foreground">Class {quiz.class} • {quiz.questions} questions • {quiz.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        quiz.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {quiz.status}
                      </span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Attempts</p>
                      <p className="font-semibold">{quiz.attempts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                      <p className="font-semibold">{quiz.avgScore}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
