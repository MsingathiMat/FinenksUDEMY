import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'

import TableClients from './TableClients'
import FormAddCompany from './FormAddCompany';
export const dynamic = 'force-dynamic';
const page = ()=> {
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

<FormAddCompany/>

</MttTabContent>

<MttTabContent className=" pt-8" value="List">
    
<TableClients/>
    
    </MttTabContent>

</MttTabContainer>
    </div>
  )
}

export default page
