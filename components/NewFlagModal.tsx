'use client'

import { useState } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  FormControlLabel,
  Switch,
  Box,
  CircularProgress
} from '@mui/material'
import { FeatureFlag } from '@/types/flag'
import { createFlag } from '@/utils/api'
import { z } from 'zod'

interface NewFlagModalProps {
  open: boolean
  onClose: () => void
  onCreateFlag: (flag: FeatureFlag) => void
}

const flagSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  key: z.string()
    .min(1, 'Key is required')
    .max(50, 'Key is too long')
    .regex(/^[a-z0-9-]+$/, 'Key must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(200, 'Description is too long'),
  enabled: z.boolean(),
})

export default function NewFlagModal({ open, onClose, onCreateFlag }: NewFlagModalProps) {
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
  const [description, setDescription] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setErrors({})
    setIsSubmitting(true)

    try {
      // Validate the form
      flagSchema.parse({ name, key, description, enabled })

      // Create the flag
      const newFlag = await createFlag({
        name,
        key,
        description,
        enabled,
      })

      // Call the callback
      onCreateFlag(newFlag)
      
      // Reset form and close modal
      resetForm()
      onClose()
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format errors for display
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(formattedErrors)
      } else {
        console.error('Failed to create flag', error)
        setErrors({ submit: 'Failed to create flag. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName('')
    setKey('')
    setDescription('')
    setEnabled(false)
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    
    // Auto-generate key from name if key is empty
    if (!key) {
      const generatedKey = newName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      
      setKey(generatedKey)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Feature Flag</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Flag Name"
            name="name"
            autoFocus
            value={name}
            onChange={handleNameChange}
            error={!!errors.name}
            helperText={errors.name || "A human-readable name for this feature flag"}
            disabled={isSubmitting}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="key"
            label="Flag Key"
            name="key"
            value={key}
            onChange={(e) => setKey(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            error={!!errors.key}
            helperText={errors.key || "A unique identifier used in code (lowercase, no spaces)"}
            disabled={isSubmitting}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description || "Optional description of what this flag controls"}
            disabled={isSubmitting}
          />
          <FormControlLabel
            control={
              <Switch 
                checked={enabled} 
                onChange={(e) => setEnabled(e.target.checked)} 
                disabled={isSubmitting}
              />
            }
            label="Enabled"
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Creating...' : 'Create Flag'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
