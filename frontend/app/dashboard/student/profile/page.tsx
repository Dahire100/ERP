"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Edit, Save } from "lucide-react"

export default function StudentProfile() {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Student",
    rollNo: "2024001",
    class: "10-A",
    email: "john.student@school.com",
    phone: "+1-555-0100",
    dob: "2008-05-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main Street, City, State 12345",
    gpa: 3.8,
    attendance: 92,
    subjects: 4
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(studentInfo)

  const handleEdit = () => {
    setEditForm(studentInfo)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    setStudentInfo(editForm)
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  const parentInfo = {
    fatherName: "Mr. John Parent",
    fatherPhone: "+1-555-0101",
    fatherEmail: "father@email.com",
    motherName: "Mrs. Jane Parent",
    motherPhone: "+1-555-0102",
    motherEmail: "mother@email.com"
  }

  const subjects = [
    { name: "Mathematics", grade: "A", percentage: 85 },
    { name: "Science", grade: "A", percentage: 88 },
    { name: "English", grade: "B+", percentage: 78 },
    { name: "History", grade: "B", percentage: 75 },
  ]

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-muted-foreground mt-1">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="GPA" value={studentInfo.gpa.toString()} icon={Award} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Attendance" value={`${studentInfo.attendance}%`} icon={Calendar} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Subjects" value={studentInfo.subjects.toString()} icon={BookOpen} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-2xl font-bold">
                    {studentInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{studentInfo.name}</CardTitle>
                    <CardDescription>Class {studentInfo.class} • Roll No: {studentInfo.rollNo}</CardDescription>
                  </div>
                </div>
                <Button onClick={handleEdit} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4" />{studentInfo.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" />{studentInfo.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium">{new Date(studentInfo.dob).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm font-medium">{studentInfo.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                  <p className="text-sm font-medium">{studentInfo.bloodGroup}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4" />{studentInfo.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Parent/Guardian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold mb-2">{parentInfo.fatherName}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone className="h-3 w-3" />{parentInfo.fatherPhone}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3 w-3" />{parentInfo.fatherEmail}</p>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold mb-2">{parentInfo.motherName}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone className="h-3 w-3" />{parentInfo.motherPhone}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3 w-3" />{parentInfo.motherEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">{subject.grade}</span>
                      <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Edit Profile
              </DialogTitle>
              <DialogDescription>
                Update your profile information below
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={editForm.name} onChange={(e) => handleInputChange('name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={editForm.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={editForm.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={editForm.address} onChange={(e) => handleInputChange('address', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input id="bloodGroup" value={editForm.bloodGroup} onChange={(e) => handleInputChange('bloodGroup', e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Save className="h-4 w-4 mr-2" />Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
