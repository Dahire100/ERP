"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    FileText,
    Search,
    Scale,
    CreditCard,
    BarChart,
    Percent,
    Users,
    List,
    Globe,
    ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function FeesReports() {
    const reports = [
        {
            title: "FEES STATEMENT",
            description: "Fees Statement",
            icon: <FileText className="h-8 w-8 text-orange-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/fees-statement",
            color: "bg-white border-gray-200"
        },
        {
            title: "DAILY COLLECTION",
            description: "Day wise receipts",
            icon: <BarChart className="h-8 w-8 text-emerald-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/daily",
            color: "bg-white border-gray-200"
        },
        {
            title: "MONTHLY COLLECTION",
            description: "Month wise summary",
            icon: <BarChart className="h-8 w-8 text-blue-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/monthly",
            color: "bg-white border-gray-200"
        },
        {
            title: "CLASS-WISE REPORT",
            description: "Class and section totals",
            icon: <Users className="h-8 w-8 text-purple-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/class-wise",
            color: "bg-white border-gray-200"
        },
        {
            title: "SEARCH DUE FEES",
            description: "Search Due Fees",
            icon: <Search className="h-8 w-8 text-teal-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/search-due-fees",
            color: "bg-white border-gray-200"
        },
        {
            title: "FEE GROUP ASSIGNED REPORT",
            description: "Fee Group Assigned Report",
            icon: <Users className="h-8 w-8 text-blue-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/fee-group-assigned-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "BALANCE FEES REPORT",
            description: "Balance Fees Report",
            icon: <Scale className="h-8 w-8 text-cyan-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/balance-fees-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "CURRENT BALANCE REPORT",
            description: "Current Balance Report",
            icon: <BarChart className="h-8 w-8 text-indigo-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/current-balance-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "OUTSTANDING",
            description: "Outstanding",
            icon: <BarChart className="h-8 w-8 text-yellow-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/outstanding",
            color: "bg-white border-gray-200"
        },
        {
            title: "DCR",
            description: "DCR",
            icon: <BarChart className="h-8 w-8 text-blue-400" />,
            href: "/dashboard/admin/fees-collection/fees-reports/dcr",
            color: "bg-white border-gray-200"
        },
        {
            title: "DISCOUNT REPORT",
            description: "Discount Report",
            icon: <Percent className="h-8 w-8 text-red-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/discount-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "FEE TYPE ASSIGNED REPORT",
            description: "Fee Type Assigned Report",
            icon: <List className="h-8 w-8 text-green-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/fee-type-assigned-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "PAID FEES REPORT",
            description: "Student Wise",
            icon: <CreditCard className="h-8 w-8 text-cyan-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/paid-fees-report-student",
            color: "bg-white border-gray-200"
        },
        {
            title: "PAID FEES REPORT",
            description: "Date Wise",
            icon: <CreditCard className="h-8 w-8 text-cyan-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/paid-fees-report-date",
            color: "bg-white border-gray-200"
        },
        {
            title: "ONLINE TRANSACTION",
            description: "Online Transaction List",
            icon: <Globe className="h-8 w-8 text-orange-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/online-transaction",
            color: "bg-white border-gray-200"
        },
        {
            title: "ASSIGNED PAID FEES REPORT",
            description: "Assigned Paid Fees Report",
            icon: <FileText className="h-8 w-8 text-green-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/assigned-paid-fees-report",
            color: "bg-white border-gray-200"
        },
        {
            title: "MODE WISE REPORT",
            description: "Mode Wise Report",
            icon: <FileText className="h-8 w-8 text-blue-500" />,
            href: "/dashboard/admin/fees-collection/fees-reports/mode-wise-report",
            color: "bg-white border-gray-200"
        }
    ]

    return (
        <DashboardLayout title="Fees Reports">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report, index) => (
                        <Link key={index} href={report.href}>
                            <Card className={`h-full transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border ${report.color}`}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-50 rounded-xl shadow-sm">
                                                {report.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-sm font-bold text-blue-900 mb-1">
                                                    {report.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-gray-600">
                                                    {report.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
