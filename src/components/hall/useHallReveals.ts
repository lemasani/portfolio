import type { RefObject } from 'react'
import { EASE, getGsap, useIsomorphicLayoutEffect } from '@/lib/motion'

/**
 * Per-element scroll entrances for the hall. Each kind fits what it reveals:
 *  hinge  – placards swing down from their top edge
 *  stamp  – exhibit numerals stamp onto the wall
 *  print  – spec-slot lines print left to right like a label maker
 *  flip   – "coming to the hall" tiles flip over
 *  rack   – pamphlets drop into the literature rack
 * Content is visible by default; these only run when motion is allowed.
 */
export function useHallReveals(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const { gsap, ScrollTrigger } = getGsap()
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const once = (trigger: Element, start = 'top 86%') => ({ trigger, start, once: true })

      gsap.utils.toArray<HTMLElement>('[data-reveal="hinge"]', root).forEach((el) => {
        gsap.from(el, {
          rotateX: -72,
          autoAlpha: 0,
          transformPerspective: 1100,
          transformOrigin: '50% 0%',
          duration: 1.0,
          ease: EASE.out,
          scrollTrigger: once(el),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal="stamp"]', root).forEach((el) => {
        gsap.from(el, {
          scale: 1.9,
          rotate: -9,
          autoAlpha: 0,
          duration: 0.5,
          ease: EASE.stamp,
          scrollTrigger: once(el, 'top 88%'),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal="print"]', root).forEach((el) => {
        gsap.from(el.children, {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.45,
          ease: 'steps(12)',
          stagger: 0.09,
          scrollTrigger: once(el, 'top 92%'),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal="flip"]', root).forEach((el) => {
        gsap.from(el.children, {
          rotateX: 92,
          transformPerspective: 700,
          transformOrigin: '50% 50%',
          duration: 0.7,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: once(el, 'top 84%'),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal="rack"]', root).forEach((el) => {
        gsap.from(el.children, {
          yPercent: -45,
          autoAlpha: 0,
          rotate: (i: number) => (i % 2 === 0 ? -7 : 6),
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: once(el, 'top 85%'),
        })
      })

      ScrollTrigger.refresh()
    })

    return () => mm.revert()
  }, [])
}
