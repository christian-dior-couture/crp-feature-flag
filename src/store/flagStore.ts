import { create } from 'zustand'
import { featureFlags as initialFlags } from '../data/mockData'
import { FeatureFlag, Environment } from '../types'

interface FlagState {
  flags: FeatureFlag[]
  selectedFlag: FeatureFlag | null
  selectedEnvironment: Environment
  isCreatingFlag: boolean
  isEditingFlag: boolean
  
  setSelectedEnvironment: (env: Environment) => void
  setSelectedFlag: (flag: FeatureFlag | null) => void
  setIsCreatingFlag: (isCreating: boolean) => void
  setIsEditingFlag: (isEditing: boolean) => void
  
  toggleFlag: (flagId: string, env: Environment) => void
  createFlag: (flag: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFlag: (flag: FeatureFlag) => void
  deleteFlag: (flagId: string) => void
}

export const useFlagStore = create<FlagState>((set) => ({
  flags: [...initialFlags],
  selectedFlag: null,
  selectedEnvironment: 'development',
  isCreatingFlag: false,
  isEditingFlag: false,
  
  setSelectedEnvironment: (env) => set({ selectedEnvironment: env }),
  setSelectedFlag: (flag) => set({ selectedFlag: flag }),
  setIsCreatingFlag: (isCreating) => set({ isCreatingFlag: isCreating }),
  setIsEditingFlag: (isEditing) => set({ isEditingFlag: isEditing }),
  
  toggleFlag: (flagId, env) => set((state) => ({
    flags: state.flags.map((flag) => {
      if (flag.id === flagId) {
        return {
          ...flag,
          enabled: {
            ...flag.enabled,
            [env]: !flag.enabled[env]
          },
          updatedAt: new Date().toISOString(),
        }
      }
      return flag
    })
  })),
  
  createFlag: (newFlag) => set((state) => ({
    flags: [
      ...state.flags,
      {
        ...newFlag,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    isCreatingFlag: false
  })),
  
  updateFlag: (updatedFlag) => set((state) => ({
    flags: state.flags.map((flag) => 
      flag.id === updatedFlag.id
        ? { ...updatedFlag, updatedAt: new Date().toISOString() }
        : flag
    ),
    isEditingFlag: false,
    selectedFlag: null
  })),
  
  deleteFlag: (flagId) => set((state) => ({
    flags: state.flags.filter((flag) => flag.id !== flagId),
    selectedFlag: null
  })),
}))
