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
import { AlertTriangle } from "lucide-react"
import { toast } from "sonner"

export default function ChequeBounceManagement() {
    const [records, setRecords] = useState([
        { id: 1, student: "Vishal Sharma", chequeNo: "020685", penalty: 250, status: "Unrecovered" },
        { id: 2, student: "Karan Aswani", chequeNo: "45214815485", penalty: 0, status: "Waived" },
    ])

    const [formData, setFormData] = useState({
        student: "",
        chequeNo: "",
        penalty: "",
        status: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.student || !formData.chequeNo || !formData.status) {
            toast.error("Student, cheque no and status are required")
            return
        }
        setRecords([...records, { id: Date.now(), student: formData.student, chequeNo: formData.chequeNo, penalty: Number(formData.penalty || 0), status: formData.status }])
        toast.success("Bounce case recorded")
        setFormData({ student: "", chequeNo: "", penalty: "", status: "" })
    }

    return (
        <DashboardLayout title="Cheque Bounce Management">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <AlertTriangle className="h-5 w-5" />
                                Record Bounce
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
                                    <Label className="text-red-500">Cheque No *</Label>
                                    <Input
                                        value={formData.chequeNo}
                                        onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                                        placeholder="Enter cheque number"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Penalty Amount</Label>
                                    <Input
                                        value={formData.penalty}
                                        onChange={(e) => setFormData({ ...formData, penalty: e.target.value })}
                                        placeholder="0.00"
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
                                            <SelectItem value="Unrecovered">Unrecovered</SelectItem>
                                            <SelectItem value="Recovered">Recovered</SelectItem>
                                            <SelectItem value="Waived">Waived</SelectItem>
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
                            <CardTitle className="text-lg text-gray-800">Bounce Cases</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Cheque No</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Penalty</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {records.map((rec) => (
                                            <TableRow key={rec.id}>
                                                <TableCell>{rec.student}</TableCell>
                                                <TableCell>{rec.chequeNo}</TableCell>
                                                <TableCell className="text-right">{rec.penalty.toFixed(2)}</TableCell>
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

