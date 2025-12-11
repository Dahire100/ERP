"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function VerifyCertificate() {
  return (
    <DashboardLayout title="Certificate Verification">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <ShieldCheck className="h-5 w-5" />
              Verify Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Certificate No *</Label>
                <Input placeholder="CERT-XXXX" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Student</Label>
                <Input placeholder="Name / ID" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input placeholder="Transfer / Bonafide / Character" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">Verify</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

