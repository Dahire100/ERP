"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RotateCcw } from "lucide-react"
import { toast } from "sonner"

const rows = [
  { id: 1, student: "Ansh Sharma", book: "Mathematics Grade 10", issueDate: "12-06-2025", dueDate: "20-06-2025", returnDate: "" },
  { id: 2, student: "Vanya Patel", book: "English Literature", issueDate: "11-06-2025", dueDate: "19-06-2025", returnDate: "12-06-2025" },
]

export default function BookReturn() {
  const [returns, setReturns] = useState(rows)
  const [form, setForm] = useState({ student: "", book: "", returnDate: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.student || !form.book || !form.returnDate) {
      toast.error("Student, book and return date are required")
      return
    }
    setReturns([...returns, { id: Date.now(), student: form.student, book: form.book, issueDate: "-", dueDate: "-", returnDate: form.returnDate }])
    toast.success("Return recorded")
    setForm({ student: "", book: "", returnDate: "" })
  }

  return (
    <DashboardLayout title="Book Return">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <RotateCcw className="h-5 w-5" />
                Record Return
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-red-500">Student *</Label>
                  <Input value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Book *</Label>
                  <Input value={form.book} onChange={(e) => setForm({ ...form, book: e.target.value })} className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-red-500">Return Date *</Label>
                  <Input value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-pink-50 border-b border-pink-100">
              <CardTitle className="text-lg text-gray-800">Return Register</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                      <TableHead className="font-bold text-gray-700 uppercase">Student</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Book</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Issue</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Due</TableHead>
                      <TableHead className="font-bold text-gray-700 uppercase">Return</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returns.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.student}</TableCell>
                        <TableCell>{row.book}</TableCell>
                        <TableCell>{row.issueDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.returnDate || "-"}</TableCell>
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

