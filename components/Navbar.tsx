'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from './../public/logo.svg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className='min-h-20 flex items-center justify-between w-full mx-20 rounded-md px-10'>
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt='Logo' className='w-10' />
          </Link>
        </div>

        <div className="nav-links hidden md:flex items-center gap-5">
          <Link href="/about">About Me</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
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
        <div className="md:hidden relative top-0 flex flex-col items-center gap-5 mt-4 bg-primary z-2">
          <Link href="/about" onClick={toggleMenu}>About Me</Link>
          <Link href="/skills" onClick={toggleMenu}>Skills</Link>
          <Link href="/projects" onClick={toggleMenu}>Projects</Link>
          <Link href="/contact" onClick={toggleMenu}>Contact</Link>
          <Link href="/contact" onClick={toggleMenu} className='p-5 bg-primary text-[#E5E5EF] '>Get In Touch</Link>
        </div>
      )}
    </>
  )
}