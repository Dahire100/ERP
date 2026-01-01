"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CalendarDays, FileBarChart2, FileSpreadsheet, UsersRound } from "lucide-react"

const reports = [
  {
    title: "TERM WISE REPORT",
    subtitle: "Term Wise Report",
    href: "/dashboard/admin/examinations/examination-report?type=term-wise",
    icon: <FileBarChart2 className="h-7 w-7 text-amber-700" />,
    bg: "bg-amber-100",
  },
  {
    title: "SUBJECT WISE REPORT",
    subtitle: "Subject Wise Report",
    href: "/dashboard/admin/examinations/examination-report?type=subject-wise",
    icon: <FileSpreadsheet className="h-7 w-7 text-indigo-700" />,
    bg: "bg-indigo-100",
  },
  {
    title: "FAIL STUDENTS REPORT",
    subtitle: "Fail students Report",
    href: "/dashboard/admin/examinations/examination-report?type=fail-students",
    icon: <UsersRound className="h-7 w-7 text-red-700" />,
    bg: "bg-red-100",
  },
]

export default function ExaminationReport() {
  return (
    <DashboardLayout title="Examination Reports">
      <div className="space-y-6">
        <div className="flex items-center justify-end text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-blue-900">Examinations</span>
            <span>/</span>
            <span>Examination Reports</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reports.map((item) => (
            <Link key={item.title} href={item.href} className="block">
              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-blue-900 underline truncate">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate">{item.subtitle}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
