"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, Clock, AlertCircle, TrendingUp, Users, ChevronDown, Download, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentHomework() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  // Mock Data
  const assignmentsData = {
    child1: [
      { id: 101, subject: "Maths (10th)", title: "Quadratic Equations", dueDate: "2024-12-20", status: "Pending", priority: "High", description: "Complete exercises 5.1 to 5.3", attachment: "maths_ws.pdf" },
      { id: 102, subject: "Physics", title: "Light & Reflection", dueDate: "2024-12-22", status: "Pending", priority: "Medium", description: "Lab report on mirror reflection experiments", attachment: "lab_manual.pdf" },
      { id: 103, subject: "English", title: "Poetry Analysis", dueDate: "2024-12-15", status: "Submitted", priority: "Low", description: "Analysis of 'The Road Not Taken'", score: 88 }
    ],
    child2: [
      { id: 201, subject: "Science (8th)", title: "Cell Structure", dueDate: "2024-12-21", status: "Pending", priority: "High", description: "Draw and label plant vs animal cells", attachment: "cell_diagram.jpg" },
      { id: 202, subject: "History", title: "Freedom Struggle", dueDate: "2024-12-19", status: "Overdue", priority: "High", description: "Timeline of events 1920-1947" },
      { id: 203, subject: "Maths", title: "Fractions", dueDate: "2024-12-10", status: "Graded", priority: "Medium", description: "Worksheet 4B", score: 95 }
    ]
  }

  const assignments = assignmentsData[selectedChild]

  const pendingCount = assignments.filter(a => a.status === "Pending" || a.status === "Overdue").length
  const submittedCount = assignments.filter(a => a.status === "Submitted" || a.status === "Graded").length
  const gradedAssignments = assignments.filter(a => a.status === "Graded" && a.score)
  const averageScore = gradedAssignments.length > 0
    ? gradedAssignments.reduce((sum, a) => sum + (a.score || 0), 0) / gradedAssignments.length
    : 0

  const handleDownload = (filename: string) => {
    toast.success("Download Started", { description: `Downloading ${filename}...` })
  }

  return (
    <DashboardLayout title="H.W. / C.W.">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Homework & Classwork
            </h2>
            <p className="text-muted-foreground mt-1">
              Track assignments for {children[selectedChild].name}
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
            title="Total Tasks"
            value={assignments.length.toString()}
            icon={BookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending"
            value={pendingCount.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Completed"
            value={submittedCount.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Avg Score"
            value={averageScore > 0 ? `${Math.round(averageScore)}%` : "-"}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Assignments List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              All Assignments
            </CardTitle>
            <CardDescription>Complete list of homework and classwork</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="group p-5 border rounded-xl hover:shadow-md transition-all bg-white relative overflow-hidden">
                  {assignment.status === "Overdue" && <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />}

                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {assignment.subject}
                        </Badge>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${assignment.priority === "High" ? "bg-red-100 text-red-700" :
                            assignment.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                              "bg-green-100 text-green-700"
                          }`}>
                          {assignment.priority} Priority
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        {assignment.status === "Overdue" && (
                          <span className="text-red-600 font-bold flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Overdue
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                      {assignment.score ? (
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">{assignment.score}%</div>
                          <div className="text-xs text-green-700 font-medium">Score Achieved</div>
                        </div>
                      ) : (
                        <Badge className={`px-3 py-1 ${assignment.status === "Pending" ? "bg-orange-500" :
                            assignment.status === "Overdue" ? "bg-red-500" : "bg-blue-500"
                          }`}>
                          {assignment.status}
                        </Badge>
                      )}

                      {assignment.attachment && (
                        <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={() => handleDownload(assignment.attachment || "file")}>
                          <Download className="h-3 w-3" /> Attachment
                        </Button>
                      )}
                    </div>
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
