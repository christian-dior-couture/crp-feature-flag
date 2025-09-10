import { create } from 'zustand';
import { produce } from 'immer';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  environments: Record<string, {
    enabled: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface FlagState {
  flags: FeatureFlag[];
  isModalOpen: boolean;
  editingFlag: FeatureFlag | null;
  openModal: (flag?: FeatureFlag) => void;
  closeModal: () => void;
  addFlag: (flag: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFlag: (flag: FeatureFlag) => void;
  toggleFlag: (flagId: string, environment: string) => void;
}

// Mock Data
const initialFlags: FeatureFlag[] = [
    {
        id: '1',
        name: 'New Dashboard UI',
        description: 'Enable the new dashboard design for users.',
        environments: {
            development: { enabled: true },
            staging: { enabled: false },
            production: { enabled: false },
        },
        createdAt: '2023-11-28T10:00:00Z',
        updatedAt: '2023-11-28T12:30:00Z',
    },
    {
        id: '2',
        name: 'Faster Data Processing',
        description: 'Use the new optimized data processing pipeline.',
        environments: {
            development: { enabled: true },
            staging: { enabled: true },
            production: { enabled: false },
        },
        createdAt: '2023-11-25T15:20:00Z',
        updatedAt: '2023-11-27T09:45:00Z',
    },
];


export const useFlagStore = create<FlagState>((set) => ({
  flags: initialFlags,
  isModalOpen: false,
  editingFlag: null,
  openModal: (flag) => set({ isModalOpen: true, editingFlag: flag || null }),
  closeModal: () => set({ isModalOpen: false, editingFlag: null }),
  addFlag: (flagData) => set(produce((state: FlagState) => {
    const newFlag: FeatureFlag = {
      ...flagData,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.flags.push(newFlag);
  })),
  updateFlag: (updatedFlag) => set(produce((state: FlagState) => {
    const index = state.flags.findIndex(f => f.id === updatedFlag.id);
    if (index !== -1) {
      state.flags[index] = { ...updatedFlag, updatedAt: new Date().toISOString() };
    }
  })),
  toggleFlag: (flagId, environment) => set(produce((state: FlagState) => {
      const flag = state.flags.find(f => f.id === flagId);
      if (flag && flag.environments[environment]) {
          flag.environments[environment].enabled = !flag.environments[environment].enabled;
          flag.updatedAt = new Date().toISOString();
      }
  })),
}));
