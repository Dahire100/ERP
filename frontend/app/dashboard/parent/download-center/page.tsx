"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, File, Search, Users, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentDownloadCenter() {
    const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")
    const [searchTerm, setSearchTerm] = useState("")

    const children = {
        child1: { name: "Alice Student", class: "10-A" },
        child2: { name: "Bob Student", class: "8-B" }
    }

    const downloads = {
        child1: [
            { id: 1, title: "Maths Syllabus Term 2", type: "Syllabus", date: "2025-01-10", size: "1.2 MB" },
            { id: 2, title: "Physics Lab Manual", type: "Study Material", date: "2025-01-05", size: "5.4 MB" },
            { id: 3, title: "Holiday Homework - English", type: "Assignment", date: "2024-12-25", size: "0.5 MB" },
            { id: 4, title: "Pre-Board Date Sheet", type: "Circular", date: "2025-01-15", size: "0.8 MB" }
        ],
        child2: [
            { id: 101, title: "History Project Guidelines", type: "Assignment", date: "2025-01-12", size: "2.1 MB" },
            { id: 102, title: "Grade 8 Syllabus", type: "Syllabus", date: "2024-04-01", size: "1.0 MB" },
            { id: 103, title: "Science Diagram Chart", type: "Study Material", date: "2025-01-08", size: "3.5 MB" }
        ]
    }

    const filteredDownloads = downloads[selectedChild].filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDownload = (filename: string) => {
        toast.success("Download Started", { description: `Downloading ${filename}...` })
    }

    return (
        <DashboardLayout title="Download Center">
            <div className="space-y-6 animate-in fade-in-50 duration-500">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Download Center
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Access study materials for {children[selectedChild].name}
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

                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-none shadow-none focus-visible:ring-0 text-base"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDownloads.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-all group border-l-4 border-l-blue-500">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded-full">{item.type}</span>
                                            <span>{item.date}</span>
                                            <span>{item.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDownload(item.title)}>
                                    <Download className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredDownloads.length === 0 && (
                        <div className="col-span-1 md:col-span-2 text-center py-10 text-gray-500">
                            No files found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
