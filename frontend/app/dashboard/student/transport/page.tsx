"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bus, MapPin, Clock, User, Phone, Navigation, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

export default function StudentTransport() {
  const transportInfo = {
    busNumber: "BUS-12",
    route: "North Route - Morning",
    pickupTime: "7:30 AM",
    dropTime: "3:30 PM",
    driver: { name: "Mr. Johnson", phone: "+1-555-0199" },
    assistant: { name: "Ms. Sarah", phone: "+1-555-0200" }
  }

  const routeStops = [
    { stop: "Green Park", time: "7:30 AM", status: "Passed", color: "text-gray-400 bg-gray-100" },
    { stop: "Central Square", time: "7:45 AM", status: "Passed", color: "text-gray-400 bg-gray-100" },
    { stop: "Willow Street", time: "7:50 AM", status: "Current", color: "text-blue-600 bg-blue-100 animate-pulse" },
    { stop: "School Gate", time: "8:00 AM", status: "Next", color: "text-green-600 bg-green-100" },
  ]

  const handleNotifyAbsence = () => {
    toast.success("Notification Sent", { description: "Transport admin has been notified of your absence." })
  }

  return (
    <DashboardLayout title="Transport">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Transport
            </h2>
            <p className="text-muted-foreground mt-1">Bus route, schedule, and live tracking</p>
          </div>
          <Button variant="destructive" onClick={handleNotifyAbsence}>
            <AlertTriangle className="mr-2 h-4 w-4" /> Notify Absence
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Bus Number" value={transportInfo.busNumber} icon={Bus} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Morning Pickup" value={transportInfo.pickupTime} icon={Clock} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Afternoon Drop" value={transportInfo.dropTime} icon={Clock} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Route Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="h-48 bg-slate-100 relative w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=800x400&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 grayscale" />
                <div className="z-10 text-center">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-2 inline-flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-semibold text-sm">Live Tracking Active</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">Simulated Map View</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {transportInfo.route}</CardTitle>
                <CardDescription>Current journey progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l-2 border-gray-200 ml-4 space-y-8 py-2">
                  {routeStops.map((stop, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${stop.status === "Current" ? "bg-blue-600 ring-4 ring-blue-100" :
                        stop.status === "Passed" ? "bg-gray-400" : "bg-green-500"
                        }`} />
                      <div className="flex items-start justify-between bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className={`font-semibold ${stop.status === "Current" ? "text-blue-700" : "text-gray-900"}`}>{stop.stop}</p>
                          <p className="text-xs text-muted-foreground">{stop.status}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border shadow-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium font-mono">{stop.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Driver & Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Crew Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-100">
                    <AvatarFallback className="bg-blue-600 text-white">D</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{transportInfo.driver.name}</p>
                    <p className="text-xs text-muted-foreground">Main Driver</p>
                    <a href={`tel:${transportInfo.driver.phone}`} className="text-xs text-blue-600 flex items-center gap-1 mt-1 font-medium hover:underline">
                      <Phone className="h-3 w-3" /> Call Driver
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12 border-2 border-green-100">
                    <AvatarFallback className="bg-green-600 text-white">A</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{transportInfo.assistant.name}</p>
                    <p className="text-xs text-muted-foreground">Bus Assistant</p>
                    <a href={`tel:${transportInfo.assistant.phone}`} className="text-xs text-blue-600 flex items-center gap-1 mt-1 font-medium hover:underline">
                      <Phone className="h-3 w-3" /> Call Assistant
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Use the live tracking map above", { description: "Full screen map view is currently disabled." })}>
                  <Navigation className="mr-2 h-4 w-4" /> View Full Route Map
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
