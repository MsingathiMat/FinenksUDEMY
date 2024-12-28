
"use client"
import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'

import TableClients from './TableClients'
import FormSignup from './FormSignup';
import useActiveUser from '@/components/mtt/Hooks/useActiveUser';
import MttIsADMIN from '@/components/mtt/components/MttIsADMIN';

export const dynamic = 'force-dynamic';
const Page = () => {


  const {userData} = useActiveUser<ActiveUserType>() 


  return (
    <div className=' h-full w-full '>
   
 
   <MttTabContainer defaultValue="Users">

<MttTabList className="">

  <MttTabTrigger className=" " value="Users">
    Add Client
  </MttTabTrigger>
  <MttTabTrigger className="" value="List">
    User List
  </MttTabTrigger>

</MttTabList>

<MttTabContent className=" pt-8" value="Users">


<MttIsADMIN>
<FormSignup/>

</MttIsADMIN>
</MttTabContent>

<MttTabContent className=" pt-8" value="List">
    
<TableClients/>
    
    </MttTabContent>

</MttTabContainer>
    </div>
  )
}

export default Page
