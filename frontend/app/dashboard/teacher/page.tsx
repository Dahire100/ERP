"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Users,
    BookOpen,
    ClipboardList,
    Calendar,
    Bell,
    ArrowRight,
    CheckCircle,
    Clock,
    MessageSquare,
    AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardData {
    teacher: {
        name: string;
        employeeId: string;
        department: string;
        email: string;
    };
    stats: {
        totalClasses: number;
        totalStudents: number;
        activeHomework: number;
        pendingSubmissions: number;
    };
    classes: any[];
    todaySchedule: string;
}

export default function TeacherDashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch(`${API_URL}/api/teacher/dashboard`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const result = await response.json()
                if (result.success) {
                    setData(result.data)
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <DashboardLayout title="Loading Dashboard...">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title={`Welcome, ${data?.teacher.name || "Teacher"}`}>
            <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Teacher Console</h1>
                        <p className="text-muted-foreground font-medium">Manage your classes, students and academic activities.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 shadow-sm border-gray-200">
                            <Calendar className="h-4 w-4" /> Schedule
                        </Button>
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-100 gap-2 border-0">
                            <ClipboardList className="h-4 w-4" /> Quick Mark Attendance
                        </Button>
                    </div>
                </div>

                {/* Vital Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Students"
                        value={data?.stats.totalStudents.toString() || "0"}
                        icon={Users}
                        iconColor="text-indigo-600"
                        iconBgColor="bg-indigo-50"
                        description="Across all classes"
                    />
                    <StatCard
                        title="My Classes"
                        value={data?.stats.totalClasses.toString() || "0"}
                        icon={BookOpen}
                        iconColor="text-purple-600"
                        iconBgColor="bg-purple-50"
                        description="Active sections"
                    />
                    <StatCard
                        title="Active Homework"
                        value={data?.stats.activeHomework.toString() || "0"}
                        icon={ClipboardList}
                        iconColor="text-emerald-600"
                        iconBgColor="bg-emerald-50"
                        description="Assigned by you"
                    />
                    <StatCard
                        title="Pending Subs"
                        value={data?.stats.pendingSubmissions.toString() || "0"}
                        icon={Clock}
                        iconColor="text-orange-600"
                        iconBgColor="bg-orange-50"
                        description="To be graded"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Actions Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Primary Navigation Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/dashboard/teacher/attendance">
                                <Card className="hover:shadow-xl transition-all cursor-pointer border-none bg-gradient-to-br from-indigo-500 to-indigo-600 group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                        <CheckCircle className="h-24 w-24 text-white" />
                                    </div>
                                    <CardContent className="p-6 relative z-10">
                                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                            <CheckCircle className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">Student Attendance</h3>
                                        <p className="text-indigo-100 text-sm mb-4">Mark and track daily attendance</p>
                                        <div className="flex items-center text-white text-sm font-bold gap-2">
                                            Go to module <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/dashboard/teacher/homework">
                                <Card className="hover:shadow-xl transition-all cursor-pointer border-none bg-gradient-to-br from-purple-500 to-purple-600 group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                        <BookOpen className="h-24 w-24 text-white" />
                                    </div>
                                    <CardContent className="p-6 relative z-10">
                                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                            <BookOpen className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">Homework Mgmt</h3>
                                        <p className="text-purple-100 text-sm mb-4">Assign work and grade submissions</p>
                                        <div className="flex items-center text-white text-sm font-bold gap-2">
                                            Go to module <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>

                        {/* My Classes List */}
                        <Card className="border-none shadow-xl shadow-indigo-100/30 overflow-hidden">
                            <CardHeader className="bg-gray-50/50 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-indigo-600" /> My Assigned Classes
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    {data?.classes.length ? data.classes.map((cls, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 hover:bg-indigo-50/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-black text-indigo-600">
                                                    {cls.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Class {cls.name}</p>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Section {cls.section}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-sm font-bold text-gray-700">{cls.studentCount || 0} Students</p>
                                                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{cls.attendancePercentage || 0}% Att. Rate</p>
                                                </div>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white hover:shadow-md">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-muted-foreground">
                                            No classes assigned yet.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        {/* Today's Schedule Card */}
                        <Card className="border-none shadow-xl shadow-indigo-100/30">
                            <CardHeader className="bg-indigo-50/50 border-b">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-indigo-600" /> Today's Schedule
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
                                        <Calendar className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900">{data?.todaySchedule || "N/A"}</h4>
                                    <p className="text-xs text-muted-foreground max-w-[200px]">You have {data?.stats.totalClasses || 0} sessions scheduled for today.</p>
                                    <Button size="sm" variant="outline" className="w-full mt-4" onClick={() => router.push('/dashboard/teacher/timetable')}>View Full Timetable</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications / Incidents */}
                        <Card className="border-none shadow-xl shadow-pink-100/30">
                            <CardHeader className="bg-pink-50/50 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-bold">Recent Updates</CardTitle>
                                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 font-black">2 New</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-gray-800">Attendance Not Marked</p>
                                        <p className="text-[10px] text-muted-foreground">Class 10-B attendance is pending for today.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <MessageSquare className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-gray-800">New Message</p>
                                        <p className="text-[10px] text-muted-foreground">Principal sent a staff meeting notice.</p>
                                    </div>
                                </div>
                                <Button className="w-full text-xs variant-ghost hover:bg-gray-50 mt-2">View All Notifications</Button>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <Card className="border-none shadow-xl shadow-gray-100">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold">Academic Shortcuts</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">
                                <Link href="/dashboard/teacher/marks-entry" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                                    <ClipboardList className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Marks Entry</span>
                                </Link>
                                <Link href="/dashboard/teacher/lesson-planner" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                                    <BookOpen className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Lesson Plan</span>
                                </Link>
                                <Link href="/dashboard/teacher/marks-entry" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                                    <Bell className="h-5 w-5 mx-auto text-pink-600 mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Exam Marks</span>
                                </Link>
                                <Link href="/dashboard/teacher/disciplinary" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                                    <AlertTriangle className="h-5 w-5 mx-auto text-orange-600 mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Disciplinary</span>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

function Badge({ children, className, variant = "default" }: { children: React.ReactNode, className?: string, variant?: string }) {
    return (
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${className}`}>
            {children}
        </div>
    )
}
