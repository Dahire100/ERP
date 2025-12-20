"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, AlertCircle, Calendar, Pin, Download, Users, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentNoticeBoard() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const generalNotices = [
    { id: 1, title: "School Holiday", content: "School will remain closed on 26th Jan.", date: "2025-01-20", category: "Holiday", priority: "High", isPinned: true },
    { id: 2, title: "Annual Sports Day", content: "Sports Day scheduled for 10th Feb.", date: "2025-01-18", category: "Event", priority: "Medium", isPinned: false },
  ]

  const classNotices = {
    child1: [
      { id: 101, title: "Grade 10 Pre-Boards", content: "Datesheet for Pre-Board exams released.", date: "2025-01-22", category: "Exam", priority: "High", isPinned: true },
      { id: 102, title: "Picnic to Museum", content: "Consent form for science museum visit due by Friday.", date: "2025-01-21", category: "Trip", priority: "Medium", isPinned: false },
    ],
    child2: [
      { id: 201, title: "Grade 8 Project Submission", content: "Submit History projects by Monday.", date: "2025-01-22", category: "Academic", priority: "High", isPinned: false },
    ]
  }

  const currentNotices = [...(classNotices[selectedChild] || []), ...generalNotices].sort((a, b) => (b.isPinned === a.isPinned) ? 0 : b.isPinned ? 1 : -1)

  const handleDownload = (title: string) => {
    toast.success("Downloading Circular", { description: `Downloading attachment for: ${title}` })
  }

  return (
    <DashboardLayout title="Digital Notice Board">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notice Board
            </h2>
            <p className="text-muted-foreground mt-1">
              Announcements for {children[selectedChild].name} & General Updates
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[180px] justify-between shadow-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  {children[selectedChild].name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setSelectedChild("child1")}>
                Alice Student (10-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedChild("child2")}>
                Bob Student (8-B)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Notices"
            value={currentNotices.length.toString()}
            icon={Bell}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="High Priority"
            value={currentNotices.filter(n => n.priority === "High").length.toString()}
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Pinned"
            value={currentNotices.filter(n => n.isPinned).length.toString()}
            icon={Pin}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="New (This Week)"
            value="2"
            icon={Calendar}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Notices List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              School Announcements
            </CardTitle>
            <CardDescription>Important notices and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentNotices.map((notice) => (
                <div key={notice.id} className={`p-4 border rounded-xl hover:shadow-md transition-all bg-white group ${notice.isPinned ? "border-l-4 border-l-purple-500 bg-purple-50/20" : ""
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${notice.priority === "High" ? "bg-red-100" :
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {notice.isPinned && <Pin className="h-3 w-3 text-purple-600 fill-current" />}
                          <p className="font-bold text-gray-900">{notice.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${notice.priority === "High" ? "bg-red-100 text-red-700" :
                              notice.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                                "bg-green-100 text-green-700"
                            }`}>
                            {notice.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{notice.content}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                            {notice.category}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(notice.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleDownload(notice.title)}>
                          <Download className="h-4 w-4 mr-1" /> Attachment
                        </Button>
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
