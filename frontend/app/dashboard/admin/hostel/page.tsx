"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Bed, Users, DoorOpen, Plus } from "lucide-react"
import FormModal from "@/components/form-modal"

interface HostelRoom {
  id: string
  roomNumber: string
  capacity: number
  occupied: number
  floor: string
  type: "Boys" | "Girls"
  status: "Available" | "Full" | "Maintenance"
  warden?: string
}

export default function Hostel() {
  const [rooms, setRooms] = useState<HostelRoom[]>([
    { id: "1", roomNumber: "101", capacity: 4, occupied: 3, floor: "1st", type: "Boys", status: "Available", warden: "Mr. Ahmed" },
    { id: "2", roomNumber: "102", capacity: 4, occupied: 4, floor: "1st", type: "Boys", status: "Full", warden: "Mr. Ahmed" },
    { id: "3", roomNumber: "201", capacity: 4, occupied: 2, floor: "2nd", type: "Girls", status: "Available", warden: "Ms. Sarah" },
    { id: "4", roomNumber: "202", capacity: 4, occupied: 4, floor: "2nd", type: "Girls", status: "Full", warden: "Ms. Sarah" },
    { id: "5", roomNumber: "301", capacity: 4, occupied: 0, floor: "3rd", type: "Boys", status: "Maintenance", warden: "Mr. John" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const capacity = Number(data.capacity)
    const occupied = Number(data.occupied || 0)
    const status = occupied === 0 && data.status === "Maintenance" ? "Maintenance" : occupied >= capacity ? "Full" : "Available"
    
    const newRoom: HostelRoom = { 
      id: Date.now().toString(), 
      ...data,
      capacity,
      occupied,
      status: status as "Available" | "Full" | "Maintenance"
    }
    setRooms([...rooms, newRoom])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setRooms(rooms.map((room) => {
      if (room.id === id) {
        const capacity = Number(data.capacity)
        const occupied = Number(data.occupied || room.occupied)
        const status = data.status === "Maintenance" ? "Maintenance" : occupied >= capacity ? "Full" : "Available"
        return { 
          ...room, 
          ...data,
          capacity,
          occupied,
          status: status as "Available" | "Full" | "Maintenance"
        }
      }
      return room
    }))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setRooms(rooms.filter((room) => room.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setRooms(rooms.filter((r) => !selectedIds.includes(r.id)))
    }
  }

  const stats = {
    totalRooms: rooms.length,
    totalCapacity: rooms.reduce((sum, r) => sum + r.capacity, 0),
    occupied: rooms.reduce((sum, r) => sum + r.occupied, 0),
    available: rooms.reduce((sum, r) => sum + (r.capacity - r.occupied), 0)
  }

  const columns = [
    {
      key: "roomNumber",
      label: "Room Details",
      render: (value: string, row: HostelRoom) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            row.type === "Boys" ? "bg-blue-100" : "bg-pink-100"
          }`}>
            <Home className={`h-4 w-4 ${
              row.type === "Boys" ? "text-blue-600" : "text-pink-600"
            }`} />
          </div>
          <div>
            <p className="font-medium">Room {value}</p>
            <p className="text-xs text-muted-foreground">{row.floor} Floor - {row.type}</p>
          </div>
        </div>
      )
    },
    {
      key: "capacity",
      label: "Occupancy",
      render: (value: number, row: HostelRoom) => {
        const percentage = Math.round((row.occupied / value) * 100)
        return (
          <div className="space-y-2 min-w-[150px]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{row.occupied}/{value}</span>
              <span className="text-muted-foreground">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      }
    },
    {
      key: "warden",
      label: "Warden",
      render: (value: string) => value ? <span className="text-sm">{value}</span> : <span className="text-xs text-muted-foreground">-</span>
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields = [
    { name: "roomNumber", label: "Room Number", type: "text" as const, required: true },
    { name: "floor", label: "Floor", type: "select" as const, options: [
      { value: "1st", label: "1st Floor" },
      { value: "2nd", label: "2nd Floor" },
      { value: "3rd", label: "3rd Floor" },
      { value: "4th", label: "4th Floor" }
    ], required: true },
    { name: "type", label: "Hostel Type", type: "select" as const, options: [
      { value: "Boys", label: "Boys" },
      { value: "Girls", label: "Girls" }
    ], required: true },
    { name: "capacity", label: "Room Capacity", type: "number" as const, required: true },
    { name: "occupied", label: "Currently Occupied", type: "number" as const, required: false },
    { name: "warden", label: "Warden Name", type: "text" as const, required: false },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Available", label: "Available" },
      { value: "Full", label: "Full" },
      { value: "Maintenance", label: "Maintenance" }
    ], required: true },
  ]

  return (
    <DashboardLayout title="Hostel">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Hostel Management</h2>
            <p className="text-sm text-muted-foreground">Manage hostel rooms and resident allocations</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Rooms"
            value={stats.totalRooms.toString()}
            icon={Home}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Total Capacity"
            value={stats.totalCapacity.toString()}
            icon={Bed}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Occupied"
            value={stats.occupied.toString()}
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Available"
            value={stats.available.toString()}
            icon={DoorOpen}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={rooms}
          searchable={true}
          searchPlaceholder="Search by room number, floor, or warden..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["Available", "Full", "Maintenance"] },
            { key: "type", label: "Type", options: ["Boys", "Girls"] },
            { key: "floor", label: "Floor", options: [...new Set(rooms.map(r => r.floor))] }
          ]}
          selectable={true}
          onEdit={(room) => {
            setEditingId(room.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No hostel rooms found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Room" : "Add New Room"}
          initialData={editingId ? rooms.find((r) => r.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Room"
          description="Are you sure you want to delete this hostel room? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
