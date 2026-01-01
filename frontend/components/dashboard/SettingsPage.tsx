"use client"

import { API_URL } from "@/lib/api-config"
import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, Lock, User, Palette, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Password state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordLoading, setPasswordLoading] = useState(false)

    // Fetch profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                const targetUrl = `${API_URL}/api/profile`;

                const res = await fetch(targetUrl, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await res.json()
                    if (res.ok) {
                        // Flatten data for easier access if structured
                        const userProfile = data.profile || data.user || {}
                        // Merge top level user info if split
                        if (data.user) {
                            userProfile.email = data.user.email
                            userProfile.firstName = data.user.firstName
                            userProfile.lastName = data.user.lastName
                            if (data.user.preferences) userProfile.preferences = data.user.preferences;
                        }
                        setProfile(userProfile)
                    }
                } else {
                    const text = await res.text();
                    console.error(`Received non-JSON response from Profile API at ${targetUrl}. Status: ${res.status}. Body preview: ${text.substring(0, 100)}`)
                }
            } catch (error) {
                toast.error("Failed to load profile settings")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleSaveProfile = async () => {
        setSaving(true)
        try {
            const token = localStorage.getItem('token')
            const targetUrl = `${API_URL}/api/profile`;

            const res = await fetch(targetUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            })

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                if (res.ok) {
                    toast.success("Profile Updated", { description: "Your account information has been saved." })
                } else {
                    throw new Error('Failed to update')
                }
            } else {
                const text = await res.text();
                console.error(`Received non-JSON response from Profile Update API at ${targetUrl}. Status: ${res.status}. Body preview: ${text.substring(0, 100)}`)
                throw new Error('Server returned invalid response')
            }
        } catch (error) {
            toast.error("Update Failed", { description: "Could not save changes." })
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        if (!currentPassword) {
            toast.error("Current password is required")
            return
        }

        setPasswordLoading(true)
        try {
            const token = localStorage.getItem('token')
            const targetUrl = `${API_URL}/api/profile/change-password`;

            const res = await fetch(targetUrl, {
                method: 'POST', // Changed from PUT to POST based on routes
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            })

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json()
                if (res.ok) {
                    toast.success("Password Updated", { description: "Your password has been changed successfully." })
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmPassword("")
                } else {
                    toast.error(data.error || "Failed to update password")
                }
            } else {
                const text = await res.text();
                console.error(`Received non-JSON response from Password API at ${targetUrl}. Status: ${res.status}. Body preview: ${text.substring(0, 100)}`)
                throw new Error('Server returned invalid response')
            }
        } catch (error) {
            toast.error("Error", { description: "Something went wrong." })
            console.error(error)
        } finally {
            setPasswordLoading(false)
        }
    }

    if (loading) {
        return (
            <DashboardLayout title="Settings">
                <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title="Settings">
            <div className="space-y-6 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Account Settings
                    </h2>
                    <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profile?.firstName || ''}
                                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profile?.lastName || ''}
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile?.email || ''}
                                    disabled // Email usually can't be changed by user easily
                                    className="bg-gray-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={profile?.phone || ''}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={profile?.address || ''}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                />
                            </div>
                            <Button onClick={handleSaveProfile} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Password & Security
                            </CardTitle>
                            <CardDescription>Change your password</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current">Current Password</Label>
                                <Input
                                    id="current"
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new">New Password</Label>
                                <Input
                                    id="new"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm">Confirm Password</Label>
                                <Input
                                    id="confirm"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleUpdatePassword}
                                variant="outline"
                                className="w-full"
                                disabled={passwordLoading}
                            >
                                {passwordLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>Manage how you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Receive email updates</p>
                                </div>
                                <Switch
                                    checked={profile?.preferences?.emailNotifications ?? true}
                                    onCheckedChange={(checked) => setProfile({
                                        ...profile,
                                        preferences: { ...profile.preferences, emailNotifications: checked }
                                    })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Push Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Receive push notifications</p>
                                </div>
                                <Switch
                                    checked={profile?.preferences?.pushNotifications ?? true}
                                    onCheckedChange={(checked) => setProfile({
                                        ...profile,
                                        preferences: { ...profile.preferences, pushNotifications: checked }
                                    })}
                                />
                            </div>
                            <Button onClick={handleSaveProfile} disabled={saving} variant="outline" className="w-full mt-2">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Appearance
                            </CardTitle>
                            <CardDescription>Customize your interface</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Dark Mode</Label>
                                    <p className="text-xs text-muted-foreground">Enable dark theme</p>
                                </div>
                                <Switch
                                    checked={profile?.preferences?.theme === 'dark'}
                                    onCheckedChange={(checked) => setProfile({
                                        ...profile,
                                        preferences: { ...profile.preferences, theme: checked ? 'dark' : 'light' }
                                    })}
                                />
                            </div>
                            <Button onClick={handleSaveProfile} disabled={saving} variant="outline" className="w-full mt-2">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Appearance
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
