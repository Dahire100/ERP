"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IndianRupee } from "lucide-react"

export default function FeePayments() {
  return (
    <DashboardLayout title="Fee Payments">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <IndianRupee className="h-5 w-5" />
              Pay Fees
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Child *</Label>
                <Input placeholder="Select child" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Month *</Label>
                <Input placeholder="e.g. June 2025" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">Amount *</Label>
                <Input placeholder="₹0.00" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">Pay Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

