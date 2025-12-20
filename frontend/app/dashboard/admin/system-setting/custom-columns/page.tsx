"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Settings, Edit2, X, Plus } from "lucide-react"

interface CustomField {
    id: number
    name: string
    category: string
}

// Dummy data for the list
const fieldCategories = [
    {
        name: "Student",
        fields: [
            "Shift Time", "SR NO", "PEN", "pan number", "Reference", "Hobby",
            "Family Income", "Family Member detail", "Mother langauge",
            "Student last class", "Last School Name", "Last School Medium",
            "Type of Board", "previous class marks", "Student Perivious class percentage",
            "If Any helth issue (MENTION BELOW)", "Interview Marks"
        ]
    },
    {
        name: "Staff",
        fields: ["test", "Secondary Bank Account Number"]
    },
    {
        name: "Form",
        fields: ["Exam Name", "Form No", "Center Name", "City Pref"]
    },
    {
        name: "Recruitment",
        fields: ["Staff Name"]
    },
    {
        name: "Admission Enquiry",
        fields: ["Fathers Name", "Student Name", "LAST CLASS PERCENAGE", "LAST CLASS PERCENAGE", "DOB", "Aadhar Number"]
    },
    {
        name: "Payroll",
        fields: ["test", "Servicess", "Mess Charges"]
    }
]

export default function CustomColumnsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Settings className="w-5 h-5 text-primary" />
                    </span>
                    Custom Columns
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Custom Columns
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Add/Edit Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <Edit2 size={18} />
                                Add / Edit Custom Field
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="field-belongs-to">Field belongs to <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger id="field-belongs-to">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                        <SelectItem value="form">Form</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="field-type">Field Type <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger id="field-type">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text Input</SelectItem>
                                        <SelectItem value="number">Number Input</SelectItem>
                                        <SelectItem value="date">Date Picker</SelectItem>
                                        <SelectItem value="textarea">Textarea</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="field-name">Field Name <span className="text-red-500">*</span></Label>
                                <Input id="field-name" placeholder="" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="grid-column">Grid (Bootstrap Column eg. 6) - Max is 12</Label>
                                <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-[#1e1b4b] text-white sm:text-sm">
                                        col-md-
                                    </span>
                                    <Input
                                        type="number"
                                        id="grid-column"
                                        className="rounded-l-none"
                                        placeholder="12"
                                        max={12}
                                        defaultValue={12}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>field Values (Separate By Comma)</Label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder=""
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label>Validation</Label>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="required" />
                                        <label
                                            htmlFor="required"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Required
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Visibility</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="on-table" />
                                            <label
                                                htmlFor="on-table"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                On Table
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="parent-student" />
                                            <label
                                                htmlFor="parent-student"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Parent / Student
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <div className="bg-transparent text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                                </div>
                                Custom Columns List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {fieldCategories.map((category, idx) => (
                                    <div key={idx} className="border rounded-md overflow-hidden">
                                        <div className="bg-muted p-3 font-semibold text-sm flex justify-between items-center">
                                            <span>{category.name}</span>
                                            <Plus size={16} className="cursor-pointer" />
                                        </div>
                                        <div className="bg-white">
                                            {category.fields.map((field, fIdx) => (
                                                <div key={fIdx} className="p-2 border-b last:border-0 flex justify-between items-center text-sm hover:bg-muted/20">
                                                    <div className="flex items-center gap-2">
                                                        <span className="p-1 bg-gray-200 rounded text-gray-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><path d="M7 13h10" /><path d="M7 17h6" /></svg>
                                                        </span>
                                                        {field}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="h-6 w-6">
                                                            <Edit2 size={12} />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-6 w-6">
                                                            <X size={12} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
