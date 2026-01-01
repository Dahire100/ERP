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
import { Edit, Printer, FileText, Download, List } from "lucide-react"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Cheques() {
    const [searchTerm, setSearchTerm] = useState("")
    const [cheques, setCheques] = useState([
        { id: 1, student: "Vishal Sharma", chequeNo: "020685", bankName: "canara bank", amount: "5000", date: "13-06-2025", status: "Bounced" },
        { id: 2, student: "Karan Aswani", chequeNo: "45214815485", bankName: "PNB", amount: "5500", date: "12-06-2024", status: "Cleared" },
        { id: 3, student: "Ansh test sharma", chequeNo: "232321", bankName: "test", amount: "2000", date: "13-06-2024", status: "Cancelled" },
    ])

    const [formData, setFormData] = useState({
        student: "",
        chequeNo: "",
        bankName: "",
        amount: "",
        date: "",
        status: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.student || !formData.chequeNo || !formData.bankName || !formData.amount || !formData.date || !formData.status) {
            toast.error("Please fill all required fields")
            return
        }
        setCheques([...cheques, {
            id: Date.now(),
            student: formData.student,
            chequeNo: formData.chequeNo,
            bankName: formData.bankName,
            amount: formData.amount,
            date: formData.date,
            status: formData.status
        }])
        setFormData({ student: "", chequeNo: "", bankName: "", amount: "", date: "", status: "" })
        toast.success("Added successfully")
    }

    return (
        <DashboardLayout title="Cheques">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add / Edit Cheque
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="student" className="text-red-500">Student *</Label>
                                    <Input
                                        id="student"
                                        placeholder="Search"
                                        value={formData.student}
                                        onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="chequeNo" className="text-red-500">Cheque No *</Label>
                                    <Input
                                        id="chequeNo"
                                        placeholder="Enter Cheque No"
                                        value={formData.chequeNo}
                                        onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bankName" className="text-red-500">Bank Name *</Label>
                                    <Input
                                        id="bankName"
                                        placeholder="Enter Bank Name"
                                        value={formData.bankName}
                                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-red-500">Amount *</Label>
                                    <Input
                                        id="amount"
                                        placeholder="Enter Amount"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-red-500">Date *</Label>
                                    <Input
                                        id="date"
                                        placeholder="Enter Cheque Date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-red-500">Status *</Label>
                                    <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cleared">Cleared</SelectItem>
                                            <SelectItem value="Bounced">Bounced</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
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

                {/* List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                    <List className="h-5 w-5" />
                                    Cheque List
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Printer className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><FileText className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Download className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none">Column visibility ▼</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Search:</span>
                                    <Input
                                        className="w-48 h-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Cheque No</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Bank Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Amount</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cheques
                                            .filter(c => c.student.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((cheque) => (
                                                <TableRow key={cheque.id}>
                                                    <TableCell>{cheque.student}</TableCell>
                                                    <TableCell>{cheque.chequeNo}</TableCell>
                                                    <TableCell>{cheque.bankName}</TableCell>
                                                    <TableCell>{cheque.amount}</TableCell>
                                                    <TableCell>{cheque.date}</TableCell>
                                                    <TableCell>{cheque.status}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 h-7 px-2 text-xs">
                                                                    Action <span className="ml-1">▼</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                Showing 1 to {cheques.length} of {cheques.length} entries
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
