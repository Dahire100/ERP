"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react"

export default function StudentHomework() {
  const assignments = [
    { id: 1, title: "Algebra Problems", subject: "Mathematics", dueDate: "2024-11-18", status: "Pending", priority: "High", description: "Complete exercises 1-10", score: null },
    { id: 2, title: "Essay Writing", subject: "English", dueDate: "2024-11-15", status: "Submitted", priority: "Low", description: "Essay on environmental conservation", score: 92 },
    { id: 3, title: "Lab Report", subject: "Science", dueDate: "2024-11-20", status: "Pending", priority: "Medium", description: "Chemistry experiment report", score: null },
    { id: 4, title: "Chapter Summary", subject: "History", dueDate: "2024-11-12", status: "Graded", priority: "Low", description: "Summarize chapter 3", score: 88 },
    { id: 5, title: "Geometry Assignment", subject: "Mathematics", dueDate: "2024-11-10", status: "Graded", priority: "Medium", description: "Solve geometry problems", score: 95 },
  ]

  const pendingCount = assignments.filter(a => a.status === "Pending").length
  const submittedCount = assignments.filter(a => a.status === "Submitted").length
  const gradedCount = assignments.filter(a => a.status === "Graded").length
  const gradedAssignments = assignments.filter(a => a.status === "Graded" && a.score)
  const averageScore = gradedAssignments.length > 0 
    ? gradedAssignments.reduce((sum, a) => sum + (a.score || 0), 0) / gradedAssignments.length 
    : 0

  return (
    <DashboardLayout title="H.W. / C.W.">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Homework & Classwork
          </h2>
          <p className="text-muted-foreground mt-1">
            Track assignments and monitor progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Assignments"
            value={assignments.length.toString()}
            icon={BookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending"
            value={pendingCount.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Submitted"
            value={submittedCount.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Average Score"
            value={`${Math.round(averageScore)}%`}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Assignments List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              All Assignments
            </CardTitle>
            <CardDescription>Complete list of homework and classwork</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        assignment.status === "Graded" ? "bg-green-100" :
                        assignment.status === "Submitted" ? "bg-blue-100" :
                        "bg-orange-100"
                      }`}>
                        {assignment.status === "Graded" || assignment.status === "Submitted" ? (
                          <CheckCircle className={`h-5 w-5 ${
                            assignment.status === "Graded" ? "text-green-600" : "text-blue-600"
                          }`} />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-semibold">{assignment.title}</p>
                            <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              assignment.priority === "High" ? "bg-red-100 text-red-700" :
                              assignment.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {assignment.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              assignment.status === "Graded" ? "bg-green-100 text-green-700" :
                              assignment.status === "Submitted" ? "bg-blue-100 text-blue-700" :
                              "bg-orange-100 text-orange-700"
                            }`}>
                              {assignment.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                          {assignment.score && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-green-600">Score: {assignment.score}%</span>
                              <Progress value={assignment.score} className="h-1 w-20" />
                            </div>
                          )}
                        </div>
                      </div>
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
