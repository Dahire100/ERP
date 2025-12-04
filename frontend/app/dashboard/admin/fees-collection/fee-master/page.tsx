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
import { Plus } from "lucide-react"
import { toast } from "sonner"

export default function FeeMaster() {
    const [formData, setFormData] = useState({
        feesGroup: "",
        feesType: "",
        amount: "",
        dateOfMonth: "",
        month: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.feesGroup || !formData.feesType || !formData.amount) {
            toast.error("Please fill all required fields")
            return
        }
        toast.success("Fee Master saved successfully")
        setFormData({
            feesGroup: "",
            feesType: "",
            amount: "",
            dateOfMonth: "",
            month: ""
        })
    }

    return (
        <DashboardLayout title="Fee Master">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <div className="flex space-x-4">
                            <Button variant="ghost" className="text-gray-800 font-semibold border-b-2 border-purple-600 rounded-none px-0 hover:bg-transparent">
                                Create Fee
                            </Button>
                            <Button variant="ghost" className="text-gray-500 font-medium hover:text-gray-800 hover:bg-transparent">
                                Fee Structure
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="feesGroup" className="text-red-500">Fees Group *</Label>
                                        <Button type="button" size="sm" className="bg-blue-900 hover:bg-blue-800 text-xs">
                                            <Plus className="h-3 w-3 mr-1" /> Add New Fee Type
                                        </Button>
                                    </div>
                                    <Select value={formData.feesGroup} onValueChange={(val) => setFormData({ ...formData, feesGroup: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="group1">Class 1</SelectItem>
                                            <SelectItem value="group2">Class 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="feesType" className="text-red-500">Fees Type *</Label>
                                        <Select value={formData.feesType} onValueChange={(val) => setFormData({ ...formData, feesType: val })}>
                                            <SelectTrigger className="bg-white border-gray-200">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="type1">Tuition Fee</SelectItem>
                                                <SelectItem value="type2">Exam Fee</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="amount" className="text-red-500">Amount *</Label>
                                        <Input
                                            id="amount"
                                            placeholder="Amount.."
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="bg-white border-gray-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfMonth" className="text-red-500">Date Of Month *</Label>
                                        <Input
                                            id="dateOfMonth"
                                            value={formData.dateOfMonth}
                                            onChange={(e) => setFormData({ ...formData, dateOfMonth: e.target.value })}
                                            className="bg-white border-gray-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="month" className="text-red-500">Month *</Label>
                                        <Select value={formData.month} onValueChange={(val) => setFormData({ ...formData, month: val })}>
                                            <SelectTrigger className="bg-white border-gray-200">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="jan">January</SelectItem>
                                                <SelectItem value="feb">February</SelectItem>
                                                <SelectItem value="mar">March</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
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
