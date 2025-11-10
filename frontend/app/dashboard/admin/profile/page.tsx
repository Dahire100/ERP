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
import { User, Mail, Phone, Award, Calendar, Shield, Edit, Save, Users, Building } from "lucide-react"

export default function AdminProfile() {
  const [adminInfo, setAdminInfo] = useState({
    name: "Admin User",
    employeeId: "ADM-2024-001",
    email: "admin@school.com",
    phone: "+1-555-0100",
    role: "System Administrator",
    department: "Administration",
    joiningDate: "2020-01-15",
    experience: "4 years",
    permissions: "Full Access"
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(adminInfo)

  const handleEdit = () => {
    setEditForm(adminInfo)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    setAdminInfo(editForm)
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Profile
          </h2>
          <p className="text-muted-foreground mt-1">View and manage your administrator profile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Experience" value={adminInfo.experience} icon={Award} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Role" value="Admin" icon={Shield} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Access Level" value="Full" icon={Users} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                    {adminInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{adminInfo.name}</CardTitle>
                  <CardDescription>{adminInfo.role} • ID: {adminInfo.employeeId}</CardDescription>
                </div>
              </div>
              <Button onClick={handleEdit} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4" />{adminInfo.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" />{adminInfo.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium flex items-center gap-2"><Building className="h-4 w-4" />{adminInfo.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Joining Date</p>
                <p className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(adminInfo.joiningDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Permissions</p>
                <p className="text-sm font-medium flex items-center gap-2"><Shield className="h-4 w-4" />{adminInfo.permissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />System Access</CardTitle>
              <CardDescription>Your administrative permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">User Management</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Full Access</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">System Settings</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Full Access</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Reports & Analytics</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Full Access</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Financial Management</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Full Access</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />System Overview</CardTitle>
              <CardDescription>Current system statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Users</span>
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="text-lg font-bold text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm font-medium">Today, 10:30 AM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Admin Profile
              </DialogTitle>
              <DialogDescription>
                Update your administrator profile information below
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
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={editForm.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Enter your role"
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
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={editForm.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 4 years"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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
