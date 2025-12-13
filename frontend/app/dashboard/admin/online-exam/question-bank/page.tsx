"use client"

<<<<<<< HEAD
=======
import { useState } from "react"
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarDays, Download, Plus, Search } from "lucide-react"

export default function QuestionBank() {
  return (
    <DashboardLayout title="Questions Bank">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Online Exam</span>
            <span>/</span>
            <span>Questions Bank</span>
          </span>
        </div>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <Search className="h-5 w-5" />
                Select Criteria
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Download className="h-4 w-4 mr-2" />
                  Import Questions
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label>Search by Keyword</Label>
                <Input placeholder="Enter Keyword" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Question</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Question 1</SelectItem>
                    <SelectItem value="q2">Question 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Class</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
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
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Lesson</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select Lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lesson-1">Lesson 1</SelectItem>
                    <SelectItem value="lesson-2">Lesson 2</SelectItem>
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
      </div>
    </DashboardLayout>
  )
=======
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileQuestion } from "lucide-react"
import { toast } from "sonner"

const initialQuestions = [
    { id: 1, text: "What is 2 + 2?", subject: "Math", type: "MCQ" },
    { id: 2, text: "State Newton's 2nd law.", subject: "Science", type: "Short" },
]

export default function QuestionBank() {
    const [questions, setQuestions] = useState(initialQuestions)
    const [form, setForm] = useState({ text: "", subject: "", type: "", difficulty: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.text || !form.subject || !form.type) {
            toast.error("Question, subject and type are required")
            return
        }
        setQuestions([...questions, { id: Date.now(), text: form.text, subject: form.subject, type: form.type }])
        toast.success("Question added")
        setForm({ text: "", subject: "", type: "", difficulty: "" })
    }

    return (
        <DashboardLayout title="Question Bank">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <FileQuestion className="h-5 w-5" />
                                Add Question
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Question *</Label>
                                    <Textarea
                                        value={form.text}
                                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                                        rows={3}
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Subject *</Label>
                                    <Input
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="e.g. Math"
                                        className="bg-white border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Type *</Label>
                                    <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MCQ">MCQ</SelectItem>
                                            <SelectItem value="Short">Short Answer</SelectItem>
                                            <SelectItem value="TrueFalse">True / False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Difficulty</Label>
                                    <Select value={form.difficulty} onValueChange={(val) => setForm({ ...form, difficulty: val })}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Optional" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg text-gray-800">Question List</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 uppercase">Question</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Subject</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase">Type</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {questions.map((q) => (
                                            <TableRow key={q.id}>
                                                <TableCell>{q.text}</TableCell>
                                                <TableCell>{q.subject}</TableCell>
                                                <TableCell>{q.type}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
>>>>>>> 0a561723a8dd8fb4adb47cccae82c8f3a9e66be4
}

