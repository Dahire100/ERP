"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ParentClassTimetable() {
    const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

    const children = {
        child1: { name: "Alice Student", class: "10-A" },
        child2: { name: "Bob Student", class: "8-B" }
    }

    const timeSlots = [
        "08:00 AM - 08:45 AM",
        "08:45 AM - 09:30 AM",
        "09:30 AM - 10:15 AM",
        "10:15 AM - 10:30 AM", // Break
        "10:30 AM - 11:15 AM",
        "11:15 AM - 12:00 PM",
        "12:00 PM - 12:45 PM", // Lunch
        "12:45 PM - 01:30 PM",
        "01:30 PM - 02:15 PM"
    ]

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // Mock data for Alice (10-A)
    const timetableChild1: Record<string, any[]> = {
        "Monday": [
            { subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", type: "Class", color: "bg-blue-100 text-blue-700 border-blue-200" },
            { subject: "Physics", teacher: "Ms. Johnson", room: "Lab 2", type: "Lab", color: "bg-purple-100 text-purple-700 border-purple-200" },
            { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 1", type: "Lab", color: "bg-green-100 text-green-700 border-green-200" },
            { type: "Break", subject: "Short Break" },
            { subject: "English", teacher: "Mrs. Davis", room: "Room 102", type: "Class", color: "bg-orange-100 text-orange-700 border-orange-200" },
            { subject: "History", teacher: "Mr. Wilson", room: "Room 103", type: "Class", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
            { type: "Lunch", subject: "Lunch Break" },
            { subject: "Computer Sci", teacher: "Ms. Clark", room: "Comp Lab", type: "Lab", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
            { subject: "Library", teacher: "-", room: "Library", type: "Activity", color: "bg-gray-100 text-gray-700 border-gray-200" }
        ],
    }
    // Fill other days for Alice
    weekDays.slice(1).forEach(day => timetableChild1[day] = timetableChild1["Monday"])

    // Mock data for Bob (8-B)
    const timetableChild2: Record<string, any[]> = {
        "Monday": [
            { subject: "Science", teacher: "Mrs. White", room: "Room 201", type: "Class", color: "bg-green-100 text-green-700 border-green-200" },
            { subject: "Maths", teacher: "Mr. Black", room: "Room 201", type: "Class", color: "bg-blue-100 text-blue-700 border-blue-200" },
            { subject: "Social St.", teacher: "Ms. Green", room: "Room 201", type: "Class", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
            { type: "Break", subject: "Short Break" },
            { subject: "English", teacher: "Mr. Gray", room: "Room 201", type: "Class", color: "bg-orange-100 text-orange-700 border-orange-200" },
            { subject: "Hindi", teacher: "Mrs. Red", room: "Room 201", type: "Class", color: "bg-pink-100 text-pink-700 border-pink-200" },
            { type: "Lunch", subject: "Lunch Break" },
            { subject: "Art", teacher: "Ms. Pencil", room: "Art Room", type: "Activity", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
            { subject: "Games", teacher: "Coach Run", room: "Playground", type: "Activity", color: "bg-red-100 text-red-700 border-red-200" }
        ],
    }
    // Fill other days for Bob
    weekDays.slice(1).forEach(day => timetableChild2[day] = timetableChild2["Monday"])


    const timetableData = selectedChild === "child1" ? timetableChild1 : timetableChild2

    return (
        <DashboardLayout title="Class Timetable">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
                {/* Header with Child Selector */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Weekly Timetable
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Class schedule for {children[selectedChild].name}
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

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-500" /> Class Schedule
                            </CardTitle>
                            <Badge variant="outline" className="text-blue-600 bg-blue-50">Class {children[selectedChild].class}</Badge>
                        </div>
                        <CardDescription>View daily classes and breaks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="Monday" className="w-full">
                            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4 h-auto">
                                {weekDays.map(day => (
                                    <TabsTrigger key={day} value={day} className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">{day}</TabsTrigger>
                                ))}
                            </TabsList>

                            {weekDays.map(day => (
                                <TabsContent key={day} value={day} className="space-y-4">
                                    <div className="rounded-xl border overflow-hidden bg-white">
                                        <div className="bg-gray-50/50 p-4 border-b grid grid-cols-12 gap-4 font-semibold text-sm text-gray-500">
                                            <div className="col-span-3 md:col-span-2">Time</div>
                                            <div className="col-span-9 md:col-span-10">Subject & Details</div>
                                        </div>

                                        <ScrollArea className="h-[500px]">
                                            <div className="divide-y">
                                                {timeSlots.map((time, index) => {
                                                    const slot = timetableData[day]?.[index] || { subject: "Free Period", type: "Free" }
                                                    const isBreak = slot.type === "Break" || slot.type === "Lunch"

                                                    return (
                                                        <div key={index} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors ${isBreak ? "bg-gray-50/50" : ""}`}>
                                                            <div className="col-span-3 md:col-span-2 text-sm font-medium text-gray-600 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                                                <Clock className="h-4 w-4 text-blue-400 hidden md:block" />
                                                                <span className="text-xs md:text-sm">{time.split(' - ')[0]}</span>
                                                                <span className="text-xs text-gray-400 md:hidden">- {time.split(' - ')[1]}</span>
                                                            </div>
                                                            <div className="col-span-9 md:col-span-10">
                                                                {isBreak ? (
                                                                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md text-gray-500 font-medium uppercase text-xs tracking-wider border border-dashed border-gray-200">
                                                                        {slot.subject}
                                                                    </div>
                                                                ) : (
                                                                    <div className={`p-3 rounded-lg border border-l-4 ${slot.color || "bg-gray-50 border-gray-100 border-l-gray-300"}`}>
                                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                                            <div>
                                                                                <h4 className="font-bold text-base">{slot.subject}</h4>
                                                                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm opacity-90">
                                                                                    {slot.teacher && <span className="flex items-center gap-1"><User className="h-3 w-3" /> {slot.teacher}</span>}
                                                                                    {slot.room && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {slot.room}</span>}
                                                                                </div>
                                                                            </div>
                                                                            <Badge variant="secondary" className="w-fit self-start md:self-center">{slot.type}</Badge>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
