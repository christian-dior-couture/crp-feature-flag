'use client';
import React, { useState } from 'react';
import {
  Typography, Paper, Box, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider, Alert
} from '@mui/material';
import { PlusCircle, Users, ChevronDown, Zap, CheckCircle } from 'lucide-react';

const initialTeams = [
  { 
    name: 'Frontend Wizards', 
    isSyncedWithOkta: true,
    members: [
      { name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin' },
      { name: 'Bob Williams', email: 'bob.w@example.com', role: 'Editor' },
      { name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Editor' },
    ]
  },
  { 
    name: 'API Guardians', 
    isSyncedWithOkta: false,
    members: [
      { name: 'Diana Prince', email: 'diana.p@example.com', role: 'Editor' },
      { name: 'Eve Adams', email: 'eve.a@example.com', role: 'Viewer' },
    ]
  },
  { 
    name: 'Mobile Mavericks', 
    isSyncedWithOkta: false,
    members: [
      { name: 'Frank Miller', email: 'frank.m@example.com', role: 'Editor' },
      { name: 'Grace Hopper', email: 'grace.h@example.com', role: 'Viewer' },
    ]
  },
];

const getAvatarLetters = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
}

export default function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams);

  return (
    <div automation-id="teams-page">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Teams
        </Typography>
        <Button variant="contained" startIcon={<PlusCircle />}>
          New Team
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Sync your Okta groups as teams to automatically manage members and permissions.
      </Alert>

      {teams.map((team, index) => (
        <Accordion key={team.name} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mr: 2 }}>
              <Users size={20} style={{ marginRight: '12px' }}/>
              <Typography variant="h6">{team.name}</Typography>
              <Chip
                icon={team.isSyncedWithOkta ? <CheckCircle size={16} /> : <Zap size={16} />}
                label={team.isSyncedWithOkta ? 'Synced with Okta' : 'Manual'}
                size="small"
                color={team.isSyncedWithOkta ? 'success' : 'default'}
                sx={{ ml: 2 }}
              />
              <Box sx={{ flexGrow: 1 }} />
              {!team.isSyncedWithOkta && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<Zap size={16} />}
                  onClick={(e) => e.stopPropagation()} // Prevent accordion from toggling
                >
                  Sync with Okta
                </Button>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <List>
              {team.members.map((member) => (
                <ListItem key={member.email}>
                  <ListItemAvatar>
                    <Avatar>{getAvatarLetters(member.name)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={member.name}
                    secondary={member.email}
                  />
                  <Chip label={member.role} size="small"/>
                </ListItem>
              ))}
              <ListItem>
                 <Button size="small" variant="text">Manage Members</Button>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
