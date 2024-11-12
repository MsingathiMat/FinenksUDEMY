import React from 'react'
import MttDashBar from "@/components/mtt/components/MttDashBar";
       
import { MttStatsCard } from "@/components/mtt/components/MttStatsCard";
import { Wallet2 } from "lucide-react";          
import TableEvents from '@/components/table';
          
const page = () => {
  return (
    <div className=' w-full h-[calc(100vh-210px)] flex-1 mtt-center !flex-col gap-4 !items-start !justify-start   '>
      
   
      <MttDashBar link="/login" title="Matthew" description="Best Developer" src="/me.jpg" statsItems={[{label:"Dev Projects",value:"96"},{label:"Monthly Sales",value:"R76"},{label:"Youtube Channels",value:"2"},{label:"Udemy Courses",value:"3"}]}/>     

         
 <div className=' mtt-center gap-4 '>
  
 <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
   <MttStatsCard className='  ' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
     
    
  </div>       
  <TableEvents/>       
    </div>
  )
}

export default page
