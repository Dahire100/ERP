"use client"

import { API_URL } from "@/lib/api-config"
import { useState, useEffect } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Mail, Phone, MapPin, Users, Calendar, Edit, Save, Briefcase } from "lucide-react"
import { toast } from "sonner"

export default function ParentProfile() {
  const [children, setChildren] = useState<any[]>([])
  const [parentInfo, setParentInfo] = useState({
    name: "Parent User",
    email: "parent@example.com",
    phone: "+1-555-0101",
    address: "123 Main Street, City",
    occupation: "Software Engineer",
    relationship: "Guardian",
    emergencyContact: "+1-555-0102",
    childrenCount: 0,
    memberSince: new Date().toISOString()
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(parentInfo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        let user = null
        if (userStr) {
          try {
            user = JSON.parse(userStr)
          } catch (e) { }
        }

        // Fetch Children
        const res = await fetch(`${API_URL}/api/parent/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()

        if (data.success) {
          setChildren(data.data.children)

          // Build parent info from user object and derived data
          setParentInfo({
            name: user?.name || "Parent User",
            email: user?.email || "parent@example.com",
            phone: user?.phone || "+1-555-0000",
            address: "Not provided", // Backend doesn't return this in dashboard/login usually
            occupation: "Not provided",
            relationship: "Parent",
            emergencyContact: "Not provided",
            childrenCount: data.data.children.length,
            memberSince: "2024-01-01" // Placeholder
          })
          setEditForm({
            name: user?.name || "Parent User",
            email: user?.email || "parent@example.com",
            phone: user?.phone || "+1-555-0000",
            address: "",
            occupation: "",
            relationship: "Parent",
            emergencyContact: "",
            childrenCount: data.data.children.length,
            memberSince: "2024-01-01"
          })
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleEdit = () => {
    setEditForm(parentInfo)
    setIsEditModalOpen(true)
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/parent/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone
        })
      })
      const data = await res.json()

      if (data.success) {
        setParentInfo(editForm)
        setIsEditModalOpen(false)
        // Update local storage user if needed
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          user.name = editForm.name
          user.phone = editForm.phone
          localStorage.setItem('user', JSON.stringify(user))
        }
        toast.success("Profile Updated", { description: "Your profile information has been updated." })
      } else {
        toast.error("Update Failed", { description: "Could not update profile information." })
      }
    } catch (error) {
      console.error("Profile update error", error)
      toast.error("Network Error", { description: "Please try again later." })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value })
  }

  if (loading) {
    return (
      <DashboardLayout title="My Profile">
        <div className="flex h-screen items-center justify-center">Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Parent Profile
          </h2>
          <p className="text-muted-foreground mt-1">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StatCard title="Children" value={parentInfo.childrenCount.toString()} icon={Users} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Member Since" value={new Date(parentInfo.memberSince).getFullYear().toString()} icon={Calendar} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Status" value="Active" icon={User} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <Card className="animate-in fade-in slide-in-from-left-4 duration-700 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 animate-in zoom-in duration-500">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                    {parentInfo.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{parentInfo.name}</CardTitle>
                  <CardDescription>{parentInfo.relationship} • {parentInfo.email}</CardDescription>
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
                <p className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4" />{parentInfo.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" />{parentInfo.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Emergency Contact</p>
                <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" />{parentInfo.emergencyContact || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Occupation</p>
                <p className="text-sm font-medium flex items-center gap-2"><Briefcase className="h-4 w-4" />{parentInfo.occupation || "N/A"}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4" />{parentInfo.address || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Children Information */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />My Children</CardTitle>
              <CardDescription>Children enrolled in the school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {children.map((child, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {child.firstName[0]}{child.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{child.firstName} {child.lastName}</p>
                        <p className="text-xs text-muted-foreground">Class {child.class?.name}-{child.class?.section} • Roll No: {child.rollNumber}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                  <Link href={`/dashboard/parent/child-profile?id=${child._id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ))}
              {children.length === 0 && <div className="text-muted-foreground text-center py-4">No children found.</div>}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold">{new Date(parentInfo.memberSince).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Account Status</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Children Enrolled</span>
                <span className="font-semibold">{parentInfo.childrenCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Portal Access</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Full Access</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/dashboard/parent/attendance">
                <Button variant="outline" className="h-20 w-full flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Attendance</span>
                </Button>
              </Link>
              <Link href="/dashboard/parent/homework">
                <Button variant="outline" className="h-20 w-full flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <Briefcase className="h-5 w-5" /> {/* Replaced 'Book' with Briefcase if needed or any icon */}
                  <span className="text-xs">Homework</span>
                </Button>
              </Link>
              <Link href="/dashboard/parent/communicate">
                <Button variant="outline" className="h-20 w-full flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Messages</span>
                </Button>
              </Link>
              <Link href="/dashboard/parent/fees">
                <Button variant="outline" className="h-20 w-full flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <Phone className="h-5 w-5" />
                  <span className="text-xs">Fees</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Parent Profile
              </DialogTitle>
              <DialogDescription>
                Update your profile information below (Updates are local only for this demo)
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
                  disabled // Email usually cannot be changed easily
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
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={editForm.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Emergency contact number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={editForm.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="Enter your occupation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={editForm.relationship}
                  onChange={(e) => handleInputChange('relationship', e.target.value)}
                  placeholder="e.g., Father, Mother"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
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
