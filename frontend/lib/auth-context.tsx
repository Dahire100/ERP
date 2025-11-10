"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "teacher" | "student" | "parent" | "super-admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  schoolId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call an API
    const mockUsers: Record<string, User> = {
      "admin@school.com": {
        id: "1",
        name: "Admin User",
        email: "admin@school.com",
        role: "admin",
        schoolId: "school-1",
      },
      "teacher@school.com": {
        id: "2",
        name: "John Teacher",
        email: "teacher@school.com",
        role: "teacher",
        schoolId: "school-1",
      },
      "student@school.com": {
        id: "3",
        name: "Alice Student",
        email: "student@school.com",
        role: "student",
        schoolId: "school-1",
      },
      "parent@school.com": {
        id: "4",
        name: "Bob Parent",
        email: "parent@school.com",
        role: "parent",
        schoolId: "school-1",
      },
      "superadmin@school.com": {
        id: "5",
        name: "Super Admin",
        email: "superadmin@school.com",
        role: "super-admin",
      },
    }

    const foundUser = mockUsers[email]
    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}