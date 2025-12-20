"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Laptop, Video, Clock, ExternalLink, Users, ChevronDown, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function OnlineClassLinks() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const classes = {
    child1: [
      { id: 1, subject: "Mathematics", teacher: "Mr. Smith", time: "09:00 AM", duration: "1h", platform: "Zoom", status: "Live" },
      { id: 2, subject: "Physics", teacher: "Ms. Johnson", time: "11:00 AM", duration: "45m", platform: "Google Meet", status: "Scheduled" },
      { id: 3, subject: "Chemistry", teacher: "Mr. Brown", time: "02:00 PM", duration: "1h", platform: "Teams", status: "Scheduled" },
    ],
    child2: [
      { id: 1, subject: "English", teacher: "Mrs. Taylor", time: "10:00 AM", duration: "45m", platform: "Zoom", status: "Scheduled" },
      { id: 2, subject: "History", teacher: "Mr. Davis", time: "01:00 PM", duration: "1h", platform: "Google Meet", status: "Scheduled" },
    ]
  }

  const currentClasses = classes[selectedChild]

  const handleJoin = (subject: string) => {
    toast.success("Joining Class", { description: `Launching meeting for ${subject}...` })
  }

  return (
    <DashboardLayout title="Online Class Links">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Online Classes
            </h2>
            <p className="text-muted-foreground mt-1">
              Virtual classroom links for {children[selectedChild].name}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[180px] justify-between shadow-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  {children[selectedChild].name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setSelectedChild("child1")}>
                Alice Student (10-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedChild("child2")}>
                Bob Student (8-B)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Today's Classes"
            value={currentClasses.length.toString()}
            icon={Laptop}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Live Now"
            value={currentClasses.filter(c => c.status === "Live").length.toString()}
            icon={Video}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Upcoming"
            value={currentClasses.filter(c => c.status === "Scheduled").length.toString()}
            icon={Clock}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Class List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-blue-600" />
              Class Schedule
            </CardTitle>
            <CardDescription>Join your scheduled online sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentClasses.map((item) => (
                <div key={item.id} className="p-4 border rounded-xl hover:shadow-lg transition-all bg-white flex flex-col gap-3 group">
                  <div className="flex justify-between items-start">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${item.status === "Live" ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600"
                      }`}>
                      {item.status === "Live" ? "LIVE NOW" : "SCHEDULED"}
                    </div>
                    <div className="p-2 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                      <Video className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{item.subject}</h3>
                    <p className="text-sm text-gray-500">with {item.teacher}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    Platform: <span className="font-medium text-gray-600">{item.platform}</span>
                  </div>

                  <Button className={`w-full mt-2 ${item.status === "Live" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    }`} onClick={() => handleJoin(item.subject)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {item.status === "Live" ? "Join Now" : "Join Class"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

