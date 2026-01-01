"use client"

import { API_URL } from "@/lib/api-config"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2, Save, User, Mail, Phone, BookOpen, Calendar, DollarSign, Award, MapPin, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

export default function AddStaffPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState("teacher") // Default to teacher as per request

    // State for credentials dialog
    const [showCredentials, setShowCredentials] = useState(false)
    const [credentials, setCredentials] = useState<any>(null)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        qualification: "",
        subjects: "",
        joiningDate: "",
        address: "",
        salary: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (role !== "teacher") {
            toast.error("Currently only adding Teachers is supported in this demo.")
            setIsLoading(false)
            return
        }

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_URL}/api/teachers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to add staff member")
            }

            // Always show credentials dialog if credentials are returned
            if (data.credentials) {
                setCredentials(data.credentials);
                setShowCredentials(true);

                // Check email status but always show dialog as fallback
                if (data.emailStatus === 'sent') {
                    toast.success("Staff Member Added", {
                        description: "Credentials have been emailed."
                    })
                } else {
                    toast.warning("Staff Member Added", {
                        description: `Email failed: ${data.emailStatus === 'failed' ? 'Invalid Credentials' : 'Check Console'}. Please copy credentials manually.`
                    })
                }
            } else {
                toast.success("Staff Member Added Successfully")
                router.push("/dashboard/admin/human-resource/staff-directory")
            }

        } catch (error) {
            console.error("Error adding staff:", error)
            toast.error(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    const handleCloseDialog = () => {
        setShowCredentials(false)
        router.push("/dashboard/admin/human-resource/staff-directory")
    }

    return (
        <DashboardLayout title="Add Staff Member">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header & Back Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/dashboard/admin/human-resource/staff-directory" className="hover:text-blue-600 flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-900">Add Staff</span>
                    </div>
                </div>

                {/* Credentials Dialog */}
                <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="h-5 w-5" />
                                Teacher Account Created
                            </DialogTitle>
                            <DialogDescription>
                                The account has been created successfully. Please share these login details with the teacher.
                            </DialogDescription>
                        </DialogHeader>

                        {credentials && (
                            <div className="bg-slate-50 p-4 rounded-md space-y-3 border">
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500 uppercase">Teacher ID</Label>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-white p-2 rounded border font-mono text-sm">{credentials.teacherId}</code>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(credentials.teacherId)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500 uppercase">Email (Login ID)</Label>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-white p-2 rounded border font-mono text-sm">{credentials.email}</code>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(credentials.email)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500 uppercase">Password</Label>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-white p-2 rounded border font-mono text-sm font-bold text-blue-600">{credentials.password}</code>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(credentials.password)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200">
                                    Create a note of these credentials. Passwords are encrypted can only be viewed once here.
                                </div>
                            </div>
                        )}

                        <DialogFooter className="sm:justify-start">
                            <Button type="button" variant="default" onClick={handleCloseDialog} className="w-full">
                                Done & Return to Directory
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <form onSubmit={handleSubmit}>
                    <Card className="border-t-4 border-t-pink-500 shadow-lg bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-pink-600" />
                                Staff Details
                            </CardTitle>
                            <CardDescription>
                                Add a new staff member. Login credentials will be automatically generated and emailed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">

                            {/* Role Selection */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Staff Role <span className="text-red-500">*</span></Label>
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="accountant">Accountant</SelectItem>
                                            <SelectItem value="librarian">Librarian</SelectItem>
                                            <SelectItem value="driver">Driver</SelectItem>
                                            <SelectItem value="receptionist">Receptionist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider border-b pb-2">Personal Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="e.g. John"
                                                className="pl-9"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="e.g. Doe"
                                                className="pl-9"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john.doe@school.com"
                                                className="pl-9"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="+1 234 567 890"
                                                className="pl-9"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label htmlFor="address">Current Address</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Textarea
                                                id="address"
                                                name="address"
                                                placeholder="123 Main St, City, Country"
                                                className="pl-9 min-h-[80px]"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic & Professional Info (Teacher specific for now) */}
                            {role === "teacher" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider border-b pb-2">Academic & Professional Details</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="qualification">Qualification</Label>
                                            <div className="relative">
                                                <Award className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="qualification"
                                                    name="qualification"
                                                    placeholder="e.g. PhD in Mathematics, B.Ed"
                                                    className="pl-9"
                                                    value={formData.qualification}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subjects">Subjects (Comma Separated) <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="subjects"
                                                    name="subjects"
                                                    placeholder="e.g. Mathematics, Physics"
                                                    className="pl-9"
                                                    required
                                                    value={formData.subjects}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="joiningDate">Joining Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="joiningDate"
                                                    name="joiningDate"
                                                    type="date"
                                                    className="pl-9"
                                                    value={formData.joiningDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="salary">Salary</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="salary"
                                                    name="salary"
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="pl-9"
                                                    value={formData.salary}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white min-w-[150px]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Staff Member
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    )
}
