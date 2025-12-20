"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, BookOpen, TrendingUp, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function TeacherStudentInfo() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const classes = [
    { id: 1, name: "10-A", students: 38, avgScore: 85, attendance: 95 },
    { id: 2, name: "10-B", students: 35, avgScore: 82, attendance: 92 },
    { id: 3, name: "9-A", students: 40, avgScore: 88, attendance: 94 },
  ]

  const students = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "001",
      class: "10-A",
      attendance: 95,
      avgScore: 88,
      email: "john.doe@student.school.com",
      phone: "+1 234 567 890",
      dob: "2008-05-15",
      address: "123 Maple Street, Springfield",
      parentName: "Michael Doe",
      bloodGroup: "O+"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "002",
      class: "10-A",
      attendance: 92,
      avgScore: 90,
      email: "jane.smith@student.school.com",
      phone: "+1 234 567 891",
      dob: "2008-08-22",
      address: "456 Oak Avenue, Springfield",
      parentName: "Robert Smith",
      bloodGroup: "A+"
    },
    { id: 3, name: "Bob Johnson", rollNo: "003", class: "10-A", attendance: 88, avgScore: 85, email: "bob.j@school.com", phone: "N/A", dob: "2008-01-10", address: "789 Pine Ln", parentName: "Unknown", bloodGroup: "B+" },
    { id: 4, name: "Alice Brown", rollNo: "004", class: "10-A", attendance: 97, avgScore: 92, email: "alice.b@school.com", phone: "N/A", dob: "2008-11-05", address: "321 Elm St", parentName: "Unknown", bloodGroup: "AB+" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />My Classes</CardTitle>
              <CardDescription>Classes you are teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classes.map((cls) => (
                  <div key={cls.id} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-lg">Class {cls.name}</p>
                        <p className="text-xs text-muted-foreground">{cls.students} students</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Class 10-A Students</CardTitle>
              <CardDescription>Student list and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow group">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold group-hover:text-purple-700 transition-colors">{student.name}</p>
                        <p className="text-xs text-muted-foreground">Roll No: {student.rollNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="font-semibold">{student.avgScore}%</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted-foreground">Attendance</p>
                        <p className="font-semibold">{student.attendance}%</p>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>View Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Student Profile</DialogTitle>
                            <DialogDescription>Detailed information about {student.name}</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                            <div className="flex flex-col items-center text-center space-y-3">
                              <Avatar className="h-24 w-24 border-4 border-slate-100 shadow-xl">
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold text-xl">{student.name}</h3>
                                <p className="text-slate-500">Class {student.class} • Roll {student.rollNo}</p>
                                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-200">Active Student</Badge>
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    {student.email}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {student.phone}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date of Birth</label>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {student.dob}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Blood Group</label>
                                  <div className="text-sm font-medium">
                                    {student.bloodGroup}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t">
                                <div className="space-y-1">
                                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</label>
                                  <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                    {student.address}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t flex gap-3">
                                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Message Parent</Button>
                                <Button variant="outline" className="flex-1">View Full Report</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
