import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { CompanyType } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const ClientName = data.get("ClientName") as string | null;
  const ClientType = data.get("ClientType") as string | null;
  const ContactPerson = data.get("ContactPerson") as string | null;
  const ContactNumber = data.get("ContactNumber") as string | null;
  const CompanyEmail = data.get("CompanyEmail") as string | null;
  const UserId = data.get("UserId") as string | null;

  if (!ClientName || !ClientType || !ContactPerson || !ContactNumber || !CompanyEmail || !UserId) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  // Check if a client with the same name already exists
  const existingClient = await SingletonPrisma.clients.findUnique({
    where: { CompanyEmail },
  });

  if (existingClient) {
    return NextResponse.json({ error: "Client name already exists", status: 400 });
  }

  // Create the new client entry
  const newClient = await SingletonPrisma.clients.create({
    data: {
      ClientId: uuid4(),
      ClientName,
      ClientType:ClientType as CompanyType,
      ContactPerson,
      ContactNumber,
      CompanyEmail,
      UserId,
    },
  });

  if (!newClient) {
    return NextResponse.json({ message: "Client not created", status: 500 });
  }

  return NextResponse.json(newClient, { status: 201 });
};
