"use client"

import { API_URL } from "@/lib/api-config"

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
import { FileSearch, Loader2, Download, Printer } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function DueFeeReport() {
    const [loading, setLoading] = useState(false)
    const [fees, setFees] = useState<any[]>([])
    const [filters, setFilters] = useState({
        class: "",
        section: "",
        type: "",
        date: ""
    })

    const fetchDueFees = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            // Fetch all pending fees
            const response = await fetch(`${API_URL}/api/fees?status=pending`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.ok) {
                const data = await response.json()
                let filtered = data

                // Client-side filtering for simplicity (or move to backend)
                if (filters.class) {
                    filtered = filtered.filter((f: any) => f.studentId && f.studentId.class === filters.class)
                }
                if (filters.section) {
                    filtered = filtered.filter((f: any) => f.studentId && f.studentId.section === filters.section)
                }
                if (filters.type) {
                    filtered = filtered.filter((f: any) => f.feeType === filters.type)
                }

                setFees(filtered)
            } else {
                toast.error("Failed to fetch due fees")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error loading report")
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout title="Due Fee Report">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <FileSearch className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select value={filters.class} onValueChange={(v) => setFilters({ ...filters, class: v === 'all' ? '' : v })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {[...Array(12)].map((_, i) => (
                                            <SelectItem key={i} value={(i + 1).toString()}>{i + 1}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Select value={filters.section} onValueChange={(v) => setFilters({ ...filters, section: v === 'all' ? '' : v })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                        <SelectItem value="C">C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Fee Type</Label>
                                <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v === 'all' ? '' : v })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="All types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                                        <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                                        <SelectItem value="Exam Fee">Exam Fee</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={fetchDueFees} disabled={loading} className="bg-blue-900 hover:bg-blue-800">
                                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileSearch className="h-4 w-4 mr-2" />}
                                Generate Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {fees.length > 0 && (
                    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardHeader className="bg-pink-50 border-b border-pink-100 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg text-gray-800">
                                Pending Dues ({fees.length})
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export CSV
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Fee Type</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Amount Due</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Due Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fees.map((fee) => (
                                            <TableRow key={fee._id}>
                                                <TableCell className="font-medium">
                                                    <div>{fee.studentId?.firstName} {fee.studentId?.lastName}</div>
                                                    <div className="text-xs text-gray-500">{fee.studentId?.studentId}</div>
                                                </TableCell>
                                                <TableCell>{fee.studentId?.class}-{fee.studentId?.section}</TableCell>
                                                <TableCell>{fee.feeType}</TableCell>
                                                <TableCell className="text-right text-red-600 font-bold">₹{fee.amount}</TableCell>
                                                <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 uppercase">
                                                        {fee.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-gray-50 font-bold">
                                            <TableCell colSpan={3} className="text-right">Total Outstanding:</TableCell>
                                            <TableCell className="text-right text-red-600">
                                                ₹{fees.reduce((sum, f) => sum + f.amount, 0)}
                                            </TableCell>
                                            <TableCell colSpan={2}></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}
