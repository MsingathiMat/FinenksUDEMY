"use client"

import * as React from "react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
const MttAvatar = ({
  title,
  user,
  AvatarItems,
}: {
  title?: string;
  user: { name?: string; imageSrc: string };
  AvatarItems: React.ReactNode[];
}) => {

  return (
    <DropdownMenu>
           <DropdownMenuTrigger asChild>
          <div className=" mtt-center gap-3 hover:cursor-pointer">
            <Avatar>
              <AvatarImage src={user.imageSrc} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {user.name ? (
              <p className=" text-[12px] hidden sm:block">{user.name}</p>
            ) : null}
          </div>
        </DropdownMenuTrigger>


      <DropdownMenuContent align="center" className=" bg-BaseShadeWhite border-BaseShade5 ">
       
               {title && (
            <>
              <DropdownMenuLabel>{title}</DropdownMenuLabel>{" "}
              <DropdownMenuSeparator />
            </>
          )}


{AvatarItems.map((item) => item)}
    
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MttAvatar


