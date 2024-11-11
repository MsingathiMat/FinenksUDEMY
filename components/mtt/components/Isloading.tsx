
"use client"
import React from 'react'

import { cn } from '@/lib/utils'
import Loader from './Loader'


function IsLoading({children, size, isLoading,className}:{children:React.ReactNode,size?:number, isLoading:boolean,className?:string}) {
  
  

  return (
    <>
      
      <div className={cn("w-fit h-fit",className)}>

      {
      
      isLoading?<Loader size={size} IsLoading={isLoading}/>:children
      
      }
      </div>
     
    </>
  )
}

export default IsLoading
