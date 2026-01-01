"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, User, Mail, Phone, Building } from "lucide-react"
import Link from "next/link"

const STAFF_DATA = [
    {
        id: "001",
        name: "Chaitnya Jain",
        email: "gstlinkindia@gmail.com",
        role: "Principal",
        department: "High School",
        designation: "Principal",
        mobile: "9529921038",
        biometricId: "3113",
    },
    {
        id: "0008",
        name: "Hnin Wai",
        email: "hninwai123455@gmail.com",
        role: "Admin",
        department: "Marketing Dpt",
        designation: "Marketing",
        mobile: "0912345678",
        biometricId: "",
    },
    {
        id: "09",
        name: "ABDI KALLA",
        email: "drabdiibrahim33@gmail.com",
        role: "Admin",
        department: "-",
        designation: "-",
        mobile: "0927602224",
        biometricId: "",
    },
    {
        id: "009",
        name: "Kate K",
        email: "kate@gmail.com",
        role: "Teacher",
        department: "-",
        designation: "-",
        mobile: "01987654",
        biometricId: "",
    },
    {
        id: "20",
        name: "Aatam Jain",
        email: "drd@gmail.com",
        role: "Teacher, House Master",
        department: "High School",
        designation: "Teacher",
        mobile: "8952972792",
        biometricId: "",
    },
    {
        id: "031",
        name: "Priyam Jain",
        email: "highschool@jafferyacademy.co.tz",
        role: "Teacher",
        department: "teaching",
        designation: "Teacher",
        mobile: "2556865782",
        biometricId: "31",
    },
    {
        id: "00100",
        name: "KG Htet",
        email: "tsan54852@gmail.com",
        role: "Teacher",
        department: "-",
        designation: "-",
        mobile: "09979976541",
        biometricId: "",
    },
]

export default function StaffDirectoryPage() {
    const [role, setRole] = useState("")
    const [keyword, setKeyword] = useState("")

    const columns = [
        {
            key: "id",
            label: "STAFF ID",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600">{value}</span>
        },
        {
            key: "name",
            label: "NAME",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600">{value}</span>
        },
        {
            key: "email",
            label: "EMAIL",
            render: (value: string) => (
                <div className="flex items-center gap-1.5">
                    <span>{value}</span>
                </div>
            )
        },
        {
            key: "role",
            label: "ROLE",
            sortable: true,
        },
        {
            key: "department",
            label: "DEPARTMENT",
            sortable: true,
        },
        {
            key: "designation",
            label: "DESIGNATION",
            sortable: true,
        },
        {
            key: "mobile",
            label: "MOBILE NUMBER",
        },
        {
            key: "biometricId",
            label: "BIOMETRIC ID",
        }
    ]

    return (
        <DashboardLayout title="Staff Directory">
            <div className="space-y-6 max-w-7xl mx-auto">

                {/* Breadcrumb - mocked visually */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><User className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Staff Directory</span>
                </div>

                {/* Select Criteria Card */}
                <Card className="border-t-4 border-t-pink-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-4 bg-pink-50/30">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Search className="h-4 w-4" /> Select Criteria
                        </CardTitle>
                        <Link href="/dashboard/admin/human-resource/staff-directory/add">
                            <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                                <Plus className="h-4 w-4 mr-1" /> Add Staff
                            </Button>
                        </Link>
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
                                        <SelectItem value="principal">Principal</SelectItem>
                                        <SelectItem value="driver">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Search by Keyword</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Search By Staff ID, Name, Role etc..."
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-[#0b1c48] hover:bg-[#1a2d65] px-6">
                                <Search className="h-4 w-4 mr-2" /> Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Staff Directory List */}

                <div className="border-t-4 border-t-pink-500 rounded-lg bg-white shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs">☰</span>
                            </div>
                            Staff Directory List
                        </h3>
                    </div>

                    <div className="p-2">
                        <AdvancedTable
                            columns={columns}
                            data={STAFF_DATA}
                            searchable={false} /* Search is handled in the top card conceptually, or we can enable it */
                            filterable={false}
                            headerClassName="bg-pink-50 text-pink-900 font-semibold uppercase text-xs"
                            actions={[
                                {
                                    label: "Edit",
                                    onClick: () => { },
                                    icon: null
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
