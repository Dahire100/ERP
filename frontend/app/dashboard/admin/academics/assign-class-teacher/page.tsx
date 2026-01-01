"use client"

import { useState } from "react"
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
  UserRound,
} from "lucide-react"

const initialRows = [
  { id: 1, className: "10th", section: "A", teacher: "kuldeep singh shekhawat" },
  { id: 2, className: "1st", section: "A", teacher: "T DILIP KUMAR" },
  { id: 3, className: "1st", section: "A", teacher: "kajal saini" },
]

export default function AssignClassTeacher() {
  const [rows] = useState(initialRows)
  const [form, setForm] = useState({ className: "", section: "", teacher: "" })

  return (
    <DashboardLayout title="Assign Class Teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Academics</span>
            <span>/</span>
            <span>Assign Class Teacher</span>
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Pencil className="h-5 w-5" />
                Add / Edit Class Teacher
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-red-500">Class *</Label>
                <Select value={form.className} onValueChange={(val) => setForm({ ...form, className: val })}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="1st">1st</SelectItem>
                    <SelectItem value="2nd">2nd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Section *</Label>
                <Select value={form.section} onValueChange={(val) => setForm({ ...form, section: val })}>
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

              <div className="space-y-2">
                <Label className="text-red-500">Class Teacher *</Label>
                <Select value={form.teacher} onValueChange={(val) => setForm({ ...form, teacher: val })}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kuldeep">kuldeep singh shekhawat</SelectItem>
                    <SelectItem value="dilip">T DILIP KUMAR</SelectItem>
                    <SelectItem value="kajal">kajal saini</SelectItem>
                  </SelectContent>
                </Select>
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
                Assign Class Teacher List
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
                      <DropdownMenuItem>Class</DropdownMenuItem>
                      <DropdownMenuItem>Section</DropdownMenuItem>
                      <DropdownMenuItem>Class Teacher</DropdownMenuItem>
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
                      <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Section</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Class Teacher</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.className}</TableCell>
                        <TableCell>{row.section}</TableCell>
                        <TableCell>{row.teacher}</TableCell>
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
      </div>
    </DashboardLayout>
  )
}
