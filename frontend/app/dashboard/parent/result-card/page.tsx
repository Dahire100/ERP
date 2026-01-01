"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap } from "lucide-react"

const rows = [
  { id: 1, subject: "Maths", marks: 88, grade: "A" },
  { id: 2, subject: "Science", marks: 82, grade: "A-" },
  { id: 3, subject: "English", marks: 76, grade: "B+" },
]

export default function ResultCard() {
  return (
    <DashboardLayout title="Result Card">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <GraduationCap className="h-5 w-5" />
              Latest Result
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Marks</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell className="text-right">{row.marks}</TableCell>
                      <TableCell className="text-right">{row.grade}</TableCell>
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

