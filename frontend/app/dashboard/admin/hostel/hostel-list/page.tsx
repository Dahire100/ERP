"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Home } from "lucide-react"

const rows = [
  { id: 1, name: "Hostel A", capacity: 120, occupied: 98, warden: "Mr. Rao" },
  { id: 2, name: "Hostel B", capacity: 90, occupied: 72, warden: "Ms. Gupta" },
]

export default function HostelList() {
  return (
    <DashboardLayout title="Hostel List">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Home className="h-5 w-5" />
              Add Hostel
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Name *</Label>
                <Input placeholder="Hostel name" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Capacity *</Label>
                <Input placeholder="Total beds" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Warden</Label>
                <Input placeholder="Warden name" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-gray-800 text-lg">Hostels</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Capacity</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Occupied</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Warden</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell className="text-right">{row.capacity}</TableCell>
                      <TableCell className="text-right">{row.occupied}</TableCell>
                      <TableCell>{row.warden}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

