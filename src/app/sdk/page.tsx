'use client';
import { Typography, Paper, Tabs, Tab, Box, TextField, IconButton, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

type Environment = 'development' | 'staging' | 'production';

const generateSdkKey = (env: string) => {
    const envPrefix = env.substring(0, 3);
    return `sdk-${envPrefix}-${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
};

const getCodeSnippets = (sdkKey: string) => ({
    nodeJs: `
// 1. Install the SDK
// pnpm install @bolt-flags/node-sdk

// 2. Initialize the SDK
const { BoltFlagsClient } = require('@bolt-flags/node-sdk');

const boltClient = new BoltFlagsClient({
  sdkKey: "${sdkKey}"
});

async function checkFeature() {
  const userContext = {
    key: 'user-123',
    email: 'test@example.com'
  };

  const isEnabled = await boltClient.booleanVariation('new-signup-flow', userContext, false);

  if (isEnabled) {
    console.log('New signup flow is enabled for this user!');
  } else {
    console.log('Using the old signup flow.');
  }
}

checkFeature();
`,
    react: `
// 1. Install the SDK
// pnpm install @bolt-flags/react-sdk

// 2. Wrap your app in the provider
import { BoltFlagsProvider } from '@bolt-flags/react-sdk';

function App() {
  const userContext = {
    key: 'user-123',
    email: 'test@example.com'
  };

  return (
    <BoltFlagsProvider sdkKey="${sdkKey}" user={userContext}>
      <YourAppComponent />
    </BoltFlags_provider>
  );
}


// 3. Use the hook in your components
import { useFlag } from '@bolt-flags/react-sdk';

function YourAppComponent() {
  const { value: newSignupFlow, loading } = useFlag('new-signup-flow', false);

  if (loading) {
    return <div>Loading flags...</div>;
  }

  return newSignupFlow ? <NewSignup /> : <OldSignup />;
}
`
});


function TabPanel(props: { children?: React.ReactNode; index: number; value: number; }) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (<Box sx={{ p: 3, backgroundColor: '#fdfdfd', border: '1px solid #eee', borderRadius: '4px' }}>{children}</Box>)}
    </div>
  );
}

export default function SdkPage() {
  const { environment } = useAppContext();
  const [tabValue, setTabValue] = useState(0);
  const [sdkKeys, setSdkKeys] = useState<{ [key in Environment]?: string }>({});
  const [isClient, setIsClient] = useState(false); // State to track client-side mounting

  const environments: Environment[] = ['development', 'staging', 'production'];

  // Generate keys only on the client-side after mounting
  useEffect(() => {
    setIsClient(true);
    const initialKeys = {} as { [key in Environment]?: string };
    environments.forEach(env => {
      initialKeys[env] = generateSdkKey(env);
    });
    setSdkKeys(initialKeys);
  }, []); // Empty dependency array ensures this runs only once on the client

  if (!isClient) {
      // Render nothing or a loading state on the server and initial client render
      return null; 
  }

  const currentSdkKey = sdkKeys[environment as Environment] || '';
  const codeSnippets = getCodeSnippets(currentSdkKey);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRegenerateKey = (env: Environment) => {
    if (window.confirm(`Are you sure you want to regenerate the SDK key for ${env}? This action cannot be undone.`)) {
        setSdkKeys(prev => ({ ...prev, [env]: generateSdkKey(env) }));
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
  };
  
  return (
    <div automation-id="sdk-page">
      <Typography variant="h4" gutterBottom>
        SDK Keys & Implementation
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <List>
            {environments.map((env, index) => (
                <React.Fragment key={env}>
                    <ListItem
                        sx={env === environment ? { bgcolor: 'action.hover', borderRadius: 1 } : {}}
                        data-reference={env}
                    >
                        <ListItemText 
                            primary={env.charAt(0).toUpperCase() + env.slice(1)}
                            secondary={`Key for the ${env} environment.`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={sdkKeys[env] || ''}
                                InputProps={{ readOnly: true }}
                                sx={{ width: 400, '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
                                automation-id={`sdk-key-field-${env}`}
                            />
                            <IconButton aria-label="copy" onClick={() => handleCopy(sdkKeys[env] || '')} automation-id={`copy-key-btn-${env}`}>
                                <Copy size={20} />
                            </IconButton>
                            <IconButton aria-label="regenerate" onClick={() => handleRegenerateKey(env)} automation-id={`regen-key-btn-${env}`}>
                                <RefreshCw size={20} />
                            </IconButton>
                        </Box>
                    </ListItem>
                    {index < environments.length - 1 && <Divider component="li" />}
                </React.Fragment>
            ))}
        </List>
      </Paper>

      <Typography variant="h5" gutterBottom>Code Examples</Typography>
      <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
        The snippets below are automatically populated with the key for your currently selected environment: <Chip label={environment} size="small" color="primary" />
      </Typography>
      
      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="sdk tabs">
            <Tab label="React" />
            <Tab label="Node.js" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6">React SDK</Typography>
          <pre><code>{codeSnippets.react}</code></pre>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
           <Typography variant="h6">Node.js SDK</Typography>
           <pre><code>{codeSnippets.nodeJs}</code></pre>
        </TabPanel>
      </Paper>
    </div>
  );
}
