"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList, Download } from "lucide-react"
import { toast } from "sonner"
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config"

export default function Assignments() {
    const [rows, setRows] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({ title: "", classSection: "", subject: "", fileUrl: "" })

    const fetchAssignments = async () => {
        try {
            const res = await apiFetch(`${API_ENDPOINTS.STUDY_MATERIAL}?type=assignment`)
            if (res.ok) {
                const data = await res.json()
                setRows(data)
            }
        } catch (error) {
            console.error("Failed to fetch assignments", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAssignments()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title || !form.classSection || !form.subject || !form.fileUrl) {
            toast.error("All fields are required")
            return
        }

        try {
            const res = await apiFetch(API_ENDPOINTS.STUDY_MATERIAL, {
                method: "POST",
                body: JSON.stringify({
                    title: form.title,
                    description: `Class: ${form.classSection}`,
                    type: "assignment",
                    subject: form.subject,
                    fileUrl: form.fileUrl
                })
            })

            if (res.ok) {
                toast.success("Assignment added")
                setForm({ title: "", classSection: "", subject: "", fileUrl: "" })
                fetchAssignments()
            } else {
                toast.error("Failed to add assignment")
            }
        } catch (error) {
            toast.error("Error submitting form")
        }
    }

    return (
        <DashboardLayout title="Assignments">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <ClipboardList className="h-5 w-5" />
                                Add Assignment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Title *</Label>
                                    <Input
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Assignment title"
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
                            <CardTitle className="text-lg text-gray-800">Assignment List</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Title</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">File</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                                            </TableRow>
                                        ) : rows.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center">No assignments found.</TableCell>
                                            </TableRow>
                                        ) : (
                                            rows.map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell>{row.subject}</TableCell>
                                                    <TableCell className="truncate max-w-xs">{row.fileUrl}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <a href={row.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                <Download className="h-4 w-4" />
                                                            </a>
                                                        </Button>
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
        </DashboardLayout>
    )
}
