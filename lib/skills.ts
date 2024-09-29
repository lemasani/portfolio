import { IconType } from 'react-icons'
import { FaReact, FaNodeJs, FaGitAlt, FaJsSquare } from 'react-icons/fa'
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiDigitalocean } from 'react-icons/si'

interface Skill {
    name: string
    icon: IconType
    color: string
}

const skills: Skill[] = [
    {
        name: 'React',
        icon: FaReact,
        color: '#61DAFB',
    },
    {
        name: 'Next.js',
        icon: SiNextdotjs,
        color: '#000000',
    },
    {
        name: 'JavaScript',
        icon: FaJsSquare,
        color: '#F7DF1E',
    },
    {
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178C6',
    },
    {
        name: 'Node.js',
        icon: FaNodeJs,
        color: '#339933',
    },
    {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        color: '#06B6D4',
    },
    {
        name: 'Git & GitHub',
        icon: FaGitAlt,
        color: '#F05032',
    },
    {
        name: 'DigitalOcean',
        icon: SiDigitalocean,
        color: '#0080FF',
    },
]

export { skills }