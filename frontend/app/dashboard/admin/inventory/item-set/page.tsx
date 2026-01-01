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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, List, Download, Search, FileText, Printer, Grid, Columns } from "lucide-react"

export default function ItemSetPage() {
    return (
        <DashboardLayout title="Item Set">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column: Add / Edit Form */}
                <div className="w-full xl:w-[400px] flex-shrink-0">
                    <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
                        <CardHeader className="bg-pink-50/50 py-4 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <Pencil className="h-4 w-4" />
                                Add / Edit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Item Set <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter Name" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Select Item <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select Option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="item1">Item 1</SelectItem>
                                        <SelectItem value="item2">Item 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white min-w-[80px]">
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="flex-1">
                    <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
                        <CardHeader className="bg-pink-50/50 py-4 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <List className="h-4 w-4" />
                                Item Set List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {/* Table Toolbar */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                                        <Printer className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 text-[#1a237e] border-[#1a237e]/20 gap-2">
                                        <Columns className="h-3 w-3" />
                                        Column visibility
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Search:</span>
                                    <Input className="h-8 w-[150px] lg:w-[200px]" />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader className="bg-pink-50/50">
                                        <TableRow>
                                            <TableHead className="font-bold text-[#1a237e] w-[200px]">ITEM SET</TableHead>
                                            <TableHead className="font-bold text-[#1a237e]">ITEM</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] w-[100px] text-right">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableCell className="font-medium align-top">1st Class</TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <div>natraj pencil x 1</div>
                                                    <div>Belt x 1</div>
                                                    <div>sasa x 1</div>
                                                    <div>ABC-Item x 1</div>
                                                    <div>Uniform x 1</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right align-top">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableCell className="font-medium align-top">10th</TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <div>Diary x 20</div>
                                                    <div>I-card x 20</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right align-top">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableCell className="font-medium align-top">welcome kit</TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <div>Diary x 1</div>
                                                    <div>I-card x 1</div>
                                                    <div>uniform x 1</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right align-top">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing 1 to 10 of 17 entries
                                </div>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>&lt;</Button>
                                    <Button size="sm" className="h-8 w-8 p-0 bg-[#1a237e] text-white hover:bg-[#1a237e]/90">1</Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">&gt;</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
