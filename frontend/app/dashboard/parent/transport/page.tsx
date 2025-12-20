"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bus, MapPin, Clock, User, Phone, Navigation, Users, ChevronDown, Locate } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function ParentTransport() {
  const [selectedChild, setSelectedChild] = useState<"child1" | "child2">("child1")

  const children = {
    child1: { name: "Alice Student", class: "10-A" },
    child2: { name: "Bob Student", class: "8-B" }
  }

  const transportData = {
    child1: {
      busNumber: "BUS-12",
      route: "North Route - Route A",
      pickupTime: "7:30 AM",
      dropTime: "3:30 PM",
      pickupLocation: "Green Park, Main Gate",
      driver: { name: "Mr. Johnson", phone: "+1-555-0199", experience: "15 years" },
      attendant: { name: "Ms. Sarah", phone: "+1-555-0198" },
      capacity: 45,
      currentOccupancy: 38,
      stops: [
        { stop: "Green Park", time: "7:30 AM", status: "Pickup" },
        { stop: "Central Square", time: "7:45 AM", status: "Stop" },
        { stop: "Market Street", time: "8:00 AM", status: "Stop" },
        { stop: "School", time: "8:15 AM", status: "Arrival" },
      ]
    },
    child2: {
      busNumber: "BUS-05",
      route: "South Route - Route B",
      pickupTime: "7:45 AM",
      dropTime: "3:45 PM",
      pickupLocation: "Sunny Side Apts",
      driver: { name: "Mr. David", phone: "+1-555-0200", experience: "8 years" },
      attendant: { name: "Ms. Emily", phone: "+1-555-0201" },
      capacity: 40,
      currentOccupancy: 35,
      stops: [
        { stop: "Sunny Side", time: "7:45 AM", status: "Pickup" },
        { stop: "River View", time: "8:00 AM", status: "Stop" },
        { stop: "School", time: "8:20 AM", status: "Arrival" },
      ]
    }
  }

  const currentData = transportData[selectedChild]

  const handleTrackBus = () => {
    toast.info("Map Loading", { description: `Opening live tracking for ${currentData.busNumber}...` })
  }

  const handleContactDriver = () => {
    toast.success("Contact Initiated", { description: `Calling ${currentData.driver.name}...` })
  }

  return (
    <DashboardLayout title="Transport">
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header with Child Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transport Details
            </h2>
            <p className="text-muted-foreground mt-1">
              Bus route and tracking for {children[selectedChild].name}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Bus Number"
            value={currentData.busNumber}
            icon={Bus}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Route"
            value={currentData.route.split(' - ')[0]}
            icon={Navigation}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Pickup Time"
            value={currentData.pickupTime}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Drop Time"
            value={currentData.dropTime}
            icon={Clock}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bus Details */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bus className="h-5 w-5 text-blue-600" />
                    Bus Information
                  </CardTitle>
                  <CardDescription>Route and schedule details</CardDescription>
                </div>
                <Button size="sm" onClick={handleTrackBus} className="bg-blue-600 hover:bg-blue-700">
                  <Locate className="h-4 w-4 mr-1" /> Track Live
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-700">{currentData.busNumber.split('-')[1]}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle Number</p>
                    <p className="font-semibold text-gray-900">{currentData.busNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Navigation className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned Route</p>
                    <p className="font-semibold text-gray-900">{currentData.route}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg text-center bg-gray-50">
                    <p className="text-xs text-muted-foreground mb-1">Bus Capacity</p>
                    <p className="text-lg font-bold text-gray-800">{currentData.capacity}</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center bg-gray-50">
                    <p className="text-xs text-muted-foreground mb-1">Current Occupancy</p>
                    <p className="text-lg font-bold text-gray-800">{currentData.currentOccupancy}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Transport Staff
              </CardTitle>
              <CardDescription>Driver and attendant details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Driver */}
              <div className="p-4 border rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 mb-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                        {currentData.driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{currentData.driver.name}</p>
                      <p className="text-xs text-muted-foreground">Driver • {currentData.driver.experience} exp</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleContactDriver}>
                    <Phone className="h-3 w-3 mr-1" /> Call
                  </Button>
                </div>
              </div>

              {/* Attendant */}
              <div className="p-4 border rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                      {currentData.attendant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">{currentData.attendant.name}</p>
                    <p className="text-xs text-muted-foreground">Bus Attendant</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Phone className="h-3 w-3" /> {currentData.attendant.phone}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Stops */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Route Timeline
            </CardTitle>
            <CardDescription>Complete route with scheduled timings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
              {currentData.stops.map((stop, index) => (
                <div key={index} className="ml-6 relative">
                  <div className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${stop.status === "Pickup" ? "bg-green-500" :
                      stop.status === "Arrival" ? "bg-blue-600" : "bg-gray-300"
                    }`} />
                  <div className="flex items-start justify-between p-3 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                    <div>
                      <p className="font-semibold text-gray-900">{stop.stop}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stop.status === "Pickup" ? "bg-green-100 text-green-700" :
                          stop.status === "Arrival" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                        }`}>
                        {stop.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                      <Clock className="h-3 w-3" />
                      {stop.time}
                    </div>
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
