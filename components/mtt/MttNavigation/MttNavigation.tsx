"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAtom } from "jotai";

import {  NavHeading, MttNavItemsATOM, MttNavIsVisibleAtom, MttNavIsExpandedAtom  } from "../Atoms/MtNavAtom";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 




type navGeneralItemTopProp = {

  component: React.ReactNode;



};

function MttNavigation({
 
  bottomItem,
  topItem,
  type,
  collapsible=true

}: {
 
  bottomItem?: navGeneralItemTopProp;
  topItem?: navGeneralItemTopProp;

  type:"DESKTOP" | "MOBILE" | "SIDEMOBILE";
  collapsible?:boolean
 
 
}) {


const Path = usePathname();

  const [navItems] = useAtom(MttNavItemsATOM);
  const [, setNavHeading] = useAtom(NavHeading);
  const [isVisible] = useAtom(MttNavIsVisibleAtom);
  const [expanded, setIsexpanded] = useAtom(MttNavIsExpandedAtom);


  useEffect(() => {
    if (!collapsible) {
      setIsexpanded(false);
    }
  }, [collapsible, setIsexpanded]);

  // useEffect(() => {
  //   if (navItems && navItems.length > 0) {
  //     const Active = navItems.find((val) => `${val.basePath}${val.path}` === Path || Path.startsWith(`${val.basePath}${val.path}`));
  //     if (!Active) {
  //       alert("You are using MttNav without route configuration, please look for the file 'NavList.tsx' and set your base path");
  //     } else {
  //       setNavHeading(Active.label);
  //     }
  //   }
  // }, [Path, navItems, setNavHeading]);

  if (!navItems) {
    return <p className="bg-red-500 p-2">Undefined Nav item list</p>;
  }

  if (!isVisible) {
    return null;
  }





 if(type=="DESKTOP"){
  return (
    <div className={cn("relative   mtt-Alpha  z-40 pt-16 pb-4 hidden sm:flex flex-col     h-full w-[80px]  items-center justify-between",
   expanded?" w-fit px-5":null )}>





    {

 collapsible?   <div onClick={()=>{setIsexpanded((prev)=>!prev)}} className=" translate-x-1/2 absolute right-0 top-4 hover:cursor-pointer hover:bg-PriDarker w-[25px] h-[25px] rounded-full shadow-2xl mtt-center bg-Pri" >
 {expanded?<ChevronLeft size={20} color="white" /> :<ChevronRight size={20} color="white" /> }
 </div>:null
    }
      <div className={cn("flex flex-col gap-5 h-full  ")}>
       
      {

topItem? <div className="mtt-center flex-col ">

<div className={cn("flex relative mb-6 ")}>
  <div className=" flex h-11 w-11  items-center justify-center rounded-lg">
    {topItem.component} 
  </div>
 
</div>

 

</div>:null
}
       
       <div className={cn("  mtt-center flex-col !justify-start   gap-4  h-full flex-1 pr-6",expanded?"!items-start":null)}>

        
       {navItems.map((navItem, index) => {
          const ActivePath = navItem.basePath
            ? `${navItem.basePath}${navItem.path}`
            : navItem.path;

          return (
            <div
              key={index}
            
              className={cn("",expanded?" group mtt-center !justify-start ":null)}
            >
              <div className="flex relative  ">
               {

                !expanded? <div className={cn("  NavHover flex hover:cursor-pointer dark:group-hover:text-Pri h-11 w-11 mtt-center rounded-lg")}>
                <div
                  className={cn(
                    " text-[#4A4B4B]",
                    Path == `${ActivePath}` ?  " text-Pri " : " "
                  )}
                >
                <div className={cn(" dark:!text-white ",`${Path}`.startsWith(ActivePath) ?  " !text-Pri dark:!text-Pri" : " ")}>  {navItem.icon}</div>
                </div>
              </div>:null
               }
               {
                !expanded? 
                
                <label className={cn("left-10 opacity-0  transition-all duration-500   text-sm rounded-md mtt-center bg-Pri dark:bg-Pri absolute dark:bg-MtMutedTet30 top-2  text-white w-auto pl-3 h-8 pr-3 z-40 ")}>
                {navItem.label}
           
              </label>

              :null
               }


              </div>
              {expanded?
              
              navItem.subMenu.length>0?
              <Accordion type="single" collapsible className="w-full h-fit mtt-center">
              <AccordionItem value="item-1">
                      <AccordionTrigger>
                      <div className={cn(" dark:!text-white ",`${Path}`.startsWith(ActivePath) ?  " !text-Pri dark:!text-Pri" : " ")}>  {navItem.icon}</div>
                      <p className={cn("pl-2 text-xs dark:group-hover:text-Pri", `${Path}`.startsWith(ActivePath) ?  " text-Pri":null)}>{navItem.label}</p>
             
                      </AccordionTrigger>
                      <AccordionContent>
                     
             
{

navItem.subMenu.map((Item,index)=>



  
<Link
key={index}
href={
  navItem.basePath
    ? `${navItem.basePath}${navItem.path}/${Item}`
    : `${navItem.path}/${Item}`
    
}

className={cn("",expanded?" ml-5 group mtt-center !justify-start ":null)}
>
<p key={index} className={cn("pl-2 text-xs hover:text-Pri pt-2  w-full", `${Path}` == `${ActivePath}/${Item}` ?  " text-Pri":null)}>{Item}</p>

  </Link>



)


             
}

         
                     
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>:         <>      <div className={cn(" dark:!text-white ",Path == `${ActivePath}` ?  " !text-Pri dark:!text-Pri" : " ")}>  {navItem.icon}</div>
                  <Link
              key={index}
              href={
                navItem.basePath
                  ? `${navItem.basePath}${navItem.path}`
                  : navItem.path
                  
              }

              className={cn("",expanded?" group mtt-center !justify-start ":null)}
            >
  <p className={cn("pl-2 text-xs dark:group-hover:text-Pri hover:cursor-pointer", Path == `${ActivePath}` ?  " text-Pri":null)}>{navItem.label}</p>
            </Link>
            
     </>
              
              :
              
     null
              }
            </div>
          );
        })}
       </div>


{

bottomItem? <div className="mtt-center flex-col">

<div className={cn("flex relative mt-6")}>
  <div className=" flex h-11 w-11  items-center justify-center rounded-lg">
    {bottomItem.component} 
  </div>
 
</div>

 

</div>:null
}
      </div>

   
    </div>
  );
 }
}

export default MttNavigation;


