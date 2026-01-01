"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Stamp } from "lucide-react"

const rows = [
  { id: 1, name: "Transfer Certificate", updated: "12-06-2025" },
  { id: 2, name: "Bonafide Certificate", updated: "10-06-2025" },
]

export default function CertificateTemplates() {
  return (
    <DashboardLayout title="Certificate Templates">
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Stamp className="h-5 w-5" />
              Add Template
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-red-500">Template Name *</Label>
                <Input placeholder="Template title" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Notes</Label>
                <Input placeholder="Short description" className="bg-white border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">Save</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-pink-50 border-b border-pink-100">
            <CardTitle className="text-lg text-gray-800">Templates</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-pink-50 hover:bg-pink-50">
                    <TableHead className="font-bold text-gray-700 uppercase">Name</TableHead>
                    <TableHead className="font-bold text-gray-700 uppercase">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

