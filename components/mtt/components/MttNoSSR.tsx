"use client"
import React, { ReactNode, useEffect } from 'react'

const useIsBrowser = () => {
    const [isBrowser, setIsBrowser] = React.useState(false);
  
    useEffect(() => {
      setIsBrowser(typeof window !== "undefined");
    }, []);
  
    return isBrowser;
  };
const MttNoSSR = ({children}:{children:ReactNode}) => {
  
  const CanRun = useIsBrowser()
  
  if (!CanRun) {
    return null; 
  }

    return (
 <>
 {
    children
 }
 </>
    

  )
}

export default MttNoSSR
