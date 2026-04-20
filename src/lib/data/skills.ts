import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'TypeScript', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'Next.js', level: 'proficient' },
      { name: 'TanStack Router', level: 'proficient' },
      { name: 'Three.js / R3F', level: 'proficient' },
      { name: 'Framer Motion', level: 'familiar' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 'core' },
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'REST APIs', level: 'core' },
      { name: 'tRPC', level: 'proficient' },
      { name: 'Prisma', level: 'proficient' },
      { name: 'Redis', level: 'familiar' },
    ],
  },
  {
    name: 'Infrastructure & Tools',
    skills: [
      { name: 'Cloudflare Workers', level: 'proficient' },
      { name: 'Git', level: 'core' },
      { name: 'Docker', level: 'proficient' },
      { name: 'Vite', level: 'core' },
      { name: 'pnpm', level: 'core' },
      { name: 'Bun', level: 'proficient' },
      { name: 'Linux', level: 'proficient' },
    ],
  },
  {
    name: 'Currently Exploring',
    skills: [
      { name: 'Java', level: 'familiar' },
      { name: 'WebAssembly', level: 'familiar' },
      { name: 'AI / LLM integration', level: 'familiar' },
      { name: 'Computer Vision', level: 'familiar' },
    ],
  },
]
