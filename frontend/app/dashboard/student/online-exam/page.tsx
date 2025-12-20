"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, CheckCircle, Clock, Award } from "lucide-react"

import { toast } from "sonner"

export default function StudentOnlineExam() {
  const tests = [
    { id: 1, title: "Math Quiz 1", subject: "Mathematics", status: "Available", duration: "30 min", questions: 20, deadline: "2024-11-10", score: null },
    { id: 2, title: "Science Test", subject: "Science", status: "Available", duration: "45 min", questions: 30, deadline: "2024-11-12", score: null },
    { id: 3, title: "English Quiz 1", subject: "English", status: "Completed", duration: "30 min", questions: 20, deadline: "2024-11-05", score: 85 },
    { id: 4, title: "History Quiz", subject: "History", status: "Completed", duration: "25 min", questions: 15, deadline: "2024-11-03", score: 92 },
    { id: 5, title: "Math Quiz 2", subject: "Mathematics", status: "Completed", duration: "30 min", questions: 20, deadline: "2024-11-01", score: 88 },
  ]

  const availableTests = tests.filter(t => t.status === "Available").length
  const completedTests = tests.filter(t => t.status === "Completed").length
  const completedWithScores = tests.filter(t => t.status === "Completed" && t.score)
  const averageScore = completedWithScores.length > 0
    ? completedWithScores.reduce((sum, t) => sum + (t.score || 0), 0) / completedWithScores.length
    : 0

  const handleStartTest = (title: string) => {
    toast.success("Starting Test", { description: `Launching ${title}... Good luck!` })
  }

  return (
    <DashboardLayout title="Online Exam">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Online Examinations
          </h2>
          <p className="text-muted-foreground mt-1">
            Take online tests and view your scores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Tests"
            value={tests.length.toString()}
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Available"
            value={availableTests.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Completed"
            value={completedTests.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Average Score"
            value={`${Math.round(averageScore)}%`}
            icon={Award}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Tests
              </CardTitle>
              <CardDescription>Tests ready to take</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tests.filter(t => t.status === "Available").map((test) => (
                  <div key={test.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{test.title}</p>
                        <p className="text-xs text-muted-foreground">{test.subject}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                        Available
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <span>⏱️ Duration: {test.duration}</span>
                      <span>📝 Questions: {test.questions}</span>
                      <span className="col-span-2">📅 Deadline: {new Date(test.deadline).toLocaleDateString()}</span>
                    </div>
                    <Button onClick={() => handleStartTest(test.title)} size="sm" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Start Test
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Tests
              </CardTitle>
              <CardDescription>Your test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tests.filter(t => t.status === "Completed").map((test) => (
                  <div key={test.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{test.title}</p>
                        <p className="text-xs text-muted-foreground">{test.subject}</p>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{test.score}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Score</span>
                        <span>{test.score}/100</span>
                      </div>
                      <Progress value={test.score || 0} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Completed: {new Date(test.deadline).toLocaleDateString()}
                    </p>
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
