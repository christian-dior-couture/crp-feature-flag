'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (projectName: string) => void;
}

export default function CreateProjectModal({ open, onClose, onCreate }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!projectName.trim()) {
      setError('Project name cannot be empty.');
      return;
    }
    onCreate(projectName);
    handleClose();
  };

  const handleClose = () => {
    setProjectName('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} automation-id="create-project-modal">
      <DialogTitle>Create a New Project</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Enter a name for your new project. This will be used to group your feature flags.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Project Name"
          type="text"
          fullWidth
          variant="outlined"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          helperText={error}
          automation-id="project-name-input"
        />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
