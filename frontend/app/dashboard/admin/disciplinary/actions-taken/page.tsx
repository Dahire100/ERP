"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle } from "lucide-react"

const rows = [
  { id: 1, student: "Ansh Sharma", action: "Counseling session", by: "Counselor", date: "12-06-2025" },
  { id: 2, student: "Vanya Patel", action: "Warning issued", by: "Vice Principal", date: "11-06-2025" },
]

export default function ActionsTaken() {
  return (
    <DashboardLayout title="Actions Taken">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <AlertTriangle className="h-5 w-5" />
              Add Action
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Student *</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-red-500">Action *</Label>
                <Input placeholder="Action taken" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Action Log</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Action</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">By</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.action}</TableCell>
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

