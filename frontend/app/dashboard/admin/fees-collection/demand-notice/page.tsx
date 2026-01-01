"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export default function DemandNotice() {
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedSection, setSelectedSection] = useState("")
    const [noticeType, setNoticeType] = useState("")

    return (
        <DashboardLayout title="Demand Notice">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="class" className="text-red-500">Class *</Label>
                                <Select value={selectedClass} onValueChange={setSelectedClass}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                        <SelectItem value="3">Class 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="section" className="text-red-500">Section *</Label>
                                <Select value={selectedSection} onValueChange={setSelectedSection}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Section A</SelectItem>
                                        <SelectItem value="B">Section B</SelectItem>
                                        <SelectItem value="C">Section C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="noticeType" className="text-red-500">Notice Type *</Label>
                                <Select value={noticeType} onValueChange={setNoticeType}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="overdue">Overdue Fees</SelectItem>
                                        <SelectItem value="warning">Warning Notice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white px-6">
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
