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
import { Search } from "lucide-react"
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config"
import { toast } from "sonner"

export default function SearchExpense() {
    const [rows, setRows] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [criteria, setCriteria] = useState({
        voucher: "",
        category: "all",
        startDate: "",
        endDate: ""
    })

    const handleSearch = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (criteria.category && criteria.category !== "all") params.append("category", criteria.category)
            if (criteria.startDate) params.append("startDate", criteria.startDate)
            if (criteria.endDate) params.append("endDate", criteria.endDate)
            // Backend currently doesn't support voucher search directly in getAllExpenses, but we can filter client side or update backend later
            // For now, let's fetch based on date/category

            const res = await apiFetch(`${API_ENDPOINTS.EXPENSES}?${params.toString()}`)
            if (res.ok) {
                const data = await res.json()
                // If voucher search is needed, filter here
                let results = data.data || []
                if (criteria.voucher) {
                    results = results.filter((r: any) => r.receiptNumber?.includes(criteria.voucher))
                }
                setRows(results)
            } else {
                toast.error("Failed to fetch expenses")
            }
        } catch (error) {
            console.error("Error searching expenses", error)
            toast.error("Error searching expenses")
        } finally {
            setLoading(false)
        }
    }

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
                        <form onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label>Voucher No.</Label>
                                    <Input
                                        placeholder="Enter voucher (Receipt #)"
                                        className="bg-white border-gray-200"
                                        value={criteria.voucher}
                                        onChange={(e) => setCriteria({ ...criteria, voucher: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Expense Head</Label>
                                    <Select
                                        value={criteria.category}
                                        onValueChange={(val) => setCriteria({ ...criteria, category: val })}
                                    >
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="salary">Salary</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="utilities">Utilities</SelectItem>
                                            <SelectItem value="supplies">Supplies</SelectItem>
                                            <SelectItem value="transport">Transport</SelectItem>
                                            <SelectItem value="equipment">Equipment</SelectItem>
                                            <SelectItem value="events">Events</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date From</Label>
                                    <Input
                                        type="date"
                                        className="bg-white border-gray-200"
                                        value={criteria.startDate}
                                        onChange={(e) => setCriteria({ ...criteria, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date To</Label>
                                    <Input
                                        type="date"
                                        className="bg-white border-gray-200"
                                        value={criteria.endDate}
                                        onChange={(e) => setCriteria({ ...criteria, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800" disabled={loading}>
                                    {loading ? "Searching..." : "Search"}
                                </Button>
                            </div>
                        </form>
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
                                    {rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-4">No expenses found matching criteria.</TableCell>
                                        </TableRow>
                                    ) : (
                                        rows.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>{row.receiptNumber || "-"}</TableCell>
                                                <TableCell className="capitalize">{row.category}</TableCell>
                                                <TableCell>{row.paidTo || "-"}</TableCell>
                                                <TableCell className="text-right">{row.amount.toFixed(2)}</TableCell>
                                                <TableCell>{new Date(row.expenseDate).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
