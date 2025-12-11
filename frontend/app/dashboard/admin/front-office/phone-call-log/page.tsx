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
  SelectValue
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PhoneCall } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, caller: "Parent of Riya", type: "Incoming", phone: "9876500000", note: "Asked fee details", followUp: "12-06-2025" },
  { id: 2, caller: "Vendor", type: "Outgoing", phone: "9898989898", note: "Transport query", followUp: "-" }
]

export default function PhoneCallLog() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ caller: "", type: "", phone: "", note: "", followUp: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.caller || !form.type || !form.phone) {
      toast.error("Caller, type and phone are required")
      return
    }
    setRows([...rows, { id: Date.now(), ...form }])
    toast.success("Call logged")
    setForm({ caller: "", type: "", phone: "", note: "", followUp: "" })
  }

  return (
    <DashboardLayout title="Phone Call Log">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <PhoneCall className="h-5 w-5" />
                Log Call
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Caller *</Label>
                  <Input value={form.caller} onChange={(e) => setForm({ ...form, caller: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Type *</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incoming">Incoming</SelectItem>
                      <SelectItem value="Outgoing">Outgoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Phone *</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Note</Label>
                  <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Follow-up Date</Label>
                  <Input value={form.followUp} onChange={(e) => setForm({ ...form, followUp: e.target.value })} placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Call Log</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Caller</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Phone</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Note</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Follow-up</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.caller}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.note || "-"}</TableCell>
                        <TableCell>{row.followUp || "-"}</TableCell>
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

