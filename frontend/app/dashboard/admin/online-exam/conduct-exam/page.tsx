"use client"

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
import { PlayCircle } from "lucide-react"

const sessions = [
    { id: 1, exam: "Mid Term", class: "1-A", status: "Scheduled", start: "12 Jun 09:00", end: "12 Jun 11:00" },
    { id: 2, exam: "Science Quiz", class: "2-B", status: "Live", start: "13 Jun 10:00", end: "13 Jun 10:45" },
]

export default function ConductExam() {
    return (
        <DashboardLayout title="Conduct Exam">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <PlayCircle className="h-5 w-5" />
                            Session Controls
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Exam</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select exam" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mid Term">Mid Term</SelectItem>
                                        <SelectItem value="Science Quiz">Science Quiz</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Action</Label>
                                <Select defaultValue="start">
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="start">Start</SelectItem>
                                        <SelectItem value="pause">Pause</SelectItem>
                                        <SelectItem value="end">End</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Apply</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Exam Sessions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Start</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">End</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sessions.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell>{s.exam}</TableCell>
                                            <TableCell>{s.class}</TableCell>
                                            <TableCell>{s.status}</TableCell>
                                            <TableCell>{s.start}</TableCell>
                                            <TableCell>{s.end}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

