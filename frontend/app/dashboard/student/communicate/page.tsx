"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Mail, Send, User, Clock, Plus, Bell, Search, Paperclip, MoreVertical, Reply, Trash2, Archive } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const users = [
  { id: 1, name: "Mr. Smith", role: "Mathematics", email: "smith@school.edu", avatar: "/teachers/smith.jpg", status: "online" },
  { id: 2, name: "Ms. Johnson", role: "English", email: "johnson@school.edu", avatar: "/teachers/johnson.jpg", status: "offline" },
  { id: 3, name: "Dr. Williams", role: "Science", email: "williams@school.edu", avatar: "/teachers/williams.jpg", status: "busy" },
  { id: 4, name: "Admin Office", role: "Administration", email: "admin@school.edu", avatar: "/logo.png", status: "online" },
]

const initialMessages = [
  { id: 1, fromId: 1, subject: "Algebra Assignment Feedback", body: "Hi John, great work on your recent assignment. I noticed you struggled a bit with quadratic equations. Let's discuss it in the next class.", date: "2024-11-06T10:30:00", read: false, tags: ["Academic"] },
  { id: 2, fromId: 2, subject: "Essay Submission Deadline", body: "Dear Students, please remember that the final draft of your essay is due this Friday. No extensions will be granted.", date: "2024-11-05T14:15:00", read: true, tags: ["Important"] },
  { id: 3, fromId: 4, subject: "Annual Sports Day", body: "The Annual Sports Day is scheduled for next week. Please register for events by tomorrow.", date: "2024-11-04T09:00:00", read: true, tags: ["Event"] },
  { id: 4, fromId: 3, subject: "Lab Report Corrections", body: "Please correct the observation table in your lab report and resubmit.", date: "2024-11-03T16:45:00", read: true, tags: ["Academic"] },
]

import { toast } from "sonner"

export default function StudentCommunicate() {
  const [selectedMessage, setSelectedMessage] = useState(initialMessages[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  const filteredMessages = initialMessages.filter(m =>
    users.find(u => u.id === m.fromId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSender = (id: number) => users.find(u => u.id === id)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewMessageOpen(false)
    toast.success("Message Sent", { description: "Your message has been sent successfully." })
  }

  const handleSendReply = () => {
    if (!replyText.trim()) return
    setReplyText("")
    toast.success("Reply Sent", { description: "Your reply has been sent." })
  }

  return (
    <DashboardLayout title="Communicate">
      <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 p-1">

        {/* Top Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleSendMessage}>
                <DialogHeader>
                  <DialogTitle>Compose Message</DialogTitle>
                  <DialogDescription>
                    Send a message to your teachers or administration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipient">To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map(u => (
                          <SelectItem key={u.id} value={u.email}>{u.name} ({u.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." rows={5} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Message</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 h-full overflow-hidden">

          {/* Message List (Left) */}
          <Card className="md:col-span-4 lg:col-span-3 flex flex-col h-full overflow-hidden border-none shadow-md">
            <div className="p-4 border-b bg-gray-50/50">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Inbox
                <Badge variant="secondary" className="ml-auto">{filteredMessages.length}</Badge>
              </h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-1 p-2">
                {filteredMessages.map((message) => {
                  const sender = getSender(message.fromId)
                  return (
                    <button
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                        selectedMessage.id === message.id ? "bg-blue-50 border-blue-200" : "bg-white",
                        !message.read && "font-semibold"
                      )}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{sender?.name}</span>
                            {!message.read && (
                              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            {new Date(message.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <div className="text-xs font-medium">{message.subject}</div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {message.body.substring(0, 300)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {message.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-5">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </Card>

          {/* Message Details (Right) */}
          <Card className="md:col-span-8 lg:col-span-9 flex flex-col h-full overflow-hidden border-none shadow-md">
            {selectedMessage ? (
              <>
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getSender(selectedMessage.fromId)?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{getSender(selectedMessage.fromId)?.name}</div>
                      <div className="text-xs text-muted-foreground">{getSender(selectedMessage.fromId)?.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-500" onClick={() => toast.info("Archived", { description: "Message moved to archive" })}><Archive className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => toast.error("Deleted", { description: "Message moved to trash" })}><Trash2 className="h-4 w-4" /></Button>
                    <Separator orientation="vertical" className="h-6" />

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => toast.success("Marked as Unread")}>Mark as Unread</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Starred", { description: "Message added to favorites" })}>Star Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => toast.error("Reported", { description: "Message reported as spam" })}>Report Spam</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.subject}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(selectedMessage.date).toLocaleString()}
                      </p>
                    </div>
                    <Separator />
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <p>{selectedMessage.body}</p>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-gray-50">
                  <div className="flex gap-4">
                    <Textarea
                      placeholder="Reply to this message..."
                      className="min-h-[100px] bg-white resize-none"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Paperclip className="h-4 w-4 mr-2" /> Attach
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendReply}>
                      <Send className="h-4 w-4 mr-2" /> Send Reply
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Mail className="h-16 w-16 mb-4 opacity-20" />
                <p>Select a message to read</p>
              </div>
            )}
          </Card>
        </div>

      </div>
    </DashboardLayout>
  )
}
