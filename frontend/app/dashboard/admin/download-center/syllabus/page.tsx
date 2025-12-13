"use client"

<<<<<<< HEAD
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
=======
import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
<<<<<<< HEAD
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
import { Search, Download, FileText, Menu } from "lucide-react"

const sampleData = [
    { id: 1, title: "Eng syllabus for class 6", type: "Syllabus", date: "02-01-2025", forStaff: "Yes", class: "6th", subject: "" },
    { id: 2, title: "Syallabus", type: "Syllabus", date: "05-12-2025", forStaff: "Yes", class: "", subject: "" },
]

export default function SyllabusPage() {
    return (
        <DashboardLayout title="Download Center / Syllabus">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold text-[#1a237e]">
                    <FileText className="h-6 w-6" />
                    <h1>Syllabus</h1>
                </div>

                {/* Select Criteria */}
                <Card className="shadow-sm">
                    <CardHeader className="bg-pink-50/50 pb-4 border-b">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Class
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Section
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A">Section A</SelectItem>
                                        <SelectItem value="B">Section B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Subject
                                </Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/10">
                                        <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="maths">Maths</SelectItem>
                                        <SelectItem value="english">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2 px-6">
                                <Search className="h-4 w-4" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Syllabus List */}
                <Card className="shadow-sm">
                    <CardHeader className="bg-pink-50/50 border-b pb-4">
                        <CardTitle className="text-base font-bold flex items-center justify-between text-[#1a237e]">
                            <div className="flex items-center gap-2">
                                <Menu className="h-4 w-4" /> Syllabus List
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-8 bg-[#1a237e] text-white hover:bg-[#1a237e]/90 hover:text-white"><Download className="h-4 w-4 mr-2" /> Export</Button>
                                <Button variant="outline" size="sm" className="h-8">Column visibility</Button>
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
                                        <TableHead className="font-bold text-foreground">CONTENT TITLE</TableHead>
                                        <TableHead className="font-bold text-foreground">CONTENT TYPE</TableHead>
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
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.forStaff}</TableCell>
                                            <TableCell>{item.class}</TableCell>
                                            <TableCell>{item.subject}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 h-8">
                                                    Action
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing 1 to {sampleData.length} of {sampleData.length} entries
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button size="sm" className="bg-[#1a237e] text-white">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
=======
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, classSection: "6-A", subject: "Maths", file: "maths-syllabus.pdf" },
    { id: 2, classSection: "7-B", subject: "Science", file: "science-syllabus.pdf" },
]

export default function Syllabus() {
    const [rows, setRows] = useState(sample)
    const [form, setForm] = useState({ classSection: "", subject: "", fileUrl: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.classSection || !form.subject || !form.fileUrl) {
            toast.error("All fields are required")
            return
        }
        setRows([...rows, { id: Date.now(), classSection: form.classSection, subject: form.subject, file: form.fileUrl }])
        toast.success("Syllabus added")
        setForm({ classSection: "", subject: "", fileUrl: "" })
    }

    return (
        <DashboardLayout title="Syllabus">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <FileText className="h-5 w-5" />
                                Upload Syllabus
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Class / Section *</Label>
                                    <Input
                                        value={form.classSection}
                                        onChange={(e) => setForm({ ...form, classSection: e.target.value })}
                                        placeholder="7-B"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Subject *</Label>
                                    <Input
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="Science"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">File URL *</Label>
                                    <Input
                                        value={form.fileUrl}
                                        onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                                        placeholder="https://..."
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg text-gray-800">Syllabus Files</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">File</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.classSection}</TableCell>
                                                <TableCell>{row.subject}</TableCell>
                                                <TableCell className="truncate max-w-xs">{row.file}</TableCell>
                                            </TableRow>
                                        ))}
                                    ))}
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
            </div>
        </DashboardLayout>
    )
}
<<<<<<< HEAD
=======

>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
