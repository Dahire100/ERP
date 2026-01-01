"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, FilePen } from "lucide-react"

export default function StudentUpdate() {
    return (
        <DashboardLayout title="Student Update">
            <div className="flex justify-end mb-4">
                <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <span className="text-[#1e1e50] font-semibold flex items-center gap-1"><FilePen className="h-5 w-5" /> Bulk Update</span>
                        <span className="mx-1">/</span>
                        <span>Student Update</span>
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-pink-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Search className="h-5 w-5 text-gray-600" /> Select Criteria
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-red-500">Class *</label>
                            <Select>
                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select Class" /></SelectTrigger>
                                <SelectContent><SelectItem value="1">Class 1</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-red-500">Section *</label>
                            <Select>
                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select Section" /></SelectTrigger>
                                <SelectContent><SelectItem value="A">A</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white px-6">
                            <Search className="h-4 w-4 mr-2" /> Search
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
