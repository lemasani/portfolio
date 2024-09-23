import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from './../public/logo.svg'

import { getPatternStyle } from '@/lib/styles'

interface SplashScreenProps {
  onFinish: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 3000) // Display for 3 seconds

    return () => clearTimeout(timer)
  }, [onFinish])



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      <div className="absolute inset-0" style={getPatternStyle()}></div> 
      <div className="image-container animate-bounce w-40 h-40 rounded-full bg-white flex items-center justify-center">
        <Image src={logo} alt="Logo" className="w-32 h-32" />
      </div>
    </div>
  )
}

export default SplashScreen