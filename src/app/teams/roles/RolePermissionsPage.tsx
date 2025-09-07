'use client';
import React, { useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, IconButton, Tooltip, Chip } from '@mui/material';
import { PlusCircle, Edit, Trash2, ShieldCheck } from 'lucide-react';
import CreateRoleDialog from '@/components/teams/CreateRoleDialog';

const initialRoles = [ { name: 'Admin', description: 'Full access.', permissions: ['manage:all'] }, { name: 'Editor', description: 'Can manage flags.', permissions: ['manage:flags'] } ];

export default function RolePermissionsPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleCreateRole = (newRole: any) => setRoles(prev => [...prev, newRole]);

  return (
    <div>
      <CreateRoleDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} onCreate={handleCreateRole} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Roles & Permissions</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setDialogOpen(true)}>New Role</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table><TableHead><TableRow><TableCell>Role</TableCell><TableCell>Description</TableCell><TableCell>Permissions</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
          <TableBody>{roles.map(role => (
            <TableRow key={role.name}><TableCell><ShieldCheck sx={{mr:1}}/>{role.name}</TableCell><TableCell>{role.description}</TableCell><TableCell><Box sx={{display:'flex', gap:0.5}}>{role.permissions.map(p=><Chip key={p} label={p} size="small"/>)}</Box></TableCell><TableCell><Tooltip title="Edit"><IconButton><Edit/></IconButton></Tooltip></TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
