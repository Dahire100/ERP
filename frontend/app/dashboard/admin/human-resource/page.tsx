"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserCheck, UserX, Building, Mail, Phone, Plus, GraduationCap, MapPin, BadgeDollarSign, BookOpen } from "lucide-react"
import FormModal, { FormField } from "@/components/form-modal"
import { useToast } from "@/components/ui/use-toast"

interface Teacher {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  qualification: string
  subjects: string[]
  joiningDate: string
  address: string
  salary: string
  status: "Active" | "On Leave" | "Inactive"
}

export default function HumanResource() {
  const { toast } = useToast()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [deleteData, setDeleteData] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null
  })

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/teachers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const mappedData = data.map((item: any) => ({
          id: item._id,
          name: `${item.firstName} ${item.lastName}`,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phone: item.phone || "N/A",
          qualification: item.qualification || "N/A",
          subjects: item.subjects || [],
          joiningDate: item.joiningDate || new Date().toISOString(),
          address: item.address || "N/A",
          salary: item.salary || "0",
          status: item.isActive ? "Active" : "Inactive"
        }));
        setTeachers(mappedData);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          subjects: typeof data.subjects === 'string' ? data.subjects.split(',').map((s: string) => s.trim()) : data.subjects
        })
      });

      if (response.ok) {
        toast({ title: "Success", description: "Teacher added successfully." });
        fetchTeachers();
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to add teacher")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  const handleEdit = async (id: string, data: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          subjects: typeof data.subjects === 'string' ? data.subjects.split(',').map((s: string) => s.trim()) : data.subjects
        })
      });

      if (response.ok) {
        toast({ title: "Success", description: "Teacher updated successfully." });
        fetchTeachers();
        setIsModalOpen(false);
        setEditingTeacher(null);
      } else {
        throw new Error("Failed to update teacher")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  const confirmDelete = async () => {
    if (!deleteData.id) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/teachers/${deleteData.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast({ title: "Deleted", description: "Teacher record has been removed." });
        fetchTeachers();
      } else {
        throw new Error("Failed to delete teacher")
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setDeleteData({ open: false, id: null });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Staff Member",
      sortable: true,
      render: (value: string, row: Teacher) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">
              {row.firstName[0]}{row.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-gray-900">{value}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{row.qualification}</p>
          </div>
        </div>
      )
    },
    {
      key: "email",
      label: "Contact Profile",
      render: (value: string, row: Teacher) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <Mail className="h-3 w-3 text-indigo-400" />
            <span>{value}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <Phone className="h-3 w-3 text-indigo-300" />
            <span>{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: "subjects",
      label: "Specialization",
      render: (value: string[]) => (
        <div className="flex wrap gap-1 max-w-[150px]">
          {Array.isArray(value) && value.map((s, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-bold uppercase">
              {s}
            </span>
          ))}
        </div>
      )
    },
    {
      key: "salary",
      label: "Payroll",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-1.5 ">
          <BadgeDollarSign className="h-4 w-4 text-emerald-500" />
          <span className="font-bold text-gray-900">₹{parseInt(value).toLocaleString()}</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
  ]

  const formFields: FormField[] = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Institutional Email", type: "email", required: true },
    { name: "phone", label: "Contact Phone", type: "text", required: true },
    { name: "qualification", label: "Academic Qualification", type: "text", required: true },
    { name: "subjects", label: "Subjects (Comma separated)", type: "text", required: true },
    { name: "joiningDate", label: "Appointment Date", type: "date", required: true },
    { name: "salary", label: "Monthly Salary (₹)", type: "number" as any, required: true },
    { name: "address", label: "Residential Address", type: "textarea", required: false },
  ]

  return (
    <DashboardLayout title="Human Capital">
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Staff Directory</h1>
            <p className="text-sm text-gray-500">Manage faculty members, credentials, and payroll details</p>
          </div>
          <Button
            onClick={() => {
              setEditingTeacher(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 gap-2"
          >
            <Plus className="h-4 w-4" /> Add New Staff
          </Button>
        </div>

        {/* Improved Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Faculty"
            value={teachers.length.toString()}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            description="Active workforce"
          />
          <StatCard
            title="Present Today"
            value={teachers.filter(t => t.status === "Active").length.toString()}
            icon={UserCheck}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-50"
            description="At campus"
          />
          <StatCard
            title="On Leave"
            value={teachers.filter(t => t.status === "On Leave").length.toString()}
            icon={UserX}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-50"
            description="Approved absence"
          />
          <StatCard
            title="Monthly Payroll"
            value={`₹${teachers.reduce((acc, curr) => acc + parseInt(curr.salary || "0"), 0).toLocaleString()}`}
            icon={BadgeDollarSign}
            iconColor="text-indigo-600"
            iconBgColor="bg-indigo-50"
            description="Total expenditure"
          />
        </div>

        {/* Advanced Table */}
        <AdvancedTable
          title="Faculty Ledger"
          columns={columns}
          data={teachers}
          loading={loading}
          searchable
          searchPlaceholder="Search by name, email, or qualification..."
          pagination
          onEdit={(row) => {
            const teacher = teachers.find(t => t.id === row.id);
            if (teacher) {
              setEditingTeacher({
                ...teacher,
                subjects: Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects
              } as any);
              setIsModalOpen(true);
            }
          }}
          onDelete={(row) => setDeleteData({ open: true, id: row.id })}
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTeacher(null)
          }}
          title={editingTeacher ? "Update Staff Credentials" : "Register New Faculty"}
          fields={formFields}
          initialData={editingTeacher || undefined}
          onSubmit={(data: any) => editingTeacher ? handleEdit(editingTeacher.id, data) : handleAdd(data)}
        />

        <ConfirmationDialog
          open={deleteData.open}
          onOpenChange={(open) => setDeleteData({ open, id: null })}
          onConfirm={confirmDelete}
          title="Offboard Staff Member?"
          description="This will permanently delete the staff record and revoke their system access. This action cannot be reversed."
        />
      </div>
    </DashboardLayout>
  )
}
