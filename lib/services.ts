import { IconType } from 'react-icons'
import { FaGlobe, FaCogs, FaPaintBrush } from 'react-icons/fa'
import { FaPerson } from 'react-icons/fa6'

interface Service {
    title: string
    description: string
    icon: IconType
}

const service: Service[] = [
    {
        title: 'Web Development',
        description: 'Crafting dynamic and responsive web applications with cutting-edge technologies like React, Next.js, and Tailwind CSS, delivering sleek, high-performance digital experiences.',
        icon: FaGlobe
    },
    {
        title: 'System Design',
        description: 'Architecting robust, scalable systems with industry best practices, ensuring your infrastructure is efficient, resilient, and future-proof.',
        icon: FaCogs
    },
    {
        title: 'UI/UX Design',
        description: 'Creating intuitive and visually captivating user interfaces for web and mobile platforms, ensuring seamless user experiences that leave a lasting impression.',
        icon: FaPaintBrush
    },
    {
        title: 'Consulting',
        description: 'Providing expert guidance and insights on web/mobile development and UI/UX design, helping you transform ideas into impactful digital solutions.',
        icon: FaPerson
    },
]


export { service }