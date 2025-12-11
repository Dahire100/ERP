"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Banknote,
    Receipt,
    Globe,
    AlertCircle,
    ArrowRightCircle,
    Percent,
    Database,
    Users,
    List,
    PhoneCall,
    CreditCard,
    BarChart,
    ArrowRight,
    Home,
    Search
} from "lucide-react"
import Link from "next/link"

export default function FeesCollection() {
    const modules = [
        {
            title: "Fee Collection",
            description: "Collect and record payments",
            icon: <Banknote className="h-8 w-8 text-green-600" />,
            href: "/dashboard/admin/fees-collection/collect-fee",
            color: "bg-green-50 border-green-100"
        },
        {
            title: "Payment Receipt",
            description: "Generate and view payment receipts",
            icon: <Receipt className="h-8 w-8 text-blue-600" />,
            href: "/dashboard/admin/fees-collection/payment-receipt",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Online Admission Fee",
            description: "Manage online admission fee payments",
            icon: <Globe className="h-8 w-8 text-cyan-600" />,
            href: "/dashboard/admin/fees-collection/online-admission-fee",
            color: "bg-cyan-50 border-cyan-100"
        },
        {
            title: "Demand Notice",
            description: "Issue demand notices for pending fees",
            icon: <AlertCircle className="h-8 w-8 text-red-600" />,
            href: "/dashboard/admin/fees-collection/demand-notice",
            color: "bg-red-50 border-red-100"
        },
        {
            title: "Fees Carry Forward",
            description: "Carry forward fees to next session",
            icon: <ArrowRightCircle className="h-8 w-8 text-orange-600" />,
            href: "/dashboard/admin/fees-collection/fees-carry-forward",
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "Fee Discount",
            description: "Manage fee discounts and concessions",
            icon: <Percent className="h-8 w-8 text-purple-600" />,
            href: "/dashboard/admin/fees-collection/fee-discount",
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Fee Master",
            description: "Configure fee structures and amounts",
            icon: <Database className="h-8 w-8 text-indigo-600" />,
            href: "/dashboard/admin/fees-collection/fee-master",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            title: "Fee Installments",
            description: "Plan and manage installment schedules",
            icon: <ArrowRightCircle className="h-8 w-8 text-orange-600" />,
            href: "/dashboard/admin/fees-collection/fee-installments",
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "Fees Group",
            description: "Create and manage fee groups",
            icon: <Users className="h-8 w-8 text-teal-600" />,
            href: "/dashboard/admin/fees-collection/fees-group",
            color: "bg-teal-50 border-teal-100"
        },
        {
            title: "Fees Types",
            description: "Define different types of fees",
            icon: <List className="h-8 w-8 text-pink-600" />,
            href: "/dashboard/admin/fees-collection/fees-types",
            color: "bg-pink-50 border-pink-100"
        },
        {
            title: "Fee Follow Up",
            description: "Track fee payment follow-ups",
            icon: <PhoneCall className="h-8 w-8 text-yellow-600" />,
            href: "/dashboard/admin/fees-collection/fee-follow-up",
            color: "bg-yellow-50 border-yellow-100"
        },
        {
            title: "Student Wise Fees",
            description: "Review fee ledger per student",
            icon: <Users className="h-8 w-8 text-blue-600" />,
            href: "/dashboard/admin/fees-collection/student-wise-fees",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Transport Fees",
            description: "Assign and monitor transport dues",
            icon: <Globe className="h-8 w-8 text-cyan-600" />,
            href: "/dashboard/admin/fees-collection/transport-fees",
            color: "bg-cyan-50 border-cyan-100"
        },
        {
            title: "Hostel Fees",
            description: "Manage hostel fee schedules",
            icon: <Home className="h-8 w-8 text-purple-600" />,
            href: "/dashboard/admin/fees-collection/hostel-fees",
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Concessions / Waivers",
            description: "Approve waivers and concessions",
            icon: <Percent className="h-8 w-8 text-emerald-600" />,
            href: "/dashboard/admin/fees-collection/concessions-waivers",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            title: "Previous Year Balance",
            description: "Bring forward prior year balances",
            icon: <ArrowRight className="h-8 w-8 text-orange-700" />,
            href: "/dashboard/admin/fees-collection/previous-year-balance",
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "Cheques",
            description: "Manage cheque payments and status",
            icon: <CreditCard className="h-8 w-8 text-slate-600" />,
            href: "/dashboard/admin/fees-collection/cheques",
            color: "bg-slate-50 border-slate-100"
        },
        {
            title: "Cheque Bounce Management",
            description: "Record bounced cheques & penalties",
            icon: <AlertCircle className="h-8 w-8 text-red-600" />,
            href: "/dashboard/admin/fees-collection/cheque-bounce",
            color: "bg-red-50 border-red-100"
        },
        {
            title: "Due Fee Report",
            description: "Instant list of pending dues",
            icon: <Search className="h-8 w-8 text-indigo-600" />,
            href: "/dashboard/admin/fees-collection/due-fee-report",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            title: "Defaulters List",
            description: "Track chronic non-payers",
            icon: <AlertCircle className="h-8 w-8 text-amber-600" />,
            href: "/dashboard/admin/fees-collection/defaulters-list",
            color: "bg-amber-50 border-amber-100"
        },
        {
            title: "Fees Reports",
            description: "Daily, monthly, and class-wise analytics",
            icon: <BarChart className="h-8 w-8 text-emerald-600" />,
            href: "/dashboard/admin/fees-collection/fees-reports",
            color: "bg-emerald-50 border-emerald-100"
        }
    ]

    return (
        <DashboardLayout title="Fees Collection">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
