import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, { ComponentProps } from 'react'


interface ElementProp extends ComponentProps<'div'> {

    children: React.ReactNode,
    isRendered:boolean,
    setIsRendered:React.Dispatch<React.SetStateAction<boolean>>,
    className?:string
}


export default  function MttCloser({children,isRendered,setIsRendered,className,...rest}:ElementProp) {
  
  
  if(isRendered){
    return (
        <div {...rest} className={cn(' relative w-fit h-fit',className)}>
          

          <div onClick={()=>{
            setIsRendered(false)
          }} className='bg-red-600 size-8 shadow-lg hover:bg-red-500 hover:cursor-pointer rounded-full mtt-center absolute -top-2 -right-2 z-10'>
            <X size={15} color="white"/>
          </div>

          {children}
        </div>
      )

  }
  
   
}

