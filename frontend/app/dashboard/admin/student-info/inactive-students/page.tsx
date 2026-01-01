"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { ChevronDown, Copy, FileText, Printer, Search } from "lucide-react"

export default function InactiveStudents() {
    return (
        <DashboardLayout title="Inactive Students">
            <div className="space-y-6">
                {/* Search Criteria */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Select Criteria</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Class</label>
                                <Select>
                                    <SelectTrigger className="bg-white"><SelectValue placeholder="Select Option" /></SelectTrigger>
                                    <SelectContent><SelectItem value="1">Class 1</SelectItem></SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Section</label>
                                <Select>
                                    <SelectTrigger className="bg-white"><SelectValue placeholder="Select Option" /></SelectTrigger>
                                    <SelectContent><SelectItem value="A">A</SelectItem></SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 flex-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Student Disable Status</label>
                                <div className="flex gap-4">
                                    <Select>
                                        <SelectTrigger className="bg-white w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-4">
                                <label className="text-sm font-medium text-gray-700">Search by Keyword</label>
                                <div className="flex gap-4">
                                    <Input placeholder="Search by Admission no, Student Name, Phone" className="bg-white flex-1" />
                                    <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                        <Search className="h-4 w-4 mr-2" /> Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-pink-100">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <span className="text-xl">≡</span> Inactive Students List
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
                            <Table className="w-full min-w-[1500px]">
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="w-12 font-bold text-gray-700">#</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">ADMISSION NO.</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">BIOMETRIC ID</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">ROLL NUMBER</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">NAME</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">CLASS</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">DATE OF BIRTH</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">MOBILE NUMBER</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">GENDER</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">FATHER NAME</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">GUARDIAN PHONE</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">STATUS</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">NOTE</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">DATE OF LEAVING</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">TC STATUS</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs">INACTIVATION DATE</TableHead>
                                        <TableHead className="font-bold text-gray-700 text-xs text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { id: 1, admNo: "KSV 417", bioId: "1256398", roll: "3", name: "OM Jain", class: "7th C", dob: "12-11-1999", mobile: "9772119901", gender: "Male", father: "Al Jain", gPhone: "51646546554", status: "S", note: "", leaving: "", tc: "Not Generated", inactive: "09-10-2025 05:11 PM" },
                                        { id: 2, admNo: "560", bioId: "", roll: "", name: "Hend Maftah", class: "1st A", dob: "22-07-2021", mobile: "1010101010", gender: "Female", father: "Mo", gPhone: "1010101", status: "", note: "", leaving: "", tc: "Not Generated", inactive: "04-09-2025 11:05 AM" },
                                        { id: 3, admNo: "BIM 7", bioId: "", roll: "", name: "Kay", class: "3rd A", dob: "04-06-2024", mobile: "", gender: "Male", father: "", gPhone: "09-8000060", status: "New", note: "Reason for health", leaving: "15-10-2025", tc: "Not Generated", inactive: "15-10-2025 01:54 PM" },
                                        { id: 4, admNo: "Net 100001", bioId: "", roll: "", name: "Linn Linn", class: "Zumba Class", dob: "01-10-2020", mobile: "09123456789", gender: "Male", father: "U Aye Aye", gPhone: "09123456789", status: "testwe", note: "-", leaving: "01-10-2025", tc: "Not Generated", inactive: "22-10-2025 10:07 AM" },
                                    ].map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell className="text-xs">{row.admNo}</TableCell>
                                            <TableCell className="text-xs">{row.bioId}</TableCell>
                                            <TableCell className="text-xs">{row.roll}</TableCell>
                                            <TableCell className="text-xs text-blue-600 font-medium cursor-pointer">{row.name}</TableCell>
                                            <TableCell className="text-xs">{row.class}</TableCell>
                                            <TableCell className="text-xs whitespace-nowrap">{row.dob}</TableCell>
                                            <TableCell className="text-xs">{row.mobile}</TableCell>
                                            <TableCell className="text-xs">{row.gender}</TableCell>
                                            <TableCell className="text-xs">{row.father}</TableCell>
                                            <TableCell className="text-xs">{row.gPhone}</TableCell>
                                            <TableCell className="text-xs">{row.status}</TableCell>
                                            <TableCell className="text-xs">{row.note}</TableCell>
                                            <TableCell className="text-xs">{row.leaving}</TableCell>
                                            <TableCell className="text-xs">{row.tc}</TableCell>
                                            <TableCell className="text-xs">{row.inactive}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] h-7 text-xs px-2">
                                                            Action <ChevronDown className="h-3 w-3 ml-1" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Activate</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                            <div>Showing 1 to 4 of 4 entries</div>
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
