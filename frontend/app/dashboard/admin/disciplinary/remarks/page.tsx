"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield } from "lucide-react"

const rows = [
  { id: 1, student: "Ansh Sharma", remark: "Consistently punctual", by: "Class Teacher", date: "12-06-2025" },
  { id: 2, student: "Vanya Patel", remark: "Needs improvement in class participation", by: "Math Teacher", date: "10-06-2025" },
]

export default function Remarks() {
  return (
    <DashboardLayout title="Remarks">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Shield className="h-5 w-5" />
              Add Remark
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Student *</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-red-500">Remark *</Label>
                <Input placeholder="Behaviour note" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Remarks Log</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Remark</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">By</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.remark}</TableCell>
                      <TableCell>{row.by}</TableCell>
                      <TableCell>{row.date}</TableCell>
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

