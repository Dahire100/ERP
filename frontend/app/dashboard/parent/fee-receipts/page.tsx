"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

const rows = [
  { id: 1, month: "May 2025", amount: 500, receipt: "RCPT-1201", date: "05-05-2025" },
  { id: 2, month: "April 2025", amount: 500, receipt: "RCPT-1150", date: "05-04-2025" },
]

export default function FeeReceipts() {
  return (
    <DashboardLayout title="Fee Receipts">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="h-5 w-5" />
              Receipts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <Input placeholder="Month / Receipt No" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Child</Label>
                <Input placeholder="Child name" className="bg-white border-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Receipt List</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Month</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Amount</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Receipt No</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell className="text-right">{row.amount.toFixed(2)}</TableCell>
                      <TableCell>{row.receipt}</TableCell>
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

