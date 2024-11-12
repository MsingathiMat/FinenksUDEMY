"use client"
import React from 'react'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'
import FormAddClient from './FormAddClient'
import TableClients from './TableClients'
import { useParams } from 'next/navigation'
const Page = () => {

const SearchParams = useParams()
console.log(SearchParams)
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

<FormAddClient/>

</MttTabContent>

<MttTabContent className=" pt-8" value="List">
    
<TableClients/>
    
    </MttTabContent>

</MttTabContainer>
    </div>
  )
}

export default Page
