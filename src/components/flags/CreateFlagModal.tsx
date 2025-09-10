'use client';
import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stepper, Step, StepLabel, Box, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Switch, FormControlLabel, FormHelperText, Alert
} from '@mui/material';
import { Trash2, PlusCircle } from 'lucide-react';

const steps = ['Flag Details', 'Variations & Targeting'];

interface CreateFlagModalProps {
  open: boolean;
  onClose: () => void;
  // The 'enabled' property is now a simple boolean for creation default
  onCreate: (newFlag: Omit<any, 'enabled'> & { enabled: boolean }) => void;
}

export default function CreateFlagModal({ open, onClose, onCreate }: CreateFlagModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [flagDetails, setFlagDetails] = useState({
    name: '',
    description: '',
    type: 'Boolean' as 'Boolean' | 'String' | 'JSON',
    // This now represents the default for production
    enabled: true,
  });
  const [variations, setVariations] = useState<any[]>([{ value: true, weight: 100 }, { value: false, weight: 0 }]);
  const [targeting, setTargeting] = useState<any[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const resetState = () => {
    setActiveStep(0);
    setFlagDetails({ name: '', description: '', type: 'Boolean', enabled: true });
    setVariations([{ value: true, weight: 100 }, { value: false, weight: 0 }]);
    setTargeting([]);
    setFormErrors({});
  };

  useEffect(() => {
    if (flagDetails.type === 'Boolean') {
      setVariations([{ value: true }, { value: false }]);
      setTargeting([]);
    } else if (flagDetails.type === 'String') {
      setVariations([{ value: 'Variation A', weight: 100 }]);
    } else { // JSON
      setVariations([{ value: '{\n  "key": "value"\n}', weight: 100 }]);
    }
  }, [flagDetails.type]);


  const handleClose = () => {
    resetState();
    onClose();
  };

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
     if (flagDetails.type === 'JSON') {
        try {
            JSON.parse(variations[0].value);
        } catch (e) {
            errors.json = 'Invalid JSON format.';
        }
     }
     setFormErrors(errors);
     return Object.keys(errors).length === 0;
  }

  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCreate = () => {
    if (!validateStep2()) return;
    
    let finalVariations = variations;
    if (flagDetails.type === 'Boolean') {
        finalVariations = variations.map(v => ({...v, value: String(v.value)}));
    }

    // Pass the simplified flag data up to the parent
    const newFlag = { ...flagDetails, variations: finalVariations, targeting };
    onCreate(newFlag);
    handleClose();
  };
  
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFlagDetails(prev => ({ ...prev, [name as string]: value }));
  };
  
  // Variation handlers
  const addVariation = () => setVariations([...variations, {value: '', weight: 0}]);
  const removeVariation = (index: number) => setVariations(variations.filter((_, i) => i !== index));
  const handleVariationChange = (index: number, field: string, value: any) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };
  
  // Targeting handlers
  const addTargetingRule = () => setTargeting([...targeting, {attribute: 'email', operator: 'ends_with', values:[''], serves: ''}]);
  const removeTargetingRule = (index: number) => setTargeting(targeting.filter((_, i) => i !== index));
  const handleTargetingChange = (index: number, field: string, value: any) => {
    const newTargeting = [...targeting];
    newTargeting[index][field] = value;
    setTargeting(newTargeting);
  };

  const renderStepContent = () => {
    if (activeStep === 0) {
      return (
        <Box component="form" noValidate>
          <TextField required fullWidth name="name" label="Flag Name (e.g., new-checkout-flow)" value={flagDetails.name} onChange={handleDetailChange} error={!!formErrors.name} helperText={formErrors.name} sx={{ mb: 2 }} />
          <TextField required fullWidth name="description" label="Description" value={flagDetails.description} onChange={handleDetailChange} error={!!formErrors.description} helperText={formErrors.description} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Flag Type</InputLabel>
            <Select name="type" value={flagDetails.type} label="Flag Type" onChange={handleDetailChange}>
              <MenuItem value="Boolean">Boolean (On/Off)</MenuItem>
              <MenuItem value="String">String (A/B Test)</MenuItem>
              <MenuItem value="JSON">JSON (Complex Config)</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel control={<Switch checked={flagDetails.enabled} onChange={(e) => setFlagDetails(p => ({...p, enabled: e.target.checked}))} />} label="Enable flag in Production by default" />
        </Box>
      );
    }

    if (activeStep === 1) {
      return (
        <Box>
          <Typography variant="h6" gutterBottom>Variations</Typography>
          {flagDetails.type === 'Boolean' && (
            <Box>
                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel>When flag is ON, serve</InputLabel>
                    <Select value={variations[0].value} label="When flag is ON, serve" onChange={(e) => handleVariationChange(0, 'value', e.target.value)}>
                        <MenuItem value={true as any}>true</MenuItem>
                        <MenuItem value={false as any}>false</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>When flag is OFF, serve</InputLabel>
                    <Select value={variations[1].value} label="When flag is OFF, serve" onChange={(e) => handleVariationChange(1, 'value', e.target.value)}>
                        <MenuItem value={true as any}>true</MenuItem>
                        <MenuItem value={false as any}>false</MenuItem>
                    </Select>
                </FormControl>
            </Box>
          )}

          {flagDetails.type === 'String' && variations.map((v, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1.5, alignItems: 'center' }}>
              <TextField label="Variation Value" value={v.value} onChange={(e) => handleVariationChange(i, 'value', e.target.value)} fullWidth />
              <TextField label="Weight (%)" type="number" value={v.weight} onChange={(e) => handleVariationChange(i, 'weight', e.target.value)} sx={{ width: 150 }} />
              <IconButton onClick={() => removeVariation(i)}><Trash2 size={20} color="red"/></IconButton>
            </Box>
          ))}
          {flagDetails.type === 'String' && <Button startIcon={<PlusCircle size={16}/>} onClick={addVariation} size="small">Add Variation</Button>}

          {flagDetails.type === 'JSON' && (
            <TextField
              label="JSON Value"
              multiline
              rows={6}
              fullWidth
              value={variations[0].value}
              onChange={(e) => handleVariationChange(0, 'value', e.target.value)}
              error={!!formErrors.json}
              helperText={formErrors.json || "Enter a single valid JSON object."}
              variant="outlined"
            />
          )}
          
          <Typography variant="h6" gutterBottom sx={{mt: 4}}>Targeting Rules</Typography>
          {flagDetails.type === 'Boolean' ? (
             <Alert severity="info" sx={{mb: 2}}>Targeting is not applicable for simple Boolean flags in this setup. Use a String flag for user-based rollouts.</Alert>
          ) : (
            <>
              {targeting.map((r, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center', p: 1.5, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{fontWeight: 'bold'}}>IF</Typography>
                  <TextField label="Attribute" size="small" value={r.attribute} onChange={(e) => handleTargetingChange(i, 'attribute', e.target.value)} />
                  <Select size="small" value={r.operator} onChange={(e) => handleTargetingChange(i, 'operator', e.target.value)}>
                    <MenuItem value="is">is</MenuItem><MenuItem value="is_not">is not</MenuItem><MenuItem value="contains">contains</MenuItem><MenuItem value="ends_with">ends with</MenuItem>
                  </Select>
                  <TextField label="Value(s)" size="small" fullWidth value={r.values.join(',')} onChange={(e) => handleTargetingChange(i, 'values', e.target.value.split(','))} />
                   <Typography variant="body2" sx={{fontWeight: 'bold'}}>THEN SERVE</Typography>
                  <FormControl size="small" sx={{minWidth: 150}}>
                    <InputLabel>Variation</InputLabel>
                    <Select label="Variation" value={r.serves} onChange={(e) => handleTargetingChange(i, 'serves', e.target.value)}>
                        {variations.map((v, idx) => <MenuItem key={idx} value={v.value}>{v.value}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => removeTargetingRule(i)}><Trash2 size={20} color="red"/></IconButton>
                </Box>
              ))}
              <Button startIcon={<PlusCircle size={16}/>} onClick={addTargetingRule} size="small">Add Targeting Rule</Button>
            </>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create a New Feature Flag</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>
        {renderStepContent()}
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 && <Button onClick={handleNext} variant="contained">Next</Button>}
        {activeStep === steps.length - 1 && <Button onClick={handleCreate} variant="contained">Create Flag</Button>}
      </DialogActions>
    </Dialog>
  );
}
