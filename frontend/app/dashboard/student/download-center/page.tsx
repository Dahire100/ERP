"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, FolderOpen, File, Calendar, Search, Filter, FileIcon, FileImage, FileCode } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function StudentDownloadCenter() {
  const [searchTerm, setSearchTerm] = useState("")

  const materials = [
    { id: 1, title: "Mathematics Chapter 5 Notes", subject: "Mathematics", type: "PDF", size: "2.5 MB", uploadedBy: "Mr. Smith", date: "2024-11-05", downloads: 45 },
    { id: 2, title: "English Grammar Guide", subject: "English", type: "PDF", size: "1.8 MB", uploadedBy: "Ms. Johnson", date: "2024-11-04", downloads: 38 },
    { id: 3, title: "Science Lab Manual", subject: "Science", type: "DOCX", size: "3.2 MB", uploadedBy: "Dr. Williams", date: "2024-11-03", downloads: 52 },
    { id: 4, title: "History Timeline Chart", subject: "History", type: "PNG", size: "1.2 MB", uploadedBy: "Mr. Brown", date: "2024-11-02", downloads: 30 },
    { id: 5, title: "Math Practice Problems", subject: "Mathematics", type: "PDF", size: "900 KB", uploadedBy: "Mr. Smith", date: "2024-11-01", downloads: 42 },
  ]

  const categories = [
    { name: "Study Notes", count: 12, icon: FileText, color: "bg-blue-100 text-blue-600" },
    { name: "Assignments", count: 8, icon: File, color: "bg-green-100 text-green-600" },
    { name: "Previous Papers", count: 15, icon: FolderOpen, color: "bg-orange-100 text-orange-600" },
  ]

  const totalFiles = materials.length
  const totalSize = materials.reduce((sum, m) => {
    const size = parseFloat(m.size)
    return sum + (m.size.includes('MB') ? size : size / 1024)
  }, 0)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-5 w-5 text-red-500" />
      case "DOCX": return <FileText className="h-5 w-5 text-blue-500" />
      case "PNG": return <FileImage className="h-5 w-5 text-purple-500" />
      default: return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const handleDownload = (title: string) => {
    toast.success("Download started", { description: `${title} is downloading...` })
  }

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout title="Download Center">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Download Center
            </h2>
            <p className="text-muted-foreground mt-1">
              Access study materials and resources
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-8 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => toast.info("Filter Options", { description: "Filter menu would appear here." })}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {/* ... (existing stats cards code) ... */}

        {/* Materials List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Study Materials
                </CardTitle>
                <CardDescription>Download resources shared by teachers</CardDescription>
              </div>
              <Button
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-blue-200 shadow-lg"
                onClick={() => toast.success("Download Started", { description: "Downloading all visible files as ZIP..." })}
              >
                <Download className="h-4 w-4 mr-1" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-xl hover:bg-gray-50/80 hover:border-gray-300 transition-all bg-white gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      {getFileIcon(material.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{material.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                        <Badge variant="secondary" className="text-[10px] h-5">{material.subject}</Badge>
                        <span>• {material.uploadedBy}</span>
                        <span>• {new Date(material.date).toLocaleDateString()}</span>
                        <span>• {material.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-gray-900">{material.size}</p>
                      <p className="text-xs text-muted-foreground">{material.downloads} downloads</p>
                    </div>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 border-gray-200" onClick={() => handleDownload(material.title)}>
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
