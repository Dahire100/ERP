"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users } from "lucide-react"
import { useState } from "react"

const LEAVE_BALANCE_DATA = [
    {
        id: "001",
        name: "Chaitnya Jain",
        role: "Principal",
        casual: "12.0",
        medical: "1.0",
        fgfgfg: "0.0",
        paid: "0.0",
        emergency: "0.0",
        sick: "0.0",
        cl: "0.0",
        sickExclam: "10.0",
        halfDay: "12.0",
        el: "15.0"
    },
    {
        id: "0008",
        name: "Hnin Wai Phyo Aung",
        role: "Admin",
        casual: "6.0",
        medical: "-",
        fgfgfg: "-",
        paid: "-",
        emergency: "-",
        sick: "-",
        cl: "-",
        sickExclam: "-",
        halfDay: "-",
        el: "-"
    },
    {
        id: "09",
        name: "ABDI KALLA",
        role: "Admin",
        casual: "-",
        medical: "-",
        fgfgfg: "-",
        paid: "-",
        emergency: "-",
        sick: "-",
        cl: "-",
        sickExclam: "-",
        halfDay: "-",
        el: "-"
    },
    {
        id: "009",
        name: "Kate K",
        role: "Teacher",
        casual: "12.0",
        medical: "6.0",
        fgfgfg: "0.0",
        paid: "2.0",
        emergency: "2.0",
        sick: "5.0",
        cl: "0.0",
        sickExclam: "0.0",
        halfDay: "0.0",
        el: "0.0"
    },
    {
        id: "20",
        name: "Aatam Jain",
        role: "Teacher, House Master",
        casual: "0.0",
        medical: "0.0",
        fgfgfg: "0.0",
        paid: "0.0",
        emergency: "0.0",
        sick: "1.0",
        cl: "3.0",
        sickExclam: "0.0",
        halfDay: "0.0",
        el: "-"
    },
]


// Helper to render the cell with value and Add button
const LeaveCell = ({ value }: { value: string }) => {
    if (value === "-" || value === undefined) return <div className="h-full bg-gray-50/50 rounded-md min-h-[60px]"></div>

    return (
        <div className="flex flex-col gap-1">
            <div className="bg-blue-50/50 p-1.5 text-center text-sm font-medium text-gray-700 rounded">
                {value}
            </div>
            <Button size="sm" className="w-full h-7 bg-[#0b1c48] hover:bg-[#1a2d65] text-[10px] uppercase font-bold">
                Add
            </Button>
        </div>
    )
}

export default function LeaveBalancePage() {
    const [role, setRole] = useState("")

    const columns = [
        {
            key: "id",
            label: "STAFF ID",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600 text-xs">{value}</span>
        },
        {
            key: "name",
            label: "NAME",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 font-medium text-xs max-w-[100px] block">{value}</span>
        },
        {
            key: "role",
            label: "ROLE",
            sortable: true,
            render: (value: string) => <span className="text-gray-600 text-xs">{value}</span>
        },
        {
            key: "casual",
            label: "CASUAL LEAVE",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "medical",
            label: "MEDICAL LEAVE",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "fgfgfg",
            label: "FGFGFG",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "paid",
            label: "PAID LEAVE",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "emergency",
            label: "EMERGENCY LEAVE",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "sick",
            label: "SICK LEAVE",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "cl",
            label: "CL",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "sickExclam",
            label: "SICK LEAVE!!!!!",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "halfDay",
            label: "HALF DAY",
            render: (value: string) => <LeaveCell value={value} />
        },
        {
            key: "el",
            label: "EL",
            render: (value: string) => <LeaveCell value={value} />
        },
    ]

    return (
        <DashboardLayout title="Leave Balance">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Leave Balance</span>
                </div>

                {/* Select Criteria Card */}
                <Card className="border-t-4 border-t-pink-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="principal">Principal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                <Search className="h-4 w-4 mr-2" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Staff Directory List */}

                <div className="border-t-4 border-t-pink-500 rounded-lg bg-white shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs">☰</span>
                            </div>
                            Staff Directory List
                        </h3>
                    </div>

                    <div className="p-0">
                        <AdvancedTable
                            columns={columns}
                            data={LEAVE_BALANCE_DATA}
                            searchable={true}
                            searchPlaceholder="Search..."
                            headerClassName="bg-pink-50 text-pink-900 font-semibold uppercase text-xs"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
