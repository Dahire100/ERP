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
import { Gauge } from "lucide-react"

const rows = [
    { id: 1, exam: "Mid Term", pending: 12, completed: 28 },
    { id: 2, exam: "Science Quiz", pending: 0, completed: 30 },
]

export default function AutoGrading() {
    return (
        <DashboardLayout title="Auto-Grading">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Gauge className="h-5 w-5" />
                            Run Auto-Grading
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-red-500">Exam *</Label>
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
                                <Label>Question Type</Label>
                                <Select defaultValue="objective">
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="objective">Objective</SelectItem>
                                        <SelectItem value="mixed">Mixed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Run</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Grading Status</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Pending</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Completed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.exam}</TableCell>
                                            <TableCell className="text-right text-orange-600">{row.pending}</TableCell>
                                            <TableCell className="text-right text-green-700">{row.completed}</TableCell>
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

