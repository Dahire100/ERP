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
import { ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, item: "Notebooks (A4)", type: "In", qty: 200, ref: "GRN-1001", date: "12-06-2025" },
  { id: 2, item: "Projector Bulbs", type: "Out", qty: 2, ref: "ISS-2001", date: "11-06-2025" },
]

export default function StockInOut() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ item: "", type: "", qty: "", ref: "", date: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.item || !form.type || !form.qty || !form.date) {
      toast.error("Item, type, quantity, and date are required")
      return
    }
    setRows([...rows, { id: Date.now(), ...form, qty: Number(form.qty) }])
    toast.success("Stock entry saved")
    setForm({ item: "", type: "", qty: "", ref: "", date: "" })
  }

  return (
    <DashboardLayout title="Stock In/Out">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <ArrowUpDown className="h-5 w-5" />
                Record Movement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Item *</Label>
                  <Input value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Type *</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In">In</SelectItem>
                      <SelectItem value="Out">Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Quantity *</Label>
                  <Input value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Reference</Label>
                  <Input value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Date *</Label>
                  <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Stock Movements</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Item</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Quantity</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Reference</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.item}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell className="text-right">{row.qty}</TableCell>
                        <TableCell>{row.ref}</TableCell>
                        <TableCell>{row.date}</TableCell>
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

