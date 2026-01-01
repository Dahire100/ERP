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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AlertOctagon } from "lucide-react"

const defaulters = [
    { id: 1, student: "Rahul Mehta", class: "3-A", lastPayment: "12-02-2025", pendingMonths: 3, amount: 6500 },
    { id: 2, student: "Sia Verma", class: "4-B", lastPayment: "10-01-2025", pendingMonths: 4, amount: 8200 },
]

export default function DefaultersList() {
    return (
        <DashboardLayout title="Defaulters List">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <AlertOctagon className="h-5 w-5" />
                            Filter Defaulters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Pending Months</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder=">= 2" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">2+</SelectItem>
                                        <SelectItem value="3">3+</SelectItem>
                                        <SelectItem value="4">4+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Search</Label>
                                <Input placeholder="Admission no / Name" className="bg-white border-gray-200" />
                            </div>
                            <div className="flex items-end">
                                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Search</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Chronic Defaulters</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Last Payment</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Pending Months</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Outstanding</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {defaulters.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.student}</TableCell>
                                            <TableCell>{row.class}</TableCell>
                                            <TableCell>{row.lastPayment}</TableCell>
                                            <TableCell className="text-right">{row.pendingMonths}</TableCell>
                                            <TableCell className="text-right text-red-600">{row.amount.toFixed(2)}</TableCell>
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

