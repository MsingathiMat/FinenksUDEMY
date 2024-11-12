import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'



import TableClients from './TableClients'
import Quote from './quote'
const page = () => {
  return (
    <div className=' h-full w-full '>
   
 
   <MttTabContainer defaultValue="Users">

<MttTabList className="">

  <MttTabTrigger className=" " value="Users">
    Add Quotation
  </MttTabTrigger>
  <MttTabTrigger className="" value="List">
    Quotations 
  </MttTabTrigger>

</MttTabList>

<MttTabContent className=" pt-8" value="Users">


<Quote/>

</MttTabContent>

<MttTabContent className=" pt-8" value="List">
    
<TableClients/>
    
    </MttTabContent>

</MttTabContainer>
    </div>
  )
}

export default page
