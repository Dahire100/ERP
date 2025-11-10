"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock, XCircle, Download } from "lucide-react"

export default function ParentConsentLetter() {
  const [requests, setRequests] = useState([
    { id: 1, type: "Field Trip", title: "Science Museum Visit", date: "2025-01-15", status: "Pending", dueDate: "2025-01-20", description: "Permission for educational field trip to Science Museum" },
    { id: 2, type: "Medical", title: "Medical Examination", date: "2025-01-10", status: "Approved", dueDate: "2025-01-15", description: "Annual health checkup consent" },
    { id: 3, type: "Event", title: "Sports Day Participation", date: "2025-01-08", status: "Approved", dueDate: "2025-01-12", description: "Consent for sports day activities" },
    { id: 4, type: "Excursion", title: "Historical Site Tour", date: "2025-01-12", status: "Rejected", dueDate: "2025-01-18", description: "Educational excursion to historical monuments" },
  ])

  const totalRequests = requests.length
  const pendingRequests = requests.filter(r => r.status === "Pending").length
  const approvedRequests = requests.filter(r => r.status === "Approved").length
  const rejectedRequests = requests.filter(r => r.status === "Rejected").length

  return (
    <DashboardLayout title="Consent Letter">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Consent Letters
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage and track consent letter requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Requests"
            value={totalRequests.toString()}
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Pending"
            value={pendingRequests.toString()}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Approved"
            value={approvedRequests.toString()}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Rejected"
            value={rejectedRequests.toString()}
            icon={XCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
        </div>

        {/* Consent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Consent Requests
            </CardTitle>
            <CardDescription>Review and respond to consent letter requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        request.status === "Approved" ? "bg-green-100" :
                        request.status === "Pending" ? "bg-orange-100" : "bg-red-100"
                      }`}>
                        {request.status === "Approved" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : request.status === "Pending" ? (
                          <Clock className="h-5 w-5 text-orange-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{request.title}</p>
                            <p className="text-xs text-muted-foreground">{request.type}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            request.status === "Approved" ? "bg-green-100 text-green-700" :
                            request.status === "Pending" ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Submitted: {new Date(request.date).toLocaleDateString()}</span>
                          <span>Due: {new Date(request.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {request.status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline" className="h-8">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === "Approved" && (
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
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
