"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, CheckCircle, Plus, ChevronLeft, ChevronRight } from "lucide-react"

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

  // Mock Calendar Days
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1)
  const currentMonth = "November 2024"

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Widget */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-bold">Schedule Perspective</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-sm">{currentMonth}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground font-medium mb-2">
                  <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty slots for starting day */}
                  <div className="h-14 md:h-24 bg-transparent"></div>
                  <div className="h-14 md:h-24 bg-transparent"></div>

                  {calendarDays.map((day) => {
                    // Mock logic to show events
                    const hasEvent = [8, 9, 10, 15, 22].includes(day)
                    return (
                      <div key={day} className={`h-14 md:h-24 border rounded-lg p-2 relative hover:bg-slate-50 transition-colors ${hasEvent ? 'border-purple-200 bg-purple-50/50' : 'border-slate-100'}`}>
                        <span className={`text-sm ${hasEvent ? 'font-bold text-purple-700' : 'text-slate-500'}`}>{day}</span>
                        {hasEvent && (
                          <div className="mt-1 hidden md:block">
                            <div className="text-[10px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded truncate">
                              Math 10-A
                            </div>
                            {day === 8 && (
                              <div className="text-[10px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate mt-1">
                                Math 10-B
                              </div>
                            )}
                          </div>
                        )}
                        {hasEvent && (
                          <div className="md:hidden mt-1 h-1.5 w-1.5 rounded-full bg-purple-500 mx-auto"></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Lesson Plans List</CardTitle>
                    <CardDescription>Detailed list of your lessons</CardDescription>
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
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${lesson.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
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

          {/* Quick Stats / Side Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none">
              <CardHeader>
                <CardTitle>Next Lesson</CardTitle>
                <CardDescription className="text-indigo-200">Starting in 15 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">10:00 AM</p>
                    <p className="text-lg font-medium opacity-90">Trigonometry - Basics</p>
                    <p className="text-sm opacity-75">Class 9-A • Room 102</p>
                  </div>
                  <Button variant="secondary" className="w-full text-indigo-700 font-semibold">
                    View Materials
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lesson Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Algebra Worksheet.pdf", "Triangle Formulas.docx", "Trig Ratio Chart.png"].map((file, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <div className="h-8 w-8 bg-red-100 text-red-600 rounded flex items-center justify-center text-xs font-bold">PDF</div>
                    <span className="text-sm text-slate-700">{file}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-indigo-600 text-xs mt-2">View All Materials</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
