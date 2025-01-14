
import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const GET = async (req: NextRequest) => {
  
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;
  const CompanyData = await  GetCompanyData()


  if(!CompanyData){
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }
  try {
  

    const Company = await SingletonPrisma.companies.findUnique({
      where: {
       
        CompanyId: CompanyData.CompanyId
      }
    });

   
    if (!Company) {
      return NextResponse.json({ message: "Company not found" }, { status: 404 });
    }

  
    
    return NextResponse.json(Company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching quotation", error: error.message }, { status: 500 });
  }
};
