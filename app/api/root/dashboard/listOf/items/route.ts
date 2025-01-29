import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";
import { ItemStatus } from "@prisma/client";



export const GET = async (req: NextRequest) => {
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;
  
  const ItemStatus = req.nextUrl.searchParams.get("ItemStatus")  as ItemStatus
  const CompanyData = await  GetCompanyData()


  if(!CompanyData){
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }
  try {


    if (ItemStatus){
 // Fetch all items from the database
 const allItems = await SingletonPrisma.items.findMany({
  where:{
    CompanyId:CompanyData.CompanyId,
    ItemStatus
  }
});

return NextResponse.json(allItems, { status: 200 });
    }else{

      const allItems = await SingletonPrisma.items.findMany({
        where:{
          CompanyId:CompanyData.CompanyId
        }
      });
      
      return NextResponse.json(allItems, { status: 200 });
    }
   

    // Return the fetched items as a JSON response
   
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error fetching items:", error);
    return NextResponse.json({ message: "Error fetching items", status: 500 });
  }
};
