"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart2 } from "lucide-react"

const rows = [
  { exam: "Mid Term", avg: 78, highest: 96, attempts: 40 },
  { exam: "Science Quiz", avg: 71, highest: 90, attempts: 32 },
]

export default function ExamReports() {
  return (
    <DashboardLayout title="Exam Reports">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <BarChart2 className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Exam</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="All exams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mid Term">Mid Term</SelectItem>
                    <SelectItem value="Science Quiz">Science Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Class</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="All classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Input placeholder="All" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Input placeholder="DD-MM-YYYY to DD-MM-YYYY" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" className="border-gray-300">Export</Button>
              <Button className="bg-blue-900 hover:bg-blue-800">Generate</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Avg Score</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Highest</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Attempts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.exam}>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell className="text-right">{row.avg}%</TableCell>
                      <TableCell className="text-right">{row.highest}%</TableCell>
                      <TableCell className="text-right">{row.attempts}</TableCell>
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

