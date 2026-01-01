"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck } from "lucide-react"
import { useState } from "react"

export default function StaffAttendancePage() {
    const [role, setRole] = useState("")
    const [department, setDepartment] = useState("")
    const [attendanceType, setAttendanceType] = useState("")
    const [date, setDate] = useState("2025-12-15")

    return (
        <DashboardLayout title="Staff Attendance">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><UserCheck className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Staff Attendance</span>
                </div>

                {/* Select Criteria Card */}
                <Card className="border-t-4 border-t-pink-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="driver">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Select value={department} onValueChange={setDepartment}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="academic">Academic</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Attendance Type</Label>
                                <Select value={attendanceType} onValueChange={setAttendanceType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="present">Present</SelectItem>
                                        <SelectItem value="absent">Absent</SelectItem>
                                        <SelectItem value="late">Late</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </DashboardLayout>
    )
}
