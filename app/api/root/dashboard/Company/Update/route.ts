// import { NextRequest, NextResponse } from "next/server";
// import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
// import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

// export const POST = async (req: NextRequest) => {
//     const CompanyData = await  GetCompanyData()


// if(!CompanyData){
//   return NextResponse.json({ message: "Unrecognized Company", status: 400 });
// }
//   const data = await req.formData();


//   const CompanyName = data.get("CompanyName") as string | null;
//   const UserId = data.get("UserId") as string | null;
//   const ContactPerson = data.get("ContactPerson") as string | null;
//   const TagLine = data.get("TagLine") as string | null;
//   const ContactNo = data.get("ContactNo") as string | null;
//   const Email = data.get("Email") as string | null;

//   const Currency = data.get("Currency") as string | null;
//   const BankName = data.get("BankName") as string | null;
//   const BankType = data.get("BankType") as string | null;
//   const BankAccount = data.get("BankAccount") as string | null;
//   const Logo = data.get("Logo") as string | null;
//   const PaymentTerms = data.get("PaymentTerms") as string | null;

//   if (
//     !CompanyName ||
//     !ContactPerson ||
//     !ContactNo ||
//     !Email ||
//     !TagLine ||
//     !UserId ||
//     !Currency ||
//     !BankName ||
//     !BankType ||
//     !BankAccount ||
//     !PaymentTerms ||
//     !Logo
//   ) {
//     return NextResponse.json({
//       error: "Some UI inputs not received",
//     });
//   }



//   // Check if the company exists
//   const CompanyExist = await SingletonPrisma.companies.findUnique({
//     where: { CompanyId:CompanyData.CompanyId },
//   });


//   if (!CompanyExist) {
//     return NextResponse.json({ error: "Company does not exist", status: 404 });
//   }

//   // Transaction block for atomic operations
//   try {
//     const result = await SingletonPrisma.$transaction(async (prisma) => {
//       // Update the company
//       const UpdatedCompany = await prisma.companies.update({
//         where: { CompanyId:CompanyData.CompanyId }, // Assuming 'Email' is unique for the company
//         data: {
//           CompanyName,
//           ContactPerson,
//           TagLine,
//           ContactNo,
//           Email,
//           Logo,
//           Currency,
//           BankName,
//           BankType,
//           BankAccount,
//           PaymentTerms,
//         },
//       });

//       return UpdatedCompany;
//     });

    
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({
//       error: "Transaction failed",
//       details: error.message,
//       status: 500,
//     });
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const POST = async (req: NextRequest) => {
  try {
    const CompanyData = await GetCompanyData();

    if (!CompanyData) {
      return NextResponse.json(
        { message: "Unrecognized Company", status: 400 },
        { status: 400 }
      );
    }

    const data = await req.formData();

    // Retrieve data from the form and ensure all fields are provided
    const CompanyName = data.get("CompanyName")?.toString() || null;
    const UserId = data.get("UserId")?.toString() || null;
    const ContactPerson = data.get("ContactPerson")?.toString() || null;
    const TagLine = data.get("TagLine")?.toString() || null;
    const ContactNo = data.get("ContactNo")?.toString() || null;
    const Email = data.get("Email")?.toString() || null;
    const Currency = data.get("Currency")?.toString() || null;
    const BankName = data.get("BankName")?.toString() || null;
    const BankType = data.get("BankType")?.toString() || null;
    const BankAccount = data.get("BankAccount")?.toString() || null;
    const Logo = data.get("Logo")?.toString() || null;
    const PaymentTerms = data.get("PaymentTerms")?.toString() || null;

    // Validate required fields
    if (
      !CompanyName ||
      !ContactPerson ||
      !ContactNo ||
      !Email ||
      !TagLine ||
      !UserId ||
      !Currency ||
      !BankName ||
      !BankType ||
      !BankAccount ||
      !PaymentTerms ||
      !Logo
    ) {
      return NextResponse.json(
        { error: "Missing required inputs", status: 400 },
        { status: 400 }
      );
    }

    // Check if the company exists
    const CompanyExist = await SingletonPrisma.companies.findUnique({
      where: { CompanyId: CompanyData.CompanyId },
    });

    if (!CompanyExist) {
      return NextResponse.json(
        { error: "Company does not exist", status: 404 },
        { status: 404 }
      );
    }

    // Transaction block for updating the company
    const result = await SingletonPrisma.$transaction(async (prisma) => {
      return prisma.companies.update({
        where: { CompanyId: CompanyData.CompanyId },
        data: {
          CompanyName,
          ContactPerson,
          TagLine,
          ContactNo,
          Email,
          Logo,
          Currency,
          BankName,
          BankType,
          BankAccount,
          PaymentTerms,
        },
      });
    });

    // Return the updated company data
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error during company update:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
};
