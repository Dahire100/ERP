"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap } from "lucide-react"

const rows = [
    { className: "1-A", strength: 32, paid: 54000, pending: 12000 },
    { className: "2-B", strength: 30, paid: 48500, pending: 15500 },
]

export default function ClassWiseReport() {
    return (
        <DashboardLayout title="Class-wise Fee Report">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <GraduationCap className="h-5 w-5" />
                            Select Class / Section
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
                        <Select>
                            <SelectTrigger className="bg-white border-gray-200 md:w-48">
                                <SelectValue placeholder="Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Class 1</SelectItem>
                                <SelectItem value="2">Class 2</SelectItem>
                                <SelectItem value="3">Class 3</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="bg-white border-gray-200 md:w-48">
                                <SelectValue placeholder="Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-900 hover:bg-blue-800">Generate</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Collection by Class</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Students</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Paid</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Pending</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.className}>
                                            <TableCell>{row.className}</TableCell>
                                            <TableCell className="text-right">{row.strength}</TableCell>
                                            <TableCell className="text-right text-green-700">{row.paid.toFixed(2)}</TableCell>
                                            <TableCell className="text-right text-red-600">{row.pending.toFixed(2)}</TableCell>
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

