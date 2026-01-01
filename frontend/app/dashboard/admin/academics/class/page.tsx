"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, GraduationCap, Users, Layers, Layout, BookOpen } from "lucide-react"
import { StatCard } from "@/components/super-admin/stat-card"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import FormModal, { FormField } from "@/components/form-modal"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { useToast } from "@/components/ui/use-toast"

interface ClassItem {
  id: string
  className: string
  group: string
  sections: string[]
  studentCount?: number
}

export default function ClassPage() {
  const { toast } = useToast()
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteData, setDeleteData] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/classes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const mappedData = data.map((item: any) => ({
          id: item._id,
          className: item.className,
          group: item.group || "Main",
          sections: item.sections || [],
          studentCount: item.studentCount || 0
        }));
        setClasses(mappedData);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          className: data.className,
          group: data.group,
          sections: data.sections ? data.sections.split(',').map((s: string) => s.trim()) : []
        })
      });

      if (response.ok) {
        toast({ title: "Success", description: "Class added successfully." });
        fetchClasses();
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to add class")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  const handleEdit = async (id: string, data: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          className: data.className,
          group: data.group,
          sections: data.sections ? data.sections.split(',').map((s: string) => s.trim()) : []
        })
      });

      if (response.ok) {
        toast({ title: "Success", description: "Class updated successfully." });
        fetchClasses();
        setIsModalOpen(false);
        setEditingId(null);
      } else {
        throw new Error("Failed to update class")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  const confirmDelete = async () => {
    if (!deleteData.id) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/classes/${deleteData.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({ title: "Deleted", description: "Class has been removed." });
        fetchClasses();
      } else {
        throw new Error("Failed to delete class")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setDeleteData({ open: false, id: null });
    }
  }

  const columns = [
    { key: "className", label: "Class Name", sortable: true },
    { key: "group", label: "Group", sortable: true },
    {
      key: "sections",
      label: "Sections",
      render: (val: string[]) => (
        <div className="flex flex-wrap gap-1">
          {val.map((s, i) => (
            <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold border border-indigo-100">
              {s}
            </span>
          ))}
        </div>
      )
    },
    {
      key: "studentCount",
      label: "Students",
      sortable: true,
      render: (val: number) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{val}</span>
          <span className="text-[10px] text-gray-400">Enrolled</span>
        </div>
      )
    }
  ]

  const formFields: FormField[] = [
    {
      name: "className",
      label: "Class Name",
      type: "text",
      placeholder: "e.g. Class 10",
      required: true
    },
    {
      name: "group",
      label: "Group / Board",
      type: "text",
      placeholder: "e.g. Science or CBSE",
      required: false
    },
    {
      name: "sections",
      label: "Sections (Comma separated)",
      type: "text",
      placeholder: "e.g. A, B, C",
      required: true
    }
  ]

  return (
    <DashboardLayout title="Academic Structure">
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">

        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Class Management</h1>
            <p className="text-sm text-gray-500">Define your school's class hierarchy and section divisions</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 gap-2 shadow-lg shadow-indigo-100"
            >
              <Plus size={18} /> New Class
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Classes"
            value={classes.length.toString()}
            icon={Layout}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            description="Active academic levels"
          />
          <StatCard
            title="Total Sections"
            value={classes.reduce((acc, curr) => acc + curr.sections.length, 0).toString()}
            icon={Layers}
            iconColor="text-indigo-600"
            iconBgColor="bg-indigo-50"
            description="Cumulative divisions"
          />
          <StatCard
            title="Total Students"
            value={classes.reduce((acc, curr) => acc + (curr.studentCount || 0), 0).toString()}
            icon={GraduationCap}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-50"
            description="Assigned to classes"
          />
        </div>

        <AdvancedTable
          title="Class Directory"
          columns={columns}
          data={classes}
          loading={loading}
          searchable
          searchPlaceholder="Filter classes..."
          pagination
          onEdit={(row) => {
            setEditingId(row.id);
            setIsModalOpen(true);
          }}
          onDelete={(row) => {
            setDeleteData({ open: true, id: row.id });
          }}
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
          }}
          title={editingId ? "Edit Class" : "Add New Class"}
          fields={formFields}
          initialData={editingId ? {
            ...classes.find(c => c.id === editingId),
            sections: classes.find(c => c.id === editingId)?.sections.join(', ')
          } : undefined}
          onSubmit={(data: any) => editingId ? handleEdit(editingId, data) : handleAdd(data)}
        />

        <ConfirmationDialog
          open={deleteData.open}
          onOpenChange={(open) => setDeleteData({ open, id: null })}
          onConfirm={confirmDelete}
          title="Delete Class?"
          description="This will permanently remove the class and all associated section assignments. This action cannot be undone."
        />
      </div>
    </DashboardLayout>
  )
}
