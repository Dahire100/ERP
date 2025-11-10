"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Award, TrendingUp, Download } from "lucide-react"

export default function StudentReport() {
  const currentTerm = {
    term: "Term 1 - 2024-25",
    subjects: [
      { name: "Mathematics", marks: 95, grade: "A+", remarks: "Excellent" },
      { name: "Science", marks: 88, grade: "A", remarks: "Good" },
      { name: "English", marks: 92, grade: "A+", remarks: "Outstanding" },
      { name: "History", marks: 85, grade: "A", remarks: "Very good" },
    ],
    overallPercentage: 90,
    overallGrade: "A+",
    rank: 5,
    totalStudents: 45
  }

  return (
    <DashboardLayout title="Report">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Academic Report
          </h2>
          <p className="text-muted-foreground mt-1">View your report card and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Overall Grade" value={currentTerm.overallGrade} icon={Award} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Percentage" value={`${currentTerm.overallPercentage}%`} icon={TrendingUp} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Class Rank" value={`#${currentTerm.rank}`} icon={Award} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
          <StatCard title="Subjects" value={currentTerm.subjects.length.toString()} icon={FileText} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />{currentTerm.term}</CardTitle>
                <CardDescription>Subject-wise performance</CardDescription>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Download className="h-4 w-4 mr-1" />Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTerm.subjects.map((subject, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{subject.name}</p>
                      <p className="text-xs text-muted-foreground">{subject.remarks}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{subject.grade}</p>
                      <p className="text-sm text-muted-foreground">{subject.marks}/100</p>
                    </div>
                  </div>
                  <Progress value={subject.marks} className="h-2" />
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Performance</p>
                    <p className="text-xs text-muted-foreground mt-1">Rank: #{currentTerm.rank} of {currentTerm.totalStudents}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{currentTerm.overallGrade}</p>
                    <p className="text-sm text-muted-foreground">{currentTerm.overallPercentage}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
