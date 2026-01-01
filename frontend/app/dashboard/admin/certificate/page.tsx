"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Award, FileCheck, Clock, Download, Plus } from "lucide-react"
import FormModal from "@/components/form-modal"

interface Certificate {
  id: string
  studentName: string
  rollNo: string
  class: string
  certificateType: string
  issueDate: string
  status: "Issued" | "Pending" | "Verified"
  certificateNo: string
}

export default function Certificate() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: "1", studentName: "Ahmed Ali", rollNo: "2024001", class: "10-A", certificateType: "Completion", issueDate: "2024-06-15", status: "Issued", certificateNo: "CERT-2024-001" },
    { id: "2", studentName: "Fatima Khan", rollNo: "2024002", class: "10-A", certificateType: "Merit", issueDate: "2024-06-20", status: "Issued", certificateNo: "CERT-2024-002" },
    { id: "3", studentName: "John Smith", rollNo: "2024003", class: "10-B", certificateType: "Character", issueDate: "2024-06-25", status: "Verified", certificateNo: "CERT-2024-003" },
    { id: "4", studentName: "Sarah Brown", rollNo: "2024004", class: "9-A", certificateType: "Transfer", issueDate: "2024-06-30", status: "Pending", certificateNo: "CERT-2024-004" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const newCert: Certificate = { 
      id: Date.now().toString(), 
      ...data,
      certificateNo: `CERT-2024-${String(certificates.length + 1).padStart(3, '0')}`
    }
    setCertificates([...certificates, newCert])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setCertificates(certificates.map((cert) => (cert.id === id ? { ...cert, ...data } : cert)))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setCertificates(certificates.filter((cert) => cert.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setCertificates(certificates.filter((c) => !selectedIds.includes(c.id)))
    }
  }

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === "Issued").length,
    pending: certificates.filter(c => c.status === "Pending").length,
    verified: certificates.filter(c => c.status === "Verified").length
  }

  const columns = [
    {
      key: "studentName",
      label: "Student Details",
      render: (value: string, row: Certificate) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{row.rollNo} - {row.class}</p>
        </div>
      )
    },
    {
      key: "certificateType",
      label: "Certificate Type",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      )
    },
    {
      key: "certificateNo",
      label: "Certificate No.",
      render: (value: string) => <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{value}</span>
    },
    {
      key: "issueDate",
      label: "Issue Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (value: string, row: Certificate) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={value} />
          {value === "Issued" && (
            <Button size="sm" variant="ghost" className="h-7 px-2">
              <Download className="h-3 w-3" />
            </Button>
          )}
        </div>
      )
    },
  ]

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text" as const, required: true },
    { name: "rollNo", label: "Roll Number", type: "text" as const, required: true },
    { name: "class", label: "Class", type: "text" as const, required: true },
    { name: "certificateType", label: "Certificate Type", type: "select" as const, options: [
      { value: "Completion", label: "Completion Certificate" },
      { value: "Merit", label: "Merit Certificate" },
      { value: "Character", label: "Character Certificate" },
      { value: "Transfer", label: "Transfer Certificate" },
      { value: "Bonafide", label: "Bonafide Certificate" },
      { value: "Achievement", label: "Achievement Certificate" }
    ], required: true },
    { name: "issueDate", label: "Issue Date", type: "date" as const, required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Issued", label: "Issued" },
      { value: "Pending", label: "Pending" },
      { value: "Verified", label: "Verified" }
    ], required: true },
  ]

  return (
    <DashboardLayout title="Certificate">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Certificate Management</h2>
            <p className="text-sm text-muted-foreground">Generate and manage student certificates</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Certificate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Certificates"
            value={stats.total.toString()}
            icon={Award}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          />
          <StatCard
            title="Issued"
            value={stats.issued.toString()}
            icon={FileCheck}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Verified"
            value={stats.verified.toString()}
            icon={FileCheck}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending"
            value={stats.pending.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={certificates}
          searchable={true}
          searchPlaceholder="Search by student name, roll number, or certificate number..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Issued", "Pending", "Verified"] },
            { key: "certificateType", label: "Type", options: [...new Set(certificates.map(c => c.certificateType))] },
            { key: "class", label: "Class", options: [...new Set(certificates.map(c => c.class))] }
          ]}
          selectable={true}
          onEdit={(cert) => {
            setEditingId(cert.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No certificates found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Certificate" : "Generate New Certificate"}
          initialData={editingId ? certificates.find((c) => c.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Certificate"
          description="Are you sure you want to delete this certificate? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
