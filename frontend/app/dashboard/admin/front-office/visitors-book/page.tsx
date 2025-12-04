"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, UserPlus, Search } from "lucide-react"
import { toast } from "sonner"

interface VisitorData {
    id: number
    purpose: string
    name: string
    email: string
    phone: string
    date: string
    inTime: string
    outTime: string
}

export default function VisitorsBook() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedVisitors, setSelectedVisitors] = useState<number[]>([])

    // Sample data
    const [visitors, setVisitors] = useState<VisitorData[]>([
        {
            id: 1,
            purpose: "Marketing",
            name: "Jasmin",
            email: "Jasmin@gmail.com",
            phone: "09123456789",
            date: "27-10-2025",
            inTime: "09:00 AM",
            outTime: "11:00 AM"
        },
        {
            id: 2,
            purpose: "Marketing",
            name: "Ko Leo",
            email: "Leo@gmail.com",
            phone: "0153648904",
            date: "27-10-2025",
            inTime: "10:00 AM",
            outTime: "12:00 PM"
        },
        {
            id: 3,
            purpose: "Checking",
            name: "Zayar",
            email: "",
            phone: "",
            date: "21-10-2025",
            inTime: "02:00 PM",
            outTime: "03:30 PM"
        },
        {
            id: 4,
            purpose: "To meet the principal",
            name: "Sudeep Jain",
            email: "sudeep2001@gmail.com",
            phone: "9584522907",
            date: "10-09-2025",
            inTime: "11:00 AM",
            outTime: "12:00 PM"
        },
        {
            id: 5,
            purpose: "To meet the principal",
            name: "Hardip Gandhi",
            email: "",
            phone: "9876543210",
            date: "22-07-2025",
            inTime: "03:00 PM",
            outTime: "04:00 PM"
        }
    ])

    const [formData, setFormData] = useState({
        purpose: "",
        name: "",
        email: "",
        phone: "",
        numberOfPerson: "",
        idCard: "",
        date: new Date().toISOString().split('T')[0],
        inTime: "",
        outTime: "",
        attachment: null as File | null,
        note: ""
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, attachment: e.target.files![0] }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (!formData.purpose || !formData.name || !formData.date) {
            toast.error("Please fill all required fields")
            return
        }

        // Add new visitor
        const newVisitor: VisitorData = {
            id: visitors.length + 1,
            purpose: formData.purpose,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: new Date(formData.date).toLocaleDateString('en-GB'),
            inTime: formData.inTime,
            outTime: formData.outTime
        }

        setVisitors([...visitors, newVisitor])
        toast.success("Visitor added successfully!")

        // Reset form
        setFormData({
            purpose: "",
            name: "",
            email: "",
            phone: "",
            numberOfPerson: "",
            idCard: "",
            date: new Date().toISOString().split('T')[0],
            inTime: "",
            outTime: "",
            attachment: null,
            note: ""
        })
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedVisitors(visitors.map(v => v.id))
        } else {
            setSelectedVisitors([])
        }
    }

    const handleSelectVisitor = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedVisitors([...selectedVisitors, id])
        } else {
            setSelectedVisitors(selectedVisitors.filter(vId => vId !== id))
        }
    }

    const handleBulkDelete = () => {
        if (selectedVisitors.length === 0) {
            toast.error("Please select visitors to delete")
            return
        }

        setVisitors(visitors.filter(v => !selectedVisitors.includes(v.id)))
        setSelectedVisitors([])
        toast.success(`${selectedVisitors.length} visitors deleted`)
    }

    return (
        <DashboardLayout title="Visitor Books">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Add Visitors Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-gray-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Add Visitors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="purpose">Purpose *</Label>
                                    <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Checking">Checking</SelectItem>
                                            <SelectItem value="To meet the principal">To meet the principal</SelectItem>
                                            <SelectItem value="Interview">Interview</SelectItem>
                                            <SelectItem value="Admission">Admission</SelectItem>
                                            <SelectItem value="Meeting">Meeting</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="numberOfPerson">Number Of Person</Label>
                                    <Input
                                        id="numberOfPerson"
                                        type="number"
                                        value={formData.numberOfPerson}
                                        onChange={(e) => handleInputChange("numberOfPerson", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="idCard">Id Card</Label>
                                    <Input
                                        id="idCard"
                                        value={formData.idCard}
                                        onChange={(e) => handleInputChange("idCard", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleInputChange("date", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="inTime">In Time</Label>
                                    <Input
                                        id="inTime"
                                        type="time"
                                        placeholder="In time"
                                        value={formData.inTime}
                                        onChange={(e) => handleInputChange("inTime", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="outTime">Out Time</Label>
                                    <Input
                                        id="outTime"
                                        type="time"
                                        placeholder="Out time"
                                        value={formData.outTime}
                                        onChange={(e) => handleInputChange("outTime", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="attachment">Attachment</Label>
                                    <Input
                                        id="attachment"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="note">Note</Label>
                                    <Textarea
                                        id="note"
                                        value={formData.note}
                                        onChange={(e) => handleInputChange("note", e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add Visitor
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side - Visitor List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-gray-50">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Visitor List
                                </CardTitle>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                    disabled={selectedVisitors.length === 0}
                                >
                                    Bulk Delete
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {/* Search Bar */}
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">
                                                <Checkbox
                                                    checked={selectedVisitors.length === visitors.length}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead>#</TableHead>
                                            <TableHead>PURPOSE</TableHead>
                                            <TableHead>NAME</TableHead>
                                            <TableHead>EMAIL</TableHead>
                                            <TableHead>PHONE</TableHead>
                                            <TableHead>DATE</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {visitors
                                            .filter(visitor =>
                                                visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                visitor.email.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map((visitor, index) => (
                                                <TableRow key={visitor.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedVisitors.includes(visitor.id)}
                                                            onCheckedChange={(checked) => handleSelectVisitor(visitor.id, checked as boolean)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{visitor.purpose}</TableCell>
                                                    <TableCell className="font-medium">{visitor.name}</TableCell>
                                                    <TableCell>{visitor.email || "-"}</TableCell>
                                                    <TableCell>{visitor.phone || "-"}</TableCell>
                                                    <TableCell>{visitor.date}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
