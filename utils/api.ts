import axios from 'axios'
import { FeatureFlag } from '@/types/flag'

// Mock data for the feature flags
const mockFlags: FeatureFlag[] = [
  {
    id: '1',
    name: 'New User Onboarding',
    key: 'new-user-onboarding',
    description: 'Enable the new user onboarding flow with interactive tutorial',
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dark Mode',
    key: 'dark-mode',
    description: 'Enable dark mode theme option for users',
    enabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Beta Features',
    key: 'beta-features',
    description: 'Show beta features to selected users',
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'New Pricing Page',
    key: 'new-pricing-page',
    description: 'Enable the redesigned pricing page',
    enabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Enhanced Analytics',
    key: 'enhanced-analytics',
    description: 'Show advanced analytics and reporting features',
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123'
  }
]

// API functions
export const login = async (email: string, password: string) => {
  // In a real application, this would call an API endpoint
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password)
      resolve(!!user)
    }, 500)
  })
}

export const register = async (name: string, email: string, password: string) => {
  // In a real application, this would call an API endpoint
  return new Promise(resolve => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email)
      if (existingUser) {
        resolve({ success: false, message: 'Email already in use' })
      } else {
        mockUsers.push({
          id: (mockUsers.length + 1).toString(),
          name,
          email,
          password
        })
        resolve({ success: true })
      }
    }, 500)
  })
}

export const fetchCurrentUser = async () => {
  // In a real application, this would call an API endpoint
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ 
        id: '1', 
        name: 'Demo User', 
        email: 'demo@example.com' 
      })
    }, 500)
  })
}

export const fetchFlags = async (): Promise<FeatureFlag[]> => {
  // In a real application, this would call an API endpoint
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockFlags])
    }, 500)
  })
}

export const createFlag = async (flag: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt'>): Promise<FeatureFlag> => {
  // In a real application, this would call an API endpoint
  return new Promise(resolve => {
    setTimeout(() => {
      const newFlag: FeatureFlag = {
        ...flag,
        id: (mockFlags.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockFlags.push(newFlag)
      resolve(newFlag)
    }, 500)
  })
}

export const updateFlag = async (id: string, updates: Partial<FeatureFlag>): Promise<FeatureFlag> => {
  // In a real application, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockFlags.findIndex(f => f.id === id)
      if (index === -1) {
        reject(new Error('Flag not found'))
      } else {
        mockFlags[index] = {
          ...mockFlags[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        resolve(mockFlags[index])
      }
    }, 500)
  })
}

export const deleteFlag = async (id: string): Promise<boolean> => {
  // In a real application, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockFlags.findIndex(f => f.id === id)
      if (index === -1) {
        reject(new Error('Flag not found'))
      } else {
        mockFlags.splice(index, 1)
        resolve(true)
      }
    }, 500)
  })
}
