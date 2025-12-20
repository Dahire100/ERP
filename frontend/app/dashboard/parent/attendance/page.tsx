"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, Users, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentAttendance() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  // Mock Data per child
  const attendanceData = {
    child1: {
      totalDays: 180,
      present: 172,
      absent: 5,
      late: 3,
      percentage: 95.5,
      recent: [
        { date: "2024-12-18", status: "Present", time: "08:05 AM" },
        { date: "2024-12-17", status: "Present", time: "08:10 AM" },
        { date: "2024-12-16", status: "Late", time: "08:45 AM" },
        { date: "2024-12-13", status: "Present", time: "08:12 AM" },
        { date: "2024-12-12", status: "Present", time: "08:00 AM" },
      ]
    },
    child2: {
      totalDays: 180,
      present: 160,
      absent: 15,
      late: 5,
      percentage: 88.8,
      recent: [
        { date: "2024-12-18", status: "Present", time: "08:20 AM" },
        { date: "2024-12-17", status: "Absent", time: "-" },
        { date: "2024-12-16", status: "Present", time: "08:15 AM" },
        { date: "2024-12-13", status: "Late", time: "08:40 AM" },
        { date: "2024-12-12", status: "Present", time: "08:10 AM" },
      ]
    }
  }

  const currentData = attendanceData[selectedChild]

  const handleViewReport = () => {
    toast.info("Downloading Full Attendance Report", { description: `Generating PDF report for ${children[selectedChild].name}` })
  }

  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Attendance Tracking
            </h2>
            <p className="text-muted-foreground mt-1">
              Monitor attendance and punctuality for {children[selectedChild].name}
            </p>
          </div>

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Days"
            value={currentData.totalDays.toString()}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Present"
            value={currentData.present.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Absent"
            value={currentData.absent.toString()}
            icon={XCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Late Arrivals"
            value={currentData.late.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Attendance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Attendance Overview
              </CardTitle>
              <CardDescription>Overall academic year performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className={`text-2xl font-bold ${currentData.percentage >= 90 ? 'text-green-600' : 'text-orange-500'}`}>
                    {currentData.percentage}%
                  </span>
                </div>
                <Progress value={currentData.percentage} className={`h-3 ${currentData.percentage >= 90 ? 'bg-green-100' : 'bg-orange-100'}`} />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center p-3 rounded-lg bg-green-50">
                  <p className="text-2xl font-bold text-green-600">{currentData.present}</p>
                  <p className="text-xs font-semibold text-green-700">Present</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50">
                  <p className="text-2xl font-bold text-red-600">{currentData.absent}</p>
                  <p className="text-xs font-semibold text-red-700">Absent</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-orange-50">
                  <p className="text-2xl font-bold text-orange-600">{currentData.late}</p>
                  <p className="text-xs font-semibold text-orange-700">Late</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Recent History
              </CardTitle>
              <CardDescription>Last 5 school days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.recent.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${record.status === "Present" ? "bg-green-100" :
                          record.status === "Absent" ? "bg-red-100" : "bg-orange-100"
                        }`}>
                        {record.status === "Present" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : record.status === "Absent" ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-muted-foreground">{record.time !== "-" ? `Check-in: ${record.time}` : "Not checked in"}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${record.status === "Present" ? "bg-green-100 text-green-700" :
                        record.status === "Absent" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                      }`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={handleViewReport}
              >
                Download Full Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
