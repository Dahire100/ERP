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
import { ListChecks } from "lucide-react"

const sample = [
    { id: 1, head: "Donations", name: "Alumni Fund", date: "12-06-2025", amount: 25000, ref: "REC-1206" },
    { id: 2, head: "Grants", name: "Govt Grant", date: "10-06-2025", amount: 78000, ref: "REC-1205" },
]

export default function IncomeList() {
    const [search, setSearch] = useState("")

    return (
        <DashboardLayout title="Income List">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ListChecks className="h-5 w-5" />
                            Filter Income
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Income Head</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="donations">Donations</SelectItem>
                                        <SelectItem value="grants">Grants</SelectItem>
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
                                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ref / Name" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg text-gray-800">Income Entries</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="font-bold text-gray-700 uppercase">Ref No</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Head</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sample
                                        .filter((row) => row.name.toLowerCase().includes(search.toLowerCase()) || row.ref.toLowerCase().includes(search.toLowerCase()))
                                        .map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.ref}</TableCell>
                                                <TableCell>{row.head}</TableCell>
                                                <TableCell>{row.name}</TableCell>
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

