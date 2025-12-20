"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

const LEAVE_DATA = [
    {
        id: "1",
        staff: "AKSHAY CHAUHAN",
        leaveType: "Unpaid",
        leaveDate: "01-09-2025 - 03-09-2025",
        days: "3",
        applyDate: "11-09-2025",
        status: "Pending",
    },
    {
        id: "2",
        staff: "Kate K",
        leaveType: "Unpaid",
        leaveDate: "06-10-2025 - 06-10-2025",
        days: "1",
        applyDate: "19-10-2025",
        status: "Approved by Super Admin on 19-10-2025 06:51 PM",
    },
    {
        id: "3",
        staff: "Kate K",
        leaveType: "Sick Leave",
        leaveDate: "15-10-2025 - 15-10-2025",
        days: "1",
        applyDate: "19-10-2025",
        status: "Approved by Super Admin on 19-10-2025 06:51 PM",
    },
    {
        id: "4",
        staff: "Nlet Initiatives LLP Support",
        leaveType: "Unpaid",
        leaveDate: "09-10-2025 - 09-10-2025",
        days: "1",
        applyDate: "06-10-2025",
        status: "Approved by Demo User on 11-09-2025 05:01 PM",
    },
    {
        id: "5",
        staff: "Nlet Initiatives LLP Support",
        leaveType: "Unpaid",
        leaveDate: "11-10-2025 - 12-10-2025",
        days: "2",
        applyDate: "06-10-2025",
        status: "Approved by Super Admin on 11-09-2025 04:59 PM",
    },
    {
        id: "6",
        staff: "Nlet Initiatives LLP Support",
        leaveType: "Unpaid",
        leaveDate: "03-10-2025 - 03-10-2025",
        days: "1",
        applyDate: "11-09-2025",
        status: "Pending",
    },
    {
        id: "7",
        staff: "Nlet Initiatives LLP Support",
        leaveType: "Unpaid",
        leaveDate: "01-10-2025 - 02-10-2025",
        days: "2",
        applyDate: "11-09-2025",
        status: "Pending",
    },
    {
        id: "8",
        staff: "Nlet Initiatives LLP Support",
        leaveType: "Unpaid",
        leaveDate: "01-09-2025 - 30-09-2025",
        days: "30",
        applyDate: "11-09-2025",
        status: "Pending",
    },
    {
        id: "9",
        staff: "Robert Vaidya",
        leaveType: "SICK LEAVE!!!!",
        leaveDate: "28-10-2025 - 28-10-2025",
        days: "1",
        applyDate: "27-10-2025",
        status: "Approved by Super Admin on 27-10-2025 10:45 AM",
    },
]

export default function ApplyLeavePage() {
    const columns = [
        {
            key: "staff",
            label: "STAFF",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600">{value}</span>
        },
        {
            key: "leaveType",
            label: "LEAVE TYPE",
        },
        {
            key: "leaveDate",
            label: "LEAVE DATE",
            render: (value: string) => <span className="text-blue-600 font-medium text-xs whitespace-nowrap">{value}</span>
        },
        {
            key: "days",
            label: "DAYS",
        },
        {
            key: "applyDate",
            label: "APPLY DATE",
        },
        {
            key: "status",
            label: "STATUS",
            render: (value: string) => <span className={`text-sm ${value === "Pending" ? "text-gray-700" : "text-gray-600"}`}>{value}</span>
        }
    ]

    return (
        <DashboardLayout title="Apply Leave">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Apply Leave</span>
                </div>

                {/* Apply Leave List */}
                <div className="border-t-4 border-t-pink-500 rounded-lg bg-white shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs">☰</span>
                            </div>
                            Apply Leave List
                        </h3>
                        <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                            <Plus className="h-4 w-4 mr-1" /> Add Leave
                        </Button>
                    </div>

                    <div className="p-2">
                        <AdvancedTable
                            columns={columns}
                            data={LEAVE_DATA}
                            searchable={true}
                            searchPlaceholder="Search..."
                            headerClassName="bg-pink-50 text-pink-900 font-semibold uppercase text-xs"
                            actions={[
                                {
                                    label: "Action",
                                    onClick: () => { },
                                    icon: null
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
