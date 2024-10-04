import React from 'react'
import Image from 'next/image'
import servicesvg from '@/components/svg/service.svg'
import clsx from 'clsx'

interface SectionBackgroundProps {
  children: React.ReactNode
  className?: string
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ children, className }) => {
  return (
    <section className={clsx('relative mt-2 bg-primary p-3 py-8', className)}>
      <div className="absolute inset-0 z-0 opacity-50">
        <Image 
          src={servicesvg}
          alt='svg'
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export default SectionBackground