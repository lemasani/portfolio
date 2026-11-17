import { useEffect, useState } from 'react'

/** Live prefers-reduced-motion. Defaults to true on the server so SSR never assumes motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

/** True while the element is within (or near) the viewport. */
export function useInView<T extends Element>(ref: React.RefObject<T | null>, rootMargin = '200px'): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
