'use client';
import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Chip, Switch, Collapse, Box, Typography } from '@mui/material';
import { ChevronDown, ChevronUp, Edit, Save, Trash2 } from 'lucide-react';
import type { FeatureFlag } from '@/app/flags/FeatureFlagsListPage';

type Environment = 'development' | 'staging' | 'production';

interface FeatureFlagRowProps {
  flag: FeatureFlag;
  onDelete: () => void;
  onToggle: (enabled: boolean) => void;
  currentEnvironment: Environment;
}

export function FeatureFlagRow({ flag, onDelete, onToggle, currentEnvironment }: FeatureFlagRowProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const isEnabledInCurrentEnv = flag.enabled[currentEnvironment];

  return (
    <React.Fragment>
      <TableRow>
        <TableCell><IconButton size="small" onClick={() => setOpen(!open)}>{open ? <ChevronUp /> : <ChevronDown />}</IconButton></TableCell>
        <TableCell>{flag.name}</TableCell>
        <TableCell><Chip label={flag.type} size="small" /></TableCell>
        <TableCell>{flag.description}</TableCell>
        <TableCell><Switch checked={isEnabledInCurrentEnv} onChange={(e) => onToggle(e.target.checked)} /></TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setIsEditing(!isEditing)} aria-label={`edit ${flag.name}`}>{isEditing ? <Save color="green" /> : <Edit />}</IconButton>
          <IconButton size="small" onClick={onDelete} aria-label={`delete ${flag.name}`}><Trash2 color="red" /></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2 }}>
                <Typography variant="h6" gutterBottom>Details for {flag.name}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
