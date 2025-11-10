"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertCircle, Info, Calendar } from "lucide-react"

export default function TeacherNoticeBoard() {
  const notices = [
    { id: 1, title: "Staff Meeting", message: "Monthly staff meeting on Nov 10 at 3 PM in conference room.", date: "2024-11-06", priority: "High", category: "Meeting" },
    { id: 2, title: "Holiday Announcement", message: "School will be closed on Nov 26 for public holiday.", date: "2024-11-05", priority: "Medium", category: "Holiday" },
    { id: 3, title: "Sports Day", message: "Annual sports day scheduled for Nov 30. All teachers required.", date: "2024-11-04", priority: "High", category: "Event" },
    { id: 4, title: "Exam Schedule", message: "Mid-term exam schedule has been updated. Check your dashboard.", date: "2024-11-03", priority: "Medium", category: "Exam" },
  ]

  const totalNotices = notices.length
  const highPriority = notices.filter(n => n.priority === "High").length
  const unreadNotices = 2

  return (
    <DashboardLayout title="Digital Notice Board">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Notice Board
          </h2>
          <p className="text-muted-foreground mt-1">School announcements and updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Notices" value={totalNotices.toString()} icon={Bell} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="High Priority" value={highPriority.toString()} icon={AlertCircle} iconColor="text-red-600" iconBgColor="bg-red-100" />
          <StatCard title="Unread" value={unreadNotices.toString()} icon={Info} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />School Notices</CardTitle>
            <CardDescription>Important announcements and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notices.map((notice) => (
                <div key={notice.id} className={`p-4 border rounded-lg hover:shadow-sm transition-shadow ${
                  notice.priority === "High" ? "border-red-200 bg-red-50" : ""
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{notice.title}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          notice.priority === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {notice.priority}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notice.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
