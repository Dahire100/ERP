"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Award, TrendingUp, Download, Calendar } from "lucide-react"

export default function ParentReport() {
  const currentTerm = {
    term: "Term 1 - 2024-25",
    subjects: [
      { name: "Mathematics", marks: 95, grade: "A+", remarks: "Excellent performance" },
      { name: "Science", marks: 88, grade: "A", remarks: "Good understanding" },
      { name: "English", marks: 92, grade: "A+", remarks: "Outstanding work" },
      { name: "History", marks: 85, grade: "A", remarks: "Very good" },
      { name: "Physical Education", marks: 94, grade: "A+", remarks: "Excellent" },
    ],
    overallPercentage: 90.8,
    overallGrade: "A+",
    rank: 5,
    totalStudents: 45
  }

  const previousTerms = [
    { term: "Term 1", percentage: 90.8, grade: "A+" },
    { term: "Mid-Term", percentage: 88.5, grade: "A" },
    { term: "Term 2", percentage: 89.2, grade: "A+" },
  ]

  return (
    <DashboardLayout title="Report">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Academic Report
          </h2>
          <p className="text-muted-foreground mt-1">
            View detailed academic performance and report cards
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Overall Grade"
            value={currentTerm.overallGrade}
            icon={Award}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Percentage"
            value={`${currentTerm.overallPercentage}%`}
            icon={TrendingUp}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Class Rank"
            value={`#${currentTerm.rank}`}
            icon={Award}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatCard
            title="Total Subjects"
            value={currentTerm.subjects.length.toString()}
            icon={FileText}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Term Report */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {currentTerm.term}
                    </CardTitle>
                    <CardDescription>Subject-wise performance</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentTerm.subjects.map((subject, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
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

          {/* Term Comparison */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Term Comparison
                </CardTitle>
                <CardDescription>Performance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {previousTerms.map((term, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{term.term}</span>
                        <span className="text-lg font-bold text-green-600">{term.grade}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Percentage</span>
                          <span>{term.percentage}%</span>
                        </div>
                        <Progress value={term.percentage} className="h-1" />
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">Improving Performance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <FileText className="h-4 w-4 mr-2" />
                View Full Report Card
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download All Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
