"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Mail, Send, User, Clock, Plus, Users, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentCommunicate() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [messageForm, setMessageForm] = useState({ recipient: "", subject: "", content: "" })

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const data = {
    child1: {
      messages: [
        { id: 1, from: "Mr. Smith", role: "Math Teacher", subject: "Maths Performance", message: "Alice is doing great in Calculus.", date: "2024-12-18", status: "Unread" },
        { id: 2, from: "Ms. Johnson", role: "Class Teacher", subject: "Attendance", message: "Please submit the leave application for last week.", date: "2024-12-15", status: "Read" },
      ],
      teachers: [
        { name: "Mr. Smith", subject: "Mathematics" },
        { name: "Ms. Johnson", subject: "Science" },
        { name: "Mrs. Williams", subject: "English" },
      ]
    },
    child2: {
      messages: [
        { id: 3, from: "Mr. Davis", role: "History Teacher", subject: "Project Submission", message: "Bob needs to submit his History project by Monday.", date: "2024-12-19", status: "Unread" },
      ],
      teachers: [
        { name: "Mr. Davis", subject: "History" },
        { name: "Ms. Wilson", subject: "Science" },
        { name: "Mrs. Taylor", subject: "English" },
      ]
    }
  }

  const currentData = data[selectedChild]

  const handleSendMessage = () => {
    toast.success("Message Sent", { description: `Your message to ${messageForm.recipient || "Teacher"} has been sent.` })
    setIsComposeOpen(false)
    setMessageForm({ recipient: "", subject: "", content: "" })
  }

  return (
    <DashboardLayout title="Communicate">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Communication Center
            </h2>
            <p className="text-muted-foreground mt-1">
              Connect with teachers for {children[selectedChild].name}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Messages"
            value={currentData.messages.length.toString()}
            icon={MessageSquare}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Unread"
            value={currentData.messages.filter(m => m.status === "Unread").length.toString()}
            icon={Mail}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Teachers"
            value={currentData.teachers.length.toString()}
            icon={User}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Messages Inbox */}
          <div className="md:col-span-2">
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Inbox
                  </CardTitle>
                  <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm">
                        <Plus className="h-4 w-4 mr-1" />
                        New Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Compose Message</DialogTitle>
                        <DialogDescription>Send a message to a teacher or staff member.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Recipient</Label>
                          <Input placeholder="Select Teacher" value={messageForm.recipient} onChange={e => setMessageForm({ ...messageForm, recipient: e.target.value })} list="teachers-list" />
                          <datalist id="teachers-list">
                            {currentData.teachers.map((t, i) => <option key={i} value={t.name}>{t.subject}</option>)}
                          </datalist>
                        </div>
                        <div className="space-y-2">
                          <Label>Subject</Label>
                          <Input placeholder="Message Subject" value={messageForm.subject} onChange={e => setMessageForm({ ...messageForm, subject: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Message</Label>
                          <Textarea placeholder="Type your message here..." className="min-h-[100px]" value={messageForm.content} onChange={e => setMessageForm({ ...messageForm, content: e.target.value })} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
                        <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700"><Send className="h-4 w-4 mr-2" /> Send Message</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Recent conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-white group ${message.status === "Unread" ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                      }`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                            {message.from.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="font-bold text-gray-900 truncate">{message.from}</p>
                              <p className="text-xs text-blue-600 font-medium">{message.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                                <Clock className="h-3 w-3" />
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                              {message.status === "Unread" && (
                                <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
                              )}
                            </div>
                          </div>
                          <p className="font-semibold text-sm text-gray-800 mb-1 truncate">{message.subject}</p>
                          <p className="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-700 transition-colors">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {currentData.messages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">No messages found.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Contacts */}
          <div>
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Teachers
                </CardTitle>
                <CardDescription>Quick contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.teachers.map((teacher, index) => (
                    <div key={index} className="p-3 border rounded-xl hover:shadow-sm transition-all hover:bg-gray-50 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.subject}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => {
                        setMessageForm({ ...messageForm, recipient: teacher.name })
                        setIsComposeOpen(true)
                      }}>
                        <MessageSquare className="h-4 w-4" />
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
