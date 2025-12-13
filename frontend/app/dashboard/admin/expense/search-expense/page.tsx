"use client"

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
import { Search } from "lucide-react"

export default function ExpenseSearch() {
    return (
        <DashboardLayout title="Expense Search">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Expense Head</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Payment Mode</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date Form</Label>
                                    <Input defaultValue="12-12-2025" className="bg-white border-gray-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date To</Label>
                                    <Input defaultValue="12-12-2025" className="bg-white border-gray-200" />
                                    <div className="flex justify-end pt-1">
                                        <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                            <Search className="h-3 w-3 mr-2" /> Search
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-start-4 space-y-2">
                                    <Label>Search</Label>
                                    <Input placeholder="Search by Expense" className="bg-white border-gray-200" />
                                    <div className="flex justify-end pt-1">
                                        <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                            <Search className="h-3 w-3 mr-2" /> Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
