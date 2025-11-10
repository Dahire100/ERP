"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, CheckCircle, Plus } from "lucide-react"

export default function LessonPlanner() {
  const lessons = [
    { id: 1, topic: "Algebra - Quadratic Equations", class: "10-A", date: "2024-11-08", time: "09:00 AM", duration: "45 min", status: "Completed", objectives: "Solve quadratic equations" },
    { id: 2, topic: "Geometry - Triangles", class: "10-B", date: "2024-11-08", time: "11:00 AM", duration: "45 min", status: "Completed", objectives: "Properties of triangles" },
    { id: 3, topic: "Trigonometry - Basics", class: "9-A", date: "2024-11-09", time: "10:00 AM", duration: "45 min", status: "Scheduled", objectives: "Introduction to trig ratios" },
    { id: 4, topic: "Calculus - Derivatives", class: "10-A", date: "2024-11-10", time: "09:00 AM", duration: "45 min", status: "Scheduled", objectives: "Basic differentiation" },
  ]

  const totalLessons = lessons.length
  const completedLessons = lessons.filter(l => l.status === "Completed").length
  const scheduledLessons = lessons.filter(l => l.status === "Scheduled").length
  const completionRate = Math.round((completedLessons / totalLessons) * 100)

  return (
    <DashboardLayout title="Lesson Planner">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Lesson Planner
          </h2>
          <p className="text-muted-foreground mt-1">Plan and track your lessons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Lessons" value={totalLessons.toString()} icon={BookOpen} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Completed" value={completedLessons.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Scheduled" value={scheduledLessons.toString()} icon={Calendar} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Completion Rate" value={`${completionRate}%`} icon={CheckCircle} iconColor="text-pink-600" iconBgColor="bg-pink-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Lesson Plans</CardTitle>
                <CardDescription>Your scheduled and completed lessons</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-1" />Create Lesson
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-semibold">{lesson.topic}</p>
                      <p className="text-xs text-muted-foreground">Class {lesson.class} • {new Date(lesson.date).toLocaleDateString()} at {lesson.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      lesson.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{lesson.objectives}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>⏱️ {lesson.duration}</span>
                    {lesson.status === "Completed" && (
                      <span className="text-green-600 font-medium">✓ Completed</span>
                    )}
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
