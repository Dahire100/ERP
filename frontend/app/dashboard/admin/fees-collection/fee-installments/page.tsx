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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CalendarClock, PlusCircle } from "lucide-react"
import { toast } from "sonner"

export default function FeeInstallments() {
    const [installments, setInstallments] = useState([
        { id: 1, name: "April", amount: "2500", dueDate: "05-04-2025", status: "Pending" },
        { id: 2, name: "May", amount: "2500", dueDate: "05-05-2025", status: "Partial" },
        { id: 3, name: "June", amount: "2500", dueDate: "05-06-2025", status: "Paid" },
    ])

    const [formData, setFormData] = useState({
        group: "",
        type: "",
        name: "",
        amount: "",
        dueDate: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.group || !formData.type || !formData.name || !formData.amount || !formData.dueDate) {
            toast.error("Please fill all required fields")
            return
        }
        setInstallments([
            ...installments,
            {
                id: Date.now(),
                name: formData.name,
                amount: formData.amount,
                dueDate: formData.dueDate,
                status: "Pending"
            }
        ])
        toast.success("Installment added")
        setFormData({ group: "", type: "", name: "", amount: "", dueDate: "" })
    }

    return (
        <DashboardLayout title="Fee Installments">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <PlusCircle className="h-5 w-5" />
                                Create Installment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Fees Group *</Label>
                                    <Select value={formData.group} onValueChange={(val) => setFormData({ ...formData, group: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="junior">Junior</SelectItem>
                                            <SelectItem value="senior">Senior</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Fees Type *</Label>
                                    <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tuition">Tuition</SelectItem>
                                            <SelectItem value="transport">Transport</SelectItem>
                                            <SelectItem value="hostel">Hostel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Installment Name *</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. April"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Amount *</Label>
                                    <Input
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="Enter amount"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Due Date *</Label>
                                    <Input
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        placeholder="DD-MM-YYYY"
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
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <CalendarClock className="h-5 w-5" />
                                Installment Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Amount</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Due Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {installments.map((inst) => (
                                            <TableRow key={inst.id}>
                                                <TableCell>{inst.name}</TableCell>
                                                <TableCell>{inst.amount}</TableCell>
                                                <TableCell>{inst.dueDate}</TableCell>
                                                <TableCell>{inst.status}</TableCell>
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

