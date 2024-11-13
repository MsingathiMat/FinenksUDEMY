
import { NextRequest, NextResponse } from "next/server";

import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyId from "@/components/mtt/Api/helpers/GetCompanyId";

export const POST = async (req: NextRequest) => {
  const {ClientId,UserId,items} = await req.json();

  const CompanyId = await  GetCompanyId()


if(!CompanyId){
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
CompanyId:CompanyId,
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
    return NextResponse.json({ message: "Item not created", status: 500 });
  }
return NextResponse.json({message:"SUCCESS", payload:CreatedQuote},{status:201})
};
