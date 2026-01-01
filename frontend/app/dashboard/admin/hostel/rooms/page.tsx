"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bed } from "lucide-react"

const rows = [
  { id: 1, hostel: "Hostel A", room: "A-101", type: "Double", capacity: 2, occupied: 2 },
  { id: 2, hostel: "Hostel B", room: "B-203", type: "Triple", capacity: 3, occupied: 2 },
]

export default function Rooms() {
  return (
    <DashboardLayout title="Hostel Rooms">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Bed className="h-5 w-5" />
              Add Room
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Hostel *</Label>
                <Input placeholder="Hostel name" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Room No *</Label>
                <Input placeholder="Room number" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Type *</Label>
                <Input placeholder="Single / Double / Triple" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Capacity *</Label>
                <Input placeholder="Beds" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-gray-800 text-lg">Rooms</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Hostel</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Room</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Capacity</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Occupied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.hostel}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell className="text-right">{row.capacity}</TableCell>
                      <TableCell className="text-right">{row.occupied}</TableCell>
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

