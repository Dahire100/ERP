"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Calendar as CalendarIcon, AlertCircle } from "lucide-react"

export default function StudentAttendance() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Mock attendance data
    const attendanceData = {
        present: [new Date(2024, 11, 2), new Date(2024, 11, 3), new Date(2024, 11, 4), new Date(2024, 11, 5), new Date(2024, 11, 6)],
        absent: [new Date(2024, 11, 9)],
        late: [new Date(2024, 11, 10)],
        holidays: [new Date(2024, 11, 25)]
    }

    const stats = [
        { label: "Total Days", value: "24", icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Present", value: "21", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
        { label: "Absent", value: "2", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
        { label: "Late", value: "1", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    ]

    // Function to style dates in the calendar
    const modifiers = {
        present: attendanceData.present,
        absent: attendanceData.absent,
        late: attendanceData.late,
        holiday: attendanceData.holidays
    }

    const modifiersStyles = {
        present: { color: 'white', backgroundColor: '#22c55e' }, // green-500
        absent: { color: 'white', backgroundColor: '#ef4444' }, // red-500
        late: { color: 'white', backgroundColor: '#f97316' }, // orange-500
        holiday: { color: 'white', backgroundColor: '#8b5cf6' } // violet-500
    }

    return (
        <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout title="Attendance">
                <div className="space-y-8 p-1">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                                    </div>
                                    <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-indigo-500" /> Attendance Calendar
                                </CardTitle>
                                <CardDescription>
                                    View your monthly attendance record
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center p-6">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border p-4 shadow-sm"
                                    modifiers={modifiers}
                                    modifiersStyles={modifiersStyles}
                                />
                            </CardContent>
                            <div className="flex justify-center gap-6 pb-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Present</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Absent</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Late</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-violet-500"></div> Holiday</div>
                            </div>
                        </Card>

                        <Card className="shadow-md h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-orange-500" /> Recent Remarks
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { date: "10 Dec 2024", type: "Late", remark: "Arrived 15 mins late due to traffic" },
                                    { date: "09 Dec 2024", type: "Absent", remark: "Medical Leave (Sick)" },
                                    { date: "25 Dec 2024", type: "Holiday", remark: "Christmas Holiday" },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-sm">{item.date}</span>
                                            <Badge variant={item.type === "Late" ? "secondary" : item.type === "Absent" ? "destructive" : "default"}>
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">{item.remark}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
