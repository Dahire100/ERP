"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarDays, Search } from "lucide-react"

export default function ExaminationAttendance() {
  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Attendance</span>
          </span>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <Search className="h-5 w-5" />
              Select Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Term List *</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="term-1">TERM-1</SelectItem>
                    <SelectItem value="term-2">TERM-2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Class *</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Section *</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
