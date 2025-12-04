"use client"

import { useState } from "react"
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Search, Trash2, Printer, Plus, ArrowLeft, Download, FileText } from "lucide-react"
import { toast } from "sonner"

interface ExamFormData {
    id: number
    name: string
    fatherName: string
    phone: string
    gender: string
    dob: string
    examName: string
    formNo: string
    centerName: string
    image?: string
}

export default function EntranceExam() {
    const [view, setView] = useState<"list" | "form">("list")
    const [isEditing, setIsEditing] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // Sample data
    const [examForms, setExamForms] = useState<ExamFormData[]>([
        {
            id: 2,
            name: "CaVFrzqp9L",
            fatherName: "RCi6xED9gk",
            phone: "7027685640",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        },
        {
            id: 3,
            name: "qwertyui",
            fatherName: "0lUvbWa4ji",
            phone: "7464244631",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        },
        {
            id: 4,
            name: "j1DPsAseh1",
            fatherName: "EoD0Ee0Ese",
            phone: "2586007727",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        },
        {
            id: 5,
            name: "xyOlW8T3pH",
            fatherName: "C4IV3nGUT0",
            phone: "1489992061",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        },
        {
            id: 6,
            name: "ksOGggAmQy",
            fatherName: "zxRg5ZWAQg",
            phone: "5272965754",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        },
        {
            id: 7,
            name: "yRjIc1EN4G",
            fatherName: "9b6BcR6pZt",
            phone: "3485073146",
            gender: "Male",
            dob: "06-Feb-2024",
            examName: "",
            formNo: "",
            centerName: ""
        }
    ])

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        fatherName: "",
        phone: "",
        gender: "",
        dob: new Date().toISOString().split('T')[0],
        examName: "",
        formNo: "",
        centerName: "",
        image: null as File | null
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }))
        }
    }

    const handleAddClick = () => {
        setFormData({
            id: 0,
            name: "",
            fatherName: "",
            phone: "",
            gender: "",
            dob: new Date().toISOString().split('T')[0],
            examName: "",
            formNo: "",
            centerName: "",
            image: null
        })
        setIsEditing(false)
        setView("form")
    }

    const handleEditClick = (exam: ExamFormData) => {
        // Convert "06-Feb-2024" to "2024-02-06" for input type="date"
        // This is a simple parser for the sample data format
        let formattedDate = ""
        if (exam.dob) {
            const date = new Date(exam.dob)
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split('T')[0]
            }
        }

        setFormData({
            id: exam.id,
            name: exam.name,
            fatherName: exam.fatherName,
            phone: exam.phone,
            gender: exam.gender,
            dob: formattedDate || new Date().toISOString().split('T')[0],
            examName: exam.examName,
            formNo: exam.formNo,
            centerName: exam.centerName,
            image: null
        })
        setIsEditing(true)
        setView("form")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.phone || !formData.dob) {
            toast.error("Please fill all required fields")
            return
        }

        const formattedDate = new Date(formData.dob).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-')

        if (isEditing) {
            setExamForms(prev => prev.map(item =>
                item.id === formData.id ? {
                    ...item,
                    name: formData.name,
                    fatherName: formData.fatherName,
                    phone: formData.phone,
                    gender: formData.gender,
                    dob: formattedDate,
                    examName: formData.examName,
                    formNo: formData.formNo,
                    centerName: formData.centerName
                } : item
            ))
            toast.success("Updated successfully!")
        } else {
            const newExam: ExamFormData = {
                id: examForms.length > 0 ? Math.max(...examForms.map(e => e.id)) + 1 : 1,
                name: formData.name,
                fatherName: formData.fatherName,
                phone: formData.phone,
                gender: formData.gender,
                dob: formattedDate,
                examName: formData.examName,
                formNo: formData.formNo,
                centerName: formData.centerName
            }
            setExamForms([...examForms, newExam])
            toast.success("Added successfully!")
        }

        setView("list")
    }

    const handleDelete = (id: number) => {
        setExamForms(examForms.filter(item => item.id !== id))
        toast.success("Deleted successfully")
    }

    return (
        <DashboardLayout title="Entrance Examination Form">
            {view === "list" ? (
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5 flex items-center justify-center">☰</span>
                                Entrance Examination Form
                            </div>
                        </CardTitle>
                        <Button onClick={handleAddClick} className="bg-blue-900 hover:bg-blue-800">
                            <Plus className="h-4 w-4 mr-2" /> Add
                        </Button>
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
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Form ID</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Father Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Number</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Gender</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">DOB</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Exam Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Form No</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs">Center Name</TableHead>
                                        <TableHead className="font-bold text-gray-700 uppercase text-xs text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {examForms
                                        .filter(item =>
                                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            item.phone.includes(searchTerm)
                                        )
                                        .map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.fatherName}</TableCell>
                                                <TableCell>{item.phone}</TableCell>
                                                <TableCell>{item.gender}</TableCell>
                                                <TableCell>{item.dob}</TableCell>
                                                <TableCell>{item.examName}</TableCell>
                                                <TableCell>{item.formNo}</TableCell>
                                                <TableCell>{item.centerName}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-gray-500 hover:text-blue-600"
                                                            onClick={() => handleEditClick(item)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-600"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="bg-pink-50 border-b border-pink-100 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                            <Edit className="h-5 w-5" />
                            {isEditing ? "Edit" : "Add"} Entrance Examination Form
                        </CardTitle>
                        <Button variant="ghost" onClick={() => setView("list")} className="hover:bg-pink-100">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-red-500">Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="bg-white border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-red-500">Phone *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="Enter number"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="bg-white border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob" className="text-red-500">Date of Birth *</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => handleInputChange("dob", e.target.value)}
                                        className="bg-white border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fatherName">Father Name</Label>
                                    <Input
                                        id="fatherName"
                                        placeholder="Enter father_name"
                                        value={formData.fatherName}
                                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Image</Label>
                                    <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1 bg-white">
                                        <Button type="button" className="bg-blue-900 text-white hover:bg-blue-800 h-8 text-sm">
                                            Choose File
                                        </Button>
                                        <span className="text-sm text-gray-500 px-2 truncate">
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
                                    <Label htmlFor="examName">Exam Name</Label>
                                    <Input
                                        id="examName"
                                        value={formData.examName}
                                        onChange={(e) => handleInputChange("examName", e.target.value)}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="formNo">Form No</Label>
                                    <Input
                                        id="formNo"
                                        value={formData.formNo}
                                        onChange={(e) => handleInputChange("formNo", e.target.value)}
                                        className="bg-white border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="centerName">Center Name</Label>
                                    <Input
                                        id="centerName"
                                        value={formData.centerName}
                                        onChange={(e) => handleInputChange("centerName", e.target.value)}
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
                    </CardContent>
                </Card>
            )}
        </DashboardLayout>
    )
}
