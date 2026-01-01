"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Trash2, Edit, RotateCcw } from "lucide-react"
import Link from "next/link"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

interface StudentItem {
    id: number
    admissionNo: string
    biometricId: string
    name: string
    reAdmit?: boolean
}

const initialStudents: StudentItem[] = [
    { id: 1, admissionNo: "762398", biometricId: "", name: "sd@T", reAdmit: true },
]

export default function StudentDeletePage() {
    const { toast } = useToast()
    const [students, setStudents] = useState<StudentItem[]>(initialStudents)
    const [selectedStudents, setSelectedStudents] = useState<number[]>([])

    const toggleSelectAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([])
        } else {
            setSelectedStudents(students.map(s => s.id))
        }
    }

    const toggleSelect = (id: number) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(s => s !== id))
        } else {
            setSelectedStudents([...selectedStudents, id])
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-primary" />
                    Student Delete
                </h1>
                <div className="flex items-center gap-2 text-sm text-primary">
                    <Edit className="w-4 h-4" />
                    <Link href="#" className="hover:underline font-medium">Bulk Update</Link>
                    <span className="text-muted-foreground">/ Student Delete</span>
                </div>
            </div>

            <Card className="border-t-4 border-t-pink-100">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-pink-50/30">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <div className="bg-transparent text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                        </div>
                        Student List
                    </CardTitle>
                    <Button onClick={() => toast({ title: "Bulk Delete", description: "Selected students deleted", variant: "destructive" })} className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 text-white text-xs px-4">
                        Bulk Delete
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="rounded-md border m-4">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-pink-50/50 hover:bg-pink-50/50">
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedStudents.length === students.length && students.length > 0}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="font-semibold text-primary">ADMISSION NO.</TableHead>
                                    <TableHead className="font-semibold text-primary">BIOMETRIC ID</TableHead>
                                    <TableHead className="font-semibold text-primary">NAME</TableHead>
                                    <TableHead className="font-semibold text-primary text-right">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedStudents.includes(student.id)}
                                                onCheckedChange={() => toggleSelect(student.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{student.admissionNo}</TableCell>
                                        <TableCell>{student.biometricId}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col items-start gap-2">
                                                <span>{student.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <ActionMenu>
                                                {student.reAdmit && (
                                                    <DropdownMenuItem onClick={() => toast({ title: "Success", description: `Re-admitted student ${student.name}` })} className="cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-50">
                                                        <RotateCcw className="mr-2 h-4 w-4" />
                                                        <span>Re-Admit</span>
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => toast({ title: "Delete", description: `Deleting student ${student.name}`, variant: "destructive" })} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </ActionMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
