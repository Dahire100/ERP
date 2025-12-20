"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, Send, Clock, CheckCircle, XCircle, Users, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ParentLeaveApply() {
    const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")
    const [fromDate, setFromDate] = useState<Date>()
    const [toDate, setToDate] = useState<Date>()
    const [reason, setReason] = useState("")
    const [leaveType, setLeaveType] = useState("")

    const children = {
        child1: { name: "Alice Student", class: "10-A" },
        child2: { name: "Bob Student", class: "8-B" }
    }

    // Mock leave history
    const history = {
        child1: [
            { id: 1, type: "Sick Leave", from: "2025-01-05", to: "2025-01-06", status: "Approved", appliedOn: "2025-01-04" },
            { id: 2, type: "Casual Leave", from: "2024-12-20", to: "2024-12-20", status: "Rejected", appliedOn: "2024-12-18" }
        ],
        child2: [
            { id: 101, type: "Sick Leave", from: "2025-01-15", to: "2025-01-16", status: "Pending", appliedOn: "2025-01-14" }
        ]
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!fromDate || !toDate || !reason || !leaveType) {
            toast.error("Missing Information", { description: "Please fill in all required fields." })
            return
        }
        toast.success("Leave Application Submitted", {
            description: `Application for ${children[selectedChild].name} has been sent for approval.`
        })
        // Reset form
        setReason("")
        setLeaveType("")
        setFromDate(undefined)
        setToDate(undefined)
    }

    const currentHistory = history[selectedChild]

    return (
        <DashboardLayout title="Apply Leave">
            <div className="space-y-6 animate-in fade-in-50 duration-500">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Apply Leave
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Submit leave request for {children[selectedChild].name}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application Form */}
                    <Card className="lg:col-span-2 border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Send className="h-5 w-5 text-blue-600" /> New Application
                            </CardTitle>
                            <CardDescription>Fill in the details below</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Leave Type</Label>
                                        <Select onValueChange={setLeaveType} value={leaveType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                                                <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                                                <SelectItem value="Emergency">Emergency</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Reason</Label>
                                        <Input placeholder="Brief reason" value={reason} onChange={e => setReason(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 flex flex-col">
                                        <Label>From Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !fromDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2 flex flex-col">
                                        <Label>To Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !toDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Description <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Textarea placeholder="More details about the leave request..." className="min-h-[100px]" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Submit Request</Button>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Application History */}
                    <Card className="border-none shadow-md h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-600" /> Recent History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {currentHistory.length > 0 ? currentHistory.map(item => (
                                <div key={item.id} className="p-3 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-orange-100 text-orange-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <span className="text-xs text-gray-500">{item.appliedOn}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-800">{item.type}</h4>
                                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                        <CalendarIcon className="h-3 w-3" />
                                        {item.from} - {item.to}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center text-gray-500 py-4">No past leaves found.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
