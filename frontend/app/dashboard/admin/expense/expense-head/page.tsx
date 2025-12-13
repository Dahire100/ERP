"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
<<<<<<< HEAD
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2, Copy, FileText, Download } from "lucide-react"

export default function ExpenseHead() {
    const [expenseHeads, setExpenseHeads] = useState([
        { id: 1, name: "ABC Limited" },
        { id: 2, name: "Annual Wifi Charges" },
        { id: 3, name: "Books" },
        { id: 4, name: "books" },
        { id: 5, name: "BOOKS ( Foundation EXAM )" },
        { id: 6, name: "Chair" },
        { id: 7, name: "charge" },
        { id: 8, name: "Charger" },
        { id: 9, name: "construction" },
        { id: 10, name: "DIESEL BILLS" },
        { id: 11, name: "diesel for bus" },
        { id: 12, name: "DRIVER,CLEANER CHARGES" },
        { id: 13, name: "DRIVER ,CLEANER SALARY" },
        { id: 14, name: "ELECTRIC ITEM" },
        { id: 15, name: "electricity" },
        { id: 16, name: "Electricitysfsafdas" },
        { id: 17, name: "Industrial" },
        { id: 18, name: "Kitchen items" },
        { id: 19, name: "maintance" },
        { id: 20, name: "maintenance" },
        { id: 21, name: "managing charges" },
        { id: 22, name: "marketing and promotion" },
        { id: 23, name: "Marketing Hordings" },
        { id: 24, name: "office expanse" },
    ])

    return (
        <DashboardLayout title="Expense Head">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Add Expense Head Form */}
                <Card className="xl:w-1/3 h-fit">
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Edit className="h-5 w-5" />
                            Add / Edit Expense Head
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="headName" className="text-red-500">Expense Head *</Label>
                            <Input id="headName" placeholder="Enter Expense Head" className="bg-white border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" className="bg-white border-gray-200" />
                        </div>

                        <div className="flex justify-end">
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">Save</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Expense Head List */}
                <Card className="xl:w-2/3">
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5 flex items-center justify-center">☰</span>
                                Expense Head List
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Copy className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Download className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none ml-1">Column visibility</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Search:</span>
                                <Input className="w-48 h-8" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50 uppercase text-xs font-bold text-gray-700">
                                        <TableHead>Expense Head</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenseHeads.map((head) => (
                                        <TableRow key={head.id} className="text-sm hover:bg-gray-50">
                                            <TableCell className="font-medium">{head.name}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] h-7 px-2">
                                                            Action <span className="ml-1">▼</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-xs text-gray-500">
                                Showing 1 to {expenseHeads.length} of {39} entries
                            </div>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-8" disabled>Previous</Button>
                                <Button variant="default" size="sm" className="h-8 bg-[#1e1e50]">1</Button>
                                <Button variant="outline" size="sm" className="h-8">2</Button>
                                <Button variant="outline" size="sm" className="h-8">Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
=======
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, Edit } from "lucide-react"
import { toast } from "sonner"

export default function ExpenseHead() {
    const [heads, setHeads] = useState([
        { id: 1, name: "Salary", code: "SAL" },
        { id: 2, name: "Utilities", code: "UTIL" },
        { id: 3, name: "Maintenance", code: "MAIN" },
    ])

    const [form, setForm] = useState({ name: "", code: "", description: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.code) {
            toast.error("Name and code required")
            return
        }
        setHeads([...heads, { id: Date.now(), name: form.name, code: form.code }])
        toast.success("Expense head added")
        setForm({ name: "", code: "", description: "" })
    }

    return (
        <DashboardLayout title="Expense Head">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add / Edit Head
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Name *</Label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Head name"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Code *</Label>
                                    <Input
                                        value={form.code}
                                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                                        placeholder="Short code"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        rows={3}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="flex justify-end">
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
                                <Wallet className="h-5 w-5" />
                                Expense Head List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Code</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {heads.map((h) => (
                                            <TableRow key={h.id}>
                                                <TableCell>{h.name}</TableCell>
                                                <TableCell>{h.code}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
            </div>
        </DashboardLayout>
    )
}
<<<<<<< HEAD
=======

>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
