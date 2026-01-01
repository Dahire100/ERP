"use client"

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
  Printer,
  UserRound,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const rows = [
  {
    id: 1,
    name: "Karan Sharma",
    className: "6th-A",
    applyDate: "09-12-2025",
    days: "3 Days",
    leaveDate: "22-12-2025 - 24-12-2025",
    status: "Approved",
    reply: "Ok, Approved",
    description: "Due to family function",
  },
  {
    id: 2,
    name: "testy",
    className: "3rd-A",
    applyDate: "09-12-2025",
    days: "1 Day",
    leaveDate: "09-12-2025 - 09-12-2025",
    status: "Approved",
    reply: "",
    description: "test",
  },
]

export default function StudentLeave() {
  return (
    <DashboardLayout title="Student Leave">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Attendance</span>
            <span>/</span>
            <span>Student Leave</span>
          </span>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <UserRound className="h-5 w-5" />
                Student Leave List
              </CardTitle>
              <Button className="bg-blue-900 hover:bg-blue-800">Add Leave</Button>
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
                      <LayoutList className="h-4 w-4 mr-2" />
                      Column visibility
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Name</DropdownMenuItem>
                    <DropdownMenuItem>Class</DropdownMenuItem>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem>Description</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
                <div className="w-24">
                  <Label> </Label>
                  <Select defaultValue="10">
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-72">
                  <Label>Search:</Label>
                  <Input placeholder="" className="bg-white border-gray-200" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Apply Date</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">No of Days</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Leave Date</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Status</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Reply</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Description</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.applyDate}</TableCell>
                      <TableCell>{row.days}</TableCell>
                      <TableCell>{row.leaveDate}</TableCell>
                      <TableCell className="text-green-700">{row.status}</TableCell>
                      <TableCell>{row.reply}</TableCell>
                      <TableCell className="max-w-[18rem] whitespace-pre-wrap">{row.description}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-blue-900 hover:bg-blue-800">
                              Action
                              <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
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
