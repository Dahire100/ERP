"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config"

export default function Vehicles() {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ number: "", capacity: "", route: "" })

  const fetchVehicles = async () => {
    try {
      const res = await apiFetch(`${API_ENDPOINTS.TRANSPORT}/vehicles`)
      if (res.ok) {
        const data = await res.json()
        setRows(data)
      }
    } catch (error) {
      console.error("Failed to fetch vehicles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.number || !form.capacity) {
      toast.error("Vehicle and capacity are required")
      return
    }

    try {
      const res = await apiFetch(`${API_ENDPOINTS.TRANSPORT}/vehicles`, {
        method: "POST",
        body: JSON.stringify({
          number: form.number,
          capacity: Number(form.capacity),
          route: form.route
        })
      })

      if (res.ok) {
        toast.success("Vehicle added")
        setForm({ number: "", capacity: "", route: "" })
        fetchVehicles()
      } else {
        toast.error("Failed to add vehicle")
      }
    } catch (error) {
      toast.error("Error submitting form")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await apiFetch(`${API_ENDPOINTS.TRANSPORT}/vehicles/${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        toast.success("Vehicle deleted")
        fetchVehicles()
      }
    } catch (error) {
      toast.error("Failed to delete")
    }
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
                  <Label>Route</Label>
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
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow> :
                      rows.length === 0 ? <TableRow><TableCell colSpan={4}>No vehicles found</TableCell></TableRow> :
                        rows.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell>{row.vehicleNumber}</TableCell>
                            <TableCell className="text-right">{row.capacity}</TableCell>
                            <TableCell>{row.route || "-"}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(row._id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
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
