"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { IndianRupee, CheckCircle, Clock, AlertCircle, Download, CreditCard } from "lucide-react"

export default function ParentFees() {
  const [feeRecords, setFeeRecords] = useState([
    { id: 1, month: "January 2025", amount: 500, dueDate: "2025-02-01", status: "Paid", paidDate: "2025-01-28", receiptNo: "RCP-001" },
    { id: 2, month: "February 2025", amount: 500, dueDate: "2025-03-01", status: "Pending", paidDate: "-", receiptNo: "-" },
    { id: 3, month: "March 2025", amount: 500, dueDate: "2025-04-01", status: "Pending", paidDate: "-", receiptNo: "-" },
    { id: 4, month: "April 2025", amount: 500, dueDate: "2025-05-01", status: "Upcoming", paidDate: "-", receiptNo: "-" },
  ])

  const totalFees = feeRecords.reduce((sum, fee) => sum + fee.amount, 0)
  const paidFees = feeRecords.filter(f => f.status === "Paid").reduce((sum, fee) => sum + fee.amount, 0)
  const pendingFees = feeRecords.filter(f => f.status === "Pending").reduce((sum, fee) => sum + fee.amount, 0)
  const paidCount = feeRecords.filter(f => f.status === "Paid").length

  return (
    <DashboardLayout title="Fees Collection">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fee Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Track and manage your child's fee payments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Fees"
            value={`₹${totalFees}`}
            icon={IndianRupee}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Paid"
            value={`₹${paidFees}`}
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Pending"
            value={`₹${pendingFees}`}
            icon={Clock}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          <StatCard
            title="Payments Made"
            value={paidCount.toString()}
            icon={CreditCard}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Payment Progress
            </CardTitle>
            <CardDescription>Overall fee payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Payment Completion</span>
                <span className="text-lg font-bold">{Math.round((paidFees / totalFees) * 100)}%</span>
              </div>
              <Progress value={(paidFees / totalFees) * 100} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">${totalFees}</p>
                <p className="text-xs text-muted-foreground">Total Amount</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${paidFees}</p>
                <p className="text-xs text-muted-foreground">Paid</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">${pendingFees}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment History
            </CardTitle>
            <CardDescription>Detailed fee payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {feeRecords.map((fee) => (
                <div key={fee.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        fee.status === "Paid" ? "bg-green-100" :
                        fee.status === "Pending" ? "bg-orange-100" : "bg-blue-100"
                      }`}>
                        {fee.status === "Paid" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : fee.status === "Pending" ? (
                          <Clock className="h-5 w-5 text-orange-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{fee.month}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                          {fee.paidDate !== "-" && ` • Paid: ${new Date(fee.paidDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-xl font-bold">${fee.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          fee.status === "Paid" ? "bg-green-100 text-green-700" :
                          fee.status === "Pending" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {fee.status}
                        </span>
                      </div>
                      {fee.status === "Paid" && (
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      )}
                      {fee.status === "Pending" && (
                        <Button size="sm" className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Pay Now
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
