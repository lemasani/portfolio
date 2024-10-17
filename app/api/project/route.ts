// app/api/projects/route.ts

import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/options'

type ProjectData = {
  projectName: string
  description: string
  githubUrl: string
  imageUrl: string
  livePreviewUrl?: string
}

export async function POST(request: Request) {
  try {
    // Authenticate the user
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse the incoming JSON data
    const data: ProjectData = await request.json()

    // Validate the data
    if (!data.projectName || !data.description || !data.githubUrl || !data.imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert the new project into the database
    const newProject = await prisma.project.create({
      data: {
        title: data.projectName,
        description: data.description,
        githubUrl: data.githubUrl,
        imageUrl: data.imageUrl,
      },
    })

    return NextResponse.json({ message: 'Project created successfully', data: newProject }, { status: 201 })
  } catch (error: any) {
    console.error('API Route Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request:Request) {
  // Authenticate the user
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch all projects from the database
  const projects = await prisma.project.findMany()

  return NextResponse.json({status: 200, data: projects})
}
