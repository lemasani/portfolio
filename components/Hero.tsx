import Image from 'next/image';
import herosvg from '@/components/svg/hero.svg';
import {motion} from 'framer-motion';
import ProfileImage from '@/public/me.jpg';
import {Button} from '@/components/ui/button';
import {FaFileAlt} from 'react-icons/fa';
import Skills from '@/components/Skills';
import React from 'react';
import {fadeInVariants, imageVariant, nameVariants} from '@/lib/Animations';
import Link from 'next/link';
import logo from '@/public/logo.png';


export default function Hero() {
	return (
		<>
			<header className='relative top-0   py-10 flex  items-center justify-center'>
				<Link href="/">
					<Image src={logo} alt='Logo' className='w-10' />
				</Link>
			</header>
			<section className="hero h-screen relative text-white">
				{/*this is background pattern*/}
				{/*<Image*/}
				{/*	src={herosvg}*/}
				{/*	alt="Svg"*/}
				{/*	className="absolute top-0 right-0 w-full h-full object-cover -z-10 opacity-30"*/}
				{/*/>*/}
				{/* <div className="absolute inset-0 z-0" style={getBlueDottedPatternStyle()}></div> */}
				<div className="container z-10 mx-auto">
					<div className="welcome flex flex-col justify-center gap-4 space-y-6 items-center ">
						<motion.span initial={{ y: -100 }}
						             animate={{ y: 0 }} className='font-light italic text-xl text-white'>Hello, Its me</motion.span>
						<motion.h1
							initial={nameVariants.initial}
							animate={nameVariants.animate}
							transition={nameVariants.transition} className='text-primary text-4xl font-bold text-white'>Brian Lemasani</motion.h1>
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
							<h2 className='text-sm  italic'>Just a guy in Tech</h2>
							<span className='font-light italic text-lg'>Passionate about crafting innovative web solutions.</span>
							
						</motion.div>
						
						
						<div className="skill-wrapper">
							<Skills /> {/* Original skills list */}
						</div>
				
					
					</div>
				</div>
			</section>
		</>
	)
}
