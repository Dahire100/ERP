"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Hash } from "lucide-react"

const rows = [
    { series: "V", lastUsed: "2201", pending: 5, next: "2202" },
    { series: "VR", lastUsed: "0310", pending: 2, next: "0311" },
]

export default function VoucherTracking() {
    return (
        <DashboardLayout title="Voucher No. Tracking">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Hash className="h-5 w-5" />
                            Track Voucher Series
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Series Prefix</Label>
                                <Input placeholder="e.g. V" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Used</Label>
                                <Input placeholder="2201" className="bg-white border-gray-200" />
                            </div>
                            <div className="flex items-end">
                                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Update</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Voucher Series</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Series</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Last Used</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Pending Qty</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Next No</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.series}>
                                            <TableCell>{row.series}</TableCell>
                                            <TableCell className="text-right">{row.lastUsed}</TableCell>
                                            <TableCell className="text-right">{row.pending}</TableCell>
                                            <TableCell className="text-right">{row.next}</TableCell>
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

