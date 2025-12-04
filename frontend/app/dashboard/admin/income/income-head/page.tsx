"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export default function IncomeHead() {
    const [searchTerm, setSearchTerm] = useState("")
    const [heads, setHeads] = useState([
        { id: 1, name: "miscellaneous", amount: "20000" },
        { id: 2, name: "Student wellfare funds", amount: "5000" },
        { id: 3, name: "Registeration-Form-Fee", amount: "1000" },
        { id: 4, name: "Registeration Form Fee", amount: "10000" },
        { id: 5, name: "Admission Form", amount: "100" },
        { id: 6, name: "INTRANCE EXAM", amount: "100" },
        { id: 7, name: "Admisiion fee Instant", amount: "5000" },
        { id: 8, name: "playground competition registration", amount: "100" },
    ])

    const [formData, setFormData] = useState({
        incomeHead: "",
        amount: "",
        description: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.incomeHead || !formData.amount) {
            toast.error("Please fill all required fields")
            return
        }
        setHeads([...heads, { id: Date.now(), name: formData.incomeHead, amount: formData.amount }])
        setFormData({ incomeHead: "", amount: "", description: "" })
        toast.success("Added successfully")
    }

    return (
        <DashboardLayout title="Income Head">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add / Edit Income Head
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="incomeHead" className="text-red-500">Income Head *</Label>
                                    <Input
                                        id="incomeHead"
                                        placeholder="Enter Income Head"
                                        value={formData.incomeHead}
                                        onChange={(e) => setFormData({ ...formData, incomeHead: e.target.value })}
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
                                    Income Head List
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
                                            <TableHead className="font-bold text-gray-700 uppercase">Income Head</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Amount</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {heads
                                            .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((head) => (
                                                <TableRow key={head.id}>
                                                    <TableCell>{head.name}</TableCell>
                                                    <TableCell>{head.amount}</TableCell>
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
