"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"
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
import { Edit, Trash2, Copy, FileText, Download } from "lucide-react"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

export default function ExpenseHead() {
    const { toast } = useToast()
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
            <div className="space-y-6">
                <div className="flex items-center justify-between bg-pink-50/50 p-4 rounded-lg">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <span className="p-2 bg-pink-100 rounded-md">
                            <Edit className="w-5 h-5 text-pink-700" />
                        </span>
                        Expense Head
                    </h1>
                    <div className="text-sm text-gray-500">
                        Dashboard / Expense / Expense Head
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Add Expense Head Form */}
                    <Card className="xl:w-1/3 h-fit border-none shadow-md">
                        <CardHeader className="bg-[#1e1b4b] text-white rounded-t-xl py-4">
                            <CardTitle className="text-lg flex items-center gap-2 font-medium">
                                <Edit className="h-5 w-5" />
                                Add / Edit Expense Head
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="headName" className="text-red-500 font-medium">Expense Head *</Label>
                                <Input id="headName" placeholder="Enter Expense Head" className="bg-gray-50 border-gray-200 focus:ring-[#1e1b4b]" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-medium">Description</Label>
                                <Textarea id="description" className="bg-gray-50 border-gray-200 focus:ring-[#1e1b4b]" />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={() => toast({ title: "Success", description: "Expense head saved successfully!" })}
                                    className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 text-white w-full sm:w-auto"
                                >
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expense Head List */}
                    <Card className="xl:w-2/3 border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <div className="bg-transparent text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                                </div>
                                Expense Head List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" title="Copy">
                                        <Copy size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="Excel">
                                        <FileText size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="CSV">
                                        <FileText size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="Print">
                                        <Download size={16} />
                                    </Button>
                                    <Button variant="outline" size="sm" className="hidden sm:flex">Column visibility</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Search:</span>
                                    <Input className="w-48 h-9" placeholder="Search..." />
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                                            <TableHead className="font-semibold text-[#1e1b4b]">EXPENSE HEAD</TableHead>
                                            <TableHead className="text-right font-semibold text-[#1e1b4b]">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {expenseHeads.map((head) => (
                                            <TableRow key={head.id} className="hover:bg-gray-50/50">
                                                <TableCell className="font-medium text-gray-700">{head.name}</TableCell>
                                                <TableCell className="text-right">
                                                    <ActionMenu
                                                        onEdit={() => toast({ title: "Edit", description: `Editing ${head.name}` })}
                                                        onDelete={() => toast({ title: "Delete", description: `Deleting ${head.name}`, variant: "destructive" })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                                <div>Showing 1 to {expenseHeads.length} of {expenseHeads.length} entries</div>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="default" size="sm" className="bg-[#1e1b4b]">1</Button>
                                    <Button variant="outline" size="sm" disabled>Next</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
