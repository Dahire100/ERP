"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileUp, ChevronDown, Download, Trash2, Pencil } from "lucide-react"

const sampleData = [
    { id: 1, title: "Syllabus", type: "Syllabus", date: "05-12-2025", forStaff: "Yes", class: "", subject: "" },
    { id: 2, title: "biology lecture 1st lesson", type: "Video", date: "05-11-2025", forStaff: "No", class: "4th(A)", subject: "biology" },
    { id: 3, title: "Class 4th lecture", type: "Video", date: "05-11-2025", forStaff: "No", class: "4th(A)", subject: "biology" },
    { id: 4, title: "Story", type: "Assignments", date: "24-10-2025", forStaff: "Yes", class: "KG 1st(Section A 1-2)", subject: "English" },
    { id: 5, title: "Story", type: "Assignments", date: "24-10-2025", forStaff: "Yes", class: "KG 1st(Section A 1-2)", subject: "" },
]

export default function UploadContentPage() {
    const [activeTab, setActiveTab] = useState("all")

    return (
        <DashboardLayout title="Download Center / Upload Content">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold text-[#1a237e]">
                    <FileUp className="h-6 w-6" />
                    <h1>Upload Content</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Add Content Form */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardHeader className="bg-pink-50/50 border-b pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                                <FileUp className="h-4 w-4" /> Add Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Content Title
                                </Label>
                                <Input placeholder="" />
                            </div>

                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Content Type
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="assignments">Assignments</SelectItem>
                                        <SelectItem value="study_material">Study Material</SelectItem>
                                        <SelectItem value="syllabus">Syllabus</SelectItem>
                                        <SelectItem value="other_download">Other Download</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Available For
                                </Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="all_staff" />
                                        <label htmlFor="all_staff" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            All Staff Teacher
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="student" />
                                        <label htmlFor="student" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Student
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="subject" />
                                        <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Subject
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Upload Date
                                </Label>
                                <Input type="date" defaultValue="2025-12-13" />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea className="min-h-[100px]" />
                            </div>

                            <div className="space-y-2">
                                <Label>Content File</Label>
                                <Input type="file" />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 w-full md:w-auto">
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upload Content List */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="bg-pink-50/50 border-b pb-4">
                            <CardTitle className="text-base font-bold flex items-center justify-between text-[#1a237e]">
                                <div className="flex items-center gap-2">
                                    <FileUp className="h-4 w-4" /> Upload Content List
                                </div>
                                <Button variant="destructive" size="sm">Bulk Delete</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex gap-1">
                                    {/* Export Buttons placeholder */}
                                    <Button variant="outline" size="sm" className="h-8">Copy</Button>
                                    <Button variant="outline" size="sm" className="h-8">CSV</Button>
                                    <Button variant="outline" size="sm" className="h-8">Excel</Button>
                                    <Button variant="outline" size="sm" className="h-8">Print</Button>
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
                                            <TableHead className="w-[30px]"><Checkbox /></TableHead>
                                            <TableHead className="font-bold text-foreground">CONTENT TITLE</TableHead>
                                            <TableHead className="font-bold text-foreground">TYPE</TableHead>
                                            <TableHead className="font-bold text-foreground">DATE</TableHead>
                                            <TableHead className="font-bold text-foreground">FOR STAFF</TableHead>
                                            <TableHead className="font-bold text-foreground">CLASS</TableHead>
                                            <TableHead className="font-bold text-foreground">SUBJECT</TableHead>
                                            <TableHead className="text-right font-bold text-foreground">ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sampleData.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-muted/50">
                                                <TableCell><Checkbox /></TableCell>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.type}</TableCell>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell>{item.forStaff}</TableCell>
                                                <TableCell>{item.class}</TableCell>
                                                <TableCell>{item.subject}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#1a237e]"><Download className="h-4 w-4" /></Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#1a237e]"><Pencil className="h-4 w-4" /></Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex items-center justify-between space-x-2 py-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing 1 to 5 of 5 entries
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
            </div>
        </DashboardLayout>
    )
}
