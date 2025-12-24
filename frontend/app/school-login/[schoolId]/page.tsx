"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Mail, Lock, ArrowLeft, Building2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config"

interface School {
    _id: string
    schoolName: string
    city: string
    state: string
}

export default function SchoolLoginPage() {
    const params = useParams()
    const router = useRouter()
    const schoolId = params.schoolId as string

    const [school, setSchool] = useState<School | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingSchool, setIsFetchingSchool] = useState(true)

    useEffect(() => {
        const fetchSchoolDetails = async () => {
            try {
                // We can reuse the active schools list or fetch specific school details
                // For now, we'll fetch all active and find the one matching ID since we don't have a public single school endpoint yet
                // Optimization: Add a public single school endpoint later
                const response = await fetch(getApiUrl(API_ENDPOINTS.SCHOOLS.ACTIVE))
                if (response.ok) {
                    const data = await response.json()
                    const foundSchool = data.schools.find((s: School) => s._id === schoolId)
                    if (foundSchool) {
                        setSchool(foundSchool)
                    } else {
                        toast.error("School not found")
                        router.push("/login")
                    }
                }
            } catch (error) {
                console.error("Failed to fetch school:", error)
            } finally {
                setIsFetchingSchool(false)
            }
        }

        if (schoolId) {
            fetchSchoolDetails()
        }
    }, [schoolId, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Login failed")
            }

            // Verify user belongs to this school
            if (data.user.schoolId !== schoolId && data.user.role !== 'super_admin') {
                throw new Error("You are not authorized to access this school's dashboard")
            }

            // Store token and user data
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success(`Welcome back to ${school?.schoolName}`)

            // Redirect based on role
            const roleRoutes: Record<string, string> = {
                super_admin: "/dashboard/super-admin",
                school_admin: "/dashboard/admin",
                teacher: "/dashboard/teacher",
                student: "/dashboard/student",
                parent: "/dashboard/parent",
            }

            const redirectRoute = roleRoutes[data.user.role] || "/dashboard/admin"
            
            // Use window.location for hard navigation
            window.location.href = redirectRoute
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetchingSchool) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!school) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Button
                    variant="ghost"
                    className="mb-4 hover:bg-transparent hover:text-blue-600 pl-0"
                    onClick={() => router.push("/login")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to School Search
                </Button>

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <CardHeader className="space-y-3 pb-6 text-center">
                        <div className="mx-auto bg-blue-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                            <Building2 className="w-10 h-10 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            {school.schoolName}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-1">
                            {school.city}, {school.state}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="admin@school.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login to Dashboard"}
                            </Button>
                        </form>

                        <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium">First time logging in?</p>
                                <p className="mt-1 text-blue-700">
                                    Use the credentials sent to your email address upon school approval.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Powered by FrontierLMS
                </p>
            </div>
        </div>
    )
}
