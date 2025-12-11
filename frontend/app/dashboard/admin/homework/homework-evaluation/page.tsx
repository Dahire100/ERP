"use client"

import { useState } from "react"
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
import { ClipboardCheck } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, student: "Ansh Sharma", classSection: "7-B", title: "Chapter 5 worksheet", status: "Submitted", remarks: "" },
    { id: 2, student: "Vanya Patel", classSection: "6-A", title: "Essay on Environment", status: "Pending", remarks: "" },
]

export default function HomeworkEvaluation() {
    const [rows, setRows] = useState(sample)
    const [selectedRemark, setSelectedRemark] = useState("")

    const handleRemark = (id: number) => {
        if (!selectedRemark) {
            toast.error("Add a remark before saving")
            return
        }
        setRows(rows.map(r => r.id === id ? { ...r, remarks: selectedRemark } : r))
        toast.success("Remark saved")
        setSelectedRemark("")
    }

    return (
        <DashboardLayout title="Homework Evaluation">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ClipboardCheck className="h-5 w-5" />
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
                                <Label>Status</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="submitted">Submitted</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Evaluate</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Homework</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Remarks</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.student}</TableCell>
                                            <TableCell>{row.classSection}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>{row.remarks || "-"}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Input
                                                    placeholder="Add remark"
                                                    className="inline-block w-40 bg-white border-gray-200 mr-2"
                                                    value={selectedRemark}
                                                    onChange={(e) => setSelectedRemark(e.target.value)}
                                                />
                                                <Button size="sm" className="bg-blue-900 hover:bg-blue-800" onClick={() => handleRemark(row.id)}>
                                                    Save
                                                </Button>
                                            </TableCell>
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

