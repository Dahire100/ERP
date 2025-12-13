"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Copy,
  Download,
  Plus,
  Printer,
  Search,
} from "lucide-react"

export default function OnlineExam() {
  return (
    <DashboardLayout title="Online Exam">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Online Exam</span>
            <span>/</span>
            <span>Online Exam</span>
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
                Add Exam
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" className="bg-white border-gray-200" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Online Exam List</CardTitle>
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
                    <DropdownMenuItem>Exam</DropdownMenuItem>
                    <DropdownMenuItem>Questions</DropdownMenuItem>
                    <DropdownMenuItem>Assigned Staff</DropdownMenuItem>
                    <DropdownMenuItem>Attempt</DropdownMenuItem>
                    <DropdownMenuItem>Exam From</DropdownMenuItem>
                    <DropdownMenuItem>Exam To</DropdownMenuItem>
                    <DropdownMenuItem>Duration</DropdownMenuItem>
                    <DropdownMenuItem>Exam Publish</DropdownMenuItem>
                    <DropdownMenuItem>Exam Result</DropdownMenuItem>
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
                    <TableHead className="font-bold text-gray-700 uppercase">Exam</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Questions</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Assigned Staff</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Attempt</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Exam From</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Exam To</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Duration</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-center">Exam Publish</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Exam Result</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>fff</TableCell>
                    <TableCell>
                      (Descriptive: 1)
                      <br />
                      (MCQ: 3)
                    </TableCell>
                    <TableCell>Demo User</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      06-05-2025
                      <br />
                      (21:40:10)
                    </TableCell>
                    <TableCell>
                      06-05-2025
                      <br />
                      (21:40:10)
                    </TableCell>
                    <TableCell>00:04:00</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked disabled />
                    </TableCell>
                    <TableCell />
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow className="bg-blue-50/30">
                    <TableCell>KV Test</TableCell>
                    <TableCell>
                      (Descriptive: 0)
                      <br />
                      (MCQ: 0)
                    </TableCell>
                    <TableCell>Aatam Jain, Demo User</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      02-12-2025
                      <br />
                      (11:36:53)
                    </TableCell>
                    <TableCell>
                      02-12-2025
                      <br />
                      (11:36:53)
                    </TableCell>
                    <TableCell>01:00:00</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked disabled />
                    </TableCell>
                    <TableCell />
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Test KV</TableCell>
                    <TableCell>
                      (Descriptive: 1)
                      <br />
                      (MCQ: 0)
                    </TableCell>
                    <TableCell>Demo User</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      11-12-2025
                      <br />
                      (11:47:32)
                    </TableCell>
                    <TableCell>
                      11-12-2025
                      <br />
                      (11:47:32)
                    </TableCell>
                    <TableCell>01:00:00</TableCell>
                    <TableCell className="text-center">
                      <Checkbox disabled />
                    </TableCell>
                    <TableCell />
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-gray-500">Showing 1 to 3 of 3 entries</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

