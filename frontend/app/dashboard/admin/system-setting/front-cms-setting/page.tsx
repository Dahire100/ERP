"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Upload, Monitor } from "lucide-react"

export default function FrontCMSSettingPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <Monitor className="w-5 h-5 text-primary" />
                    </span>
                    Front CMS
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Front CMS
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Left Column: Front CMS Setting */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="border-b pb-4 bg-red-50/30">
                            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                <span className="bg-transparent text-gray-500"><Settings size={16} /></span>
                                Front CMS Setting
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* School Details */}
                            <div>
                                <h3 className="font-semibold text-sm mb-4">School Details</h3>
                                <div className="flex gap-6 mb-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Website Logo</Label>
                                        <div className="w-24 h-24 border rounded flex items-center justify-center bg-gray-50 relative">
                                            <span className="text-xs text-muted-foreground">Logo</span>
                                            <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Fav Icon</Label>
                                        <div className="w-24 h-24 border rounded flex items-center justify-center bg-gray-50 relative">
                                            <span className="text-xs text-muted-foreground">Icon</span>
                                            <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Contact us Page Email</Label>
                                        <Input className="h-8" placeholder="Contact us Page Email" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Complain Page Email</Label>
                                        <Input className="h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Footer Text</Label>
                                        <Input className="h-8" defaultValue="Copyright © 2024 NLET School" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <Label className="font-semibold">School App</Label>
                                    <Switch checked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="font-semibold">Front Website</Label>
                                    <Switch checked />
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">School Tour Video</Label>
                                    <Input className="h-8" defaultValue="https://www.youtube.com/watch?v=RDZYWgCNKPstg" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">App Download Link</Label>
                                    <Input className="h-8" defaultValue="https://play.google.com/store/apps/details?id=com.technlet" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">IOS App Link</Label>
                                    <Input className="h-8" />
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold">Theme Colour</Label>
                                        <div className="flex items-center justify-between text-xs">
                                            <span>Theme Primary</span>
                                            <div className="w-8 h-4 bg-purple-900 rounded border"></div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span>Theme Standard</span>
                                            <div className="w-8 h-4 bg-blue-400 rounded border"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold">Wellcome Popup</Label>
                                        <Label className="text-xs">Popup link</Label>
                                        <Input className="h-8" />
                                        <Label className="text-xs">Popup Image</Label>
                                        <div className="w-20 h-20 border rounded bg-gray-50 flex items-center justify-center relative">
                                            <Button size="icon" variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Google Analytics</Label>
                                    <Textarea className="min-h-[80px] text-xs font-mono" defaultValue={`<script async src="https://www.googletagmanager.com/gtag/js?id=d..." />`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Select Theme Section (Full Width below details if needed, or in separate card) */}
                    <Card>
                        <CardHeader className="border-b pb-4 bg-red-50/30">
                            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
                                <span className="bg-transparent text-gray-500"><Settings size={16} /></span>
                                Select Theme
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-4 mb-4 border-b">
                                <div className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">Front Theme</div>
                                <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Birthday Template</div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                    <div key={num} className="space-y-2 cursor-pointer group">
                                        <div className="text-xs font-medium text-gray-500">{num === 1 ? "Default" : `Theme ${num}`}</div>
                                        <div className={`aspect-[3/4] rounded-lg border-2 overflow-hidden ${num === 4 ? "border-green-500" : "border-gray-200 group-hover:border-primary"}`}>
                                            {/* Placeholder for theme screenshot */}
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground">
                                                Preview {num}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-6">
                                <Button className="bg-[#1e1b4b]">Save</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* Right Column: Social Media, About, Mission, Vision */}
                <div className="space-y-6">
                    {/* Social Media Link */}
                    <div className="bg-white rounded-lg border p-4 space-y-3">
                        <h3 className="font-semibold text-sm">Social Media Link</h3>
                        {["Facebook URL", "Instagram URL", "Whatsapp URL", "X URL", "Linkedin URL", "Youtube URL"].map((label) => (
                            <div key={label} className="space-y-1">
                                <Label className="text-xs text-muted-foreground">{label}</Label>
                                <Input className="h-8" placeholder={label.split(" ")[0]} />
                            </div>
                        ))}
                    </div>

                    {/* About School */}
                    <Card>
                        <CardHeader className="border-b pb-4 bg-gray-50/50">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">About School</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-4">
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Title</Label>
                                        <Input className="h-8" defaultValue="Empowering Generations: Our Legacy" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Description</Label>
                                        <Textarea className="h-24 text-xs" defaultValue="Welcome to the esteemed corridors..." />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Image</Label>
                                    <div className="w-full aspect-square border rounded bg-gray-50 relative">
                                        <Button size="icon" variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Our Mission */}
                    <Card>
                        <CardHeader className="border-b pb-4 bg-gray-50/50">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-4">
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Title</Label>
                                        <Input className="h-8" defaultValue="Our Mission" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Description</Label>
                                        <Textarea className="h-24 text-xs" defaultValue="A mission school or missionary school..." />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Image</Label>
                                    <div className="w-full aspect-square border rounded bg-gray-50 relative">
                                        <Button size="icon" variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Our Vision */}
                    <Card>
                        <CardHeader className="border-b pb-4 bg-gray-50/50">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-4">
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Title</Label>
                                        <Input className="h-8" defaultValue="Why Students Choose Us for Gain Their" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Description</Label>
                                        <Textarea className="h-24 text-xs" defaultValue="Vision International School, is an English..." />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Image</Label>
                                    <div className="w-full aspect-square border rounded bg-gray-50 relative">
                                        <Button size="icon" variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"><Upload size={12} /></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
