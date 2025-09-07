'use client';
import React, { useState } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch,
  IconButton, Chip, Box, Button, Collapse, TextField, Select, MenuItem, FormControl, Alert
} from '@mui/material';
import { Edit, Save, Trash2, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import CreateFeatureFlagDialog from '@/components/flags/CreateFeatureFlagDialog';
import DeleteConfirmationDialog from '@/components/flags/DeleteConfirmationDialog';
import { useAppContext } from '@/context/AppContext';

type Environment = 'development' | 'staging' | 'production';

type FeatureFlag = {
  name: string;
  type: 'Boolean' | 'String' | 'JSON';
  description: string;
  enabled: { [key in Environment]: boolean; };
  variations: any[];
  targeting: any[];
};

type ProjectFlags = { [projectName: string]: FeatureFlag[]; };

const initialFlags: ProjectFlags = {
    'WebApp': [
        { name: 'new-signup-flow', type: 'Boolean', description: 'Enables the revamped v2 signup flow.', enabled: { development: true, staging: true, production: true }, variations: [{ value: 'true' }, { value: 'false' }], targeting: [] },
        { name: 'homepage-banner-text', type: 'String', description: 'Controls the text on the homepage banner.', enabled: { development: true, staging: false, production: false }, variations: [{ value: 'Welcome to Bolt!', weight: '50' }, { value: 'Get Started Now!', weight: '50' }], targeting: [{'attribute': 'email', 'operator': 'ends_with', 'values': ['@bolt.dev'], serves: 'Welcome to Bolt!'}] }
    ],
    'MobileApp': [ { name: 'enable-face-id', type: 'Boolean', description: 'Enables login with FaceID/TouchID.', enabled: { development: true, staging: false, production: false }, variations: [{ value: 'true' }, { value: 'false' }], targeting: [] } ],
    'Backend API': [ { name: 'rate-limiter-config', type: 'JSON', description: 'JSON configuration for API rate limiting.', enabled: { development: true, staging: true, production: true }, variations: [{ value: JSON.stringify({ requests: 100, per: "minute" }, null, 2), weight: 100 }], targeting: [] } ]
};

function FeatureFlagRow({ row, onDelete, onToggle, currentEnvironment }: { row: FeatureFlag, onDelete: () => void, onToggle: (enabled: boolean) => void, currentEnvironment: Environment }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isEnabledInCurrentEnv = row.enabled[currentEnvironment];

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} data-reference={row.name} automation-id={`flag-row-${row.name}`}>
        <TableCell><IconButton size="small" onClick={() => setOpen(!open)}>{open ? <ChevronUp /> : <ChevronDown />}</IconButton></TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell><Chip label={row.type} size="small" /></TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell><Switch checked={isEnabledInCurrentEnv} onChange={(e) => onToggle(e.target.checked)} disabled={isEditing} /></TableCell>
        <TableCell><IconButton size="small" onClick={() => setIsEditing(!isEditing)}>{isEditing ? <Save color="green" /> : <Edit />}</IconButton><IconButton size="small" onClick={onDelete}><Trash2 color="red" /></IconButton></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open || isEditing} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant="h6">Details & Targeting</Typography>
              <Typography variant="subtitle1" gutterBottom>Variations</Typography>
              {row.variations.map((v, i) => (<Typography key={i} variant="body2">{v.weight ? `${v.weight}%: ` : ''}<code>{String(v.value)}</code></Typography>))}<br/>
              <Typography variant="subtitle1" gutterBottom>Targeting Rules</Typography>
              {row.targeting.length > 0 ? row.targeting.map((r, i) => (<Typography key={i} variant="body2">Serve if <b>{r.attribute}</b> {r.operator.replace('_', ' ')}: <i>{r.values.join(', ')}</i></Typography>)) : <Typography color="text.secondary">No specific targeting.</Typography>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function FeatureFlagsPage() {
  const { project, environment } = useAppContext();
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
    if (flagToDelete) { setAllFlags(prev => ({ ...prev, [project]: (prev[project] || []).filter(f => f.name !== flagToDelete) })); }
    setDeleteDialogOpen(false); setFlagToDelete(null);
  };

  const handleToggleFlag = (name: string, enabled: boolean) => {
    setAllFlags(prev => ({ ...prev, [project]: (prev[project] || []).map(f => f.name === name ? { ...f, enabled: { ...f.enabled, [environment]: enabled } } : f) }));
  };

  return (
    <div automation-id="feature-flags-page">
      <CreateFeatureFlagDialog open={isCreateDialogOpen} onClose={() => setCreateDialogOpen(false)} onCreate={handleCreateFlag} />
      <DeleteConfirmationDialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} itemName={flagToDelete || ''} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Feature Flags for <Chip label={project} color="primary" /></Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setCreateDialogOpen(true)}>New Flag</Button>
      </Box>
      {currentProjectFlags.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead><TableRow><TableCell /><TableCell>Name</TableCell><TableCell>Type</TableCell><TableCell>Description</TableCell><TableCell>Status ({environment})</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
            <TableBody>{currentProjectFlags.map(row => <FeatureFlagRow key={row.name} row={row} onDelete={() => handleDeleteRequest(row.name)} onToggle={e => handleToggleFlag(row.name, e)} currentEnvironment={environment as Environment} />)}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{p: 4, textAlign: 'center'}}><Typography variant="h6">No flags yet.</Typography></Paper>
      )}
    </div>
  );
}
