"use client"

import DashboardLayout from "@/components/dashboard-layout"
<<<<<<< HEAD
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
=======
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileQuestion, ClipboardList, Users2, PlayCircle, Gauge, GraduationCap, ListChecks, BarChart2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OnlineExam() {
    const modules = [
        {
            title: "Question Bank",
            description: "Manage questions & tags",
            icon: <FileQuestion className="h-8 w-8 text-purple-600" />,
            href: "/dashboard/admin/online-exam/question-bank",
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Create Exam",
            description: "Define online exams",
            icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
            href: "/dashboard/admin/online-exam/create-exam",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Assign Exam",
            description: "Assign to classes / students",
            icon: <Users2 className="h-8 w-8 text-emerald-600" />,
            href: "/dashboard/admin/online-exam/assign-exam",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            title: "Conduct Exam",
            description: "Exam session controls",
            icon: <PlayCircle className="h-8 w-8 text-orange-600" />,
            href: "/dashboard/admin/online-exam/conduct-exam",
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "Auto-Grading",
            description: "Evaluate objective answers",
            icon: <Gauge className="h-8 w-8 text-indigo-600" />,
            href: "/dashboard/admin/online-exam/auto-grading",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            title: "Student Result",
            description: "View individual scores",
            icon: <GraduationCap className="h-8 w-8 text-cyan-600" />,
            href: "/dashboard/admin/online-exam/student-result",
            color: "bg-cyan-50 border-cyan-100"
        },
        {
            title: "Attempt Log",
            description: "Track attempts & events",
            icon: <ListChecks className="h-8 w-8 text-amber-600" />,
            href: "/dashboard/admin/online-exam/attempt-log",
            color: "bg-amber-50 border-amber-100"
        },
        {
            title: "Exam Reports",
            description: "Performance analytics",
            icon: <BarChart2 className="h-8 w-8 text-emerald-700" />,
            href: "/dashboard/admin/online-exam/exam-reports",
            color: "bg-emerald-50 border-emerald-100"
        }
    ]

    return (
        <DashboardLayout title="Online Exam">
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

