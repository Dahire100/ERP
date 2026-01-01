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
import { CalendarDays, ClipboardList, Copy, Download, Pencil, Printer, Search } from "lucide-react"

export default function QuestionPaperType() {
  return (
    <DashboardLayout title="Type">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Question Paper</span>
            <span>/</span>
            <span>Type</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="bg-pink-50 border-b border-pink-100">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Pencil className="h-5 w-5" />
                  Add / Edit Type
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Name *</Label>
                  <Input placeholder="Enter name" className="bg-white border-gray-200" />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-pink-50 border-b border-pink-100">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <ClipboardList className="h-5 w-5" />
                  Type List
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
                        <TableHead className="w-12">#</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                        <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {["long descriptive","very short answer","short answer","case-based questions","long answer"].map((name, idx) => (
                        <TableRow key={name} className={idx % 2 === 1 ? "bg-blue-50/30" : undefined}>
                          <TableCell>{idx + 7}</TableCell>
                          <TableCell className="capitalize">{name}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="bg-blue-900 hover:bg-blue-800">
                                  Action
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" /> Edit
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
