'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from './../public/logo.svg'

import LinkComponent from './LinkComponent'

import {motion } from 'framer-motion'

const links = [
  
  {
    href: '/skills',
    page: 'Skills'
  },
  {
    href: '/projects',
    page: 'Project'
  },
  {
    href: '/service',
    page: 'Service'
  }
]

const MenuLinkVariant = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.9 } }, // Add transition to exit
  transition: { duration: 0.5 }
}


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className='min-h-20 bg-transparent flex items-center justify-between w-full mx-20 rounded-md px-10'>
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt='Logo' className='w-10' />
          </Link>
        </div>

        <div className="nav-links hidden md:flex items-center gap-5">
          {links.map((link, index) =>(
            <LinkComponent key={index} href={link.href} page={link.page || 'Home'} />
          ))}
        </div>

        <div className="get-in-touch hidden md:block">
          <Link href="/contact" className='p-5 bg-primary text-[#E5E5EF] '>Get In Touch</Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div initial={MenuLinkVariant.initial}
          animate={MenuLinkVariant.animate}
          exit={MenuLinkVariant.exit}
          transition={MenuLinkVariant.transition}
        className="md:hidden relative top-0 flex flex-col items-center p-5 w-full  gap-5 mt-4 bg-primary z-5">
          {links.map((link, index) =>(
            <LinkComponent key={index} href={link.href} page={link.page || 'Home'} className='text-white' />
          ))}
          <Link href="/contact" onClick={toggleMenu} className='p-5 bg-primary text-[#E5E5EF] '>Get In Touch</Link>
        </motion.div>
      )}
    </>
  )
}