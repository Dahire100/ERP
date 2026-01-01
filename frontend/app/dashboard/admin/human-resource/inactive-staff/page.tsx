"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserX, Eye } from "lucide-react"
import { useState } from "react"

const INACTIVE_STAFF_DATA = [
    {
        id: "23",
        name: "test1",
        biometricId: "",
        role: "Admin",
        department: "-",
        designation: "-",
        mobile: "9772119901",
        dateOfLeaving: "",
        inactiveDate: "08-02-2024",
        reason: "test"
    },
    {
        id: "343",
        name: "tst",
        biometricId: "",
        role: "Admin",
        department: "-",
        designation: "-",
        mobile: "9772119901",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "1100",
        name: "Kamlesh",
        biometricId: "",
        role: "Admin",
        department: "teaching",
        designation: "HOD",
        mobile: "8487838799",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "1102",
        name: "Hiren",
        biometricId: "",
        role: "Teacher",
        department: "teaching",
        designation: "Teacher",
        mobile: "8487838799",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "01232",
        name: "Dileep Syed",
        biometricId: "1232",
        role: "Teacher",
        department: "-",
        designation: "-",
        mobile: "2556885782",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "1234",
        name: "chetan Jain",
        biometricId: "",
        role: "Teacher",
        department: "ASET",
        designation: "HOD",
        mobile: "1234567890",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "1245",
        name: "Sachin",
        biometricId: "1254",
        role: "Admin",
        department: "-",
        designation: "HOD",
        mobile: "1234567890",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "2220",
        name: "Eklavya Admin",
        biometricId: "",
        role: "Admin",
        department: "-",
        designation: "-",
        mobile: "1234567890",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "4567",
        name: "JANE LEKULE",
        biometricId: "",
        role: "Admin",
        department: "-",
        designation: "-",
        mobile: "0679136539",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
    {
        id: "5252",
        name: "Test Test",
        biometricId: "735",
        role: "Teacher",
        department: "-",
        designation: "-",
        mobile: "1234567890",
        dateOfLeaving: "",
        inactiveDate: "21-02-2025",
        reason: ""
    },
]

export default function InactiveStaffPage() {
    const [role, setRole] = useState("")

    const columns = [
        {
            key: "id",
            label: "STAFF ID",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600 text-xs">{value}</span>
        },
        {
            key: "name",
            label: "NAME",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600 text-xs">{value}</span>
        },
        {
            key: "biometricId",
            label: "BIOMETRIC ID",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "role",
            label: "ROLE",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "department",
            label: "DEPARTMENT",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "designation",
            label: "DESIGNATION",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "mobile",
            label: "MOBILE NUMBER",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "dateOfLeaving",
            label: "DATE OF LEAVING",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "inactiveDate",
            label: "INACTIVE DATE",
            sortable: true,
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "reason",
            label: "INACTIVE REASON",
            render: (value: string) => <span className="text-gray-700 text-xs">{value}</span>
        },
        {
            key: "action",
            label: "ACTION",
            render: (_: any) => (
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-blue-900">
                    <Eye className="h-4 w-4" />
                </Button>
            )
        }
    ]

    return (
        <DashboardLayout title="Inactive Staff">
            <div className="space-y-6 max-w-full">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><UserX className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Inactive Staff</span>
                </div>

                {/* Select Criteria Card */}
                <Card className="border-t-4 border-t-pink-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="driver">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex justify-end mt-2">
                                    <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                                        <Search className="h-3 w-3 mr-1" /> Search
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Search by Keyword</Label>
                                <Input placeholder="Search By Staff ID, Name, Role etc..." />
                                <div className="flex justify-end mt-2">
                                    <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                                        <Search className="h-3 w-3 mr-1" /> Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Inactive Staff List */}

                <div className="border-t-4 border-t-pink-500 rounded-lg bg-white shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs">☰</span>
                            </div>
                            Inactive Staff List
                        </h3>
                    </div>

                    <div className="p-0">
                        <AdvancedTable
                            columns={columns}
                            data={INACTIVE_STAFF_DATA}
                            searchable={true}
                            searchPlaceholder="Search..."
                            headerClassName="bg-pink-50 text-pink-900 font-semibold uppercase text-xs"

                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
