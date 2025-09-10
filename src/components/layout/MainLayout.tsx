'use client';
import React, { useState } from 'react';
import {
  Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, Select, MenuItem, FormControl, InputLabel, Collapse
} from '@mui/material';
import { Flag, Rocket, Code, Users, ChevronDown, ChevronUp, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

const drawerWidth = 240;

// Update navItems to support children for nested menus
const navItems = [
  { text: 'Projects', icon: <Rocket size={20} />, href: '/' },
  { text: 'Feature Flags', icon: <Flag size={20} />, href: '/flags' },
  {
    text: 'Teams & Members',
    icon: <Users size={20} />,
    href: '/teams',
    children: [
       { text: 'Teams', icon: <Users size={18} />, href: '/teams' },
       { text: 'Roles', icon: <ShieldCheck size={18} />, href: '/teams/roles' },
    ],
  },
  { text: 'SDK', icon: <Code size={20} />, href: '/sdk' },
];

const NavItem = ({ item, isChild = false }: { item: any, isChild?: boolean }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname.startsWith(item.href));
  
  // A more precise check for selection
  const isSelected = item.children ? pathname.startsWith(item.href) : pathname === item.href;

  const handleClick = (e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault(); // Prevent navigation if it has children, let the Link on child do it
      setOpen(!open);
    }
  };

  const linkProps = item.children ? { onClick: handleClick } : { component: Link, href: item.href, onClick: handleClick };

  return (
    <>
      <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          {...linkProps}
          component={item.children ? 'a' : Link} // Use 'a' tag for parents to allow click handling
          href={item.href} // Always have href for routing
          selected={isSelected}
          sx={{
            pl: isChild ? 4 : 2,
            '&.Mui-selected': {
              backgroundColor: 'rgba(85, 108, 214, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(85, 108, 214, 0.3)',
              },
            },
            margin: '4px 8px',
            borderRadius: '4px',
          }}
          automation-id={`nav-${item.text.toLowerCase().replace(/ & | /g, '-')}`}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {item.children && (open ? <ChevronUp /> : <ChevronDown />)}
        </ListItemButton>
      </ListItem>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: any) => (
              <NavItem key={child.text} item={child} isChild={true} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { project, setProject, environment, setEnvironment, projects } = useAppContext();

  return (
    <Box sx={{ display: 'flex' }} automation-id="main-layout">
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: 'black', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Rocket color="#556cd6" style={{ marginRight: '10px' }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            BoltFlags
          </Typography>
          <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Project</InputLabel>
            <Select value={project} label="Project" onChange={(e) => setProject(e.target.value)}>
              {projects.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Environment</InputLabel>
            <Select value={environment} label="Environment" onChange={(e) => setEnvironment(e.target.value)}>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="staging">Staging</MenuItem>
              <MenuItem value="production">Production</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1C2536', color: '#fff' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <NavItem key={item.text} item={item} />
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
