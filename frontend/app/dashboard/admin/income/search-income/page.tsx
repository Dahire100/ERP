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

export default function SearchIncome() {
    return (
        <DashboardLayout title="Income Search">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="incomeHead">Income Head</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="head1">Head 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateFrom">Date Form</Label>
                                <Input
                                    id="dateFrom"
                                    type="date"
                                    defaultValue="2025-11-24"
                                    className="bg-gray-100 border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateTo">Date To</Label>
                                <Input
                                    id="dateTo"
                                    type="date"
                                    defaultValue="2025-11-24"
                                    className="bg-gray-100 border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    placeholder="Search by Income"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="flex-1"></div> {/* Spacer */}
                            <div className="flex gap-4">
                                <Button className="bg-blue-900 hover:bg-blue-800">
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                                <Button className="bg-blue-900 hover:bg-blue-800">
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
