import { createContext, useState, ReactNode } from 'react'
import { FeatureFlag } from '../types'

interface FeatureFlagsContextType {
  flags: FeatureFlag[]
  addFlag: (name: string, description: string) => void
  toggleFlag: (id: string) => void
  deleteFlag: (id: string) => void
}

export const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined)

interface FeatureFlagsProviderProps {
  children: ReactNode
}

const initialFlags: FeatureFlag[] = [
    {
        id: '1',
        name: 'new-user-onboarding',
        description: 'Enables the new multi-step onboarding flow for signed up users.',
        enabled: true,
        createdAt: '2023-10-26T10:00:00Z',
        updatedAt: '2023-10-28T12:30:00Z',
    },
    {
        id: '2',
        name: 'dark-mode-ui',
        description: 'Toggles the experimental dark mode theme for the entire application.',
        enabled: false,
        createdAt: '2023-09-15T09:00:00Z',
        updatedAt: '2023-10-27T18:45:00Z',
    },
    {
        id: '3',
        name: 'real-time-collaboration',
        description: 'Allows users to collaborate on documents in real-time.',
        enabled: true,
        createdAt: '2023-08-01T14:20:00Z',
        updatedAt: '2023-09-30T11:00:00Z',
    },
]

export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const [flags, setFlags] = useState<FeatureFlag[]>(initialFlags)

  const addFlag = (name: string, description: string) => {
    const newFlag: FeatureFlag = {
      id: crypto.randomUUID(),
      name,
      description,
      enabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setFlags((prevFlags) => [newFlag, ...prevFlags])
  }

  const toggleFlag = (id: string) => {
    setFlags((prevFlags) =>
      prevFlags.map((flag) =>
        flag.id === id ? { ...flag, enabled: !flag.enabled, updatedAt: new Date().toISOString() } : flag
      )
    )
  }

  const deleteFlag = (id: string) => {
    setFlags((prevFlags) => prevFlags.filter((flag) => flag.id !== id))
  }

  return (
    <FeatureFlagsContext.Provider value={{ flags, addFlag, toggleFlag, deleteFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
