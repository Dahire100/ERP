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
import { Search, Download, BookOpen, Menu } from "lucide-react"

const sampleData = [
    { id: 1, title: "TEST", type: "Study_material", date: "02-01-2025", forStaff: "Yes", class: "", subject: "" },
    { id: 2, title: "TEST", type: "Study_material", date: "02-01-2025", forStaff: "Yes", class: "", subject: "" },
    { id: 3, title: "test", type: "Study_material", date: "26-02-2025", forStaff: "Yes", class: "", subject: "" },
    { id: 4, title: "TEST", type: "Study_material", date: "26-02-2025", forStaff: "Yes", class: "", subject: "" },
    { id: 5, title: "Testing content", type: "Study_material", date: "11-10-2024", forStaff: "Yes", class: "KSV 6th(A)", subject: "" },
]

export default function StudyMaterialPage() {
    return (
        <DashboardLayout title="Download Center / Study Material">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold text-[#1a237e]">
                    <BookOpen className="h-6 w-6" />
                    <h1>Study Material</h1>
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

                {/* Study Materials List */}
                <Card className="shadow-sm">
                    <CardHeader className="bg-pink-50/50 border-b pb-4">
                        <CardTitle className="text-base font-bold flex items-center justify-between text-[#1a237e]">
                            <div className="flex items-center gap-2">
                                <Menu className="h-4 w-4" /> Study Materials List
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
import { BookOpen } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, title: "Algebra Basics", classSection: "7-B", subject: "Maths", file: "algebra.pdf" },
    { id: 2, title: "Photosynthesis Notes", classSection: "6-A", subject: "Science", file: "photosynthesis.pptx" },
]

export default function StudyMaterial() {
    const [rows, setRows] = useState(sample)
    const [form, setForm] = useState({ title: "", classSection: "", subject: "", fileUrl: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title || !form.classSection || !form.subject || !form.fileUrl) {
            toast.error("All fields are required")
            return
        }
        setRows([...rows, { id: Date.now(), title: form.title, classSection: form.classSection, subject: form.subject, file: form.fileUrl }])
        toast.success("Study material added")
        setForm({ title: "", classSection: "", subject: "", fileUrl: "" })
    }

    return (
        <DashboardLayout title="Study Material">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <BookOpen className="h-5 w-5" />
                                Add Material
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Title *</Label>
                                    <Input
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Topic title"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
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
                                        placeholder="Maths"
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
                            <CardTitle className="text-lg text-gray-800">Material List</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Title</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">File</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.classSection}</TableCell>
                                                <TableCell>{row.subject}</TableCell>
                                                <TableCell className="truncate max-w-xs">{row.file}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
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
