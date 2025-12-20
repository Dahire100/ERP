"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Users, User, Phone, Wrench, LogOut, Clock, Plus } from "lucide-react"

import { toast } from "sonner"

export default function StudentHostel() {
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isOutpassOpen, setIsOutpassOpen] = useState(false)

  const handleServiceRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsServiceOpen(false)
    toast.success("Request Submitted", { description: "Maintenance team has been notified." })
  }

  const handleOutpassApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOutpassOpen(false)
    toast.success("Application Submitted", { description: "Waiting for warden approval." })
  }

  const roomInfo = {
    roomNumber: "205",
    block: "A",
    floor: "2nd Floor",
    type: "Triple Sharing",
    warden: { name: "Mr. Smith", phone: "+1-555-0199", email: "warden.a@school.edu" }
  }

  const roommates = [
    { name: "Alice Student", class: "10-B", rollNo: "2024002", mobile: "+1 555-0123" },
    { name: "Bob Student", class: "10-C", rollNo: "2024003", mobile: "+1 555-0124" },
  ]

  const [requests, setRequests] = useState([
    { id: 1, type: "Maintenance", description: "Fan not working", status: "Pending", date: "2024-11-06" },
    { id: 2, type: "Outpass", description: "Going home for weekend", status: "Approved", date: "2024-10-25" },
  ])

  return (
    <DashboardLayout title="Hostel">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Hostel Information
            </h2>
            <p className="text-muted-foreground mt-1">Your room, roommates, and services</p>
          </div>
          <div className="flex gap-2">
            {/* Service Request Dialog */}
            <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Wrench className="mr-2 h-4 w-4" /> Service Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleServiceRequest}>
                  <DialogHeader>
                    <DialogTitle>Raise Service/Maintenance Request</DialogTitle>
                    <DialogDescription>Report issues with your room or facilities.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Issue Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Describe the issue..." required />
                    </div>
                  </div>
                  <DialogFooter><Button type="submit">Submit Request</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Outpass Dialog */}
            <Dialog open={isOutpassOpen} onOpenChange={setIsOutpassOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <LogOut className="mr-2 h-4 w-4" /> Apply Outpass
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleOutpassApply}>
                  <DialogHeader>
                    <DialogTitle>Apply for Hostel Outpass</DialogTitle>
                    <DialogDescription>Request permission to leave the hostel premises.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>From Date</Label>
                        <Input type="date" required />
                      </div>
                      <div className="grid gap-2">
                        <Label>To Date</Label>
                        <Input type="date" required />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Reason</Label>
                      <Textarea placeholder="Reason for leaving..." required />
                    </div>
                    <div className="grid gap-2">
                      <Label>Parent's Contact</Label>
                      <Input placeholder="+1..." required />
                    </div>
                  </div>
                  <DialogFooter><Button type="submit">Submit Application</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Room Number" value={roomInfo.roomNumber} icon={Home} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Block" value={roomInfo.block} icon={Home} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Floor" value={roomInfo.floor} icon={Home} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Roommates" value={(roommates.length + 1).toString()} icon={Users} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-indigo-500" />Roommates</CardTitle>
                <CardDescription>People sharing room with you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roommates.map((mate, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition-all bg-white">
                      <Avatar className="h-12 w-12 border-2 border-indigo-100">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold">
                          {mate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{mate.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Class {mate.class} • {mate.rollNo}</p>
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1"><Phone className="h-3 w-3" /> {mate.mobile}</p>
                      </div>
                    </div>
                  ))}
                  {/* Add yourself placeholder */}
                  <div className="flex items-center gap-4 p-4 border rounded-xl bg-blue-50/50 border-blue-100">
                    <Avatar className="h-12 w-12 border-2 border-blue-200">
                      <AvatarFallback className="bg-blue-600 text-white font-bold">ME</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">You</p>
                      <p className="text-xs text-blue-600 mt-1">Room Monitor</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-500" /> Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${req.type === "Maintenance" ? "bg-orange-100 text-orange-600" : "bg-purple-100 text-purple-600"}`}>
                          {req.type === "Maintenance" ? <Wrench className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{req.type} Request</p>
                          <p className="text-xs text-muted-foreground">{req.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full border ${req.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}>
                          {req.status}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(req.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Warden Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 border-4 border-white/20 mb-3">
                    <AvatarFallback className="bg-gray-700 text-2xl">W</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-xl">{roomInfo.warden.name}</p>
                  <p className="text-sm text-gray-400">Head Warden - Block A</p>
                </div>
                <div className="space-y-3">
                  <a href={`tel:${roomInfo.warden.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Phone className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">{roomInfo.warden.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                    <Users className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">Office Hours: 9 AM - 6 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
