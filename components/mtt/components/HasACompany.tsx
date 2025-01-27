"use client";
import React, { useEffect, useState } from "react";
import useActiveUser from "../Hooks/useActiveUser";
import { useQuery } from "@tanstack/react-query";
import { QueryModels } from "../config/ReactQueryConfig";
import withUtilities from "../HOC/withUtilities";
import { useAtom } from "jotai";
import { UserCompany } from "../Atoms/AtomUserCompany";

import { Prisma } from "@prisma/client";
import FormAddCompany from "@/app/(root)/dashboard/company/Components/FormAddCompany";

const OriginalComp = ({
  Utilities,
  children,
}: {
  Utilities: UtilitiesProp;
  children: React.ReactNode;
}) => {
  const [, setUserCompany] = useAtom(UserCompany);
  const { Read } = Utilities;
  const { userData } = useActiveUser<ActiveUserType>();



  const [companySetup, setCompanySetup] = useState(false);

  const { data, isSuccess,refetch } = useQuery({
    
    queryKey: [QueryModels.UserCompany.QueryKey],
    queryFn: async () => {
      if (userData) {
        return await Read<Prisma.CompaniesCreateInput>("/api/root/dashboard/userCompany", { UserId: userData.activeId });
      }
      return null;
    },
    enabled: !!userData && userData.company === "NONE",
  });

  useEffect(() => {
   
    if (userData?.company === "NONE") {
    
       setCompanySetup(true);
    } else  {
      refetch().then(()=>{

      
      if(data){

   
        setUserCompany(data);
      }
        
   
       
      })
   
    }
  }, [userData, isSuccess, data]);

  return <>{companySetup ? 
    
    <div className='mtt-center w-full h-full !flex-col gap-8'>

      First, Setup your company. Please note that you will be logged out when you are done
    <FormAddCompany/>
      </div>
    : children}</>;
};

const HasACompany = withUtilities(OriginalComp);
export default HasACompany;
