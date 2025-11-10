"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bus, MapPin, Clock, User, Phone } from "lucide-react"

export default function StudentTransport() {
  const transportInfo = {
    busNumber: "BUS-12",
    route: "North Route",
    pickupTime: "7:30 AM",
    dropTime: "3:30 PM",
    driver: { name: "Mr. Johnson", phone: "+1-555-0199" }
  }

  const routeStops = [
    { stop: "Green Park", time: "7:30 AM", status: "Pickup" },
    { stop: "Central Square", time: "7:45 AM", status: "Stop" },
    { stop: "School", time: "8:00 AM", status: "Arrival" },
  ]

  return (
    <DashboardLayout title="Transport">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Transport Details
          </h2>
          <p className="text-muted-foreground mt-1">Your bus route and schedule</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Bus Number" value={transportInfo.busNumber} icon={Bus} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Pickup Time" value={transportInfo.pickupTime} icon={Clock} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Drop Time" value={transportInfo.dropTime} icon={Clock} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Route Stops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routeStops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`p-2 rounded-lg ${stop.status === "Pickup" ? "bg-green-100" : stop.status === "Arrival" ? "bg-blue-100" : "bg-gray-100"}`}>
                      <MapPin className={`h-5 w-5 ${stop.status === "Pickup" ? "text-green-600" : stop.status === "Arrival" ? "text-blue-600" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{stop.stop}</p>
                      <p className="text-xs text-muted-foreground">{stop.status}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{stop.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                      {transportInfo.driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{transportInfo.driver.name}</p>
                    <p className="text-xs text-muted-foreground">Bus Driver</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />{transportInfo.driver.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
