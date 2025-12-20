"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
    Users,
    Copy,
    FileSpreadsheet,
    FileText,
    Printer,
    Columns,
    Search,
    Filter,
    MoreHorizontal,
    Download
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"


// Types
interface StudentUser {
    id: number
    admissionNo: string
    studentName: string
    userName: string
    class: string
    fatherName: string
    mobileNumber: string
    status: boolean
}

interface StaffUser {
    id: number
    staffId: string
    name: string
    email: string
    role: string
    designation: string
    department: string
    phone: string
    status: boolean
}

interface ParentUser {
    id: number
    guardianName: string
    guardianPhone: string
    userName: string
    status: boolean
}

// Dummy Data (kept same)
const initialStudents: StudentUser[] = [
    { id: 1, admissionNo: "5", studentName: "fdg", userName: "5", class: "3rd - A", fatherName: "", mobileNumber: "dfg", status: false },
    { id: 2, admissionNo: "9", studentName: "Kay Kay", userName: "9", class: "3rd - A", fatherName: "", mobileNumber: "0971000000", status: true },
    { id: 3, admissionNo: "25", studentName: "SANAA MAHAMUD PUNJA", userName: "25", class: "Year 13 - A", fatherName: "MAHMUD PUNJA", mobileNumber: "1234567890", status: true },
    { id: 4, admissionNo: "115", studentName: "KSV1", userName: "115", class: "7th - A", fatherName: "", mobileNumber: "9584555544", status: true },
    { id: 5, admissionNo: "125", studentName: "RIDVI", userName: "125", class: "KSV 6th - A", fatherName: "", mobileNumber: "9999999999999999999", status: true },
    { id: 6, admissionNo: "130", studentName: "Ella", userName: "130", class: "Ele-7 - Ele_ 2-4 PM", fatherName: "U Ba", mobileNumber: "017437842374782", status: true },
    { id: 7, admissionNo: "205", studentName: "Suryadeo Yadav", userName: "205", class: "4th - A", fatherName: "", mobileNumber: "09955338699", status: true },
    { id: 8, admissionNo: "251", studentName: "M JAYANTI", userName: "251", class: "4th - A", fatherName: "M SANKAR RAO", mobileNumber: "1234567890", status: true },
    { id: 9, admissionNo: "289", studentName: "TS", userName: "289", class: "All - Piano", fatherName: "", mobileNumber: "09987654321", status: true },
    { id: 10, admissionNo: "415", studentName: "Aarjav Jain", userName: "415", class: "7th - C", fatherName: "Al Jain", mobileNumber: "9772119901", status: true },
]

const initialStaff: StaffUser[] = [
    { id: 1, staffId: "6", name: "Driver", email: "driver@gmail.com", role: "Driver", designation: "", department: "", phone: "809436469", status: true },
    { id: 2, staffId: "9", name: "Demo", email: "demo@nlet.in", role: "Admin", designation: "", department: "", phone: "1234567890", status: true },
    { id: 3, staffId: "10", name: "Robert", email: "teacher@nlet.in", role: "teacher head", designation: "Teacher", department: "teaching", phone: "1234567890", status: true },
    { id: 4, staffId: "12", name: "Aatam", email: "drd@gmail.com", role: "Teacher", designation: "Teacher", department: "High School", phone: "8952972792", status: true },
    { id: 5, staffId: "13", name: "Channel", email: "cp@nlet.in", role: "Admin", designation: "", department: "", phone: "1234567890", status: true },
    { id: 6, staffId: "14", name: "Sonali", email: "sjain@gmail.com", role: "Ass. Principal", designation: "HOD", department: "ASET", phone: "1233456679", status: true },
    { id: 7, staffId: "16", name: "test staff", email: "test.staff@gmail.com", role: "Teacher", designation: "", department: "", phone: "5254565235", status: true },
    { id: 8, staffId: "17", name: "Ravi", email: "test.teacher@gmail.com", role: "Teacher", designation: "Teacher", department: "teaching", phone: "5245865425", status: true },
    { id: 9, staffId: "19", name: "Durga", email: "hasmeibabu@gmail.com", role: "Teacher", designation: "HOI", department: "ASET", phone: "9772119901", status: true },
    { id: 10, staffId: "21", name: "Admin", email: "support@nlet.in", role: "Teacher", designation: "HOD", department: "ALS", phone: "01234567890", status: true },
]

