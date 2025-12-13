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
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Trash2, Upload, Download, Calendar, FileText, Receipt } from "lucide-react"
import { toast } from "sonner"

interface EnquiryData {
    id: number
    name: string
    phone: string
    email: string
    class: string
    address: string
    source: string
    enquiryDate: string
    lastFollowUpDate: string
    nextFollowUpDate: string
    status: string
    createdBy: string
    lastClassPercentage?: string
    aadharNumber?: string
}

export default function AdmissionEnquiry() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [sourceFilter, setSourceFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [dateRange, setDateRange] = useState("")
    const [selectedEnquiries, setSelectedEnquiries] = useState<number[]>([])

    // Sample data
    const [enquiries, setEnquiries] = useState<EnquiryData[]>([
        {
            id: 1,
            name: "bhanu",
            phone: "4567891238",
            email: "bhanu@example.com",
            class: "10th",
            address: "sakhowal",
            source: "phone",
            enquiryDate: "20-11-2025",
            lastFollowUpDate: "",
            nextFollowUpDate: "",
            status: "Active",
            createdBy: "Demo",
            lastClassPercentage: "20",
            aadharNumber: "1234567891"
        },
        {
            id: 2,
            name: "bhanu",
            phone: "4567891238",
            email: "",
            class: "10th",
            address: "",
            source: "Website",
            enquiryDate: "15-11-2025",
            lastFollowUpDate: "",
            nextFollowUpDate: "",
            status: "Active",
            createdBy: "Demo",
            lastClassPercentage: "2nd",
            aadharNumber: "1215588422"
        }
    ])

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        reference: "",
        source: "",
        class: "",
        date: new Date().toISOString().split('T')[0],
        assigned: "",
        attachments: null as File | null,
        noOfChild: "",
        address: "",
        description: "",
        note: "",
        fathersName: "",
        studentName: "",
        lastClassPercentage: "",
        dob: "",
        aadharNumber: ""
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, attachments: e.target.files![0] }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (!formData.name || !formData.phone || !formData.source || !formData.studentName || !formData.lastClassPercentage || !formData.dob || !formData.aadharNumber) {
            toast.error("Please fill all required fields")
            return
        }

        // Add new enquiry
        const newEnquiry: EnquiryData = {
            id: enquiries.length + 1,
            name: formData.studentName,
            phone: formData.phone,
            email: formData.email,
            class: formData.class,
            address: formData.address,
            source: formData.source,
            enquiryDate: formData.date,
            lastFollowUpDate: "",
            nextFollowUpDate: "",
            status: "Active",
            createdBy: "Admin",
            lastClassPercentage: formData.lastClassPercentage,
            aadharNumber: formData.aadharNumber
        }

        setEnquiries([...enquiries, newEnquiry])
        toast.success("Enquiry added successfully!")
        setIsDialogOpen(false)

        // Reset form
        setFormData({
            name: "",
            phone: "",
            email: "",
            reference: "",
            source: "",
            class: "",
            date: new Date().toISOString().split('T')[0],
            assigned: "",
            attachments: null,
            noOfChild: "",
            address: "",
            description: "",
            note: "",
            fathersName: "",
            studentName: "",
            lastClassPercentage: "",
            dob: "",
            aadharNumber: ""
        })
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEnquiries(enquiries.map(e => e.id))
        } else {
            setSelectedEnquiries([])
        }
    }

    const handleSelectEnquiry = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedEnquiries([...selectedEnquiries, id])
        } else {
            setSelectedEnquiries(selectedEnquiries.filter(eId => eId !== id))
        }
    }

    const handleBulkDelete = () => {
        if (selectedEnquiries.length === 0) {
            toast.error("Please select enquiries to delete")
            return
        }

        setEnquiries(enquiries.filter(e => !selectedEnquiries.includes(e.id)))
        setSelectedEnquiries([])
        toast.success(`${selectedEnquiries.length} enquiries deleted`)
    }

    return (
        <DashboardLayout title="Admission Enquiry">
            <div className="space-y-6">
                {/* Search and Filter Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Select Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Source</Label>
                                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="Social Media">Social Media</SelectItem>
                                        <SelectItem value="Website">Website</SelectItem>
                                        <SelectItem value="Physical Visit">Physical Visit</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="testing">Testing</SelectItem>
                                        <SelectItem value="Maganpura Visit">Maganpura Visit</SelectItem>
                                        <SelectItem value="Friend">Friend</SelectItem>
                                        <SelectItem value="Mother-father">Mother-father</SelectItem>
                                        <SelectItem value="parent">Parent</SelectItem>
                                        <SelectItem value="website">Website</SelectItem>
                                        <SelectItem value="Linkedin">Linkedin</SelectItem>
                                        <SelectItem value="walkin enqiry">Walkin Enquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Enquiry Date</Label>
                                <Input
                                    type="text"
                                    placeholder="2025-11-22 -- 2025-11-24"
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            onClick={handleBulkDelete}
                            disabled={selectedEnquiries.length === 0}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Bulk Delete
                        </Button>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Admission Enquiry</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new admission enquiry
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label htmlFor="phone">Phone *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
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
                                        <Label htmlFor="reference">Reference</Label>
                                        <Select value={formData.reference} onValueChange={(value) => handleInputChange("reference", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="friend">Friend</SelectItem>
                                                <SelectItem value="family">Family</SelectItem>
                                                <SelectItem value="advertisement">Advertisement</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="source">Source *</Label>
                                        <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Social Media">Social Media</SelectItem>
                                                <SelectItem value="Website">Website</SelectItem>
                                                <SelectItem value="Physical Visit">Physical Visit</SelectItem>
                                                <SelectItem value="phone">Phone</SelectItem>
                                                <SelectItem value="Linkedin">Linkedin</SelectItem>
                                                <SelectItem value="walkin enqiry">Walkin Enquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="class">Class</Label>
                                        <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1st">1st</SelectItem>
                                                <SelectItem value="2nd">2nd</SelectItem>
                                                <SelectItem value="3rd">3rd</SelectItem>
                                                <SelectItem value="4th">4th</SelectItem>
                                                <SelectItem value="5th">5th</SelectItem>
                                                <SelectItem value="6th">6th</SelectItem>
                                                <SelectItem value="7th">7th</SelectItem>
                                                <SelectItem value="8th">8th</SelectItem>
                                                <SelectItem value="9th">9th</SelectItem>
                                                <SelectItem value="10th">10th</SelectItem>
                                                <SelectItem value="11th">11th</SelectItem>
                                                <SelectItem value="12th">12th</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleInputChange("date", e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="assigned">Assigned</Label>
                                        <Select value={formData.assigned} onValueChange={(value) => handleInputChange("assigned", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin1">Admin 1</SelectItem>
                                                <SelectItem value="admin2">Admin 2</SelectItem>
                                                <SelectItem value="counselor1">Counselor 1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="attachments">Attachments</Label>
                                        <Input
                                            id="attachments"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="cursor-pointer"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="noOfChild">No of Child</Label>
                                        <Input
                                            id="noOfChild"
                                            type="number"
                                            value={formData.noOfChild}
                                            onChange={(e) => handleInputChange("noOfChild", e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fathersName">Fathers Name</Label>
                                        <Input
                                            id="fathersName"
                                            value={formData.fathersName}
                                            onChange={(e) => handleInputChange("fathersName", e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="studentName">Student Name *</Label>
                                        <Input
                                            id="studentName"
                                            value={formData.studentName}
                                            onChange={(e) => handleInputChange("studentName", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastClassPercentage">Last Class Percentage *</Label>
                                        <Input
                                            id="lastClassPercentage"
                                            type="number"
                                            step="0.01"
                                            value={formData.lastClassPercentage}
                                            onChange={(e) => handleInputChange("lastClassPercentage", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dob">DOB *</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => handleInputChange("dob", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                                        <Input
                                            id="aadharNumber"
                                            value={formData.aadharNumber}
                                            onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                                            maxLength={12}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        rows={3}
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

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                        Save Enquiry
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Data Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedEnquiries.length === enquiries.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>NAME</TableHead>
                                        <TableHead>PHONE</TableHead>
                                        <TableHead>CLASS</TableHead>
                                        <TableHead>ADDRESS</TableHead>
                                        <TableHead>SOURCE</TableHead>
                                        <TableHead>ENQUIRY DATE</TableHead>
                                        <TableHead>LAST FOLLOW UP DATE</TableHead>
                                        <TableHead>NEXT FOLLOW UP DATE</TableHead>
                                        <TableHead>STATUS</TableHead>
                                        <TableHead>CREATED BY</TableHead>
                                        <TableHead>LAST CLASS PERCENTAGE</TableHead>
                                        <TableHead>AADHAR NUMBER</TableHead>
                                        <TableHead>ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enquiries.map((enquiry) => (
                                        <TableRow key={enquiry.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedEnquiries.includes(enquiry.id)}
                                                    onCheckedChange={(checked) => handleSelectEnquiry(enquiry.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{enquiry.name}</TableCell>
                                            <TableCell>{enquiry.phone}</TableCell>
                                            <TableCell>{enquiry.class}</TableCell>
                                            <TableCell>{enquiry.address || "-"}</TableCell>
                                            <TableCell>{enquiry.source}</TableCell>
                                            <TableCell>{enquiry.enquiryDate}</TableCell>
                                            <TableCell>{enquiry.lastFollowUpDate || "-"}</TableCell>
                                            <TableCell>{enquiry.nextFollowUpDate || "-"}</TableCell>
                                            <TableCell>{enquiry.status}</TableCell>
                                            <TableCell>{enquiry.createdBy}</TableCell>
                                            <TableCell>{enquiry.lastClassPercentage || "-"}</TableCell>
                                            <TableCell>{enquiry.aadharNumber || "-"}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538]">
                                                            Action <span className="ml-2">▼</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Receipt className="h-4 w-4 mr-2" /> Payment Receipt
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <FileText className="h-4 w-4 mr-2" /> Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
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
        </DashboardLayout>
    )
}
