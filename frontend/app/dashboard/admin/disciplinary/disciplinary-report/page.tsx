"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileChartColumn, Search } from "lucide-react"

export default function DisciplinaryReportPage() {
    return (
        <DashboardLayout title="Disciplinary / Disciplinary Report">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold text-[#1a237e]">
                    <FileChartColumn className="h-6 w-6" />
                    <h1>Disciplinary Report</h1>
                </div>

                <Card className="shadow-sm">
                    <CardHeader className="bg-pink-50/50 pb-4 border-b">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Class
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Section
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Section A</SelectItem>
                                        <SelectItem value="B">Section B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Month
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="jan">January</SelectItem>
                                        <SelectItem value="feb">February</SelectItem>
                                        <SelectItem value="mar">March</SelectItem>
                                        <SelectItem value="apr">April</SelectItem>
                                        <SelectItem value="may">May</SelectItem>
                                        <SelectItem value="jun">June</SelectItem>
                                        <SelectItem value="jul">July</SelectItem>
                                        <SelectItem value="aug">August</SelectItem>
                                        <SelectItem value="sep">September</SelectItem>
                                        <SelectItem value="oct">October</SelectItem>
                                        <SelectItem value="nov">November</SelectItem>
                                        <SelectItem value="dec">December</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2 px-6">
                                <Search className="h-4 w-4" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
