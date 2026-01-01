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
import { Users2 } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, exam: "Mid Term", class: "1-A", window: "12 Jun 9am - 11am" },
    { id: 2, exam: "Science Quiz", class: "2-B", window: "13 Jun 10am - 10:45am" },
]

export default function AssignExam() {
    const [assignments, setAssignments] = useState(sample)
    const [form, setForm] = useState({ exam: "", classSection: "", window: "" })

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.exam || !form.classSection || !form.window) {
            toast.error("All fields are required")
            return
        }
        setAssignments([...assignments, { id: Date.now(), exam: form.exam, class: form.classSection, window: form.window }])
        toast.success("Exam assigned")
        setForm({ exam: "", classSection: "", window: "" })
    }

    return (
        <DashboardLayout title="Assign Exam">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Users2 className="h-5 w-5" />
                                Assign to Class/Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleAssign} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Exam *</Label>
                                    <Select value={form.exam} onValueChange={(val) => setForm({ ...form, exam: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select exam" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mid Term">Mid Term</SelectItem>
                                            <SelectItem value="Science Quiz">Science Quiz</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Class / Section *</Label>
                                    <Select value={form.classSection} onValueChange={(val) => setForm({ ...form, classSection: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select class-section" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-A">1-A</SelectItem>
                                            <SelectItem value="2-B">2-B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Window *</Label>
                                    <Select value={form.window} onValueChange={(val) => setForm({ ...form, window: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select time window" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12 Jun 9am - 11am">12 Jun 9am - 11am</SelectItem>
                                            <SelectItem value="13 Jun 10am - 10:45am">13 Jun 10am - 10:45am</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">
                                        Assign
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg text-gray-800">Assigned Exams</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Window</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {assignments.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.exam}</TableCell>
                                                <TableCell>{row.class}</TableCell>
                                                <TableCell>{row.window}</TableCell>
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

