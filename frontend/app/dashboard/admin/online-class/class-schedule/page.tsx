"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarClock } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, subject: "Maths", classSection: "6-A", date: "12-06-2025", time: "09:00 - 10:00", platform: "Zoom" },
    { id: 2, subject: "Science", classSection: "7-B", date: "12-06-2025", time: "11:00 - 12:00", platform: "Meet" },
]

export default function ClassSchedule() {
    const [rows, setRows] = useState(sample)
    const [form, setForm] = useState({
        subject: "",
        classSection: "",
        date: "",
        time: "",
        platform: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.subject || !form.classSection || !form.date || !form.time || !form.platform) {
            toast.error("All fields are required")
            return
        }
        setRows([...rows, { id: Date.now(), ...form }])
        toast.success("Class scheduled")
        setForm({ subject: "", classSection: "", date: "", time: "", platform: "" })
    }

    return (
        <DashboardLayout title="Class Schedule">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <CalendarClock className="h-5 w-5" />
                                Add Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Subject *</Label>
                                    <Input
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="e.g. Mathematics"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Class / Section *</Label>
                                    <Input
                                        value={form.classSection}
                                        onChange={(e) => setForm({ ...form, classSection: e.target.value })}
                                        placeholder="6-A"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Date *</Label>
                                    <Input
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        placeholder="DD-MM-YYYY"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Time *</Label>
                                    <Input
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                        placeholder="HH:MM - HH:MM"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Platform *</Label>
                                    <Select value={form.platform} onValueChange={(val) => setForm({ ...form, platform: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Zoom">Zoom</SelectItem>
                                            <SelectItem value="Meet">Google Meet</SelectItem>
                                            <SelectItem value="Teams">MS Teams</SelectItem>
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
                            <CardTitle className="text-lg text-gray-800">Upcoming Classes</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Time</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Platform</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.subject}</TableCell>
                                                <TableCell>{row.classSection}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.time}</TableCell>
                                                <TableCell>{row.platform}</TableCell>
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

