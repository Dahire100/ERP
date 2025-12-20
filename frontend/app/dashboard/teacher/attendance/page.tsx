"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Users, CheckCircle, XCircle, Clock, Calendar, Save, Filter } from "lucide-react"

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const { toast } = useToast()

  // Mock state for students to simulate "Working" functionality
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", rollNo: "001", status: "Present", attendance: 95 },
    { id: 2, name: "Jane Smith", rollNo: "002", status: "Absent", attendance: 88 },
    { id: 3, name: "Bob Johnson", rollNo: "003", status: "Present", attendance: 92 },
    { id: 4, name: "Alice Brown", rollNo: "004", status: "Present", attendance: 97 },
    { id: 5, name: "Charlie Wilson", rollNo: "005", status: "Late", attendance: 90 },
  ])

  const handleStatusChange = (id: number, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s))
  }

  const handleSaveAttendance = () => {
    // Simulate API call
    toast({
      title: "Attendance Saved",
      description: `Successfully saved attendance for Class ${selectedClass}.`,
      duration: 3000,
      className: "bg-green-50 border-green-200 text-green-800"
    })
  }

  const presentCount = students.filter(s => s.status === "Present").length
  const absentCount = students.filter(s => s.status === "Absent").length
  const lateCount = students.filter(s => s.status === "Late").length
  const attendancePercentage = Math.round((presentCount / students.length) * 100)

  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mark Attendance
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
              <span className="text-gray-300">|</span>
              <span className="font-semibold text-gray-700">Class {selectedClass}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Change Class
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveAttendance}>
              <Save className="mr-2 h-4 w-4" /> Save Attendance
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={students.length.toString()} icon={Users} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Present" value={presentCount.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Absent" value={absentCount.toString()} icon={XCircle} iconColor="text-red-600" iconBgColor="bg-red-100" />
          <StatCard title="Attendance %" value={`${attendancePercentage}%`} icon={Clock} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
        </div>

        <Card className="shadow-lg border-none">
          <CardHeader className="bg-gray-50/50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-indigo-600" />Student List</CardTitle>
                <CardDescription>Select status for each student</CardDescription>
              </div>
              <div className="flex gap-2 text-sm">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Present</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Absent</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Late</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {students.map((student) => (
                <div key={student.id} className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${student.status === 'Absent' ? 'bg-red-50/30' : ''
                  }`}>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{student.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-gray-500">Roll #{student.rollNo}</Badge>
                        <span>• Avg Attendance: {student.attendance}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={student.status === "Present" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "Present")}
                      className={`w-24 ${student.status === "Present" ? "bg-green-600 hover:bg-green-700 shadow-md shadow-green-100" : "hover:text-green-600 hover:border-green-200"}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Present
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "Absent" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "Absent")}
                      className={`w-24 ${student.status === "Absent" ? "bg-red-600 hover:bg-red-700 shadow-md shadow-red-100" : "hover:text-red-600 hover:border-red-200"}`}
                    >
                      <XCircle className="h-4 w-4 mr-1" /> Absent
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "Late" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "Late")}
                      className={`w-24 ${student.status === "Late" ? "bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-100" : "hover:text-orange-500 hover:border-orange-200"}`}
                    >
                      <Clock className="h-4 w-4 mr-1" /> Late
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 flex justify-end">
            <span className="text-muted-foreground text-sm mr-4">Total Students: {students.length}</span>
            <Button className="bg-indigo-600" onClick={handleSaveAttendance}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
