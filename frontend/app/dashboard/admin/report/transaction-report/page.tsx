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
import { FileText, Search } from "lucide-react"

export default function TransactionReport() {
    return (
        <DashboardLayout title="Transaction Report">
            <div className="space-y-6">
                <div className="flex items-center justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-blue-900">Report</span>
                        <span>/</span>
                        <span>Transaction Report</span>
                    </span>
                </div>

                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="space-y-2">
                                <Label>Staff</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="staff1">Staff 1</SelectItem>
                                        <SelectItem value="staff2">Staff 2</SelectItem>
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
                                        <SelectItem value="card">Card</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" className="bg-white border-gray-200" defaultValue="2025-12-15" />
                            </div>

                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" className="bg-white border-gray-200" defaultValue="2025-12-15" />
                            </div>

                            <div className="space-y-2">
                                <Label>Session</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025-26">2025-26</SelectItem>
                                        <SelectItem value="2024-25">2024-25</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">
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
