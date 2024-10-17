// components/createProjectForm.tsx
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import fetchRepositories from '@/lib/fetchRepositories'

const schema = z.object({
  projectName: z.string().nonempty('Project name is required'),
  description: z.string().nonempty('Description is required'),
  githubUrl: z.string().url('Invalid URL'),
  imageUrl: z.string().url('Invalid URL'),
})

type CreateProjectFormProps = {
  githubUsername: string
  onSubmit: (formData: any) => void
}

type Repo = {
    name: string
    description: string
    html_url: string
}


const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ githubUsername, onSubmit }) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repositories = await fetchRepositories(githubUsername)
        setRepos(repositories)
        console.log('Repositories:', repositories)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
    }
    fetchRepos()
  }, [githubUsername])

  const handleRepoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const repo = repos.find((r: any) => r.name === event.target.value)
    if (repo) {
      setValue('projectName', repo.name)
      setValue('description', repo.description)
      setValue('githubUrl', repo.html_url)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center p-6 bg-white shadow-md rounded-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Project</h2>
      
      <label htmlFor="githubrepos" className="mb-2 text-lg">GitHub Repositories</label>
      <select className="p-2 mb-4 border rounded w-full" name="githubrepos" id="githubrepos" onChange={handleRepoChange}>
        <option value="">Select a repository</option>
        {repos.map((repo: any) => (
          <option key={repo.id} value={repo.name}>
            {repo.name}
          </option>
        ))}
      </select>

      <label htmlFor="projectName" className="mb-2 text-lg">Project Name</label>
      <input
        type="text"
        id="projectName"
        {...register('projectName')}
        className="p-2 mb-4 border rounded w-full"
      />

      <label htmlFor="description" className="mb-2 text-lg">Description</label>
      <input
        type="text"
        id="description"
        {...register('description')}
        className="p-2 mb-4 border rounded w-full"
      />
     
      <label htmlFor="githubUrl" className="mb-2 text-lg">GitHub URL</label>
      <input
        type="text"
        id="githubUrl"
        {...register('githubUrl')}
        className="p-2 mb-4 border rounded w-full"
      />
      
      <label htmlFor="imageUrl" className="mb-2 text-lg">Project Image</label>
      <CldUploadButton
        uploadPreset="projects" 
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          if (result.info && typeof result.info !== 'string') {
            const imageUrl = result.info.secure_url
            setValue('imageUrl', imageUrl) // Set imageUrl in form
          }
        }}
      />
      <input
        type="text"
        id="imageUrl"
        {...register('imageUrl')}
        readOnly
        className="p-2 mb-4 border rounded w-full"
      />
     
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Create Project</button>
    </form>
  )
}

export default CreateProjectForm