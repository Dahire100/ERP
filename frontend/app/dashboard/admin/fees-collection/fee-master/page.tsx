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
    const [activeTab, setActiveTab] = useState("fee-structure")
    const [formData, setFormData] = useState({
        feesGroup: "",
        feesType: "",
        amount: "",
        dateOfMonth: "",
        month: ""
    })

    // Sample data for Fee Structure list
    const feeMasters = [
        {
            id: 1,
            feesGroup: "1 4",
            feesCode: "hf 8500.00 (01-04-2025)",
            amount: "8500.00"
        }
    ]

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
                    <CardHeader className="bg-pink-50 border-b border-pink-100 p-0">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("create-fee")}
                                className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === "create-fee"
                                        ? "text-gray-800 border-b-2 border-purple-600 bg-white"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
                                    }`}
                            >
                                Create Fee
                            </button>
                            <button
                                onClick={() => setActiveTab("fee-structure")}
                                className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === "fee-structure"
                                        ? "text-gray-800 border-b-2 border-purple-600 bg-white"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
                                    }`}
                            >
                                Fee Structure
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {activeTab === "create-fee" ? (
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
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">Fees Master List : 2025-26</h2>
                                    <Button className="bg-[#1e1e50] text-white hover:bg-[#151538]">
                                        Update Fee Master
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="25">
                                            <SelectTrigger className="w-[70px] bg-white border-gray-200">
                                                <SelectValue placeholder="25" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="25">25</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                                <SelectItem value="100">100</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">Search:</span>
                                        <Input className="w-48 h-8 bg-white" />
                                    </div>
                                </div>

                                <div className="border rounded-md overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-pink-50 text-gray-700 font-bold uppercase">
                                            <tr>
                                                <th className="px-4 py-3 border-r">Fees Group</th>
                                                <th className="px-4 py-3 border-r">Fees Code</th>
                                                <th className="px-4 py-3 border-r">Amount</th>
                                                <th className="px-4 py-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {feeMasters.map((fee) => (
                                                <tr key={fee.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 border-r font-medium text-blue-900">{fee.feesGroup}</td>
                                                    <td className="px-4 py-3 border-r">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{fee.feesCode}</span>
                                                            <button className="text-blue-600 hover:text-blue-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 border-r">
                                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                                                            {fee.amount}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button className="text-blue-900 hover:text-blue-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828l-5-5a2 2 0 0 0-1.414 0z" /><path d="m7 7 .01.01" /></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
