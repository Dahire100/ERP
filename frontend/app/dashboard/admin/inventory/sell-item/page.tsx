"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Search, List, Download, FileText, Printer, Grid, Columns } from "lucide-react"

export default function SellItemPage() {
    return (
        <DashboardLayout title="Sell Item">
            <div className="space-y-6">
                {/* Select Criteria */}
                <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                    <CardHeader className="bg-pink-50/50 pb-4 border-b">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Sell By
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user1">User 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Start Date
                                </Label>
                                <Input type="date" defaultValue="2025-04-01" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    End Date
                                </Label>
                                <Input type="date" defaultValue="2026-03-31" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Filter
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select Filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="filter1">Filter 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2 px-6 rounded-full">
                                <Search className="h-4 w-4" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sell Item List */}
                <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                    <CardHeader className="bg-pink-50/50 border-b pb-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <List className="h-4 w-4" /> Sell Item List
                        </CardTitle>
                        <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white">
                            Add Sell Item
                        </Button>
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
                                        <SelectItem value="25">25</SelectItem>
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
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">RECEIPT NO</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SELL TO</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ADMISSION NO.</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SELL DATE</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SELL BY</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DISCOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">BALANCE AMOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">PAID AMOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">STATUS</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { r: "Receipt No 134", to: "Pihu Jain (7th C)", adm: "KSV 416", date: "28-10-2025", by: "Demo User", disc: "0", bal: "250", paid: "0", status: "Unpaid" },
                                        { r: "Receipt No 133", to: "Test 1002 SJ User", adm: "PNGWing/ 1002", date: "28-10-2025", by: "Nlet Initiatives", disc: "0", bal: "392", paid: "8", status: "Partially Paid" },
                                        { r: "Receipt No 130", to: "Demo User", adm: "", date: "17-10-2025", by: "Super Admin", disc: "0", bal: "0", paid: "700", status: "Paid" },
                                        { r: "Receipt No 129", to: "Rio (Primary E)", adm: "NELC 5002", date: "17-10-2025", by: "Super Admin", disc: "0", bal: "0", paid: "36000", status: "Paid" },
                                        { r: "Receipt No 128", to: "Pihu Jain (7th C)", adm: "KSV 416", date: "09-10-2025", by: "Demo User", disc: "0", bal: "0", paid: "0", status: "Unpaid" },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="hover:bg-muted/50">
                                            <TableCell className="font-medium whitespace-nowrap text-[#1a237e]">{row.r}</TableCell>
                                            <TableCell>{row.to}</TableCell>
                                            <TableCell>{row.adm}</TableCell>
                                            <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                                            <TableCell>{row.by}</TableCell>
                                            <TableCell>{row.disc}</TableCell>
                                            <TableCell>{row.bal}</TableCell>
                                            <TableCell>{row.paid}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`
                            hover:bg-opacity-80
                            ${row.status === 'Unpaid' ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''}
                            ${row.status === 'Partially Paid' ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : ''}
                            ${row.status === 'Paid' ? 'bg-green-100 text-green-600 hover:bg-green-200' : ''}
                          `}
                                                    variant="secondary"
                                                >
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="font-bold border-t-2">
                                        <TableCell colSpan={5}>TOTAL</TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell>1272</TableCell>
                                        <TableCell>37208</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
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
