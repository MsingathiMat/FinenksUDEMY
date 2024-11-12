
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const params =  req.nextUrl.searchParams

  const CompanyName = data.get("CompanyName") as string | null;
  const UserId = data.get("UserId") as string | null;
  const ContactPerson = data.get("ContactPerson") as string | null;
  const TagLine = data.get("TagLine") as string | null;
  const ContactNo = data.get("ContactNo") as string | null;
  const Email = data.get("Email") as string | null;
  const Logo = data.get("Logo") as File | null;

  if (!CompanyName || ! ContactPerson || ! ContactNo ||  !Email || !Logo || !TagLine || !UserId   ) {
    return NextResponse.json({
      error: "Some UI inputs not received",
    });
  }

  const FileName = Logo.name;
  const fileExtension = FileName.split(".").pop();

  const Imagename = uuid4();
  const formData = new FormData();

  formData.append("file", Logo, `${Imagename}.${fileExtension}`);

  let filePath = null;
  try {
    const response = await axios.post<{ file: string }>(
      "https://countent.codeddesign.org.za/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      filePath = `https://countent.codeddesign.org.za/uploads/images/${Imagename}.${fileExtension}`;
    } else {
      return NextResponse.json({
        error: `Upload failed with status code: ${response.status}`,
      });
    }
  } catch (error: any) {
    // Handle error cases
    if (error.response) {
      // Server responded with a status other than 2xx
      return NextResponse.json({
        error: error.response.data || "Upload failed with server error",
      });
    } else if (error.request) {
      // Request was made but no response was received
      return NextResponse.json({
        error: "No response received from the server",
      });
    } else {
      // Something else happened while setting up the request
      return NextResponse.json({
        error: "An error occurred during the request",
      });
    }
  }

  if (!filePath) {
    return NextResponse.json({ error: "No file path", status: 500 });
  }

  const CompanyExist = await SingletonPrisma.companies.findUnique({
    where: { Email },
  });

  if (CompanyExist) {
    return NextResponse.json({ error: "Company exists", status: 500 });
  }


  const CreatedCompany = await SingletonPrisma.companies.create({
    data: {
    CompanyName,
    UserId,
    ContactPerson,
    TagLine,
    ContactNo,
    Email,
    Logo:filePath

    },
  });

  if (!CreatedCompany) {
    return NextResponse.json({ message: "User not created", status: 500 });
  }
return NextResponse.json(CreatedCompany,{status:201})
};
