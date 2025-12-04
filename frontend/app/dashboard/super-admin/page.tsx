"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  TrendingUp,
  IndianRupee,
  CheckCircle,
  Settings,
  Eye,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Plus,
  FileText,
  CreditCard
} from "lucide-react"
import Link from "next/link"

export default function SuperAdminDashboard() {
  // Mock data with trends
  const stats = [
    {
      title: "Total Schools",
      value: "24",
      change: "+12.5%",
      isPositive: true,
      icon: Building2,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      description: "3 new this month"
    },
    {
      title: "Total Students",
      value: "12,691",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      description: "Across all schools"
    },
    {
      title: "Active Subscriptions",
      value: "21",
      change: "+4.3%",
      isPositive: true,
      icon: CheckCircle,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      description: "3 expiring soon"
    },
    {
      title: "Monthly Revenue",
      value: "₹1.56Cr",
      change: "+15.8%",
      isPositive: true,
      icon: IndianRupee,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      description: "Last 30 days"
    },
  ]

  const schools = [
    {
      id: 1,
      name: "Central High School",
      logo: "/placeholder.svg",
      students: 1234,
      teachers: 45,
      status: "Active",
      plan: "Premium",
      revenue: "₹5,20,000",
      lastActive: "2 hours ago",
      growth: "+12%"
    },
    {
      id: 2,
      name: "North Academy",
      logo: "/placeholder.svg",
      students: 890,
      teachers: 32,
      status: "Active",
      plan: "Basic",
      revenue: "₹2,80,000",
      lastActive: "5 hours ago",
      growth: "+8%"
    },
    {
      id: 3,
      name: "South Institute",
      logo: "/placeholder.svg",
      students: 567,
      teachers: 28,
      status: "Active",
      plan: "Enterprise",
      revenue: "₹8,50,000",
      lastActive: "1 day ago",
      growth: "+15%"
    },
    {
      id: 4,
      name: "East Valley School",
      logo: "/placeholder.svg",
      students: 432,
      teachers: 22,
      status: "Inactive",
      plan: "Basic",
      revenue: "₹1,20,000",
      lastActive: "3 days ago",
      growth: "-3%"
    },
  ]

  const recentActivity = [
    {
      type: "new",
      title: "New School Registration",
      message: "West Point Academy registered",
      time: "10 min ago",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      type: "payment",
      title: "Payment Received",
      message: "₹5,20,000 from Central High School",
      time: "1 hour ago",
      icon: CreditCard,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      type: "alert",
      title: "Support Ticket",
      message: "Ticket #234 requires attention",
      time: "2 hours ago",
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      type: "update",
      title: "System Update",
      message: "Platform updated successfully",
      time: "5 hours ago",
      icon: CheckCircle,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
  ]

  const quickActions = [
    {
      title: "Manage Schools",
      description: "View and manage all schools",
      icon: Building2,
      href: "/dashboard/super-admin/institute-management",
      color: "blue"
    },
    {
      title: "SaaS Plans",
      description: "Manage subscription plans",
      icon: TrendingUp,
      href: "/dashboard/super-admin/saas-plans",
      color: "purple"
    },
    {
      title: "Billing",
      description: "View revenue and invoices",
      icon: IndianRupee,
      href: "/dashboard/super-admin/billing",
      color: "green"
    },
    {
      title: "Support",
      description: "Handle support tickets",
      icon: AlertCircle,
      href: "/dashboard/super-admin/support-tickets",
      color: "orange"
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-700'
      case 'premium':
        return 'bg-blue-100 text-blue-700'
      case 'basic':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-full -mr-16 -mt-16"></div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={stat.isPositive ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-${action.color}-100 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schools Management */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Schools Overview</CardTitle>
                    <CardDescription>Manage all schools on the platform</CardDescription>
                  </div>
                  <Link href="/dashboard/super-admin/institute-management">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add School
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {schools.map((school) => (
                    <div key={school.id} className="p-4 border-2 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14 border-2 border-gray-100">
                          <AvatarImage src={school.logo} alt={school.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold">
                            {school.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{school.name}</p>
                              <p className="text-sm text-gray-600">
                                {school.students.toLocaleString()} students • {school.teachers} teachers
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(school.status)} border`}>
                                {school.status}
                              </Badge>
                              <Badge className={getPlanColor(school.plan)}>
                                {school.plan}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <IndianRupee className="w-4 h-4" />
                              <span className="font-semibold">{school.revenue}/mo</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className={school.growth.startsWith('+') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {school.growth}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{school.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-gray-100">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/dashboard/super-admin/institute-management">
                    <Button variant="outline" className="w-full border-2 hover:border-blue-300 hover:bg-blue-50">
                      View All Schools
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Latest platform updates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-lg h-10 w-10 flex items-center justify-center ${activity.iconBg}`}>
                        <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
                <CardDescription className="text-blue-100">Access platform documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
                <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Support Center
                </Button>
                <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
