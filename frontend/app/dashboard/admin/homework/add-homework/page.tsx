"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { PlusCircle } from "lucide-react"

export default function AddHomework() {
    const [form, setForm] = useState({
        title: "",
        classSection: "",
        subject: "",
        dueDate: "",
        attachment: "",
        description: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title || !form.classSection || !form.subject || !form.dueDate) {
            toast.error("Please fill required fields")
            return
        }
        toast.success("Homework created")
        setForm({ title: "", classSection: "", subject: "", dueDate: "", attachment: "", description: "" })
    }

    return (
        <DashboardLayout title="Add Homework">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <PlusCircle className="h-5 w-5" />
                            Homework Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-red-500">Title *</Label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Chapter 5 worksheet"
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
                                <Label className="text-red-500">Due Date *</Label>
                                <Input
                                    value={form.dueDate}
                                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                                    placeholder="DD-MM-YYYY"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Attachment Link</Label>
                                <Input
                                    value={form.attachment}
                                    onChange={(e) => setForm({ ...form, attachment: e.target.value })}
                                    placeholder="URL to file"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                    Save Homework
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

