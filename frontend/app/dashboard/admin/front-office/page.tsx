"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Plus, Receipt, Send } from "lucide-react"
import FormModal from "@/components/form-modal"

interface Fee {
  id: string
  studentName: string
  rollNo: string
  class: string
  amount: number
  dueDate: string
  paidDate?: string
  status: "Paid" | "Pending" | "Overdue"
  paymentMethod?: string
  receiptNo?: string
  category: string
}

export default function FrontOffice() {
  const [fees, setFees] = useState<Fee[]>([
    { id: "1", studentName: "John Doe", rollNo: "2024001", class: "10-A", amount: 500, dueDate: "2025-02-01", status: "Pending", category: "Tuition Fee", receiptNo: "" },
    { id: "2", studentName: "Jane Smith", rollNo: "2024002", class: "10-A", amount: 500, dueDate: "2025-01-15", paidDate: "2025-01-10", status: "Paid", paymentMethod: "Cash", receiptNo: "REC-001", category: "Tuition Fee" },
    { id: "3", studentName: "Bob Johnson", rollNo: "2024003", class: "10-B", amount: 500, dueDate: "2025-01-01", status: "Overdue", category: "Tuition Fee", receiptNo: "" },
    { id: "4", studentName: "Emily Brown", rollNo: "2024004", class: "9-A", amount: 200, dueDate: "2025-02-05", status: "Pending", category: "Library Fee", receiptNo: "" },
    { id: "5", studentName: "Alex Wilson", rollNo: "2024005", class: "11-A", amount: 300, dueDate: "2025-01-20", paidDate: "2025-01-18", status: "Paid", paymentMethod: "Online", receiptNo: "REC-002", category: "Lab Fee" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const newFee: Fee = { 
      id: Date.now().toString(), 
      ...data,
      amount: Number(data.amount)
    }
    setFees([...fees, newFee])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setFees(fees.map((f) => (f.id === id ? { ...f, ...data, amount: Number(data.amount) } : f)))
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setFees(fees.filter((f) => f.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setFees(fees.filter((f) => !selectedIds.includes(f.id)))
    }
  }

  const stats = {
    totalCollected: fees.filter(f => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0),
    pending: fees.filter(f => f.status === "Pending").reduce((sum, f) => sum + f.amount, 0),
    overdue: fees.filter(f => f.status === "Overdue").reduce((sum, f) => sum + f.amount, 0),
    totalFees: fees.length
  }

  const columns = [
    {
      key: "studentName",
      label: "Student",
      render: (value: string, row: Fee) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{row.rollNo} - {row.class}</p>
        </div>
      )
    },
    {
      key: "category",
      label: "Fee Category",
      render: (value: string) => (
        <span className="text-sm">{value}</span>
      )
    },
    {
      key: "amount",
      label: "Amount",
      render: (value: number) => (
        <span className="font-semibold">${value}</span>
      )
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (value: string, row: Fee) => {
        const daysUntil = Math.ceil((new Date(value).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        return (
          <div>
            <p className="text-sm">{new Date(value).toLocaleDateString()}</p>
            {row.status === "Pending" && (
              <p className={`text-xs ${daysUntil < 0 ? 'text-red-600' : daysUntil < 7 ? 'text-orange-600' : 'text-muted-foreground'}`}>
                {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days left`}
              </p>
            )}
          </div>
        )
      }
    },
    {
      key: "status",
      label: "Status",
      render: (value: string, row: Fee) => (
        <div className="space-y-1">
          <StatusBadge status={value} />
          {row.paymentMethod && (
            <p className="text-xs text-muted-foreground">{row.paymentMethod}</p>
          )}
        </div>
      )
    },
    {
      key: "receiptNo",
      label: "Receipt",
      render: (value: string) => (
        value ? <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{value}</span> : <span className="text-xs text-muted-foreground">-</span>
      )
    },
  ]

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text" as const, required: true },
    { name: "rollNo", label: "Roll Number", type: "text" as const, required: true },
    { name: "class", label: "Class", type: "text" as const, required: true },
    { name: "category", label: "Fee Category", type: "select" as const, options: [
      { value: "Tuition Fee", label: "Tuition Fee" },
      { value: "Library Fee", label: "Library Fee" },
      { value: "Lab Fee", label: "Lab Fee" },
      { value: "Transport Fee", label: "Transport Fee" },
      { value: "Exam Fee", label: "Exam Fee" }
    ], required: true },
    { name: "amount", label: "Amount", type: "number" as const, required: true },
    { name: "dueDate", label: "Due Date", type: "date" as const, required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Pending", label: "Pending" },
      { value: "Paid", label: "Paid" },
      { value: "Overdue", label: "Overdue" }
    ], required: true },
    { name: "paymentMethod", label: "Payment Method", type: "select" as const, options: [
      { value: "Cash", label: "Cash" },
      { value: "Online", label: "Online" },
      { value: "Cheque", label: "Cheque" },
      { value: "Card", label: "Card" }
    ], required: false },
    { name: "receiptNo", label: "Receipt Number", type: "text" as const, required: false },
  ]

  return (
    <DashboardLayout title="Front Office">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Fee Management</h2>
            <p className="text-sm text-muted-foreground">Track and manage student fee payments</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Fee Record
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Collected"
            value={`$${stats.totalCollected.toLocaleString()}`}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Pending"
            value={`$${stats.pending.toLocaleString()}`}
            icon={CreditCard}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Overdue"
            value={`$${stats.overdue.toLocaleString()}`}
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Total Records"
            value={stats.totalFees.toString()}
            icon={Receipt}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={fees}
          searchable={true}
          searchPlaceholder="Search by student name, roll number..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Paid", "Pending", "Overdue"] },
            { key: "category", label: "Category", options: [...new Set(fees.map(f => f.category))] },
            { key: "class", label: "Class", options: [...new Set(fees.map(f => f.class))] }
          ]}
          selectable={true}
          onEdit={(item) => {
            setEditingId(item.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No fee records found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingId(null)
          }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Fee Record" : "Add Fee Record"}
          initialData={editingId ? fees.find((f) => f.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Fee Record"
          description="Are you sure you want to delete this fee record? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
