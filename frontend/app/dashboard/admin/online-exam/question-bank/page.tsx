"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
}

