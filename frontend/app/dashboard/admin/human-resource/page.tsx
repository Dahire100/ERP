"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserCheck, UserX, Building, Mail, Phone, Eye, Plus } from "lucide-react"
import FormModal from "@/components/form-modal"

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  status: "Active" | "On Leave" | "Inactive"
  joiningDate: string
  salary?: string
}

export default function HumanResource() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ 
    open: false, 
    id: null 
  })

  useEffect(() => {
    const saved = localStorage.getItem("staff")
    if (saved) {
      setStaff(JSON.parse(saved))
    } else {
      const defaultStaff: Staff[] = [
        {
          id: "1",
          name: "Robert Brown",
          email: "robert@school.com",
          phone: "+1-555-0101",
          position: "Principal",
          department: "Administration",
          status: "Active",
          joiningDate: "2020-01-15",
          salary: "₹85,000"
        },
        {
          id: "2",
          name: "Sarah Wilson",
          email: "sarah@school.com",
          phone: "+1-555-0102",
          position: "Senior Teacher",
          department: "Science",
          status: "Active",
          joiningDate: "2019-08-20",
          salary: "₹65,000"
        },
        {
          id: "3",
          name: "Tom Davis",
          email: "tom@school.com",
          phone: "+1-555-0103",
          position: "Teacher",
          department: "Mathematics",
          status: "On Leave",
          joiningDate: "2021-03-10",
          salary: "₹55,000"
        },
        {
          id: "4",
          name: "Emily Johnson",
          email: "emily@school.com",
          phone: "+1-555-0104",
          position: "Teacher",
          department: "English",
          status: "Active",
          joiningDate: "2020-07-01",
          salary: "₹58,000"
        },
        {
          id: "5",
          name: "Michael Chen",
          email: "michael@school.com",
          phone: "+1-555-0105",
          position: "Librarian",
          department: "Library",
          status: "Active",
          joiningDate: "2018-09-15",
          salary: "₹45,000"
        },
      ]
      setStaff(defaultStaff)
      localStorage.setItem("staff", JSON.stringify(defaultStaff))
    }
  }, [])

  const handleAddStaff = (data: any) => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      ...data,
    }
    const updated = [...staff, newStaff]
    setStaff(updated)
    localStorage.setItem("staff", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  const handleEditStaff = (data: any) => {
    const updated = staff.map((s) => (s.id === editingStaff?.id ? { ...s, ...data } : s))
    setStaff(updated)
    localStorage.setItem("staff", JSON.stringify(updated))
    setEditingStaff(null)
    setIsModalOpen(false)
  }

  const handleDeleteStaff = (id: string) => {
    const updated = staff.filter((s) => s.id !== id)
    setStaff(updated)
    localStorage.setItem("staff", JSON.stringify(updated))
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      handleDeleteStaff(deleteConfirm.id)
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      const updated = staff.filter((s) => !selectedIds.includes(s.id))
      setStaff(updated)
      localStorage.setItem("staff", JSON.stringify(updated))
    }
  }

  const handleOpenModal = (staffMember?: Staff) => {
    if (staffMember) {
      setEditingStaff(staffMember)
    }
    setIsModalOpen(true)
  }

  // Calculate stats
  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "Active").length,
    onLeave: staff.filter((s) => s.status === "On Leave").length,
    departments: [...new Set(staff.map(s => s.department))].length
  }

  const columns = [
    {
      key: "name",
      label: "Staff Member",
      render: (value: string, row: Staff) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {value.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground">{row.position}</p>
          </div>
        </div>
      )
    },
    {
      key: "email",
      label: "Contact",
      render: (value: string, row: Staff) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{value}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: "department",
      label: "Department",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: "joiningDate",
      label: "Joining Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  return (
    <DashboardLayout title="Human Resource">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Staff Management</h2>
            <p className="text-sm text-muted-foreground">Manage staff members and their information</p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Staff"
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
            title="On Leave"
            value={stats.onLeave.toString()}
            icon={UserX}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Departments"
            value={stats.departments.toString()}
            icon={Building}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Advanced Table */}
        <AdvancedTable
          columns={columns}
          data={staff}
          searchable={true}
          searchPlaceholder="Search by name, email, or department..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Active", "On Leave", "Inactive"] },
            { key: "department", label: "Department", options: [...new Set(staff.map(s => s.department))] },
            { key: "position", label: "Position", options: [...new Set(staff.map(s => s.position))] }
          ]}
          selectable={true}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No staff members found."
        />

        {/* Form Modal */}
        <FormModal
          isOpen={isModalOpen}
          title={editingStaff ? "Edit Staff" : "Add New Staff"}
          fields={[
            { name: "name", label: "Full Name", type: "text" as const, required: true },
            { name: "email", label: "Email", type: "email" as const, required: true },
            { name: "phone", label: "Phone", type: "text" as const, required: true },
            { name: "position", label: "Position", type: "text" as const, required: true },
            { name: "department", label: "Department", type: "text" as const, required: true },
            { name: "joiningDate", label: "Joining Date", type: "date" as const, required: true },
            { name: "salary", label: "Salary", type: "text" as const, required: false },
            {
              name: "status",
              label: "Status",
              type: "select" as const,
              options: [
                { value: "Active", label: "Active" },
                { value: "On Leave", label: "On Leave" },
                { value: "Inactive", label: "Inactive" },
              ],
              required: true
            },
          ]}
          initialData={editingStaff || undefined}
          onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStaff(null)
          }}
        />

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Staff Member"
          description="Are you sure you want to delete this staff member? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
