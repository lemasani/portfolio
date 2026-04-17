'use client'
import React, { useState } from 'react'
import SplashScreen from './../components/SplashScreen'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ProfileImage from './../public/profile.jpeg'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import Services from '@/components/Services'

import SectionBackground from '@/components/sectionBackground'
import Hero from '@/components/Hero';


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
          
          <main className="min-h-screen bg-custom-radial">
            <Hero />
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