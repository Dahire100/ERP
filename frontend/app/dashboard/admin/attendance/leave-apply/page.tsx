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
import { PlaneTakeoff } from "lucide-react"
import { toast } from "sonner"

export default function LeaveApply() {
    const [form, setForm] = useState({
        student: "",
        type: "",
        from: "",
        to: "",
        reason: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.student || !form.type || !form.from || !form.to) {
            toast.error("Please fill required fields")
            return
        }
        toast.success("Leave request submitted")
        setForm({ student: "", type: "", from: "", to: "", reason: "" })
    }

    return (
        <DashboardLayout title="Leave Apply">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <PlaneTakeoff className="h-5 w-5" />
                            Apply for Leave
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-red-500">Student *</Label>
                                <Input
                                    value={form.student}
                                    onChange={(e) => setForm({ ...form, student: e.target.value })}
                                    placeholder="Search student"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Leave Type *</Label>
                                <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sick">Sick Leave</SelectItem>
                                        <SelectItem value="casual">Casual Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">From *</Label>
                                <Input
                                    value={form.from}
                                    onChange={(e) => setForm({ ...form, from: e.target.value })}
                                    placeholder="DD-MM-YYYY"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">To *</Label>
                                <Input
                                    value={form.to}
                                    onChange={(e) => setForm({ ...form, to: e.target.value })}
                                    placeholder="DD-MM-YYYY"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Reason</Label>
                                <Textarea
                                    value={form.reason}
                                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                    rows={3}
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

