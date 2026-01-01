"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Award, Clock, TrendingUp, Users, ChevronDown, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentExaminations() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const examData = {
    child1: {
      upcoming: [
        { id: 101, subject: "Maths (Pre-Board)", date: "2024-12-25", time: "10:00 AM", duration: "3 hours", syllabus: "Full Syllabus", daysLeft: 5 },
        { id: 102, subject: "Physics (Theory)", date: "2024-12-28", time: "10:00 AM", duration: "3 hours", syllabus: "Chapters 1-12", daysLeft: 8 },
      ],
      results: [
        { subject: "Maths (Mid-Term)", marks: 95, total: 100, grade: "A+", percentage: 95 },
        { subject: "Science (Mid-Term)", marks: 88, total: 100, grade: "A", percentage: 88 },
        { subject: "English (Term 1)", marks: 92, total: 100, grade: "A+", percentage: 92 },
      ]
    },
    child2: {
      upcoming: [
        { id: 201, subject: "History (Finals)", date: "2024-12-24", time: "09:00 AM", duration: "2 hours", syllabus: "Modern History", daysLeft: 4 },
        { id: 202, subject: "Geography", date: "2024-12-26", time: "09:00 AM", duration: "2 hours", syllabus: "Maps & Climate", daysLeft: 6 },
      ],
      results: [
        { subject: "Maths", marks: 78, total: 100, grade: "B+", percentage: 78 },
        { subject: "Science", marks: 82, total: 100, grade: "A", percentage: 82 },
        { subject: "English", marks: 85, total: 100, grade: "A", percentage: 85 },
      ]
    }
  }

  const currentData = examData[selectedChild]

  // Calculate stats
  const averagePercentage = currentData.results.length > 0
    ? currentData.results.reduce((sum, r) => sum + r.percentage, 0) / currentData.results.length
    : 0

  // Handlers
  const handleDownloadSchedule = () => {
    toast.success("Schedule Downloaded", { description: `Exam schedule for ${children[selectedChild].name} saved.` })
  }

  const handleDownloadReport = () => {
    toast.success("Report Downloaded", { description: `Downloading latest report card for ${children[selectedChild].name}...` })
  }

  return (
    <DashboardLayout title="Examinations">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Examinations
            </h2>
            <p className="text-muted-foreground mt-1">
              Track schedules and results for {children[selectedChild].name}
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
            title="Upcoming Exams"
            value={currentData.upcoming.length.toString()}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Average Score"
            value={`${Math.round(averagePercentage)}%`}
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Subjects Graded"
            value={currentData.results.length.toString()}
            icon={BookOpen}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Next Exam In"
            value={currentData.upcoming[0] ? `${currentData.upcoming[0].daysLeft} days` : "-"}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Exams */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Upcoming Exams
                  </CardTitle>
                  <CardDescription>Scheduled examinations</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleDownloadSchedule} title="Download Schedule">
                  <Download className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.upcoming.length > 0 ? currentData.upcoming.map((exam) => (
                  <div key={exam.id} className="group p-4 border rounded-xl hover:shadow-md transition-all bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <div className="flex items-start justify-between mb-2">
                      <div className="pl-2">
                        <p className="font-bold text-gray-800">{exam.subject}</p>
                        <p className="text-xs text-muted-foreground">{exam.syllabus}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
                        {exam.daysLeft} days left
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 pl-2 mt-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(exam.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.time}</span>
                      <span className="col-span-2 flex items-center gap-1">⏳ Duration: {exam.duration}</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">No upcoming exams.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Recent Results
                  </CardTitle>
                  <CardDescription>Latest performance</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleDownloadReport} title="Download Report">
                  <Download className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.results.map((result, index) => (
                  <div key={index} className="space-y-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{result.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-green-600">{result.grade}</span>
                        <span className="text-sm text-muted-foreground font-medium">{result.marks}/{result.total}</span>
                      </div>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                  </div>
                ))}
                <div className="pt-4 border-t mt-2">
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Overall Average</span>
                    <span className="text-2xl font-bold text-green-700">{Math.round(averagePercentage)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md text-md" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Full Report Card
          </Button>
          <Button variant="outline" className="w-full h-12 shadow-sm text-md hover:bg-gray-50" onClick={handleDownloadSchedule}>
            <Calendar className="h-4 w-4 mr-2" />
            View Full Exam Schedule
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
