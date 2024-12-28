import GetCompanyData from '@/components/mtt/Api/helpers/GetCompanyData';

import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { NextRequest, NextResponse } from "next/server";



export const  GET = async ()=>{



const CompanyData = await GetCompanyData()


if(!CompanyData){

    return NextResponse.json({error:"Required filed not valid"},{status:400})
}




return NextResponse.json(CompanyData,{status:200})
}