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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, FileText, Download, Printer } from "lucide-react"
import { toast } from "sonner"

interface ComplainData {
    id: number
    complainType: string
    isParent: string
    complainBy: string
    studentName: string
    class: string
    admissionNo: string
    mobileNumber: string
    email: string
    date: string
    assigned: string
    status: string
    note: string
    description: string
    reply: string
    replyAttachment: string
    replyBy: string
}

export default function Complain() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // Sample data
    const [complains, setComplains] = useState<ComplainData[]>([
        {
            id: 1,
            complainType: "Staff",
            isParent: "No",
            complainBy: "Testingss",
            studentName: "",
            class: "",
            admissionNo: "",
            mobileNumber: "1234456789",
            email: "nikhil@gmail.com",
            date: "05-11-2025",
            assigned: "Chaitnya Jain",
            status: "Requested",
            note: "Check last week consumption",
            description: "Lunch not enough for children",
            reply: "",
            replyAttachment: "",
            replyBy: ""
        },
        {
            id: 2,
            complainType: "Staff",
            isParent: "No",
            complainBy: "test 2",
            studentName: "",
            class: "",
            admissionNo: "",
            mobileNumber: "1234456789",
            email: "nikhil@gmail.com",
            date: "05-11-2025",
            assigned: "Chaitnya Jain",
            status: "Pending",
            note: "Checking details",
            description: "Staff behavior issue",
            reply: "",
            replyAttachment: "",
            replyBy: ""
        }
    ])

    const [formData, setFormData] = useState({
        complainType: "",
        complainBy: "",
        complainFrom: "",
        mobileNumber: "",
        email: "",
        date: new Date().toISOString().split('T')[0],
        assigned: "",
        attachment: null as File | null,
        previousNote: "",
        description: ""
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

        if (!formData.complainType || !formData.complainBy || !formData.complainFrom || !formData.mobileNumber || !formData.date) {
            toast.error("Please fill all required fields")
            return
        }

        const newComplain: ComplainData = {
            id: complains.length + 1,
            complainType: formData.complainType,
            isParent: formData.complainFrom === "Parent" ? "Yes" : "No",
            complainBy: formData.complainBy,
            studentName: "",
            class: "",
            admissionNo: "",
            mobileNumber: formData.mobileNumber,
            email: formData.email,
            date: new Date(formData.date).toLocaleDateString('en-GB'),
            assigned: formData.assigned,
            status: "Requested",
            note: formData.previousNote,
            description: formData.description,
            reply: "",
            replyAttachment: "",
            replyBy: ""
        }

        setComplains([...complains, newComplain])
        toast.success("Complain added successfully!")
        setIsDialogOpen(false)

        setFormData({
            complainType: "",
            complainBy: "",
            complainFrom: "",
            mobileNumber: "",
            email: "",
            date: new Date().toISOString().split('T')[0],
            assigned: "",
            attachment: null,
            previousNote: "",
            description: ""
        })
    }

    return (
        <DashboardLayout title="Complain">
            <div className="space-y-6">
                {/* Search Criteria */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button className="bg-blue-900 hover:bg-blue-800">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Complain List */}
                {/* Complain List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Complain List
                        </CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-900 hover:bg-blue-800">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
                                <div className="bg-pink-50 px-6 py-4 border-b border-pink-100">
                                    <DialogTitle className="flex items-center gap-2 text-xl text-gray-800">
                                        <Edit className="h-5 w-5" />
                                        Add & Edit
                                    </DialogTitle>
                                </div>
                                <div className="p-6 max-h-[80vh] overflow-y-auto">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="complainType" className="text-red-500">Complain Type *</Label>
                                                <Select value={formData.complainType} onValueChange={(value) => handleInputChange("complainType", value)}>
                                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Staff">Staff</SelectItem>
                                                        <SelectItem value="Student">Student</SelectItem>
                                                        <SelectItem value="Parent">Parent</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="complainBy" className="text-red-500">Complain By *</Label>
                                                <Input
                                                    id="complainBy"
                                                    placeholder="Enter name"
                                                    value={formData.complainBy}
                                                    onChange={(e) => handleInputChange("complainBy", e.target.value)}
                                                    className="bg-white border-gray-200"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="complainFrom" className="text-red-500">Complain From *</Label>
                                                <Select value={formData.complainFrom} onValueChange={(value) => handleInputChange("complainFrom", value)}>
                                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Staff">Staff</SelectItem>
                                                        <SelectItem value="Student">Student</SelectItem>
                                                        <SelectItem value="Parent">Parent</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="mobileNumber" className="text-red-500">Mobile Number *</Label>
                                                <Input
                                                    id="mobileNumber"
                                                    placeholder="Enter mobile no."
                                                    value={formData.mobileNumber}
                                                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                                                    className="bg-white border-gray-200"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    className="bg-white border-gray-200"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="date" className="text-red-500">Date *</Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                                    className="bg-gray-50 border-gray-200"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="assigned">Assigned</Label>
                                                <Select value={formData.assigned} onValueChange={(value) => handleInputChange("assigned", value)}>
                                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Chaitnya Jain">Chaitnya Jain</SelectItem>
                                                        <SelectItem value="Admin">Admin</SelectItem>
                                                        <SelectItem value="Principal">Principal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Attach Document</Label>
                                                <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1 bg-white">
                                                    <Button type="button" className="bg-blue-900 text-white hover:bg-blue-800 h-8 text-sm">
                                                        Choose File
                                                    </Button>
                                                    <span className="text-sm text-gray-500 px-2">
                                                        {formData.attachment ? formData.attachment.name : "No file chosen"}
                                                    </span>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="previousNote">Previous Note</Label>
                                                <Textarea
                                                    id="previousNote"
                                                    value={formData.previousNote}
                                                    onChange={(e) => handleInputChange("previousNote", e.target.value)}
                                                    rows={3}
                                                    className="bg-white border-gray-200"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                                    rows={3}
                                                    className="bg-white border-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8">
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm"><Printer className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm"><FileText className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Search:</span>
                                <Input
                                    className="w-64 h-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-pink-50 hover:bg-pink-50">
                                        <TableHead className="w-12 font-bold text-gray-700">#</TableHead>
                                        <TableHead className="font-bold text-gray-700">COMPLAIN TYPE</TableHead>
                                        <TableHead className="font-bold text-gray-700">IS PARENT</TableHead>
                                        <TableHead className="font-bold text-gray-700">COMPLAIN BY</TableHead>
                                        <TableHead className="font-bold text-gray-700">STUDENT NAME</TableHead>
                                        <TableHead className="font-bold text-gray-700">CLASS</TableHead>
                                        <TableHead className="font-bold text-gray-700">ADMISSION NO.</TableHead>
                                        <TableHead className="font-bold text-gray-700">MOBILE NUMBER</TableHead>
                                        <TableHead className="font-bold text-gray-700">EMAIL</TableHead>
                                        <TableHead className="font-bold text-gray-700">DATE</TableHead>
                                        <TableHead className="font-bold text-gray-700">STATUS</TableHead>
                                        <TableHead className="font-bold text-gray-700">NOTE</TableHead>
                                        <TableHead className="font-bold text-gray-700">DESCRIPTION</TableHead>
                                        <TableHead className="font-bold text-gray-700">REPLY</TableHead>
                                        <TableHead className="font-bold text-gray-700">REPLY ATTACHMENT</TableHead>
                                        <TableHead className="font-bold text-gray-700">REPLY BY</TableHead>
                                        <TableHead className="font-bold text-gray-700">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {complains
                                        .filter(complain =>
                                            complain.complainBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            complain.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            complain.mobileNumber.includes(searchTerm)
                                        )
                                        .map((complain, index) => (
                                            <TableRow key={complain.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{complain.complainType}</TableCell>
                                                <TableCell>{complain.isParent}</TableCell>
                                                <TableCell>{complain.complainBy}</TableCell>
                                                <TableCell>{complain.studentName}</TableCell>
                                                <TableCell>{complain.class}</TableCell>
                                                <TableCell>{complain.admissionNo}</TableCell>
                                                <TableCell>{complain.mobileNumber}</TableCell>
                                                <TableCell>{complain.email}</TableCell>
                                                <TableCell>{complain.date}</TableCell>
                                                <TableCell>{complain.assigned}</TableCell>
                                                <TableCell>{complain.status}</TableCell>
                                                <TableCell>{complain.note}</TableCell>
                                                <TableCell>{complain.description}</TableCell>
                                                <TableCell>{complain.reply}</TableCell>
                                                <TableCell>{complain.replyAttachment}</TableCell>
                                                <TableCell>{complain.replyBy}</TableCell>
                                                <TableCell>
                                                    <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538]">
                                                        Action <span className="ml-2">▼</span>
                                                    </Button>
                                                </TableCell>
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
