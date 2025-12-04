"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export default function AddIncome() {
    const [searchTerm, setSearchTerm] = useState("")
    const [incomes, setIncomes] = useState([
        { id: 1, head: "Admission Form", invoice: "47/2025-26", amount: "100", date: "2025-10-23", createdBy: "Nlet Initiatives LLP Support", approvedBy: "-" },
        { id: 2, head: "admission form", invoice: "46/2025-26", amount: "200", date: "2025-10-23", createdBy: "Demo User", approvedBy: "Demo User" },
        { id: 3, head: "admission form", invoice: "45/2025-26", amount: "200", date: "2025-10-23", createdBy: "Demo User", approvedBy: "Demo User" },
        { id: 4, head: "Admission Form", invoice: "40/2025-26", amount: "100", date: "2025-09-19", createdBy: "Demo User", approvedBy: "-" },
        { id: 5, head: "Admission Form", invoice: "26/2025-26", amount: "100", date: "2025-09-19", createdBy: "Demo User", approvedBy: "-" },
        { id: 6, head: "Demo", invoice: "23/2025-26", amount: "200", date: "2025-04-05", createdBy: "Nlet Initiatives", approvedBy: "Demo User" },
    ])

    const [formData, setFormData] = useState({
        incomeHead: "",
        accountType: "",
        accountName: "",
        incomeFrom: "",
        other: "",
        invoiceNo: "45461",
        date: "",
        amount: "",
        description: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.incomeHead || !formData.incomeFrom || !formData.other || !formData.invoiceNo || !formData.date || !formData.amount) {
            toast.error("Please fill all required fields")
            return
        }
        toast.success("Income added successfully")
        setFormData({
            incomeHead: "",
            accountType: "",
            accountName: "",
            incomeFrom: "",
            other: "",
            invoiceNo: "45461",
            date: "",
            amount: "",
            description: ""
        })
    }

    return (
        <DashboardLayout title="Add Income">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add / Edit Income
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="incomeHead" className="text-red-500">Income Head *</Label>
                                    <Select value={formData.incomeHead} onValueChange={(val) => setFormData({ ...formData, incomeHead: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admission">Admission Form</SelectItem>
                                            <SelectItem value="donation">Donation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accountType">Account Type</Label>
                                    <Select value={formData.accountType} onValueChange={(val) => setFormData({ ...formData, accountType: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="bank">Bank</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accountName">Account Name</Label>
                                    <Select value={formData.accountName} onValueChange={(val) => setFormData({ ...formData, accountName: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="acc1">Account 1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="incomeFrom" className="text-red-500">Income From *</Label>
                                    <Select value={formData.incomeFrom} onValueChange={(val) => setFormData({ ...formData, incomeFrom: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Other" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="other" className="text-red-500">Other *</Label>
                                    <Input
                                        id="other"
                                        placeholder="Enter Other"
                                        value={formData.other}
                                        onChange={(e) => setFormData({ ...formData, other: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="invoiceNo" className="text-red-500">Invoice No. *</Label>
                                    <Input
                                        id="invoiceNo"
                                        value={formData.invoiceNo}
                                        onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-red-500">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="bg-white border-gray-200"
                                        rows={3}
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

                {/* List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                    <List className="h-5 w-5" />
                                    Income List
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
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Income Head</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Invoice Number</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Amount</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Created By</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Approved By</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {incomes
                                            .filter(i => i.head.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((income) => (
                                                <TableRow key={income.id}>
                                                    <TableCell className="text-blue-600 font-medium">{income.head}</TableCell>
                                                    <TableCell>{income.invoice}</TableCell>
                                                    <TableCell>{income.amount}</TableCell>
                                                    <TableCell>{income.date}</TableCell>
                                                    <TableCell>{income.createdBy}</TableCell>
                                                    <TableCell>{income.approvedBy}</TableCell>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
