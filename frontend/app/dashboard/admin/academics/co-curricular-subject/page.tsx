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
} from "lucide-react"

const initialRows = [
  { id: 1, name: "Bhagti", code: "0", className: "KSV 6th,1st", type: "Social Skills" },
  { id: 2, name: "Poojan", code: "0", className: "KSV 6th,1st", type: "Social Skills" },
  { id: 3, name: "cleaning", code: "123", className: "1st,KSV 6th", type: "Discipline" },
]

export default function CoCurricularSubject() {
  const [rows] = useState(initialRows)
  const [form, setForm] = useState({ name: "", code: "", className: "", type: "" })

  return (
    <DashboardLayout title="Co-Curricular Subject">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Academics</span>
            <span>/</span>
            <span>Co-Curricular Subject</span>
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Pencil className="h-5 w-5" />
                Add Co-Curricular Subject
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-red-500">Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter name"
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="Enter code"
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Class *</Label>
                <Input
                  value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}
                  placeholder="Enter class"
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Co-Scholastic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="co-scholastic">Co-Scholastic</SelectItem>
                    <SelectItem value="social-skills">Social Skills</SelectItem>
                    <SelectItem value="discipline">Discipline</SelectItem>
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
                Co-Curricular Subject List
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
                      <DropdownMenuItem>Name</DropdownMenuItem>
                      <DropdownMenuItem>Code</DropdownMenuItem>
                      <DropdownMenuItem>Class</DropdownMenuItem>
                      <DropdownMenuItem>Type</DropdownMenuItem>
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
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Code</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.className}</TableCell>
                        <TableCell>{row.type}</TableCell>
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
