import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

interface ProjectCardProps {
  name: string
  description: string
  githubUrl: string
  imageUrl: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, githubUrl, imageUrl }) => {
  return (
    <Card className="max-w-sm rounded overflow-hidden shadow-lg">
      <CardHeader className='w-full p-0'>
        <img className="w-full" src={imageUrl} alt={name} />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </CardContent>
      <CardFooter className="pt-4 pb-2">
        <a href={githubUrl} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard