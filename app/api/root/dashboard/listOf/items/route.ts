import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyId from "@/components/mtt/Api/helpers/GetCompanyId";

export const GET = async (req: NextRequest) => {
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;
  
  const CompanyId = await  GetCompanyId()


  if(!CompanyId){
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }
  try {
    // Fetch all items from the database
    const allItems = await SingletonPrisma.items.findMany({
      where:{
        CompanyId
      }
    });

    // Return the fetched items as a JSON response
    return NextResponse.json(allItems, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error fetching items:", error);
    return NextResponse.json({ message: "Error fetching items", status: 500 });
  }
};
