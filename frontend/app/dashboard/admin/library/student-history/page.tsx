
"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History } from "lucide-react"

const rows = [
  { id: 1, student: "Ansh Sharma", classSection: "7-B", book: "Mathematics Grade 10", issueDate: "12-06-2025", returnDate: "-" },
  { id: 2, student: "Ansh Sharma", classSection: "7-B", book: "English Literature", issueDate: "01-06-2025", returnDate: "05-06-2025" },
]

export default function StudentHistory() {
  return (
    <DashboardLayout title="Student History">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <History className="h-5 w-5" />
              Search Student
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Class / Section</Label>
                <Input placeholder="e.g. 7-B" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Borrowing History</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Class/Section</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Book</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Issued</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Returned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.classSection}</TableCell>
                      <TableCell>{row.book}</TableCell>
                      <TableCell>{row.issueDate}</TableCell>
                      <TableCell>{row.returnDate}</TableCell>
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

