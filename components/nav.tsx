import React from 'react'
import { MttNav, MttNavSwitch, MttSideNavToggler,MttNavHeader }  from '@/components/mtt/MttNavigation'
import { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger } from '@/components/mtt/components/MttTabs'
const Nav = () => {
  return (
    <div>
         
         <MttTabContainer defaultValue="Users">

<MttTabList className="">

  <MttTabTrigger className="" value="Users">
    Users
  </MttTabTrigger>
  <MttTabTrigger className="" value="List">
    User List
  </MttTabTrigger>

</MttTabList>

<MttTabContent className="" value="Users">
  Users Content
</MttTabContent>

<MttTabContent value="List">User List Content</MttTabContent>

</MttTabContainer>
        
      <MttNav type="DESKTOP"/>
    </div>
  )
}

export default Nav
