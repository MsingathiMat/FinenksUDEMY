import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import React from 'react'

const MttSearchField = ({className,onTextChange}:{className?:string,onTextChange:(value:string)=>void}) => {
  return (
    <div className='relative'>
                <div className={cn("mtt-center size-[28px]  !bg-Pri rounded-sm absolute top-[3.5px] left-[3px]",className)}>
                  <Search size={18} className='text-white' />
                </div>
                <Input
                 onChange={(value)=>{onTextChange(value.target.value)}}
                  placeholder='Search'
                  className="pl-[50px]  h-InputHeight    "
                />
              </div>
  )
}

export default MttSearchField
