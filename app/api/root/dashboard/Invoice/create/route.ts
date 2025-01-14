// import { NextRequest, NextResponse } from "next/server";
// import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
// import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

// export const POST = async (req: NextRequest) => {
//   try {
//     const data = await req.json();
//     const { ClientId, UserId, QuotationId, QuotationDetails } = data;

//     console.log("Received data:", data);

//     const CompanyData = await GetCompanyData();

//     if (!CompanyData) {
//       return NextResponse.json(
//         { message: "Unrecognized Company", status: 400 },
//         { status: 400 }
//       );
//     }

//     if (!ClientId || !QuotationDetails || !UserId || !QuotationId) {
//       return NextResponse.json(
//         { message: "Required fields missing" },
//         { status: 400 }
//       );
//     }

//     // Create the invoice using Prisma
//     const CreatedInvoice = await SingletonPrisma.invoices.create({
//       data: {
//         ClientId,
//         status: "CREATED",
//         UserId,
//         QuotationId,
//         CompanyId: CompanyData.CompanyId as string,
//         InvoiceDetails: {
//           create: QuotationDetails.map((item) => ({
//             ItemId: item.ItemId, // Ensure the key matches your schema
//             ItemName: item.ItemName,
//             Quantity: item.Quantity,
//             Amount: item.Amount,
//             Description: item.Description, // Optional field, ensure it exists in schema
//           })),
//         },
//       },
//       include: {
//         InvoiceDetails: true,
//       },
//     });

//     if (!CreatedInvoice) {
//       return NextResponse.json(
//         { message: "Invoice not created", status: 500 },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { message: "SUCCESS", payload: CreatedInvoice },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating invoice:", error);
//     return NextResponse.json(
//       { message: "An error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";
import { Prisma } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { ClientId, UserId, QuotationId, QuotationDetails } = data;

    console.log("Received data:", data);

    // Fetch company data
    const CompanyData = await GetCompanyData();
    if (!CompanyData) {
      return NextResponse.json(
        { message: "Unrecognized Company", status: 400 },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!ClientId || !QuotationDetails || !UserId || !QuotationId) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // Create the invoice using Prisma
    const CreatedInvoice = await SingletonPrisma.invoices.create({
      data: {
        ClientId,
        status: "CREATED",
        UserId,
        QuotationId,
        CompanyId: CompanyData.CompanyId as string,
        InvoiceDetails: {
          create: QuotationDetails.map((item) => ({
            ItemId: item.ItemId,
            Quantity: item.Quantity,
            Amount: new Prisma.Decimal(item.Amount), // Ensure Amount is a Decimal
          })),
        },
      },
      include: {
        InvoiceDetails: {
          include: {
            Items: true, // Include related item details
          },
        },
        clients: true,
        Quotations: true,
        Company: true,
      },
    });

    // Check if invoice creation failed
    if (!CreatedInvoice) {
      return NextResponse.json(
        { message: "Invoice not created", status: 500 },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "SUCCESS", payload: CreatedInvoice },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
};
