"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Download, Calendar } from "lucide-react"

export default function FeeFollowUp() {
    const [classSelect, setClassSelect] = useState("")
    const [sectionSelect, setSectionSelect] = useState("")
    const [filterSelect, setFilterSelect] = useState("parent-wise")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [tillDate, setTillDate] = useState("2025-12-12") // Default from screenshot
    const [minBalance, setMinBalance] = useState("")
    const [maxBalance, setMaxBalance] = useState("")
    const [minPaid, setMinPaid] = useState("")
    const [maxPaid, setMaxPaid] = useState("")

    return (
        <DashboardLayout title="Fee Follow Up">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Row 1 */}
                            <div className="space-y-2">
                                <Label htmlFor="class">Class</Label>
                                <Select value={classSelect} onValueChange={setClassSelect}>
                                    <SelectTrigger className="bg-white border-gray-200 text-gray-500">
                                        <SelectValue placeholder="Select Option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="section">Section</Label>
                                <Select value={sectionSelect} onValueChange={setSectionSelect}>
                                    <SelectTrigger className="bg-white border-gray-200 text-gray-500">
                                        <SelectValue placeholder="Select Option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Section A</SelectItem>
                                        <SelectItem value="B">Section B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="filter">Filter</Label>
                                <Select value={filterSelect} onValueChange={setFilterSelect}>
                                    <SelectTrigger className="bg-white border-gray-200 text-blue-900">
                                        <SelectValue placeholder="Select Option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="parent-wise">Parent Wise</SelectItem>
                                        <SelectItem value="student-wise">Student Wise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Row 2 - Dates */}
                            <div className="space-y-2 relative">
                                <Label htmlFor="startDate">Start Date <Calendar className="h-3 w-3 inline ml-1" /></Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="endDate">End Date <Calendar className="h-3 w-3 inline ml-1" /></Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="tillDate">Till Date <Calendar className="h-3 w-3 inline ml-1" /></Label>
                                <Input // This might need to be text input to match screenshot exactly, but date is more semantic. Screenshot shows "12-12-2025" and calendar icon.
                                    // Using text input to allow exact match or date input if user prefers functionality.
                                    // Screenshot shows simple text box look with calendar icon in label usually implies date picker.
                                    // For exact visual match of "12-12-2025" placeholder/value:
                                    id="tillDate"
                                    type="text"
                                    value={tillDate}
                                    onChange={(e) => setTillDate(e.target.value)}
                                    className="bg-white border-gray-200 text-blue-900"
                                />
                            </div>

                            {/* Row 3 - Amounts */}
                            <div className="space-y-2">
                                <Label htmlFor="minBalance">Min Balance Amount</Label>
                                <Input
                                    id="minBalance"
                                    value={minBalance}
                                    onChange={(e) => setMinBalance(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxBalance">Max Balance Amount</Label>
                                <Input
                                    id="maxBalance"
                                    value={maxBalance}
                                    onChange={(e) => setMaxBalance(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            {/* Row 4 - Paid Amounts (actually mixed in row 3 in 2-col visual or 4-col) */}
                            {/* The screenshot shows 4 items in the bottom row: Min Bal, Max Bal, Min Paid, Max Paid */}
                            {/* But the grid above is 3 cols. Let's adjust the grid.
                                Screenshot layout:
                                Row 1: Class, Section, Filter
                                Row 2: Start Date, End Date, Till Date
                                Row 3: Min Bal, Max Bal, Min Paid, Max Paid -> This row has 4 items.
                             */}
                        </div>

                        {/* Adjusting grid for the last row to be 4 columns if possible or just part of the same grid flow */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            <div className="space-y-2">
                                <Label htmlFor="minBalance">Min Balance Amount</Label>
                                <Input
                                    id="minBalance"
                                    value={minBalance}
                                    onChange={(e) => setMinBalance(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxBalance">Max Balance Amount</Label>
                                <Input
                                    id="maxBalance"
                                    value={maxBalance}
                                    onChange={(e) => setMaxBalance(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minPaid">Min Paid Amount</Label>
                                <Input
                                    id="minPaid"
                                    value={minPaid}
                                    onChange={(e) => setMinPaid(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxPaid">Max Paid Amount</Label>
                                <Input
                                    id="maxPaid"
                                    value={maxPaid}
                                    onChange={(e) => setMaxPaid(e.target.value)}
                                    className="bg-white border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                            <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
