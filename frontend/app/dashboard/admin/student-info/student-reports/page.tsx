"use client"

import DashboardLayout from "@/components/dashboard-layout"
import {
    Users,
    User,
    FileText,
    Monitor,
    BarChart,
    Lock,
    FilePen,
    Home,
    PieChart,
    FileMinus
} from "lucide-react"
import Link from "next/link"

interface ReportCardProps {
    title: string
    subtitle: string
    icon: React.ElementType
    bgColor: string
    iconColor: string
    href: string
}

function ReportCard({ title, subtitle, icon: Icon, bgColor, iconColor, href }: ReportCardProps) {
    return (
        <Link href={href} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`p-3 rounded-full mr-4 ${bgColor}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
                <h3 className="font-bold text-[#1e1e50] text-sm uppercase">{title}</h3>
                <p className="text-gray-500 text-xs">{subtitle}</p>
            </div>
        </Link>
    )
}

export default function StudentReports() {
    const reports = [
        {
            title: "Student Report",
            subtitle: "Class Section Wise",
            icon: User,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
            href: "#"
        },
        {
            title: "Guardian Report",
            subtitle: "Guardian Report",
            icon: Users,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            href: "#"
        },
        {
            title: "Student History",
            subtitle: "Student History",
            icon: FileText,
            bgColor: "bg-emerald-100",
            iconColor: "text-emerald-600",
            href: "#"
        },
        {
            title: "PTM Reports",
            subtitle: "Student Ptm",
            icon: Monitor,
            bgColor: "bg-sky-100",
            iconColor: "text-sky-600",
            href: "#"
        },
        {
            title: "Siblings Report",
            subtitle: "Siblings Report",
            icon: BarChart,
            bgColor: "bg-amber-100",
            iconColor: "text-amber-600",
            href: "#"
        },
        {
            title: "Student Login Credential",
            subtitle: "Student Login Credential",
            icon: Lock,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
            href: "#"
        },
        {
            title: "Custom Field Report",
            subtitle: "Custom Field Report",
            icon: FilePen,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
            href: "#"
        },
        {
            title: "Student Strength Report",
            subtitle: "Student Strength Report",
            icon: BarChart,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            href: "#"
        },
        {
            title: "House Wise Strength Report",
            subtitle: "House Wise Strength Report",
            icon: Home,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
            href: "#"
        },
        {
            title: "Admission - Inactive Counter",
            subtitle: "Admission - Inactive Counter",
            icon: PieChart,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
            href: "#"
        },
        {
            title: "TC Report",
            subtitle: "TC Report",
            icon: FileMinus,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
            href: "#"
        },
    ]

    return (
        <DashboardLayout title="Student Report">
            <div className="flex justify-end mb-4">
                <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <span className="text-[#1e1e50] font-semibold flex items-center gap-1"><span className="text-lg">📊</span> Students</span>
                        <span className="mx-1">/</span>
                        <span>Student Report</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => (
                    <ReportCard key={index} {...report} />
                ))}
            </div>
        </DashboardLayout>
    )
}
