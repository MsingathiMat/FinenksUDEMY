import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;
  
  try {
    // Extract table name from query parameters
    const { searchParams } = new URL(req.url);
    const TableName = searchParams.get("TableName");

    // Validate TableName
    if (!TableName) {
      return NextResponse.json({ Message: "TableName is required" }, { status: 400 });
    }

    // Fetch company data
    const CompanyData = await GetCompanyData();
    const CompanyId = CompanyData?.CompanyId;

    // Validate CompanyId
    if (!CompanyId) {
      return NextResponse.json({ Message: "No Company ID" }, { status: 401 });
    }

  

    // Count records dynamically based on table name
    const TotalCount = await SingletonPrisma[TableName].count({
      where: {
        CompanyId: CompanyId, // Filter by CompanyId
      },
    });

    // Return count
    return NextResponse.json( TotalCount , { status: 200 });
  } catch (error) {
    console.error("Error fetching count:", error);
    return NextResponse.json({ Message: "Error fetching count" }, { status: 500 });
  }
};
