"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Download, DollarSign, Calendar, TrendingUp, Filter } from "lucide-react"

export default function PayrollPage() {
    const payrolls = [
        { id: "P-OCT-2023", month: "October 2023", basic: "$3,000", earnings: "$3,500", deductions: "$200", net: "$3,300", status: "Paid", payDate: "2023-11-01" },
        { id: "P-SEP-2023", month: "September 2023", basic: "$3,000", earnings: "$3,450", deductions: "$200", net: "$3,250", status: "Paid", payDate: "2023-10-01" },
        { id: "P-AUG-2023", month: "August 2023", basic: "$3,000", earnings: "$3,400", deductions: "$200", net: "$3,200", status: "Paid", payDate: "2023-09-01" },
        { id: "P-JUL-2023", month: "July 2023", basic: "$3,000", earnings: "$3,400", deductions: "$200", net: "$3,200", status: "Paid", payDate: "2023-08-01" },
    ]

    const stats = [
        { label: "Gross Salary (YTD)", value: "$45,000", icon: DollarSign, color: "text-blue-600 bg-blue-100" },
        { label: "Net Pay (Last Month)", value: "$3,300", icon: TrendingUp, color: "text-green-600 bg-green-100" },
        { label: "Tax Deducted (YTD)", value: "$2,400", icon: Filter, color: "text-orange-600 bg-orange-100" },
    ]

    return (
        <DashboardLayout title="My Payroll">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Payroll</h1>
                        <p className="text-gray-500 mt-1">View and download your monthly salary slips.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter Year
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Generate Report
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="border-none shadow-md">
                                <CardContent className="p-6 flex items-center space-x-4">
                                    <div className={`p-4 rounded-full ${stat.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Payroll List */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Payslips</CardTitle>
                        <CardDescription>History of all generated payslips.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead>Payslip ID</TableHead>
                                    <TableHead>Month & Year</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead>Earnings</TableHead>
                                    <TableHead>Deductions</TableHead>
                                    <TableHead>Net Salary</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payrolls.map((payroll) => (
                                    <TableRow key={payroll.id}>
                                        <TableCell className="font-mono text-xs">{payroll.id}</TableCell>
                                        <TableCell className="font-medium text-indigo-700">{payroll.month}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {payroll.payDate}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-green-600 font-medium">{payroll.earnings}</TableCell>
                                        <TableCell className="text-red-500">{payroll.deductions}</TableCell>
                                        <TableCell className="font-bold text-gray-900">{payroll.net}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                {payroll.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="hover:text-indigo-600">
                                                <Download className="w-4 h-4 mr-2" />
                                                PDF
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
