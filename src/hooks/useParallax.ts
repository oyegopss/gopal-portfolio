'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useParallax(offset = 0.1): MotionValue<number> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, [0, 500], [0, 500 * offset])
}

export function useParallaxValue(scrollYProgress: MotionValue<number>, range: [number, number]) {
  return useTransform(scrollYProgress, [0, 1], range)
}
