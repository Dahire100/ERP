"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, CheckCircle, Clock } from "lucide-react"

export default function TeacherAcademics() {
  const classes = [
    { id: 1, name: "Class 10-A", subject: "Mathematics", students: 38, chaptersTotal: 12, chaptersCompleted: 9, avgScore: 85, attendance: 95 },
    { id: 2, name: "Class 10-B", subject: "Mathematics", students: 35, chaptersTotal: 12, chaptersCompleted: 8, avgScore: 82, attendance: 92 },
    { id: 3, name: "Class 9-A", subject: "Mathematics", students: 40, chaptersTotal: 10, chaptersCompleted: 7, avgScore: 88, attendance: 94 },
  ]

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0)
  const avgAttendance = Math.round(classes.reduce((sum, cls) => sum + cls.attendance, 0) / classes.length)
  const totalChapters = classes.reduce((sum, cls) => sum + cls.chaptersTotal, 0)
  const completedChapters = classes.reduce((sum, cls) => sum + cls.chaptersCompleted, 0)

  return (
    <DashboardLayout title="Academics">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Academic Management
          </h2>
          <p className="text-muted-foreground mt-1">Manage curriculum and track progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={totalStudents.toString()} icon={Users} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="My Classes" value={classes.length.toString()} icon={BookOpen} iconColor="text-pink-600" iconBgColor="bg-pink-100" />
          <StatCard title="Syllabus Progress" value={`${completedChapters}/${totalChapters}`} icon={CheckCircle} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Avg Attendance" value={`${avgAttendance}%`} icon={Clock} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />My Classes</CardTitle>
            <CardDescription>Curriculum and syllabus tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-lg">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">{cls.subject} • {cls.students} students</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Manage
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Syllabus Progress</span>
                        <span className="font-semibold">{cls.chaptersCompleted}/{cls.chaptersTotal} chapters</span>
                      </div>
                      <Progress value={(cls.chaptersCompleted / cls.chaptersTotal) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                        <p className="font-semibold">{cls.avgScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                        <p className="font-semibold">{cls.attendance}%</p>
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
