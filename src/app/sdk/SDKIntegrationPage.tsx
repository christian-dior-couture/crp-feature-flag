'use client';
import { Typography, Paper, Tabs, Tab, Box, TextField, IconButton, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

type Environment = 'development' | 'staging' | 'production';

const generateSdkKey = (env: string) => `sdk-${env.substring(0, 3)}-${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
const getCodeSnippets = (sdkKey: string) => ({
    nodeJs: `// Node.js SDK Snippet with key: "${sdkKey}"`,
    react: `// React SDK Snippet with key: "${sdkKey}"`
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (<div role="tabpanel" hidden={value !== index} {...other}>{value === index && (<Box sx={{ p: 3 }}>{children}</Box>)}</div>);
}

export default function SDKIntegrationPage() {
  const { environment } = useAppContext();
  const [tabValue, setTabValue] = useState(0);
  const [sdkKeys, setSdkKeys] = useState<{ [key in Environment]?: string }>({});
  const [isClient, setIsClient] = useState(false);

  const environments: Environment[] = ['development', 'staging', 'production'];

  useEffect(() => {
    setIsClient(true);
    const initialKeys: { [key in Environment]?: string } = {};
    environments.forEach(env => { initialKeys[env] = generateSdkKey(env); });
    setSdkKeys(initialKeys);
  }, []);

  if (!isClient) return null;

  const currentSdkKey = sdkKeys[environment as Environment] || '';
  const codeSnippets = getCodeSnippets(currentSdkKey);

  const handleRegenerateKey = (env: Environment) => {
    if (window.confirm(`Regenerate key for ${env}?`)) {
        setSdkKeys(prev => ({ ...prev, [env]: generateSdkKey(env) }));
    }
  };

  const handleCopy = (key: string) => navigator.clipboard.writeText(key);

  return (
    <div automation-id="sdk-integration-page">
      <Typography variant="h4" gutterBottom>SDK Keys & Implementation</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <List>
            {environments.map((env, i) => (
                <React.Fragment key={env}>
                    <ListItem sx={env === environment ? { bgcolor: 'action.hover', borderRadius: 1 } : {}}>
                        <ListItemText primary={env.charAt(0).toUpperCase() + env.slice(1)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField variant="outlined" size="small" value={sdkKeys[env] || ''} InputProps={{ readOnly: true }} sx={{ width: 400, fontFamily: 'monospace' }} />
                            <IconButton onClick={() => handleCopy(sdkKeys[env] || '')}><Copy size={20} /></IconButton>
                            <IconButton onClick={() => handleRegenerateKey(env)}><RefreshCw size={20} /></IconButton>
                        </Box>
                    </ListItem>
                    {i < environments.length - 1 && <Divider component="li" />}
                </React.Fragment>
            ))}
        </List>
      </Paper>
      <Typography variant="h5" gutterBottom>Code Examples (<Chip label={environment} size="small" color="primary" />)</Typography>
      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}><Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}><Tab label="React" /><Tab label="Node.js" /></Tabs></Box>
        <TabPanel value={tabValue} index={0}><Typography variant="h6">React SDK</Typography><pre><code>{codeSnippets.react}</code></pre></TabPanel>
        <TabPanel value={tabValue} index={1}><Typography variant="h6">Node.js SDK</Typography><pre><code>{codeSnippets.nodeJs}</code></pre></TabPanel>
      </Paper>
    </div>
  );
}
