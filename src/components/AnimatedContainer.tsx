import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type ReactNode } from 'react'

export function AnimatedContainer({ children }: { children: ReactNode }) {
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent}>
      {children}
    </div>
  )
}
