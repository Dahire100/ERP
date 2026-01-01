"use client"

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
import { Pencil, List, Download, FileText, Printer, Grid, Columns, Plus, Minus, Search } from "lucide-react"

export default function AddItemStockPage() {
    return (
        <DashboardLayout title="Add Item Stock">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column: Add Item Stock Form */}
                <div className="w-full xl:w-[400px] flex-shrink-0">
                    <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
                        <CardHeader className="bg-pink-50/50 py-4 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <Pencil className="h-4 w-4" />
                                Add Item Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Item Category <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cat1">Category 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Item Sub Category <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sub1">Sub Category 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Item <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="item1">Item 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Supplier <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sup1">Supplier 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Store <span className="text-red-500">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10 h-10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="store1">Store 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Available Quantity
                                </Label>
                                <div className="bg-muted/20 h-10 flex items-center px-3 rounded-md text-sm">
                                    0
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Quantity <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex items-center">
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-r-none border-r-0">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Input className="h-10 rounded-none text-center" />
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-l-none border-l-0">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <Input type="date" defaultValue="2025-12-15" className="bg-muted/10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Attach Document
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Button variant="secondary" className="bg-blue-900 text-white hover:bg-blue-800">Choose File</Button>
                                    <span className="text-sm text-muted-foreground">No file chosen</span>
                                </div>
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
                        <CardHeader className="bg-pink-50/50 py-4 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <List className="h-4 w-4" />
                                Add Item Stock List
                            </CardTitle>
                            <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2">
                                Add Item Stock in Bulk
                            </Button>
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
                                    <div className="flex items-center gap-2 ml-2">
                                        <span className="text-sm">75</span>
                                        <div className="flex flex-col">
                                            <Button variant="ghost" size="icon" className="h-2 w-4"><Plus className="h-2 w-2" /></Button>
                                            <Button variant="ghost" size="icon" className="h-2 w-4"><Minus className="h-2 w-2" /></Button>
                                        </div>
                                    </div>
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
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM NAME</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM CATEGORY</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM SUB CATEGORY</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM SUPPLIER</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM STORE</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">QUANTITY</TableHead>
                                            <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">DATE</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            {
                                                name: "natraj pencil",
                                                cat: "Pre-Vocation",
                                                sub: "Girls",
                                                supp: "test",
                                                store: "test",
                                                qty: "-1",
                                                date: "05-12-2025"
                                            },
                                            {
                                                name: "Milkshake",
                                                cat: "Lunch",
                                                sub: "Snack",
                                                supp: "Google Store",
                                                store: "Snack",
                                                qty: "+10",
                                                date: "17-10-2025"
                                            },
                                            {
                                                name: "Gen11",
                                                cat: "School Laptop",
                                                sub: "HP",
                                                supp: "KMD",
                                                store: "Laptop",
                                                qty: "+10",
                                                date: "17-10-2025"
                                            },
                                            {
                                                name: "Shirt",
                                                cat: "School Uniform",
                                                sub: "Size-42",
                                                supp: "Kahan traders",
                                                store: "Store room 1",
                                                qty: "+100",
                                                date: "09-10-2025"
                                            },
                                            {
                                                name: "sasa",
                                                cat: "Tie",
                                                sub: "Jhs Tie",
                                                supp: "Sokoni Dastan Maleo",
                                                store: "Uniform",
                                                qty: "+3",
                                                date: "25-09-2025"
                                            },
                                            {
                                                name: "natraj pencil",
                                                cat: "Pre-Vocation",
                                                sub: "Girls",
                                                supp: "test",
                                                store: "test",
                                                qty: "+1",
                                                date: "25-09-2025"
                                            },
                                            {
                                                name: "জানবো এবার অজানাকে, part ক, Little nobo Bharati prakashioni",
                                                cat: "Books",
                                                sub: "V",
                                                supp: "",
                                                store: "",
                                                qty: "-1",
                                                date: "25-09-2025"
                                            },
                                            {
                                                name: "Pencil",
                                                cat: "Stationary",
                                                sub: "pen",
                                                supp: "Rushda Supermarket",
                                                store: "Fruits",
                                                qty: "-2",
                                                date: "25-09-2025"
                                            }
                                        ].map((row, i) => (
                                            <TableRow key={i} className="hover:bg-muted/50">
                                                <TableCell className="font-medium align-top max-w-[200px] whitespace-normal">{row.name}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.cat}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.sub}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.supp}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.store}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.qty}</TableCell>
                                                <TableCell className="align-top whitespace-nowrap">{row.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing 1 to 10 of 77 entries
                                </div>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>&lt;</Button>
                                    <Button size="sm" className="h-8 w-8 p-0 bg-[#1a237e] text-white hover:bg-[#1a237e]/90">1</Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
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
