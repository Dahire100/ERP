"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function StudentLibrary() {
  const issuedBooks = [
    { id: 1, title: "Mathematics Textbook", author: "John Doe", issueDate: "2024-10-15", dueDate: "2024-11-15", status: "Active" },
    { id: 2, title: "Science Lab Manual", author: "Jane Smith", issueDate: "2024-10-20", dueDate: "2024-11-20", status: "Active" },
    { id: 3, title: "English Literature", author: "Bob Johnson", issueDate: "2024-10-10", dueDate: "2024-11-10", status: "Overdue" },
  ]

  const activeBooks = issuedBooks.filter(b => b.status === "Active").length
  const overdueBooks = issuedBooks.filter(b => b.status === "Overdue").length

  return (
    <DashboardLayout title="Library">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Library
          </h2>
          <p className="text-muted-foreground mt-1">Manage your issued books</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Issued Books" value={issuedBooks.length.toString()} icon={BookOpen} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Active" value={activeBooks.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Overdue" value={overdueBooks.toString()} icon={AlertCircle} iconColor="text-red-600" iconBgColor="bg-red-100" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Issued Books</CardTitle>
            <CardDescription>Books currently issued to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {issuedBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${book.status === "Overdue" ? "bg-red-100" : "bg-green-100"}`}>
                      {book.status === "Overdue" ? <AlertCircle className="h-5 w-5 text-red-600" /> : <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-xs text-muted-foreground">by {book.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${book.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {book.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Search More Books
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
