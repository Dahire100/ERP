"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bus, MapPin, Users, AlertCircle, Plus, Phone } from "lucide-react"
import FormModal from "@/components/form-modal"

interface TransportBus {
  id: string
  busNumber: string
  driverName: string
  driverPhone: string
  route: string
  capacity: number
  studentsAssigned: number
  status: "Active" | "Maintenance" | "Inactive"
}

export default function Transport() {
  const [buses, setBuses] = useState<TransportBus[]>([
    { id: "1", busNumber: "BUS-001", driverName: "Ahmed Khan", driverPhone: "+1-555-0101", route: "Route A - North", capacity: 50, studentsAssigned: 45, status: "Active" },
    { id: "2", busNumber: "BUS-002", driverName: "Ali Hassan", driverPhone: "+1-555-0102", route: "Route B - South", capacity: 45, studentsAssigned: 42, status: "Active" },
    { id: "3", busNumber: "BUS-003", driverName: "John Smith", driverPhone: "+1-555-0103", route: "Route C - East", capacity: 40, studentsAssigned: 0, status: "Maintenance" },
    { id: "4", busNumber: "BUS-004", driverName: "Michael Brown", driverPhone: "+1-555-0104", route: "Route D - West", capacity: 48, studentsAssigned: 38, status: "Active" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const newBus: TransportBus = { 
      id: Date.now().toString(), 
      ...data,
      capacity: Number(data.capacity),
      studentsAssigned: Number(data.studentsAssigned || 0)
    }
    setBuses([...buses, newBus])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setBuses(buses.map((bus) => (bus.id === id ? { 
      ...bus, 
      ...data,
      capacity: Number(data.capacity),
      studentsAssigned: Number(data.studentsAssigned || bus.studentsAssigned)
    } : bus)))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setBuses(buses.filter((bus) => bus.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setBuses(buses.filter((b) => !selectedIds.includes(b.id)))
    }
  }

  const stats = {
    totalBuses: buses.length,
    active: buses.filter(b => b.status === "Active").length,
    totalCapacity: buses.reduce((sum, b) => sum + b.capacity, 0),
    studentsTransported: buses.reduce((sum, b) => sum + b.studentsAssigned, 0)
  }

  const columns = [
    {
      key: "busNumber",
      label: "Bus Details",
      render: (value: string, row: TransportBus) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Bus className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {row.route}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "driverName",
      label: "Driver",
      render: (value: string, row: TransportBus) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
              {value.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{value}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {row.driverPhone}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "capacity",
      label: "Capacity",
      render: (value: number, row: TransportBus) => {
        const percentage = Math.round((row.studentsAssigned / value) * 100)
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{row.studentsAssigned}/{value}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {percentage}% occupied
            </div>
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
    { name: "busNumber", label: "Bus Number", type: "text" as const, required: true },
    { name: "route", label: "Route Name", type: "text" as const, required: true },
    { name: "driverName", label: "Driver Name", type: "text" as const, required: true },
    { name: "driverPhone", label: "Driver Phone", type: "text" as const, required: true },
    { name: "capacity", label: "Seating Capacity", type: "number" as const, required: true },
    { name: "studentsAssigned", label: "Students Assigned", type: "number" as const, required: false },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Active", label: "Active" },
      { value: "Maintenance", label: "Maintenance" },
      { value: "Inactive", label: "Inactive" }
    ], required: true },
  ]

  return (
    <DashboardLayout title="Transport">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Transport Management</h2>
            <p className="text-sm text-muted-foreground">Manage school buses, routes, and drivers</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bus
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Buses"
            value={stats.totalBuses.toString()}
            icon={Bus}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
          <StatCard
            title="Active Buses"
            value={stats.active.toString()}
            icon={MapPin}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Total Capacity"
            value={stats.totalCapacity.toString()}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Students"
            value={stats.studentsTransported.toString()}
            icon={AlertCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={buses}
          searchable={true}
          searchPlaceholder="Search by bus number, driver, or route..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Active", "Maintenance", "Inactive"] },
          ]}
          selectable={true}
          onEdit={(bus) => {
            setEditingId(bus.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No buses found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Bus" : "Add New Bus"}
          initialData={editingId ? buses.find((b) => b.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Bus"
          description="Are you sure you want to delete this bus? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
