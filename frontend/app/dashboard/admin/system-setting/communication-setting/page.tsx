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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    MessageSquare,
    Mail,
    Phone,
    Bell,
    Mic,
    Video,
    Plus,
    Trash2,
    Save,
    Activity
} from "lucide-react"

// Types
interface KeyValue {
    key: string
    value: string
}

interface NotificationModule {
    id: number
    module: string
    staff: string
}

const modulesList: NotificationModule[] = [
    { id: 1, module: "ADMISSION ENQUIRY", staff: "Aatam Jain" },
    { id: 2, module: "AUTHENTICATOR", staff: "Select Staff" },
    { id: 3, module: "COMPLAIN", staff: "Aatam Jain" },
    { id: 4, module: "CONTACT US", staff: "Select Staff" },
    { id: 5, module: "ONLINE ADMISSION", staff: "Select Staff" },
    { id: 6, module: "RECRUITMENT", staff: "Select Staff" },
    { id: 7, module: "STAFF LEAVE", staff: "Staff 3 Teacher, Aatam ..." },
    { id: 8, module: "STUDENT LEAVE", staff: "It will be notified to specific Class Teacher!" },
]

export default function CommunicationSettingPage() {
    const [activeTab, setActiveTab] = useState("sms")

    // Dynamic Fields State
    const [smsFields, setSmsFields] = useState<KeyValue[]>([{ key: "key 1", value: "value 1" }, { key: "tyu", value: "tyui" }])
    const [whatsappFields, setWhatsappFields] = useState<KeyValue[]>([
        { key: "appksey", value: "5192a88e-62c7-4440-bec8-e8ee6dda10cb" },
        { key: "authkey", value: "tXfGIDVDu4IEnAD7gSlFygW6Y10ic3keFOd7mVdoXVVh4cL" }
    ])
    const [ivrFields, setIvrFields] = useState<KeyValue[]>([
        { key: "pass", value: "Emmanuel@123" },
        { key: "user", value: "Emmanuel_School" }
    ])
    const [meetFields, setMeetFields] = useState<KeyValue[]>([])

    // Handlers for dynamic fields
    const addSmsField = () => setSmsFields([...smsFields, { key: "", value: "" }])
    const removeSmsField = (index: number) => setSmsFields(smsFields.filter((_, i) => i !== index))

    const addWhatsappField = () => setWhatsappFields([...whatsappFields, { key: "", value: "" }])
    const removeWhatsappField = (index: number) => setWhatsappFields(whatsappFields.filter((_, i) => i !== index))

    const addIvrField = () => setIvrFields([...ivrFields, { key: "", value: "" }])
    const removeIvrField = (index: number) => setIvrFields(ivrFields.filter((_, i) => i !== index))

    const addMeetField = () => setMeetFields([...meetFields, { key: "", value: "" }])
    const removeMeetField = (index: number) => setMeetFields(meetFields.filter((_, i) => i !== index))

    const renderTabContent = () => {
        switch (activeTab) {
            case "sms":
                return (
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <EditIcon className="w-5 h-5" />
                                Add SMS Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Auth key</Label>
                                    <Input defaultValue="asdf" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sender Id</Label>
                                    <Input defaultValue="asedf" />
                                </div>
                                <div className="space-y-2">
                                    <Label>User Name</Label>
                                    <Input defaultValue="Info@nlet.in" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input type="password" defaultValue="*********" />
                                </div>
                                <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input defaultValue="qwert" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="enabled">
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="enabled">Enabled</SelectItem>
                                            <SelectItem value="disabled">Disabled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Method</Label>
                                    <Select defaultValue="get">
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="get">GET</SelectItem>
                                            <SelectItem value="post">POST</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>User Name Key</Label>
                                    <Input defaultValue="wert" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Send To Key</Label>
                                    <Input defaultValue="ertw" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Message Key</Label>
                                    <Input defaultValue="wer" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sender Id Key</Label>
                                    <Input defaultValue="wert" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Template Key</Label>
                                    <Input defaultValue="wert" />
                                </div>
                            </div>

                            {/* Dynamic Fields */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between items-end gap-4">
                                    <div className="w-full space-y-2">
                                        <Label>Key</Label>
                                        <Input />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>Value</Label>
                                        <Input />
                                    </div>
                                    <Button onClick={addSmsField} className="bg-[#1e1b4b] self-end min-w-[80px]">
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>

                                {smsFields.map((field, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <Input value={field.key} readOnly className="bg-muted/20" />
                                        <Input value={field.value} readOnly className="bg-muted/20" />
                                        <Button variant="destructive" size="icon" onClick={() => removeSmsField(idx)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            case "email":
                return (
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <EditIcon className="w-5 h-5" />
                                Add Email Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="inactive">
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">In-Active</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>SMTP User Name</Label>
                                    <Input defaultValue="jaca.arusha@gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>From Name</Label>
                                    <Input defaultValue="jaca.arusha@gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>From Email</Label>
                                    <Input defaultValue="jaca.arusha@gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>SMTP Password</Label>
                                    <Input defaultValue="flkbsssibhjdjuxhmva" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Host</Label>
                                    <Input defaultValue="smtp.gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Port</Label>
                                    <Input defaultValue="587" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Security</Label>
                                    <Input defaultValue="tls" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            case "whatsapp":
                return (
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <EditIcon className="w-5 h-5" />
                                Add WhatsApp Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input defaultValue="https://wa.onedigitalite.com/api/create-message" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="disabled">
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="enabled">Enabled</SelectItem>
                                            <SelectItem value="disabled">Disabled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Dynamic Fields */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between items-end gap-4">
                                    <div className="w-full space-y-2">
                                        <Label>Key</Label>
                                        <Input />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>Value</Label>
                                        <Input />
                                    </div>
                                    <Button onClick={addWhatsappField} className="bg-[#1e1b4b] self-end min-w-[80px]">
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>

                                {whatsappFields.map((field, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <Input value={field.key} readOnly className="bg-muted/20" />
                                        <Input value={field.value} readOnly className="bg-muted/20" />
                                        <Button variant="destructive" size="icon" onClick={() => removeWhatsappField(idx)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            case "notification":
                return (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <div className="bg-transparent text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                                </div>
                                Notification Setting List
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Search:</span>
                                <Input className="w-48 h-8" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-red-50 hover:bg-red-50">
                                        <TableHead className="font-semibold text-primary">MODULES</TableHead>
                                        <TableHead className="font-semibold text-primary">ACTION STAFF</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {modulesList.map((mod) => (
                                        <TableRow key={mod.id}>
                                            <TableCell className="font-medium text-xs">{mod.module}</TableCell>
                                            <TableCell>
                                                {mod.staff === "It will be notified to specific Class Teacher!" ? (
                                                    <span className="text-xs text-muted-foreground">{mod.staff}</span>
                                                ) : (
                                                    <Select>
                                                        <SelectTrigger className="w-[300px] h-8 text-xs">
                                                            <SelectValue placeholder={mod.staff} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="aatam">Aatam Jain</SelectItem>
                                                            <SelectItem value="staff3">Staff 3 Teacher</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="p-4 flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">Showing 1 to 8 of 8 entries</div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#1e1b4b]">Save</Button>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                )
            case "ivr":
                return (
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <EditIcon className="w-5 h-5" />
                                Add IVR Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input defaultValue="http://123.63.33.42/pinvoice/api/url_obd.php?" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="enabled">
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="enabled">Enabled</SelectItem>
                                            <SelectItem value="disabled">Disabled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Dynamic Fields */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between items-end gap-4">
                                    <div className="w-full space-y-2">
                                        <Label>Key</Label>
                                        <Input />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>Value</Label>
                                        <Input />
                                    </div>
                                    <Button onClick={addIvrField} className="bg-[#1e1b4b] self-end min-w-[80px]">
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>

                                {ivrFields.map((field, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <Input value={field.key} readOnly className="bg-muted/20" />
                                        <Input value={field.value} readOnly className="bg-muted/20" />
                                        <Button variant="destructive" size="icon" onClick={() => removeIvrField(idx)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            case "meet":
                return (
                    <Card>
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <EditIcon className="w-5 h-5" />
                                Add Meet Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select defaultValue="enabled">
                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Dynamic Fields */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between items-end gap-4">
                                    <div className="w-full space-y-2">
                                        <Label>Key</Label>
                                        <Input />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label>Value</Label>
                                        <Input />
                                    </div>
                                    <Button onClick={addMeetField} className="bg-[#1e1b4b] self-end min-w-[80px]">
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>

                                {meetFields.map((field, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <Input value={field.key} readOnly className="bg-muted/20" />
                                        <Input value={field.value} readOnly className="bg-muted/20" />
                                        <Button variant="destructive" size="icon" onClick={() => removeMeetField(idx)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            default:
                return <div className="p-8 text-center text-muted-foreground">Coming Soon...</div>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Activity className="w-5 h-5 text-primary" />
                    </span>
                    Communication Settings
                </h1>
                <div className="text-sm text-muted-foreground">
                    Communication Settings / Communication Settings
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {[
                    { id: "sms", label: "SMS SETTING", sub: "SMS Setting", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-100" },
                    { id: "email", label: "EMAIL SETTING", sub: "Email Setting", icon: Mail, color: "text-red-500", bg: "bg-red-100" },
                    { id: "whatsapp", label: "WHATSAPP SETTING", sub: "WhatsApp Setting", icon: Phone, color: "text-green-500", bg: "bg-green-100" }, // Using Phone as closest generic, could use generic MessageCircle
                    { id: "notification", label: "NOTIFICATION SETTING", sub: "Notification Setting", icon: Bell, color: "text-yellow-500", bg: "bg-yellow-100" },
                    { id: "ivr", label: "IVR SETTING", sub: "IVR Setting", icon: Mic, color: "text-blue-900", bg: "bg-gray-100" },
                    { id: "meet", label: "MEET SETTING", sub: "Meet Setting", icon: Video, color: "text-blue-500", bg: "bg-blue-100" },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`
              cursor-pointer rounded-lg p-4 flex items-center gap-4 transition-all duration-200 border
              ${activeTab === item.id
                                ? "bg-white border-b-4 border-b-[#1e1b4b] shadow-sm transform -translate-y-1"
                                : "bg-white hover:bg-gray-50 border-transparent hover:border-gray-200"}
            `}
                    >
                        <div className={`p-3 rounded-full ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div>
                            <div className="font-bold text-xs uppercase text-[#1e1b4b]">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div>
                {renderTabContent()}
            </div>
        </div>
    )
}

function EditIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    )
}
