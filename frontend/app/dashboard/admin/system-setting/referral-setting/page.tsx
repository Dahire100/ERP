"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
    Plus,
    Search,
    Copy,
    FileSpreadsheet,
    FileText,
    Printer,
    Columns,
    UserPlus,
    Edit2,
    MoreVertical
} from "lucide-react"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

interface ReferralItem {
    id: number
    class: string
    amount: number
}

const initialReferrals: ReferralItem[] = [
    { id: 1, class: "3rd", amount: 200 },
    { id: 2, class: "4th", amount: 5000 },
    { id: 3, class: "5th", amount: 20000 },
    { id: 4, class: "KSV 6th", amount: 10000 },
]

export default function ReferralSettingPage() {
    const { toast } = useToast()
    const [referrals, setReferrals] = useState<ReferralItem[]>(initialReferrals)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredReferrals = referrals.filter(item =>
        item.class.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <UserPlus className="w-5 h-5 text-primary" />
                    </span>
                    Referral Setting
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Referral Setting
                </div>
            </div>

            <div className="space-y-6">
                {/* Top: Form */}
                <Card>
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Edit2 size={18} />
                            Add / Edit Referral Setting
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="class">Class <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger id="class">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3rd">3rd</SelectItem>
                                        <SelectItem value="4th">4th</SelectItem>
                                        <SelectItem value="5th">5th</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount <span className="text-red-500">*</span></Label>
                                <Input id="amount" placeholder="Enter Amount" />
                            </div>

                            <div>
                                <Button onClick={() => toast({ title: "Success", description: "Referral setting saved successfully!" })} className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 w-full md:w-auto">Save</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom: List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <div className="bg-transparent text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                            </div>
                            Referral Setting List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="icon" title="Copy">
                                    <Copy size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="Excel">
                                    <FileSpreadsheet size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="CSV">
                                    <FileText size={16} />
                                </Button>
                                <Button variant="outline" size="icon" title="Print">
                                    <Printer size={16} />
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Columns size={16} />
                                            Column visibility
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuCheckboxItem checked>Class</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>Amount</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>Action</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Search:</span>
                                <Input
                                    className="w-48 sm:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>CLASS</TableHead>
                                        <TableHead>AMOUNT</TableHead>
                                        <TableHead className="text-right">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredReferrals.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                No matching records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredReferrals.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.class}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell className="text-right">
                                                    <ActionMenu
                                                        onEdit={() => toast({ title: "Edit", description: `Editing referral for ${item.class}` })}
                                                        onDelete={() => toast({ title: "Delete", description: `Deleting referral for ${item.class}`, variant: "destructive" })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                            <div>Showing {filteredReferrals.length > 0 ? 1 : 0} to {filteredReferrals.length} of {filteredReferrals.length} entries</div>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="default" size="sm" className="bg-[#1e1b4b]">1</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
