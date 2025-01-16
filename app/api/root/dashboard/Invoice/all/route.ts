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


    
    const invoices = await SingletonPrisma.invoices.findMany({
      where:{
        CompanyId:CompanyData.CompanyId
      },
      include: {
        clients:true ,// Assuming there's a related Client table
        user: true,   // Assuming there's a related User table
        InvoiceDetails: true, // Include details for each Invoice
      }
    });

    // Calculate total for each Invoice (Quantity * Amount)
    const invoicesWithTotal = invoices.map((quote) => {

      const total = quote.InvoiceDetails.reduce((sum, detail) => {
        return sum + (detail.Quantity * detail.Amount);
      }, 0);
      
      return {
        ...quote,
        total
      };
    });

    return NextResponse.json(invoicesWithTotal, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching invoices", error: error.message }, { status: 500 });
  }
};
