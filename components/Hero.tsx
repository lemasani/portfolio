import Image from 'next/image';
import { motion } from 'framer-motion';
import ProfileImage from '@/public/me.jpg';
import Skills from '@/components/Skills';
import React from 'react';
import { fadeInVariants, imageVariant, nameVariants } from '@/lib/Animations';
import Link from 'next/link';
import logo from '@/public/logo.png';
import bottomGradient from '@/public/bottomgradient.png'

export default function Hero() {
	return (
		<>
			<header className="relative top-0 py-10 flex items-center justify-center">
				<Link href="/">
					<Image src={logo} alt="Logo" className="w-10" />
				</Link>
			</header>
			<section className="hero h-screen relative text-white">
				{/* Main content */}
				<div className="container relative z-10 mx-auto">
					<div className="welcome flex flex-col justify-center gap-4 space-y-6 items-center">
						<motion.span
							initial={{ y: -100 }}
							animate={{ y: 0 }}
							className="font-light italic text-xl text-white"
						>
							Hello, Its me
						</motion.span>
						<motion.h1
							initial={nameVariants.initial}
							animate={nameVariants.animate}
							transition={nameVariants.transition}
							className="text-primary text-4xl font-bold text-white"
						>
							Brian Lemasani
						</motion.h1>
						<motion.div
							initial={imageVariant.initial}
							animate={imageVariant.animate}
							transition={imageVariant.transition}
							className="image-container w-60 h-60 rounded-full flex items-center justify-center z-10"
						>
							<Image
								src={ProfileImage}
								alt="Brian Lemasani"
								className="w-50 h-50 rounded-full"
							/>
						</motion.div>
						<motion.div
							initial={fadeInVariants.initial}
							animate={fadeInVariants.animate}
							transition={fadeInVariants.transition}
							className="flex flex-col items-center"
						>
							<h2 className="text-sm italic">Just a guy in Tech</h2>
							<span className="font-light italic text-lg">
                Passionate about crafting innovative web solutions.
              </span>
						</motion.div>
						<div className="skill-wrapper">
							<Skills />
						</div>
					</div>
				</div>
				{/*/!* Gradient Images with blur effects *!/*/}
				{/*<div className="pointer-events-none">*/}
				{/*  /!* Bottom left gradient *!/*/}
				{/*  <div className="absolute -bottom-12 -left-2 transform rotate-27 z-0">*/}
				{/*    <Image*/}
				{/*      src={logo}*/}
				{/*      alt="bottomGradient"*/}
				{/*      width={400}*/}
				{/*      height={400}*/}
				{/*      className="opacity-50 blur-md"*/}
				{/*    />*/}
				{/*  </div>*/}
				{/*  /!* Top right gradient *!/*/}
				{/*  <div className="absolute -top-12 -right-10 transform rotate-27 z-0">*/}
				{/*    <Image*/}
				{/*      src={logo}*/}
				{/*      alt="topGradient"*/}
				{/*      width={400}*/}
				{/*      height={400}*/}
				{/*      className="opacity-50 blur-md"*/}
				{/*    />*/}
				{/*  </div>*/}
				{/*</div>*/}
			</section>
		</>
	);
}
