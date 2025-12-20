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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2, FileText, Download, Printer, Copy, Upload } from "lucide-react"

export default function AddExpense() {
    const [expenses, setExpenses] = useState([
        { id: 1, head: "Kitchen items", name: "xyz", accountName: "", invoice: "265", amount: "123", date: "06-12-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 2, head: "Kitchen items", name: "Ajay enterprise", accountName: "aseethnae", invoice: "264", amount: "15000", date: "05-11-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 3, head: "Kitchen items", name: "Chaitnya", accountName: "Cash", invoice: "263", amount: "500", date: "28-10-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 4, head: "Annual Wifi Charges", name: "Sep Month", accountName: "", invoice: "262", amount: "25000", date: "17-10-2025", description: "", createdBy: "Super Admin", approvedBy: "-" },
        { id: 5, head: "ABC Limited", name: "ABC ELECTRONICS", accountName: "aseethnae", invoice: "261", amount: "150000", date: "16-10-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 6, head: "electricity", name: "REENA SHARMA", accountName: "Cash", invoice: "260", amount: "1000", date: "19-09-2025", description: "भाग्यश्री", createdBy: "Demo User", approvedBy: "-" },
        { id: 7, head: "TRANSPORTAION", name: "M/s transportation", accountName: "aseethnae", invoice: "259", amount: "15000", date: "11-09-2025", description: "Tables transport", createdBy: "-", approvedBy: "-" },
        { id: 8, head: "diesel for bus", name: "abc", accountName: "Cash", invoice: "258", amount: "1000", date: "05-09-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 9, head: "Electricitysfsafdas", name: "frevf", accountName: "", invoice: "257", amount: "2560", date: "25-07-2025", description: "abcd", createdBy: "Demo User", approvedBy: "Demo User" },
        { id: 10, head: "maintenance", name: "wall color", accountName: "", invoice: "256", amount: "10000", date: "14-07-2025", description: "", createdBy: "Demo User", approvedBy: "-" },
        { id: 11, head: "BOOKS ( Foundation EXAM )", name: "ABC - Stationary Store", accountName: "PALAK GARG", invoice: "255", amount: "4800", date: "18-06-2025", description: "", createdBy: "Super Admin", approvedBy: "-" },
        { id: 12, head: "Electricitysfsafdas", name: "rajesh", accountName: "1", invoice: "1500", amount: "1500", date: "05-04-2025", description: "", createdBy: "Net Initiatives LLP Support", approvedBy: "-" },
    ])

    return (
        <DashboardLayout title="Add Expense">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Add / Edit Expense Form */}
                <Card className="xl:w-1/3 h-fit">
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Edit className="h-5 w-5" />
                            Add / Edit Expense
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="expenseHead" className="text-red-500">Expense Head *</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kitchen">Kitchen items</SelectItem>
                                    <SelectItem value="wifi">Annual Wifi Charges</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountType">Account Type</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bank">Bank</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountName">Account Name</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="acc1">Account 1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-red-500">Name *</Label>
                            <Input id="name" placeholder="Enter name" className="bg-white border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-red-500">Amount *</Label>
                            <Input id="amount" placeholder="Enter amount" className="bg-white border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="invoice" className="text-red-500">Invoice No *</Label>
                            <Input id="invoice" placeholder="266" className="bg-white border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-red-500">Date *</Label>
                            <Input id="date" defaultValue="12-12-2025" className="bg-white border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="paymentMode" className="text-red-500">Payment Mode *</Label>
                            <Select>
                                <SelectTrigger className="bg-white border-gray-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Attach Document</Label>
                            <div className="flex gap-2 items-center border rounded-md p-1 bg-white">
                                <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538]">Choose File</Button>
                                <span className="text-sm text-gray-500">No file chosen</span>
                            </div>
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

                {/* Expense List */}
                <Card className="xl:w-2/3">
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5 flex items-center justify-center">☰</span>
                                Expense List
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Copy className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Printer className="h-4 w-4" /></Button>
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
                                        <TableHead>Name</TableHead>
                                        <TableHead>Account Name</TableHead>
                                        <TableHead>Invoice Number</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Created By</TableHead>
                                        <TableHead>Approved By</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.map((expense) => (
                                        <TableRow key={expense.id} className="text-sm">
                                            <TableCell>{expense.head}</TableCell>
                                            <TableCell>{expense.name}</TableCell>
                                            <TableCell>{expense.accountName}</TableCell>
                                            <TableCell>{expense.invoice}</TableCell>
                                            <TableCell>{expense.amount}</TableCell>
                                            <TableCell>{expense.date}</TableCell>
                                            <TableCell>{expense.description}</TableCell>
                                            <TableCell>{expense.createdBy}</TableCell>
                                            <TableCell>{expense.approvedBy}</TableCell>
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
                                Showing 1 to {expenses.length} of {expenses.length} entries
                            </div>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-8" disabled>Previous</Button>
                                <Button variant="default" size="sm" className="h-8 bg-[#1e1e50]">1</Button>
                                <Button variant="outline" size="sm" className="h-8">Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
