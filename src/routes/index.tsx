import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="bg-[#120f17]">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}
