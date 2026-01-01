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
import { Bus } from "lucide-react"
import { toast } from "sonner"

export default function TransportFees() {
    const [records, setRecords] = useState([
        { id: 1, student: "Karan Aswani", route: "North Loop", vehicle: "UP14 AB 1234", charge: 1200, status: "Pending" },
        { id: 2, student: "Vishal Sharma", route: "East Express", vehicle: "UP16 ZX 4432", charge: 1500, status: "Paid" },
    ])

    const [formData, setFormData] = useState({
        student: "",
        route: "",
        vehicle: "",
        charge: "",
        status: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.student || !formData.route || !formData.vehicle || !formData.charge || !formData.status) {
            toast.error("Please fill all required fields")
            return
        }
        setRecords([...records, { id: Date.now(), ...formData, charge: Number(formData.charge) }])
        toast.success("Transport fee saved")
        setFormData({ student: "", route: "", vehicle: "", charge: "", status: "" })
    }

    return (
        <DashboardLayout title="Transport Fees">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Bus className="h-5 w-5" />
                                Assign Transport Fee
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
                                    <Label className="text-red-500">Route *</Label>
                                    <Input
                                        value={formData.route}
                                        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                        placeholder="Route name"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Vehicle *</Label>
                                    <Input
                                        value={formData.vehicle}
                                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                                        placeholder="Vehicle number"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Monthly Charge *</Label>
                                    <Input
                                        value={formData.charge}
                                        onChange={(e) => setFormData({ ...formData, charge: e.target.value })}
                                        placeholder="Amount"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Status *</Label>
                                    <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                            <CardTitle className="text-lg text-gray-800">Transport Fee List</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Route</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Vehicle</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Charge</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {records.map((rec) => (
                                            <TableRow key={rec.id}>
                                                <TableCell>{rec.student}</TableCell>
                                                <TableCell>{rec.route}</TableCell>
                                                <TableCell>{rec.vehicle}</TableCell>
                                                <TableCell className="text-right">{rec.charge.toFixed(2)}</TableCell>
                                                <TableCell>{rec.status}</TableCell>
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

