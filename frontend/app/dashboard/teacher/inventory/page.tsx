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
import { Package, Plus, ClipboardList, RotateCcw, AlertTriangle, Trash2, CheckCircle2 } from "lucide-react"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function InventoryPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Initial State
    const [items, setItems] = useState([
        { id: "INV-001", name: "Laptop - Dell Latitude", category: "Electronics", issuedDate: "2023-01-15", returnDate: "N/A", status: "In Possession" },
        { id: "INV-089", name: "Whiteboard Markers (Set of 10)", category: "Stationery", issuedDate: "2023-11-05", returnDate: "Consumed", status: "Consumed" },
        { id: "INV-102", name: "Projector Remote", category: "Electronics", issuedDate: "2023-10-10", returnDate: "2023-10-12", status: "Returned" },
    ])

    const [formData, setFormData] = useState({
        category: "",
        itemName: "",
        description: "",
        requiredDate: ""
    })

    const handleRequestItem = () => {
        const newItem = {
            id: `REQ-${Math.floor(Math.random() * 1000)}`,
            name: formData.itemName,
            category: formData.category || "General",
            issuedDate: "Pending Approval",
            returnDate: "N/A",
            status: "Pending" // Initial status logic
        }
        // In a real app, this would probably go to a "Requests" table, but here we add to the list for demo
        setItems([newItem, ...items])
        setIsDialogOpen(false)
        setFormData({ category: "", itemName: "", description: "", requiredDate: "" })
    }

    const handleReturnItem = (id: string) => {
        if (confirm("Confirm return of this item?")) {
            setItems(items.map(item =>
                item.id === id
                    ? { ...item, status: "Returned", returnDate: new Date().toISOString().split('T')[0] }
                    : item
            ))
        }
    }

    const handleDeleteRecord = (id: string) => {
        if (confirm("Delete this history record?")) {
            setItems(items.filter(item => item.id !== id))
        }
    }

    const inPossessionCount = items.filter(i => i.status === 'In Possession').length
    const pendingCount = items.filter(i => i.status === 'Pending').length
    const returnedCount = items.filter(i => i.status === 'Returned' || i.status === 'Consumed').length

    return (
        <DashboardLayout title="Inventory">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventory</h1>
                        <p className="text-gray-500 mt-1">Manage items issued to you and request new supplies.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                                <Plus className="w-4 h-4 mr-2" />
                                Request Item
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Request New Item</DialogTitle>
                                <DialogDescription>Submit a requisition for school supplies or equipment.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Item Category</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Stationery">Stationery</SelectItem>
                                            <SelectItem value="Books">Books/Reference</SelectItem>
                                            <SelectItem value="Furniture">Furniture</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Item Name / Description</Label>
                                    <Input
                                        placeholder="e.g., HDMI Cable, Red Pens"
                                        value={formData.itemName}
                                        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Quantity & Details</Label>
                                    <Textarea
                                        placeholder="Specify quantity and reason..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date Required</Label>
                                    <Input
                                        type="date"
                                        value={formData.requiredDate}
                                        onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button className="bg-indigo-600" onClick={handleRequestItem}>Submit Requisition</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-slate-900 text-white border-none shadow-xl">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <Package className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold">{inPossessionCount}</h3>
                                <p className="text-slate-300 text-sm">Items In Possession</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-md">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <ClipboardList className="w-8 h-8 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">{pendingCount}</h3>
                                <p className="text-gray-500 text-sm">Pending Requests</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-md">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <RotateCcw className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">{returnedCount}</h3>
                                <p className="text-gray-500 text-sm">Total Items Returned</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Issued Items History</CardTitle>
                        <CardDescription>
                            Lists all items currently or previously issued to you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Issued Date</TableHead>
                                    <TableHead>Return Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            <div>{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.id}</div>
                                        </TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.issuedDate}</TableCell>
                                        <TableCell>{item.returnDate}</TableCell>
                                        <TableCell>
                                            {item.status === 'In Possession' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Active</Badge>}
                                            {item.status === 'Returned' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Returned</Badge>}
                                            {item.status === 'Consumed' && <Badge variant="secondary">Consumed</Badge>}
                                            {item.status === 'Pending' && <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {item.status === 'In Possession' && (
                                                    <Button size="sm" variant="outline" className="text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-200" onClick={() => handleReturnItem(item.id)}>
                                                        <RotateCcw className="w-3 h-3 mr-1" /> Return
                                                    </Button>
                                                )}
                                                {['Returned', 'Consumed', 'Pending'].includes(item.status) && (
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDeleteRecord(item.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
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
