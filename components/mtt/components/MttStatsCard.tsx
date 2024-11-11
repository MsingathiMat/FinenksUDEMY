import * as React from "react"

import { cn } from "@/lib/utils"
import MttPlainCard from "./mttPlainCard"
import MttArrowText from "./MttArrowText"



export function MttStatsCard({className,title, description, icon}:{className?:string,title:string, description:string, icon:React.ReactNode}) {
  return (
    <MttPlainCard className={cn(" w-fit min-w-[150px] ",className)}>
      <div>
       <div className=" mtt-center !justify-between w-full mtt-textSec mb-1 ">

      
       <h1 className=" text-[25px] ">{title} </h1>

{icon}

       </div>

     
      
      <MttArrowText className="!text-MtBgDark"  title={description } link="/log"/>
      </div>
   
    </MttPlainCard>
  )
}
