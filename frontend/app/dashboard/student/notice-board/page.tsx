"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Pin, Calendar, Bell } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function StudentNoticeBoard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedNotice, setSelectedNotice] = useState<any>(null)

    const notices = [
        {
            id: 1,
            title: "Annual Sports Day 2024",
            date: "2024-11-20",
            category: "Sports",
            content: "The annual sports day will be held on December 15th. Students interested in participating in track and field events must register with their sports teachers by next Friday. The event will include...",
            priority: "High",
            pinned: true
        },
        {
            id: 2,
            title: "Winter Vacation Schedule",
            date: "2024-11-18",
            category: "Academic",
            content: "The school will remain closed for winter vacation from December 24th to January 2nd. Classes will resume on January 3rd. Holiday homework will be uploaded to the portal.",
            priority: "Medium",
            pinned: true
        },
        {
            id: 3,
            title: "Science Exhibition Registration",
            date: "2024-11-15",
            category: "Events",
            content: "Registration for the Inter-School Science Exhibition is now open. Teams of up to 3 students can participate. Submit your project abstracts to the Science Department Head.",
            priority: "Medium",
            pinned: false
        },
        {
            id: 4,
            title: "Library Book Return Reminder",
            date: "2024-11-10",
            category: "Library",
            content: "All students are requested to return borrowed library books before the commencement of the mid-term evaluations. Late fines will be applicable after the due date.",
            priority: "Low",
            pinned: false
        },
        {
            id: 5,
            title: "New Canteen Menu",
            date: "2024-11-05",
            category: "General",
            content: "We are exciting to announce a new, healthier menu in the school canteen starting next week. Options include fresh fruit bowls, salads, and whole wheat wraps.",
            priority: "Low",
            pinned: false
        }
    ]

    const filteredNotices = notices.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout title="Notice Board">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        Notice Board
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Important announcements and circulars
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search notices..."
                            className="pl-8 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotices.map((notice) => (
                        <Card
                            key={notice.id}
                            className={`hover:shadow-lg transition-all cursor-pointer group bg-white border-l-4 ${notice.priority === "High" ? "border-l-red-500" :
                                notice.priority === "Medium" ? "border-l-yellow-500" : "border-l-blue-500"
                                }`}
                            onClick={() => setSelectedNotice(notice)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="mb-2">{notice.category}</Badge>
                                    {notice.pinned && <Pin className="h-4 w-4 text-gray-400 rotate-45 fill-gray-100" />}
                                </div>
                                <CardTitle className="text-lg line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                    {notice.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 text-xs mt-1">
                                    <Calendar className="h-3 w-3" /> {new Date(notice.date).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {notice.content}
                                </p>
                                <div className="mt-4 flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read Full Notice →
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
                    <DialogContent className="sm:max-w-[600px]">
                        {selectedNotice && (
                            <>
                                <DialogHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge>{selectedNotice.category}</Badge>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-4 w-4" /> {new Date(selectedNotice.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <DialogTitle className="text-xl">{selectedNotice.title}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4">
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {selectedNotice.content}
                                            {/* Simulating longer content */}
                                            {selectedNotice.content.length < 200 && (
                                                <>
                                                    <br /><br />
                                                    This is a system generated notice. For verified details, please contact the school administration office during working hours.
                                                </>
                                            )}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}
