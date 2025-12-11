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
import { Search } from "lucide-react"

const rows = [
    { id: 1, voucher: "V-2190", head: "Transport", payee: "Fuel Station", amount: 9200, date: "01-06-2025" },
    { id: 2, voucher: "V-2191", head: "Maintenance", payee: "AC Repairs", amount: 4200, date: "02-06-2025" },
]

export default function SearchExpense() {
    return (
        <DashboardLayout title="Search Expense">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Voucher No.</Label>
                                <Input placeholder="Enter voucher" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Expense Head</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="transport">Transport</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Date From</Label>
                                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date To</Label>
                                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Results</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Voucher</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Head</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Payee</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.voucher}</TableCell>
                                            <TableCell>{row.head}</TableCell>
                                            <TableCell>{row.payee}</TableCell>
                                            <TableCell className="text-right">{row.amount.toFixed(2)}</TableCell>
                                            <TableCell>{row.date}</TableCell>
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

