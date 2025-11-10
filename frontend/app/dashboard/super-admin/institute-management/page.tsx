"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import FormModal from "@/components/form-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, GraduationCap, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function InstituteManagement() {
  const [institutes, setInstitutes] = useState([
    { 
      id: "1", 
      name: "Central High School", 
      city: "New York", 
      students: 1234, 
      teachers: 45,
      status: "Active",
      plan: "Premium",
      email: "admin@centralhigh.edu",
      phone: "+1 234-567-8901",
      joinedDate: "2023-01-15",
      revenue: 5200
    },
    { 
      id: "2", 
      name: "North Academy", 
      city: "Boston", 
      students: 890, 
      teachers: 32,
      status: "Active",
      plan: "Basic",
      email: "contact@northacademy.edu",
      phone: "+1 234-567-8902",
      joinedDate: "2023-03-22",
      revenue: 2800
    },
    { 
      id: "3", 
      name: "South Institute", 
      city: "Miami", 
      students: 567, 
      teachers: 28,
      status: "Inactive",
      plan: "Enterprise",
      email: "info@southinstitute.edu",
      phone: "+1 234-567-8903",
      joinedDate: "2022-11-08",
      revenue: 8500
    },
    { 
      id: "4", 
      name: "East Valley School", 
      city: "Chicago", 
      students: 432, 
      teachers: 22,
      status: "Active",
      plan: "Basic",
      email: "admin@eastvalley.edu",
      phone: "+1 234-567-8904",
      joinedDate: "2023-06-10",
      revenue: 1200
    },
    { 
      id: "5", 
      name: "West Point Academy", 
      city: "Seattle", 
      students: 756, 
      teachers: 38,
      status: "Active",
      plan: "Premium",
      email: "contact@westpoint.edu",
      phone: "+1 234-567-8905",
      joinedDate: "2023-02-18",
      revenue: 4800
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ 
    open: false, 
    id: null 
  })

  const handleAdd = (data: any) => {
    const newInstitute = { 
      id: Date.now().toString(), 
      ...data,
      joinedDate: new Date().toISOString().split('T')[0]
    }
    setInstitutes([...institutes, newInstitute])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setInstitutes(institutes.map((i) => (i.id === id ? { ...i, ...data } : i)))
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setInstitutes(institutes.filter((i) => i.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setInstitutes(institutes.filter((i) => !selectedIds.includes(i.id)))
    }
  }

  const columns = [
    { 
      key: "name", 
      label: "Institute Name",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg`} alt={value} />
            <AvatarFallback>{value.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: "city", 
      label: "Location" 
    },
    { 
      key: "students", 
      label: "Students",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{value.toLocaleString()}</span>
        </div>
      )
    },
    { 
      key: "teachers", 
      label: "Teachers",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: "plan", 
      label: "Plan",
      render: (value: string) => (
        <StatusBadge 
          status={value} 
          variant={value === "Enterprise" ? "info" : value === "Premium" ? "success" : "default"}
        />
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
    { 
      key: "revenue", 
      label: "Revenue/mo",
      render: (value: number) => `₹${value.toLocaleString()}`
    },
  ]

  const formFields = [
    { name: "name", label: "Institute Name", type: "text" as const, required: true },
    { name: "email", label: "Email", type: "email" as const, required: true },
    { name: "phone", label: "Phone", type: "text" as const, required: true },
    { name: "plan", label: "Plan", type: "select" as const, options: [
      { value: "Free", label: "Free" },
      { value: "Basic", label: "Basic" },
      { value: "Premium", label: "Premium" },
      { value: "Enterprise", label: "Enterprise" }
    ], required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
      { value: "Suspended", label: "Suspended" }
    ], required: true },
    { name: "students", label: "Students", type: "number" as const, required: true },
  ]

  // Calculate stats
  const stats = {
    total: institutes.length,
    active: institutes.filter(i => i.status === "Active").length,
    totalStudents: institutes.reduce((sum, i) => sum + i.students, 0),
    totalRevenue: institutes.reduce((sum, i) => sum + i.revenue, 0)
  }

  return (
    <DashboardLayout title="Institute Management">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Institutes</p>
                  <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Institutes</p>
                  <p className="text-2xl font-bold mt-1">{stats.active}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalStudents.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">All Institutes</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor all educational institutions</p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null)
              setIsModalOpen(true)
            }}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Add New Institute
          </Button>
        </div>

        {/* Advanced Table */}
        <AdvancedTable
          columns={columns}
          data={institutes}
          searchable={true}
          searchPlaceholder="Search by name, city, or email..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Active", "Inactive"] },
            { key: "plan", label: "Plan", options: ["Basic", "Premium", "Enterprise"] }
          ]}
          selectable={true}
          onEdit={(item) => {
            setEditingId(item.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No institutes found. Add your first institute to get started."
        />

        {/* Edit/Add Modal */}
        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingId(null)
          }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Institute" : "Add New Institute"}
          initialData={editingId ? institutes.find((i) => i.id === editingId) : {}}
        />

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Institute"
          description="Are you sure you want to delete this institute? This action cannot be undone and will remove all associated data."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
