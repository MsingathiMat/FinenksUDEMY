import { cn } from '@/lib/utils'
import React from 'react'

const MttAlphaBottom = ({children, className,alpha}:{children:Readonly<React.ReactNode>,className?:string,alpha?:"1"|"2"|"3"}) => {
  return (
    <div
    className={cn(
      "absolute top-0 left-0 w-full h-full bg-gradient-to-t from-20% via-50% from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.8)] to-transparent",
      alpha === "1"
        ? "from-[rgba(0,0,0,0.94)] from-30% via-[rgba(0,0,0,0.5)] via-80% to-[rgba(0,0,0,0.70)]"
        : alpha === "2"
        ? "from-[rgba(0,0,0,0.98)] from-40% via-80% via-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.8)]"
        : alpha === "3"
        ? "from-[rgba(0,0,0,0.99)] from-40% via-80% via-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.9)]"
        : "",
      className
    )}
  >
    {children}
  </div>
  )
}

export default MttAlphaBottom
