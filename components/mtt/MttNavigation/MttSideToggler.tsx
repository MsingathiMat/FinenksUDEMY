"use client"

import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SquareMenu } from 'lucide-react'


import { MttNav } from '.'
const MttSideToggler = () => {

  

  return (
  <div className=' sm:hidden'>
      <Sheet>
    <SheetTrigger><SquareMenu className='' /></SheetTrigger>
    <SheetContent className=' mtt-base   w-fit p-4 px-8 pr-12 pt-12 '>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription>
<MttNav type="SIDEMOBILE"/>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  </div>
  )
}

export default MttSideToggler
