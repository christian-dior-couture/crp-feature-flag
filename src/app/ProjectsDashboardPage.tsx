'use client';
import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, Button, Box } from '@mui/material';
import { Rocket, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppConfiguration } from '@/context/AppConfigurationContext';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';

const initialProjectDetails = [ { name: 'WebApp', description: 'Main web application project.' }, { name: 'MobileApp', description: 'iOS and Android applications.' }, { name: 'Backend API', description: 'Microservices and backend APIs.' } ];

export default function ProjectsDashboardPage() {
  const router = useRouter();
  const { projects, setProject, addProject } = useAppConfiguration();
  const [projectDetails, setProjectDetails] = useState(initialProjectDetails);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCreateProject = (projectName: string) => {
    addProject(projectName);
    setProjectDetails(prev => [...prev, { name: projectName, description: `A new project for ${projectName}.` }]);
  };
  const handleGoToProject = (projectName: string) => { setProject(projectName); router.push('/flags'); };

  return (
    <div>
      <CreateProjectDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} onCreate={handleCreateProject} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setDialogOpen(true)}>Create Project</Button>
      </Box>
      <Grid container spacing={3}>
        {projectDetails.filter(pd => projects.includes(pd.name)).map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.name}>
            <Card>
              <CardContent>
                <Rocket style={{ marginBottom: '1rem' }} />
                <Typography variant="h5">{project.name}</Typography>
                <Typography color="text.secondary" sx={{ my: 1 }}>{project.description}</Typography>
                <Button size="small" onClick={() => handleGoToProject(project.name)}>Go to Project</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
