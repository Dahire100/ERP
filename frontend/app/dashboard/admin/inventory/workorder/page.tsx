"use client"

// Re-saving to attempt to clear Turbopack cache error
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
import { List, Download, FileText, Printer, Grid, Columns, Plus, ShoppingCart } from "lucide-react"

export default function WorkOrderPage() {
    return (
        <DashboardLayout title="Work Order">
            <Card className="shadow-sm border-t-4 border-t-[#1a237e]">
                <CardHeader className="bg-pink-50/50 border-b pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                        <List className="h-4 w-4" /> Workorder List
                    </CardTitle>
                    <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2">
                        <Plus className="h-4 w-4" /> Add Workorder
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
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ORDER REF ID</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ORDER NAME</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SUPPLIER</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DATE</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">RECEIVED</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">PAID AMOUNT</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DUE AMOUNT</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">TOTAL</TableHead>
                                    <TableHead className="font-bold text-[#1a237e] whitespace-nowrap text-right">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { id: "28", name: "ODD", supplier: "Kahan traders", date: "09-10-2025", received: true, paid: "0", due: "1800", total: "1800" },
                                    { id: "27", name: "test 11", supplier: "Rushda Supermarket", date: "25-09-2025", received: false, paid: "400", due: "1600", total: "2000" },
                                    { id: "26", name: "test", supplier: "Sands Medical Store", date: "24-09-2025", received: false, paid: "0", due: "2000", total: "2000" },
                                    { id: "25", name: "Books orader", supplier: "Sachin Deora", date: "24-09-2025", received: true, paid: "0", due: "120", total: "120" },
                                    { id: "24", name: "1", supplier: "Ndovu Shop", date: "23-09-2025", received: true, paid: "0", due: "590", total: "590" },
                                ].map((row, i) => (
                                    <TableRow key={i} className="hover:bg-muted/50">
                                        <TableCell className="text-[#1a237e]">{row.id}</TableCell>
                                        <TableCell className="text-[#1a237e]">{row.name}</TableCell>
                                        <TableCell>{row.supplier}</TableCell>
                                        <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                                        <TableCell>
                                            {row.received && <ShoppingCart className="h-4 w-4 text-[#1a237e]" />}
                                        </TableCell>
                                        <TableCell>{row.paid}</TableCell>
                                        <TableCell>{row.due}</TableCell>
                                        <TableCell>{row.total}</TableCell>
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
                            Showing 1 to 10 of 28 entries
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button size="sm" className="bg-[#1a237e] text-white">1</Button>
                            <Button variant="outline" size="sm">2</Button>
                            <Button variant="outline" size="sm">3</Button>
                            <Button variant="outline" size="sm">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    )
}
