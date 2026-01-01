"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

const rows = [
    { date: "12-06-2025", receipts: 34, amount: 45200 },
    { date: "11-06-2025", receipts: 28, amount: 38900 },
]

export default function DailyReport() {
    return (
        <DashboardLayout title="Daily Collection Report">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <CalendarDays className="h-5 w-5" />
                            Pick Date
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
                        <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200 md:w-64" />
                        <Button className="bg-blue-900 hover:bg-blue-800">Generate</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Daily Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Receipts</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.date}>
                                            <TableCell>{row.date}</TableCell>
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

