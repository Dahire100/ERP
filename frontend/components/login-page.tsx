"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Mail, Lock, Building2, ArrowRight, Shield, KeyRound, Search, BookOpen, Users, UserCircle, Eye, EyeOff, AlertCircle } from "lucide-react"

interface School {
  _id: string
  schoolName: string
  city: string
  state: string
}

type UserRole = "super_admin" | "school_admin" | "teacher" | "parent" | "student"
type AuthMethod = "otp" | "password"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [devOTP, setDevOTP] = useState("") // For development mode

  const router = useRouter()

  const roles = [
    { id: "super_admin" as UserRole, name: "Super Admin", icon: Shield, color: "from-purple-600 to-indigo-600", description: "Manage all schools" },
    { id: "school_admin" as UserRole, name: "School Admin", icon: Building2, color: "from-orange-600 to-red-600", description: "Manage your school" },
    { id: "teacher" as UserRole, name: "Teacher", icon: BookOpen, color: "from-pink-600 to-purple-600", description: "Manage classes" },
    { id: "parent" as UserRole, name: "Parent", icon: Users, color: "from-blue-600 to-indigo-600", description: "View child's progress" },
    { id: "student" as UserRole, name: "Student", icon: UserCircle, color: "from-green-600 to-blue-600", description: "Access courses" },
  ]

  // Set auth method based on role - All roles now use OTP
  useEffect(() => {
    setAuthMethod("otp")
    // Reset form when role changes
    setEmail("")
    setPassword("")
    setOtp("")
    setError("")
    setSuccess("")
    setOtpSent(false)
    setDevOTP("")
  }, [selectedRole])

  // Handle password-based login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          role: selectedRole // Pass role to backend for role-specific OTP
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP")
      }

      setOtpSent(true)
      setSuccess("OTP sent successfully! Check your email.")

      // In dev mode, show OTP in UI if email is not configured
      if (data.devOTP) {
        setDevOTP(data.devOTP)
        setSuccess(`OTP sent! (Dev Mode - OTP: ${data.devOTP})`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          otp,
          role: selectedRole // Pass role for verification
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP")
      }

      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Debug: Log user role
      console.log("✅ Login successful. User role:", data.user.role)

      // Redirect based on actual user role from backend (not selectedRole)
      const roleRoutes: Record<string, string> = {
        super_admin: "/dashboard/super-admin",
        school_admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        student: "/dashboard/student",
        parent: "/dashboard/parent",
      }

      const redirectRoute = roleRoutes[data.user.role] || "/dashboard"
      console.log("🔀 OTP login - Redirecting to:", redirectRoute)
      
      // Use window.location for hard navigation
      window.location.href = redirectRoute
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/otp/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          role: selectedRole // Pass role for resend
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP")
      }

      setSuccess("OTP resent successfully!")

      if (data.devOTP) {
        setDevOTP(data.devOTP)
        setSuccess(`OTP resent! (Dev Mode - OTP: ${data.devOTP})`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setOtpSent(false)
    setOtp("")
    setError("")
    setSuccess("")
    setDevOTP("")
  }

  const handleBackToRoleSelection = () => {
    setSelectedRole(null)
    setEmail("")
    setPassword("")
    setOtp("")
    setError("")
    setSuccess("")
    setOtpSent(false)
    setDevOTP("")
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
              {otpSent ? "Enter OTP" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {otpSent
                ? "Enter the 6-digit code sent to your email"
                : "Sign in with OTP verification"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!otpSent ? (
              // OTP request form (for all roles)
              <form onSubmit={handleSendOTP} className="space-y-5">
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

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full h-12 bg-gradient-to-r ${currentRole.color} hover:opacity-90 text-white font-semibold shadow-lg`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Send OTP</span>
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              // OTP Verification Form
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">OTP sent to:</p>
                  <p className="text-blue-900">{email}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <KeyRound className="w-4 h-4 text-gray-500" />
                    <span>Enter OTP</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full h-12 bg-gradient-to-r ${currentRole.color} hover:opacity-90 text-white font-semibold shadow-lg`}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Verify & Login</span>
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ← Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                🔒 Secure OTP-based authentication • Valid for 10 minutes
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