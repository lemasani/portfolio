import React from 'react'
import { skills } from '@/lib/skills'
import { Badge } from '@/components/ui/badge'

export default function Skills() {
  return (
    <div className="skills-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {skills.map((skill) => (
        <Badge key={skill.name} className="skill-item flex items-center justify-center gap-2 p-2 w-50">
          <skill.icon className="text-2xl" />
          <span>{skill.name}</span>
        </Badge>
      ))}
    </div>
  )
}