"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  IndianRupee,
  Calendar,
  Bell,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  CreditCard,
  FileText,
  BookOpenCheck,
  GraduationCap,
  Bus,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Phone,
  Download,
  Book
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ParentDashboard() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <ParentDashboardContent />
    </ProtectedRoute>
  )
}

function ParentDashboardContent() {
  const router = useRouter()
  const [children, setChildren] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("Parent")

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            setUserName(user.name || "Parent")
          } catch (e) { }
        }

        const res = await fetch(`${API_URL}/api/parent/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          setStats(data.data.stats)
          const mappedChildren = data.data.children.map((child: any) => ({
            id: child._id,
            name: `${child.firstName} ${child.lastName}`,
            class: child.class ? `${child.class.name}-${child.class.section}` : 'N/A',
            rollNo: child.rollNumber,
            avatar: "/placeholder-avatar.jpg",
            gpa: child.latestResult ? (child.latestResult.percentage / 25).toFixed(1) : "0.0", // Approx GPA from %
            attendance: child.attendance?.percentage || 0,
            nextExam: "Upcoming Exams", // Placeholder
            pendingFees: child.pendingFees || 0,
            assignments: child.pendingHomework || 0,
            teacher: "Class Teacher" // Placeholder
          }))
          setChildren(mappedChildren)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <DashboardLayout title="Parent Dashboard">
        <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
      </DashboardLayout>
    )
  }

  const notices = [
    { id: 1, title: "Winter Vacation Annual Notification", date: "2024-12-18", category: "Holiday", priority: "High" },
    { id: 2, title: "Parent-Teacher Meeting Schedule", date: "2024-12-15", category: "Meeting", priority: "Medium" },
    { id: 3, title: "Annual Sports Day Registration", date: "2024-12-10", category: "Events", priority: "Low" },
  ]


  const quickLinks = [
    { title: "Pay Fees", icon: CreditCard, href: "/dashboard/parent/fees", color: "text-green-600", bg: "bg-green-100" },
    { title: "Attendance", icon: Calendar, href: "/dashboard/parent/attendance", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Homework", icon: BookOpenCheck, href: "/dashboard/parent/homework", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Timetable", icon: Clock, href: "/dashboard/parent/class-timetable", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Transport", icon: Bus, href: "/dashboard/parent/transport", color: "text-teal-600", bg: "bg-teal-100" },
    { title: "Report Card", icon: FileText, href: "/dashboard/parent/report", color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Downloads", icon: Download, href: "/dashboard/parent/download-center", color: "text-cyan-600", bg: "bg-cyan-100" },
    { title: "Library", icon: Book, href: "/dashboard/parent/library", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Messages", icon: MessageSquare, href: "/dashboard/parent/communicate", color: "text-pink-600", bg: "bg-pink-100" },
  ]

  const totalOutstandingFees = children.reduce((acc, child) => acc + (child.pendingFees || 0), 0)

  const handleQuickPay = (amount: number) => {
    toast.success("Payment Gateway Initiated", { description: `Proceeding to pay ₹${amount}` })
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout title="Parent Dashboard">
      <div className="space-y-8 animate-in fade-in-50 duration-500">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{userName}</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Here is what's happening with your children today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden md:flex gap-2">
              <Phone className="h-4 w-4" /> Contact School
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
              <Bell className="h-4 w-4 mr-2" /> Notifications <Badge className="ml-2 bg-blue-500 hover:bg-blue-500">3</Badge>
            </Button>
          </div>
        </div>

        {/* Children Overview Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <Users className="h-5 w-5 text-blue-600" /> My Children
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card key={child.id} className="border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className={`h-2 w-full ${child.gpa >= 3.0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'}`} />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-sm">
                        <AvatarImage src={child.avatar} />
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-xl font-bold">
                          {child.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{child.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          Class {child.class} <span className="w-1 h-1 bg-gray-300 rounded-full" /> Roll: {child.rollNo}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => navigateTo(`/dashboard/parent/child-profile?id=${child.id}`)}>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Attendance</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-blue-900">{child.attendance}%</span>
                        <span className="text-xs text-blue-600 mb-1">Target: 75%</span>
                      </div>
                      <Progress value={child.attendance} className="h-1.5 mt-2 bg-blue-200" />
                    </div>

                    <div className="p-3 bg-purple-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-700">Performance</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-purple-900">{child.gpa}</span>
                        <span className="text-xs text-purple-600 mb-1">GPA</span>
                      </div>
                      <Progress value={(child.gpa / 4) * 100} className="h-1.5 mt-2 bg-purple-200" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Next Exam
                      </span>
                      <span className="font-medium">{child.nextExam}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" /> Fees Due
                      </span>
                      <span className={`font-bold ${child.pendingFees > 0 ? "text-red-500" : "text-green-500"}`}>
                        {child.pendingFees > 0 ? `₹${child.pendingFees}` : 'Paid'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t flex gap-3">
                    <Button className="flex-1 bg-white text-gray-700 border hover:bg-gray-50" size="sm" onClick={() => navigateTo('/dashboard/parent/homework')}>
                      Homework ({child.assignments})
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="sm" onClick={() => navigateTo('/dashboard/parent/fees')}>
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Total Fees & Notices Grid */}
            <div className="flex flex-col gap-6">
              {/* Fee Card */}
              <Card className="border-none shadow-md bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <CreditCard className="h-32 w-32 text-white" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Outstanding Fees</p>
                      <h3 className="text-3xl font-bold mt-1">₹{totalOutstandingFees}</h3>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[120px] overflow-y-auto">
                    {children.map(child => (
                      <div key={child.id} className="flex justify-between items-center text-sm border-b border-gray-700 pb-2 last:border-0">
                        <span>{child.name}</span>
                        <span className="font-mono">₹{child.pendingFees}</span>
                      </div>
                    ))}
                    {children.length === 0 && <div className="text-sm text-gray-500">No children loaded.</div>}
                  </div>
                  {totalOutstandingFees > 0 ? (
                    <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={() => handleQuickPay(totalOutstandingFees)}>
                      Pay Now
                    </Button>
                  ) : (
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold cursor-default">
                      All Dues Paid
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickLinks.map((link) => (
                  <div
                    key={link.title}
                    className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center gap-2 text-center"
                    onClick={() => navigateTo(link.href)}
                  >
                    <div className={`p-3 rounded-full ${link.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className={`h-5 w-5 ${link.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{link.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <Bell className="h-5 w-5 text-orange-600" /> Notice Board
            </h3>
            <Button variant="link" className="text-blue-600" onClick={() => navigateTo('/dashboard/parent/notice-board')}>View All</Button>
          </div>
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <ScrollArea className="h-[250px]">
                <div className="divide-y">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 cursor-pointer" onClick={() => navigateTo('/dashboard/parent/notice-board')}>
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-2 w-14">
                          <span className="text-xs font-bold text-gray-500 uppercase">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="text-lg font-bold text-gray-900">{new Date(notice.date).getDate()}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                          {notice.priority === "High" && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Urgent</Badge>}
                        </div>
                        <h5 className="font-semibold text-gray-900 leading-tight">{notice.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Click to view full details regarding this announcement.</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}
