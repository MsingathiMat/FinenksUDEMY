"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAtom } from "jotai";

import { SheetClose } from "@/components/ui/sheet";
import {  NavHeading, MttNavItemsATOM, MttNavIsVisibleAtom, MttNavIsExpandedAtom  } from "../Atoms/MtNavAtom";
import { useEffect } from "react";





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
//   const Path = usePathname();




// const [navItems] = useAtom(MttNavItemsATOM)
// const [,setNavHeading] = useAtom(NavHeading)
// const [isVisible] = useAtom(MttNavIsVisibleAtom)

// const [expanded,setIsexpanded] = useAtom(MttNavIsExpandedAtom)

// if(!collapsible){

//   setIsexpanded(false)
// }
  

// if(navItems){

//   // console.log(`${navItems[1].basePath}${navItems[1].path} `)
  
//   const Active = navItems.filter((val)=>`${val.basePath}${val.path}`==Path)

// if(!Active[0]){

//   alert("You are using MttNav without route configuration, please look for the file 'NavList.tsx' and set your base path")
// }

//   setNavHeading(Active[0].label)



// }
// if (!navItems){

//     return <p className=" bg-red-500 p-2">Undefined Nav item list</p>
// }
  
//   if(!isVisible){

//     return null
//   }

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

  useEffect(() => {
    if (navItems && navItems.length > 0) {
      const Active = navItems.find((val) => `${val.basePath}${val.path}` === Path || Path.startsWith(`${val.basePath}${val.path}`));
      if (!Active) {
        alert("You are using MttNav without route configuration, please look for the file 'NavList.tsx' and set your base path");
      } else {
        setNavHeading(Active.label);
      }
    }
  }, [Path, navItems, setNavHeading]);

  if (!navItems) {
    return <p className="bg-red-500 p-2">Undefined Nav item list</p>;
  }

  if (!isVisible) {
    return null;
  }

