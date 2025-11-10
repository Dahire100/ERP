"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Plus } from "lucide-react"

export default function TeacherHomework() {
  const assignments = [
    { id: 1, title: "Algebra Problems", class: "10-A", dueDate: "2024-11-18", totalStudents: 38, submitted: 32, graded: 25, status: "Active" },
    { id: 2, title: "English Essay", class: "10-B", dueDate: "2024-11-20", totalStudents: 35, submitted: 28, graded: 28, status: "Active" },
    { id: 3, title: "Science Project", class: "9-A", dueDate: "2024-11-15", totalStudents: 40, submitted: 40, graded: 40, status: "Completed" },
    { id: 4, title: "History Essay", class: "10-A", dueDate: "2024-11-22", totalStudents: 38, submitted: 15, graded: 10, status: "Active" },
  ]

  const totalAssignments = assignments.length
  const activeAssignments = assignments.filter(a => a.status === "Active").length
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submitted, 0)
  const totalPendingGrading = assignments.reduce((sum, a) => sum + (a.submitted - a.graded), 0)

  return (
    <DashboardLayout title="H.W. / C.W.">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Homework & Classwork
          </h2>
          <p className="text-muted-foreground mt-1">Assign and grade assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Assignments" value={totalAssignments.toString()} icon={BookOpen} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Active" value={activeAssignments.toString()} icon={Clock} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Submissions" value={totalSubmissions.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Pending Grading" value={totalPendingGrading.toString()} icon={Clock} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Assignments</CardTitle>
                <CardDescription>Manage homework and classwork</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-1" />Create Assignment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">Class {assignment.class} • Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        assignment.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {assignment.status}
                      </span>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Submissions</span>
                      <span className="font-semibold">{assignment.submitted}/{assignment.totalStudents}</span>
                    </div>
                    <Progress value={(assignment.submitted / assignment.totalStudents) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-muted-foreground">Graded: {assignment.graded}/{assignment.submitted}</span>
                      {assignment.submitted > assignment.graded && (
                        <span className="text-orange-600 font-medium">{assignment.submitted - assignment.graded} pending</span>
                      )}
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
