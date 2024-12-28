
import { getActiveUser } from './getActiveUser'
import SingletonPrisma from '../Prisma/singleton'
import { Prisma } from '@prisma/client'

const GetCompanyData = async():Promise<Prisma.CompaniesCreateInput | null> => {
 
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


if(!data){
    return null
}

const CompanyData  = SingletonPrisma.companies.findUnique({
  
    where:{
        CompanyId:data.CompanyId
    }
})

return CompanyData
}
export default GetCompanyData
