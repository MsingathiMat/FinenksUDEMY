
import { NextRequest, NextResponse } from "next/server";

import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";

export const POST = async (req: NextRequest) => {
  const {QuotationId,UserId,message} = await req.json();





  if (!QuotationId || !UserId || !message ) {
   
   
    return NextResponse.json({message:"Required UI fields missing"},{status:400});
  }


 const AddedMessage = await SingletonPrisma.quoteChats.create({

    data:{
      UserId,
      QuotationId,
      message,
}
   
 })



  if (!AddedMessage) {
    return NextResponse.json({ message: "Message not created", status: 500 });
  }
return NextResponse.json(AddedMessage,{status:201})
};
