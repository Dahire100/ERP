"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BedDouble } from "lucide-react"

const rows = [
  { id: 1, hostel: "Hostel A", room: "A-101", bed: "Lower 1", student: "Ansh Sharma", status: "Allocated" },
  { id: 2, hostel: "Hostel B", room: "B-203", bed: "Upper 2", student: "Vanya Patel", status: "Reserved" },
]

export default function BedAllocation() {
  return (
    <DashboardLayout title="Bed Allocation">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <BedDouble className="h-5 w-5" />
              Allocate Bed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Hostel *</Label>
                <Input placeholder="Hostel name" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Room *</Label>
                <Input placeholder="Room No" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Bed *</Label>
                <Input placeholder="Bed slot" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Student *</Label>
                <Input placeholder="Student name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-gray-800 text-lg">Allocations</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Hostel</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Room</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Bed</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.hostel}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.bed}</TableCell>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.status}</TableCell>
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

