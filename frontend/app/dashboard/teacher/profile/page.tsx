"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Mail, Phone, Award, Calendar, DollarSign, Edit, Save } from "lucide-react"

export default function TeacherProfile() {
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Mr. John Teacher",
    employeeId: "TCH-2024-001",
    email: "john.teacher@school.com",
    phone: "+1-555-0100",
    department: "Mathematics",
    qualification: "M.Sc Mathematics",
    experience: "8 years",
    joiningDate: "2016-08-15"
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(teacherInfo)

  const handleEdit = () => {
    setEditForm(teacherInfo)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    setTeacherInfo(editForm)
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-muted-foreground mt-1">View and manage your profile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StatCard title="Experience" value={teacherInfo.experience} icon={Award} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Classes" value="3" icon={User} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Students" value="113" icon={User} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <Card className="animate-in fade-in slide-in-from-left-4 duration-700 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 animate-in zoom-in duration-500">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                    {teacherInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{teacherInfo.name}</CardTitle>
                  <CardDescription>{teacherInfo.department} Department • ID: {teacherInfo.employeeId}</CardDescription>
                </div>
              </div>
              <Button onClick={handleEdit} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4" />{teacherInfo.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" />{teacherInfo.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Qualification</p>
                <p className="text-sm font-medium">{teacherInfo.qualification}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Joining Date</p>
                <p className="text-sm font-medium">{new Date(teacherInfo.joiningDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Leave Management</CardTitle>
              <CardDescription>Apply and track leave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="text-lg font-bold">12 days</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Used</p>
                  <p className="text-lg font-bold">3 days</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Apply for Leave</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />Payroll</CardTitle>
              <CardDescription>View salary information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-xs text-muted-foreground">Monthly Salary</p>
                <p className="text-2xl font-bold">₹50,000</p>
              </div>
              <Button variant="outline" className="w-full">View Payslips</Button>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Edit Profile
              </DialogTitle>
              <DialogDescription>
                Update your profile information below
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={editForm.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter your department"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={editForm.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  placeholder="Enter your qualification"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={editForm.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 8 years"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
