"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, HandCoins } from "lucide-react"
import { useState } from "react"

export default function PayrollPage() {
    const [role, setRole] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("2025")

    return (
        <DashboardLayout title="Payroll">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><HandCoins className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Payroll</span>
                </div>

                {/* Select Criteria Card */}
                <Card className="border-t-4 border-t-pink-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Month <span className="text-red-500">*</span></Label>
                                <Select value={month} onValueChange={setMonth}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="january">January</SelectItem>
                                        <SelectItem value="february">February</SelectItem>
                                        <SelectItem value="december">December</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Year <span className="text-red-500">*</span></Label>
                                <Select value={year} onValueChange={setYear}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                <Search className="h-4 w-4 mr-2" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </DashboardLayout>
    )
}
