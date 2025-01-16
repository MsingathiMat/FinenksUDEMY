import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const CompanyName = data.get("CompanyName") as string | null;
  const UserId = data.get("UserId") as string | null;
  const ContactPerson = data.get("ContactPerson") as string | null;
  const TagLine = data.get("TagLine") as string | null;
  const ContactNo = data.get("ContactNo") as string | null;
  const Email = data.get("Email") as string | null;

  const Currency = data.get("Currency") as string | null;
  const BankName = data.get("BankName") as string | null;
  const BankType = data.get("BankType") as string | null;
  const BankAccount = data.get("BankAccount") as string | null;
  const PaymentTerms = data.get("PaymentTerms") as string | null;
  const Logo = data.get("Logo") as string | null;

  if (!CompanyName || !ContactPerson || !ContactNo || !Email || !TagLine || !UserId ||
    !Currency || !BankName || !BankType || !BankAccount || !PaymentTerms || !Logo 
  ) {
    return NextResponse.json({
      error: "Some UI inputs not received",
    });
  }





  // Check if the company already exists
  const CompanyExist = await SingletonPrisma.companies.findUnique({
    where: { Email },
  });

  if (CompanyExist) {
    return NextResponse.json({ error: "Company exists", status: 500 });
  }

  // Transaction block for atomic operations
  try {
    const result = await SingletonPrisma.$transaction(async (prisma) => {
      // Create the company
      const CreatedCompany = await prisma.companies.create({
        data: {
          CompanyName,
          UserId,
          ContactPerson,
          TagLine,
          ContactNo,
          Email,
          Logo: Logo,
          Currency,BankName,BankType,BankAccount,PaymentTerms ,
         
        },
      });

      // Update the user with the created company ID
      await prisma.users.update({
        where: {
          UserId: UserId, // Assuming 'UserId' is the primary key or unique identifier for the user
        },
        data: {
          CompanyId: CreatedCompany.CompanyId,
        },
      });

      return CreatedCompany;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Transaction failed", details: error.message, status: 500 });
  }
};
