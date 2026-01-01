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
import { Textarea } from "@/components/ui/textarea"
import { ClipboardList } from "lucide-react"
import { toast } from "sonner"

export default function CreateExam() {
    const [form, setForm] = useState({
        title: "",
        subject: "",
        duration: "",
        totalMarks: "",
        instructions: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title || !form.subject || !form.duration || !form.totalMarks) {
            toast.error("Please fill required fields")
            return
        }
        toast.success("Exam saved")
        setForm({ title: "", subject: "", duration: "", totalMarks: "", instructions: "" })
    }

    return (
        <DashboardLayout title="Create Exam">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <ClipboardList className="h-5 w-5" />
                            Exam Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-red-500">Exam Title *</Label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Mid Term Exam"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Subject *</Label>
                                <Input
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder="Mathematics"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Duration (mins) *</Label>
                                <Input
                                    value={form.duration}
                                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                    placeholder="60"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Total Marks *</Label>
                                <Input
                                    value={form.totalMarks}
                                    onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
                                    placeholder="100"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Instructions</Label>
                                <Textarea
                                    value={form.instructions}
                                    onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                                    rows={3}
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                    Save Exam
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

