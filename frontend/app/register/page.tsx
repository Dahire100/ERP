"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    contactNumber: "",
    email: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    schoolType: "private",
    boardType: "cbse",
    establishmentYear: "",
    description: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      router.push("/register/success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-4xl font-bold text-primary mb-8">FRONTIERLMS</div>
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Register Your School</CardTitle>
            <CardDescription>
              Fill out the form below to register your school. Our team will review your application
              and contact you with login credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">School Name</label>
                  <Input
                    placeholder="Enter school name"
                    value={formData.schoolName}
                    onChange={handleInputChange("schoolName")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter school email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleInputChange("contactNumber")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">School Type</label>
                  <Select
                    value={formData.schoolType}
                    onValueChange={handleSelectChange("schoolType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select school type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Board Type</label>
                  <Select
                    value={formData.boardType}
                    onValueChange={handleSelectChange("boardType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select board type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="icse">ICSE</SelectItem>
                      <SelectItem value="state">State Board</SelectItem>
                      <SelectItem value="ib">IB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Establishment Year</label>
                  <Input
                    type="number"
                    placeholder="Year of establishment"
                    value={formData.establishmentYear}
                    onChange={handleInputChange("establishmentYear")}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    placeholder="Enter school address"
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange("city")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Input
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleInputChange("state")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={handleInputChange("country")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">PIN Code</label>
                  <Input
                    placeholder="Enter PIN code"
                    value={formData.pinCode}
                    onChange={handleInputChange("pinCode")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Principal Name</label>
                  <Input
                    placeholder="Enter principal's name"
                    value={formData.principalName}
                    onChange={handleInputChange("principalName")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Principal Email</label>
                  <Input
                    type="email"
                    placeholder="Enter principal's email"
                    value={formData.principalEmail}
                    onChange={handleInputChange("principalEmail")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Principal Phone</label>
                  <Input
                    type="tel"
                    placeholder="Enter principal's phone"
                    value={formData.principalPhone}
                    onChange={handleInputChange("principalPhone")}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">School Description</label>
                  <Textarea
                    placeholder="Enter school description"
                    value={formData.description}
                    onChange={handleInputChange("description")}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Registration"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="flex-1"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}