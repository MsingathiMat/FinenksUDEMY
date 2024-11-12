import { NextRequest, NextResponse } from "next/server";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";

export const GET = async (req: NextRequest) => {
  const DynamicRoute = req.nextUrl.searchParams.get('DynamicRoute') || null;
  try {
    // Fetch all items from the database
    const allClients = await SingletonPrisma.clients.findMany();

    // Return the fetched items as a JSON response
    return NextResponse.json(allClients, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error fetching items:", error);
    return NextResponse.json({ message: "Error fetching items", status: 500 });
  }
};
