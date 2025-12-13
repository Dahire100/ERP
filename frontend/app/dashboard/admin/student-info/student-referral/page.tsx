"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { ChevronDown, Copy, FileText, Printer } from "lucide-react"

export default function StudentReferral() {
    return (
        <DashboardLayout title="Student Referral">
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                        <span className="mr-2">+</span> Add
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-pink-100 flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <span className="text-xl">≡</span> Student Referral
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Copy className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Printer className="h-4 w-4" /></Button>
                                <Button variant="outline" className="h-8 bg-[#1e1e50] text-white hover:bg-[#151538] border-none text-xs">
                                    Column visibility <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Search:</span>
                                <Input className="w-48 h-8" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="w-12 font-bold text-gray-700">#</TableHead>
                                        <TableHead className="font-bold text-gray-700">REFERRAL BY</TableHead>
                                        <TableHead className="font-bold text-gray-700">STUDENT NAME</TableHead>
                                        <TableHead className="font-bold text-gray-700">EMAIL</TableHead>
                                        <TableHead className="font-bold text-gray-700">MOBILE NUMBER</TableHead>
                                        <TableHead className="font-bold text-gray-700">NOTE</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { id: 1, referralBy: "KSV1", studentName: "new student refer", email: "ghk@kkkl.bnm", mobile: "8976543210", note: "" },
                                        { id: 2, referralBy: "Lavanya", studentName: "kartik", email: "kartik@gmail.com", mobile: "48592145", note: "test" },
                                        { id: 3, referralBy: "Samkit", studentName: "yyyyyy", email: "yyyy@gmail.com", mobile: "6677889944", note: "" },
                                    ].map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.referralBy}</TableCell>
                                            <TableCell>{row.studentName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.mobile}</TableCell>
                                            <TableCell>{row.note}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] h-8 text-xs">
                                                            Action <ChevronDown className="h-3 w-3 ml-1" />
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
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                            <div>Showing 1 to 3 of 3 entries</div>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="default" size="sm" className="bg-[#1e1e50] hover:bg-[#151538]">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
