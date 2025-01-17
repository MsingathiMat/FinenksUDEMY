import * as React from "react"

import { cn } from "@/lib/utils"
import MttPlainCard from "./mttPlainCard"
import MttArrowText from "./MttArrowText"



export function MttStatsCard({className,title, description, icon, LinkTo}:{className?:string,title:string, description:string, icon:React.ReactNode,LinkTo?:string}) {
  return (
    <MttPlainCard className={cn(" w-fit min-w-[150px] ",className)}>
      <div>
       <div className=" mtt-center gap-3 w-full mtt-textSec mb-1 ">
       {icon}
      
       <h1 className=" text-[25px] ">{title} </h1>



       </div>

     {
      LinkTo?<MttArrowText className="!text-MtBgDark"  title={description } link={LinkTo}/>:null
     }
      
      
      </div>
   
    </MttPlainCard>
  )
}
