"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, BookOpen, TrendingUp } from "lucide-react"

export default function TeacherStudentInfo() {
  const classes = [
    { id: 1, name: "10-A", students: 38, avgScore: 85, attendance: 95 },
    { id: 2, name: "10-B", students: 35, avgScore: 82, attendance: 92 },
    { id: 3, name: "9-A", students: 40, avgScore: 88, attendance: 94 },
  ]

  const students = [
    { id: 1, name: "John Doe", rollNo: "001", class: "10-A", attendance: 95, avgScore: 88 },
    { id: 2, name: "Jane Smith", rollNo: "002", class: "10-A", attendance: 92, avgScore: 90 },
    { id: 3, name: "Bob Johnson", rollNo: "003", class: "10-A", attendance: 88, avgScore: 85 },
    { id: 4, name: "Alice Brown", rollNo: "004", class: "10-A", attendance: 97, avgScore: 92 },
  ]

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0)

  return (
    <DashboardLayout title="Student Info">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Student Information
          </h2>
          <p className="text-muted-foreground mt-1">View student details and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Students" value={totalStudents.toString()} icon={Users} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="My Classes" value={classes.length.toString()} icon={BookOpen} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Avg Performance" value="85%" icon={TrendingUp} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />My Classes</CardTitle>
            <CardDescription>Classes you are teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classes.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-lg">Class {cls.name}</p>
                      <p className="text-xs text-muted-foreground">{cls.students} students</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      View Students
                    </Button>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Class 10-A Students</CardTitle>
            <CardDescription>Student list and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-muted-foreground">Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Score</p>
                      <p className="font-semibold">{student.avgScore}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Attendance</p>
                      <p className="font-semibold">{student.attendance}%</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
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
