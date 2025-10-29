declare module 'next' {
  export interface Metadata {
    title?: string
    description?: string
  }
}

declare module 'next/link' {
  import type { ReactNode } from 'react'

  export interface LinkProps {
    href: string
    children?: ReactNode
    className?: string
    prefetch?: boolean
    key?: string | number
  }

  const Link: (props: LinkProps) => ReactNode
  export default Link
}
