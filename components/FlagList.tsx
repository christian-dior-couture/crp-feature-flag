'use client'

import { useState } from 'react'
import { 
  Box, 
  CircularProgress, 
  List, 
  ListItem,
  ListItemText,
  Typography,
  Switch,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  ListItemSecondaryAction
} from '@mui/material'
import { MoreVertical, Trash2, Edit, Copy } from 'lucide-react'
import { FeatureFlag } from '@/types/flag'
import { updateFlag, deleteFlag } from '@/utils/api'

interface FlagListProps {
  flags: FeatureFlag[]
  loading: boolean
  onToggle: (flagId: string, enabled: boolean) => void
  onDelete: (flagId: string) => void
}

export default function FlagList({ flags, loading, onToggle, onDelete }: FlagListProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, flag: FeatureFlag) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedFlag(flag)
  }
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }
  
  const handleToggle = async (flag: FeatureFlag) => {
    try {
      await updateFlag(flag.id, { enabled: !flag.enabled })
      onToggle(flag.id, !flag.enabled)
    } catch (error) {
      console.error('Failed to toggle flag', error)
    }
  }
  
  const handleDeleteClick = () => {
    handleMenuClose()
    setDeleteDialogOpen(true)
  }
  
  const handleDeleteConfirm = async () => {
    if (selectedFlag) {
      try {
        await deleteFlag(selectedFlag.id)
        onDelete(selectedFlag.id)
      } catch (error) {
        console.error('Failed to delete flag', error)
      }
    }
    setDeleteDialogOpen(false)
    setSelectedFlag(null)
  }
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedFlag(null)
  }
  
  const handleCopyKey = () => {
    if (selectedFlag) {
      navigator.clipboard.writeText(selectedFlag.key)
    }
    handleMenuClose()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (flags.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No feature flags found. Create your first flag to get started.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <List sx={{ width: '100%' }}>
        {flags.map((flag) => (
          <Box key={flag.id}>
            <ListItem
              sx={{
                py: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" component="span">
                      {flag.name}
                    </Typography>
                    <Chip
                      label={flag.key}
                      size="small"
                      variant="outlined"
                      sx={{ ml: 2, fontFamily: 'monospace' }}
                    />
                  </Box>
                }
                secondary={flag.description}
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                  <Switch
                    edge="end"
                    checked={flag.enabled}
                    onChange={() => handleToggle(flag)}
                    inputProps={{
                      'aria-labelledby': `flag-${flag.id}`,
                    }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="flag options"
                    onClick={(event) => handleMenuOpen(event, flag)}
                  >
                    <MoreVertical size={20} />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleCopyKey}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Copy Key
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          Delete Feature Flag
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the feature flag "{selectedFlag?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
