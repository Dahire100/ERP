"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History } from "lucide-react"

const rows = [
    { id: 1, subject: "Maths", classSection: "6-A", date: "10-06-2025", duration: "55m", recording: "Available" },
    { id: 2, subject: "Science", classSection: "7-B", date: "09-06-2025", duration: "50m", recording: "N/A" },
]

export default function PastClassLogs() {
    return (
        <DashboardLayout title="Past Class Logs">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <History className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">Class 6</SelectItem>
                                        <SelectItem value="7">Class 7</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Input placeholder="All" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input placeholder="All subjects" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date Range</Label>
                                <Input placeholder="DD-MM-YYYY to DD-MM-YYYY" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" className="border-gray-300">Export</Button>
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Class History</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Duration</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Recording</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.subject}</TableCell>
                                            <TableCell>{row.classSection}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell className="text-right">{row.duration}</TableCell>
                                            <TableCell>{row.recording}</TableCell>
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

