"use client"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

import React from "react"
  
  export function AlertQuoteEdit({title,content, children}:{title?:string,children:React.ReactNode, content:React.ReactNode}) {
    return (
      <AlertDialog >
  <AlertDialogTrigger asChild>
        <Button className="bg-white hover:bg-PriDarker  " variant="outline">{children}</Button>
      </AlertDialogTrigger>
        <AlertDialogContent className=" h-full top-0 left-0 translate-x-0 translate-y-0 p-0 bg-transparent ">
          <AlertDialogHeader className="bg-Base w-[100VW]  h-[100VH] p-8">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <div className=" mtt-center flex-col h-full w-full ">
<div className="flex-1 w-full h-full relative">
<AlertDialogFooter className="w-full">
            
            <AlertDialogPrimitive.Cancel>
            <X  className="ml-auto mb-6 text-Pri hover:text-red-500 hover:cursor-pointer">Cancel</X>
       
            </AlertDialogPrimitive.Cancel>
          
          </AlertDialogFooter>
{content}
</div>
<AlertDialogFooter className="w-full">
            <AlertDialogCancel className="ml-auto ">Cancel</AlertDialogCancel>
         
          </AlertDialogFooter>
            </div>
          </AlertDialogHeader>
         
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  