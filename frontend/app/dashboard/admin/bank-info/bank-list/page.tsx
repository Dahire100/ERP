"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { List } from "lucide-react"

const rows = [
    { id: 1, bankName: "ABC Bank", accountName: "School Main", accountNumber: "1234567890", ifsc: "ABC0001234" },
    { id: 2, bankName: "XYZ Bank", accountName: "Operations", accountNumber: "9876543210", ifsc: "XYZ0009876" },
]

export default function BankList() {
    const [search, setSearch] = useState("")

    return (
        <DashboardLayout title="Bank List">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <List className="h-5 w-5" />
                            Filter
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Account Name</Label>
                                <Input placeholder="Account name" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Search</Label>
                                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name / IFSC / Account" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Banks</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Bank</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Account Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Account No</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">IFSC</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows
                                        .filter((r) =>
                                            `${r.bankName} ${r.accountName} ${r.accountNumber} ${r.ifsc}`.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.bankName}</TableCell>
                                                <TableCell>{row.accountName}</TableCell>
                                                <TableCell>{row.accountNumber}</TableCell>
                                                <TableCell>{row.ifsc}</TableCell>
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

