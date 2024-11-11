import { DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import React from 'react'



const AvatarLogout = ({label}:{label:string}) => {
  return (

   
    <DropdownMenuRadioItem onClick={()=>{window.location.href="/api/signout"}} className=' text-[12px] hover:!bg-BaseShadeDark' value="bottom">{label}</DropdownMenuRadioItem>
  
  )
}

export default AvatarLogout
