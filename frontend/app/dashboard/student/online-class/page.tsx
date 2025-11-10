"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar, Clock, PlayCircle, Users } from "lucide-react"

export default function StudentOnlineClass() {
  const liveClasses = [
    { id: 1, subject: "Mathematics", teacher: "Mr. Smith", time: "10:00 AM", date: "2024-11-06", duration: "45 min", status: "Live Now", participants: 28 },
    { id: 2, subject: "Science", teacher: "Dr. Williams", time: "02:00 PM", date: "2024-11-06", duration: "45 min", status: "Upcoming", participants: 0 },
    { id: 3, subject: "English", teacher: "Ms. Johnson", time: "11:00 AM", date: "2024-11-07", duration: "45 min", status: "Scheduled", participants: 0 },
  ]

  const recordings = [
    { id: 1, subject: "Mathematics", topic: "Algebra Basics", teacher: "Mr. Smith", date: "2024-11-05", duration: "42 min", views: 45 },
    { id: 2, subject: "Science", topic: "Chemical Reactions", teacher: "Dr. Williams", date: "2024-11-04", duration: "38 min", views: 52 },
    { id: 3, subject: "History", topic: "World War II", teacher: "Mr. Brown", date: "2024-11-03", duration: "40 min", views: 38 },
  ]

  const liveNow = liveClasses.filter(c => c.status === "Live Now").length
  const upcoming = liveClasses.filter(c => c.status === "Upcoming" || c.status === "Scheduled").length

  return (
    <DashboardLayout title="Online Class">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Online Classes
          </h2>
          <p className="text-muted-foreground mt-1">
            Join live classes and watch recordings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Live Now"
            value={liveNow.toString()}
            icon={Video}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Upcoming"
            value={upcoming.toString()}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Recordings"
            value={recordings.length.toString()}
            icon={PlayCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Attended"
            value="24"
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Live Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Live & Upcoming Classes
            </CardTitle>
            <CardDescription>Join live classes or view schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveClasses.map((classItem) => (
                <div key={classItem.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        classItem.status === "Live Now" ? "bg-red-100" :
                        classItem.status === "Upcoming" ? "bg-blue-100" : "bg-green-100"
                      }`}>
                        <Video className={`h-5 w-5 ${
                          classItem.status === "Live Now" ? "text-red-600" :
                          classItem.status === "Upcoming" ? "text-blue-600" : "text-green-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{classItem.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{classItem.teacher}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {classItem.time}
                          </span>
                          <span>•</span>
                          <span>{classItem.duration}</span>
                          {classItem.status === "Live Now" && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {classItem.participants} participants
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        classItem.status === "Live Now" ? "bg-red-100 text-red-700 animate-pulse" :
                        classItem.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {classItem.status}
                      </span>
                      <Button size="sm" className={classItem.status === "Live Now" ? "bg-red-600 hover:bg-red-700" : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"}>
                        {classItem.status === "Live Now" ? "Join Now" : "View Details"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recordings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Class Recordings
            </CardTitle>
            <CardDescription>Watch previous class recordings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recordings.map((recording) => (
                <div key={recording.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <PlayCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{recording.subject} - {recording.topic}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>{recording.teacher}</span>
                        <span>•</span>
                        <span>{new Date(recording.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{recording.duration}</span>
                        <span>•</span>
                        <span>{recording.views} views</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <PlayCircle className="h-3 w-3 mr-1" />
                    Watch
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
