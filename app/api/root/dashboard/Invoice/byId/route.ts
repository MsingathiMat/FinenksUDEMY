
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
    const InvoiceId = req.nextUrl.searchParams.get('InvoiceId') || null;

    if (!InvoiceId) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    const Invoice = await SingletonPrisma.invoices.findUnique({
      where: {
        InvoiceId: InvoiceId,
        CompanyId: CompanyData.CompanyId
      },
      include: {
        clients: true, // Assuming there's a related Client table
        user: true, 
       // Assuming there's a related User table
        InvoiceDetails: {
          include:{
            Items:true
          }
        },
        InvoiceChats: {
          include: {
            Users: true
          }
        }
      }
    });

   
    if (!Invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    // Calculate total for the Invoice (Quantity * Amount)
    const total = Invoice.InvoiceDetails.reduce((sum, detail) => {
      return sum + (detail.Quantity * detail.Amount.toNumber() );
    }, 0);

    const InvoiceWithTotal = {
      ...Invoice,
      total
    };

    
    return NextResponse.json(InvoiceWithTotal, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching Invoice", error: error.message }, { status: 500 });
  }
};
