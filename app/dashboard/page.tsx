'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  CircularProgress,
  Tabs,
  Tab,
  Divider
} from '@mui/material'
import DashboardLayout from '@/components/DashboardLayout'
import FlagList from '@/components/FlagList'
import { Plus } from 'lucide-react'
import NewFlagModal from '@/components/NewFlagModal'
import { fetchFlags } from '@/utils/api'
import { FeatureFlag } from '@/types/flag'

export default function Dashboard() {
  const router = useRouter()
  const { isAuthenticated, loading, user } = useAuth()
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [openNewFlagModal, setOpenNewFlagModal] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  // Fetch flags
  useEffect(() => {
    const loadFlags = async () => {
      if (isAuthenticated) {
        setIsLoading(true)
        try {
          const fetchedFlags = await fetchFlags()
          setFlags(fetchedFlags)
        } catch (error) {
          console.error('Failed to fetch flags', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    loadFlags()
  }, [isAuthenticated])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleCreateFlag = (newFlag: FeatureFlag) => {
    setFlags([...flags, newFlag])
  }

  const handleFlagToggle = (flagId: string, enabled: boolean) => {
    setFlags(flags.map(flag => 
      flag.id === flagId ? { ...flag, enabled } : flag
    ))
  }

  const handleFlagDelete = (flagId: string) => {
    setFlags(flags.filter(flag => flag.id !== flagId))
  }

  if (loading || !isAuthenticated) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Feature Flags</Typography>
          <Button 
            variant="contained" 
            startIcon={<Plus size={20} />}
            onClick={() => setOpenNewFlagModal(true)}
          >
            Create Flag
          </Button>
        </Box>

        <Paper elevation={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="feature flag tabs">
              <Tab label="All Flags" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Enabled" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Disabled" id="tab-2" aria-controls="tabpanel-2" />
            </Tabs>
          </Box>
          <Divider />
          
          <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0">
            {tabValue === 0 && (
              <FlagList 
                flags={flags} 
                loading={isLoading} 
                onToggle={handleFlagToggle}
                onDelete={handleFlagDelete}
              />
            )}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1">
            {tabValue === 1 && (
              <FlagList 
                flags={flags.filter(flag => flag.enabled)} 
                loading={isLoading}
                onToggle={handleFlagToggle}
                onDelete={handleFlagDelete}
              />
            )}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 2} id="tabpanel-2" aria-labelledby="tab-2">
            {tabValue === 2 && (
              <FlagList 
                flags={flags.filter(flag => !flag.enabled)} 
                loading={isLoading}
                onToggle={handleFlagToggle}
                onDelete={handleFlagDelete}
              />
            )}
          </Box>
        </Paper>
      </Container>

      <NewFlagModal 
        open={openNewFlagModal} 
        onClose={() => setOpenNewFlagModal(false)} 
        onCreateFlag={handleCreateFlag}
      />
    </DashboardLayout>
  )
}
