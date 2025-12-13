"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CalendarDays,
  ChevronDown,
  Copy,
  Download,
  LayoutList,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react"

const initialRows = [
  { id: 1, gradeName: "C", percentFrom: "50.00", percentUpto: "65.00" },
  { id: 2, gradeName: "D", percentFrom: "40.00", percentUpto: "60.00" },
  { id: 3, gradeName: "A", percentFrom: "79.59", percentUpto: "100.00" },
  { id: 4, gradeName: "A+", percentFrom: "91.00", percentUpto: "100.00" },
]

export default function GradeList() {
  return (
    <DashboardLayout title="Marks Grade">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Marks Grade</span>
          </span>
        </div>

        <GradeListContent />
      </div>
    </DashboardLayout>
  )
}

function GradeListContent() {
  const [rows] = useState(initialRows)
  const [form, setForm] = useState({
    gradeName: "",
    className: "",
    percentFrom: "",
    percentUpto: "",
    description: "",
  })

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="xl:col-span-1">
        <CardHeader className="bg-pink-50 border-b border-pink-100">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Pencil className="h-5 w-5" />
            Add / Edit Grade List
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-red-500">Grade Name *</Label>
            <Input
              value={form.gradeName}
              onChange={(e) => setForm({ ...form, gradeName: e.target.value })}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Select value={form.className} onValueChange={(val) => setForm({ ...form, className: val })}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-red-500">Percent From *</Label>
            <Input
              value={form.percentFrom}
              onChange={(e) => setForm({ ...form, percentFrom: e.target.value })}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-red-500">Percent Upto *</Label>
            <Input
              value={form.percentUpto}
              onChange={(e) => setForm({ ...form, percentUpto: e.target.value })}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-white border-gray-200"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <Button className="bg-blue-900 hover:bg-blue-800 px-8">Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader className="bg-pink-50 border-b border-pink-100">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <LayoutList className="h-5 w-5" />
            Grade List
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="icon" className="border-gray-200">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-200">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-200">
                <Printer className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200">
                    Column visibility
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Grade Name</DropdownMenuItem>
                  <DropdownMenuItem>Percent From</DropdownMenuItem>
                  <DropdownMenuItem>Percent Upto</DropdownMenuItem>
                  <DropdownMenuItem>Action</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full sm:w-72">
              <Label>Search:</Label>
              <Input className="bg-white border-gray-200" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-pink-50 hover:bg-pink-50">
                  <TableHead className="font-bold text-gray-700 uppercase">Grade Name</TableHead>
                  <TableHead className="font-bold text-gray-700 uppercase">Percent From</TableHead>
                  <TableHead className="font-bold text-gray-700 uppercase">Percent Upto</TableHead>
                  <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.gradeName}</TableCell>
                    <TableCell>{row.percentFrom}</TableCell>
                    <TableCell>{row.percentUpto}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-blue-900 hover:bg-blue-800">
                            Action
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
