"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Mail, Send, User, Clock, Plus } from "lucide-react"

export default function ParentCommunicate() {
  const [messages, setMessages] = useState([
    { id: 1, from: "Teacher John", role: "Mathematics Teacher", subject: "Progress Update", message: "Your child is doing excellent in mathematics.", date: "2025-01-15", status: "Read" },
    { id: 2, from: "Principal Smith", role: "Principal", subject: "School Event", message: "Upcoming sports day event on January 20th.", date: "2025-01-14", status: "Unread" },
    { id: 3, from: "Teacher Jane", role: "Science Teacher", subject: "Assignment Reminder", message: "Please ensure homework is submitted by Friday.", date: "2025-01-10", status: "Read" },
    { id: 4, from: "Counselor Mike", role: "School Counselor", subject: "Meeting Request", message: "Would like to discuss student progress.", date: "2025-01-08", status: "Unread" },
  ])

  const totalMessages = messages.length
  const unreadMessages = messages.filter(m => m.status === "Unread").length
  const readMessages = messages.filter(m => m.status === "Read").length

  const teachers = [
    { name: "Teacher John", subject: "Mathematics", email: "john@school.com" },
    { name: "Teacher Jane", subject: "Science", email: "jane@school.com" },
    { name: "Teacher Mike", subject: "English", email: "mike@school.com" },
  ]

  return (
    <DashboardLayout title="Communicate">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Communication Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Connect with teachers and school staff
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
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-1" />
                    New Message
                  </Button>
                </div>
                <CardDescription>Recent messages from teachers and staff</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${
                      message.status === "Unread" ? "bg-blue-50 border-blue-200" : ""
                    }`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
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
                  Teacher Contacts
                </CardTitle>
                <CardDescription>Quick access to teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teachers.map((teacher, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xs">
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
