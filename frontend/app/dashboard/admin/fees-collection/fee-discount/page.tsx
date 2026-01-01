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

export default function FeeDiscount() {
    const [searchTerm, setSearchTerm] = useState("")
    const [discounts, setDiscounts] = useState([
        { id: 195, feeType: "Class 1", name: "test", discountType: "Percentage", amount: "34.00" },
        { id: 196, feeType: "Annual Fee", name: "Sibling discount (2)", discountType: "Percentage", amount: "35.00" },
        { id: 197, feeType: "Tution fee", name: "Scholership discount", discountType: "Percentage", amount: "50.00" },
        { id: 198, feeType: "Class 1", name: "TEST", discountType: "Amount", amount: "20.00" },
        { id: 199, feeType: "Hostel", name: "TEST", discountType: "Amount", amount: "20.00" },
        { id: 200, feeType: "Previous Session Balance", name: "TEST", discountType: "Amount", amount: "20.00" },
        { id: 201, feeType: "Class 2", name: "TEST", discountType: "Amount", amount: "20.00" },
        { id: 202, feeType: "Transport", name: "TEST", discountType: "Amount", amount: "20.00" },
    ])

    const [formData, setFormData] = useState({
        feeType: "",
        name: "",
        discountType: "",
        amount: "",
        description: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.feeType || !formData.name || !formData.discountType || !formData.amount) {
            toast.error("Please fill all required fields")
            return
        }
        setDiscounts([...discounts, {
            id: Date.now(),
            feeType: formData.feeType,
            name: formData.name,
            discountType: formData.discountType,
            amount: formData.amount
        }])
        setFormData({ feeType: "", name: "", discountType: "", amount: "", description: "" })
        toast.success("Added successfully")
    }

    return (
        <DashboardLayout title="Fee Discount">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add / Edit Fee Discount
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="feeType" className="text-red-500">Fees Type *</Label>
                                    <Select value={formData.feeType} onValueChange={(val) => setFormData({ ...formData, feeType: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select Option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Class 1">Class 1</SelectItem>
                                            <SelectItem value="Annual Fee">Annual Fee</SelectItem>
                                            <SelectItem value="Tution fee">Tution fee</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-red-500">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountType" className="text-red-500">Discount Type *</Label>
                                    <Select value={formData.discountType} onValueChange={(val) => setFormData({ ...formData, discountType: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Percentage">Percentage</SelectItem>
                                            <SelectItem value="Amount">Amount</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-red-500">Amount *</Label>
                                    <Input
                                        id="amount"
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
                                    Fees Discount List
                                </CardTitle>
                                <Button className="bg-blue-900 hover:bg-blue-800 text-xs h-8">
                                    Waived Off Reasons
                                </Button>
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
                                            <TableHead className="font-bold text-gray-700 w-12">ID</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Fee Type</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Discount Type</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Amount</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {discounts
                                            .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((discount) => (
                                                <TableRow key={discount.id}>
                                                    <TableCell>{discount.id}</TableCell>
                                                    <TableCell>{discount.feeType}</TableCell>
                                                    <TableCell>{discount.name}</TableCell>
                                                    <TableCell>{discount.discountType}</TableCell>
                                                    <TableCell>{discount.amount}</TableCell>
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
