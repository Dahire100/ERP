"use client"

import { API_URL } from "@/lib/api-config"

import { useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Loader2, IndianRupee } from "lucide-react"
import { toast } from "sonner"

export default function CollectFee() {
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState<any[]>([])

    // Search States
    const [classSelect, setClassSelect] = useState("")
    const [sectionSelect, setSectionSelect] = useState("")
    const [keyword, setKeyword] = useState("")

    const handleSearch = async (mode: 'class' | 'keyword') => {
        setLoading(true)
        setStudents([])

        try {
            const token = localStorage.getItem('token')
            let url = `${API_URL}/api/students?`

            if (mode === 'class') {
                if (!classSelect || !sectionSelect) {
                    toast.error("Please select both Class and Section")
                    setLoading(false)
                    return
                }
                url += `class=${classSelect}&section=${sectionSelect}`
            } else {
                if (!keyword) {
                    toast.error("Please enter a keyword")
                    setLoading(false)
                    return
                }
                url += `keyword=${encodeURIComponent(keyword)}`
            }

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (!res.ok) throw new Error("Failed to fetch students")

            const data = await res.json()
            setStudents(data)

            if (data.length === 0) {
                toast.info("No students found")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error searching students")
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout title="Collect Fee">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Side - Class/Section Search */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="class">Class *</Label>
                                        <Select value={classSelect} onValueChange={setClassSelect}>
                                            <SelectTrigger className="bg-white border-gray-200">
                                                <SelectValue placeholder="Select Class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(12)].map((_, i) => (
                                                    <SelectItem key={i} value={(i + 1).toString()}>Class {i + 1}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="section">Section *</Label>
                                        <Select value={sectionSelect} onValueChange={setSectionSelect}>
                                            <SelectTrigger className="bg-white border-gray-200">
                                                <SelectValue placeholder="Select Section" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {['A', 'B', 'C', 'D'].map(s => (
                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => handleSearch('class')}
                                        disabled={loading}
                                        className="bg-blue-900 hover:bg-blue-800"
                                    >
                                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {/* Right Side - Keyword Search */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="keyword">Search by Keyword</Label>
                                    <Input
                                        id="keyword"
                                        placeholder="Search by Admission No, Name, Phone"
                                        className="bg-white border-gray-200"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => handleSearch('keyword')}
                                        disabled={loading}
                                        className="bg-blue-900 hover:bg-blue-800"
                                    >
                                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Table */}
                {students.length > 0 && (
                    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardHeader>
                            <CardTitle>Student List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead>Admission No</TableHead>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Father Name</TableHead>
                                        <TableHead>Date of Birth</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student._id}>
                                            <TableCell>{student.class}</TableCell>
                                            <TableCell>{student.section}</TableCell>
                                            <TableCell className="font-mono">{student.studentId || student.rollNumber}</TableCell>
                                            <TableCell className="font-medium">{student.firstName} {student.lastName}</TableCell>
                                            <TableCell>{student.parentName}</TableCell>
                                            <TableCell>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}</TableCell>
                                            <TableCell>{student.phone}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                    <IndianRupee className="h-4 w-4 mr-1" />
                                                    Collect Fee
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}
