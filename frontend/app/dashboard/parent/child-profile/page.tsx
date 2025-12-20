"use client"

import { useState, useEffect } from "react"
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
  Save,
  Users,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentChildProfile() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const childrenData = {
    child1: {
      id: "child1",
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
      totalStudents: 45,
      subjects: [
        { name: "Mathematics", grade: "A", marks: 95, teacher: "Mr. Smith" },
        { name: "Science", grade: "A", marks: 92, teacher: "Ms. Johnson" },
        { name: "English", grade: "B+", marks: 88, teacher: "Mrs. Williams" },
        { name: "History", grade: "A", marks: 90, teacher: "Mr. Brown" },
      ]
    },
    child2: {
      id: "child2",
      name: "Bob Student",
      rollNo: "8-B-045",
      class: "8-B",
      section: "B",
      dob: "2012-08-20",
      gender: "Male",
      bloodGroup: "O+",
      email: "bob.student@school.com",
      phone: "+1-555-9876",
      address: "123 Main Street, City, State 12345",
      parentName: "John Student",
      parentPhone: "+1-555-0124",
      parentEmail: "john.student@email.com",
      admissionDate: "2022-04-01",
      gpa: 3.2,
      attendance: 88,
      rank: 12,
      totalStudents: 38,
      subjects: [
        { name: "Mathematics", grade: "B+", marks: 78, teacher: "Mr. Davis" },
        { name: "Science", grade: "A", marks: 82, teacher: "Ms. Wilson" },
        { name: "English", grade: "A", marks: 88, teacher: "Mrs. Taylor" },
        { name: "History", grade: "A+", marks: 90, teacher: "Mr. Evans" },
      ]
    }
  }

  const [editForm, setEditForm] = useState(childrenData[selectedChild])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Update form when child changes
  useEffect(() => {
    setEditForm(childrenData[selectedChild])
  }, [selectedChild])

  const currentChild = childrenData[selectedChild]

  const handleEdit = () => {
    setEditForm(currentChild)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    // In a real app, we would make an API call here
    toast.success("Profile Updated", { description: "Changes saved successfully." })
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  return (
    <DashboardLayout title="My Child's Profile">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Student Profile
            </h2>
            <p className="text-muted-foreground mt-1">
              Personal and academic details for {currentChild.name}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[180px] justify-between shadow-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  {currentChild.name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setSelectedChild("child1")}>
                Alice Student (10-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedChild("child2")}>
                Bob Student (8-B)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="GPA"
            value={currentChild.gpa.toString()}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Attendance"
            value={`${currentChild.attendance}%`}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Class Rank"
            value={`#${currentChild.rank}`}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Total Subjects"
            value={currentChild.subjects.length.toString()}
            icon={BookOpen}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Profile Overview */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              <Button onClick={handleEdit} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                <Avatar className="h-32 w-32 shadow-lg ring-4 ring-white">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl font-bold">
                    {currentChild.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">{currentChild.name}</h3>
                  <div className="flex items-center gap-2 justify-center mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Class {currentChild.class}</span>
                    <span className="text-xs text-gray-500">Roll No: {currentChild.rollNo}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date of Birth</p>
                  <p className="font-semibold text-gray-900">{new Date(currentChild.dob).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Gender</p>
                  <p className="font-semibold text-gray-900">{currentChild.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Blood Group</p>
                  <p className="font-semibold text-gray-900">{currentChild.bloodGroup}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Admission Date</p>
                  <p className="font-semibold text-gray-900">{new Date(currentChild.admissionDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-semibold text-gray-900">{currentChild.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="font-semibold text-gray-900">{currentChild.phone}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Address
                  </p>
                  <p className="font-semibold text-gray-900">{currentChild.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parent Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Parent/Guardian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-purple-100 text-purple-700">JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900">{currentChild.parentName}</p>
                  <p className="text-xs text-gray-500">Primary Guardian</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="font-medium">{currentChild.parentPhone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-medium text-sm truncate" title={currentChild.parentEmail}>{currentChild.parentEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Performance Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall GPA</span>
                  <span className="text-2xl font-bold text-green-600">{currentChild.gpa}</span>
                </div>
                <Progress value={(currentChild.gpa / 4) * 100} className="h-2.5 bg-green-100" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Attendance</span>
                  <span className="text-lg font-bold">{currentChild.attendance}%</span>
                </div>
                <Progress value={currentChild.attendance} className="h-2.5 bg-blue-100" />
              </div>
              <div className="pt-2 border-t mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Class Rank</span>
                  <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">#{currentChild.rank} of {currentChild.totalStudents}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-600" />
              Subject Performance
            </CardTitle>
            <CardDescription>Current semester grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentChild.subjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-xl hover:shadow-sm transition-all bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {subject.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{subject.name}</p>
                      <p className="text-xs text-gray-500">Teacher: {subject.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{subject.grade}</p>
                    <p className="text-xs font-medium text-gray-500">{subject.marks}/100</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edit Child Profile
              </DialogTitle>
              <DialogDescription>
                Update information for {currentChild.name}
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
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Save className="h-4 w-4 mr-2" />Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
