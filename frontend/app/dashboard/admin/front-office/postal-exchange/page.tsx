"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Search, Trash2, Upload, Download, FileText, Send, Inbox } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PostalData {
    id: number
    fromTitle: string
    toTitle: string
    referenceNo: string
    date: string
    note: string
    address: string
    type: 'dispatch' | 'receive'
}

export default function PostalExchange() {
    const [activeTab, setActiveTab] = useState("dispatch")
    const [searchTerm, setSearchTerm] = useState("")

    // Sample data
    const [postalRecords, setPostalRecords] = useState<PostalData[]>([
        {
            id: 1,
            toTitle: "Principle",
            fromTitle: "Daw Phyu",
            referenceNo: "5000001",
            date: "27-10-2025",
            note: "",
            address: "",
            type: "dispatch"
        },
        {
            id: 2,
            toTitle: "Kay",
            fromTitle: "Than",
            referenceNo: "988789",
            date: "02-05-2025",
            note: "",
            address: "",
            type: "dispatch"
        },
        {
            id: 3,
            fromTitle: "Daw Phyu",
            toTitle: "Principle",
            referenceNo: "500001",
            date: "27-10-2025",
            note: "",
            address: "",
            type: "receive"
        }
    ])

    const [formData, setFormData] = useState({
        fromTitle: "",
        toTitle: "",
        referenceNo: "",
        date: new Date().toISOString().split('T')[0],
        note: "",
        address: "",
        attachment: null as File | null
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

        if (!formData.fromTitle || !formData.toTitle || !formData.referenceNo) {
            toast.error("Please fill all required fields")
            return
        }

        const newRecord: PostalData = {
            id: postalRecords.length + 1,
            fromTitle: formData.fromTitle,
            toTitle: formData.toTitle,
            referenceNo: formData.referenceNo,
            date: new Date(formData.date).toLocaleDateString('en-GB'),
            note: formData.note,
            address: formData.address,
            type: activeTab as 'dispatch' | 'receive'
        }

        setPostalRecords([...postalRecords, newRecord])
        toast.success(`Postal ${activeTab} added successfully!`)

        setFormData({
            fromTitle: "",
            toTitle: "",
            referenceNo: "",
            date: new Date().toISOString().split('T')[0],
            note: "",
            address: "",
            attachment: null
        })
    }

    const filteredRecords = postalRecords.filter(record =>
        record.type === activeTab &&
        (record.fromTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.toTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.referenceNo.includes(searchTerm))
    )

    return (
        <DashboardLayout title="Postal Exchange">
            <div className="space-y-6">
                <div className="bg-white p-1 rounded-lg inline-flex border border-gray-200">
                    <button
                        onClick={() => setActiveTab("dispatch")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "dispatch"
                                ? "bg-purple-100 text-purple-700"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <Send className="h-4 w-4" />
                        Postal Dispatch
                    </button>
                    <button
                        onClick={() => setActiveTab("receive")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "receive"
                                ? "bg-amber-100 text-amber-700"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <Inbox className="h-4 w-4" />
                        Postal Receive
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Add Form */}
                    <div className="lg:col-span-1">
                        <Card className={activeTab === 'dispatch' ? 'border-purple-100' : 'border-amber-100'}>
                            <CardHeader className={activeTab === 'dispatch' ? 'bg-purple-50' : 'bg-amber-50'}>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Edit className="h-5 w-5" />
                                    {activeTab === 'dispatch' ? 'Add Dispatch' : 'Add Receive'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {activeTab === 'dispatch' ? (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="toTitle">To Title *</Label>
                                                <Input
                                                    id="toTitle"
                                                    value={formData.toTitle}
                                                    onChange={(e) => handleInputChange("toTitle", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="fromTitle">From Title *</Label>
                                                <Input
                                                    id="fromTitle"
                                                    value={formData.fromTitle}
                                                    onChange={(e) => handleInputChange("fromTitle", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="fromTitle">From Title *</Label>
                                                <Input
                                                    id="fromTitle"
                                                    value={formData.fromTitle}
                                                    onChange={(e) => handleInputChange("fromTitle", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="toTitle">To Title *</Label>
                                                <Input
                                                    id="toTitle"
                                                    value={formData.toTitle}
                                                    onChange={(e) => handleInputChange("toTitle", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="referenceNo">Reference No *</Label>
                                        <Input
                                            id="referenceNo"
                                            value={formData.referenceNo}
                                            onChange={(e) => handleInputChange("referenceNo", e.target.value)}
                                            required
                                        />
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
                                        <Label htmlFor="note">Note</Label>
                                        <Textarea
                                            id="note"
                                            value={formData.note}
                                            onChange={(e) => handleInputChange("note", e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            rows={2}
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

                                    <Button
                                        type="submit"
                                        className={`w-full ${activeTab === 'dispatch'
                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                : 'bg-amber-600 hover:bg-amber-700'
                                            }`}
                                    >
                                        Save {activeTab === 'dispatch' ? 'Dispatch' : 'Receive'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - List */}
                    <div className="lg:col-span-2">
                        <Card className={activeTab === 'dispatch' ? 'border-purple-100' : 'border-amber-100'}>
                            <CardHeader className={activeTab === 'dispatch' ? 'bg-purple-50' : 'bg-amber-50'}>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        {activeTab === 'dispatch' ? 'Postal Dispatch List' : 'Postal Receive List'}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="mb-4 flex justify-between items-center gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                {activeTab === 'dispatch' ? (
                                                    <>
                                                        <TableHead>TO TITLE</TableHead>
                                                        <TableHead>REFERENCE NO</TableHead>
                                                        <TableHead>FROM TITLE</TableHead>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableHead>FROM TITLE</TableHead>
                                                        <TableHead>REFERENCE NO</TableHead>
                                                        <TableHead>TO TITLE</TableHead>
                                                    </>
                                                )}
                                                <TableHead>DATE</TableHead>
                                                <TableHead className="text-right">ACTION</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRecords.map((record, index) => (
                                                <TableRow key={record.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    {activeTab === 'dispatch' ? (
                                                        <>
                                                            <TableCell className="font-medium">{record.toTitle}</TableCell>
                                                            <TableCell>{record.referenceNo}</TableCell>
                                                            <TableCell>{record.fromTitle}</TableCell>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TableCell className="font-medium">{record.fromTitle}</TableCell>
                                                            <TableCell>{record.referenceNo}</TableCell>
                                                            <TableCell>{record.toTitle}</TableCell>
                                                        </>
                                                    )}
                                                    <TableCell>{record.date}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {filteredRecords.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                        No records found
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
