"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Calendar, Clock, RotateCcw, Users, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ParentLibrary() {
    const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

    const children = {
        child1: { name: "Alice Student", class: "10-A" },
        child2: { name: "Bob Student", class: "8-B" }
    }

    const libraryData = {
        child1: {
            current: [
                { id: 1, title: "Advanced Physics", author: "H.C. Verma", issuedDate: "2025-01-15", dueDate: "2025-01-22", cover: "/placeholder.svg" },
                { id: 2, title: "Organic Chemistry", author: "Morrison & Boyd", issuedDate: "2025-01-18", dueDate: "2025-01-25", cover: "/placeholder.svg" }
            ],
            history: [
                { id: 3, title: "Great Expectations", author: "Charles Dickens", returnedDate: "2025-01-10", status: "Returned on time" },
                { id: 4, title: "Calculus Vol 1", author: "I.A. Maron", returnedDate: "2024-12-20", status: "Late Return (Paid Fine)" }
            ]
        },
        child2: {
            current: [
                { id: 101, title: "History of World", author: "J.M. Roberts", issuedDate: "2025-01-20", dueDate: "2025-01-27", cover: "/placeholder.svg" }
            ],
            history: [
                { id: 102, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", returnedDate: "2025-01-05", status: "Returned on time" }
            ]
        }
    }

    const currentBooks = libraryData[selectedChild].current
    const historyBooks = libraryData[selectedChild].history

    return (
        <DashboardLayout title="Library">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
                {/* Header with Child Selector */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Library Activity
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Books issued to {children[selectedChild].name}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Currently Issued"
                        value={currentBooks.length.toString()}
                        icon={Book}
                        iconColor="text-blue-600"
                        iconBgColor="bg-blue-100"
                    />
                    <StatCard
                        title="Returned This Year"
                        value={historyBooks.length.toString()}
                        icon={RotateCcw}
                        iconColor="text-green-600"
                        iconBgColor="bg-green-100"
                    />
                    <StatCard
                        title="Fine Due"
                        value="₹0"
                        icon={Clock}
                        iconColor="text-red-600"
                        iconBgColor="bg-red-100"
                    />
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Library Records</CardTitle>
                        <CardDescription>View current and past library activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="current">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="current">Currently Issued</TabsTrigger>
                                <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="current" className="space-y-4">
                                {currentBooks.length > 0 ? currentBooks.map(book => (
                                    <div key={book.id} className="p-4 border rounded-xl hover:shadow-md transition-all flex item-start gap-4">
                                        <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                            <Book className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">{book.title}</h4>
                                            <p className="text-sm text-gray-500">{book.author}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs font-medium">
                                                <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Issued: {book.issuedDate}</span>
                                                <span className="text-red-600 bg-red-50 px-2 py-1 rounded">Due: {book.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500">No books currently issued.</div>
                                )}
                            </TabsContent>

                            <TabsContent value="history" className="space-y-4">
                                {historyBooks.length > 0 ? historyBooks.map(book => (
                                    <div key={book.id} className="p-4 border rounded-xl hover:shadow-sm transition-all flex item-start gap-4 bg-gray-50/50">
                                        <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                            <Book className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-700">{book.title}</h4>
                                            <p className="text-sm text-gray-500">{book.author}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs font-medium">
                                                <span className="text-gray-600">Returned: {book.returnedDate}</span>
                                                <span className={`px-2 py-1 rounded ${book.status.includes('Late') ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                                                    {book.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500">No history available.</div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
