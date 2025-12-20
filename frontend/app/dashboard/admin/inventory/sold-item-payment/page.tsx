"use client"

// Re-saving to clear Turbopack cache error
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
import { Search, List, Download, FileText, Printer, Grid, Columns } from "lucide-react"

export default function SoldItemPaymentPage() {
    return (
        <DashboardLayout title="Sold Item Payments">
            <div className="space-y-6">
                {/* Select Criteria */}
                <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                    <CardHeader className="bg-pink-50/50 pb-4 border-b">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Mode
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Start Date
                                </Label>
                                <Input type="date" placeholder="Enter Start Date" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    End Date
                                </Label>
                                <Input type="date" placeholder="Enter Start Date" className="bg-muted/10 h-10" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2 px-6 rounded-full">
                                <Search className="h-4 w-4" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sold Item Payments List */}
                <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                    <CardHeader className="bg-pink-50/50 border-b pb-4">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <List className="h-4 w-4" /> Sold Item Payments List
                        </CardTitle>
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
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SOLD ITEM RECEIPT NO.</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">MODE</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ACCOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SOLD TO</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">REMARKS</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DATE</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DISCOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">AMOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">RETURN AMOUNT</TableHead>
                                        <TableHead className="font-bold text-[#1a237e] whitespace-nowrap text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { r: "#133", mode: "Cash", acc: "-", sold: "Test 1002 SJ User (1002) [ BCA 25-28-A ]", remark: "", date: "28-10-2025", disc: "0", amt: "1", ret: "0" }
                                    ].map((row, i) => (
                                        <TableRow key={i} className="hover:bg-muted/50">
                                            <TableCell className="font-medium text-[#1a237e]">{row.r}</TableCell>
                                            <TableCell>{row.mode}</TableCell>
                                            <TableCell>{row.acc}</TableCell>
                                            <TableCell className="max-w-[200px]">{row.sold}</TableCell>
                                            <TableCell>{row.remark}</TableCell>
                                            <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                                            <TableCell>{row.disc}</TableCell>
                                            <TableCell>{row.amt}</TableCell>
                                            <TableCell>{row.ret}</TableCell>
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
                                Showing 1 to 1 of 1 entries
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button size="sm" className="bg-[#1a237e] text-white">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
