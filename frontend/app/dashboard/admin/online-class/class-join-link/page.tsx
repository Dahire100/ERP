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
import { Link2 } from "lucide-react"
import { toast } from "sonner"

const sample = [
    { id: 1, subject: "Maths", classSection: "6-A", platform: "Zoom", link: "https://zoom.us/abc" },
    { id: 2, subject: "Science", classSection: "7-B", platform: "Meet", link: "https://meet.google.com/xyz" },
]

export default function ClassJoinLink() {
    const [rows, setRows] = useState(sample)
    const [form, setForm] = useState({
        subject: "",
        classSection: "",
        platform: "",
        link: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.subject || !form.classSection || !form.platform || !form.link) {
            toast.error("All fields are required")
            return
        }
        setRows([...rows, { id: Date.now(), ...form }])
        toast.success("Join link saved")
        setForm({ subject: "", classSection: "", platform: "", link: "" })
    }

    return (
        <DashboardLayout title="Class Join Link">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Link2 className="h-5 w-5" />
                                Share Link
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
                                <div className="space-y-2">
                                    <Label className="text-red-500">Join Link *</Label>
                                    <Input
                                        value={form.link}
                                        onChange={(e) => setForm({ ...form, link: e.target.value })}
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
                            <CardTitle className="text-lg text-gray-800">Links</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Platform</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Link</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.subject}</TableCell>
                                                <TableCell>{row.classSection}</TableCell>
                                                <TableCell>{row.platform}</TableCell>
                                                <TableCell className="truncate max-w-xs">{row.link}</TableCell>
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

