'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Divider,
} from '@mui/material';

interface CreateRoleDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newRole: any) => void;
}

const resourcePermissions = {
  Projects: ['view', 'create', 'edit', 'delete'],
  Flags: ['view', 'create', 'edit', 'delete', 'toggle'],
  Teams: ['view', 'create', 'edit', 'delete', 'manage-members'],
  Roles: ['view', 'create', 'edit', 'delete'],
  Billing: ['view', 'manage'],
};

type Resources = keyof typeof resourcePermissions;

export default function CreateRoleDialog({ open, onClose, onCreate }: CreateRoleDialogProps) {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handlePermissionChange = (permission: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPermissions(prev => [...prev, permission]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permission));
    }
  };

  const validate = () => {
    const newErrors: { name?: string } = {};
    if (!roleName.trim()) {
      newErrors.name = "Role name cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;
    
    const newRole = {
      name: roleName,
      description: description,
      permissions: selectedPermissions,
    };
    onCreate(newRole);
    handleClose();
  };

  const handleClose = () => {
    setRoleName('');
    setDescription('');
    setSelectedPermissions([]);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth automation-id="create-role-dialog">
      <DialogTitle>Create Custom Role</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Role Name"
          type="text"
          fullWidth
          variant="outlined"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" gutterBottom>Permissions</Typography>
        <Divider sx={{ mb: 2 }}/>
        <Grid container spacing={2}>
            {Object.keys(resourcePermissions).map(resource => (
                <Grid item xs={12} sm={6} key={resource}>
                    <Typography variant="subtitle1" gutterBottom>{resource}</Typography>
                    <FormGroup>
                        {resourcePermissions[resource as Resources].map(action => {
                            const permissionString = `${action}:${resource.toLowerCase()}`;
                            return (
                                <FormControlLabel
                                    key={permissionString}
                                    control={
                                        <Checkbox
                                            checked={selectedPermissions.includes(permissionString)}
                                            onChange={(e) => handlePermissionChange(permissionString, e.target.checked)}
                                        />
                                    }
                                    label={action.charAt(0).toUpperCase() + action.slice(1)}
                                />
                            );
                        })}
                    </FormGroup>
                </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">Create Role</Button>
      </DialogActions>
    </Dialog>
  );
}
