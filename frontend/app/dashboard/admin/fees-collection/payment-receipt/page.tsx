"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search, Printer, FileText, Download, List } from "lucide-react"

export default function PaymentReceipt() {
    const [searchTerm, setSearchTerm] = useState("")

    const receipts = [
        {
            id: 1,
            receiptNo: "169",
            name: "rahul singh",
            admissionNo: "PNGWing/232367",
            duration: "January",
            collectedBy: "Super",
            status: "Paid",
            date: "24-11-2025",
            amount: "1700",
            discount: "0",
            additionDiscount: "0",
            lateFees: "0"
        },
        {
            id: 2,
            receiptNo: "168",
            name: "M JAYANTI",
            admissionNo: "OD07 251",
            duration: "December",
            collectedBy: "Super",
            status: "Paid",
            date: "24-11-2025",
            amount: "4500",
            discount: "0",
            additionDiscount: "0",
            lateFees: "0"
        }
    ]

    return (
        <DashboardLayout title="Payment Receipt">
            <div className="space-y-6">
                {/* Search Criteria */}
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="receiptNo">Receipt No</Label>
                                <Input
                                    id="receiptNo"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    placeholder="Enter Start Date"
                                    className="bg-gray-100 border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    placeholder="Enter End Date"
                                    className="bg-gray-100 border-gray-200"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-blue-900 hover:bg-blue-800">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Receipt List */}
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <List className="h-5 w-5" />
                                Payment Receipt List
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Printer className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Download className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none">Column visibility ▼</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Search:</span>
                                <Input
                                    className="w-48 h-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 w-12">#</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Receipt No</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Admission No.</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Duration</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Collected By</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Status</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Date</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Amount</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Discount</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Addition Discount</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Late Fees</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {receipts.map((receipt, index) => (
                                        <TableRow key={receipt.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{receipt.receiptNo}</TableCell>
                                            <TableCell className="text-blue-600 font-medium">{receipt.name}</TableCell>
                                            <TableCell>{receipt.admissionNo}</TableCell>
                                            <TableCell>{receipt.duration}</TableCell>
                                            <TableCell>{receipt.collectedBy}</TableCell>
                                            <TableCell>{receipt.status}</TableCell>
                                            <TableCell>{receipt.date}</TableCell>
                                            <TableCell>{receipt.amount}</TableCell>
                                            <TableCell>{receipt.discount}</TableCell>
                                            <TableCell>{receipt.additionDiscount}</TableCell>
                                            <TableCell>{receipt.lateFees}</TableCell>
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
