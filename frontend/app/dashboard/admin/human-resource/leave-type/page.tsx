"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Edit2, Tag } from "lucide-react"
import { useState } from "react"

const LEAVE_TYPES = [
    { id: "1", type: "maternity leave" },
    { id: "2", type: "Unpaid Leave" },
    { id: "3", type: "Emergencyleave" },
    { id: "4", type: "EL" },
    { id: "5", type: "Half Day" },
    { id: "6", type: "SICK LEAVE!!!!!" },
    { id: "7", type: "CL" },
    { id: "8", type: "Sick Leave" },
    { id: "9", type: "Emergency leave" },
    { id: "10", type: "Paid Leave" },
    { id: "11", type: "Medical Leave" },
    { id: "12", type: "FGFGFG" },
    { id: "13", type: "CASUAL LEAVE" },
]

export default function LeaveTypePage() {
    const [newLeaveType, setNewLeaveType] = useState("")

    const columns = [
        {
            key: "type",
            label: "LEAVE TYPE",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        }
    ]

    return (
        <DashboardLayout title="Leave Type">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Leave Type</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Add Leave Type Form */}
                    <div className="md:col-span-1">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <Edit2 className="h-4 w-4" /> Add Leave Type
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Leave Type <span className="text-red-500">*</span></Label>
                                    <Input
                                        placeholder="Enter leave type"
                                        value={newLeaveType}
                                        onChange={(e) => setNewLeaveType(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Leave Type List */}
                    <div className="md:col-span-2">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs">☰</span>
                                    </div>
                                    Leave Type List
                                </CardTitle>
                                <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                                    <Tag className="h-4 w-4 mr-1" /> Assign Leave
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AdvancedTable
                                    columns={columns}
                                    data={LEAVE_TYPES}
                                    searchable={true}
                                    searchPlaceholder=""
                                    headerClassName="bg-pink-50 text-pink-900 font-semibold uppercase text-xs"
                                    actions={[
                                        {
                                            label: "Action",
                                            onClick: () => { },
                                            icon: null
                                        }
                                    ]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    )
}
