"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { PlanCard } from "@/components/super-admin/plan-card"
import { ConfirmationDialog } from "@/components/super-admin/confirmation-dialog"
import FormModal from "@/components/form-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, IndianRupee, TrendingUp, Package } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  subscribers: number
  status: string
  revenue: number
  isPopular?: boolean
}

export default function SaaSPlans() {
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: "1", 
      name: "Basic", 
      price: "₹9,900", 
      description: "Perfect for small schools",
      features: [
        "Up to 100 students",
        "5 GB storage",
        "Basic reporting",
        "Email support",
        "Mobile app access"
      ],
      subscribers: 8,
      status: "Active",
      revenue: 792,
      isPopular: false
    },
    { 
      id: "2", 
      name: "Premium", 
      price: "₹29,900", 
      description: "Ideal for growing institutions",
      features: [
        "Up to 500 students",
        "50 GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
        "Automated workflows"
      ],
      subscribers: 12,
      status: "Active",
      revenue: 3588,
      isPopular: true
    },
    { 
      id: "3", 
      name: "Enterprise", 
      price: "Custom", 
      description: "For large educational networks",
      features: [
        "Unlimited students",
        "Unlimited storage",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Training & onboarding",
        "Multi-campus support"
      ],
      subscribers: 4,
      status: "Active",
      revenue: 34000,
      isPopular: false
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ 
    open: false, 
    id: null 
  })

  const handleAdd = (data: any) => {
    const newPlan: Plan = { 
      id: Date.now().toString(), 
      ...data,
      features: data.features.split('\n').filter((f: string) => f.trim()),
      subscribers: 0,
      revenue: 0
    }
    setPlans([...plans, newPlan])
    setIsModalOpen(false)
  }

  const handleEdit = (id: string, data: any) => {
    setPlans(plans.map((p) => (p.id === id ? { 
      ...p, 
      ...data,
      features: typeof data.features === 'string' 
        ? data.features.split('\n').filter((f: string) => f.trim())
        : data.features
    } : p)))
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setDeleteConfirm({ open: true, id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      setPlans(plans.filter((p) => p.id !== deleteConfirm.id))
    }
    setDeleteConfirm({ open: false, id: null })
  }

  const formFields = [
    { name: "name", label: "Plan Name", type: "text" as const, required: true },
    { name: "price", label: "Price", type: "number" as const, required: true },
    { name: "interval", label: "Billing Interval", type: "select" as const, options: [
      { value: "Monthly", label: "Monthly" },
      { value: "Yearly", label: "Yearly" }
    ], required: true },
    { name: "maxStudents", label: "Max Students", type: "number" as const, required: true },
    { name: "maxTeachers", label: "Max Teachers", type: "number" as const, required: true },
    { name: "status", label: "Status", type: "select" as const, options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" }
    ], required: true },
  ]

  // Calculate stats
  const stats = {
    totalPlans: plans.length,
    totalSubscribers: plans.reduce((sum, p) => sum + p.subscribers, 0),
    totalRevenue: plans.reduce((sum, p) => sum + p.revenue, 0),
    activePlans: plans.filter(p => p.status === "Active").length
  }

  return (
    <DashboardLayout title="SaaS Plan Management">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Plans</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalPlans}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Plans</p>
                  <p className="text-2xl font-bold mt-1">{stats.activePlans}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Subscribers</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalSubscribers}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Subscription Plans</h2>
            <p className="text-sm text-muted-foreground">Manage pricing tiers and features</p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null)
              setIsModalOpen(true)
            }}
          >
            <Package className="h-4 w-4 mr-2" />
            Create New Plan
          </Button>
        </div>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList>
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  subscribers={plan.subscribers}
                  isPopular={plan.isPopular}
                  onEdit={() => {
                    setEditingId(plan.id)
                    setIsModalOpen(true)
                  }}
                  onDelete={() => handleDelete(plan.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Comparison</CardTitle>
                <CardDescription>Compare features across all plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Feature</th>
                        {plans.map((plan) => (
                          <th key={plan.id} className="text-center py-3 px-4 font-semibold">
                            {plan.name}
                            <div className="text-xs font-normal text-muted-foreground mt-1">
                              {plan.price}{plan.price !== "Custom" && "/mo"}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Get all unique features */}
                      {Array.from(new Set(plans.flatMap(p => p.features))).map((feature, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4 text-sm">{feature}</td>
                          {plans.map((plan) => (
                            <td key={plan.id} className="text-center py-3 px-4">
                              {plan.features.includes(feature) ? (
                                <span className="text-green-600 text-xl">✓</span>
                              ) : (
                                <span className="text-gray-300 text-xl">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-b bg-muted/50">
                        <td className="py-3 px-4 font-semibold">Subscribers</td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="text-center py-3 px-4 font-semibold">
                            {plan.subscribers}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="py-3 px-4 font-semibold">Monthly Revenue</td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="text-center py-3 px-4 font-semibold">
                            ${plan.revenue.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit/Add Modal */}
        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingId(null)
          }}
          onSubmit={(data) => (editingId ? handleEdit(editingId, data) : handleAdd(data))}
          fields={formFields}
          title={editingId ? "Edit Plan" : "Create New Plan"}
          initialData={editingId ? {
            ...plans.find((p) => p.id === editingId),
            features: plans.find((p) => p.id === editingId)?.features.join('\n')
          } : {}}
        />

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open, id: null })}
          title="Delete Plan"
          description="Are you sure you want to delete this plan? Existing subscribers will need to be migrated to another plan."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  )
}
