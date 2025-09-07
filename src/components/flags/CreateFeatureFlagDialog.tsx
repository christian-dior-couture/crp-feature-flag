'use client';
import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stepper, Step, StepLabel, Box, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Switch, FormControlLabel, Alert
} from '@mui/material';
import { Trash2, PlusCircle } from 'lucide-react';

const steps = ['Flag Details', 'Variations & Targeting'];

interface CreateFeatureFlagDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newFlag: any) => void;
}

export default function CreateFeatureFlagDialog({ open, onClose, onCreate }: CreateFeatureFlagDialogProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [flagDetails, setFlagDetails] = useState({ name: '', description: '', type: 'Boolean' as 'Boolean' | 'String' | 'JSON', enabled: true });
  const [variations, setVariations] = useState<any[]>([]);
  const [targeting, setTargeting] = useState<any[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const resetState = () => { setActiveStep(0); setFlagDetails({ name: '', description: '', type: 'Boolean', enabled: true }); setVariations([]); setTargeting([]); setFormErrors({}); };
  const handleClose = () => { resetState(); onClose(); };

  useEffect(() => {
    if (flagDetails.type === 'Boolean') { setVariations([{ value: true }, { value: false }]); setTargeting([]); }
    else if (flagDetails.type === 'String') { setVariations([{ value: 'Variation A', weight: 100 }]); }
    else { setVariations([{ value: '{\n  "key": "value"\n}', weight: 100 }]); }
  }, [flagDetails.type]);

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!flagDetails.name.trim()) errors.name = 'Flag name is required.';
    else if (!/^[a-z0-9-]+$/.test(flagDetails.name)) errors.name = 'Name must be lowercase, no spaces (use hyphens).';
    if (!flagDetails.description.trim()) errors.description = 'Description is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (flagDetails.type === 'JSON') { try { JSON.parse(variations[0].value); } catch (e) { errors.json = 'Invalid JSON format.'; } }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => { if (activeStep === 0 && validateStep1()) setActiveStep(p => p + 1); };
  const handleBack = () => setActiveStep(p => p - 1);
  const handleCreate = () => {
    if (!validateStep2()) return;
    let finalVariations = flagDetails.type === 'Boolean' ? variations.map(v => ({ ...v, value: String(v.value) })) : variations;
    onCreate({ ...flagDetails, variations: finalVariations, targeting });
    handleClose();
  };

  const handleVariationChange = (index: number, field: string, value: any) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };
  
  const addVariation = () => setVariations([...variations, {value: '', weight: 0}]);
  const removeVariation = (index: number) => setVariations(variations.filter((_, i) => i !== index));

  const addTargetingRule = () => setTargeting([...targeting, {attribute: 'email', operator: 'ends_with', values:[''], serves: ''}]);
  const removeTargetingRule = (index: number) => setTargeting(targeting.filter((_, i) => i !== index));
  const handleTargetingChange = (index: number, field: string, value: any) => {
    const newTargeting = [...targeting];
    newTargeting[index][field] = value;
    setTargeting(newTargeting);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Feature Flag</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}><Step><StepLabel>Flag Details</StepLabel></Step><Step><StepLabel>Variations & Targeting</StepLabel></Step></Stepper>
        {activeStep === 0 && (
          <Box component="form" noValidate>
            <TextField required fullWidth name="name" label="Flag Name (e.g., new-checkout-flow)" value={flagDetails.name} onChange={e => setFlagDetails(p => ({...p, name: e.target.value}))} error={!!formErrors.name} helperText={formErrors.name} sx={{ mb: 2 }} />
            <TextField required fullWidth name="description" label="Description" value={flagDetails.description} onChange={e => setFlagDetails(p => ({...p, description: e.target.value}))} error={!!formErrors.description} helperText={formErrors.description} sx={{ mb: 2 }} />
            <FormControl fullWidth><InputLabel>Flag Type</InputLabel><Select name="type" value={flagDetails.type} label="Flag Type" onChange={e => setFlagDetails(p => ({...p, type: e.target.value as any}))}><MenuItem value="Boolean">Boolean</MenuItem><MenuItem value="String">String</MenuItem><MenuItem value="JSON">JSON</MenuItem></Select></FormControl>
          </Box>
        )}
        {activeStep === 1 && (
            <Box>
                <Typography variant="h6" gutterBottom>Variations</Typography>
                {flagDetails.type === 'Boolean' && (
                    <Box>
                        <FormControl fullWidth sx={{mb: 2}}><InputLabel>When flag is ON, serve</InputLabel><Select value={variations[0].value} label="When flag is ON, serve" onChange={(e) => handleVariationChange(0, 'value', e.target.value)}><MenuItem value={true as any}>true</MenuItem><MenuItem value={false as any}>false</MenuItem></Select></FormControl>
                        <FormControl fullWidth><InputLabel>When flag is OFF, serve</InputLabel><Select value={variations[1].value} label="When flag is OFF, serve" onChange={(e) => handleVariationChange(1, 'value', e.target.value)}><MenuItem value={true as any}>true</MenuItem><MenuItem value={false as any}>false</MenuItem></Select></FormControl>
                    </Box>
                )}
                {flagDetails.type === 'String' && variations.map((v, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1.5, alignItems: 'center' }}><TextField label="Variation Value" value={v.value} onChange={(e) => handleVariationChange(i, 'value', e.target.value)} fullWidth /><TextField label="Weight (%)" type="number" value={v.weight} onChange={(e) => handleVariationChange(i, 'weight', e.target.value)} sx={{ width: 150 }} /><IconButton onClick={() => removeVariation(i)}><Trash2 size={20} color="red"/></IconButton></Box>
                ))}
                {flagDetails.type === 'String' && <Button startIcon={<PlusCircle size={16}/>} onClick={addVariation} size="small">Add Variation</Button>}
                {flagDetails.type === 'JSON' && <TextField label="JSON Value" multiline rows={6} fullWidth value={variations[0].value} onChange={(e) => handleVariationChange(0, 'value', e.target.value)} error={!!formErrors.json} helperText={formErrors.json || "Enter a single valid JSON object."} variant="outlined" />}
                
                <Typography variant="h6" gutterBottom sx={{mt: 4}}>Targeting Rules</Typography>
                <Button startIcon={<PlusCircle size={16}/>} onClick={addTargetingRule} size="small">Add Targeting Rule</Button>
            </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={handleClose}>Cancel</Button><Box sx={{ flex: '1 1 auto' }} />
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 ? <Button onClick={handleNext} variant="contained">Next</Button> : <Button onClick={handleCreate} variant="contained">Create Flag</Button>}
      </DialogActions>
    </Dialog>
  );
}
