"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Plus,
    Search,
    Copy,
    FileSpreadsheet,
    FileText,
    Printer,
    Columns,
    Calendar,
    Edit2
} from "lucide-react"

interface SchoolTimeItem {
    id: number
    srNo: string
    period: string
    class: string
    startTime: string
    endTime: string
}

const initialTimes: SchoolTimeItem[] = [
    { id: 1, srNo: "1", period: "primary", class: "4th,", startTime: "08:00 AM", endTime: "05:00 PM" },
    { id: 2, srNo: "1", period: "1", class: "1st, KSV 6th,", startTime: "06:30 AM", endTime: "07:15 AM" },
    { id: 3, srNo: "2", period: "KG11", class: "First,", startTime: "08:00 AM", endTime: "04:00 PM" },
    { id: 4, srNo: "2", period: "2", class: "1st, KSV 6th,", startTime: "07:00 PM", endTime: "07:45 PM" },
    { id: 5, srNo: "2", period: "2", class: "BCA 1st SEM,", startTime: "09:15 AM", endTime: "10:00 PM" },
    { id: 6, srNo: "3", period: "ABC", class: "abc,", startTime: "10:00 AM", endTime: "04:30 PM" },
    { id: 7, srNo: "3", period: "LUNCH BREAK", class: "BCA 1st SEM,", startTime: "10:00 PM", endTime: "10:30 PM" },
    { id: 8, srNo: "4", period: "4", class: "BCA 1st SEM,", startTime: "10:30 AM", endTime: "11:15 AM" },
]

export default function SchoolTimesPage() {
    const [times, setTimes] = useState<SchoolTimeItem[]>(initialTimes)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredTimes = times.filter(item =>
        item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.period.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Calendar className="w-5 h-5 text-primary" />
                    </span>
                    School Times
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / School Times
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <Edit2 size={18} />
                                Add / Edit School Times
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="class">Class <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger id="class">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st</SelectItem>
                                        <SelectItem value="2nd">2nd</SelectItem>
                                        <SelectItem value="BCA">BCA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sr-no">Sr. No <span className="text-red-500">*</span></Label>
                                <Input id="sr-no" placeholder="Enter Sr. No." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="period">Period <span className="text-red-500">*</span></Label>
                                <Input id="period" placeholder="Enter period" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input id="start-time" type="time" placeholder="Enter start time" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input id="end-time" type="time" placeholder="Enter end time" />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox id="is-break" />
                                <Label htmlFor="is-break" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Is Break</Label>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <div className="bg-transparent text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                                </div>
                                School Times List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="icon" title="Copy">
                                        <Copy size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="Excel">
                                        <FileSpreadsheet size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="CSV">
                                        <FileText size={16} />
                                    </Button>
                                    <Button variant="outline" size="icon" title="Print">
                                        <Printer size={16} />
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <Columns size={16} />
                                                Column visibility
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuCheckboxItem checked>Sr. No</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>Period</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>Class</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>Start Time</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>End Time</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>Action</DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Search:</span>
                                    <Input
                                        className="w-48 sm:w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead>SR. NO</TableHead>
                                            <TableHead>PERIOD</TableHead>
                                            <TableHead>CLASS</TableHead>
                                            <TableHead>START TIME</TableHead>
                                            <TableHead>END TIME</TableHead>
                                            <TableHead className="text-right">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTimes.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                                    No matching records found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredTimes.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.srNo}</TableCell>
                                                    <TableCell>{item.period}</TableCell>
                                                    <TableCell>{item.class}</TableCell>
                                                    <TableCell>{item.startTime}</TableCell>
                                                    <TableCell>{item.endTime}</TableCell>
                                                    <TableCell className="text-right">
                                                        {/* Empty Action Column */}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
