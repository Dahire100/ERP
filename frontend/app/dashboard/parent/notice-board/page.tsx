"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertCircle, Calendar, Pin } from "lucide-react"

export default function ParentNoticeBoard() {
  const notices = [
    { id: 1, title: "Parent-Teacher Meeting", content: "Annual parent-teacher meeting scheduled for January 25th. Please mark your calendars.", date: "2025-01-15", category: "Meeting", priority: "High", isPinned: true, isRead: false },
    { id: 2, title: "Sports Day Event", content: "Annual sports day will be held on February 5th. Students are requested to bring sports attire.", date: "2025-01-14", category: "Event", priority: "Medium", isPinned: true, isRead: false },
    { id: 3, title: "Holiday Notice", content: "School will remain closed on January 26th for Republic Day.", date: "2025-01-12", category: "Holiday", priority: "Medium", isPinned: false, isRead: true },
    { id: 4, title: "Fee Payment Reminder", content: "Last date for fee payment is January 31st. Late fees will be applicable after this date.", date: "2025-01-10", category: "General", priority: "High", isPinned: false, isRead: true },
    { id: 5, title: "Library Books Return", content: "All library books must be returned by January 20th.", date: "2025-01-08", category: "General", priority: "Low", isPinned: false, isRead: true },
  ]

  const totalNotices = notices.length
  const unreadNotices = notices.filter(n => !n.isRead).length
  const pinnedNotices = notices.filter(n => n.isPinned).length
  const highPriorityNotices = notices.filter(n => n.priority === "High").length

  return (
    <DashboardLayout title="Digital Notice Board">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notice Board
          </h2>
          <p className="text-muted-foreground mt-1">
            Stay updated with school announcements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Notices"
            value={totalNotices.toString()}
            icon={Bell}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Unread"
            value={unreadNotices.toString()}
            icon={AlertCircle}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Pinned"
            value={pinnedNotices.toString()}
            icon={Pin}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="High Priority"
            value={highPriorityNotices.toString()}
            icon={AlertCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Notices List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              School Announcements
            </CardTitle>
            <CardDescription>Important notices and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notices.map((notice) => (
                <div key={notice.id} className={`p-4 border rounded-lg hover:shadow-sm transition-shadow ${
                  !notice.isRead ? "bg-blue-50 border-blue-200" : ""
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notice.priority === "High" ? "bg-red-100" :
                      notice.priority === "Medium" ? "bg-orange-100" : "bg-green-100"
                    }`}>
                      {notice.priority === "High" ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : notice.priority === "Medium" ? (
                        <Bell className="h-5 w-5 text-orange-600" />
                      ) : (
                        <Bell className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {notice.isPinned && <Pin className="h-3 w-3 text-red-600" />}
                          <p className="font-semibold">{notice.title}</p>
                          {!notice.isRead && (
                            <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            notice.priority === "High" ? "bg-red-100 text-red-700" :
                            notice.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {notice.priority}
                          </span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                            {notice.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notice.content}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                    </div>
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
