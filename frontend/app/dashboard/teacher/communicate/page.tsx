"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Mail, Send, Plus, Clock, User } from "lucide-react"

export default function TeacherCommunicate() {
  const messages = [
    { id: 1, from: "Parent - John Doe", subject: "Regarding homework", message: "Could you please clarify the math assignment?", date: "2024-11-06", status: "Unread" },
    { id: 2, from: "Parent - Jane Smith", subject: "Absence notification", message: "My child will be absent tomorrow.", date: "2024-11-05", status: "Read" },
    { id: 3, from: "Student - Bob Johnson", subject: "Project question", message: "Need help with the science project.", date: "2024-11-05", status: "Read" },
    { id: 4, from: "Admin", subject: "Meeting reminder", message: "Staff meeting tomorrow at 3 PM.", date: "2024-11-04", status: "Unread" },
  ]

  const contacts = [
    { name: "Class 10-A Parents", count: 38, type: "Group" },
    { name: "Class 10-B Parents", count: 35, type: "Group" },
    { name: "All Students", count: 113, type: "Group" },
  ]

  const totalMessages = messages.length
  const unreadMessages = messages.filter(m => m.status === "Unread").length
  const readMessages = messages.filter(m => m.status === "Read").length

  return (
    <DashboardLayout title="Communicate">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Communication Center
          </h2>
          <p className="text-muted-foreground mt-1">Message students and parents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Messages" value={totalMessages.toString()} icon={MessageSquare} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Unread" value={unreadMessages.toString()} icon={Mail} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
          <StatCard title="Read" value={readMessages.toString()} icon={Send} iconColor="text-green-600" iconBgColor="bg-green-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" />Inbox</CardTitle>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 mr-1" />Compose
                  </Button>
                </div>
                <CardDescription>Messages from students and parents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${
                      message.status === "Unread" ? "bg-purple-50 border-purple-200" : ""
                    }`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {message.from.split(' ')[0].substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="font-semibold">{message.from}</p>
                              <p className="text-sm font-medium">{message.subject}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                              {message.status === "Unread" && (
                                <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Quick Contacts</CardTitle>
                <CardDescription>Message groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.map((contact, i) => (
                    <div key={i} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <p className="font-semibold text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{contact.count} members</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <MessageSquare className="h-3 w-3 mr-1" />Message
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
