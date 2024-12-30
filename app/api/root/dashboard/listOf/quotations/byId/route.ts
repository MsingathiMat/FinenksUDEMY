
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
    // Extract the ID from the request URL
    const QuotationId = req.nextUrl.searchParams.get('QuotationId') || null;

    if (!QuotationId) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    const quotation = await SingletonPrisma.quotations.findUnique({
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
        QuoteChats: {
          include: {
            Users: true
          }
        }
      }
    });

   
    if (!quotation) {
      return NextResponse.json({ message: "Quotation not found" }, { status: 404 });
    }

    // Calculate total for the quotation (Quantity * Amount)
    const total = quotation.QuotationDetails.reduce((sum, detail) => {
      return sum + (detail.Quantity * detail.Amount);
    }, 0);

    const quotationWithTotal = {
      ...quotation,
      total
    };

    
    return NextResponse.json(quotationWithTotal, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching quotation", error: error.message }, { status: 500 });
  }
};
