import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { NextRequest, NextResponse } from "next/server";



export const  GET = async (req:NextRequest)=>{

const Params =  req.nextUrl.searchParams

const UserId = Params.get("UserId")

if(!UserId){

    return NextResponse.json({error:"Required filed not valid"},{status:400})
}

const UserCompany = await SingletonPrisma.users.findUnique({
    where:{
        UserId
    },include:{
        Companies:true
    }
   
})

if(!UserCompany){
    return NextResponse.json({error:"Required filed not valid"},{status:400})
}


return NextResponse.json({UserCompany},{status:200})
}