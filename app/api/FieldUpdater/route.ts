import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { PrismaClient, Prisma } from "@prisma/client";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

// Create a type for all possible table names based on PrismaClient
type TableName = keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'> ;

export const POST = async (req: NextRequest) => {
  
  const CompanyId = await  GetCompanyData()


  if(!CompanyId){
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }
  
  try {
    // Parse the request body ``  ` ` 
    const data = await req.json();

 
    // Extract the table name, UniqueField for the record, and the fields to update
    const {UpdatedField,UpdatedValue, tableName, UniqueField,UniqueValue } = data;

    if (!tableName || !UniqueField || !UpdatedField || !UniqueValue || ! UpdatedValue ) {
      return NextResponse.json({ message: "Invalid request data", status: 400 });
    }

    // Check if the provided table name is a valid Prisma model
    if (!(tableName in SingletonPrisma) || typeof SingletonPrisma[tableName] !== 'object' || !('update' in SingletonPrisma[tableName])) {
      return NextResponse.json({ message: `Table ${tableName} does not support updates`, status: 400 });
    }

    // Update the record in the specified table
    const updatedRecord = await (SingletonPrisma[tableName] as any).update({
      where: {
        CompanyId,  [UniqueField]:UniqueValue
      },
      data: {
        [UpdatedField]:UpdatedValue
      },
    });

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json({ message: "Failed to update record", status: 500, error: error.message });
  }
};
