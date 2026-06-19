// Type shim: lucide-react@1.8.0 ships no declaration file, so we declare the
// icon components we use as typed React components.
declare module 'lucide-react' {
  import type { FC, SVGProps } from 'react'

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }

  export type LucideIcon = FC<LucideProps>

  export const ChevronDown: LucideIcon
  export const ChevronRight: LucideIcon
  export const X: LucideIcon
  export const ArrowLeft: LucideIcon
  export const Check: LucideIcon
  export const CheckCircle: LucideIcon
  export const Home: LucideIcon
  export const Undo2: LucideIcon
  export const ExternalLink: LucideIcon
}
