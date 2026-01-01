"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Factory } from "lucide-react"
import { toast } from "sonner"

const rows = [
  { id: 1, name: "ABC Stationers", contact: "9876500000", email: "contact@abc.com", category: "Stationery" },
  { id: 2, name: "Tech Supplies", contact: "9898989898", email: "sales@techsupplies.com", category: "Electronics" },
]

export default function VendorManagement() {
  const [vendors, setVendors] = useState(rows)
  const [form, setForm] = useState({ name: "", contact: "", email: "", category: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.contact) {
      toast.error("Name and contact are required")
      return
    }
    setVendors([...vendors, { id: Date.now(), ...form }])
    toast.success("Vendor added")
    setForm({ name: "", contact: "", email: "", category: "" })
  }

  return (
    <DashboardLayout title="Vendor Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Factory className="h-5 w-5" />
                Add Vendor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Contact *</Label>
                  <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-white border-gray-200" />
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
              <CardTitle className="text-lg text-gray-800">Vendors</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Contact</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Email</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell>{row.email || "-"}</TableCell>
                        <TableCell>{row.category || "-"}</TableCell>
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

