"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { List, Download, FileText, Printer, Grid, Columns, Plus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function IssueItemPage() {
    return (
        <DashboardLayout title="Issue Item">
            <div className="space-y-6">
                <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                    <CardHeader className="bg-pink-50/50 border-b pb-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <List className="h-4 w-4" /> Issue Item List
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2">
                                <Plus className="h-4 w-4" /> Issue Item
                            </Button>
                            <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white">
                                Bulk Return
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
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
                                <Select defaultValue="10">
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">Search:</span>
                                <Input className="h-8 w-[150px] lg:w-[200px]" />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-pink-50/50">
                                    <TableRow>
                                        <TableHead className="w-[40px]"><Checkbox /></TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM CATEGORY</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM SUB CATEGORY</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ISSUE - RETURN</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ISSUE TO</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ISSUE BY</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">QUANTITY</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">STATUS</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { item: "Exerice Books", cat: "Books", sub: "V", date: "27-10-2025", to: "Pihu Jain", by: "", qty: "1", status: "Click to return" },
                                        { item: "Gen11", cat: "School Laptop", sub: "HP", date: "17-10-2025", to: "Rio", by: "", qty: "1", status: "Returned" },
                                        { item: "Shirt", cat: "School Uniform", sub: "Size-42", date: "09-10-2025", to: "OM Jain", by: "", qty: "1", status: "Returned" },
                                        { item: "Shirt", cat: "School Uniform", sub: "Size-42", date: "09-10-2025", to: "Pihu Jain", by: "", qty: "1", status: "Click to return" },
                                        { item: "uniform", cat: "uniform", sub: "boys uniform", date: "11-09-2025", to: "lakh asda", by: "", qty: "1", status: "Returned" },
                                        { item: "abc", cat: "bag", sub: "abc", date: "05-09-2025", to: "Channel Partner", by: "", qty: "1", status: "Returned" },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="hover:bg-muted/50">
                                            <TableCell><Checkbox /></TableCell>
                                            <TableCell>{row.item}</TableCell>
                                            <TableCell>{row.cat}</TableCell>
                                            <TableCell>{row.sub}</TableCell>
                                            <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                                            <TableCell>{row.to}</TableCell>
                                            <TableCell>{row.by}</TableCell>
                                            <TableCell>{row.qty}</TableCell>
                                            <TableCell>
                                                {row.status === "Click to return" ? (
                                                    <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white h-7 text-xs">
                                                        Click to return
                                                    </Button>
                                                ) : (
                                                    <span className="text-muted-foreground">{row.status}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing 1 to 10 of 40 entries
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button size="sm" className="bg-[#1a237e] text-white">1</Button>
                                <Button variant="outline" size="sm">2</Button>
                                <Button variant="outline" size="sm">3</Button>
                                <Button variant="outline" size="sm">4</Button>
                                <Button variant="outline" size="sm">Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
