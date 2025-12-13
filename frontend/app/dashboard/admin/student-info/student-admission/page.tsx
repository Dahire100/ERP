"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FileText, Upload, Download, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function StudentAdmission() {
    return (
        <DashboardLayout title="Student Admission">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between bg-pink-50 border-b border-pink-100 py-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-gray-800 font-normal">
                            <FileText className="h-5 w-5" />
                            Student Admission Form
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white text-xs">
                                <Download className="h-4 w-4 mr-2" /> Download Form
                            </Button>
                            <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white text-xs">
                                <Upload className="h-4 w-4 mr-2" /> Import Student
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">

                        {/* Student Details Section */}
                        <Section title="Student Details" defaultOpen>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-red-500">Admission No. *</Label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Prefix" className="w-24 bg-white" />
                                        <Input defaultValue="2322212012" className="flex-1 bg-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Class *</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="1">Class 1</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Section *</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="A">A</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="row-span-3 flex justify-center items-start">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 w-32 h-32 flex flex-col items-center justify-center text-gray-400 bg-white cursor-pointer hover:bg-gray-50">
                                        <div className="text-center text-xs">
                                            <div className="mb-1 text-2xl">👤</div>
                                            NO IMAGE AVAILABLE
                                        </div>
                                        <Button size="icon" className="h-6 w-6 rounded-full bg-[#1e1e50] absolute -top-2 -right-2">
                                            <Upload className="h-3 w-3 text-white" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Roll Number</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Biometric Id</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Admission Date</Label>
                                    <Input defaultValue="12-12-2025" className="bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-red-500">First Name *</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Gender *</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-red-500">Date of Birth *</Label>
                                    <Input type="date" className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="gen">General</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Religion</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Caste</Label>
                                    <Input className="bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Mobile Number</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Blood Group</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="a+">A+</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>House</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="red">Red</SelectItem></SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Height</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Weight</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Aadhar Number</Label>
                                    <Input className="bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Admitted Class</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>As on Date</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>Referral By</Label>
                                    <div className="flex gap-2">
                                        <Select>
                                            <SelectTrigger className="bg-[#1e1e50] text-white border-0"><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent><SelectItem value="1">One</SelectItem></SelectContent>
                                        </Select>
                                        <Button className="bg-[#1e1e50] hover:bg-[#151538]">Add</Button>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                            <Plus className="h-3 w-3 mr-1" /> Add Sibling
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Custom Field */}
                        <Section title="Custom Field" defaultOpen={true}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Shift time</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>GR NO</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>MID</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>PEN Number</Label>
                                    <Input className="bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Reference</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-red-500">Mobile *</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Family Income</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Family Member Count</Label>
                                    <Input className="bg-white" />
                                </div>

                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label className="text-red-500">Student Language *</Label>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        {["Hindi", "Gujrati", "Marathi", "Genral", "English"].map((lang) => (
                                            <label key={lang} className="flex items-center gap-2 text-sm">
                                                <input type="checkbox" className="rounded border-gray-300" /> {lang}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label className="text-red-500">Student Old Class *</Label>
                                    <Input className="bg-white" />
                                </div>

                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label className="text-red-500">Last School Name *</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>Last School Medium</Label>
                                    <RadioGroup defaultValue="english" className="flex gap-4 pt-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="english" id="l_english" />
                                            <Label htmlFor="l_english">English</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="hindi" id="l_hindi" />
                                            <Label htmlFor="l_hindi">Hindi</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="marathi" id="l_marathi" />
                                            <Label htmlFor="l_marathi">Marathi</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="space-y-2">
                                    <Label>Tc/Lc In Hand</Label>
                                    <div className="flex gap-4 pt-2">
                                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Date</label>
                                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Place</label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Previous class marks</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Student address class percentage</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>If Any health issue (YES/NO, give cert)</Label>
                                    <Input className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Interview Marks</Label>
                                    <Input className="bg-white" />
                                </div>
                            </div>
                        </Section>

                        {/* Parent / Guardian Details */}
                        <Section title="Parent / Guardian Details" defaultOpen={false}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Father */}
                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Father Name</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Father Phone</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Father Job</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Father Class, section</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Marriage Anniversary Date</Label>
                                        <Input type="date" className="bg-white" />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 w-24 h-24 flex flex-col items-center justify-center text-gray-400 bg-white">
                                        <span className="text-xs text-center">Father Photo</span>
                                        <Button size="icon" className="h-5 w-5 rounded-full bg-[#1e1e50] absolute -top-1 -right-1">
                                            <Upload className="h-3 w-3 text-white" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Mother */}
                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Mother Name</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mother Phone</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mother Job</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Mother Occupation</Label>
                                        <Input className="bg-white" />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 w-24 h-24 flex flex-col items-center justify-center text-gray-400 bg-white">
                                        <span className="text-xs text-center">Mother Photo</span>
                                        <Button size="icon" className="h-5 w-5 rounded-full bg-[#1e1e50] absolute -top-1 -right-1">
                                            <Upload className="h-3 w-3 text-white" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Guardian */}
                                <div className="md:col-span-4 flex gap-6 items-center">
                                    <Label>If Guardian Is *</Label>
                                    <RadioGroup defaultValue="father" className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="father" id="g_father" />
                                            <Label htmlFor="g_father">Father</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="mother" id="g_mother" />
                                            <Label htmlFor="g_mother">Mother</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="other" id="g_other" />
                                            <Label htmlFor="g_other">Other</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-red-500">Guardian Name *</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Guardian Relation</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-red-500">Guardian Phone *</Label>
                                        <Input className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Guardian Occupation</Label>
                                        <Input className="bg-white" />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2 w-24 h-24 flex flex-col items-center justify-center text-gray-400 bg-white">
                                        <span className="text-xs text-center">Guardian Photo</span>
                                        <Button size="icon" className="h-5 w-5 rounded-full bg-[#1e1e50] absolute -top-1 -right-1">
                                            <Upload className="h-3 w-3 text-white" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="md:col-span-4 space-y-2">
                                    <Label>Guardian Address</Label>
                                    <Textarea className="bg-white h-20" />
                                </div>
                            </div>
                        </Section>

                        {/* Other Details */}
                        <Section title="Other Details" defaultOpen={true}>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Student Address Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input type="checkbox" id="guardian_addr" defaultChecked className="rounded border-gray-300" />
                                                <Label htmlFor="guardian_addr" className="font-normal">If Guardian Address is Current Address</Label>
                                            </div>
                                            <Label>Current Address</Label>
                                            <Textarea className="bg-white min-h-[80px]" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input type="checkbox" id="perm_addr" className="rounded border-gray-300" />
                                                <Label htmlFor="perm_addr" className="font-normal">If Permanent Address is Current Address</Label>
                                            </div>
                                            <Label>Permanent Address</Label>
                                            <Textarea className="bg-white min-h-[80px]" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Student Fee Assign</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <Label>Fee Group</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select Option" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Option 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Assign Discount</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Discount Group</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select Option" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Option 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Code</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select Option" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Option 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Transport Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Route List</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Route 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Bus Stop</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Stop 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Hostel Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Hostel Name</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Hostel 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Room Name</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent><SelectItem value="1">Room 1</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">Miscellaneous Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Bank Account Number</Label>
                                            <Input className="bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Bank Name</Label>
                                            <Input className="bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>IFSC Code</Label>
                                            <Input className="bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>National Identification Number</Label>
                                            <Input className="bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Local Identification Number</Label>
                                            <Input className="bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>RTE</Label>
                                            <div className="flex gap-4 pt-2">
                                                <label className="flex items-center gap-2 text-sm"><input type="radio" name="rte" value="yes" /> Yes</label>
                                                <label className="flex items-center gap-2 text-sm"><input type="radio" name="rte" value="no" defaultChecked={true} /> No</label>
                                            </div>
                                        </div>
                                        <div className="space-y-2 col-span-3">
                                            <Label>Note</Label>
                                            <Textarea className="bg-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Upload Documents */}
                        <Section title="Upload Documents" defaultOpen={true}>
                            <div className="overflow-hidden border rounded-md">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white text-gray-700 border-b">
                                        <tr>
                                            <th className="px-4 py-3 w-16 border-r">#</th>
                                            <th className="px-4 py-3 w-1/3 border-r">TITLE</th>
                                            <th className="px-4 py-3">DOCUMENTS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {[
                                            { id: 1, title: "Report Card" },
                                            { id: 2, title: "TC" },
                                            { id: 4, title: "NIDA Card Number" },
                                            { id: 5, title: "previous year Marksheet" },
                                            { id: 6, title: "Student" },
                                            { id: 7, title: "studnet DOB" },
                                            { id: 8, title: "Adhaar Card" },
                                            { id: 9, title: "Aman" },
                                            { id: 10, title: "PIP/" },
                                        ].map((doc, idx) => (
                                            <tr key={doc.id}>
                                                <td className="px-4 py-3 text-gray-900 border-r">{doc.id}.</td>
                                                <td className="px-4 py-3 border-r">
                                                    <Input value={doc.title} readOnly className="bg-[#eef2f9] border-none font-normal" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2 border rounded-md p-1 pl-2">
                                                        <input type="file" className="hidden" id={`file-${doc.id}`} />
                                                        <label htmlFor={`file-${doc.id}`} className="bg-[#1e1e50] text-white hover:bg-[#151538] text-xs h-8 px-4 flex items-center rounded cursor-pointer">
                                                            Choose File
                                                        </label>
                                                        <span className="text-gray-500 text-sm">No file chosen</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white px-8">Submit</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

function Section({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
            <div
                className="bg-[#f0f0f4] px-4 py-3 flex justify-between items-center cursor-pointer border-b border-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp className="h-4 w-4 text-gray-600" /> : <ChevronDown className="h-4 w-4 text-gray-600" />}
            </div>
            {isOpen && (
                <div className="p-6 bg-gray-50/50 animate-in slide-in-from-top-1">
                    {children}
                </div>
            )}
        </div>
    )
}
