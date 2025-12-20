"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export default function StudentTimetable() {
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

    // Mock data structure for timetable
    const timetableData: Record<string, any[]> = {
        "Monday": [
            { subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", type: "Clas", color: "bg-blue-100 text-blue-700 border-blue-200" },
            { subject: "Physics", teacher: "Ms. Johnson", room: "Lab 2", type: "Lab", color: "bg-purple-100 text-purple-700 border-purple-200" },
            { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 1", type: "Lab", color: "bg-green-100 text-green-700 border-green-200" },
            { type: "Break", subject: "Short Break" },
            { subject: "English", teacher: "Mrs. Davis", room: "Room 102", type: "Class", color: "bg-orange-100 text-orange-700 border-orange-200" },
            { subject: "History", teacher: "Mr. Wilson", room: "Room 103", type: "Class", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
            { type: "Lunch", subject: "Lunch Break" },
            { subject: "Computer Sci", teacher: "Ms. Clark", room: "Comp Lab", type: "Lab", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
            { subject: "Library", teacher: "-", room: "Library", type: "Activity", color: "bg-gray-100 text-gray-700 border-gray-200" }
        ],
        "Tuesday": [
            { subject: "Physics", teacher: "Ms. Johnson", room: "Room 101", type: "Class", color: "bg-purple-100 text-purple-700 border-purple-200" },
            { subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", type: "Class", color: "bg-blue-100 text-blue-700 border-blue-200" },
            { subject: "Biology", teacher: "Mrs. White", room: "Lab 3", type: "Lab", color: "bg-pink-100 text-pink-700 border-pink-200" },
            { type: "Break", subject: "Short Break" },
            { subject: "Geography", teacher: "Mr. Black", room: "Room 104", type: "Class", color: "bg-amber-100 text-amber-700 border-amber-200" },
            { subject: "English", teacher: "Mrs. Davis", room: "Room 102", type: "Class", color: "bg-orange-100 text-orange-700 border-orange-200" },
            { type: "Lunch", subject: "Lunch Break" },
            { subject: "Physical Ed", teacher: "Coach Mike", room: "Ground", type: "Activity", color: "bg-red-100 text-red-700 border-red-200" },
            { subject: "Art", teacher: "Ms. Green", room: "Art Room", type: "Activity", color: "bg-indigo-100 text-indigo-700 border-indigo-200" }
        ],
        // ... we can fill others similarly, keeping it simple for now
    }

    // Populate other days with partial data for demo
    weekDays.slice(2).forEach(day => {
        timetableData[day] = timetableData["Monday"] // Reusing monday for demo
    })

    return (
        <DashboardLayout title="Class Timetable">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Weekly Timetable
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Your class schedule for the current academic session
                    </p>
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-500" /> Class Schedule
                            </CardTitle>
                            <Badge variant="outline" className="text-blue-600 bg-blue-50">Class 10-A</Badge>
                        </div>
                        <CardDescription>View your daily classes and breaks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="Monday" className="w-full">
                            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                                {weekDays.map(day => (
                                    <TabsTrigger key={day} value={day}>{day}</TabsTrigger>
                                ))}
                            </TabsList>

                            {weekDays.map(day => (
                                <TabsContent key={day} value={day} className="space-y-4">
                                    <div className="rounded-md border overflow-hidden">
                                        <div className="bg-gray-50 p-4 border-b grid grid-cols-12 gap-4 font-medium text-sm text-gray-500">
                                            <div className="col-span-3 md:col-span-2">Time</div>
                                            <div className="col-span-9 md:col-span-10">Subject & Details</div>
                                        </div>

                                        <ScrollArea className="h-[500px]">
                                            <div className="divide-y">
                                                {timeSlots.map((time, index) => {
                                                    const slot = timetableData[day]?.[index] || { subject: "Free Period", type: "Free" }
                                                    const isBreak = slot.type === "Break" || slot.type === "Lunch"

                                                    return (
                                                        <div key={index} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50/50 transition-colors ${isBreak ? "bg-gray-50/80" : ""}`}>
                                                            <div className="col-span-3 md:col-span-2 text-sm font-medium text-gray-600 flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-blue-400" />
                                                                {time}
                                                            </div>
                                                            <div className="col-span-9 md:col-span-10">
                                                                {isBreak ? (
                                                                    <div className="flex items-center justify-center h-full text-muted-foreground font-medium uppercase text-xs tracking-wider">
                                                                        {slot.subject}
                                                                    </div>
                                                                ) : (
                                                                    <div className={`p-3 rounded-lg border ${slot.color || "bg-gray-50 border-gray-100"}`}>
                                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                                            <div>
                                                                                <h4 className="font-bold text-base">{slot.subject}</h4>
                                                                                <div className="flex items-center gap-3 mt-1 text-sm opacity-90">
                                                                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {slot.teacher}</span>
                                                                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {slot.room}</span>
                                                                                </div>
                                                                            </div>
                                                                            <Badge variant="secondary" className="w-fit">{slot.type}</Badge>
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
