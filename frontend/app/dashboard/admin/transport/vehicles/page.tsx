"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bus } from "lucide-react"
import { toast } from "sonner"

const sample = [
  { id: 1, number: "UP14 AB 1234", capacity: 40, route: "North Loop" },
  { id: 2, number: "UP16 ZX 4432", capacity: 50, route: "East Express" },
]

export default function Vehicles() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ number: "", capacity: "", route: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.number || !form.capacity || !form.route) {
      toast.error("Vehicle, capacity and route are required")
      return
    }
    setRows([...rows, { id: Date.now(), number: form.number, capacity: Number(form.capacity), route: form.route }])
    toast.success("Vehicle added")
    setForm({ number: "", capacity: "", route: "" })
  }

  return (
    <DashboardLayout title="Transport Vehicles">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Bus className="h-5 w-5" />
                Add Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Vehicle Number *</Label>
                  <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Capacity *</Label>
                  <Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Route *</Label>
                  <Input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Vehicle List</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Number</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Capacity</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Route</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.number}</TableCell>
                        <TableCell className="text-right">{row.capacity}</TableCell>
                        <TableCell>{row.route}</TableCell>
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

