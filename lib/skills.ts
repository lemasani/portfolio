import { IconType } from 'react-icons'
import { FaReact, FaNodeJs, FaGitAlt, FaJsSquare } from 'react-icons/fa'
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

interface Skill {
    name: string
    icon: IconType
}

const skills: Skill[] = [
    {
        name: 'React',
        icon: FaReact,
    },
    {
        name: 'Next.js',
        icon: SiNextdotjs,
    },
    {
        name: 'JavaScript',
        icon: FaJsSquare,
    },
    {
        name: 'TypeScript',
        icon: SiTypescript,
    },
    {
        name: 'Node.js',
        icon: FaNodeJs,
    },
    {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
    },
    {
        name: 'Git & GitHub',
        icon: FaGitAlt,
    }
]


export { skills }