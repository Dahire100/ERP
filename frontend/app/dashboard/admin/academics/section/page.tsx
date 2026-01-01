"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatCard } from "@/components/super-admin/stat-card"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  CalendarDays,
  LayoutList,
  Pencil,
  Layers,
  Search,
} from "lucide-react"

interface SectionItem {
  id: string
  name: string
  createdAt?: string
}

export default function SectionPage() {
  const { toast } = useToast()
  const [sections, setSections] = useState<SectionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionName, setSectionName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/sections`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        setSections(result.data.map((s: any) => ({
          id: s._id,
          name: s.name,
          createdAt: s.createdAt
        })));
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast({ title: "Error", description: "Could not load sections", variant: "destructive" });
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!sectionName.trim()) {
      toast({ title: "Validation Error", description: "Section name is required", variant: "destructive" });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/api/sections/${editingId}` : `${API_URL}/api/sections`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: sectionName })
      });

      if (response.ok) {
        toast({ title: "Success", description: `Section ${editingId ? 'updated' : 'added'} successfully` });
        setSectionName("");
        setEditingId(null);
        fetchSections();
      } else {
        const errData = await response.json();
        toast({ title: "Error", description: errData.error || "Failed to save section", variant: "destructive" });
      }
    } catch (error) {
      console.error('Error saving section:', error);
    }
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/sections/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({ title: "Deleted", description: "Section removed successfully" });
        fetchSections();
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    } finally {
      setDeleteConfirm({ open: false, id: null });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Section Name",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-pink-100 rounded-md">
            <Layers className="w-4 h-4 text-pink-600" />
          </div>
          <span className="font-semibold text-gray-800">{value}</span>
        </div>
      )
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (val: string) => val ? new Date(val).toLocaleDateString() : "N/A"
    }
  ]

  return (
    <DashboardLayout title="Academic Sections">
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Section Management</h1>
            <p className="text-sm text-gray-500">Create and manage your school's structural sections</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
            <CalendarDays className="h-3.5 w-3.5" />
            Academics / Section
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100/30 border-b">
                <CardTitle className="text-base flex items-center gap-2 text-gray-800 uppercase tracking-wider">
                  <Pencil className="h-4 w-4 text-pink-500" />
                  {editingId ? "Modify Section" : "Define New Section"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></Label>
                    {editingId && (
                      <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => { setEditingId(null); setSectionName("") }}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                  <Input
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="e.g. Section A"
                    className="h-11 border-gray-200 focus:ring-pink-500/20 focus:border-pink-500"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-blue-900 hover:bg-blue-800 h-11 shadow-sm font-semibold tracking-wide"
                >
                  {editingId ? "Update Section" : "Save Section"}
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-4">
              <StatCard
                title="Total Sections"
                value={sections.length.toString()}
                icon={Layers}
                iconColor="text-pink-600"
                iconBgColor="bg-pink-50"
                description="Active divisions"
              />
            </div>
          </div>

          <div className="xl:col-span-3">
            <AdvancedTable
              title="Section Inventory"
              columns={columns}
              data={sections}
              loading={loading}
              searchable
              searchPlaceholder="Find section..."
              pagination
              onEdit={(row) => {
                setEditingId(row.id);
                setSectionName(row.name);
              }}
              onDelete={(row) => setDeleteConfirm({ open: true, id: row.id })}
            />
          </div>
        </div>

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          onConfirm={confirmDelete}
          title="Archive This Section?"
          description="Are you sure you want to remove this section? This action will affect any classes currently linked to it."
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
