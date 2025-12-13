"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlaneLanding } from "lucide-react"

const rows = [
    { id: 1, student: "Ansh Sharma", type: "Sick", from: "10-06-2025", to: "12-06-2025", status: "Pending" },
    { id: 2, student: "Vanya Patel", type: "Casual", from: "11-06-2025", to: "11-06-2025", status: "Pending" },
]

export default function LeaveApprove() {
    return (
        <DashboardLayout title="Leave Approve">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <PlaneLanding className="h-5 w-5" />
                            Pending Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Search Student</Label>
                                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Input value="Pending" readOnly className="bg-white border-gray-200" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">From</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">To</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.student}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.from}</TableCell>
                                            <TableCell>{row.to}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                                                <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">Reject</Button>
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

