"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, student: "Ansh Sharma", hostel: "Hostel A", amount: 3500, status: "Pending" },
  { id: 2, student: "Vanya Patel", hostel: "Hostel B", amount: 3200, status: "Paid" },
]

export default function HostelFees() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ student: "", hostel: "", amount: "", status: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.student || !form.hostel || !form.amount) {
      toast.error("Student, hostel and amount are required")
      return
    }
    setRows([...rows, { id: Date.now(), ...form, amount: Number(form.amount), status: form.status || "Pending" }])
    toast.success("Hostel fee saved")
    setForm({ student: "", hostel: "", amount: "", status: "" })
  }

  return (
    <DashboardLayout title="Hostel Fees">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Wallet className="h-5 w-5" />
                Assign Hostel Fee
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Student *</Label>
                  <Input value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Hostel *</Label>
                  <Input value={form.hostel} onChange={(e) => setForm({ ...form, hostel: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Amount *</Label>
                  <Input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} placeholder="Pending / Paid" className="bg-white border-gray-200" />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg text-gray-800">Hostel Fee List</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Hostel</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.student}</TableCell>
                        <TableCell>{row.hostel}</TableCell>
                        <TableCell className="text-right">{row.amount.toFixed(2)}</TableCell>
                        <TableCell>{row.status}</TableCell>
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

