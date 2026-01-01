"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3 } from "lucide-react"

const rows = [
    { month: "April 2025", receipts: 620, amount: 780000 },
    { month: "May 2025", receipts: 645, amount: 812300 },
]

export default function MonthlyReport() {
    return (
        <DashboardLayout title="Monthly Collection Report">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <BarChart3 className="h-5 w-5" />
                            Select Session & Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
                        <Select>
                            <SelectTrigger className="bg-white border-gray-200 md:w-48">
                                <SelectValue placeholder="Session" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="24-25">2024-25</SelectItem>
                                <SelectItem value="25-26">2025-26</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="bg-white border-gray-200 md:w-48">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apr">April</SelectItem>
                                <SelectItem value="may">May</SelectItem>
                                <SelectItem value="jun">June</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-900 hover:bg-blue-800">Generate</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Monthly Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Month</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Receipts</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.month}>
                                            <TableCell>{row.month}</TableCell>
                                            <TableCell className="text-right">{row.receipts}</TableCell>
                                            <TableCell className="text-right">{row.amount.toFixed(2)}</TableCell>
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

