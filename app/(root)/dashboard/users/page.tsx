
"use client"
import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'

import TableClients from './TableClients'

import useActiveUser from '@/components/mtt/Hooks/useActiveUser';
import MttIsADMIN from '@/components/mtt/components/MttIsADMIN';
import FormAddUser from './FormAddUser';

export const dynamic = 'force-dynamic';
const Page = () => {


  const {userData} = useActiveUser<ActiveUserType>() 


  return (
    <div className=' h-full w-full '>
   
   <MttIsADMIN>
<FormAddUser/>

</MttIsADMIN>
    </div>
  )
}

export default Page
