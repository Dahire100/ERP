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
import { History } from "lucide-react"
import { toast } from "sonner"

export default function PreviousYearBalance() {
    const [balances, setBalances] = useState([
        { id: 1, student: "Ansh Sharma", lastYear: 1200, received: 200, carried: 1000 },
        { id: 2, student: "Vanya Patel", lastYear: 500, received: 0, carried: 500 },
    ])

    const [formData, setFormData] = useState({
        student: "",
        amount: "",
        note: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.student || !formData.amount) {
            toast.error("Student and amount are required")
            return
        }
        const amountNumber = Number(formData.amount)
        setBalances([...balances, { id: Date.now(), student: formData.student, lastYear: amountNumber, received: 0, carried: amountNumber }])
        toast.success("Balance carried forward")
        setFormData({ student: "", amount: "", note: "" })
    }

    return (
        <DashboardLayout title="Previous Year Balance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <History className="h-5 w-5" />
                                Carry Forward Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Student *</Label>
                                    <Input
                                        value={formData.student}
                                        onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                                        placeholder="Search student"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Balance Amount *</Label>
                                    <Input
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="Enter amount"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Note</Label>
                                    <Input
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        placeholder="Optional note"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg text-gray-800">Balance Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Prev Year</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Received</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Carried</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {balances.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.student}</TableCell>
                                                <TableCell className="text-right">{row.lastYear.toFixed(2)}</TableCell>
                                                <TableCell className="text-right text-green-700">{row.received.toFixed(2)}</TableCell>
                                                <TableCell className="text-right text-orange-700">{row.carried.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

