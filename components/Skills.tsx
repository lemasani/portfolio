import React from 'react'
import { skills } from '@/lib/skills'
import { Badge } from '@/components/ui/badge'

export default function Skills() {
  return (
    <div className="skills-container flex flex-row gap-5  animate-scroll infinite-scroll">
      {skills.map((skill) => (
        <Badge key={skill.name} title={skill.name} className="flex items-center justify-center gap-2 p-2 w-50">
          <skill.icon className="text-4xl" style={{ color: skill.color }} />
        </Badge>
      ))}
    </div>
  )
}