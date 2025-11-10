"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import FormModal from "@/components/form-modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Download,
  Send,
  Calendar
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts"

interface Invoice {
  id: string
  institute: string
  amount: number
  dueDate: string
  status: "Paid" | "Pending" | "Overdue"
  invoiceNumber: string
  issuedDate: string
  plan: string
}

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { 
      id: "1", 
      institute: "Central High School", 
      amount: 5000, 
      dueDate: "2025-02-01", 
      status: "Paid",
      invoiceNumber: "INV-2025-001",
      issuedDate: "2025-01-01",
      plan: "Premium"
    },
    { 
      id: "2", 
      institute: "North Academy", 
      amount: 3500, 
      dueDate: "2025-02-01", 
      status: "Pending",
      invoiceNumber: "INV-2025-002",
      issuedDate: "2025-01-01",
      plan: "Basic"
    },
    { 
      id: "3", 
      institute: "South Institute", 
      amount: 2800, 
      dueDate: "2025-01-15", 
      status: "Overdue",
      invoiceNumber: "INV-2025-003",
      issuedDate: "2024-12-15",
      plan: "Enterprise"
    },
    { 
      id: "4", 
      institute: "East Valley School", 
      amount: 1200, 
      dueDate: "2025-02-10", 
      status: "Pending",
      invoiceNumber: "INV-2025-004",
      issuedDate: "2025-01-10",
      plan: "Basic"
    },
    { 
      id: "5", 
      institute: "West Point Academy", 
      amount: 4800, 
      dueDate: "2025-01-25", 
      status: "Paid",
      invoiceNumber: "INV-2025-005",
      issuedDate: "2024-12-25",
      plan: "Premium"
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ 
    open: false, 
    id: null 
  })
  const [dateFilter, setDateFilter] = useState("all")

  const handleAdd = (data: any) => {
    const newInvoice: Invoice = { 
      id: Date.now().toString(), 
      ...data,
      amount: parseFloat(data.amount),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      issuedDate: new Date().toISOString().split('T')[0]
    }
    setInvoices([...invoices, newInvoice])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setInvoices(invoices.map((i) => (i.id === id ? { ...i, ...data, amount: parseFloat(data.amount) } : i)))
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setInvoices(invoices.filter((i) => i.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setInvoices(invoices.filter((i) => !selectedIds.includes(i.id)))
    }
  }

  const columns = [
    { 
      key: "invoiceNumber", 
      label: "Invoice #",
      render: (value: string, row: Invoice) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{row.institute}</p>
        </div>
      )
    },
    { 
      key: "plan", 
      label: "Plan" 
    },
    { 
      key: "amount", 
      label: "Amount",
      render: (value: number) => (
        <span className="font-semibold">₹{value.toLocaleString()}</span>
      )
    },
    { 
      key: "issuedDate", 
      label: "Issued Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { 
      key: "dueDate", 
      label: "Due Date",
      render: (value: string, row: Invoice) => {
        const daysUntilDue = Math.ceil((new Date(value).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        return (
          <div>
            <p>{new Date(value).toLocaleDateString()}</p>
            {row.status === "Pending" && daysUntilDue > 0 && (
              <p className="text-xs text-muted-foreground">{daysUntilDue} days left</p>
            )}
          </div>
        )
      }
    },
    { 
      key: "status", 
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields = [
    { name: "institute", label: "Institute", type: "text" as const, required: true },
    { name: "amount", label: "Amount", type: "number" as const, required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Paid", label: "Paid" },
      { value: "Pending", label: "Pending" },
      { value: "Overdue", label: "Overdue" }
    ], required: true },
    { name: "dueDate", label: "Due Date", type: "date" as const, required: true },
    { name: "plan", label: "Plan", type: "text" as const, required: true },
  ]

  // Calculate stats
  const stats = {
    totalRevenue: invoices.filter(i => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0),
    pendingPayments: invoices.filter(i => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0),
    overduePayments: invoices.filter(i => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0),
    thisMonth: invoices.filter(i => {
      const invoiceDate = new Date(i.issuedDate)
      const now = new Date()
      return invoiceDate.getMonth() === now.getMonth() && invoiceDate.getFullYear() === now.getFullYear()
    }).reduce((sum, i) => sum + i.amount, 0)
  }

  // Revenue chart data
  const revenueData = [
    { month: "Jul", revenue: 45000 },
    { month: "Aug", revenue: 52000 },
    { month: "Sep", revenue: 48000 },
    { month: "Oct", revenue: 61000 },
    { month: "Nov", revenue: 55000 },
    { month: "Dec", revenue: 68000 },
  ]

  // Payment status distribution
  const statusData = [
    { name: "Paid", value: invoices.filter(i => i.status === "Paid").length },
    { name: "Pending", value: invoices.filter(i => i.status === "Pending").length },
    { name: "Overdue", value: invoices.filter(i => i.status === "Overdue").length },
  ]

  return (
    <DashboardLayout title="Billing & Invoicing">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.pendingPayments.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.overduePayments.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.thisMonth.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Last 6 months revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>Invoice distribution by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">All Invoices</h2>
            <p className="text-sm text-muted-foreground">Manage billing and payment tracking</p>
          </div>
          <div className="flex gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setEditingId(null)
                setIsModalOpen(true)
              }}
            >
              <Send className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </div>

        {/* Advanced Table */}
        <AdvancedTable
          columns={columns}
          data={invoices}
          searchable={true}
          searchPlaceholder="Search by invoice number or institute..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Paid", "Pending", "Overdue"] },
            { key: "plan", label: "Plan", options: ["Basic", "Premium", "Enterprise"] }
          ]}
          selectable={true}
          onEdit={(item) => {
            setEditingId(item.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          actions={[
            {
              label: "Download",
              onClick: (item) => console.log("Download", item),
              icon: <Download className="h-4 w-4 mr-2" />
            },
            {
              label: "Send Reminder",
              onClick: (item) => console.log("Send reminder", item),
              icon: <Send className="h-4 w-4 mr-2" />
            }
          ]}
          pageSize={10}
          emptyMessage="No invoices found."
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
          title={editingId ? "Edit Invoice" : "Generate Invoice"}
          initialData={editingId ? invoices.find((i) => i.id === editingId) : {}}
        />

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Invoice"
          description="Are you sure you want to delete this invoice? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
