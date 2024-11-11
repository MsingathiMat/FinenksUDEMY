import { cn } from '@/lib/utils'
import React from 'react'

const MttPlainCard = ({children,className, hover}:{children:React.ReactNode,className?:string, hover?:boolean}) => {
  return (
    <>
    
{


    hover?
    <div className={cn("    bg-BaseShade2White  hover:cursor-pointer   p-4",className)}>

    {
        children
    }
    
      </div>:
          <div className={cn(" rounded-sm bg-BaseShade3White  border  border-input p-4",className)}>

          {
              children
          }
          
            </div>
}
    </>


  )
}

export default MttPlainCard
