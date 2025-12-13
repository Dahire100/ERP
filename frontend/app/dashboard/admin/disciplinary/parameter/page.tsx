"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, FileText, LayoutGrid, Pencil, Printer, Trash2 } from "lucide-react"

const parameters = [
    { id: 1, name: "Attendence" },
    { id: 2, name: "Attitude" },
    { id: 3, name: "Bhagti" },
    { id: 4, name: "Class" },
    { id: 5, name: "Ethics" },
    { id: 6, name: "Poojan" },
    { id: 7, name: "Pravachan" },
]

export default function ParameterPage() {
    return (
        <DashboardLayout title="Disciplinary / Parameter">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold text-[#1a237e]">
                    <LayoutGrid className="h-6 w-6" />
                    <h1>Parameter</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Add Parameter Form */}
                    <Card className="md:col-span-1 h-fit">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Name
                                </Label>
                                <Input id="name" placeholder="Enter name" className="bg-muted/30" />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white">
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Parameter List */}
                    <Card className="md:col-span-2">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex gap-1 text-muted-foreground text-sm">
                                    <Button variant="outline" size="icon" className="h-8 w-8"><FileText className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><FileText className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><FileText className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Printer className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Search:</span>
                                    <Input className="h-8 w-[200px]" />
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader className="bg-pink-50/50">
                                        <TableRow>
                                            <TableHead className="font-bold text-foreground">NAME</TableHead>
                                            <TableHead className="text-right font-bold text-foreground w-[100px]">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {parameters.map((param) => (
                                            <TableRow key={param.id} className="hover:bg-muted/50">
                                                <TableCell>{param.name}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8 gap-1">
                                                                Action <ChevronDown className="h-3 w-3" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center text-sm text-muted-foreground py-4">
                                                Showing 1 to {parameters.length} of {parameters.length} entries
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
