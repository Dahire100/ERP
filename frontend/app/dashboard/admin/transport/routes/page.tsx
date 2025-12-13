"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, name: "North Loop", start: "Gate A", end: "Sector 12", charge: 1200 },
  { id: 2, name: "East Express", start: "Gate B", end: "City Center", charge: 1500 },
]

export default function Routes() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ name: "", start: "", end: "", charge: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.start || !form.end || !form.charge) {
      toast.error("All fields are required")
      return
    }
    setRows([...rows, { id: Date.now(), name: form.name, start: form.start, end: form.end, charge: Number(form.charge) }])
    toast.success("Route added")
    setForm({ name: "", start: "", end: "", charge: "" })
  }

  return (
    <DashboardLayout title="Transport Routes">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <MapPin className="h-5 w-5" />
                Add Route
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Route Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Start *</Label>
                  <Input value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">End *</Label>
                  <Input value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Monthly Charge *</Label>
                  <Input value={form.charge} onChange={(e) => setForm({ ...form, charge: e.target.value })} className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Route List</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Start</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">End</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Charge</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.start}</TableCell>
                        <TableCell>{row.end}</TableCell>
                        <TableCell className="text-right">{row.charge.toFixed(2)}</TableCell>
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

