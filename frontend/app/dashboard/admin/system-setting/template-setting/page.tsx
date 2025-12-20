"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
    Mail,
    MoreVertical
} from "lucide-react"
import { ActionMenu } from "@/components/action-menu"
import { useToast } from "@/components/ui/use-toast"

interface TemplateItem {
    id: number
    event: string
    templateId: string
    ivrId: string
    smsWhatsapp: string
    email: string
    type: string
    template: string
    whatsappSample: string
}

const initialTemplates: TemplateItem[] = [
    {
        id: 1,
        event: "Absent Student",
        templateId: "1",
        ivrId: "",
        smsWhatsapp: "YES",
        email: "NO",
        type: "System",
        template: "Dynamic",
        whatsappSample: "Absent Notice : Your ward {student_firstname} is absent today {absent_date}, kindly mention the reason behind absence and please ignore the unnecessary holidays Thank you Regards {School_Name}"
    },
    {
        id: 2,
        event: "Admission Enquiry",
        templateId: "9",
        ivrId: "",
        smsWhatsapp: "YES",
        email: "NO",
        type: "Custom",
        template: "Dynamic",
        whatsappSample: "Thank you for your interest in {School_Name}! We are pleased to receive your inquiry. To learn more about our admission requirements and process, please contact to school admin."
    },
    {
        id: 3,
        event: "Balance Fee Alert",
        templateId: "10",
        ivrId: "",
        smsWhatsapp: "YES",
        email: "NO",
        type: "Custom",
        template: "Dynamic",
        whatsappSample: "Hello Respective parent, The total payable fee of this session for your ward {student_firstname} is {balance_fee_amount}. Please pay immediately. if Paid ignore this Message. Regards {School_Name}"
    },
]

export default function TemplateSettingPage() {
    const { toast } = useToast()
    const [templates, setTemplates] = useState<TemplateItem[]>(initialTemplates)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredTemplates = templates.filter(item =>
        item.event.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Mail className="w-5 h-5 text-primary" />
                    </span>
                    Template Setting
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Template Setting
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <div className="bg-transparent text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                        </div>
                        Template List
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
                                    <DropdownMenuCheckboxItem checked>Events</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>Template ID</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>IVR ID</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>SMS + Whatsapp</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>Type</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>Template</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked>Whatsapp Sample</DropdownMenuCheckboxItem>
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
                                    <TableHead>EVENTS</TableHead>
                                    <TableHead>TEMPLATE ID</TableHead>
                                    <TableHead>IVR ID</TableHead>
                                    <TableHead>SMS + WHATSAPP</TableHead>
                                    <TableHead>EMAIL</TableHead>
                                    <TableHead>TYPE</TableHead>
                                    <TableHead>TEMPLATE</TableHead>
                                    <TableHead className="w-1/3">WHATSAPP SAMPLE</TableHead>
                                    <TableHead className="text-right">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTemplates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                                            No matching records found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredTemplates.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.event}</TableCell>
                                            <TableCell>{item.templateId}</TableCell>
                                            <TableCell>{item.ivrId}</TableCell>
                                            <TableCell>{item.smsWhatsapp}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.template}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{item.whatsappSample}</TableCell>
                                            <TableCell className="text-right">
                                                <ActionMenu
                                                    onEdit={() => toast({ title: "Edit", description: `Editing template ${item.event}` })}
                                                    onDelete={() => toast({ title: "Delete", description: `Deleting template ${item.event}`, variant: "destructive" })}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                        <div>Showing {filteredTemplates.length > 0 ? 1 : 0} to {filteredTemplates.length} of {filteredTemplates.length} entries</div>
                        <div className="flex gap-1">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="default" size="sm" className="bg-[#1e1b4b]">1</Button>
                            <Button variant="outline" size="sm" disabled>Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
