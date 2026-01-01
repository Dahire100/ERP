"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Download, FileText, Settings, Trash2 } from "lucide-react"

const activities = [
    { id: 1, action: "Created", causer: "Super Admin", date: "15-12-2025", update: "Receipt No : 190\nAmount : 49040" },
    { id: 2, action: "Created", causer: "Super Admin", date: "12-12-2025", update: "Receipt No : 189\nAmount : 2500" },
    { id: 3, action: "Created", causer: "Demo User", date: "09-12-2025", update: "Receipt No : 188\nAmount : 10000" },
    { id: 4, action: "Created", causer: "Super Admin", date: "09-12-2025", update: "Receipt No : 187\nAmount : 1700" },
    { id: 5, action: "Created", causer: "Super Admin", date: "08-12-2025", update: "Receipt No : 186\nAmount : 11325" },
]

const tabs = [
    "Fee Activities",
    "Student Activities",
    "Staff Activities",
    "User Log Activities",
    "User Log App",
    "Staff Log App",
    "Bulk Staff Attendance Log"
]

export default function ActivityLog() {
    const [activeTab, setActiveTab] = useState("Fee Activities")

    return (
        <DashboardLayout title="Activity Log">
            <div className="space-y-6">
                <div className="flex items-center justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="text-blue-900">System Settings</span>
                        <span>/</span>
                        <span>Activity Log</span>
                    </span>
                </div>

                <Card className="border-none shadow-none bg-transparent">
                    <div className="flex flex-wrap gap-2 border-b border-pink-100 bg-pink-50 p-2 rounded-t-lg items-center justify-between">
                        <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 md:pb-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-sm font-medium whitespace-nowrap pb-1 ${activeTab === tab
                                            ? "text-blue-900 border-b-2 border-blue-900"
                                            : "text-gray-600 hover:text-blue-900"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white h-8 text-xs">
                            Clear All Logs
                        </Button>
                    </div>

                    <CardContent className="bg-white pt-6 space-y-4 rounded-b-lg border shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 border-none h-8 text-xs">
                                    <FileText className="h-3 w-3 mr-1" /> Column visibility
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Show</span>
                                <Select defaultValue="10">
                                    <SelectTrigger className="w-[70px] h-8">
                                        <SelectValue placeholder="10" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder="Search..." className="h-8 w-40" />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-pink-50">
                                    <TableRow>
                                        <TableHead className="font-bold text-blue-900">ACTION</TableHead>
                                        <TableHead className="font-bold text-blue-900">CAUSER</TableHead>
                                        <TableHead className="font-bold text-blue-900">DATE</TableHead>
                                        <TableHead className="font-bold text-blue-900">UPDATE</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activities.map((activity) => (
                                        <TableRow key={activity.id}>
                                            <TableCell>{activity.action}</TableCell>
                                            <TableCell>{activity.causer}</TableCell>
                                            <TableCell>{activity.date}</TableCell>
                                            <TableCell className="whitespace-pre-line">{activity.update}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="text-sm text-gray-500">
                                Showing 1 to {activities.length} of {activities.length} entries
                            </div>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
