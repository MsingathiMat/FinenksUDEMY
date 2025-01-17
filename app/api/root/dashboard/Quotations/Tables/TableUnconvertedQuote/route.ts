import { Users } from './../../../../../../node_modules/.prisma/client/index.d';
import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from '@/components/mtt/Api/helpers/GetCompanyData';

export const GET = async (req: NextRequest) => {
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;

  const CompanyData = await  GetCompanyData()


  if(!CompanyData){
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }
  try {


    
    const quotations = await SingletonPrisma.quotations.findMany({
      where:{
        CompanyId:CompanyData.CompanyId,
        status:"CREATED"
      },
      include: {
        clients:true ,// Assuming there's a related Client table
        user: true,   // Assuming there's a related User table
        QuotationDetails: true, // Include details for each quotation
      }
    });

    // Calculate total for each quotation (Quantity * Amount)
    const quotationsWithTotal = quotations.map((quote) => {

      const total = quote.QuotationDetails.reduce((sum, detail) => {
        return sum + (detail.Quantity * detail.Amount);
      }, 0);
      
      return {
        ...quote,
        total
      };
    });

    return NextResponse.json(quotationsWithTotal, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching quotations", error: error.message }, { status: 500 });
  }
};
