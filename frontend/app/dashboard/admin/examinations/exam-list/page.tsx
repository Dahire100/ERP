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
  { id: 1, order: 1, term: "TERM-1", name: "PT1", groupName: "", bestOf: 0 },
  { id: 2, order: 1, term: "TERM-2", name: "PT-3 (30)", groupName: "", bestOf: 0 },
  { id: 3, order: 1, term: "UNIT Test", name: "Weekly test", groupName: "4th class", bestOf: 10 },
]

export default function ExamList() {
  const [rows] = useState(initialRows)
  const [form, setForm] = useState({
    order: "",
    term: "",
    name: "",
    groupName: "",
    bestOf: "",
    note: "",
  })

  return (
    <DashboardLayout title="Exam List">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Exam List</span>
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Pencil className="h-5 w-5" />
                Add / Edit Exam List
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-red-500">Order *</Label>
                <Input
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                  placeholder="Order No."
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Term *</Label>
                <Select value={form.term} onValueChange={(val) => setForm({ ...form, term: val })}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TERM-1">TERM-1</SelectItem>
                    <SelectItem value="TERM-2">TERM-2</SelectItem>
                    <SelectItem value="UT">UT</SelectItem>
                    <SelectItem value="UNIT Test">UNIT Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <Label>Group Name</Label>
                <Input
                  value={form.groupName}
                  onChange={(e) => setForm({ ...form, groupName: e.target.value })}
                  placeholder="Enter Group Name"
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Best of</Label>
                <Input
                  value={form.bestOf}
                  onChange={(e) => setForm({ ...form, bestOf: e.target.value })}
                  placeholder="Enter Best of"
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Note</Label>
                <Textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
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
                Exam List
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
                      <DropdownMenuItem>Order</DropdownMenuItem>
                      <DropdownMenuItem>Term</DropdownMenuItem>
                      <DropdownMenuItem>Name</DropdownMenuItem>
                      <DropdownMenuItem>Group Name</DropdownMenuItem>
                      <DropdownMenuItem>Best Of</DropdownMenuItem>
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
                      <TableHead className="font-bold text-gray-700 uppercase">Order</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Term</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Group Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Best Of</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.order}</TableCell>
                        <TableCell>{row.term}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.groupName}</TableCell>
                        <TableCell>{row.bestOf}</TableCell>
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
