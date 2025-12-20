"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, CheckCircle, Clock, Plus, Filter, Search, MoreHorizontal } from "lucide-react"

export default function TeacherHomework() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentAssignment, setCurrentAssignment] = useState<any>(null)

  // Initial State
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Algebra Problems", class: "10-A", subject: "math", dueDate: "2024-11-18", totalStudents: 38, submitted: 32, graded: 25, status: "Active" },
    { id: 2, title: "English Essay", class: "10-B", subject: "eng", dueDate: "2024-11-20", totalStudents: 35, submitted: 28, graded: 28, status: "Active" },
    { id: 3, title: "Science Project", class: "9-A", subject: "sci", dueDate: "2024-11-15", totalStudents: 40, submitted: 40, graded: 40, status: "Completed" },
    { id: 4, title: "History Essay", class: "10-A", subject: "hist", dueDate: "2024-11-22", totalStudents: 38, submitted: 15, graded: 10, status: "Active" },
  ])

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    dueDate: "",
    points: ""
  })

  // Handlers
  const resetForm = () => {
    setFormData({ title: "", class: "", subject: "", dueDate: "", points: "" })
    setIsEditing(false)
    setCurrentAssignment(null)
  }

  const handleOpenCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (assignment: any) => {
    setIsEditing(true)
    setCurrentAssignment(assignment)
    setFormData({
      title: assignment.title,
      class: assignment.class,
      subject: assignment.subject,
      dueDate: assignment.dueDate,
      points: "100" // Mock value
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(a => a.id !== id))
    }
  }

  const handleSave = () => {
    if (isEditing && currentAssignment) {
      // Update existing
      setAssignments(assignments.map(a =>
        a.id === currentAssignment.id
          ? { ...a, title: formData.title, class: formData.class, subject: formData.subject, dueDate: formData.dueDate }
          : a
      ))
    } else {
      // Create new
      const newId = Math.max(...assignments.map(a => a.id), 0) + 1
      const newAssignment = {
        id: newId,
        title: formData.title,
        class: formData.class || "10-A",
        subject: formData.subject || "math",
        dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
        totalStudents: 35, // Default
        submitted: 0,
        graded: 0,
        status: "Active"
      }
      setAssignments([...assignments, newAssignment])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const totalAssignments = assignments.length
  const activeAssignments = assignments.filter(a => a.status === "Active").length
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submitted, 0)
  const totalPendingGrading = assignments.reduce((sum, a) => sum + (a.submitted - a.graded), 0)

  return (
    <DashboardLayout title="H.W. / C.W.">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Homework & Classwork
            </h2>
            <p className="text-muted-foreground mt-1">Create new assignments and grade submissions.</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md" onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
                <DialogDescription>{isEditing ? "Update assignment details" : "Assign homework or classwork to students."}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select value={formData.class} onValueChange={(val) => setFormData({ ...formData, class: val })}>
                      <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-A">10-A</SelectItem>
                        <SelectItem value="10-B">10-B</SelectItem>
                        <SelectItem value="9-A">9-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={formData.subject} onValueChange={(val) => setFormData({ ...formData, subject: val })}>
                      <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="sci">Science</SelectItem>
                        <SelectItem value="eng">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Assignment Title</Label>
                  <Input
                    placeholder="e.g. Algebra Chapter 5 Exercises"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Points</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description / Instructions</Label>
                  <Textarea placeholder="Enter detailed instructions for students..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button className="bg-indigo-600" onClick={handleSave}>{isEditing ? "Update" : "Assign Now"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Assignments" value={totalAssignments.toString()} icon={BookOpen} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Active" value={activeAssignments.toString()} icon={Clock} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Submissions" value={totalSubmissions.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Pending Grading" value={totalPendingGrading.toString()} icon={Clock} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-indigo-600" />Assignment List</CardTitle>
                <CardDescription>Manage ongoing and completed work</CardDescription>
              </div>
              <div className="w-64 relative hidden md:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search assignments..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-5 border rounded-xl hover:shadow-md transition-all bg-white group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{assignment.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span className="font-medium text-gray-700">Class {assignment.class}</span>
                          <span>•</span>
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${assignment.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}>
                        {assignment.status}
                      </span>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(assignment)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(assignment.id)}>Delete</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-600">Submission Progress</span>
                        <span className="text-gray-900">{assignment.submitted}/{assignment.totalStudents} Students</span>
                      </div>
                      <Progress value={(assignment.submitted / assignment.totalStudents) * 100} className="h-2.5" />
                    </div>

                    <div className="flex items-center justify-end gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Pending Grading</p>
                        <p className="text-lg font-bold text-orange-600">{assignment.submitted - assignment.graded}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">View Submissions</Button>
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
