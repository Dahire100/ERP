"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Upload, Download, Trash2, Eye, File, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function StudentDocuments() {
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    // Mock Data
    const [documents, setDocuments] = useState([
        { id: 1, title: "Transfer Certificate", type: "Certificate", date: "2024-04-10", size: "1.2 MB", status: "Verified", fileType: "pdf" },
        { id: 2, title: "Birth Certificate", type: "Personal", date: "2024-04-01", size: "2.5 MB", status: "Verified", fileType: "jpg" },
        { id: 3, title: "Previous Marksheet", type: "Academic", date: "2024-04-05", size: "3.1 MB", status: "Verified", fileType: "pdf" },
        { id: 4, title: "Medical Record", type: "Medical", date: "2024-08-15", size: "1.8 MB", status: "Pending", fileType: "pdf" },
        { id: 5, title: "Address Proof", type: "Personal", date: "2024-04-02", size: "4.0 MB", status: "Rejected", fileType: "png", remark: "Image blurry" },
    ])

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploadOpen(false)
        toast.success("Document Uploaded", { description: "Your document has been submitted for verification." })
        // In a real app, we would add the new document to the list here
    }

    const handleDelete = (id: number) => {
        setDocuments(documents.filter(d => d.id !== id))
        toast.error("Document Deleted", { description: "File has been removed from your records." })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Verified": return "bg-green-100 text-green-700 border-green-200"
            case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200"
            case "Rejected": return "bg-red-100 text-red-700 border-red-200"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Verified": return <CheckCircle className="h-4 w-4" />
            case "Pending": return <Clock className="h-4 w-4" />
            case "Rejected": return <AlertCircle className="h-4 w-4" />
            default: return null
        }
    }

    return (
        <DashboardLayout title="My Documents">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            My Documents
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Manage and upload your verify certificates and records
                        </p>
                    </div>
                    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                                <Upload className="mr-2 h-4 w-4" /> Upload Document
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={handleUpload}>
                                <DialogHeader>
                                    <DialogTitle>Upload New Document</DialogTitle>
                                    <DialogDescription>
                                        Upload certificates, ID proofs, or other required documents.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Document Title</Label>
                                        <Input id="title" placeholder="e.g. Transfer Certificate" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Document Type</Label>
                                        <Select required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="academic">Academic Certificate</SelectItem>
                                                <SelectItem value="personal">Personal ID Proof</SelectItem>
                                                <SelectItem value="medical">Medical Record</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="file">File</Label>
                                        <Input id="file" type="file" required className="cursor-pointer" />
                                        <p className="text-xs text-muted-foreground">Supported format: PDF, JPG, PNG (Max 5MB)</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Upload File</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-900">Total Documents</p>
                                <h3 className="text-2xl font-bold text-blue-700">{documents.length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-900">Verified</p>
                                <h3 className="text-2xl font-bold text-green-700">{documents.filter(d => d.status === "Verified").length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-yellow-900">Pending</p>
                                <h3 className="text-2xl font-bold text-yellow-700">{documents.filter(d => d.status === "Pending").length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Documents List */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Uploaded Documents</CardTitle>
                        <CardDescription>List of all documents submitted by you</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[500px] pr-4">
                            <div className="space-y-4">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="group flex flex-col md:flex-row items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all bg-white gap-4">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                                                <File className="h-6 w-6 text-gray-500 group-hover:text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                    <span className="uppercase font-bold tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">{doc.fileType}</span>
                                                    <span>{doc.size}</span>
                                                    <span>•</span>
                                                    <span>Uploaded on {new Date(doc.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border ${getStatusColor(doc.status)}`}>
                                                {getStatusIcon(doc.status)} {doc.status}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => toast.info("Previewing " + doc.title)}>
                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => toast.success("Downloading " + doc.title)}>
                                                    <Download className="h-4 w-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(doc.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
