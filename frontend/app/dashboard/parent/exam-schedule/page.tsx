"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Clock, BookOpen, Users, ChevronDown, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentExamSchedule() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const schedules = {
    child1: [
      { id: 1, exam: "Pre-Board 1", subject: "Mathematics", date: "2025-01-25", time: "09:00 AM - 12:00 PM", room: "Hall A" },
      { id: 2, exam: "Pre-Board 1", subject: "Physics", date: "2025-01-27", time: "09:00 AM - 12:00 PM", room: "Lab 1" },
      { id: 3, exam: "Pre-Board 1", subject: "Chemistry", date: "2025-01-29", time: "09:00 AM - 12:00 PM", room: "Lab 2" },
      { id: 4, exam: "Pre-Board 1", subject: "English", date: "2025-01-31", time: "09:00 AM - 12:00 PM", room: "Hall B" },
    ],
    child2: [
      { id: 1, exam: "Final Term", subject: "Mathematics", date: "2025-03-10", time: "10:00 AM - 01:00 PM", room: "Room 101" },
      { id: 2, exam: "Final Term", subject: "History", date: "2025-03-12", time: "10:00 AM - 01:00 PM", room: "Room 102" },
      { id: 3, exam: "Final Term", subject: "Science", date: "2025-03-14", time: "10:00 AM - 01:00 PM", room: "Lab 1" },
    ]
  }

  const currentSchedule = schedules[selectedChild]

  const handleDownload = () => {
    toast.success("Schedule Downloaded", { description: "Exam schedule PDF has been saved to your device." })
  }

  return (
    <DashboardLayout title="Exam Schedule">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Exam Schedule
            </h2>
            <p className="text-muted-foreground mt-1">
              Upcoming examinations for {children[selectedChild].name}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between shadow-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    {children[selectedChild].name}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setSelectedChild("child1")}>
                  Alice Student (10-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedChild("child2")}>
                  Bob Student (8-B)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Exams"
            value={currentSchedule.length.toString()}
            icon={BookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Next Exam"
            value="Maths"
            icon={Calendar}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Status"
            value="Confirmed"
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Exam List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Detailed Schedule
            </CardTitle>
            <CardDescription>Date sheet for upcoming tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSchedule.map((exam) => (
                <div key={exam.id} className="p-4 border rounded-xl hover:shadow-md transition-all bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg shrink-0 text-center min-w-[70px]">
                      <p className="text-xs font-bold text-blue-600 uppercase mb-1">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</p>
                      <p className="text-2xl font-bold text-blue-700 leading-none">{new Date(exam.date).getDate()}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{exam.subject}</h4>
                      <p className="text-sm font-medium text-blue-600">{exam.exam}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.time}</span>
                        <span className="flex items-center gap-1">Room: {exam.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:text-right w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 flex flex-row md:flex-col justify-between items-center md:items-end">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Upcoming</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

