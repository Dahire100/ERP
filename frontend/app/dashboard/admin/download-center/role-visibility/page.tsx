"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShieldCheck } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, title: "Algebra Basics", category: "Study Material", role: "Student" },
    { id: 2, title: "Holiday Homework", category: "Assignments", role: "Parent" },
]

export default function RoleVisibility() {
    const [rows, setRows] = useState(sample)
    const [form, setForm] = useState({ content: "", role: "" })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.content || !form.role) {
            toast.error("Select content and role")
            return
        }
        setRows([...rows, { id: Date.now(), title: form.content, category: "Custom", role: form.role }])
        toast.success("Visibility updated")
        setForm({ content: "", role: "" })
    }

    return (
        <DashboardLayout title="Role-wise Visibility">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <ShieldCheck className="h-5 w-5" />
                                Set Visibility
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Content *</Label>
                                    <Select value={form.content} onValueChange={(val) => setForm({ ...form, content: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Algebra Basics">Algebra Basics</SelectItem>
                                            <SelectItem value="Holiday Homework">Holiday Homework</SelectItem>
                                            <SelectItem value="Science Syllabus">Science Syllabus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Visible To *</Label>
                                    <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Student">Student</SelectItem>
                                            <SelectItem value="Teacher">Teacher</SelectItem>
                                            <SelectItem value="Parent">Parent</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                            <CardTitle className="text-lg text-gray-800">Visibility Matrix</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Content</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Category</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Visible To</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.role}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

