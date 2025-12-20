"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, List, Download, FileText, Printer, Grid, Columns } from "lucide-react"

export default function ItemStorePage() {
    return (
        <DashboardLayout title="Item Store">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column: Add / Edit Form */}
                <div className="w-full xl:w-[400px] flex-shrink-0">
                    <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
                        <CardHeader className="bg-pink-50/50 py-4 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <Pencil className="h-4 w-4" />
                                Add / Edit Item Store
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Item Store <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter Item Store Name" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Code <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter Stock Code" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Description
                                </Label>
                                <Textarea className="bg-muted/10 min-h-[100px]" />
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
                                Item Store List
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
                                            <TableHead className="font-bold text-[#1a237e] w-[60px]">ID</TableHead>
                                            <TableHead className="font-bold text-[#1a237e]">ITEM STORE</TableHead>
                                            <TableHead className="font-bold text-[#1a237e]">ITEM STOCK CODE</TableHead>
                                            <TableHead className="font-bold text-[#1a237e]">DESCRIPTION</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] w-[100px] text-right">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: 1, store: "test", code: "2222" },
                                            { id: 2, store: "Tie", code: "01" },
                                            { id: 3, store: "Books", code: "02" },
                                            { id: 4, store: "Belt", code: "03" },
                                            { id: 5, store: "bags", code: "001" },
                                            { id: 7, store: "Test", code: "221", desc: "dewed" },
                                        ].map((row) => (
                                            <TableRow key={row.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">{row.id}</TableCell>
                                                <TableCell>{row.store}</TableCell>
                                                <TableCell>{row.code}</TableCell>
                                                <TableCell>{row.desc || ""}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
