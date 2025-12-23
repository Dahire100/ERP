"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Settings, Lock, User, Bell, ChevronRight, Moon, LogOut, Shield, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': `Bearer ${token}` }
      const res = await fetch('http://127.0.0.1:5000/api/auth/profile', { headers })
      const data = await res.json()
      if (data.success) {
        setProfile(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: "This feature is currently being processed.",
    })
  }

  const handleSignOut = () => {
    toast({
      title: "Signing Out",
      description: "Securely logging you out of all devices...",
      variant: "destructive"
    })
  }

  return (
    <DashboardLayout title="System Setting">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">System Settings</h1>
          <p className="text-gray-500 mt-1">Manage your profile, security, and application preferences.</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-md">
                  {profile ? (profile.firstName ? profile.firstName[0] : 'U') : '...'}
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">{profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}</h3>
                  <p className="text-gray-500 font-medium">{profile?.role ? profile.role.toUpperCase() : 'TEACHER'} • {profile?.department || 'General'}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 pt-1">
                    <Mail className="w-4 h-4" /> {profile?.email || 'email@example.com'}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" /> {profile?.phone || '+1 234 567 890'}
                  </div>
                </div>
                <div className="md:ml-auto">
                  <Button variant="secondary" onClick={() => handleAction("Editing Profile")}>Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive emails about new assignments and events.</p>
                  </div>
                </div>
                <Switch defaultChecked onCheckedChange={() => handleAction("Notification Settings Updated")} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Toggle dark theme for the dashboard.</p>
                  </div>
                </div>
                <Switch onCheckedChange={() => handleAction("Theme Updated")} />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-between h-12" onClick={() => handleAction("Password Change Requested")}>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <span>Change Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>
              <Button variant="outline" className="w-full justify-between h-12" onClick={() => handleAction("2FA Setup Started")}>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span>Two-Factor Authentication</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6 pb-12">
            <Button variant="destructive" className="w-full md:w-auto" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out of All Devices
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
