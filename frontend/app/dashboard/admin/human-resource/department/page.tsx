"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Users, Home } from "lucide-react"

const DEPARTMENT_DATA = [
    { id: "1", department: "ASET" },
    { id: "2", department: "A I S" },
    { id: "3", department: "teaching" },
    { id: "4", department: "canteen" },
    { id: "5", department: "inventory" },
    { id: "6", department: "hostel" },
    { id: "7", department: "tested" },
    { id: "8", department: "technical deparatment" },
    { id: "9", department: "SEN" },
    { id: "10", department: "High School" },
]

export default function DepartmentPage() {
    const columns = [
        {
            key: "id",
            label: "ID",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "department",
            label: "DEPARTMENT",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        }
    ]

    return (
        <DashboardLayout title="Department">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Home className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Department</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Add Department Form */}
                    <div className="md:col-span-1">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <Edit2 className="h-4 w-4" /> Add / Edit Department
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Department <span className="text-red-500">*</span></Label>
                                    <Input placeholder="Enter department name" />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Department List */}
                    <div className="md:col-span-2">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs">☰</span>
                                    </div>
                                    Department List
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AdvancedTable
                                    columns={columns}
                                    data={DEPARTMENT_DATA}
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
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    )
}
