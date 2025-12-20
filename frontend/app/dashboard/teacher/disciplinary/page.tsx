"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { AlertTriangle, Gavel, FileWarning, Plus, Search, Flag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function DisciplinaryPage() {
    const { toast } = useToast()
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [incidents, setIncidents] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem('token')
            const headers = { 'Authorization': `Bearer ${token}` }
            const res = await fetch('http://localhost:5000/api/teacher/disciplinary', { headers })
            const data = await res.json()
            if (data.success) {
                setIncidents(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch incidents", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchIncidents()
    }, [])

    const [formData, setFormData] = useState({
        studentName: '',
        class: '',
        severity: '',
        date: '',
        location: '',
        details: ''
        // studentId would be needed in real app, simplified here
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitReport = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:5000/api/teacher/disciplinary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                toast({
                    title: "Incident Reported",
                    description: "The disciplinary incident has been logged successfully.",
                    variant: "destructive"
                })
                setIsReportOpen(false)
                fetchIncidents()
                setFormData({ studentName: '', class: '', severity: '', date: '', location: '', details: '' })
            } else {
                toast({ title: "Error", description: "Failed to report incident", variant: "destructive" })
            }
        } catch (err) {
            toast({ title: "Error", description: "Network error", variant: "destructive" })
        }
    }

    const handleViewDetails = (id: number) => {
        toast({
            title: "View Details",
            description: `Opening incident #${id} details...`
        })
    }

    return (
        <DashboardLayout title="Disciplinary">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Disciplinary</h1>
                        <p className="text-gray-500 mt-1">Track student behavior, report incidents, and manage actions.</p>
                    </div>

                    <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-red-600 hover:bg-red-700">
                                <Flag className="w-4 h-4 mr-2" /> Report Incident
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Report Disciplinary Incident</DialogTitle>
                                <DialogDescription>Record a new behavioral issue.</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="col-span-2 space-y-2">
                                    <Label>Student Name</Label>
                                    <Input name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Search student..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Class</Label>
                                    <Select onValueChange={(v) => handleSelectChange('class', v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="10a">10-A</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Severity</Label>
                                    <Select onValueChange={(v) => handleSelectChange('severity', v)}><SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="med">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="Classroom, Playground..." />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Incident Details</Label>
                                    <Textarea name="details" value={formData.details} onChange={handleInputChange} placeholder="Describe what happened..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsReportOpen(false)}>Cancel</Button>
                                <Button className="bg-red-600" onClick={handleSubmitReport}>Submit Report</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-l-red-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">Pending Actions</h3>
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">1</p>
                            <p className="text-xs text-gray-500 mt-1">Requires immediate attention</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-orange-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
                                <Gavel className="w-5 h-5 text-orange-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">5</p>
                            <p className="text-xs text-gray-500 mt-1">Total incidents recorded</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Incident Log</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search records..." className="pl-9" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {incidents.length === 0 ? <p className="text-center text-gray-500 py-4">No incidents found.</p> : incidents.map((item: any) => (
                                <div key={item._id || item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex gap-4">
                                        <div className={`w-2 h-full rounded-full self-stretch ${item.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{item.studentName || 'Student'} <span className="text-sm font-normal text-gray-500">({item.class})</span></h4>
                                            <p className="text-gray-800 font-medium">{item.details || item.incident}</p>
                                            <p className="text-sm text-gray-500 mt-1">{item.date ? new Date(item.date).toLocaleDateString() : '-'} • Created by You</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                                        <Badge variant={item.status === 'Resolved' ? 'secondary' : 'default'} className={item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                                            {item.status}
                                        </Badge>
                                        <span className="text-sm font-medium text-gray-600">{item.action ? `Action: ${item.action}` : 'Action Pending'}</span>
                                        <Button size="sm" variant="ghost" className="text-indigo-600 h-8" onClick={() => handleViewDetails(item._id || item.id)}>View Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
