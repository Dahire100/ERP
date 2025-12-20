"use client"

// Re-saving to clear Turbopack cache error
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Pencil, List, Download, FileText, Printer, Grid, Columns } from "lucide-react"

export default function WorkOrderPaymentPage() {
    return (
        <DashboardLayout title="Workorder Payments">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column: Form */}
                <div className="w-full xl:w-[400px] flex-shrink-0">
                    <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
                        <CardHeader className="bg-pink-50/50 py-4 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <Pencil className="h-4 w-4" />
                                Workorder Payments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Workorder <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wo1">Workorder 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Account Type
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="type1">Type 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Account Name
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc1">Account 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Remaining Amount <span className="text-red-500">*</span>
                                </Label>
                                <div className="bg-muted/20 h-10 flex items-center px-3 rounded-md text-sm text-muted-foreground">
                                    Remaining Amount
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Amount <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter Amount" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Payment Mode <span className="text-red-500">*</span>
                                </Label>
                                <Select defaultValue="cash">
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="cheque">Cheque</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Date
                                </Label>
                                <Input type="date" defaultValue="2025-12-15" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Description
                                </Label>
                                <Textarea className="bg-muted/10 min-h-[80px]" />
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
                                Workorder Payments List
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
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">WORKORDER</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">AMOUNT</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">MODE</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DATE</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DESCRIPTION</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap text-right">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { wo: "NEW WORK ORDER (19)", amt: "1000", mode: "Cash", date: "14-10-2024", desc: "" },
                                            { wo: "NEW WORK ORDER (19)", amt: "2000", mode: "Cheque", date: "14-10-2024", desc: "" },
                                            { wo: "NEW WORK ORDER (19)", amt: "17000", mode: "Online", date: "14-10-2024", desc: "" },
                                            { wo: "Nikhil (3)", amt: "100", mode: "Cash", date: "15-06-2023", desc: "Testing" },
                                            { wo: "Nikhil (3)", amt: "50", mode: "Cash", date: "14-06-2023", desc: "asdfghjklerty" },
                                            { wo: "test (1)", amt: "10", mode: "Cash", date: "28-02-2024", desc: "" },
                                            { wo: "test (1)", amt: "500", mode: "Cheque", date: "23-09-2025", desc: "" },
                                            { wo: "test (2)", amt: "4", mode: "Online", date: "26-05-2025", desc: "" },
                                            { wo: "test (13)", amt: "600", mode: "Cash", date: "04-08-2025", desc: "test" },
                                        ].map((row, i) => (
                                            <TableRow key={i} className="hover:bg-muted/50">
                                                <TableCell className="font-medium text-[#1a237e]">{row.wo}</TableCell>
                                                <TableCell>{row.amt}</TableCell>
                                                <TableCell>{row.mode}</TableCell>
                                                <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                                                <TableCell>{row.desc}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">Action</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing 1 to 10 of 14 entries
                                </div>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button size="sm" className="bg-[#1a237e] text-white">1</Button>
                                    <Button variant="outline" size="sm">2</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
