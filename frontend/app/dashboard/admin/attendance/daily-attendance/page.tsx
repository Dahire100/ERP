"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarCheck } from "lucide-react"

const sample = [
    { id: 1, name: "Ansh Sharma", roll: 1, status: "P" },
    { id: 2, name: "Vanya Patel", roll: 2, status: "A" },
    { id: 3, name: "Karan Aswani", roll: 3, status: "P" },
]

export default function DailyAttendance() {
    const [date] = useState("12-06-2025")

    return (
        <DashboardLayout title="Daily Attendance">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <CalendarCheck className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-red-500">Class *</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Section *</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Date *</Label>
                                <div className="h-10 px-3 border border-gray-200 rounded-md flex items-center bg-white text-sm text-gray-700">
                                    {date}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-blue-900 hover:bg-blue-800">Load Students</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Mark Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Roll</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-center">Present</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-center">Absent</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sample.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell>{s.roll}</TableCell>
                                            <TableCell>{s.name}</TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox checked={s.status === "P"} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox checked={s.status === "A"} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-blue-900 hover:bg-blue-800">Save Attendance</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

