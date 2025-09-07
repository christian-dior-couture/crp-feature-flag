'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAppConfigurationContext {
  project: string;
  setProject: (project: string) => void;
  environment: string;
  setEnvironment: (environment: string) => void;
  projects: string[];
  addProject: (projectName: string) => void;
}

const AppConfigurationContext = createContext<IAppConfigurationContext | undefined>(undefined);

export function AppConfigurationProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<string[]>(['WebApp', 'MobileApp', 'Backend API']);
  const [project, setProject] = useState<string>('WebApp');
  const [environment, setEnvironment] = useState<string>('production');

  const addProject = (projectName: string) => {
    if (!projects.includes(projectName)) {
      setProjects(prev => [...prev, projectName]);
    }
  };

  const value = { project, setProject, environment, setEnvironment, projects, addProject };

  return <AppConfigurationContext.Provider value={value}>{children}</AppConfigurationContext.Provider>;
}

export function useAppConfiguration() {
  const context = useContext(AppConfigurationContext);
  if (context === undefined) {
    throw new Error('useAppConfiguration must be used within an AppConfigurationProvider');
  }
  return context;
}
