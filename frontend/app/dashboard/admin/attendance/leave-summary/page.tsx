"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList } from "lucide-react"

const rows = [
    { student: "Ansh Sharma", casual: 2, sick: 1, total: 3 },
    { student: "Vanya Patel", casual: 1, sick: 0, total: 1 },
]

export default function LeaveSummary() {
    return (
        <DashboardLayout title="Leave Summary">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ClipboardList className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Input placeholder="All" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Input placeholder="All" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Search Student</Label>
                                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Generate</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Leave Totals</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Casual</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Sick</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.student}>
                                            <TableCell>{row.student}</TableCell>
                                            <TableCell className="text-right">{row.casual}</TableCell>
                                            <TableCell className="text-right">{row.sick}</TableCell>
                                            <TableCell className="text-right font-semibold">{row.total}</TableCell>
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

