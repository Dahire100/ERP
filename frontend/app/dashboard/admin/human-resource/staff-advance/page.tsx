"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Users, Calendar } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const STAFF_ADVANCE_DATA = [
    {
        id: "1",
        staff: "varsha",
        date: "30-11-2025",
        amount: "2000",
        settlementMonth: "2025-11",
        note: "test",
    },
    {
        id: "2",
        staff: "varsha",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-12",
        note: "",
    },
    {
        id: "3",
        staff: "varsha",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-12",
        note: "",
    },
    {
        id: "4",
        staff: "varsha",
        date: "26-09-2025",
        amount: "5000",
        settlementMonth: "2025-12",
        note: "",
    },
    {
        id: "5",
        staff: "varsha",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-11",
        note: "",
    },
    {
        id: "6",
        staff: "varsha",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-10",
        note: "",
    },
    {
        id: "7",
        staff: "AKSHAY CHAUHAN",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-07",
        note: "test",
    },
    {
        id: "8",
        staff: "AKSHAY CHAUHAN",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-11",
        note: "test",
    },
    {
        id: "9",
        staff: "AKSHAY CHAUHAN",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-04",
        note: "test",
    },
    {
        id: "10",
        staff: "AKSHAY CHAUHAN",
        date: "26-09-2025",
        amount: "4000",
        settlementMonth: "2025-02",
        note: "test",
    },
]

export default function StaffAdvancePage() {
    const [date, setDate] = useState<Date | undefined>(new Date("2025-12-15"))

    const columns = [
        {
            key: "id",
            label: "SR.NO",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "staff",
            label: "STAFF",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "date",
            label: "DATE",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "amount",
            label: "AMOUNT",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "settlementMonth",
            label: "SETTLEMENT MONTH",
            sortable: true,
            render: (value: string) => <span className="text-gray-700">{value}</span>
        },
        {
            key: "note",
            label: "NOTE",
            render: (value: string) => <span className="text-gray-700">{value}</span>
        }
    ]

    return (
        <DashboardLayout title="Staff Advance">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Staff Advance</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Add Staff Advance Form */}
                    <div className="md:col-span-1">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <Edit2 className="h-4 w-4" /> Add Staff Advance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Staff <span className="text-red-500">*</span></Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Staff" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="varsha">varsha</SelectItem>
                                            <SelectItem value="akshay">AKSHAY CHAUHAN</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Account Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="savings">Savings</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Account Name</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main">Main Account</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Date <span className="text-red-500">*</span></Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <CalendarComponent
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Amount <span className="text-red-500">*</span></Label>
                                    <Input placeholder="Enter Amount" />
                                </div>
                                <div className="flex justify-end">
                                    <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65] text-xs">
                                        Settle into Installments
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Settlement Month</Label>
                                    <div className="relative">
                                        <Input placeholder="-------- ------" />
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700">Note</Label>
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

                    {/* Staff Advance List */}
                    <div className="md:col-span-2">
                        <Card className="border-t-4 border-t-pink-500 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30 border-b">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs">☰</span>
                                    </div>
                                    Staff Advance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AdvancedTable
                                    columns={columns}
                                    data={STAFF_ADVANCE_DATA}
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
