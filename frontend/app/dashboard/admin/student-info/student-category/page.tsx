"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Users, Download, Copy, FileText, Printer } from "lucide-react"
import { useState } from "react"
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

export default function StudentCategory() {
    const [categories, setCategories] = useState([
        { id: 1, name: "Hindi-Jain" },
        { id: 2, name: "Gujrati-Jain" },
        { id: 3, name: "Marathi-Jain" },
        { id: 4, name: "ST" },
        { id: 5, name: "SBC" },
        { id: 6, name: "obc" },
    ])

    return (
        <DashboardLayout title="Student Category">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Add Category Form */}
                <Card className="xl:w-1/3 h-fit">
                    <CardHeader className="bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <Edit className="h-5 w-5" /> Add Student Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-red-500">Name *</Label>
                            <Input placeholder="Enter category" className="bg-white border-gray-200" />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">Save</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Category List */}
                <Card className="xl:w-2/3">
                    <CardHeader className="bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <Users className="h-5 w-5" /> Student Category List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
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

                        <div className="overflow-x-auto border rounded-md">
                            <Table>
                                <TableHeader className="bg-pink-50">
                                    <TableRow className="uppercase text-xs font-bold text-gray-700">
                                        <TableHead className="w-16">ID</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category) => (
                                        <TableRow key={category.id} className="text-sm hover:bg-gray-50">
                                            <TableCell>{category.id}</TableCell>
                                            <TableCell>{category.name}</TableCell>
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
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
