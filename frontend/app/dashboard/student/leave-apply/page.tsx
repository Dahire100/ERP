"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ClipboardList } from "lucide-react"

export default function StudentLeaveApply() {
  return (
    <DashboardLayout title="Leave Apply">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <ClipboardList className="h-5 w-5" />
              Apply for Leave
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">From *</Label>
                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-red-500">To *</Label>
                <Input placeholder="DD-MM-YYYY" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-red-500">Reason *</Label>
                <Textarea rows={3} placeholder="Describe your reason" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-blue-900 hover:bg-blue-800">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

