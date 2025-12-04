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
import { Edit, Search, Trash2, Printer, FileText, Download, Clock, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface GatePassData {
    id: number
    issuedTo: string
    studentName?: string
    staffName?: string
    personCarrying?: string
    image?: string
    startDate: string
    endDate: string
    inTime: string
    outTime: string
    note: string
}

export default function GatePass() {
    const [searchTerm, setSearchTerm] = useState("")
    const [issuedTo, setIssuedTo] = useState("Student")

    // Sample data
    const [gatePasses, setGatePasses] = useState<GatePassData[]>([
        {
            id: 61,
            issuedTo: "Staff",
            staffName: "Windy Windy",
            personCarrying: "Sweet",
            startDate: "27-10-2025",
            endDate: "27-10-2025",
            inTime: "09:00AM",
            outTime: "03:00PM",
            note: "Going out"
        },
        {
            id: 60,
            issuedTo: "Staff",
            staffName: "Windy Windy",
            image: "/placeholder-image.jpg",
            startDate: "27-10-2025",
            endDate: "27-10-2025",
            inTime: "12:00AM",
            outTime: "01:00PM",
            note: "Family emergency"
        },
        {
            id: 59,
            issuedTo: "Staff",
            staffName: "Pramod Kumawat",
            startDate: "27-09-2025",
            endDate: "27-09-2025",
            inTime: "10:25PM",
            outTime: "03:15PM",
            note: "checkup"
        },
        {
            id: 58,
            issuedTo: "Student",
            studentName: "Yashpal Thakur",
            personCarrying: "Akshay",
            startDate: "08-08-2025",
            endDate: "29-08-2025",
            inTime: "12:00AM",
            outTime: "12:00AM",
            note: "Test"
        }
    ])

    const [formData, setFormData] = useState({
        issuedTo: "Student",
        name: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        inTime: "",
        outTime: "",
        personCarrying: "",
        note: "",
        image: null as File | null
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (field === "issuedTo") {
            setIssuedTo(value)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.startDate || !formData.endDate) {
            toast.error("Please fill all required fields")
            return
        }

        const newPass: GatePassData = {
            id: gatePasses.length > 0 ? Math.max(...gatePasses.map(p => p.id)) + 1 : 1,
            issuedTo: formData.issuedTo,
            studentName: formData.issuedTo === "Student" ? formData.name : undefined,
            staffName: formData.issuedTo === "Staff" ? formData.name : undefined,
            personCarrying: formData.personCarrying,
            startDate: new Date(formData.startDate).toLocaleDateString('en-GB').replace(/\//g, '-'),
            endDate: new Date(formData.endDate).toLocaleDateString('en-GB').replace(/\//g, '-'),
            inTime: formData.inTime || "--",
            outTime: formData.outTime || "--",
            note: formData.note
        }

        setGatePasses([newPass, ...gatePasses])
        toast.success("Gate Pass added successfully!")

        // Reset form
        setFormData({
            issuedTo: "Student",
            name: "",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            inTime: "",
            outTime: "",
            personCarrying: "",
            note: "",
            image: null
        })
        setIssuedTo("Student")
    }

    const handleDelete = (id: number) => {
        setGatePasses(gatePasses.filter(pass => pass.id !== id))
        toast.success("Gate Pass deleted successfully")
    }

    return (
        <DashboardLayout title="Gate Pass">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Add Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                <Edit className="h-5 w-5" />
                                Add Gate Pass
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="issuedTo" className="text-red-500">Issued To *</Label>
                                    <Select value={formData.issuedTo} onValueChange={(value) => handleInputChange("issuedTo", value)}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Student">Student</SelectItem>
                                            <SelectItem value="Staff">Staff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-red-500">
                                        {issuedTo === "Student" ? "Student Name *" : "Staff Name *"}
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder={issuedTo === "Student" ? "Enter student name" : "Enter staff name"}
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="bg-white border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="startDate" className="text-red-500">Start Date *</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                                        className="bg-gray-100 border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endDate" className="text-red-500">End Date *</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                                        className="bg-gray-100 border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="inTime">In Time</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-gray-500">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="inTime"
                                            type="time"
                                            value={formData.inTime}
                                            onChange={(e) => handleInputChange("inTime", e.target.value)}
                                            className="pl-9 bg-gray-100 border-gray-200"
                                            placeholder="In time"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="outTime">Out Time</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-gray-500">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="outTime"
                                            type="time"
                                            value={formData.outTime}
                                            onChange={(e) => handleInputChange("outTime", e.target.value)}
                                            className="pl-9 bg-gray-100 border-gray-200"
                                            placeholder="Out time"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Image</Label>
                                    <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1 bg-white">
                                        <Button type="button" className="bg-blue-900 text-white hover:bg-blue-800 h-8 text-sm">
                                            Choose File
                                        </Button>
                                        <span className="text-sm text-gray-500 px-2 truncate max-w-[150px]">
                                            {formData.image ? formData.image.name : "No file chosen"}
                                        </span>
                                        <Input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="personCarrying">Name of Person Carrying Student</Label>
                                    <Input
                                        id="personCarrying"
                                        placeholder="Name of Person Carrying Student"
                                        value={formData.personCarrying}
                                        onChange={(e) => handleInputChange("personCarrying", e.target.value)}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="note">Note</Label>
                                    <Textarea
                                        id="note"
                                        value={formData.note}
                                        onChange={(e) => handleInputChange("note", e.target.value)}
                                        rows={3}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-6">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side - List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="bg-pink-50 border-b border-pink-100">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                    <div className="flex items-center gap-2">
                                        <span className="h-5 w-5 flex items-center justify-center">☰</span>
                                        Gate Pass List
                                    </div>
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Printer className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><FileText className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none"><Download className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 border-none">Column visibility ▼</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Search:</span>
                                    <Input
                                        className="w-48 h-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50 hover:bg-pink-50">
                                            <TableHead className="font-bold text-gray-700 w-12">#</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Student Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Staff Name</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Name of Person<br />Carrying Student</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Image</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Start Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">End Date</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">In Time</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Out Time</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs">Note</TableHead>
                                            <TableHead className="font-bold text-gray-700 uppercase text-xs text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {gatePasses
                                            .filter(pass =>
                                            (pass.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                pass.staffName?.toLowerCase().includes(searchTerm.toLowerCase()))
                                            )
                                            .map((pass) => (
                                                <TableRow key={pass.id}>
                                                    <TableCell className="font-medium text-blue-600">{pass.id}</TableCell>
                                                    <TableCell>{pass.studentName || ""}</TableCell>
                                                    <TableCell>{pass.staffName || ""}</TableCell>
                                                    <TableCell>{pass.personCarrying || ""}</TableCell>
                                                    <TableCell>
                                                        {pass.image ? (
                                                            <div className="h-8 w-12 bg-gray-200 rounded overflow-hidden">
                                                                <img src={pass.image} alt="Pass" className="h-full w-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{pass.startDate}</TableCell>
                                                    <TableCell>{pass.endDate}</TableCell>
                                                    <TableCell>{pass.inTime}</TableCell>
                                                    <TableCell>{pass.outTime}</TableCell>
                                                    <TableCell className="max-w-[100px] truncate" title={pass.note}>{pass.note}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="bg-blue-900 text-white hover:bg-blue-800 h-7 px-2 text-xs">
                                                                    Action <span className="ml-1">▼</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(pass.id)}>
                                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
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
