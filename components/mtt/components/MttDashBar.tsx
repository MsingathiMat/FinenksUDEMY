
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Coins, EllipsisVertical } from 'lucide-react'
import React from 'react'
import MttPlainCard from './mttPlainCard'
import MttImage from './MttImage'
import MttArrowText from './MttArrowText'



const MttDashBar = ({title, description, link,src,statsItems}:{title:string, description:string, link:string,src:string,statsItems:{label:string, value:string}[]}) => {
  return (
   


    


    // <MattPlainCard className=" CENTER relative w-full h-auto lg:h-[80px] !gap-10 p-2 ">
    <MttPlainCard className=" relative  !bg-base1 gap-2  w-full !grid grid-col-2 sm:grid-cols-4   lg:grid-cols-6 gap-x-4">


<div className=" mtt-center gap-2  col-span-2 sm:col-span-4 lg:col-span-2 mr-auto">


<div className=" relative size-[65px]">

<MttImage src={src} fill label="label">

</MttImage>
</div>

<div className="">

<div className="mtt-center !flex-col w-fit !items-start max-w-[200px]">

<h1 className=" font-bold text-[13px]">{title}</h1>
<h1 className=" text-[12px] text-MtBgDark10 dark:text-MtMutedSec20 ">{description} </h1>

<MttArrowText title="Matthew" link={link} />
</div>

</div>
</div>






{

statsItems.map((val,index)=>(
<div key={index} className="mtt-center !flex-col w-fit  max-w-[200px] align-middle">


<h1 className=" font-bold text-[30px]">{val.value}</h1>
<h1 className=" text-[13px]">{val.label}</h1>


</div>

))
}








   
    </MttPlainCard>


  )
}

export default MttDashBar
