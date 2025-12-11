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
import { Mail } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, type: "Receive", fromTo: "Parent - Riya", ref: "POST-101", date: "12-06-2025", note: "Documents" },
  { id: 2, type: "Dispatch", fromTo: "Courier to Vendor", ref: "POST-102", date: "11-06-2025", note: "Payment cheque" }
]

export default function PostalReceiveDispatch() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ type: "", fromTo: "", ref: "", date: "", note: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.type || !form.fromTo || !form.ref || !form.date) {
      toast.error("Type, party, reference and date are required")
      return
    }
    setRows([...rows, { id: Date.now(), ...form }])
    toast.success("Postal entry saved")
    setForm({ type: "", fromTo: "", ref: "", date: "", note: "" })
  }

  return (
    <DashboardLayout title="Postal Receive / Dispatch">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Mail className="h-5 w-5" />
                Add Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Type *</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Receive or Dispatch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Receive">Receive</SelectItem>
                      <SelectItem value="Dispatch">Dispatch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">From / To *</Label>
                  <Input value={form.fromTo} onChange={(e) => setForm({ ...form, fromTo: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Reference No *</Label>
                  <Input value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Date *</Label>
                  <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Note</Label>
                  <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Postal Entries</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">From/To</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Reference</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Note</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.fromTo}</TableCell>
                        <TableCell>{row.ref}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.note || "-"}</TableCell>
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

