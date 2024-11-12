
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { NextRequest, NextResponse } from "next/server";


export  const GET = async (req:NextRequest)=>{

const params = req.nextUrl.searchParams

const Companies = await SingletonPrisma.companies.findMany()


return NextResponse.json(Companies,{status:200})

}