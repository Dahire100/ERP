"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { StatCard } from "@/components/super-admin/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export default function StudentWallet() {
  const transactions = [
    { id: 1, type: "Credit", amount: 100, date: "2024-11-05", description: "Added by parent" },
    { id: 2, type: "Debit", amount: 25, date: "2024-11-04", description: "Canteen purchase" },
    { id: 3, type: "Credit", amount: 50, date: "2024-11-03", description: "Scholarship" },
    { id: 4, type: "Debit", amount: 15, date: "2024-11-02", description: "Stationery" },
    { id: 5, type: "Debit", amount: 30, date: "2024-11-01", description: "Books" },
  ]

  const balance = 250
  const totalCredit = transactions.filter(t => t.type === "Credit").reduce((sum, t) => sum + t.amount, 0)
  const totalDebit = transactions.filter(t => t.type === "Debit").reduce((sum, t) => sum + t.amount, 0)

  return (
    <DashboardLayout title="Student Wallet">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            My Wallet
          </h2>
          <p className="text-muted-foreground mt-1">Manage your wallet and transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Balance" value={`$${balance}`} icon={Wallet} iconColor="text-green-600" iconBgColor="bg-green-100" />
          <StatCard title="Total Credit" value={`$${totalCredit}`} icon={TrendingUp} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
          <StatCard title="Total Debit" value={`$${totalDebit}`} icon={TrendingDown} iconColor="text-red-600" iconBgColor="bg-red-100" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />Transaction History</CardTitle>
            <CardDescription>Recent wallet transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === "Credit" ? "bg-green-100" : "bg-red-100"}`}>
                      {tx.type === "Credit" ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${tx.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "Credit" ? "+" : "-"}${tx.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${tx.type === "Credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {tx.type}
                    </span>
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
