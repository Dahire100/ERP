"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users } from "lucide-react"
import { toast } from "sonner"

const sample = [
<<<<<<< HEAD
  { id: 1, name: "Rohit Sharma", purpose: "Admission Enquiry", contact: "9876543210", inTime: "10:15", outTime: "10:45", createdBy: "Demo" },
  { id: 2, name: "Meena Rao", purpose: "Meet Teacher", contact: "9998887777", inTime: "11:00", outTime: "11:20", createdBy: "Super" }
=======
  { id: 1, name: "Rohit Sharma", purpose: "Admission Enquiry", contact: "9876543210", inTime: "10:15", outTime: "10:45" },
  { id: 2, name: "Meena Rao", purpose: "Meet Teacher", contact: "9998887777", inTime: "11:00", outTime: "11:20" }
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
]

export default function VisitorLog() {
  const [rows, setRows] = useState(sample)
  const [form, setForm] = useState({ name: "", purpose: "", contact: "", inTime: "", outTime: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.purpose || !form.contact || !form.inTime) {
      toast.error("Name, purpose, contact, and in time are required")
      return
    }
<<<<<<< HEAD
    setRows([...rows, { id: Date.now(), ...form, createdBy: "Admin" }])
=======
    setRows([...rows, { id: Date.now(), ...form }])
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
    toast.success("Visitor added")
    setForm({ name: "", purpose: "", contact: "", inTime: "", outTime: "" })
  }

  return (
    <DashboardLayout title="Visitor Log">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Users className="h-5 w-5" />
                Add Visitor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Purpose *</Label>
                  <Input value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Contact *</Label>
                  <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">In Time *</Label>
                  <Input value={form.inTime} onChange={(e) => setForm({ ...form, inTime: e.target.value })} placeholder="HH:MM" className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Out Time</Label>
                  <Input value={form.outTime} onChange={(e) => setForm({ ...form, outTime: e.target.value })} placeholder="HH:MM" className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Visitor List</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Purpose</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Contact</TableHead>
<<<<<<< HEAD
                      <TableHead className="font-bold text-gray-700 uppercase">In Time</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Out Time</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Created By</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Action</TableHead>
=======
                      <TableHead className="font-bold text-gray-700 uppercase">In</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Out</TableHead>
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.purpose}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell>{row.inTime}</TableCell>
                        <TableCell>{row.outTime || "-"}</TableCell>
<<<<<<< HEAD
                        {/* @ts-ignore */}
                        <TableCell>{row.createdBy || "Admin"}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538]">
                            Action <span className="ml-2">▼</span>
                          </Button>
                        </TableCell>
=======
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
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

