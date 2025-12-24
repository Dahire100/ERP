"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Mail, Lock, Building2, ArrowRight, Shield, KeyRound, Search, BookOpen, Users, UserCircle, Eye, EyeOff, AlertCircle } from "lucide-react"
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config"

interface School {
  _id: string
  schoolName: string
  city: string
  state: string
}

type UserRole = "super_admin" | "school_admin" | "teacher" | "parent" | "student"
type AuthMethod = "password"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const roles = [
    { id: "super_admin" as UserRole, name: "Super Admin", icon: Shield, color: "from-purple-600 to-indigo-600", description: "Manage all schools" },
    { id: "school_admin" as UserRole, name: "School Admin", icon: Building2, color: "from-orange-600 to-red-600", description: "Manage your school" },
    { id: "teacher" as UserRole, name: "Teacher", icon: BookOpen, color: "from-pink-600 to-purple-600", description: "Manage classes" },
    { id: "parent" as UserRole, name: "Parent", icon: Users, color: "from-blue-600 to-indigo-600", description: "View child's progress" },
    { id: "student" as UserRole, name: "Student", icon: UserCircle, color: "from-green-600 to-blue-600", description: "Access courses" },
  ]

  // Reset form when role changes
  useEffect(() => {
    setEmail("")
    setPassword("")
    setError("")
  }, [selectedRole])

  // Handle password-based login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect based on actual user role from backend
      const roleRoutes: Record<string, string> = {
        super_admin: "/dashboard/super-admin",
        school_admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        student: "/dashboard/student",
        parent: "/dashboard/parent",
      }

      const redirectRoute = roleRoutes[data.user.role] || "/dashboard"
      console.log("🔀 Password login - Redirecting to:", redirectRoute)

      // Use window.location for hard navigation
      window.location.href = redirectRoute
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToRoleSelection = () => {
    setSelectedRole(null)
    setEmail("")
    setPassword("")
    setError("")
  }

  // Role Selection View
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-2xl">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Welcome to FrontierLMS
            </h1>
            <p className="text-xl text-gray-600">Select your role to continue</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card
                  key={role.id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white/80 backdrop-blur-sm"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.name}</h3>
                    <p className="text-gray-600 mb-6">{role.description}</p>
                    <Button className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90`}>
                      Continue as {role.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => router.push('/register')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Register Your School
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentRole = roles.find(r => r.id === selectedRole)!
  const Icon = currentRole.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
          <CardHeader className="space-y-3 pb-6">
            {/* Role indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`bg-gradient-to-br ${currentRole.color} p-2.5 rounded-xl shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{currentRole.name}</h2>
                  <p className="text-xs text-gray-400">{currentRole.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToRoleSelection}
                className="text-gray-500 hover:text-gray-700"
              >
                Change
              </Button>
            </div>

            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Sign in with your email and password
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>Email Address</span>
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${currentRole.color} hover:opacity-90 text-white font-semibold shadow-lg`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                🔒 Secure authentication • Protected by SSL
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  )
}