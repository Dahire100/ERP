"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard } from "lucide-react"

// Gateway logos (using text/placeholders for now if images aren't available, or recreate text styles)
const Gateways = [
    { id: "ccavenue", name: "CC Avenue" },
    { id: "worldline", name: "World Line" },
    { id: "easebuzz", name: "Easebuzz" },
    { id: "razorpay", name: "Razorpay" },
    { id: "paytm", name: "Paytm" },
    { id: "payubiz", name: "PayUBiz" },
    { id: "phonepe", name: "PhonePe" },
    { id: "paynimo", name: "Paynimo" },
    { id: "theteller", name: "TheTeller" },
    { id: "nttdata", name: "NTT Data" },
    { id: "hdfcsmart", name: "Hdfc Bank Smart Gateway" },
    { id: "eazypay", name: "Eazypay" },
    { id: "hdfccollect", name: "Hdfc Collect Now" },
    { id: "mpesa", name: "M-Pesa" },
    { id: "paystack", name: "Paystack" },
    { id: "pesapal", name: "Pesapal" },
    { id: "billdesk", name: "BillDesk" },
    { id: "none", name: "None" },
]

export default function PaymentSettingPage() {
    const [selectedGateway, setSelectedGateway] = useState("razorpay")

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <CreditCard className="w-5 h-5 text-primary" />
                    </span>
                    Payment Setting
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Payment Setting
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            {/* Horizontal Scrolling Tabs (Simulated) */}
                            <div className="flex gap-4 overflow-x-auto pb-4 mb-4 border-b text-sm scrollbar-thin scrollbar-thumb-gray-200">
                                {Gateways.filter(g => g.id !== "none").map(gateway => (
                                    <div
                                        key={gateway.id}
                                        onClick={() => setSelectedGateway(gateway.id)}
                                        className={`cursor-pointer whitespace-nowrap px-2 py-1 ${selectedGateway === gateway.id ? 'font-bold text-[#1e1b4b] border-b-2 border-[#1e1b4b]' : 'text-muted-foreground'}`}
                                    >
                                        {gateway.name}
                                    </div>
                                ))}
                            </div>

                            {selectedGateway === "razorpay" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full max-w-lg space-y-4">
                                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                                                <Label>KEY-id</Label>
                                                <Input defaultValue="rzp_test_BBTHwbxDV6L..." />
                                            </div>
                                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                                                <Label>KEY-Secret</Label>
                                                <Input defaultValue="7JET3VnD8ZarPlqp7YApj1..." />
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-right">
                                            <h2 className="text-2xl font-bold text-blue-900 italic">Razorpay</h2>
                                            <a href="http://razorpay.com/" target="_blank" className="text-sm text-muted-foreground hover:underline">http://razorpay.com/</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-end border-t pt-4">
                                        <Button className="bg-[#1e1b4b]">Save</Button>
                                    </div>
                                </div>
                            )}
                            {selectedGateway !== "razorpay" && (
                                <div className="py-12 text-center text-muted-foreground">
                                    Configuration for {Gateways.find(g => g.id === selectedGateway)?.name}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Gateway Selection List */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="border-b bg-red-50/50 pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Payment Gateway
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="mb-4 text-sm font-medium text-gray-700">Select Payment Gateway</div>
                            <RadioGroup value={selectedGateway} onValueChange={setSelectedGateway} className="space-y-3">
                                {Gateways.map((gateway) => (
                                    <div key={gateway.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={gateway.id} id={`r-${gateway.id}`} />
                                        <Label htmlFor={`r-${gateway.id}`} className="font-normal cursor-pointer">{gateway.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="flex justify-end border-t pt-4 mt-6">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
