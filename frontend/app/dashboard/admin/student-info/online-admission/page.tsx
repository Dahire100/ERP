"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, List, CheckCircle2, MinusCircle, MoreHorizontal } from "lucide-react"
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
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function OnlineAdmission() {
    const [students, setStudents] = useState([
        { id: 1, name: "TEST ATEST TEST", class: "1st", father: "", dob: "24-01-2025", gender: "Male", category: "", mobile: "9772119901", transaction: "Paid (Cash) Transaction ID: BB45151558 At: 19-09-2025 11:19 AM", enrolled: true, appliedOn: "17-01-2025 12:46 PM" },
        { id: 3, name: "TESTTTT", class: "4th", father: "", dob: "11-01-2025", gender: "Male", category: "", mobile: "9772119901", transaction: "Paid (Cash) Transaction ID: N/A At: 19-09-2025 11:18 AM", enrolled: false, appliedOn: "17-01-2025 03:23 PM" },
        { id: 4, name: "Arnav Jagadale", class: "10th", father: "Santosh", dob: "02-07-2011", gender: "Male", category: "Hindi-Jain", mobile: "9881152427", transaction: "Unpaid", enrolled: false, appliedOn: "02-07-2025 09:34 PM" },
        { id: 5, name: "Arnav Jagadale", class: "10th", father: "Santosh", dob: "02-07-2011", gender: "Male", category: "Hindi-Jain", mobile: "9881152427", transaction: "Unpaid", enrolled: false, appliedOn: "02-07-2025 09:34 PM" },
        { id: 6, name: "Aarambh Jain", class: "5th", father: "Akash Jain", dob: "18-02-2014", gender: "Male", category: "genral", mobile: "9982741BBB", transaction: "Unpaid", enrolled: false, appliedOn: "18-09-2025 03:28 PM" },
        { id: 7, name: "gagan", class: "Nursary", father: "", dob: "03-05-2022", gender: "Female", category: "", mobile: "9915550000", transaction: "Unpaid", enrolled: false, appliedOn: "03-12-2025 10:51 AM" },
    ])

    return (
        <DashboardLayout title="Online Admission">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <Search className="h-5 w-5" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input defaultValue="01-01-2025" className="bg-white border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input defaultValue="31-12-2025" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                <Search className="h-4 w-4 mr-2" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <List className="h-5 w-5" /> Online Admission Directory List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none">📋</Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none">📊</Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none">📄</Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none">🖨️</Button>
                                <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none ml-1">Column visibility</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="10">
                                    <SelectTrigger className="w-[70px] bg-white border-gray-200">
                                        <SelectValue placeholder="10" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-500">Search:</span>
                                <Input className="w-48 h-8" />
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-md">
                            <Table>
                                <TableHeader className="bg-pink-50">
                                    <TableRow className="uppercase text-xs font-bold text-gray-700">
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Father Name</TableHead>
                                        <TableHead>Date Of Birth</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Mobile Number</TableHead>
                                        <TableHead>Transaction</TableHead>
                                        <TableHead>Enrolled</TableHead>
                                        <TableHead>Applied On</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id} className="text-sm hover:bg-gray-50">
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell>{student.class}</TableCell>
                                            <TableCell>{student.father}</TableCell>
                                            <TableCell>{student.dob}</TableCell>
                                            <TableCell>{student.gender}</TableCell>
                                            <TableCell>{student.category}</TableCell>
                                            <TableCell>{student.mobile}</TableCell>
                                            <TableCell>
                                                {student.transaction.includes("Paid") ? (
                                                    <div className="bg-[#1e1e50] text-white p-2 rounded text-xs">
                                                        {student.transaction}
                                                    </div>
                                                ) : (
                                                    <span className="bg-[#1e1e50] text-white px-2 py-1 rounded text-xs">{student.transaction}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {student.enrolled ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                                ) : (
                                                    <MinusCircle className="h-5 w-5 text-[#1e1e50] mx-auto" />
                                                )}
                                            </TableCell>
                                            <TableCell>{student.appliedOn}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] h-7 px-2">
                                                            Action <span className="ml-1">▼</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Details</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
                                Showing 1 to {students.length} of {students.length} entries
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
