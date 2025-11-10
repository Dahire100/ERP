"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, FolderOpen, File, Calendar } from "lucide-react"

export default function StudentDownloadCenter() {
  const materials = [
    { id: 1, title: "Mathematics Chapter 5 Notes", subject: "Mathematics", type: "PDF", size: "2.5 MB", uploadedBy: "Mr. Smith", date: "2024-11-05", downloads: 45 },
    { id: 2, title: "English Grammar Guide", subject: "English", type: "PDF", size: "1.8 MB", uploadedBy: "Ms. Johnson", date: "2024-11-04", downloads: 38 },
    { id: 3, title: "Science Lab Manual", subject: "Science", type: "PDF", size: "3.2 MB", uploadedBy: "Dr. Williams", date: "2024-11-03", downloads: 52 },
    { id: 4, title: "History Timeline Chart", subject: "History", type: "PDF", size: "1.2 MB", uploadedBy: "Mr. Brown", date: "2024-11-02", downloads: 30 },
    { id: 5, title: "Math Practice Problems", subject: "Mathematics", type: "PDF", size: "900 KB", uploadedBy: "Mr. Smith", date: "2024-11-01", downloads: 42 },
  ]

  const categories = [
    { name: "Study Notes", count: 12, icon: FileText },
    { name: "Assignments", count: 8, icon: File },
    { name: "Previous Papers", count: 15, icon: FolderOpen },
  ]

  const totalFiles = materials.length
  const totalSize = materials.reduce((sum, m) => {
    const size = parseFloat(m.size)
    return sum + (m.size.includes('MB') ? size : size / 1024)
  }, 0)

  return (
    <DashboardLayout title="Download Center">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Download Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Access study materials and resources
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Files"
            value={totalFiles.toString()}
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Total Size"
            value={`${totalSize.toFixed(1)} MB`}
            icon={FolderOpen}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="This Week"
            value="5"
            icon={Calendar}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Downloads"
            value="207"
            icon={Download}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{category.name}</p>
                    <p className="text-2xl font-bold">{category.count} files</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Materials List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Study Materials
                </CardTitle>
                <CardDescription>Download resources shared by teachers</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Download className="h-4 w-4 mr-1" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{material.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>{material.subject}</span>
                        <span>•</span>
                        <span>{material.uploadedBy}</span>
                        <span>•</span>
                        <span>{new Date(material.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{material.size}</p>
                      <p className="text-xs text-muted-foreground">{material.downloads} downloads</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
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
