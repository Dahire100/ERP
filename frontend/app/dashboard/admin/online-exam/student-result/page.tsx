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
import { GraduationCap } from "lucide-react"

const rows = [
  { student: "Ansh Sharma", class: "1-A", exam: "Mid Term", score: 86, status: "Passed" },
  { student: "Vanya Patel", class: "2-B", exam: "Science Quiz", score: 74, status: "Passed" },
]

export default function StudentResult() {
  return (
    <DashboardLayout title="Student Result">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <GraduationCap className="h-5 w-5" />
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
                <Label>Search Student</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Results</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Score</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.student}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell className="text-right">{row.score}</TableCell>
                      <TableCell className="text-right">{row.status}</TableCell>
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

