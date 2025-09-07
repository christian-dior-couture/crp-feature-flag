'use client';
import React, { useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Chip, Box, Button, Collapse } from '@mui/material';
import { ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import CreateFeatureFlagDialog from '@/components/flags/CreateFeatureFlagDialog';
import DeleteConfirmationDialog from '@/components/flags/DeleteConfirmationDialog';
import { useAppConfiguration } from '@/context/AppConfigurationContext';
import { FeatureFlagRow } from '@/components/flags/FeatureFlagRow';

// Type definitions
type Environment = 'development' | 'staging' | 'production';
export type FeatureFlag = { name: string; type: 'Boolean' | 'String' | 'JSON'; description: string; enabled: { [key in Environment]: boolean }; variations: any[]; targeting: any[] };
type ProjectFlags = { [projectName: string]: FeatureFlag[] };

// Initial Data
const initialFlags: ProjectFlags = {
    'WebApp': [ { name: 'new-signup-flow', type: 'Boolean', description: 'Enables the revamped v2 signup flow.', enabled: { development: true, staging: true, production: true }, variations: [{ value: 'true' }], targeting: [] } ],
    'MobileApp': [ { name: 'enable-face-id', type: 'Boolean', description: 'Enables login with FaceID/TouchID.', enabled: { development: true, staging: false, production: false }, variations: [{ value: 'true' }], targeting: [] } ],
    'Backend API': [],
};

export default function FeatureFlagsListPage() {
  const { project, environment } = useAppConfiguration();
  const [allFlags, setAllFlags] = useState<ProjectFlags>(initialFlags);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState<string | null>(null);

  const currentProjectFlags = allFlags[project] || [];

  const handleCreateFlag = (newFlagData: Omit<FeatureFlag, 'enabled'> & { enabled: boolean }) => {
    const newFlag: FeatureFlag = { ...newFlagData, enabled: { development: newFlagData.enabled, staging: newFlagData.enabled, production: newFlagData.enabled } };
    setAllFlags(prev => ({ ...prev, [project]: [...(prev[project] || []), newFlag] }));
    setCreateDialogOpen(false);
  };
  
  const handleDeleteRequest = (name: string) => { setFlagToDelete(name); setDeleteDialogOpen(true); };
  
  const handleConfirmDelete = () => {
    if (flagToDelete) setAllFlags(prev => ({ ...prev, [project]: (prev[project] || []).filter(f => f.name !== flagToDelete) }));
    setDeleteDialogOpen(false); setFlagToDelete(null);
  };

  const handleToggleFlag = (name: string, enabled: boolean) => {
    setAllFlags(prev => ({ ...prev, [project]: (prev[project] || []).map(f => f.name === name ? { ...f, enabled: { ...f.enabled, [environment]: enabled } } : f) }));
  };

  return (
    <div>
      <CreateFeatureFlagDialog open={isCreateDialogOpen} onClose={() => setCreateDialogOpen(false)} onCreate={handleCreateFlag} />
      <DeleteConfirmationDialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} itemName={flagToDelete || ''} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Feature Flags: <Chip label={project} color="primary" /></Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setCreateDialogOpen(true)}>New Flag</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status ({environment})</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjectFlags.map(flag => <FeatureFlagRow key={flag.name} flag={flag} onDelete={() => handleDeleteRequest(flag.name)} onToggle={e => handleToggleFlag(flag.name, e)} currentEnvironment={environment as Environment} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
