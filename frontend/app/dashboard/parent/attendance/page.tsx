"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react"

export default function ParentAttendance() {
  const attendanceData = {
    totalDays: 180,
    present: 165,
    absent: 15,
    late: 5,
    percentage: 91.67
  }

  const recentAttendance = [
    { date: "2024-11-06", status: "Present", time: "08:15 AM" },
    { date: "2024-11-05", status: "Present", time: "08:10 AM" },
    { date: "2024-11-04", status: "Late", time: "08:35 AM" },
    { date: "2024-11-01", status: "Present", time: "08:12 AM" },
    { date: "2024-10-31", status: "Absent", time: "-" },
  ]

  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Attendance Tracking
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor your child's attendance and punctuality
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Days"
            value={attendanceData.totalDays.toString()}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Present"
            value={attendanceData.present.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Absent"
            value={attendanceData.absent.toString()}
            icon={XCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Late Arrivals"
            value={attendanceData.late.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attendance Overview
            </CardTitle>
            <CardDescription>Overall attendance performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-2xl font-bold text-green-600">{attendanceData.percentage}%</span>
              </div>
              <Progress value={attendanceData.percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{attendanceData.present}</p>
                <p className="text-xs text-muted-foreground">Days Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{attendanceData.absent}</p>
                <p className="text-xs text-muted-foreground">Days Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{attendanceData.late}</p>
                <p className="text-xs text-muted-foreground">Late Arrivals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Last 5 days attendance record</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      record.status === "Present" ? "bg-green-100" :
                      record.status === "Absent" ? "bg-red-100" : "bg-orange-100"
                    }`}>
                      {record.status === "Present" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : record.status === "Absent" ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-muted-foreground">Check-in: {record.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    record.status === "Present" ? "bg-green-100 text-green-700" :
                    record.status === "Absent" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View Full Attendance Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
