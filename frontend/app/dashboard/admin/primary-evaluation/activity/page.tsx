"use client"

import { useMemo } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
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
  ClipboardList,
  Copy,
  Download,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react"

export default function PrimaryEvaluationActivity() {
  const rows = useMemo(
    () => [
      { id: "1", className: "KSV 6th", section: "A", subject: "Hindi", activity: "Drawing", type: "Non-Scholastic" },
      { id: "2", className: "3rd", section: "A", subject: "English", activity: "Manvi garg", type: "Scholastic" },
      { id: "3", className: "1st", section: "A", subject: "English", activity: "Block Boards", type: "Non-Scholastic" },
      { id: "4", className: "8th", section: "A", subject: "Accounts", activity: "Moral Science", type: "Scholastic" },
      { id: "5", className: "8th", section: "A", subject: "Business Studies", activity: "Moral Science", type: "Scholastic" },
      { id: "6", className: "8th", section: "A", subject: "biology", activity: "Moral Science", type: "Scholastic" },
      { id: "7", className: "1st", section: "A", subject: "Hindi", activity: "speech", type: "Scholastic" },
      { id: "8", className: "1st", section: "A", subject: "social", activity: "speech", type: "Scholastic" },
      { id: "9", className: "1st", section: "A", subject: "EVS", activity: "speech", type: "Scholastic" },
    ],
    [],
  )

  return (
    <DashboardLayout title="Activity">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Primary Evaluation</span>
            <span>/</span>
            <span>Activity</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="bg-pink-50 border-b border-pink-100">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Pencil className="h-5 w-5" />
                  Add / Add Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-red-500">Class *</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st</SelectItem>
                        <SelectItem value="3">3rd</SelectItem>
                        <SelectItem value="6">KSV 6th</SelectItem>
                        <SelectItem value="8">8th</SelectItem>
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-500">Subject*</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="evs">EVS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select defaultValue="Scholastic">
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scholastic">Scholastic</SelectItem>
                        <SelectItem value="Non-Scholastic">Non-Scholastic</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-red-500">*Only for template 4 purpose</div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button className="bg-blue-900 hover:bg-blue-800 px-8">Save</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-pink-50 border-b border-pink-100">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                    <ClipboardList className="h-5 w-5" />
                    Activity List
                  </CardTitle>
                  <Button className="bg-rose-500 hover:bg-rose-600">Bulk Delete</Button>
                </div>
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
                        <TableHead className="w-10" />
                        <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase">Section</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase">Activity</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row, idx) => (
                        <TableRow key={row.id} className={idx % 2 === 1 ? "bg-blue-50/30" : undefined}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{row.className}</TableCell>
                          <TableCell>{row.section}</TableCell>
                          <TableCell>{row.subject}</TableCell>
                          <TableCell className="max-w-[240px]">{row.activity}</TableCell>
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
      </div>
    </DashboardLayout>
  )
}
