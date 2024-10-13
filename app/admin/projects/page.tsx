'use client'
import React from 'react'
import ProjectServicesLayout from '../projectServicesLayout'

import ProjectCard from '@/components/ProjectCard'

const projects = [
    {
      name: 'Project 1',
      description: 'Description for Project 1',
      githubUrl: 'https://github.com/username/project1',
      imageUrl: 'https://via.placeholder.com/150',
      livePreviewUrl: 'https://example.com/project1',
    },
    {
      name: 'Project 2',
      description: 'Description for Project 2',
      githubUrl: 'https://github.com/username/project2',
      imageUrl: 'https://via.placeholder.com/150',
      livePreviewUrl: 'https://example.com/project2',
    },
    // Add more projects as needed
  ]


const handleButtonClick = () => {
  console.log('Button clicked')
}

const ProjectPage = () => {

    
  return (

    <>
        <ProjectServicesLayout
        sectionName="Projects"
        button={{
            className: 'bg-blue-500 text-white px-4 py-2 rounded',
            text: 'Add Project',
            onClick: handleButtonClick,
        }}
       
        >
        
        {projects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              githubUrl={project.githubUrl}
              imageUrl={project.imageUrl}
              livePreviewUrl={project.livePreviewUrl}
            />
          ))}
        
        </ProjectServicesLayout>

    </>

  )
}

export default ProjectPage