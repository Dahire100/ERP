"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { navigationByRole } from "@/lib/navigation"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Menu, Bell, Search, Settings, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const getRoleGradient = (role: string) => {
    switch (role) {
      case 'school_admin':
      case 'super_admin':
        return 'from-blue-600 to-purple-600'
      case 'teacher':
        return 'from-purple-600 to-pink-600'
      case 'student':
        return 'from-green-600 to-blue-600'
      case 'parent':
        return 'from-blue-600 to-purple-600'
      default:
        return 'from-blue-600 to-purple-600'
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  const navItems = navigationByRole[user.role]

  const getRolePath = (role: string) => {
    switch (role) {
      case 'school_admin': return 'admin'
      case 'super_admin': return 'super-admin'
      default: return role
    }
  }

  const rolePath = getRolePath(user.role)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col overflow-hidden shadow-sm`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRoleGradient(user.role)} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <h1 className="font-bold text-lg bg-gradient-to-r ${getRoleGradient(user.role)} bg-clip-text text-transparent">School MS</h1>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          {sidebarOpen ? (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">Navigation</p>
              <nav className="space-y-0.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href))
                  const isExpanded = expandedMenu === item.label || isActive

                  return (
                    <div key={item.href}>
                      {item.subItems ? (
                        <>
                          <button
                            onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? `bg-blue-50 text-blue-700` : 'text-gray-700 hover:bg-gray-100'
                              }`}
                          >
                            <span>{item.label}</span>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>

                          {isExpanded && (
                            <div className="pl-4 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                              {item.subItems.map((subItem) => {
                                const isSubActive = pathname === subItem.href
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${isSubActive
                                      ? `text-blue-700 font-medium bg-blue-50`
                                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                      }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                            ? `bg-gradient-to-r ${getRoleGradient(user.role)} text-white shadow-sm`
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          ) : (
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all ${isActive
                      ? `bg-gradient-to-r ${getRoleGradient(user.role)} text-white shadow-sm`
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className="text-xs font-bold">{item.label.substring(0, 2).toUpperCase()}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="space-y-2">
              <Link href={`/dashboard/${rolePath}/profile`} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient(user.role)} text-white text-xs font-bold`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role.replace('-', ' ')}</p>
                </div>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50">
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user.name.split(' ')[0]}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/dashboard/${rolePath}/notifications`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" title="Notifications">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link href={`/dashboard/${rolePath}/settings`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Settings">
                <Settings size={20} className="text-gray-600" />
              </Link>
              <Link href={`/dashboard/${rolePath}/profile`} className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={`bg-gradient-to-br ${getRoleGradient(user.role)} text-white font-bold`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role.replace('-', ' ')}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  )
}
