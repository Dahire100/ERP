"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Plus,
    Search,
    Copy,
    FileSpreadsheet,
    FileText,
    Printer,
    Columns,
    MoreVertical,
    Clock,
    Edit2,
    User
} from "lucide-react"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

interface TimeSlotItem {
    id: number
    name: string
    startTime: string
    endTime: string
}

const initialSlots: TimeSlotItem[] = [
    { id: 1, name: "Evening", startTime: "12:45 pm", endTime: "06:26 pm" },
    { id: 2, name: "Morning", startTime: "08:00 am", endTime: "09:00 am" },
    { id: 3, name: "pushpendra", startTime: "08:15 am", endTime: "03:00 pm" },
    { id: 4, name: "pushpendra", startTime: "08:15 am", endTime: "03:00 pm" },
    { id: 5, name: "REKHA", startTime: "03:16 pm", endTime: "06:16 pm" },
    { id: 6, name: "sachins", startTime: "01:45 pm", endTime: "04:40 pm" },
]

export default function StaffTimeSlotsPage() {
    const { toast } = useToast()
    const [slots, setSlots] = useState<TimeSlotItem[]>(initialSlots)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSlots = slots.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <User className="w-5 h-5 text-primary" />
                    </span>
                    Staff Time Slots
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Staff Time Slots
                </div>
            </div>

            <div className="space-y-6">
                {/* Top: Form */}
                <Card>
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Edit2 size={18} />
                            Add / Edit Time Slots
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input id="name" placeholder="Enter Name" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time <span className="text-red-500">*</span></Label>
                                <Input id="start-time" placeholder="Time" className="bg-muted/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time <span className="text-red-500">*</span></Label>
                                <Input id="end-time" placeholder="Time" className="bg-muted/50" />
                            </div>

                            <div>
                                <Button onClick={() => toast({ title: "Success", description: "Time slot saved successfully!" })} className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 w-full md:w-auto">Save</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom: List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <div className="bg-transparent text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                            </div>
                            Time Slots List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="icon" title="Copy">
                                    <Copy size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="Excel">
                                    <FileSpreadsheet size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="CSV">
                                    <FileText size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="Print">
                                    <Printer size={16} />
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Columns size={16} />
                                            Column visibility
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>Start Time</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>End Time</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>Action</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Search:</span>
                                <Input
                                    className="w-48 sm:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>NAME</TableHead>
                                        <TableHead>START TIME</TableHead>
                                        <TableHead>END TIME</TableHead>
                                        <TableHead className="text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSlots.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No matching records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredSlots.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.startTime}</TableCell>
                                                <TableCell>{item.endTime}</TableCell>
                                                <TableCell className="text-right">
                                                    <ActionMenu
                                                        onEdit={() => toast({ title: "Edit", description: `Editing slot ${item.name}` })}
                                                        onDelete={() => toast({ title: "Delete", description: `Deleting slot ${item.name}`, variant: "destructive" })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
