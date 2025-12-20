"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, TrendingUp, Filter, Upload, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"

export default function StudentHomework() {
  const [filterSubject, setFilterSubject] = useState("all")
  const [submissionOpen, setSubmissionOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)

  const assignments = [
    { id: 1, title: "Algebra Problems", subject: "Mathematics", dueDate: "2024-11-18", status: "Pending", priority: "High", description: "Complete exercises 1-10 from page 42. Show all working steps.", score: null },
    { id: 2, title: "Essay Writing", subject: "English", dueDate: "2024-11-15", status: "Submitted", priority: "Low", description: "Write a 500-word essay on environmental conservation.", score: null },
    { id: 3, title: "Lab Report", subject: "Science", dueDate: "2024-11-20", status: "Pending", priority: "Medium", description: "Submit the chemistry experiment report including observation tables.", score: null },
    { id: 4, title: "Chapter Summary", subject: "History", dueDate: "2024-11-12", status: "Graded", priority: "Low", description: "Summarize chapter 3: The Industrial Revolution.", score: 88 },
    { id: 5, title: "Geometry Assignment", subject: "Mathematics", dueDate: "2024-11-10", status: "Graded", priority: "Medium", description: "Solve geometry problems on triangles.", score: 95 },
  ]

  const subjects = Array.from(new Set(assignments.map(a => a.subject)))

  const filteredAssignments = assignments.filter(a => filterSubject === "all" || a.subject === filterSubject)

  const pendingCount = assignments.filter(a => a.status === "Pending").length
  const submittedCount = assignments.filter(a => a.status === "Submitted").length
  const gradedAssignments = assignments.filter(a => a.status === "Graded" && a.score)
  const averageScore = gradedAssignments.length > 0
    ? gradedAssignments.reduce((sum, a) => sum + (a.score || 0), 0) / gradedAssignments.length
    : 0

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
      case "Medium": return "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"
      case "Low": return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionOpen(false)
    toast.success("Assignment Submitted", { description: `Successfully submitted ${selectedAssignment?.title}` })
  }

  const renderAssignmentList = (statusFilter: string) => {
    const list = filteredAssignments.filter(a => statusFilter === "All" || a.status === statusFilter)

    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <BookOpen className="h-12 w-12 mb-4 opacity-20" />
          <p>No assignments found</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((assignment) => (
          <Card key={assignment.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">{assignment.subject}</Badge>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                </div>
                <Badge className={getPriorityColor(assignment.priority)} variant="outline">{assignment.priority}</Badge>
              </div>
              <CardDescription className="line-clamp-2 mt-1">{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3 flex-1">
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
                {assignment.score && (
                  <span className="font-bold text-green-600 border px-2 py-1 rounded-md bg-green-50">Score: {assignment.score}%</span>
                )}
              </div>

              {/* Progress bar for graded items simply to visualize score */}
              {assignment.score && <Progress value={assignment.score} className="h-1.5" />}
            </CardContent>
            <CardFooter className="pt-0">
              {assignment.status === "Pending" ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => { setSelectedAssignment(assignment); setSubmissionOpen(true); }}
                >
                  <Upload className="h-4 w-4 mr-2" /> Submit Assignment
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" /> View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout title="H.W. / C.W.">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Homework & Classwork
            </h2>
            <p className="text-muted-foreground mt-1">
              Track assignments and monitor progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Assignments"
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
            title="Submitted"
            value={submittedCount.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Average Score"
            value={`${Math.round(averageScore)}%`}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Tabs for Filtering */}
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="All" className="flex-1 max-w-[150px]">All Assignments</TabsTrigger>
            <TabsTrigger value="Pending" className="flex-1 max-w-[150px]">Pending</TabsTrigger>
            <TabsTrigger value="Submitted" className="flex-1 max-w-[150px]">Submitted</TabsTrigger>
            <TabsTrigger value="Graded" className="flex-1 max-w-[150px]">Graded</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="All">{renderAssignmentList("All")}</TabsContent>
            <TabsContent value="Pending">{renderAssignmentList("Pending")}</TabsContent>
            <TabsContent value="Submitted">{renderAssignmentList("Submitted")}</TabsContent>
            <TabsContent value="Graded">{renderAssignmentList("Graded")}</TabsContent>
          </div>
        </Tabs>

        {/* Submission Dialog */}
        <Dialog open={submissionOpen} onOpenChange={setSubmissionOpen}>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
                <DialogDescription>Upload your files or type your response below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>File Upload</Label>
                  <Input type="file" />
                </div>
                <div className="space-y-2">
                  <Label>Comments / Answer</Label>
                  <Textarea placeholder="Type your answer here..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
