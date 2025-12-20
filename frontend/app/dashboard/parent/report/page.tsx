"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Award, TrendingUp, Download, Calendar, Users, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentReport() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  // Mock Data
  const reportsData = {
    child1: {
      currentTerm: {
        term: "Term 1 - 2024-25",
        subjects: [
          { name: "Mathematics", marks: 95, grade: "A+", remarks: "Excellent problem solving" },
          { name: "Physics", marks: 88, grade: "A", remarks: "Good conceptual clarity" },
          { name: "English", marks: 92, grade: "A+", remarks: "Outstanding vocabulary" },
          { name: "Chemistry", marks: 85, grade: "A", remarks: "Consistent effort" },
          { name: "Computer Sc.", marks: 98, grade: "A+", remarks: "Exceptional" },
        ],
        overallPercentage: 91.6,
        overallGrade: "A+",
        rank: 3,
        totalStudents: 42
      },
      previousTerms: [
        { term: "Finals (Class 9)", percentage: 89.5, grade: "A+" },
        { term: "Mid-Term (Class 9)", percentage: 88.0, grade: "A" },
      ]
    },
    child2: {
      currentTerm: {
        term: "Term 1 - 2024-25",
        subjects: [
          { name: "Mathematics", marks: 78, grade: "B+", remarks: "Needs more practice" },
          { name: "Science", marks: 82, grade: "A", remarks: "Good participation" },
          { name: "English", marks: 88, grade: "A", remarks: "Very good writing" },
          { name: "History", marks: 90, grade: "A+", remarks: "Excellent recall" },
          { name: "Geography", marks: 85, grade: "A", remarks: "Good map work" },
        ],
        overallPercentage: 84.6,
        overallGrade: "A",
        rank: 12,
        totalStudents: 38
      },
      previousTerms: [
        { term: "Finals (Class 7)", percentage: 82.0, grade: "A" },
        { term: "Mid-Term (Class 7)", percentage: 80.5, grade: "B+" },
      ]
    }
  }

  const currentData = reportsData[selectedChild]

  const handleDownloadReport = () => {
    toast.success("Download Started", { description: `Generating term report PDF for ${children[selectedChild].name}...` })
  }

  return (
    <DashboardLayout title="Report">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Academic Report
            </h2>
            <p className="text-muted-foreground mt-1">
              View academic performance for {children[selectedChild].name}
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
            title="Overall Grade"
            value={currentData.currentTerm.overallGrade}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Percentage"
            value={`${currentData.currentTerm.overallPercentage}%`}
            icon={TrendingUp}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Class Rank"
            value={`#${currentData.currentTerm.rank}`}
            icon={Award}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Total Subjects"
            value={currentData.currentTerm.subjects.length.toString()}
            icon={FileText}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Term Report */}
          <div className="md:col-span-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {currentData.currentTerm.term}
                    </CardTitle>
                    <CardDescription>Subject-wise performance breakdown</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.currentTerm.subjects.map((subject, index) => (
                    <div key={index} className="p-4 border rounded-xl hover:shadow-sm transition-all hover:bg-gray-50 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-800">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.remarks}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{subject.grade}</p>
                          <p className="text-sm text-gray-500">{subject.marks}/100</p>
                        </div>
                      </div>
                      <Progress value={subject.marks} className={`h-2 ${subject.marks >= 90 ? 'bg-green-100' : 'bg-blue-100'}`} />
                    </div>
                  ))}

                  <div className="pt-4 border-t mt-4">
                    <div className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Overall Performance</p>
                        <p className="text-xs text-blue-700 mt-1">Rank: #{currentData.currentTerm.rank} of {currentData.currentTerm.totalStudents} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-900">{currentData.currentTerm.overallGrade}</p>
                        <p className="text-sm font-medium text-blue-700">{currentData.currentTerm.overallPercentage}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Term Comparison */}
          <div>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  History
                </CardTitle>
                <CardDescription>Previous term trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.previousTerms.map((term, index) => (
                    <div key={index} className="p-4 border rounded-xl bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">{term.term}</span>
                        <span className="text-lg font-bold text-purple-600">{term.grade}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Percentage</span>
                          <span>{term.percentage}%</span>
                        </div>
                        <Progress value={term.percentage} className="h-1.5 bg-purple-100" />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 mt-2">
                    <div className="flex items-center gap-2 text-sm p-3 bg-green-50 text-green-700 rounded-lg">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">Consistent Performance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex justify-between group" variant="outline">
                <span>Term 1 Report</span>
                <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </Button>
              <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex justify-between group" variant="outline">
                <span>Performance Analysis</span>
                <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
