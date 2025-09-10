'use client';
import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, Button, Box } from '@mui/material';
import { Rocket, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import CreateProjectModal from '@/components/projects/CreateProjectModal';

interface Project {
  name: string;
  description: string;
}

const initialProjectDetails: Project[] = [
  { name: 'WebApp', description: 'Main web application project.' },
  { name: 'MobileApp', description: 'iOS and Android applications.' },
  { name: 'Backend API', description: 'Microservices and backend APIs.' },
];

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, setProject, addProject } = useAppContext();
  const [projectDetails, setProjectDetails] = useState<Project[]>(initialProjectDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (projectName: string) => {
    addProject(projectName); // Add to global list
    const newProjectDetail: Project = {
      name: projectName,
      description: `A new project for ${projectName}.`,
    };
    setProjectDetails(prev => [...prev, newProjectDetail]);
  };

  const handleGoToProject = (projectName: string) => {
    setProject(projectName); // Set the active project globally
    router.push('/flags'); // Navigate to the flags page
  };

  return (
    <div automation-id="projects-page">
      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ mb: 0 }}>
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlusCircle />}
          onClick={() => setIsModalOpen(true)}
          automation-id="create-project-btn"
        >
          Create Project
        </Button>
      </Box>
      <Grid container spacing={3}>
        {/* We derive the cards from the local `projectDetails` state */}
        {projectDetails.filter(pd => projects.includes(pd.name)).map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.name} data-reference={project.name}>
            <Card>
              <CardContent>
                <Rocket style={{ marginBottom: '10px' }} />
                <Typography variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {project.description}
                </Typography>
                <Button size="small" onClick={() => handleGoToProject(project.name)}>
                  Go to Project
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
