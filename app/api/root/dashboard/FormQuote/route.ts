
import { NextRequest, NextResponse } from "next/server";

import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const POST = async (req: NextRequest) => {
  const {ClientId,UserId,items} = await req.json();

  const CompanyData = await  GetCompanyData()


if(!CompanyData){
  return NextResponse.json({ message: "Unrecognized Company", status: 400 });
}

  if (!ClientId || !items || !UserId ) {
   
   
    return NextResponse.json({message:"Required UI fields missing"},{status:400});
  }


 const CreatedQuote = await SingletonPrisma.quotations.create({

    data:{
        ClientId,
        status:"CREATED",
UserId,
CompanyId:CompanyData.CompanyId as string,
QuotationDetails:{
    create: items.map((item:QuoteRowType)=>({
        ItemId: item.ItemCode,
        Quantity: item.quantity,
        Amount: item.amount,
      
    }))
}
    },
    include:{
        QuotationDetails:true
    }
 })



  if (!CreatedQuote) {
    return NextResponse.json({ message: "Quotation not created", status: 500 });
  }
return NextResponse.json({message:"SUCCESS", payload:CreatedQuote},{status:201})
};
