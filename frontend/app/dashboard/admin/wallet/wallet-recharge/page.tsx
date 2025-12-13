"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"

export default function WalletRecharge() {
    const [form, setForm] = useState({ student: "", method: "", amount: "", ref: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.student || !form.method || !form.amount) {
            toast.error("Student, method and amount are required")
            return
        }
        toast.success("Recharge recorded")
        setForm({ student: "", method: "", amount: "", ref: "" })
    }

    return (
        <DashboardLayout title="Wallet Recharge">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <PlusCircle className="h-5 w-5" />
                            Recharge Wallet
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
                                <Label className="text-red-500">Amount *</Label>
                                <Input
                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-red-500">Method *</Label>
                                <Select value={form.method} onValueChange={(val) => setForm({ ...form, method: val })}>
                                    <SelectTrigger className="bg-white border-gray-200">
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="upi">UPI</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Reference No.</Label>
                                <Input
                                    value={form.ref}
                                    onChange={(e) => setForm({ ...form, ref: e.target.value })}
                                    placeholder="Txn / Receipt"
                                    className="bg-white border-gray-200"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                    Recharge
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

