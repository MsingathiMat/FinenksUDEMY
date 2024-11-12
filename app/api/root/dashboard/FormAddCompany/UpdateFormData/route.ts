import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const CompanyId = data.get("CompanyId") as string | null;
  const OldFileName = data.get("OldFileName") as string | null;
  const CompanyName = data.get("CompanyName") as string | null;
  const UserId = data.get("UserId") as string | null;
  const ContactPerson = data.get("ContactPerson") as string | null;
  const TagLine = data.get("TagLine") as string | null;
  const ContactNo = data.get("ContactNo") as string | null;
  const Email = data.get("Email") as string | null;
  const Logo = data.get("Logo") as File | null;

  if (!CompanyId || !CompanyName || !ContactPerson || !ContactNo || !Email || !TagLine || !UserId) {
   
   
    return NextResponse.json({CompanyId,CompanyName,ContactPerson,ContactNo ,Email ,TagLine,UserId
    });
  }

  let filePath = null;
  if (Logo instanceof File ) {
    const FileName = Logo.name;
    const fileExtension = FileName.split(".").pop();
    const Imagename = uuid4();
    const formData = new FormData();
    formData.append("file", Logo, `${OldFileName}`);

    try {
      const response = await axios.post<{ file: string }>(
        "http://localhost/account/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        filePath = `http://localhost/account/uploads/images/${Imagename}.${fileExtension}`;
      } else {
        return NextResponse.json({
          error: `Upload failed with status code: ${response.status}`,
        });
      }
    } catch (error: any) {
      if (error.response) {
        return NextResponse.json({
          error: error.response.data || "Upload failed with server error",
        });
      } else if (error.request) {
        return NextResponse.json({
          error: "No response received from the server",
        });
      } else {
        return NextResponse.json({
          error: "An error occurred during the request",
        });
      }
    }
  }

  const existingCompany = await SingletonPrisma.companies.findUnique({
    where: { CompanyId },
  });

  if (!existingCompany) {
    return NextResponse.json({ error: "Company not found", status: 404 });
  }

  const updatedCompany = await SingletonPrisma.companies.update({
    where: { CompanyId },
    data: {
      CompanyName,
      UserId,
      ContactPerson,
      TagLine,
      ContactNo,
      Email,
      ...(filePath && { Logo: filePath }),
    },
  });

  if (!updatedCompany) {
    return NextResponse.json({ message: "Company not updated", status: 500 });
  }
  
  return NextResponse.json(updatedCompany, { status: 200 });
};
