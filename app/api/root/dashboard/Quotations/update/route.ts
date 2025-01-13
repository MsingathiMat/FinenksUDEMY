import { NextRequest, NextResponse } from "next/server";

import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const POST = async (req: NextRequest) => {
  // const { ClientId, UserId, items,QuotationId } = await req.json();
const data = await req.json()
// console.log(data)
//   const CompanyData = await GetCompanyData();

const { ClientId, UserId, items,QuotationId }=data
  
  return NextResponse.json({items}, { status: 201 });
  // if (!CompanyData) {
  //   return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  // }

  // if (!ClientId || !items || !UserId || !QuotationId) {
  //   return NextResponse.json({ message: "Required UI fields missing" }, { status: 400 });
  // }

  // const prisma = SingletonPrisma;

  // try {
  //   const result = await prisma.$transaction(async (tx) => {
  //     // Fetch the existing quotation for this client
  //     const existingQuote = await tx.quotations.findFirst({
  //       where: {
  //         QuotationId,
  //         ClientId,
  //         CompanyId: CompanyData.CompanyId,
  //         UserId,
  //       },
  //       include: {
  //         QuotationDetails: true,
  //       },
  //     });

  //     let updatedQuote;

  //     if (existingQuote) {
  //       // Update or delete existing quote items
  //       const existingItemIds = existingQuote.QuotationDetails.map((item) => item.ItemId);
  //       const newItemIds = items.map((item) => item.ItemCode);

  //       // Find items to delete
  //       const itemsToDelete = existingQuote.QuotationDetails.filter((item) => !newItemIds.includes(item.ItemId));

  //       // Delete old items
  //       if (itemsToDelete.length > 0) {
  //         await tx.quotationDetails.deleteMany({
  //           where: {
  //             QuotationId: existingQuote.QuotationId,
  //             ItemId: { in: itemsToDelete.map((item) => item.ItemId) },
  //           },
  //         });
  //       }

  //       // Update or create new items
  //       for (const item of items) {
  //         await tx.quotationDetails.upsert({
  //           where: {
  //             QuotationId_ItemId: {
  //               QuotationId: existingQuote.QuotationId,
  //               ItemId: item.ItemCode,
  //             },
  //           },
  //           update: {
  //             Quantity: item.quantity,
  //             Amount: item.amount,
  //           },
  //           create: {
  //             QuotationId: existingQuote.QuotationId,
  //             ItemId: item.ItemCode,
  //             Quantity: item.quantity,
  //             Amount: item.amount,
  //           },
  //         });
  //       }

  //       // Update the quotation status
  //       updatedQuote = await tx.quotations.update({
  //         where: {
  //           QuotationId: existingQuote.QuotationId,
  //         },
  //         data: {
  //           status: "UPDATED",
  //         },
  //         include: {
  //           QuotationDetails: true,
  //         },
  //       });
  //     } else {
  //       // Create a new quotation if none exists
  //       updatedQuote = await tx.quotations.create({
  //         data: {
  //           ClientId,
  //           status: "CREATED",
  //           UserId,
  //           CompanyId: CompanyData.CompanyId,
  //           QuotationDetails: {
  //             create: items.map((item) => ({
  //               ItemId: item.ItemCode,
  //               Quantity: item.quantity,
  //               Amount: item.amount,
  //             })),
  //           },
  //         },
  //         include: {
  //           QuotationDetails: true,
  //         },
  //       });
  //     }

  //     return updatedQuote;
  //   });

  //   return NextResponse.json({ message: "SUCCESS", payload: result }, { status: 201 });
  // } catch (error) {
  //   console.error("Transaction error:", error);
  //   return NextResponse.json({ message: "Transaction failed", error: error.message }, { status: 500 });
  // }
};
