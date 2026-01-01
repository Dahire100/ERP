"use client"

import { useMemo, useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Search,
  Trash2,
} from "lucide-react"

const initialRows = [
  { id: 1, name: "Activity", startDate: "09-07-2025", endDate: "09-07-2025", resultPublishDate: "09-07-2025" },
  { id: 2, name: "Class TEST", startDate: "11-09-2025", endDate: "11-09-2025", resultPublishDate: "11-09-2025" },
  { id: 3, name: "Curricular", startDate: "21-08-2025", endDate: "21-08-2025", resultPublishDate: "21-08-2025" },
]

export default function TermList() {
  const [rows] = useState(initialRows)
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [form, setForm] = useState({
    name: "",
    startDate: today,
    endDate: today,
    resultPublishDate: today,
  })

  return (
    <DashboardLayout title="Term List">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Term List</span>
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Pencil className="h-5 w-5" />
                Add / Edit Term List
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
                <Label className="text-red-500">Start Date *</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">End Date *</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="bg-white border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-red-500">Result Publish Date *</Label>
                <Input
                  type="date"
                  value={form.resultPublishDate}
                  onChange={(e) => setForm({ ...form, resultPublishDate: e.target.value })}
                  className="bg-white border-gray-200"
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
                Term List
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
                      <DropdownMenuItem>Start Date</DropdownMenuItem>
                      <DropdownMenuItem>End Date</DropdownMenuItem>
                      <DropdownMenuItem>Result Publish Date</DropdownMenuItem>
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
                      <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Start Date</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">End Date</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Result Publish Date</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.startDate}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        <TableCell>{row.resultPublishDate}</TableCell>
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
