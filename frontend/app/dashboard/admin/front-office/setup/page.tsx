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
import { Edit, Search, Trash2, Printer, FileText, Download, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SetupItem {
    id: number
    name: string
    description: string
}

export default function SetupFrontOffice() {
    const [activeTab, setActiveTab] = useState("purpose")
    const [searchTerm, setSearchTerm] = useState("")

    // Sample data for different tabs
    const [purposes, setPurposes] = useState<SetupItem[]>([
        { id: 1, name: "KV Test", description: "" },
        { id: 2, name: "Marketing", description: "" },
        { id: 3, name: "For pre checking", description: "" },
        { id: 4, name: "Checking", description: "" },
        { id: 5, name: "Interview for placement at college", description: "" },
        { id: 6, name: "visit", description: "" },
        { id: 7, name: "campusvis", description: "" },
        { id: 8, name: "visiting", description: "" },
        { id: 9, name: "visit", description: "" },
        { id: 10, name: "Campus Visit", description: "" },
    ])

    const [complainTypes, setComplainTypes] = useState<SetupItem[]>([
        { id: 1, name: "Marking style", description: "" },
        { id: 2, name: "Operation", description: "" },
        { id: 3, name: "teach", description: "" },
        { id: 4, name: "other", description: "" },
        { id: 5, name: "Staff", description: "" },
        { id: 6, name: "For Teacher", description: "" },
        { id: 7, name: "Other", description: "" },
    ])

    const [sources, setSources] = useState<SetupItem[]>([
        { id: 14, name: "walkin enqiry", description: "" },
        { id: 13, name: "Linkedin", description: "" },
        { id: 12, name: "website", description: "" },
        { id: 11, name: "parent", description: "" },
        { id: 10, name: "Mother-father", description: "" },
        { id: 9, name: "Friend", description: "" },
        { id: 8, name: "Maganpura Visit", description: "" },
        { id: 7, name: "testing", description: "" },
        { id: 4, name: "phone", description: "" },
        { id: 3, name: "Physical Visit", description: "" },
    ])

    const [references, setReferences] = useState<SetupItem[]>([
        { id: 9, name: "Student", description: "" },
        { id: 8, name: "web", description: "" },
        { id: 7, name: "website", description: "" },
        { id: 6, name: "Chair Men Sir", description: "" },
        { id: 5, name: "tests", description: "" },
        { id: 2, name: "Teacher", description: "" },
        { id: 1, name: "Parent", description: "" },
    ])

    const [statuses, setStatuses] = useState<SetupItem[]>([
        { id: 1, name: "Email Inquiry", description: "" },
        { id: 2, name: "Student enrolled", description: "" },
        { id: 3, name: "Enrolled students", description: "" },
        { id: 4, name: "Counsling schedule", description: "" },
        { id: 5, name: "Telephone Enquiry", description: "" },
    ])

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name) {
            toast.error("Please enter a name")
            return
        }

        const newItem: SetupItem = {
            id: Date.now(),
            name: formData.name,
            description: formData.description
        }

        switch (activeTab) {
            case "purpose":
                setPurposes([...purposes, newItem])
                break
            case "complain-type":
                setComplainTypes([...complainTypes, newItem])
                break
            case "source":
                setSources([...sources, newItem])
                break
            case "reference":
                setReferences([...references, newItem])
                break
            case "enquiry-status":
                setStatuses([...statuses, newItem])
                break
        }

        toast.success("Added successfully!")
        setFormData({ name: "", description: "" })
    }

    const handleDelete = (id: number) => {
        switch (activeTab) {
            case "purpose":
                setPurposes(purposes.filter(item => item.id !== id))
                break
            case "complain-type":
                setComplainTypes(complainTypes.filter(item => item.id !== id))
                break
            case "source":
                setSources(sources.filter(item => item.id !== id))
                break
            case "reference":
                setReferences(references.filter(item => item.id !== id))
                break
            case "enquiry-status":
                setStatuses(statuses.filter(item => item.id !== id))
                break
        }
        toast.success("Deleted successfully")
    }

    const getCurrentData = () => {
        switch (activeTab) {
            case "purpose": return purposes
            case "complain-type": return complainTypes
            case "source": return sources
            case "reference": return references
            case "enquiry-status": return statuses
            default: return []
        }
    }

    const getTabLabel = () => {
        switch (activeTab) {
            case "purpose": return "Purpose"
            case "complain-type": return "Complain Type"
            case "source": return "Source"
            case "reference": return "Reference"
            case "enquiry-status": return "Enquiry Status"
            default: return ""
        }
    }

    return (
        <DashboardLayout title="Setup Front Office">
            <div className="space-y-6">
                <Tabs defaultValue="purpose" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-gray-200 rounded-none space-x-6">
                        {["purpose", "complain-type", "source", "reference", "enquiry-status"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className={`
                  pb-3 px-1 rounded-none bg-transparent border-b-2 border-transparent 
                  data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 
                  data-[state=active]:shadow-none text-gray-500 font-medium capitalize
                `}
                            >
                                {tab.replace("-", " ")}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Left Side - Add Form */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader className="bg-pink-50 border-b border-pink-100">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                                        <Edit className="h-5 w-5" />
                                        Add {getTabLabel()}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{getTabLabel()} *</Label>
                                            <Input
                                                id="name"
                                                placeholder={`Enter ${getTabLabel()}`}
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                required
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

                                        <div className="flex justify-end">
                                            <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
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
                                                {getTabLabel()} List
                                            </div>
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><FileText className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none"><Printer className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] border-none flex items-center gap-1">
                                                <MoreHorizontal className="h-4 w-4" /> Column visibility
                                            </Button>
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
                                                    {(activeTab === "source" || activeTab === "reference") && (
                                                        <TableHead className="font-bold text-gray-700 uppercase w-16">Id</TableHead>
                                                    )}
                                                    <TableHead className="font-bold text-gray-700 uppercase">{getTabLabel()}</TableHead>
                                                    <TableHead className="font-bold text-gray-700 text-right uppercase">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {getCurrentData()
                                                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                    .map((item) => (
                                                        <TableRow key={item.id}>
                                                            {(activeTab === "source" || activeTab === "reference") && (
                                                                <TableCell className="font-medium">{item.id}</TableCell>
                                                            )}
                                                            <TableCell className="font-medium">{item.name}</TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="sm" className="bg-[#1e1e50] text-white hover:bg-[#151538] h-8 px-2">
                                                                            Action <span className="ml-1">▼</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem onClick={() => {
                                                                            setFormData({ name: item.name, description: item.description })
                                                                            // In a real app, you'd handle edit mode here
                                                                        }}>
                                                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(item.id)}>
                                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                {getCurrentData().length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                                                            No records found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-500">
                                            Showing 1 to {getCurrentData().length} of {getCurrentData().length} entries
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="outline" size="sm" disabled>Previous</Button>
                                            <Button variant="default" size="sm" className="bg-[#1e1e50]">1</Button>
                                            <Button variant="outline" size="sm">2</Button>
                                            <Button variant="outline" size="sm">Next</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
