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
    Edit2
} from "lucide-react"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

interface SessionItem {
    id: number
    name: string
    display: string
    status: string
}

const initialSessions: SessionItem[] = [
    { id: 1, name: "2016-17", display: "2016-17", status: "Inactive" },
    { id: 2, name: "2017-18", display: "2017-18", status: "Inactive" },
    { id: 3, name: "2018-19", display: "2018-19", status: "Inactive" },
    { id: 4, name: "2019-20", display: "2019-20", status: "Inactive" },
    { id: 6, name: "2021-22", display: "2021-22", status: "Inactive" },
    { id: 8, name: "2023-24", display: "2023-24", status: "Inactive" },
    { id: 9, name: "2024-25", display: "2024-25", status: "Inactive" },
    { id: 10, name: "2025-26", display: "2025-26", status: "Active" },
    { id: 11, name: "2026-27", display: "2026-27", status: "Inactive" },
    { id: 12, name: "2027-28", display: "2027-28", status: "Inactive" },
]

export default function SessionSettingPage() {
    const { toast } = useToast()
    const [sessions, setSessions] = useState<SessionItem[]>(initialSessions)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSessions = sessions.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.display.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Clock className="w-5 h-5 text-primary" />
                    </span>
                    Session Setting
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Session Setting
                </div>
            </div>

            <div className="space-y-6">
                {/* Top: Form */}
                <Card>
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Edit2 size={18} />
                            Add / Edit Session Setting
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input id="name" placeholder="Enter session" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="display-name">Display Name <span className="text-red-500">*</span></Label>
                                <Input id="display-name" placeholder="Enter Display Name" />
                            </div>

                            <div className="flex items-end">
                                <Button onClick={() => toast({ title: "Success", description: "Session saved successfully!" })} className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 w-full md:w-auto">Save</Button>
                            </div>
                        </div>

                        <div className="text-xs text-red-500 mt-4 leading-relaxed">
                            *Note : Please enter session name in YYYY-YY format. For eg:- 2024-25, Also you can write display name in any format.
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
                            Session Setting List
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
                                        <DropdownMenuCheckboxItem checked>Display</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
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
                                        <TableHead className="w-[80px]">#</TableHead>
                                        <TableHead>NAME</TableHead>
                                        <TableHead>DISPLAY</TableHead>
                                        <TableHead>STATUS</TableHead>
                                        <TableHead className="text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSessions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                                No matching records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredSessions.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.display}</TableCell>
                                                <TableCell>
                                                    <span className={item.status === "Active" ? "text-green-600" : "text-gray-600"}>
                                                        {item.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <ActionMenu
                                                        onEdit={() => toast({ title: "Edit", description: `Editing session ${item.name}` })}
                                                        onDelete={() => toast({ title: "Delete", description: `Deleting session ${item.name}`, variant: "destructive" })}
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
