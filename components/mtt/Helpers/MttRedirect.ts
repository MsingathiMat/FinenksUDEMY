"use client"

import { SetStateAction } from "jotai";
import { Dispatch } from "react";



export const MttRedirect = (link:string, setRedirectLoading?: Dispatch<SetStateAction<boolean>>) => {


   if(setRedirectLoading){
    setRedirectLoading(true)
   }
    window.location.href = link;
}


