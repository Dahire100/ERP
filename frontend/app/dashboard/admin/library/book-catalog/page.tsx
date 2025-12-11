"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Book } from "lucide-react"

const rows = [
  { id: 1, title: "Mathematics Grade 10", author: "John Smith", isbn: "9781234567890", category: "Textbook", available: 18 },
  { id: 2, title: "English Literature", author: "Jane Doe", isbn: "9780987654321", category: "Literature", available: 12 },
]

export default function BookCatalog() {
  return (
    <DashboardLayout title="Book Catalog">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <Book className="h-5 w-5" />
              Search Catalog
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Title / Author</Label>
                <Input placeholder="Search" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>ISBN</Label>
                <Input placeholder="ISBN" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="Category" className="bg-white border-gray-200" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-900 hover:bg-blue-800 w-full">Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Books</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Title</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Author</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">ISBN</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Category</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase text-right">Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.isbn}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell className="text-right">{row.available}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

