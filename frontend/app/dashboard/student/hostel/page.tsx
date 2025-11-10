"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, Users, User, Phone } from "lucide-react"

export default function StudentHostel() {
  const roomInfo = {
    roomNumber: "205",
    block: "A",
    floor: "2nd Floor",
    type: "Triple Sharing",
    warden: { name: "Mr. Smith", phone: "+1-555-0199" }
  }

  const roommates = [
    { name: "Alice Student", class: "10-B", rollNo: "2024002" },
    { name: "Bob Student", class: "10-C", rollNo: "2024003" },
  ]

  return (
    <DashboardLayout title="Hostel">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Hostel Information
          </h2>
          <p className="text-muted-foreground mt-1">Your room and hostel details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Room Number" value={roomInfo.roomNumber} icon={Home} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Block" value={roomInfo.block} icon={Home} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Floor" value={roomInfo.floor} icon={Home} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Roommates" value={roommates.length.toString()} icon={Users} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Roommates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roommates.map((mate, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                        {mate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{mate.name}</p>
                      <p className="text-xs text-muted-foreground">Class {mate.class} • Roll No: {mate.rollNo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Warden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">{roomInfo.warden.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />{roomInfo.warden.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
