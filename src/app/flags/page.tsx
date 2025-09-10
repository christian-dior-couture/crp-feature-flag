'use client';
import React, { useState } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch,
  IconButton, Chip, Box, Button, Collapse, TextField, Select, MenuItem, FormControl, Alert
} from '@mui/material';
import { Edit, Save, Trash2, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import CreateFlagModal from '@/components/flags/CreateFlagModal';
import DeleteConfirmationDialog from '@/components/flags/DeleteConfirmationDialog';
import { useAppContext } from '@/context/AppContext';

type Environment = 'development' | 'staging' | 'production';

// Update the shape of a Flag
type Flag = {
  name: string;
  type: 'Boolean' | 'String' | 'JSON';
  description: string;
  // `enabled` is now an object mapping environment to a boolean
  enabled: {
    [key in Environment]: boolean;
  };
  variations: any[];
  targeting: any[];
};

type ProjectFlags = {
  [projectName:string]: Flag[];
};

// Update initial data to reflect the new `enabled` structure
const initialFlags: ProjectFlags = {
    'WebApp': [
        { name: 'new-signup-flow', type: 'Boolean', description: 'Enables the revamped v2 signup flow.', enabled: { development: true, staging: true, production: true }, variations: [{ value: 'true' }, { value: 'false' }], targeting: [] },
        { name: 'homepage-banner-text', type: 'String', description: 'Controls the text on the homepage banner.', enabled: { development: true, staging: false, production: false }, variations: [{ value: 'Welcome to Bolt!', weight: '50' }, { value: 'Get Started Now!', weight: '50' }], targeting: [{'attribute': 'email', 'operator': 'ends_with', 'values': ['@bolt.dev'], serves: 'Welcome to Bolt!'}] }
    ],
    'MobileApp': [
        { name: 'enable-face-id', type: 'Boolean', description: 'Enables login with FaceID/TouchID.', enabled: { development: true, staging: false, production: false }, variations: [{ value: 'true' }, { value: 'false' }], targeting: [] }
    ],
    'Backend API': [
        { name: 'rate-limiter-config', type: 'JSON', description: 'JSON configuration for API rate limiting.', enabled: { development: true, staging: true, production: true }, variations: [{ value: JSON.stringify({ requests: 100, per: "minute" }, null, 2), weight: 100 }], targeting: [] }
    ]
};


function FlagRow({ row, onDelete, onToggle, currentEnvironment }: { row: Flag, onDelete: () => void, onToggle: (enabled: boolean) => void, currentEnvironment: Environment }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // The switch now reflects the status for the current environment
  const isEnabledInCurrentEnv = row.enabled[currentEnvironment];

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} data-reference={row.name} automation-id={`flag-row-${row.name}`}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell><Chip label={row.type} size="small" /></TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>
          <Switch
            checked={isEnabledInCurrentEnv}
            onChange={(e) => onToggle(e.target.checked)}
            disabled={isEditing}
            automation-id={`toggle-switch-${row.name}`}
          />
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Save color="green" /> : <Edit />}
          </IconButton>
          <IconButton size="small" onClick={onDelete} automation-id={`delete-btn-${row.name}`}>
            <Trash2 color="red" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open || isEditing} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details & Targeting
              </Typography>
              <Typography variant="subtitle1" gutterBottom>Variations</Typography>
              {row.variations.map((variation, index) => (
                isEditing ? (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <TextField defaultValue={variation.value} label="Value" fullWidth size="small"/>
                    <TextField defaultValue={variation.weight} label="Weight" size="small" sx={{width: 100}}/>
                  </Box>
                ) : (
                  <Typography key={index} variant="body2">{variation.weight ? `${variation.weight}%: ` : ''}<code>{String(variation.value)}</code></Typography>
                )
              ))}<br/>
              <Typography variant="subtitle1" gutterBottom>Targeting Rules</Typography>
              {row.targeting.length > 0 ? row.targeting.map((rule, index) => (
                 isEditing ? (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <TextField defaultValue={rule.attribute} label="Attribute" size="small"/>
                    <FormControl size="small">
                      <Select defaultValue={rule.operator}>
                        <MenuItem value="is">is</MenuItem><MenuItem value="is_not">is not</MenuItem><MenuItem value="ends_with">ends with</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField defaultValue={rule.values.join(', ')} label="Values" size="small" fullWidth/>
                  </Box>
                 ) : (
                  <Typography key={index} variant="body2">Serve variation if <b>{rule.attribute}</b> {rule.operator.replace('_', ' ')}: <i>{rule.values.join(', ')}</i></Typography>
                 )
              )) : <Typography variant="body2" color="text.secondary">No specific targeting rules. Flag applies to all users.</Typography>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


export default function FlagsPage() {
  // Get both project and environment from the global context
  const { project, environment } = useAppContext();
  const [allFlags, setAllFlags] = useState<ProjectFlags>(initialFlags);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState<string | null>(null);

  const currentProjectFlags = allFlags[project] || [];

  const handleCreateFlag = (newFlagData: Omit<Flag, 'enabled'> & { enabled: boolean }) => {
    // Construct the full Flag object with the environment-specific enabled status
    const newFlag: Flag = {
        ...newFlagData,
        enabled: {
            development: newFlagData.enabled, // Or some other default logic
            staging: newFlagData.enabled,
            production: newFlagData.enabled,
        }
    };

    setAllFlags(prevAllFlags => {
      const projectFlags = prevAllFlags[project] ? [...prevAllFlags[project]] : [];
      projectFlags.push(newFlag);
      return { ...prevAllFlags, [project]: projectFlags };
    });
    setIsCreateModalOpen(false);
}

  const handleDeleteRequest = (flagName: string) => {
    setFlagToDelete(flagName);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (flagToDelete) {
      setAllFlags(prevAllFlags => {
        const updatedProjectFlags = (prevAllFlags[project] || []).filter(flag => flag.name !== flagToDelete);
        return { ...prevAllFlags, [project]: updatedProjectFlags };
      });
    }
    setIsDeleteModalOpen(false);
    setFlagToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setFlagToDelete(null);
  };
  
  const handleToggleFlag = (flagName: string, newEnabledState: boolean) => {
    setAllFlags(prevAllFlags => {
      const projectFlags = (prevAllFlags[project] || []).map(flag => {
        if (flag.name === flagName) {
          // Update the status only for the current environment
          const updatedEnabled = { ...flag.enabled, [environment]: newEnabledState };
          return { ...flag, enabled: updatedEnabled };
        }
        return flag;
      });
      return { ...prevAllFlags, [project]: projectFlags };
    });
  };

  return (
    <div automation-id="flags-page">
      <CreateFlagModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateFlag} />
      <DeleteConfirmationDialog open={isDeleteModalOpen} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} itemName={flagToDelete || ''} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Feature Flags for <Chip label={project} color="primary" />
        </Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setIsCreateModalOpen(true)}>
          New Flag
        </Button>
      </Box>

      {currentProjectFlags.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                {/* The status column now reflects the current environment */}
                <TableCell>Status ({environment})</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProjectFlags.map((row) => (
                <FlagRow 
                  key={row.name} 
                  row={row} 
                  onDelete={() => handleDeleteRequest(row.name)} 
                  onToggle={(enabled) => handleToggleFlag(row.name, enabled)}
                  currentEnvironment={environment as Environment}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{p: 4, textAlign: 'center'}}>
          <Typography variant="h6">No flags yet for this project.</Typography>
          <Typography color="text.secondary">Ready to add one? Click the "New Flag" button to get started.</Typography>
        </Paper>
      )}
    </div>
  );
}
