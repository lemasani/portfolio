import Image from 'next/image';
import { motion } from 'framer-motion';
import ProfileImage from '@/public/me.jpg';
import Skills from '@/components/Skills';
import React from 'react';
import { fadeInVariants, imageVariant, nameVariants } from '@/lib/Animations';
import Link from 'next/link';
import logo from '@/public/logo.png';

export default function Hero() {
  return (
    <>
      <header className="relative top-0 py-4 md:py-10 flex items-center justify-center">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-8 md:w-10" />
        </Link>
      </header>
      <section className="hero min-h-screen relative text-white px-4 md:px-0">
        <div className="container relative z-10 mx-auto">
          <div className="welcome flex flex-col justify-center gap-2 md:gap-4 space-y-4 md:space-y-6 items-center">
            <motion.span
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className="font-light italic text-base md:text-xl text-white"
            >
              Hello, Its me
            </motion.span>
            <motion.h1
              initial={nameVariants.initial}
              animate={nameVariants.animate}
              transition={nameVariants.transition}
              className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
            >
              Brian Lemasani
            </motion.h1>
            <motion.div
              initial={imageVariant.initial}
              animate={imageVariant.animate}
              transition={imageVariant.transition}
              className="image-container w-40 h-40 md:w-60 md:h-60 rounded-full flex items-center justify-center z-10"
            >
              <Image
                src={ProfileImage}
                alt="Brian Lemasani"
                className="w-36 h-36 md:w-60 md:h-60 rounded-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={fadeInVariants.initial}
              animate={fadeInVariants.animate}
              transition={fadeInVariants.transition}
              className="flex flex-col items-center text-center"
            >
              <h2 className="text-xs md:text-sm italic">Just a guy in Tech</h2>
              <span className="font-light italic text-base md:text-lg px-4 md:px-0">
                Passionate about crafting innovative web solutions.
              </span>
            </motion.div>
            <div className="skill-wrapper w-full max-w-full overflow-hidden">
              <Skills />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}