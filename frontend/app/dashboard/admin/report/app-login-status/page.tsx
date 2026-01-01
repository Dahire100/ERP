"use client"

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
import { Clock, Search, Settings } from "lucide-react"

export default function AppLoginStatus() {
    return (
        <DashboardLayout title="App Login Status">
            <div className="space-y-6">
                <div className="flex items-center justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="text-blue-900">System Settings</span>
                        <span>/</span>
                        <span>App Login Status</span>
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
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
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>User Type</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select User Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="parent">Parent</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Default" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
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
