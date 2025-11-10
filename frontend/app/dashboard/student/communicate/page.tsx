"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Mail, Send, User, Clock, Plus, Bell } from "lucide-react"

export default function StudentCommunicate() {
  const messages = [
    { id: 1, from: "Mr. Smith", role: "Mathematics Teacher", subject: "Assignment Feedback", message: "Great work on your recent assignment!", date: "2024-11-06", status: "Unread" },
    { id: 2, from: "Ms. Johnson", role: "English Teacher", subject: "Essay Submission", message: "Please submit your essay by Friday.", date: "2024-11-05", status: "Read" },
    { id: 3, from: "School Admin", role: "Administration", subject: "Sports Day Event", message: "Sports day scheduled for next week.", date: "2024-11-04", status: "Read" },
    { id: 4, from: "Dr. Williams", role: "Science Teacher", subject: "Lab Report", message: "Your lab report needs revision.", date: "2024-11-03", status: "Unread" },
  ]

  const teachers = [
    { name: "Mr. Smith", subject: "Mathematics", email: "smith@school.com" },
    { name: "Ms. Johnson", subject: "English", email: "johnson@school.com" },
    { name: "Dr. Williams", subject: "Science", email: "williams@school.com" },
  ]

  const totalMessages = messages.length
  const unreadMessages = messages.filter(m => m.status === "Unread").length
  const readMessages = messages.filter(m => m.status === "Read").length

  return (
    <DashboardLayout title="Communicate">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Communication Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Connect with teachers and receive school updates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Messages"
            value={totalMessages.toString()}
            icon={MessageSquare}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Unread"
            value={unreadMessages.toString()}
            icon={Mail}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Read"
            value={readMessages.toString()}
            icon={Send}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Messages Inbox */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Inbox
                  </CardTitle>
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-1" />
                    New Message
                  </Button>
                </div>
                <CardDescription>Messages from teachers and school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${
                      message.status === "Unread" ? "bg-blue-50 border-blue-200" : ""
                    }`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                            {message.from.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="font-semibold">{message.from}</p>
                              <p className="text-xs text-muted-foreground">{message.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                              {message.status === "Unread" && (
                                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{message.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Contacts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  My Teachers
                </CardTitle>
                <CardDescription>Quick access to teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teachers.map((teacher, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">• Sports Day - Nov 30</p>
                  <p className="text-muted-foreground">• Mid-term Exams - Nov 25</p>
                  <p className="text-muted-foreground">• Holiday - Nov 26</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
