"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { AdvancedTable } from "@/components/super-admin/advanced-table"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const RECRUITMENT_DATA = [
    {
        id: "1",
        name: "Ansh Anand",
        email: "anand.ansh9694@gmail.com",
        phone: "9772119901",
        dob: "03-02-2024",
        status: "Pending",
        interviewDate: "-",
        submissionDate: "02-02-2024",
        expectedSalary: "-",
        workStatus: "-",
        maritalStatus: "-"
    },
    {
        id: "2",
        name: "Ansh Anand",
        email: "anand.ansh9694@gmail.com",
        phone: "9772119901",
        dob: "03-02-2024",
        status: "Pending",
        interviewDate: "-",
        submissionDate: "02-02-2024",
        expectedSalary: "-",
        workStatus: "-",
        maritalStatus: "-"
    },
    {
        id: "3",
        name: "Ansh Anand",
        email: "anand.ansh9694@gmail.com",
        phone: "9772119901",
        dob: "05-01-2024",
        status: "Pending",
        interviewDate: "-",
        submissionDate: "22-01-2024",
        expectedSalary: "-",
        workStatus: "-",
        maritalStatus: "-"
    },
    {
        id: "4",
        name: "Ansh Anand",
        email: "anand.ansh9694@gmail.com",
        phone: "9772119901",
        dob: "24-01-2024",
        status: "Schedule",
        interviewDate: "22-01-2024",
        submissionDate: "29-01-2024",
        expectedSalary: "-",
        workStatus: "-",
        maritalStatus: "-"
    },
    {
        id: "5",
        name: "pooja",
        email: "pooja34@gmail.com",
        phone: "6543217891",
        dob: "09-04-2024",
        status: "Schedule",
        interviewDate: "18-04-2024",
        submissionDate: "25-04-2024",
        expectedSalary: "40000",
        workStatus: "Experience",
        maritalStatus: "Unmarried"
    },
]

export default function RecruitmentPage() {
    const columns = [
        {
            key: "name",
            label: "NAME",
            sortable: true,
            render: (value: string) => <span className="font-medium text-blue-600">{value}</span>
        },
        {
            key: "email",
            label: "EMAIL",
            render: (value: string) => <span className="text-blue-600">{value}</span>
        },
        {
            key: "phone",
            label: "PHONE",
        },
        {
            key: "dob",
            label: "DATE OF BIRTH",
            render: (value: string) => <div className="max-w-[80px]">{value}</div>
        },
        {
            key: "status",
            label: "STATUS",
            render: (value: string) => (
                <Badge variant={value === "Pending" ? "outline" : "secondary"} className={value === "Pending" ? "text-yellow-600 border-yellow-600 bg-yellow-50" : "text-green-600 border-green-600 bg-green-50"}>
                    {value}
                </Badge>
            )
        },
        {
            key: "interviewDate",
            label: "INTERVIEW DATE",
        },
        {
            key: "submissionDate",
            label: "SUBMISSION DATE",
        },
        {
            key: "expectedSalary",
            label: "EXPECTED SALARY"
        },
        {
            key: "workStatus",
            label: "WORK STATUS"
        },
        {
            key: "maritalStatus",
            label: "MARITAL STATUS"
        }
    ]

    return (
        <DashboardLayout title="Recruitment">
            <div className="space-y-6 max-w-full overflow-x-hidden">

                {/* Breadcrumb */}
                <div className="flex justify-end text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Human Resource <span className="mx-1">/</span> Recruitment</span>
                </div>

                {/* Recruitment List */}
                <div className="border-t-4 border-t-pink-500 rounded-lg bg-white shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs">☰</span>
                            </div>
                            Recruitment List
                        </h3>
                        <Button size="sm" className="bg-[#0b1c48] hover:bg-[#1a2d65]">
                            <Plus className="h-4 w-4 mr-1" /> Add Recruitment
                        </Button>
                    </div>

                    <div className="p-2">
                        <AdvancedTable
                            columns={columns}
                            data={RECRUITMENT_DATA}
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
