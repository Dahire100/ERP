"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { StatCard } from "@/components/super-admin/stat-card"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  CalendarDays,
  LayoutList,
  Pencil,
  BookOpen,
  Hash,
} from "lucide-react"

interface SubjectItem {
  id: string
  name: string
  code: string
  type: 'theory' | 'practical' | 'both'
  createdAt?: string
}

export default function Subject() {
  const { toast } = useToast()
  const [subjects, setSubjects] = useState<SubjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", code: "", theory: true, practical: false })
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/subjects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        setSubjects(result.data.map((s: any) => ({
          id: s._id,
          name: s.name,
          code: s.code,
          type: s.type,
          createdAt: s.createdAt
        })));
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast({ title: "Error", description: "Failed to load subjects", variant: "destructive" });
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      toast({ title: "Validation Error", description: "Name and Code are required", variant: "destructive" });
      return;
    }

    let resolvedType: 'theory' | 'practical' | 'both' = 'theory';
    if (form.theory && form.practical) resolvedType = 'both';
    else if (form.practical) resolvedType = 'practical';
    else resolvedType = 'theory';

    try {
      const token = localStorage.getItem('token');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/api/subjects/${editingId}` : `${API_URL}/api/subjects`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          code: form.code,
          type: resolvedType
        })
      });

      if (response.ok) {
        toast({ title: "Success", description: `Subject ${editingId ? 'updated' : 'added'} successfully` });
        setForm({ name: "", code: "", theory: true, practical: false });
        setEditingId(null);
        fetchSubjects();
      } else {
        const errData = await response.json();
        toast({ title: "Error", description: errData.error || "Failed to save subject", variant: "destructive" });
      }
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/subjects/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({ title: "Deleted", description: "Subject removed successfully" });
        fetchSubjects();
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    } finally {
      setDeleteConfirm({ open: false, id: null });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Subject",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-800">{value}</span>
        </div>
      )
    },
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono font-bold tracking-tight">
          {value}
        </span>
      )
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${value === 'theory' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
            value === 'practical' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
              'bg-amber-50 text-amber-700 border-amber-100'
          }`}>
          {value}
        </span>
      )
    }
  ]

  return (
    <DashboardLayout title="Subject Curriculum">
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Subject Management</h1>
            <p className="text-sm text-gray-500">Define and organize the subjects in your curriculum</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100">
            <CalendarDays className="h-3.5 w-3.5" />
            Academics / Subject
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/30 border-b">
                <CardTitle className="text-base flex items-center gap-2 text-gray-800 uppercase tracking-wider">
                  <Pencil className="h-4 w-4 text-blue-500" />
                  {editingId ? "Modify Subject" : "New Subject"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></Label>
                    {editingId && (
                      <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => { setEditingId(null); setForm({ name: "", code: "", theory: true, practical: false }) }}>
                        Cancel
                      </Button>
                    )}
                  </div>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mathematics"
                    className="h-11 border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Code <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      placeholder="e.g. MTH-101"
                      className="h-11 pl-10 border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Evaluation Type <span className="text-red-500">*</span></Label>
                  <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <Checkbox
                        checked={form.theory}
                        onCheckedChange={(checked) => setForm({ ...form, theory: Boolean(checked) })}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm text-gray-600 font-medium group-hover:text-blue-600 transition-colors">Theory</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <Checkbox
                        checked={form.practical}
                        onCheckedChange={(checked) => setForm({ ...form, practical: Boolean(checked) })}
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">Practical</span>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-blue-900 hover:bg-blue-800 h-11 shadow-sm mt-2 font-semibold tracking-wide"
                >
                  {editingId ? "Update Subject" : "Confirm Entry"}
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6">
              <StatCard
                title="Active Subjects"
                value={subjects.length.toString()}
                icon={BookOpen}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-50"
                description="Core academic curriculum"
              />
            </div>
          </div>

          <div className="xl:col-span-3">
            <AdvancedTable
              title="Subject Ledger"
              columns={columns}
              data={subjects}
              loading={loading}
              searchable
              searchPlaceholder="Query by name or code..."
              pagination
              onEdit={(row) => {
                setEditingId(row.id);
                setForm({
                  name: row.name,
                  code: row.code,
                  theory: row.type === 'theory' || row.type === 'both',
                  practical: row.type === 'practical' || row.type === 'both'
                });
              }}
              onDelete={(row) => setDeleteConfirm({ open: true, id: row.id })}
            />
          </div>
        </div>

        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          onConfirm={confirmDelete}
          title="Decommission Subject?"
          description="This will marking the subject as inactive. It will no longer be available for new assignments or timetables."
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
