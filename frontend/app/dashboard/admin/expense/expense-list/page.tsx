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
import { ClipboardList } from "lucide-react"

const sample = [
    { id: 1, head: "Salary", vendor: "Staff Payroll", date: "05-06-2025", amount: 155000, voucher: "V-2201" },
    { id: 2, head: "Utilities", vendor: "Electricity Board", date: "03-06-2025", amount: 18500, voucher: "V-2199" },
]

export default function ExpenseList() {
    const [search, setSearch] = useState("")

    return (
        <DashboardLayout title="Expense List">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ClipboardList className="h-5 w-5" />
                            Filter Expense
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Expense Head</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="salary">Salary</SelectItem>
                                        <SelectItem value="utilities">Utilities</SelectItem>
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
                            <div className="space-y-2">
                                <Label>Search</Label>
                                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Voucher / Vendor" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Expense Entries</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Voucher</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Head</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Payee</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sample
                                        .filter((row) => row.vendor.toLowerCase().includes(search.toLowerCase()) || row.voucher.toLowerCase().includes(search.toLowerCase()))
                                        .map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.voucher}</TableCell>
                                                <TableCell>{row.head}</TableCell>
                                                <TableCell>{row.vendor}</TableCell>
                                                <TableCell>{row.date}</TableCell>
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

