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
import { CalendarDays, ChevronDown, ClipboardList, Copy, Download, Plus, Printer, Search } from "lucide-react"

export default function QuestionPaperQuestion() {
  return (
    <DashboardLayout title="Question">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Question Paper</span>
            <span>/</span>
            <span>Question</span>
          </span>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Search className="h-5 w-5" />
                Select Criteria
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Download className="h-4 w-4 mr-2" />
                  Import Questions
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5th</SelectItem>
                    <SelectItem value="3">3rd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
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
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <ClipboardList className="h-5 w-5" />
                Question List
              </CardTitle>
              <Button variant="destructive" className="bg-rose-500 hover:bg-rose-600">Bulk Delete</Button>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-200">
                      Column visibility
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>#</DropdownMenuItem>
                    <DropdownMenuItem>Questions</DropdownMenuItem>
                    <DropdownMenuItem>Class</DropdownMenuItem>
                    <DropdownMenuItem>Subject</DropdownMenuItem>
                    <DropdownMenuItem>Lesson</DropdownMenuItem>
                    <DropdownMenuItem>Session</DropdownMenuItem>
                    <DropdownMenuItem>Type</DropdownMenuItem>
                    <DropdownMenuItem>Level</DropdownMenuItem>
                    <DropdownMenuItem>Marks</DropdownMenuItem>
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
                    <TableHead className="w-10">#</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Questions</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Lesson</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Session</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Level</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Marks</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1,2,3].map((i, idx) => (
                    <TableRow key={i} className={idx % 2 === 1 ? "bg-blue-50/30" : undefined}>
                      <TableCell>{i}</TableCell>
                      <TableCell>Tell me about Yourself?</TableCell>
                      <TableCell>5th - A</TableCell>
                      <TableCell>English</TableCell>
                      <TableCell>lesson1</TableCell>
                      <TableCell>2025-26</TableCell>
                      <TableCell>long descriptive</TableCell>
                      <TableCell>Easy</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-blue-900 hover:bg-blue-800">Action</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
