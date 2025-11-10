"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatCard } from "@/components/super-admin/stat-card"
import { StatusBadge } from "@/components/super-admin/status-badge"
import { MiniChart } from "@/components/super-admin/mini-chart"
import { 
  Building2, 
  Users, 
  DollarSign,
  IndianRupee, 
  TrendingUp,
  Settings,
  Eye,
  UserCog,
  AlertCircle,
  CheckCircle,
  MoreVertical
} from "lucide-react"
import Link from "next/link"

export default function SuperAdminDashboard() {
  // Mock data with trends
  const stats = [
    {
      title: "Total Schools",
      value: "24",
      icon: Building2,
      trend: { value: 12.5, isPositive: true },
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
      chartData: [10, 15, 12, 18, 20, 22, 24]
    },
    {
      title: "Total Students",
      value: "12,691",
      icon: Users,
      trend: { value: 8.2, isPositive: true },
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
      chartData: [8000, 9000, 9500, 10200, 11000, 11800, 12691]
    },
    {
      title: "Active Subscriptions",
      value: "21",
      icon: CheckCircle,
      trend: { value: 4.3, isPositive: true },
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100",
      chartData: [15, 16, 18, 19, 20, 20, 21]
    },
    {
      title: "Monthly Revenue",
      value: "₹1.56Cr",
      icon: IndianRupee,
      trend: { value: 15.8, isPositive: true },
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
      chartData: [100, 110, 120, 130, 140, 150, 156]
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
      lastActive: "2 hours ago"
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
      lastActive: "5 hours ago"
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
      lastActive: "1 day ago"
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
      lastActive: "3 days ago"
    },
  ]

  const recentActivity = [
    { type: "new", message: "New school registered: West Point Academy", time: "10 min ago" },
    { type: "payment", message: "Payment received from Central High School", time: "1 hour ago" },
    { type: "alert", message: "Support ticket #234 requires attention", time: "2 hours ago" },
    { type: "update", message: "System update completed successfully", time: "5 hours ago" },
  ]

  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Platform Stats with Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                iconColor={stat.iconColor}
                iconBgColor={stat.iconBgColor}
              />
              <div className="flex justify-center">
                <MiniChart data={stat.chartData} color={stat.iconColor.replace('text-', '#').replace('-600', '')} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/dashboard/super-admin/institute-management">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Manage Schools</p>
                    <p className="text-xs text-muted-foreground">24 total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/super-admin/saas-plans">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">SaaS Plans</p>
                    <p className="text-xs text-muted-foreground">3 active plans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/super-admin/billing">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Billing</p>
                    <p className="text-xs text-muted-foreground">₹1.56Cr revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/super-admin/support-tickets">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Support</p>
                    <p className="text-xs text-muted-foreground">5 open tickets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schools Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Schools Overview</CardTitle>
                  <CardDescription>Manage all schools on the platform</CardDescription>
                </div>
                <Link href="/dashboard/super-admin/institute-management">
                  <Button size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schools.map((school) => (
                    <div key={school.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={school.logo} alt={school.name} />
                          <AvatarFallback>{school.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">{school.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {school.students} students • {school.teachers} teachers
                              </p>
                            </div>
                            <StatusBadge status={school.status} />
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {school.plan} Plan
                            </span>
                            <span className="flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" />
                              {school.revenue}/mo
                            </span>
                            <span>Last active: {school.lastActive}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center ${
                        activity.type === 'new' ? 'bg-blue-100' :
                        activity.type === 'payment' ? 'bg-green-100' :
                        activity.type === 'alert' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'new' && <Building2 className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'payment' && <IndianRupee className="h-4 w-4 text-green-600" />}
                        {activity.type === 'alert' && <AlertCircle className="h-4 w-4 text-orange-600" />}
                        {activity.type === 'update' && <CheckCircle className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/super-admin/institute-management">
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="h-4 w-4 mr-2" />
                    Add New School
                  </Button>
                </Link>
                <Link href="/dashboard/super-admin/platform-settings">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Platform Settings
                  </Button>
                </Link>
                <Link href="/dashboard/super-admin/support-tickets">
                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    View Support Tickets
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