if(type=="SIDEMOBILE"){

  
const mobile=false
  return (
    <div className={cn("relative   dark:bg-MtBgDark10  z-40 pt-16 pb-4 sm:hidden flex flex-col   border-b border-MtBgDark10   h-full w-[80px]  items-center justify-between",
    )}>




      <div className={cn("flex flex-col gap-5 h-full  ")}>
       
      {

topItem? <div className="mtt-center flex-col ">

<div className={cn("flex relative mb-6")}>
  <div className=" flex h-11 w-11  items-center justify-center rounded-lg">
    {topItem.component} 
  </div>
 
</div>

 

</div>:null
}
       
       <div className={cn("  mtt-center flex-col !justify-start  gap-4  flex-1")}>

        
       {navItems.map((navItem, index) => {


          const ActivePath = navItem.basePath? `${navItem.basePath}${navItem.path}`: navItem.path;
         
         
           
          return (
           <SheetClose asChild  key={index}>

<Link
             
              href={
                navItem.basePath
                  ? `${navItem.basePath}${navItem.path}`
                  : navItem.path
                  
              }

              className={cn("",true?" group mtt-center !justify-start ":null)}
            >
              <div className="flex relative  ">
                <div className={cn(" NavHover flex hover:cursor-pointer dark:group-hover:bg-MtBgDark20 h-11 w-11 mtt-center rounded-lg",mobile?" NavHover2":null)}>
                  <div
                    className={cn(
                      " ",
                      Path == `${ActivePath}` ?  " text-Pri" : " text-red-500 "
                    )}
                  >
                  <div className={cn(" dark:!text-white",Path == `${ActivePath}` ?  " dark:!text-Pri" : " ")}>  {navItem.icon}</div>
                  </div>
                </div>
               {
                false? <label className={cn("left-10 opacity-0  transition-all duration-500   text-sm rounded-lg mtt-center bg-Base absolute dark:bg-MtMutedTet30 top-2  text-white w-auto pl-3 h-8 pr-3 z-40 ",mobile?" -top-[25px] left-0 -translate-x-[25%]":null)}>
                {navItem.label}
              </label>:null
               }
              </div>
              {true?<p className={cn("pl-2 text-xs dark:group-hover:text-Pri", Path == `${ActivePath}` ?  " text-Pri":null)}>{navItem.label}</p>:null}
            </Link>
           </SheetClose>
          );
        })}
       </div>


{

bottomItem? <div className="mtt-center flex-col">

<div className={cn("flex relative mt-6",mobile?" mt-0 ml-6":null)}>
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


if(type=="MOBILE"){

  const mobile=true
  return (
    <div className={cn("relative   dark:bg-MtBgDark10  z-40 pt-16 pb-4 hidden sm:flex flex-col   border-b border-MtBgDark10   h-full w-[80px]  items-center justify-between",
    mobile?" mtt-center w-full h-[120px] sm:!hidden pb-0 ":expanded?" w-auto px-5":null )}>





    {

      !mobile?  <div onClick={()=>{setIsexpanded((prev)=>!prev)}} className=" translate-x-1/2 absolute right-0 top-4 hover:cursor-pointer w-[25px] h-[25px] rounded-full shadow-2xl mtt-center bg-[#36e3da]" >
      {expanded?<ChevronLeft size={20} color="white" /> :<ChevronRight size={20} color="white" /> }
      </div>:null
    }
      <div className={cn("flex flex-col gap-5 h-full  ",mobile?" border-b-2 gap-0  mtt-center  flex-row -mb-0 !px-[40px]   w-full":"")}>
       
      {

topItem? <div className="mtt-center flex-col ">

<div className={cn("flex relative mb-6",mobile?" mb-0 mr-6":null)}>
  <div className=" flex h-11 w-11  items-center justify-center rounded-lg">
    {topItem.component} 
  </div>
 
</div>

 

</div>:null
}
       
       <div className={cn("  mtt-center flex-col !justify-start  gap-4  flex-1",mobile?" !justify-center flex-row":expanded?"!items-start":null)}>

        
       {navItems.map((navItem, index) => {
          const ActivePath = navItem.basePath
            ? `${navItem.basePath}${navItem.path}`
            : navItem.path;

          return (
            <Link
              key={index}
              href={
                navItem.basePath
                  ? `${navItem.basePath}${navItem.path}`
                  : navItem.path
                  
              }

              className={cn("",expanded?" group mtt-center   !flex-col ":null)}
            >
              <div className="flex relative  ">
                <div className={cn(" NavHover flex hover:cursor-pointer dark:group-hover:bg-MtBgDark20 h-11 w-11 mtt-center  rounded-lg",mobile?" NavHover2":null)}>
                  <div
                    className={cn(
                      " text-[#4A4B4B]",
                      Path == `${ActivePath}` ?  " text-pri" : " "
                    )}
                  >
                  <div className={cn(" dark:!text-white",Path == `${ActivePath}` ?  " dark:text-pri" : " ")}>  {navItem.icon}</div>
                  </div>
                </div>
               {
                !expanded? <label className={cn("left-10 opacity-0  transition-all duration-500   text-sm rounded-lg mtt-center bg-black absolute dark:bg-MtMutedTet30 top-2  text-white w-auto pl-3 h-8 pr-3 z-40 ",mobile?" -top-[25px] left-0 -translate-x-[25%]":null)}>
                {navItem.label}
              </label>:null
               }
              </div>
              {expanded?<p className={cn("pl-2 text-xs dark:group-hover:text-MtPopPri30", Path == `${ActivePath}` ?  " text-pri":null)}>{navItem.label}</p>:null}
            </Link>
          );
        })}
       </div>


{

bottomItem? <div className="mtt-center flex-col">

<div className={cn("flex relative mt-6",mobile?" mt-0 ml-6":null)}>
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
            <Link
              key={index}
              href={
                navItem.basePath
                  ? `${navItem.basePath}${navItem.path}`
                  : navItem.path
                  
              }

              className={cn("",expanded?" group mtt-center !justify-start ":null)}
            >
              <div className="flex relative  ">
                <div className={cn(" NavHover flex hover:cursor-pointer dark:group-hover:text-Pri h-11 w-11 mtt-center rounded-lg")}>
                  <div
                    className={cn(
                      " text-[#4A4B4B]",
                      Path == `${ActivePath}` ?  " text-Pri " : " "
                    )}
                  >
                  <div className={cn(" dark:!text-white",Path == `${ActivePath}` ?  " !text-Pri dark:!text-Pri" : " ")}>  {navItem.icon}</div>
                  </div>
                </div>
               {
                !expanded? <label className={cn("left-10 opacity-0  transition-all duration-500   text-sm rounded-md mtt-center bg-Pri dark:bg-Pri absolute dark:bg-MtMutedTet30 top-2  text-white w-auto pl-3 h-8 pr-3 z-40 ")}>
                {navItem.label}
              </label>:null
               }
              </div>
              {expanded?<p className={cn("pl-2 text-xs dark:group-hover:text-Pri", Path == `${ActivePath}` ?  " text-Pri":null)}>{navItem.label}</p>:null}
            </Link>
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


