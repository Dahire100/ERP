"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarCheck, CalendarRange, Grid, Users2, PlaneTakeoff, PlaneLanding, ClipboardList, BookOpenCheck, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Attendance() {
    const modules = [
        {
            title: "Daily Attendance",
            description: "Mark / review day-wise attendance",
            icon: <CalendarCheck className="h-8 w-8 text-green-600" />,
            href: "/dashboard/admin/attendance/daily-attendance",
            color: "bg-green-50 border-green-100"
        },
        {
            title: "Monthly Attendance",
            description: "Month view and summaries",
            icon: <CalendarRange className="h-8 w-8 text-blue-600" />,
            href: "/dashboard/admin/attendance/monthly-attendance",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Consolidated Report",
            description: "Roll-up by class / section",
            icon: <Grid className="h-8 w-8 text-purple-600" />,
            href: "/dashboard/admin/attendance/consolidated-report",
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Class/Section-wise",
            description: "Quick mark by class & section",
            icon: <Users2 className="h-8 w-8 text-amber-600" />,
            href: "/dashboard/admin/attendance/class-attendance",
            color: "bg-amber-50 border-amber-100"
        },
        {
            title: "Leave Apply",
            description: "Submit leave requests",
            icon: <PlaneTakeoff className="h-8 w-8 text-cyan-600" />,
            href: "/dashboard/admin/attendance/leave-apply",
            color: "bg-cyan-50 border-cyan-100"
        },
        {
            title: "Leave Approve",
            description: "Approve / reject leaves",
            icon: <PlaneLanding className="h-8 w-8 text-red-600" />,
            href: "/dashboard/admin/attendance/leave-approve",
            color: "bg-red-50 border-red-100"
        },
        {
            title: "Leave Summary",
            description: "Track leave balances",
            icon: <ClipboardList className="h-8 w-8 text-indigo-600" />,
            href: "/dashboard/admin/attendance/leave-summary",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            title: "Attendance Register",
            description: "Historical register export",
            icon: <BookOpenCheck className="h-8 w-8 text-emerald-600" />,
            href: "/dashboard/admin/attendance/attendance-register",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            title: "Export to Excel/PDF",
            description: "Download reports",
            icon: <Download className="h-8 w-8 text-slate-600" />,
            href: "/dashboard/admin/attendance/export",
            color: "bg-slate-50 border-slate-100"
        }
    ]

    return (
        <DashboardLayout title="Attendance">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <Link key={index} href={module.href}>
                            <Card className={`h-full transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border ${module.color}`}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-white rounded-xl shadow-sm">
                                            {module.icon}
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                                        {module.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600">
                                        {module.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

