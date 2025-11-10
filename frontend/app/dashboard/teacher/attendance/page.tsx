"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, CheckCircle, XCircle, Clock } from "lucide-react"

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const students = [
    { id: 1, name: "John Doe", rollNo: "001", status: "Present", attendance: 95 },
    { id: 2, name: "Jane Smith", rollNo: "002", status: "Absent", attendance: 88 },
    { id: 3, name: "Bob Johnson", rollNo: "003", status: "Present", attendance: 92 },
    { id: 4, name: "Alice Brown", rollNo: "004", status: "Present", attendance: 97 },
    { id: 5, name: "Charlie Wilson", rollNo: "005", status: "Late", attendance: 90 },
  ]

  const presentCount = students.filter(s => s.status === "Present").length
  const absentCount = students.filter(s => s.status === "Absent").length
  const lateCount = students.filter(s => s.status === "Late").length
  const attendancePercentage = Math.round((presentCount / students.length) * 100)

  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mark Attendance
          </h2>
          <p className="text-muted-foreground mt-1">Class {selectedClass} • {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={students.length.toString()} icon={Users} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Present" value={presentCount.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Absent" value={absentCount.toString()} icon={XCircle} iconColor="text-red-600" iconBgColor="bg-red-100" />
          <StatCard title="Attendance %" value={`${attendancePercentage}%`} icon={Clock} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Student List</CardTitle>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Save Attendance
              </Button>
            </div>
            <CardDescription>Mark attendance for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-muted-foreground">Roll No: {student.rollNo} • Overall: {student.attendance}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={student.status === "Present" ? "default" : "outline"} className={student.status === "Present" ? "bg-green-600 hover:bg-green-700" : ""}>
                      <CheckCircle className="h-4 w-4 mr-1" />Present
                    </Button>
                    <Button size="sm" variant={student.status === "Absent" ? "default" : "outline"} className={student.status === "Absent" ? "bg-red-600 hover:bg-red-700" : ""}>
                      <XCircle className="h-4 w-4 mr-1" />Absent
                    </Button>
                    <Button size="sm" variant={student.status === "Late" ? "default" : "outline"} className={student.status === "Late" ? "bg-orange-600 hover:bg-orange-700" : ""}>
                      <Clock className="h-4 w-4 mr-1" />Late
                    </Button>
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
