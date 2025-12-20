"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Users, Briefcase } from "lucide-react"

const DESIGNATION_DATA = [
    { id: "18", designation: "Vice Principal" },
    { id: "17", designation: "Principal" },
    { id: "16", designation: "Senior" },
    { id: "15", designation: "Physical Teacher" },
    { id: "14", designation: "Sale" },
    { id: "13", designation: "Marketing" },
    { id: "12", designation: "Finance" },
    { id: "11", designation: "manager" },
    { id: "10", designation: "Hiring Manager" },
    { id: "9", designation: "computer teacher" },
]

export default function DesignationPage() {
    const columns = [
        {
            key: "id",
            label: "ID",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 font-normal">{value}</span>
        },
        {
            key: "designation",
            label: "DESIGNATION",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        }
    ]

    return (
        <DashboardLayout title="Designation">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Designation</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Add Designation Form */}
                    <div className="md:col-span-1">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <Edit2 className="h-4 w-4" /> Add / Edit Designation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Designation <span className="text-red-500">*</span></Label>
                                    <Input placeholder="Enter Designation" />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Designation List */}
                    <div className="md:col-span-2">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs">☰</span>
                                    </div>
                                    Designation List
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AdvancedTable
                                    columns={columns}
                                    data={DESIGNATION_DATA}
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
