"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Briefcase } from "lucide-react"
import { useState } from "react"

const TASK_DATA = [
    {
        id: "1",
        taskFor: "Demo User",
        cycle: "2024-25",
        task: "0",
        rating: "0",
    },
]

export default function TaskPage() {
    const columns = [
        {
            key: "taskFor",
            label: "TASK FOR",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "cycle",
            label: "CYCLE",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "task",
            label: "TASK",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "rating",
            label: "RATING",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        }
    ]

    const [startDate, setStartDate] = useState("2025-12-15")
    const [dueDate, setDueDate] = useState("2025-12-15")

    return (
        <DashboardLayout title="Task">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Task</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Add Task Form */}
                    <div className="md:col-span-1">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <Edit2 className="h-4 w-4" /> Add / Edit Task
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Title <span className="text-red-500">*</span></Label>
                                    <Input />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Task For <span className="text-red-500">*</span></Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="demo">Demo User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Status <span className="text-red-500">*</span></Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Select --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Start Date <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Due Date <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Authorized Person</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- select --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Remark</Label>
                                    <Input />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Summary</Label>
                                    <Textarea className="min-h-[80px]" />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Task List */}
                    <div className="md:col-span-2">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs">☰</span>
                                    </div>
                                    Task List
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AdvancedTable
                                    columns={columns}
                                    data={TASK_DATA}
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
