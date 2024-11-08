'use client'
import React, { useState } from 'react'
import SplashScreen from './../components/SplashScreen'
import { getBlueDottedPatternStyle } from '@/lib/styles'
import { Button } from '@/components/ui/button'
import { FaFileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProfileImage from './../public/profile.jpeg'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import Skills from '@/components/Skills'
import Services from '@/components/Services'

import SectionBackground from '@/components/sectionBackground'

import herosvg from '@/components/svg/hero.svg'

import Navbar from '@/components/Navbar'

const nameVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const imageVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay: 1.2 }
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashFinish = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <>
          <header className='relative top-0 bg-background p-3 flex flex-col items-center justify-center'>
            <Navbar />
          </header>
          <main className="min-h-screen">
            <section className="hero h-screen relative">
            <Image
            src={herosvg}
            alt="Svg"
            className="absolute top-0 right-0 w-full h-full object-cover -z-10 opacity-30"
            />
              {/* <div className="absolute inset-0 z-0" style={getBlueDottedPatternStyle()}></div> */}
              <div className="container z-10 mx-auto">
                <div className="welcome flex flex-col justify-center gap-1 items-center ">
                  <motion.span initial={{ y: -100 }}
                    animate={{ y: 0 }} className='font-light italic text-xl'>Hello, Its me</motion.span>
                  <motion.h1
                    initial={nameVariants.initial}
                    animate={nameVariants.animate}
                    transition={nameVariants.transition} className='text-primary text-4xl font-bold'>Brian Lemasani</motion.h1>
                  <motion.div
                    initial={imageVariant.initial}
                    animate={imageVariant.animate}
                    transition={imageVariant.transition} className="image-container w-60 h-60 rounded-full flex items-center justify-center z-1">
                    <Image src={ProfileImage} alt='Brian Lemasani' className='w-50 h-50 rounded-full' />
                  </motion.div>
                  <motion.div
                    initial={fadeInVariants.initial}
                    animate={fadeInVariants.animate}
                    transition={fadeInVariants.transition}
                    className="flex flex-col items-center"
                  >
                    <h2 className='text-xl font-bold'>Tech Architect</h2>
                    <span className='font-light italic text-xs'>System design & Frontend specialist</span>
                    <p className='text-center '>Passionate about crafting innovative web solutions. <br /> Skilled in system design, analysis, and frontend development using React, Next.js, JavaScript, and TypeScript.</p>
                    <Button className='mt-4'>
                      <FaFileAlt className="mr-2" />
                      My Resume
                    </Button>
                  </motion.div>

                  <div className="skills container mx-auto mt-5 p-2 overflow-hidden">
                    <div className="skill-wrapper overflow-hidden flex flex-row space-x-4 mx-auto my-8 max-w-screen-sm">
                      <Skills /> {/* Original skills list */}
                      <Skills /> {/* Duplicated list for seamless scrolling */}
                    </div>
                  </div>


                </div>
              </div>
            </section>
            <section className="featured mt-20">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4 text-primary">Featured Projects</h2>
                <div className="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Title</CardTitle>
                      <CardDescription>Project description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image src={ProfileImage} alt="Project" />
                    </CardContent>
                    <CardFooter>
                      <Button>View Project</Button>
                    </CardFooter>
                  </Card>
                
                </div>
              </div>
            </section>

          
            <SectionBackground>
              <div className="container mx-auto z-10">
                <h2 className="text-2xl text-center mb-4 text-white font-light italic">Services</h2>
                <div className="mx-auto px-4">
                  <Services />
                </div>
              </div>
            </SectionBackground>
            
            

          </main>
        </>
      )}
    </>
  )
}