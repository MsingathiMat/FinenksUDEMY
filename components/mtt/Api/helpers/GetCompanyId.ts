
import React from 'react'
import { getActiveUser } from './getActiveUser'
import SingletonPrisma from '../Prisma/singleton'

const GetCompanyId = async():Promise<string | null> => {
 
    const user = await getActiveUser<ActiveUserType>()

  if(!user){

   return null

  }

  
  const data = await SingletonPrisma.users.findUnique({
    where:{
        UserId:user.activeId
    },
    select:{
        CompanyId:true
    }
})



return data.CompanyId

  
}

export default GetCompanyId
