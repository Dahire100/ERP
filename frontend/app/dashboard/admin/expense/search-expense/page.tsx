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
<<<<<<< HEAD
import { Search } from "lucide-react"

export default function ExpenseSearch() {
    return (
        <DashboardLayout title="Expense Search">
=======
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

const rows = [
    { id: 1, voucher: "V-2190", head: "Transport", payee: "Fuel Station", amount: 9200, date: "01-06-2025" },
    { id: 2, voucher: "V-2191", head: "Maintenance", payee: "AC Repairs", amount: 4200, date: "02-06-2025" },
]

export default function SearchExpense() {
    return (
        <DashboardLayout title="Search Expense">
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
<<<<<<< HEAD
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Expense Head</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Payment Mode</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date Form</Label>
                                    <Input defaultValue="12-12-2025" className="bg-white border-gray-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date To</Label>
                                    <Input defaultValue="12-12-2025" className="bg-white border-gray-200" />
                                    <div className="flex justify-end pt-1">
                                        <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                            <Search className="h-3 w-3 mr-2" /> Search
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-start-4 space-y-2">
                                    <Label>Search</Label>
                                    <Input placeholder="Search by Expense" className="bg-white border-gray-200" />
                                    <div className="flex justify-end pt-1">
                                        <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                            <Search className="h-3 w-3 mr-2" /> Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
=======
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
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
<<<<<<< HEAD
=======

>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
