"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function StudentDetails() {
    return (
        <DashboardLayout title="Student Details">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <Search className="h-5 w-5" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-red-500">Class *</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Section A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Search by Keyword</Label>
                                <Input placeholder="Search by Admission no, Student Name, Phone" className="bg-white border-gray-200" />
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex justify-end w-full md:w-2/3 pr-6">
                                <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                    <Search className="h-4 w-4 mr-2" /> Search
                                </Button>
                            </div>
                            <div className="flex justify-end w-full md:w-1/3">
                                <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                    <Search className="h-4 w-4 mr-2" /> Search
                                </Button>
                            </div>
                        </div>
                        {/* Note: The screenshot implies two separate search areas or buttons, one for Class/Section and one for Keyword.
                             I've positioned them roughly as shown. Ideally, they trigger different searches. */}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
