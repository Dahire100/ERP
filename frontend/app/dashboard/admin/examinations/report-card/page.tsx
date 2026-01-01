"use client"

import { useState } from "react"
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
import { CalendarDays, FileText, Search, Sheet } from "lucide-react"

export default function ReportCard() {
  const [mode, setMode] = useState<"term" | "exam">("term")

  return (
    <DashboardLayout title="Report Card">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Report Card</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button
            type="button"
            onClick={() => setMode("term")}
            className="text-left"
          >
            <Card
              className={
                mode === "term"
                  ? "shadow-md border-blue-900 border-b-4"
                  : "hover:shadow-md transition-shadow"
              }
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-amber-700" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-blue-900 underline truncate">
                    TERM WISE REPORT CARD
                  </div>
                  <div className="text-sm text-gray-500 truncate">Term Wise Report Card</div>
                </div>
              </CardContent>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => setMode("exam")}
            className="text-left"
          >
            <Card
              className={
                mode === "exam"
                  ? "shadow-md border-blue-900 border-b-4"
                  : "hover:shadow-md transition-shadow"
              }
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Sheet className="h-6 w-6 text-emerald-700" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-blue-900 underline truncate">
                    EXAM WISE REPORT CARD
                  </div>
                  <div className="text-sm text-gray-500 truncate">Exam Wise Report Card</div>
                </div>
              </CardContent>
            </Card>
          </button>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <Search className="h-5 w-5" />
              Select Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {mode === "term" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Term List *</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="" />
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <Label className="text-red-500">Exam Name *</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt1">PT1</SelectItem>
                      <SelectItem value="ut1">UT-1</SelectItem>
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
            )}

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
