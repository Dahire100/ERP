"use client"

import DashboardLayout from "@/components/dashboard-layout"
<<<<<<< HEAD
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
  Plus,
  Printer,
  Search,
} from "lucide-react"

export default function OnlineClass() {
  return (
    <DashboardLayout title="Online Class">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Online Class</span>
            <span>/</span>
            <span>Online Class</span>
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
                Add Online Class
              </Button>
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
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="10">10th</SelectItem>
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
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="maths">Maths</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
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
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <LayoutList className="h-5 w-5" />
              Online Class List
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
                    <DropdownMenuItem>Subject</DropdownMenuItem>
                    <DropdownMenuItem>Title</DropdownMenuItem>
                    <DropdownMenuItem>Meeting URL</DropdownMenuItem>
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
                    <TableHead className="font-bold text-gray-700 uppercase">Class</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Section</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Title</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Meeting Url</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>10th</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>biology</TableCell>
                    <TableCell>Human Anatomy</TableCell>
                    <TableCell>xyz.com</TableCell>
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
                    <TableCell>1st</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>Maths</TableCell>
                    <TableCell>Trigonometry</TableCell>
                    <TableCell className="break-all">http://meet.google.com/djm-tyqm-owz?authuser=0</TableCell>
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
=======
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarClock, Link2, Users, History, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OnlineClass() {
    const modules = [
        {
            title: "Class Schedule",
            description: "Plan upcoming live classes",
            icon: <CalendarClock className="h-8 w-8 text-blue-600" />,
            href: "/dashboard/admin/online-class/class-schedule",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Class Join Link",
            description: "Share Zoom/Meet links",
            icon: <Link2 className="h-8 w-8 text-emerald-600" />,
            href: "/dashboard/admin/online-class/class-join-link",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            title: "Attendee Tracking",
            description: "Track attendance for live classes",
            icon: <Users className="h-8 w-8 text-purple-600" />,
            href: "/dashboard/admin/online-class/attendee-tracking",
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Past Class Logs",
            description: "Review history and recordings",
            icon: <History className="h-8 w-8 text-orange-600" />,
            href: "/dashboard/admin/online-class/past-class-logs",
            color: "bg-orange-50 border-orange-100"
        }
    ]

    return (
        <DashboardLayout title="Online Class">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <Link key={index} href={module.href}>
                            <Card className={`h-full transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border ${module.color}`}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-white rounded-xl shadow-sm">
                                            {module.icon}
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                                        {module.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600">
                                        {module.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
}

