"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Mail, Lock, Building2, ArrowRight, Shield, KeyRound, Search } from "lucide-react"

interface School {
  _id: string
  schoolName: string
  city: string
  state: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [devOTP, setDevOTP] = useState("") // For development mode

  // School List State
  const [schools, setSchools] = useState<School[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadingSchools, setIsLoadingSchools] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schools/active')
        if (response.ok) {
          const data = await response.json()
          setSchools(data.schools || [])
        }
      } catch (error) {
        console.error("Failed to fetch schools:", error)
      } finally {
        setIsLoadingSchools(false)
      }
    }

    fetchSchools()
  }, [])

  const filteredSchools = schools.filter(school =>
    school.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        body: JSON.stringify({ email }),
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
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP")
      }

      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect based on role
      const roleRoutes: Record<string, string> = {
        super_admin: "/dashboard/super-admin",
        school_admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        student: "/dashboard/student",
        parent: "/dashboard/parent",
      }

      const redirectRoute = roleRoutes[data.user.role] || "/dashboard/admin"
      router.push(redirectRoute)
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
        body: JSON.stringify({ email }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - School Search & List */}
        <div className="hidden lg:flex flex-col h-[600px] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-white/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Find Your School
              </h1>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for your school..."
                className="pl-9 bg-white border-gray-200 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {isLoadingSchools ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <div
                  key={school._id}
                  onClick={() => router.push(`/school-login/${school._id}`)}
                  className="group p-4 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all cursor-pointer flex items-center space-x-4"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {school.schoolName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-700">
                      {school.schoolName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      {school.city}, {school.state}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No schools found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don't see your school? <button onClick={() => router.push('/register')} className="text-blue-600 hover:underline">Register here</button>
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-3 pb-6">
              {/* Mobile logo */}
              <div className="flex lg:hidden items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FrontierLMS
                </h1>
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
                // Email Form
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
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                      {success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                      {success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500 font-medium">New to FrontierLMS?</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 font-semibold transition-all duration-200"
                onClick={() => router.push('/register')}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Register Your School
              </Button>

              <div className="text-center pt-2">
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
    </div>
  )
}