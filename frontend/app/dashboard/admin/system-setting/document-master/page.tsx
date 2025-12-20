"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    Settings,
    Edit2
} from "lucide-react"

interface DocumentItem {
    id: number
    title: string
    belongsTo: string
}

const initialDocuments: DocumentItem[] = [
    { id: 1, title: "Adhaar Card", belongsTo: "Staff" },
    { id: 2, title: "Adhaar Card", belongsTo: "Student" },
    { id: 3, title: "Aman", belongsTo: "Student" },
    { id: 4, title: "NIDA Card Number", belongsTo: "Student" },
    { id: 5, title: "PIP/", belongsTo: "Student" },
    { id: 6, title: "Previous Experience Letter", belongsTo: "Staff" },
    { id: 7, title: "previous year Marksheet", belongsTo: "Student" },
    { id: 8, title: "Test Document", belongsTo: "Staff" },
]

export default function DocumentMasterPage() {
    const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.belongsTo.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Settings className="w-5 h-5 text-primary" />
                    </span>
                    Document Master
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Document Master
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <Edit2 size={18} />
                                Add Document Master
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="doc-title">Document Title <span className="text-red-500">*</span></Label>
                                <Input id="doc-title" placeholder="Enter Document Title" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="belongs-to">Belongs To <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger id="belongs-to">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="text-xs text-red-400 mt-2">
                                *Please avoid using the "/" symbol in the document title.
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <div className="bg-transparent text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                                </div>
                                Document Master List
                            </CardTitle>
                            <Button size="sm" className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90">
                                Bulk Add/Update
                            </Button>
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
                                            <DropdownMenuCheckboxItem checked>Title</DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked>Belongs To</DropdownMenuCheckboxItem>
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
                                            <TableHead>TITLE</TableHead>
                                            <TableHead>BELONGS TO</TableHead>
                                            <TableHead className="text-right">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredDocuments.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                    No matching records found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredDocuments.map((doc) => (
                                                <TableRow key={doc.id}>
                                                    <TableCell className="font-medium">{doc.title}</TableCell>
                                                    <TableCell>{doc.belongsTo}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button size="sm" variant="default" className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 gap-1">
                                                                    Action <MoreVertical size={14} />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination would go here if needed, showing simple count for now */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
