"use client"

import { API_URL } from "@/lib/api-config"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Award, FileSignature, Download, Printer, Search, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CertificatePage() {
    const { toast } = useToast()
    const [isGenerateOpen, setIsGenerateOpen] = useState(false)
    const [certificates, setCertificates] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem('token')
            const headers = { 'Authorization': `Bearer ${token}` }
            const res = await fetch(`${API_URL}/api/teacher/certificates`, { headers })
            const data = await res.json()
            if (data.success) {
                setCertificates(data.data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCertificates()
    }, [])

    const [formData, setFormData] = useState({
        studentName: '',
        class: '',
        type: '',
        reason: '',
        date: new Date().toISOString().split('T')[0]
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleGenerate = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API_URL}/api/teacher/certificates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                toast({
                    title: "Certificate Generated",
                    description: `A ${formData.type} certificate has been generated for ${formData.studentName}.`,
                })
                setIsGenerateOpen(false)
                fetchCertificates()
                setFormData({ studentName: '', class: '', type: '', reason: '', date: new Date().toISOString().split('T')[0] })
            } else {
                toast({ title: "Error", description: "Failed to generate certificate", variant: "destructive" })
            }
        } catch (err) {
            toast({ title: "Error", description: "Network error", variant: "destructive" })
        }
    }

    const handleAction = (action: string) => {
        toast({
            title: action,
            description: "Processing request...",
        })
    }

    return (
        <DashboardLayout title="Certificate">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Certificates</h1>
                        <p className="text-gray-500 mt-1">Generate and manage student certificates.</p>
                    </div>

                    <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Generate Certificate
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Generate Certificate</DialogTitle>
                                <DialogDescription>Fill in the details to generate a new certificate.</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Student Name</Label>
                                    <Input name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Search student..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Class</Label>
                                    <Select onValueChange={(val) => handleSelectChange('class', val)}>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="10a">10-A</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Certificate Type</Label>
                                    <Select onValueChange={(val) => handleSelectChange('type', val)}>
                                        <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="merit">Merit Certificate</SelectItem>
                                            <SelectItem value="participation">Participation</SelectItem>
                                            <SelectItem value="character">Character Certificate</SelectItem>
                                            <SelectItem value="completion">Course Completion</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Issue Date</Label>
                                    <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Reason / Remarks</Label>
                                    <Textarea name="reason" value={formData.reason} onChange={handleInputChange} placeholder="Reason for certification..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsGenerateOpen(false)}>Cancel</Button>
                                <Button className="bg-indigo-600" onClick={handleGenerate}>Generate & Print</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-yellow-50 border-yellow-100">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">24</h3>
                                <p className="text-yellow-800 font-medium text-sm">Certificates Issued (YTD)</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-indigo-50 border-indigo-100">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-700">
                                <FileSignature className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">5</h3>
                                <p className="text-indigo-800 font-medium text-sm">Available Templates</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Issued History</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search..." className="pl-9" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">Loading certificates...</TableCell>
                                    </TableRow>
                                ) : certificates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">No certificates found</TableCell>
                                    </TableRow>
                                ) : (
                                    certificates.map((cert: any) => (
                                        <TableRow key={cert._id || cert.id}>
                                            <TableCell className="font-medium text-indigo-600">CERT-{cert._id?.substr(-4) || '00' + cert.id}</TableCell>
                                            <TableCell className="font-medium">{cert.studentName || cert.student}</TableCell>
                                            <TableCell>{cert.class}</TableCell>
                                            <TableCell>{cert.type}</TableCell>
                                            <TableCell>{cert.date || (cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '-')}</TableCell>
                                            <TableCell>
                                                <Badge variant={cert.status === 'Issued' ? 'default' : 'secondary'} className={cert.status === 'Issued' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                                    {cert.status || 'Issued'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAction("Printing")}><Printer className="h-4 w-4" /></Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAction("Downloading")}><Download className="h-4 w-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
