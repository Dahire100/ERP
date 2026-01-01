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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarDays, ClipboardList, Download, Plus, Printer, Search, Copy, ChevronDown } from "lucide-react"

export default function QuestionPaperGenerate() {
  return (
    <DashboardLayout title="Paper">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Question Paper</span>
            <span>/</span>
            <span>Paper List</span>
          </span>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Search className="h-5 w-5" />
                Select Criteria
              </CardTitle>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ksv6">KSV 6th</SelectItem>
                    <SelectItem value="3">3rd</SelectItem>
                    <SelectItem value="6">6th</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="maths">Maths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Session</Label>
                <Select defaultValue="2025-26">
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                    <SelectItem value="2025-26">2025-26</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <ClipboardList className="h-5 w-5" />
              Question Paper List
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
                    <DropdownMenuItem>Title</DropdownMenuItem>
                    <DropdownMenuItem>Class</DropdownMenuItem>
                    <DropdownMenuItem>Subject</DropdownMenuItem>
                    <DropdownMenuItem>Session</DropdownMenuItem>
                    <DropdownMenuItem>Marks</DropdownMenuItem>
                    <DropdownMenuItem>Time</DropdownMenuItem>
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
                    <TableHead className="font-bold text-gray-700 uppercase">Title</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Session</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Marks</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Time</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { title: ",nfkmkf", klass: "KSV 6th", subject: "English", session: "2024-25", marks: 2, time: "30" },
                    { title: "1A", klass: "3rd", subject: "English", session: "2025-26", marks: 15, time: "1.50" },
                    { title: "abc", klass: "KSV 6th", subject: "Hindi", session: "2025-26", marks: 20, time: "25" },
                  ].map((row, idx) => (
                    <TableRow key={row.title} className={idx % 2 === 1 ? "bg-blue-50/30" : undefined}>
                      <TableCell className="truncate max-w-[200px]">{row.title}</TableCell>
                      <TableCell>{row.klass}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.session}</TableCell>
                      <TableCell>{row.marks}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-blue-900 hover:bg-blue-800">Action</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
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
    </DashboardLayout>
  )
}
