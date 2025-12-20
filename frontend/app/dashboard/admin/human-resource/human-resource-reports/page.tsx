"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CalendarRange, BookOpen, ClipboardList, BarChart3, LineChart } from "lucide-react"

const REPORTS = [
    {
        title: "STAFF ATTENDANCE REPORT",
        description: "Staff Attendance Report",
        icon: CalendarRange,
        iconColor: "text-gray-600",
        iconBg: "bg-gray-100" // Placeholder for calendar icon look
    },
    {
        title: "STAFF CUSTOM ATTENDANCE REPORT",
        description: "Staff Custom Attendance Report",
        icon: ClipboardList,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-100"
    },
    {
        title: "STAFF LEAVE REPORT",
        description: "Staff Leave Report",
        icon: BookOpen,
        iconColor: "text-yellow-600",
        iconBg: "bg-yellow-100" // Using BookOpen as closest to folder/file view
    },
    {
        title: "PAYROLL REPORT",
        description: "Payroll Report",
        icon: LineChart,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50"
    },
    {
        title: "STAFF LESSON PLANNER",
        description: "Staff Lesson Planner",
        icon: BarChart3,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100"
    },
]

export default function HumanResourceReportsPage() {
    return (
        <DashboardLayout title="Human Resource Report">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Human Resource Report</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REPORTS.map((report, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className={`p-3 rounded-full ${report.iconBg}`}>
                                    <report.icon className={`h-8 w-8 ${report.iconColor}`} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-blue-900 border-b border-blue-900/20 pb-1 mb-2">
                                        {report.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {report.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    )
}
