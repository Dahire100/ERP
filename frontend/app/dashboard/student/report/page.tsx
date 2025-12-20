"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Award, TrendingUp, Download, Printer, Share2 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { toast } from "sonner"

export default function StudentReport() {
  const [activeTerm, setActiveTerm] = useState("term1")

  const terms = {
    term1: {
      name: "Term 1 - 2024-25",
      subjects: [
        { name: "Mathematics", marks: 95, grade: "A+", remarks: "Excellent", fullMark: 100 },
        { name: "Science", marks: 88, grade: "A", remarks: "Good understanding", fullMark: 100 },
        { name: "English", marks: 92, grade: "A+", remarks: "Outstanding essay", fullMark: 100 },
        { name: "History", marks: 85, grade: "A", remarks: "Very good", fullMark: 100 },
        { name: "Computer", marks: 98, grade: "O", remarks: "Exceptional", fullMark: 100 },
      ],
      overallPercentage: 91.6,
      overallGrade: "A+",
      rank: 3,
      totalStudents: 45
    },
    term2: {
      name: "Term 2 - 2024-25",
      subjects: [
        { name: "Mathematics", marks: 98, grade: "O", remarks: "Perfect", fullMark: 100 },
        { name: "Science", marks: 92, grade: "A+", remarks: "Excellent improvement", fullMark: 100 },
        { name: "English", marks: 90, grade: "A+", remarks: "Consistent", fullMark: 100 },
        { name: "History", marks: 88, grade: "A", remarks: "Good effort", fullMark: 100 },
        { name: "Computer", marks: 95, grade: "O", remarks: "Great coding skills", fullMark: 100 },
      ],
      overallPercentage: 92.6,
      overallGrade: "O",
      rank: 2,
      totalStudents: 45
    }
  }

  const currentData = activeTerm === "term1" ? terms.term1 : terms.term2

  const handleDownload = () => {
    toast.success("Downloading report card...", {
      description: "Your PDF report has been generated successfully."
    })
  }

  const chartData = currentData.subjects.map(s => ({
    name: s.name,
    marks: s.marks,
    fullMark: 100,
  }))

  return (
    <DashboardLayout title="Report">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Academic Report
            </h2>
            <p className="text-muted-foreground mt-1">Detailed performance analysis and report card</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="term1" className="space-y-6" onValueChange={setActiveTerm}>
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="term1">Term 1</TabsTrigger>
            <TabsTrigger value="term2">Term 2</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTerm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard title="Overall Grade" value={currentData.overallGrade} icon={Award} iconColor="text-green-600" iconBgColor="bg-green-100" />
              <StatCard title="Percentage" value={`${currentData.overallPercentage}%`} icon={TrendingUp} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
              <StatCard title="Class Rank" value={`#${currentData.rank}`} icon={Award} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
              <StatCard title="Total Subjects" value={currentData.subjects.length.toString()} icon={FileText} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Report Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" /> Subject-wise Performance
                  </CardTitle>
                  <CardDescription>Detailed breakdown of your marks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {currentData.subjects.map((subject, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="font-semibold">{subject.name}</div>
                          <div className="flex gap-4">
                            <span className="text-muted-foreground font-normal">{subject.remarks}</span>
                            <span className="font-bold text-blue-600">{subject.marks}/{subject.fullMark}</span>
                          </div>
                        </div>
                        <Progress value={subject.marks} className="h-2.5" />
                      </div>
                    ))}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg border flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">CGPA (Calculated)</span>
                        <div className="text-2xl font-bold">{(currentData.overallPercentage / 9.5).toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Result Status</span>
                        <div className="text-lg font-bold text-green-600 uppercase">PASS</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charts */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" /> Performance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                          cursor={{ fill: '#f3f4f6' }}
                        />
                        <Bar dataKey="marks" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-500" /> Skill Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" fontSize={12} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Marks" dataKey="marks" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

            </div>

          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
