'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  CircularProgress,
  TextField, 
  Button,
  Divider,
  Alert
} from '@mui/material'
import DashboardLayout from '@/components/DashboardLayout'
import SyntaxHighlighter from '@/components/SyntaxHighlighter'

export default function ApiPage() {
  const router = useRouter()
  const { isAuthenticated, loading, user } = useAuth()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

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

  // API key would be fetched from the backend in a real application
  const apiKey = "ffm_" + (user?.id || "demo") + "_" + Math.random().toString(36).substring(2, 10)

  const nodejsExample = `const axios = require('axios');

const fetchFeatureFlags = async () => {
  try {
    const response = await axios.get('https://api.yourfeatureflags.com/flags', {
      headers: {
        'Authorization': 'Bearer ${apiKey}'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return {};
  }
};

// Check if a feature is enabled
const isFeatureEnabled = (flags, featureName, defaultValue = false) => {
  return flags[featureName]?.enabled ?? defaultValue;
};

// Usage example
async function main() {
  const flags = await fetchFeatureFlags();
  
  if (isFeatureEnabled(flags, 'new-user-onboarding')) {
    // Show new onboarding experience
    showNewOnboarding();
  } else {
    // Show existing experience
    showExistingOnboarding();
  }
}`;

  const reactExample = `import { useState, useEffect } from 'react';
import axios from 'axios';

// Feature Flag Hook
function useFeatureFlags() {
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get('https://api.yourfeatureflags.com/flags', {
          headers: {
            'Authorization': 'Bearer ${apiKey}'
          }
        });
        
        setFlags(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    
    fetchFlags();
  }, []);
  
  const isEnabled = (flagName, defaultValue = false) => {
    return flags[flagName]?.enabled ?? defaultValue;
  };
  
  return { isEnabled, loading, error };
}

// Component using the hook
function MyComponent() {
  const { isEnabled, loading } = useFeatureFlags();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isEnabled('new-design') ? (
        <NewDesign />
      ) : (
        <OldDesign />
      )}
      
      {isEnabled('beta-feature') && <BetaFeature />}
    </div>
  );
}`;

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>API Integration</Typography>
        <Typography variant="body1" paragraph>
          Integrate feature flags into your application using our simple API. Below you'll find your API key and example code for different languages and frameworks.
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Your API Key</Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Keep your API key secret. It should only be used in server-side code or secure environments.
          </Alert>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={apiKey}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button 
              variant="contained" 
              sx={{ ml: 1 }}
              onClick={() => navigator.clipboard.writeText(apiKey)}
            >
              Copy
            </Button>
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom>Integration Examples</Typography>
        
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Node.js</Typography>
          <SyntaxHighlighter language="javascript" code={nodejsExample} />
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>React</Typography>
          <SyntaxHighlighter language="javascript" code={reactExample} />
        </Paper>
      </Container>
    </DashboardLayout>
  )
}
