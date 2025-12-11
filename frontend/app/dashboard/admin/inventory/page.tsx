"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, TrendingDown, AlertTriangle, CheckCircle, Plus, ClipboardList, ArrowUpDown, Factory, BarChart2 } from "lucide-react"
import Link from "next/link"
import FormModal from "@/components/form-modal"

interface InventoryItem {
  id: string
  itemName: string
  quantity: number
  unit: string
  minStock: number
  category: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
  lastUpdated: string
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: "1", itemName: "Notebooks (A4)", quantity: 500, unit: "Pieces", minStock: 100, category: "Stationery", status: "In Stock", lastUpdated: "2024-01-15" },
    { id: "2", itemName: "Pens (Blue)", quantity: 1000, unit: "Pieces", minStock: 200, category: "Stationery", status: "In Stock", lastUpdated: "2024-01-16" },
    { id: "3", itemName: "Whiteboard Markers", quantity: 45, unit: "Pieces", minStock: 50, category: "Classroom", status: "Low Stock", lastUpdated: "2024-01-17" },
    { id: "4", itemName: "Projector Bulbs", quantity: 0, unit: "Pieces", minStock: 5, category: "Electronics", status: "Out of Stock", lastUpdated: "2024-01-18" },
    { id: "5", itemName: "Cleaning Supplies", quantity: 150, unit: "Units", minStock: 30, category: "Maintenance", status: "In Stock", lastUpdated: "2024-01-19" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  const handleAdd = (data: any) => {
    const quantity = Number(data.quantity)
    const minStock = Number(data.minStock)
    const status = quantity === 0 ? "Out of Stock" : quantity <= minStock ? "Low Stock" : "In Stock"
    
    const newItem: InventoryItem = { 
      id: Date.now().toString(), 
      ...data,
      quantity,
      minStock,
      status: status as "In Stock" | "Low Stock" | "Out of Stock",
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setItems([...items, newItem])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        const quantity = Number(data.quantity)
        const minStock = Number(data.minStock || item.minStock)
        const status = quantity === 0 ? "Out of Stock" : quantity <= minStock ? "Low Stock" : "In Stock"
        return { 
          ...item, 
          ...data,
          quantity,
          minStock,
          status: status as "In Stock" | "Low Stock" | "Out of Stock",
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      }
      return item
    }))
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleDelete = (item: any) => {
    setDeleteConfirm({ open: true, id: item.id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setItems(items.filter((item) => item.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    if (action === "delete") {
      setItems(items.filter((i) => !selectedIds.includes(i.id)))
    }
  }

  const stats = {
    totalItems: items.length,
    inStock: items.filter(i => i.status === "In Stock").length,
    lowStock: items.filter(i => i.status === "Low Stock").length,
    outOfStock: items.filter(i => i.status === "Out of Stock").length
  }

  const columns = [
    {
      key: "itemName",
      label: "Item Details",
      render: (value: string, row: InventoryItem) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Package className="h-4 w-4 text-teal-600" />
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-muted-foreground">{row.category}</p>
          </div>
        </div>
      )
    },
    {
      key: "quantity",
      label: "Stock Level",
      render: (value: number, row: InventoryItem) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{value} {row.unit}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Min: {row.minStock} {row.unit}
          </div>
        </div>
      )
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields = [
    { name: "itemName", label: "Item Name", type: "text" as const, required: true },
    { name: "category", label: "Category", type: "select" as const, options: [
      { value: "Stationery", label: "Stationery" },
      { value: "Classroom", label: "Classroom" },
      { value: "Electronics", label: "Electronics" },
      { value: "Maintenance", label: "Maintenance" },
      { value: "Sports", label: "Sports" },
      { value: "Other", label: "Other" }
    ], required: true },
    { name: "quantity", label: "Current Quantity", type: "number" as const, required: true },
    { name: "unit", label: "Unit", type: "select" as const, options: [
      { value: "Pieces", label: "Pieces" },
      { value: "Units", label: "Units" },
      { value: "Boxes", label: "Boxes" },
      { value: "Sets", label: "Sets" }
    ], required: true },
    { name: "minStock", label: "Minimum Stock Level", type: "number" as const, required: true },
  ]

  return (
    <DashboardLayout title="Inventory">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Item Master", description: "Catalog items", icon: <ClipboardList className="h-6 w-6 text-indigo-600" />, href: "/dashboard/admin/inventory/item-master" },
            { title: "Stock In/Out", description: "Record movements", icon: <ArrowUpDown className="h-6 w-6 text-emerald-600" />, href: "/dashboard/admin/inventory/stock-in-out" },
            { title: "Vendor Management", description: "Suppliers & contacts", icon: <Factory className="h-6 w-6 text-orange-600" />, href: "/dashboard/admin/inventory/vendor-management" },
            { title: "Stock Reports", description: "View stock analytics", icon: <BarChart2 className="h-6 w-6 text-purple-600" />, href: "/dashboard/admin/inventory/stock-reports" },
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
            <h2 className="text-2xl font-semibold">Inventory Management</h2>
            <p className="text-sm text-muted-foreground">Track and manage school inventory items</p>
          </div>
          <Button onClick={() => { setEditingId(null); setIsModalOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Items"
            value={stats.totalItems.toString()}
            icon={Package}
            iconColor="text-teal-600"
            iconBgColor="bg-teal-100"
          />
          <StatCard
            title="In Stock"
            value={stats.inStock.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Low Stock"
            value={stats.lowStock.toString()}
            icon={TrendingDown}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Out of Stock"
            value={stats.outOfStock.toString()}
            icon={AlertTriangle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
        </div>

        <AdvancedTable
          columns={columns}
          data={items}
          searchable={true}
          searchPlaceholder="Search inventory items..."
          filterable={true}
          filterOptions={[
            { key: "status", label: "Status", options: ["In Stock", "Low Stock", "Out of Stock"] },
            { key: "category", label: "Category", options: [...new Set(items.map(i => i.category))] }
          ]}
          selectable={true}
          onEdit={(item) => {
            setEditingId(item.id)
            setIsModalOpen(true)
          }}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          pageSize={10}
          emptyMessage="No inventory items found."
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingId(null) }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Item" : "Add New Item"}
          initialData={editingId ? items.find((i) => i.id === editingId) : {}}
        />

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Item"
          description="Are you sure you want to delete this item from inventory? This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
