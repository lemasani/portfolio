import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logo from './../public/logo.svg'

export default function Navbar() {
  return (
    <>
        <nav className='min-h-20 flex items-center justify-between w-full mx-20 rounded-md px-10'>
            <div className="logo">
                <Link href="/">
                    <Image src={logo} alt='Logo' className='w-10' />
                </Link>
            </div>

            <div className="nav-links flex items-center gap-5">
                <Link href="/about">About Me</Link>
                <Link href="/skills">Skills</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact</Link>        
            </div>

            <div className="get-in-touch">
                <Link href="/contact" className='p-5 bg-primary text-[#E5E5EF] '>Get In Touch</Link>
            </div>

        </nav>
    </>
  )
}
