"use client"

import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

const useToggler = ({trueComponent,falseComponent, className,isTrue,setIsTrue}:{trueComponent:React.ReactNode,falseComponent:React.ReactNode,className?:string,isTrue:boolean,setIsTrue:Dispatch<SetStateAction<boolean>>}) => {

  
    const ToTogleComp=()=>{

        return (

          isTrue?<div onClick={()=>{ setIsTrue((prev)=>!prev)}} className={cn(" p-2  w-fit hover:cursor-pointer",className)}>
            {
                 falseComponent
            }
          </div>:<div onClick={()=>{ setIsTrue((prev)=>!prev)}} className={cn(" p-2  hover:cursor-pointer",className)}>
            {
                  trueComponent
            }
          </div>
        )
    }


   
  return {isTrue,setIsTrue,ToTogleComp}
}


export default useToggler
