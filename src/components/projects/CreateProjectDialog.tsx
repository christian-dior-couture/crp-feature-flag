'use client';
// This file content remains largely the same, just a name change
// from CreateProjectModal to CreateProjectDialog
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

export default function CreateProjectDialog({ open, onClose, onCreate }: { open: boolean, onClose: () => void, onCreate: (name: string) => void }) {
  const [name, setName] = useState('');
  const handleCreate = () => { if(name.trim()) { onCreate(name); onClose(); } };
  return ( <Dialog open={open} onClose={onClose}><DialogTitle>New Project</DialogTitle><DialogContent><TextField autoFocus label="Project Name" fullWidth value={name} onChange={e => setName(e.target.value)}/></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button onClick={handleCreate}>Create</Button></DialogActions></Dialog> );
}
