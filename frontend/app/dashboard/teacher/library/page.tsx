"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Book, BookOpen, Clock, Calendar } from "lucide-react"

export default function LibraryPage() {
    const books = [
        { id: 1, title: "Modern Physics", author: "Dr. A.K. Sharma", category: "Science", status: "Available", cover: "bg-blue-100" },
        { id: 2, title: "Advanced Mathematics", author: "R.D. Sharma", category: "Maths", status: "Issued", dueDate: "2023-12-15", cover: "bg-purple-100" },
        { id: 3, title: "English Literature", author: "William Shakespeare", category: "Literature", status: "Available", cover: "bg-amber-100" },
        { id: 4, title: "History of World", author: "H.G. Wells", category: "History", status: "Available", cover: "bg-red-100" },
        { id: 5, title: "Chemistry Vol I", author: "O.P. Tandon", category: "Science", status: "Available", cover: "bg-green-100" },
        { id: 6, title: "Data Structures", author: "Narasimha Karumanchi", category: "Computer Science", status: "Issued", dueDate: "2023-12-20", cover: "bg-slate-100" },
    ]

    const myIssuedBooks = books.filter(b => b.status === "Issued")

    return (
        <DashboardLayout title="Library">
            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Library</h1>
                        <p className="text-gray-500 mt-1">Search for books, reservation, and track your reading history.</p>
                    </div>
                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by title, author, or ISBN..."
                            className="pl-10 h-11 shadow-sm"
                        />
                    </div>
                </div>

                {/* Currently Issued Section */}
                {myIssuedBooks.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Currently Issued to Me</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myIssuedBooks.map((book) => (
                                <Card key={book.id} className="border-l-4 border-l-orange-500 shadow-md">
                                    <CardContent className="p-4 flex gap-4">
                                        <div className={`w-16 h-24 rounded-md shadow-inner flex items-center justify-center ${book.cover}`}>
                                            <BookOpen className="w-6 h-6 opacity-50" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{book.title}</h3>
                                            <p className="text-sm text-gray-500">{book.author}</p>
                                            <div className="mt-3 flex items-center gap-2 text-sm text-red-600 font-medium">
                                                <Calendar className="w-3 h-3" />
                                                Due: {book.dueDate}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Book Catalog */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Book className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Browse Catalog</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden">
                                <div className={`h-40 w-full ${book.cover} flex items-center justify-center relative`}>
                                    <Book className="w-12 h-12 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                                    {book.status === 'Available' ? (
                                        <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">Available</Badge>
                                    ) : (
                                        <Badge variant="secondary" className="absolute top-3 right-3">Issued</Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <p className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">{book.category}</p>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-1" title={book.title}>
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{book.author}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button
                                        className="w-full bg-slate-900 group-hover:bg-indigo-600 transition-colors"
                                        disabled={book.status !== 'Available'}
                                    >
                                        {book.status === 'Available' ? 'Reserve Book' : 'Not Available'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}
