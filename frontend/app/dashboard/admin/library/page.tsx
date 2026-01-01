"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Book, BookOpen, Users, AlertCircle, Plus, ClipboardList, RotateCcw, CheckSquare, History, Bookmark } from "lucide-react"
import Link from "next/link"
import FormModal from "@/components/form-modal"

interface LibraryBook {
  id: string
  title: string
  author: string
  isbn: string
  quantity: number
  available: number
  borrowed: number
  category: string
  status: "Available" | "Low Stock" | "Out of Stock"
}

export default function Library() {
  const [books, setBooks] = useState<LibraryBook[]>([
    { id: "1", title: "Mathematics Grade 10", author: "John Smith", isbn: "978-0-123456-78-9", quantity: 25, available: 18, borrowed: 7, category: "Textbook", status: "Available" },
    { id: "2", title: "English Literature", author: "Jane Doe", isbn: "978-0-987654-32-1", quantity: 18, available: 12, borrowed: 6, category: "Literature", status: "Available" },
    { id: "3", title: "Physics Fundamentals", author: "Robert Brown", isbn: "978-0-456789-12-3", quantity: 5, available: 2, borrowed: 3, category: "Science", status: "Low Stock" },
    { id: "4", title: "World History", author: "Emily Davis", isbn: "978-0-789012-34-5", quantity: 15, available: 10, borrowed: 5, category: "History", status: "Available" },
    { id: "5", title: "Chemistry Lab Manual", author: "Michael Chen", isbn: "978-0-234567-89-0", quantity: 8, available: 0, borrowed: 8, category: "Science", status: "Out of Stock" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const quantity = Number(data.quantity)
    const borrowed = Number(data.borrowed || 0)
    const available = quantity - borrowed
    const status = available === 0 ? "Out of Stock" : available < 5 ? "Low Stock" : "Available"
    
    const newBook: LibraryBook = { 
      id: Date.now().toString(), 
      ...data,
      quantity,
      borrowed,
      available,
      status: status as "Available" | "Low Stock" | "Out of Stock"
    }
    setBooks([...books, newBook])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setBooks(books.map((book) => {
      if (book.id === id) {
        const quantity = Number(data.quantity)
        const borrowed = Number(data.borrowed || book.borrowed)
        const available = quantity - borrowed
        const status = available === 0 ? "Out of Stock" : available < 5 ? "Low Stock" : "Available"
        return { 
          ...book, 
          ...data,
          quantity,
          borrowed,
          available,
          status: status as "Available" | "Low Stock" | "Out of Stock"
        }
      }
      return book
    }))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setBooks(books.filter((book) => book.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setBooks(books.filter((b) => !selectedIds.includes(b.id)))
    }
  }

  const stats = {
    totalBooks: books.reduce((sum, b) => sum + b.quantity, 0),
    available: books.reduce((sum, b) => sum + b.available, 0),
    borrowed: books.reduce((sum, b) => sum + b.borrowed, 0),
    lowStock: books.filter(b => b.status === "Low Stock" || b.status === "Out of Stock").length
  }

  const columns = [
    {
      key: "title",
      label: "Book Details",
      render: (value: string, row: LibraryBook) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Book className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground">{row.author}</p>
          </div>
        </div>
      )
    },
    {
      key: "isbn",
      label: "ISBN",
      render: (value: string) => <span className="text-sm font-mono">{value}</span>
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => (
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{value}</span>
      )
    },
    {
      key: "quantity",
      label: "Inventory",
      render: (value: number, row: LibraryBook) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Total: {value}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="text-green-600">Available: {row.available}</span>
            <span className="text-orange-600">Borrowed: {row.borrowed}</span>
          </div>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields = [
    { name: "title", label: "Book Title", type: "text" as const, required: true },
    { name: "author", label: "Author", type: "text" as const, required: true },
    { name: "isbn", label: "ISBN", type: "text" as const, required: true },
    { name: "category", label: "Category", type: "select" as const, options: [
      { value: "Textbook", label: "Textbook" },
      { value: "Literature", label: "Literature" },
      { value: "Science", label: "Science" },
      { value: "History", label: "History" },
      { value: "Reference", label: "Reference" }
    ], required: true },
    { name: "quantity", label: "Total Quantity", type: "number" as const, required: true },
    { name: "borrowed", label: "Currently Borrowed", type: "number" as const, required: false },
  ]

  return (
    <DashboardLayout title="Library">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Book Catalog", description: "Manage all books", icon: <Book className="h-6 w-6 text-indigo-600" />, href: "/dashboard/admin/library/book-catalog" },
            { title: "Book Issue", description: "Issue books to students", icon: <ClipboardList className="h-6 w-6 text-green-600" />, href: "/dashboard/admin/library/book-issue" },
            { title: "Book Return", description: "Process returns", icon: <RotateCcw className="h-6 w-6 text-orange-600" />, href: "/dashboard/admin/library/book-return" },
            { title: "Book Availability", description: "Check availability", icon: <CheckSquare className="h-6 w-6 text-emerald-600" />, href: "/dashboard/admin/library/book-availability" },
            { title: "Student History", description: "Borrow history per student", icon: <History className="h-6 w-6 text-amber-600" />, href: "/dashboard/admin/library/student-history" },
            { title: "Book Reservation", description: "Reserve titles", icon: <Bookmark className="h-6 w-6 text-purple-600" />, href: "/dashboard/admin/library/book-reservation" },
          ].map((module, idx) => (
            <Link key={idx} href={module.href}>
              <Card className="border hover:shadow-md transition-all h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gray-50 rounded-lg">{module.icon}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Library Management</h2>
            <p className="text-sm text-muted-foreground">Manage books, track inventory, and monitor borrowing</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Books"
            value={stats.totalBooks.toString()}
            icon={Book}
            iconColor="text-indigo-600"
            iconBgColor="bg-indigo-100"
          />
          <StatCard
            title="Available"
            value={stats.available.toString()}
            icon={BookOpen}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Borrowed"
            value={stats.borrowed.toString()}
            icon={Users}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Low Stock"
            value={stats.lowStock.toString()}
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={books}
          searchable={true}
          searchPlaceholder="Search by title, author, or ISBN..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Available", "Low Stock", "Out of Stock"] },
            { key: "category", label: "Category", options: [...new Set(books.map(b => b.category))] }
          ]}
          selectable={true}
          onEdit={(book) => {
            setEditingId(book.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No books found in library."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Book" : "Add New Book"}
          initialData={editingId ? books.find((b) => b.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Book"
          description="Are you sure you want to delete this book from the library? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
