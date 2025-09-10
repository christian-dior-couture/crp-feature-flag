'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface IAppContext {
  project: string;
  setProject: (project: string) => void;
  environment: string;
  setEnvironment: (environment: string) => void;
  projects: string[]; // Keep track of all project names
  addProject: (projectName: string) => void;
}

// Create the context with a default undefined value
const AppContext = createContext<IAppContext | undefined>(undefined);

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<string[]>(['WebApp', 'MobileApp', 'Backend API']);
  const [project, setProject] = useState<string>('WebApp');
  const [environment, setEnvironment] = useState<string>('production');

  const addProject = (projectName: string) => {
    if (!projects.includes(projectName)) {
      setProjects(prev => [...prev, projectName]);
    }
  };

  const value = {
    project,
    setProject,
    environment,
    setEnvironment,
    projects,
    addProject
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Create a custom hook for easy consumption of the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
