"use client"
import React from 'react'
import useActiveUser from '../Hooks/useActiveUser'
import { FileWarning } from 'lucide-react'

const MttIsADMIN = ({children}:{children:Readonly<React.ReactNode>}) => {
  
  
    const {userData} = useActiveUser<ActiveUserType>() 
  
   
    if(userData?.activeRole=="ADMIN"){
        return (
            <>
              {
                children
              }
            </>
          )

    }
    return (
    <div className=' mtt-center gap-5'>
      <FileWarning />

      <p>ADMIN only FEATURE</p>
    </div>
  )
}

export default MttIsADMIN
