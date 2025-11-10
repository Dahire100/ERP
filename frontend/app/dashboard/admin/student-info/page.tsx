"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Users, 
  UserCheck, 
  UserX, 
  GraduationCap,
  Mail, 
  Phone, 
  User,
  Plus,
  Download
} from "lucide-react"
import FormModal from "@/components/form-modal"

interface Student {
  id: string
  name: string
  email: string
  rollNo: string
  class: string
  status: "Active" | "Inactive" | "Graduated"
  gender: "Male" | "Female"
  admissionDate: string
  parentName: string
  parentPhone: string
  parentEmail: string
  address?: string
}

export default function StudentInfo() {
  const [students, setStudents] = useState<Student[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ 
    open: false, 
    id: null 
  })

  useEffect(() => {
    const saved = localStorage.getItem("students")
    if (saved) {
      setStudents(JSON.parse(saved))
    } else {
      const defaultStudents: Student[] = [
        { 
          id: "1", 
          name: "John Doe", 
          email: "john@school.com", 
          rollNo: "2024001", 
          class: "10-A", 
          status: "Active",
          gender: "Male",
          admissionDate: "2024-04-15",
          parentName: "Robert Doe",
          parentPhone: "+1-555-0201",
          parentEmail: "robert.doe@email.com",
          address: "123 Main St, City"
        },
        { 
          id: "2", 
          name: "Jane Smith", 
          email: "jane@school.com", 
          rollNo: "2024002", 
          class: "10-A", 
          status: "Active",
          gender: "Female",
          admissionDate: "2024-04-16",
          parentName: "Mary Smith",
          parentPhone: "+1-555-0202",
          parentEmail: "mary.smith@email.com",
          address: "456 Oak Ave, City"
        },
        { 
          id: "3", 
          name: "Mike Johnson", 
          email: "mike@school.com", 
          rollNo: "2024003", 
          class: "10-B", 
          status: "Active",
          gender: "Male",
          admissionDate: "2024-04-17",
          parentName: "David Johnson",
          parentPhone: "+1-555-0203",
          parentEmail: "david.johnson@email.com",
          address: "789 Pine Rd, City"
        },
        { 
          id: "4", 
          name: "Emily Brown", 
          email: "emily@school.com", 
          rollNo: "2024004", 
          class: "9-A", 
          status: "Active",
          gender: "Female",
          admissionDate: "2024-04-18",
          parentName: "Sarah Brown",
          parentPhone: "+1-555-0204",
          parentEmail: "sarah.brown@email.com",
          address: "321 Elm St, City"
        },
        { 
          id: "5", 
          name: "Alex Wilson", 
          email: "alex@school.com", 
          rollNo: "2024005", 
          class: "11-A", 
          status: "Active",
          gender: "Male",
          admissionDate: "2024-04-19",
          parentName: "Tom Wilson",
          parentPhone: "+1-555-0205",
          parentEmail: "tom.wilson@email.com",
          address: "654 Maple Dr, City"
        },
      ]
      setStudents(defaultStudents)
      localStorage.setItem("students", JSON.stringify(defaultStudents))
    }
  }, [])

  const handleAddStudent = (data: any) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...data,
    }
    const updated = [...students, newStudent]
    setStudents(updated)
    localStorage.setItem("students", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  const handleEditStudent = (data: any) => {
    const updated = students.map((s) => (s.id === editingStudent?.id ? { ...s, ...data } : s))
    setStudents(updated)
    localStorage.setItem("students", JSON.stringify(updated))
    setEditingStudent(null)
    setIsModalOpen(false)
  }

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter((s) => s.id !== id)
    setStudents(updated)
    localStorage.setItem("students", JSON.stringify(updated))
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      handleDeleteStudent(deleteConfirm.id)
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      const updated = students.filter((s) => !selectedIds.includes(s.id))
      setStudents(updated)
      localStorage.setItem("students", JSON.stringify(updated))
    }
  }

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student)
    }
    setIsModalOpen(true)
  }

  // Calculate stats
  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "Active").length,
    inactive: students.filter((s) => s.status === "Inactive").length,
    male: students.filter((s) => s.gender === "Male").length,
    female: students.filter((s) => s.gender === "Female").length
  }

  const columns = [
    {
      key: "name",
      label: "Student",
      render: (value: string, row: Student) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-purple-100 text-purple-600">
              {value.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground">Roll: {row.rollNo}</p>
          </div>
        </div>
      )
    },
    {
      key: "class",
      label: "Class",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: "email",
      label: "Contact",
      render: (value: string, row: Student) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{value}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{row.parentName}</span>
          </div>
        </div>
      )
    },
    {
      key: "parentPhone",
      label: "Parent Contact",
      render: (value: string, row: Student) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span>{value}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="text-xs">{row.parentEmail}</span>
          </div>
        </div>
      )
    },
    {
      key: "admissionDate",
      label: "Admission Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  return (
    <DashboardLayout title="Student Info">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Student Management</h2>
            <p className="text-sm text-muted-foreground">Manage all students in the system</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={stats.total.toString()}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Active"
            value={stats.active.toString()}
            icon={UserCheck}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Male Students"
            value={stats.male.toString()}
            icon={User}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Female Students"
            value={stats.female.toString()}
            icon={User}
            iconColor="text-pink-600"
            iconBgColor="bg-pink-100"
          />
        </div>

        {/* Advanced Table */}
        <AdvancedTable
          columns={columns}
          data={students}
          searchable={true}
          searchPlaceholder="Search by name, roll number, or parent..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Active", "Inactive", "Graduated"] },
            { key: "class", label: "Class", options: [...new Set(students.map(s => s.class))] },
            { key: "gender", label: "Gender", options: ["Male", "Female"] }
          ]}
          selectable={true}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No students found."
        />

        {/* Form Modal */}
        <FormModal
          isOpen={isModalOpen}
          title={editingStudent ? "Edit Student" : "Add New Student"}
          fields={[
            { name: "name", label: "Full Name", type: "text" as const, required: true },
            { name: "email", label: "Student Email", type: "email" as const, required: true },
            { name: "rollNo", label: "Roll Number", type: "text" as const, required: true },
            { name: "class", label: "Class", type: "text" as const, required: true },
            { name: "gender", label: "Gender", type: "select" as const, options: [
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" }
            ], required: true },
            { name: "admissionDate", label: "Admission Date", type: "date" as const, required: true },
            { name: "parentName", label: "Parent/Guardian Name", type: "text" as const, required: true },
            { name: "parentPhone", label: "Parent Phone", type: "text" as const, required: true },
            { name: "parentEmail", label: "Parent Email", type: "email" as const, required: true },
            { name: "address", label: "Address", type: "text" as const, required: false },
            {
              name: "status",
              label: "Status",
              type: "select" as const,
              options: [
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
                { value: "Graduated", label: "Graduated" },
              ],
              required: true
            },
          ]}
          initialData={editingStudent || undefined}
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStudent(null)
          }}
        />

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Student"
          description="Are you sure you want to delete this student? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
