"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle, AlertCircle, Search, Plus, Book } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function StudentLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [issuedBooks, setIssuedBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_URL}/api/student/library/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          const books = data.data.map((record: any) => ({
            id: record._id,
            title: record.bookId ? record.bookId.title : "Unknown Book",
            author: record.bookId ? record.bookId.author : "Unknown Author",
            issueDate: record.issueDate,
            dueDate: record.dueDate,
            status: record.status || (record.returnDate ? "Returned" : "Active") // logic if status not explicit
          }))
          setIssuedBooks(books)
        }
      } catch (error) {
        console.error("Failed to fetch library history", error)
        toast.error("Failed to load library records")
      } finally {
        setLoading(false)
      }
    }
    fetchLibrary()
  }, [])

  const activeBooks = issuedBooks.filter(b => b.status === "Active" || b.status === "Issued").length
  const overdueBooks = issuedBooks.filter(b => b.status === "Overdue").length // Logic might need date comparison if backend doesn't update status automatically

  const handleRequestBook = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Book Requested", { description: "You will be notified when it's available." })
    // Implement API call later if available
  }

  if (loading) {
    return <div className="p-8 text-center">Loading Library Details...</div>
  }

  return (
    <DashboardLayout title="Library">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Library
            </h2>
            <p className="text-muted-foreground mt-1">Manage your issued books and find new ones</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Request New Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleRequestBook}>
                <DialogHeader>
                  <DialogTitle>Request a Book</DialogTitle>
                  <DialogDescription>Search the catalog or request a specific title.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Book Title</Label>
                    <Input placeholder="Enter book name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label>Author</Label>
                    <Input placeholder="Enter author name" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Issued Books" value={issuedBooks.length.toString()} icon={BookOpen} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Active" value={activeBooks.toString()} icon={CheckCircle} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Overdue" value={overdueBooks.toString()} icon={AlertCircle} iconColor="text-red-600" iconBgColor="bg-red-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Currently Issued */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Issued Books</CardTitle>
                <CardDescription>Books currently issued to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issuedBooks.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No books currently issued.</p>
                  ) : issuedBooks.map((book) => (
                    <div key={book.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${book.status === "Overdue" ? "bg-red-100" : "bg-green-100"}`}>
                          {book.status === "Overdue" ? <AlertCircle className="h-5 w-5 text-red-600" /> : <CheckCircle className="h-5 w-5 text-green-600" />}
                        </div>
                        <div>
                          <p className="font-semibold">{book.title}</p>
                          <p className="text-xs text-muted-foreground">by {book.author}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-sm font-medium">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${book.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Search */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> Quick Search</CardTitle>
                <CardDescription>Find books in library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, author, ISBN..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {["Science", "Fiction", "History", "Math", "Literature", "Art"].map(cat => (
                      <Button key={cat} variant="outline" size="sm" className="text-xs h-7">{cat}</Button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t text-center">
                  <Book className="h-16 w-16 mx-auto text-gray-200 mb-2" />
                  <p className="text-sm text-gray-500">Search to see results here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
