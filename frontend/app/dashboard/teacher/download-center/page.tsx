"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Folder } from "lucide-react"

export default function TeacherDownloadCenter() {
  const uploadedMaterials = [
    { id: 1, title: "Mathematics Chapter 5 Notes", class: "10-A", type: "PDF", size: "2.5 MB", uploadDate: "2024-11-05", downloads: 38 },
    { id: 2, title: "English Grammar Worksheet", class: "10-B", type: "PDF", size: "1.8 MB", uploadDate: "2024-11-04", downloads: 35 },
    { id: 3, title: "Science Lab Manual", class: "9-A", type: "PDF", size: "3.2 MB", uploadDate: "2024-11-03", downloads: 40 },
    { id: 4, title: "Math Practice Problems", class: "10-A", type: "PDF", size: "900 KB", uploadDate: "2024-11-01", downloads: 38 },
  ]

  const totalFiles = uploadedMaterials.length
  const totalDownloads = uploadedMaterials.reduce((sum, m) => sum + m.downloads, 0)
  const totalSize = uploadedMaterials.reduce((sum, m) => {
    const size = parseFloat(m.size)
    return sum + (m.size.includes('MB') ? size : size / 1024)
  }, 0)

  return (
    <DashboardLayout title="Download Center">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Download Center
          </h2>
          <p className="text-muted-foreground mt-1">Upload and manage study materials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Files" value={totalFiles.toString()} icon={FileText} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Total Size" value={`${totalSize.toFixed(1)} MB`} icon={Folder} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Total Downloads" value={totalDownloads.toString()} icon={Download} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="This Week" value="4" icon={Upload} iconColor="text-pink-600" iconBgColor="bg-pink-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Uploaded Materials</CardTitle>
                <CardDescription>Study materials shared with students</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Upload className="h-4 w-4 mr-1" />Upload New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{material.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>Class {material.class}</span>
                        <span>•</span>
                        <span>{material.type}</span>
                        <span>•</span>
                        <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{material.size}</p>
                      <p className="text-xs text-muted-foreground">{material.downloads} downloads</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />View
                    </Button>
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
