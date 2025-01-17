
import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'
import FormAddClient from './FormAddClient'
import TableClients from './TableClients';


export const dynamic = 'force-dynamic';
const Page = () => {



  return (
    <div className=' h-full w-full '>
   
   <TableClients/>
    </div>
  )
}

export default Page
