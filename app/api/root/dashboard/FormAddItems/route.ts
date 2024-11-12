import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { Decimal } from "@prisma/client/runtime/library";
import { ItemStatus, ItemTypeEnum } from "@prisma/client";
export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const ItemName = data.get("ItemName") as string | null;
  const UserId = data.get("UserId") as string | null;
  const ItemStatus = data.get("ItemStatus") as string | null;
  const ItemType = data.get("ItemType") as ItemType | null;
  const Description = data.get("Description") as string | null;
  const Quantity = data.get("Quantity") as string | null;
  const Amount = data.get("Amount") as Decimal | null;

  if (!ItemName || !ItemType || !Description || !Quantity || !Amount || !UserId ) {
   
   
    return NextResponse.json({ItemName,ItemType,Description,Quantity ,Amount });
  }



  const existingItem = await SingletonPrisma.items.findUnique({
    where: {ItemName },
  });


 

  if (existingItem) {
    return NextResponse.json({ error: "Item name already exists", status: 400 });
  }

  const AddedItem = await SingletonPrisma.items.create({
   data:{
    UserId:UserId as string,
    ItemName:ItemName,
    ItemStatus:ItemStatus as ItemStatus,
    ItemType:ItemType as ItemTypeEnum,
    Quantity:parseInt(Quantity) ,
    Amount: Amount as Decimal,
    Description
   }
    },
  );

  if (!AddedItem) {
    return NextResponse.json({ message: "Item not created", status: 500 });
  }
return NextResponse.json(AddedItem,{status:201})
};
