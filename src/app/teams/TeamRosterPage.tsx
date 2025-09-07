'use client';
import React from 'react';
import { Typography, Box, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider, Alert } from '@mui/material';
import { PlusCircle, Users, ChevronDown, Zap, CheckCircle } from 'lucide-react';

const initialTeams = [
  { name: 'Frontend Wizards', isSyncedWithOkta: true, members: [ { name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin' }, { name: 'Bob Williams', email: 'bob.w@example.com', role: 'Editor' } ] },
  { name: 'API Guardians', isSyncedWithOkta: false, members: [{ name: 'Diana Prince', email: 'diana.p@example.com', role: 'Editor' }] },
];

const getAvatarLetters = (name: string) => name.split(' ').map(n => n[0]).join('') || '?';

export default function TeamRosterPage() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Teams</Typography>
        <Button variant="contained" startIcon={<PlusCircle />}>New Team</Button>
      </Box>
      <Alert severity="info" sx={{ mb: 3 }}>Sync Okta groups to automatically manage members.</Alert>
      {initialTeams.map((team, index) => (
        <Accordion key={team.name} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Users sx={{mr: 1.5}}/> <Typography variant="h6">{team.name}</Typography> 
            <Chip icon={team.isSyncedWithOkta ? <CheckCircle /> : <Zap />} label={team.isSyncedWithOkta ? 'Synced' : 'Manual'} size="small" color={team.isSyncedWithOkta ? 'success' : 'default'} sx={{ml:2}}/> 
            <Box sx={{flexGrow:1}}/>
            {!team.isSyncedWithOkta && <Button variant="outlined" size="small" startIcon={<Zap/>} onClick={e=>e.stopPropagation()}>Sync with Okta</Button>}
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <List>
              {team.members.map(member => (
                <ListItem key={member.email}>
                  <ListItemAvatar><Avatar>{getAvatarLetters(member.name)}</Avatar></ListItemAvatar>
                  <ListItemText primary={member.name} secondary={member.email}/>
                  <Chip label={member.role} size="small"/>
                </ListItem>
              ))}
              <ListItem><Button size="small">Manage Members</Button></ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
