'use client';
import React, { useState } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, IconButton, Tooltip, Chip
} from '@mui/material';
import { PlusCircle, Edit, Trash2, ShieldCheck } from 'lucide-react';
import CreateRoleModal from '@/components/teams/CreateRoleModal';

const initialRoles = [
  {
    name: 'Admin',
    description: 'Full access to all projects and settings.',
    permissions: ['create:projects', 'delete:projects', 'manage:billing', 'manage:teams', 'manage:flags'],
  },
  {
    name: 'Editor',
    description: 'Can create, edit, and toggle feature flags within assigned projects.',
    permissions: ['manage:flags'],
  },
  {
    name: 'Viewer',
    description: 'Read-only access. Can view flags and their configurations but cannot make changes.',
    permissions: ['view:flags'],
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRole = (newRole: any) => {
    setRoles(prevRoles => [...prevRoles, newRole]);
  };

  return (
    <div automation-id="roles-page">
      <CreateRoleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRole}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Roles & Permissions
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />} 
          onClick={() => setIsModalOpen(true)}
          automation-id="new-role-btn"
        >
          New Role
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.name} data-reference={role.name}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ShieldCheck size={16} style={{ marginRight: '8px' }} />
                    {role.name}
                  </Box>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {role.permissions.map(p => <Chip key={p} label={p} size="small" />)}
                    </Box>
                </TableCell>
                <TableCell>
                    <Tooltip title="Edit Role">
                        <IconButton size="small"><Edit /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Role">
                        <IconButton size="small"><Trash2 color="red" /></IconButton>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
