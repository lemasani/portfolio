// app/admin/projects/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ProjectServicesLayout from '../projectServicesLayout'
import ProjectCard from '@/components/ProjectCard'
import CreateProjectForm from '@/components/createProjectForm'

type ProjectFormValues = {
  name: string
  description: string
  githubUrl: string
  imageUrl: string
  livePreviewUrl: string
}

interface Project  {
  id: number
  title: string
  description: string
  githubUrl: string
  imageUrl: string
}


type ProjectPageProps = {
  githubUsername: string
}

const ProjectPage: React.FC<ProjectPageProps> = ({ githubUsername }) => {
  const session = useSession()
  const [showForm, setShowForm] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/project')

        console.log('project',response)
        const data = await response.json()
        setProjects(data.data)
        console.log('projects:',data)
        
      } catch (error) {
        console.error('Error fetching projects', error)
      }
    }
    fetchProjects()
  }, [])

 const createProject = async (formData: ProjectFormValues) => {

  

    // Send the form data to the API
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      console.log('Project created successfully')
      setShowForm(false)
    } else {
      console.error('Failed to create project:', response.statusText)
    }
 }



 

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

        {showForm ? (
                <div className="createProject-container  w-full top-10">
                <CreateProjectForm githubUsername={session.data?.user.name || 'admin'} onSubmit={createProject} />
                </div>
            ): (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    name={project.title}
                    description={project.description}
                    githubUrl={project.githubUrl}
                    imageUrl={project.imageUrl}
                  />
                ))}
                
                </div>
            )}
      </ProjectServicesLayout>

      
    </>
  )
}

export default ProjectPage