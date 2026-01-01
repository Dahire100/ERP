"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ListChecks } from "lucide-react"

const rows = [
  { id: 1, student: "Ansh Sharma", notes: "Consistent good behaviour", lastAction: "Commendation", date: "12-06-2025" },
  { id: 2, student: "Vanya Patel", notes: "Needs classroom attention", lastAction: "Parent call", date: "10-06-2025" },
]

export default function BehaviourLog() {
  return (
    <DashboardLayout title="Behaviour Log">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <ListChecks className="h-5 w-5" />
              Behaviour Log
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Student</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Date From</Label>
                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Date To</Label>
                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Log Entries</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Notes</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Last Action</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                      <TableCell>{row.lastAction}</TableCell>
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

