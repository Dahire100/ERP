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
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  TrendingUp,
  GraduationCap,
  Edit,
  Save
} from "lucide-react"

export default function ParentChildProfile() {
  const [childProfile, setChildProfile] = useState({
    name: "Alice Student",
    rollNo: "10-A-001",
    class: "10-A",
    section: "A",
    dob: "2010-05-15",
    gender: "Female",
    bloodGroup: "A+",
    email: "alice.student@school.com",
    phone: "+1-555-0123",
    address: "123 Main Street, City, State 12345",
    parentName: "John Student",
    parentPhone: "+1-555-0124",
    parentEmail: "john.student@email.com",
    admissionDate: "2020-04-01",
    gpa: 3.8,
    attendance: 92,
    rank: 5,
    totalStudents: 45
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(childProfile)

  const handleEdit = () => {
    setEditForm(childProfile)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    setChildProfile(editForm)
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  const subjects = [
    { name: "Mathematics", grade: "A", marks: 95, teacher: "Mr. Smith" },
    { name: "Science", grade: "A", marks: 92, teacher: "Ms. Johnson" },
    { name: "English", grade: "B+", marks: 88, teacher: "Mrs. Williams" },
    { name: "History", grade: "A", marks: 90, teacher: "Mr. Brown" },
    { name: "Physical Education", grade: "A", marks: 94, teacher: "Coach Davis" },
  ]

  return (
    <DashboardLayout title="My Child's Profile">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Profile
          </h2>
          <p className="text-muted-foreground mt-1">
            Complete academic and personal information
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="GPA"
            value={childProfile.gpa.toString()}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Attendance"
            value={`${childProfile.attendance}%`}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Class Rank"
            value={`#${childProfile.rank}`}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Total Subjects"
            value={subjects.length.toString()}
            icon={BookOpen}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <Button onClick={handleEdit} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl font-bold">
                    {childProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{childProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">Class {childProfile.class} • Roll No: {childProfile.rollNo}</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(childProfile.dob).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="font-medium">{childProfile.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                  <p className="font-medium">{childProfile.bloodGroup}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Admission Date</p>
                  <p className="font-medium">{new Date(childProfile.admissionDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-medium text-sm">{childProfile.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="font-medium">{childProfile.phone}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Address
                  </p>
                  <p className="font-medium text-sm">{childProfile.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Parent/Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-semibold">{childProfile.parentName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> Phone
                </p>
                <p className="font-medium">{childProfile.parentPhone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" /> Email
                </p>
                <p className="font-medium text-sm">{childProfile.parentEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall GPA</span>
                  <span className="text-2xl font-bold text-green-600">{childProfile.gpa}</span>
                </div>
                <Progress value={(childProfile.gpa / 4) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Attendance</span>
                  <span className="text-lg font-bold">{childProfile.attendance}%</span>
                </div>
                <Progress value={childProfile.attendance} className="h-2" />
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Class Rank</span>
                  <span className="font-semibold">#{childProfile.rank} of {childProfile.totalStudents}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subject Performance
            </CardTitle>
            <CardDescription>Current semester grades and marks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">{subject.name}</p>
                      <p className="text-xs text-muted-foreground">Teacher: {subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{subject.grade}</p>
                      <p className="text-sm text-muted-foreground">{subject.marks}/100</p>
                    </div>
                  </div>
                  <Progress value={subject.marks} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Child Profile
              </DialogTitle>
              <DialogDescription>
                Update your child's profile information below
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
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input id="bloodGroup" value={editForm.bloodGroup} onChange={(e) => handleInputChange('bloodGroup', e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={editForm.address} onChange={(e) => handleInputChange('address', e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Save className="h-4 w-4 mr-2" />Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
