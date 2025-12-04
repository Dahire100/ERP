"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  Send,
  Inbox,
  MessageSquare,
  Settings,
  CreditCard,
  FileText,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function FrontOffice() {
  const modules = [
    {
      title: "Admission Enquiry",
      description: "Manage student admission enquiries and follow-ups",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      href: "/dashboard/admin/front-office/admission-enquiry",
      color: "bg-blue-50 border-blue-100"
    },
    {
      title: "Visitors Book",
      description: "Track visitors entering and leaving the campus",
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      href: "/dashboard/admin/front-office/visitors-book",
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "Postal Exchange",
      description: "Manage incoming and outgoing postal mail",
      icon: <Send className="h-8 w-8 text-purple-600" />,
      href: "/dashboard/admin/front-office/postal-exchange",
      color: "bg-purple-50 border-purple-100"
    },
    {
      title: "Complain",
      description: "Manage complaints from students, parents, and staff",
      icon: <MessageSquare className="h-8 w-8 text-red-600" />,
      href: "/dashboard/admin/front-office/complain",
      color: "bg-red-50 border-red-100"
    },
    {
      title: "Setup Front Office",
      description: "Configure front office settings and categories",
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      href: "/dashboard/admin/front-office/setup",
      color: "bg-gray-50 border-gray-100"
    },
    {
      title: "Gate Pass",
      description: "Issue and manage gate passes for students/staff",
      icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
      href: "/dashboard/admin/front-office/gate-pass",
      color: "bg-indigo-50 border-indigo-100"
    },
    {
      title: "Entrance Exam Form",
      description: "Manage entrance examination forms and applications",
      icon: <FileText className="h-8 w-8 text-cyan-600" />,
      href: "/dashboard/admin/front-office/entrance-exam",
      color: "bg-cyan-50 border-cyan-100"
    }
  ]

  return (
    <DashboardLayout title="Front Office">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Link key={index} href={module.href}>
              <Card className={`h-full transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border ${module.color}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      {module.icon}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
