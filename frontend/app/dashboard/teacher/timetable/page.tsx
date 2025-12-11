"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

const rows = [
  { day: "Monday", period1: "Math (10-A)", period2: "Math (10-B)", period3: "Free", period4: "Math (9-A)" },
  { day: "Tuesday", period1: "Math (10-A)", period2: "Math (10-B)", period3: "Math (9-A)", period4: "Planning" },
]

export default function TeacherTimetable() {
  return (
    <DashboardLayout title="Timetable">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Calendar className="h-5 w-5" />
              Weekly Timetable
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Day</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Period 1</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Period 2</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Period 3</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Period 4</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell>{row.day}</TableCell>
                      <TableCell>{row.period1}</TableCell>
                      <TableCell>{row.period2}</TableCell>
                      <TableCell>{row.period3}</TableCell>
                      <TableCell>{row.period4}</TableCell>
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

