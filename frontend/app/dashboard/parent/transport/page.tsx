"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bus, MapPin, Clock, User, Phone, Navigation } from "lucide-react"

export default function ParentTransport() {
  const transportInfo = {
    busNumber: "BUS-12",
    route: "North Route",
    pickupTime: "7:30 AM",
    dropTime: "3:30 PM",
    pickupLocation: "Green Park, Main Gate",
    dropLocation: "Green Park, Main Gate",
    driver: {
      name: "Mr. Johnson",
      phone: "+1-555-0199",
      experience: "15 years"
    },
    attendant: {
      name: "Ms. Sarah",
      phone: "+1-555-0198"
    },
    capacity: 45,
    currentOccupancy: 38
  }

  const routeStops = [
    { stop: "Green Park", time: "7:30 AM", status: "Pickup" },
    { stop: "Central Square", time: "7:45 AM", status: "Stop" },
    { stop: "Market Street", time: "8:00 AM", status: "Stop" },
    { stop: "School", time: "8:15 AM", status: "Arrival" },
  ]

  return (
    <DashboardLayout title="Transport">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transport Details
          </h2>
          <p className="text-muted-foreground mt-1">
            Bus route and transportation information
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Bus Number"
            value={transportInfo.busNumber}
            icon={Bus}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Route"
            value={transportInfo.route}
            icon={Navigation}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Pickup Time"
            value={transportInfo.pickupTime}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Drop Time"
            value={transportInfo.dropTime}
            icon={Clock}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bus Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5" />
                Bus Information
              </CardTitle>
              <CardDescription>Route and schedule details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Bus className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bus Number</p>
                    <p className="font-semibold">{transportInfo.busNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Navigation className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Route Name</p>
                    <p className="font-semibold">{transportInfo.route}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="text-lg font-bold">{transportInfo.capacity}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                    <p className="text-lg font-bold">{transportInfo.currentOccupancy}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Transport Staff
              </CardTitle>
              <CardDescription>Driver and attendant details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Driver */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                      {transportInfo.driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{transportInfo.driver.name}</p>
                    <p className="text-xs text-muted-foreground">Driver • {transportInfo.driver.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{transportInfo.driver.phone}</span>
                </div>
              </div>

              {/* Attendant */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                      {transportInfo.attendant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{transportInfo.attendant.name}</p>
                    <p className="text-xs text-muted-foreground">Bus Attendant</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{transportInfo.attendant.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Stops */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Stops
            </CardTitle>
            <CardDescription>Complete route with timings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {routeStops.map((stop, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className={`p-2 rounded-lg ${
                    stop.status === "Pickup" ? "bg-green-100" :
                    stop.status === "Arrival" ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    <MapPin className={`h-5 w-5 ${
                      stop.status === "Pickup" ? "text-green-600" :
                      stop.status === "Arrival" ? "text-blue-600" : "text-gray-600"
                    }`} />
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
      </div>
    </DashboardLayout>
  )
}
