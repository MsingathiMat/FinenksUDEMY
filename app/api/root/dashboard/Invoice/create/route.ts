import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const CompanyData = await GetCompanyData();
    const { ClientId, UserId, items, QuotationId } = data;

    if (!CompanyData) {
      return NextResponse.json({ message: "Unrecognized Company", status: 400 });
    }

    if (!ClientId || !items || !UserId || !QuotationId) {
      return NextResponse.json(
        { message: "Required UI fields missing" },
        { status: 400 }
      );
    }

    const prisma = SingletonPrisma;

    const result = await prisma.$transaction(async (transaction) => {
      // Update the `ClientId` in the `Quotations` table
      const updatedQuotation = await transaction.quotations.update({
        where: { QuotationId },
        data: { ClientId },
      });

      // Delete existing `QuotationDetails` for the given `QuotationId`
      await transaction.quotationDetails.deleteMany({
        where: { QuotationId },
      });

      // Create new `QuotationDetails` entries
      const insertedDetails = await transaction.quotationDetails.createMany({
        data: items
          .filter((detail) => detail.Amount !== undefined) // Filter out items with undefined Amount
          .map((detail) => ({
            QuotationId,
            ItemId: detail.ItemId,
            Quantity: detail.Quantity,
            Amount: detail.Amount,
          })),
      });

      return { updatedQuotation, insertedDetails };
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error("Transaction failed.", error);
    return NextResponse.json(
      { message: "Transaction failed", error },
      { status: 400 }
    );
  }
};
