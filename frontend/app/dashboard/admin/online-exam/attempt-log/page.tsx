"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ListChecks } from "lucide-react"

const rows = [
    { id: 1, student: "Ansh Sharma", exam: "Mid Term", start: "09:02", end: "10:15", status: "Submitted" },
    { id: 2, student: "Vanya Patel", exam: "Science Quiz", start: "10:02", end: "10:40", status: "Submitted" },
    { id: 3, student: "Karan Aswani", exam: "Mid Term", start: "09:05", end: "-", status: "In Progress" },
]

export default function AttemptLog() {
    return (
        <DashboardLayout title="Attempt Log">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ListChecks className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Exam</Label>
                                <Input placeholder="All exams" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Student</Label>
                                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Input placeholder="All" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Attempts</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Start</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">End</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.student}</TableCell>
                                            <TableCell>{row.exam}</TableCell>
                                            <TableCell>{row.start}</TableCell>
                                            <TableCell>{row.end}</TableCell>
                                            <TableCell className="text-right">{row.status}</TableCell>
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

