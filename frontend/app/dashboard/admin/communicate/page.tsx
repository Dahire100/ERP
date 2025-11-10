"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Send, CheckCircle, Plus } from "lucide-react"
import FormModal from "@/components/form-modal"

interface Message {
  id: string
  recipient: string
  type: "Email" | "SMS" | "Push"
  subject: string
  date: string
  status: "Sent" | "Pending" | "Failed"
  recipientCount: number
}

export default function Communicate() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", recipient: "All Parents", type: "Email", subject: "Fee Reminder", date: "2024-11-01", status: "Sent", recipientCount: 250 },
    { id: "2", recipient: "Class 10-A", type: "SMS", subject: "Exam Schedule", date: "2024-11-02", status: "Sent", recipientCount: 45 },
    { id: "3", recipient: "All Staff", type: "Email", subject: "Meeting Notification", date: "2024-11-03", status: "Sent", recipientCount: 50 },
    { id: "4", recipient: "Class 9-A Parents", type: "Push", subject: "Event Reminder", date: "2024-11-04", status: "Pending", recipientCount: 48 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const newMessage: Message = { 
      id: Date.now().toString(), 
      ...data,
      recipientCount: Number(data.recipientCount || 0),
      date: new Date().toISOString().split('T')[0]
    }
    setMessages([...messages, newMessage])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setMessages(messages.map((msg) => (msg.id === id ? { 
      ...msg, 
      ...data,
      recipientCount: Number(data.recipientCount || msg.recipientCount)
    } : msg)))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setMessages(messages.filter((msg) => msg.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setMessages(messages.filter((m) => !selectedIds.includes(m.id)))
    }
  }

  const stats = {
    total: messages.length,
    sent: messages.filter(m => m.status === "Sent").length,
    pending: messages.filter(m => m.status === "Pending").length,
    totalRecipients: messages.reduce((sum, m) => sum + m.recipientCount, 0)
  }

  const columns = [
    {
      key: "subject",
      label: "Message",
      render: (value: string, row: Message) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{row.recipient}</p>
        </div>
      )
    },
    {
      key: "type",
      label: "Type",
      render: (value: string) => {
        const icons = {
          Email: <Mail className="h-4 w-4 text-blue-600" />,
          SMS: <MessageSquare className="h-4 w-4 text-green-600" />,
          Push: <Send className="h-4 w-4 text-purple-600" />
        }
        return (
          <div className="flex items-center gap-2">
            {icons[value as keyof typeof icons]}
            <span className="text-sm">{value}</span>
          </div>
        )
      }
    },
    {
      key: "recipientCount",
      label: "Recipients",
      render: (value: number) => (
        <span className="text-sm font-medium">{value} recipients</span>
      )
    },
    {
      key: "date",
      label: "Sent Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields = [
    { name: "recipient", label: "Recipient Group", type: "select" as const, options: [
      { value: "All Parents", label: "All Parents" },
      { value: "All Students", label: "All Students" },
      { value: "All Staff", label: "All Staff" },
      { value: "Class 10-A", label: "Class 10-A" },
      { value: "Class 10-B", label: "Class 10-B" },
      { value: "Class 9-A", label: "Class 9-A" }
    ], required: true },
    { name: "type", label: "Message Type", type: "select" as const, options: [
      { value: "Email", label: "Email" },
      { value: "SMS", label: "SMS" },
      { value: "Push", label: "Push Notification" }
    ], required: true },
    { name: "subject", label: "Subject/Title", type: "text" as const, required: true },
    { name: "recipientCount", label: "Recipient Count", type: "number" as const, required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Sent", label: "Sent" },
      { value: "Pending", label: "Pending" },
      { value: "Failed", label: "Failed" }
    ], required: true },
  ]

  return (
    <DashboardLayout title="Communicate">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Bulk Communication</h2>
            <p className="text-sm text-muted-foreground">Send messages to students, parents, and staff</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Messages"
            value={stats.total.toString()}
            icon={MessageSquare}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Sent"
            value={stats.sent.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Pending"
            value={stats.pending.toString()}
            icon={Send}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Total Recipients"
            value={stats.totalRecipients.toString()}
            icon={Mail}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={messages}
          searchable={true}
          searchPlaceholder="Search by subject or recipient..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Sent", "Pending", "Failed"] },
            { key: "type", label: "Type", options: ["Email", "SMS", "Push"] }
          ]}
          selectable={true}
          onEdit={(msg) => {
            setEditingId(msg.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No messages found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Message" : "Send New Message"}
          initialData={editingId ? messages.find((m) => m.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Message"
          description="Are you sure you want to delete this message record? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
