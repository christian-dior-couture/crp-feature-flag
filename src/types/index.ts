export type Environment = 'development' | 'staging' | 'production'

export type FeatureFlag = {
  id: string
  name: string
  description: string
  key: string
  enabled: Record<Environment, boolean>
  createdAt: string
  updatedAt: string
  createdBy: User
  lastUpdatedBy: User
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'developer' | 'viewer'
  avatarUrl?: string
}

export type Project = {
  id: string
  name: string
  description: string
  createdAt: string
}

export type AuditLog = {
  id: string
  action: 'create' | 'update' | 'delete' | 'toggle'
  resourceType: 'feature_flag' | 'user' | 'project'
  resourceId: string
  resourceName: string
  user: User
  timestamp: string
  details: string
}
