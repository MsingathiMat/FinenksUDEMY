import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from '@/components/mtt/Api/helpers/GetCompanyData';

export const GET = async (req: NextRequest) => {
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;

  const CompanyData = await GetCompanyData();

  if (!CompanyData) {
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }

  try {
    const invoices = await SingletonPrisma.invoices.findMany({
      where: {
        CompanyId: CompanyData.CompanyId,
      },
      include: {
        InvoiceDetails: true, // Only include InvoiceDetails as we need to calculate totals
      },
    });

    // Calculate the total amount for all invoices
    const totalAmount = invoices.reduce((total, invoice) => {
      const invoiceTotal = invoice.InvoiceDetails.reduce((sum, detail) => {
        return sum + (detail.Quantity * detail.Amount);
      }, 0);
      return total + invoiceTotal;
    }, 0);

    return NextResponse.json({ totalAmount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching invoices", error: error.message }, { status: 500 });
  }
};
