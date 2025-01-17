import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'
import FormAddItem from './FormAddItem'



const page = ({params}:{params:string}) => {
  return (
    <div className=' h-full w-full '>
   
   <FormAddItem/>
    </div>
  )
}

export default page