const initialParents: ParentUser[] = [
    { id: 1, guardianName: "Ajit Jain", guardianPhone: "9772119901", userName: "PPSN2322212007", status: true },
    { id: 2, guardianName: "Akshay", guardianPhone: "7656789845", userName: "P995588", status: true },
    { id: 3, guardianName: "Aman Kumwat", guardianPhone: "1234567890", userName: "PNlet100005", status: true },
    { id: 4, guardianName: "Anoop Thakur", guardianPhone: "1234567890", userName: "PNlet100005", status: true },
    { id: 5, guardianName: "Ayanna", guardianPhone: "1234567890", userName: "PNlet100005", status: true },
    { id: 6, guardianName: "BHAGVAT PRASAD", guardianPhone: "6651567864", userName: "P5598", status: true },
    { id: 7, guardianName: "CHANDRASHEKHAR", guardianPhone: "6005016203", userName: "P5585", status: true },
    { id: 8, guardianName: "DARSHRAT", guardianPhone: "9415145127", userName: "P2322212009", status: true },
    { id: 9, guardianName: "DEVI", guardianPhone: "7588893680", userName: "P12345", status: true },
    { id: 10, guardianName: "David", guardianPhone: "1234567890", userName: "PNlet100005", status: true },
]

export default function UsersPage() {
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-500">Manage student, staff, and parent accounts.</p>
                </div>
            </div>

            <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="p-6 pb-2">
                    <Tabs defaultValue="student" className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <TabsList className="bg-gray-100/50 p-1 rounded-xl">
                                <TabsTrigger value="student" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1e1b4b] data-[state=active]:shadow-sm px-4">Student</TabsTrigger>
                                <TabsTrigger value="staff" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1e1b4b] data-[state=active]:shadow-sm px-4">Staff</TabsTrigger>
                                <TabsTrigger value="parent" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1e1b4b] data-[state=active]:shadow-sm px-4">Parent</TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:flex-none">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Search users..."
                                        className="pl-9 w-full md:w-64 bg-gray-50 border-gray-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="shrink-0">
                                    <Download size={16} className="text-gray-500" />
                                </Button>
                                <Button className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 shrink-0">
                                    <Filter size={16} className="mr-2" /> Filter
                                </Button>
                            </div>
                        </div>

                        <TabsContent value="student" className="mt-0">
                            <div className="rounded-xl border border-gray-100 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                            <TableHead className="font-semibold text-gray-700">Admission No</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Student Name</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Username</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Class</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Father Name</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Mobile</TableHead>
                                            <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialStudents.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="font-medium text-gray-900">{item.admissionNo}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[#1e1b4b]">{item.studentName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-500">{item.userName}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-normal">
                                                        {item.class}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-gray-500">{item.fatherName || "-"}</TableCell>
                                                <TableCell className="text-gray-500">{item.mobileNumber}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end items-center gap-2">
                                                        <Switch checked={item.status} className="data-[state=checked]:bg-green-600" />
                                                        <ActionMenu
                                                            onEdit={() => toast({ title: "Edit", description: `Editing student ${item.studentName}` })}
                                                            onDelete={() => toast({ title: "Delete", description: `Deleting student ${item.studentName}`, variant: "destructive" })}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="staff" className="mt-0">
                            <div className="rounded-xl border border-gray-100 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                            <TableHead className="font-semibold text-gray-700">Staff ID</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Name</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Email</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Role</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Department</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                                            <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialStaff.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="font-medium text-gray-900">{item.staffId}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[#1e1b4b]">{item.name}</span>
                                                        <span className="text-xs text-gray-400">{item.designation}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-500">{item.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="font-normal capitalize">{item.role}</Badge>
                                                </TableCell>
                                                <TableCell>{item.department || "-"}</TableCell>
                                                <TableCell className="text-gray-500">{item.phone}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end items-center gap-2">
                                                        <Switch checked={item.status} className="data-[state=checked]:bg-green-600" />
                                                        <ActionMenu
                                                            onEdit={() => toast({ title: "Edit", description: `Editing staff ${item.name}` })}
                                                            onDelete={() => toast({ title: "Delete", description: `Deleting staff ${item.name}`, variant: "destructive" })}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="parent" className="mt-0">
                            <div className="rounded-xl border border-gray-100 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                            <TableHead className="font-semibold text-gray-700">Guardian Name</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                                            <TableHead className="font-semibold text-gray-700">Username</TableHead>
                                            <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialParents.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="font-medium text-[#1e1b4b]">{item.guardianName}</TableCell>
                                                <TableCell className="text-gray-500">{item.guardianPhone}</TableCell>
                                                <TableCell className="text-gray-500">{item.userName}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end items-center gap-2">
                                                        <Switch checked={item.status} className="data-[state=checked]:bg-green-600" />
                                                        <ActionMenu
                                                            onEdit={() => toast({ title: "Edit", description: `Editing parent ${item.guardianName}` })}
                                                            onDelete={() => toast({ title: "Delete", description: `Deleting parent ${item.guardianName}`, variant: "destructive" })}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div>Showing 10 of 100 entries</div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm">Next</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
