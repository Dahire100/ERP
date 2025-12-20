"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Home, Users, User, Phone, LogOut, Clock, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentHostel() {
    const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")
    const [isOutpassOpen, setIsOutpassOpen] = useState(false)

    const children = {
        child1: { name: "Alice Student", class: "10-A" },
        child2: { name: "Bob Student", class: "8-B" }
    }

    const hostelData = {
        child1: {
            room: { num: "205", block: "A (Girls)", floor: "2nd", type: "Triple Sharing" },
            warden: { name: "Mrs. Wilson", phone: "+1-555-0199", email: "warden.a@school.edu" },
            roommates: [
                { name: "Sarah Jones", class: "10-B", rolls: "24002" },
                { name: "Emily Davis", class: "10-C", rolls: "24003" }
            ],
            requests: [
                { id: 1, type: "Outpass", description: "Weekend Home Visit", status: "Approved", date: "2024-11-20" }
            ]
        },
        child2: {
            room: { num: "102", block: "B (Boys)", floor: "1st", type: "Double Sharing" },
            warden: { name: "Mr. Roberts", phone: "+1-555-0188", email: "warden.b@school.edu" },
            roommates: [
                { name: "Mike Brown", class: "8-A", rolls: "24102" }
            ],
            requests: []
        }
    }

    const currentData = hostelData[selectedChild]

    const handleOutpassApply = (e: React.FormEvent) => {
        e.preventDefault()
        setIsOutpassOpen(false)
        toast.success("Outpass Requested", { description: `Application for ${children[selectedChild].name} submitted.` })
    }

    return (
        <DashboardLayout title="Hostel">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Hostel Details
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Accommodation details for {children[selectedChild].name}
                        </p>
                    </div>

                    <div className="flex gap-2">
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

                        {/* Outpass Dialog */}
                        <Dialog open={isOutpassOpen} onOpenChange={setIsOutpassOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <LogOut className="mr-2 h-4 w-4" /> Request Outpass
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form onSubmit={handleOutpassApply}>
                                    <DialogHeader>
                                        <DialogTitle>Request Hostel Outpass</DialogTitle>
                                        <DialogDescription>Request permission for your child to leave the hostel.</DialogDescription>
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
                                    </div>
                                    <DialogFooter><Button type="submit">Submit Request</Button></DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard title="Room" value={currentData.room.num} icon={Home} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
                    <StatCard title="Block" value={currentData.room.block} icon={Home} iconColor="text-green-600" iconBgColor="bg-green-100" />
                    <StatCard title="Floor" value={currentData.room.floor} icon={Home} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
                    <StatCard title="Roommates" value={currentData.roommates.length.toString()} icon={Users} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-indigo-500" /> Roommates</CardTitle>
                                <CardDescription>Peers sharing the room</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentData.roommates.map((mate, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition-all bg-white">
                                            <Avatar className="h-12 w-12 border-2 border-indigo-100">
                                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold">
                                                    {mate.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-gray-900">{mate.name}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">Class {mate.class}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {currentData.roommates.length === 0 && <div className="text-gray-500 text-sm p-4">Single Room or No Data</div>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-500" /> Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {currentData.requests.map((req) => (
                                        <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                                    <LogOut className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{req.type}</p>
                                                    <p className="text-xs text-muted-foreground">{req.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs px-2 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">
                                                    {req.status}
                                                </span>
                                                <p className="text-[10px] text-gray-400 mt-1">{new Date(req.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {currentData.requests.length === 0 && <div className="text-gray-500 text-sm text-center py-4">No recent activity</div>}
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
                                    <p className="font-bold text-xl">{currentData.warden.name}</p>
                                    <p className="text-sm text-gray-400">Hostel Warden</p>
                                </div>
                                <div className="space-y-3">
                                    <a href={`tel:${currentData.warden.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                        <Phone className="h-5 w-5 text-green-400" />
                                        <span className="text-sm font-medium">{currentData.warden.phone}</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
