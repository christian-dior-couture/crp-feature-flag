'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { User } from '@/types/user'
import { fetchCurrentUser, login as apiLogin } from '@/utils/api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for auth token in localStorage
        const token = localStorage.getItem('authToken')
        
        if (token) {
          // Fetch current user data
          const userData = await fetchCurrentUser()
          setUser(userData as User)
        }
      } catch (error) {
        console.error('Auth check failed', error)
        // Clear potentially invalid token
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const success = await apiLogin(email, password)
      
      if (success) {
        // In a real app, we'd get a token back from the API
        localStorage.setItem('authToken', 'demo-token')
        const userData = await fetchCurrentUser()
        setUser(userData as User)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        loading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
