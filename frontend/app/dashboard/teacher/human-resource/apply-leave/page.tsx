"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Plus, Calendar, FileText, CheckCircle2, XCircle, AlertCircle, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ApplyLeavePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // State for Leave History
    const [leaveHistory, setLeaveHistory] = useState([
        { id: "L-2023-001", type: "Sick Leave", from: "2023-11-10", to: "2023-11-11", days: 2, reason: "Flu and Fever", status: "Approved", appliedOn: "2023-11-09" },
        { id: "L-2023-002", type: "Casual Leave", from: "2023-12-01", to: "2023-12-01", days: 1, reason: "Personal work", status: "Pending", appliedOn: "2023-11-28" },
        { id: "L-2023-003", type: "Paid Leave", from: "2023-09-15", to: "2023-09-20", days: 5, reason: "Family Vacation", status: "Rejected", appliedOn: "2023-09-01" },
    ])

    // Form State
    const [formData, setFormData] = useState({
        type: "",
        from: "",
        to: "",
        reason: ""
    })

    const leaveBalances = [
        { type: "Casual Leave", total: 12, used: 8, balance: 4, color: "text-blue-600 bg-blue-50" },
        { type: "Sick Leave", total: 10, used: 2, balance: 8, color: "text-red-600 bg-red-50" },
        { type: "Paid Leave", total: 15, used: 5, balance: 10, color: "text-green-600 bg-green-50" },
    ]

    const handleSubmit = () => {
        // Simple logic to calculate days (mock)
        const diffTime = Math.abs(new Date(formData.to).getTime() - new Date(formData.from).getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 1

        const newLeave = {
            id: `L-2024-${Math.floor(Math.random() * 1000)}`,
            type: formData.type === 'casual' ? 'Casual Leave' : formData.type === 'sick' ? 'Sick Leave' : 'Paid Leave',
            from: formData.from,
            to: formData.to,
            days: diffDays,
            reason: formData.reason,
            status: "Pending",
            appliedOn: new Date().toISOString().split('T')[0]
        }

        setLeaveHistory([newLeave, ...leaveHistory])
        setIsDialogOpen(false)
        setFormData({ type: "", from: "", to: "", reason: "" })
    }

    const handleCancelLeave = (id: string) => {
        if (confirm("Are you sure you want to cancel this leave request?")) {
            setLeaveHistory(leaveHistory.map(leave =>
                leave.id === id ? { ...leave, status: "Cancelled" } : leave
            ))
        }
    }

    const handleDeleteLeave = (id: string) => {
        if (confirm("Delete this record permanently?")) {
            setLeaveHistory(leaveHistory.filter(leave => leave.id !== id))
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved": return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Approved</Badge>
            case "Pending": return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Pending</Badge>
            case "Rejected": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Rejected</Badge>
            case "Cancelled": return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Cancelled</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <DashboardLayout title="Apply Leave">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Apply Leave</h1>
                        <p className="text-gray-500 mt-1">Manage all your leave requests and check balances.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                                <Plus className="w-4 h-4 mr-2" />
                                Apply New Leave
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Apply for Leave</DialogTitle>
                                <DialogDescription>
                                    Submit a new leave request for approval.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Leave Type</Label>
                                        <Select onValueChange={(val) => setFormData({ ...formData, type: val })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="casual">Casual Leave</SelectItem>
                                                <SelectItem value="sick">Sick Leave</SelectItem>
                                                <SelectItem value="paid">Paid Leave</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Available Balance</Label>
                                        <Input value="Checking..." disabled className="bg-gray-50" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>From Date</Label>
                                        <Input type="date" onChange={(e) => setFormData({ ...formData, from: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>To Date</Label>
                                        <Input type="date" onChange={(e) => setFormData({ ...formData, to: e.target.value })} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Reason</Label>
                                    <Textarea
                                        placeholder="Enter detailed reason for leave..."
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Attach Document (Optional)</Label>
                                    <Input type="file" className="cursor-pointer" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 text-white" onClick={handleSubmit}>Submit Request</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Leave Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {leaveBalances.map((item, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    {item.type}
                                </CardTitle>
                                <Calendar className={`h-4 w-4 ${item.color.split(' ')[0]}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline justify-between">
                                    <div className="text-3xl font-bold">{item.balance}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span>Used: {item.used}</span>
                                        <span className="text-gray-300">|</span>
                                        <span>Total: {item.total}</span>
                                    </div>
                                </div>
                                <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color.split(' ')[0].replace('text', 'bg')}`}
                                        style={{ width: `${(item.balance / item.total) * 100}%` }}
                                    ></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Leave History Table */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Leave Requests History</CardTitle>
                        <CardDescription>
                            A list of all your leave applications and their current status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="w-[120px]">Applied Date</TableHead>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Days</TableHead>
                                    <TableHead className="max-w-[300px]">Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaveHistory.map((leave) => (
                                    <TableRow key={leave.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-600">{leave.appliedOn}</TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-gray-700">{leave.type}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-3 h-3" />
                                                {leave.from} <span className="text-gray-400">to</span> {leave.to}
                                            </div>
                                        </TableCell>
                                        <TableCell>{leave.days}</TableCell>
                                        <TableCell className="truncate max-w-[300px] text-gray-500" title={leave.reason}>
                                            {leave.reason}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(leave.status)}</TableCell>
                                        <TableCell className="text-right">
                                            {leave.status === 'Pending' ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleCancelLeave(leave.id)}
                                                >
                                                    Cancel
                                                </Button>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" disabled>View</Button>
                                                    {['Rejected', 'Cancelled'].includes(leave.status) && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-gray-400 hover:text-red-600"
                                                            onClick={() => handleDeleteLeave(leave.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
