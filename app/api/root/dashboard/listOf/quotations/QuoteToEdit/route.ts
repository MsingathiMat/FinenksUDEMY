import { Items } from '@prisma/client';
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

    const QuotationId = req.nextUrl.searchParams.get('QuotationId') || null;

    if (!QuotationId) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }


    const quotations = await SingletonPrisma.quotations.findUnique({
        where: {
          QuotationId: QuotationId,
          CompanyId: CompanyData.CompanyId
        },
        include: {
          clients: true, // Assuming there's a related Client table
          user: true, 
         // Assuming there's a related User table
          QuotationDetails: {
            include:{
              Items:true
            }
          },
       
          
        }
      });

      const flattenedQuotations = {
        ...quotations,
        QuotationDetails: quotations?.QuotationDetails.map((detail) => ({
          ...detail.Items,
          ...detail,
           // Merge `Items` fields into `QuotationDetails`
        })),
      };

 
    return NextResponse.json(flattenedQuotations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching quotations", error: error.message }, { status: 500 });
  }
};
