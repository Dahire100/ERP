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
import { Receipt } from "lucide-react"

export default function AddExpense() {
    const [formData, setFormData] = useState({
        head: "",
        amount: "",
        date: "",
        voucher: "",
        description: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.head || !formData.amount || !formData.date) {
            toast.error("Please fill required fields")
            return
        }
        toast.success("Expense saved")
        setFormData({ head: "", amount: "", date: "", voucher: "", description: "" })
    }

    return (
        <DashboardLayout title="Add Expense">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Receipt className="h-5 w-5" />
                            Expense Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-red-500">Expense Head *</Label>
                                <Select value={formData.head} onValueChange={(val) => setFormData({ ...formData, head: val })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select head" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="salary">Salary</SelectItem>
                                        <SelectItem value="utilities">Utilities</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Amount *</Label>
                                <Input
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Date *</Label>
                                <Input
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    placeholder="DD-MM-YYYY"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Voucher No.</Label>
                                <Input
                                    value={formData.voucher}
                                    onChange={(e) => setFormData({ ...formData, voucher: e.target.value })}
                                    placeholder="Auto / manual"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-white border-gray-200"
                                    rows={3}
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

